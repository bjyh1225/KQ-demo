<template>
  <el-row class="header">
    <el-col :span="12">
      <el-image :src="logo"></el-image>
    </el-col>
    <el-col :span="12" class="search-btn-area">
      <el-input :placeholder="'请输入搜索内容'" v-model="searchKey"></el-input>
      <span class="go-back el-icon-portal-zhuye" @click="goback">返回首页</span>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name:"HelpCenter",
  data(){
    return {
      logo:'/config/imageConfig/system/logo/helpCenterLogo/chinese/logo.png',
      searchKey:""
    }
  },
  methods:{
    goback(){
      this.$router.push("/")
    }
  }
}
</script>

<style lang="scss" scoped>
  
  .header{
    height:60px;
    line-height:60px;
    background: #273142;
    .el-col{
      height:60px;
      line-height:60px;
    }
    .el-image{
      height:34px;
      vertical-align: middle;
      margin-left: 20px;
    }
    .search-btn-area{
      text-align: right;
      .el-input{
        width:248px;
      }
      .go-back{
        margin-right:30px;
        margin-left:80px;
        color:#fff;
        font-size:16px;
        cursor: pointer;
      }
    }
  }
</style>
