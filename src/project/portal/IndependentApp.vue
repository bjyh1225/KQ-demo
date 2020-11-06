<template>
  <div id="app">
    <router-view />
    <login-dialog :dialogVisible="loginDialogVisible" @dialogClose="loginDialogClose"></login-dialog>
  </div>
</template>

<script>
//公共样式
import "@/style/base.scss";
import "@/style/common.scss";
import Stomp from 'stompjs';
import Vue from 'vue';
import LoginDialog from 'portal/components/login/LoginDialog'
import {dialogLoginTask} from 'common/loginHandle/loginTask.js'
import {sliceFileUpload} from '@/utils/sliceFileUpload.js'
export default {
  name: "IndependentApp",
  components:{
    LoginDialog
  },
  computed: {
    userInfo() {
      return this.$store.getters.userInfo.id;
    },
    language() {
      return this.$store.getters.language;
    },
    taskTime(){
      return this.$store.getters.commonTimeStamp;
    }
  },
  watch: {
    userInfo() {
      this.messagePush();
    },
    language() {
      document.body.setAttribute("data-language", this.language);
    },
    taskTime(){
      var type=this.$store.getters.commonEventType;
      var source=this.$store.getters.commonSource;
      if(type=="goToLogin"&&source=="server"){
        this.loginDialogVisible=true;
      }
    }
  },
  data(){
    return {
      loginDialogVisible:false,
      stompClient:null,
      interval:null,
      messageServerConfig:null
    }
  },
  methods: {
    loginDialogClose(){
      this.loginDialogVisible=false;
    },
    messagePush() {
      // eslint-disable-next-line
      if(!portal_config.VUE_APP_MESSAGE_URL){
        return false;
      }
      let userInfo = this.$store.getters.userInfo;
      if(userInfo.id){
        this.getMessageConfig();
      }
    },
    getMessageConfig(){
      this.$api.personalCenterMyMessageApi.getMsgInfo().then(res=>{
        let data=res.data.data;
        if(data&&data.msg){
          this.messageServerConfig=data.msg;
        }
        else{
          this.messageServerConfig="";
        }
        this.connect();
      }).catch(()=>{})
    },
    onconnect(){
      if(this.interval){
        clearInterval(this.interval);
        this.interval=null;
      }
      let userInfo = this.$store.getters.userInfo;
      //登录状态建立的连接
      if(userInfo.id){
        //公共消息
        let publicDestination=`/topic/public_topicMessage_${this.messageServerConfig}`
        this.stompClient.subscribe(publicDestination,(message)=>{
          let body=message.body;
          if(body){
            let info=JSON.parse(body);
            this.$notify.info({
              title: this.$t("myCenter.Message"),
              message: info.message,
              duration: 8000
            });
          }
        });
        //个人消息
        let personalDestination=`/queue/${userInfo.id}_queueMessage_${this.messageServerConfig}`;
        this.stompClient.subscribe(personalDestination,(message)=>{
          let body=message.body;
          let info=JSON.parse(body);
          this.$notify.info({
            title: this.$t("myCenter.Message"),
            message: info.message,
            duration: 8000
          });
        });
        //消息数目
        let messageNumDestination=`/queue/${userInfo.id}_unReadMessage_${this.messageServerConfig}`;
        this.stompClient.subscribe(messageNumDestination,(message)=>{
          let body=message.body;
          let info=JSON.parse(body);
          this.$store.dispatch("message/setMessageNum", info.message);
        });
      }
    },
    onFailed(){
      if(!this.interval){
        this.interval=setInterval(()=>{
          console.log("正在进行重新连接");
          this.connect();
        },10000)
      }
    },
    connect(){
      let login,passcode;
      // eslint-disable-next-line
      if(!portal_config.MESSAGE_USER_CONFIG){
        login="admin";
        passcode="admin";
      }else{
        // eslint-disable-next-line
        let userConfig=portal_config.MESSAGE_USER_CONFIG;
        if(!userConfig.username){
          userConfig.username="admin";
        }
        if(!userConfig.password){
          userConfig.password="admin";
        }
        login=userConfig.username;
        passcode=userConfig.password;
      }
      if(this.stompClient){
        this.stompClient.disconnect();
        this.stompClient=null;
      }
      // eslint-disable-next-line
      this.stompClient=Stomp.client(portal_config.VUE_APP_MESSAGE_URL);
      this.stompClient.connect(login, passcode, this.onconnect,this.onFailed);
      Vue.prototype.stompClient=this.stompClient;
    },
    getQueryVariable(variable){//获取查询参数
      var query = window.location.search.substring(1);
      var vars = query.split("&");
      for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){
          return pair[1];
        }
      }
      return false;
    },
    setJwt(jwt){
      sessionStorage.setItem("jwt",jwt);
    }
  },
  mounted() {
    let preloader=document.getElementById("preloader");
    if(preloader){
      let needAnimated=preloader.getAttribute("needAnimated");
      if(needAnimated){
        let animateClass=preloader.getAttribute("animateClass")||"fadeOutLeft";
        let closeTime=preloader.getAttribute("closeTime")||5000;
        let animateDefer=preloader.getAttribute("animateDefer");
        if(animateDefer){
          setTimeout(function() {
            preloader.classList.add('animated');
            preloader.classList.add(animateClass);
          },animateDefer);
        }
        else{
          preloader.classList.add('animated');
          preloader.classList.add(animateClass);
        }
        setTimeout(function() {
          preloader.style.display = "none";
          preloader.classList.remove('animated');
          preloader.classList.remove(animateClass);
        },closeTime);
      }
      else{
        preloader.style.display = "none";
      }
    }
    //处理config.js文件局部路由刷新不加载问题
    if (!window.portal_config) {
      var config = localStorage.getItem("portal_config") || "";
      window.portal_config = JSON.parse(config);
    }
    //主题
    var themecode = localStorage.getItem("themecode");
    if (themecode) {
      document.body.setAttribute("data-theme", themecode);
      this.$store.dispatch("theme/setTheme", themecode);
    } else {
      document.body.setAttribute("data-theme", "default-theme");
      this.$store.dispatch("theme/setTheme", "default-theme");
    }
    this.messagePush();
  },
  created() {
    //获取url上的参数
    if(this.getQueryVariable("tKey")){
      let key=this.getQueryVariable("tKey");
      let token=localStorage.getItem(key);
      if(!token){
        token=sessionStorage.getItem(key);
      }
      this.setJwt(token);
    }
    if(this.getQueryVariable("token")){
      let token=this.getQueryVariable("token");
      this.setJwt(token);
    }
    //添加全局方法文件上传
    Vue.prototype.globalMethods.sliceFileUploadTask=(config)=>{
      return sliceFileUpload(config);
    }
    /*公共方法*/
    //当前portal信息
    window.getPortalCurrentInfo=function(){
      var jwt=sessionStorage.getItem('jwt') || '';
      var userInfo=sessionStorage.getItem('userInfo') || '';
      var language=sessionStorage.getItem('language') || '';
      return {
        jwt:jwt,
        userInfo:userInfo,
        language:language
      }
    }
    //查询当前用户信息(实时更新)
    window.getPortalCurrentInfoLiveUpdate=()=>{
      return new Promise((resolve)=>{
        let userInfo=sessionStorage.getItem('userInfo') || '';
        let language=sessionStorage.getItem('language') || '';
        if(!userInfo){
          resolve({
            userInfo:"",
            language:language
          });
        }
        else{
          this.$api.manageUserApi
          .getCurrentUserStatus().then(res=>{
            let data=res.data.data;
            if(data){
              resolve({
                userInfo:JSON.stringify(data),
                language:language
              });
            }else{
              resolve({
                userInfo:"",
                language:language
              });
            }
          }).catch(()=>{
            resolve({
              userInfo:"",
              language:language
            });
          })
        }
      })
    }
    //设置portal的jwt
    window.setPortalToken=function(token){
      sessionStorage.setItem('jwt', token);
    }
    //登录
    //参数说明：isKeepCurrentUserStatus是否保持当前用户状态，默认是否，会清空当前用户状态
    window.openPortalLoginDialog=function(isKeepCurrentUserStatus){
      // eslint-disable-next-line
      dialogLoginTask(vm,true,isKeepCurrentUserStatus);
    }
  }
};
</script>

<style lang='scss'>
</style>
