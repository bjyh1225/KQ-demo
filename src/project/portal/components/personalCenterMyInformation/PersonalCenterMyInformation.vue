<template>
  <el-row class="container">
    <el-row class="title">
      <span>{{$t('myCenter.PersonalInformation')}}</span>
    </el-row>
    <el-row>
      <el-form :model="userInfo" :label-width="formLabelWidth" :rules="userRules" ref="userForm">
        <el-row class="form-item">
          <el-form-item :label="$t('management.picture')+':'" class="profile-picture">
            <el-image v-if="userInfo.headImg" :src="headImg"></el-image>
            <el-image v-else :src="defaultImg"></el-image>
            <i class="el-icon-plus profile-picture-add" @click="dialogUploadFun"></i>
          </el-form-item>
          <el-form-item :label="$t('management.name')+':'" prop="name">
            <el-input @blur="save('name')" v-model="userInfo.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.username')+':'">
            <span>{{userInfo.loginName}}</span>
          </el-form-item>
          <el-form-item :label="$t('management.gender')+':'">
            <el-radio-group v-model="userInfo.sex" @change="changeSex">
              <el-radio label="1">{{$t('management.male')}}</el-radio>
              <el-radio label="0">{{$t('management.female')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item :label="$t('myCenter.DateOfBirth')">
            <el-date-picker
              type="date"
              :placeholder="$t('myCenter.PleaseSelectDateOfBirth')"
              v-model="userInfo.birth"
              :picker-options="pickeroptions"
              value-format="yyyy-MM-dd"
              @blur="save('birth')"
            ></el-date-picker>
          </el-form-item>
        </el-row>
        <el-row class="form-item">
          <el-form-item :label="$t('myCenter.Password')">
            <span
              class="el-icon-edit edit-password"
              @click="editPassword"
              v-if="!editPasswordStatus"
            >{{$t('myCenter.ChangePassword')}}</span>
            <el-row v-else>
              <el-form :model="passwordInfo" ref="passwordForm" :rules="passwordRules">
                <el-row class="hide-form-item">
                  <el-form-item prop="oldPassword">
                    <el-input
                      :placeholder="$t('myCenter.PleaseEnterTheOldPassword')"
                      v-model="passwordInfo.oldPassword"
                      type="password"
                    ></el-input>
                  </el-form-item>
                </el-row>
                <el-row class="hide-form-item">
                  <el-form-item prop="newPassword">
                    <el-input
                      :placeholder="$t('myCenter.PleaseEnterTheNewPassword')"
                      v-model="passwordInfo.newPassword"
                      type="password"
                    ></el-input>
                  </el-form-item>
                </el-row>
                <el-row class="hide-form-item">
                  <el-form-item prop="secondPassword">
                    <el-input
                      :placeholder="$t('myCenter.PleaseConfirmTheNewPassword')"
                      v-model="passwordInfo.secondPassword"
                      type="password"
                    ></el-input>
                  </el-form-item>
                </el-row>
              </el-form>
              <el-row class="hide-form-item">
                <el-button @click="cancelEditPassword">{{$t('management.cancel')}}</el-button>
                <el-button class="base-btn" @click="savePassword">{{$t('management.ok')}}</el-button>
              </el-row>
            </el-row>
          </el-form-item>
          <el-form-item :label="$t('myCenter.MobileNo')+':'" prop="mobilePhone">
            <el-input @blur="save('mobilePhone')" v-model="userInfo.mobilePhone"></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.Tel')+':'" prop="phone">
            <el-input @blur="save('phone')" v-model="userInfo.phone"></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.Address')+':'" prop="address">
            <el-input @blur="save('address')" v-model="userInfo.address"></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.email')+':'" prop="email">
            <el-input @blur="save('email')" v-model="userInfo.email"></el-input>
          </el-form-item>
        </el-row>
        <el-row class="form-item form-item-last">
          <el-form-item :label="$t('myCenter.Role')+':'">
            <span>{{userInfo.role}}</span>
          </el-form-item>
          <el-form-item :label="$t('myCenter.DepartmentPosition')+':'">
            <span>{{userInfo.deptAndPost}}</span>
          </el-form-item>
          <el-form-item :label="$t('myCenter.UserState')+':'">
            <span>{{userInfo.status?$t('myCenter.Normal'):$t('myCenter.Disabled')}}</span>
          </el-form-item>
          <el-form-item :label="$t('myCenter.LastLoginTime')+':'">
            <span>{{userInfo.lastLogin}}</span>
          </el-form-item>
        </el-row>
      </el-form>
    </el-row>
    <upload-clipping
      ref="dialogUpload"
      @UploadBlackFun="UploadBlackFun"
      :dialogTitleUpload="dialogTitleUpload"
      :recommendShow="false"
      :raduis="raduis"
    ></upload-clipping>
  </el-row>
</template>

<script>
import UploadClipping from "components/common/uploadClipping/UploadClipping";
export default {
  name: "PersonalCenterInformation",
  components: {
    UploadClipping
  },
  data() {
    //效验用户
    var checkName = (rule, value, callback) => {
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingthename"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("myCenter.PleaseEnterName")
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
        errorMsg:this.$t("myCenter.ErrorsInVerifyingThePhoneNumber"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("myCenter.PleaseEnterTheMobileNumber")
        },
        {
          name:"repeatValidator",
          errorMsg:this.$t("myCenter.TheMobileNumberCannotBeRepeated"),
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
            new Error(this.$t("myCenter.EMailFormatIsIncorrect"))
          );
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    //效验密码
    var checkOldPassword = (rule, value, callback) => {
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("myCenter.ErrorsInVerifyingTheOldPassword"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("myCenter.PleaseEnterTheOldPassword")
        },
        {
          name:"repeatValidator",
          errorMsg:this.$t("myCenter.TheOldPasswordIsIncorrect"),
          api:this.$api.personalCenterMyInformationApi.validatePassword,
          params:{
           id: this.userInfo.id,
          password: this.passwordInfo.oldPassword
          }
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
    var checkNewPassword = (rule, value, callback) => {
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingthenewpassword"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("myCenter.PleaseEnterTheNewPassword")
        }
      ])
      var regex = /^.{6,18}$/;
      if (!regex.test(this.passwordInfo.newPassword)) {
        return callback(
          new Error(this.$t("myCenter.PasswordMustIncludesDigits"))
        );
      }
      if (this.passwordInfo.secondPassword) {
        if (value != this.passwordInfo.secondPassword) {
          return callback(
            new Error(this.$t("myCenter.TheTwoPasswordsDoNotMatch"))
          );
        }
      }
      return callback();
     
    };
    var checkSecondPassword = (rule, value, callback) => {
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingthenewpassword"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("myCenter.PleaseConfirmTheNewPassword")
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
      if (this.passwordInfo.secondPassword != this.passwordInfo.newPassword) {
        return callback(
          new Error(this.$t("myCenter.TheTwoPasswordsDoNotMatch"))
        );
      }
      return callback();
    };
      var checkTel = (rule, value, callback) => {
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingthetelephonenumber"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
     var checkAddress = (rule, value, callback) => {
       let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingtheaddress"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
    return {
      raduis: true,
      dialogTitleUpload: this.$t("management.AddPicture"),
      formLabelWidth: "200px",
      defaultImg:
        "/config/imageConfig/system/defaultProfilepicture/defaultProfilePicture1.png",
      headImg: "",
      userInfo: {},
      userInfoCopy: {},
      editPasswordStatus: false,
      pickeroptions: {
        disabledDate: time => {
          return time.getTime() > Date.now();
        }
      },
      passwordInfo: {
        oldPassword: "",
        newPassword: "",
        secondPassword: ""
      },
      passwordRules: {
        oldPassword: [
          { required: true, validator: checkOldPassword, trigger: "blur" }
        ],
        newPassword: [
          { required: true, validator: checkNewPassword, trigger: "blur" }
        ],
        secondPassword: [
          { required: true, validator: checkSecondPassword, trigger: "blur" }
        ]
      },
      userRules: {
        name: [{ required: false, validator: checkName, trigger: "blur" }],
        mobilePhone: [
          { required: false, validator: checkMobilePhone, trigger: "blur" }
        ],
        email: [{ required: false, validator: checkEmail, trigger: "blur" }],
        address:[{required: false, validator: checkAddress, trigger: "blur" }],
        phone:[{required: false, validator: checkTel, trigger: "blur" }]
      }
    };
  },
  methods: {
    // 上传返回值
    UploadBlackFun(val) {
      this.headImg = `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
      this.userInfo.headImg = val.uploadrUrl.referenceId;
      this.save("headImg");
    },
    dialogUploadFun() {
      this.$refs.dialogUpload.dialogUploadShow();
    },
    editPassword() {
      this.passwordInfo = {};
      this.editPasswordStatus = true;
    },
    cancelEditPassword() {
      this.editPasswordStatus = false;
      this.$refs.passwordForm.resetFields();
    },
    savePassword() {
      this.$refs.passwordForm.validate(valid => {
        if (valid) {
          this.$api.personalCenterMyInformationApi
            .modifyPassword(this.passwordInfo, {
              loadingText: this.$t("myCenter.Modifying")
            })
            .then(() => {
              this.$message({
                message: this.$t("myCenter.ThePasswordIsChangedSuccessfully"),
                type: "success"
              });
              this.$store.dispatch("menu/setRouters", []);
              sessionStorage.removeItem("menus");
              sessionStorage.removeItem("routers");
              sessionStorage.removeItem("username");
              sessionStorage.removeItem("userInfo");
              this.$store.dispatch("user/login", {});
              sessionStorage.removeItem("jwt");
              this.$router.replace({
                path: "/login"
              });
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    save(field) {
      
      if (this.userInfo[field] == this.userInfoCopy[field]) {
        return false;
      }
      // if(!this.userInfo[field]){
      //   return false;
      // }
      this.$refs.userForm.validate(valid => {
        if (valid) {
          this.$api.personalCenterMyInformationApi
            .updatePersonnelInfo(this.userInfo, {
              loadingText: this.$t("myCenter.Modifying")
            })
            .then(() => {
              this.$message({
                message: this.$t("myCenter.ModifiedSuccessfully"),
                type: "success"
              });
              this.userInfo.username = this.userInfo.name;
              sessionStorage.setItem("username", this.userInfo.username);
              sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));
              this.$store.dispatch(
                "user/login",
                JSON.parse(JSON.stringify(this.userInfo))
              );

              this.userInfoCopy = JSON.parse(JSON.stringify(this.userInfo));
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    changeSex() {
      this.save("sex");
    }
  },
  mounted() {
    this.$api.personalCenterMyInformationApi
      .getAllInfoByPersonnelId({
        loadingText: this.$t("myCenter.QueryingThePersonalInformation")
      })
      .then(res => {
        this.userInfo = res.data.data;
        this.userInfo.username = this.userInfo.name;
        sessionStorage.setItem("username", this.userInfo.username);
        sessionStorage.setItem("userInfo", JSON.stringify(this.userInfo));
        this.$store.dispatch(
          "user/login",
          JSON.parse(JSON.stringify(this.userInfo))
        );
        this.userInfoCopy = JSON.parse(JSON.stringify(res.data.data));
        this.headImg = "/filedownloadapi/" + res.data.data.headImg + "/true";
      })
      .catch(() => {});
  }
};
</script>

<style lang='scss' scoped>

.container {
  margin-bottom: 40px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 0 20px;
  @include base-color();
  .title {
    padding: 18px 0;
    border-bottom: 1px solid #dfdfdf;
    span {
      @include dialog-title($width: 2px);
      padding-bottom: 17px;
    }
  }
  .el-form {
    .form-item {
      padding-left: 100px;
      border-bottom: 1px solid #dfdfdf;
      color: #606266;
      .el-form-item:last-child {
        margin-bottom: 40px;
      }
      .el-form-item:first-child {
        margin-top: 20px;
        .el-image {
          position: relative;
        }
        i.profile-picture-add {
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
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
        i:hover.profile-picture-add {
          opacity: 1;
        }
      }
      .profile-picture {
        height: 60px;
        line-height: 60px;
        margin-bottom: 12px;
      }
      .edit-password {
        @include base-active-color();
        cursor: pointer;
      }
    }
    .form-item:last-child {
      .el-form-item:last-child {
        margin-bottom: 40px;
      }
      .el-form-item {
        margin-bottom: 6px;
      }
    }
    .form-item-last {
      border: none;
    }
    .el-input {
      max-width: 400px;
    }
    .el-date-editor.el-input {
      width: 100%;
    }
    .el-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .el-form-item .hide-form-item {
      margin-bottom: 22px;
      .el-form-item {
        margin: 0;
      }
    }
  }
}
</style>