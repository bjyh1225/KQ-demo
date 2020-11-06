<template>
  <div class="main" :style="'margin-top:'+homePageHeaderHeight+'px;'">
    <cluster-manage></cluster-manage>
  </div>
</template>

<script>
  import ClusterManage from "app/serverManager/components/clusterManage/ClusterManage";
  export default {
    name: "ClusterManagePage",
    components: {
      ClusterManage
    },
    computed: {
      homePageHeaderHeight() {
        return this.$store.getters.homePageHeaderHeight;
      }
    }
  }
</script>

<style less="scss" scoped>
  .main {
    background-color: #f5f5f5;
    padding-top: 20px;
    box-sizing: border-box;
    min-height: calc(100vh - 80px);
  }
</style>