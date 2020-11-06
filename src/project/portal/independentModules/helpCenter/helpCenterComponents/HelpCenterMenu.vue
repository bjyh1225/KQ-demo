<template>
  <div class="menu" :style="'height:'+height+'px;'">
    <div class="input-search">
      <!-- <el-input v-model="searchKey" placeholder="请输入目录关键字"></el-input> -->
      <el-autocomplete
        class="inline-input"
        v-model="searchKey"
        :fetch-suggestions="querySearch"
        :placeholder="'请输入目录关键字'"
        :trigger-on-focus="false"
        @select="handleSelect"
      >
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-autocomplete>
    </div>
    <div class="tree-area" :style="'height:'+(height-61)+'px;'">
      <el-scrollbar class="scroll">
        <el-tree :data="menuData" 
        :props="menuTableProps" 
        :highlight-current="true"
        :default-expand-all="true"
        :expand-on-click-node="false"
        @node-click="handleNodeClick" 
        :node-key="'name'"
        ref="helpCenterMenu"
        ></el-tree>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
import { filterTreeArrayByString } from "@/utils/filterUtils.js";
export default {
  name:"HelpCenterMenu",
  props:{
    height:{
      type:Number,
      default:700
    },
    menuData:{
      type:Array,
      default:()=>{
        return []
      }
    },
    menuTableProps:{
      type:Object,
      default:()=>{
        return {
          children: 'children',
          label: 'label'
        }
      }     
    },
    currentSelectedMenuInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    menuClickTimeStamp:{}
  },
  watch:{
    menuClickTimeStamp(){
      this.$refs.helpCenterMenu.setCurrentKey(this.currentSelectedMenuInfo.name);
    }
  },
  data(){
    return {
      searchKey:""
    }
  },
  methods:{
    handleNodeClick(data){
      if(data.type=="document"){
        this.$emit("menuClick",data);
      }
    },
    querySearch(queryString, cb) {
      var cloneData = JSON.parse(JSON.stringify(this.menuData));
      cloneData[0].typeName = "";
      var results = filterTreeArrayByString(cloneData, queryString, "label");
      if (results.length == 0) {
        results.push({ value:"暂无结果" });
      }
      cb(results);
    },
    handleSelect(item){
      if(item.name){
        // this.$refs.helpCenterMenu.setCurrentKey(item.name);
        if(item.type=="document"){
          this.$emit("menuClick",item);
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  
  .menu{
    padding:0 10px;
    box-sizing: border-box;
    width:300px;
    border-right:1px solid #dfdfdf;
    .input-search{
      height:60px;
      line-height: 60px;
      border-bottom:1px solid #dfdfdf;
      text-align: center;
      .el-input{
        /deep/ .el-input__inner{
          border-radius: 20px;
          width: 94%;
        }
      }
    }
    .tree-area{
      .scroll {
        height: 100%;
      }
      /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
      }
      /deep/ .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{
        @include tree-highlight();
      }
    }
  }
</style>
