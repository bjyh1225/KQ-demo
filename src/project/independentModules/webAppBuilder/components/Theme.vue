<template>
  <div>
    <div class="area">
      <div class="title app-aside-border-bottom">
        <div
          class="title-font app-aside-title-font-color app-aside-title-icon"
        >{{$t('theme.theme')}}</div>
      </div>
      <div class="content">
        <div class="theme-block">
          <div class="theme-img-container app-aside-theme-img-border">
            <div class="img defalut-theme-img"></div>
          </div>
          <p class="app-aside-normal-font-color">{{$t('webAppBuilder.DefaultTheme')}}</p>
        </div>
      </div>
    </div>
    <div class="area">
      <div class="title app-aside-border-bottom">
        <div
          class="title-font app-aside-title-font-color app-aside-title-icon"
        >{{$t('webAppBuilder.Color')}}</div>
      </div>
      <div class="content">
        <div
          class="color-block"
          v-for="item in colorList"
          :style="'background:'+item.color+';border:2px solid '+item.color+';'"
          :key="item.name"
          :class="{'is-active':color==item.color}"
          @click="chooseColor(item)"
        ></div>
      </div>
    </div>
    <div class="area layout">
      <div class="title app-aside-border-bottom">
        <div
          class="title-font app-aside-title-font-color app-aside-title-icon"
        >{{$t('webAppBuilder.Layout')}}</div>
      </div>
      <div class="content">
        <div
          class="layout-block-container"
          :class="{'is-active':layout=='first'}"
          @click="chooseLayout('first')"
        >
          <div class="layout-block">
            <div class="img layout-img-first"></div>
          </div>
          <p class="app-aside-normal-font-color">{{$t('webAppBuilder.Layout1')}}</p>
        </div>
        <div
          class="layout-block-container"
          :class="{'is-active':layout=='second'}"
          @click="chooseLayout('second')"
        >
          <div class="layout-block">
            <div class="img layout-img-second"></div>
          </div>
          <p class="app-aside-normal-font-color">{{$t('webAppBuilder.Layout2')}}</p>
        </div>
        <div
          class="layout-block-container"
          :class="{'is-active':layout=='third'}"
          @click="chooseLayout('third')"
        >
          <div class="layout-block">
            <div class="img layout-img-third"></div>
          </div>
          <p class="app-aside-normal-font-color">{{$t('webAppBuilder.Layout3')}}</p>
        </div>
        <div
          class="layout-block-container"
          :class="{'is-active':layout=='fourth'}"
          @click="chooseLayout('fourth')"
        >
          <div class="layout-block">
            <div class="img layout-img-fourth"></div>
          </div>
          <p class="app-aside-normal-font-color">{{$t('webAppBuilder.Layout4')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Theme",
  components: {},
  props: {
    configJSON: {
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
    updateDataTimeStamp() {
      this.setColor();
    }
  },
  data() {
    return {
      colorList: [
        { color: "#64a0dc", name: "default-blue" },
        { color: "#428bca", name: "fiori-blue" },
        { color: "#1984c8", name: "bootstrap-blue" },
        { color: "#0072c6", name: "silver-blue" },
        { color: "#0069a5", name: "office365-blue" },
        { color: "#3f51b5", name: "material-blue" },
        { color: "#13688c", name: "blueopal-blue" },
        { color: "#707070", name: "uniform-gray" },
        { color: "#4d4d4d", name: "black-black" },
        { color: "#363940", name: "flat-black" },
        { color: "#363636", name: "materialblack-black" },
        { color: "#212a33", name: "moonlight-black" },
        { color: "#0e0e0e", name: "metroblack-black" },
        { color: "#ff4350", name: "nova-red" },
        { color: "#dc2027", name: "default-red" },
        { color: "#870074", name: "highcontrast-purple" },
        { color: "#7ea700", name: "metro-green" }
      ],
      color: "#64a0dc",
      layout: "first"
    };
  },
  methods: {
    chooseColor(item) {
      this.color = item.color;
      this.$emit("changeTheme", item);
    },
    chooseLayout(layout) {
      this.layout = layout;
    },
    setColor() {
      //设置颜色
      if (!this.configJSON.config.theme._color) {
        this.color = "#64a0dc";
      } else {
        this.color = this.configJSON.config.theme._color;
      }
    }
  },
  mounted() {
    this.setColor();
  }
};
</script>

<style lang='scss' scoped>
.area {
  margin-left: 20px;
  margin-right: 6px;
  padding-top: 10px;
}
.layout {
  padding-top: 0px;
}
.title {
  height: 34px;
  line-height: 34px;
  .title-font {
    font-size: 14px;
    display: inline-block;
    padding-left: 10px;
    position: relative;
    &::before {
      content: "";
      display: inline-block;
      height: 14px;
      width: 4px;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      border-radius: 3px;
    }
  }
}
.content {
  margin-top: 10px;
  .theme-block {
    display: inline-block;
    .theme-img-container {
      width: 74px;
      height: 64px;
      border-radius: 4px;
      position: relative;
    }
    p {
      text-align: center;
      height: 26px;
      line-height: 26px;
      margin: 0;
      padding: 0;
      font-size: 12px;
    }
  }
  .color-block {
    display: inline-block;
    height: 36px;
    width: 36px;
    border-radius: 3px;
    margin-left: 14px;
    margin-bottom: 14px;
    box-sizing: border-box;
    cursor: pointer;
  }
  .layout-block-container {
    display: inline-block;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    .layout-block {
      height: 74px;
      width: 100px;
      border: 2px solid #d3dbe3;
      border-radius: 4px;
      position: relative;
    }
    p {
      margin: 0;
      padding: 0;
      height: 22px;
      line-height: 22px;
      text-align: center;
      font-size: 12px;
    }
  }
}
.img {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
.defalut-theme-img {
  width: 50px;
  height: 50px;
  background: url("~img/webappbuilder/toolsprite.png") -210px -10px;
}
.layout-img-first {
  width: 80px;
  height: 54px;
  background: url("~img/webappbuilder/toolsprite.png") -10px -10px;
}
.layout-img-second {
  width: 80px;
  height: 54px;
  background: url("~img/webappbuilder/toolsprite.png") -110px -10px;
}
.layout-img-third {
  width: 80px;
  height: 54px;
  background: url("~img/webappbuilder/toolsprite.png") -10px -84px;
}
.layout-img-fourth {
  width: 80px;
  height: 54px;
  background: url("~img/webappbuilder/toolsprite.png") -110px -84px;
}
</style>