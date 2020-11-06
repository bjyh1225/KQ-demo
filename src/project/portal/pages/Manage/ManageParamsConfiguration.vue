<template>
  <div class="manage-content">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane :label="$t('management.parameterManager')" name="manageParams">
        <manage-params-config></manage-params-config>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManageParamsConfig from "components/manageParamsConfig/ManageParamsConfig";
export default {
  name: "ManageParamsConfiguration",
  components: {
    ManageParamsConfig
  },
  data() {
    return {
      activeName: "manageParams",
      pageShowStatusList: {
        manageParams: false
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
    this.pageShowStatusList.manageParams = true;
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