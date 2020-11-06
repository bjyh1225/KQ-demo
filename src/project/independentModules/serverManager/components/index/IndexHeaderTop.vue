<template>
  <div class="index-header-top">
    <el-row>
      <el-col :span="7" class="left-area">
        <el-image :src="logoUrl" class="logo"></el-image>
      </el-col>
      <el-col :span="17" class="right-area">
        <div class="menu-area">
          <el-menu
            :default-active="menuActive"
            class="el-menu-demo"
            mode="horizontal"
            @select="selectMenu"
          >
            <template v-for="item in menuList">
              <el-submenu
                :index="item.path"
                v-if="item.children&&item.children.length>0&&!item.indexMenuNoChild"
                :key="item.menuName"
              >
                <template slot="title">
                  <span class="menu-item-name">{{$t(item.menuName)}}</span>
                </template>
                <el-menu-item
                  :index="child.path"
                  v-for="child in item.children"
                  :key="child.menuName"
                  :externalLinksRouter="child.externalLinksRouter"
                >{{$t(child.menuName)}}</el-menu-item>
              </el-submenu>
              <el-menu-item :index="item.path" :key="item.menuName" :externalLinksRouter="item.externalLinksRouter" v-else>
                <span class="menu-item-name">{{$t(item.menuName)}}</span>
              </el-menu-item>
            </template>
          </el-menu>
        </div>
        <div class="separator">
          <i></i>
        </div>
        <div class="user-area">
          <div class="need-login" v-if="!isLogin">
            <router-link to="/login" class="go-to-login">登录</router-link>
          </div>
          <div class="logined" v-else>
            <el-dropdown class="logined-info" @command="userCommand">
              <span class="el-dropdown-link">
                <el-image
                  :src="'/config/imageConfig/system/defaultProfilepicture/defaultProfilePicture1.png'"
                  :fit="'cover'"
                ></el-image>
                <span class="user-name">
                  <span class="user-name-font">{{username}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout" class="index-top">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="language-area"> 
          <el-dropdown
            class="switch-language"
            @command="languageCommand"
          >
            <span class="el-dropdown-link">
              <span class="language-name">
                {{language}}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="chinese" class="index-top">简体中文</el-dropdown-item>
              <el-dropdown-item command="english" class="index-top">English</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { logoutHandle } from "app/serverManager/commonHandle/loginHandle/logoutHandle.js";
export default {
  name: "IndexHeaderTop",
  props: {
    isLogin: Boolean,
    username: String,
    pageStatus: String,
    headerInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    menuActive(){
      return this.$route.meta.indexMenuActive+this.activeName;
    },
    menuList() {
      return this.$store.getters.menus.indexMenu;
    },
    language() {
      if (this.$store.getters.language == "chinese") {
        return "简体中文";
      } else if (this.$store.getters.language == "english") {
        return "English";
      } else {
        return "";
      }
    }
  },
  methods: {
    selectMenu(index, indexPath,el) {
      if(el.$attrs.externalLinksRouter){
        this.activeName=index;
        window.open(index,"_blank");
        this.$nextTick(()=>{
          this.activeName="";
        })
      }
      else{
        this.activeName="";
        this.$router.push({path:index});
        this.$store.dispatch("menu/setActiveMenuStatus", true);
      }
    },
    languageCommand(command) {
      if (this.$store.getters.language == command) {
        return false;
      }
      this.$store.dispatch("language/setLanguage", command);
      sessionStorage.setItem("language", command);
      // eslint-disable-next-line
      vm.$i18n.locale = command;
      location.reload();
    },
    logout: function() {
      logoutHandle(this);
    },
    userCommand(command) {
      if (command == "logout") {
        this.logout();
      }
      if (command == "personalInformation") {
        this.$router.push("/manage/personalcenter/information");
      }
    }
  },
  data() {
    return {
      logoUrl:require("app/serverManager/images/logo/logo.png"),
      activeName:""
    };
  }
};
</script>

<style lang='scss' scoped>
.index-header-top {
  height: 80px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  .left-area {
    height: 80px;
    line-height: 80px;
    .logo {
      line-height: 80px;
      vertical-align: middle;
      margin-left: 30px;
      height: 40px;
    }
  }
  .right-area {
    font-size: 15px;
    text-align: right;
    .menu-area {
      margin-right: 20px;
      display: inline-block;
      vertical-align: bottom;
      .el-menu {
        background: none;
        border:none;
        .el-menu-item {
          font-size: 15px;
          color: #fff;
          height: 80px;
          line-height: 80px;
          padding: 0 2px;
          border: none;
          .menu-item-name {
            // border-radius: 4px;
            padding: 4px 20px;
          }
          &:hover {
            color: #fff;
            background: none;
            .menu-item-name {
              padding-bottom:15px;
              box-shadow:#3590e8 0px 1px 0px;
            }
          }
          &:focus {
            color: #fff;
            background: none;
          }
        }
        .el-submenu {
          /deep/ .el-submenu__title {
            font-size: 15px;
            color: #fff;
            height: 80px;
            line-height: 80px;
            padding: 0 12px;
            border: none;
            .menu-item-name {
              padding: 4px 0;
            }
            i {
              color: #fff;
            }
            &:hover {
              color: #fff;
              background: none;
            }
            &:focus {
              color: #fff;
              background: none;
            }
          }
        }
        .is-active {
          .menu-item-name {
            padding-bottom:15px;
            box-shadow:#3590e8 0px 1px 0px;
          }
        }
      }
    }
    .separator {
      height: 80px;
      line-height: 80px;
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
      height: 80px;
      line-height: 80px;
      display: inline-block;
      margin-right: 20px;
      margin-left: 36px;
      .go-to-login {
        text-decoration: none;
        color: #fff;
        font-size: 15px;
        box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.3);
        padding: 4px 10px;
        border-radius: 4px;
      }
      .logined {
        .el-image {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: #f6f6f6;
          vertical-align: middle;
          margin-right: 6px;
          margin-top: -3px;
        }
        .user-name {
          color: #fff;
          font-size: 15px;
          cursor: pointer;
          .user-name-font {
            display: inline-block;
            max-width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            vertical-align: middle;
            margin-top: -3px;
            i {
              vertical-align: middle;
              margin-top: -3px;
            }
          }
        }
      }
    }
    .language-area {
      margin-right: 20px;
      height: 80px;
      line-height: 80px;
      color: #fff;
      display: inline-block;
      .switch-language {
        cursor: pointer;
        height: 80px;
        line-height: 80px;
        color: #fff;
        font-size: 15px;
      }
    }
  }
}
</style>