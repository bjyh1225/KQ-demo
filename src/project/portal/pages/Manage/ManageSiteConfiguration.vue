<template>
  <div class="manage-content">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane label="部门管理配置" name="department">
        <manage-department-config :showStatus="pageShowStatusList.department"></manage-department-config>
      </el-tab-pane>
      <el-tab-pane :label="$t('myCenter.Homepagecustom')" name="visualization">
        <el-button
          @click="enterVisualization"
          :disabled="visualizationStatus"
        >{{$t('myCenter.Gotohomepagecustom')}}</el-button>
        <div
          v-show="visualizationStatus"
          class="tips"
        >{{$t('management.EnableItBeforeConfiguration')}}</div>
      </el-tab-pane>
      <el-tab-pane :label="$t('management.BigScreenConfiguration')" name="bigScreen">
        <manage-big-screen-config :activeName="activeName"></manage-big-screen-config>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManageBigScreenConfig from "portal/components/manageBigScreenConfig/ManageBigScreenConfig";
import ManageDepartmentConfig from "portal/components/manageDepartmentConfig/ManageDepartmentConfig";
export default {
  name: "ManageSiteConfiguration",
  components: {
    ManageBigScreenConfig,
    ManageDepartmentConfig
  },
  data() {
    return {
      activeName: "department",
      pageShowStatusList: {
        visualization: false,
        bigScreen: false,
        department:false
      },
      visualizationStatus: false
    };
  },
  methods: {
    tabClick() {
      for (var i in this.pageShowStatusList) {
        this.pageShowStatusList[i] = false;
      }
      this.pageShowStatusList[this.activeName] = true;
      if (this.activeName == "visualization") {
        this.getVisualizationStatus();
      }
    },
    enterVisualization() {
      this.$router.push("/visualization");
    },
    getVisualizationStatus() {
      this.$api.manageParamsApi
        .getStatusByKey(
          {
            key: "visualizationInfo"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          var data = res.data.data;
          if (data === false) {
            this.visualizationStatus = true;
          } else {
            this.visualizationStatus = false;
          }
        })
        .catch(() => {});
    }
  },
  mounted() {
    this.pageShowStatusList.department = true;
    this.getVisualizationStatus();
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
.tips {
  margin-top: 10px;
  font-size: 14px;
  color: #ccc;
}
</style>