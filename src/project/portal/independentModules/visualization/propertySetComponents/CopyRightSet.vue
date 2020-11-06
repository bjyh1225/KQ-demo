<template>
  <div class="copy-right-set">
    <div class="font-title">{{$t('visualization.VersionInfo')}}：</div>
    <el-input type="textarea" v-model="currentPropertySetInfo.propsConf.copyRightText" :rows="4"></el-input>
  </div>
</template>

<script>
export default {
  name: "CopyRightSet",
  props: {
    currentPropertySetInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.copy-right-set {
  padding: 0 5px;
  .font-title {
    font-size: 14px;
    height: 25px;
    line-height: 25px;
    color: #606266;
  }
}
</style>