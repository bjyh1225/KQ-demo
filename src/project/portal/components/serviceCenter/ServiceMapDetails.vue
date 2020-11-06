<template>
  <div id="map-details">
    <div class="details-title">
      <span class="details-title-left">{{isDetails.C_NAME}}</span>
      <span class="details-title-right" @click="returnMapShow">
        <i class="el-icon-back"></i>
        {{$t('service.back')}}
      </span>
    </div>
    <div class="details-background">
      <div class="map-details-box">
        <el-row :gutter="34" class="details-show-left">
          <el-col :span="11">
            <div class="details-img">
              <el-image
                v-if="!isDetails.C_IMG"
                :src="isDetails.defaultSrc?isDetails.defaultSrc:defaultSrc"
                :fit="'cover'"
              >
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
              <el-image v-if="isDetails.C_IMG" :src="isDetails.C_IMG" :fit="'cover'">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline"></i>
                </div>
              </el-image>
            </div>
          </el-col>
          <el-col :span="13">
            <div class="details-describe">
              <el-row class="describe-row">
                <el-col :span="8" class="details-describe-left">
                  <div class="describe-author">
                    <div class="describe-Ch">{{$t('service.author')}}</div>
                    <div class="describe-En">{{isDetails.USERNAME}}</div>
                  </div>
                  <div class="describe-time">
                    <div class="describe-time-Ch">{{$t('service.time')}}</div>
                    <div class="describe-time-En">{{isDetails.C_CREATE_TIME}}</div>
                  </div>
                </el-col>
                <el-col :span="16" class="details-describe-right">
                  <div class="describe-writing">{{$t('service.description')}}</div>
                  <div class="describe-det">
                    <span class="describe-null"></span>
                    {{isDetails.C_COMMENTS}}
                  </div>
                </el-col>
              </el-row>
              <el-row class="count-row">
                <el-col :span="8">
                  <div class="count-click">{{$t('service.hits')}}</div>
                  <div class="count-degree">{{isDetails.c_hits}}{{$t('service.times')}}</div>
                </el-col>
                <el-col :span="8">
                  <div class="count-click">{{$t('service.sharingExtent')}}</div>
                  <div
                    v-if="isDetails.C_SCOPE=='Public'"
                    class="count-degree"
                  >{{$t('service.public')}}</div>
                  <div
                    v-if="isDetails.C_SCOPE=='Private'"
                    class="count-degree"
                  >{{$t('service.private')}}</div>
                  <div
                    v-if="isDetails.C_SCOPE=='Partial'"
                    class="count-degree"
                  >{{$t('service.Partialauthorization')}}</div>
                </el-col>
                <el-col :span="8" class="count-collection">
                  <div class="count-click">{{$t('service.collect')}}</div>
                  <div
                    class="count-degree"
                  >{{isDetails.COLLECTION_TIME==null?$t('service.uncollected'):$t('service.collected')}}</div>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>

        <div class="confine-box">
          <div class="details-confine">
            <span class="confine-stand"></span>
            <div class="confine">{{$t('service.accessAndUseRestrictions')}}</div>
          </div>
          <div
            class="confine-message"
          >{{$t('service.anyRestrictionsDeclarationsTermsAndConditionsRegardingTheUseOfTheProject')}}</div>
        </div>

        <div class="chart-box">
          <div class="details-chart">
            <span class="chart-stand"></span>
            <span
              class="chart"
            >{{isDetails.C_RESOURCE_TYPE!='fileService'&&isDetails.C_RESOURCE_TYPE!='data'?$t('service.basemap'):$t('service.basicAttribute')}}</span>
          </div>
          <div class="chart-message">
            <div class="details-right-content-kwork">
              <span class="kwork-tlite">{{$t('service.label')+'：'}}</span>
              <div class="message-kwork-box">
                <span
                  v-for="(kwork,i) in keyWorkArray"
                  class="chart-message-kwork"
                  :key="i"
                >{{kwork}}</span>
              </div>
            </div>
            <div
              v-if="isDetails.C_RESOURCE_TYPE=='sceneService'"
            >{{$t('service.type')}}{{pseudoType}}</div>
            <div
              v-else
              v-show="isDetails.C_RESOURCE_TYPE!='appbuilder'"
            >{{$t('service.type')}}{{isDetails.C_SERVICE_TYPE||isDetails.C_APP_TYPE||(isDetails.C_FOLDER==1?'文件夹':isDetails.SUFFIX)}}</div>
            <div>{{$t('service.visibility')}}{{isDetails.YWBROWSE!='0'?$t('service.visible'):$t('service.Invisible')}}</div>
            <div
              v-if="!(isDetails.C_RESOURCE_TYPE=='fileService'&&isDetails.C_FOLDER==1&&isDetails.YWBROWSE!='0')"
            >
              {{isDetails.C_RESOURCE_TYPE=='fileService'||isDetails.C_RESOURCE_TYPE=='data'?$t('service.DownloadUrl')+':':$t('service.url')}}
              <span
                class="pseudo-jump"
                target="_blank"
                v-if="$store.getters.isLogin&&isDetails.YWBROWSE!='0'"
                @click="urlReplace(isDetails)"
              >
                <i
                  v-if="isDetails.C_RESOURCE_TYPE=='fileService'||isDetails.C_RESOURCE_TYPE=='data'"
                >
                  <el-button
                    type="primary"
                    class="base-btn"
                    @click="preview"
                    v-if="isDetails.SUFFIX=='jpg'||isDetails.SUFFIX=='png'||isDetails.SUFFIX=='gif'||isDetails.SUFFIX=='svg'||  isDetails.SUFFIX=='mp4'||isDetails.SUFFIX=='avi'||isDetails.SUFFIX=='mov'||isDetails.SUFFIX=='mkv'||  isDetails.SUFFIX=='flv'||isDetails.SUFFIX=='vmvb'||isDetails.SUFFIX=='scs'"
                  >{{$t('visualization.Preview')}}</el-button>
                  <el-button
                    type="primary"
                    class="base-btn"
                    @click="download"
                  >{{$t('webAppBuilder.Download')}}</el-button>
                </i>
                <i v-else>{{isDetails.C_SERVICE_URL||resUrl}}</i>
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
                    :disabled="isDetails.AUDITSCOPE==0?true:false"
                    :class="isDetails.AUDITSCOPE==0?'in-audit':'base-btn'"
                  >{{isDetails.AUDITSCOPE==0?$t('management.InReview'):$t('service.ApplyPermission')}}</el-button>
                </el-popover>
              </span>
            </div>
          </div>
        </div>
        <div
          class="prop-box"
          v-if="isDetails.C_RESOURCE_TYPE!='appbuilder'&&isDetails.C_RESOURCE_TYPE!='functionService'&&isDetails.C_RESOURCE_TYPE!='fileService'&&isDetails.C_RESOURCE_TYPE!='data'"
        >
          <div class="details-prop">
            <span class="prop-stand"></span>
            <span class="prop">{{$t('service.properties')}}</span>
          </div>
          <div class="prop-message">
            <!-- <div>{{$t('service.label')}}{{isDetails.C_KEYWORD}}</div> -->
            <div>{{$t('service.producer')}}</div>
            <div v-if="isDetails.C_RESOURCE_TYPE!='fileService'&&isDetails.C_RESOURCE_TYPE!='data'">
              {{$t('service.spatialRange')}}
              <span>{{isDetails.C_SERVICE_PRJRECT}}</span>
            </div>
            <div
              v-if="isDetails.C_RESOURCE_TYPE!='fileService'&&isDetails.C_RESOURCE_TYPE!='data'"
            >{{$t('service.spatialReference')}}{{isDetails.C_SERVICE_EPSG}}</div>
          </div>
        </div>
        <div
          class="confine-box"
          v-if="isDetails.C_RESOURCE_TYPE=='fileService'&&isDetails.C_FOLDER==1&&isDetails.YWBROWSE!='0'"
        >
          <div class="details-confine">
            <span class="confine-stand"></span>
            <div class="confine">{{$t('myCenter.FolderDetails')}}</div>
          </div>
          <div class="confine-message">
            <el-button
              type="primary base-btn"
              icon="el-icon-download"
              @click="bulkDownload()"
            >{{$t('myCenter.BatchDownload')}}</el-button>
            <el-table
              ref="multipleTable"
              :data="isDetailsFilelist"
              tooltip-effect="dark"
              style="width: 90%"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" min-width="8%"></el-table-column>
              <el-table-column prop="C_NAME" :label="$t('myCenter.File')" min-width="32%"></el-table-column>
              <el-table-column :label="$t('myCenter.Size')+'（bytes）'" prop="C_SIZE" min-width="15%"></el-table-column>
              <el-table-column :label="$t('myCenter.Format')" min-width="15%" prop="SUFFIX"></el-table-column>
              <el-table-column prop="cz" :label="$t('management.operate')" min-width="30%">
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
          </div>
        </div>
      </div>
    </div>
    <service-file-preview-dialog
      :fileServiceDialogVisible="fileServiceDialogVisible"
      @handleClose="handleClose"
      :fileServiceDetails="fileServiceDetails"
    ></service-file-preview-dialog>
  </div>
