<template>
  <div class="app-menu" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <web-map-builder
      @getMapbuilderDetails="getMapbuilderDetails"
      ref="mychild"
      v-show="!showAppCenter"
    ></web-map-builder>
    <manage-builder-category-details
      @getServiceDetails="getMapbuilderDetails"
      :serviceNameData="serviceNameData"
      v-show="showAppCenter"
      @getreturnMapShow="getreturnMapShow"
      :isDetails="isDetails"
      @againListService="againListService"
      :defaultSrc="defaultSrc"
      @getServiceCategory="getServiceCategory"
      :builderArr="arr"
    ></manage-builder-category-details>
  </div>
</template>

<script>
import WebMapBuilder from "components/webMapBuilder/WebMapBuilder";
import ManageBuilderCategoryDetails from "components/manageMapDraftingCategory/ManageBuilderCategoryDetails";
export default {
  name: "MapDrafting",
  data() {
    return {
      isDetails: {},
      showAppCenter: false,
      serviceNameData: this.$t("myCenter.AppCenter"),
      defaultSrc: "/config/imageConfig/function/mapService/mapService1.png",
      arr: [] //下拉类别
    };
  },
  components: {
    WebMapBuilder,
    ManageBuilderCategoryDetails
  },
  computed: {
    homePageHeaderHeight() {
      return this.$store.getters.homePageHeaderHeight;
    }
  },
  mounted() {
    if (this.$route.query.id) {
      this.getMapbuilderDetails(this.$route.query.id);
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
    // 获取分类
    getServiceCategory() {
      this.$api.webMapBuilderApi
        .getMapbuilderCategoryList({
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
    //请求  地图详情数据 0
    getMapbuilderDetails(val) {
      this.$api.webMapBuilderApi
        .getMapbuilderDetails(
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

