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
          <span>{{dialogTitle}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form :model="roleInfo" :label-width="formLabelWidth" :rules="rules" ref="roleForm">
          <el-form-item :label="$t('management.roleCode')+':'" prop="code">
            <el-input v-model="roleInfo.code" :disabled="disableStatus"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.roleName')+':'" prop="name">
            <el-input v-model="roleInfo.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.roleDescription')+':'" prop="describe">
            <el-input v-model="roleInfo.describe" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="base-btn" @mousedown.native="save">{{$t('management.ok')}}</el-button>
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
        return this.$t("management.addRoles");
      }
    },
    roleInfo: {
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
    var checkRoleCode = (rule, value, callback) => {
      if (this.operate == "edit") {
        return callback();
      }
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.errorsInVerifyingTheRoleCode"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.pleaseEnterTheRoleCode")
        },
        {
          name:"repeatValidator",
          errorMsg:this.$t("management.theRoleCodeMustBeUnique"),
          api:this.$api.manageRoleApi.validateCode,
          params:{
            code:value
          }
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
    var checkRoleName = (rule, value, callback) => {
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingtherolename"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.pleaseEnterTheRoleName")
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
    var checkRoleDescribe = (rule, value, callback) => {
      if(value==null){
        value='';
      }
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingtheroledescription"),
        value:value,
        callback:callback
      });
      rules.execute([
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
        code: [{ required: true, validator: checkRoleCode, trigger: "blur" }],
        name: [
          {
            required: true,
            trigger: "blur",
            validator: checkRoleName
          }
        ],
        describe:[{
            required: false,
            trigger: "blur",
            validator: checkRoleDescribe
          }]
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.roleForm.validate(valid => {
        if (valid) {
          this.$emit("save");
        } else {
          return false;
        }
      });
    },
    openDialog() {
      this.$refs.roleForm.clearValidate();
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