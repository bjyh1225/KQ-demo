<template>
  <div>
    <div class="index-header-top">
      <el-row>
        <el-col :span="7" class="left-area">
          <el-image src="/config/imageConfig/system/portalOnline/logo/logo.png" class="logo"></el-image>
        </el-col>
        <el-col :span="17" class="right-area">
          <div class="menu-area">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">首页</el-menu-item>
              <el-menu-item index="2">资源</el-menu-item>
              <el-menu-item index="3">制图</el-menu-item>
              <el-menu-item index="4">场景</el-menu-item>
              <el-menu-item index="5">大屏</el-menu-item>
              <el-menu-item index="app">应用</el-menu-item>
              <el-menu-item index="7">群组</el-menu-item>
              <el-menu-item index="8">文档</el-menu-item>
              <el-menu-item index="9">购买</el-menu-item>
            </el-menu>
          </div>
          <div class="separator">
            <i></i>
          </div>
          <div class="user-area">
            <div class="need-login">
              <router-link to="/login" class="go-to-login">{{$t('webTitle.login')}}</router-link>
            </div>
            <div class="language-area">
              <el-dropdown class="switch-language">
                <span class="el-dropdown-link">
                  <span class="language-name">
                    简体中文
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="chinese" class="index-top">简体中文</el-dropdown-item>
                  <el-dropdown-item command="english" class="index-top">English</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
            <div class="index-help-center">
              <i class="el-icon-portal-wenhao_huabanfuben"></i>
            </div>
          </div>
        </el-col>
      </el-row>
      <login-dialog :dialogVisible="loginDialogVisible" @dialogClose="loginDialogClose"></login-dialog>
    </div>
    <router-view />
  </div>
</template>

<script>
import LoginDialog from '../../components/login/LoginDialog'
export default {
  name: "Index",
  components:{
    LoginDialog
  },
  data() {
    return {
      activeIndex: "1",
      loginDialogVisible:false
    };
  },
   methods: {
    loginDialogClose(){
      this.loginDialogVisible=false;
    },
    handleSelect(key, keyPath){
      if(key=='app'){
        this.loginDialogVisible=true;
      }
    }
  },
};
</script>

<style lang='scss' scoped>
.index-header-top {
  height: 84px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  background: rgba(0, 0, 0, 0.1);
  .left-area {
    height: 84px;
    line-height: 84px;
    .logo {
      line-height: 84px;
      vertical-align: middle;
      margin-left: 130px;
      height: 40px;
    }
  }
  .right-area {
    font-size: 15px;
    text-align: right;
    .menu-area {
      margin-right: 10px;
      display: inline-block;
      vertical-align: bottom;
      /deep/.el-menu {
        background: none;
        border: none;
        .el-menu-item {
          font-size: 15px;
          color: #fff;
          height: 84px;
          line-height: 84px;
          padding: 0 2px;
          border: none;
          padding: 0px 10px;
          &:hover {
            color: #fff;
            background: none;
            .menu-item-name {
              box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3);
            }
          }
          &:focus {
            color: #fff;
            background: none;
          }
        }
        .is-active {
          border: none;
        }
        .is-active:after {
          content: "";
          border: solid 1px #8d5916;
          background-color: #8d5916;
          position: absolute;
          top: 28px;
          left: 0px;
          width: 48px;
          height: 25px;
          border-radius: 20px;
          z-index: -1;
        }
      }
    }
    .separator {
      height: 84px;
      line-height: 84px;
      display: inline-block;
      i {
        display: inline-block;
        height: 18px;
        width: 1px;
        background: #fff;
        vertical-align: middle;
      }
    }
    .user-area {
      height: 84px;
      line-height: 84px;
      display: inline-block;
      margin-right: 70px;
      a {
        text-decoration: none;

        &:hover {
          color: #409eff;
          background: none;
        }
      }
      .need-login {
        display: inline-block;
        .go-to-login {
          font-size: 15px;
          color: #fff;
          margin: 0 20px;
        }
      }
      .language-area {
        margin-right: 10px;
        height: 84px;
        line-height: 84px;
        color: #fff;
        display: inline-block;
        .switch-language {
          cursor: pointer;
          height: 84px;
          line-height: 84px;
          color: #fff;
          font-size: 15px;
        }
      }
      .index-help-center {
        margin-right: 15px;
        height: 84px;
        line-height: 84px;
        display: inline-block;
        i {
          color: rgba(255, 255, 255, 0.8);
          font-size: 15px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>