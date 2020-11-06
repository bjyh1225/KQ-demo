<template>
  <div>
    <manage-template
      :tableData="userList"
      :tableCol="tableCol"
      @edit="edit"
      @search="search"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @deleteById="deleteById"
      @selectionChange="selectionChange"
      :total="total"
      :pageSize="pageSize"
      :pageIndex="pageIndex"
      ref="manageTemplate"
    >
      <template slot="left">
        <div class="dept">
          <manage-dept
            ref="manageDeptOrg"
            class="manage-dept-loading"
            @selectChange="selectChange"
            @handleNodeClick="handleNodeClick"
            :orgDimension="orgDimension"
            :deptList="deptList"
            @acquisition="acquisition"
            :acquisitionFlag="true"
          ></manage-dept>
        </div>
      </template>
      <template slot="rightBtn">
        <el-button type="primary base-btn" icon="el-icon-plus" @click="add">{{$t('management.add')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-delete"
          @click="deleteBatch"
        >{{$t('management.deleteInBatch')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-portal-zhuanyi"
          @click="mobileSector"
        >{{$t('management.MoveToDepartment')}}</el-button>
      </template>
      <template slot="rightMiddle">
        <el-table :data="userList" border @selection-change="selectionChange">
          <el-table-column type="selection" min-width="5%"></el-table-column>
          <el-table-column :label="$t('management.name')" min-width="10%">
            <template slot-scope="scope">
              <i class="el-icon-portal-qunzhu" v-show="scope.row.C_IS_LEADER"></i>
              <span style="margin-left: 10px">{{ scope.row.C_NAME }}</span>
            </template>
          </el-table-column>
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :min-width="item.minWidth"
            v-for="(item,ix) in tableCol"
            :key="ix"
          ></el-table-column>
          <el-table-column prop="cz" :label="$t('management.state')" min-width="10%">
            <template slot-scope="scope">
              <span v-if="scope.row.C_STATUS">{{$t('management.normal')}}</span>
              <span class="stop-status" v-else>{{$t('management.disabled')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="cz" :label="$t('management.operate')" width="100px">
            <template slot-scope="scope">
              <el-dropdown class="switch-operate" @command="operateCommand">
                <span class="el-dropdown-link">
                  <i class="el-icon-portal-more el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    command="editStatus"
                    :info="{row:scope.row,status:false}"
                    v-if="scope.row.C_STATUS"
                  >{{$t('management.disabled')}}</el-dropdown-item>
                  <el-dropdown-item
                    command="editStatus"
                    :info="{row:scope.row,status:true}"
                    v-else
                  >{{$t('management.enabled')}}</el-dropdown-item>
                  <el-dropdown-item
                    command="resetPassword"
                    :info="{row:scope.row,status:true}"
                  >{{$t('management.ResetPassword')}}</el-dropdown-item>
                  <el-dropdown-item
                    command="deleteById"
                    :info="scope.row"
                  >{{$t('management.delete')}}</el-dropdown-item>
                  <el-dropdown-item
                    command="editAdministrators"
                    :info="{row:scope.row,status:false}"
                    v-if="scope.row.C_IS_LEADER"
                  >{{$t('management.CancelDepartmentAdministrator')}}</el-dropdown-item>
                  <el-dropdown-item
                    command="editAdministrators"
                    :info="{row:scope.row,status:true}"
                    v-else
                  >{{$t('management.SetAsDepartmentAdministrator')}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </manage-template>
    <manage-user-dialog
      :dialogVisible="dialogVisible"
      @dialogClose="dialogClose"
      :orgAndPostList="orgAndPostList"
      :userInfo="userInfo"
      @save="save"
    ></manage-user-dialog>
    <manage-user-mobile-dialog
      :mobileDialogVisible="mobileDialogVisible"
      @mobile="mobile"
      @mobileDialogClose="mobileDialogClose"
    ></manage-user-mobile-dialog>
  </div>
</template>

<script>
import ManageTemplate from "components/template/ManageTemplate";
import ManageDept from "components/common/manageDept/ManageDept";
import ManageUserDialog from "components/manageUser/ManageUserDialog";
import ManageUserMobileDialog from "components/manageUser/ManageUserMobileDialog";
import { getTree } from "@/utils/getTree.js";
export default {
  name: "Test",
  components: {
    ManageTemplate,
    ManageDept,
    ManageUserDialog,
    ManageUserMobileDialog,
  },
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal) {
        if (newVal) {
          this.$nextTick(() => {
            this.$refs.manageDeptOrg.reset();
          });
          this.getOrgDimension();
        }
      },
    },
  },
  methods: {
    operateCommand(command, $item) {
      switch (command) {
        case "editStatus":
          this.editStatus($item.$attrs.info.row, $item.$attrs.info.status);
          break;
        case "delete":
          this.deleteById($item.$attrs.info.row, $item.$attrs.info.status);
          break;
        default:
          break;
        case "resetPassword":
          this.resetPassword($item.$attrs.info.row, $item.$attrs.info.status);
          break;
        case "deleteById":
          this.deleteById($item.$attrs.info);
          break;
        case "editAdministrators":
          this.editAdministrators(
            $item.$attrs.info.row,
            $item.$attrs.info.status
          );
          break;
      }
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    // 树  勾选子节点
    acquisition(val) {
      this.isCascade = val;
      this.searchInfo.isCascade = val;
      this.$api.manageUserApi
        .getPageList(this.searchInfo, {
          loadingText: this.$t("service.searching"),
        })
        .then((res) => {
          var data = res.data.data;
          this.userList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    // 密码重置
    resetPassword(val) {
      if (val.C_ID == this.$store.getters.userInfo.id) {
        this.$confirm(
          this.$t(
            "management.YouNeedToReLoginAfterModifyingYourPasswordAreYouSureToContinue"
          ),
          this.$t("webAppBuilder.Tip"),
          {
            confirmButtonText: this.$t("myCenter.Sure"),
            cancelButtonText: this.$t("myCenter.cancel"),
            type: "warning",
          }
        )
          .then(() => {
            this.$api.manageUserApi
              .resetPassword({ id: val.C_ID })
              .then((res) => {
                if (res.status) {
                  this.$message({
                    message: this.$t("management.PasswordResetSuccessfully"),
                    type: "success",
                  });
                  window.openPortalLoginDialog();
                }
              })
              .catch(() => {});
          })
          .catch(() => {});
      } else {
        this.$confirm(this.$t("management.AreYouSureToReseYourPassword") + "?")
          .then(() => {
            this.$api.manageUserApi
              .resetPassword({ id: val.C_ID })
              .then((res) => {
                if (res.status) {
                  this.$message({
                    message: this.$t("management.PasswordResetSuccessfully"),
                    type: "success",
                  });
                }
              })
              .catch(() => {});
          })
          .catch(() => {});
      }
    },
    // 移动部门
    mobileSector() {
      if (this.selectList.length == 0) {
        this.$message({
          message: this.$t("management.PleaseSelectAUserToMove"),
          type: "warning",
        });
        return false;
      } else {
        this.mobileDialogVisible = true;
      }
    },
    mobile(val) {
      var idsArray = [];
      this.selectList.forEach(function (value) {
        idsArray.push(value.C_ID);
      });
      var ids = idsArray.toString();
      this.$api.manageUserApi
        .movePersonnel({ ids: ids, orgId: val })
        .then((res) => {
          if (res.status) {
            this.$message({
              message: this.$t("management.MovedSuccessfully"),
              type: "success",
            });
            this.getUserList();
          }
        })
        .catch(() => {});
    },
    mobileDialogClose() {
      this.mobileDialogVisible = false;
    },
    add() {
      if (!this.dimensionValue) {
        this.$message({
          message: this.$t(
            "management.Pleaseselectdimensiontoperformaddoperation"
          ),
          type: "warning",
        });
        return false;
      }
      this.getOrgAndPostList();
      this.resetUserInfo();
      this.dialogTitle = this.$t("management.addUser");
      this.dialogVisible = true;
    },
    edit(row) {
      this.$api.manageUserApi
        .getPersonnelById(
          { id: row.C_ID },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          if (res.data.data) {
            this.userInfo = res.data.data;
            this.dialogTitle = this.$t("management.Edituser");
            this.dialogVisible = true;
          } else {
            this.$message({
              message: this.$t("management.theCurrentDataNoLongerExists"),
              type: "warning",
            });
          }
        })
        .catch(() => {});
    },
    save(headImg) {
      this.userInfo.dimension = this.dimensionValue;
      this.userInfo.headImg = headImg;
      this.$api.manageUserApi
        .save(this.userInfo, { loadingText: this.$t("myCenter.Saving") })
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success",
          });
          this.dialogClose();
          this.getUserList("system");
        })
        .catch(() => {});
    },
    //修改状态
    editStatus(row, status) {
      if (row.C_ID == this.$store.getters.userInfo.id) {
        this.$confirm(
          this.$t(
            "management.YouNeedToReLoginAfterModifyingYouAppointmentAreYouSureToContinue"
          ),
          this.$t("webAppBuilder.Tip"),
          {
            confirmButtonText: this.$t("myCenter.Sure"),
            cancelButtonText: this.$t("myCenter.cancel"),
            type: "warning",
          }
        )
          .then(() => {
            this.$api.manageUserApi
              .updateStatus(
                { id: row.C_ID, status: status },
                { loadingText: this.$t("management.Modifyingstatus") }
              )
              .then(() => {
                this.$message({
                  message: this.$t("management.Statusmodificationsucceeded"),
                  type: "success",
                });
                this.getUserList();
                window.openPortalLoginDialog();
              })
              .catch(() => {});
          })
          .catch(() => {});
      } else {
        this.$confirm("确定要修改状态吗?")
          .then(() => {
            this.$api.manageUserApi
              .updateStatus(
                { id: row.C_ID, status: status },
                { loadingText: this.$t("management.Modifyingstatus") }
              )
              .then(() => {
                this.$message({
                  message: this.$t("management.Statusmodificationsucceeded"),
                  type: "success",
                });
                this.getUserList();
              })
              .catch(() => {});
          })
          .catch(() => {});
      }
    },
    // 修改管理员
    editAdministrators(row, status) {
      if (row.C_ID == this.$store.getters.userInfo.id) {
        this.$confirm(
          this.$t(
            "management.YouNeedToReLoginAfterModifyingYouAppointmentAreYouSureToContinue"
          ),
          this.$t("webAppBuilder.Tip"),
          {
            confirmButtonText: this.$t("myCenter.Sure"),
            cancelButtonText: this.$t("myCenter.cancel"),
            type: "warning",
          }
        )
          .then(() => {
            this.$api.manageUserApi
              .updateOrgLeader(
                {
                  personnelId: row.C_ID,
                  isLeader: status,
                  orgId: row.C_ORG_ID,
                },
                { loadingText: this.$t("management.ModifyingTheAppointment") }
              )
              .then(() => {
                this.$message({
                  message: this.$t("management.ModificationSucceeded"),
                  type: "success",
                });
                this.getUserList();
                window.openPortalLoginDialog();
              })
              .catch(() => {});
          })
          .catch(() => {});
      } else {
        this.$api.manageUserApi
          .updateOrgLeader(
            { personnelId: row.C_ID, isLeader: status, orgId: row.C_ORG_ID },
            { loadingText: this.$t("management.ModifyingTheAppointment") }
          )
          .then(() => {
            this.$message({
              message: this.$t("management.Statusmodificationsucceeded"),
              type: "success",
            });
            this.getUserList();
          })
          .catch(() => {});
      }
    },
    //删除操作
    deleteById(row) {
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          this.$api.manageUserApi
            .batchDelPersonnelByIds(
              { ids: row.C_ID },
              { loadingText: this.$t("management.deleting") }
            )
            .then(() => {
              this.$message({
                message: this.$t("management.Deletesuccessful"),
                type: "success",
              });
              this.getUserList("system");
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    deleteBatch() {
      if (this.selectList.length == 0) {
        this.$message({
          message: this.$t("management.pleaseSelectDataToDelete"),
          type: "warning",
        });
        return false;
      } else {
        this.$confirm(this.$t("management.confirmToDelete") + "?")
          .then(() => {
            var idList = [];
            this.selectList.forEach(function (value) {
              idList.push(value.C_ID);
            });
            var ids = idList.toString();
            this.$api.manageUserApi
              .batchDelPersonnelByIds(
                { ids: ids },
                { loadingText: this.$t("management.deleting") }
              )
              .then(() => {
                this.$message({
                  message: this.$t("management.succeeded"),
                  type: "success",
                });
                this.getUserList("system");
              })
              .catch(() => {});
          })
          .catch(() => {});
      }
    },
    selectionChange(val) {
      this.selectList = val;
    },
    //查询
    search(searchKey) {
      this.searchInfo.search = searchKey;
      this.getUserList("search");
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getUserList();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getUserList();
    },
    //查询用户列表
    getUserList(status) {
      if (
        !this.searchInfo.dimension &&
        (!status || (status && status != "system"))
      ) {
        this.$message({
          message: this.$t("service.Pleaseselectdepartmenttoperfromquery"),
          type: "warning",
        });
        return false;
      }
      if (!this.searchInfo.dimension && status && status == "system") {
        return false;
      }
      if (status) {
        this.searchInfo.pageIndex = 1;
        this.searchInfo.pageSize = this.pageSize;
      } else {
        this.searchInfo.pageIndex = this.pageIndex;
        this.searchInfo.pageSize = this.pageSize;
      }
      this.searchInfo.isCascade = this.isCascade;
      this.$api.manageUserApi
        .getPageList(this.searchInfo, {
          loadingText: this.$t("service.searching"),
        })
        .then((res) => {
          var data = res.data.data;
          this.userList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    //查询维度
    getOrgDimension() {
      this.resetOrgDimension();
      this.resetSearchInfo();
      this.$api.dictionaryApi
        .getOrgDimension({
          loadingTarget: ".manage-dept-loading",
          loadingText: this.$t("management.searchingOrganizations"),
        })
        .then((res) => {
          var data = res.data.data.rows;
          data.forEach((item) => {
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
            loadingText: this.$t("management.searchingOrganizations"),
          }
        )
        .then((res) => {
          var data = res.data.data;
          this.deptList = data;
        })
        .catch(() => {});
    },
    //维度改变
    selectChange(val) {
      this.dimensionValue = val;
      this.getDepByNameAndDimension();
    },
    //选中一个节点
    handleNodeClick(data) {
      this.resetSearchInfo();
      this.searchInfo.dimension = data.attributes.dimension;
      if (data.id != "0") {
        this.searchInfo.orgCode = data.code;
      }
      this.getUserList();
    },
    //重置维度数据
    resetOrgDimension() {
      this.dimensionValue = "";
      this.orgDimension = [];
      this.deptList = [];
    },
    //重置用户数据
    resetSearchInfo() {
      this.searchInfo = {
        dimension: "",
        orgCode: "",
        search: "",
      };
      this.userList = [];
      this.total = 0;
      this.pageIndex = 1;
      this.pageSize = 10;
      this.$nextTick(() => {
        this.$refs.manageTemplate.resetSearch();
      });
      this.resetUserInfo();
    },
    //重置一条用户数据
    resetUserInfo() {
      this.userInfo = {
        name: "", //用户名
        loginName: "", //登录名
        passWord: "", //密码
        sex: 1, //性别
        mobilePhone: "", //手机号
        sortNo: 1, //排序号
        email: "", //电子邮箱
        orgAndPost: [],
        passwordPolicy: "", //密码策略
      };
    },
    //根据维度查询机构和职位
    getOrgAndPostList() {
      this.$api.manageUserApi
        .getOrgAndPostList({ dimension: this.dimensionValue })
        .then((res) => {
          var data = res.data.data;
          var orgMap = {};
          data.forEach((item) => {
            if (!orgMap[item.orgId]) {
              orgMap[item.orgId] = {
                orgId: item.orgId,
                orgPid: item.orgPid,
                orgName: item.orgName,
                positionList: [],
              };
            }
            if (item.postId) {
              orgMap[item.orgId].positionList.push({
                postId: item.postId,
                postOrgId: item.postOrgId,
                postName: item.postName,
              });
            }
          });
          var tempList = [];
          for (var i in orgMap) {
            tempList.push(orgMap[i]);
          }
          this.orgAndPostList = getTree(
            tempList,
            "orgId",
            "orgPid",
            "children",
            function (item) {
              return item.orgPid == "0" ? true : false;
            }
          );
        })
        .catch(() => {});
    },
  },
  data() {
    return {
      mobileDialogVisible: false, //移动部门
      dialogVisible: false,
      dialogTitle: this.$t("management.addUser"),
      searchInfo: {
        dimension: "",
        orgCode: "",
        search: "",
      },
      isCascade: false,
      orgDimension: [],
      dimensionValue: "", //当前选择的岗位
      deptList: [], //部门数据
      pageIndex: 1, //分页信息
      pageSize: 10,
      total: 0,
      userList: [],
      orgAndPostList: [], //组织机构和职位数据
      selectList: [],
      userInfo: {
        headImg: "", //头像
        name: "", //用户名
        loginName: "", //登录名
        passWord: "", //密码
        sex: 1, //性别，男1，女0
        mobilePhone: "", //手机号
        sortNo: 1, //排序号
        email: "", //电子邮箱
        orgAndPost: [],
        passwordPolicy: "",
      }, //用户信息
      tableCol: [
        {
          prop: "C_LOGIN_NAME",
          label: this.$t("management.username"),
          minWidth: "15%",
        },
        {
          prop: "C_MOBILE_PHONE",
          label: this.$t("management.mobilePhone"),
          minWidth: "15%",
        },
        {
          prop: "C_EMAIL",
          label: this.$t("management.mailbox"),
          minWidth: "15%",
        },
      ],
    };
  },
  mounted() {
    // this.getOrgDimension();
  },
};
</script>

<style lang='scss' scoped>
.dept {
  padding: 5px 20px 0px 0px;
}
.stop-status {
  color: #f56c6c;
}
.el-icon-portal-qunzhu {
  color: #fab727;
}
</style>