<template>
  <div class="main-content">
    <el-row>
      <el-col :span="14">
        <div class="left-content">
          <img src="~app/serverManager/images/login/login_leftimg.png" alt="login-left" class="left-content-img" />
        </div>
      </el-col>
      <el-col :span="10">
        <div class="right-content">
          <div class="right-content-form">
            <div class="right-content-logintext">
              <span class="logintext-left">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span class="logintext-center">登录</span>
              <span class="logintext-right">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </span>
            </div>
            <el-form ref="loginForm" :model="form" :rules="rules">
              <el-form-item prop="username">
                <el-input
                  prefix-icon="el-icon-s-custom"
                  v-model="form.username"
                  :placeholder="'请输入用户名'"
                  @keyup.enter.native="submitLogin('loginForm')"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  type="password"
                  prefix-icon="el-icon-lock"
                  v-model="form.password"
                  :placeholder="'请输入密码'"
                  @keyup.enter.native="submitLogin('loginForm')"
                ></el-input>
              </el-form-item>
              <p
                class="login-fail-msg"
                v-show="loginStatus"
              >用户名或密码错误</p>
              <el-form-item>
                <el-row>
                  <el-col :span="14" class="login-btn">
                    <el-button
                      type="primary"
                      @click="submitLogin('loginForm')"
                    >立即登录</el-button>
                  </el-col>
                  <el-col :span="10" class="login-save">
                    <el-checkbox-group v-model="form.remember">
                      <el-checkbox :label="'记住密码'" name="type"></el-checkbox>
                    </el-checkbox-group>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {loginHandle,getRememberPassword} from "app/serverManager/commonHandle/loginHandle/loginHandle.js";
export default {
  name: "LoginContent",
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
            message: '请输入用户名',
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
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
          loginHandle(this,this.form,()=>{
            this.$router.push("/index");
          },()=>{
            this.loginStatus=true;
          })
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
.main-content {
  width: 950px;
  margin: 0 auto;
  background: #fff;
  border-radius: 10px;
  padding: 50px;
  box-shadow: 0px 0px 6px #999;
}
.left-content {
  height: 380px;
  line-height: 380px;
  border-right: 1px solid;
  border-image: linear-gradient(#f6f6f6, #d0d0d0, #f6f6f6) 1 10 1;
  text-align: center;
  .left-content-img {
    width: 100%;
    max-width: 480px;
    height: 310px;
    vertical-align: middle;
  }
}
.right-content {
  height: 380px;
  padding-left: 30px;
  .right-content-form {
    padding-top: 70px;
    .right-content-logintext {
      text-align: center;
      margin-bottom: 40px;
      .logintext-left {
        i {
          display: inline-block;
          width: 8px;
          height: 10px;
          background: #6fb6ec;
          margin-left: 5px;
          transform: skewX(-45deg);
        }
        i:nth-child(7) {
          background: linear-gradient(#6fb6ec, #74baee);
        }
        i:nth-child(6) {
          background: linear-gradient(#7cbef0, #85c4ef);
        }
        i:nth-child(5) {
          background: linear-gradient(#8ec5ec, #9dcdf1);
        }
        i:nth-child(4) {
          background: linear-gradient(#a6d3f4, #b3d8f3);
        }
        i:nth-child(3) {
          background: linear-gradient(#c1e1f8, #d0e5f6);
        }
        i:nth-child(2) {
          background: linear-gradient(#daecfa, #e3f1fc);
        }
        i:nth-child(1) {
          background: linear-gradient(#f4f9fd, #fafbfd);
        }
      }
      .logintext-center {
        font-size: 18px;
        font-weight: bold;
        color: #3e3e3e;
        margin: 0 20px;
      }
      .logintext-right {
        i {
          display: inline-block;
          width: 8px;
          height: 10px;
          margin-right: 5px;
          background: #6fb6ec;
          transform: skewX(45deg);
        }
        i:nth-child(1) {
          background: linear-gradient(#6fb6ec, #74baee);
        }
        i:nth-child(2) {
          background: linear-gradient(#7cbef0, #85c4ef);
        }
        i:nth-child(3) {
          background: linear-gradient(#8ec5ec, #9dcdf1);
        }
        i:nth-child(4) {
          background: linear-gradient(#a6d3f4, #b3d8f3);
        }
        i:nth-child(5) {
          background: linear-gradient(#c1e1f8, #d0e5f6);
        }
        i:nth-child(6) {
          background: linear-gradient(#daecfa, #e3f1fc);
        }
        i:nth-child(7) {
          background: linear-gradient(#f4f9fd, #fafbfd);
        }
      }
    }
    .login-btn {
      text-align: center;
      .el-button {
        width: 100%;
      }
    }
    .login-save {
      text-align: right;
    }
    .login-fail-msg {
      color: red;
      font-size: 14px;
    }
    /deep/.el-input__prefix {
      color: #242424;
      font-size: 16px;
    }
  }
}
#app {
  .main-content {
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