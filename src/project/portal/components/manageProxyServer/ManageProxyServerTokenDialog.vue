<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('management.TokenManagement')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <manage-proxy-server-token :initTask="initTask" :serverHttpInfo="serverHttpInfo"></manage-proxy-server-token>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import ManageProxyServerToken from "./ManageProxyServerToken";
export default {
  name: "ManageProxyServerTokenDialog",
  components: {
    ManageProxyServerToken,
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    serverInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    serverHttpInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.$nextTick(() => {
          this.initTask = new Date();
        });
      }
    },
  },
  data() {
    return {
      initTask: 0,
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  // .dialog-body {
  //   @include manage-border(
  //     $types: (
  //       "bottom"
  //     )
  //   );
  // }
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
  /deep/ .el-cascader {
    width: 100%;
  }
  .el-form {
    padding: 0px 100px;
    /deep/ .el-select {
      width: 100%;
    }
  }
}
</style>