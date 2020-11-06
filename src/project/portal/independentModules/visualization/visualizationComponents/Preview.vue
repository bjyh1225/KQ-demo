<template>
  <el-row class="visualization-preview">
    <div class="header">
      <span class="logo">{{$t('visualization.CustomHomepagePreview')}}</span>
      <div class="btn-group">
        <span class="el-icon-portal-tuichu" @click="goBack">{{$t('visualization.back')}}</span>
      </div>
    </div>
    <div class="preview">
      <render-page :dataList="dataList"></render-page>
    </div>
  </el-row>
</template>

<script>
  import RenderPage from 'portal/independentModules/visualization/preview/RenderPage'
  export default {
    name: "Preview",
    components:{
      RenderPage
    },
    props:{
      dataList:{
        type:Array,
        default:()=>{
          return []
        }
      }
    },
    methods:{
      goBack(){
        this.$emit('goBack');
      }
    }
  }
</script>

<style lang='scss' scoped>
  
  .visualization-preview{
    .header{
      height:56px;
      line-height:56px;
      border-bottom:1px solid #ccd0d3;
      position: fixed;
      top:0;
      left:0;
      width: 100%;
      z-index:999;
      background: #fff;
      .logo{
        font-size:20px;
        margin-left:20px;
        color:#4c4c4c;
      }
      .btn-group{
        height:56px;
        line-height:56px;
        float:right;
        margin-right:20px;
        span{
          font-size:16px;
          color:#4c4c4c;
          cursor: pointer;
          &:hover{
            @include base-active-color();
          }
        }

      }
    }
  }
  .preview{
    margin-top:56px;
  }
</style>