<template>
  <div class="service-center-menu">
    <span class="service-center-left">{{this.serviceName}}</span>
  </div>
</template>
<script>
export default {
  name: "ServiceCenterMenu",
  props: {
    serviceName: {
      type: String,
      default() {
        return this.$t("service.mapServices");
      }
    }
  }
};
</script>
<style lang="scss" scoped>

.service-center-menu {
  width: 100%;
  // height: 48px;
  line-height: 48px;
  background: #fff;
  border-bottom: 1px solid #dfdfdf;
  padding-left: 2%;
  color: #4c4c4c;
  .service-center-left {
    display: inline-block;
    height: 48px;
    &::after {
      content: "";
      width: 100%;
      height: 3px;
      @include menu-active-bg();
      position: absolute;
      bottom: -2px;
      left: 0px;
    }
    position: relative;
    @include menu-active-color();
  }
}
</style>

