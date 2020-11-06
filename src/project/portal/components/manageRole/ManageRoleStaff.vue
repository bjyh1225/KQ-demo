<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1100px"
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
        <el-form :model="staffInfo" :label-width="formLabelWidth" ref="staffForm">
          <el-form-item :label="$t('management.roleName')+':'">
            <el-input v-model="staffInfo.name" :disabled="disableStatus"></el-input>
          </el-form-item>
          <el-row :gutter="20">
            <el-col :span="8">
              <!-- 维度选择 -->
              <manage-dept
                ref="manageDeptOrg"
                class="manage-dept-loading"
                @selectChange="selectChange"
                @handleNodeClick="handleNodeClick"
                :orgDimension="orgDimension"
                :deptList="deptList"
                :height="height"
              ></manage-dept>
            </el-col>
            <el-col :span="16">
              <!-- 穿梭框 -->
              <el-transfer
                v-model="Noauthorize"
                :data="authorize"
                :button-texts="[ $t('management.remove'),$t('management.authorize')]"
                :titles="[$t('management.personnelToBeAuthorized'), $t('management.personnelAuthorized')]"
                @change="handleChange"
              ></el-transfer>
            </el-col>
          </el-row>
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
import ManageDept from "components/common/manageDept/ManageDept";
export default {
  name: "ManageRoleStaff",
  components: { ManageDept },
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
    staffInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    roleStaffId: {
      type: Number,
      default: 1
    },
    formLabelWidth: {
      type: String,
      default: "84px"
    },

    operate: {
      type: String,
      default: "add"
    }
  },
  data() {
    return {
      deptList: [], //部门数据
      orgDimension: [],
      dimensionValue: "",
      disableStatus: true,
      authorize: [], //未授权
      Noauthorize: [], //已授权
      orgCode: "", //组织code
      staffData: "",
      record: [],
      height: 235
    };
  },
  methods: {
    handleChange(val, direction) {
      if (direction) {
        this.record.push(direction);
      }
      this.staffData = val;
    },
    handleClose() {
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.staffForm.validate(valid => {
        if (valid) {
          if (this.record.length <= 0 && this.Noauthorize.length <= 0) {
            this.$message({
              message: this.$t(
                "management.pleaseSelectThePersonnelToBeAuthorized"
              ),
              type: "warning"
            });
            return false;
          }
          this.$emit("staffSave", {
            staffDatas: this.staffData,
            orgCodes: this.orgCode
          });
          this.resetOrgDimension();
        } else {
          return false;
        }
      });
    },
    openDialog() {
      this.$refs.staffForm.clearValidate();
      this.$refs.manageDeptOrg.reset();
    },
    //维度改变
    selectChange(val) {
      this.dimensionValue = val;
      this.getDepByNameAndDimension();
    },
    //选中一个节点
    handleNodeClick(data) {
      this.authorize = [];
      this.orgCode = data.code;
      this.getHasNoConnectPerson(data);
      this.getHasConnectPerson();
    },
    //查询维度
    getOrgDimension() {
      this.resetOrgDimension();
      this.resetSearchInfo();
      this.$api.dictionaryApi
        .getOrgDimension({
          loadingTarget: ".manage-dept-loading",
          loadingText: this.$t("management.searchingOrganizations")
        })
        .then(res => {
          var data = res.data.data.rows;
          data.forEach(item => {
            this.orgDimension.push({ value: item.value, label: item.text });
          });
        })
        .catch(() => {});
    },
    //根据维度查询部门
    getDepByNameAndDimension() {
      this.resetSearchInfo();
      this.$api.manageOrganizationApi
        .getDepByNameAndDimension(
          { dimension: this.dimensionValue },
          {
            loadingTarget: ".manage-dept-loading",
            loadingText: this.$t("management.searchingOrganizations")
          }
        )
        .then(res => {
          var data = res.data.data;
          this.deptList = data;
        })
        .catch(() => {});
    },
    //重置维度数据
    resetOrgDimension() {
      this.dimensionValue = "";
      this.orgDimension = [];
      this.deptList = [];
    },
    //重置用户数据
    resetSearchInfo() {
      this.authorize = [];
      this.Noauthorize = [];
    },
    //根据维度查询机构和职位
    getOrgAndPostList() {
      this.$api.manageUserApi
        .getOrgAndPostList({ dimension: this.dimensionValue })
        .then()
        .catch(() => {});
    },
    //未授权人员
    getHasNoConnectPerson(data) {
      this.$api.manageRoleApi
        .getHasNoConnectPerson(
          { orgCode: this.orgCode, isCascade: true },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          this.authorize = [];
          if (res.data.status == 200) {
            var newArray = [];
            res.data.data.forEach(item => {
              // 同一人员去重
              if (newArray.indexOf(item.id) == -1) {
                newArray.push(item);
                // 不同人员相同名字;
                if (this.authorize.indexOf(item.name) == 0) {
                  item.name = item.name + "(" + data.text + ")";
                }
              }
            });
            newArray.forEach(Element => {
              this.authorize.push({
                label: Element.name,
                key: Element.id
              });
            });
          }
        })
        .catch(() => {});
    },
    //已授权人员
    getHasConnectPerson() {
      this.$api.manageRoleApi
        .getHasConnectPerson(
          {
            orgCode: this.orgCode,
            roleId: this.roleStaffId,
            isCascade: true
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          this.Noauthorize = [];
          if (res.data.status == 200) {
            res.data.data.forEach(item => {
              this.Noauthorize.push(item.id);
            });
          }
        })
        .catch(() => {});
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
  /deep/.el-form {
    padding: 10px 40px;
    .el-row {
      .el-transfer {
        .el-transfer-panel {
          width: 228px;
          .el-transfer-panel__body {
            height: 246px;
            overflow-x: hidden;
            overflow-y: auto;
            .el-checkbox {
              display: block;
            }
          }
          .el-transfer-panel__header {
            .el-checkbox__label {
              font-size: 14px;
            }
          }
        }
        .el-transfer__buttons {
          .el-button + .el-button {
            margin-left: 0px;
          }
          .el-button [class*="el-icon-"] + span {
            margin-left: 0px;
          }
          .el-button--primary.is-disabled {
            @include base-bg-color();
            @include base-active-underline();
          }
        }
      }
    }
  }
  .user-dept {
    height: 288px;
  }
  .el-transfer__buttons {
    position: relative;
  }
  /deep/.el-transfer__button:first-child {
    position: absolute;
    top: 170px;
  }
}
</style>