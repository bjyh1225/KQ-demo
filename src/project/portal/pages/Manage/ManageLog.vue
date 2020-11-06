<template>
  <div class="manage-content">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane :label="$t('management.OperationLog')" name="operationLog">
        <manage-operation-log :showStatus="pageShowStatusList.operationLog"></manage-operation-log>
      </el-tab-pane>
      <el-tab-pane :label="'地图服务日志'" name="mapServiceLog">
        <manage-map-service-log :showStatus="pageShowStatusList.mapServiceLog"></manage-map-service-log>
      </el-tab-pane>
      <el-tab-pane :label="'功能服务日志'" name="functionServiceLog">
        <manage-function-service-log :showStatus="pageShowStatusList.functionServiceLog"></manage-function-service-log>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManageOperationLog from 'components/manageOperationLog/ManageOperationLog'
import ManageMapServiceLog from 'components/manageOperationLog/ManageMapServiceLog'
import ManageFunctionServiceLog from 'components/manageOperationLog/ManageFunctionServiceLog'
export default {
  name: "ManageLog",
  components: {
    ManageOperationLog,
    ManageMapServiceLog,
    ManageFunctionServiceLog
  },
  data() {
    return {
      activeName: "operationLog",
      pageShowStatusList: {
        operationLog: false,
        mapServiceLog:false,
        functionServiceLog:false
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
    this.pageShowStatusList.operationLog = true;
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