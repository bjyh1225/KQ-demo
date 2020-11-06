<template>
  <div>
    <el-form :model="configInfo" :label-width="'130px'">
      <el-form-item :label="$t('management.BigScreenURL')+'：'">
        <el-input v-model="configInfo.url" :disabled="!status"></el-input>
      </el-form-item>
    </el-form>
    <div v-show="!status" class="tips">{{$t('management.EnableItBeforeConfiguration')}}</div>
    <div class="btn-area">
      <el-button
        class="base-btn"
        @click="saveBigScreenConfig"
        :disabled="!status"
      >{{$t('visualization.Save')}}</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: "ManageBigScreenConfig",
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
          this.getBigScreenConfig();
        }
      }
    }
  },
  data() {
    return {
      configInfo: {
        url: "",
        id: ""
      },
      status: true
    };
  },
  methods: {
    getBigScreenConfig() {
      this.configInfo = {
        url: "",
        id: ""
      };
      this.$api.visualizationApi
        .getSysParamConfigureByKey(
          {
            key: "bigScreenConfig"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          var data = res.data.data;
          if (data) {
            this.configInfo.url = data.value;
            this.status = data.status;
            this.configInfo.id = data.id;
          }
        })
        .catch(() => {});
    },
    saveBigScreenConfig() {
      if (!this.configInfo.url) {
        this.$message({
          message: this.$t("management.PleaseEnterBigScreenURL"),
          type: "warning"
        });
        return false;
      }
      this.$api.visualizationApi
        .saveSysParamConfigure(
          {
            key: "bigScreenConfig",
            value: this.configInfo.url,
            force: true,
            id: this.configInfo.id
          },
          { loadingText: this.$t("webAppBuilder.BeingSaved"),coverStatusCode:{395:{needAlertMessage:false}} }
        )
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
        })
        .catch(error => {
          if (error.data && error.data.status == 395) {
            this.$message({
              message: this.$t("management.EnableItBeforeConfiguration"),
              type: "error"
            });
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.btn-area {
  text-align: right;
}
.tips {
  margin-left: 130px;
  margin-bottom: 10px;
  font-size: 14px;
  color: #ccc;
}
</style>
