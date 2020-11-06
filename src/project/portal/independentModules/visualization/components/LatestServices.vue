<template>
  <div>
    <el-row class="map-container">
      <el-row class="map-title">
        <span>{{$t('indexPage.latestServices')}}</span>
      </el-row>
      <el-row class="map-list">
        <el-col
          :xs="24" 
          :sm="12" 
          :md="6" 
          :lg="6" 
          :xl="6"
          v-for="(map,ix) in mapList"
          :key="ix"
          class="map-list-row"
        >
          <div class="map-list-container">
            <div
              class="map-list-img"
              :class="$store.getters.isLogin?'map-list-img-cursor':''"
              @click="pageStatus == 'real'&&$store.getters.isLogin?resourceDetails(map):reminder()"
            >
              <el-image v-if="!map.C_IMG" :src="defaultImg" :fit="'cover'">
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline text"></i>
                </div>
              </el-image>
              <el-image :src="map.C_IMG" :fit="'cover'" v-else>
                <div slot="placeholder" class="image-slot">
                  <span class="text">{{$t('myCenter.Loading')}}...</span>
                </div>
                <div slot="error" class="image-slot">
                  <i class="el-icon-picture-outline text"></i>
                </div>
              </el-image>
            </div>
            <p>{{map.C_NAME}}</p>
          </div>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "LatestServices",
  props: {
    pageStatus: {
      type: String,
      default: "real"
    },
    propsConf: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    "propsConf.servicesNumber": function() {
      if (this.pageStatus != "real") {
        this.mapList = this.defaultList.slice(0, this.propsConf.servicesNumber);
      }
    }
  },
  data() {
    return {
      defaultList: [
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg1.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg2.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg3.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg4.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg1.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg2.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg3.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg4.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg1.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg2.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg3.jpg")
        },
        {
          C_NAME: this.$t("visualization.SampleService"),
          C_IMG: require("img/indexmap/mapimg4.jpg")
        }
      ],
      mapList: [],
      size: 4,
      defaultImg:"/config/imageConfig/function/mapService/mapService1.png"
    };
  },
  methods: {
    getHotServices() {
      this.$api.componentApi
        .selectServiceByTime(
          {
            size: this.size
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          var data = res.data.data.rows;
          this.mapList = data;
        })
        .catch(() => {});
    },
    resourceDetails(val) {
      document.body.style.overflow = "";
      var routerPath = "";
      if (val.C_RESOURCE_TYPE == "mapService") {
        routerPath = "/service/map";
      } else if (val.C_RESOURCE_TYPE == "functionService") {
        routerPath = "/service/function";
      } else if (val.C_RESOURCE_TYPE == "sceneService") {
        routerPath = "/service/scene";
      } else if (val.C_RESOURCE_TYPE == "fileService") {
        routerPath = "/service/file";
      } else if (val.C_RESOURCE_TYPE == "appbuilder") {
        routerPath = "/service/appCenter";
      }
      this.$router.push({
        path: routerPath,
        query: { id: val.C_ID }
      });
    },
    reminder() {
      document.body.style.overflow = "";
      this.$message({
        message: this.$t("portalStatistics.PleaseLoginToView"),
        type: "warning"
      });
    }
  },
  mounted() {
    if (this.pageStatus != "real") {
      this.size = this.propsConf.servicesNumber || 4;
      this.mapList = this.defaultList.slice(0, this.size);
    } else {
      this.size = this.propsConf.servicesNumber || 4;
      this.getHotServices();
    }
  }
};
</script>

<style lang='scss' scoped>

.map-container {
  padding-top: 60px;
  background: #fff;
  .map-title {
    color: #242424;
    font-size: 24px;
    // font-weight: bold;
    text-align: center;
    // padding-bottom: 10px;
    // border-bottom: 1px solid #e0e0e0;
    margin-bottom: 12px;
    span {
      padding-bottom: 10px;
      // @include base-active-underline(
      //   $width: 2px,
      //   $types: (
      //     "bottom"
      //   )
      // );
    }
  }
  .map-list {
    padding: 38px 2% 58px 2%;
    .map-list-row {
      margin-bottom:20px;
    }
    .map-list-container {
      margin: 0 auto;
      padding: 5px 0;
      width: 80%;
      border: 1px solid #e0e0e0;
      background: #fff;
      &:hover {
        border: 1px solid #ccc;
        box-shadow: 0px 0px 8px #ccc;
      }
      .map-list-img-cursor {
        cursor: pointer;
      }
      .map-list-img {
        width: 95%;
        height: 160px;
        margin: 0 auto;
        .el-image {
          width: 100%;
          // position: absolute;
          // top: 0;
          // left: 0;
          height: 100%;
        }
      }
      p {
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin: 12px 0;
        font-size: 16px;
      }
    }
  }
}
//图片默认
.el-image{
  /deep/.image-slot {
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
}

</style>