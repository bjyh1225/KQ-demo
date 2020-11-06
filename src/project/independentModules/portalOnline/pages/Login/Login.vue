<template>
  <div class="login">
    <el-row class="login-header">
      <el-col :span="20">
        <el-image
          src="/config/imageConfig/system/portalOnline/logo/logo.png"
          :fit="'cover'"
          class="login-logo"
        ></el-image>
      </el-col>
      <el-col :span="4">
        <router-link to="/">{{$t('myCenter.Homepage')}}</router-link>
      </el-col>
    </el-row>
    <div class="bg-container">
      <div class="main-content">
        <div class="content-right-title">用户登录</div>
        <el-form ref="loginForm" :model="form" :rules="rules">
          <el-form-item prop="username">
            <el-input
              prefix-icon="el-icon-s-custom"
              v-model="form.username"
              :placeholder="$t('myCenter.Pleaseenterusername')"
              @keyup.enter.native="submitLogin('loginForm')"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              type="password"
              prefix-icon="el-icon-lock"
              v-model="form.password"
              :placeholder="$t('myCenter.Pleaseenterpassword')"
              @keyup.enter.native="submitLogin('loginForm')"
            ></el-input>
          </el-form-item>
          <p
            class="login-fail-msg"
            v-show="loginStatus"
          >{{$t('myCenter.Theusernameorpasswordisincorrect')}}</p>
          <el-form-item>
            <el-button type="primary" @click="submitLogin('loginForm')">{{$t('myCenter.Loginnow')}}</el-button>
            <el-checkbox-group v-model="form.remember">
              <el-checkbox :label="$t('myCenter.Rememberthepassword')" name="type"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </div>
      <div class="bg-footer">
        <p>{{$t('myCenter.Copyright2019KQGEOTechnologiesAllrightsreserved')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  loginHandle,
  getRememberPassword
} from "common/loginHandle/loginHandle.js";
export default {
  name: "Login",
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
    submitLogin: function(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loginStatus = false;
          loginHandle(
            this,
            this.form,
            () => {
              this.$router.push("/index");
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
    }
  },
  mounted() {
    getRememberPassword(this.form);
  }
};
</script>

<style lang='scss' scoped>
.login-header {
  position: absolute;
  top: 30px;
  left: 0;
  z-index: 999;
  width: 100%;
  .login-logo {
    width: 260px;
    height: 38px;
    vertical-align: middle;
    margin-left: 206px;
    /deep/.image-slot {
      vertical-align: inherit;
      img {
        vertical-align: inherit;
      }
    }
  }
  a {
    text-decoration: none;
    color: #fff;
    &:hover {
      color: #409eff;
      background: none;
    }
  }
}
.bg-container {
  width: 100%;
  height: 600px;
  padding-top: 180px;
  background: url("/config/imageConfig/system/portalOnline/login/login_bg.jpg")
    no-repeat center;
  background-size: cover;
  .main-content {
    width: 378px;
    border-radius: 10px;
    height: 484px;
    position: absolute;
    right: 24%;
    .content-right-title {
      color: #fff;
      font-size: 18px;
      margin: 78px 0;
    }
    /deep/.el-checkbox-group {
      position: absolute;
      right: 0px;
      display: inline-block;
      .el-checkbox__label {
        color: #fff;
      }
    }
    .el-button--primary {
      background-color: #f0ae51;
      border-color: #f0ae51;
      width: 60%;
    }
  }
  .bg-footer {
    margin-top: 550px;
    p {
      text-align: center;
      color: #fff;
    }
  }
}
</style>