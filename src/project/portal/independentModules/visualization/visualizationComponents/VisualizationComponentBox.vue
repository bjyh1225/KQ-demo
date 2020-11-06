<template>
  <el-row class="component-box">
    <el-row 
    class="component-box-open animated" 
    v-show="openStatus"
    :style="'animation-duration:500ms'"
    :class="{'fadeInLeft':animateStatus}"
    >
      <div class="title">
        <span>{{$t('visualization.ListOfComponents')}}</span>
        <i @click="switchStatus" class="el-icon-portal-collapse-left"></i>
      </div>
      <div class="scroll-container" :style="scrollStyle">
        <el-scrollbar class="scroll">
          <el-collapse v-model="activeNames">
            <el-collapse-item :name="item.name" v-for="item in componentTree" :key='item.name'>
              <template slot="title">
                <i class="el-icon-caret-right pannel-arrow"></i>&nbsp;
                <span>{{$t(item.title)}}</span>
                <el-popover
                  placement="top-start"
                  title=""
                  width="200"
                  trigger="hover"
                  :content="$t(item.desc)">
                  <i slot="reference" class="el-icon-portal-wenhao title-desc"></i>
                </el-popover>
              </template>
              <ul class="component-tree">
                <draggable class="dragArea list-group" :list="item.componentChild" :group="{name:'componentsDrag',pull:'clone',put:false,sort:false}"
                  :clone="selectComponent" :sort="false"
                  :ghostClass="'drag-ghost'"
                  :filter="'.no-drag'"
                  :preventOnFilter="false"                  
                >
                  <li v-for="citem in item.componentChild" :key="citem.text" :class="{'no-drag':citem.noDrag}">
                    <div class="hide-area" v-html="citem.ghostArea">
                    </div>
                    <div v-if='citem.html'>
                      <div v-html='citem.html'></div>
                      <i class="el-icon-portal-tuodong"></i>
                    </div>
                    <div v-else-if="citem.componentRender">
                      <component v-bind:is="citem.componentRender" @change="componentRenderChange" :currentComponentBox="citem"></component>
                      <i class="el-icon-portal-tuodong" v-if="!citem.noDrag"></i>
                    </div>
                    <div v-else>
                      {{$t(citem.text)}}
                      <i class="el-icon-portal-tuodong"></i>
                    </div>
                  </li>
                </draggable>
              </ul>
            </el-collapse-item>
          </el-collapse>
        </el-scrollbar>
      </div>
    </el-row>
    <el-row class="component-box-close animated" 
    v-show="!openStatus"
    :style="'animation-duration:500ms'"
    :class="{'fadeInRight':animateStatus}"
    >
      <ul>
        <li @click="switchStatus">
          <i class="el-icon-portal-collapse-left-copy"></i>
        </li>
        <li  v-for="item in componentTree" :key='item.name'>
          <i :class="item.icon"></i><br>
          <span style="display:none;">{{$t(item.title)}}</span>
        </li>
      </ul>
    </el-row>
  </el-row>
</template>

<script>
  import componentBoxConfig from 'portal/independentModules/visualization/config/componentBox.js'
  import componentBoxRender from 'portal/independentModules/visualization/config/componentBoxRender.js'
  import guid from 'portal/independentModules/visualization/util/guid.js'
  export default {
    name: "VisualizationComponentBox",
    components:{
      ...componentBoxRender
    },
    props:{
      heightInfo:{
        type:Number,
        default:300
      }
    },
    computed:{
      scrollStyle(){
        return "height:"+(this.heightInfo-41)+'px;';//配合高度修改
      }
    },
    data() {
      return {
        openStatus: true,//打开状态
        animateStatus:false,//动画效果
        activeNames: ['builtIn','base','layout'],
        componentTree:componentBoxConfig,
        componentRenderInfo:{}
      };
    },
    methods: {
      switchStatus() {
        this.animateStatus=true;
        this.openStatus = !this.openStatus;
        this.$emit('switchComponentBox', this.openStatus);
      },
      selectComponent(data) {
        var newData=JSON.parse(JSON.stringify(data));
        //自定义布局处理
        if(newData.name=="CustomizeLayout"){
          if(this.componentRenderInfo[newData.componentRenderInfoKey]){
            newData.colConf=JSON.parse(JSON.stringify(this.componentRenderInfo[newData.componentRenderInfoKey]));
          }
        }
        newData.componentsList=[];
        newData.id=guid();
        newData.styleConf={};
        newData.propsConf={};
        if(newData.defaultParams){
          newData.defaultParams.forEach(item=>{
            if(item.type=="propsConf"){
              newData.propsConf[item.key]=item.value;
            }
            else{
              newData.styleConf[item.key]=item.value;
            }
          })
        }
        delete newData.ghostArea;
        delete newData.html;
        return newData;
      },
      componentRenderChange(componentRenderInfoKey,value){
        this.componentRenderInfo[componentRenderInfoKey]=value;
      }
    }
  };
