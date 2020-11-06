<template>
  <div class="external-iframe-container">
    <assistive-touch
      :hideBtnList="hideBtnList"
      @goback="goback"
      @share='share'
      :startRight="startRight"
      :startTop="startTop"
      :source='source'
    ></assistive-touch>
    <iframe :src="src" frameborder="0" width="100%" id="externalIframe" scrolling="auto"></iframe>
  </div>
</template>
<script>
import AssistiveTouch from "portal/components/common/assistiveTouch/AssistiveTouch";
export default {
  name: "ExternalIframe",
  components: {
    AssistiveTouch
  },
  props: {
    src: {
      type: String,
      default: ""
    },
    goBackShow: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 0
    },
    noLoading: {
      type: Boolean,
      default: false
    },
    hideBtnList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    startRight: {
      type: Number,
      default: 100
    },
    startTop: {
      type: Number,
      default: 100
    },
    source: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      loading: "",
      animateStatus: false
    };
  },
  methods: {
    goback() {
      document.getElementById("preloader").style.display = "none";
      this.$emit("goback");
    },
    add() {
      this.$emit("add");
    },
    open() {
      this.$emit("open");
    },
    save() {
      this.$emit("save");
    },
    preview() {
      this.$emit("preview");
    },
    share() {
      this.$emit("share");
    },
    download() {
      this.$emit("download");
    }
  },
  mounted() {
    if (!this.noLoading) {
      document.getElementById("preloader").style.display = "block";
    }
    // this.animateStatus=true;
    var externalIframe = document.getElementById("externalIframe");
    if (this.height == 0) {
      var height =
        document.documentElement.clientHeight ||
        document.body.clientHeight ||
        "700";
      externalIframe.height = height;
    } else {
      externalIframe.height = this.height;
    }

    var externalIframeOnLoad = () => {
      // this.animateStatus=false;
      document.getElementById("preloader").style.display = "none";
      var externalIframeWindow = document.getElementById("externalIframe")
          .contentWindow;
      this.$emit("iframeLoadComplete",externalIframeWindow);
    };
    if (externalIframe.attachEvent) {
      externalIframe.attachEvent("onload", externalIframeOnLoad);
    } else {
      externalIframe.onload = externalIframeOnLoad;
    }
  }
};
</script>
<style lang="scss" scoped>
.external-iframe-container {
  position: relative;
  font-size: 0;
  height: 0;
}
.go-back-icon {
  width: 70px;
  height: 40px;
  // border-radius: 50%;
  background: rgba(0, 0, 0, 0.6);
  position: absolute;
  top: 0;
  right: 0;
  z-index: 101;
  cursor: pointer;
  // line-height: 40px;
  // text-align: center;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
  i {
    display: inline-block;
    text-align: center;
    width: 70px;
    height: 18px;
    font-size: 18px;
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
