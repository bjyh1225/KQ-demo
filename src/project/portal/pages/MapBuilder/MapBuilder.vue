<template>
  <div class="map-builder">
    <external-iframe
      :src="src"
      @goback="goback"
      @share='share'
      @iframeLoadComplete='iframeLoadComplete'
      :hideBtnList="hideBtnList"
      :noLoading="true"
      :startRight="10"
      :source='source'
    ></external-iframe>
     <personal-center-service-sharing-dialog
        ref="serviceSharingDialog"
      ></personal-center-service-sharing-dialog>
  </div>
</template>
<script>
import ExternalIframe from "portal/components/common/externalIframe/ExternalIframe";
import PersonalCenterServiceSharingDialog from "components/personalCenterService/PersonalCenterServiceSharingDialog";
export default {
  name: "MapBuilder",
  components: {
    ExternalIframe,
    PersonalCenterServiceSharingDialog
  },
  data() {
    return {
      src: "/thirdParty/mapbuilder/services/map_builder/viewer_debug.html",
      // src:"http://172.16.1.155:8080/kqwebmap/services/map_builder/viewer_debug.html",
      hideBtnList: ["add", "open", "save", "preview", "download"],
      currentSceneInfo: {}, //当前的场景信息
      source:''
    };
  },
  mounted(){
if(this.$route.query.userId!=this.$store.getters.userInfo.id&&!this.$route.query.id){
        this.hideBtnList.push('share');
        this.source='MapBuilder';
      }
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
iframeLoadComplete(val){
  if(!this.$route.query.fileId){
    val.initMap();
  }else{
  val.initMap(this.Base64.decode(this.$route.query.fileId),this.$route.query.name);}
},
    // getserviceListByMe() {
    //   // 页面重置
    //   this.selectApp({ C_ID: this.$route.query.id });
    // },
    share(){
 if (!this.$route.query.id) {
        this.$message({
          message: this.$t("webAppBuilder.PleaseSelectAnAppShare"),
          type: "warning"
        });
        return false;
      }
      // 请求应用初始权限
      this.$api.webMapBuilderApi.selectPermissionById({appId:this.$route.query.id,scope:this.$route.query.scope},{loadingText: this.$t("service.searching"),
            __LOGINTYPE: "dialog"}).then(ress=>{
               this.$api.webMapBuilderApi
        .selectAppByID(
          {appId:this.$route.query.id},
          {
            loadingText: this.$t("service.searching"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          var data = res.data.data;
          this.$refs.serviceSharingDialog.privateDataFun({
            checkList: ress.data.data,
            serviceListSharing: data,
            messageSharingName: '制图'
          });
        })
        .catch(() => {});
            }).catch(() => {});
     
    }
  }
};
</script>
<style lang="scss" scoped>
.map-builder {
  position: relative;
  height: 0;
}
</style>
