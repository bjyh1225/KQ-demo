<template>
  <div id="map-details">
    <div class="details-title">
      <span class="details-title-left">{{isDetails.C_NAME}}</span>
      <span class="details-title-right" @click="returnMapShow">
        <i class="el-icon-back"></i>
        {{$t('service.back')}}
      </span>
    </div>
    <div class="details-background" v-if="detailsNoEdit">
      <el-row class="details-operation" v-if="isDetails.YWEDIT>0">
        <el-col>
          <el-button
            type="primary base-btn"
            icon="el-icon-portal-share-set"
            @click="sharingMapBuilder(isDetails)"
            size="small"
            v-if="isDetails.USERNAME==$store.getters.userInfo.username"
          >{{$t('myCenter.SharingSettings')}}</el-button>
          <el-button
            type="primary base-btn"
            icon="el-icon-edit"
            @click="edit"
            size="small"
          >{{$t('myCenter.Editproperties')}}</el-button>
          <el-button
            type="primary base-btn"
            icon="el-icon-delete"
            @click="batchDel"
            size="small"
            v-if="isDetails.USERNAME==$store.getters.userInfo.username"
          >{{$t('management.delete')}}</el-button>
        </el-col>
      </el-row>
      <div class="details-exhibition">
        <el-row :gutter="100">
          <el-col :span="8" class="details-left">
            <div>
              <img :src="isDetails.C_IMG?isDetails.C_IMG:defaultSrc" alt />
            </div>
          </el-col>
          <el-col :span="16" class="details-right">
            <el-row>
              <el-col class="details-right-title">
                <span class="details-right-title-left">{{$t('myCenter.Basicinfo')}}</span>
              </el-col>
              <el-col class="details-right-content falst-right-content">
                <span>{{$t('myCenter.Name')}}:</span>
                <span>{{isDetails.C_NAME}}</span>
              </el-col>
              <el-col class="details-right-content">
                <span>{{$t('portalStatistics.Owner')}}:</span>
                <span>{{isDetails.USERNAME}}</span>
              </el-col>
              <el-col class="details-right-content">
                <span>{{$t('service.description')}}:</span>
                <span>{{isDetails.C_COMMENTS}}</span>
              </el-col>
              <el-col class="details-right-content-kwork">
                <span class="kwork-tlite">{{$t('service.label')}}:</span>
                <div class="message-kwork-box">
                  <span
                    v-for="(kwork,i) in keyWorkArray"
                    class="chart-message-kwork"
                    :key="i"
                  >{{kwork}}</span>
                </div>
              </el-col>
              <el-col class="details-right-content">
                <span>{{$t('management.creationTime')}}:</span>
                <span>{{isDetails.C_CREATE_TIME}}</span>
              </el-col>
              <el-col class="details-right-content">
                <span>{{$t('portalStatistics.Visitss')}}:</span>
                <span>{{isDetails.c_hits}}</span>
              </el-col>
              <el-col class="details-right-content">
                <span>{{$t('service.collect')}}:</span>
                <span>{{isDetails.COLLECTION_TIME==null?$t('service.uncollected'):$t('service.collected')}}</span>
              </el-col>
              <el-col class="details-right-content">
                <span>{{$t('service.visibility')}}</span>
                <span>{{isDetails.YWBROWSE>0?$t('service.visible'):$t('service.Invisible')}}</span>
              </el-col>
              <el-col class="details-right-content">
                <span>{{$t('myCenter.BrowseURL')}}:</span>
                <span
                  class="pseudo-jump"
                  target="_blank"
                  v-if="$store.getters.isLogin&&(isDetails.C_SERVICE_URL||(isDetails.C_RESOURCE_TYPE=='appbuilder'&&isDetails.YWBROWSE>0)||(isDetails.C_RESOURCE_TYPE=='mapbuilder'&&isDetails.YWBROWSE>0))"
                  @click="urlReplace(isDetails)"
                >{{isDetails.C_SERVICE_URL||resUrl}}</span>
                <span v-else class="popover-box">
                  <el-popover
                    placement="right"
                    width="300"
                    trigger="click"
                    popper-class="login-popper"
                    v-model="visible"
                  >
                    <el-input
                      type="textarea"
                      :rows="3"
                      :placeholder="$t('service.PleaseEnterYourApplicationReasonAndPhoneNumber')"
                      v-model="applicationAuthorizationReason"
                    ></el-input>
                    <el-button
                      type="primary"
                      class="base-btn"
                      @click="save"
                      @click.stop
                    >{{$t('myCenter.Sure')}}</el-button>
                    <el-button
                      type="primary"
                      icon="el-icon-portal-siyou"
                      slot="reference"
                      @click="applicationAuthorization"
                      :disabled="isDetails.AUDITSCOPE==0?true:false"
                      :class="isDetails.AUDITSCOPE==0?'in-audit':'base-btn'"
                    >{{isDetails.AUDITSCOPE==0?$t('management.InReview'):$t('service.ApplyPermission')}}</el-button>
                  </el-popover>
                </span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
    <manage-builder-category-details-edit
      v-else
      :isDetails="isDetails"
      :defaultSrc="defaultSrc"
      :registerInfo="registerInfo"
      @detailsEditShow="detailsEditShow"
      :arr="builderArr"
      @hold="hold"
    ></manage-builder-category-details-edit>
    <personal-center-service-sharing-dialog
      ref="serviceSharingDialog"
      @getServiceDetails="getServiceDetails"
    ></personal-center-service-sharing-dialog>
  </div>
