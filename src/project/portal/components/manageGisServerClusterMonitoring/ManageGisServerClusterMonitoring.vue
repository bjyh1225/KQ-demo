<template>
  <div>
    <el-row>
      <el-select
        v-model="serverValue"
        :placeholder="$t('myCenter.PleaseSelect')"
        @change="serverChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-row>
    <el-row>
      <el-col :span="20" class="monitoring-display">
        <iframe :src="src" frameborder="0" width="100%" height="100%" scrolling="auto"></iframe>
      </el-col>
      <el-col :span="4">
        <el-radio-group v-model="type" @change="typeChange">
          <el-radio :label="'all'">{{$t('management.Displayoverallperformance')}}</el-radio>
          <el-radio :label="'node'">{{$t('management.Displayallnodes')}}</el-radio>
        </el-radio-group>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ManageGisServerClusterMonitoring",
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
          this. getListServerDataNotPage();
        }
      }
    }
  },
  data() {
    return {
      options: [],
      src: "",
      address: "",
      serverValue: "",
      type: "all",
      serverList:[]
    };
  },
  methods: {
     getListServerDataNotPage(){//获取微服务服务器列表
      this.serverList=[];
      this.$api.manageServerApi.getListServerDataNotPage().then(res=>{
        let data=res.data.data;
        data.forEach(item=>{
          let temp={
            value:item.C_SERVER_HTTP+","+item.C_SERVER_IP+","+item.C_SERVER_PORTNUMBER,
            label:item.C_SERVER_IP+":"+item.C_SERVER_PORTNUMBER,
            leaf:false
          }
          this.serverList.push(temp);
        })
        this.reset();
      }).catch(()=>{
      })
    },
    getServerInfo(serverHttp, serverIp, serverPortnumber) {
      // this.$api.manageServerApi.getServerManagerData({
      //   serverHttp:serverHttp,
      //   serverIp:serverIp,
      //   serverPortnumber:serverPortnumber
      // },{loadingText:this.$t('service.searching')}).then(res=>{
      //   let data=res.data.data.data;
      //   this.address="http://"+data.metricsAddr.host+":"+data.metricsAddr.port;
      //   this.setSrc();
      // }).catch(()=>{
      // })
      this.address = serverHttp + "://" + serverIp + ":" + serverPortnumber;
      this.setSrc();
    },
    setSrc() {
      if (this.type == "all") {
        this.src = `${this.address}/apm/d/nIBUp9IZz/cluster?orgId=1&refresh=10s&from=now-6h&to=now&kiosk`;
      } else {
        this.src = `${this.address}/apm/d/KQ_xbeSZz/nodes?orgId=1&refresh=10s&from=now-6h&to=now&kiosk`;
      }
    },
    serverChange(value) {
      // this.type="all";
      let arr = value.split(",");
      this.getServerInfo(arr[0], arr[1], arr[2]);
    },
    typeChange() {
      if (!this.serverValue) {
        this.$message({
          type: "warning",
          message: this.$t("management.Pleaseselectserverfirst")
        });
        return false;
      }
      if (!this.address) {
        return false;
      }
      this.setSrc();
    },
    reset() {
      if (this.options.length == 0) {
        this.options = JSON.parse(JSON.stringify(this.serverList));
        if (this.options.length > 0) {
          this.serverValue = this.options[0].value;
          let arr = this.serverValue.split(",");
          this.getServerInfo(arr[0], arr[1], arr[2]);
        }
      }
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
</style>