<template>
  <div class="manage-content">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane :label="$t('management.userManagement')" name="userPageShow">
        <manage-user :userPageShow="pageShowStatusList.userPageShow"></manage-user>
      </el-tab-pane>
      <el-tab-pane :label="$t('management.permissionManagement')" name="permissionPageShow">
        <manage-permission :permissionPageShow="pageShowStatusList.permissionPageShow"></manage-permission>
      </el-tab-pane>
      <el-tab-pane :label="$t('management.roleManagement')" name="rolePageShow">
        <manage-role :rolePageShow="pageShowStatusList.rolePageShow"></manage-role>
      </el-tab-pane>
      <el-tab-pane :label="$t('management.organizationManagement')" name="organizationPageShow">
        <manage-organization :organizationPageShow="pageShowStatusList.organizationPageShow"></manage-organization>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ManageUser from "components/manageUser/ManageUser";
import ManageRole from "components/manageRole/ManageRole";
import ManagePermission from "components/managePermission/ManagePermission";
import manageOrganization from "components/manageOrganization/ManageOrganization";
export default {
  name: "ManageContent",
  components: {
    ManageUser,
    ManageRole,
    ManagePermission,
    manageOrganization
  },
  data() {
    return {
      activeName: "userPageShow",
      pageShowStatusList: {
        rolePageShow: false,
        permissionPageShow: false,
        organizationPageShow: false,
        userPageShow: false
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
    this.pageShowStatusList.userPageShow = true;
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