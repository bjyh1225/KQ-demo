<template>
  <div class="service-center" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <service-scene-cen @getServiceDetails="getServiceDetails" v-show="!showScene" ref="mychild"></service-scene-cen>
    <service-map-details
      @getServiceDetails="getServiceDetails"
      :serviceNameData="serviceNameData"
      v-show="showScene"
      @getreturnMapShow="getreturnMapShow"
      :isDetails="isDetails"
      @againListService="againListService"
      @goToIEarth="goToIEarth"
      :defaultSrc="defaultSrc"
    ></service-map-details>
  </div>
</template>
<script>
import ServiceSceneCen from "components/serviceScene/ServiceSceneCen";
import ServiceMapDetails from "components/serviceCenter/ServiceMapDetails";

export default {
  data() {
    return {
      isDetails: {},
      showScene: false,
      serviceNameData: this.$t("service.scene"),
      defaultSrc:
        "/config/imageConfig/function/threeDimensional/threeDimensional1.png"
    };
  },
  computed: {
    active() {
      return this.$store.getters.activeMenuStatus;
    },
    homePageHeaderHeight() {
      return this.$store.getters.homePageHeaderHeight;
    }
  },
  watch: {
    active() {
      if (this.active) {
        this.showScene = false;
      }
    }
  },
  name: "ServiceScene",
  components: {
    ServiceSceneCen,
    ServiceMapDetails
  },
  mounted() {
    if (this.$route.query.id) {
      this.showScene = true;
      window.scrollTo(0,0);
      this.getServiceDetails(this.$route.query.id);
    } else {
      this.showScene = false;
    }
  },
  methods: {
    //评论更新后展示页面更新
    againListService() {
      this.$refs.mychild.getListService();
    },
    //请求  地图详情数据 0
    getServiceDetails(val) {
      this.$api.serviceSceneApi
        .getServiceDetails(
          {
            serviceId: val,
            DetailBol:true
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.data.status == 200) {
            this.$store.dispatch("menu/setActiveMenuStatus", false);
      this.showScene = true;
      window.scrollTo(0,0);
            this.isDetails = res.data.data[0];
          }
        })
        .catch(error => {
                  if (error.data.status === 391) {
                    this.againListService();
                  }
                });
    },
    getreturnMapShow(val) {
      this.showScene = val;
    },
    goToIEarth(url, type, name) {
      var openUrl = "/thirdParty/IEarth/index.html?";
      if (this.$store.getters.language == "english") {
        openUrl = openUrl + "lang=en&";
      } else {
        openUrl = openUrl + "lang=zh-cn&";
      }
      var params = "";
      // if (url.indexOf("/Images/") > -1) {
      //   params =
      //     params +
      //     "url=" +
      //     url +
      //     "/info.xml" +
      //     "&type=" +
      //     type +
      //     "&name=" +
      //     name;
      // } else if (url.indexOf("/Terrain/") > -1) {
      //   params =
      //     params + "url=" + url + "/" + "&type=" + type + "&name=" + name;
      // } else if (url.indexOf("/3DTiles/") > -1) {
      //   params =
      //     params +
      //     "url=" +
      //     url +
      //     "/tileset.json" +
      //     "&type=" +
      //     type +
      //     "&name=" +
      //     name;
      // } else {
      params = params + "url=" + url + "&type=" + type + "&name=" + name;
      // }
      // var enCodeData = window.btoa(params);
      var enCodeData = window.btoa(unescape(encodeURIComponent(params)));
      openUrl += enCodeData;
      window.open(openUrl);
    }
  }
};
</script>
<style lang="scss" scoped>
</style>