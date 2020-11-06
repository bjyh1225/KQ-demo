<template>
  <el-row>
    <el-row class="upload-body">
      <el-col :span="12">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/fileapi/file/uploadFile"
          :on-preview="handlePreview"
          :show-file-list="false"
          :auto-upload="false"
          :on-success="successFun"
          :on-change="selectFile"
          :data="fileData"
          accept="image/gif, image/jpeg, image/jpg, image/png"
        >
          <el-button
            size="small"
            type="primary"
            class="base-btn"
          >{{$t('service.ClickToUploadLocalPictures')}}</el-button>
          <span slot="tip" class="el-upload__tip">{{fileRule}}</span>
        </el-upload>
        <div class="cropper">
          <div class="cropper-content">
            <div class="button-box">
              <div>
                <el-button
                  type="primary"
                  icon="el-icon-portal-nishizhenxuanzhuan-"
                  circle
                  @click="rotateLeft"
                  :disabled="btnDisabled"
                ></el-button>
              </div>
              <div>
                <el-button
                  type="success"
                  icon="el-icon-portal-shunshizhenxuanzhuan-"
                  circle
                  @click="rotateRight"
                  :disabled="btnDisabled"
                ></el-button>
              </div>
              <div>
                <el-button
                  type="danger"
                  icon="el-icon-portal-jia"
                  circle
                  @click="changeScale(1)"
                  :disabled="btnDisabled"
                ></el-button>
              </div>
              <div>
                <el-button
                  type="warning"
                  icon="el-icon-portal-delete"
                  circle
                  @click="changeScale(-1)"
                  :disabled="btnDisabled"
                ></el-button>
              </div>
            </div>
            <div class="cropper" :style="cropperContentStyle">
              <vue-cropper
                ref="cropper"
                :img="option.img"
                :outputSize="option.size"
                :outputType="option.outputType"
                :info="true"
                :full="option.full"
                :canMove="option.canMove"
                :canMoveBox="option.canMoveBox"
                :original="option.original"
                :autoCrop="option.autoCrop"
                :autoCropWidth="autoCropWidth"
                :autoCropHeight="autoCropHeight"
                :fixedBox="option.fixedBox"
                :canScale="option.canScale"
              ></vue-cropper>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <el-row class="recommend-head">{{this.defaultRecommendation}}</el-row>
        <el-row class="recommend-img">
          <swiper :options="swiperOption" ref="mySwiper">
            <swiper-slide class="swiper-item" v-for="item of swiperList" :key="item.id">
              <div class="swiper-img-box">
                <img class="swiper-img" :src="item.imgUrl" alt />
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </el-row>
      </el-col>
    </el-row>
    <el-row class="upload-floot">
      <el-col :span="12">
        <el-button
          type="primary"
          icon="el-icon-arrow-left"
          class="base-btn"
          size="small"
          @click="cancelThumbnails"
        >{{$t('myCenter.cancel')}}</el-button>
      </el-col>
      <el-col :span="12">
        <el-button type="primary" size="small" class="base-btn" @click="saveThumbnails">
          {{$t('myCenter.Sure')}}
          <i class="el-icon-upload el-icon--right"></i>
        </el-button>
      </el-col>
    </el-row>
  </el-row>
