<template>
  <el-row class="data-catalog-header">
    <el-col :span="12" class="left">
      <span>数据管理</span>
    </el-col>
    <el-col :span="12" class="right">
      <div class="search">
        <el-input placeholder="搜索数据" v-model="searchInfo.searchKey" @keyup.enter.native="search">
        </el-input>
        <el-button type="primary" class="base-btn" @click="search">搜索</el-button>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name:"DataCatalogHeader",
  props:{
    searchInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  methods:{
    search(){

    }
  }
}
</script>

<style lang='scss' scoped>
  .data-catalog-header{
    width: 100%;
    height: 48px;
    line-height: 48px;
    background: #fff;
    border-bottom: 1px solid #dfdfdf;
    padding: 0 2%;
    color: #4c4c4c;
    .left{
      @include base-active-color();
      span{
        @include dialog-title($width: 3px);
        padding-bottom: 13px;
      }
    }
    .right{
      .search{
        text-align:right;
        font-size:0;
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
        }
      }
    }
  }
</style>