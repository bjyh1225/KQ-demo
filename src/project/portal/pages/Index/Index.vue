<template>
  <div>
    <index-header
      :isLogin="isLogin"
      :username="username"
      :headerInfo="headerInfo"
      :pageStatus="'real'"
    ></index-header>
    <router-view />
    <!-- <index-copyright-footer></index-copyright-footer> -->
  </div>
</template>

<script>
import IndexHeader from "common/config/allProjectConfig/visualizationConfig/indexHeaderComponentsBoxConfig.js";
import {
  defaultHeader,
  defaultComponents
} from "portal/independentModules/visualization/config/defaultVisualization.js";
export default {
  name: "Index",
  components: {
    ...IndexHeader
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    },
    taskTime() {
      return this.$store.getters.commonTimeStamp;
    }
  },
  watch: {
    taskTime() {
      var type = this.$store.getters.commonEventType;
      var source = this.$store.getters.commonSource;
      if (type == "refreshVisualizationData" && source == "paramsConfig") {
        this.getVisualization();
      }
    }
  },
  data() {
    return {
      headerNoFixed: false,
      headerInfo: defaultHeader
    };
  },
  methods: {
    getVisualization() {
      this.$api.visualizationApi
        .getSysParamConfigureByKey(
          {
            key: "visualizationInfo"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (!res.data.data) {
            this.$store.dispatch(
              "visualization/setVisualizationComponents",
              defaultComponents
            );
            this.$store.dispatch(
              "visualization/setVisualizationHeadInfo",
              defaultHeader
            );
            this.headerInfo =defaultHeader;
          } else {
            var data = res.data.data.value;
            if (data && res.data.data.status) {
              data = JSON.parse(this.Base64.decode(data));
             this.$store.dispatch(
                "visualization/setVisualizationHeadInfo",
                data.headerInfo
              );
              if (data.dataList.length > 0) {
                this.$store.dispatch(
                  "visualization/setVisualizationComponents",
                  data.dataList
                );
              } else {
                this.$store.dispatch(
                  "visualization/setVisualizationComponents",
                  defaultComponents
                );
              }
              this.headerInfo = data.headerInfo;
            } else {
              this.$store.dispatch(
                "visualization/setVisualizationComponents",
                defaultComponents
              );
              this.$store.dispatch(
                "visualization/setVisualizationHeadInfo",
                defaultHeader
              );
              this.headerInfo =defaultHeader;
            }
          }
        })
        .catch(() => {});
    }
  },
  mounted() {
    //请求可视化构建首页的数据
    var visualizationComponents = this.$store.getters.visualizationComponents;
    // console.log(JSON.stringify(visualizationComponents));
    if (visualizationComponents.length == 0) {
      this.getVisualization();
    } else {
      this.headerInfo = this.$store.getters.visualizationHeadInfo;
    }
  }
};
</script>

<style lang='scss' scoped>
// .header {
//   position: fixed;
//   top: 0;
//   left: 0;
//   z-index: 999;
// }
// .index-header-no-fixed {
//   position: static;
// }
// .fix {
//   width: 100%;
//   position: fixed;
//   top: 0;
//   left: 0;
// }
</style>