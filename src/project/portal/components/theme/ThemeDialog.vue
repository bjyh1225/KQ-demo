<template>
  <div class="theme-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="705px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t("theme.theme")}}</span>
        </div>
      </template>
      <el-row class="dialog-body" :gutter="10">
        <el-col :span="5" v-for="(item,ix) in themeList" :key="ix">
          <div
            class="theme-color"
            :style="'background:'+item.themeColor+';'"
            @mouseenter="maskShow"
            @mouseleave="maskHide"
            @click="switchTheme(item.themeCode)"
          >
            <div class="mask"></div>
            <i class="el-icon-portal-duihao- active-icon" v-show="activeCode==item.themeCode"></i>
          </div>
          <p>{{$t(item.themeName)}}</p>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="base-btn" @click="save">{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getThemeList} from 'common/config/theme/theme.js'
export default {
  name: "ThemeDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        var themecode = localStorage.getItem("themecode");
        if (themecode) {
          this.activeCode = themecode;
        } else {
          this.activeCode = "default-theme";
        }
      }
    }
  },
  data() {
    return {
      themeList: [],
      activeCode: ""
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    save() {
      this.$api.themeApi
        .saveCustomTheme({ themeCode: this.activeCode })
        .then(() => {
          this.handleClose();
          this.$message({
            message: this.$t("theme.successfulHandover"),
            type: "success"
          });
          localStorage.setItem("themecode", this.activeCode);
          document.body.setAttribute("data-theme", this.activeCode);
          this.$store.dispatch('theme/setTheme', this.activeCode);
        })
        .catch(() => {
          localStorage.setItem("themecode", "");
        });
    },
    maskShow(e) {
      e.currentTarget.getElementsByClassName("mask")[0].style.display = "block";
    },
    maskHide(e) {
      e.currentTarget.getElementsByClassName("mask")[0].style.display = "none";
    },
    switchTheme(themeCode) {
      this.activeCode = themeCode;
    }
  },
  mounted(){
    this.themeList=getThemeList();
  }
};
</script>

<style lang='scss' scoped>

.theme-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-body {
    @include manage-border(
      $types: (
        "bottom"
      )
    );
    .theme-color {
      cursor: pointer;
      height: 125px;
      width: 125px;
      position: relative;
      .mask {
        display: none;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.1);
        z-index: 999;
      }
      .active-icon {
        color: #fff;
        font-size: 20px;
        position: absolute;
        right: 10px;
        top: 10px;
      }
    }
    p {
      width: 125px;
      text-align: center;
      margin-top: 10px;
      margin-bottom: 18px;
    }
    .el-col-5 {
      width: 20%;
    }
  }
  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom"
      )
    );
    span {
      @include dialog-title($width: 2px);
      padding-bottom: 18px;
    }
  }
  /deep/ .el-cascader {
    width: 100%;
  }
  .el-form {
    padding: 0px 100px;
  }
}
</style>