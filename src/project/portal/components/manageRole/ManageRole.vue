<template>
  <div>
    <manage-template
      :tableData="roleList"
      :tableCol="tableCol"
      :isLeft="isLeft"
      :leftSpan="leftSpan"
      :rightSpan="rightSpan"
      :rightBtnSpan="16"
      :rightSearchSpan="8"
      @edit="edit"
      @deleteById="deleteById"
      @selectionChange="selectionChange"
      @search="search"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :pageSize="pageSize"
      :pageIndex="pageIndex"
    >
      <template slot="rightBtn">
        <el-button type="primary base-btn" icon="el-icon-plus" @click="add">{{$t('management.add')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-delete"
          @click="deleteBatch"
        >{{$t('management.deleteInBatch')}}</el-button>
      </template>
      <template slot="tableOperate">
        <el-table-column prop="cz" :label="$t('management.operate')" width="120px">
          <template slot-scope="scope">
            <el-dropdown class="switch-operate" @command="operateCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-portal-more el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="edit" :info="scope.row">{{$t('myCenter.Edit')}}</el-dropdown-item>
                <el-dropdown-item
                  command="staff"
                  :info="scope.row"
                >{{$t('management.correlateWithUser')}}</el-dropdown-item>
                <el-dropdown-item
                  command="jurisdiction"
                  :info="scope.row"
                >{{$t('management.correlateWithPermission')}}</el-dropdown-item>
                <el-dropdown-item command="delete" :info="scope.row">{{$t('management.delete')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </template>
    </manage-template>
    <manage-role-dialog
      :dialogTitle="dialogTitle"
      :dialogVisible="dialogVisible"
      :roleInfo="roleInfo"
      :operate="operate"
      @dialogClose="dialogClose"
      @save="save"
    ></manage-role-dialog>
    <manage-role-jurisdiction
      :dialogVisible="jurisdicDialogVisible"
      :dialogTitle="jurisdicDialogTitle"
      :jurisDictionInfo="jurisDictionInfo"
      @dialogClose="dialogClose"
      @jurisdicSave="jurisdicSave"
      :jurisdicAll="jurisdicAll"
      ref="jurisdictionFun"
      :roleJurisdiction="roleJurisdiction"
    ></manage-role-jurisdiction>
    <manage-role-staff
      :dialogVisible="staffDialogVisible"
      :dialogTitle="staffDialogTitle"
      @dialogClose="dialogClose"
      @staffSave="staffSave"
      ref="staffFun"
      :roleStaffId="roleStaffId"
      :staffInfo="staffInfo"
    ></manage-role-staff>
  </div>
</template>

<script>
import ManageTemplate from "components/template/ManageTemplate";
import ManageRoleDialog from "components/manageRole/ManageRoleDialog";
import ManageRoleJurisdiction from "components/manageRole/ManageRoleJurisdiction";
import ManageRoleStaff from "components/manageRole/ManageRoleStaff";
export default {
  name: "ManageRole",
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ManageTemplate,
    ManageRoleDialog,
    ManageRoleJurisdiction,
    ManageRoleStaff
  },
  data() {
    return {
      dialogVisible: false, //弹出窗显示
      jurisdicDialogVisible: false,
      staffDialogVisible: false,
      roleInfo: {
        code: "",
        name: "",
        describe: ""
      }, //一条记录
      operate: "add", //弹出窗操作状态
      selectList: [], //当前选中的list
      roleList: [], //全部列表
      pageIndex: 1, //分页信息
      pageSize: 10,
      total: 0,
      searchKey: "",
      dialogTitle: this.$t("management.addRoles"),
      jurisdicDialogTitle: this.$t("management.authorizeRolePermissions"),
      staffDialogTitle: this.$t("management.correlateWithUser"),
      isLeft: false,
      leftSpan: 0,
      rightSpan: 24,
      tableCol: [
        {
          prop: "code",
          label: this.$t("management.roleCode"),
          minWidth: "15%"
        },
        {
          prop: "name",
          label: this.$t("management.roleName"),
          minWidth: "15%"
        },
        {
          prop: "describe",
          label: this.$t("management.remarks"),
          minWidth: "15%"
        },
        {
          prop: "createTime",
          label: this.$t("management.creationTime"),
          minWidth: "15%"
        }
      ],
      jurisDictionInfo: {
        name: ""
      },
      staffInfo: {
        name: ""
      },
      roleJurisdiction: [], //初始人员权限
      jurisdicAll: [], //所有权限
      jurisdicData: "", //一对多选择权限的ID
      roleId: 0,
      roleStaffId: 0
    };
  },
  watch: {
    currentTabShowStatus:{
        immediate: true, // immediate选项可以开启首次赋值监听
        handler(newVal, oldVal) {
            if(newVal){
              this.getRolesByPage();
            }
        }
    }
  },
  methods: {
    deleteById(row) {
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          this.$api.manageRoleApi
            .deleteById(
              { ids: row.id },
              { loadingText: this.$t("management.deleting") }
            )
            .then(() => {
              this.$message({
                message: this.$t("management.succeeded"),
                type: "success"
              });
              this.getRolesByPage();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    edit(row) {
      this.$api.manageRoleApi
        .getRolesByIds(
          { roleIds: row.id },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.data.data.length > 0) {
            this.roleInfo = res.data.data[0];
            this.dialogTitle = this.$t("management.editRole");
            this.operate = "edit";
            this.dialogVisible = true;
          } else {
            this.$message({
              message: this.$t("management.theCurrentDataNoLongerExists"),
              type: "error"
            });
          }
        })
        .catch(() => {});
    },
    dialogClose() {
      //对话框关闭
      this.dialogVisible = false;
      this.jurisdicDialogVisible = false;
      this.staffDialogVisible = false;
    },
    add() {
      this.dialogTitle = this.$t("management.addRoles");
      this.operate = "add";
      this.resetRoleInfo();
      this.dialogVisible = true;
    },
    save() {
      this.$api.manageRoleApi
        .save(this.roleInfo, { loadingText: this.$t("myCenter.Saving") })
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
          this.dialogClose();
          this.getRolesByPage();
        })
        .catch(() => {});
    },
    getRolesByPage(status) {
      var params = {};
      if (status) {
        params = {
          roleName: this.searchKey,
          pageIndex: 1,
          pageSize: this.pageSize
        };
      } else {
        params = {
          roleName: this.searchKey,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
      }
      this.$api.manageRoleApi
        .getRolesByPage(params, { loadingText: this.$t("service.searching") })
        .then(res => {
          var data = res.data.data;
          this.roleList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    deleteBatch() {
      if (this.selectList.length == 0) {
        this.$message({
          message: this.$t("management.pleaseSelectDataToDelete"),
          type: "warning"
        });
        return false;
      } else {
        this.$confirm(this.$t("management.confirmToDelete") + "?")
          .then(() => {
            var idList = [];
            this.selectList.forEach(function(value) {
              idList.push(value.id);
            });
            var ids = idList.toString();
            this.$api.manageRoleApi
              .deleteById(
                { ids: ids },
                { loadingText: this.$t("management.deleting") }
              )
              .then(() => {
                this.$message({
                  message: this.$t("management.succeeded"),
                  type: "success"
                });
                this.getRolesByPage();
              })
              .catch(() => {});
          })
          .catch(() => {});
      }
    },
    selectionChange(val) {
      this.selectList = val;
    },
    resetRoleInfo() {
      //重置记录
      this.roleInfo = {
        code: "",
        name: "",
        describe: ""
      };
    },
    search(searchKey) {
      this.searchKey = searchKey;
      this.getRolesByPage("search");
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getRolesByPage();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getRolesByPage();
    },
    operateCommand(command, $item) {
      switch (command) {
        case "edit":
          this.edit($item.$attrs.info);
          break;
        case "delete":
          this.deleteById($item.$attrs.info);
          break;
        default:
          break;
        case "jurisdiction":
          this.jurisdiction($item.$attrs.info);
          break;
        case "staff":
          this.staff($item.$attrs.info);
          break;
      }
    },
    //角色权限确定
    jurisdicSave(val) {
      this.dialogClose();
      this.jurisdicData = val.join(",");
      this.$api.manageRoleApi
        .saveRolePermissionByIds(
          {
            roleId: this.roleId,
            permissionIds: this.jurisdicData
          },
          { loadingText: this.$t("management.correlatingRoleWithPermission") }
        )
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              message: this.$t("management.succeeded"),
              type: "success"
            });
          }
        })
        .catch(() => {});
    },
    //初始获取所有权限
    getAllPermission() {
      this.$api.manageRoleApi
        .getAllPermission({ loadingText: this.$t("service.searching") })
        .then(res => {
          if (res.data.status == 200) {
            this.jurisdicDialogVisible = true;
            this.jurisdicAll = res.data.data;
          }
        })
        .catch(() => {});
    },

    //人员权限
    jurisdiction(row) {
      this.roleId = row.id;
      this.jurisDictionInfo = row;
      this.$refs.jurisdictionFun.getHasConnectPermission(this.roleId);
      this.getAllPermission();
    },
    //角色人员确定
    staffSave(val) {
      this.dialogClose();
      this.saveRolePersonnel(val);
    },
    staff(row) {
      this.roleStaffId = row.id;
      this.staffDialogVisible = true;
      this.staffInfo = row;
      this.$refs.staffFun.resetOrgDimension();
      this.$refs.staffFun.getOrgDimension();
    },
    saveRolePersonnel(val) {
      var params = [];
      if (val.staffDatas.length == 0) {
        var obj = {
          roleId: this.roleStaffId,
          orgCode: val.orgCodes,
          isCascade: false
        };
        params.push(obj);
      } else {
        val.staffDatas.forEach(item => {
          var obj = {
            personnelId: Number(item),
            roleId: this.roleStaffId,
            orgCode: val.orgCodes,
            isCascade: false
          };
          params.push(obj);
        });
      }
      this.$api.manageRoleApi
        .saveRolePersonnel(
          { list: JSON.stringify(params) },
          { loadingText: this.$t("management.correlatingRoleWithPersonnel") }
        )
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              message: this.$t("management.successfulCorrelation"),
              type: "success"
            });
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang='scss' scoped>
.switch-operate {
  cursor: pointer;
}
</style>