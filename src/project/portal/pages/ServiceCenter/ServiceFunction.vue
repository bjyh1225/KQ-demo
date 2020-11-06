<template>
  <div class="service-center" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <service-function-cen
      @getServiceDetails="getServiceDetails"
      v-show="!showFunction"
      ref="mychild"
    ></service-function-cen>
    <service-map-details
      @getServiceDetails="getServiceDetails"
      :serviceNameData="serviceNameData"
      v-show="showFunction"
      @getreturnMapShow="getreturnMapShow"
      :isDetails="isDetails"
      @againListService="againListService"
      :defaultSrc="defaultSrc"
    ></service-map-details>
  </div>
</template>
<script>
import ServiceFunctionCen from "components/serviceFunction/ServiceFunctionCen";
import ServiceMapDetails from "components/serviceCenter/ServiceMapDetails";

export default {
  data() {
    return {
      isDetails: {},
      showFunction: false,
      defaultSrc:
        "/config/imageConfig/function/functionService/functionService1.png",
      serviceNameData: this.$t("service.functionServices")
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
        this.showFunction = false;
      }
    }
  },
  name: "ServiceFunction",
  components: {
    ServiceFunctionCen,
    ServiceMapDetails
  },
  mounted() {
    if (this.$route.query.id) {
      this.showFunction = true;
      window.scrollTo(0,0);
      this.getServiceDetails(this.$route.query.id);
    } else {
      this.showFunction = false;
    }
  },

  methods: {
    //评论更新后展示页面更新
    againListService() {
      this.$refs.mychild.getListfunctionService();
    },
    //请求  地图详情数据
    getServiceDetails(val) {
      this.$api.serviceFunctionApi
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
      this.showFunction = true;
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
      this.showFunction = val;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>