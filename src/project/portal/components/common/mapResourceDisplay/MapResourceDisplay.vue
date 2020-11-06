<template>
  <div id="service-map">
    <div class="pages">
      <div class="pages-left" v-show="pageShowProps.servicePagesBoxShow">
        <!-- <span
          v-if="props.total==0"
        >{{props.total}}-{{props.currentPage*props.currentSize>props.total?props.total:props.currentPage*props.currentSize}}</span>
        <span
          v-if="props.total>0"
        >{{1+(props.currentPage-1)*props.currentSize}}-{{props.currentPage*props.currentSize>props.total?props.total:props.currentPage*props.currentSize}}</span>
        <span>/</span>
        <span>{{props.total}}</span>-->
        <span v-if="props.snav">
          {{props.pnav}}
          <i class="el-icon-arrow-right"></i>
          {{props.snav}}
        </span>
        <span v-else>
          {{props.pnav}}
          <i class="el-icon-arrow-right" v-show="props.total>0"></i>
        </span>
      </div>
      <div class="pages-right" v-show="pageShowProps.serviceSortBoxShow">
        <span>{{$t('service.rankingBasis')}}</span>
        <span>:</span>
        <div class="dropdown-box">
          <el-dropdown @command="dropdownSortList">
            <span>
              <span class="arrange-hover sortDataColor">{{props.sortData}}</span>
              <span class="el-icon-arrow-down arrange-hover"></span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(sortitems,i) in sortDropDown"
                :key="i"
                :command="sortitems"
              >{{sortitems.sortname}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <span
          :class="sort=='DESC'?'el-icon-portal-ziyuan':'el-icon-portal-ziyuan1'"
          @click="sort=='DESC'?order(sort='ASC'):order(sort='DESC')"
          class="arrange-hover"
        ></span>
        <el-button @click="jumpApp" v-show="appJumpBut" class="base-linear-btn">
          <i :class="props.appJumpIcon"></i>
          {{props.appJumpTitle}}
        </el-button>
      </div>
    </div>
    <el-row
      :class="!props.gridding?'service-map-det':'g-service-map-det'"
      :gutter="props.getList.length>0?20:0"
    >
      <el-col v-show="props.getList.length>0?false:true" :span="24" class="noData">
        <img :src="props.displayNoDataSrc" alt />
        <span>{{$t('service.sorryNoDataIsAvailableNow')}}</span>
      </el-col>
      <el-col
        v-show="props.getList.length>0?true:false"
        :span="props.gridding?6:24"
        v-for="(item,k) in  props.getList"
        :key="item.C_ID"
        :class="{'fadeInRight':!props.gridding,'animated':true,'fadeInUp':props.gridding}"
        :style="'animation-delay:'+k*50+'ms'"
        class="map-det-col"
        :data-k="k"
      >
        <el-row class="map-dte-box">
          <!-- 图片-->
          <div
            class="dte-box-left"
            @click="mapDetails({valId:item.C_ID,valList:props.getList,valItem:item})"
            @mouseenter="$store.getters.isLogin&&(item.YWEDIT>0||(item.YWSEARCH>0&&item.C_RESOURCE_TYPE=='fileService'))&&collectShow($event)"
            @mouseleave="(item.YWEDIT>0||(item.YWSEARCH>0&&item.C_RESOURCE_TYPE=='fileService'))&&$store.getters.isLogin&&collectHide($event)"
          >
            <el-image
              v-if="!item.C_IMG"
              :src="item.C_RESOURCE_TYPE=='fileService'?item.defaultSrc:props.defaultSrc"
              :fit="'cover'"
            >
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div
              :class="props.instructions"
              class="instructions"
              v-show="pageShowProps.instructionsShow"
            ></div>
            <el-image v-if="item.C_IMG" :src="item.C_IMG" :fit="'cover'">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <div
              v-if="(item.YWEDIT>0||(item.YWSEARCH>0&&item.C_RESOURCE_TYPE=='fileService'))&&$store.getters.isLogin"
            >
              <div class="mask"></div>
              <i
                v-if="item.YWEDIT>0"
                class="el-icon-portal-bianjitupian collection-btn"
                @click="dialogUploadFun(item)"
                @click.stop
              ></i>
              <i
                v-if="item.YWSEARCH>0&&item.C_RESOURCE_TYPE== 'fileService'"
                class="el-icon-more collection-more-btn"
                @click="dialogDetailsFun({valId:item.C_ID,valList:props.getList,valItem:item,flag:'fileDetail'})"
                @click.stop
              ></i>
            </div>
          </div>
          <!-- 简介 -->
          <!-- 1列4行 -->
          <!-- <el-row class="dte-right"> -->
          <el-row class="dte-box-right">
            <el-col :span="24" class="dte-box-font">
              <!-- <el-tooltip class="item" effect="light" :content="item.C_NAME" placement="bottom"> -->
              <el-row class="titlebox">
                <span
                  class="hide-box"
                  style="display:none;"
                  v-if="!item.editStatus"
                  v-tips="item.C_NAME"
                >{{item.C_NAME}}</span>
                <span class="box" v-if="!item.editStatus" v-tips="item.C_NAME">{{item.C_NAME}}</span>
                <el-input
                  class="edit-name"
                  :id="k+'edit-name'"
                  v-model="favoritesInfoName"
                  @keyup.enter.native="editName(item,k)"
                  autofocus="true"
                  @click.native.stop="1==1"
                  v-else
                ></el-input>&nbsp;
                <i
                  class="el-icon-edit"
                  v-show="props.gridding &&item.YWEDIT>0"
                  @click="edit(item,k)"
                  v-tips="$t('myCenter.Edit')"
                ></i>
              </el-row>
              <!-- </el-tooltip> -->
            </el-col>
            <el-col :span="24" v-show="!props.gridding" class="dte-box-adm">
              <span>{{$t('service.author')}}：{{item.USERNAME}}</span>
              <span>{{$t('service.time')}}：{{item.C_CREATE_TIME}}</span>
            </el-col>
            <el-col :span="24" v-show="!props.gridding" class="dte-box-intro">
              {{$t('service.description')}}：
              <span v-if="item.C_COMMENTS">{{item.C_COMMENTS}}</span>
              <span v-if="item.C_COMMENTS==''">{{$t('service.noIntroduction')}}</span>
            </el-col>
            <el-col :span="24" class="dte-box-floot">
              <slot name="operationBtn">
                <div class="box-floot-left">
                  <span class="btn-hover">
                    <i class="el-icon-portal-yuedu"></i>
                    <span>{{item.C_HITS}}</span>
                  </span>
                  <span
                    v-show="!props.gridding"
                    class="btn-hover"
                    :class="item.YWBROWSE=='0'?'siyou-active':''"
                  >
                    <i class="el-icon-portal-kaisuo" v-show="item.YWBROWSE!='0'"></i>
                    <i class="el-icon-portal-siyou" v-show="item.YWBROWSE=='0'"></i>
                    <span v-show="item.YWBROWSE!='0'">{{$t('service.public')}}</span>
                    <span v-show="item.YWBROWSE=='0'">{{$t('service.ApplyPermission')}}</span>
                  </span>
                </div>
                <div class="box-floot-right">
                  <span class="dte-box-view" v-show="props.gridding">
                    <i class="el-icon-portal-kaisuo" v-show="item.YWBROWSE!='0'"></i>
                    <i class="el-icon-portal-siyou" v-show="item.YWBROWSE=='0'"></i>
                  </span>
                  <span
                    :id="!props.gridding?'base-hover-color-btn':''"
                    @click="!item.C_TIME&&!item.TOPID?saveKqServiceTop(item.C_ID):deleteKqServiceTop({topId:item.TOPID,serviceId:item.C_ID})"
                    class="btn-hover"
                    v-show="isLogin"
                  >
                    <i
                      v-show="!item.C_TIME&&!item.TOPID"
                      class="el-icon-portal-zhiding-white"
                      v-tips="$t('service.onTheTop')"
                    ></i>
                    <i
                      v-show="!(!item.C_TIME&&!item.TOPID)"
                      class="el-icon-portal-zhiding"
                      v-tips="'取消置顶'"
                    ></i>
                    <span v-show="!props.gridding">{{$t('service.onTheTop')}}</span>
                  </span>
                  <span
                    :id="!props.gridding?'base-hover-color-btn':''"
                    @click="!item.COLLECTION_TIME?getFavoritesCategoryCodeKey({serviceId:item.C_ID,resourceType:item.C_RESOURCE_TYPE,event:$event}):deleteServiceCollection(item.COLLECTIONID)"
                    :type="props.gridding?'text':''"
                    class="btn-hover"
                    v-show="isLogin"
                    @click.stop="showCollector(item.COLLECTION_TIME)"
                  >
                    <i
                      v-show="!item.COLLECTION_TIME"
                      class="el-icon-portal-shoucang1"
                      v-tips="$t('service.collect')"
                    ></i>
                    <i
                      v-show="item.COLLECTION_TIME"
                      class="el-icon-portal-shoucang2"
                      v-tips="$t('myCenter.CancelCollection')"
                    ></i>
                    <span v-show="!props.gridding" class="btn-text">{{$t('service.collect')}}</span>
                  </span>
                </div>
              </slot>
            </el-col>
          </el-row>
          <!-- </el-row> -->
        </el-row>
      </el-col>
    </el-row>
    <!-- 功能 文件其他的编辑 -->
    <!-- <upload-clipping
      ref="dialogUpload"
      @UploadBlackFun="UploadBlackFun"
      :dialogTitleUpload="dialogTitleUpload"
      :autoCropWidth="autoCropWidth"
      :autoCropHeight="autoCropHeight"
      :fileRule="fileRule"
      :recommendShow="true"
    ></upload-clipping> -->
    <!--地图编辑-->
    <service-map-upload-clipping
      :resourceData="resourceData"
      @mapUploadSaveEdit="mapUploadSaveEdit"
      @getListServiceClose="getListServiceClose"
      ref="mapDialogUpload"
    ></service-map-upload-clipping>
  </div>
</template>
<script>
// import UploadClipping from "components/common/uploadClipping/UploadClipping";
import ServiceMapUploadClipping from "components/serviceCenter/ServiceMapUploadClipping";
import { overflowEllipsis } from "@/utils/overflowEllipsis.js";
export default {
  name: "MapResourceDisplay",
  components: {
    ServiceMapUploadClipping
  },
  props: {
    appJumpBut: {
      type: Boolean,
      default: false
    },
    serviceClassify: {
      type: String,
      default: ""
    },
    serviceClassifyParent: {
      type: String,
      default: ""
    },
    props: {
      type: Object,
      default: () => {
        return {
          getList: [],
          currentSize: 12,
          currentPage: 1,
          total: 0,
          defaultSrc: "/config/imageConfig/function/mapService/mapService1.png",
          displayNoDataSrc: require("img/nodata.jpg"), //暂无数据默认显示图片
          sortData: this.$t("service.updateTime"), //排序下拉框默认为'时间'
          instructions: "el-icon-portal-gongju", //默认指示字体图标
          appJumpIcon: "el-icon-portal-diqiu1",
          top: 0,
          left: 0,
          gridding: true,
          appJumpTitle: "",
          pnav: "",
          snav: ""
        };
      }
    },
    pageShowProps: {
      type: Object,
      default: () => {
        return {
          servicePagesBoxShow: true, //top页数默认显示
          serviceSortBoxShow: true, //top排序默认显示
          instructionsShow: true //图片上的字体图标标识默认hover显示
        };
      }
    },
    sortDropDown: {
      //下拉框排序
      type: Array,
      default: () => {
        return [
          {
            sortname: this.$t("service.updateTime"),
            sortid: "CREATE_TIME"
          },
          {
            sortname: this.$t("service.visits"),
            sortid: "HITS"
          },
          {
            sortname: this.$t("service.title"),
            sortid: "NAME"
          }
        ];
      }
    }
  },
  watch: {
    "props.getList": {
      deep: true,
      handler(newVal) {
        newVal.forEach(i => {
          if (i.YWEDIT >= 1) {
            i.editStatus = false; //编辑框默认不显示
          }
        });
      }
    }
  },
  data() {
    return {
      // 上传文件的大小规则
      fileRule: {
        tips: this.$t("service.OnlyJPGPNGFilesUploadedSizeLess1MB"),
        size: "1024"
      },
      resourceData: {}, //点击缩略图资源详情
      dialogTitleUpload: this.$t("service.AddThumbnail"),
      sort: "DESC", //请求返回默认排序值
      favoritesInfoName: "", //编辑内容
      preventRepetition: true //阻止同时编辑2个资源名
    };
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  updated() {
    if (document.getElementsByClassName("edit-name").length == 0) {
      var items = document.getElementsByClassName("titlebox");
      for (var i = 0; i < items.length; i++) {
        var hideBox = items[i].getElementsByClassName("hide-box")[0];
        var box = items[i].getElementsByClassName("box")[0];
        if (hideBox && box) {
          box.innerHTML = hideBox.innerHTML;
        }
      }
      overflowEllipsis("titlebox", "box");
    }
  },
  methods: {
    //app跳转
    jumpApp() {
      this.$emit("jumpApp");
    },
    // 编辑名称
    edit(val, k) {
      if (!this.preventRepetition) {
        return false; //防止2个资源同时编辑
      }
      this.favoritesInfoName = JSON.parse(JSON.stringify(val.C_NAME));
      val.editStatus = true;
      this.$forceUpdate();
      setTimeout(() => {
        document.getElementById(k + "edit-name").focus();
        var closeInput = () => {
          this.editName(val);
          document.body.removeEventListener("click", closeInput);
        };
        document.body.addEventListener("click", closeInput);
        this.preventRepetition = false;
      });
    },
    editName(val) {
      this.preventRepetition = true;
      if (val.editStatus) {
        if (val.C_NAME == this.favoritesInfoName) {
          val.editStatus = false;
          this.$forceUpdate();
          return false;
        }
        if (this.favoritesInfoName == "") {
          this.$message({
            message: this.$t("service.ResourceNameCannotBeEmpty"),
            type: "error"
          });
          this.favoritesInfoName = val.C_NAME;
          val.editStatus = false;
          this.$forceUpdate();
          return false;
        }
        if (val.C_RESOURCE_TYPE == "mapService") {
          this.$api.personalCenterServiceApi
            .saveKqService(
              {
                id: val.C_ID,
                name: this.favoritesInfoName,
                serviceType: val.C_SERVICE_TYPE,
                serviceClassify: val.C_SERVICE_CLASSIFY,
                serviceScope: val.C_SCOPE,
                keyWord: val.C_KEYWORD,
                isReqCloud: false,
                proxyUrl: val.C_PROXY_URL || null,
                proxyName: val.C_PROXY_NAME || null
              },
              {
                loadingText: this.$t("myCenter.Modifying")
              }
            )
            .then(() => {
              this.$message({
                message: this.$t("myCenter.ModifiedSuccessfully"),
                type: "success"
              });
              val.C_NAME = this.favoritesInfoName;
              this.$emit("getListService");
            })
            .catch(() => {
              this.$emit("getListService");
            });
          val.editStatus = false;
        } else if (val.C_RESOURCE_TYPE == "functionService") {
          this.$api.personalFunctionServiceApi
            .saveFunctionServices(
              {
                id: val.C_ID,
                name: this.favoritesInfoName,
                serviceClassify: val.C_SERVICE_CLASSIFY,
                serviceScope: val.C_SCOPE,
                serviceUrl: val.C_SERVICE_URL,
                keyWord: val.C_KEYWORD
              },
              {
                loadingText: this.$t("myCenter.Modifying")
              }
            )
            .then(() => {
              this.$message({
                message: this.$t("myCenter.ModifiedSuccessfully"),
                type: "success"
              });
              val.C_NAME = this.favoritesInfoName;
              this.$emit("getListService");
            })
            .catch(() => {
              this.$emit("getListService");
            });
          val.editStatus = false;
        } else if (val.C_RESOURCE_TYPE == "data") {
          this.$api.personalDatacenterServiceApi
            .saveData(
              {
                id: val.C_ID,
                name: this.favoritesInfoName,
                dataClassify: val.C_DATA_CLASSIFY,
                dataScope: val.C_SCOPE,
                referenceId: val.C_DATA_REFERENCEID,
                dataComments: val.C_COMMENTS,
                keyWord: val.C_KEYWORD
              },
              {
                loadingText: this.$t("myCenter.Modifying")
              }
            )
            .then(() => {
              this.$message({
                message: this.$t("myCenter.ModifiedSuccessfully"),
                type: "success"
              });
              val.C_NAME = this.favoritesInfoName;
              this.$emit("getListService");
            })
            .catch(() => {
              this.$emit("getListService");
            });
          val.editStatus = false;
        } else if (val.C_RESOURCE_TYPE == "sceneService") {
          this.$api.personalSceneServiceApi
            .savesceneService({
              id: val.C_ID,
              name: this.favoritesInfoName,
              serviceType: val.C_SERVICE_TYPE,
              serviceClassify: val.C_SERVICE_CLASSIFY,
              serviceScope: val.C_SCOPE,
              serviceUrl: val.C_SERVICE_URL,
              keyWord: val.C_KEYWORD
            })
            .then(() => {
              this.$message({
                message: this.$t("myCenter.ModifiedSuccessfully"),
                type: "success"
              });
              val.C_NAME = this.favoritesInfoName;
              this.$emit("getListService");
            })
            .catch(() => {
              this.$emit("getListService");
            });
          val.editStatus = false;
        } else if (val.C_RESOURCE_TYPE == "dataService") {
          this.$api.personalDataServiceApi
            .saveDataService({
              id: val.C_ID,
              name: this.favoritesInfoName,
              serviceType: val.C_SERVICE_TYPE,
              serviceClassify: val.C_SERVICE_CLASSIFY,
              serviceScope: val.C_SCOPE,
              serviceUrl: val.C_SERVICE_URL,
              keyWord: val.C_KEYWORD
            })
            .then(() => {
              this.$message({
                message: this.$t("myCenter.ModifiedSuccessfully"),
                type: "success"
              });
              val.C_NAME = this.favoritesInfoName;
              this.$emit("getListService");
            })
            .catch(() => {
              this.$emit("getListService");
            });
          val.editStatus = false;
        } else if (val.C_RESOURCE_TYPE == "appbuilder") {
          this.$api.personalCenterAppApi
            .saveAppService({
              id: val.C_ID,
              name: this.favoritesInfoName,
              appClassify: val.C_APP_CLASSIFY,
              scope: val.C_SCOPE,
              keyWord: val.C_KEYWORD
            })
            .then(() => {
              this.$message({
                message: this.$t("myCenter.ModifiedSuccessfully"),
                type: "success"
              });
              val.C_NAME = this.favoritesInfoName;
              this.$emit("getListService");
            })
            .catch(() => {
              this.$emit("getListService");
            });
          val.editStatus = false;
        } else if (val.C_RESOURCE_TYPE == "mapbuilder") {
          this.$api.webMapBuilderApi
            .updataMapbuilder({
              id: val.C_ID,
              name: this.favoritesInfoName,
              mapbuilerClassify: val.C_APP_CLASSIFY,
              scope: val.C_SCOPE,
              keyWord: val.C_KEYWORD
            })
            .then(() => {
              this.$message({
                message: this.$t("myCenter.ModifiedSuccessfully"),
                type: "success"
              });
              val.C_NAME = this.favoritesInfoName;
              this.$emit("getListService");
            })
            .catch(() => {
              this.$emit("getListService");
            });
          val.editStatus = false;
        } else {
          this.$api.personalFileServiceApi
            .savefileResourceService({
              id: val.C_ID,
              name: this.favoritesInfoName,
              fileClassify: val.C_FILE_CLASSIFY,
              fileScope: val.C_SCOPE,
              referenceId: val.C_FILE_REFERENCEID,
              keyWord: val.C_KEYWORD
            })
            .then(() => {
              this.$message({
                message: this.$t("myCenter.ModifiedSuccessfully"),
                type: "success"
              });
              val.C_NAME = this.favoritesInfoName;
              this.$emit("getListService");
            })
            .catch(() => {
              this.$emit("getListService");
            });
          val.editStatus = false;
        }
      }
    },
    // 缩略图图标显示
    collectShow(e) {
      e.currentTarget.getElementsByClassName("mask")[0].style.display = "block";
      if (e.currentTarget.getElementsByClassName("collection-btn")[0]) {
        e.currentTarget.getElementsByClassName(
          "collection-btn"
        )[0].style.display = "block";
      }
      if (e.currentTarget.getElementsByClassName("collection-more-btn")[0]) {
        e.currentTarget.getElementsByClassName(
          "collection-more-btn"
        )[0].style.display = "block";
      }
    },
    // 缩略图图标隐藏
    collectHide(e) {
      e.currentTarget.getElementsByClassName("mask")[0].style.display = "none";
      if (e.currentTarget.getElementsByClassName("collection-btn")[0]) {
        e.currentTarget.getElementsByClassName(
          "collection-btn"
        )[0].style.display = "none";
      }
      if (e.currentTarget.getElementsByClassName("collection-more-btn")[0]) {
        e.currentTarget.getElementsByClassName(
          "collection-more-btn"
        )[0].style.display = "none";
      }
    },
    showCollector(row) {
      if (!row) {
        this.$emit("showCollector");
      }
    },
    // 附件详情
    dialogDetailsFun(val) {
      this.$emit("mapDetails", val);
    },
    //上传缩略图
    dialogUploadFun(val) {
      this.resourceData = val;
      if (val.C_RESOURCE_TYPE == "mapService") {
        this.$api.serviceMapApi
          .getServicePermissions({
            id: val.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              this.$refs.mapDialogUpload.dialogUploadShow();
            } else if (res.data.data[0].YWEDIT <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getListService");
            }
          });
      } else if (val.C_RESOURCE_TYPE == "sceneService") {
        this.$api.serviceSceneApi
          .getSceneServicePermissions({
            id: val.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              // this.$refs.dialogUpload.dialogUploadShow();
              this.$refs.mapDialogUpload.dialogUploadShow();
            } else if (res.data.data[0].YWEDIT <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getListService");
            }
          });
      } else if (val.C_RESOURCE_TYPE == "dataService") {
        this.$api.serviceDataApi
          .getDataServicePermissions({
            id: val.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              // this.$refs.dialogUpload.dialogUploadShow();
              this.$refs.mapDialogUpload.dialogUploadShow();
            } else if (res.data.data[0].YWEDIT <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getListService");
            }
          });
      } else if (val.C_RESOURCE_TYPE == "functionService") {
        this.$api.serviceFunctionApi
          .getFunctionServicePermissions({
            id: val.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              // this.$refs.dialogUpload.dialogUploadShow();
              this.$refs.mapDialogUpload.dialogUploadShow();
            } else if (res.data.data[0].YWEDIT <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getListService");
            }
          });
      } else if (val.C_RESOURCE_TYPE == "data") {
        this.$api.serviceDatacenterApi
          .getDataServicePermissions({
            id: val.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              // this.$refs.dialogUpload.dialogUploadShow();
              this.$refs.mapDialogUpload.dialogUploadShow();
            } else if (res.data.data[0].YWEDIT <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getListService");
            }
          });
      } else if (val.C_RESOURCE_TYPE == "appbuilder") {
        this.$api.serviceAppCenterApi
          .getAppServicePermissions({
            id: val.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              // this.$refs.dialogUpload.dialogUploadShow();
              this.$refs.mapDialogUpload.dialogUploadShow();
            } else if (res.data.data[0].YWEDIT <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getListService");
            }
          });
      } else if (val.C_RESOURCE_TYPE == "mapbuilder") {
        this.$api.webMapBuilderApi
          .getMapbuilderPermissions({
            id: val.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              // this.$refs.dialogUpload.dialogUploadShow();
              this.$refs.mapDialogUpload.dialogUploadShow();
            } else if (res.data.data[0].YWEDIT <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getListService");
            }
          });
      } else if (val.C_RESOURCE_TYPE == "fileService") {
        this.$api.serviceFileCenApi
          .getFileServicePermissions({
            id: val.C_ID
          })
          .then(res => {
            if (res.data.data[0].YWEDIT > 0) {
              // this.$refs.dialogUpload.dialogUploadShow();
              this.$refs.mapDialogUpload.dialogUploadShow();
            } else if (res.data.data[0].YWEDIT <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannoteditit"
                ),
                type: "warning"
              });
              this.$emit("getListService");
            }
          });
      }
    },
    getListServiceClose() {
      this.$emit("getListService");
    },
    mapUploadSaveEdit(mapData) {
      if(this.resourceData.C_SERVICE_TYPE=='mapService'){
      this.$api.personalCenterServiceApi
        .saveKqService({
          id: this.resourceData.C_ID,
          name: this.resourceData.C_NAME,
          serviceType: this.resourceData.C_SERVICE_TYPE,
          serviceClassify: this.resourceData.C_SERVICE_CLASSIFY,
          serviceScope: this.resourceData.C_SCOPE,
          serviceImg: mapData.mapHeadImg,
          keyWord: this.resourceData.C_KEYWORD,
          isReqCloud: false,
          proxyUrl: this.resourceData.C_PROXY_URL || null,
          proxyName: this.resourceData.C_PROXY_NAME || null
        },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            })
        .then(res => {
          if (res.data.status == 200 && mapData.flag) {
            this.$message({
              message: this.$t("service.ThumbnailModifiedSuccessfully"),
              type: "success"
            });
          }
        })
        .catch(() => {});
        }else  if (this.resourceData.C_RESOURCE_TYPE == "functionService") {
        this.$api.personalFunctionServiceApi
          .saveFunctionServices(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              serviceClassify: this.resourceData.C_SERVICE_CLASSIFY,
              serviceScope: this.resourceData.C_SCOPE,
              serviceImg: mapData.mapHeadImg,
              serviceUrl: this.resourceData.C_SERVICE_URL,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200 && mapData.flag) {
            this.$message({
              message: this.$t("service.ThumbnailModifiedSuccessfully"),
              type: "success"
            });
          }
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else if (this.resourceData.C_RESOURCE_TYPE == "data") {
        this.$api.personalDatacenterServiceApi
          .saveData(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              dataClassify: this.resourceData.C_DATA_CLASSIFY,
              dataScope: this.resourceData.C_SCOPE,
              dataImg: mapData.mapHeadImg,
              referenceId: this.resourceData.C_DATA_REFERENCEID,
              dataComments: this.resourceData.C_COMMENTS,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200 && mapData.flag) {
            this.$message({
              message: this.$t("service.ThumbnailModifiedSuccessfully"),
              type: "success"
            });
          }
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else if (this.resourceData.C_RESOURCE_TYPE == "sceneService") {
        this.$api.personalSceneServiceApi
          .savesceneService(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              serviceType: this.resourceData.C_SERVICE_TYPE,
              serviceClassify: this.resourceData.C_SERVICE_CLASSIFY,
              serviceScope: this.resourceData.C_SCOPE,
              serviceImg: mapData.mapHeadImg,
              serviceUrl: this.resourceData.C_SERVICE_URL,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200 && mapData.flag) {
            this.$message({
              message: this.$t("service.ThumbnailModifiedSuccessfully"),
              type: "success"
            });
          }
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else if (this.resourceData.C_RESOURCE_TYPE == "appbuilder") {
        this.$api.personalCenterAppApi
          .saveAppService(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              appComments: this.resourceData.C_COMMENTS,
              appClassify: this.resourceData.C_APP_CLASSIFY,
              scope: this.resourceData.C_SCOPE,
              appImg: mapData.mapHeadImg,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200 && mapData.flag) {
            this.$message({
              message: this.$t("service.ThumbnailModifiedSuccessfully"),
              type: "success"
            });
          }
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else if (this.resourceData.C_RESOURCE_TYPE == "dataService") {
        this.$api.personalDataServiceApi
          .saveDataService(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              serviceType: this.resourceData.C_SERVICE_TYPE,
              serviceClassify: this.resourceData.C_SERVICE_CLASSIFY,
              serviceScope: this.resourceData.C_SCOPE,
              serviceImg: mapData.mapHeadImg,
              serviceUrl: this.resourceData.C_SERVICE_URL,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200 && mapData.flag) {
            this.$message({
              message: this.$t("service.ThumbnailModifiedSuccessfully"),
              type: "success"
            });
          }
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else if (this.resourceData.C_RESOURCE_TYPE == "mapbuilder") {
        this.$api.webMapBuilderApi
          .updataMapbuilder(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              mapbuilerClassify: this.resourceData.C_APP_CLASSIFY,
              scope: this.resourceData.C_SCOPE,
              img: mapData.mapHeadImg,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200 && mapData.flag) {
            this.$message({
              message: this.$t("service.ThumbnailModifiedSuccessfully"),
              type: "success"
            });
          }
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else {
        this.$api.personalFileServiceApi
          .savefileResourceService(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              fileComments: this.resourceData.C_COMMENTS,
              fileClassify: this.resourceData.C_FILE_CLASSIFY,
              fileScope: this.resourceData.C_SCOPE,
              referenceId: this.resourceData.C_FILE_REFERENCEID,
              fileImg: mapData.mapHeadImg,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200 && mapData.flag) {
            this.$message({
              message: this.$t("service.ThumbnailModifiedSuccessfully"),
              type: "success"
            });
          }
          })
          .catch(() => {
            this.$emit("getListService");
          });
      }
    },
    //上传返回值
    UploadBlackFun(val) {
      var headImg = "";
      if (val.recommendation) {
        headImg = val.uploadrUrl;
      } else {
        headImg = `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
      }
      if (this.resourceData.C_RESOURCE_TYPE == "functionService") {
        this.$api.personalFunctionServiceApi
          .saveFunctionServices(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              serviceClassify: this.resourceData.C_SERVICE_CLASSIFY,
              serviceScope: this.resourceData.C_SCOPE,
              serviceImg: headImg,
              serviceUrl: this.resourceData.C_SERVICE_URL,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                message: this.$t("service.ThumbnailModifiedSuccessfully"),
                type: "success"
              });
            }
            this.$emit("getListService");
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else if (this.resourceData.C_RESOURCE_TYPE == "data") {
        this.$api.personalDatacenterServiceApi
          .saveData(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              dataClassify: this.resourceData.C_DATA_CLASSIFY,
              dataScope: this.resourceData.C_SCOPE,
              dataImg: headImg,
              referenceId: this.resourceData.C_DATA_REFERENCEID,
              dataComments: this.resourceData.C_COMMENTS,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                message: this.$t("service.ThumbnailModifiedSuccessfully"),
                type: "success"
              });
            }
            this.$emit("getListService");
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else if (this.resourceData.C_RESOURCE_TYPE == "sceneService") {
        this.$api.personalSceneServiceApi
          .savesceneService(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              serviceType: this.resourceData.C_SERVICE_TYPE,
              serviceClassify: this.resourceData.C_SERVICE_CLASSIFY,
              serviceScope: this.resourceData.C_SCOPE,
              serviceImg: headImg,
              serviceUrl: this.resourceData.C_SERVICE_URL,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                message: this.$t("service.ThumbnailModifiedSuccessfully"),
                type: "success"
              });
            }
            this.$emit("getListService");
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else if (this.resourceData.C_RESOURCE_TYPE == "appbuilder") {
        this.$api.personalCenterAppApi
          .saveAppService(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              appComments: this.resourceData.C_COMMENTS,
              appClassify: this.resourceData.C_APP_CLASSIFY,
              scope: this.resourceData.C_SCOPE,
              appImg: headImg,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                message: this.$t("service.ThumbnailModifiedSuccessfully"),
                type: "success"
              });
            }
            this.$emit("getListService");
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else if (this.resourceData.C_RESOURCE_TYPE == "dataService") {
        this.$api.personalDataServiceApi
          .saveDataService(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              serviceType: this.resourceData.C_SERVICE_TYPE,
              serviceClassify: this.resourceData.C_SERVICE_CLASSIFY,
              serviceScope: this.resourceData.C_SCOPE,
              serviceImg: headImg,
              serviceUrl: this.resourceData.C_SERVICE_URL,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                message: this.$t("service.ThumbnailModifiedSuccessfully"),
                type: "success"
              });
            }
            this.$emit("getListService");
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else if (this.resourceData.C_RESOURCE_TYPE == "mapbuilder") {
        this.$api.webMapBuilderApi
          .updataMapbuilder(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              mapbuilerClassify: this.resourceData.C_APP_CLASSIFY,
              scope: this.resourceData.C_SCOPE,
              img: headImg,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                message: this.$t("service.ThumbnailModifiedSuccessfully"),
                type: "success"
              });
            }
            this.$emit("getListService");
          })
          .catch(() => {
            this.$emit("getListService");
          });
      } else {
        this.$api.personalFileServiceApi
          .savefileResourceService(
            {
              id: this.resourceData.C_ID,
              name: this.resourceData.C_NAME,
              fileComments: this.resourceData.C_COMMENTS,
              fileClassify: this.resourceData.C_FILE_CLASSIFY,
              fileScope: this.resourceData.C_SCOPE,
              referenceId: this.resourceData.C_FILE_REFERENCEID,
              fileImg: headImg,
              keyWord: this.resourceData.C_KEYWORD
            },
            {
              coverStatusCode: {
                391: {
                  tips: this.$t("group.Youhavenopermissiontoedittheresource")
                }
              }
            }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                message: this.$t("service.ThumbnailModifiedSuccessfully"),
                type: "success"
              });
            }
            this.$emit("getListService");
          })
          .catch(() => {
            this.$emit("getListService");
          });
      }
    },
    //图片详情
    mapDetails(val) {
      document.body.style.overflow = "";
      this.$emit("mapDetails", {
        valId: val.valId,
        valList: val.valList,
        valItem: val.valItem
      });
    },
    //请求 置顶
    saveKqServiceTop(row) {
      this.$emit("saveKqServiceTop", row);
    },
    //请求  取消置顶
    deleteKqServiceTop(row) {
      this.$emit("deleteKqServiceTop", row);
    },
    //点击收藏 显示收藏列表
    getFavoritesCategoryCodeKey(row) {
      this.$emit("getFavoritesCategoryCodeKey", row);
    },
    //取消收藏
    deleteServiceCollection(row) {
      this.$emit("deleteServiceCollection", row);
    },
    //请求  倒序，正序排序
    order(val) {
      this.$emit("order", val);
    },
    //请求 下拉排序列表
    dropdownSortList(command) {
      this.$emit("dropdownSortList", command);
    }
  }
};
</script>
<style lang="scss" scoped>
#service-map {
  margin-top: 20px;
  .noData {
    border-top: 1px solid #dfdfdf;
    border-bottom: 1px solid #dfdfdf;
    height: 330px;
    text-align: center;
    font-size: 15px;
    color: #606266;
    background: #fff;
    img {
      margin-top: 45px;
    }
    span {
      margin-top: 20px;
      display: block;
    }
  }
  .pages {
    height: 40px;
    line-height: 40px;
    width: 100%;
    font-size: 12px;
    background: #fff;
    margin-bottom: 20px;
    .pages-left {
      color: #818181;
      font-size: 14px;
      float: left;
      padding-left: 10px;
      span {
        margin-right: 8px;
      }
    }
    .pages-right {
      float: right;
      font-size: 14px;
      padding-right: 10px;
      span {
        margin-right: 5px;
      }
      .dropdown-box {
        height: 48px;
        display: inline-block;
        .el-dropdown {
          height: 30px;
        }
      }
      .el-button {
        margin-left: 10px;
        padding: 6px 8px;
      }
      .el-icon-arrow-down,
      .el-icon-bottom,
      .el-icon-top {
        font-size: 16px;
        margin-left: 2px;
        font-weight: 900;
      }
    }
    .arrange-hover.sortDataColor {
      @include base-active-color();
      display: inline-block;
      text-align: center;
    }
    .arrange-hover {
      text-decoration: none;
      color: #242424;
    }
    .arrange-hover:hover {
      cursor: pointer;
      @include base-active-color();
    }
  }
  // 列表布局
  .service-map-det {
    .map-det-col {
      animation-duration: 700ms;
      margin-bottom: 22px;
    }
    .el-col {
      list-style: none;
      .el-row.map-dte-box:hover {
        border: 1px solid #ebebeb;
        box-shadow: 0px 0px 8px #ccc;
      }
      .el-row.map-dte-box {
        height: 178px;
        border: 1px solid #ebebeb;
        background: #fff;
        .dte-box-left {
          border-right: 1px solid #ebeef5;
          padding: 8px;
          box-sizing: border-box;
          height: 176px;
          width: 257px;
          float: left;
          .instructions {
            position: absolute;
            opacity: 0;
            top: 6px;
            left: 6px;
            width: 28px;
            height: 28px;
            z-index: 9999;
            color: #ffffff;
            text-align: center;
            line-height: 28px;
            @include base-bg-color();
            border-radius: 4px;
            cursor: pointer;
          }
          .el-image {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f3f9f9;
            cursor: pointer;
            width: 100%;
            height: 160px;
            .el-icon-picture-outline {
              font-size: 24px;
              color: #909399;
            }
          }
        }
        .dte-box-right {
          margin-left: 257px;
          height: 176px;
          padding: 16px 12px 0;
          .dte-box-font {
            @include base-active-color();
            font-size: 16px;
            margin-bottom: 12px;
            height: 24px;
            line-height: 24px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .titlebox {
              height: 24px;
              max-width: 100%;
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
          .dte-box-adm {
            font-size: 14px;
            color: #818181;
            margin-bottom: 16px;
            span {
              margin-right: 52px;
            }
          }
          .dte-box-intro {
            font-size: 14px;
            color: #818181;
            height: 50px;
          }
          .dte-box-floot {
            .box-floot-left {
              float: left;
              width: 270px;
              .btn-hover {
                span {
                  min-width: 28px;
                  display: inline-block;
                  vertical-align: top;
                }
              }
              // .siyou-active:hover {
              //   cursor: pointer;
              //   @include base-bg-font();
              // }
            }
            .box-floot-right {
              float: left;
              font-size: 14px;
              #base-hover-color-btn:hover {
                @include base-radio-button();
                cursor: pointer;
              }
            }
            .btn-hover {
              border-radius: 0;
              padding: 4px 12px;
              @include base-active-underline();
              @include base-active-color();
              margin-left: 10px;
              height: 20px;
              display: inline-block;
              line-height: 20px;
              span {
                font-size: 14px;
                margin-left: 3px;
              }
            }
          }
        }
      }
      .el-row.map-dte-box:hover .instructions {
        opacity: 1;
      }
    }
  }
  //图片悬停
  .dte-box-left {
    position: relative;
    overflow: hidden;
    .mask {
      display: none;
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 999;
    }
    .collection-btn {
      display: none;
      position: absolute;
      width: 26px;
      height: 26px;
      right: 4px;
      bottom: 4px;
      z-index: 1000;
      background: #fff;
      @include base-active-color();
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 16px;
        height: 16px;
        margin: auto;
      }
      &:hover {
        color: #fff;
        @include base-bg-color();
      }
    }
    .collection-more-btn {
      display: none;
      position: absolute;
      width: 26px;
      height: 26px;
      right: 4px;
      top: 4px;
      z-index: 1000;
      background: #fff;
      @include base-active-color();
      font-size: 16px;
      border-radius: 4px;
      cursor: pointer;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 16px;
        height: 16px;
        margin: auto;
      }
    }
  }
  // 网格布局
  .g-service-map-det {
    .map-det-col {
      animation-duration: 700ms;
    }
    .dte-right {
      background: #fff;
      .el-row {
        margin-bottom: 22px;
      }
    }
    @media screen and (min-width: 1920px) {
      .el-col-xl-5 {
        width: 19.83333%;
      }
    }
    .map-dte-box:hover {
      border: 1px solid #ebebeb;
      box-shadow: 0px 0px 8px #ccc;
    }
    .map-dte-box {
      width: 100%;
      margin-bottom: 22px;
      border: 1px solid #ebebeb;
      background: #fff;
      .dte-box-left {
        position: relative;
        width: 100%;
        padding-top: 75%;
        .instructions {
          position: absolute;
          opacity: 0;
          top: 6px;
          left: 6px;
          width: 28px;
          height: 28px;
          z-index: 9999;
          color: #ffffff;
          text-align: center;
          line-height: 28px;
          @include base-bg-color();
          border-radius: 4px;
          cursor: pointer;
        }

        .el-image {
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f3f9f9;
          cursor: pointer;
          max-width: 100%;
          max-height: 100%;
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          .el-icon-picture-outline {
            font-size: 24px;
            color: #909399;
          }
        }
      }
      .dte-box-right {
        margin: 12px 18px 8px;
        .dte-box-font {
          height: 18px;
          @include base-active-color();
          font-size: 14px;
          margin-bottom: 10px;
          .titlebox {
            height: 18px;
            max-width: 100%;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            .edit-name {
              width: 84%;
              /deep/ .el-input__inner {
                padding: 0px;
                font-size: 14px;
                border: none;
                border-bottom: 1px solid #dcdfe6;
                border-radius: 0;
                height: 30px;
                line-height: 30px;
              }
            }
          }
          /deep/.el-icon-edit {
            width: 14px;
            right: 0;
          }
          /deep/.el-icon-edit:hover {
            cursor: pointer;
          }
        }
      }
      .dte-box-floot {
        left: 18px;
        height: 18px;
        @include base-active-color();
        font-size: 16px;
        margin: 4px 0;
        .box-floot-left {
          float: left;
          .btn-hover:hover {
            cursor: default;
          }
          .btn-hover {
            @include base-active-color();
          }
        }
        .box-floot-right {
          float: right;
          span {
            font-size: 16px;
            margin-left: 10px;
            i {
              font-size: 16px;
            }
          }
          .btn-hover:hover {
            cursor: pointer;
          }
          // .el-icon-portal-siyou:hover {
          //   cursor: pointer;
          // }
        }
        .btn-hover {
          width: 20px;
          i {
            font-size: 16px;
            @include base-active-color();
          }
          span {
            font-size: 14px;
            margin-left: 4px;
            vertical-align: top;
          }
        }
      }
    }
    .map-dte-box:hover .instructions {
      opacity: 1;
    }
  }
}
.el-dropdown-menu__item:focus,
.el-dropdown-menu__item:not(.is-disabled):hover {
  background-color: #ecf5ff;
  @include base-active-color();
}
</style>