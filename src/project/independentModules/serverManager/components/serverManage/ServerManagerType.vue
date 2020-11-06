<template>
  <div class="server-manager-type">
    <div class="title">
      <i class="kqserver-fenlei"></i>分类
    </div>
    <div class="type-list">
      <span v-for="item in typeList" :key="item.name" class="type-desc" :class="{'is-active':typeActiveName==item.name}" @click="typeClick(item)">{{item.aliasName}}</span>
    </div>
  </div>
</template>

<script>
//服务管理分类
export default {
  name:"ServerManagerType",
  props:{
    typeList:{
      type:Array,
      default:()=>{
        return [];
      }
    },
    typeActiveName:{
      type:String,
      default:""
    }
  },
  methods:{
    typeClick(info){
      this.$emit('typeClick',info);
    }
  }
}
</script>

<style lang='scss' scoped>
  .server-manager-type{
    border:1px solid #ebebeb;
    .title{
      font-size:14px;
      height:38px;
      line-height:38px;
      color:#242424;
      border-bottom:1px solid #ebebeb;
      padding-left:20px;
      i{
        color:#3691e9;
        margin-right:6px;
      }
    }
    .type-list{
      min-height:200px;
      padding:20px;
      .type-desc{
        display: inline-block;
        border:1px solid #dcdfe6;
        font-size:14px;
        color:#606266;
        margin:0 10px 15px 0;
        padding:8px;
        cursor: pointer;
        border-radius: 5px;
        &:hover{
          border:1px solid #3691e9;
          color:#3691e9;
        }
      }
      .is-active{
        border:1px solid #3691e9;
        color:#fff;
        background: #3691e9;
        &:hover{
          color:#fff;
        }
      }
    }
  }
</style>