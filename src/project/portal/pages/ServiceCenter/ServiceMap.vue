<template>
  <div class="service-center" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <service-map-show @getServiceDetails="getServiceDetails" v-show="!showMapDetails" ref="mychild"></service-map-show>
    <service-map-details
      @getServiceDetails="getServiceDetails"
      v-show="showMapDetails"
      @getreturnMapShow="getreturnMapShow"
      :isDetails="isDetails"
      @againListService="againListService"
    ></service-map-details>
  </div>
</template>
<script>
import ServiceMapShow from "components/serviceCenter/ServiceMapShow";
import ServiceMapDetails from "components/serviceCenter/ServiceMapDetails";

export default {
  data() {
    return {
      isDetails: {},
      showMapDetails: false
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
        this.showMapDetails = false;
      }
    }
  },
  name: "ServiceMap",
  components: {
    ServiceMapShow,
    ServiceMapDetails
  },
  mounted() {
    if (this.$route.query.id) {
      this.getServiceDetails(this.$route.query.id);
    } else {
      this.showMapDetails = false;
    }
  },
  methods: {
    //评论更新后展示页面更新
    againListService() {
      this.$refs.mychild.getListService();
    },
    //请求  地图详情数据y
    getServiceDetails(val) {
      this.$api.serviceMapApi
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
            this.showMapDetails = true;
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
      this.showMapDetails = val;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>