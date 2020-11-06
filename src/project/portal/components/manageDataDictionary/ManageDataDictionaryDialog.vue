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
        <el-form
          :model="dictionaryInfo"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="dictionaryForm"
        >
          <el-form-item :label="$t('management.dictionaryCategories')+'：' "  prop="type">
            <el-input v-model="dictionaryInfo.type" :disabled="typeStatus"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.dictionaryId')+'：'" prop="key">
            <el-input v-model="dictionaryInfo.key" :disabled="disableStatus"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.dictionaryName')+'：'" prop="name">
            <el-input v-model="dictionaryInfo.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.remarks')+'：'" prop="remark">
            <el-input type="textarea" v-model="dictionaryInfo.remark"></el-input>
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
  name: "ManageDataDictionaryDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.addDictionary");
      }
    },
    dictionaryInfo: {
      type: Object,
      default: () => {
        return {};
      }
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
    },
    dialogVisible(){
      if(this.dictionaryInfo.type){
        this.typeStatus=true;
      }
      else{
        this.typeStatus=false;
      }
    }
  },
  data() {
    var checkKey = (rule, value, callback) => {
      if (this.operate == "edit") {
        return callback();
      } 
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.errorsInVerifyingTheDictionaryId"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.pleaseEnterTheDictionaryId")
        },
        {
          name:"repeatValidator",
          errorMsg:this.$t("management.theDictionaryIdCannotBeRepeated"),
          api:this.$api.dictionaryFunApi.validparmkey,
          params:{
            id: this.dictionaryInfo.id,
          key: value
          }
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
     var checkName = (rule, value, callback) => {
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.errorsInVerifyingTheDictionaryId"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.pleaseEnterTheDictionaryName")
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    }; 
    var checkRemark = (rule, value, callback) => {
      if(value==null){
        value='';
      }
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.errorsInVerifyingTheDictionaryId"),
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
    var checkType=(rule, value, callback) => {
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t('management.Errorinverifyingthedictionarycategory'),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t('myCenter.Pleaseenterthedictionarycategory')
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
    return {
      typeStatus:true,
      disableStatus: false,
      formLabelWidth:"120px",
      rules: {
        key: [{ required: true, validator: checkKey, trigger: "blur" }],
        type: [{ required: true, validator: checkType, trigger: "blur" }],
        name: [
          {
            required: true,
            trigger: "blur",
            validator: checkName
          }
        ],
        remark: [
          {
            required: false,
            trigger: "blur",
            validator: checkRemark
          }
        ],
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.dictionaryForm.validate(valid => {
        if (valid) {
          this.$emit("save");
        } else {
          return false;
        }
      });
    },
    openDialog() {
      this.$refs.dictionaryForm.clearValidate();
    }
  },
  mounted(){
    //国际化样式处理
    if(this.$store.getters.language=='english'){
      this.formLabelWidth="160px";
    }
    else{
      this.formLabelWidth="120px";
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