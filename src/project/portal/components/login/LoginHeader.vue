<template>
  <div class="header-main">
    <el-row>
      <el-col :span="8">
        <el-image v-if="logoUrl" :src="logoUrl" :fit="'cover'" class="login-logo">
          <div slot="error" class="image-slot">
            <img src="/config/imageConfig/system/logo/normalLogo/logo.png" alt />
          </div>
        </el-image>
        <el-image
          v-else
          src="/config/imageConfig/system/logo/normalLogo/logo.png"
          :fit="'cover'"
          class="login-logo"
        >
          <div slot="error" class="image-slot">
            <img src="/config/imageConfig/system/logo/normalLogo/logo.png" alt />
          </div>
        </el-image>
      </el-col>
      <el-col :span="16">
        <el-menu class="el-menu-demo" mode="horizontal">
          <!-- <el-menu-item>
            <router-link to="/">{{$t('myCenter.Register')}}</router-link>
          </el-menu-item>-->
          <el-menu-item>
            <router-link to="/">{{$t('myCenter.Homepage')}}</router-link>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  defaultHeader,
  defaultComponents
} from "portal/independentModules/visualization/config/defaultVisualization.js";
export default {
  name: "LoginHeader",
  data() {
    return {
      headerInfo: defaultHeader,
      logoUrl: ""
    };
  },
  mounted() {
    //请求可视化构建首页的数据
    var visualizationHeadInfo = this.$store.getters.visualizationHeadInfo;
    if (JSON.stringify(visualizationHeadInfo) == "{}") {
      this.$api.visualizationApi
        .getSysParamConfigureByKey(
          {
            key: "visualizationInfo"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          var data = res.data.data.value;
          if (data) {
            data = JSON.parse(this.Base64.decode(data));
            if (data.dataList.length > 0) {
              this.$store.dispatch(
                "visualization/setVisualizationComponents",
                data.dataList
              );
            } else {
              this.$store.dispatch(
                "visualization/setVisualizationComponents",
                defaultComponents
              );
            }
            this.headerInfo = data.headerInfo;
            this.logoUrl = this.headerInfo.imgList[0].url;
            this.$store.dispatch(
              "visualization/setVisualizationHeadInfo",
              data.headerInfo
            );
          } else {
            this.$store.dispatch(
              "visualization/setVisualizationComponents",
              defaultComponents
            );
          }
        })
        .catch(() => {});
    } else {
      if (this.$store.getters.visualizationHeadInfo.imgList.length != 0) {
        this.logoUrl = this.$store.getters.visualizationHeadInfo.imgList[0].url;
      } else {
        this.logoUrl = this.$store.getters.visualizationHeadInfo.imgListUrl;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~@/style/params.scss";
.header-main {
  background:rgba(255,255,255,0.1);
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