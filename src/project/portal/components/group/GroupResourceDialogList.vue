<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="tabClick" type="card">
      <el-tab-pane :label="item.label" :name="item.name" v-for="item in tabData" :key="item.name">
        <group-resource-dialog-lists 
        :shareResourceList="shareResourceList"
        :pageIndex="pageIndex"
        :pageSize="pageSize"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @share="share"
        @details="details"
        ></group-resource-dialog-lists>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import GroupResourceDialogLists from './GroupResourceDialogLists'
export default {
  name:"GroupResourceDialogList",
  components:{
    GroupResourceDialogLists
  },
  props:{
    shareResourceList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    pageIndex:{
      type:Number,
      default:1
    },
    pageSize:{
      type:Number,
      default:10
    },
    total:{
      type:Number,
      default:0
    },
    tabData:{
      type:Array,
      default:()=>{
        return []
      }
    },
    initActiveName:{}
  },
  data(){
    return {
      activeName:"map"
    }
  },
  watch:{
    initActiveName(){
      this.activeName='map';
    }
  },
  methods:{
    tabClick(){
      this.$emit('tabClick',this.activeName);
    },
    handleSizeChange(val){
      this.$emit('handleSizeChange',val);
    },
    handleCurrentChange(val){
      this.$emit('handleCurrentChange',val);
    },
    share(resource){
      this.$emit('share',resource);
    },
    details(view){//查看详情
      this.$emit('groupViewDetails',view);
    }
  }
}
</script>

<style>

</style>