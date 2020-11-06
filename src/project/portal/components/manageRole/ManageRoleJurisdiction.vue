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
        <el-form :model="jurisDictionInfo" :label-width="formLabelWidth" ref="jurisdicForm">
          <el-form-item :label="$t('management.roleName')+':'" prop="name">
            <el-input v-model="jurisDictionInfo.name" :disabled="disableStatus"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.selectPermissions')+':'" prop="checkedJurisdic">
            <!-- 复选 -->
            <div class="jurisdicBox">
              <el-checkbox
                class="checkAll"
                :indeterminate="isIndeterminate"
                v-model="checkAll"
                @change="handleCheckAllChange"
              >{{$t('management.selectAll')}}</el-checkbox>
              <el-checkbox-group v-model="checkedJurisdic" @change="handleCheckedCitiesChange">
                <el-checkbox
                  v-for="item in jurisdicAll"
                  :label="item.id"
                  :key="item.id"
                >{{item.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
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
  name: "ManageRoleJurisdiction",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.authorizeRolePermissions");
      }
    },
    jurisDictionInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    jurisdicAll: {
      type: Array,
      default: () => {
        return [];
      }
    },
    formLabelWidth: {
      type: String,
      default: "96px"
    }
  },
  data() {
    return {
      checkedJurisdic: [], //选中ID
      isIndeterminate: true,
      disableStatus: true,
      checkAll: false
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    //初始获取人员权限
    getHasConnectPermission(val) {
      this.$api.manageRoleApi
        .getHasConnectPermission(
          { roleId: val },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          this.checkedJurisdic = [];
          res.data.data.forEach(item => {
            this.checkedJurisdic.push(item.id);
          });
        });
    },
    save() {
      this.$refs.jurisdicForm.validate(valid => {
        if (valid) {
          this.$emit("jurisdicSave", this.checkedJurisdic);
        } else {
          return false;
        }
        this.checkedJurisdic = [];
        this.isIndeterminate = false;
      });
    },
    openDialog() {
      this.$refs.jurisdicForm.clearValidate();
    },
    //全选
    handleCheckAllChange(val) {
      let checkData = [];
      this.jurisdicAll.forEach(item => {
        checkData.push(item.id);
      });
      this.checkedJurisdic = val ? checkData : [];
      this.isIndeterminate = false;
    },
    //多选
    handleCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.jurisdicAll.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.jurisdicAll.length;
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
    padding: 0px 30px;
  }
  .jurisdicBox {
    height: 100%;
    width: 100%;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    max-height: 370px;
    .el-checkbox.checkAll {
      padding: 5px 20px 0;
    }
    .el-checkbox-group {
      padding: 20px;
      padding-top: 0;
    }
  }
}
</style>