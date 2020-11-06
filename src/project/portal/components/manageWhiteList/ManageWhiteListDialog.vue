<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      @opened="openDialog"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('management.NewWhitelist')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form
          :model="dictionaryInfo"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="dictionaryForm"
        >
          <el-form-item :label="$t('management.Path')" prop="path">
            <el-input v-model="dictionaryInfo.path"></el-input>
          </el-form-item>
          <el-form-item :label="$t('webAppBuilder.Service')" prop="server">
            <el-input v-model="dictionaryInfo.server"></el-input>
          </el-form-item>
          <el-form-item :label="$t('service.description')" prop="details">
            <el-input v-model="dictionaryInfo.details"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="base-btn" @click="save">{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "ManageWhiteListDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dictionaryInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    var validatePass = (rule, value, callback) => {
      var addVerification = /^\/.*$/;
      if (!addVerification.test(value)) {
        callback(
          new Error(this.$t("management.ThePathOfWhitelistIsIncorrectInFormat"))
        );
      } else {
        callback();
      }
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingthepath"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.PleaseEnterThePathOfWhitelist")
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
     var validateServer = (rule, value, callback) => {
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingtheservice"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.PleaseEnterTheServicesOfWhitelist")
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
     var validateDetails = (rule, value, callback) => {
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingthedescription"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.PleaseEnterTheDescriptionOfWhitelist")
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t('management.Theinputcharactersmustbelessthan80'),
          maxFieldLength:80
        }
      ])
    };
    return {
      formLabelWidth: "100px",
      rules: {
        path: [
          {
            required: true,
            trigger: "blur",
            validator: validatePass
          }
        ],
        server: [
          {
            required: true,
            trigger: "blur",
            validator: validateServer
          }
        ],
        details: [
          {
            required: true,
            trigger: "blur",
            validator: validateDetails
          }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
      this.$emit("empty");
    },
    openDialog() {
      this.$refs.dictionaryForm.clearValidate();
    },
    //确定
    save() {
      this.$refs.dictionaryForm.validate(valid => {
        if (valid) {
          this.$emit("save");
        } else {
          return false;
        }
      });
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
    padding: 0px 100px;
  }
}
</style>