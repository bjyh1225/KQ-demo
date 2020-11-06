<template>
  <div class="index-content">
    <real-render-page :dataList="dataList"></real-render-page>
  </div>
</template>

<script>
import RealRenderPage from 'portal/independentModules/visualization/real/RealRenderPage'
export default {
  name: "Index",
  components:{
    RealRenderPage
  },
  computed:{
    dataList(){
      return this.$store.getters.visualizationComponents;
    }
  }
};
</script>

<style lang='scss' scoped>
  // .index-content{
  //   margin-top:91px;
  // }
</style>