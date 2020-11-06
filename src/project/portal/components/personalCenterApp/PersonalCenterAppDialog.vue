<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose"
      @opened="openDialog"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('management.CreateApp')}}</span>
        </div>
      </template>
      <!-- 步骤条 -->
      <ul class="navs">
        <li :class="nextShow?'active':''">
          <i class="el-icon-portal-duihao" v-show="nextShow"></i>
          <span>{{$t('myCenter.ServiceInformation')}}</span>
        </li>
        <li class="navs-li" :class="nextShow?'active':''">
          <i class="el-icon-portal-duihao" v-show="false"></i>
          <span>{{$t('myCenter.SharingSettings')}}</span>
        </li>
      </ul>
      <!-- 服务基本信息 -->
      <el-row class="dialog-body" v-show="!nextShow">
        <personal-center-app-public-form
          :registerInfo="registerInfo"
          ref="roleFormFlag"
          :formLabelWidth="formLabelWidth"
          @formResult="formResult"
          class="el-form"
        ></personal-center-app-public-form>
      </el-row>
      <personal-center-service-share
        v-show="nextShow"
        ref="sharedSubmissionFun"
        @permissionListDataFun="permissionListDataFun"
        :dialogVisible="dialogVisible"
        @personalCheckData="personalCheckData"
      ></personal-center-service-share>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="margin-top: 12px;"
          @click="nextStep"
          v-show="!nextShow"
        >{{$t('myCenter.Next')}}</el-button>
        <el-button
          style="margin-top: 12px;"
          @click="backFun"
          v-show="nextShow"
        >{{$t('myCenter.Back')}}</el-button>
        <el-button
          type="primary"
          class="base-btn"
          @click="save"
          v-show="nextShow"
        >{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PersonalCenterServiceShare from "components/personalCenterService/PersonalCenterServiceShare";
import PersonalCenterAppPublicForm from "./PersonalCenterAppPublicForm";
export default {
  name: "PersonalCenterAppDialog",
  components: { PersonalCenterServiceShare, PersonalCenterAppPublicForm },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.addRoles");
      }
    },
    registerInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    nextShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dialogVisible() {
      if (!this.dialogVisible) {
        this.$emit("backFun");
        this.$refs.sharedSubmissionFun.dataClearedFun();
        this.$refs.roleFormFlag.resetFields();
      }
    }
  },
  data() {
    return {
      formLabelWidth: "120px",
      permissionListData: [],
      deleteListUserData: [],
      ywType: "appbuilder"
    };
  },
  methods: {
    personalCheckData(val) {
      this.sharingListData = val;
    },
    // 关闭
    handleClose() {
      this.$emit("backFun");
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.sharedSubmissionFun.sharedSubmission({
        ywType: this.ywType,
        sourceId: null
      });
      // 判断当前页面是否为空  弹框提示
      if (
        typeof this.sharingListData == "undefined" ||
        (this.sharingListData == false && this.permissionListData.length == 0)
      ) {
        this.$message({
          message: this.$t("myCenter.PleasetickSharepermission"),
          type: "warning"
        });
        return false;
      }
      this.$emit("save", {
        appClassify: this.registerInfo.appClassify,
        scope: this.scope,
        permissionListData: this.permissionListData,
        deleteListUserData: null
      });
    },
    openDialog() {
      this.$refs.roleFormFlag.openFormDialog();
    },
    // 上一步
    backFun() {
      this.$emit("backFun");
    },
    //下一步
    nextStep() {
      this.$refs.roleFormFlag.validate();
    },
    formResult(val) {
      if (val) {
        this.$emit("nextStep");
      }
    },
    //获取permissionListData数据
    permissionListDataFun(val) {
      this.permissionListData = val.permissionListData;
      this.scope = val.scope;
    }
  }
};
</script>

<style lang='scss' scoped>

.manage-dialog {
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
  /deep/ .el-cascader {
    width: 100%;
  }
  .el-form {
    padding: 0px 100px;
  }
  // 步骤条
  ul.navs {
    height: 40px;
    border-radius: 0px 4px 4px 0px;
    width: 100%;
    background-color: #f6f7fb;
    padding: 0;
    margin-top: 0;
    li {
      padding: 0px 10px 0 30px;
      line-height: 40px;
      display: inline-block;

      position: relative;
    }
    li:after {
      content: "";
      display: block;
      border-top: 20px solid #f6f7fb;
      border-bottom: 20px solid #f6f7fb;
      @include base-active-underline($width: 20px, $types: left);
      position: absolute;
      right: -20px;
      top: 0;
      z-index: 99;
    }
    li:before {
      content: "";
      display: block;
      border-top: 20px solid #f6f7fb;
      border-bottom: 20px solid #f6f7fb;
      border-bottom: 20px solid #f6f7fb;
      position: absolute;
      left: 140px;
      top: 0;
    }
    li:first-child {
      @include base-bg-font();
      border-radius: 4px 0 0 4px;
      color: #fff;
    }
    li:first-child:before {
      display: none;
    }
    li:last-child:after,
    .cssNavEnd:after {
      display: none;
    }
    li.active:first-child:after {
      @include base-active-underline($width: 20px, $types: top);
      @include base-active-underline($width: 20px, $types: bottom);
      border-left: 20px solid #f6f7fb;
    }
    li.active:first-child {
      @include base-active-color();
      background-color: #f6f7fb;
    }
    .el-icon-portal-duihao {
      padding-right: 4px;
    }
    li.active:after {
      border-left-color: #f6f7fb;
    }
    .navs-li {
      width: 102px;
      text-align: center;
      background-color: #f6f7fb;
      @include base-active-color();
    }
    .navs-li.active {
      @include base-bg-font();
    }
    .navs-li.active:before {
      @include base-active-underline($width: 20px, $types: left);
    }
  }
}
</style>