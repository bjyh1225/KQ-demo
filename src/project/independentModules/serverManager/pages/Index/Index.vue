<template>
  <div>
    <index-header
    :isLogin="isLogin"
    :username="username"
    ></index-header>
    <router-view />
  </div>
</template>

<script>
import IndexHeader from "app/serverManager/components/index/IndexHeader"
export default {
  name:"Index",
  components:{
    IndexHeader
  },
  computed: {
    username() {
      return this.$store.getters.username;
    },
    isLogin() {
      return this.$store.getters.isLogin;
    }
  }
}
</script>

<style>

</style>