
<template>
  <div class="header-set">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="upload">
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
            <i class="el-icon-close" @click="delImg(item)"></i>
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
    ></upload-clipping>
  </div>
</template>
<script>
import UploadClipping from "components/common/uploadClipping/UploadClipping";
export default {
  name: "IndexBannerSet",
  data() {
    return {
      activeNames: ["upload"],
      dialogTitleUpload: this.$t("visualization.AddCarouselPictures"),
      picture: "picture",
      autoCropWidth: 240,
      autoCropHeight: 66.25,
      enlarge: 8
    };
  },
  props: {
    currentPropertySetInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  components: {
    UploadClipping
  },
  methods: {
    // 上传返回值
    UploadBlackFun(val) {
      var headImg = `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
      this.currentPropertySetInfo.propsConf.imgList.push({
        url: headImg,
        name: val.uploadrUrl.name
      });
    },
    dialogUploadFun() {
      this.$refs.dialogUpload.dialogUploadShow();
    },
    delImg(val) {
      this.currentPropertySetInfo.propsConf.defaultDelImg.push(val);
      this.currentPropertySetInfo.propsConf.imgList = this.currentPropertySetInfo.propsConf.imgList.filter(
        function(item) {
          return item.url !== val.url;
        }
      );
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
        background-color: #fff;
      }
    }
  }
}
</style>



