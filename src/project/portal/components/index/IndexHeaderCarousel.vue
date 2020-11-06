<template>
  <div class="index-header-carousel">
    <el-carousel trigger="click" height="574px" v-if="JSON.stringify(headerInfo) == '{}'">
      <el-carousel-item v-for="(item,index) in imgList" :key="index">
        <img :src="item.url" alt />
      </el-carousel-item>
    </el-carousel>
    <el-carousel trigger="click" height="574px" v-else>
      <el-carousel-item v-for="(item,index) in imgList" :key="index">
        <img :src="item.url" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getDefaultCarouselFigure } from "common/config/theme/theme.js";
export default {
  name: "IndexHeaderCarousel",
  props: {
    headerInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    current: {
      type: Object,
      default: () => {
        return {};
      }
    },
    pageStatus: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      imgList: []
    };
  },
  computed: {
    themeCode() {
      return this.$store.getters.themeCode;
    },
    language() {
      return this.$store.getters.language;
    },
    time() {
      return this.$store.getters.commonTimeStamp;
    }
  },
  watch: {
    themeCode() {
      this.setCarouselFigure();
    },
    time() {
      var type = this.$store.getters.commonEventType;
      var source = this.$store.getters.commonSource;
      if (
        type == "changeCarousel" &&
        source == "visualizationIndexHeaderPorpertySet"
      ) {
        this.imgList = this.$store.getters.commonParams.imgList;
        this.setCarouselFigure();
      }
    },
     "headerInfo.propsConf.imgList": {
      deep: true,
      handler() {
        this.setCarouselFigure();
      }
    },
     "current.propsConf.imgList": {
      deep: true,
      handler() {
        this.setCarouselFigure();
      }
    }
  },
  mounted() {
    this.setCarouselFigure();
  },
  methods: {
    setCarouselFigure() {
      var arrImg = [];
      var rArr=[];
      var r = getDefaultCarouselFigure(this.themeCode, this.language);
      if (JSON.stringify(this.headerInfo) == "{}") {
        this.imgList = this.current.propsConf.imgList;
        this.imgList.forEach(item => {
          if (item.name.indexOf("默认.jpg") == -1) {
            arrImg.push(item);
          }
        });
        r.forEach(element => {
       rArr.push({url: element,
            name: "默认.jpg"})
        });
arrImg.forEach(el=>{
rArr.push(el);
        })
        this.imgList=rArr;
      } else {
        this.imgList = this.headerInfo.propsConf.imgList;
        this.imgList.forEach(item => {
          if (item.name.indexOf("默认.jpg") == -1) {
            arrImg.push(item);
          }
        });
        r.forEach(element => {
       rArr.push({url: element,
            name: "默认.jpg"})
        });
        arrImg.forEach(el=>{
rArr.push(el);
        })
        this.imgList=rArr;
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.el-carousel {
  overflow: hidden;
  position: relative;
  img {
    height: 574px;
    position: absolute;
    left: 50%;
    margin-left: -960px;
  }
}
</style>