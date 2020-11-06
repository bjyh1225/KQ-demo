<template>
  <div>
    <el-row class="btn-group">
      <el-col :span="18">
        <el-button
          type="primary base-btn"
          icon="el-icon-view"
          @click="getAppShow(selectedData)"
        >{{$t('myCenter.Display')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-portal-hide"
          @click="getAppHide(selectedData)"
        >{{$t('myCenter.Hide')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-delete"
          @click="deleteAppService(selectedData)"
        >{{$t('management.deleteInBatch')}}</el-button>
      </el-col>
      <el-col :span="6" class="reg-app-btn">
        <el-button type="primary base-btn" @click="regApp">{{$t('management.CreateApp')}}</el-button>
      </el-col>
    </el-row>
    <el-row class="table-area">
      <el-table :data="serviceList" border @selection-change="selectionChange" ref="multipleTable">
        <el-table-column type="selection" min-width="7%"></el-table-column>
        <el-table-column :label="$t('myCenter.DisplayState')" min-width="8%">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.appStatus"
              @change="!scope.row.appStatus?getAppHide(scope.row.id):getAppShow(scope.row.id)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('management.AppName')" min-width="20%"></el-table-column>
        <el-table-column
          prop="appComments"
          :label="$t('management.AppDescription')"
          min-width="15%"
        ></el-table-column>
        <el-table-column :label="$t('myCenter.SharingExtent')" min-width="20%">
          <template slot-scope="scope">
            <span
              v-show="scope.row.scope=='Partial'?true:false"
            >{{$t('service.Partialauthorization')}}</span>
            <span v-show="scope.row.scope=='Public'?true:false">{{$t('myCenter.Public')}}</span>
            <span v-show="scope.row.scope=='Private'?true:false">{{$t('myCenter.Private')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('myCenter.RegistrationTime')" min-width="15%"></el-table-column>
        <el-table-column prop="cz" :label="$t('management.operate')" min-width="15%">
          <template slot-scope="scope">
            <el-dropdown class="switch-operate" @command="operateCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-portal-more el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="sharingSettings"
                  :info="scope.row"
                >{{$t('myCenter.Share')}}</el-dropdown-item>
                <el-dropdown-item command="edit" :info="scope.row">{{$t('myCenter.Edit')}}</el-dropdown-item>
                <el-dropdown-item command="open" :info="scope.row">{{$t('webAppBuilder.Open')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <pagination
      :total="total"
      :pageSize="pageSize"
      :pageIndex="pageIndex"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      class="pagination"
    ></pagination>
    <personal-center-app-dialog
      :dialogVisible="dialogVisible"
      @save="save"
      :nextShow="nextShow"
      @dialogClose="dialogClose"
      :registerInfo="registerInfo"
      @nextStep="nextStep"
      @backFun="backFun"
    ></personal-center-app-dialog>
    <personal-center-app-edit-dialog
      :editInfo="registerInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisible"
      @editDialogClose="editDialogClose"
    ></personal-center-app-edit-dialog>
    <personal-center-service-sharing-dialog
      ref="serviceSharingDialog"
      @dialogClose="dialogClose"
      @getserviceListByMe="getListService"
    ></personal-center-service-sharing-dialog>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
import PersonalCenterAppDialog from "./PersonalCenterAppDialog";
import PersonalCenterAppEditDialog from "./PersonalCenterAppEditDialog";
import PersonalCenterServiceSharingDialog from "components/personalCenterService/PersonalCenterServiceSharingDialog";
export default {
  name: "PersonalCenterApp",
  props: {
    appPageShow: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    Pagination,
    PersonalCenterAppDialog,
    PersonalCenterServiceSharingDialog,
    PersonalCenterAppEditDialog,
  },
  data() {
    return {
      editDialogVisible: false, //编辑弹框
      pageIndex: 1, //分页信息
      pageSize: 10,
      total: 0,
      nextShow: false,
      dialogVisible: false,
      messageSharingName: "应用",
      serviceList: [],
      selectedData: [], //复选框选中ID
      registerInfo: { appClassify: "", name: "", appComments: "" },
      resourceData: {}, //点击编辑存储信息
    };
  },
  watch: {
    appPageShow() {
      if (this.appPageShow) {
        this.getListService();
      }
    },
    dialogVisible() {
      if (!this.dialogVisible) {
        this.registerInfo.name = "";
        this.registerInfo.appComments = "";
      }
    },
    editDialogVisible() {
      if (!this.editDialogVisible) {
        this.registerInfo.appClassify = "";
        this.registerInfo.name = "";
        this.registerInfo.appComments = "";
      }
    },
  },
  methods: {
    operateCommand(command, $item) {
      switch (command) {
        case "sharingSettings":
          this.sharingSettings($item.$attrs.info);
          break;
        case "open":
          this.open($item.$attrs.info);
          break;
        default:
          break;
        case "edit":
          this.edit($item.$attrs.info);
          break;
      }
    },
    open(val) {
      this.$router.push({
        path: "/appbuilder",
        query: { id: val.id },
      });
    },
    // 编辑
    edit(val) {
      this.registerInfo.appClassify = "";
      this.registerInfo.name = val.name;
      this.registerInfo.appComments = val.comments;
      this.editDialogVisible = true;
      this.resourceData = val;
    },
    // 复选框选中
    selectionChange(rows) {
      var array = [];
      rows.forEach((item) => {
        array.push(item.id);
      });
      this.selectedData = array.join(",");
    },
    //初始获取
    getListService() {
      this.$api.personalCenterAppApi
        .getListService(
          {
            page: this.pageIndex,
            size: this.pageSize,
          },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          this.total = res.data.data.total;
          res.data.data.rows.forEach((item) => {
            if (item.appStatus == 0) {
              item.appStatus = false;
            } else {
              item.appStatus = true;
            }
          });
          this.serviceList = res.data.data.rows;
        });
    },
    // 共享设置
    sharingSettings(val) {
      this.$api.personalCenterAppApi
        .selectPermissionById(
          { appId: val.id, scope: val.scope },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          if (res.data.status == 200) {
            this.$refs.serviceSharingDialog.privateDataFun({
              checkList: res.data.data,
              serviceListSharing: val,
              messageSharingName: this.messageSharingName,
            });
          }
        })
        .catch((error) => {
          if (error.data.status == "390") {
            this.getListService();
          }
        });
    },
    //注册应用
    regApp() {
      this.dialogVisible = true;
    },
    //确定
    save(val) {
      this.$refs.serviceSharingDialog.sharingNewData({
        scope: val.scope,
        permissionListDatas: val.permissionListData,
      });
      this.$refs.serviceSharingDialog.messagePushCommonFun({
        ID: "",
        name: this.registerInfo.name,
        serviceComments: this.registerInfo.appComments,
        scope: val.scope,
        serviceClassify: val.appClassify,
        request: "appSave",
      });
    },
    // 注册  下一步
    nextStep() {
      this.nextShow = true;
    },
    // 注册  上一步
    backFun() {
      this.nextShow = false;
    },
    // 关闭弹框
    dialogClose() {
      this.dialogVisible = false;
    },
    editDialogClose() {
      this.editDialogVisible = false;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getListService();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getListService();
    },

    //隐藏
    getAppHide(val) {
      if (val == "" && this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickTheService"),
          type: "warning",
        });
        return false;
      }
      if (val == "") {
        this.selectedData = val;
      }
      this.$api.personalCenterAppApi
        .getAppHide(
          {
            IDS: val,
          },
          { loadingText: this.$t("myCenter.Hiding") }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.HidedSuccessfully"),
              type: "success",
            });
            var messageHide = [];
            res.data.data.forEach((element) => {
              element.forEach((item) => {
                var selectedName = "";
                this.serviceList.forEach((list) => {
                  if (list.id == item.C_SOURCE_ID) {
                    selectedName = list.name;
                  }
                });
                item.message =
                  this.$store.getters.userInfo.username +
                  this.$t("myCenter.TheHiddenApplicationResourceIs") +
                  selectedName +
                  this.$t(
                    "myCenter.ApplicationResourceandYouAreNotAbleToUseIt"
                  );
                messageHide.push(item);
              });
            });
            this.messagePushMap(messageHide);
          }
          this.page = 1;
          this.getListService();
        });
    },
    //显示
    getAppShow(val) {
      if (val == "" && this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickTheService"),
          type: "warning",
        });
        return false;
      }
      this.$api.personalCenterAppApi
        .getAppShow(
          {
            IDS: val,
          },
          { loadingText: this.$t("myCenter.Displaying") }
        )
        .then((res) => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.DisplayedSuccessfully"),
              type: "success",
            });
            var messageArr = [];
            res.data.data.forEach((element) => {
              element.forEach((item) => {
                var selectedName = "";
                var jurisdictionNameData = "";
                var jurisdiction = [];
                this.serviceList.forEach((list) => {
                  if (list.id == item.C_SOURCE_ID) {
                    selectedName = list.name;
                  }
                });
                if (item.C_YW_SEARCH == 1) {
                  jurisdiction.push(this.$t("myCenter.Query"));
                }
                if (item.C_YW_BROWSE == 1) {
                  jurisdiction.push(this.$t("myCenter.Browse"));
                }
                if (item.C_YW_EDIT == 1) {
                  jurisdiction.push(this.$t("myCenter.Edit"));
                }
                jurisdictionNameData = jurisdiction.join("、");
                item.message =
                  this.$store.getters.userInfo.username +
                  this.$t("myCenter.TheDisplayedApplicationResourceIs") +
                  selectedName +
                  this.$t("myCenter.ApplicationResourceyourPermissionIs") +
                  this.$t("myCenter.yourPermissionIsStart") +
                  jurisdictionNameData +
                  this.$t("myCenter.yourPermissionIsEnd");
                messageArr.push(item);
              });
            });
            this.messagePushMap(messageArr);
            this.page = 1;
            this.getListService();
          }
        });
    },
    // 批量删除
    deleteAppService(val) {
      if (val == "" && this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickTheService"),
          type: "warning",
        });
        return false;
      }
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          this.$api.personalCenterAppApi
            .deleteAppService(
              {
                IDS: this.selectedData,
              },
              { loadingText: this.$t("myCenter.Deleting") }
            )
            .then((res) => {
              if (res.status == 200) {
                this.$message({
                  message: this.$t("myCenter.BatchDeleteSuccessfully"),
                  type: "success",
                });
                var messageDel = [];
                res.data.data.forEach((element) => {
                  element.forEach((item) => {
                    var selectedName = "";
                    this.serviceList.forEach((list) => {
                      if (list.id == item.C_SOURCE_ID) {
                        selectedName = list.name;
                      }
                    });
                    item.message =
                      this.$store.getters.userInfo.username +
                      this.$t("myCenter.DeletedTheApplicationResourceOf") +
                      selectedName +
                      this.$t("myCenter.DeletedTheApplicationResourceEnd");
                    messageDel.push(item);
                  });
                });
                this.messagePushMap(messageDel);
              }
              this.page = 1;
              this.getListService();
            })
            .catch(() => {});
        })
        .catch(() => {
          this.$refs.multipleTable.clearSelection();
        });
    },
    // 消息推送
    messagePushMap(val) {
      this.$api.messageApi
        .sendMsgToGroup(
          { list: JSON.stringify(val) },
          { loadingText: this.$t("myCenter.Pushingdata") }
        )
        .then(() => {})
        .catch(() => {});
    },
  },
};
</script>

<style lang='scss' scoped>
.btn-group {
  margin-bottom: 10px;
  .reg-app-btn {
    text-align: right;
  }
}
.pagination {
  margin-bottom: 30px;
}
.table-area {
  margin-bottom: 13px;
}
</style>