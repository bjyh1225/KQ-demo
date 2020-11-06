<template>
  <el-row>
    <el-col :span="12" class="img-container">
      <img src="~img/noAuthority.jpg" alt="noAuthority"/>
    </el-col>
    <el-col :span="12" class="text-container">
      <p>抱歉，检查到您当前的授权无效</p>
      <p>Sorry, you have no valid license.</p>
      <p>请检查授权文件是否存在或授权是否已过期，或点击下方按钮查看授权方式</p>
      <el-button type="primary" @click="queryAuthority">查看授权方式</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "ErrorNoAuthority",
  components: {},
  methods: {
    queryAuthority: function() {
      this.$router.push({
        path:"/helpcenter",
        query:{
          path:"getLicense"
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.img-container {
  text-align: right;
  padding-right:5%;
  img {
    margin-top: 180px;
    width: 245px;
    height: 194px;
  }
}
.text-container {
  margin-top: 150px;
  p:nth-child(1) {
    font-size: 30px;
    color: #1582f0;
  }
  p:nth-child(2) {
    font-size: 20px;
    font-weight: bold;
  }
  p:nth-child(3) {
    font-size: 16px;
    color: #868686;
  }
  .el-button {
    width: 200px;
    margin-top: 20px;
  }
}
</style>