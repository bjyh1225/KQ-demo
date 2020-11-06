<template>
  <div class="service-center" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <service-file-cen @getServiceDetails="getFileDetails" v-show="!showFile" ref="mychild"></service-file-cen>
    <service-map-details
      @getServiceDetails="getFileDetails"
      v-show="showFile"
      @getreturnMapShow="getreturnMapShow"
      :isDetails="isDetails"
      :isDetailsFilelist="isDetailsFilelist"
      @againListService="againListService"
      :serviceNameData="serviceNameData"
      :defaultSrc="defaultSrc"
    ></service-map-details>
  </div>
</template>
<script>
import ServiceFileCen from "components/serviceFile/ServiceFileCen";
import ServiceMapDetails from "components/serviceCenter/ServiceMapDetails";
import { getFileDefaultImg } from "portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js";
export default {
  data() {
    return {
      isDetails: {},
      isDetailsFilelist: [], //文件夹中子文件详情
      showFile: false,
      serviceNameData: this.$t("service.Files"),
      defaultSrc: "/config/imageConfig/function/file/compress.png"
    };
  },
  computed: {
    active() {
      return this.$store.getters.activeMenuStatus;
    },
    homePageHeaderHeight() {
      return this.$store.getters.homePageHeaderHeight;
    }
  },
  watch: {
    active() {
      if (this.active) {
        this.showFile = false;
      }
    }
  },
  name: "ServiceFile",
  components: {
    ServiceFileCen,
    ServiceMapDetails
  },
  mounted() {
    if (this.$route.query.id) {
      this.showFile = true;
      window.scrollTo(0, 0);
      this.getFileDetails(this.$route.query.id);
    } else {
      this.showFile = false;
    }
  },
  methods: {
    //评论更新后展示页面更新
    againListService() {
      this.$refs.mychild.getFileList();
    },
    //请求  地图详情数据 getFileDetails
    getFileDetails(val) {
      if (val.C_FOLDER == 0) {
        this.$api.serviceFileCenApi
          .getFileDetails(
            {
              fileId: val.C_ID
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$store.dispatch("menu/setActiveMenuStatus", false);
              this.showFile = true;
              window.scrollTo(0, 0);
              if (res.data.data[0].C_FOLDER == 1) {
                res.data.data[0].defaultSrc = getFileDefaultImg("folder");
              } else {
                res.data.data[0].defaultSrc = getFileDefaultImg(
                  res.data.data[0].SUFFIX
                );
              }
              this.isDetails = res.data.data[0];
            }
          })
          .catch(error => {
            if (error.data.status === 391) {
              this.againListService();
            }
          });
      } else {
        // 文件夹
        this.$api.serviceFileCenApi
          .getFolderDatails(
            {
              folderId: val.C_ID
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$store.dispatch("menu/setActiveMenuStatus", false);
              this.showFile = true;
              window.scrollTo(0, 0);
              if (res.data.data[0].folderlist[0].C_FOLDER == 1) {
                res.data.data[0].folderlist[0].defaultSrc = getFileDefaultImg(
                  "folder"
                );
              } else {
                res.data.data[0].folderlist[0].defaultSrc = getFileDefaultImg(
                  res.data.data[0].folderlist[0].SUFFIX
                );
              }
              this.isDetails = res.data.data[0].folderlist[0];
              this.isDetailsFilelist = res.data.data[0].filelist;
            }
          })
          .catch(error => {
            if (error.data.status === 391) {
              this.againListService();
            }
          });
      }
    },
    getreturnMapShow(val) {
      this.showFile = val;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>