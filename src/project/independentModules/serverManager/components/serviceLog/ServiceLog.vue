<template>
  <div class="ServiceLog">
    <div class="search">
      <div class="search-time">
        查询时间
        <el-select
          style="width:110px"
          v-model="searchCondition.timeInterval"
          placeholder="选择时间"
          @change="changetimeInterval"
        >
          <el-option label="全部" value></el-option>
          <el-option label="最近一天" value="1d"></el-option>
          <el-option label="最近三天" value="3d"></el-option>
          <el-option label="最近七天" value="1w"></el-option>
          <el-option label="最近30天" value="1m"></el-option>
        </el-select>
      </div>

      <div class="search-picker">
        <el-date-picker
          align="right"
          v-model="datetime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeTime"
          :picker-options="pickerOptions"
          :default-value="timeDefaultShow"
        ></el-date-picker>
      </div>
      <div class="search-button">
        <el-button type="primary" @click="exportlog">
          <a :href="src">导出日志</a>
        </el-button>
      </div>
    </div>
    <div class="tabeList">
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          v-for="(item,index) in tableCol"
          :key="index"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          :show-overflow-tooltip="true"
        ></el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <pagination
        :total="totalCount"
        :page-sizes="pagesizes"
        :pageIndex="currentPage"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </div>
  </div>
</template>

<script>
import Pagination from "../../../../portal/components/common/page/Pagination";
export default {
  name: "ServiceLog",
  components: {
    Pagination,
  },
  data() {
    return {
      // logmanageurl: JSON.parse(sessionStorage.getItem("crossHost")).logmanage,
      logmanageurl: sessionStorage.getItem("logManagerUrl"),
      pgoption: {},
      tableData: [],
      totalCount: 0,
      currentPage: 1,
      pagesizes: [10, 20, 30, 50],
      pageSize: 10,
      datetime: "",
      searchCondition: {
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
      src: "",
      tableCol: [
        {
          prop: "instanceName",
          label: "实例名",
          minWidth: "12%",
        },
        {
          prop: "username",
          label: "用户名",
          minWidth: "12%",
        },
        {
          prop: "clientIp",
          label: "客户端IP",
          minWidth: "12%",
        },
        {
          prop: "requestUrl",
          label: "请求地址",
          minWidth: "40%",
        },
        {
          prop: "method",
          label: "方法",
          minWidth: "10%",
        },
        {
          prop: "statusCode",
          label: "响应码",
          minWidth: "12%",
        },
        {
          prop: "serviceType",
          label: "服务类型",
          minWidth: "12%",
        },
        {
          prop: "interfaceType",
          label: "接口类型",
          minWidth: "15%",
        },
        {
          prop: "formatLogTime",
          label: "访问时间",
          minWidth: "15%",
        },
      ],
    };
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
    getaccesslog: function () {
      this.$api.logApi
        .getaccesslog({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          startTime: this.searchCondition.startTime,
          endTime: this.searchCondition.endTime,
        })
        .then((data) => {
          if (data.data.code == "200") {
            this.totalCount = data.data.data.totalElements;
            this.tableData = data.data.data.content;
          } else {
            if (data.data.msg) {
              this.$message.error(data.data.msg);
            }
          }
        })
        .catch(() => {
          // 异常，含业务和系统错误时
          // alert("异常，含业务和系统错误时");
        })
        .finally(() => {});
    },
    changelogLevel(val) {
      this.searchCondition.logLevel = val;
      this.getaccesslog();
    },
    changesummary(val) {
      this.searchCondition.summary = val;
      this.getaccesslog();
    },
    changeTime(val) {
      if (val != null && val != "") {
        this.searchCondition.startTime = this.timeFormat(val[0]);
        this.searchCondition.endTime = this.timeFormat(val[1]);
      } else {
        this.searchCondition.startTime = "";
        this.searchCondition.endTime = "";
      }
      this.getaccesslog();
    },
    //分页触发
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getaccesslog();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getaccesslog();
    },
    exportlog: function () {
      this.src = "/serverManager/monitor/v1/elk/excel";
      "?" +
        "&logTypeStr=" +
        "systemLog" +
        "&logLevel=" +
        this.searchCondition.logLevel +
        "&summary=" +
        this.searchCondition.summary +
        "&startTime=" +
        this.searchCondition.startTime +
        "&endTime=" +
        this.searchCondition.endTime;
    },
    changetimeInterval(val) {
      this.searchCondition.timeInterval = val;
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
      this.getaccesslog();
    },
  },
  created: function () {
    this.getaccesslog();
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
  },
};
</script>

<style lang='scss' scoped>
.ServiceLog {
  width: 96%;
  margin: 0 2%;
  padding: 20px 2%;
  box-sizing: border-box;
  min-height: 700px;
  background-color: #fff;
  font-size: 14px;
  color: #242424;
  .search {
    height: 60px;
    width: 100%;
    .search-time {
      float: left;
    }
    .search-picker {
      margin-left: 20px;
      float: left;
    }
    .search-button {
      float: right;
      .el-button {
        padding: 0;
        a {
          text-decoration: none;
          font-size: 14px;
          padding: 12px 20px;
          display: block;
          color: #fff;
        }
      }
    }
  }
  .pagination {
    margin-top: 14px;
  }
}
</style>