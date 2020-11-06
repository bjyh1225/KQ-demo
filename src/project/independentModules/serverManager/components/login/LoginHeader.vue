<template>
  <div class="header-main">
    <el-row>
      <el-col :span="8">
        <el-image :src="logoUrl" class="login-logo"></el-image>
      </el-col>
      <el-col :span="16">
        <el-menu class="el-menu-demo" mode="horizontal">
          <!-- <el-menu-item>
            <router-link to="/">{{$t('myCenter.Register')}}</router-link>
          </el-menu-item>-->
          <el-menu-item>
            <router-link to="/">首页</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LoginHeader",
  data() {
    return {
      logoUrl: require('app/serverManager/images/logo/logo.png')
    };
  }
};
</script>

<style lang='scss' scoped>
@import "~@/style/params.scss";
.header-main {
  width: 100%;
  height: 66px;
  // box-shadow: 0px 0px 6px #999;
}
.el-col {
  height: 66px;
  line-height: 66px;
  .el-menu {
    border: none;
    background: none;
    .el-menu-item {
      height: 66px;
      line-height: 66px;
      font-size: 14px;
      color: #fff;
      float: right;
      background: none;
      a {
        &:hover {
          color: #409eff;
          background: none;
        }
      }
    }
  }
}
a {
  text-decoration: none;
}
.login-logo {
  // width: 308px;
  // height: 40px;
  vertical-align: middle;
  margin-left: 30px;
  /deep/.image-slot {
    vertical-align: inherit;
    img {
      vertical-align: inherit;
    }
  }
}

/deep/.el-image__inner {
  vertical-align: inherit;
}
</style>