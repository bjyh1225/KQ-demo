<template>
  <el-row class="work-space">
    <el-scrollbar class="scroll">
        <drag-header-render :headerInfo="headerInfo"></drag-header-render>
        <div class="drag-desc" v-show="dataList.length==0">
          <div class="text">{{$t('visualization.DragComponentToThisArea')}}</div>
        </div>
        <draggable class="mainDragArea" tag="div" :list="dataList" :group="{name:'componentsDrag'}" @change="dragChange"
        :sort="true"
        :animation="300"
        :handle="'.visualization-move-symbol'"
        :ghostClass="'drag-ghost'"
        :scrollSensitivity="200"
        :forceFallback="false"
        >
          <drag-render v-for="(el,ix) in dataList" :key="el.id" :componentName="el.componentName" :current="el" :parentList="dataList" :currentix="ix" :styleConf="el.styleConf"
          :propsConf="el.propsConf"></drag-render>
        </draggable>
    </el-scrollbar>
  </el-row>
</template>

<script>
  import DragHeaderRender from 'portal/independentModules/visualization/drag/DragHeaderRender'
  import DragRender from 'portal/independentModules/visualization/drag/DragRender'
  import guid from 'portal/independentModules/visualization/util/guid.js'
  export default {
    name: "VisualizationWorkspace",
    components:{
      DragRender,
      DragHeaderRender
    },
    props:{
      dataList:{
        type:Array,
        default:()=>{
          return []
        }
      },
      headerInfo:{
        type:Object,
        default:()=>{
          return {}
        }
      }
    },
    methods:{
      dragChange(data){
        //特殊处理布局
        if(data.added){
          if(data.added.element.componentName=='BaseLayout'&&data.added.element.componentsList.length==0){
            var layoutData=JSON.parse(JSON.stringify(data.added.element));
            data.added.element.colConf.forEach(item=>{  
              var tempData=JSON.parse(JSON.stringify(layoutData));
              tempData.id=guid();
              tempData.colSpan=item;
              tempData.componentName='layoutcol';
              tempData.text="列";
              data.added.element.componentsList.push(tempData);
            })
          }
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
  .work-space {
    height: 300px;
    background: url('~img/visualization/bg.jpg') repeat;
    box-shadow:0px 0px 10px 2px rgba(0,0,0,.2) inset;
    transition: margin .5s;
    .scroll{
      height:100%;
      .mainDragArea{
        min-height: 1200px;
      }
    }
    /deep/ .el-scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  .text{
    display: none;
  }
  //拖动说明区域
  .drag-desc{
    width: 100%;
    position:relative;
    .text{
      display: block;
      position:absolute;
      top:0;
      left:0;
      height:300px;
      line-height:300px;
      width: 100%;
      font-size:30px;
      color:#ccc;
      text-align: center;
    }
  }
</style>