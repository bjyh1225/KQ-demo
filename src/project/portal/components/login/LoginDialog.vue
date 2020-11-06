<template>
  <div class="login-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="360px"
      :before-close="handleClose"
      @opened="openDialog"
      :close-on-click-modal="false"
      :custom-class="'login-dialog-pop'"
      :modal="false"
    >
      <el-row class="dialog-body">
        <el-row class="dialog-body-header">
          <el-image src="/config/imageConfig/system/logo/popLogo/logo.png" :fit="'cover'"></el-image>
          <span class="header-font">{{$t('myCenter.Login')}}</span>
        </el-row>
        <el-form ref="loginForm" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input
              v-model="form.username"
              :placeholder="$t('myCenter.Pleaseenterusername')"
              @keyup.enter.native="submitLogin('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              v-model="form.password"
              :placeholder="$t('myCenter.Pleaseenterpassword')"
              @keyup.enter.native="submitLogin('loginForm')"
            ></el-input>
          </el-form-item>
          <p
            class="login-fail-msg"
            v-show="loginStatus"
          >{{$t('myCenter.Theusernameorpasswordisincorrect')}}</p>
          <el-row class="remember-password">
            <el-checkbox-group v-model="form.remember">
              <el-checkbox :label="$t('myCenter.Rememberthepassword')" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-row>
          <el-row class="btn-area">
            <el-button type="primary" @click="submitLogin('loginForm')">{{$t('myCenter.Loginnow')}}</el-button>
          </el-row>
        </el-form>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import {
  loginHandle,
  getRememberPassword
} from "common/loginHandle/loginHandle.js";
export default {
  name: "LoginDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dialogVisible() {
      //弹出窗打开时，赋值记住密码
      if (this.dialogVisible) {
        this.form = {
          username: "",
          password: "",
          remember: false
        };
        getRememberPassword(this.form);
      }
    }
  },
  data() {
    return {
      form: {
        username: "",
        password: "",
        remember: false
      },
      rules: {
        username: [
          {
            required: true,
            message: this.$t("myCenter.Pleaseenterusername"),
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: this.$t("myCenter.Pleaseenterpassword"),
            trigger: "blur"
          }
        ]
      },
      loginStatus: false
    };
  },
  methods: {
    handleClose() {
      document.body.removeChild(document.getElementById("login-dialog-modal"));
      this.$emit("dialogClose");
    },
    submitLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginStatus = false;
          loginHandle(
            this,
            this.form,
            () => {
              //登录成功提示
              this.$message({
                message: this.$t("myCenter.LoginSuccessfully"),
                type: "success"
              });
              this.handleClose();
              location.reload();
            },
            error => {
              if (error.data && error.data.status === 405) {
                this.loginStatus = true;
              }
            }
          );
        } else {
          return false;
        }
      });
    },
    openDialog() {
      var zindex = document.getElementsByClassName("login-dialog-pop")[0]
        .parentNode.style.zIndex;
      var div = document.createElement("div");
      div.style = "z-index:" + (Number(zindex) - 1) + ";";
      div.className = "v-modal";
      div.id = "login-dialog-modal";
      document.body.appendChild(div);
      this.$refs.loginForm.clearValidate();
    }
  }
};
</script>

<style lang='scss' scoped>

.login-dialog {
  border-radius: 3px;
  /deep/.el-dialog__body {
    padding: 10px 40px;
  }
  .dialog-body {
    padding-top: 30px;
    .dialog-body-header {
      height: 42px;
      margin-bottom: 48px;
      .el-image {
        height: 42px;
        width: 140px;
        margin-right: 30px;
        vertical-align: bottom;
      }
      .header-font {
        font-size: 30px;
        vertical-align: bottom;
      }
    }
    .el-form {
      .el-form-item {
        margin-bottom: 20px;
      }
      .remember-password {
        text-align: right;
        margin-bottom: 16px;
      }
      .btn-area {
        margin-bottom: 16px;
        .el-button {
          width: 100%;
        }
      }
      .login-fail-msg {
        color: red;
        font-size: 14px;
      }
    }
  }
}
.manage-dialog {
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
}

#app {
  .login-dialog {
    /deep/ .is-checked .el-checkbox__inner {
      background: #409eff;
      border-color: #409eff;
    }
    /deep/ .el-checkbox__input .el-checkbox__inner:hover {
      border-color: #409eff;
    }
    /deep/ .is-checked .el-checkbox__label {
      color: #409eff;
    }
    /deep/ .el-checkbox__label:hover {
      color: #409eff;
    }
    /deep/.el-input__inner:focus {
      border: 1px solid #409eff;
    }
    /deep/.el-textarea__inner:focus {
      border: 1px solid #409eff;
    }
  }
}
</style>
<style>
/*弹出窗关闭按钮*/
.login-dialog-pop
  .el-dialog__header
  .el-dialog__headerbtn:focus
  .el-dialog__close {
  color: #3691e9 !important;
}
.login-dialog-pop
  .el-dialog__header
  .el-dialog__headerbtn:hover
  .el-dialog__close {
  color: #3691e9 !important;
}
</style>
