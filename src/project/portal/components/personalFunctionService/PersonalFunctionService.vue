<template>
  <div>
    <el-row class="service-btn-group">
      <el-col :span="14">
        <el-button
          type="primary base-btn"
          icon="el-icon-view"
          @click="getMeServiceShow(selectedData)"
        >{{ $t("myCenter.Display") }}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-portal-hide"
          @click="getMeServiceHide(selectedData)"
        >{{ $t("myCenter.Hide") }}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-delete"
          @click="deleteFunctionService"
        >{{ $t("management.deleteInBatch") }}</el-button>
      </el-col>
      <el-col :span="10" class="add-service-btn-group">
        <el-button type="primary base-btn" @click="register">
          {{
          $t("management.Registerfunctionservice")
          }}
        </el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="serviceList" border @selection-change="selectionChange" ref="multipleTable">
        <el-table-column type="selection" min-width="5%"></el-table-column>
        <el-table-column :label="$t('myCenter.DisplayState')" min-width="7%">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.serviceStatus"
              @change="
                !scope.row.serviceStatus
                  ? getMeServiceHide(scope.row.id)
                  : getMeServiceShow(scope.row.id)
              "
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('myCenter.ServiceNames')" min-width="8%"></el-table-column>
        <el-table-column prop="serviceUrl" :label="$t('myCenter.ServiceAddress')" min-width="24%"></el-table-column>
        <el-table-column prop="proxyName" :label="$t('management.Proxyname')" min-width="8%"></el-table-column>
        <el-table-column prop="proxyUrl" :label="$t('management.Proxyaddress')" min-width="24%"></el-table-column>
        <el-table-column prop="email" :label="$t('myCenter.SharingExtent')" min-width="7%">
          <template slot-scope="scope">
            <span v-show="scope.row.scope == 'Partial' ? true : false">
              {{
              $t("service.Partialauthorization")
              }}
            </span>
            <span v-show="scope.row.scope == 'Public' ? true : false">
              {{
              $t("myCenter.Public")
              }}
            </span>
            <span v-show="scope.row.scope == 'Private' ? true : false">
              {{
              $t("myCenter.Private")
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('myCenter.RegistrationTime')" min-width="12%"></el-table-column>
        <el-table-column prop="cz" :label="$t('myCenter.Operate')" min-width="5%">
          <template slot-scope="scope">
            <el-dropdown class="switch-operate" @command="operateCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-portal-more el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="sharingSettings" :info="scope.row">
                  {{
                  $t("myCenter.Share")
                  }}
                </el-dropdown-item>
                <el-dropdown-item command="edit" :info="scope.row">
                  {{
                  $t("myCenter.Edit")
                  }}
                </el-dropdown-item>
                <el-dropdown-item command="viewDetails" :info="scope.row">
                  {{
                  $t("management.ViewDetails")
                  }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <personal-function-service-dialog
      :dialogVisible="dialogVisible"
      @save="save"
      :dropdownCategory="dropdownCategory"
      :proxyServerList="proxyServerList"
      @dialogClose="dialogClose"
      :registerInfo="registerInfo"
      @nextStep="nextStep"
      @backFun="backFun"
      :nextShow="nextShow"
      :dialogTitle="$t('management.Registerfunctionservice')"
    ></personal-function-service-dialog>
    <personal-center-service-sharing-dialog
      ref="serviceSharingDialog"
      @dialogClose="dialogClose"
      @getserviceListByMe="getserviceListByMe"
    ></personal-center-service-sharing-dialog>
    <personal-function-service-edit-dialog
      :arr="dropdownCategory"
      :editInfo="editInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisible"
      @editDialogClose="editDialogClose"
      @getserviceListByMe="getserviceListByMe"
    ></personal-function-service-edit-dialog>
    <pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :pageSize="pageSize"
      :pageIndex="page"
      class="pagination"
    ></pagination>
    <personal-center-service-details-dialog ref="serviceDetails"></personal-center-service-details-dialog>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
import PersonalFunctionServiceDialog from "components/personalFunctionService/PersonalFunctionServiceDialog";
import PersonalCenterServiceSharingDialog from "components/personalCenterService/PersonalCenterServiceSharingDialog";
import PersonalFunctionServiceEditDialog from "components/personalFunctionService/PersonalFunctionServiceEditDialog";
import PersonalCenterServiceDetailsDialog from "components/personalCenterService/PersonalCenterServiceDetailsDialog";
export default {
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false,
    },
  },
  name: "PersonalFunctionService",
  components: {
    Pagination,
    PersonalFunctionServiceDialog,
    PersonalCenterServiceSharingDialog,
    PersonalFunctionServiceEditDialog,
    PersonalCenterServiceDetailsDialog,
  },
  data() {
    return {
      editDialogVisible: false, //编辑弹框
      dialogVisible: false, //控制弹框
      pageSize: 10,
      page: 1,
      total: 0,
      serviceStatusData: "", //状态数据
      serviceList: [], //数据
      category: [], //下拉类别
      dropdownCategory: [], //下拉类别
      proxyServerList: [], //代理服务器URL
      selectedData: [], //复选框选中值
      displayValue: true,
      nextShow: false, // 步骤条点击下一步
      messageSharingName: this.$t("service.functionServices"),
      registerInfo: {
        //弹框双向数据
        power: "",
        add: "",
        name: "",
        describe: "",
        keyWord: "",
        isReqProxyUrl: false,
        proxyName: "",
        proxyUrl: "",
      },
      editInfo: {
        power: "",
        serverAdd: "",
        name: "",
        describe: "",
        thumbnail: "",
        keyWord: "",
        isReqProxyUrl: false,
        errorCodeList: [],
        paramsInfoList: [],
        resultExample: "",
        requestMethod: "",
      },
      resourceData: {}, //点击编辑存储信息
    };
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal, oldVal) {
        if (newVal) {
          this.getserviceListByMe();
        }
      },
    },
    dialogVisible() {
      if (!this.dialogVisible) {
        this.registerInfo.power = "";
        this.registerInfo.add = "";
        this.registerInfo.name = "";
        this.registerInfo.describe = "";
        this.registerInfo.keyWord = "";
        this.registerInfo.isReqProxyUrl = false;
        this.registerInfo.proxyName = "";
        this.registerInfo.proxyUrl = "";
      }
    },
    editDialogVisible() {
      if (!this.editDialogVisible) {
        this.editInfo.power = "";
        this.editInfo.serverAdd = "";
        this.editInfo.name = "";
        this.editInfo.describe = "";
        this.editInfo.thumbnail = "";
        this.editInfo.keyWord = "";
        this.editInfo.isReqProxyUrl = false;
        this.editInfo.proxyName = "";
        this.editInfo.errorCodeList = [];
        this.editInfo.paramsInfoList = [];
        this.editInfo.resultExample = "";
        this.editInfo.requestMethod = "";
      }
    },
  },
  methods: {
    operateCommand(command, $item) {
      switch (command) {
        case "sharingSettings":
          this.sharingSettings($item.$attrs.info);
          break;
        case "edit":
          this.edit($item.$attrs.info);
          break;
        default:
          break;
        case "viewDetails":
          this.viewDetails($item.$attrs.info);
          break;
      }
    },
    //每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getserviceListByMe();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page = val;
      this.getserviceListByMe();
    },
    selectionChange(rows) {
      var array = [];
      rows.forEach((item) => {
        array.push(item.id);
      });
      this.selectedData = array.join(",");
    },
    //注册
    register() {
      this.dialogVisible = true;
      this.getFSCategory();
      this.getListProxyServerDataNotPages();
    },
    // 共享设置
    sharingSettings(val) {
      this.$api.personalFunctionServiceApi
        .selectPermissionById(
          { serviceId: val.id, scope: val.scope },
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
            this.getserviceListByMe();
          }
        });
    },
    // 查看详情
    viewDetails(val) {
      this.$refs.serviceDetails.viewDetails(val);
    },
    // 编辑
    edit(val) {
      this.getFSCategory();
      this.$api.serviceFunctionApi
        .getServiceDetails(
          {
            serviceId: val.id,
          },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          if (res.data.status == 200) {
            this.editInfo.serverAdd = res.data.data[0].C_SERVICE_URL;
            this.editInfo.name = res.data.data[0].C_NAME;
            this.editInfo.describe = res.data.data[0].C_COMMENTS;
            this.editInfo.keyWord = res.data.data[0].C_KEYWORD;
            this.editInfo.isReqProxyUrl =
              res.data.data[0].C_IS_PROXY == "true" ||
              res.data.data[0].C_IS_PROXY == true
                ? true
                : false;
            this.editInfo.proxyName = res.data.data[0].C_PROXY_NAME;
            if (res.data.data[0].paramsInfoList) {
              this.editInfo.paramsInfoList = res.data.data[0].paramsInfoList;
            } else {
              this.editInfo.paramsInfoList = [];
            }
            if (res.data.data[0].errorCodeList) {
              this.editInfo.errorCodeList = res.data.data[0].errorCodeList;
            } else {
              this.editInfo.errorCodeList = [];
            }
            this.editInfo.resultExample = res.data.data[0].C_RESULT_EXAMPLE;
            this.editInfo.requestMethod = res.data.data[0].C_REQUEST_METHOD;
            this.serviceList.forEach((item) => {
              if (item.id == val.id) {
                item.serviceUrl = res.data.data[0].C_SERVICE_URL;
                item.name = res.data.data[0].C_NAME;
                item.comments = res.data.data[0].C_COMMENTS;
                item.proxyUrl = res.data.data[0].C_PROXY_URL;
              }
            });
            this.editDialogVisible = true;
          }
        })
        .catch(() => {});
      this.editInfo.power = "";
      this.editInfo.thumbnail = "";
      this.resourceData = val;
    },
    //关闭弹窗
    dialogClose() {
      this.dialogVisible = false;
    },
    editDialogClose() {
      this.editDialogVisible = false;
    },
    // 注册  下一步
    nextStep() {
      this.nextShow = true;
    },
    // 注册  上一步
    backFun() {
      this.nextShow = false;
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
        serviceUrl: this.registerInfo.add,
        serviceComments: this.registerInfo.describe,
        serviceClassify: val.power,
        request: "saveFunction",
        keyWord: this.registerInfo.keyWord,
        isReqProxyUrl: this.registerInfo.isReqProxyUrl,
        proxyName: this.registerInfo.proxyName,
        proxyUrl: this.registerInfo.proxyUrl,
        resultExample: val.paramsSetInfo.resultExample,
        paramsInfoList: JSON.stringify(val.paramsSetInfo.paramsInfoList),
        errorCodeList: JSON.stringify(val.paramsSetInfo.errorCodeList),
        requestMethod: val.paramsSetInfo.requestMethod,
      });
    },
    //初始获取
    getserviceListByMe() {
      this.$api.personalFunctionServiceApi
        .getserviceListByMe(
          {
            page: this.page,
            size: this.pageSize,
          },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          this.total = res.data.data.total;
          res.data.data.rows.forEach((item) => {
            if (item.serviceStatus == 0) {
              item.serviceStatus = false;
            } else {
              item.serviceStatus = true;
            }
          });
          this.serviceList = res.data.data.rows;
        });
    },
    //初始获取权限
    getFSCategory() {
      this.$api.personalFunctionServiceApi
        .getFSCategory({ loadingText: this.$t("service.searching") })
        .then((res) => {
          if (res.status == 200) {
            this.dropdownCategory = [];
            var map = [];
            this.category = res.data.data;
            this.category.forEach((item) => {
              if (item.parentId == 0) {
                map.push(item);
              }
            });
            map.forEach((ar) => {
              this.dropdownCategory.push(ar);
              this.category.forEach((it) => {
                if (ar.id == it.parentId) {
                  it.typeName = `${ar.typeName} — ${it.typeName}`;
                  this.dropdownCategory.push(it);
                }
              });
            });
          }
        });
    },
    // 初始获取代理服务器URL
    getListProxyServerDataNotPages() {
      //获取代理服务器列表无分页
      this.proxyServerList = [];
      this.$api.manageProxyServerApi
        .getListProxyServerDataNotPages()
        .then((res) => {
          let data = res.data.data;
          data.forEach((item) => {
            let temp = {
              value:
                item.C_SERVER_HTTP +
                "://" +
                item.C_SERVER_IP +
                ":" +
                item.C_SERVER_PORTNUMBER,
              label: item.C_SERVER_IP + ":" + item.C_SERVER_PORTNUMBER,
              leaf: false,
            };
            this.proxyServerList.push(temp);
          });
        })
        .catch(() => {});
    },
    //显示
    getMeServiceShow(val) {
      if (val == "" && this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickTheService"),
          type: "warning",
        });
        return false;
      }
      this.$api.personalFunctionServiceApi
        .getMeServiceShow(
          {
            serviceIds: val,
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
                  this.$t("myCenter.TheDisplayedFunctionServiceResourcesIs") +
                  selectedName +
                  this.$t("myCenter.FunctionServiceResourcesyourPermissionIs") +
                  jurisdictionNameData +
                  this.$t("myCenter.yourPermissionIsEnd");
                messageArr.push(item);
              });
            });
            this.messagePushFunction(messageArr);
          }
          this.page = 1;
          this.getserviceListByMe();
        });
    },
    //批量删除
    deleteFunctionService() {
      if (this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickTheService"),
          type: "warning",
        });
        return false;
      }
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          this.$api.personalFunctionServiceApi
            .deleteFunctionService(
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
                      this.$t("myCenter.DeletedTheFunctionServiceResourcesOf") +
                      selectedName +
                      this.$t("myCenter.DeletedThefunctionServiceResourcesEnd");
                    messageDel.push(item);
                  });
                });
                this.messagePushFunction(messageDel);
              }
              this.page = 1;
              this.getserviceListByMe();
            })
            .catch(() => {});
        })
        .catch(() => {
          this.$refs.multipleTable.clearSelection();
        });
    },
    //隐藏
    getMeServiceHide(val) {
      if (val == "" && this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickTheService"),
          type: "warning",
        });
        return false;
      }
      this.$api.personalFunctionServiceApi
        .getMeServiceHide(
          {
            serviceIds: val,
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
                  this.$t("myCenter.TheHiddenFunctionServiceResourcesIs") +
                  selectedName +
                  this.$t(
                    "myCenter.FunctionServiceResourcesandYouAreNotAbleToUseIt"
                  );
                messageHide.push(item);
              });
            });
            this.messagePushFunction(messageHide);
          }
          this.page = 1;
          this.getserviceListByMe();
        });
    },
    // 消息推送
    messagePushFunction(val) {
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

<style lang="scss" scoped>
.add-service-btn-group {
  text-align: right;
}
.service-btn-group {
  margin-bottom: 10px;
}
.el-table {
  margin-bottom: 13px;
}
.pagination {
  margin-bottom: 30px;
}
.el-icon-portal-hide {
  color: #dcdfe6;
}
/deep/.el-switch.is-checked .el-switch__core {
  @include base-bg-color();
}
</style>
