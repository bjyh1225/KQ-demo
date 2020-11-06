<template>
  <div class="header-set">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="logoUpload">
        <template slot="title">
          <i class="el-icon-caret-right pannel-arrow"></i>&nbsp;
          <span>{{$t('visualization.UploadLogoPicture')}}</span>
        </template>
        <el-upload
          class="upload-demo"
          ref="upload"
          action="/fileapi/file/uploadFile"
          :on-success="successFun"
          :before-upload="beforeUpload"
          multiple
          :limit="1"
          :show-file-list="false"
          accept="image/gif, image/jpeg, image/jpg, image/png"
        >
          <el-button size="small" type="primary" class="base-btn">{{$t('management.ClickToUpload')}}</el-button>
          <div
            slot="tip"
            class="el-upload__tip"
          >{{$t('visualization.OnlyFilesCanBeUploadedNoMoreSizeNoMoreWH')}}</div>
        </el-upload>
        <!-- 上传列表-->
        <ul class="el-upload-list el-upload-list--picture">
          <li
            tabindex="0"
            class="el-upload-list__item is-ready"
            v-for="(item,ix) in currentPropertySetInfo.imgList"
            :key="ix"
          >
            <img :src="item.url" alt class="el-upload-list__item-thumbnail" />
            <a class="el-upload-list__item-name">
              <i class="el-icon-document"></i>
              {{item.name}}
            </a>
            <label class="el-upload-list__item-status-label">
              <i class="el-icon-upload-success el-icon-check"></i>
            </label>
            <i class="el-icon-close" @click="delImg(item)"></i>
          </li>
        </ul>
      </el-collapse-item>
      <el-collapse-item name="bannerUpload">
        <template slot="title">
          <i class="el-icon-caret-right pannel-arrow"></i>&nbsp;
          <span>{{$t('visualization.UploadCarouselPictures')}}</span>
        </template>
        <el-button
          size="small"
          type="primary"
          @click="dialogUploadFun"
          class="base-btn"
        >{{$t('management.ClickToUpload')}}</el-button>
        <div class="el-upload__tip">{{$t('visualization.OnlyJpgPngFilesCanBeUploadedSize')}}</div>
        <!-- 上传列表 -->
        <ul class="el-upload-list el-upload-list--picture">
          <li
            tabindex="0"
            class="el-upload-list__item is-ready"
            v-for="(item,ix) in currentPropertySetInfo.propsConf.imgList"
            :key="ix"
          >
            <img :src="item.url" alt class="el-upload-list__item-thumbnail" />
            <a class="el-upload-list__item-name">
              <i class="el-icon-document"></i>
              {{item.name}}
            </a>
            <label class="el-upload-list__item-status-label">
              <i class="el-icon-upload-success el-icon-check"></i>
            </label>
            <i class="el-icon-close" @click="bannerDelImg(item)"></i>
          </li>
        </ul>
      </el-collapse-item>
    </el-collapse>
    <upload-clipping
      ref="dialogUpload"
      @UploadBlackFun="UploadBlackFun"
      :dialogTitleUpload="dialogTitleUpload"
      :picture="picture"
      :autoCropWidth="autoCropWidth"
      :autoCropHeight="autoCropHeight"
      :enlarge="enlarge"
      :recommendShow="false"
      :fileRule='fileRule'
    ></upload-clipping>
  </div>
