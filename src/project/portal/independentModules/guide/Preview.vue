<template>
  <div>
    <div class="header">
      <span class="title">{{previewInfo.previewTitle}}</span>
      <i class="el-icon-close" @click="close"></i>
    </div>
    <div class="content">
      <component v-bind:is="previewInfo.previewComponentName"></component>
    </div>
  </div>
</template>

<script>
  import demoComponents from 'portal/independentModules/guide/config/demoComponents.js'
  export default {
    name: "Preview",
    components:{
      ...demoComponents
    },
    props:{
      previewInfo:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    methods:{
      close(){
        this.$emit('close')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .header{
    background: #000;
    height:54px;
    line-height:54px;
    position:fixed;
    top:0;
    left:0;
    width:100%;
    z-index:999;
    .title{
      color:#fff;
      font-weight: 700;
      margin-left:20px;
    }
    .el-icon-close{
      display: inline-block;
      color:#F8BC06;
      font-size:22px;
      height:22px;
      width: 22px;
      font-weight: bold;
      position:absolute;
      top:0;
      right:20px;
      bottom:0;
      margin:auto;
      cursor: pointer;
      &:hover{
        color:rgb(247, 216, 126);
      }
    }
  }
  .content{
    margin-top:54px;
  }
</style>
