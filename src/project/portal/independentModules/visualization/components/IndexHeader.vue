<template>
  <index-header-components
    :isLogin="isLogin"
    :username="username"
    :headerInfo="headerInfo"
    :pageStatus="pageStatus"
    :current="current"
  ></index-header-components>
</template>

<script>
import IndexHeaderComponents from "components/index/IndexHeader";
export default {
  name: "IndexHeader",
  components: {
    IndexHeaderComponents
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
    pageStatus: {
      type: String,
      default: ""
    },
    propsConf: {
      type: Object,
      default: () => {
        return {};
      }
    },
    styleConf: {
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
    }
  }
};
</script>

<style lang='scss' scoped>
</style>