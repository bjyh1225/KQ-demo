<template>
  <div class="index-header-top-preview">
    <el-row>
      <el-col :span="10" class="left-area">
        <el-image v-if="logoUrl" :src="logoUrl" :fit="'cover'" class="logo">
          <div slot="error" class="image-slot">
            <img src="/config/imageConfig/system/logo/normalLogo/logo.png" alt />
          </div>
        </el-image>
        <el-image
          v-else
          src="/config/imageConfig/system/logo/normalLogo/logo.png"
          :fit="'cover'"
          class="logo"
        >
          <div slot="error" class="image-slot">
            <img src="/config/imageConfig/system/logo/normalLogo/logo.png" alt />
          </div>
        </el-image>
      </el-col>
      <el-col :span="14" class="right-area">
        <div class="menu-area">
          <el-menu :default-active="activeMenu" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">示例菜单</el-menu-item>
            <el-menu-item index="2">示例菜单</el-menu-item>
            <el-menu-item index="3">示例菜单</el-menu-item>
            <el-menu-item index="4">示例菜单</el-menu-item>
          </el-menu>
        </div>
        <div class="separator">
          <i></i>
        </div>
        <div class="user-area">
          <div class="need-login">
            <span class="go-to-login">{{$t('webTitle.login')}}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "IndexHeaderTopPreview",
  props() {
    return {
      current: {
        type: Object,
        default: () => {
          return {};
        }
      }
    };
  },
  data() {
    return {
      activeMenu: "1",
      logoUrl: ""
    };
  },
  computed: {
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
    current() {
      this.logoUrl = this.current.imgList[0].url;
    }
  }
};
</script>

<style lang='scss' scoped>
.index-header-top-preview {
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
      vertical-align: middle;
      .el-menu {
        background: none;
        border: none;
        .el-menu-item {
          font-size: 15px;
          color: #fff;
          height: 66px;
          line-height: 66px;
          padding: 0 12px;
          border: none;
          &:hover {
            color: #fff;
            background: none;
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
      margin-right: 30px;
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
  }
}
</style>