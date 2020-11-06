<template>
  <el-row class="upload-body">
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
            :enlarge="enlarge"
            :canScale="option.canScale"
          ></vue-cropper>
        </div>
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
      </div>
    </div>
    <div class="recommend" v-if="recommendShow">
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
        <div class="el-icon-arrow-left swiper_btn"></div>
        <div class="el-icon-arrow-right swiper_btn"></div>
      </el-row>
    </div>
  </el-row>
</template>
<script>
import { getswiperList } from "portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js";
export default {
  name: "UploadClippingNext",
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
        return this.$t("service.OnlyJPGPNGFilesUploadedSizeLess1MB");
      }
    },
    cropperContentStyle: {
      type: String,
      default: () => {
        return " width: 500px;height: 260px";
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
    enlarge: {
      type: Number,
      default: () => {
        return 1;
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
    },
    unifiedMark: {
      type: String,
      default: () => {
        return "map";
      }
    }
  },
  data() {
    return {
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
        freeMode: false,
        direction: "horizontal",
        slidesPerView: 5,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        },
        navigation: {
          nextEl: ".el-icon-arrow-right",
          prevEl: ".el-icon-arrow-left",
          disabledClass: "my-button-disabled"
        },
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
            }
          }
        }
      },
      swiperList: []
    };
  },
  mounted() {
    this.swiperList = getswiperList(this.unifiedMark);
  },
  methods: {
    handleClose() {
      this.$refs.cropper.clearCrop();
    },
    getImgUrl() {
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
      } else {
        fileList = [{ raw: "null" }];
        this.btnDisabled = true;
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
          message: this.$t("service.TheFileSizeCannotExceed1MB"),
          type: "error"
        });
      }
      if (!isPG) {
        this.$message({
          message: this.$t("service.OnlyJPGPNGFilesCanBeUploaded"),
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
  padding-bottom: 10px;
  @include manage-border(
    $types: (
      "bottom"
    )
  );
  .base-btn {
    @include base-btn();
  }
  .recommend {
    margin-top: 10px;
    border-top: 1px solid #ebeef5;
    .recommend-head {
      padding: 10px 0;
      font-size: 12px;
    }
    .recommend-img {
      .my-button-disabled {
        opacity: 0;
      }
      .swiper_btn {
        width: 20px;
        height: 80px;
        line-height: 80px;
        top: 2px;
        background-size: auto;
        position: absolute;
        background-color: #ccc;

        &:hover {
          @include base-bg-color();
        }
      }
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
        width: 600px;
        height: 100px;
      }
      .el-icon-arrow-left.swiper_btn {
        left: 0px;
        @include base-active-color();
        border-radius: 4px 0 0 4px;
        font-size: 20px;
        font-weight: 900;
        &:hover {
          color: #fff;
        }
      }
      .el-icon-arrow-right.swiper_btn {
        right: 0px;
        @include base-active-color();
        border-radius: 0 4px 4px 0;
        font-size: 20px;
        font-weight: 900;
        &:hover {
          color: #fff;
        }
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
}
.upload-demo {
  margin-bottom: 10px;
  .el-button {
    margin-right: 10px;
  }
}
.button-box {
  margin: 0px 30px 0px 60px;
  div {
    margin-top: 20px;
  }
}
.cropper-content {
  min-width: 540px;
  display: flex;
  border-radius: 4px;
}
</style>