<template>
  <div>
    <p v-if="IndexCopyrightFooterData" v-html="IndexCopyrightFooterData"></p>
    <p v-else>{{$t('myCenter.Copyright2019KQGEOTechnologiesAllrightsreserved')}}</p>
  </div>
</template>

<script>
export default {
  name: "LoginFooter",
  data() {
    return {
      dataList: {},
      IndexCopyrightFooterData: ""
    };
  },
  mounted() {
    //请求可视化构建首页的数据
    var visualizationComponents = this.$store.getters.visualizationComponents;
    if (visualizationComponents.length == 0) {
      this.$api.visualizationApi
        .getSysParamConfigureByKey(
          {
            key: "visualizationInfo"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          var data = res.data.data.value;
          if (data) {
            data = JSON.parse(this.Base64.decode(data));
            this.dataList = data.dataList;
            this.dataList.forEach(element => {
              if (element.componentName == "IndexCopyrightFooter") {
                this.IndexCopyrightFooterData = element.propsConf.copyRightText;
              }
            });
          }
        })
        .catch(() => {});
    } else {
      visualizationComponents.forEach(element => {
        if (element.componentName == "IndexCopyrightFooter") {
          this.IndexCopyrightFooterData = element.propsConf.copyRightText;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~@/style/params.scss";
div {
  p {
    color: $footerFontColor;
    text-align: center;
  }
}
</style>