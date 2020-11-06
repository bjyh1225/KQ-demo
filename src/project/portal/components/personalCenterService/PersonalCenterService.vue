<template>
  <div>
    <el-row class="service-btn-group">
      <el-col :span="14">
        <el-button
          type="primary base-btn"
          icon="el-icon-view"
          @click="getMeServiceShow(selectedData)"
        >{{$t('myCenter.Display')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-portal-hide"
          @click="getMeServiceHide(selectedData)"
        >{{$t('myCenter.Hide')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-delete"
          @click="deleteKqService"
        >{{$t('management.deleteInBatch')}}</el-button>
      </el-col>
      <el-col :span="10" class="add-service-btn-group">
        <el-button type="primary base-btn" @click="register">{{$t('myCenter.RegisterServices')}}</el-button>
        <el-button
          type="primary base-btn"
          @click="batchRegister"
        >{{$t('myCenter.RegisterServicesInBatch')}}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="serviceList" border @selection-change="selectionChange" ref="multipleTable">
        <el-table-column type="selection" min-width="6%"></el-table-column>
        <el-table-column :label="$t('myCenter.DisplayState')" min-width="6%">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.serviceStatus"
              @change="!scope.row.serviceStatus?getMeServiceHide(scope.row.id):getMeServiceShow(scope.row.id)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('myCenter.ServiceNames')" min-width="6%"></el-table-column>
        <el-table-column prop="serviceUrl" :label="$t('myCenter.ServiceAddress')" min-width="22%"></el-table-column>
        <el-table-column prop="proxyName" :label="$t('management.Proxyname')" min-width="6%"></el-table-column>
        <el-table-column prop="proxyUrl" :label="$t('management.Proxyaddress')" min-width="22%"></el-table-column>
        <el-table-column
          prop="serviceType"
          :label="$t('webAppBuilder.ServicesType')"
          min-width="8%"
        ></el-table-column>
        <el-table-column :label="$t('myCenter.SharingExtent')" min-width="6%">
          <template slot-scope="scope">
            <span
              v-show="scope.row.scope=='Partial'?true:false"
            >{{$t('service.Partialauthorization')}}</span>
            <span v-show="scope.row.scope=='Public'?true:false">{{$t('myCenter.Public')}}</span>
            <span v-show="scope.row.scope=='Private'?true:false">{{$t('myCenter.Private')}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="$t('myCenter.RegistrationTime')" min-width="12%"></el-table-column>
        <!-- <el-table-column :label="$t('management.Serverstatus')" min-width="6%">
          <template slot-scope="scope">
            <span
              v-show="scope.row.serviceState=='querying'&&scope.row.serviceType=='kqmapping'"
            >
              <i class='el-icon-loading'></i>
            </span>
            <span
              v-show="scope.row.serviceState=='4'&&scope.row.serviceType=='kqmapping'"
            >{{$t('management.Enabled')}}</span>
            <span
              v-show="scope.row.serviceState=='1'&&scope.row.serviceType=='kqmapping'"
            >{{$t('management.Disabled')}}</span>
            <el-tooltip
              class="item"
              effect="light"
              :content="scope.row.serviceState"
              placement="right"
            >
              <span
                v-show="(scope.row.serviceState!='1'&&scope.row.serviceState!='4'&&scope.row.serviceState!='querying')&&scope.row.serviceType=='kqmapping'"
                class="stop-status"
              >{{$t('management.Abnormal')}}</span>
            </el-tooltip>
            <span v-show="scope.row.serviceType!='kqmapping'" class="department-slash"></span>
          </template>
        </el-table-column>-->
        <el-table-column prop="cz" :label="$t('management.operate')" min-width="6%">
          <template slot-scope="scope">
            <el-dropdown class="switch-operate" @command="operateCommand">
              <span class="el-dropdown-link">
                <i class="el-icon-portal-more el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <!-- <el-dropdown-item
                  command="editStatus"
                  :info="{row:scope.row,status:false}"
                  v-show="scope.row.serviceState=='4'&&scope.row.serviceType=='kqmapping'"
                >{{$t('management.disabled')}}</el-dropdown-item>
                <el-dropdown-item
                  command="editStatus"
                  :info="{row:scope.row,status:true}"
                  v-show="scope.row.serviceState=='1'&&scope.row.serviceType=='kqmapping'"
                >{{$t('management.enabled')}}</el-dropdown-item>
                <el-dropdown-item
                  command="abnormal"
                  disabled
                  v-show="(scope.row.serviceState!='1'&&scope.row.serviceState!='4')&&scope.row.serviceType=='kqmapping'"
                >{{$t('management.enabled')}}</el-dropdown-item>-->
                <el-dropdown-item
                  command="sharingSettings"
                  :info="scope.row"
                >{{$t('myCenter.Share')}}</el-dropdown-item>
                <el-dropdown-item command="edit" :info="scope.row">{{$t('myCenter.Edit')}}</el-dropdown-item>
                <el-dropdown-item
                  command="viewDetails"
                  :info="scope.row"
                >{{$t('management.ViewDetails')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <personal-center-service-dialog
      :dialogVisible="dialogVisible"
      @save="save"
      :arr="arr"
      :serverArr="serverArr"
      :nextShow="nextShow"
      @dialogClose="dialogClose"
      :registerInfo="registerInfo"
      :proxyServerList="proxyServerList"
      @nextStep="nextStep"
      @backFun="backFun"
    ></personal-center-service-dialog>
    <personal-center-service-batch-dialog
      :batchDialogVisible="batchDialogVisible"
      @batchSave="batchSave"
      :serverArr="serverArr"
      :arr="arr"
      :nextShow="nextShow"
      @batchDialogClose="batchDialogClose"
      :batchRegisterInfo="batchRegisterInfo"
      @nextStep="nextStep"
      @backFun="backFun"
    ></personal-center-service-batch-dialog>
    <personal-center-service-sharing-dialog
      @dialogClose="dialogClose"
      @batchDialogClose="batchDialogClose"
      ref="serviceSharingDialog"
      @getserviceListByMe="getserviceListByMe"
    ></personal-center-service-sharing-dialog>
    <personal-center-service-edit-dialog
      :arr="arr"
      :editInfo="editInfo"
      :resourceData="resourceData"
      :editDialogVisible="editDialogVisible"
      @editDialogClose="editDialogClose"
      @getserviceListByMe="getserviceListByMe"
    ></personal-center-service-edit-dialog>
    <pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :pageSize="pageSize"
      :pageIndex="page"
      class="pagination"
    ></pagination>
    <batch-success-dialog
      :batchSuccessVisible="batchSuccessVisible"
      @handleClose="handleClose"
      :batchSuccessDescription="batchSuccessDescription"
      :batchSuccessName="batchSuccessName"
    ></batch-success-dialog>
    <personal-center-service-details-dialog ref="serviceDetails"></personal-center-service-details-dialog>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
import PersonalCenterServiceDialog from "components/personalCenterService/PersonalCenterServiceDialog";
import PersonalCenterServiceBatchDialog from "components/personalCenterService/PersonalCenterServiceBatchDialog";
import PersonalCenterServiceSharingDialog from "components/personalCenterService/PersonalCenterServiceSharingDialog";
import PersonalCenterServiceEditDialog from "components/personalCenterService/PersonalCenterServiceEditDialog";
import BatchSuccessDialog from "components/personalCenterService/BatchSuccessDialog";
import PersonalCenterServiceDetailsDialog from "components/personalCenterService/PersonalCenterServiceDetailsDialog";
export default {
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false,
    },
  },
  name: "PersonalCenterService",
  components: {
    Pagination,
    PersonalCenterServiceDialog,
    PersonalCenterServiceBatchDialog,
    PersonalCenterServiceSharingDialog,
    PersonalCenterServiceEditDialog,
    BatchSuccessDialog,
    PersonalCenterServiceDetailsDialog,
  },
  data() {
    return {
      editDialogVisible: false, //编辑弹框
      dialogVisible: false, //控制弹框
      batchDialogVisible: false,
      pageSize: 10,
      page: 1,
      total: 0,
      serviceStatusData: "", //状态数据
      serviceList: [], //数据
      category: [], //下拉类别
      arr: [], //下拉类别
      serverArr: [], //下拉服务器类别
      selectedData: [], //复选框选中值
      selectedChange: [], //复选框选中值
      // 步骤条点击下一步
      nextShow: false,
      messageSharingName: this.$t("service.mapServices"),
      batchSuccessVisible: false, //批量成功弹窗
      batchSuccessDescription: "", //批量注册个数
      batchSuccessName: [], //批量注册名称
      proxyServerList: [], //代理服务器URL
      registerInfo: {
        //弹框双向数据
        power: "",
        type: "",
        name: "",
        describe: "",
        serverUrl: "",
        add: "",
        splicingUrl: "",
        isReqProxyUrl: false,
        proxyName: "",
        proxyUrl: "",
        keyWord: "", //关键字
      },
      batchRegisterInfo: {
        type: "",
        url: "",
        describe: "",
        power: "",
        keyWord: "",
      },
      editInfo: {
        power: "",
        type: "",
        serverAdd: "",
        name: "",
        describe: "",
        thumbnail: "",
        keyWord: "",
        proxyName: "",
        isReqProxyUrl: false,
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
        this.registerInfo.type = "";
        this.registerInfo.name = "";
        this.registerInfo.describe = "";
        this.registerInfo.serverUrl = "";
        this.registerInfo.add = "";
        this.registerInfo.splicingUrl = "";
        this.registerInfo.keyWord = "";
        this.serverArr = [];
        this.registerInfo.isReqProxyUrl = false;
        this.registerInfo.proxyName = "";
        this.registerInfo.proxyUrl = "";
      }
    },
    batchDialogVisible() {
      if (!this.batchDialogVisible) {
        this.batchRegisterInfo.power = "";
        this.batchRegisterInfo.type = "";
        this.batchRegisterInfo.url = "";
        this.batchRegisterInfo.describe = "";
        this.batchRegisterInfo.keyWord = "";
      }
    },
    editDialogVisible() {
      if (!this.editDialogVisible) {
        this.editInfo.power = "";
        this.editInfo.type = "";
        this.editInfo.serverAdd = "";
        this.editInfo.name = "";
        this.editInfo.describe = "";
        this.editInfo.thumbnail = "";
        this.editInfo.keyWord = "";
        this.editInfo.isReqProxyUrl = false;
        this.editInfo.proxyName = "";
      }
    },
    // serviceList(){
    //   this.serviceList.forEach(item=>{
    //      if (item.serviceState == "querying") {
    //            this.$api.personalCenterServiceApi
    //             .getServiceState(
    //               {
    //                 serviceUrl: item.serviceUrl,
    //                 serviceType: item.serviceType
    //               }
    //             )
    //             .then(state => {
    //               item.serviceState = state.data.data.serviceState;
    //             })
    //         }
    //   })
    // }
  },

  methods: {
    operateCommand(command, $item) {
      switch (command) {
        // case "editStatus":
        //   this.editStatus($item.$attrs.info.row, $item.$attrs.info.status);
        //   break;
        default:
          break;
        case "sharingSettings":
          this.sharingSettings($item.$attrs.info);
          break;
        case "edit":
          this.edit($item.$attrs.info);
          break;
        case "viewDetails":
          this.viewDetails($item.$attrs.info);
          break;
      }
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
    // 启停
    editStatus(row, status) {
      // document.getElementById("preloader").style.display = "block";
      // document.getElementById("loader").style.borderRadius = "80%";
      if (status) {
        this.$api.personalCenterServiceApi
          .getMyServiceStart(
            { serviceUrl: row.serviceUrl, serviceType: row.serviceType },
            { loadingText: this.$t("management.Theserviceisbeingstarted") }
          )
          .then(() => {
            this.getserviceListByMe();
            this.$message({
              message: this.$t("management.Startedsuccessfully"),
              type: "success",
            });
          })
          .catch(() => {});
      } else {
        this.$api.personalCenterServiceApi
          .getMyServiceStop(
            { serviceUrl: row.serviceUrl, serviceType: row.serviceType },
            { loadingText: this.$t("management.Theserviceisbeingstopped") }
          )
          .then(() => {
            this.getserviceListByMe();
            this.$message({
              message: this.$t("management.Stoppedsuccessfully"),
              type: "success",
            });
          })
          .catch(() => {});
      }
    },
    // 查看详情
    viewDetails(val) {
      this.$refs.serviceDetails.viewDetails(val);
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
      this.selectedChange = [];
      rows.forEach((item) => {
        this.selectedChange.push(item);
        array.push(item.id);
      });
      this.selectedData = array.join(",");
    },
    // 编辑
    edit(val) {
      this.getServiceCategory();
      //详情数据
      this.$api.serviceMapApi
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
            this.serviceList.forEach((item) => {
              if (item.id == val.id) {
                item.serviceUrl = res.data.data[0].C_SERVICE_URL;
                item.name = res.data.data[0].C_NAME;
                item.comments = res.data.data[0].C_COMMENTS;
              }
              this.editDialogVisible = true;
            });
          }
        })
        .catch(() => {});
      this.editInfo.power = "";
      this.editInfo.type = "";
      this.editInfo.thumbnail = "";
      this.resourceData = val;
    },
    //注册
    register() {
      this.getServiceCategory();
      this.getServerList();
      this.getListProxyServerDataNotPages();
      this.dialogVisible = true;
    },
    //批量注册
    batchRegister() {
      this.getServiceCategory();
      this.getServerList();
      this.batchDialogVisible = true;
    },
    // 共享设置
    sharingSettings(val) {
      this.$api.personalCenterServiceApi
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
    //关闭弹窗
    dialogClose() {
      this.dialogVisible = false;
    },
    batchDialogClose() {
      this.batchDialogVisible = false;
    },
    editDialogClose() {
      this.editDialogVisible = false;
    },
    // 获取服务器
    getServerList() {
      this.$api.manageServerApi
        .getListServerDataNotPages({
          loadingText: this.$t("service.searching"),
        })
        .then((res) => {
          this.serverArr = res.data.data;
        })
        .catch(() => {});
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
        serviceUrlIp: val.serviceUrlIp,
        serviceUrlName: val.serviceUrlName,
        serviceType: val.type,
        serviceComments: this.registerInfo.describe,
        serviceClassify: val.power,
        request: "save",
        keyWord: this.registerInfo.keyWord,
        isReqCloud: val.isReqCloud,
        proxyUrl: val.proxyUrl || null,
        proxyName: val.proxyName || null,
      });
    },
    //批量
    batchSave(val) {
      this.$refs.serviceSharingDialog.sharingNewData({
        scope: val.scope,
        permissionListDatas: val.permissionListData,
      });
      if (val.scope == "Private") {
        this.$api.personalCenterServiceApi
          .saveKqServices(
            {
              serviceUrl: val.addUrl,
              serviceComments: this.batchRegisterInfo.describe,
              serviceClassify: val.power,
              serviceType: val.type,
              permissionListData: JSON.stringify([]),
              serviceScope: val.scope,
              keyWord: this.batchRegisterInfo.keyWord,
              isReqCloud: val.isReqCloud,
            },
            { loadingText: this.$t("myCenter.Registeringinbatch") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.messagePushCommonFun({
                name: res.data.data,
                ID: "",
                serviceUrl: val.addUrl,
                serviceComments: this.batchRegisterInfo.describe,
                serviceClassify: val.power,
                serviceType: val.type,
                request: "batchSave",
                keyWord: this.batchRegisterInfo.keyWord,
                isReqCloud: val.isReqCloud,
              });
              this.batchSuccessDescription = res.data.description;
              this.batchSuccessName = res.data.data.split(",");
              this.batchDialogClose();
              this.batchSuccessVisible = true;
            }
          })
          .catch((error) => {});
      } else {
        this.$api.personalCenterServiceApi
          .saveKqServices(
            {
              serviceUrl: val.addUrl,
              serviceComments: this.batchRegisterInfo.describe,
              serviceClassify: val.power,
              serviceType: val.type,
              permissionListData: JSON.stringify(val.permissionListData),
              serviceScope: val.scope,
              keyWord: this.batchRegisterInfo.keyWord,
              isReqCloud: val.isReqCloud,
            },
            { loadingText: this.$t("myCenter.Registeringinbatch") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.$refs.serviceSharingDialog.messagePushCommonFun({
                name: res.data.data,
                ID: "",
                serviceUrl: val.addUrl,
                serviceComments: this.batchRegisterInfo.describe,
                serviceClassify: val.power,
                serviceType: val.type,
                request: "batchSave",
                keyWord: this.batchRegisterInfo.keyWord,
                isReqCloud: val.isReqCloud,
              });
              this.batchSuccessDescription = res.data.description;
              this.batchSuccessName = res.data.data.split(",");
              this.batchDialogClose();
              this.batchSuccessVisible = true;

              // this.$message({
              //   message: "批量注册服务成功",
              //   type: "success"
              // });
            }
          })
          .catch(() => {});
      }
    },
    handleClose() {
      this.batchSuccessVisible = false;
    },
    //初始获取
    getserviceListByMe() {
      this.$api.personalCenterServiceApi
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
    getServiceCategory() {
      this.$api.personalCenterServiceApi
        .getServiceCategory({ loadingText: this.$t("service.searching") })
        .then((res) => {
          if (res.status == 200) {
            this.arr = [];
            var map = [];
            this.category = res.data.data;
            this.category.forEach((item) => {
              if (item.parentId == 0) {
                map.push(item);
              }
            });
            map.forEach((ar) => {
              this.arr.push(ar);
              this.category.forEach((it) => {
                if (ar.id == it.parentId) {
                  it.typeName = `${ar.typeName} — ${it.typeName}`;
                  this.arr.push(it);
                }
              });
            });
            // var map = {};
            // this.category.forEach(item => {
            //   if (item.parentId) {
            //     if (map[item.parentId]) {
            //       map[item.parentId].push(item);
            //     } else {
            //       map[item.parentId] = [];
            //       map[item.parentId].push(item);
            //     }
            //   }
            // });
            // this.category.forEach(item => {
            //   if (!item.parentId) {
            //     if (map[item.id]) {
            //       item.children = map[item.id];
            //     }
            //       this.arr.push(item);
            //       this.arr.id = item.id;
            //   }
            // });
          }
        });
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
      this.$api.personalCenterServiceApi
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
                  this.$t("myCenter.TheDisplayedMapServiceResourceIs") +
                  selectedName +
                  this.$t("myCenter.yourPermissionIs") +
                  this.$t("myCenter.yourPermissionIsStart") +
                  jurisdictionNameData +
                  this.$t("myCenter.yourPermissionIsEnd");
                messageArr.push(item);
              });
            });
            this.messagePushMap(messageArr);
            this.page = 1;
            this.getserviceListByMe();
          }
        });
    },
    //批量删除
    deleteKqService() {
      console.log(121232132132);
      if (this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickTheService"),
          type: "warning",
        });
        return false;
      }
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          this.$api.personalCenterServiceApi
            .deleteKqService(
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
                      this.$t("myCenter.DeletedTheMapServiceResourceOf") +
                      selectedName +
                      this.$t("myCenter.DeletedTheMapServiceResourceOfEnd");
                    messageDel.push(item);
                  });
                });
                this.messagePushMap(messageDel);
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
      if (val == "") {
        this.selectedData = val;
      }
      this.$api.personalCenterServiceApi
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
                  this.$t("myCenter.TheHiddenMapServiceResourceIs") +
                  selectedName +
                  this.$t("myCenter.andYouAreNotAbleToUseIt");
                messageHide.push(item);
              });
            });
            this.messagePushMap(messageHide);
          }
          this.page = 1;
          this.getserviceListByMe();
        });
    },
    // 消息推送
    messagePushMap(val) {
      console.log(val, "消息推送");
      this.$api.messageApi
        .sendMsgToGroup(
          { list: JSON.stringify(val) },
          { loadingText: this.$t("myCenter.Pushingdata") }
        )
        .then(() => {})
        .catch(() => {});
    },
    // 注册  下一步
    nextStep() {
      this.nextShow = true;
    },
    // 注册  上一步
    backFun() {
      this.nextShow = false;
    },
  },
};
</script>

<style lang='scss' scoped>
.add-service-btn-group {
  text-align: right;
}
.service-btn-group {
  margin-bottom: 10px;
}
.el-table {
  margin-bottom: 13px;
  .department-slash {
    width: 110%;
    border: 1px solid #ebeef5;
    transform: rotate(-25deg) scaleY(0.2);
    -webkit-transform: rotate(-25deg) scaleY(0.2);
    position: absolute;
    text-align: center;
    left: -4px;
  }
}
.pagination {
  margin-bottom: 30px;
}

.el-icon-view {
  color: #3691e9;
}
.el-icon-portal-hide {
  color: #dcdfe6;
}
/deep/.el-switch.is-checked .el-switch__core {
  @include base-bg-color();
}
.stop-status {
  color: #f56c6c;
}
</style>