</script>

<style lang='scss' scoped>
  
  .component-box {
    width: 220px;
    transition: width .5s;
    border-right:1px solid #ccd0d3;
  }

  .component-box-open {
    //滚动条
    .scroll-container {
      .scroll {
        height: 100%;
      }
      /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
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
        right: 10px;
        top: 0;
        bottom: 0;
        margin: auto;
        display: inline-block;
        width: 20px;
        height: 20px;
        cursor: pointer;
      }
    }
    /deep/ .el-collapse {
      border-top: none;
      .el-collapse-item__header {
        position: relative;
        height: 40px;
        line-height: 40px;
        padding-left: 4px;
        border-bottom: 1px solid #ccd0d3;
        font-size: 16px;
        @include base-color();
        .el-collapse-item__arrow {
          display: none;
        }
        .pannel-arrow {
          color: #b3bcbf;
          transition: transform .3s
        }
        .title-desc{
          @include base-active-color();
          display: inline-block;
          width: 16px;
          height:16px;
          font-size:16px;
          position:absolute;
          top:0;
          right:10px;
          bottom:0;
          margin:auto;
        }
      }
      .el-collapse-item__header.is-active .pannel-arrow {
        transform: rotate(90deg);
      }
      .el-collapse-item__wrap {
        border-bottom: 1px solid #ccd0d3;
        .el-collapse-item__content {
          padding: 0;
        }
      }
    }
    .component-tree {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        height: 40px;
        line-height: 40px;
        font-size: 15px;
        color: #4c4c4c;
        padding-left: 24px;
        position: relative;
        cursor: move;
        .el-icon-portal-tuodong {
          display: inline-block;
          font-size: 15px;
          width: 15px;
          height: 15px;
          position: absolute;
          top: 0;
          right: 6px;
          bottom: 0;
          margin: auto;
        }
        &:hover {
          @include base-bg-font();
        }
        //布局组件样式
        /deep/ .layout-one{
          display: inline-block;
          height:26px;
          line-height:26px;
          width:160px;
          border-radius: 4px;
          background: #f2f2f2;
          text-align: center;
          color:#4c4c4c;
          font-size:14px;
        }
        /deep/ .layout-two{
          display: inline-block;
          height:26px;
          line-height:26px;
          width:75px;
          border-radius: 4px;
          background: #f2f2f2;
          text-align: center;
          color:#4c4c4c;
          font-size:14px;
        }
        /deep/ .layout-two:nth-child(1){
          margin-right:10px;
        }
        /deep/ .layout-three{
          display: inline-block;
          height:26px;
          line-height:26px;
          width:50px;
          border-radius: 4px;
          background: #f2f2f2;
          text-align: center;
          color:#4c4c4c;
          font-size:14px;
        }
        /deep/ .layout-three:nth-child(1){
          margin-right:5px;
        }
        /deep/ .layout-three:nth-child(2){
          margin-right:5px;
        }
        .hide-area{
          display: none;
        }
      }
      .no-drag{
        cursor: default;
      }
    }
  }

  .component-box-close{
    ul{
      list-style: none;
      margin:0;
      padding:0;
      li{
        height:58px;
        line-height:58px;
        border-bottom:1px solid #ccd0d3;
        text-align: center;
        color:#4c4c4c;
        cursor: pointer;
        i{
          font-size:26px;
          vertical-align: middle;
          // margin-top:14px;
          // margin-bottom:4px;
          margin:0;
        }
        &:hover{
          background: #f6f6f6;
          @include base-active-color();
        }
      }
      li:nth-child(1){
        height:58px;
        line-height:58px;
        i{
          margin:0;
        }
      }
    }
  }

  .drag-ghost{
    list-style: none;
    width: 100%;
    padding:0;
    margin:0;
    div{
      display: none;
    }
    .hide-area{
      display:block;
    }
  }
</style>