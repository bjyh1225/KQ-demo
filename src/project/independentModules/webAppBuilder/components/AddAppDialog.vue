<template>
  <div class="layer-manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="700px"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :custom-class="'layer-cataloguer-dialog-pop'"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{addAppDialogTitle}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <personal-center-app-public-form
          :registerInfo="addAppInfo"
          ref="appPublicForm"
          :distinguishAppBuilder="'appbuilder'"
          :classMark="true"
        ></personal-center-app-public-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="app-builder-btn" @click="save">{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PersonalCenterAppPublicForm from "portal/components/personalCenterApp/PersonalCenterAppPublicForm";
export default {
  name: "AddAppDialog",
  components: {
    PersonalCenterAppPublicForm
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    addAppInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    addAppDialogTitle: {
      type: String,
      default() {
        return this.$t("webAppBuilder.NewApp");
      }
    }
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$refs.appPublicForm.clearValidate();
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.appPublicForm.checkData(() => {
        this.$emit("save");
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.layer-manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-title {
    padding-bottom: 20px;
    border-bottom: 1px solid #ebeef5;
    span {
      padding-bottom: 18px;
    }
  }
  .dialog-body {
    border-bottom: 1px solid #ebeef5;
  }
  .el-slider {
    width: 50%;
  }
}
</style>

