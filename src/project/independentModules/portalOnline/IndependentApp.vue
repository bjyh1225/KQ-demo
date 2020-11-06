<template>
  <div id="app">
    <router-view />
    <login-dialog :dialogVisible="loginDialogVisible" @dialogClose="loginDialogClose"></login-dialog>
  </div>
</template>

<script>
import LoginDialog from 'components/login/LoginDialog'
export default {
  name:"IndependentApp",
  components:{
    LoginDialog
  },
   data(){
    return {
      loginDialogVisible:false
    }
  },
  methods: {
    loginDialogClose(){
      this.loginDialogVisible=false;
    }
  },
  mounted(){
    document.getElementById("preloader").style.display = "none";
  }
}
</script>

<style>

</style>