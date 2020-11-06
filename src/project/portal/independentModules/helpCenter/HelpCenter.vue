<template>
  <div>
    <help-center-header></help-center-header>
    <div class="layout-container">
      <help-center-menu :height="height" @mousemove.native="showResize" @mousedown.native="mouseDown" :style="leftStyle" class="left" :menuData="menuData" @menuClick="menuClick" :menuClickTimeStamp="menuClickTimeStamp" :currentSelectedMenuInfo="currentSelectedMenuInfo"></help-center-menu>
      <help-center-display :height="height" :style="rightStyle" class="right" :currentSelectedMenuInfo="currentSelectedMenuInfo" :menuClickTimeStamp="menuClickTimeStamp" :homePage="homePage" @innerGoTo="innerGoTo"></help-center-display>
    </div>
  </div>
</template>

<script>
  import HelpCenterHeader from './helpCenterComponents/HelpCenterHeader'
  import HelpCenterMenu from './helpCenterComponents/HelpCenterMenu'
  import HelpCenterDisplay from './helpCenterComponents/HelpCenterDisplay'
  import {getMenu,getHomePage} from './func/getMenu.js'
  import {traversal} from '@/utils/traversal.js'
  export default {
    name: "HelpCenter",
    components: {
      HelpCenterHeader,
      HelpCenterMenu,
      HelpCenterDisplay
    },
    data() {
      return {
        height:0,
        moveStatus:false,
        currentX:0,
        currentTarget:null,
        leftStyle:"",
        rightStyle:"",
        menuData:[],
        currentSelectedMenuInfo:{},
        menuClickTimeStamp:0,
        homePage:{}
      }
    },
    computed: {
      isLogin() {
        return this.$store.getters.isLogin;
      }
    },
    watch:{
      currentX(){
        if(this.currentX>100&&this.currentX<500){
          this.leftStyle="width:"+this.currentX+"px";
          this.rightStyle="margin-left:"+(this.currentX+1)+"px";
        }
      }
    },
    methods:{
      showResize(e){
        if(!this.moveStatus){
          if(e.currentTarget.offsetWidth-10<e.x){
            e.currentTarget.style.cursor = 'col-resize';
          }
          else{
            e.currentTarget.style.cursor = 'default';
          }
        }
      },
      mouseDown(e){
        if(e.currentTarget.offsetWidth-10<e.x){
          this.currentTarget=e.currentTarget;
          this.currentTarget.style.cursor='col-resize';
          this.moveStatus=true;
          e.preventDefault();
          document.onmousemove =event=>{
            event.preventDefault(); 
            this.currentX=event.x;
          };
          document.onmouseup=event=>{
            this.moveStatus=false;
            this.currentTarget.style.cursor = 'default';
            event.preventDefault(); 
            document.onmousemove = null;
            document.onmouseup = null;
          };
        }
      },
      menuClick(data){
        this.currentSelectedMenuInfo=data;
        this.menuClickTimeStamp=new Date();
      },
      innerGoTo(menu){
        let menuList=getMenu(this.isLogin,true);
        let menuInfo;
        menuList.forEach(item=>{
          if(item.name==menu){
            menuInfo=item;
          }
        })
        this.menuClick(menuInfo);
      }
    },
    mounted(){
      var height =document.documentElement.clientHeight ||document.body.clientHeight ||700;
      height = height - 60;
      this.height=height;
      //获取数据
      this.menuData=getMenu(this.isLogin);
      this.homePage=getHomePage(this.isLogin);
      if(this.$route.query && this.$route.query.path){
        var data;
        traversal(this.menuData,'children',(item)=>{
          if(item.type=='document'&&item.name==this.$route.query.path){
            data=item;
          }
        })
        this.menuClick(data);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .layout-container{
    .left{
      float:left;
    }
    .right{
      margin-left:301px;
    }
  }
</style>