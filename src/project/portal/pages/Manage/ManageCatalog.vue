<template>
  <div class="manage-content">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick" :before-leave='beforeLeave'>
      <el-tab-pane :label="$t('management.categoriesOfMapServices')" name="serviceCategoryPageShow">
        <manage-map-service-category
          :serviceCategoryPageShow="pageShowStatusList.serviceCategoryPageShow" ref='serviceCategoryPageShow'
        ></manage-map-service-category>
      </el-tab-pane>
      <el-tab-pane :label="$t('myCenter.Dataservicecategory')" name="dataCategoryPageShow">
        <manage-data-category :dataCategoryPageShow="pageShowStatusList.dataCategoryPageShow" ref='dataCategoryPageShow'></manage-data-category>
      </el-tab-pane>
      <el-tab-pane
        :label="$t('management.categoriesOfFunctionServices')"
        name="funServiceCategoryPageShow"
      >
        <manage-function-service-category
          :funServiceCategoryPageShow="pageShowStatusList.funServiceCategoryPageShow" ref='funServiceCategoryPageShow'
        ></manage-function-service-category>
      </el-tab-pane>
      <el-tab-pane :label="$t('management.ThreeDServiceCategory')" name="sceneCategoryPageShow">
        <manage-three-d-services :sceneCategoryPageShow="pageShowStatusList.sceneCategoryPageShow" ref='sceneCategoryPageShow'></manage-three-d-services>
      </el-tab-pane>
      <el-tab-pane :label="$t('management.Datacategory')" name="datacenterCategoryPageShow">
        <manage-datacenter-category
          :datacenterCategoryPageShow="pageShowStatusList.datacenterCategoryPageShow" ref='datacenterCategoryPageShow'
        ></manage-datacenter-category>
      </el-tab-pane>
      <el-tab-pane :label="$t('management.MyFileCategory')" name="fileCategoryPageShow">
        <manage-file-category :fileCategoryPageShow="pageShowStatusList.fileCategoryPageShow" ref='fileCategoryPageShow'></manage-file-category>
      </el-tab-pane>
      <el-tab-pane :label="$t('myCenter.Mappingcategory')" name="mapDraftingPageShow">
        <manage-map-drafting-category :mapDraftingPageShow="pageShowStatusList.mapDraftingPageShow" ref='mapDraftingPageShow'></manage-map-drafting-category>
      </el-tab-pane>
      <el-tab-pane :label="$t('myCenter.Scenecategory')" name="scenePageShow">
        <manage-scene-category :scenePageShow="pageShowStatusList.scenePageShow" ref='scenePageShow'></manage-scene-category>
      </el-tab-pane>
      <el-tab-pane :label="$t('myCenter.Bigscreencategory')" name="dashBoardPageShow">
        <manage-dash-board-category :dashBoardPageShow="pageShowStatusList.dashBoardPageShow" ref='dashBoardPageShow'></manage-dash-board-category>
      </el-tab-pane>
      <el-tab-pane :label="$t('management.AppsCenterCategory')" name="appCategoryPageShow">
        <manage-app-category :appCategoryPageShow="pageShowStatusList.appCategoryPageShow" ref='appCategoryPageShow'></manage-app-category>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManageMapServiceCategory from "components/manageMapServiceCategory/ManageMapServiceCategory";
import ManageFunctionServiceCategory from "components/manageFunctionServiceCategory/ManageFunctionServiceCategory";
import ManageThreeDServices from "components/manageThreeDServices/ManageThreeDServices";
import ManageDataCategory from "components/manageDataCategory/ManageDataCategory";
import ManageFileCategory from "components/manageFileCategory/ManageFileCategory";
import ManageDatacenterCategory from "components/manageDatacenterCategory/ManageDatacenterCategory";
import ManageAppCategory from "components/manageAppCategory/ManageAppCategory";
import ManageMapDraftingCategory from "components/manageMapDraftingCategory/ManageMapDraftingCategory";
import ManageSceneCategory from "components/manageSceneCategory/ManageSceneCategory";
import ManageDashBoardCategory from "components/manageDashBoardCategory/ManageDashBoardCategory";
export default {
  name: "ManageCatalog",
  components: {
    ManageMapServiceCategory,
    ManageFunctionServiceCategory,
    ManageThreeDServices,
    ManageDataCategory,
    ManageFileCategory,
    ManageDatacenterCategory,
    ManageAppCategory,
    ManageMapDraftingCategory,
    ManageSceneCategory,
    ManageDashBoardCategory
  },
  data() {
    return {
      activeName: "serviceCategoryPageShow",
      pageShowStatusList: {
        funServiceCategoryPageShow: false,
        serviceCategoryPageShow: false,
        sceneCategoryPageShow: false,
        dataCategoryPageShow: false,
        fileCategoryPageShow: false,
        datacenterCategoryPageShow: false,
        appCategoryPageShow: false,
        mapDraftingPageShow: false,
        scenePageShow: false,
        dashBoardPageShow: false
      }
    };
  },
  beforeRouteLeave(to, form, next) {
      if(this.$refs[this.activeName].$children[0].draggable||this.$refs[this.activeName].draggable){
       this.$confirm('当前目录编辑尚未保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          next();
        }).catch(() => {
          return false;
        });
      }else{
        next();
      }
    },
  methods: {
    tabClick() {
      for (var i in this.pageShowStatusList) {
        this.pageShowStatusList[i] = false;
      }
      this.pageShowStatusList[this.activeName] = true;
    },
    beforeLeave(activeName, oldActiveName){
      if(this.$refs[oldActiveName].$children[0].draggable||this.$refs[oldActiveName].draggable){
        return this.$confirm('当前目录编辑尚未保存, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if(this.$refs[oldActiveName].$children[0].beforeLeaveConfirm){
            this.$refs[oldActiveName].$children[0].beforeLeaveConfirm();
            this.$refs[activeName].$children[0].beforeLeaveConfirm();
          }else{
            this.$refs[oldActiveName].beforeLeaveConfirm();
            this.$refs[activeName].beforeLeaveConfirm();
          }
        }).catch(()=> {
          throw new Error();
        });
      }
    }
  },
  mounted() {
    this.pageShowStatusList.serviceCategoryPageShow = true;
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