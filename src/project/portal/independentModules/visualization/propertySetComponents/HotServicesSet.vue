<template>
  <div class="hot-services-set">
    <el-form ref="form" :model="currentPropertySetInfo" :label-width="formLabelWidth">
      <el-form-item :label="$t('visualization.NumberOfDisplays')">
        <el-select
          v-model="currentPropertySetInfo.propsConf.servicesNumber"
          :placeholder="$t('portalStatistics.PleaseSelectTheNumberOfDisplays')"
        >
          <el-option label="4" value="4"></el-option>
          <el-option label="8" value="8"></el-option>
          <el-option label="12" value="12"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "HotServicesSet",
  props: {
    currentPropertySetInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      formLabelWidth: "100px"
    };
  },
  mounted() {
    //国际化样式处理
    if (this.$store.getters.language == "english") {
      this.formLabelWidth = "160px";
    } else {
      this.formLabelWidth = "100px";
    }
  }
};
</script>

<style lang='scss' scoped>
.hot-services-set {
  margin-top: 10px;
}
</style>