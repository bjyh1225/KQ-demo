<template>
  <div class="SystemLog">
    <div class="search">
      <div class="search-label">
        级别
        <el-select
          style="width:120px"
          v-model="searchCondition.logLevel"
          placeholder="选择级别"
          @change="changelogLevel"
        >
          <el-option label="全部" value></el-option>
          <el-option label="信息" value="info"></el-option>
          <el-option label="错误" value="error"></el-option>
          <el-option label="警告" value="warn"></el-option>
          <el-option label="调试" value="debugger"></el-option>
        </el-select>
      </div>
      <div class="search-summary">
        摘要
        <el-input
          style="width:300px"
          v-model="searchCondition.summary"
          placeholder="检索摘要"
          @change="changesummary"
        ></el-input>
      </div>

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
          <a :href="src" class="download">导出日志</a>
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
  name: "SystemLog",
  components: {
    Pagination,
  },
  data() {
    return {
      // logmanageurl: JSON.parse(sessionStorage.getItem("crossHost")).logmanage,
      logmanageurl: sessionStorage.getItem("logManagerUrl"),
      tableData: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now(); //后面加上-8.64e7就是不可以选择今天的
        },
      },
      timeDefaultShow: null,
      totalCount: 0,
      currentPage: 1,
      pageSize: 10,
      pagesizes: [10, 20, 30, 50],
      datetime: "",
      searchCondition: {
        timeInterval: "",
        logLevel: "",
        summary: "",
        startTime: "",
        endTime: "",
      },
      src: "",
      tableCol: [
        {
          prop: "levelStr",
          label: "级别",
          minWidth: "5%",
        },
        {
          prop: "message",
          label: "摘要",
          minWidth: "50%",
        },
        {
          prop: "formatLogTime",
          label: "时间",
          minWidth: "10%",
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
    getsystemlog: function () {
      this.$api.logApi
        .getsystemlog({
          pageNum: this.currentPage,
          pageSize: this.pageSize,
          logLevel: this.searchCondition.logLevel,
          summary: this.searchCondition.summary,
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
      this.getsystemlog();
    },
    changesummary(val) {
      this.searchCondition.summary = val;
      this.getsystemlog();
    },
    changeTime(val) {
      if (val != null && val != "") {
        this.searchCondition.startTime = this.timeFormat(val[0]);
        this.searchCondition.endTime = this.timeFormat(val[1]);
      } else {
        this.searchCondition.startTime = "";
        this.searchCondition.endTime = "";
      }
      this.getsystemlog();
    },
    //分页触发
    handleSizeChange(val) {
      this.currentPage = 1;
      this.pageSize = val;
      this.getsystemlog();
    },
    handleCurrentChange(val) {
      this.currentPage = val;

      this.getsystemlog();
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
      this.getsystemlog();
    },
  },
  created: function () {
    this.getsystemlog();
    this.timeDefaultShow = new Date();
    this.timeDefaultShow.setMonth(new Date().getMonth() - 1);
  },
};
</script>

<style lang='scss' scoped>
.SystemLog {
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
    .search-label {
      float: left;
    }
    .search-summary {
      margin-left: 30px;
      float: left;
    }
    .search-time {
      float: left;
      margin-left: 30px;
    }
    .search-picker {
      float: left;
      margin-left: 20px;
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