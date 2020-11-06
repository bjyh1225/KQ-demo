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
          <span>{{$t('myCenter.NewFolder')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form
          :model="favoritesInfo"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="favoritesForm"
        >
          <el-form-item :label="$t('myCenter.FolderName')" prop="name">
            <el-input v-model="favoritesInfo.name" :disabled="disableStatus"></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.FolderCategory')" prop="codeKey">
            <el-select
              v-model="favoritesInfo.codeKey"
              :placeholder="$t('myCenter.PleaseSelectTheFolderCategory')"
              @change="selectChange"
            >
              <el-option
                v-for="item in favoritesTypeList"
                :key="item.codeKey"
                :label="item.name"
                :value="item.codeKey"
              ></el-option>
            </el-select>
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
  name: "ManageUserDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    favoritesInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    favoritesTypeList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    formLabelWidth: {
      type: String,
      default: "130px"
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
    var checkName = (rule, value, callback) => {
      if (
        this.favoritesInfo.parentId == "" ||
        this.favoritesInfo.parentId == undefined
      ) {
        return callback();
      }
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("myCenter.ErrorsInVerifyingTheFolderName"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("myCenter.PleaseEnterTheFolderName")
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
      
      this.$api.personalCenterCollectionApi
        .getFavoritesCategoryOnly({
          name: value,
          parentId: this.favoritesInfo.parentId
        })
        .then(res => {
          if (res.data.data) {
            callback();
          } else {
            callback(
              new Error(this.$t("myCenter.TheFolderNameCannotBeRepeated"))
            );
          }
        })
        .catch(() => {
          callback(
            new Error(this.$t("myCenter.ErrorsInVerifyingTheFolderName"))
          );
        });
    };
    return {
      disableStatus: false,
      rules: {
        codeKey: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectTheFolderCategory"),
            trigger: "change"
          }
        ],
        name: [{ required: true, validator: checkName, trigger: "blur" }]
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.favoritesForm.validate(valid => {
        if (valid) {
          this.$emit("save");
        } else {
          return false;
        }
      });
    },
    openDialog() {
      this.$refs.favoritesForm.clearValidate();
    },
    selectChange(val) {
      var info = this.favoritesTypeList.filter(item => item.codeKey == val);
      this.favoritesInfo.parentId = info[0].id;
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
  /deep/ .el-select {
    width: 100%;
  }
  .el-form {
    padding: 0px 100px;
  }
}
</style>