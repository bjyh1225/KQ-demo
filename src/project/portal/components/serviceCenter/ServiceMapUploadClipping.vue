<template>
  <div class="map-edit-dialog">
    <el-dialog
      :visible.sync="mapEditDialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      custom-class="dialog-custom-class"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{dialogTitleUpload}}</span>
        </div>
      </template>
      <!--地图编辑-->
      <el-row class="dialog-body-secondary">
        <!-- 重新获取 -->
        <transition
          enter-active-class="animated slideInLeft"
          leave-active-class="animated slideOutLeft"
        >
          <el-row class="img-box" v-show="modifyingNo">
            <el-image :src="headImg"></el-image>
            <el-button
              type="primary"
              class="base-btn"
              @click="getServiceImg"
              v-if="changerShow"
              size="small"
            >{{$t('management.Regain')}}</el-button>
            <el-button
              type="primary"
              :class="changerShow?'base-btn':'base-btn left-btn'"
              @click="modifyingThumbnails"
              size="small"
            >{{$t('management.ModifyThumbnail')}}</el-button>
          </el-row>
        </transition>
        <!-- 缩略图 -->
        <transition
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
        >
          <el-row class="img-operation" v-show="!modifyingNo">
            <upload-clipping-map-next
              ref="dialogUpload"
              @UploadBlackFun="UploadBlackFun"
              :dialogTitleUpload="dialogTitleUpload"
              :autoCropWidth="autoCropWidth"
              :autoCropHeight="autoCropHeight"
              :fileRule="fileRule"
              :recommendShow="true"
              @cancelThumbnails="cancelThumbnails"
              @saveThumbnails="saveThumbnails"
            ></upload-clipping-map-next>
          </el-row>
        </transition>
      </el-row>
      <!-- <span slot="footer" class="dialog-footer">
      <el-button class="base-white-btn" @click="handleClose" :disabled="!modifyingNo">{{$t('management.cancel')}}</el-button>
      <el-button type="primary" class="base-btn" @click="saveEdit" :disabled="!modifyingNo">{{$t('management.ok')}}</el-button>
      </span>-->
    </el-dialog>
  </div>
