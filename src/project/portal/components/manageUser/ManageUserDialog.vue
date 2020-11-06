<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      @opened="openDialog"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{dialogTitle}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form :model="userInfo" :label-width="labelWidth" ref="userForm" :rules="rules">
          <el-form-item :label="$t('management.picture')" class="profile-picture">
            <el-row>
              <el-col v-for="(item,ix) in imgs" :key="ix" :span="3">
                <el-image
                  :src="item.src"
                  :class="{'pic-checked':item.checked}"
                  @click="picChange(item.id)"
                ></el-image>
              </el-col>
              <!-- 头像上传 -->
              <el-col :span="3">
                <i class="el-icon-plus profile-picture-add" @click="dialogUploadFun"></i>
              </el-col>
            </el-row>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('management.username')+':'" prop="loginName">
                <el-input v-model="userInfo.loginName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('management.name')+':'" prop="name">
                <el-input v-model="userInfo.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12" style="height:62px;">
              <el-form-item :label="$t('management.gender')+':'">
                <el-radio-group v-model="userInfo.sex">
                  <el-radio-button label="1">{{$t('management.male')}}</el-radio-button>
                  <el-radio-button label="0">{{$t('management.female')}}</el-radio-button>
                </el-radio-group>
              </el-form-item>
            </el-col>
            <el-col :span="12" style="height:62px;">
              <el-form-item :label="$t('management.rankId')+':'">
                <el-input-number v-model="userInfo.sortNo" :min="1" :max="30"></el-input-number>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('management.PasswordPolicy')+':'" prop="passwordPolicy">
                <!-- <el-input type="password" v-model="userInfo.passWord"></el-input> -->
                <el-select
                  v-model="passwordMode"
                  :placeholder="$t('myCenter.PleaseSelect')"
                  style="width: 100%;"
                >
                  <el-option value="1" :label="$t('management.DefaultPassword')"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('management.mobileNo')+':'" prop="mobilePhone">
                <el-input v-model="userInfo.mobilePhone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('management.eMail')+':'" prop="email">
                <el-input v-model="userInfo.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('management.organizationPosition')+':'" prop="orgAndPost">
                <tree-select-cascader
                  :data="orgAndPostList"
                  :treeDefaultProps="treeDefaultProps"
                  :props="treeAndCascaderProps"
                  v-model="userInfo.orgAndPost"
                  @select-change="selectChange"
                ></tree-select-cascader>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="base-btn" @click="save">{{$t('management.ok')}}</el-button>
      </span>
      <upload-clipping
        ref="dialogUpload"
        @UploadBlackFun="UploadBlackFun"
        :dialogTitleUpload="dialogTitleUpload"
        :recommendShow="false"
        :raduis="raduis"
      ></upload-clipping>
    </el-dialog>
  </div>
</template>

