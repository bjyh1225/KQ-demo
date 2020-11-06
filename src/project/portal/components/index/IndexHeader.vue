<template>
  <div class="index-header">
    <index-header-top
      class="top-nav"
      :class="{'fixed-top-nav':!isHomePage}"
      :isLogin="isLogin"
      :username="username"
      v-if="pageStatus=='real'"
      :headerInfo="headerInfo"
    ></index-header-top>
    <index-header-top-preview class="top-nav" v-else :current="current" :headerInfo="headerInfo"></index-header-top-preview>
    <index-header-carousel
      class="bg-carousel"
      v-if="isHomePage||pageStatus!='real'"
      :headerInfo="headerInfo"
      :current="current"
      :pageStatus="pageStatus"
    ></index-header-carousel>
  </div>
</template>

<script>
import IndexHeaderTop from "./IndexHeaderTop";
import IndexHeaderTopPreview from "./IndexHeaderTopPreview";
import IndexHeaderCarousel from "./IndexHeaderCarousel";
export default {
  name: "IndexHeader",
  components: {
    IndexHeaderTop,
    IndexHeaderCarousel,
    IndexHeaderTopPreview
  },
  props: {
    isLogin: {
      type: Boolean,
      default: false
    },
    username: {
      type: String,
      default: ""
    },
    headerInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    current: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageStatus: {
      type: String,
      default: ""
    }
  },
  computed: {
    isHomePage() {
      return this.$route.meta.isHomePage;
    }
  },
  mounted() {
    this.$store.dispatch("homepage/setHomePageHeaderHeight", 66);
  }
};
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