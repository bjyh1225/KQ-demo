<template>
  <div class="dash-board-builder">
    <external-iframe :src="src" @goback="goback" :hideBtnList="hideBtnList" :startRight="10"></external-iframe>
  </div>
</template>
<script>
import ExternalIframe from "portal/components/common/externalIframe/ExternalIframe";
export default {
  name: "DashBoardBuilder",
  components: {
    ExternalIframe
  },
  data() {
    return {
      src: "",
      hideBtnList: ["add", "open", "save", "preview", "share", "download"]
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    }
  },
  created() {
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
          if (data.status) {
            if (data.value) {
              this.src = data.value;
            } else {
              this.$message({
                message: this.$t(
                  "management.NotBeenConfiguredPleaseConfigureIt"
                ),
                type: "error"
              });
            }
          } else {
            this.$message({
              message: this.$t("management.EnableItBeforeAccessing"),
              type: "error"
            });
          }
        } else {
          this.$message({
            message: this.$t("management.NotBeenConfiguredPleaseConfigureIt"),
            type: "error"
          });
        }
      })
      .catch(() => {});
  }
};
</script>
<style lang="scss" scoped>
.dash-board-builder {
  position: relative;
  font-size: 0;
  height: 0;
}
</style>
