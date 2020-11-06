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
        <el-form :model="verifyInfo" :label-width="formLabelWidth" ref="verifyForm" :rules="rules">
          <el-row v-show="operate=='single'">
            <el-col :span="12">
              <el-form-item :label="$t('management.Applicant')+'：'">{{verifyInfo.CREATENAME}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('management.ApplicationTime')+'：'">{{verifyInfo.C_CREATE_TIME}}</el-form-item>
            </el-col>
          </el-row>
          <el-form-item :label="$t('management.ApplicationReason')+'：'" v-show="operate=='single'">
            <el-input
              v-model="verifyInfo.C_CREATE_COMMENT"
              type="textarea"
              :disabled="true"
              :rows="5"
            ></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.ReviewOpinion')+'：'" prop="C_AUDIT_COMMENT">
            <el-input v-model="verifyInfo.C_AUDIT_COMMENT" type="textarea" :rows="5"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-btn" @click="save(1)">{{$t('management.Approve')}}</el-button>
        <el-button type="primary" class="base-btn-del" @click="save(2)">{{$t('management.Reject')}}</el-button>
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
        return this.$t("management.Review");
      }
    },
    verifyInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formLabelWidth: {
      type: String,
      default: "120px"
    },
    operate: {
      type: String,
      default: "add"
    }
  },
  watch: {
    operate() {
      if (this.operate == "edit") {
        this.disableStatus = true;
      } else {
        this.disableStatus = false;
      }
    }
  },
  data() {
        var checkMyVerifyComment = (rule, value, callback) => {
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t('management.Errorinverifyingthereviewopinion'),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.PleaseEnterYourReviewOpinion")
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t('management.Theinputcharactersmustbelessthan80'),
          maxFieldLength:80
        }
      ])
    };
    return {
      disableStatus: false,
      rules: {
        C_AUDIT_COMMENT: [
          {
            required: true,
            trigger: "blur",
            validator: checkMyVerifyComment
          }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.verifyForm.clearValidate();
      this.$emit("dialogClose");
      this.verifyInfo.C_AUDIT_COMMENT='';
    },
    save(type) {
      this.$refs.verifyForm.validate(valid => {
        if (valid) {
          this.$emit("save", type);
        } else {
          return false;
        }
      });
    }
    // openDialog() {
    //   this.$refs.verifyForm.clearValidate();
    // }
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