<template>
  <div class="manage-dialog">
    <!-- <transition
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft"
    >-->
    <el-row class="dialog-body" v-show="modifyingNo">
      <div class="map-container">
        <div class="map-profile-picture-area">
          <el-image
            :src="mapDetailsInfo.USERIMG?`/fileapi/file/download/${mapDetailsInfo.USERIMG}/true`:defaultImg"
          ></el-image>
        </div>
        <div class="map-details-area">
          <el-row class="map-top">
            <el-col>
              <span class="color-url">{{mapDetailsInfo.C_NAME}}</span>
            </el-col>
          </el-row>
          <el-row class="map-bottom">
            {{mapDetailsInfo.USERNAME}}
            <span>{{mapDetailsInfo.C_CREATE_TIME}}</span>
            {{$t('management.Create')}}
          </el-row>
        </div>
        <el-row class="map-img">
          <el-col :span="18">
            <el-row class="map-img-title">
              <el-row>
                <el-col :span="8">
                  {{$t('myCenter.SharingExtent')}}：
                  <span
                    class="color-url"
                  >{{mapDetailsInfo.C_SCOPE=='Public'?this.$t('service.public'):(mapDetailsInfo.C_SCOPE=='Private'?this.$t('service.private'):this.$t('service.Partialauthorization'))}}</span>
                </el-col>
                <el-col :span="8">
                  {{$t('service.hits')}}：
                  <span
                    class="color-url"
                  >{{(mapDetailsInfo.C_HITS||mapDetailsInfo.c_hits)?(mapDetailsInfo.C_HITS||mapDetailsInfo.c_hits):'0'}}</span>
                </el-col>
                <el-col :span="8">
                  {{$t('service.collect')}}：
                  <span
                    class="color-url"
                  >{{mapDetailsInfo.COLLECTION_TIME==null?this.$t('service.uncollected'):this.$t('service.collected')}}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col>{{$t('service.description')}}：{{mapDetailsInfo.C_COMMENTS?mapDetailsInfo.C_COMMENTS:$t('group.Notavailablenow')}}</el-col>
              </el-row>
            </el-row>
          </el-col>
          <el-col :span="6" class="map-img-box">
            <el-image :src="mapDetailsInfo.C_IMG?mapDetailsInfo.C_IMG:defaultThumbnail">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
          </el-col>
        </el-row>
        <el-row class="map-basics">
          <el-row class="map-basics-title">
            <el-divider content-position="left">{{$t('service.basemap')}}</el-divider>
          </el-row>
          <el-row class="map-basics-details">
            <el-col class="details-kwork">
              <span class="kwork-tlite">{{$t('service.label')+'：'}}</span>
              <div class="message-kwork-box">
                <span v-for="(kwork,i) in label" class="chart-message-kwork" :key="i">{{kwork}}</span>
              </div>
            </el-col>
            <el-col
              v-if="mapDetailsInfo.C_RESOURCE_TYPE=='sceneService'"
              class="details-type"
            >{{$t('myCenter.Type')}}：{{pseudoType}}</el-col>
            <el-col
              v-else
              class="details-type"
            >{{$t('myCenter.Type')}}：{{mapDetailsInfo.C_SERVICE_TYPE||mapDetailsInfo.serviceType||(mapDetailsInfo.folder?'文件夹':mapDetailsInfo.suffix)||(mapDetailsInfo.C_FOLDER==1?'文件夹':mapDetailsInfo.SUFFIX)}}</el-col>
            <el-col>{{$t('service.visibility')}}{{mapDetailsInfo.YWBROWSE!='0'?this.$t('service.visible'):this.$t('service.Invisible')}}</el-col>
            <el-col
              v-if="!(mapDetailsInfo.C_RESOURCE_TYPE=='fileService'&&mapDetailsInfo.C_FOLDER==1&&mapDetailsInfo.YWBROWSE!='0')"
            >
              <!-- 访问地址：
              <span
                class="color-url color-viewurl"
                @click="viewurlReplace(mapDetailsInfo)"
              >{{mapDetailsInfo.C_SERVICE_VIEWURL||mapDetailsInfo.C_APP_URL||mapDetailsInfo.C_SERVICE_URL||resUrl}}</span>-->
              {{mapDetailsInfo.C_RESOURCE_TYPE=='fileService'||mapDetailsInfo.C_RESOURCE_TYPE=='data'?$t('service.DownloadUrl')+':':$t('service.url')}}
              <span
                class="pseudo-jump"
                target="_blank"
                v-if="$store.getters.isLogin&&(mapDetailsInfo.C_SERVICE_URL||mapDetailsInfo.C_SERVICE_VIEWURL||mapDetailsInfo.C_APP_URL||mapDetailsInfo.C_SERVICE_URL||(mapDetailsInfo.C_RESOURCE_TYPE=='fileService'&&mapDetailsInfo.YWBROWSE>0)||(mapDetailsInfo.C_RESOURCE_TYPE=='data'&&mapDetailsInfo.YWBROWSE>0)||(mapDetailsInfo.C_RESOURCE_TYPE=='appbuilder'&&mapDetailsInfo.YWBROWSE>0)||(mapDetailsInfo.C_RESOURCE_TYPE=='mapbuilder'&&mapDetailsInfo.YWBROWSE>0))"
                @click="viewurlReplace(mapDetailsInfo)"
              >
                <i
                  v-if="mapDetailsInfo.C_RESOURCE_TYPE=='fileService'||mapDetailsInfo.C_RESOURCE_TYPE=='data'"
                >
                  <el-button
                    type="primary"
                    class="base-btn"
                    @click="preview"
                    v-if="mapDetailsInfo.SUFFIX=='jpg'||mapDetailsInfo.SUFFIX=='png'||mapDetailsInfo.SUFFIX=='jpeg'||mapDetailsInfo.SUFFIX=='gif'||  mapDetailsInfo.SUFFIX=='mp4'||mapDetailsInfo.SUFFIX=='avi'||mapDetailsInfo.SUFFIX=='mov'||mapDetailsInfo.SUFFIX=='mkv'||  mapDetailsInfo.SUFFIX=='flv'||mapDetailsInfo.SUFFIX=='vmvb'||mapDetailsInfo.SUFFIX=='scs'"
                  >{{$t('visualization.Preview')}}</el-button>
                  <el-button
                    type="primary"
                    class="base-btn"
                    @click="download"
                  >{{$t('webAppBuilder.Download')}}</el-button>
                </i>
                <i v-else class="color-url color-viewurl">{{mapDetailsInfo.C_SERVICE_URL||resUrl}}</i>
              </span>
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
                    :disabled="mapDetailsInfo.AUDITSCOPE==0?true:false"
                    :class="mapDetailsInfo.AUDITSCOPE==0?'in-audit':'base-btn'"
                  >{{mapDetailsInfo.AUDITSCOPE==0?$t('management.InReview'):$t('service.ApplyPermission')}}</el-button>
                </el-popover>
              </span>
            </el-col>
          </el-row>
        </el-row>
        <el-row class="map-attribute" v-if="attributeTitleShow">
          <el-row class="map-attribute-title">
            <el-divider content-position="left">{{$t('service.properties')}}</el-divider>
          </el-row>
          <el-row class="map-attribute-details">
            <el-col>
              <span>Epsg：</span>
              <div class="service-epsg">{{mapDetailsInfo.C_SERVICE_EPSG}}</div>
            </el-col>
            <el-col>
              <span>fullExtent：</span>
              <div class="service-epsg">{{mapDetailsInfo.C_SERVICE_FULL}}</div>
            </el-col>
            <el-col>
              <span>initialExtent：</span>
              <div class="service-epsg">{{mapDetailsInfo.C_SERVICE_INITIAL}}</div>
            </el-col>
            <el-col>
              <span>origin：</span>
              <div class="service-epsg">{{mapDetailsInfo.C_SERVICE_ORIGIN}}</div>
            </el-col>
            <el-col>
              <span>proj4：</span>
              <div class="service-epsg">{{mapDetailsInfo.C_SERVICE_PROJFOUR}}</div>
            </el-col>
            <el-col>
              <span>spatialReference：</span>
              <div class="service-epsg">{{mapDetailsInfo.C_SERVICE_PRJ}}</div>
            </el-col>
          </el-row>
        </el-row>

        <el-row
          class="map-basics"
          v-if="mapDetailsInfo.C_RESOURCE_TYPE=='fileService'&&mapDetailsInfo.C_FOLDER==1&&mapDetailsInfo.YWBROWSE!='0'"
        >
          <el-row class="map-basics-title map-basics-file">
            <el-divider content-position="left">文件夹详情</el-divider>
          </el-row>
          <el-row class="map-basics-details">
            <el-button type="primary base-btn" icon="el-icon-download" @click="bulkDownload()">批量下载</el-button>
            <el-table
              ref="multipleTable"
              :data="mapDetailsFilelist"
              tooltip-effect="dark"
              style="width: 100%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" min-width="8%"></el-table-column>
              <el-table-column prop="C_NAME" :label="$t('myCenter.File')" min-width="37%"></el-table-column>
              <el-table-column
                :label="$t('myCenter.Size') +'（bytes）'"
                prop="C_SIZE"
                min-width="20%"
              ></el-table-column>
              <el-table-column :label="$t('myCenter.Format')" min-width="15%" prop="SUFFIX"></el-table-column>
              <el-table-column prop="cz" :label="$t('management.operate')" min-width="20%">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    class="base-btn"
                    @click="folderDownload(scope.$index, scope.row)"
                  >{{$t('webAppBuilder.Download')}}</el-button>
                  <el-button
                    v-if="scope.row.SUFFIX=='jpg'||scope.row.SUFFIX=='png'||scope.row.SUFFIX=='jpeg'||scope.row.SUFFIX=='gif'||  scope.row.SUFFIX=='mp4'||scope.row.SUFFIX=='avi'||scope.row.SUFFIX=='mov'||scope.row.SUFFIX=='mkv'||  scope.row.SUFFIX=='flv'||scope.row.SUFFIX=='vmvb'||scope.row.SUFFIX=='scs'"
                    size="mini"
                    class="base-btn"
                    @click="folderPreview(scope.$index, scope.row)"
                  >{{$t('visualization.Preview')}}</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
        </el-row>
      </div>
    </el-row>
    <!-- </transition> -->
    <!-- 文件夹图片视频预览 -->
    <!-- <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
    >-->
    <el-row v-show="!modifyingNo" class="preview-box">
      <el-row @click.native="previewReturn()" class="preview-back">
        <i class="el-icon-back"></i>
        <span>{{$t('service.back')}}</span>
      </el-row>
      <el-row
        v-if="fileServiceDetails.SUFFIX=='mp4'||fileServiceDetails.SUFFIX=='avi'||fileServiceDetails.SUFFIX=='mov'||fileServiceDetails.SUFFIX=='mkv'||fileServiceDetails.SUFFIX=='flv'||fileServiceDetails.SUFFIX=='vmvb'||fileServiceDetails.SUFFIX=='scs'"
      >
        <video-player
          class="video-player-box"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
          customEventName="customstatechangedeventname"
        ></video-player>
      </el-row>
      <el-row
        v-if="fileServiceDetails.SUFFIX=='jpg'||fileServiceDetails.SUFFIX=='png'||fileServiceDetails.SUFFIX=='jpeg'||fileServiceDetails.SUFFIX=='gif'"
      >
        <el-row class="img-box">
          <img class="swiper-img" :src="imgPreviewUrl" alt />
        </el-row>
      </el-row>
    </el-row>
    <!-- </transition> -->
  </div>
