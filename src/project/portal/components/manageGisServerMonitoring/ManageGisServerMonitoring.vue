<template>
  <div>
    <el-row>
      <el-cascader :props="props" :options="options" @change="serverChange"></el-cascader>
    </el-row>
    <div class="monitoring-display">
      <iframe :src="src" frameborder="0" width="100%" height="100%" scrolling="auto"></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "ManageGisServerMonitoring",
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
      metricsAddr: "",
      serverList:[],
      props: {
        lazy: true,
        lazyLoad(node, resolve) {
          if (!node.root) {
            let arr = node.data.value.split(",");
            //eslint-disable-next-line
            vm.$api.manageServerApi
              .getServerManagerData(
                {
                  serverHttp: arr[0],
                  serverIp: arr[1],
                  serverPortnumber: arr[2]
                },
                { noLoading: true }
              )
              .then(res => {
                let data = res.data.data.data;
                let nodeExporter = data.nodesInfo;
                // let address="http://"+data.metricsAddr.host+":"+data.metricsAddr.port;
                let address = arr[0] + "://" + arr[1] + ":" + arr[2];
                sessionStorage.setItem("monitorUrl", address);
                let nodes = [];
                nodeExporter.forEach(item => {
                  let temp = {
                    value: item.serviceAlias,
                    label: item.serviceAlias,
                    leaf: true
                  };
                  nodes.push(temp);
                });
                resolve(nodes);
              })
              .catch(() => {
                resolve([]);
              });
          }
        }
      }
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
    serverChange(value) {
      this.src = `${sessionStorage.getItem(
        "monitorUrl"
      )}/apm/d/UZT_DrIZk/snode?orgId=1&refresh=10s&from=now-6h&to=now&kiosk&var-server=${
        value[1]
      }`;
    },
    reset() {
      if (this.options.length == 0) {
        this.options = JSON.parse(JSON.stringify(this.serverList));
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
</style>