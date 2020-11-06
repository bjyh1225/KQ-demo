<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="detailsDialogVisible"
      width="800px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('management.Resourcedetails')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <personal-center-service-details-dialog-list ref='serviceDetails'></personal-center-service-details-dialog-list>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import PersonalCenterServiceDetailsDialogList from "components/personalCenterService/PersonalCenterServiceDetailsDialogList";
export default {
  name: "PersonalCenterServiceDetailsDialog",
  components:{
    PersonalCenterServiceDetailsDialogList
  },
  data() {
    return {
      detailsDialogVisible:false
    };
  },
  methods: {
    // 查看详情
    viewDetails(val){
 if (
        val.resourceType == "mapService" ||
        val.C_RESOURCE_TYPE == "mapService"||val.RESOURCETYPE== "mapService"
      ) {
        this.$api.serviceMapApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              personnelId:val.personnelId
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
             this.detailsDialogVisible=true;
      this.$nextTick(() => {
        this.$refs.serviceDetails.viewDetailsList(res.data.data[0],null,val.personnelId);
      });
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "dataService" ||
        val.C_RESOURCE_TYPE == "dataService"||val.RESOURCETYPE== "dataService"
      ) {
        this.$api.serviceDataApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              personnelId:val.personnelId
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.detailsDialogVisible=true;
      this.$nextTick(() => {
        this.$refs.serviceDetails.viewDetailsList(res.data.data[0],null,val.personnelId);
      });
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "functionService" ||
        val.C_RESOURCE_TYPE == "functionService"||val.RESOURCETYPE== "functionService"
      ) {
        this.$api.serviceFunctionApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              personnelId:val.personnelId
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.detailsDialogVisible=true;
      this.$nextTick(() => {
        this.$refs.serviceDetails.viewDetailsList(res.data.data[0],null,val.personnelId);
      });
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "sceneService" ||
        val.C_RESOURCE_TYPE == "sceneService"||val.RESOURCETYPE== "sceneService"
      ) {
        this.$api.serviceSceneApi
          .getServiceDetails(
            {
              serviceId: val.id ? val.id : val.C_ID,
              personnelId:val.personnelId
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.detailsDialogVisible=true;
      this.$nextTick(() => {
        this.$refs.serviceDetails.viewDetailsList(res.data.data[0],null,val.personnelId);
      });
            }
          })
          .catch(() => {});
      } else if (
        val.resourceType == "fileService" ||
        val.C_RESOURCE_TYPE == "fileService"||val.RESOURCETYPE== "fileService"
      ) {
        this.$api.serviceFileCenApi
          .getFileServicePermissions({
            id: val.id ? val.id : val.C_ID,
              personnelId:val.personnelId
          })
          .then(res => {
            if (res.data.data[0].YWSEARCH!=null&&res.data.data[0].YWSEARCH > 0) {
              this.detailsDialogVisible=true;
              this.$nextTick(() => {
                this.$refs.serviceDetails.viewDetailsList(val,null,val.personnelId);
              });
            } else if (res.data.data[0].YWSEARCH==null||res.data.data[0].YWSEARCH <= 0) {
              this.$message({
                message: this.$t('myCenter.Asthepermissionsoftheresourcechangeyouhavenopermissionstoviewit'),
                type: "warning"
              });
            }
          });
      }else if (
        val.resourceType == "data" ||
        val.C_RESOURCE_TYPE == "data"||val.RESOURCETYPE== "data"
      ) {
        this.$api.serviceDatacenterApi
          .getDataDetails(
            {
              dataId: val.id ? val.id : val.C_ID,
              personnelId:val.personnelId
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.detailsDialogVisible=true;
      this.$nextTick(() => {
        this.$refs.serviceDetails.viewDetailsList(res.data.data[0],null,val.personnelId);
      });
            }
          })
          .catch(() => {});
      }  else if (
        val.resourceType == "mapbuilder" ||
        val.C_RESOURCE_TYPE == "mapbuilder"||val.RESOURCETYPE== "mapbuilder"
      ) {
        this.$api.webMapBuilderApi
          .getMapbuilderPermissions({
            id: val.id ? val.id : val.C_ID,
              personnelId:val.personnelId
          })
          .then(res => {
            if (res.data.data[0].YWSEARCH!=null&&res.data.data[0].YWSEARCH > 0) {
              this.detailsDialogVisible=true;
              this.$nextTick(() => {
                this.$refs.serviceDetails.viewDetailsList(val,null,val.personnelId);
              });
            } else if (res.data.data[0].YWSEARCH==null||res.data.data[0].YWSEARCH <= 0) {
              this.$message({
                message: this.$t('myCenter.Asthepermissionsoftheresourcechangeyouhavenopermissionstoviewit'),
                type: "warning"
              });
            }
          });
      } else if (
        val.resourceType == "scenebuilder" ||
        val.C_RESOURCE_TYPE == "scenebuilder"||val.RESOURCETYPE== "scenebuilder"
      ) {
        this.$api.webSceneBuilderApi
          .getScenebuilderPermissions({
            id: val.id ? val.id : val.C_ID,
              personnelId:val.personnelId
          })
          .then(res => {
            if (res.data.data[0].YWSEARCH!=null&&res.data.data[0].YWSEARCH > 0) {
              this.detailsDialogVisible=true;
              this.$nextTick(() => {
                this.$refs.serviceDetails.viewDetailsList(val,null,val.personnelId);
              });
            } else if (res.data.data[0].YWSEARCH==null||res.data.data[0].YWSEARCH <= 0) {
              this.$message({
                message: this.$t('myCenter.Asthepermissionsoftheresourcechangeyouhavenopermissionstoviewit'),
                type: "warning"
              });
            }
          });
      } else if (
        val.resourceType == "bigbuilder" ||
        val.C_RESOURCE_TYPE == "bigbuilder"||val.RESOURCETYPE== "bigbuilder"
      ) {
      //  this.$api.webDashBoardBuilderApi
      //     .getBigbuilderPermissions({
      //       id: val.id ? val.id : val.C_ID,
              // personnelId:val.personnelId
      //     })
      //     .then(res => {
      //       if (res.data.data[0].YWSEARCH!=null&&res.data.data[0].YWSEARCH > 0) {
      //         this.detailsDialogVisible=true;
      //         this.$nextTick(() => {
      //           this.$refs.serviceDetails.viewDetailsList(val,null,val.personnelId);
      //         });
      //       } else if (res.data.data[0].YWSEARCH==null||res.data.data[0].YWSEARCH <= 0) {
      //         this.$message({
      //           message: this.$t('myCenter.Asthepermissionsoftheresourcechangeyouhavenopermissionstoviewit'),
      //           type: "warning"
      //         });
      //       }
      //     });
      } else if (
        val.resourceType == "appbuilder" ||
        val.C_RESOURCE_TYPE == "appbuilder"||val.RESOURCETYPE== "appbuilder"
      ) {
        this.$api.serviceAppCenterApi
          .getAppServicePermissions({
            id: val.id ? val.id : val.C_ID,
              personnelId:val.personnelId
          })
          .then(res => {
            if (res.data.data[0].YWSEARCH!=null&&res.data.data[0].YWSEARCH > 0) {
              this.detailsDialogVisible=true;
              this.$nextTick(() => {
                this.$refs.serviceDetails.viewDetailsList(val,null,val.personnelId);
              });
            } else if (res.data.data[0].YWSEARCH==null||res.data.data[0].YWSEARCH <= 0) {
              this.$message({
                message: this.$t('myCenter.Asthepermissionsoftheresourcechangeyouhavenopermissionstoviewit'),
                type: "warning"
              });
            }
          });
      }
    },
    //弹窗关闭
    handleClose() {
      this.detailsDialogVisible=false;
      this.mapDetailsInfo={};
       this.$refs.serviceDetails.previewReturn();
    }
  }
};
</script>

<style lang='scss' scoped>

.manage-dialog {
  /deep/.el-dialog__body {
    padding: 0px 26px 50px;
  }
  .dialog-title {
    padding-bottom: 20px;
    span {
      @include dialog-title($width: 2px);
          padding: 0 16px 14px;
    }
  }
}
</style>