</template>

<script>
import {
  getDefaultImg,
  getFileDefaultImg,
} from "portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js";
import { urlReplace } from "@/utils/urlReplace.js";
export default {
  name: "PersonalCenterServiceDetailsDialogList",
  data() {
    return {
      defaultImg:
        "/config/imageConfig/system/defaultProfilepicture/defaultProfilePicture1.png",
      mapDetailsInfo: {},
      selectedData: [], //复选框选中值
      mapDetailsFilelist: [], //文件夹子文件列表
      fileServiceDetails: {}, //文件夹单文件预览详情
      modifyingNo: true, //默认不预览文件夹子文件
      imgPreviewUrl: "", //图片预览地址
      attributeTitleShow: false,
      defaultThumbnail: "",
      resUrl: "",
      applicationAuthorizationReason: "",
      visible: false,
      pseudoType: "",
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如    "16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "", //url地址
          },
        ],
        poster: "", //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
    };
  },
  computed: {
    label() {
      if (this.mapDetailsInfo.C_KEYWORD) {
        return this.mapDetailsInfo.C_KEYWORD.split(",");
      } else {
        return [];
      }
    },
    /* eslint-disable */
    player() {
      if (this.$refs.videoPlayer) {
        return this.$refs.videoPlayer.player;
      }
    },
  },
  watch: {
    visible() {
      if (!this.visible) {
        setTimeout(() => {
          this.applicationAuthorizationReason = "";
        }, 1000);
      }
    },
    fileServiceDetails() {
      this.imgPreviewUrl = `/fileapi/file/download/${this.fileServiceDetails.C_FILE_REFERENCEID}/true`;
      this.playerOptions.sources[0].src = `${window.location.protocol}//${window.location.host}/fileapi/file/download/${this.fileServiceDetails.C_FILE_REFERENCEID}/true`;
    },
  },
  methods: {
    // 文件夹预览返回
    previewReturn() {
      this.modifyingNo = true;
      this.imgPreviewUrl = "";
    },
    // 申请授权
    applicationAuthorization() {
      if (!this.$store.getters.isLogin) {
        this.$message({
          message: this.$t("service.PleaseLoginFirstToApplyForPermission"),
          type: "warning",
        });
      }
    },
    //申请提交
    auditResource() {
      this.$api.serviceMapApi
        .auditResource(
          {
            createComment: this.applicationAuthorizationReason,
            auditBy: this.mapDetailsInfo.C_CREATE_BY,
            resourceId: this.mapDetailsInfo.C_ID,
            resourceName: this.mapDetailsInfo.C_NAME,
            resourceType: this.mapDetailsInfo.C_RESOURCE_TYPE,
          },
          {
            loadingText: this.$t("service.Submitting"),
            __LOGINTYPE: "dialog",
          }
        )
        .then((res) => {
          if (res.data.status == 200) {
            this.$message({
              message: res.data.title,
              type: "success",
            });
            this.viewDetailsList(this.mapDetailsInfo, false, null);
            this.visible = false;
          }
        })
        .catch(() => {});
    },
    save() {
      if (this.applicationAuthorizationReason == "") {
        this.$message({
          message: this.$t("service.PleaseEnterYourApplicationReason"),
          type: "warning",
        });
      } else {
        if (this.mapDetailsInfo.C_RESOURCE_TYPE == "mapService") {
          this.$api.serviceMapApi
            .getServicePermissions({
              id: this.mapDetailsInfo.C_ID,
            })
            .then((res) => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t(
                    "management.Youhavenopermissiontoapplyforit"
                  ),
                  type: "warning",
                });

                this.visible = false;
              }
            });
        } else if (this.mapDetailsInfo.C_RESOURCE_TYPE == "sceneService") {
          this.$api.serviceSceneApi
            .getSceneServicePermissions({
              id: this.mapDetailsInfo.C_ID,
            })
            .then((res) => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t(
                    "management.Youhavenopermissiontoapplyforit"
                  ),
                  type: "warning",
                });

                this.visible = false;
              }
            });
        } else if (this.mapDetailsInfo.C_RESOURCE_TYPE == "dataService") {
          this.$api.serviceDataApi
            .getDataServicePermissions({
              id: this.mapDetailsInfo.C_ID,
            })
            .then((res) => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t(
                    "management.Youhavenopermissiontoapplyforit"
                  ),
                  type: "warning",
                });

                this.visible = false;
              }
            });
        } else if (this.mapDetailsInfo.C_RESOURCE_TYPE == "functionService") {
          this.$api.serviceFunctionApi
            .getFunctionServicePermissions({
              id: this.mapDetailsInfo.C_ID,
            })
            .then((res) => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t(
                    "management.Youhavenopermissiontoapplyforit"
                  ),
                  type: "warning",
                });

                this.visible = false;
              }
            });
        } else if (this.mapDetailsInfo.C_RESOURCE_TYPE == "fileService") {
          this.$api.serviceFileCenApi
            .getFileServicePermissions({
              id: this.mapDetailsInfo.C_ID,
            })
            .then((res) => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t(
                    "management.Youhavenopermissiontoapplyforit"
                  ),
                  type: "warning",
                });

                this.visible = false;
              }
            });
        } else if (this.mapDetailsInfo.C_RESOURCE_TYPE == "data") {
          this.$api.serviceDatacenterApi
            .getDataServicePermissions({
              id: this.mapDetailsInfo.C_ID,
            })
            .then((res) => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t(
                    "management.Youhavenopermissiontoapplyforit"
                  ),
                  type: "warning",
                });

                this.visible = false;
              }
            });
        } else if (this.mapDetailsInfo.C_RESOURCE_TYPE == "appbuilder") {
          this.$api.serviceAppCenterApi
            .getAppServicePermissions({
              id: this.mapDetailsInfo.C_ID,
            })
            .then((res) => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t(
                    "management.Youhavenopermissiontoapplyforit"
                  ),
                  type: "warning",
                });

                this.visible = false;
              }
            });
        } else if (this.mapDetailsInfo.C_RESOURCE_TYPE == "mapbuilder") {
          this.$api.webMapBuilderApi
            .getMapbuilderPermissions({
              id: this.mapDetailsInfo.C_ID,
            })
            .then((res) => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t(
                    "management.Youhavenopermissiontoapplyforit"
                  ),
                  type: "warning",
                });

                this.visible = false;
              }
            });
        } else if (this.mapDetailsInfo.C_RESOURCE_TYPE == "scenebuilder") {
          this.$api.webSceneBuilderApi
            .getScenebuilderPermissions({
              id: this.mapDetailsInfo.C_ID,
            })
            .then((res) => {
              if (res.data.data[0].YWSEARCH > 0) {
                this.auditResource();
              } else if (res.data.data[0].YWSEARCH <= 0) {
                this.$message({
                  message: this.$t(
                    "management.Youhavenopermissiontoapplyforit"
                  ),
                  type: "warning",
                });

                this.visible = false;
              }
            });
        }
      }
    },
    // 三维类型处理
    typeHandle() {
      if (
        this.mapDetailsInfo.resourceType == "sceneService" ||
        this.mapDetailsInfo.C_RESOURCE_TYPE == "sceneService"
      ) {
        if (this.mapDetailsInfo.C_SERVICE_TYPE == "1") {
          this.pseudoType = "影像三维服务(Imagery3DServer)";
        } else if (this.mapDetailsInfo.C_SERVICE_TYPE == "2") {
          this.pseudoType = "影像三维瓦片文件(ImageryTileFile)";
        } else if (this.mapDetailsInfo.C_SERVICE_TYPE == "3") {
          this.pseudoType = "地形三维服务(Terrain3DServer)";
        } else if (this.mapDetailsInfo.C_SERVICE_TYPE == "4") {
          this.pseudoType = "地形三维瓦片文件(TerrainTileFile)";
        } else if (this.mapDetailsInfo.C_SERVICE_TYPE == "5") {
          this.pseudoType = "模型瓦片服务(3dtiles)";
        } else if (this.mapDetailsInfo.C_SERVICE_TYPE == "6") {
          this.pseudoType = "动态模型瓦片服务(3dtiles)";
        } else if (this.mapDetailsInfo.C_SERVICE_TYPE == "7") {
          this.pseudoType = "STK地形";
        } else if (this.mapDetailsInfo.C_SERVICE_TYPE == "8") {
          this.pseudoType = "矢量服务(GeoJson)";
        } else if (this.mapDetailsInfo.C_SERVICE_TYPE == "9") {
          this.pseudoType = "谷歌 KML/KMZ";
        } else if (this.mapDetailsInfo.C_SERVICE_TYPE == "10") {
          this.pseudoType = "CZML(Cesium)";
        } else if (this.mapDetailsInfo.C_SERVICE_TYPE == "11") {
          this.pseudoType = "K3d服务(Cesium)";
        }
      }
    },
    // 文件夹批量下载
    bulkDownload() {
      if (this.selectedData.length == 0) {
        this.$message({
          message: "请勾选文件",
          type: "warning",
        });
        return false;
      }
      var referenceId = [];
      this.selectedData.forEach((filrid) => {
        referenceId.push(filrid.C_FILE_REFERENCEID);
      });
      var elemIF = document.createElement("a");
      elemIF.href = `/fileapi/file/dlFilesById?folderId=${
        this.mapDetailsInfo.C_ID
      }&referenceIds=${referenceId.toString()}&${
        this.$store.getters.userInfo.id
      }`;
      elemIF.style.display = "none";
      document.body.appendChild(elemIF);
      elemIF.click();
      elemIF.remove();
      this.$message({
        type: "success",
        message: this.$t("myCenter.Downloadedsuccessfully") + "!",
      });
      this.$refs.multipleTable.clearSelection();
    },
    // 文件夹复选框选中
    handleSelectionChange(val) {
      this.selectedData = val;
    },
    // 文件夹子文件预览
    folderPreview(index, val) {
      this.$api.serviceFileCenApi
        .getFolderDatails({
          folderId: this.mapDetailsInfo.C_ID,
          personnelId: this.mapDetailsInfo.C_CREATE_BY,
        })
        .then((res) => {
          if (res.data.data[0].folderlist[0].YWBROWSE > 0) {
            this.fileServiceDetails = val; //图片视频文件预览
            this.modifyingNo = false;
          } else if (res.data.data[0].folderlist[0].YWBROWSE <= 0) {
            this.$message({
              message: this.$t(
                "myCenter.Asyouhavenopermissionsyoucantpreviewit"
              ),
              type: "warning",
            });
          } else if (res.data.data[0].folderlist[0].YWSEARCH == null) {
            this.$emit("againListService");
          }
        })
        .catch((error) => {
          if (error.data.status === 391) {
            this.$emit("againListService");
          }
        });
    },
    // 文件夹单个子文件下载
    folderDownload(index, val) {
      this.$api.serviceFileCenApi
        .getFolderDatails({
          folderId: this.mapDetailsInfo.C_ID,
          personnelId: this.mapDetailsInfo.C_CREATE_BY,
        })
        .then((res) => {
          if (res.data.status == 200) {
            if (res.data.data[0].folderlist[0].YWBROWSE > 0) {
              if (val.C_SIZE / 1024 / 1024 > 10) {
                this.$confirm(
                  this.$t("myCenter.Thefilesizeexceeds10MContinuetodownloadit"),
                  this.$t("webAppBuilder.Tip"),
                  {
                    confirmButtonText: this.$t("myCenter.Sure"),
                    cancelButtonText: this.$t("myCenter.cancel"),
                    type: "warning",
                  }
                )
                  .then(() => {
                    var elemIF = document.createElement("a");
                    elemIF.href = `/fileapi/file/download/${val.C_FILE_REFERENCEID}/false/${this.$store.getters.userInfo.id}`;
                    elemIF.style.display = "none";
                    document.body.appendChild(elemIF);
                    elemIF.click();
                    elemIF.remove();
                    this.$message({
                      type: "success",
                      message: this.$t("myCenter.Downloadedsuccessfully") + "!",
                    });
                  })
                  .catch(() => {
                    this.$message({
                      type: "info",
                      message: this.$t("myCenter.Downloadcanceled"),
                    });
                  });
              } else {
                var elemIF = document.createElement("a");
                elemIF.href = `/fileapi/file/download/${val.C_FILE_REFERENCEID}/false/${this.$store.getters.userInfo.id}`;
                elemIF.style.display = "none";
                document.body.appendChild(elemIF);
                elemIF.click();
                elemIF.remove();
                this.$message({
                  type: "success",
                  message: this.$t("myCenter.Downloadedsuccessfully") + "!",
                });
              }
            } else if (res.data.data[0].folderlist[0].YWBROWSE == 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannotdownloadit"
                ),
                type: "warning",
              });
            } else if (res.data.data[0].folderlist[0].YWSEARCH == null) {
              this.$emit("againListService");
            }
          }
        })
        .catch((error) => {
          if (error.data.status === 391) {
            this.$emit("againListService");
          }
        });
    },
    // 预览
    preview() {
      if (this.mapDetailsInfo.C_RESOURCE_TYPE == "fileService") {
        this.$api.serviceFileCenApi
          .getFileDetails({
            fileId: this.mapDetailsInfo.C_ID,
            personnelId: this.mapDetailsInfo.C_CREATE_BY,
          })
          .then((res) => {
            if (res.data.data[0].YWBROWSE > 0) {
              // window.open(
              //   `/fileapi/file/download/${this.mapDetailsInfo.C_FILE_REFERENCEID}/true`
              // );
              this.fileServiceDetails = this.mapDetailsInfo; //图片视频文件预览
              this.modifyingNo = false;
            } else if (res.data.data[0].YWBROWSE <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucantpreviewit"
                ),
                type: "warning",
              });
            }
          })
          .catch(() => {});
      } else if (this.mapDetailsInfo.C_RESOURCE_TYPE == "data") {
        this.$api.serviceDatacenterApi
          .getDataDetails({
            dataId: this.mapDetailsInfo.C_ID,
            personnelId: this.mapDetailsInfo.C_CREATE_BY,
          })
          .then((res) => {
            if (res.data.data[0].YWBROWSE > 0) {
              window.open(
                `/fileapi/file/download/${this.mapDetailsInfo.C_FILE_REFERENCEID}/true`
              );
            } else if (res.data.data[0].YWBROWSE <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucantpreviewit"
                ),
                type: "warning",
              });
            }
          })
          .catch(() => {});
      }
    },
    // 下载
    download() {
      if (this.mapDetailsInfo.C_RESOURCE_TYPE == "fileService") {
        this.$api.serviceFileCenApi
          .getFileDetails({
            fileId: this.mapDetailsInfo.C_ID,
            personnelId: this.mapDetailsInfo.C_CREATE_BY,
          })
          .then((res) => {
            if (res.data.status == 200) {
              if (res.data.data[0].YWBROWSE > 0) {
                if (this.mapDetailsInfo.SIZE / 1024 / 1024 > 10) {
                  this.$confirm(
                    this.$t(
                      "myCenter.Thefilesizeexceeds10MContinuetodownloadit"
                    ),
                    this.$t("webAppBuilder.Tip"),
                    {
                      confirmButtonText: this.$t("myCenter.Sure"),
                      cancelButtonText: this.$t("myCenter.cancel"),
                      type: "warning",
                    }
                  )
                    .then(() => {
                      var elemIF = document.createElement("a");
                      elemIF.href = `/fileapi/file/download/${this.mapDetailsInfo.C_FILE_REFERENCEID}/false/${this.$store.getters.userInfo.id}`;
                      elemIF.style.display = "none";
                      document.body.appendChild(elemIF);
                      elemIF.click();
                      elemIF.remove();
                      this.$message({
                        type: "success",
                        message:
                          this.$t("myCenter.Downloadedsuccessfully") + "!",
                      });
                    })
                    .catch(() => {
                      this.$message({
                        type: "info",
                        message: this.$t("myCenter.Downloadcanceled"),
                      });
                    });
                } else {
                  var elemIF = document.createElement("a");
                  elemIF.href = `/fileapi/file/download/${this.mapDetailsInfo.C_FILE_REFERENCEID}/false/${this.$store.getters.userInfo.id}`;
                  elemIF.style.display = "none";
                  document.body.appendChild(elemIF);
                  elemIF.click();
                  elemIF.remove();
                }
                this.$message({
                  type: "success",
                  message: this.$t("myCenter.Downloadedsuccessfully") + "!",
                });
              } else if (res.data.data[0].YWBROWSE == 0) {
                this.$message({
                  message: this.$t(
                    "myCenter.Asyouhavenopermissionsyoucannotdownloadit"
                  ),
                  type: "warning",
                });
              }
            }
          })
          .catch(() => {});
      } else if (this.mapDetailsInfo.C_RESOURCE_TYPE == "data") {
        this.$api.serviceDatacenterApi
          .getDataDetails({
            dataId: this.mapDetailsInfo.C_ID,
            personnelId: this.mapDetailsInfo.C_CREATE_BY,
          })
          .then((res) => {
            if (res.data.status == 200) {
              if (res.data.data[0].YWBROWSE > 0) {
                if (this.mapDetailsInfo.SIZE / 1024 / 1024 > 10) {
                  this.$confirm(
                    this.$t(
                      "myCenter.Thefilesizeexceeds10MContinuetodownloadit"
                    ),
                    this.$t("webAppBuilder.Tip"),
                    {
                      confirmButtonText: this.$t("myCenter.Sure"),
                      cancelButtonText: this.$t("myCenter.cancel"),
                      type: "warning",
                    }
                  )
                    .then(() => {
                      var elemIF = document.createElement("a");
                      elemIF.href = `/fileapi/file/download/${this.mapDetailsInfo.C_DATA_REFERENCEID}/false/${this.$store.getters.userInfo.id}`;
                      elemIF.style.display = "none";
                      document.body.appendChild(elemIF);
                      elemIF.click();
                      elemIF.remove();
                      this.$message({
                        type: "success",
                        message:
                          this.$t("myCenter.Downloadedsuccessfully") + "!",
                      });
                    })
                    .catch(() => {
                      this.$message({
                        type: "info",
                        message: this.$t("myCenter.Downloadcanceled"),
                      });
                    });
                } else {
                  var elemIF = document.createElement("a");
                  elemIF.href = `/fileapi/file/download/${this.mapDetailsInfo.C_DATA_REFERENCEID}/false/${this.$store.getters.userInfo.id}`;
                  elemIF.style.display = "none";
                  document.body.appendChild(elemIF);
                  elemIF.click();
                  elemIF.remove();
                  this.$message({
                    type: "success",
                    message: this.$t("myCenter.Downloadedsuccessfully") + "!",
                  });
                }
              } else if (res.data.data[0].YWBROWSE == 0) {
                this.$message({
                  message: this.$t(
                    "myCenter.Asyouhavenopermissionsyoucannotdownloadit"
                  ),
                  type: "warning",
                });
              }
            }
          })
          .catch(() => {});
      }
    },
    // 查看详情
    viewDetailsList(val, detailBol, personnelId) {
      this.$nextTick(function () {
        if (
          !(
            val.resourceType == "fileService" ||
            val.C_RESOURCE_TYPE == "fileService"
          )
        ) {
          this.defaultThumbnail = val.resourceType
            ? getDefaultImg(val.resourceType)
            : getDefaultImg(val.C_RESOURCE_TYPE);
        }
      });
      this.attributeTitleShow = false;
      if (
        val.resourceType == "mapService" ||
        val.C_RESOURCE_TYPE == "mapService"
      ) {
        if (
          val.serviceType == "kqmapping" ||
          val.serviceType == "bigData" ||
          val.serviceType == "arcmapping" ||
          val.C_SERVICE_TYPE == "kqmapping" ||
          val.C_SERVICE_TYPE == "bigData" ||
          val.C_SERVICE_TYPE == "arcmapping"
        ) {
          this.attributeTitleShow = true;
        }
        this.$api.serviceMapApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              DetailBol: detailBol ? detailBol : true,
              personnelId: personnelId,
            },
            { loadingText: this.$t("service.searching") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.mapDetailsInfo = res.data.data[0];
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "dataService" ||
        val.C_RESOURCE_TYPE == "dataService"
      ) {
        this.$api.serviceDataApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              DetailBol: detailBol ? detailBol : true,
              personnelId: personnelId,
            },
            { loadingText: this.$t("service.searching") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.mapDetailsInfo = res.data.data[0];
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "functionService" ||
        val.C_RESOURCE_TYPE == "functionService"
      ) {
        this.$api.serviceFunctionApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              DetailBol: detailBol ? detailBol : true,
              personnelId: personnelId,
            },
            { loadingText: this.$t("service.searching") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.mapDetailsInfo = res.data.data[0];
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "sceneService" ||
        val.C_RESOURCE_TYPE == "sceneService"
      ) {
        this.$api.serviceSceneApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              DetailBol: detailBol ? detailBol : true,
              personnelId: personnelId,
            },
            { loadingText: this.$t("service.searching") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.mapDetailsInfo = res.data.data[0];
              this.typeHandle();
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "fileService" ||
        val.C_RESOURCE_TYPE == "fileService"
      ) {
        if (val.C_FOLDER == 0 || val.folder == 0) {
          this.$api.serviceFileCenApi
            .getFileDetails(
              {
                fileId: val.id ? val.id : val.C_ID,
                personnelId: personnelId,
              },
              { loadingText: this.$t("service.searching") }
            )
            .then((res) => {
              if (res.data.status == 200) {
                this.mapDetailsInfo = res.data.data[0];
                this.defaultThumbnail = getFileDefaultImg(
                  res.data.data[0].SUFFIX
                );
              }
            })
            .catch(() => {});
        } else {
          this.$api.serviceFileCenApi
            .getFolderDatails(
              {
                folderId: val.id ? val.id : val.C_ID,
                personnelId: personnelId,
              },
              { loadingText: this.$t("service.searching") }
            )
            .then((res) => {
              if (res.data.status == 200) {
                this.mapDetailsInfo = res.data.data[0].folderlist[0];
                this.mapDetailsFilelist = res.data.data[0].filelist;
                this.defaultThumbnail = getFileDefaultImg("folder");
              }
            })
            .catch(() => {});
        }
      } else if (val.resourceType == "data" || val.C_RESOURCE_TYPE == "data") {
        this.$api.serviceDatacenterApi
          .getDataDetails(
            {
              dataId: val.id ? val.id : val.C_ID,
              DetailBol: detailBol ? detailBol : true,
              personnelId: personnelId,
            },
            { loadingText: this.$t("service.searching") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.mapDetailsInfo = res.data.data[0];
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "mapbuilder" ||
        val.C_RESOURCE_TYPE == "mapbuilder"
      ) {
        this.resUrl =
          window.location.href.replace(this.$route.path, "/mapbuilder") +
          "?id=" +
          val.C_ID;
        this.$api.webMapBuilderApi
          .getMapbuilderDetails(
            {
              appId: val.C_ID,
              personnelId: personnelId,
            },
            { loadingText: this.$t("service.searching") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.mapDetailsInfo = res.data.data[0];
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "scenebuilder" ||
        val.C_RESOURCE_TYPE == "scenebuilder"
      ) {
        this.$api.webSceneBuilderApi
          .getSceneAppDetails(
            {
              appId: val.C_ID,
              personnelId: personnelId,
            },
            { loadingText: this.$t("service.searching") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.mapDetailsInfo = res.data.data[0];
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "bigbuilder" ||
        val.C_RESOURCE_TYPE == "bigbuilder"
      ) {
        // var codeKey="favorites_bigbuilder";
      } else if (
        val.resourceType == "appbuilder" ||
        val.C_RESOURCE_TYPE == "appbuilder"
      ) {
        this.resUrl =
          window.location.href.replace(this.$route.path, "/appbuilder") +
          "?id=" +
          val.C_ID;
        this.$api.serviceAppCenterApi
          .getAppDetails(
            {
              appId: val.C_ID,
              personnelId: personnelId,
            },
            { loadingText: this.$t("service.searching") }
          )
          .then((res) => {
            if (res.data.status == 200) {
              this.mapDetailsInfo = res.data.data[0];
            }
          })
          .catch(() => {});
      }
    },
    // 地址跳转
    viewurlReplace(val) {
      if (
        val.C_RESOURCE_TYPE == "mapService" &&
        val.C_SERVICE_TYPE != "bigData" &&
        val.C_SERVICE_TYPE != "kqmapping"
      ) {
        // window.open(urlReplace(val));
        window.open(val.C_SERVICE_VIEWURL);
      } else if (
        val.C_RESOURCE_TYPE == "mapService" &&
        val.C_SERVICE_TYPE == "bigData"
      ) {
        window.open(val.C_SERVICE_VIEWURL);
      } else if (
        val.C_RESOURCE_TYPE == "mapService" &&
        val.C_SERVICE_TYPE == "kqmapping"
      ) {
        // 实时获取服务状态
        this.$api.serviceMapApi
          .getServiceState({
            serviceUrl: val.C_SERVICE_URL,
            serviceType: val.C_SERVICE_TYPE,
          })
          .then((res) => {
            if (res.data.data.serviceState == 1) {
              this.$message({
                message: this.$t(
                  "management.TheservicehasbeenstoppedPleasestartitbeforeaccess"
                ),
                type: "warning",
              });
            } else if (
              res.data.data.serviceState != 1 &&
              res.data.data.serviceState != 4 &&
              res.data.data.serviceState != ""
            ) {
              if (res.data.data.serviceState.indexOf("not exist") != -1) {
                this.$message({
                  message: res.data.data.serviceState,
                  type: "warning",
                });
              } else {
                this.$message({
                  message: "该服务不存在",
                  type: "warning",
                });
              }
            } else {
              // window.open(urlReplace(val));
              window.open(val.C_SERVICE_VIEWURL);
            }
          })
          .catch(() => {});
      } else if (val.C_RESOURCE_TYPE == "functionService") {
        window.open(val.C_SERVICE_URL);
      } else if (val.C_RESOURCE_TYPE == "data") {
        // window.open(val.C_SERVICE_URL);
      } else if (val.C_RESOURCE_TYPE == "dataService") {
        window.open(val.C_SERVICE_URL);
      } else if (val.C_RESOURCE_TYPE == "fileService") {
        // window.open(
        //   `/fileapi/file/download/${this.mapDetailsInfo.C_FILE_REFERENCEID}/true`
        // );
      } else if (val.C_RESOURCE_TYPE == "appbuilder") {
        this.$router.push({
          path: "/appbuilder",
          query: { id: val.C_ID },
        });
      } else if (val.C_RESOURCE_TYPE == "scenebuilder") {
        this.$router.push({
          path: "/scenebuilder",
          query: { id: val.C_ID },
        });
      } else if (val.C_RESOURCE_TYPE == "mapbuilder") {
        this.$router.push({
          path: "/mapbuilder",
          query: {
            id: val.C_ID,
            fileId: this.Base64.encode(val.C_FILE_ID),
            name: val.C_NAME,
            userId: val.C_CREATE_BY,
            scope: val.C_SCOPE,
          },
        });
      } else {
        window.open(urlReplace(val));
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.manage-dialog {
  // max-height:470px;
  // overflow-x: hidden;
  .preview-back {
    margin-bottom: 10px;
    text-align: right;
    cursor: pointer;
  }
  .img-box {
    min-height: 450px;
    overflow: auto;
    display: relative;
    .swiper-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .preview-box {
    .video-js .vjs-big-play-button {
      top: 50%;
      left: 50%;
      margin-left: -1.5em;
      margin-top: -0.75em;
    }
  }
  .dialog-body {
    .color-url {
      @include base-active-color();
    }
    .color-url.color-viewurl {
      cursor: pointer;
    }
    .map-container {
      .map-profile-picture-area {
        width: 90px;
        height: 72px;
        float: left;
        position: relative;
        .el-image {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
      .map-details-area {
        margin-left: 90px;
        padding-right: 30px;
        font-size: 14px;
        .map-top {
          height: 36px;
          line-height: 36px;
          font-size: 16px;
        }
        .map-bottom {
          height: 36px;
          line-height: 36px;
          span {
            padding-left: 10px;
          }
        }
      }
      .map-img {
        border: 1px solid #dfdfdf;
        height: 140px;
        padding: 10px 10px 10px 20px;
        .map-img-title {
          /deep/.el-row {
            padding-top: 24px;
          }
        }
        .map-img-box {
          box-sizing: border-box;
          height: 120px;
          width: 25%;
          .el-image {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f3f9f9;
            width: 100%;
            height: 120px;
            /deep/.image-slot {
              width: 100%;
              height: 100%;
              line-height: 120px;
              border-radius: 50%;
              background: #f5f7fa;
              color: #c0c4cc;
              text-align: center;
              i {
                font-size: 24px;
              }
            }
          }
        }
      }
    }
    .map-basics {
      margin-top: 20px;
      .map-basics-file {
        margin-bottom: 20px;
      }
      .map-basics-title {
        padding: 10px 10px 0;
        span {
          font-size: 16px;
          padding-left: 12px;
        }
        /deep/.el-divider--horizontal {
          margin: 8px 0;
          .el-divider__text {
            padding: 0 14px;
            font-size: 16px;
          }
        }
      }
      .map-basics-details {
        padding-left: 10px;
        .el-col {
          margin-top: 10px;
        }
        .details-type {
          margin-top: 0px;
        }
        .details-kwork {
          padding: 0px;
          min-height: 40px;
          .message-kwork-box {
            margin-left: 46px;
            padding: 0px;
            .chart-message-kwork {
              @include keyword-base-color();
              padding: 8px;
              margin: 0 15px 10px 0;
              border-radius: 4px;
              display: inline-block;
            }
          }
          .kwork-tlite {
            float: left;
            line-height: 40px;
          }
        }
      }
    }
    .map-attribute {
      margin: 20px 0px;
      .map-attribute-title {
        padding: 10px;
        span {
          font-size: 16px;
          padding-left: 12px;
        }
        /deep/.el-divider--horizontal {
          margin: 8px 0;
          .el-divider__text {
            padding: 0 14px;
            font-size: 16px;
          }
        }
      }
      .map-attribute-details {
        padding-left: 10px;
        .el-col {
          margin-top: 10px;
          .service-epsg {
            background: #f8f8f8;
            border-radius: 10px;
            padding: 10px 20px;
            margin: 10px 0 0;
            line-height: 25px;
          }
        }
      }
    }
  }
}
</style>