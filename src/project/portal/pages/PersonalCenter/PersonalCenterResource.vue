<template>
  <div class="personal-content">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane :label="$t('service.mapServices')" name="centerPageShow">
        <personal-center-service :centerPageShow="pageShowStatusList.centerPageShow"></personal-center-service>
      </el-tab-pane>
      <el-tab-pane :label="$t('portalStatistics.DataService')" name="dataPageShow">
        <personal-data-service :dataPageShow="pageShowStatusList.dataPageShow"></personal-data-service>
      </el-tab-pane>
      <el-tab-pane :label="$t('service.functionServices')" name="functionPageShow">
        <personal-function-service :functionPageShow="pageShowStatusList.functionPageShow"></personal-function-service>
      </el-tab-pane>
      <el-tab-pane :label="$t('service.scene')" name="scenePageShow">
        <personal-scene-service :scenePageShow="pageShowStatusList.scenePageShow"></personal-scene-service>
      </el-tab-pane>
      
      <!-- <el-tab-pane :label="$t('myCenter.MyApps')" name="appPageShow">
        <personal-center-app :appPageShow="pageShowStatusList.appPageShow"></personal-center-app>
      </el-tab-pane>-->
      <el-tab-pane :label="$t('myCenter.Mydatas')" name="datacenterPageShow">
        <personal-datacenter-service :datacenterPageShow="pageShowStatusList.datacenterPageShow"></personal-datacenter-service>
      </el-tab-pane>
      <el-tab-pane :label="$t('myCenter.MyFiles')" name="filePageShow">
        <personal-file-service :filePageShow="pageShowStatusList.filePageShow"></personal-file-service>
      </el-tab-pane>
      
    </el-tabs>
  </div>
</template>

<script>
import PersonalCenterService from "components/personalCenterService/PersonalCenterService";
import PersonalFunctionService from "components/personalFunctionService/PersonalFunctionService";
import PersonalSceneService from "components/personalSceneService/PersonalSceneService";
import PersonalDataService from "components/personalDataService/PersonalDataService";
// import PersonalCenterApp from "components/personalCenterApp/PersonalCenterApp";
import PersonalFileService from "components/personalFileService/PersonalFileService";
import PersonalDatacenterService from "components/personalDatacenterService/PersonalDatacenterService";
export default {
  name: "ManageContent",
  components: {
    PersonalCenterService,
    PersonalFunctionService,
    PersonalSceneService,
    PersonalDataService,
    PersonalFileService,
    PersonalDatacenterService
  },
  data() {
    return {
      activeName: "centerPageShow",
      pageShowStatusList: {
        centerPageShow: false,
        functionPageShow: false,
        scenePageShow: false,
        dataPageShow:false,
        rolePageShow: false,
        filePageShow: false,
        datacenterPageShow: false
      }
    };
  },
  methods: {
    tabClick() {
      for (var i in this.pageShowStatusList) {
        this.pageShowStatusList[i] = false;
      }
      this.pageShowStatusList[this.activeName] = true;
    }
  },
  mounted() {
    this.pageShowStatusList.centerPageShow = true;
  }
};
</script>

<style lang='scss' scoped>

.personal-content {
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