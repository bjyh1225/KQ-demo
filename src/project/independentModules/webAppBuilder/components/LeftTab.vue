<template>
  <div :style="'height:'+(height-51)+'px;'" class="tab-container app-border-right">
    <div class="tab app-bg-color">
      <div
        class="tab-btn app-bg-font-color app-hover-color"
        @click="tabClick('theme')"
        :class="{'is-active':activeName=='theme','app-aside-active':activeName=='theme'}"
      >
        <i class="icon-area el-icon-portal-zhuti"></i>
        <span class="font-area">{{$t('theme.theme')}}</span>
      </div>
      <div
        class="tab-btn app-bg-font-color app-hover-color"
        @click="tabClick('layer')"
        :class="{'is-active':activeName=='layer','app-aside-active':activeName=='layer'}"
      >
        <i class="icon-area el-icon-portal-ditu1"></i>
        <span class="font-area">{{$t('webAppBuilder.Layers')}}</span>
      </div>
      <div
        class="tab-btn app-bg-font-color app-hover-color"
        @click="tabClick('widget')"
        :class="{'is-active':activeName=='widget','app-aside-active':activeName=='widget'}"
      >
        <i class="icon-area el-icon-portal-kongjianxialashu"></i>
        <span class="font-area">{{$t('webAppBuilder.Widgets')}}</span>
      </div>
      <div
        class="tab-btn app-bg-font-color app-hover-color"
        @click="tabClick('attribute')"
        :class="{'is-active':activeName=='attribute','app-aside-active':activeName=='attribute'}"
      >
        <i class="icon-area el-icon-portal-kongjian1"></i>
        <span class="font-area">{{$t('visualization.Properties')}}</span>
      </div>
      <div class="profile-photo" v-if="isLogin">
        <el-image :src="headImg" :fit="'cover'">
          <div slot="error" class="image-slot"></div>
        </el-image>
      </div>
      <div class="profile-photo" @click="profilePhotoClick" v-else>
        <el-image :src="profileLogo" :fit="'cover'">
          <div slot="error" class="image-slot"></div>
        </el-image>
      </div>
    </div>
    <div class="panel" v-show="asideStatus">
      <el-scrollbar class="scroll">
        <theme
          v-show="activeName=='theme'"
          :configJSON="configJSON"
          @changeTheme="changeTheme"
          :updateDataTimeStamp="updateDataTimeStamp"
        ></theme>
        <layer
          v-show="activeName=='layer'"
          :configJSON="configJSON"
          @save="save"
          :updateDataTimeStamp="updateDataTimeStamp"
          :activeName="activeName"
        ></layer>
        <widget
          v-show="activeName=='widget'"
          :configJSON="configJSON"
          :activeName="activeName"
          @change="changeWidget"
          :updateDataTimeStamp="updateDataTimeStamp"
          :infoQueryConfigJSON="infoQueryConfigJSON"
          :advancedSearchConfigJSON="advancedSearchConfigJSON"
          :overlayAnalysisConfigJSON="overlayAnalysisConfigJSON"
          :searchBarConfigJSON="searchBarConfigJSON"
          @directUpdateConfig="directUpdateConfig"
        ></widget>
        <attribute
          v-show="activeName=='attribute'"
          :configJSON="configJSON"
          :activeName="activeName"
          @changeAttribute="changeAttribute"
          :updateDataTimeStamp="updateDataTimeStamp"
        ></attribute>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import Theme from "./Theme";
import Layer from "./Layer";
import Widget from "./Widget";
import Attribute from "./Attribute";
export default {
  name: "LeftHeader",
  props: {
    height: {
      type: Number,
      default: 700
    },
    asideStatus: {
      type: Boolean,
      default: true
    },
    configJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    infoQueryConfigJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    advancedSearchConfigJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    overlayAnalysisConfigJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    searchBarConfigJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    updateDataTimeStamp: {
      default: 0
    }
  },
  watch: {
    asideStatus() {
      if (!this.asideStatus) {
        this.activeName = "";
      }
      if (this.asideStatus && !this.activeName) {
        this.activeName = "theme";
      }
    }
  },
  computed: {
    headImg() {
      if (this.$store.getters.userInfo.headImg) {
        return (
          "/filedownloadapi/" + this.$store.getters.userInfo.headImg + "/true"
        );
      } else {
        return require("img/default_userimg.png");
      }
    },
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  components: {
    Theme,
    Layer,
    Widget,
    Attribute
  },
  data() {
    return {
      activeName: "theme",
      profileLogo: require("img/webappbuilder/appbuilder_profilephoto.png")
    };
  },
  methods: {
    tabClick(name) {
      this.activeName = name;
      if (!this.asideStatus) {
        this.$emit("switchStatus");
      }
    },
    changeTheme(item) {
      this.$emit("changeTheme", item);
    },
    save(layerTree) {
      this.$emit("saveLayerTree", layerTree);
    },
    changeWidget(widgetList) {
      this.$emit("changeWidget", widgetList);
    },
    changeAttribute(attributeData) {
      this.$emit("changeAttribute", attributeData);
    },
    directUpdateConfig() {
      this.$emit("directUpdateConfig");
    },
    profilePhotoClick() {
      if (!this.isLogin) {
        this.$store.dispatch("common/setEventInfo", {
          commonTimeStamp: new Date().getTime(),
          commonEventType: "goToLogin",
          commonSource: "server",
          commonParams: {}
        });
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.tab {
  // background: #273142;
  width: 60px;
  float: left;
  height: 100%;
  .tab-btn {
    height: 72px;
    line-height: 72px;
    text-align: center;
    // color: #fff;
    cursor: pointer;
    position: relative;
    // &:hover{
    //   color:#3691e9;
    // }
    i {
      font-size: 20px;
      display: inline-block;
      position: absolute;
      width: 20px;
      height: 20px;
      top: -20px;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    span {
      font-size: 16px;
      display: inline-block;
      position: absolute;
      height: 18px;
      top: -22px;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
  // .is-active{
  //   color:#3691e9;
  //   background: #fff;
  // }
}
.panel {
  margin-left: 60px;
  width: 288px;
  height: 100%;
  .scroll {
    height: 100%;
  }
  /deep/ .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
.tab-container {
  // border-right:1px solid #525a68;
  box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 110;
  transition: width 0.5s;
  overflow: hidden;
}
//头像
.profile-photo {
  width: 32px;
  height: 32px;
  position: absolute;
  bottom: 20px;
  left: 14px;
  cursor: pointer;
  .el-image {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    /deep/.image-slot {
      background: #fff;
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
  }
}
[data-language='english'] .tab {
  .tab-btn {
    span {
      font-size:12px;
    }
  }
}
</style>