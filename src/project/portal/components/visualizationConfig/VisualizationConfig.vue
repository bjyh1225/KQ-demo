<template>
  <div class="content">
    <el-button
      @click="enterVisualization"
      :disabled="visualizationStatus"
    >{{$t('myCenter.Gotohomepagecustom')}}</el-button>
    <div v-show="visualizationStatus" class="tips">{{$t('management.EnableItBeforeConfiguration')}}</div>
  </div>
</template>

<script>
export default {
  name: "VisualizationConfig",
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal, oldVal) {
        if (newVal) {
          this.getVisualizationStatus();
        }
      }
    }
  },
  data() {
    return {
      visualizationStatus: false
    };
  },
  methods: {
    enterVisualization() {
      this.$router.push("/visualization");
    },
    getVisualizationStatus() {
      this.$api.manageParamsApi
        .getStatusByKey(
          {
            key: "visualizationInfo"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          var data = res.data.data;
          if (data === false) {
            this.visualizationStatus = true;
          } else {
            this.visualizationStatus = false;
          }
        })
        .catch(() => {});
    }
  }
  // mounted() {
  //   this.getVisualizationStatus();
  // }
};
</script>

<style lang='scss' scoped>

.content {
  margin-bottom: 10px;
  min-height: 700px;
}
.tips {
  margin-top: 10px;
  font-size: 14px;
  color: #ccc;
}
</style>