<template>
  <div>
    <el-row>
      <el-col :span="6">
        <span class="title-label">{{$t('management.Server')}}：</span>
        <el-select
          v-model="serverValue"
          :placeholder="$t('management.Pleaseselectserver')"
          @change="serverChange"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="6">
        <span class="title-label">{{$t('service.functionServices')}}：</span>
        <el-select
          v-model="functionValue"
          :placeholder="$t('management.Pleaseselectfunctionservice')"
        >
          <el-option
            v-for="item in functionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="10" style="padding-left:10px;">
        <span class="title-label">{{$t('management.Period')}}：</span>
        <el-date-picker
          v-model="dateValue"
          type="datetimerange"
          :start-placeholder="$t('management.Start')"
          :end-placeholder="$t('management.End')"
        ></el-date-picker>
      </el-col>
      <el-col :span="2">
        <el-button class="base-btn" @click="search">{{$t('portalStatistics.Query')}}</el-button>
      </el-col>
    </el-row>
    <el-row class="monitoring-display">
      <iframe :src="src" frameborder="0" width="100%" height="100%" scrolling="auto"></iframe>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ManageFunctionalServiceMonitoring",
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal, oldVal) {
        if (newVal) {
          this.getListProxyServerDataNotPages();
          this.dateValue = [];
          this.functionValue = "";
        }
      }
    }
  },
  data() {
    return {
      options: [],
      functionOptions: [],
      src: "",
      address: "",
      serverValue: "",
      functionValue: "",
      dateValue: [],
      proxyServerList: []
    };
  },
  methods: {
    getListProxyServerDataNotPages() {
      //获取代理服务器列表无分页
      this.proxyServerList = [];
      this.$api.manageProxyServerApi
        .getListProxyServerDataNotPages()
        .then(res => {
          let data = res.data.data;
          data.forEach(item => {
            let temp = {
              value:
                item.C_SERVER_HTTP +
                "," +
                item.C_SERVER_IP +
                "," +
                item.C_SERVER_PORTNUMBER,
              label: item.C_SERVER_IP + ":" + item.C_SERVER_PORTNUMBER,
              leaf: false
            };
            this.proxyServerList.push(temp);
          });
          this.reset();
        })
        .catch(() => {});
    },
    getServerInfo(serverHttp, serverIp, serverPortnumber, type) {
      this.$api.manageServerApi
        .getServerManagerData(
          {
            serverHttp: serverHttp,
            serverIp: serverIp,
            serverPortnumber: serverPortnumber
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          let data = res.data.data.data;
          // this.address =
          //   "http://" + data.metricsAddr.host + ":" + data.metricsAddr.port;
          this.address = serverHttp + "://" + serverIp + ":" + serverPortnumber;
          let functionServiceList = res.data.data.fServiceList;
          let options = [
            {
              label: this.$t("portalStatistics.All"),
              value: ""
            }
          ];
          functionServiceList.forEach(item => {
            if (item.C_NAME) {
              options.push({
                label: item.C_NAME,
                value: item.C_NAME
              });
            }
          });
          this.functionOptions = options;
          if (type == "init") {
            this.search();
          }
        })
        .catch(() => {});
    },
    setSrc(sTime, eTime, serviceName) {
      this.src = `${this.address}/apm/d/PcjD0V7Mz/tpsvcreqs?orgId=1&refresh=10s&var-serviceName=${serviceName}&from=${sTime}&to=${eTime}&var-userId=All&kiosk&proxyType=functionService`;
    },
    serverChange(value) {
      // this.type="all";
      let arr = value.split(",");
      this.getServerInfo(arr[0], arr[1], arr[2], "init");
    },
    reset() {
      if (this.options.length == 0) {
        this.options = JSON.parse(JSON.stringify(this.proxyServerList));
        if (this.options.length > 0) {
          this.serverValue = this.options[0].value;
          let arr = this.serverValue.split(",");
          this.getServerInfo(arr[0], arr[1], arr[2], "init");
        }
      }
    },
    search() {
      let sTime, eTime, serviceName;
      if (this.dateValue && this.dateValue.length > 0) {
        sTime = new Date(this.dateValue[0]).getTime();
        eTime = new Date(this.dateValue[1]).getTime();
      } else {
        sTime = "now-6h";
        eTime = "now";
      }
      if (this.functionValue) {
        serviceName = this.functionValue;
      } else {
        serviceName = "All";
      }
      this.setSrc(sTime, eTime, serviceName);
    }
  }
};
</script>

<style lang="scss" scoped>
.monitoring-display {
  height: 600px;
  background: #f7f8fa;
  margin-top: 10px;
}
.el-radio-group {
  margin-top: 60px;
  width: 100%;
  .el-radio {
    display: block;
    margin-bottom: 20px;
    width: 100%;
    text-align: center;
  }
}
.title-label {
  font-size: 14px;
  color: #606266;
}
</style>