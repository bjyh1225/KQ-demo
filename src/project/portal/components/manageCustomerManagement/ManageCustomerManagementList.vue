<template>
  <div class="manageCustomerManagementList">
    <el-dialog
      ref="dialogPosition"
      :visible.sync="dialogCustomerListVisible"
      :before-close="handleClose"
      :close-on-click-modal="false"
      width="800px"
    >
      <div slot="title" class="dialog-title">
        <span class="title-text">租户详情</span>
      </div>
      <el-form :label-width="labelWidth">
        <el-form-item :label="$t('management.TenantName') +':'">{{tableList.name}}</el-form-item>
        <el-form-item :label="$t('management.TenantIdentifier') +':'">{{tableList.code}}</el-form-item>
        <el-form-item :label="$t('management.DatabaseType') +':'">{{tableList.dbType}}</el-form-item>
        <el-form-item :label="$t('management.Address') +':'">{{tableList.dsUrl}}</el-form-item>
        <el-form-item :label="$t('management.DriverClassName') +':'">{{tableList.dsDriverClassName}}</el-form-item>
        <el-form-item :label="$t('management.Username') +':'">{{tableList.dsUserName}}</el-form-item>
        <el-form-item :label="$t('management.Password') +':'">{{tableList.dsPassword}}</el-form-item>
        <el-form-item :label="$t('management.NoOfConnection') +':'">{{tableList.dsMaxActive}}</el-form-item>
        <el-form-item :label="$t('management.DefaultSize') +':'">{{tableList.dsMinIdle}}</el-form-item>
        <el-form-item :label="$t('management.MaOnlineUser') +':'">{{tableList.onlineUser}}</el-form-item>
        <el-form-item :label="$t('management.creationTime') + ':'">{{tableList.createTime}}</el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-btn" @click="testConnection">{{$t('management.Test')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogCustomerListVisible: {
      type: Boolean,
      default: false,
    },
    tableList: {
      type: Object,
      defalut: {},
    },
  },
  data() {
    return {
      labelWidth: "100px",
    };
  },
  methods: {
    handleClose() {
      this.$emit("handListColse");
    },
    //测试连接
    testConnection() {
      let params = {
        dbType: this.tableList.dbType,
        dsUrl: this.tableList.dsUrl,
        dsUserName: this.tableList.dsUserName,
        dsPassword: this.tableList.dsPassword,
      };
      this.$api.manageCustomerManagementApi
        .testCustomerConn(params, {
          loadingText: this.$t("management.TestingConnection"),
        })
        .then((res) => {
          if (res.data.title == "连接成功") {
            this.$message({
              type: "success",
              message: this.$t("management.ConnectionSucceeded"),
            });
          } else if (res.data.title == "连接失败") {
            this.$message({
              type: "error",
              message: this.$t("management.ConnectionFailed"),
            });
          }
        });
    },
  },
  mounted() {
    if (this.$store.getters.language == "english") {
      this.labelWidth = "160px";
    } else {
      this.labelWidth = "100px";
    }
  },
};
</script>
<style lang="scss" scoped>
.manageCustomerManagementList {
  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom",
      )
    );

    span {
      @include dialog-title($width: 2px);
      padding-bottom: 18px;
    }
  }

  .el-form {
    margin: 0 100px;
    border-bottom: 1px solid #ebeef5;

    /deep/.el-form-item {
      margin-bottom: 10px;
    }
  }
}
</style>