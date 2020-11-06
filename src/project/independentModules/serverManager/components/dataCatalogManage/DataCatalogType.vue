<template>
  <div class="data-catalog-type">
    <div class="title">
      <i class="kqserver-fenlei"></i>类型
    </div>
    <div class="type-list">
      <span v-for="item in typeList" :key="item.name" class="type-desc" :class="{'is-active':typeActiveName==item.name}" @click="typeClick(item)">{{item.name}}</span>
    </div>
  </div>
</template>

<script>
//数据目录分类
export default {
  name:"DataCatalogType",
  props:{
    typeActiveName:{
      type:String,
      default:""
    }
  },
  data(){
    return {
      typeList:[
        {
          name:"自管数据库"
        },
        {
          name:"托管数据库"
        },
        {
          name:"共享目录"
        }
      ]
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
  .data-catalog-type{
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
      min-height:80px;
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