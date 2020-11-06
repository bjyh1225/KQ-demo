<template>
  <div class="app-menu" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <web-dash-board-builder @getAppDetails="getAppDetails" ref="mychild" v-show="!showAppCenter"></web-dash-board-builder>
    <service-map-details
      @getServiceDetails="getAppDetails"
      :serviceNameData="serviceNameData"
      v-show="showAppCenter"
      @getreturnMapShow="getreturnMapShow"
      :isDetails="isDetails"
      @againListService="againListService"
      :defaultSrc="defaultSrc"
    ></service-map-details>
  </div>
</template>

<script>
import WebDashBoardBuilder from "components/webDashBoardBuilder/WebDashBoardBuilder";
import ServiceMapDetails from "components/serviceCenter/ServiceMapDetails";
export default {
  name: "DashBoard",
  data() {
    return {
      isDetails: {},
      showAppCenter: false,
      serviceNameData: this.$t("myCenter.AppCenter"),
      defaultSrc: require("img/default/appDefault.jpg")
    };
  },
  components: {
    WebDashBoardBuilder,
    ServiceMapDetails
  },
  computed: {
    homePageHeaderHeight() {
      return this.$store.getters.homePageHeaderHeight;
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getAppDetails(this.$route.query.id);
    } else {
      this.showAppCenter = false;
    }
  },
  methods: {
    //评论更新后展示页面更新
    againListService() {
      this.$refs.mychild.getAppList();
      // this.$refs.mychild.getAppKwList();
    },
    //请求  地图详情数据 0
    getAppDetails(val) {
      this.$api.serviceAppCenterApi
        .getAppDetails(
          {
            appId: val
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.data.status == 200) {
            this.$store.dispatch("menu/setActiveMenuStatus", false);
            this.showAppCenter = true;
            window.scrollTo(0, 0);
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
      this.showAppCenter = val;
    }
  }
};
</script>

<style lang='scss' scoped>
</style>

