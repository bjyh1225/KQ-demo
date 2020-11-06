<template>
  <div id="portal-head">
    <div class="portal-head-left">{{$t('portalStatistics.PortalStatistics')}}</div>
    <div class="portal-head-right">
      {{$t('portalStatistics.BackgroundEffect')}}：
      <el-switch v-model="backgroundStyle" @change="backgroundStyleChange"></el-switch>&nbsp;&nbsp;&nbsp;
      <el-dropdown @command="signOutCommand">
        <span class="el-dropdown-link">
          {{this.$store.getters.userInfo.username }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="signOut">{{$t('pageHeader.signOut')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-dropdown class="switch-language" @command="languageCommand">
        <span class="el-dropdown-link">
          <span class="user-name">
            {{language}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="chinese" class="index-top">简体中文</el-dropdown-item>
          <el-dropdown-item command="english" class="index-top">English</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-divider direction="vertical"></el-divider>
      <span @click="back" class="back">{{$t('service.back')}}</span>
    </div>
  </div>
</template>
<script>
import { logoutHandle } from "common/loginHandle/logoutHandle.js";
export default {
  name: "PortalStatisticsHead",
  data() {
    return {
      backgroundStyle: true,
      i: 0
    };
  },
  computed: {
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
  watch: {
    $route() {
      this.i++;
    }
  },
  methods: {
    //语言切换
    languageCommand(command) {
      this.$store.dispatch("language/setLanguage", command);
      sessionStorage.setItem("language", command);
      // eslint-disable-next-line
      vm.$i18n.locale = command;
      location.reload();
    },
    signOutCommand() {
      logoutHandle(this); //退出
    },
    back() {
      window.history.go(-(this.i + 1));
      // this.$router.go(-(this.i + 1));
      this.i = 0;
     
    },
    backgroundStyleChange() {
      this.$emit("backgroundStyleFun", this.backgroundStyle);
    }
  }
};
</script>
<style lang="scss" scoped>
#portal-head {
  height: 49px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  background-color: rgba(186, 211, 245, 0.1);
  border-bottom: 1px solid rgba(33, 75, 121, 0.8);
  .portal-head-left {
    float: left;
  }
  .portal-head-right {
    z-index: 10;
    float: right;
    padding-right: 26px;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.6);
    .back:hover {
      cursor: pointer;
    }
    .el-dropdown {
      cursor: pointer;
      color: rgba(255, 255, 255, 0.6);
    }
    .el-divider {
      background-color: rgba(255, 255, 255, 0.6);
      margin: 0 14px;
    }
    /deep/.el-switch.is-checked .el-switch__core {
      background-color: #3691e9;
      border-color: #3691e9;
    }
  }
  .switch-language {
    margin-left: 20px;
    cursor: pointer;
    color: rgba(255, 255, 255, 0.6);
  }
}
</style>