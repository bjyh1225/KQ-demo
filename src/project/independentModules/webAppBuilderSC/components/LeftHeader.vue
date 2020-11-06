<template>
  <div class="header app-bg-color app-bg-font-color app-border-bottom">
    <i
      class="el-icon-portal-yingyong icon-area"
      @click="open"
      :class="{'open-aside':!asideStatus,'app-hover-color':!asideStatus}"
    ></i>
    <span class="title-area" v-show="asideStatus">{{$t('navMenu.appCenter')}}</span>
    <i
      class="el-icon-portal-collapse-left btn-area app-hover-color"
      @click="switchStatus"
      v-show="asideStatus"
    ></i>
  </div>
</template>

<script>
export default {
  name: "LeftHeader",
  props: {
    asideStatus: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    switchStatus() {
      this.$emit("switchStatus");
    },
    open() {
      if (!this.asideStatus) {
        this.$emit("switchStatus");
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.header {
  // background: #273142;
  // color:#fff;
  font-size: 22px;
  height: 50px;
  line-height: 50px;
  position: relative;
  overflow: hidden;
  // border-bottom:1px solid #525a68;
  transition: width 0.5s;
  .icon-area {
    // margin-left:17px;
    font-size: 26px;
    position: absolute;
    display: inline-block;
    width: 26px;
    height: 26px;
    top: 1px;
    left: 17px;
    bottom: 0;
    margin: auto;
  }
  .title-area {
    margin-left: 46px;
  }
  .btn-area {
    position: absolute;
    font-size: 24px;
    display: block;
    height: 24px;
    width: 24px;
    top: 0;
    right: 10px;
    bottom: 0;
    margin: auto;
    cursor: pointer;
    // &:hover{
    //   color:#3691e9;
    // }
  }
}
.open-aside {
  cursor: pointer;
  // &:hover{
  //   color:#3691e9;
  // }
}
</style>
