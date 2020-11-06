<template>
  <div>
    <div v-if="!previewStatus">
      <div class="menu" :style="'height:'+height+'px;'">
        <p class="logo">KQWebPortal二次开发</p>
        <ul class="menu-list">
          <li @click="menuClick('animate')" :class="{'is-active':activeMenu=='animate'}">动画效果</li>
          <li @click="menuClick('function')" :class="{'is-active':activeMenu=='function'}">功能函数</li>
        </ul>
      </div>
      <div class="header">
        <span class="el-icon-portal-zhuye" @click="goToHome"></span>
      </div>
      <div class="content" :style="'height:'+(height-51)+'px;'">
        <el-scrollbar class="scroll">
          <animate-list @showPreview="showPreview" v-show="activeMenu=='animate'"></animate-list>
          <function-list  v-show="activeMenu=='function'"></function-list>
        </el-scrollbar>
      </div>
    </div>
    <div v-else>
      <preview :previewInfo="previewInfo" @close="closePreview"></preview>
    </div>
  </div>
</template>

<script>
import AnimateList from './AnimateList'
import FunctionList from './FunctionList'
import Preview from './Preview'
export default {
  name: "GuideIndex",
  components:{
    AnimateList,
    Preview,
    FunctionList
  },
  data(){
    return {
      activeMenu:"animate",
      height:500,
      previewStatus:false,
      previewInfo:{}
    }
  },
  methods:{
    menuClick(menu){
      this.activeMenu=menu;
    },
    goToHome(){
      this.$router.push('/')
    },
    showPreview(info){
      this.previewStatus=true;
      this.previewInfo=info;
    },
    closePreview(){
      this.previewStatus=false;
    }
  },
  created(){
    var height=document.documentElement.clientHeight||document.body.clientHeight||'700';
    this.height=height;
  }
};
</script>
<style lang="scss" scoped>
  .header{
    height:50px;
    line-height:50px;
    padding-right:30px;
    background: #fff;
    text-align: right;
    border-bottom:1px solid #ecf0f1;
    span{
      color: #80c7fd;
      font-size:28px;
      cursor: pointer;
      display: inline-block;
      height:50px;
      line-height:50px;
      &:hover{
        color:rgba(128, 199, 253,0.8);
      }
    }
  }
  .menu{
    width:250px;
    background: #18273c;
    float:left;
    .logo{
      width: 100%;
      height:60px;
      line-height:60px;
      font-size:20px;
      text-align: center;
      color:#fff;
    }
    .menu-list{
      list-style:none;
      margin:0;
      padding:0;
      li{
        text-align: center;
        height:40px;
        line-height:40px;
        color:#91a1a1;
        font-size:18px;
        cursor: pointer;
        &:hover{
          color:#fff;
        }
      }
      .is-active{
        color:#fff;
        background: rgba(0, 0, 0,.4);
      }
    }
  }
  .content{
    margin-left:250px;
    background: #ecf0f1;
    .scroll{
      height:100%;
    }
    /deep/ .el-scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>
