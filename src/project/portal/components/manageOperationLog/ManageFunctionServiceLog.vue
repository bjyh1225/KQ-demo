<template>
  <div>
    <el-row class="search-area">
      <el-col :span="10">
        <el-select
          v-model="serverValue"
          :placeholder="$t('myCenter.PleaseSelect')"
          @change="serverChange"
        >
          <el-option
            v-for="item in mapOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="14" class="input-area">
        <el-input
          :placeholder="$t('service.pleaseEnterKeywords')"
          v-model="searchKey"
          @keyup.enter.native="search"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchKey.length===0"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row class="monitoring-display">
      <el-table :data="logList" border>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          v-for="(item,ix) in tableCol"
          :key="ix"
        ></el-table-column>
      </el-table>
      <pagination
        :total="total"
        :pageSize="pageSize"
        :pageIndex="pageIndex"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        class="pagination"
      ></pagination>
    </el-row>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
export default {
  name: "ManageFunctionServiceLog",
  components: {
    Pagination,
  },
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      serverValue: "",
      serverHttp: "",
      serverIp: "",
      serverPortnumber: "",
      mapOptions: [],
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      searchKey: "",
      logList: [],
      tableCol: [
        {
          prop: "instanceName",
          label: this.$t("management.InstanceName"),
          minWidth: "10%",
        },
        {
          prop: "username",
          label: this.$t("management.OperationUser"),
          minWidth: "10%",
        },

        {
          prop: "clientIp",
          label: this.$t("management.ClientIP"),
          minWidth: "10%",
        },
        {
          prop: "requestUrl",
          label: this.$t("management.RequestURL"),
          minWidth: "40%",
        },
        {
          prop: "method",
          label: this.$t("management.MethodName"),
          minWidth: "10%",
        },
        {
          prop: "interfaceType",
          label: this.$t("management.PortAd"),
          minWidth: "8%",
        },
        {
          prop: "formatLogTime",
          label: this.$t("service.time"),
          minWidth: "12%",
        },
      ],
    };
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal) {
        if (newVal) {
          this.getListProxyServerDataNotPages();
        }
      },
    },
  },
  methods: {
    // 初始获取
    getListProxyServerDataNotPages() {
      //获取代理服务器列表无分页
      this.mapOptions = [];
      this.$api.manageProxyServerApi
        .getListProxyServerDataNotPages()
        .then((res) => {
          let data = res.data.data;
          data.forEach((item) => {
            let temp = {
              value:
                item.C_SERVER_HTTP +
                "," +
                item.C_SERVER_IP +
                "," +
                item.C_SERVER_PORTNUMBER,
              label: item.C_SERVER_IP + ":" + item.C_SERVER_PORTNUMBER,
              leaf: false,
            };
            this.mapOptions.push(temp);
            this.serverValue = this.mapOptions[0].value;
            let arr = this.serverValue.split(",");
            this.serverHttp = arr[0];
            this.serverIp = arr[1];
            this.serverPortnumber = arr[2];
            this.getServerInfo();
          });
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getServerInfo();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getServerInfo();
    },
    search() {
      this.pageIndex = 1;
      this.getServerInfo();
    },
    serverChange(value) {
      let arr = value.split(",");
      this.serverHttp = arr[0];
      this.serverIp = arr[1];
      this.serverPortnumber = arr[2];
      this.getServerInfo();
    },
    getServerInfo() {
      this.$api.manageServerApi
        .getLogProxyService(
          {
            serverHttp: this.serverHttp,
            serverIp: this.serverIp,
            serverPortnumber: this.serverPortnumber,
            pageNum: this.pageIndex,
            pageSize: this.pageSize,
            summary: this.searchKey,
          },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          var data = res.data.data;
          this.logList = data.content;
          this.pageIndex = data.number + 1;
          // this.pageSize = data.size+1;
          this.total = data.totalElements;
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang='scss' scoped>
.search-area {
  margin-bottom: 10px;
  .input-area {
    text-align: right;
    .el-input {
      width: 300px;
    }
  }
}
.monitoring-display {
  margin-top: 10px;
}
.el-table {
  margin-bottom: 13px;
}
.pagination {
  margin-bottom: 20px;
}
</style>