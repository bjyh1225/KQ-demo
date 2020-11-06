<template>
  <div class="server-manager-list-search">
    <el-row class="search-area">
      <el-col :span="6" class="page-info">
        <span>{{from}}-{{to}}</span>
        <span>/</span>
        <span>{{total}}</span>
      </el-col>
      <el-col :span="18" class="search">
        <el-input placeholder="搜索服务" v-model="searchInfo.searchKey" @keyup.enter.native="search">
        </el-input>
        <el-button type="primary" class="base-btn" @click="search">搜索</el-button>
        <i class="kqserver-liebiao1 grid-icon switch-icon" :class="{'is-active':displayStyle=='grid'}" @click="switchDisplay('grid')"></i>
        <i class="kqserver-liebiao table-icon switch-icon" :class="{'is-active':displayStyle=='list'}" @click="switchDisplay('list')"></i>
      </el-col>
    </el-row>
    <el-row class="sort-area">
      <el-col :span='18' class="type" v-if="searchTypeVisible">
        <el-row>
          <el-col :span="3" class="left">
            分类：
          </el-col>
          <el-col :span="21" class="right">
            <span v-for="item in typeList" :key="item.name" class="type-desc" :class="{'is-active':typeActiveName==item.name}" @click="typeClick(item)">{{item.aliasName}}</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="colNum" class="sort" :class="{'sort-with-type':searchTypeVisible}">
        <span class="label">排序依据</span>
        <span style="font-size:14px;margin-right:3px;">:</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="el-dropdown-label">{{sortList[searchInfo.order]}}</span><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="lastModifyTime">最新修改</el-dropdown-item>
            <el-dropdown-item command="name">服务名称</el-dropdown-item>
            <el-dropdown-item command="serviceHits">访问次数</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i class="kqserver-ziyuan sort-btn" v-if="searchInfo.orderSort=='desc'" @click="sortChange('asc')"></i>
        <i class="kqserver-ziyuan1 sort-btn" v-else  @click="sortChange('desc')"></i>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"ServerManagerListSearch",
  props:{
    searchTypeVisible:{
      type:Boolean,
      default:false
    },
    displayStyle:{
      type:String,
      default:'grid'
    },
    pageIndex:{
      type:Number,
      default:1
    },
    pageSize:{
      type:Number,
      default:12
    },
    total:{
      type:Number,
      default:0
    },
    searchInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    typeList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    typeActiveName:{
      type:String,
      default:""
    }
  },
  watch:{
    searchTypeVisible(){
      if(this.searchTypeVisible){
        this.colNum=6;
      }
      else{
        this.colNum=24;
      }
    }
  },
  computed:{
    from(){
      if(this.total==0){
        return 0;
      }
      else{
        return this.pageSize*this.pageIndex-this.pageSize+1;
      }
    },
    to(){
      if(this.total==0){
        return 0;
      }
      else if(this.total<=this.pageSize*this.pageIndex){
        return this.total;
      }
      else{
        return this.pageSize*this.pageIndex;
      }
    }
  },
  data(){
    return {
      colNum:24,
      searchKey:"",
      radio:'',
      sortActiveName:"最新修改",
      sortStatus:true,
      sortList:{
        lastModifyTime:"最新修改",
        name:"服务名称",
        serviceHits:"访问次数"
      }
    }
  },
  methods:{
    switchDisplay(type){
      this.$emit('switchDisplay',type);
    },
    search(){
      this.$emit("refresh");
    },
    sortChange(type){
      this.searchInfo.orderSort=type;
      this.$emit("refresh");
    },
    handleCommand(command){
      this.searchInfo.order=command;
      this.$emit("refresh");
    },
    typeClick(info){
      this.$emit('typeClick',info);
    }
  }
}
</script>

<style lang='scss' scoped>
  .server-manager-list-search{
    .search-area{
      background:#fff;
      height:40px;
      line-height:40px;
      .page-info{
        font-size:14px;
        padding-left:10px;
        color:#818181;
        span:nth-child(1){
          margin-right:5px;
        }
        span:nth-child(3){
          margin-left:5px;
        }
      }
    }
    .search{
      text-align:right;
      font-size:0;
      padding-right:10px;
      .el-input{
        width:380px;
        /deep/.el-input__inner{
          height:30px;
          border-radius:0;
        }
      }
      .el-button{
        padding: 0 10px;
        height: 30px;
        line-height: 28px;
        border-radius: 0;
        margin-right:20px;
        background:#3691e9;
        border-color:#3691e9;
      }
      .switch-icon{
        display: inline-block;
        height:30px;
        line-height: 28px;
        border:1px solid #dcdfe6;
        width:36px;
        text-align: center;
        color:#606266;
        cursor: pointer;
        &:hover{
          color:#3691e9;
        }
      }
      .table-icon{
        width:34px;
        border-left:none;
      }
      .is-active{
        color:#3691e9;
        position:relative;
        &::after{
          content:'';
          display:block;
          position: absolute;
          bottom:-1px;
          height:3px;
          width:100%;
          background:#3691e9;
        }
      }
    }
    .sort-area{
      .sort{
        line-height:30px;
        padding-right:10px;
        text-align:right;
        font-size:0px;
        .label{
          font-size:14px;
          color:#242424;
          margin-right:5px;
        }
        .el-dropdown-link{
          cursor: pointer;
          margin-right:10px;
          .el-dropdown-label{
            color:#3691e9;
          }
        }
        .sort-btn{
          cursor: pointer;
          &:hover{
            color:#3691e9;
          }
        }
      }
      .sort-with-type{
        margin:10px 0;
      }
      .type{
        margin:10px 0;
        font-size:14px;
        color:#242424;
        .left{
          width:50px;
          line-height:30px;
        }
        .right{
          span{
            padding:0 6px;
            display:inline-block;
            margin-right:10px;
            line-height:30px;
            cursor: pointer;
            &:hover{
              color:#3691e9;
            }
          }
          .is-active{
            border:1px dotted #3691e9;
            color:#3691e9;
          }
        }
      }
    }
  }
</style>