</template>
<script>
import { urlReplace } from "@/utils/urlReplace.js";
import PersonalCenterServiceSharingDialog from "components/personalCenterService/PersonalCenterServiceSharingDialog";
import ManageBuilderCategoryDetailsEdit from "components/manageMapDraftingCategory/ManageBuilderCategoryDetailsEdit";
export default {
  props: {
    isDetails: {
      type: Object,
      default() {
        return {};
      }
    },
    defaultSrc: {
      type: String,
      default() {
        return "/config/imageConfig/function/mapService/mapService1.png";
      }
    },
    builderArr: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      resUrl: "",
      applicationAuthorizationReason: "",
      visible: false,
      detailsNoEdit: true,
      registerInfo: {
        power: "",
        name: "",
        comments: "",
        keyWord: ""
      }
    };
  },
  computed: {
    keyWorkArray() {
      if (this.isDetails.C_KEYWORD) {
        return this.isDetails.C_KEYWORD.split(",");
      } else {
        return [];
      }
    }
  },
  components: {
    ManageBuilderCategoryDetailsEdit,
    PersonalCenterServiceSharingDialog
  },
  name: "ManageBuilderCategoryDetails",
  watch: {
    isDetails() {
      this.$nextTick(() => {
        this.typeHandle();
      });
    },
    builderArr() {
      if (this.builderArr.length != 0) {
        this.builderArr.forEach(item => {
          if(item.children){
          item.children.forEach(ic => {
            if (ic.id == this.isDetails.C_APP_CLASSIFY) {
               this.registerInfo = {
                name: this.isDetails.C_NAME,
                comments: this.isDetails.C_COMMENTS,
                power: ic.id,
                keyWord: this.isDetails.C_KEYWORD
              };
              return false;
            }
          });
          }else{
            if (item.id == this.isDetails.C_APP_CLASSIFY) {
               this.registerInfo = {
                name: this.isDetails.C_NAME,
                comments: this.isDetails.C_COMMENTS,
                power: item.id,
                keyWord: this.isDetails.C_KEYWORD
              };
              return false;
            }
          }
        });
        // this.builderArr.forEach(item => {
        //   item.children.forEach(ic => {
        //     if (ic.id == this.isDetails.C_APP_CLASSIFY) {
        //       // this.registerInfo.power = ic.id;
        //       this.registerInfo = {
        //         name: this.isDetails.C_NAME,
        //         comments: this.isDetails.C_COMMENTS,
        //         power: ic.id,
        //         keyWord: this.isDetails.C_KEYWORD
        //       };
        //       return false;
        //     }
        //   });
        // });
      }
    },
    visible() {
      if (!this.visible) {
        setTimeout(() => {
          this.applicationAuthorizationReason = "";
        }, 1000);
      }
    },
    detailsNoEdit() {
      if (!this.detailsNoEdit) {
        this.registerInfo = {};
      }
    }
  },
  methods: {
    getServiceDetails(val) {
      this.$emit("getServiceDetails", val);
    },
    sharingMapBuilder(val) {
      if (val.C_RESOURCE_TYPE == "mapbuilder") {
        this.$api.webMapBuilderApi
          .selectPermissionById(
            { appId: val.C_ID,scope:val.C_SCOPE?val.C_SCOPE:'Private' },
            { loadingText: this.$t("service.searching"), __LOGINTYPE: "dialog" }
          )
          .then(ress => {
            this.$api.webMapBuilderApi
              .selectAppByID(
                { appId: val.C_ID },
                {
                  loadingText: this.$t("service.searching"),
                  __LOGINTYPE: "dialog"
                }
              )
              .then(res => {
                var data = res.data.data;
                this.$refs.serviceSharingDialog.privateDataFun({
                  checkList: ress.data.data,
                  serviceListSharing: data,
                  messageSharingName: "制图"
                });
              })
              .catch(() => {});
          }).catch(error => {
          if(error.data.status=='390'){
            this.returnMapShow();
          }
        });
      } else if (val.C_RESOURCE_TYPE == "appbuilder") {
        this.$api.personalCenterAppApi
          .selectPermissionById(
            { appId: val.C_ID ,scope:val.C_SCOPE?val.C_SCOPE:'Private'},
            { loadingText: this.$t("service.searching") }
          )
          .then(ress => {
            this.$api.personalCenterAppApi
              .selectById(
                { appId: val.C_ID },
                { loadingText: this.$t("service.searching") }
              )
              .then(res => {
                var appbuilderdata = res.data.data;
                this.$refs.serviceSharingDialog.privateDataFun({
                  checkList: ress.data.data,
                  serviceListSharing: appbuilderdata,
                  messageSharingName: "应用"
                });
              })
              .catch(() => {});
          }).catch(error => {
          if(error.data.status=='390'){
           this.returnMapShow();
          }
        });
      } else if (val.C_RESOURCE_TYPE == "scenebuilder") {
        this.$api.webSceneBuilderApi
          .selectPermissionById(
            { appId: val.C_ID ,scope:val.C_SCOPE?val.C_SCOPE:'Private'},
            { loadingText: this.$t("service.searching") }
          )
          .then(ress => {
            this.$api.webSceneBuilderApi
              .selectById(
                { appId: val.C_ID },
                { loadingText: this.$t("service.searching") }
              )
              .then(res => {
                var appbuilderdata = res.data.data;
                this.$refs.serviceSharingDialog.privateDataFun({
                  checkList: ress.data.data,
                  serviceListSharing: appbuilderdata,
                  messageSharingName: "场景"
                });
              })
              .catch(() => {});
          }).catch(error => {
          if(error.data.status=='390'){
            this.returnMapShow();
          }
        });
      }
    },
    edit() {
      if (this.isDetails.C_RESOURCE_TYPE == "appbuilder") {
        this.$api.serviceAppCenterApi
          .getAppDetails(
            {
              appId: this.isDetails.C_ID
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.registerInfo = {
                name: res.data.data[0].C_NAME,
                comments: res.data.data[0].C_COMMENTS,
                power: res.data.data[0].C_APP_CLASSIFY,
                keyWord: res.data.data[0].C_KEYWORD
              };
            }
          })
          .catch(() => {});
      } else if (this.isDetails.C_RESOURCE_TYPE == "mapbuilder") {
        this.$api.webMapBuilderApi
          .getMapbuilderDetails(
            {
              appId: this.isDetails.C_ID
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.registerInfo = {
                name: res.data.data[0].C_NAME,
                comments: res.data.data[0].C_COMMENTS,
                power: res.data.data[0].C_APP_CLASSIFY,
                keyWord: res.data.data[0].C_KEYWORD
              };
            }
          })
          .catch(() => {});
      } else if (this.isDetails.C_RESOURCE_TYPE == "scenebuilder") {
        this.$api.webSceneBuilderApi
          .getSceneAppDetails(
            {
              appId: this.isDetails.C_ID
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.registerInfo = {
                name: res.data.data[0].C_NAME,
                comments: res.data.data[0].C_COMMENTS,
                power: res.data.data[0].C_APP_CLASSIFY,
                keyWord: res.data.data[0].C_KEYWORD
              };
            }
          })
          .catch(() => {});
      }
      this.$emit("getServiceCategory");
      this.detailsNoEdit = false;
    },
    // 删除
    batchDel() {
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          if (this.isDetails.C_RESOURCE_TYPE == "appbuilder") {
            this.$api.personalCenterAppApi
              .deleteAppService(
                {
                  IDS: this.isDetails.C_ID
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.$message({
                    message: this.$t("management.Deletesuccessful"),
                    type: "success"
                  });
                  this.returnMapShow();
                }
              })
              .catch(() => {});
          } else if (this.isDetails.C_RESOURCE_TYPE == "mapbuilder") {
            this.$api.webMapBuilderApi
              .deleteMapbuilder(
                {
                  IDS: this.isDetails.C_ID
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.$message({
                    message: this.$t("management.Deletesuccessful"),
                    type: "success"
                  });
                  this.returnMapShow();
                }
              })
              .catch(() => {});
          } else if (this.isDetails.C_RESOURCE_TYPE == "scenebuilder") {
            this.$api.webSceneBuilderApi
              .deleteSceneApp(
                {
                  IDS: this.isDetails.C_ID
                },
                { loadingText: this.$t("myCenter.Deleting") }
              )
              .then(res => {
                if (res.status == 200) {
                  this.$message({
                    message: this.$t("management.Deletesuccessful"),
                    type: "success"
                  });
                  this.returnMapShow();
                }
              })
              .catch(() => {});
          }
        })
        .catch(() => {});
    },
    // 详情显示
    detailsEditShow() {
      this.detailsNoEdit = true;
    },
    // 编辑保存
    hold(val) {
      var imgUrl = "";
      if (val == "") {
        imgUrl = this.isDetails.C_IMG;
      } else {
        imgUrl = val;
      }
      if (this.isDetails.C_RESOURCE_TYPE == "appbuilder") {
        this.$api.serviceAppCenterApi
          .getAppServicePermissions({
            id: this.isDetails.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              this.$api.personalCenterAppApi
                .saveAppService({
                  id: this.isDetails.C_ID,
                  name: this.registerInfo.name,
                  appClassify: this.registerInfo.power
                    ? this.registerInfo.power
                    : this.isDetails.C_APP_CLASSIFY,
                  appComments: this.registerInfo.comments,
                  scope: this.isDetails.C_SCOPE,
                  appImg: imgUrl,
                  keyWord: this.registerInfo.keyWord
                })
                .then(res => {
                  if (res.data.status == 200) {
                    this.$emit("getServiceDetails", {
                      appId: this.isDetails.C_ID,
                      appMes: true
                    });
                    this.$message({
                      message: this.$t("management.EditedSuccessfully"),
                      type: "success"
                    });
                  }
                });
            } else if (res.data.data[0].YWEDIT == 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getServiceDetails", {
                appId: this.isDetails.C_ID,
                appMes: false
              });
            } else if (res.data.data[0].YWSEARCH == null) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getServiceDetails", {
                appId: this.isDetails.C_ID,
                appMes: false
              });
            }
          });
      } else if (this.isDetails.C_RESOURCE_TYPE == "scenebuilder") {
        this.$api.webSceneBuilderApi
          .getScenebuilderPermissions({
            id: this.isDetails.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              this.$api.webSceneBuilderApi
                .saveSceneAppService({
                  id: this.isDetails.C_ID,
                  name: this.registerInfo.name,
                  sceneAppClassify: this.registerInfo.power
                    ? this.registerInfo.power
                    : this.isDetails.C_APP_CLASSIFY,
                  sceneAppScope: this.isDetails.C_SCOPE,
                  sceneAppComments: this.registerInfo.comments,
                  sceneAppImg: imgUrl,
                  keyWord: this.registerInfo.keyWord
                })
                .then(res => {
                  if (res.data.status == 200) {
                    this.$emit("getServiceDetails", this.isDetails.C_ID);
                    this.$message({
                      message: this.$t("management.EditedSuccessfully"),
                      type: "success"
                    });
                  }
                });
            } else if (res.data.data[0].YWEDIT == 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getServiceDetails", this.isDetails.C_ID);
            } else if (res.data.data[0].YWSEARCH == null) {
              this.$emit("getServiceDetails", this.isDetails.C_ID);
            }
          });
      } else if (this.isDetails.C_RESOURCE_TYPE == "mapbuilder") {
        this.$api.webMapBuilderApi
          .getMapbuilderPermissions({
            id: this.isDetails.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              this.$api.webMapBuilderApi
                .updataMapbuilder({
                  id: this.isDetails.C_ID,
                  name: this.registerInfo.name,
                  mapbuilerClassify: this.registerInfo.power
                    ? this.registerInfo.power
                    : this.isDetails.C_APP_CLASSIFY,
                  scope: this.isDetails.C_SCOPE,
                  comments: this.registerInfo.comments,
                  img: imgUrl,
                  keyWord: this.registerInfo.keyWord
                })
                .then(res => {
                  if (res.data.status == 200) {
                    this.$emit("getServiceDetails", this.isDetails.C_ID);
                    this.$message({
                      message: this.$t("management.EditedSuccessfully"),
                      type: "success"
                    });
                  }
                });
            } else if (res.data.data[0].YWEDIT == 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getServiceDetails", this.isDetails.C_ID);
            } else if (res.data.data[0].YWSEARCH == null) {
              this.$emit("getServiceDetails", this.isDetails.C_ID);
            }
          });
      }
    },
    // 三维类型处理
    typeHandle() {
      if (this.isDetails.C_RESOURCE_TYPE == "appbuilder") {
        this.resUrl =
          window.location.href.replace(this.$route.path, "/appbuilder") +
          "?id=" +
          this.isDetails.C_ID;
      } else if (this.isDetails.C_RESOURCE_TYPE == "mapbuilder") {
        this.resUrl =
          window.location.href.replace(this.$route.path, "/mapbuilder") +
          "?id=" +
          this.isDetails.C_ID;
      }
    },
    returnMapShow() {
      this.$emit("getreturnMapShow", false);
      this.$emit("againListService");
      this.detailsNoEdit = true;
    },
    // 申请授权
    applicationAuthorization() {
      if (!this.$store.getters.isLogin) {
        this.$message({
          message: this.$t("service.PleaseLoginFirstToApplyForPermission"),
          type: "warning"
        });
      }
    },
    //申请提交
    auditResource() {
      this.$api.serviceMapApi
        .auditResource(
          {
            createComment: this.applicationAuthorizationReason,
            auditBy: this.isDetails.C_CREATE_BY,
            resourceId: this.isDetails.C_ID,
            resourceName: this.isDetails.C_NAME,
            resourceType: this.isDetails.C_RESOURCE_TYPE
          },
          {
            loadingText: this.$t("service.Submitting"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          if (res.data.status == 200) {
            this.$message({
              message: res.data.title,
              type: "success"
            });
            this.$emit("getServiceDetails", this.isDetails.C_ID);
            this.visible = false;
          }
        })
        .catch(() => {});
    },
    save() {
      if (this.applicationAuthorizationReason == "") {
        this.$message({
          message: this.$t("service.PleaseEnterYourApplicationReason"),
          type: "warning"
        });
      } else {
        if (this.isDetails.C_RESOURCE_TYPE == "appbuilder") {
          this.$api.serviceAppCenterApi
            .getAppServicePermissions({
              id: this.isDetails.C_ID
            })
            .then(res => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t('management.Youhavenopermissiontoapplyforit'),
                  type: "warning"
                });
                this.returnMapShow();
                this.visible = false;
              }
            });
        } else if (this.isDetails.C_RESOURCE_TYPE == "mapbuilder") {
          this.$api.webMapBuilderApi
            .getMapbuilderPermissions({
              id: this.isDetails.C_ID
            })
            .then(res => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t('management.Youhavenopermissiontoapplyforit'),
                  type: "warning"
                });
                this.returnMapShow();
                this.visible = false;
              }
            });
        } else if (this.isDetails.C_RESOURCE_TYPE == "scenebuilder") {
          this.$api.webSceneBuilderApi
            .getScenebuilderPermissions({
              id: this.isDetails.C_ID
            })
            .then(res => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t('management.Youhavenopermissiontoapplyforit'),
                  type: "warning"
                });
                this.returnMapShow();
                this.visible = false;
              }
            });
        }
      }
    },
    urlReplace(val) {
      if (!this.$listeners["goToIEarth"]) {
        if (val.C_RESOURCE_TYPE == "appbuilder") {
          this.$router.push({
            path: "/appbuilder",
            query: { id: val.C_ID }
          });
        } else if (val.C_RESOURCE_TYPE == "scenebuilder") {
          this.$router.push({
            path: "/scenebuilder",
            query: { id: val.C_ID }
          });
        } else if (val.C_RESOURCE_TYPE == "mapbuilder") {
          this.$router.push({
            path: "/mapbuilder",
            query: {
              id: val.C_ID,
              fileId: this.Base64.encode(val.C_FILE_ID),
              name: val.C_NAME,
              userId: val.C_CREATE_BY
            }
          });
        } else {
          window.open(urlReplace(val));
        }
      } else {
        this.$emit(
          "goToIEarth",
          val.C_SERVICE_URL,
          val.C_SERVICE_TYPE,
          val.C_NAME
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>

.el-popover.login-popper.el-popper {
  .el-button {
    margin-top: 10px;
    float: right;
    @include base-btn();
  }
  .el-textarea {
    /deep/.el-textarea__inner:focus {
      @include input-focus-color();
    }
  }
  .popper__arrow {
    border-right-color: #dfdfdf;
  }
}
#map-details {
  min-height: 700px;
  font-size: 14px;
  color: #606266;
  .details-title {
    padding: 0 9%;
    height: 46px;
    border-bottom: 1px solid #dfdfdf;
    line-height: 42px;
    .details-title-left {
      font-size: 16px;
      display: inline-block;
      height: 48px;
      &::after {
        content: "";
        width: 100%;
        height: 3px;
        @include menu-active-bg();
        position: absolute;
        bottom: 0px;
        left: 0px;
        z-index: 2;
      }
      position: relative;
      @include menu-active-color();
    }
    .details-title-right {
      font-size: 14px;
      float: right;
      @include service-base-color();
    }
    .details-title-right:hover {
      cursor: pointer;
    }
  }
  .details-background {
    background: #f5f5f5;
    padding: 15px 8%;
    .details-operation {
      text-align: right;
    }
    .details-exhibition {
      background: #fff;
      padding: 36px 90px;
      min-height: 570px;
      margin-top: 6px;
      .details-left {
        img {
          width: 100%;
          height: 176px;
          background: #f3f9f9;
        }
      }
      .details-right {
        .details-right-title {
          padding: 0 2%;
          height: 46px;
          border-bottom: 1px solid #dfdfdf;
          line-height: 42px;
          .details-right-title-left {
            display: inline-block;
            height: 48px;
            &::after {
              content: "";
              width: 100%;
              height: 3px;
              @include menu-active-bg();
              position: absolute;
              bottom: 0px;
              left: 0px;
              z-index: 2;
            }
            position: relative;
            @include menu-active-color();
          }
        }
        .falst-right-content {
          margin-top: 20px;
        }
        .details-right-content-kwork {
          .message-kwork-box {
            margin-left: 130px;
            .chart-message-kwork {
              @include keyword-base-color();
              padding: 8px;
              margin: 0 15px 10px 0;
              border-radius: 4px;
              display: inline-block;
            }
          }
          .kwork-tlite {
            width: 120px;
            text-align: right;
            vertical-align: middle;
            float: left;
            line-height: 40px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
          }
        }
        .details-right-content {
          span:first-child {
            width: 120px;
            text-align: right;
            vertical-align: middle;
            display: inline-block;
            line-height: 40px;
            padding: 0 12px 0 0;
            box-sizing: border-box;
          }
          span:last-child {
            padding-left: 10px;
          }
          .pseudo-jump {
            @include service-base-color();
          }
          .pseudo-jump:hover {
            cursor: pointer;
          }
          .in-audit {
            background: #dcdfe6;
            color: #fff;
            border-color: #dcdfe6;
          }
        }
      }
    }
  }
}
</style>