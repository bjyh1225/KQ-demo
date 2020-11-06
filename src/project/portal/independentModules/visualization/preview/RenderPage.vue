<template>
  <el-row class="render-page">
    <component v-for="(el,ix) in dataList" :key="el.id" v-bind:is="el.componentName" :current="el" :parentList="dataList" :currentix="ix" :pageStatus="'preview'" :styleConf="el.styleConf"
      :propsConf="el.propsConf"></component>
  </el-row>
</template>

<script>
  import componentsTree from 'portal/independentModules/visualization/config/previewAll.js'
  export default {
    name: "RenderPage",
    components:{
      ...componentsTree
    },
    props:{
      dataList:{
        type:Array,
        default:()=>{
          return []
        }
      }
    }
  }
</script>

<style lang='scss' scoped>
</style>