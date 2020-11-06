<template>
  <div class="index-header-carousel">
    <el-carousel trigger="click" height="574px">
      <el-carousel-item v-for="(item,index) in imgList" :key="index">
        <img :src="item.url" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "IndexHeaderCarousel",
  data() {
    return {
      imgList: [
        {
          url:require("app/serverManager/images/index/carousel/carousel1.jpg"),
        },
        {
          url:require("app/serverManager/images/index/carousel/carousel2.jpg"),
        }
      ]
    };
  },
  computed: {
    language() {
      return this.$store.getters.language;
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