<script>
import TreeSelectCascader from "components/common/treeSelectCascader/TreeSelectCascader";
import UploadClipping from "components/common/uploadClipping/UploadClipping";
export default {
  name: "ManageUserDialog",
  components: {
    TreeSelectCascader,
    UploadClipping
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    orgAndPostList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    userInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.addUser");
      }
    }
  },
  methods: {
    // 上传返回值
    UploadBlackFun(val) {
      this.referenceId = val.uploadrUrl.referenceId;
      var idFlag = 0;
      this.imgs.forEach(item => {
        item.checked = false;
        idFlag = item.id;
      });
      this.imgs.push({
        id: idFlag + 1,
        src: `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`,
        checked: true
      });
    },
    dialogUploadFun() {
      this.$refs.dialogUpload.dialogUploadShow();
    },
    handleClose() {
      this.$emit("dialogClose");
      this.imgs = [this.imgs[0], this.imgs[1], this.imgs[2]];
    },
    picChange(id) {
      for (var i = 0; i < this.imgs.length; i++) {
        this.imgs[i].checked = false;
        if (id == this.imgs[i].id) {
          this.imgs[i].checked = true;
          this.referenceId = this.imgs[i].src;
        }
      }
    },
    selectChange(data) {
      this.userInfo.orgAndPost = data;
    },
    save() {
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.userInfo.list = [];
          this.userInfo.orgAndPost.forEach(item => {
            this.userInfo.list.push({
              orgId: item.postOrgId,
              identityId: item.postId
            });
          });
          this.userInfo.list = JSON.stringify(this.userInfo.list);
          this.$emit("save", this.referenceId);
        } else {
          return false;
        }
      });
    },
    openDialog() {
      this.$refs.userForm.clearValidate();
    }
  },
  data() {
    var checkLoginUser = (rule, value, callback) => {
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.errorInVerifyingTheUsername"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.pleaseEnterUsername")
        },
        {
          name:"repeatValidator",
          errorMsg:this.$t("management.theUsernameCannotBeRepeated"),
          api:this.$api.manageUserApi.validateLoginName,
          params:{
            id: this.userInfo.id, loginName: value
          }
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
    var checkName = (rule, value, callback) => {
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingthename"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.pleaseEnterYourName")
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
    var checkMobilePhone = (rule, value, callback) => {
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.errorInVerifyingTheMobileNumber"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("management.pleaseEnterYourMobileNumber")
        },
        {
          name:"repeatValidator",
          errorMsg:this.$t("management.theMobileNumberCannotBeRepeated"),
          api:this.$api.manageUserApi.validatePhone,
          params:{
            id: this.userInfo.id, phone: value
          }
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
    var checkEmail = (rule, value, callback) => {
      if (value) {
        var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regex.test(value)) {
          return callback(
            new Error(this.$t("management.eMailFormatIsIncorrect"))
          );
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    var checkOrgAndPost = (rule, value, callback) => {
      if (value.length > 0) {
        callback();
      } else {
        return callback(
          new Error(this.$t("management.pleaseSelectOrganizationAndPosition"))
        );
      }
    };
    // var checkPassWord = (rule, value, callback) => {
    //   if (value) {
    //     var regex = /^.{6,18}$/;
    //     if (!regex.test(value)) {
    //       return callback(
    //         new Error(this.$t("management.passwordMustIncludes618Digits"))
    //       );
    //     } else {
    //       callback();
    //     }
    //   } else {
    //     return callback(
    //       new Error(this.$t("management.pleaseEnterThePassword"))
    //     );
    //   }
    // };
    return {
      raduis: true,
      dialogTitleUpload: this.$t("management.AddPicture"),
      referenceId: "",
      org: [],
      labelWidth: "100px",
      passwordMode: this.$t("management.DefaultPassword"),
      treeDefaultProps: {
        children: "children",
        label: "orgName"
      },
      treeAndCascaderProps: {
        cascaderChildren: "positionList",
        value: "postName",
        cascaderChildrenId: "postId",
        treeRelevanceId: "orgId",
        CascaderRelevanceId: "postOrgId",
        treeId: "orgId",
        treeParentId: "orgPid"
      },
      imgs: [
        {
          id: 1,
          src:
            "/config/imageConfig/system/defaultProfilepicture/defaultProfilePicture1.png",
          checked: true
        },
        {
          id: 2,
          src:
            "/config/imageConfig/system/defaultProfilepicture/defaultProfilePicture2.png",
          checked: false
        },
        {
          id: 3,
          src:
            "/config/imageConfig/system/defaultProfilepicture/defaultProfilePicture3.jpg",
          checked: false
        }
      ],
      rules: {
        loginName: [
          { required: true, validator: checkLoginUser, trigger: "blur" }
        ],
        name: [
          {
            required: true,
            trigger: "blur",
            validator: checkName
          }
        ],
        // passwordPolicy: [
        //   {
        //     required: true,
        //     message:this.$t("management.PleaseSelectPasswordPolicy"),
        //     trigger: "blur"
        //   }
        // ],
        // passWord: [
        //   { required: true, validator: checkPassWord, trigger: "blur" }
        // ],
        mobilePhone: [
          { required: true, validator: checkMobilePhone, trigger: "blur" }
        ],
        email: [{ required: false, validator: checkEmail, trigger: "blur" }],
        orgAndPost: [
          { required: true, validator: checkOrgAndPost, trigger: "change" }
        ]
      }
    };
  },
  mounted() {
    //国际化样式处理
    if (this.$store.getters.language == "english") {
      this.labelWidth = "160px";
    } else {
      this.labelWidth = "100px";
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
  .profile-picture {
    height: 50px;
    line-height: 50px;
    .profile-picture-add {
      display: inline-block;
      width: 50px;
      height: 50px;
      line-height: 50px;
      border-radius: 50%;
      text-align: center;
      color: #fff;
      font-size: 20px;
      background: #dee0e7;
      cursor: pointer;
    }
    .pic-checked {
      border: 2px solid #19ffe7;
      box-shadow: 0px 1px 4px #ccc;
    }
    .el-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 40px;
      cursor: pointer;
    }
    .el-col {
      height: 50px;
      line-height: 50px;
      padding: 0 28px;
    }
    .el-col:not(:last-child) {
      @include manage-border(
        $types: (
          "right"
        )
      );
    }
  }
  /deep/ .el-cascader {
    width: 100%;
  }
}
</style>