</template>
<script>
import UploadClipping from "components/common/uploadClipping/UploadClipping";
export default {
  name: "IndexHeaderSet",
  props: {
    currentPropertySetInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      activeNames: ["logoUpload", "bannerUpload"],
      dialogTitleUpload: this.$t("visualization.AddCarouselPictures"),
      picture: "picture",
      autoCropWidth: 240,
      autoCropHeight: 66.25,
      enlarge: 8,
      fileList: [],
      fileRule: {
          tips: this.$t("service.OnlyJPGPNGFilesUploadedSizeLess1MB"),
          size: "800" //kb为单位
    }
    };
  },
  components: {
    UploadClipping
  },
  methods: {
    // 成功
    successFun(val) {
      var headImg = `/fileapi/file/download/${val.referenceId}/true`;
      this.currentPropertySetInfo.imgList = [
        {
          url: headImg,
          name: val.name
        }
      ];
      var data = {
        commonTimeStamp: new Date().getTime(),
        commonEventType: "changeLogo",
        commonSource: "visualizationIndexHeaderPorpertySet",
        commonParams: headImg
      };
      this.$store.dispatch("common/setEventInfo", data);
    },
    beforeUpload(file) {
      const isJPG =
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/gif" ||
        file.type === "image/jpg";
      const isLt2M = file.size < 500 * 1024;
      let that = this;
      let isAllow = false;
      if (!isJPG) {
        this.$message({
          message: this.$t("visualization.OnlyFilesUploaded"),
          type: 'warning'
        })
      }
      if (!isLt2M) {
        this.$message({
          message: this.$t("visualization.TheFileSizeCannotExceed"),
          type: 'warning'
        })
      }
      
      const isSize = new Promise(function(resolve, reject) {
        let width = 500;
        let height = 60;
        let _URL = window.URL || window.webkitURL;
        let image = new Image();
        image.onload = function() {
          let valid = image.width <= width && image.height <= height;
          valid ? resolve() : reject();
        };
        image.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return file;
        },
        () => {
          this.$message({
          message: this.$t("visualization.TheFileSizeIsNotCorrectCannotExceed"),
          type: 'warning'
        })
          return Promise.reject();
        }
      );
      return isJPG && isLt2M && isSize;
    },
    delImg(val) {
      if(val.url=='/config/imageConfig/system/logo/normalLogo/logo.png'){
this.$message({
          message: this.$t('visualization.Thedefaultlogocannotbedeleted'),
          type: "warning"
        });
      }else{
      this.currentPropertySetInfo.imgList = this.currentPropertySetInfo.imgList.filter(
        function(item) {
          return item.url !== val.url;
        }
      );
      if (this.currentPropertySetInfo.imgList.length == 0) {
        this.currentPropertySetInfo.imgList = [
          {
            url: "/config/imageConfig/system/logo/normalLogo/logo.png",
            name: "默认.png"
          }
        ];
        var data = {
          commonTimeStamp: new Date().getTime(),
          commonEventType: "changeLogo",
          commonSource: "visualizationIndexHeaderPorpertySet",
          commonParams: "/config/imageConfig/system/logo/normalLogo/logo.png"
        };
        this.$store.dispatch("common/setEventInfo", data);
      }
      }
    },
    // 轮播图
    // 上传返回值
    UploadBlackFun(val) {
      var headImg = `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
      this.currentPropertySetInfo.propsConf.imgList.push({
        url: headImg,
        name: val.uploadrUrl.name
      });
      var data = {
        commonTimeStamp: new Date().getTime(),
        commonEventType: "changeCarousel",
        commonSource: "visualizationIndexHeaderPorpertySet",
        commonParams: this.currentPropertySetInfo.propsConf
      };
      this.$store.dispatch("common/setEventInfo", data);
    },
    dialogUploadFun() {
      this.$refs.dialogUpload.dialogUploadShow();
    },
    bannerDelImg(val) {
      this.currentPropertySetInfo.propsConf.defaultDelImg.push(val);
      this.currentPropertySetInfo.propsConf.imgList = this.currentPropertySetInfo.propsConf.imgList.filter(
        function(item) {
          return item.url !== val.url;
        }
      );
      var data = {
        commonTimeStamp: new Date().getTime(),
        commonEventType: "changeCarousel",
        commonSource: "visualizationIndexHeaderPorpertySet",
        commonParams: this.currentPropertySetInfo.propsConf
      };
      this.$store.dispatch("common/setEventInfo", data);
    }
  }
};
</script>
<style lang='scss' scoped>

.header-set {
  /deep/ .el-collapse {
    border-top: none;
    .el-collapse-item__header {
      position: relative;
      height: 40px;
      line-height: 40px;
      padding-left: 4px;
      border-bottom: 1px solid #ccd0d3;
      font-size: 16px;
      @include base-color();
      .el-collapse-item__arrow {
        display: none;
      }
      .pannel-arrow {
        color: #b3bcbf;
        transition: transform 0.3s;
      }
    }
    .el-collapse-item__wrap {
      border-bottom: none;
      .el-collapse-item__content {
        margin: 10px;
      }
    }
    .el-collapse-item__header.is-active .pannel-arrow {
      transform: rotate(90deg);
    }
  }
  .el-upload-list__item:hover {
    .el-icon-close {
      word-break: break-all;
      list-style: none;
      font-size: 14px;
      font-style: normal;
      font-weight: 400;
      font-variant: normal;
      text-transform: none;
      line-height: 1;
      display: block;
      position: absolute;
      top: 5px;
      right: 5px;
      cursor: pointer;
      opacity: 0.75;
      color: #606266;
    }
    .el-upload-list__item-status-label {
      display: none;
    }
  }

  .el-upload-list--picture {
    .el-upload-list__item-status-label {
      word-break: break-all;
      list-style: none;
      font-size: 14px;
      color: #606266;
      line-height: inherit;
      position: absolute;
      right: -17px;
      top: -7px;
      width: 46px;
      height: 26px;
      background: #13ce66;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 1px 1px #ccc;
      display: block;
    }
    .el-icon-close {
      display: none;
    }
    .el-upload-list__item-thumbnail {
      list-style: none;
      font-size: 14px;
      color: #606266;
      line-height: 1.8;
      border-style: none;
      vertical-align: middle;
      display: inline-block;
      width: 140px;
      height: 70px;
      position: relative;
      z-index: 1;
      margin-left: -80px;
      background-color: #dcdfe6;
    }
  }
}
</style>

