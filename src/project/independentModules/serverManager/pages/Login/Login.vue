<template>
  <div class="login">
    <login-header class="login-header"></login-header>
    <div class="bg-container">
      <login-content class="login-content"></login-content>
      <login-footer class="login-footer"></login-footer>
    </div>
  </div>
</template>

<script>
import LoginHeader from "app/serverManager/components/login/LoginHeader";
import LoginContent from "app/serverManager/components/login/LoginContent";
import LoginFooter from "app/serverManager/components/login/LoginFooter";
export default {
  name:"Login",
  components:{
    LoginHeader,
    LoginContent,
    LoginFooter
  }
}
</script>

<style lang='scss' scoped>
  .login-header {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }
  .bg-container {
    width: 100%;
    height: 600px;
    padding-top: 140px;
    background: url("~app/serverManager/images/login/login_bg.jpg") no-repeat center;
    background-size: cover;
  }
  .login-footer {
    margin-top: 50px;
  }
</style>