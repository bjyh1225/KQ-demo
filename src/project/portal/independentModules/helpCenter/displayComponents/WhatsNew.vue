<template>
  <div>
    <h1>What's New</h1>
    <el-divider></el-divider>
    <div class="new-content">
      <div id="2020-09-11">
        <div style="font-size:18px;color:#242424;margin-bottom:10px;">2020-09-11</div>
        <div style="font-size:14px;color:#606266;margin-bottom:10px;">我的部门功能中新增审核管理功能</div>
        <el-image :src="imgNew4" style="width:100%;margin-bottom:20px;"></el-image>
        <div style="font-size:14px;color:#606266;margin-bottom:10px;">附件中新增多文件批量上传，指定文件夹上传功能</div>
        <el-image :src="imgNew5" style="width:100%;margin-bottom:20px;"></el-image>
        <div style="font-size:14px;color:#606266;margin-bottom:10px;">附件中新增图片和视频的预览功能</div>
        <el-image :src="imgNew6" style="width:100%;margin-bottom:20px;"></el-image>
      </div>
      <div id="2020-05-21">
        <div style="font-size:18px;color:#242424;margin-bottom:10px;">2020-05-21</div>
        <div style="font-size:14px;color:#606266;margin-bottom:10px;">添加资源的标签功能，可根据标签检索及获取资源等</div>
        <div style="font-size:14px;color:#606266;margin-bottom:10px;">修改框架层次的问题，如性能、多端登录提示等</div>
        <div style="font-size:14px;color:#606266;margin-bottom:10px;">支持Oracle数据库</div>
        <el-image :src="imgNew3" style="width:100%;margin-bottom:20px;"></el-image>
      </div>
      <div id="2020-05-14">
        <div style="font-size:18px;color:#242424;margin-bottom:10px;">2020-05-14</div>
        <div style="font-size:14px;color:#606266;margin-bottom:10px;">更新地图服务列表展示</div>
        <el-image :src="imgNew1" style="width:100%;margin-bottom:20px;"></el-image>
      </div>
      <div id="2020-05-11">
        <div style="font-size:18px;color:#242424;margin-bottom:10px;">2020-05-11</div>
        <div style="font-size:14px;color:#606266;margin-bottom:10px;">更新数据服务列表展示</div>
        <el-image :src="imgNew2" style="width:100%;margin-bottom:20px;"></el-image>
      </div>
    </div>
    <div class="time-line">
      <ul>
        <li v-for="(item,index) in timeLine" :key="item" @click="timeLineClick(item,index)" :class="{'is-active':item==activeName}">{{item}}</li>
      </ul>
      <span class="slide" :style="slideStyle"></span>
    </div>
  </div>
</template>

<script>
export default {
  name:'WhatsNew',
  props:{
    taskTimeStamp:{
      default:0
    }
  },
  watch:{
    taskTimeStamp(){
      this.clientArea();
    }
  },
  data(){
    return {
      slideStyle:"",
      activeName:'2020-04-16',
      currentIndex:0,
      timeLine:[
        '2020-09-11',
        '2020-05-21',
        '2020-05-14',
        '2020-05-11'
      ],
      imgNew1:require('../resource/WhatsNew/new1.png'),
      imgNew2:require('../resource/WhatsNew/new2.png'),
      imgNew3:require('../resource/WhatsNew/new3.png'),
      imgNew4:require('../resource/WhatsNew/new4.png'),
      imgNew5:require('../resource/WhatsNew/new5.png'),
      imgNew6:require('../resource/WhatsNew/new6.png'),
    }
  },
  methods:{
    timeLineClick(id,index){
      let height=document.getElementById(id).offsetTop;
      this.activeName=id;
      this.currentIndex=index;
      let slideY=index*30;
      this.slideStyle=`top:${slideY}px;`;
      this.scrollEvent(height);
    },
    scrollEvent(height){
      this.$emit("scrollEvent",height);
    },
    clientArea(){
      this.timeLine.some((item,index)=>{
        let next=document.getElementById(item);
        let top=next.getBoundingClientRect().top;
        if(top<=window.innerHeight&&top>0){
          if(index==this.currentIndex){
            return true;
          }
          this.activeName=item;
          this.currentIndex=index;
          let slideY=index*30;
          this.slideStyle=`top:${slideY}px;`;
          return true;
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  
  h1{
    margin:0 0 15px 0;
    font-weight:normal;
  }
  .el-divider{
    margin:0 0 10px 0;
  }
  .new-content{
    margin-right:130px;
  }
  .time-line{
    width:130px;
    height:200px;
    position:fixed;
    right:0px;
    top:200px;
    ul{
      height:100%;
      list-style:none;
      margin:0;
      padding:0;
      border-left:2px solid #e9e8e8;
      li{
        cursor: pointer;
        height:30px;
        line-height:30px;
        padding-left:10px;
      }
      .is-active{
        @include base-active-color();
      }
    }
    .slide{
      display:block;
      height:30px;
      width:2px;
      @include base-bg-color();
      position:absolute;
      left:0;
      top:0px;
      transition:.4s;
    }
  }
</style>