<template>
  <div class="details-background">
    <el-row class="details-operation">
      <el-col>
        <el-button
          type="primary base-btn"
          icon="el-icon-plus"
          @click="hold"
          size="small"
        >{{$t('visualization.Save')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-close"
          @click="cancel"
          size="small"
        >{{$t('myCenter.cancel')}}</el-button>
      </el-col>
    </el-row>
    <div class="details-exhibition">
      <el-row :gutter="100">
        <el-col :span="8" class="details-left">
          <div>
            <img :src="headImg==''?isDetails.C_IMG?isDetails.C_IMG:defaultSrc:headImg" alt />
          </div>
          <div>
            <el-button
              type="primary"
              @click="imgUpload"
              class="img-btn"
            >{{$t('myCenter.Uploadimages')}}</el-button>
          </div>
          <el-row>
            <el-col>{{$t('myCenter.Formats')}}:PNG、JPG</el-col>
            <el-col>{{$t('myCenter.Imagesizecannotexceed150KB')}}</el-col>
          </el-row>
          <el-row>
            <el-col>{{$t('myCenter.Tips')}}:</el-col>
            <el-col>{{$t('myCenter.Imagesizeispixels')}}</el-col>
          </el-row>
        </el-col>
        <el-col :span="16" class="details-right">
          <el-row>
            <el-col class="details-right-title">
              <span class="details-right-title-left">{{$t('myCenter.Basicinfo')}}</span>
            </el-col>
            <el-form :model="registerInfo" ref="registerForm" :label-width="formLabelWidth">
              <el-form-item :label="$t('myCenter.Name')+':'" prop="name">
                <el-input v-model="registerInfo.name"></el-input>
              </el-form-item>
              <el-col class="details-right-content">
                <span>{{$t('portalStatistics.Owner')}}:</span>
                <span>{{isDetails.USERNAME}}</span>
              </el-col>
              <el-form-item :label="$t('myCenter.TheCategory')" prop="power">
                <el-select v-model="registerInfo.power" :placeholder="$t('myCenter.PleaseSelect')" ref='selectGroup'>
                <el-option
                  v-for="item in arr"
                  :key="item.id"
                  :label="item.typeName"
                  :value="item.id"
                ></el-option>
            </el-select>
              </el-form-item>
              <el-form-item :label="$t('service.description')+':'" prop="comments">
                <el-input v-model="registerInfo.comments"></el-input>
              </el-form-item>
              <el-form-item :label="$t('service.label')+':'" prop="keyWord" class="form-item-tag">
                <el-row class="key-word-tag">
                  <el-col :span="18">
                    <el-input
                      class="input-new-tag"
                      v-model="inputValue"
                      ref="saveTagInput"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
                      type="text"
                      maxlength="15"
                      show-word-limit
                    ></el-input>
                  </el-col>
                  <el-col :span="4">
                    <el-button
                      type="primary"
                      class="base-btn"
                      @click="showInput"
                    >+ {{$t('management.Addlabels')}}</el-button>
                  </el-col>
                </el-row>
                <el-row class="key-word-tag-box">
                  <el-tag
                    :key="tag"
                    v-for="tag in dynamicTags"
                    closable
                    @close="handleCloseTag(tag)"
                  >{{tag}}</el-tag>
                </el-row>
              </el-form-item>
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
            </el-form>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <upload-clipping
      ref="dialogUpload"
      @UploadBlackFun="UploadBlackFun"
      :dialogTitleUpload="dialogTitleUpload"
      :autoCropWidth="autoCropWidth"
      :autoCropHeight="autoCropHeight"
      :fileRule="fileRule"
      :recommendShow="true"
    ></upload-clipping>
  </div>
</template>
<script>
import UploadClipping from "components/common/uploadClipping/UploadClipping";
export default {
  props: {
    isDetails: {
      type: Object,
      default() {
        return {};
      }
    },
    formLabelWidth: {
      type: String,
      default: "120px"
    },
    registerInfo: {
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
    arr: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      autoCropWidth: 236,
      autoCropHeight: 165,
      fileRule: {
        tips: this.$t("service.OnlyJPGPNGFilesUploadedSizeLess1MB"),
        size: "1024"
      },
      dialogTitleUpload: this.$t("service.AddThumbnail"),
      headImg: "",
      inputValue: "",
      dynamicTags: []
    };
  },
  name: "ManageBuilderCategoryDetailsEdit",
  watch: {
    dynamicTags() {
      this.registerInfo.keyWord = this.dynamicTags.toString();
    },
    "registerInfo.keyWord"() {
      if (this.registerInfo.keyWord) {
        if (this.registerInfo.keyWord.length > 0) {
          this.dynamicTags = this.registerInfo.keyWord.split(",");
        }
      }
    }
  },
  components: {
    UploadClipping
  },
  methods: {
    // 标签
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      var reg = /^[\s　]|[ ]$/gi;
      let inputValue = this.inputValue;
      if (
        inputValue &&
        inputValue.indexOf(",") == -1 &&
        inputValue.indexOf("，") == -1
      ) {
        if (this.dynamicTags.length >= 5) {
          this.$message({
            message: this.$t("management.Addfivelabelsatmost"),
            type: "warning"
          });
        } else if (this.dynamicTags.indexOf(inputValue) != -1) {
          this.$message({
            message: this.$t("management.Thelabelscannotberepeated"),
            type: "warning"
          });
        } else if (reg.test(inputValue)) {
          this.$message({
            message: this.$t(
              "management.Nospacesareallowedatthebeginningandtheendofthelabel"
            ),
            type: "warning"
          });
        } else {
          this.dynamicTags.push(inputValue);
        }
      }
      if (inputValue.indexOf(",") != -1 || inputValue.indexOf("，") != -1) {
        this.$message({
          message: this.$t("management.Nocommasareallowedinthelabel"),
          type: "warning"
        });
      }
      this.inputValue = "";
    },
    // 上传
    imgUpload() {
      this.$refs.dialogUpload.dialogUploadShow();
    },
    //上传返回值
    UploadBlackFun(val) {
      if (val.recommendation) {
        this.headImg = val.uploadrUrl;
      } else {
        this.headImg = `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
      }
      this.$forceUpdate();
    },
    // 提交
    hold() {
      this.$emit("detailsEditShow");
      this.$emit("hold", this.headImg);
    },
    //取消
    cancel() {
      this.$confirm(this.$t("myCenter.Confirmtocancel") + "?")
        .then(() => {
          this.$emit("detailsEditShow");
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>

.details-background {
  background: #f5f5f5;
  padding: 15px 8%;
  font-size: 14px;
  color: #606266;
  .details-operation {
    text-align: right;
  }
  .details-exhibition {
    background: #fff;
    padding: 36px 90px;
    min-height: 570px;
    margin-top: 6px;
    .details-left {
      font-size: 12px;
      .el-button--primary {
        color: #606266;
        background: #fff;
        padding: 8px 20px;
        border-color: #dfdfdf;
      }
      .el-row {
        padding-left: 4px;
      }
      div {
        margin-bottom: 10px;
        img {
          width: 100%;
          height: 176px;
          background: #f3f9f9;
        }
        .img-btn {
          width: 100%;
          border-radius: 0;
        }
        .img-btn:hover {
          cursor: pointer;
          @include check-box-border();
          @include base-active-color();
        }
      }
    }
    .details-right {
      /deep/.el-form {
        margin-top: 66px;
        .el-form-item {
          margin-bottom: 10px;
        }
        .form-item-tag {
          .key-word-tag {
            /deep/.el-button {
              position: absolute;
              right: 0;
            }
          }
        }
        /deep/.el-tag {
          margin-right: 10px;
        }
        /deep/.el-tag {
          @include base-active-color();
          .el-tag__close {
            @include base-active-color();
            &:hover {
              @include base-active-pagination();
            }
          }
        }
      }
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
      .details-right-content {
        margin-bottom: 10px;
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
</style>