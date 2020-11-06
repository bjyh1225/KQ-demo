<template>
  <el-row :gutter="40">
    <el-col :span="6">
      <personal-center-my-verify-catalogue
        @menuChange="menuChange"
        :title="$t('management.MyApplications')"
        :iconfontClass="'el-icon-portal-shenqing'"
      ></personal-center-my-verify-catalogue>
    </el-col>
    <el-col :span="18">
      <personal-center-my-apply-list
        :applyList="applyList"
        :pageIndex="pageIndex"
        :pageSize="pageSize"
        :total="total"
        :searchInfo="searchInfo"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @search="search"
        @singleDelete="singleDelete"
        @mulDelete="mulDelete"
        @showDetails="showDetails"
      ></personal-center-my-apply-list>
    </el-col>
    <personal-center-my-apply-dialog
      :dialogVisible="applyDialogVisible"
      @dialogClose="dialogClose"
      :dialogTitle="title"
      :operate="operate"
      :applyInfo="applyInfo"
    ></personal-center-my-apply-dialog>
  </el-row>
</template>

<script>
import PersonalCenterMyVerifyCatalogue from "portal/components/personalCenterMyVerify/PersonalCenterMyVerifyCatalogue";
import PersonalCenterMyApplyList from "./PersonalCenterMyApplyList";
import PersonalCenterMyApplyDialog from "./PersonalCenterMyApplyDialog";
export default {
  name: "PersonalCenterMyApply",
  components: {
    PersonalCenterMyVerifyCatalogue,
    PersonalCenterMyApplyList,
    PersonalCenterMyApplyDialog
  },
  methods: {
    menuChange(menu) {
      this.active = menu;
      this.reset();
      this.getMyApplyListData();
    },
    getMyApplyListData() {
      let startTime,endTime;
      if(this.searchInfo.applyTime&&this.searchInfo.applyTime.length>=1){
        startTime=this.searchInfo.applyTime[0];
      }
      if(this.searchInfo.applyTime&&this.searchInfo.applyTime.length==2){
        endTime=this.searchInfo.applyTime[1];
      }
      this.$api.personalCenterMyApplyApi
        .getMyApplyListData(
          {
            resourceType: this.active,
            page: this.pageIndex,
            size: this.pageSize,
            searchVal: this.searchInfo.resourceName,
            startTime:startTime,
            endTime:endTime,
            scope:this.searchInfo.verifyStatus.toString()
          },
          {
            loadingText: this.$t("service.searching")
          }
        )
        .then(res => {
          var data = res.data.data;
          this.applyList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getMyApplyListData();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getMyApplyListData();
    },
    search() {
      this.pageIndex = 1;
      this.getMyApplyListData();
    },
    dialogClose() {
      this.applyDialogVisible = false;
    },
    singleDelete(row) {
      //单个删除
      this.$confirm(this.$t('myCenter.Areyousuretodeleteit')+'?', this.$t('webAppBuilder.Tip'), {
        confirmButtonText: this.$t('myCenter.Sure'),
        cancelButtonText: this.$t('myCenter.cancel'),
        type: 'warning'
      }).then(() => {
        this.$api.personalCenterMyApplyApi
          .deleteAuditResource(
            {
              IDS: row.C_ID
            },
            {
              loadingText: this.$t("myCenter.Deleting")
            }
          )
          .then(() => {
            this.$message({
              message: this.$t("management.Deletesuccessful"),
              type: "success"
            });
            this.reset('delete');
            this.getMyApplyListData();
          })
          .catch(() => {});
      }).catch(()=>{})
    },
    mulDelete(rows) {
      //批量删除
      var ids = [];
      for (var i = 0; i < rows.length; i++) {
        if(rows[i].C_AUDIT_SCOPE==0){
          this.$message({
            message:this.$t('myCenter.Datatobereviewedinthecheckeddataandcannotbedeleted'),
            type: "warning"
          });
          return false;
        }
        ids.push(rows[i].C_ID);
      }
      this.$confirm(this.$t('myCenter.Areyousuretodeleteit')+'?', this.$t('webAppBuilder.Tip'), {
        confirmButtonText: this.$t('myCenter.Sure'),
        cancelButtonText: this.$t('myCenter.cancel'),
        type: 'warning'
      }).then(() => {
      this.$api.personalCenterMyApplyApi
        .deleteAuditResource(
          {
            IDS: ids.toString()
          },
          {
            loadingText: this.$t("myCenter.Deleting")
          }
        )
        .then(() => {
          this.$message({
            message: this.$t("management.Deletesuccessful"),
            type: "success"
          });
          this.reset('delete');
          this.getMyApplyListData();
        })
        .catch(() => {});
      }).catch(() => {});
    },
    showDetails(row) {
      this.applyInfo = row;
      this.applyDialogVisible = true;
    },
    reset(type) {
      this.pageIndex = 1;
      this.pageSize = 10;
      this.total = 0;
      if(type!='delete'){
        this.searchInfo={
          resourceName:"",
          verifyStatus:[0],
          applyTime:[]
        }
      }
      this.applyList = [];
    }
  },
  data() {
    return {
      active: "mapService",
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      applyList: [],
      applyDialogVisible: false,
      applyInfo: {},
      title: this.$t("management.ApplicationDetails"),
      operate: "single",
      searchInfo:{
        resourceName:"",
        verifyStatus:[0],
        applyTime:[]
      }
    };
  },
  mounted() {
    this.getMyApplyListData();
  }
};
</script>

<style lang='scss' scoped>
</style>