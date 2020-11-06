<template>
  <div class="property-set">
    <div class="title">
      <i class="el-icon-close" @click="close"></i>
      <span>{{$t('visualization.Properties')}}</span>
    </div>
    <div class="property-set-body" :style="'height:'+(heightInfo-41)+'px;'">
      <el-scrollbar class="scroll">
        <component v-bind:is="currentPropertySetInfo.propertySetComponentName" :currentPropertySetInfo="currentPropertySetInfo"></component>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import propertySet from 'portal/independentModules/visualization/config/propertySet.js'
export default {
  name: "VisualizationPropertySet",
  components:{
    ...propertySet
  },
  props:{
    currentPropertySetInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    heightInfo:{
      type:Number,
      default:300
    }
  },
  watch:{
    currentPropertySetInfo(){
      this.currentPropertySetInfo.sort="1200"
    }
  },
  methods:{
    close(){
      this.$emit('close');
    }
  }
};
</script>

<style lang='scss' scoped>
  
  .property-set{
    background: #fff;
    width:290px;
    box-shadow:0px 12px 10px 2px rgba(0,0,0,.2);
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
    .property-set-body{
      .scroll {
        height: 100%;
      }
      /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }

</style>