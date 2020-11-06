<template>
  <div class="index-header">
    <index-header-top class="top-nav" :class="{'fixed-top-nav':!isHomePage}" :isLogin="isLogin"
      :username="username"></index-header-top>
    <index-header-carousel class="bg-carousel" v-if="isHomePage"></index-header-carousel>
  </div>
</template>

<script>
import IndexHeaderTop from './IndexHeaderTop'
import IndexHeaderCarousel from './IndexHeaderCarousel'
export default {
  name:"IndexHeader",
  components:{
    IndexHeaderTop,
    IndexHeaderCarousel
  },
  computed: {
    isHomePage() {
      return this.$route.meta.isHomePage;
    }
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang='scss' scoped>
  
  .index-header {
    position: relative;
    .top-nav {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 3;
    }
    .fixed-top-nav {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 1002;
      background: #273142;
      //菜单选中
      /deep/ .right-area {
        .menu-area {
          .el-menu {
            .is-active {
              @include menu-active-color();
              .el-submenu__title,
              i {
                @include menu-active-color();
              }
            }
          }
        }
      }
    }
  }
</style>