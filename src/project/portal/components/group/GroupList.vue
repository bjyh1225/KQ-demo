<template>
  <el-row :gutter="40" class="group-list">
    <el-col :span="6">
      <group-filter-menu
      @filterGroupList="filterGroupList"
      :filterInfo="filterInfo"
      ></group-filter-menu>
    </el-col>
    <el-col :span="18">
      <group-content-list 
      @groupAdd="groupAdd" 
      @groupDetails="groupDetails"
      :groupList="groupList"
      :pageIndex="pageIndex"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :filterInfo="filterInfo"
      :orderByInfo="orderByInfo"
      @search="search"
      @sortChange="sortChange"
      @applyJoinGroup="applyJoinGroup"
      :timeStamp="timeStamp"
      :task="task"
      ></group-content-list>
    </el-col>
  </el-row>
</template>

<script>
import GroupFilterMenu from './GroupFilterMenu'
import GroupContentList from './GroupContentList'
export default {
  name:"GroupList",
  props:{
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    groupList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    filterInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    orderByInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    task:{      
      type:Object,
      default:()=>{
        return {}
      }
    },
    timeStamp:{}
  },
  components:{
    GroupFilterMenu,
    GroupContentList
  },
  methods:{
    groupAdd(){
      this.$emit('groupAdd')
    },
    groupDetails(id){
      this.$emit('groupDetails',id);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange",val);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange",val);
    },
    search(){
      this.$emit('filterGroupList');
    },
    filterGroupList(){
      this.$emit("filterGroupList");
    },
    sortChange(){
      this.$emit("filterGroupList");
    },
    applyJoinGroup(val){
      this.$emit('applyJoinGroup',val);
    }
  }
}
</script>

<style lang="scss" scoped>
  .group-list{
    padding:15px 2%;
    min-height:700px;
    background: #f5f5f5;
  }
</style>