</template>
<script>
import UploadClippingMapNext from "components/common/uploadClipping/UploadClippingMapNext";
import {getDefaultImg,getFileDefaultImg} from 'portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js'
export default {
  name: "ServiceMapUploadClipping",
  components: {
    UploadClippingMapNext
  },
  props: {
    resourceData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      fileRule: this.$t("service.OnlyJPGPNGFilesUploadedSizeLess1MB") + "1MB",
      autoCropWidth: 236,
      autoCropHeight: 165,
      dialogTitleUpload: this.$t("management.ModifyThumbnail"),
      modifyingNo: true, //默认不修改缩略图
      mapEditDialogVisible: false, //弹框默认关闭
      headImg: "", //上传缩略图
      changerShow: true //WMS WMTS类型不显示详情
    };
  },
  watch: {
    //监听路由变化
    resourceData() {
      if (this.resourceData.C_IMG) {
        this.headImg = this.resourceData.C_IMG;
      } else {
        if(this.resourceData.C_RESOURCE_TYPE=='fileService'){
         this.headImg =this.resourceData.C_FOLDER==1?getFileDefaultImg('folder'):getFileDefaultImg(this.resourceData.SUFFIX);
        }else{
          this.headImg =getDefaultImg(this.resourceData.C_RESOURCE_TYPE);
        }
        
      }
    }
  },
  methods: {
    // 修改缩略图
    modifyingThumbnails() {
      this.modifyingNo = false;
      this.$forceUpdate();
      this.$refs.dialogUpload.mySwiper();
      // this.$api.serviceMapApi
      //   .getServiceDetails(
      //     {
      //       serviceId: this.resourceData.C_ID
      //     },
      //     {
      //       loadingText: this.$t("service.searching"),
      //       coverStatusCode: {
      //         391: {
      //           tips: this.$t(
      //             "management.Youhavenopermissiontomodifytheresource"
      //           )
      //         }
      //       }
      //     }
      //   )
      //   .then(res => {
      //     if (res.data.status == 200) {
      //       if (res.data.data[0].YWEDIT > 0) {
      //         this.modifyingNo = false;
      //         this.$forceUpdate();
      //         this.$refs.dialogUpload.mySwiper();
      //       } else if (res.data.data[0].YWEDIT <= 0) {
      //         this.$message({
      //           message: this.$t(
      //             "myCenter.Asyouhavenopermissionsyoucannoteditthethumbnail"
      //           ),
      //           type: "warning"
      //         });
      //       }
      //     }
      //   })
      //   .catch(error => {
      //     if (error.data.status === 391) {
      //       this.againListService();
      //     }
      //   });
    },
    // 确定 取消
    cancelThumbnails() {
      this.modifyingNo = true;
    },
    saveThumbnails() {
      this.modifyingNo = true;
    },
    // 缩略图重新获取
    getServiceImg() {
      var htmlHref = this.resourceData.C_SERVICE_URL;
      var addr = htmlHref.substr(
        htmlHref.lastIndexOf("/", htmlHref.lastIndexOf("/") - 1) + 1
      );
      var index = addr.lastIndexOf("/");
      var serviceUrlName = decodeURI(addr.substring(0, index));
      var indexIp = htmlHref.split("/");
      // var serviceUrlIpData = `${indexIp[0]}//${indexIp[2]}`;
      this.$api.serviceMapApi
        .getServiceDetails(
          {
            serviceId: this.resourceData.C_ID
          },
          {
            loadingText: this.$t("service.searching"),
            coverStatusCode: {
              391: {
                tips: this.$t(
                  "management.Youhavenopermissiontoobtaintheresourceagain"
                )
              }
            }
          }
        )
        .then(res => {
          if (res.data.status == 200) {
            if (res.data.data[0].YWEDIT > 0) {
              this.$api.personalCenterServiceApi
                .getServiceImg({
                  serviceType: this.resourceData.C_SERVICE_TYPE,
                  serviceUrlIp: this.resourceData.C_SERVICE_URL,
                  serviceUrlName: serviceUrlName
                })
                .then(res => {
                  if (res.data.status == 200) {
                    if (res.data.data) {
                      this.headImg = res.data.data;
                      this.$emit("mapUploadSaveEdit", {
                        mapHeadImg: this.headImg,
                        flag: false
                      });
                      this.$forceUpdate();
                      this.$message({
                        message: this.$t("myCenter.Reacquired"),
                        type: "success"
                      });
                    } else {
                      this.$message({
                        message:this.$t('myCenter.TheThumbnailGetsEmpty'),
                        type: "warning"
                      });
                    }
                  }
                });
              // 将修改缩略图置空
              this.$refs.dialogUpload.emptySpaceImg();
            } else if (res.data.data[0].YWEDIT <= 0) {
              this.$message({
                message: this.$t(
                  "myCenter.Asyouhavenopermissionsyoucannotreacquireit"
                ),
                type: "warning"
              });
            }
          }
        })
        .catch(error => {
          if (error.data.status === 391) {
            this.againListService();
          }
        });
    },
    //上传返回值
    UploadBlackFun(val) {
      if (val.recommendation) {
        this.headImg = val.uploadrUrl;
      } else {
        this.headImg = `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
      }
      this.$emit("mapUploadSaveEdit", { mapHeadImg: this.headImg, flag: true });
    },
    // 关闭
    handleClose() {
      this.mapEditDialogVisible = false;
      this.changerShow = true;
      this.modifyingNo = true;
      this.$refs.dialogUpload.emptySpaceImg();
      this.$emit("getListServiceClose");
    },
    // 弹框显示
    dialogUploadShow() {
      if (
        this.resourceData.C_SERVICE_TYPE != "kqmapping"
      ) {
        this.changerShow = false;
      }
      this.mapEditDialogVisible = true;
    }
  }
};
</script>
<style lang='scss' scoped>

.map-edit-dialog {
  /deep/.el-dialog.dialog-custom-class {
    height: 500px;
  }
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-body-secondary {
    border-bottom: none;
    height: 412px;
    overflow: hidden;
    .img-box {
      margin-bottom: 10px;
      font-size: 12px;
      position: relative;
      height: 350px;
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/ .el-collapse-item__header:first-child {
        border-bottom: none;
      }
      .el-button {
        position: absolute;
        bottom: 20px;
        left: 361px;
        margin-right: 100px;
        &:last-child {
          left: 500px;
        }
        &.left-btn {
          left: 361px;
        }
      }
      .el-image {
        text-align: center;
        width: 238px;
        height: 167px;
        /deep/.el-image__inner {
          width: 236px;
          height: 165px;
          @include base-active-underline();
        }
      }
    }
    .img-operation {
      position: absolute;
      top: 0px;
    }
  }
  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom"
      )
    );
    span {
      @include dialog-title($width: 2px);
      padding-bottom: 18px;
    }
  }
}
</style>
