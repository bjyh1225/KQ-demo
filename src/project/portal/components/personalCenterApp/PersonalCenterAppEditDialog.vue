<template>
  <div class="edit-dialog">
    <el-dialog
      :visible.sync="editDialogVisible"
      width="720px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('management.EditService')}}</span>
        </div>
      </template>
      <!-- 步骤条 -->
      <ul class="navs">
        <li :class="pageNumber==1?'active':''">
          <i class="el-icon-portal-duihao" v-show="pageNumber==2"></i>
          <span>{{$t('myCenter.ServiceInformation')}}</span>
        </li>
        <li :class="pageNumber==2?'active':''">
          <span>{{$t('management.CustomizeThumbnail')}}</span>
        </li>
      </ul>
      <el-row class="dialog-body" v-if="!thumbnailShow">
        <personal-center-app-public-form
          :registerInfo="editInfo"
          ref="roleFormFlag"
          :formLabelWidth="formLabelWidth"
          @formResult="formResult"
          class="el-form"
          :defaultClassify="resourceData"
          :distinguishAppBuilder="distinguishAppBuilder"
        ></personal-center-app-public-form>
      </el-row>
      <!-- 缩略图 -->
      <el-row v-if="thumbnailShow" class="dialog-body-secondary">
        <upload-clipping-next
          ref="dialogUpload"
          @UploadBlackFun="UploadBlackFun"
          :dialogTitleUpload="dialogTitleUpload"
          :autoCropWidth="autoCropWidth"
          :autoCropHeight="autoCropHeight"
          :fileRule="fileRule"
          :recommendShow="true"
          :unifiedMark="unifiedMark"
        ></upload-clipping-next>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="margin-top: 12px;"
          @click="backFun"
          v-show="thumbnailShow"
        >{{$t('myCenter.Back')}}</el-button>
        <el-button
          style="margin-top: 12px;"
          @click="nextStep"
          v-show="!thumbnailShow"
        >{{$t('myCenter.Next')}}</el-button>
        <el-button
          type="primary"
          class="base-btn"
          @click="saveEdit"
          v-show="thumbnailShow"
        >{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PersonalCenterAppPublicForm from "./PersonalCenterAppPublicForm";
import UploadClippingNext from "components/common/uploadClipping/UploadClippingNext";
export default {
  name: "PersonalCenterAppEditDialog",
  components: {
    UploadClippingNext,
    PersonalCenterAppPublicForm
  },
  props: {
    editDialogVisible: {
      type: Boolean,
      default: false
    },
    editInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formLabelWidth: {
      type: String,
      default: "120px"
    },
    resourceData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      ruleForm: {
        appClassify: "",
        name: "",
        describe: ""
      },
      rules: {
        appClassify: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectTheItsCategory"),
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            message: this.$t("myCenter.PleaseEnterTheServiceName"),
            trigger: "blur"
          }
        ]
      },
      fileRule: this.$t("service.OnlyJPGPNGFilesUploadedSizeLess1MB"),
      autoCropWidth: 236,
      autoCropHeight: 165,
      dialogTitleUpload: this.$t("service.AddThumbnail"),
      thumbnailShow: false, //默认缩略图不显示
      pageNumber: 1, //记录第几页（共2页）
      serviceImg: "",
      unifiedMark: "app", //缩略图推荐缩略图标识
      distinguishAppBuilder: ""
    };
  },
  watch: {
    editDialogVisible() {
      if (!this.editDialogVisible) {
        this.distinguishAppBuilder = "";
        this.serviceImg = "";
        this.pageNumber = 1;
        this.thumbnailShow = false;
      } else {
        this.distinguishAppBuilder = "appEdit";
      }
    }
  },
  methods: {
    handleClose() {
      this.thumbnailShow = false;
      this.$emit("editDialogClose");
    },
    //上传返回值
    UploadBlackFun(val) {
      if (val.recommendation) {
        this.serviceImg = val.uploadrUrl;
      } else {
        this.serviceImg = `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
      }
      this.saveAppService();
    },
    formResult(val) {
      if (val) {
        this.$emit("nextStep");
      }
    },
    // 下一步
    nextStep() {
      if (this.pageNumber == 1) {
        this.$refs.roleFormFlag.checkData(() => {
          this.thumbnailShow = true;
          this.pageNumber++;
        });
      }
    },
    // 上一步
    backFun() {
      if (this.pageNumber == 2) {
        this.thumbnailShow = false;
        this.pageNumber--;
      }
    },
    saveEdit() {
      this.$refs.dialogUpload.getImgUrl();
    },
    saveAppService() {
      this.$api.personalCenterAppApi
        .saveAppService({
          id: this.resourceData.id,
          name: this.editInfo.name,
          appClassify: this.editInfo.appClassify,
          scope: this.resourceData.scope,
          appImg: this.serviceImg,
          appComments: this.resourceData.comments
        })
        .then(res => {
          if (res.data.status == 200) {
            this.$emit("editDialogClose");
            this.$emit("getserviceListByMe");
            this.$message({
              message: this.$t("management.EditedSuccessfully"),
              type: "success"
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>

.edit-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-body {
    @include manage-border(
      $types: (
        "bottom"
      )
    );
  }
  // 步骤条
  .navs {
    height: 40px;
    border-radius: 4px 0 0 4px;
    width: 100%;
    background-color: #f6f7fb;
    padding: 0;
    margin-top: 0;
  }
  .navs li {
    padding: 0px 10px 0 30px;
    line-height: 40px;
    background: #f6f7fb;
    display: inline-block;
    @include base-active-color();
    position: relative;
  }

  .navs li:after {
    content: "";
    display: block;
    border-top: 20px solid #f6f7fb;
    border-bottom: 20px solid #f6f7fb;
    border-left: 20px solid #fff;
    position: absolute;
    right: -20px;
    top: 0;
  }

  .navs li:after {
    content: "";
    display: block;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #f6f7fb;
    position: absolute;
    right: -20px;
    top: 0;
    z-index: 10;
  }

  .navs li:before {
    content: "";
    display: block;
    border-top: 20px solid #f6f7fb;
    border-bottom: 20px solid #f6f7fb;
    border-left: 20px solid #fff;
    position: absolute;
    left: 0px;
    top: 0;
  }

  .navs li:first-child {
    border-radius: 4px 0 0 4px;
    padding-left: 25px;
  }
  .navs li:first-child:before {
    display: none;
  }

  .navs li.active {
    @include base-bg-font();
  }

  .navs li.active:after {
    @include base-active-underline($width: 20px, $types: left);
  }
  .navs li.active:before {
    content: "";
    display: block;
    @include base-active-underline($width: 20px, $types: top);
    @include base-active-underline($width: 20px, $types: bottom);
    border-left: 20px solid #fff;
    position: absolute;
    left: 0px;
    top: 0;
  }
  .navs li:first-child.active:before {
    display: none;
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
  .el-form {
    padding: 0px 50px 0 0;
  }
  /deep/.el-select {
    width: 100%;
  }
}
</style>