</template>
<script>
import { getswiperList } from "portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js";
export default {
  name: "UploadClippingMapNext",
  props: {
    dialogTitleUpload: {
      type: String,
      default: () => {
        return "";
      }
    },
    fileRule: {
      type: String,
      default() {
        return this.$t("service.OnlyJPGPNGFilesUploadedSizeLess1MB") + "1MB";
      }
    },
    cropperContentStyle: {
      type: String,
      default: () => {
        return " width: 400px;height: 260px";
      }
    },
    autoCropWidth: {
      type: Number,
      default: () => {
        return 150;
      }
    },
    autoCropHeight: {
      type: Number,
      default: () => {
        return 150;
      }
    },
    defaultRecommendation: {
      type: String,
      default() {
        return this.$t("service.RecommendThumbnailByDefault");
      }
    },
    recommendShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      saveThumbnailsClick: false, //标记是否点击确定
      btnDisabled: true, //截图框按钮
      fileData: {},
      headImg: "",
      crap: false,
      fileName: "",
      fileType: "",
      option: {
        img: "",
        outputSize: 1,
        full: false,
        outputType: "png", //生成图片格式
        canMove: false,
        original: false,
        canMoveBox: false,
        autoCrop: true,
        fixedBox: true,
        canScale: false
      },
      swiperOption: {
        observerParents: true,
        observer: true,
        freeMode: false,
        direction: "horizontal",
        slidesPerView: 3,
        slidesPerColumn: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true
        // },
        on: {
          click: () => {
            let swiper = this.$refs.mySwiper.swiper;
            if (swiper.clickedIndex != undefined) {
              let i = swiper.clickedIndex;
              let flag = this.swiperList[i];
              this.option.img = flag.imgUrl;
              this.btnDisabled = true;
              this.option.canMoveBox = false;
              this.option.canMove = false;
              this.option.canScale = false;
              this.saveThumbnailsClick = true;
            }
          }
        }
      },
      swiperList: []
    };
  },
  mounted() {
    var urlStr = location.pathname;
    var index = urlStr.lastIndexOf("/");
    urlStr = urlStr.substring(index + 1, urlStr.length);
    this.swiperList = getswiperList(urlStr);
  },
  methods: {
    mySwiper() {
      this.saveThumbnailsClick = false;
      this.swiperOption = {
        observerParents: true,
        observer: true,
        freeMode: false,
        direction: "horizontal",
        slidesPerView: 3,
        slidesPerColumn: 3,
        loop: false,
        loopFillGroupWithBlank: true,
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true,
        //   renderBullet: function (index, className) {
        //                 if(index === 1){
        //                     return '<span class="swiper-pagination-bullet ubolt-black"></span>';
        //                 }else{
        //                     return '<span class="swiper-pagination-bullet ubolt-white"></span>';
        //                 }

        //             }
        //         }
        // },
        on: {
          click: () => {
            let swiper = this.$refs.mySwiper.swiper;
            if (swiper.clickedIndex != undefined) {
              let i = swiper.clickedIndex;
              let flag = this.swiperList[i];
              this.option.img = flag.imgUrl;
              this.btnDisabled = true;
              this.option.canMoveBox = false;
              this.option.canMove = false;
              this.option.canScale = false;
              this.saveThumbnailsClick = true;
            }
          }
        }
      };
    },
    // 确定
    saveThumbnails() {
      if (this.option.img == "null" || this.option.img == "") {
        this.$message({
          message: this.$t("webAppBuilder.UploadThumbnail"),
          type: "warning"
        });
        return false;
      } else {
        this.saveThumbnailsClick = true;
        this.$emit("saveThumbnails");
        // 得到blob  并转化为file
        if (this.option.canMoveBox) {
          this.$refs.cropper.getCropBlob(data => {
            this.fileData.file = new window.File([data], this.fileName, {
              type: this.fileType,
              name: this.fileName
            });
            this.$refs.upload.submit();
          });
        } else {
          // 默认推荐
          this.$emit("UploadBlackFun", {
            recommendation: true,
            uploadrUrl: this.option.img
          });
        }
        this.$refs.mySwiper.swiper.slideTo(0, 3000, true);
        this.option.img = "null";
      }
    },
    // 取消
    cancelThumbnails() {
      if (this.saveThumbnailsClick) {
        this.$confirm(
          this.$t("webAppBuilder.HaveNotConfirmedSelectedThumbnail"),
          this.$t("webAppBuilder.Tip"),
          {
            confirmButtonText: this.$t("myCenter.Sure"),
            cancelButtonText: this.$t("myCenter.cancel"),
            type: "warning"
          }
        )
          .then(() => {
            this.saveThumbnailsClick = false;
            this.$emit("cancelThumbnails");
            this.option.img = "null";
          })
          .catch(() => {});
      } else {
        this.$emit("cancelThumbnails");
        this.saveThumbnailsClick = false;
        this.option.img = "null";
      }
    },
    handleClose() {
      this.$refs.cropper.clearCrop();
    },
    // 弹框显示
    dialogUploadShow() {
      this.option.img = "null";
    },
    // 成功
    successFun(res) {
      this.$emit("UploadBlackFun", { recommendation: false, uploadrUrl: res });
    },
    handlePreview(file) {
      let data = window.URL.createObjectURL(new Blob([file.raw]));
      this.option.img = data;
    },
    // 获取裁剪图片路径
    selectFile(file, fileList) {
      if (this.beforeUpload(file)) {
        if (fileList.length > 1) {
          fileList.splice(0, fileList.length - 1);
        }
        this.btnDisabled = false;
        this.option.canMoveBox = true;
        this.option.canMove = true;
        this.option.canScale = true;
        this.fileType = file.raw.type;
        this.fileName = file.name;
        this.saveThumbnailsClick = true;
      } else {
        fileList = [{ raw: "null" }];
        this.btnDisabled = true;
        this.saveThumbnailsClick = false;
      }
      if (fileList[0].raw == "null") {
        this.option.img = "null";
      } else {
        this.option.img = window.URL.createObjectURL(
          new Blob([fileList[0].raw])
        );
      }
    },
    beforeUpload(file) {
      const isLt5M = file.size / 1024 / 1024 < 1;
      const isJPG = file.raw.type === "image/jpeg";
      const isPNG = file.raw.type === "image/png";
      const isPG = isJPG || isPNG;
      if (!isLt5M) {
        this.$message({
          message: this.$t("service.TheFileSizeCannotExceed1MB") + "!",
          type: "error"
        });
      }
      if (!isPG) {
        this.$message({
          message: this.$t("service.OnlyJPGPNGFilesCanBeUploaded") + "!",
          type: "error"
        });
      }
      return isPG && isLt5M;
    },
    // 置空缩略图
    emptySpaceImg() {
      this.option.img = "null";
      this.btnDisabled = true;
      this.option.canMoveBox = false;
      this.option.canMove = false;
      this.option.canScale = false;
    },
    //放大/缩小
    changeScale(num) {
      num = num || 1;
      this.$refs.cropper.changeScale(num);
    },
    //坐旋转
    rotateLeft() {
      this.$refs.cropper.rotateLeft();
    },
    //右旋转
    rotateRight() {
      this.$refs.cropper.rotateRight();
    }
  }
};
</script>
<style lang='scss' scoped>
.upload-body {
  padding: 20px 0;
  .el-col-12 {
    height: 300px;
    &:last-child {
      padding-left: 30px;
      border-left: 1px solid #ccc;
    }
  }
  .base-btn {
    @include base-btn();
  }
  .recommend-head {
    padding: 10px 0;
    font-size: 12px;
  }
  .recommend-img {
    .swiper-item {
      width: 116px;
      height: 82px;
      position: relative;
      img {
        position: absolute;
        left: 2px;
        top: 2px;
        width: 114px;
        height: 80px;
        &:hover {
          cursor: pointer;
          @include base-active-underline();
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
    }
    .swiper-container {
      height: auto;
      margin-left: auto;
      margin-right: auto;
    }
    /deep/.swiper-wrapper {
      width: 100% !important;
    }
    .swiper-slide {
      height: 90px;
    }
    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: -3px;
      /deep/.swiper-pagination-bullet-active {
        @include base-bg-color();
      }
    }
  }
}
.upload-floot {
  margin: 14px 0;
  height: 60px;
  .el-col.el-col-12:first-child {
    .el-button {
      position: absolute;
      right: 50%;
      border-radius: 3px 0 0 3px;
    }
  }
  .el-col.el-col-12:last-child {
    .el-button {
      position: absolute;
      right: 42%;
      border-radius: 0 3px 3px 0;
    }
  }
}
.upload-demo {
  margin-bottom: 10px;
  .el-button {
    margin-right: 10px;
  }
}
.button-box {
  margin-right: 10px;
  div {
    margin-top: 20px;
  }
}
.cropper-content {
  display: flex;
  .cropper-modal {
    border-radius: 4px;
  }
}
</style>