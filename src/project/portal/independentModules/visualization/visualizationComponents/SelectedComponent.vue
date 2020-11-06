<template>
  <el-row class="selected-component">
    <div class="title">
      <i @click="closePannel" class="el-icon-portal-collapse-left-copy"></i>
      <span>{{$t('visualization.SelectedList')}}</span>
    </div>
    <div class="scroll-container" :style="scrollStyle">
      <el-scrollbar class="scroll">
        <selected-component-list :dataList="dataList" :outside="true"></selected-component-list>
      </el-scrollbar>
    </div>
  </el-row>
</template>

<script>
  import SelectedComponentList from './SelectedComponentList'
  export default {
    name: "SelectedComponent",
    components:{
      SelectedComponentList
    },
    computed:{
      scrollStyle(){
        return "height:"+(this.heightInfo-41)+'px;';//配合高度修改
      }
    },
    props: {
      dataList: {
        type: Array,
        default: () => {
          return []
        }
      },
      heightInfo:{
        type:Number,
        default:300
      }
    },
    methods:{
      closePannel(){
        this.$emit('closePannel');
      }
    }
  };
</script>

<style lang='scss' scoped>
  
  .title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccd0d3;
    position: relative;
    @include base-active-color();
    i {
      font-size: 20px;
      position: absolute;
      left: 10px;
      top: 0;
      bottom: 0;
      margin: auto;
      display: inline-block;
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
  //滚动条
  .scroll-container {
    .scroll {
      height: 100%;
    }
    /deep/ .el-scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>