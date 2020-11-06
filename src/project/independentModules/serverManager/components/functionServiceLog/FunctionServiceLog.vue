<template>
  <div class="functionServiceLog">
    <div class="search">
      <div class="search-time">
        查询时间
        <el-select
          style="width:110px; margin:0 10px;"
          v-model="searchCondition.timeInterval"
          @change="changetimeInterval"
        >
          <el-option label="全部" value></el-option>
          <el-option label="最近一天" value="1d"></el-option>
          <el-option label="最近三天" value="3d"></el-option>
          <el-option label="最近七天" value="1w"></el-option>
          <el-option label="最近30天" value="1m"></el-option>
        </el-select>
        <el-date-picker
          v-model="value"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeTime"
          :picker-options="pickerOptions"
          :default-value="timeDefaultShow"
        ></el-date-picker>
      </div>
      <div class="serach-summary" style="float: right;">
        摘要
        <el-input
          style="width:300px;margin-left: 20px;"
          v-model="searchCondition.summary"
          placeholder="检索摘要"
          @change="changesummary"
        ></el-input>
      </div>
    </div>
    <div class="tableList">
      <el-table :data="data_list" style="width: 100%; font-size: 14px;" border>
        <el-table-column
          prop="instanceName"
          label="实例名"
          min-width="30%"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="username" label="用户名" min-width="30%" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          prop="clientIp"
          label="客户端ip"
          min-width="40%"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="requestUrl"
          label="请求地址"
          min-width="100%"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="method" label="方法" min-width="40%" :show-overflow-tooltip="true"></el-table-column>
        <el-table-column
          prop="interfaceType"
          label="接口类型"
          min-width="30%"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column prop="formatLogTime" label="访问时间" :show-overflow-tooltip="true"></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <pagination
        :total="totalCount"
        :page-sizes="pagesizes"
        :pageIndex="pageNum"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "../../../../portal/components/common/page/Pagination";
export default {
  name: "FunctionServiceLog",
  components: {
    Pagination,
  },
  data() {
    return {
      data_list: [],
      searchCondition: {
        summary: "",
        timeInterval: "",
        startTime: "",
        endTime: "",
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
      },
      timeDefaultShow: null,
      value: "",
      pageNum: 1,
      pageSize: 10,
      pagesizes: [10, 20, 30, 50],
      totalCount: 0,
      pgoption: {},
    };
  },
  created() {
    this.searchextlog();
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
  },
  methods: {
    timeFormat(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      return year + "-" + month + "-" + date + " " + hh + ":" + mm + ":" + ss;
    },
    changetimeInterval(val) {
      var now = new Date();
      if (val == "1d") {
        //now.setHours(now.getHours() - 6);
        this.searchCondition.startTime = this.timeFormat(
          new Date(now.getTime() - 24 * 60 * 60 * 1000)
        );
        this.searchCondition.endTime = this.timeFormat(new Date());
      } else if (val == "3d") {
        //now.setHours(now.getHours() - 12);
        this.searchCondition.startTime = this.timeFormat(
          new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000)
        );
        this.searchCondition.endTime = this.timeFormat(new Date());
      } else if (val == "1w") {
        //now.setHours(now.getHours() - 12);
        this.searchCondition.startTime = this.timeFormat(
          new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        );
        this.searchCondition.endTime = this.timeFormat(new Date());
      } else if (val == "1m") {
        //now.setHours(now.getHours() - 12);
        this.searchCondition.startTime = this.timeFormat(
          new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        );
        this.searchCondition.endTime = this.timeFormat(new Date());
      } else if (val == "") {
        this.searchCondition.startTime = "";
        this.searchCondition.endTime = "";
      }
      this.searchextlog();
    },
    searchextlog() {
      this.$api.logApi
        .searchextlog({
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          summary: this.searchCondition.summary,
          startTime: this.searchCondition.startTime,
          endTime: this.searchCondition.endTime,
        })
        .then((res) => {
          if (res.data.code == "200") {
            this.data_list = res.data.data.content;
            this.totalCount = res.data.data.totalElements;
          } else {
            if (res.data.msg) {
              this.$message.error(res.data.msg);
            }
          }
        });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageNum = 1;
      this.searchextlog();
    },
    handleCurrentChange(val) {
      this.pageNum = val;

      this.searchextlog();
    },
    changesummary() {
      this.searchextlog();
    },
    changeTime(val) {
      if (val != null && val != "") {
        this.searchCondition.startTime = this.timeFormat(val[0]);
        this.searchCondition.endTime = this.timeFormat(val[1]);
      } else {
        this.searchCondition.startTime = "";
        this.searchCondition.endTime = "";
      }
      this.searchextlog();
    },
  },
};
</script>

<style lang="scss" scoped>
.functionServiceLog {
  width: 96%;
  margin: 0 2%;
  padding: 20px 2%;
  box-sizing: border-box;
  min-height: 500px;
  background-color: #fff;
  font-size: 14px;
  color: #242424;
  .search {
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    .search-time {
      float: right;
    }
    .serach-summary {
      float: right;
      margin-right: 20px;
    }
  }
  .pagination {
    margin-top: 14px;
  }
}
</style>