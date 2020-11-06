<template>
  <div class="manage-content">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane :label="$t('visualization.GISservercluster')" name="gisServerClusterMonitoring">
        <manage-gis-server-cluster-monitoring
          :showStatus="pageShowStatusList.gisServerClusterMonitoring"
          :serverList="serverList"
        ></manage-gis-server-cluster-monitoring>
      </el-tab-pane>
      <el-tab-pane :label="$t('visualization.Hardwareserver')" name="hardwareServerMonitoring">
        <manage-hardware-server-monitoring
          :showStatus="pageShowStatusList.hardwareServerMonitoring"
          :serverList="serverList"
        ></manage-hardware-server-monitoring>
      </el-tab-pane>
      <el-tab-pane :label="$t('visualization.GISserver')" name="gisServerMonitoring">
        <manage-gis-server-monitoring
          :showStatus="pageShowStatusList.gisServerMonitoring"
          :serverList="serverList"
        ></manage-gis-server-monitoring>
      </el-tab-pane>
      <el-tab-pane :label="$t('visualization.Mapservicemonitoring')" name="mapServiceMonitoring">
        <manage-map-service-monitoring
          :showStatus="pageShowStatusList.mapServiceMonitoring"
          :serverList="proxyServerList"
        ></manage-map-service-monitoring>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('visualization.Functionservicemonitoring')"
        name="functionalServiceMonitoring"
      >
        <manage-functional-service-monitoring
          :showStatus="pageShowStatusList.functionalServiceMonitoring"
          :serverList="proxyServerList"
        ></manage-functional-service-monitoring>
      </el-tab-pane>
      <el-tab-pane :label="$t('visualization.Emailnotification')" name="emailNotification">
        <manage-email-notification
          :showStatus="pageShowStatusList.emailNotification"
          :serverList="serverList"
        ></manage-email-notification>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManageHardwareServerMonitoring from "portal/components/manageHardwareServerMonitoring/ManageHardwareServerMonitoring";
import ManageGisServerMonitoring from "portal/components/manageGisServerMonitoring/ManageGisServerMonitoring";
import ManageGisServerClusterMonitoring from "portal/components/manageGisServerClusterMonitoring/ManageGisServerClusterMonitoring";
import ManageEmailNotification from "portal/components/manageEmailNotification/ManageEmailNotification";
import ManageFunctionalServiceMonitoring from "portal/components/manageFunctionalServiceMonitoring/ManageFunctionalServiceMonitoring";
import ManageMapServiceMonitoring from "portal/components/manageMapServiceMonitoring/ManageMapServiceMonitoring";

export default {
  name: "ManageServiceMonitoring",
  components: {
    ManageHardwareServerMonitoring,
    ManageGisServerMonitoring,
    ManageGisServerClusterMonitoring,
    ManageEmailNotification,
    ManageFunctionalServiceMonitoring,
    ManageMapServiceMonitoring
  },
  data() {
    return {
      activeName: "gisServerClusterMonitoring",
      pageShowStatusList: {
        hardwareServerMonitoring: false,
        gisServerMonitoring: false,
        gisServerClusterMonitoring: false,
        emailNotification: false,
        functionalServiceMonitoring: false,
        mapServiceMonitoring: false
      },
      serverList: [],
      proxyServerList: []
    };
  },
  methods: {
    tabClick() {
      for (var i in this.pageShowStatusList) {
        this.pageShowStatusList[i] = false;
      }
      this.pageShowStatusList[this.activeName] = true;
    },
    getListServerDataNotPage() {
      //获取微服务服务器列表
      this.serverList = [];
      this.$api.manageServerApi
        .getListServerDataNotPage()
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
            this.serverList.push(temp);
          });
        })
        .catch(() => {})
        .finally(() => {
          this.pageShowStatusList.gisServerClusterMonitoring = true;
        });
    },
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
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.getListServerDataNotPage();
    this.getListProxyServerDataNotPages();
  }
};
</script>

<style lang='scss' scoped>

.manage-content {
  /deep/ .el-tabs__header {
    margin-bottom: 10px;
  }
  min-height: 700px;
  /deep/.el-tabs--card > .el-tabs__header {
    @include manage-tab-border(
      $types: (
        "bottom"
      )
    );
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
    @include manage-tab-border(
      $types: (
        "top",
        "right",
        "left"
      )
    );
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__item {
    @include base-color();
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__item:not(:first-child) {
    @include manage-tab-border(
      $types: (
        "left"
      )
    );
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    @include base-active-color();
    border-bottom: 1px solid #fff;
  }
}
</style>