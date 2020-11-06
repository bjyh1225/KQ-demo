<template>
  <div class="group-menu">
    <span class="title">{{$t('myCenter.Group')}}</span>
    <div v-if="activeName=='list'" class="right-area">
      <div class="search-area">
        <el-input
          :placeholder="$t('service.pleaseEnterKEY')"
          v-model="filterInfo.search"
          class="search-input"
          @keyup.enter.native="search"
        >
          <el-button slot="append" @click="search" class="base-btn search-button">{{$t('service.search')}}</el-button>
        </el-input>
      </div>
      <el-button class="base-btn add-group-btn" type="primary" icon="el-icon-portal-qunzu" @click="groupAdd">{{$t('group.Creategroup')}}</el-button>
    </div>
    <div v-else class="right-area">
      <span class="go-back" @click="goToList"><i class="el-icon-back"></i>{{$t('group.Backtogrouplist')}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GroupMenu",
  props:{
    activeName:{
      type:String,
      default:'list'
    },
    filterInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  methods:{
    search(){
      this.$emit('filterGroupList');
    },
    groupAdd(){
      this.$emit('groupAdd')
    },
    goToList(){
      this.$emit('goToList')
    }
  }
};
</script>

<style lang='scss' scoped>

.group-menu {
  height: 48px;
  line-height: 48px;
  background:#fff;
  border-bottom:1px solid #dfdfdf;
  padding:0 2%;
  color:#4c4c4c;
  .title{
    display: inline-block;
    height: 48px;
    &::after {
      content: "";
      width: 100%;
      height: 3px;
      @include menu-active-bg();
      position: absolute;
      bottom: -2px;
      left: 0px;
    }
    position: relative;
    @include menu-active-color();
  }
  .right-area{
    float: right;
    height: 48px;
    line-height: 48px;
    .search-area{
      display: inline-block;
      margin-right:30px;
      vertical-align: middle;
    }
    .search-input{
      // line-height: 0;
      /deep/ .el-input__inner{
        border-radius: 0;
        width: 350px;
        height: 30px;
        line-height: 30px;
        // box-sizing: border-box;
      }
      /deep/ .el-input-group__append{
        border-radius: 0;
        border:none;
        height:30px;
        padding: 0;
        .search-button{
          border-radius: 0;
          margin: 0;
          padding:0px 15px;
          height:30px;
          // line-height: 30px;
          // box-sizing: border-box;
        }
      }
    }
    .add-group-btn{
      border-radius: 0;
      padding:0px 15px;
      height:30px;
      line-height: 30px;
      box-sizing: border-box;
      vertical-align: middle;
    }
    .go-back{
      @include base-active-color();
      font-size:14px;
      cursor: pointer;
    }
  }
}
</style>