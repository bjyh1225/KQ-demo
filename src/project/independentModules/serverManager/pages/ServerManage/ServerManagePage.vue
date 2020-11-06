<template>
  <div :style="'margin-top:'+homePageHeaderHeight+'px;'">
    <server-manage></server-manage>
  </div>
</template>

<script>
import ServerManage from "app/serverManager/components/serverManage/ServerManager";
export default {
  name:"ServerManagePage",
  components:{
    ServerManage
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