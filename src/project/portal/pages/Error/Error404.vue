<template>
  <el-row>
    <el-col :span="14" class="img-container">
      <img src="~img/404.png" alt="404" />
    </el-col>
    <el-col :span="10" class="text-container">
      <p>{{$t('myCenter.Sorrypagenotfound')}}</p>
      <p>Sorry, the site now can not be accessed.</p>
      <p>{{$t('myCenter.ThepageyourequestedisnotfoundnowWerecommendthatyoureturntothehomepagetobrowseThankyou')}}</p>
      <el-button type="primary" @click="enterIndex">{{$t('myCenter.Gotothehomepage')}}</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Error404",
  components: {},
  methods: {
    enterIndex: function() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang='scss' scoped>
.img-container {
  img {
    width: 100%;
    height: 556px;
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