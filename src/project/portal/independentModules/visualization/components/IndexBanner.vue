<template>
  <div>
    <el-carousel trigger="click" height="530px">
      <el-carousel-item v-for="(item,index) in propsConf.imgList" :key="index">
        <img :src="item.url" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { getDefaultCarouselFigure } from "common/config/theme/theme.js";
export default {
  name: "IndexBanner",
  computed: {
    themeCode() {
      return this.$store.getters.themeCode;
    },
    language() {
      return this.$store.getters.language;
    }
  },
  props: {
    propsConf: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    themeCode() {
      this.setCarouselFigure();
    },
    language() {
      this.setCarouselFigure();
    }
  },
  methods: {
    setCarouselFigure() {
      var arrImg = [];
      this.propsConf.imgList.forEach(item => {
        if (item.name.indexOf("默认.jpg") == -1) {
          arrImg.push(item);
        }
      });
      this.propsConf.imgList = arrImg;
      var r = getDefaultCarouselFigure(this.themeCode, this.language);
      r.forEach(element => {
        this.propsConf.imgList.push({
          url: element,
          name: "默认.jpg"
        });
      });
      // var result = [];
      // for (var i = 0; i < this.propsConf.imgList.length; i++) {
      //   var obj = this.propsConf.imgList[i];
      //   var num = obj.url;
      //   var isExist = false;
      //   for (var j = 0; j < this.propsConf.defaultDelImg.length; j++) {
      //     var aj = this.propsConf.defaultDelImg[j];
      //     var n = aj.url;
      //     if (n == num) {
      //       isExist = true;
      //       break;
      //     }
      //   }
      //   if (!isExist) {
      //     result.push(obj);
      //   }
      // }
      // this.propsConf.imgList = result;
    }
  },
  mounted() {
    this.setCarouselFigure();
  }
};
</script>

<style lang='scss' scoped>
.el-carousel {
  overflow: hidden;
  position: relative;
  img {
    height: 530px;
    position: absolute;
    left: 50%;
    margin-left: -960px;
  }
}
</style>