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
          <span>{{$t('management.addDepartment')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form :model="deptInfo" :label-width="formLabelWidth" :rules="rules" ref="deptForm">
          <el-form-item :label="$t('management.upperOrganization')+':'">
            <el-input v-model="deptInfo.parentText" disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.organizationCode')+':'" prop="code">
            <el-input v-model="deptInfo.code"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.organizationName')+':'" prop="name">
            <el-input v-model="deptInfo.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.rankId')+':'">
            <el-input-number v-model="deptInfo.sortNo" :min="0" :max="10"></el-input-number>
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
    deptInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.deptForm.validate(valid => {
        if (valid) {
          this.$emit("save");
        } else {
          return false;
        }
      });
    },
    openDialog() {
      this.$refs.deptForm.clearValidate();
    }
  },
  data() {
    var checkDeptCode = (rule, value, callback) => {
      if (this.operate == "edit") {
        callback();
      } else {
        if (!value) {
          return callback(
            new Error(this.$t("management.pleaseEnterTheOrganizationCode"))
          );
        }
        this.$api.manageOrganizationApi
          .validateCode({ code: value, dimension: this.deptInfo.dimension })
          .then(res => {
            if (res.data.data) {
              callback();
            } else {
              callback(
                new Error(
                  this.$t("management.theOrganizationCodeCannotBeRepeated")
                )
              );
            }
          })
          .catch(() => {
            callback(
              new Error(
                this.$t("management.errorsInVerifyingTheOrganizationCode")
              )
            );
          });
      }
    }
    return {
      formLabelWidth: "100px",
      rules: {
        code: [{ required: true, validator: checkDeptCode, trigger: "blur" }],
        name: [
          {
            required: true,
            message: this.$t("management.pleaseEnterTheOrganizationName"),
            trigger: "blur"
          }
        ]
      }
    }
  },
  mounted(){
    //国际化样式处理
    if(this.$store.getters.language=='english'){
      this.formLabelWidth="140px";
    }
    else{
      this.formLabelWidth="100px";
    }
  }
}
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