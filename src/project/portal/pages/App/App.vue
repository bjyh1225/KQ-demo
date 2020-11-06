<template>
  <div class="app-menu" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <web-app-builder @getAppDetails="getAppDetails" ref="mychild" v-show="!showAppCenter"></web-app-builder>
    <manage-builder-category-details
      @getServiceDetails="getAppDetails"
      :serviceNameData="serviceNameData"
      v-show="showAppCenter"
      @getreturnMapShow="getreturnMapShow"
      :isDetails="isDetails"
      @againListService="againListService"
      :defaultSrc="defaultSrc"
      :builderArr="arr"
      @getServiceCategory="getServiceCategory"
    ></manage-builder-category-details>
  </div>
</template>

<script>
import WebAppBuilder from "components/webAppBuilder/WebAppBuilder";
import ManageBuilderCategoryDetails from "components/manageMapDraftingCategory/ManageBuilderCategoryDetails";
export default {
  name: "AppCenter",
  data() {
    return {
      isDetails: {},
      showAppCenter: false,
      serviceNameData: this.$t("myCenter.AppCenter"),
      defaultSrc: "/config/imageConfig/function/app/app1.png",
      arr: [] //下拉类别
    };
  },
  components: {
    WebAppBuilder,
    ManageBuilderCategoryDetails
  },
  computed: {
    homePageHeaderHeight() {
      return this.$store.getters.homePageHeaderHeight;
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getAppDetails({ appId: this.$route.query.id, appMes: true });
    } else {
      this.showAppCenter = false;
    }
  },
  methods: {
    // 获取分类
    getServiceCategory() {
      this.$api.serviceAppCenterApi
        .getAppCategory({
          loadingText: this.$t("service.searching")
        })
        .then(res => {
          if (res.status == 200) {
           this.arr = [];
            var map = [];
            this.category = res.data.data;
            this.category.forEach(item=>{
              if(item.parentId==0){
                map.push(item);
              }
            })
             map.forEach(ar=>{
               this.arr.push(ar);
              this.category.forEach(it=>{
                  if(ar.id==it.parentId){
                    it.typeName=`${ar.typeName} — ${it.typeName}`;
                    this.arr.push(it);
                  }
                })
              })
          }
        });
    },
    //评论更新后展示页面更新
    againListService() {
      // this.$refs.mychild.getAppList();
      // this.$refs.mychild.getAppKwList();
    },
    //请求  地图详情数据 0
    getAppDetails(val) {
      this.$api.serviceAppCenterApi
        .getAppDetails(
          {
            appId: val.appId?val.appId:val
          },
          { loadingText: this.$t("service.searching"),coverStatusCode:{391:{needAlertMessage:false}} }
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
            this.$refs.mychild.getAppList();
            if (val.appMes) {
              this.$message({
                message: this.$t('myCenter.Nopermissionstoviewthisresourcenow'),
                type: "warning"
              });
            }
          }
        });
    },
    getreturnMapShow(val) {
      this.showAppCenter = val;
      this.$refs.mychild.getAppCategory();
    }
  }
};
</script>1

<style lang='scss' scoped>
</style>

