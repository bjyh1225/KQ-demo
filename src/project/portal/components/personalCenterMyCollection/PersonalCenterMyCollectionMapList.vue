<template>
  <el-row :gutter="22">
    <el-col
      v-for="(item,ix) in favoritesResourceList"
      :key="ix"
      :class="{'grid-layout':layout=='grid','list-layout':layout=='list','animated':true,'fadeInUp':layout=='grid','fadeInRight':layout=='list'}"
      :span="layoutWidth"
      :style="'animation-delay:'+ix*50+'ms'"
    >
      <el-row class="container">
        <el-col
          class="img-container"
          :span="imgContainerWidth"
          @mouseenter.native="collectShow"
          @mouseleave.native="collectHide"
          @click.native="collectViewDetails(item)"
        >
          <!-- <i
            class="remark-btn"
            :class="item[conf.type]=='mapService'?'el-icon-portal-diqiu':'el-icon-portal-gongju'"
            v-if="item[conf.type]=='mapService'||item[conf.type]=='functionService'"
          ></i>-->
          <el-image
            :src="item[conf.url]?item[conf.url]:defaultImgMap[item[conf.type]]?defaultImgMap[item[conf.type]]:defaultImg"
            :fit="'cover'"
          >
            <div slot="placeholder" class="image-slot">
              <span class="text">{{$t('myCenter.Loading')}}...</span>
            </div>
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline text"></i>
            </div>
          </el-image>
          <div class="mask"></div>
          <i
            class="el-icon-portal-shoucang2 collection-btn"
            @click="cancelCollection(item)"
            @click.stop
          ></i>
        </el-col>
        <el-col class="details-container" :span="detailsContainerWidth">
          <el-tooltip class="item" effect="light" :content="item[conf.title]" placement="bottom">
            <el-row class="title">{{item[conf.title]}}</el-row>
          </el-tooltip>
          <el-row class="author-time" v-show="layout=='list'">
            <span>{{$t('service.author')}}：{{item[conf.author]}}</span>
            <span>{{$t('service.time')}}：{{item[conf.time]}}</span>
          </el-row>
          <el-row class="desc" v-show="layout=='list'">
            <span>{{$t('service.introduction')}}：{{item[conf.desc]?item[conf.desc]:$t('service.noIntroduction')}}</span>
          </el-row>
          <el-row class="btn-group" v-show="layout=='list'">
            <el-button
              class="el-icon-portal-shoucang2"
              @click="cancelCollection(item)"
            >{{$t('myCenter.CancelCollection')}}</el-button>
          </el-row>
        </el-col>
      </el-row>
    </el-col>
    <personal-center-service-details-dialog ref="serviceDetails"></personal-center-service-details-dialog>
  </el-row>
</template>

<script>
import PersonalCenterServiceDetailsDialog from "components/personalCenterService/PersonalCenterServiceDetailsDialog";
export default {
  name: "PersonalCenterMyCollectionMapList",
  components: {
    PersonalCenterServiceDetailsDialog
  },
  props: {
    layout: {
      type: String,
      default: "grid"
    },
    favoritesResourceList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    fieldConf: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    layoutWidth() {
      if (this.layout == "grid") {
        return 6;
      } else {
        return 24;
      }
    },
    imgContainerWidth() {
      if (this.layout == "grid") {
        return 24;
      } else {
        return 8;
      }
    },
    detailsContainerWidth() {
      if (this.layout == "grid") {
        return 24;
      } else {
        return 16;
      }
    },
    conf() {
      var field = {
        url: "url",
        title: "title",
        author: "author",
        time: "time",
        desc: "desc",
        type: "type"
      };
      return Object.assign(field, this.fieldConf);
    }
  },
  methods: {
    // 查看详情
    collectViewDetails(val) {
      if (this.$store.getters.isLogin) {
        this.$refs.serviceDetails.viewDetails(val);
      } else {
        this.$message({
          message: this.$t("service.PleaseLoginToViewDetails"),
          type: "warning"
        });
      }
    },
    collectShow(e) {
      if (this.layout == "list") {
        return false;
      }
      e.currentTarget.getElementsByClassName("mask")[0].style.display = "block";
      e.currentTarget.getElementsByClassName(
        "collection-btn"
      )[0].style.display = "block";
    },
    collectHide(e) {
      if (this.layout == "list") {
        return false;
      }
      e.currentTarget.getElementsByClassName("mask")[0].style.display = "none";
      e.currentTarget.getElementsByClassName(
        "collection-btn"
      )[0].style.display = "none";
    },
    cancelCollection(item) {
      this.$emit("cancelCollectionInfo", item);
    }
  },
  data() {
    return {
      defaultImgMap: {
        mapService: "/config/imageConfig/function/mapService/mapService1.png",
        functionService:
          "/config/imageConfig/function/functionService/functionService1.png",
        appbuilder: "/config/imageConfig/function/app/app1.png",
        sceneService:
          "/config/imageConfig/function/threeDimensional/threeDimensional1.png",
        dataService:
          "/config/imageConfig/function/dataService/dataService1.png",
        fileService: "/config/imageConfig/function/file/compress.png",
        data: "/config/imageConfig/function/data/data1.png"
      },
      defaultImg:
        "/config/imageConfig/function/functionService/functionService1.png"
    };
  }
};
</script>

<style lang='scss' scoped>
.grid-layout {
  animation-duration: 700ms;
  .container {
    border: 1px solid #dfdfdf;
    margin-bottom: 22px;
    .img-container {
      width: 100%;
      padding-bottom: 70%;
      overflow: hidden;
      .el-image {
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
      }
    }
    .title {
      display: inline-block;
      max-width: 100%;
      font-size: 15px;
      color: #606266;
      margin-top: 16px;
      margin-bottom: 16px;
      padding-left: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
.list-layout {
  animation-duration: 700ms;
  .container {
    border: 1px solid #dfdfdf;
    margin-bottom: 22px;
    .img-container {
      padding: 6px;
      border-right: 1px solid #dfdfdf;
      .el-image {
        width: 240px;
        height: 160px;
      }
    }
    .details-container {
      padding: 0 16px;
      font-size: 14px;
      color: #606266;
      .title {
        max-width: 100%;
        display: inline-block;
        font-size: 15px;
        color: #606266;
        margin-top: 16px;
        margin-bottom: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .author-time {
        span {
          display: inline-block;
        }
        span:nth-child(1) {
          min-width: 180px;
          margin-right: 20px;
        }
        margin-bottom: 16px;
        height: 14px;
      }
      .desc {
        height: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn-group {
        margin-top: 16px;
      }
    }
    .el-col-8 {
      width: 252px;
    }
    .el-col-16 {
      float: none;
      width: 90%; /*写给不支持calc()的浏览器*/
      width: -moz-calc(100% - 252px);
      width: -webkit-calc(100% -252px);
      width: calc(100% - 252px);
      margin-left: 252px;
    }
  }
}
//图片悬停
.img-container {
  position: relative;
  overflow: hidden;
  .mask {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: 999;
  }
  .collection-btn {
    display: none;
    position: absolute;
    width: 26px;
    height: 26px;
    right: 4px;
    top: 4px;
    z-index: 1000;
    background: #fff;
    @include base-active-color();
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 16px;
      height: 16px;
      margin: auto;
    }
  }
  .remark-btn {
    position: absolute;
    width: 26px;
    height: 26px;
    left: 4px;
    top: 4px;
    z-index: 1000;
    @include base-bg-font();
    font-size: 16px;
    border-radius: 4px;
    cursor: default;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      width: 16px;
      height: 16px;
      margin: auto;
    }
  }
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