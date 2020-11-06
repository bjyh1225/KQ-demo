<template>
  <div :style="'margin-top:'+homePageHeaderHeight+'px;'">
    <common-menu></common-menu>
    <div class="inner-body-container">
      <router-view class="inner-body-content"/>
    </div>
  </div>
</template>

<script>
import CommonMenu from 'app/serverManager/components/common/Menu'
export default {
  name:"CommonMenuRouter",
  components:{
    CommonMenu
  },
  computed:{
    homePageHeaderHeight(){
      return this.$store.getters.homePageHeaderHeight;
    }
  }
}
</script>

<style>

</style>