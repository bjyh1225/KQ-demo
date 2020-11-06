<template>
  <div class="service-center" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <service-data-cen @getServiceDetails="getServiceDetails" v-show="!showScene" ref="mychild"></service-data-cen>
    <service-map-details
      @getServiceDetails="getServiceDetails"
      :serviceNameData="serviceNameData"
      v-show="showScene"
      @getreturnMapShow="getreturnMapShow"
      :isDetails="isDetails"
      @againListService="againListService"
      :defaultSrc="defaultSrc"
    ></service-map-details>
  </div>
</template>
<script>
import ServiceDataCen from "components/serviceData/ServiceDataCen";
import ServiceMapDetails from "components/serviceCenter/ServiceMapDetails";

export default {
  data() {
    return {
      isDetails: {},
      showScene: false,
      serviceNameData: this.$t("service.scene"),
      defaultSrc: "/config/imageConfig/function/dataService/dataService1.png"
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
  name: "ServiceData",
  components: {
    ServiceDataCen,
    ServiceMapDetails
  },
  mounted() {
    if (this.$route.query.id) {
      this.showScene = true;
      window.scrollTo(0, 0);
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
      this.$api.serviceDataApi
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
      this.showScene = val;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>