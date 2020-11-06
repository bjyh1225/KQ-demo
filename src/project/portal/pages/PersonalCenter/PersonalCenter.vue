<template>
  <div :style="'margin-top:'+homePageHeaderHeight+'px'">
    <personal-center-menu></personal-center-menu>
    <div class="inner-body-container">
      <router-view class="inner-body-content"/>
    </div>
  </div>
</template>

<script>
import PersonalCenterMenu from 'components/personalCenter/PersonalCenterMenu'
export default {
  name: "PersonalCenter",
  components:{
    PersonalCenterMenu
  },
  computed:{
    homePageHeaderHeight(){
      return this.$store.getters.homePageHeaderHeight;
    }
  }
};
</script>
