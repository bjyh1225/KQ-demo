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
          :model="dictionaryItemInfo"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="dictionaryForm"
        >
          <el-form-item :label="$t('management.dictionaryName')+'：'">
            <el-input v-model="dictionaryItemInfo.dicName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.dictionaryReferenceCode')+'：'" prop="value">
            <el-input v-model="dictionaryItemInfo.value"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.dictionaryReferenceValue')+'：'" prop="text">
            <el-input v-model="dictionaryItemInfo.text"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.rankId')+'：'">
            <el-input-number v-model="dictionaryItemInfo.sortNo" :min="1" :max="20"></el-input-number>
          </el-form-item>
          <el-form-item :label="$t('management.remarks')+'：'" prop="remark">
            <el-input type="textarea" v-model="dictionaryItemInfo.remark"></el-input>
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
  name: "ManageDataDictionaryItemDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.addDictionaryItem");
      }
    },
    dictionaryItemInfo: {
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
    }
  },
  data() {
    var checkValue = (rule, value, callback) => {
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.errorsInVerifyingTheDictionaryReferenceCode"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.pleaseEnterTheDictionaryReferenceCode")
        },
        {
          name:"repeatValidator",
          errorMsg:this.$t("management.theDictionaryReferenceCodeCannotBeRepeated"),
          api:this.$api.dictionaryFunApi.validaDictionaryItemValue,
          params:{
            id: this.dictionaryItemInfo.id,
          value: value,
          dicKey: this.dictionaryItemInfo.dicKey
          }
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
    var checkText = (rule, value, callback) => {
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.errorsInVerifyingTheDictionaryReferenceCode"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t(
              "management.pleaseEnterTheDictionaryReferenceValue"
            )
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
      var checkRemark = (rule, value, callback) => {
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
    return {
      disableStatus: false,
      formLabelWidth:"120px",
      rules: {
        value: [{ required: true, validator: checkValue, trigger: "blur" }],
        text: [
          {
            required: true,
            trigger: "blur",
            validator: checkText
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