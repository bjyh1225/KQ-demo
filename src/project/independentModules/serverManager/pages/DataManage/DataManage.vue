<template>
  <div :style="'margin-top:'+homePageHeaderHeight+'px;'" class="body-background">
    <data-catalog-manage></data-catalog-manage>
  </div>
</template>

<script>
import DataCatalogManage from "app/serverManager/components/dataCatalogManage/DataCatalogManage";
export default {
  name:"DataManage",
  components:{
    DataCatalogManage
  },
  computed:{
    homePageHeaderHeight(){
      return this.$store.getters.homePageHeaderHeight;
    }
  }
}
</script>

<style lang="scss" scoped>
  .body-background{
    background: #f5f5f5;
  }
</style>