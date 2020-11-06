<template>
  <div class="sharing-dialog">
    <el-dialog
      :visible.sync="sharingDialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :custom-class="classMark?'class-mark':''"
    >
      <template slot="title">
        <div class="dialog-title">
          <span :class="classMark?'class-mark':''">{{$t("myCenter.SharingSettings")}}</span>
        </div>
      </template>
      <personal-center-service-share
        :classMarkShare="classMark"
        ref="sharedSubmission"
        @sharingNewData="sharingNewData"
        @personalCheckData="personalCheckData"
        :sharingDialogVisible="sharingDialogVisible"
      ></personal-center-service-share>
      <span slot="footer" class="dialog-footer">
        <el-button
          :class="classMark?'class-white-mark':'base-white-btn'"
          @click="handleClose"
        >{{$t('management.cancel')}}</el-button>
        <el-button
          type="primary"
          :class="classMark?'class-mark':'base-btn'"
          @click="saveFun"
        >{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import PersonalCenterServiceShare from "components/personalCenterService/PersonalCenterServiceShare";
import { objectArrayDifferences } from "@/utils/differences.js";
import { getTopPermission } from "@/utils/differences.js";
import x2js from "x2js";
import xmlJson from "../../../independentModules/webAppBuilder/config/configJSON";
export default {
  name: "PersonalCenterServiceSharingDialog",
  components: { PersonalCenterServiceShare },
  props: {
    classMark: {
      //应用定制的类
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      messageSharingName: "",
      serviceListSharing: {},
      permissionListDatas: [],
      scope: "Private",
      serviceName: "",
      messageListDatas: [],
      sharingOldData: [], //共享页面初始数据
      jurisdiction: [], //权限对比
      backups: [], //修改
      unchanged: [], //未改变
      contrast: [], //差异对比
      deleteListUserData: [],
      sharingListData: false,
      hash: [],
      sharingDialogVisible: false, //共享设置弹框
      sharingVal: [],
      flash: "", //弹出信息标识
    };
  },
  updated() {
    if (this.sharingDialogVisible) {
      this.$refs.sharedSubmission.privateDataFuns(this.sharingVal[0]);
    }
  },
  methods: {
    personalCheckData(val) {
      this.sharingListData = val;
    },
    // 取消
    handleClose() {
      this.sharingDialogVisible = false;
    },
    // 确定
    saveFun() {
      this.$refs.sharedSubmission.sharedSubmission({
        ywType: this.serviceListSharing.resourceType,
        sourceId: this.serviceListSharing.id,
      });
      // 判断当前页面是否为空  弹框提示
      if (
        typeof this.sharingListData == "undefined" ||
        (this.sharingListData == false && this.permissionListDatas.length == 0)
      ) {
        this.$message({
          message: this.$t("myCenter.PleasetickSharepermission"),
          type: "warning",
        });
        return false;
      }
      // this.sharingDialogVisible = false;
      // 共享设置
      if (
        this.serviceListSharing.resourceType == "appSave" ||
        this.serviceListSharing.resourceType == "appbuilder"
      ) {
        this.messagePushCommonFun({
          ID: this.serviceListSharing.id,
          name: this.serviceListSharing.name,
          serviceComments: this.serviceListSharing.comments,
          serviceClassify: this.serviceListSharing.appClassify,
          request: this.serviceListSharing.resourceType,
          keyWord: this.serviceListSharing.keyWord,
          personnelId: this.serviceListSharing.personnelId,
        });
      }
      // else if(this.serviceListSharing.resourceType == "fileServiceMulti" ||
      //   this.serviceListSharing.resourceType == "fileSaveMulti"){
      //     // 多文件上传
      //     this.messagePushCommonFun({
      //     ID: this.serviceListSharing.id,
      //     name: this.serviceListSharing.name,
      //     serviceComments: this.serviceListSharing.comments,
      //     serviceClassify: this.serviceListSharing.fileClassify,
      //     referenceId: this.serviceListSharing.referenceId,
      //     request: this.serviceListSharing.resourceType,
      //     keyWord: this.serviceListSharing.keyWord,
      //     personnelId:this.serviceListSharing.personnelId
      //   });
      // }
      else if (
        this.serviceListSharing.resourceType == "fileSave" ||
        this.serviceListSharing.resourceType == "fileService"
      ) {
        this.messagePushCommonFun({
          ID: this.serviceListSharing.id,
          name: this.serviceListSharing.name,
          serviceComments: this.serviceListSharing.comments,
          serviceClassify: this.serviceListSharing.fileClassify,
          referenceId: this.serviceListSharing.referenceId,
          request: "fileServiceSave",
          keyWord: this.serviceListSharing.keyWord,
          personnelId: this.serviceListSharing.personnelId,
        });
      } else if (
        this.serviceListSharing.resourceType == "dataSave" ||
        this.serviceListSharing.resourceType == "data"
      ) {
        this.messagePushCommonFun({
          ID: this.serviceListSharing.id,
          name: this.serviceListSharing.name,
          serviceComments: this.serviceListSharing.comments,
          serviceClassify: this.serviceListSharing.dataClassify,
          referenceId: this.serviceListSharing.referenceId,
          request: this.serviceListSharing.resourceType,
          keyWord: this.serviceListSharing.keyWord,
          personnelId: this.serviceListSharing.personnelId,
        });
      } else if (this.serviceListSharing.resourceType == "mapbuilder") {
        this.messagePushCommonFun({
          ID: this.serviceListSharing.id,
          name: this.serviceListSharing.name,
          serviceComments: this.serviceListSharing.comments,
          serviceClassify: this.serviceListSharing.appClassify,
          request: this.serviceListSharing.resourceType,
          keyWord: this.serviceListSharing.keyWord,
          personnelId: this.serviceListSharing.personnelId,
        });
      } else {
        this.messagePushCommonFun({
          ID: this.serviceListSharing.id,
          name: this.serviceListSharing.name,
          serviceUrl: this.serviceListSharing.serviceUrl,
          serviceType: this.serviceListSharing.serviceType,
          serviceComments: this.serviceListSharing.comments,
          serviceClassify: this.serviceListSharing.serviceClassify,
          request: this.serviceListSharing.resourceType,
          keyWord: this.serviceListSharing.keyWord,
          personnelId: this.serviceListSharing.personnelId,
        });
      }
    },
    // 消息推送公共函数
    messagePushCommonFun(val) {
      this.flash = val.ID;
      this.$api.personalCenterServiceApi
        .selectPermissionByUser(
          {
            messageListData: JSON.stringify(this.messageListDatas),
          },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          if (res.data.status == 200) {
            if (val.name == undefined) {
              //多文件上传
              var fileMultiname = [];
              val.fileListData.forEach((filename) => {
                fileMultiname.push(filename.name);
              });
              this.serviceName = fileMultiname.toString().replace(/,/, "】,【");
            } else {
              this.serviceName = val.name;
              if (val.name.indexOf(",")) {
                this.serviceName = val.name.replace(/,/, "】,【");
              }
            }
            var jurisdictionPush = getTopPermission(
              res.data.data,
              ["toId"],
              ["ywBrowse", "ywEdit", "ywSearch"]
            );
            // 权限汇总
            // 没权限
            var contrastData = JSON.parse(JSON.stringify(jurisdictionPush));
            contrastData.forEach((Element) => {
              if (Element.__SUM == 0 || Element.__OPERATIONAL == "delete") {
                this.deleteListUserData.push(Element);
              }
            });
            // 推送
            var pushMessageData = JSON.parse(JSON.stringify(jurisdictionPush));
            var pushNotSupported = [];
            var name = [];
            var nameData = "";
            pushMessageData.forEach((Element) => {
              var permissionNameData = "";
              var permissionNo = "";
              var permissionName = [];
              if (Element.ywSearch == 1) {
                permissionName.push(this.$t("myCenter.Query"));
              }
              if (Element.ywBrowse == 1) {
                permissionName.push(this.$t("myCenter.Browse"));
              }
              if (Element.ywEdit == 1) {
                permissionName.push(this.$t("myCenter.Edit"));
              }
              if (Element.__OPERATIONAL == "modify") {
                if (permissionName.length == 0) {
                  if (this.messageSharingName == "应用") {
                    permissionNo =
                      this.$store.getters.userInfo.username +
                      "取消了对您名为" +
                      "【" +
                      this.serviceName +
                      "】" +
                      this.$t("myCenter.toyouhasbeencanceled");
                  } else {
                    permissionNo =
                      this.$store.getters.userInfo.username +
                      this.$t("myCenter.Theservicesharingof") +
                      "【" +
                      this.serviceName +
                      "】" +
                      this.$t("myCenter.toyouhasbeencanceled");
                  }
                } else {
                  permissionNameData = permissionName.join("、");
                }
                if (
                  Element.__OPERATIONAL == "delete" &&
                  Element.beforeDelete__SUM == 0
                ) {
                  pushNotSupported.push(Element);
                }
                if (Element.__OPERATIONAL == "unchange") {
                  pushNotSupported.push(Element);
                }
                if (
                  Element.__SUM == 0 &&
                  (Element.__OPERATIONAL == "unchange" ||
                    Element.__OPERATIONAL == "add")
                ) {
                  pushNotSupported.push(Element);
                }
                name = [];
                if (Element.__ADDPERMISSION != undefined) {
                  var permissionNameDataAdd = [];
                  var permissionNameAdd = [];
                  Element.__ADDPERMISSION.forEach((item) => {
                    if (item == "ywSearch") {
                      permissionNameAdd.push(this.$t("myCenter.Query"));
                    }
                    if (item == "ywBrowse") {
                      permissionNameAdd.push(this.$t("myCenter.Browse"));
                    }
                    if (item == "ywEdit") {
                      permissionNameAdd.push(this.$t("myCenter.Edit"));
                    }
                  });
                  permissionNameDataAdd = permissionNameAdd.join("、");
                  name.push(
                    this.$t("myCenter.Added") +
                      permissionNameDataAdd +
                      this.$t("myCenter.permissionhasbeenadded")
                  );
                }
                if (Element.__DELETEPERMISSION != undefined) {
                  var permissionNameDataDel = [];
                  var permissionNameDel = [];
                  Element.__DELETEPERMISSION.forEach((item) => {
                    if (item == "ywSearch") {
                      permissionNameDel.push(this.$t("myCenter.Query"));
                    }
                    if (item == "ywBrowse") {
                      permissionNameDel.push(this.$t("myCenter.Browse"));
                    }
                    if (item == "ywEdit") {
                      permissionNameDel.push(this.$t("myCenter.Edit"));
                    }
                  });
                  permissionNameDataDel = permissionNameDel.join("、");
                  name.push(
                    this.$t("myCenter.Cancelled") +
                      permissionNameDataDel +
                      this.$t("myCenter.permissionhasbeencanceled")
                  );
                }
                nameData = name.join(",");
                if (
                  !(
                    typeof permissionNo == "undefined" ||
                    permissionNo == null ||
                    permissionNo == ""
                  )
                ) {
                  Element.message = permissionNo;
                } else {
                  permissionNameData = permissionName.join("、");
                  if (this.messageSharingName == "应用") {
                    Element.message =
                      this.$store.getters.userInfo.username +
                      this.$t("myCenter.ModifyTheNameOf") +
                      "【" +
                      this.serviceName +
                      "】" +
                      this.$t("myCenter.resourceof") +
                      this.messageSharingName +
                      this.$t("myCenter.servicepermission") +
                      nameData +
                      this.$t("myCenter.Nowyouhave") +
                      permissionNameData +
                      this.$t("myCenter.permission");
                  } else {
                    Element.message =
                      this.$store.getters.userInfo.username +
                      this.$t("myCenter.hasmodifiedyourpermissionto") +
                      "【" +
                      this.serviceName +
                      "】" +
                      this.$t("myCenter.resourceof") +
                      this.messageSharingName +
                      this.$t("myCenter.servicepermission") +
                      nameData +
                      this.$t("myCenter.Nowyouhave") +
                      permissionNameData +
                      this.$t("myCenter.permission");
                  }
                }
              }
              if (Element.__SUM != 0 && Element.__OPERATIONAL == "add") {
                permissionNameData = permissionName.join("、");
                if (this.serviceName.indexOf(",")) {
                  if (this.messageSharingName == "应用") {
                    Element.message =
                      this.$store.getters.userInfo.username +
                      this.$t("myCenter.BatchShareTheNameOf") +
                      "【" +
                      this.serviceName +
                      "】" +
                      this.$t("myCenter.resourceof") +
                      this.messageSharingName +
                      this.$t("myCenter.servicetoyouNowyouhave") +
                      permissionNameData +
                      this.$t("myCenter.permission");
                  } else {
                    Element.message =
                      this.$store.getters.userInfo.username +
                      this.$t("myCenter.hasshared") +
                      "【" +
                      this.serviceName +
                      "】" +
                      this.$t("myCenter.resourceof") +
                      this.messageSharingName +
                      this.$t("myCenter.servicetoyouNowyouhave") +
                      permissionNameData +
                      this.$t("myCenter.permission");
                  }
                } else {
                  if (this.messageSharingName == "应用") {
                    Element.message =
                      this.$store.getters.userInfo.username +
                      this.$t("myCenter.ShareTheNameOf") +
                      "【" +
                      this.serviceName +
                      "】" +
                      this.$t("myCenter.resourceof") +
                      this.messageSharingName +
                      this.$t("myCenter.serviceinbatchtoyouNowyouhave") +
                      permissionNameData +
                      this.$t("myCenter.permission");
                  } else {
                    Element.message =
                      this.$store.getters.userInfo.username +
                      this.$t("myCenter.hasshareds") +
                      "【" +
                      this.serviceName +
                      "】" +
                      this.$t("myCenter.resourceof") +
                      this.messageSharingName +
                      this.$t("myCenter.serviceinbatchtoyouNowyouhave") +
                      permissionNameData +
                      this.$t("myCenter.permission");
                  }
                }
              }
              if (
                Element.beforeDelete__SUM != 0 &&
                Element.__OPERATIONAL == "delete"
              ) {
                if (this.messageSharingName == "应用") {
                  Element.message =
                    this.$store.getters.userInfo.username +
                    this.$t("myCenter.CancelTheNameOf") +
                    "【" +
                    this.serviceName +
                    "】" +
                    this.$t("myCenter.resourceof") +
                    this.messageSharingName +
                    this.$t("myCenter.servicetoyou");
                } else {
                  Element.message =
                    this.$store.getters.userInfo.username +
                    this.$t("myCenter.hascanceledthesharingof") +
                    "【" +
                    this.serviceName +
                    "】" +
                    this.$t("myCenter.resourceof") +
                    this.messageSharingName +
                    this.$t("myCenter.servicetoyou");
                }
              }
            });
            if (pushMessageData.indexOf(pushNotSupported) !== -1) {
              return true;
            }
            this.hash = [];
            pushMessageData.forEach((item) => {
              var folt = false;
              if (item.__OPERATIONAL == "unchange") {
                folt = true;
              } else {
                pushNotSupported.forEach((Element) => {
                  if (Element.grantId == item.grantId) {
                    folt = true;
                    return false;
                  }
                });
              }
              if (!folt) {
                this.hash.push(item);
              }
            });
          }
          if (val.request == "batchSave") {
            this.$emit("getserviceListByMe");
            this.messagePushFun(this.hash);
          } else if (val.request == "save" || val.request == "mapService") {
            if (this.scope == "Private") {
              this.$api.personalCenterServiceApi
                .saveKqService({
                  id: val.ID,
                  name: val.name,
                  serviceUrlIp: val.serviceUrlIp,
                  serviceUrlName: val.serviceUrlName,
                  serviceType: val.serviceType,
                  serviceComments: val.serviceComments,
                  serviceClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  serviceScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  isReqCloud: val.isReqCloud,
                  personnelId: val.personnelId,
                  proxyUrl: val.proxyUrl || null,
                  proxyName: val.proxyName || null,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.MapServiceRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch((error) => {
                  if (error.data.status == "297") {
                    this.$message({
                      message: error.data.title,
                      type: "error",
                    });
                  }
                });
            } else {
              this.$api.personalCenterServiceApi
                .saveKqService({
                  id: val.ID,
                  name: val.name,
                  serviceUrlIp: val.serviceUrlIp,
                  serviceUrlName: val.serviceUrlName,
                  serviceType: val.serviceType,
                  serviceComments: val.serviceComments,
                  serviceClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  serviceScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  isReqCloud: val.isReqCloud,
                  personnelId: val.personnelId,
                  proxyUrl: val.proxyUrl || null,
                  proxyName: val.proxyName || null,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.MapServiceRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch((error) => {
                  if (error.data.status == "297") {
                    this.$message({
                      message: error.data.title,
                      type: "error",
                    });
                  }
                });
            }
          } else if (val.request == "save" || val.request == "scenebuilder") {
            if (this.scope == "Private") {
              this.$api.webSceneBuilderApi
                .saveSceneAppService({
                  id: val.ID,
                  name: val.name,
                  sceneAppComments: val.serviceComments,
                  sceneAppClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  sceneAppScope: this.scope,
                  configXML: configXML,
                  configJSON: configJSON,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    // this.$emit("getserviceListByMe");
                    // this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.Registeredthescenesuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.webSceneBuilderApi
                .saveSceneAppService({
                  id: val.ID,
                  name: val.name,
                  sceneAppComments: val.serviceComments,
                  sceneAppClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  sceneAppScope: this.scope,
                  configXML: configXML,
                  configJSON: configJSON,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    // this.$emit("getserviceListByMe");
                    // this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.Registeredthescenesuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else if (val.request == "appSave" || val.request == "appbuilder") {
            var jsXmlUtil = new x2js();
            var copyXmlJson = JSON.parse(JSON.stringify(xmlJson));
            var configXML = jsXmlUtil.js2xml(copyXmlJson);
            var configJSON = copyXmlJson;
            if (this.scope == "Private") {
              this.$api.personalCenterAppApi
                .saveAppService({
                  id: val.ID,
                  name: val.name,
                  appComments: val.serviceComments,
                  appClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  scope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  configXML: configXML,
                  configJSON: configJSON,
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    this.$emit("getServiceDetails", {
                      appId: val.ID,
                      appMes: true,
                    });
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t("management.AppCreatedSuccessfully"),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.personalCenterAppApi
                .saveAppService({
                  id: val.ID,
                  name: val.name,
                  appComments: val.serviceComments,
                  appClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  scope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  configXML: configXML,
                  configJSON: configJSON,
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    this.$emit("getServiceDetails", {
                      appId: val.ID,
                      appMes: true,
                    });
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t("management.AppCreatedSuccessfully"),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else if (
            val.request == "fileServiceMulti" ||
            val.request == "fileSaveMulti"
          ) {
            if (this.scope == "Private") {
              this.$api.personalFileServiceApi
                .savefileResourceService({
                  id: val.ID,
                  fileListData: JSON.stringify(val.fileListData),
                  fileClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  fileScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogMultiClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.MyFileRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.personalFileServiceApi
                .savefileResourceService({
                  id: val.ID,
                  fileListData: JSON.stringify(val.fileListData),
                  fileClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  fileScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogMultiClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.MyFileRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else if (
            val.request == "fileServiceFolder" ||
            val.request == "fileSaveFolder"
          ) {
            // 文件夹上传
            if (this.scope == "Private") {
              this.$api.personalFileServiceApi
                .savefileResourceService({
                  id: val.ID,
                  // name: val.name,
                  fileComments: val.serviceComments,
                  fileClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  fileScope: this.scope,
                  fileListData: JSON.stringify(val.fileListData),
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  folderName: val.folderName,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogFolderClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.MyFileRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.personalFileServiceApi
                .savefileResourceService({
                  id: val.ID,
                  // name: val.name,
                  fileComments: val.serviceComments,
                  fileClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  fileScope: this.scope,
                  fileListData: JSON.stringify(val.fileListData),
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  folderName: val.folderName,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogFolderClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.MyFileRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else if (
            val.request == "fileSave" ||
            val.request == "fileServiceSave"
          ) {
            if (this.scope == "Private") {
              this.$api.personalFileServiceApi
                .savefileResourceService({
                  id: val.ID,
                  name: val.name,
                  fileComments: val.serviceComments,
                  fileClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  fileScope: this.scope,
                  fileListData: JSON.stringify(val.fileListData),
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.MyFileRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.personalFileServiceApi
                .savefileResourceService({
                  id: val.ID,
                  name: val.name,
                  fileComments: val.serviceComments,
                  fileClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  fileScope: this.scope,
                  fileListData: JSON.stringify(val.fileListData),
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.MyFileRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else if (
            val.request == "fileSave" ||
            val.request == "fileService"
          ) {
            if (this.scope == "Private") {
              this.$api.personalFileServiceApi
                .savefileResourceService({
                  // id: val.ID,
                  // name: val.name,
                  // fileComments: val.serviceComments,
                  // fileClassify: val.serviceClassify,
                  // permissionListData: JSON.stringify(this.permissionListDatas),
                  // fileScope: this.scope,
                  // fileListData:JSON.stringify(val.fileListData),
                  // deleteListUserData: JSON.stringify(this.deleteListUserData),
                  // keyWord: val.keyWord,
                  // personnelId:val.personnelId
                  id: val.ID,
                  fileListData: JSON.stringify(val.fileListData),
                  fileClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  fileScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.MyFileRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.personalFileServiceApi
                .savefileResourceService({
                  // id: val.ID,
                  // name: val.name,
                  // fileComments: val.serviceComments,
                  // fileClassify: val.serviceClassify,
                  // permissionListData: JSON.stringify(this.permissionListDatas),
                  // fileScope: this.scope,
                  // fileListData:JSON.stringify(val.fileListData),
                  // deleteListUserData: JSON.stringify(this.deleteListUserData),
                  // keyWord: val.keyWord,
                  // personnelId:val.personnelId
                  id: val.ID,
                  fileListData: JSON.stringify(val.fileListData),
                  fileClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  fileScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.MyFileRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else if (val.request == "dataSave" || val.request == "data") {
            if (this.scope == "Private") {
              this.$api.personalDatacenterServiceApi
                .saveData({
                  id: val.ID,
                  name: val.name,
                  dataComments: val.serviceComments,
                  dataClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  dataScope: this.scope,
                  referenceId: val.referenceId,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  fileSuffix: val.fileSuffix,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.Registeredmydatasuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.personalDatacenterServiceApi
                .saveData({
                  id: val.ID,
                  name: val.name,
                  dataComments: val.serviceComments,
                  dataClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  dataScope: this.scope,
                  referenceId: val.referenceId,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  fileSuffix: val.fileSuffix,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.Registeredmydatasuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else if (
            val.request == "sceneSave" ||
            val.request == "sceneService"
          ) {
            if (this.scope == "Private") {
              this.$api.personalSceneServiceApi
                .savesceneService({
                  id: val.ID,
                  name: val.name,
                  serviceUrl: val.serviceUrl,
                  serviceType: val.serviceType,
                  serviceComments: val.serviceComments,
                  serviceClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  serviceScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.ThreeDServiceRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.personalSceneServiceApi
                .savesceneService({
                  id: val.ID,
                  name: val.name,
                  serviceUrl: val.serviceUrl,
                  serviceType: val.serviceType,
                  serviceComments: val.serviceComments,
                  serviceClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  serviceScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.ThreeDServiceRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else if (
            val.request == "dataServiceSave" ||
            val.request == "dataService"
          ) {
            if (this.scope == "Private") {
              this.$api.personalDataServiceApi
                .saveDataService({
                  id: val.ID,
                  name: val.name,
                  serviceUrl: val.serviceUrl,
                  serviceType: val.serviceType,
                  serviceComments: val.serviceComments,
                  serviceClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  serviceScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "myCenter.Thedataserviceisregisteredsuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.personalDataServiceApi
                .saveDataService({
                  id: val.ID,
                  name: val.name,
                  serviceUrl: val.serviceUrl,
                  serviceType: val.serviceType,
                  serviceComments: val.serviceComments,
                  serviceClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  serviceScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "myCenter.Thedataserviceisregisteredsuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else if (
            val.request == "saveFunction" ||
            val.request == "functionService"
          ) {
            if (this.scope == "Private") {
              this.$api.personalFunctionServiceApi
                .saveFunctionServices({
                  id: val.ID,
                  name: val.name,
                  serviceUrl: val.serviceUrl,
                  serviceComments: val.serviceComments,
                  serviceClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  serviceScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  isReqProxyUrl: val.isReqProxyUrl,
                  proxyName: val.proxyName,
                  proxyUrl: val.proxyUrl,
                  personnelId: val.personnelId,
                  resultExample: val.resultExample,
                  paramsInfoList: val.paramsInfoList,
                  errorCodeList: val.errorCodeList,
                  requestMethod: val.requestMethod,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.FunctionServiceRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.personalFunctionServiceApi
                .saveFunctionServices({
                  id: val.ID,
                  name: val.name,
                  serviceUrl: val.serviceUrl,
                  serviceComments: val.serviceComments,
                  serviceClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  serviceScope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  isReqProxyUrl: val.isReqProxyUrl,
                  proxyName: val.proxyName,
                  proxyUrl: val.proxyUrl,
                  personnelId: val.personnelId,
                  resultExample: val.resultExample,
                  paramsInfoList: val.paramsInfoList,
                  errorCodeList: val.errorCodeList,
                  requestMethod: val.requestMethod,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    this.$emit("getserviceListByMe");
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.FunctionServiceRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else if (
            val.request == "savemapbuilder" ||
            val.request == "mapbuilder"
          ) {
            if (this.scope == "Private") {
              this.$api.webMapBuilderApi
                .updataMapbuilder({
                  id: val.ID,
                  name: val.name,
                  comments: val.serviceComments,
                  mapbuilerClassify: val.serviceClassify,
                  permissionListData: JSON.stringify([]),
                  scope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    // this.$emit("getserviceListByMe");
                    // this.$emit("getServiceDetails", val.ID);
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.FunctionServiceRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            } else {
              this.$api.webMapBuilderApi
                .updataMapbuilder({
                  id: val.ID,
                  name: val.name,
                  comments: val.serviceComments,
                  mapbuilerClassify: val.serviceClassify,
                  permissionListData: JSON.stringify(this.permissionListDatas),
                  scope: this.scope,
                  deleteListUserData: JSON.stringify(this.deleteListUserData),
                  keyWord: val.keyWord,
                  personnelId: val.personnelId,
                })
                .then((res) => {
                  if (res.data.status == 200) {
                    // this.$emit("getserviceListByMe");
                    // this.$emit("getServiceDetails", val.ID);
                    this.$emit("dialogClose");
                    if (this.flash == "") {
                      this.$message({
                        message: this.$t(
                          "management.FunctionServiceRegisteredSuccessfully"
                        ),
                        type: "success",
                      });
                    }
                    this.messagePushFun(this.hash);
                  }
                })
                .catch(() => {});
            }
          } else {
            this.messagePushFun(this.hash);
          }
        });
    },
    // 消息推送
    messagePushFun(val) {
      // this.sharingDialogVisible = false;
      // if (this.flash != "") {
      // this.$message({
      //   message: this.$t('myCenter.Sharingsettingssucceeded'),
      //   type: "success"
      // });
      // }
      this.$api.messageApi
        .sendMsgToGroup(
          { list: JSON.stringify(val) },
          { loadingText: this.$t("myCenter.Pushingdata") }
        )
        .then(() => {
          this.sharingDialogVisible = false;
          if (this.flash != "") {
            this.$message({
              message: this.$t("management.ShareModeChangedSuccessfully"),
              type: "success",
            });
          }
        })
        .catch(() => {});
    },
    //获取用户所填数据
    sharingNewData(val) {
      let copyPermissionListDatas = JSON.parse(
        JSON.stringify(val.permissionListDatas)
      );
      // 冒泡给应用定制
      if (this.classMark) {
        this.$emit("sharingSetsBubbling", val);
      }
      this.scope = val.scope;
      this.permissionListDatas = val.permissionListDatas;
      var oldArray = [];
      // 差异对比
      if (val.scope == "Partial") {
        // 私有转部分
        if (this.sharingOldData.length == 0) {
          oldArray = [];
        } else {
          this.sharingOldData.forEach((Element) => {
            copyPermissionListDatas.forEach((item) => {
              if (Element.C_GRANT_ID == item.grantId) {
                item.id = Element.C_ID;
              }
            });
          });
          oldArray = [];
          this.sharingOldData.forEach((Element) => {
            var oldObj = {};
            oldObj.ids = Element.C_GRANT_ID;
            oldObj.id = Element.C_ID;
            oldObj.ywBrowse = Element.C_YW_BROWSE;
            oldObj.ywEdit = Element.C_YW_EDIT;
            oldObj.ywSearch = Element.C_YW_SEARCH;
            oldObj.grantType = Element.C_GRANT_TYPE;
            oldObj.grantId = Element.C_GRANT_ID;
            oldObj.departmentId = Element.C_DEPARTMENT_ID;
            oldObj.createBy = Element.C_CREATE_BY;
            oldObj.ywType = Element.C_YW_TYPE;
            oldObj.sourceId = Element.C_SOURCE_ID;
            oldArray.push(oldObj);
          });
        }
        this.contrast = [];
        this.contrast = objectArrayDifferences(
          oldArray,
          copyPermissionListDatas,
          {
            addRules: "id",
            modifyRules: "id",
            deleteRules: "id",
          }
        );
        var contrastSum = [];
        this.contrast.modifyArray.forEach((Element) => {
          contrastSum.push(Element);
          Element.__OPERATIONAL = "modify";
        });
        if (oldArray.length == 0) {
          this.backups = [];
        } else {
          this.backups = [];
          oldArray.forEach((item) => {
            this.contrast.modifyArray.forEach((Element) => {
              if (item.id == Element.id) {
                // 将修改数据另存一份
                item.__OPERATIONAL = "last";
                this.backups.push(item);
              }
            });
          });
        }
        // 新增
        this.contrast.addArray.forEach((Element) => {
          contrastSum.push(Element);
          Element.__OPERATIONAL = "add";
        });
        // 删除
        this.contrast.deleteArray.forEach((Element) => {
          contrastSum.push(Element);
          Element.__OPERATIONAL = "delete";
        });
        // 没有改变的数据 unchanged
        this.sharingOldData.forEach((item) => {
          var isExist = false;
          contrastSum.forEach((Element) => {
            if (Element.grantId == item.C_GRANT_ID) {
              isExist = true;
              return false;
            }
          });
          if (!isExist) {
            item.__OPERATIONAL = "unchanged";
            this.unchanged.push(item);
          }
        });
      } else if (val.scope == "Public") {
        // 私有转公开
        if (this.sharingOldData.length == 0) {
          oldArray = [];
        } else {
          this.sharingOldData.forEach((Element) => {
            copyPermissionListDatas.forEach((item) => {
              if (Element.C_GRANT_ID == item.grantId) {
                item.id = Element.C_ID;
              }
            });
          });
          oldArray = [];
          this.sharingOldData.forEach((Element) => {
            var oldObj = {};
            oldObj.ids = Element.C_GRANT_ID;
            oldObj.id = Element.C_ID;
            oldObj.ywBrowse = Element.C_YW_BROWSE;
            oldObj.ywEdit = Element.C_YW_EDIT;
            oldObj.ywSearch = Element.C_YW_SEARCH;
            oldObj.grantType = Element.C_GRANT_TYPE;
            oldObj.grantId = Element.C_GRANT_ID;
            oldObj.departmentId = Element.C_DEPARTMENT_ID;
            oldObj.createBy = Element.C_CREATE_BY;
            oldObj.ywType = Element.C_YW_TYPE;
            oldObj.sourceId = Element.C_SOURCE_ID;
            oldArray.push(oldObj);
          });
        }
        this.contrast = [];
        this.contrast = objectArrayDifferences(
          oldArray,
          copyPermissionListDatas,
          {
            addRules: "id",
            modifyRules: "id",
            deleteRules: "id",
          }
        );
        var contrastSumPublic = [];
        this.contrast.modifyArray.forEach((Element) => {
          contrastSumPublic.push(Element);
          Element.__OPERATIONAL = "modify";
        });
        if (oldArray.length == 0) {
          this.backups = [];
        } else {
          this.backups = [];
          oldArray.forEach((item) => {
            this.contrast.modifyArray.forEach((Element) => {
              contrastSumPublic.push(Element);
              if (item.id == Element.id) {
                // 将修改数据另存一份
                item.__OPERATIONAL = "last";
                this.backups.push(item);
              }
            });
          });
        }
        // 新增
        this.contrast.addArray.forEach((Element) => {
          contrastSumPublic.push(Element);
          Element.__OPERATIONAL = "add";
        });
        // 删除
        this.contrast.deleteArray.forEach((Element) => {
          contrastSumPublic.push(Element);
          Element.__OPERATIONAL = "delete";
        });
        // 没有改变的数据 unchanged
        this.sharingOldData.forEach((item) => {
          var isExist = false;
          contrastSumPublic.forEach((Element) => {
            if (Element.grantId == item.C_GRANT_ID) {
              isExist = true;
              return false;
            }
          });
          if (!isExist) {
            item.__OPERATIONAL = "unchanged";
            this.unchanged.push(item);
          }
        });
      } else {
        // 私有
        this.sharingOldData.forEach((Element) => {
          copyPermissionListDatas.forEach((item) => {
            if (Element.C_GRANT_ID == item.grantId) {
              item.id = Element.C_ID;
            }
          });
        });
        oldArray = [];
        this.sharingOldData.forEach((Element) => {
          var oldObj = {};
          oldObj.ids = Element.C_GRANT_ID;
          oldObj.id = Element.C_ID;
          oldObj.ywBrowse = Element.C_YW_BROWSE;
          oldObj.ywEdit = Element.C_YW_EDIT;
          oldObj.ywSearch = Element.C_YW_SEARCH;
          oldObj.grantType = Element.C_GRANT_TYPE;
          oldObj.grantId = Element.C_GRANT_ID;
          oldObj.departmentId = Element.C_DEPARTMENT_ID;
          oldObj.createBy = Element.C_CREATE_BY;
          oldObj.ywType = Element.C_YW_TYPE;
          oldObj.sourceId = Element.C_SOURCE_ID;
          oldArray.push(oldObj);
        });
        this.contrast = [];
        this.contrast = objectArrayDifferences(
          oldArray,
          copyPermissionListDatas,
          {
            addRules: "id",
            modifyRules: "id",
            deleteRules: "id",
          }
        );
        var contrastSumPrivate = [];
        this.contrast.modifyArray.forEach((Element) => {
          contrastSumPrivate.push(Element);
          Element.__OPERATIONAL = "modify";
        });
        this.backups = [];
        oldArray.forEach((item) => {
          this.contrast.modifyArray.forEach((Element) => {
            contrastSumPrivate.push(Element);
            if (item.id == Element.id) {
              // 将修改数据另存一份
              item.__OPERATIONAL = "last";
              this.backups.push(item);
            }
          });
        });
        // 新增
        this.contrast.addArray.forEach((Element) => {
          contrastSumPrivate.push(Element);
          Element.__OPERATIONAL = "add";
        });
        // 删除
        this.contrast.deleteArray.forEach((Element) => {
          contrastSumPrivate.push(Element);
          Element.__OPERATIONAL = "delete";
        });
        // 没有改变的数据 unchanged
        this.sharingOldData.forEach((item) => {
          var isExist = false;
          contrastSumPrivate.forEach((Element) => {
            if (Element.grantId == item.C_GRANT_ID) {
              isExist = true;
              return false;
            }
          });
          if (!isExist) {
            item.__OPERATIONAL = "unchanged";
            this.unchanged.push(item);
          }
        });
      }
      var jurisdictionArr = [];
      jurisdictionArr = this.contrast.addArray.concat(
        this.contrast.deleteArray,
        this.contrast.modifyArray,
        this.backups,
        this.unchanged
      );
      this.messageListDatas = jurisdictionArr;
    },
    privateDataFun(val) {
      var data = [];
      this.sharingVal = [];
      this.sharingDialogVisible = true;
      this.serviceListSharing = val.serviceListSharing;
      this.messageSharingName = val.messageSharingName;
      if (
        val.messageSharingName == "应用" &&
        val.serviceListSharing.scope == null
      ) {
        val.serviceListSharing.scope = "Private";
      }
      if (val.serviceListSharing.scope == "Private") {
        this.sharingOldData = [];
        this.sharingOldData = val.checkList;
        data = [];
      } else if (val.serviceListSharing.scope == "Public") {
        // 公开
        data = [];
        this.sharingOldData = [];
        val.checkList.forEach((element) => {
          if (element.C_GRANT_TYPE != "Private") {
            this.sharingOldData.push(element);
            data.push({
              name:
                element.C_GRANT_TYPE == "Personal"
                  ? element.USERNAME
                  : element.GROUPNAME,
              ywBrowseCheck: element.C_YW_BROWSE == 1 ? true : false,
              ywEditCheck: element.C_YW_EDIT == 1 ? true : false,
              ywSearchCheck: element.C_YW_SEARCH == 1 ? true : false,
              type:
                element.C_GRANT_TYPE == "Personal"
                  ? this.$t("myCenter.Personal")
                  : this.$t("myCenter.Group"),
              id: element.C_GRANT_ID,
              ywSearchShow: true,
              ywBrowseShow: true,
              ywEditShow: true,
              department: element.DEPARTMENTNAME,
            });
          }
        });
      } else if (val.serviceListSharing.scope == "Partial") {
        // 部分
        data = [];
        this.sharingOldData = [];
        val.checkList.forEach((element) => {
          if (element.C_GRANT_TYPE != "Private") {
            this.sharingOldData.push(element);
            data.push({
              name:
                element.C_GRANT_TYPE == "Personal"
                  ? element.USERNAME
                  : element.GROUPNAME,
              ywBrowseCheck: element.C_YW_BROWSE == 1 ? true : false,
              ywEditCheck: element.C_YW_EDIT == 1 ? true : false,
              ywSearchCheck: element.C_YW_SEARCH == 1 ? true : false,
              type:
                element.C_GRANT_TYPE == "Personal"
                  ? this.$t("myCenter.Personal")
                  : this.$t("myCenter.Group"),
              id: element.C_GRANT_ID,
              ywSearchShow: true,
              ywBrowseShow: true,
              ywEditShow: true,
              department: element.DEPARTMENTNAME,
              onlyId: element.C_DEPARTMENT_ID + "-" + element.C_GRANT_ID,
            });
          }
        });
      }
      this.sharingVal.push({
        sharingOldData: this.sharingOldData,
        serviceListSharing: val.serviceListSharing,
        data: data,
        checkList: val.checkList,
      });
    },
  },
};
</script>
<style lang='scss' scoped>
.sharing-dialog {
  /deep/.el-dialog__wrapper {
    .el-dialog__body {
      padding: 10px 20px;
    }
    .dialog-title {
      padding-bottom: 20px;
      @include manage-border(
        $types: (
          "bottom",
        )
      );
      span {
        @include dialog-title($width: 2px);
        padding-bottom: 18px;
        &.class-mark {
          box-shadow: 0px 2px 0px #3691e9;
          padding-bottom: 18px;
        }
      }
    }
  }
  .dialog-footer {
    .class-mark {
      background: #3691e9;
      color: #fff;
    }
    .class-white-mark:hover {
      background: #fff;
      color: #3691e9;
      border-color: #3691e9;
    }
  }
}
</style>
<style>
/*弹出窗关闭按钮*/
.class-mark .el-dialog__header .el-dialog__headerbtn:focus .el-dialog__close {
  color: #3691e9 !important;
}
.class-mark .el-dialog__header .el-dialog__headerbtn:hover .el-dialog__close {
  color: #3691e9 !important;
}
</style>