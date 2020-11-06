<template>
  <div class="scene-builder">
    <external-iframe :src="src" @goback="goback" :hideBtnList="hideBtnList" :startRight="10"></external-iframe>
  </div>
</template>
<script>
import ExternalIframe from "portal/components/common/externalIframe/ExternalIframe";
export default {
  name: "SceneBuilder",
  components: {
    ExternalIframe
  },
  data() {
    return {
      src: "/thirdParty/IEarth/index.html",
      hideBtnList: ["add", "open", "save", "preview", "share", "download"]
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
.scene-builder {
  position: relative;
  font-size: 0;
  height: 0;
}
</style>
