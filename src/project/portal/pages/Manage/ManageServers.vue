<template>
  <div class="manage-content">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane :label="'服务器管理'" name="manageServer">
        <manage-server :pageStatus="pageShowStatusList.manageServer"></manage-server>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManageServer from "components/manageServer/ManageServer";
export default {
  name: "ManageServers",
  components: {
    ManageServer
  },
  data() {
    return {
      activeName: "manageServer",
      pageShowStatusList: {
        manageServer: false
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
    this.pageShowStatusList.manageServer = true;
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