</template>
<script>
import { urlReplace } from "@/utils/urlReplace.js";
import ServiceFilePreviewDialog from "components/serviceFile/ServiceFilePreviewDialog";
export default {
  components: {
    ServiceFilePreviewDialog,
  },
  props: {
    isDetails: {
      type: Object,
      default() {
        return {};
      },
    },
    isDetailsFilelist: {
      type: Array,
      default() {
        return [];
      },
    },
    serviceNameData: {
      type: String,
      default() {
        return this.$t("service.mapServices");
      },
    },
    defaultSrc: {
      type: String,
      default() {
        return "/config/imageConfig/function/mapService/mapService1.png";
      },
    },
  },
  data() {
    return {
      pseudoType: "",
      resUrl: "",
      applicationAuthorizationReason: "",
      visible: false,
      selectedData: [], //复选框选中值
      fileServiceDialogVisible: false, //文件预览
      fileServiceDetails: {}, //文件详情
    };
  },
  name: "ServiceMapDetails",
  watch: {
    isDetails() {
      this.$nextTick(() => {
        this.typeHandle();
      });
    },
    visible() {
      if (!this.visible) {
        setTimeout(() => {
          this.applicationAuthorizationReason = "";
        }, 1000);
      }
    },
  },
  computed: {
    keyWorkArray() {
      if (this.isDetails.C_KEYWORD) {
        return this.isDetails.C_KEYWORD.split(",");
      } else {
        return [];
      }
    },
  },
  methods: {
    // 关闭文件预览
    handleClose() {
      this.fileServiceDialogVisible = false;
    },
    // 文件夹批量下载
    bulkDownload() {
      if (this.selectedData.length == 0) {
        this.$message({
          message: this.$t("myCenter.PleaseTickItems"),
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
        this.isDetails.C_ID
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
          folderId: this.isDetails.C_ID,
        })
        .then((res) => {
          if (res.data.data[0].folderlist[0].YWBROWSE > 0) {
            this.fileServiceDetails = val; //图片视频文件预览
            this.fileServiceDialogVisible = true;
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
          folderId: this.isDetails.C_ID,
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
      if (this.isDetails.C_RESOURCE_TYPE == "fileService") {
        this.$api.serviceFileCenApi
          .getFileDetails({
            fileId: this.isDetails.C_ID,
          })
          .then((res) => {
            if (res.data.data[0].YWBROWSE > 0) {
              // window.open(
              //   `/fileapi/file/download/${this.isDetails.C_FILE_REFERENCEID}/true`
              // );
              this.fileServiceDetails = this.isDetails; //图片视频文件预览
              this.fileServiceDialogVisible = true;
            } else if (res.data.data[0].YWBROWSE <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucantpreviewit"
                ),
                type: "warning",
              });
            } else if (res.data.data[0].YWSEARCH == null) {
              this.$emit("againListService");
            }
          })
          .catch((error) => {
            if (error.data.status === 391) {
              this.$emit("againListService");
            }
          });
      } else if (this.isDetails.C_RESOURCE_TYPE == "data") {
        this.$api.serviceDatacenterApi
          .getDataDetails({
            dataId: this.isDetails.C_ID,
          })
          .then((res) => {
            if (res.data.data[0].YWBROWSE > 0) {
              window.open(
                `/fileapi/file/download/${this.isDetails.C_FILE_REFERENCEID}/true`
              );
            } else if (res.data.data[0].YWBROWSE <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucantpreviewit"
                ),
                type: "warning",
              });
            } else if (res.data.data[0].YWSEARCH == null) {
              this.$emit("againListService");
            }
          })
          .catch((error) => {
            if (error.data.status === 391) {
              this.$emit("againListService");
            }
          });
      }
    },
    // 下载
    download() {
      if (this.isDetails.C_RESOURCE_TYPE == "fileService") {
        this.$api.serviceFileCenApi
          .getFileDetails({
            fileId: this.isDetails.C_ID,
          })
          .then((res) => {
            if (res.data.status == 200) {
              if (res.data.data[0].YWBROWSE > 0) {
                if (this.isDetails.SIZE / 1024 / 1024 > 10) {
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
                      elemIF.href = `/fileapi/file/download/${this.isDetails.C_FILE_REFERENCEID}/false/${this.$store.getters.userInfo.id}`;
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
                  elemIF.href = `/fileapi/file/download/${this.isDetails.C_FILE_REFERENCEID}/false/${this.$store.getters.userInfo.id}`;
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
              } else if (res.data.data[0].YWSEARCH == null) {
                this.$emit("againListService");
              }
            }
          })
          .catch((error) => {
            if (error.data.status === 391) {
              this.$emit("againListService");
            }
          });
      } else if (this.isDetails.C_RESOURCE_TYPE == "data") {
        this.$api.serviceDatacenterApi
          .getDataDetails({
            dataId: this.isDetails.C_ID,
          })
          .then((res) => {
            if (res.data.status == 200) {
              if (res.data.data[0].YWBROWSE > 0) {
                if (this.isDetails.SIZE / 1024 / 1024 > 10) {
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
                      elemIF.href = `/fileapi/file/download/${this.isDetails.C_DATA_REFERENCEID}/false/${this.$store.getters.userInfo.id}`;
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
                  elemIF.href = `/fileapi/file/download/${this.isDetails.C_DATA_REFERENCEID}/false/${this.$store.getters.userInfo.id}`;
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
              } else if (res.data.data[0].YWSEARCH == null) {
                this.$emit("againListService");
              }
            }
          })
          .catch((error) => {
            if (error.data.status === 391) {
              this.$emit("againListService");
            }
          });
      }
    },
    // 三维类型处理
    typeHandle() {
      if (this.isDetails.C_RESOURCE_TYPE == "sceneService") {
        this.resUrl =
          window.location.href.replace(this.$route.path, "/sceneService") +
          "?id=" +
          this.isDetails.C_ID;
      }
      if (this.isDetails.C_RESOURCE_TYPE == "sceneService") {
        if (this.isDetails.C_SERVICE_TYPE == "1") {
          this.pseudoType = "影像三维服务(Imagery3DServer)";
        } else if (this.isDetails.C_SERVICE_TYPE == "2") {
          this.pseudoType = "影像三维瓦片文件(ImageryTileFile)";
        } else if (this.isDetails.C_SERVICE_TYPE == "3") {
          this.pseudoType = "地形三维服务(Terrain3DServer)";
        } else if (this.isDetails.C_SERVICE_TYPE == "4") {
          this.pseudoType = "地形三维瓦片文件(TerrainTileFile)";
        } else if (this.isDetails.C_SERVICE_TYPE == "5") {
          this.pseudoType = "模型瓦片服务(3dtiles)";
        } else if (this.isDetails.C_SERVICE_TYPE == "6") {
          this.pseudoType = "动态模型瓦片服务(3dtiles)";
        } else if (this.isDetails.C_SERVICE_TYPE == "7") {
          this.pseudoType = "STK地形";
        } else if (this.isDetails.C_SERVICE_TYPE == "8") {
          this.pseudoType = "矢量服务(GeoJson)";
        } else if (this.isDetails.C_SERVICE_TYPE == "9") {
          this.pseudoType = "谷歌 KML/KMZ";
        } else if (this.isDetails.C_SERVICE_TYPE == "10") {
          this.pseudoType = "CZML(Cesium)";
        } else if (this.isDetails.C_SERVICE_TYPE == "11") {
          this.pseudoType = "K3d服务(Cesium)";
        }
      }
    },
    returnMapShow() {
      this.$emit("getreturnMapShow", false);
      this.$emit("againListService");
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
            auditBy: this.isDetails.C_CREATE_BY,
            resourceId: this.isDetails.C_ID,
            resourceName: this.isDetails.C_NAME,
            resourceType: this.isDetails.C_RESOURCE_TYPE,
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
          type: "warning",
        });
      } else {
        if (this.isDetails.C_RESOURCE_TYPE == "mapService") {
          this.$api.serviceMapApi
            .getServicePermissions({
              id: this.isDetails.C_ID,
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
                this.returnMapShow();
                this.visible = false;
              }
            });
        } else if (this.isDetails.C_RESOURCE_TYPE == "data") {
          this.$api.serviceDatacenterApi
            .getDataServicePermissions({
              id: this.isDetails.C_ID,
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
                this.returnMapShow();
                this.visible = false;
              }
            });
        } else if (this.isDetails.C_RESOURCE_TYPE == "sceneService") {
          this.$api.serviceSceneApi
            .getSceneServicePermissions({
              id: this.isDetails.C_ID,
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
                this.returnMapShow();
                this.visible = false;
              }
            });
        } else if (this.isDetails.C_RESOURCE_TYPE == "dataService") {
          this.$api.serviceDataApi
            .getDataServicePermissions({
              id: this.isDetails.C_ID,
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
                this.returnMapShow();
                this.visible = false;
              }
            });
        } else if (this.isDetails.C_RESOURCE_TYPE == "functionService") {
          this.$api.serviceFunctionApi
            .getFunctionServicePermissions({
              id: this.isDetails.C_ID,
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
                this.returnMapShow();
                this.visible = false;
              }
            });
        } else if (this.isDetails.C_RESOURCE_TYPE == "fileService") {
          this.$api.serviceFileCenApi
            .getFileServicePermissions({
              id: this.isDetails.C_ID,
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
            query: { id: val.C_ID },
          });
        } else if (
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
              serviceUrl: this.isDetails.C_SERVICE_URL,
              serviceType: this.isDetails.C_SERVICE_TYPE,
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
                this.$message({
                  message: res.data.data.serviceState,
                  type: "warning",
                });
              } else {
                // window.open(urlReplace(val));
                window.open(val.C_SERVICE_VIEWURL);
              }
            })
            .catch(() => {});
        } else if (val.C_RESOURCE_TYPE == "data") {
          // window.open(val.C_SERVICE_URL);
        } else if (val.C_RESOURCE_TYPE == "functionService") {
          window.open(val.C_SERVICE_URL);
        } else if (val.C_RESOURCE_TYPE == "dataService") {
          window.open(val.C_SERVICE_URL);
        } else if (val.C_RESOURCE_TYPE == "fileService") {
          // window.open(
          //   `/fileapi/file/download/${this.isDetails.C_FILE_REFERENCEID}/true`
          // );
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
    },
  },
};
</script>
<style lang="scss">
.el-popover.login-popper {
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.3);
}
</style>
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
  .details-title {
    padding: 0 2%;
    height: 46px;
    border-bottom: 1px solid #dfdfdf;
    line-height: 42px;
    .details-title-left {
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
    padding: 15px 2%;
    .map-details-box {
      background: #fff;
      padding: 10px 20px;
      .details-show-left {
        margin-bottom: 24px;
        .details-img {
          border: 1px solid #dfdfdf;
          height: 372px;
          padding: 8px;
          box-sizing: border-box;
          .el-image {
            display: flex;
            justify-content: center;
            align-items: center;
            background: #f5f5f5;
            width: 100%;
            height: 356px;
            .el-icon-picture-outline {
              font-size: 70px;
              color: #cfd1d4;
            }
          }
        }
        .details-describe {
          border: 1px solid #dfdfdf;
          height: 372px;
          .describe-row {
            font-size: 14px;
            .details-describe-left {
              height: 212px;
              border-bottom: 1px solid #dfdfdf;
              border-right: 1px solid #dadfdf;
              .describe-author {
                padding: 32px 32px 28px;
                border-bottom: 1px solid #dfdfdf;
                .describe-Ch {
                  padding-bottom: 14px;
                  color: #242424;
                }
                .describe-En {
                  @include service-base-color();
                }
              }
              .describe-time {
                padding: 28px 32px 32px;
                .describe-time-Ch {
                  padding-bottom: 14px;
                  color: #242424;
                }
                .describe-time-En {
                  @include service-base-color();
                }
              }
            }
            .details-describe-right {
              height: 212px;
              padding: 32px 40px;
              border-bottom: 1px solid #dfdfdf;
              .describe-writing {
                padding-bottom: 34px;
                color: #242424;
              }
              .describe-det {
                color: #4c4c4c;
                height: 86px;
                line-height: 22px;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 4;
                overflow: hidden;
              }

              .describe-null {
                padding-left: 32px;
              }
            }
          }
          .count-row {
            .el-col {
              height: 160px;
              padding: 50px 32px;
              border-right: 1px solid #dfdfdf;
              .count-click {
                font-size: 14px;
                color: #242424;
              }
              .count-degree {
                font-size: 16px;
                padding-top: 28px;
                @include service-base-color();
              }
            }
            .count-collection {
              border-right: none;
            }
          }
        }
      }
      .confine-box {
        .details-confine {
          border-bottom: 1px solid #dfdfdf;
          height: 36px;
          display: flex;
          align-items: center;
          .confine-stand {
            margin: 0 12px 0 9px;
            width: 7px;
            height: 26px;
            display: inline-block;
            @include base-bg-color();
          }
          .confine {
            color: #242424;
            font-size: 16px;
          }
        }
        .confine-message {
          font-size: 14px;
          color: #4c4c4c;
          padding: 18px 0 36px 46px;
        }
      }
      .chart-box {
        .details-chart {
          border-bottom: 1px solid #dfdfdf;
          height: 36px;
          display: flex;
          align-items: center;
          .chart-stand {
            margin: 0 12px 0 9px;
            width: 7px;
            height: 25px;
            display: inline-block;
            @include base-bg-color();
          }
          .chart {
            color: #242424;
            font-size: 16px;
          }
        }
        .chart-message {
          font-size: 14px;
          color: #4c4c4c;
          padding: 18px 0 26px 46px;
          div {
            padding-bottom: 10px;
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
          .details-right-content-kwork {
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
      .prop-box {
        .details-prop {
          border-bottom: 1px solid #dfdfdf;
          height: 36px;
          display: flex;
          align-items: center;
          .prop-stand {
            margin: 0 12px 0 9px;
            width: 7px;
            height: 25px;
            display: inline-block;
            @include base-bg-color();
          }
          .prop {
            color: #242424;
            font-size: 16px;
          }
        }
        .prop-message {
          font-size: 14px;
          color: #4c4c4c;
          padding: 18px 0 50px 46px;
          div {
            padding-bottom: 10px;
          }
        }
      }
    }
  }
}
</style>
