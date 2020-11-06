<template>
  <div :style="'margin-top:'+homePageHeaderHeight+'px;'">
    <manage-menu></manage-menu>
    <div class="inner-body-container">
      <router-view class="inner-body-content"/>
    </div>
  </div>
</template>

<script>
import ManageMenu from 'components/manage/ManageMenu'
export default {
  name: "Manage",
  components:{
    ManageMenu
  },
  computed:{
    homePageHeaderHeight(){
      return this.$store.getters.homePageHeaderHeight;
    }
  }
};
</script>
