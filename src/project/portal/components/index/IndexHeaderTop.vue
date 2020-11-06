<template>
  <div class="index-header-top">
    <el-row>
      <el-col :span="7" class="left-area">
        <!-- <el-image src="/config/imageConfig/system/logo/normalLogo/logo.png" class="logo"></el-image> -->
        <el-image v-if="logoUrl" :src="logoUrl" :fit="'contain'" class="logo">
          <div slot="error" class="image-slot">
            <img src="/config/imageConfig/system/logo/normalLogo/logo.png" alt />
          </div>
        </el-image>
        <el-image
          v-else
          src="/config/imageConfig/system/logo/normalLogo/logo.png"
          :fit="'contain'"
          class="logo"
        >
          <div slot="error" class="image-slot">
            <img src="/config/imageConfig/system/logo/normalLogo/logo.png" alt />
          </div>
        </el-image>
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
              <el-menu-item
                :index="item.path"
                :key="item.menuName"
                :externalLinksRouter="item.externalLinksRouter"
                v-else
              >
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
            <router-link to="/login" class="go-to-login">{{$t('webTitle.login')}}</router-link>
          </div>
          <div class="logined" v-else :class="{'message-notification':messageNum>0}">
            <el-dropdown class="logined-info" @command="userCommand">
              <span class="el-dropdown-link">
                <el-image v-if="imagesHade" :src="headImg"></el-image>
                <el-image
                  v-else
                  :src="'/config/imageConfig/system/defaultProfilepicture/defaultProfilePicture1.png'"
                  :fit="'cover'"
                ></el-image>
                <span class="user-name">
                  <span class="user-name-font">{{username}}</span>
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  command="personalInformation"
                  class="index-top"
                >{{$t('navMenu.personalInformation')}}</el-dropdown-item>
                <el-dropdown-item command="myMessage" class="index-top">
                  {{$t('indexPage.MyMessage')}}
                  <i
                    style="display: inline-block;width: 6px;height: 6px;background: red;border-radius: 50%;margin-left: 10px;vertical-align: middle;"
                    v-if="messageNum>0"
                  ></i>
                </el-dropdown-item>
                <el-dropdown-item
                  command="switchtheme"
                  class="index-top"
                  v-if="switchThemeStatus"
                >{{$t('pageHeader.switchTheme')}}</el-dropdown-item>
                <!-- <el-dropdown-item
                  command="switchUser"
                  class="index-top"
                >切换账号</el-dropdown-item>-->
                <el-dropdown-item command="logout" class="index-top">{{$t('pageHeader.signOut')}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="language-area" v-if="switchLanguageStatus">
          <el-dropdown class="switch-language" @command="languageCommand">
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
        <div class="index-help-center">
          <i class="el-icon-portal-wenhao_huabanfuben" @click="goToHelpCenter"></i>
        </div>
      </el-col>
    </el-row>
    <theme-dialog :dialogVisible="themeStatus" @dialogClose="dialogClose"></theme-dialog>
  </div>
</template>

<script>
import ThemeDialog from "components/theme/ThemeDialog";
import { logoutHandle } from "common/loginHandle/logoutHandle.js";
export default {
  name: "IndexHeaderTop",
  components: {
    ThemeDialog
  },
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
    imagesHade() {
      return this.$store.getters.userInfo.headImg;
    },
    menuActive() {
      return this.$route.meta.indexMenuActive + this.activeName;
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
    },
    messageNum() {
      return this.$store.getters.messageNum;
    },
    time() {
      return this.$store.getters.commonTimeStamp;
    }
  },
  watch: {
    time() {
      var type = this.$store.getters.commonEventType;
      var source = this.$store.getters.commonSource;
      if (
        type == "changeLogo" &&
        source == "visualizationIndexHeaderPorpertySet"
      ) {
        this.logoUrl = this.$store.getters.commonParams;
      }
    },
    "headerInfo.imgList": {
      deep: true,
      handler() {
        if (this.headerInfo.imgList.length > 0) {
          this.logoUrl = this.headerInfo.imgList[0].url;
        }
      }
    }
  },
  methods: {
    selectMenu(index, indexPath, el) {
      if (el.$attrs.externalLinksRouter) {
        this.activeName = index;
        window.open(index, "_blank");
        this.$nextTick(() => {
          this.activeName = "";
        });
      } else {
        this.activeName = "";
        this.$router.push({ path: index });
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
    switchtheme() {
      //切换主题
      this.themeStatus = true;
    },
    dialogClose() {
      this.themeStatus = false;
    },
    userCommand(command) {
      if (command == "logout") {
        this.logout();
      }
      if (command == "switchtheme") {
        this.switchtheme();
      }
      if (command == "personalInformation") {
        this.$router.push("/manage/personalcenter/information");
      }
      if (command == "myMessage") {
        //查看全部消息
        this.$store.dispatch("message/setMessageAction", {});
        setTimeout(() => {
          this.$store.dispatch("message/setMessageAction", {
            source: "index",
            action: "getAllMessage"
          });
        });
        this.$router.push("/manage/personalcenter/message");
      }
      if (command == "switchUser") {
        this.$router.push("/login");
      }
    },
    goToHelpCenter() {
      this.$router.push({ path: "/helpcenter" });
    }
  },
  data() {
    return {
      switchLanguageStatus: true,
      switchThemeStatus: true,
      themeStatus: false,
      headImg:
        "/filedownloadapi/" + this.$store.getters.userInfo.headImg + "/true",
      logoUrl: "",
      activeName: ""
    };
  },
  mounted() {
    // eslint-disable-next-line
    if (portal_config.NO_SWITCH_LANGUAGE) {
      this.switchLanguageStatus = false;
    } else {
      this.switchLanguageStatus = true;
    }
    // eslint-disable-next-line
    if (portal_config.NO_SWITCH_THEME) {
      this.switchThemeStatus = false;
    } else {
      this.switchThemeStatus = true;
    }
  }
};
</script>

<style lang='scss' scoped>
.index-header-top {
  height: 66px;
  width: 100%;
  background: rgba(0, 0, 0, 0.1);
  .left-area {
    height: 66px;
    line-height: 66px;
    .logo {
      line-height: 66px;
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
        border: none;
        .el-menu-item {
          font-size: 15px;
          color: #fff;
          height: 66px;
          line-height: 66px;
          padding: 0 2px;
          border: none;
          .menu-item-name {
            border-radius: 4px;
            padding: 4px 10px;
          }
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
        .el-submenu {
          /deep/ .el-submenu__title {
            font-size: 15px;
            color: #fff;
            height: 66px;
            line-height: 66px;
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
          border: none;
        }
      }
    }
    .separator {
      height: 66px;
      line-height: 66px;
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
      height: 66px;
      line-height: 66px;
      display: inline-block;
      margin-right: 15px;
      margin-left: 20px;
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
      margin-right: 10px;
      height: 66px;
      line-height: 66px;
      color: #fff;
      display: inline-block;
      .switch-language {
        cursor: pointer;
        height: 66px;
        line-height: 66px;
        color: #fff;
        font-size: 15px;
      }
    }
    .index-help-center {
      margin-right: 15px;
      height: 66px;
      line-height: 66px;
      display: inline-block;
      i {
        color: rgba(255, 255, 255, 0.8);
        font-size: 15px;
        cursor: pointer;
      }
    }
  }

  .message-notification {
    position: relative;
    &::after {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;
      background: red;
      position: absolute;
      top: 17px;
      left: 19px;
      border-radius: 50%;
    }
  }
}
</style>