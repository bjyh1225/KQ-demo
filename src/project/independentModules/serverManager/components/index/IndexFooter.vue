<template>
  <div class="footer">
    copyright@2020 苍穹数码 All rights reserved<el-divider direction="vertical"></el-divider>苍穹数码技术股份有限公司<el-divider direction="vertical"></el-divider>京ICP备05037423号
  </div>
</template>

<script>
export default {
  name:"IndexFooter",
}
</script>

<style lang='scss' scoped>
  .footer{
    height:74px;
    line-height:74px;
    text-align: center;
    background: #021939;
    font-size:14px;
    color:#fff;
    .el-divider{
      margin:0 20px;
    }
  }
</style>