<template>
  <div :style="'height:'+(this.height-51)+'px;'" class="map-container">
    <div class="go-back-icon" @click="goback" v-show="previewStatus">
      <i class="el-icon-arrow-left"></i>
    </div>
    <iframe
      src="/thirdParty/kqwebmap/applications/app/index.html"
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="auto"
      id="mapFrame"
      :class="{'top':currentShow=='mapFrame'}"
      class="frame"
    ></iframe>
    <iframe
      src="/thirdParty/kqwebmap/applications/app/index.html"
      frameborder="0"
      width="100%"
      height="100%"
      scrolling="auto"
      id="mapFrameCopy"
      :class="{'top':currentShow=='mapFrameCopy'}"
      class="frame"
    ></iframe>
  </div>
</template>

<script>
import { Loading } from "element-ui";
var loading;

function startLoading() {
  loading = Loading.service({
    lock: false,
    text: this.$t("webAppBuilder.Configuring") + "...",
    spinner: "el-icon-loading",
    target: ".map-container",
    background: "rgba(244,243,243,0)"
  });
}

function endLoading() {
  if (loading) {
    loading.close();
  }
}
export default {
  name: "MapArea",
  props: {
    height: {
      type: Number,
      default: 700
    },
    reloadTimeStamp: {
      default: 0
    },
    configXML: {
      type: String,
      default: ""
    },
    infoQueryConfigXML: {
      type: String,
      default: ""
    },
    advancedSearchConfigXML: {
      type: String,
      default: ""
    },
    overlayAnalysisConfigXML: {
      type: String,
      default: ""
    },
    searchBarConfigXML: {
      type: String,
      default: ""
    },
    previewStatus: {
      type: Boolean,
      default: false
    }
  },
  // computed:{
  //   style(){
  //     if(this.previewStatus){
  //       return "height:100%;width:100%;margin:0;"
  //     }
  //     else{
  //       return 'height:'+(this.height-51)+'px;'
  //     }
  //   }
  // },
  data() {
    return {
      currentLoadFrame: "", //当前需要加载的Frame
      currentReloadFrame: "", //当前需要重新加载的Frame
      loadTaskStatus: true, //加载任务状态
      reloadTaskStatus: true, //重新加载任务状态
      mapFrameLoadStatus: false, //加载完成状态
      mapFrameCopyLoadStatus: false, //加载完成状态
      currentShow: "mapFrame", //当前显示
      loading: null //加载
    };
  },
  watch: {
    mapFrameLoadStatus() {
      if (this.mapFrameLoadStatus) {
        this.mapFrameLoad();
        // endLoading();
        // if(this.loading){
        //   this.loading.close();
        // }
      }
    },
    mapFrameCopyLoadStatus() {
      if (this.mapFrameCopyLoadStatus) {
        this.mapFrameCopyLoad();
        // endLoading();
        // if(this.loading){
        //   this.loading.close();
        // }
      }
    },
    reloadTimeStamp() {
      this.resetTask();
    }
  },
  computed:{
    lang(){
      if(this.$store.getters.language=='chinese'){
        return 'zn';
      }
      else{
        return 'en';
      }
    }
  },
  methods: {
    resetTask() {
      // this.loading=Loading.service({
      //   lock: false,
      //   text: "配置中...",
      //   spinner:"el-icon-loading",
      //   target:'.map-container',
      //   background: 'rgba(244,243,243,0)'
      // })
      // startLoading();
      if (this.currentLoadFrame == "") {
        //初次加载
        //写入加载任务
        this.currentLoadFrame = "mapFrame";
        this.loadTaskStatus = false;
        this.mapFrameLoad();
      } else if (this.currentLoadFrame == "mapFrame") {
        //写入加载任务
        this.currentLoadFrame = "mapFrameCopy";
        this.loadTaskStatus = false;
        //写入重载任务
        // this.currentReloadFrame='mapFrame';
        this.currentReloadFrame = "mapFrameCopy";
        this.reloadTaskStatus = false;
        // this.mapFrameCopyLoad();
        this.mapFrameCopyReload();
      } else {
        //写入加载任务
        this.currentLoadFrame = "mapFrame";
        this.loadTaskStatus = false;
        //写入重载任务
        // this.currentReloadFrame='mapFrameCopy';
        this.currentReloadFrame = "mapFrame";
        this.reloadTaskStatus = false;
        // this.mapFrameLoad();
        this.mapFrameReload();
      }
    },
    mapFrameLoad() {
      //加载
      if (
        this.mapFrameLoadStatus &&
        !this.loadTaskStatus &&
        this.currentLoadFrame == "mapFrame" &&
        this.configXML
      ) {
        var mapFrameContentWindow = document.getElementById("mapFrame")
          .contentWindow;
        mapFrameContentWindow.initMap({
          configXML: this.configXML,
          infoQueryConfigXML: this.infoQueryConfigXML,
          advancedSearchConfigXML: this.advancedSearchConfigXML,
          overlayAnalysisConfigXML: this.overlayAnalysisConfigXML,
          searchBarConfigXML: this.searchBarConfigXML
        },this.lang);
        this.currentShow = "mapFrame";
        this.loadTaskStatus = true;
        //重载
        // this.mapFrameCopyReload();
      }
    },
    mapFrameReload() {
      if (
        this.mapFrameLoadStatus &&
        !this.reloadTaskStatus &&
        this.currentReloadFrame == "mapFrame"
      ) {
        var mapFrameContentWindow = document.getElementById("mapFrame")
          .contentWindow;
        mapFrameContentWindow.reload();
        this.reloadTaskStatus = true;
        this.mapFrameLoadStatus = false;
      }
    },
    mapFrameCopyLoad() {
      if (
        this.mapFrameCopyLoadStatus &&
        !this.loadTaskStatus &&
        this.currentLoadFrame == "mapFrameCopy" &&
        this.configXML
      ) {
        var mapFrameCopyContentWindow = document.getElementById("mapFrameCopy")
          .contentWindow;
        mapFrameCopyContentWindow.initMap({
          configXML: this.configXML,
          infoQueryConfigXML: this.infoQueryConfigXML,
          advancedSearchConfigXML: this.advancedSearchConfigXML,
          overlayAnalysisConfigXML: this.overlayAnalysisConfigXML,
          searchBarConfigXML: this.searchBarConfigXML
        },this.lang);
        this.currentShow = "mapFrameCopy";
        this.loadTaskStatus = true;
        //重载
        // this.mapFrameReload();
      }
    },
    mapFrameCopyReload() {
      if (
        this.mapFrameCopyLoadStatus &&
        !this.reloadTaskStatus &&
        this.currentReloadFrame == "mapFrameCopy"
      ) {
        var mapFrameCopyContentWindow = document.getElementById("mapFrameCopy")
          .contentWindow;
        mapFrameCopyContentWindow.reload();
        this.reloadTaskStatus = true;
        this.mapFrameCopyLoadStatus = false;
      }
    },
    goback() {
      this.$emit("cancelPreview");
    }
  },
  mounted() {
    // this.resetTask();
    var mapFrameFun = () => {
      this.mapFrameLoadStatus = true;
    };
    var mapFrameCopyFun = () => {
      this.mapFrameCopyLoadStatus = true;
    };
    var mapFrame = document.getElementById("mapFrame");
    var mapFrameCopy = document.getElementById("mapFrameCopy");
    if (mapFrame.attachEvent) {
      mapFrame.attachEvent("onload", mapFrameFun);
    } else {
      mapFrame.onload = mapFrameFun;
    }
    if (mapFrameCopy.attachEvent) {
      mapFrameCopy.attachEvent("onload", mapFrameCopyFun);
    } else {
      mapFrameCopy.onload = mapFrameCopyFun;
    }
  }
};
</script>

<style lang='scss' scoped>
.map-container {
  overflow: hidden;
  transition: margin 0.5s;
  position: relative;
}
.frame {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
}
.top {
  z-index: 100;
}
.go-back-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 44px;
  z-index: 101;
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.6);
  }
  i {
    display: inline-block;
    width: 20px;
    height: 20px;
    font-size: 20px;
    color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}
</style>