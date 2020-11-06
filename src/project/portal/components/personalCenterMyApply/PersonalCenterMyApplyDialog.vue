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
          <span>{{dialogTitle}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form :model="applyInfo" :label-width="formLabelWidth" ref="verifyForm">
          <el-row>
            <el-col :span="12">
              <el-form-item
                :label="$t('management.ApplicationTime')+'：'"
              >{{applyInfo.C_CREATE_TIME}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item
                :label="$t('management.ReviewTime')+'：'"
                v-if="applyInfo.C_AUDIT_SCOPE!=4"
              >{{applyInfo.C_AUDIT_TIME}}</el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="$t('management.ApplicationReason')+'：'">
            <el-input
              v-model="applyInfo.C_CREATE_COMMENT"
              type="textarea"
              :disabled="true"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item
                :label="$t('management.ReviewStatus')+'：'"
              >{{renderScope[applyInfo.C_AUDIT_SCOPE]}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('management.Reviewer')+'：'">{{applyInfo.AUDITACTUALNAME}}</el-form-item>
            </el-col>
          </el-row>
          <el-form-item
            :label="$t('management.ReviewOpinion')+'：'"
            prop="C_AUDIT_COMMENT"
            v-if="applyInfo.C_AUDIT_SCOPE!=4"
          >
            <el-input
              v-model="applyInfo.C_AUDIT_COMMENT"
              type="textarea"
              :disabled="true"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.Expiryreason')+'：'" v-else>
            <el-input v-model="reason" type="textarea" :disabled="true" :rows="5"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('webAppBuilder.Close')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ManageUserDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("webAppBuilder.ApplicationDetails");
      }
    },
    applyInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formLabelWidth: {
      type: String,
      default: "120px"
    }
  },
  data() {
    return {
      disableStatus: false,
      renderScope: {
        "0": this.$t("management.ToBeReviewed"),
        "1": this.$t("management.Pass"),
        "2": this.$t("management.Reject"),
        "4": this.$t("myCenter.Expired")
      },
      reason: `
      1、${this.$t("myCenter.Theresourcemayhavebeendeleted")}。
      2、${this.$t("myCenter.Nopermissionstoapplyforit")}。
      3、${this.$t("myCenter.Browseitdirectlywithoutanapplication")}。
      `
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    }
  }
};
</script>

<style lang='scss' scoped>
.manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-body {
    @include manage-border(
      $types: (
        "bottom"
      )
    );
  }
  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom"
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
    padding: 0px 10px;
  }
}
</style>