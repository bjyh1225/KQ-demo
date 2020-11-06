<template>
  <div class="service-center" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <service-datacenter-cen @getServiceDetails="getDataDetails" v-show="!showFile" ref="mychild"></service-datacenter-cen>
    <service-map-details
      @getServiceDetails="getDataDetails"
      v-show="showFile"
      @getreturnMapShow="getreturnMapShow"
      :isDetails="isDetails"
      @againListService="againListService"
      :serviceNameData="serviceNameData"
      :defaultSrc="defaultSrc"
    ></service-map-details>
  </div>
</template>
<script>
import ServiceDatacenterCen from "components/serviceDatacenter/ServiceDatacenterCen";
import ServiceMapDetails from "components/serviceCenter/ServiceMapDetails";

export default {
  data() {
    return {
      isDetails: {},
      showFile: false,
      serviceNameData: this.$t("group.Datas"),
      defaultSrc: "/config/imageConfig/function/data/data1.png"
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
        this.showFile = false;
      }
    }
  },
  name: "ServiceDatacenter",
  components: {
    ServiceDatacenterCen,
    ServiceMapDetails
  },
  mounted() {
    if (this.$route.query.id) {
      this.showFile = true;
      window.scrollTo(0, 0);
      this.getDataDetails(this.$route.query.id);
    } else {
      this.showFile = false;
    }
  },
  methods: {
    //评论更新后展示页面更新
    againListService() {
      this.$refs.mychild.getDataList();
    },
    //请求  数据详情数据
    getDataDetails(val) {
      this.$api.serviceDatacenterApi
        .getDataDetails(
          {
            dataId: val,
            DetailBol: true
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.data.status == 200) {
            this.$store.dispatch("menu/setActiveMenuStatus", false);
            this.showFile = true;
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
      this.showFile = val;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>