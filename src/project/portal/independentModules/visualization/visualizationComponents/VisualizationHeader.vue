<template>
  <el-row class="visualization-header">
    <el-col :span="12">
      <el-image :src="logoURL" :fit="'cover'">
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline text"></i>
        </div>
      </el-image>
    </el-col>
    <el-col :span="12">
      <div class="header-btn" @click="goBack">
        <i class="el-icon-portal-tuichu"></i>
        <br />
        <span>{{$t('visualization.back')}}</span>
      </div>
      <div class="header-btn" @click="clear">
        <i class="el-icon-portal-shanchu"></i>
        <br />
        <span>{{$t('visualization.Empty')}}</span>
      </div>
      <div class="header-btn" @click="preview">
        <i class="el-icon-portal-yulan1"></i>
        <br />
        <span>{{$t('visualization.Preview')}}</span>
      </div>
      <div class="header-btn" @click="save">
        <i class="el-icon-portal-u"></i>
        <br />
        <span>{{$t('visualization.Save')}}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: "VisualizationHeader",
    data() {
      return {
        logoURL:"",
        englishLogo:require("img/visualization/logo_e.jpg"),
        chineseLogo:require("img/visualization/logo.jpg")
      };
    },
    methods: {
      goBack() {
        this.$emit("goBack");
      },
      preview() {
        this.$emit("preview");
      },
      save() {
        this.$emit("save");
      },
      clear() {
        this.$confirm(this.$t('visualization.AreYouSureToDeleleAll'))
        .then(() => {
          this.$emit("clear");
        })
        .catch(() => {});
      }
    },
    created(){
      //国际化样式处理
      if(this.$store.getters.language=='english'){
        this.logoURL=this.englishLogo;
      }
      else{
        this.logoURL=this.chineseLogo;
      }
    }
  };
</script>

<style lang='scss' scoped>
  
  .visualization-header {
    height: 67px;
    line-height: 67px;
    border-bottom: 1px solid #ccd0d3;
    /deep/ .el-image {
      margin-left: 30px;
      .el-image__inner {
        vertical-align: middle;
      }
    }
    .header-btn {
      float: right;
      width: 90px;
      height: 64px;
      line-height: 16px;
      text-align: center;
      color: #4c4c4c;
      cursor: pointer;
      i {
        font-size: 28px;
        margin-top: 8px;
        margin-bottom: 4px;
      }
      span {
        font-size: 15px;
      }
      &:hover {
        @include base-active-underline( $width: 2px,
        $types: ( "bottom"));
        background: #f6f6f6;
        @include base-active-color();
      }
    }
  }

  .el-col {
    height: 66px;
    line-height: 66px;
  }

  //图片默认
  .image-slot {
    background: #f5f7fa;
    width: 100%;
    height: 100%;
    line-height: 100%;
    text-align: center;
    display: table;
    .text {
      font-size: 14px;
      color: #909399;
      display: table-cell;
      vertical-align: middle;
    }
    .el-icon-picture-outline {
      font-size: 26px;
    }
  }
</style>