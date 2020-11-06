<template>
  <el-row :gutter="40">
    <el-col :span="6">
      <personal-center-my-verify-catalogue @menuChange="menuChange"></personal-center-my-verify-catalogue>
    </el-col>
    <el-col :span="18">
      <personal-center-my-verify-list
        :verifyList="verifyList"
        :pageIndex="pageIndex"
        :pageSize="pageSize"
        :total="total"
        :searchInfo="searchInfo"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @search="search"
        @verify="verify"
        @showDetails="showDetails"
        @mulVerify="mulVerify"
      ></personal-center-my-verify-list>
    </el-col>
    <personal-center-my-verify-dialog
      :dialogVisible="verifyDialogVisible"
      @dialogClose="dialogClose"
      :dialogTitle="title"
      :operate="operate"
      :verifyInfo="verifyInfo"
      @save="saveAudit"
    ></personal-center-my-verify-dialog>
    <personal-center-my-apply-dialog
      :dialogVisible="applyDialogVisible"
      @dialogClose="applyDialogClose"
      :dialogTitle="$t('myCenter.Reviewdetails')"
      :applyInfo="applyInfo"
    ></personal-center-my-apply-dialog>
  </el-row>
</template>

<script>
import PersonalCenterMyVerifyCatalogue from "./PersonalCenterMyVerifyCatalogue";
import PersonalCenterMyVerifyList from "./PersonalCenterMyVerifyList";
import PersonalCenterMyVerifyDialog from "./PersonalCenterMyVerifyDialog";
import PersonalCenterMyApplyDialog from "../personalCenterMyApply/PersonalCenterMyApplyDialog";
export default {
  name: "PersonalCenterVerify",
  components: {
    PersonalCenterMyVerifyCatalogue,
    PersonalCenterMyVerifyList,
    PersonalCenterMyVerifyDialog,
    PersonalCenterMyApplyDialog
  },
  methods: {
    menuChange(menu) {
      this.active = menu;
      this.reset();
      this.getMyAuditListData();
    },
    getMyAuditListData() {
      let startTime,endTime;
      if(this.searchInfo.applyTime&&this.searchInfo.applyTime.length>=1){
        startTime=this.searchInfo.applyTime[0];
      }
      if(this.searchInfo.applyTime&&this.searchInfo.applyTime.length==2){
        endTime=this.searchInfo.applyTime[1];
      }
      this.$api.personalCenterMyVerifyApi
        .getMyAuditListData(
          {
            resourceType: this.active,
            page: this.pageIndex,
            size: this.pageSize,
            searchVal: this.searchInfo.resourceName,
            startTime:startTime,
            endTime:endTime,
            scope:this.scopeMapping[this.searchInfo.verifyStatus]
          },
          {
            loadingText: this.$t("service.searching")
          }
        )
        .then(res => {
          var data = res.data.data;
          this.verifyList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getMyAuditListData();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getMyAuditListData();
    },
    search() {
      this.pageIndex = 1;
      this.getMyAuditListData();
    },
    dialogClose() {
      this.verifyDialogVisible = false;
    },
    verify(row) {
      //单个审核
      this.title = this.$t("management.Review");
      this.operate = "single";
      this.verifyInfo = row;
      this.verifyInfo.IDS = row.C_ID;
      this.verifyDialogVisible = true;
    },
    showDetails(row){
      this.applyInfo=row;
      this.applyDialogVisible=true;
    },
    applyDialogClose(){
      this.applyDialogVisible=false;
    },
    mulVerify(rows) {
      //批量
      var ids = [];
      for (var i = 0; i < rows.length; i++) {
        ids.push(rows[i].C_ID);
      }
      this.verifyInfo = {
        IDS: ids.toString()
      };
      this.title = this.$t("management.ReviewInBatches");
      this.operate = "mul";
      this.verifyDialogVisible = true;
    },
    saveAudit(type) {
      this.verifyInfo.scope = type;
      this.verifyInfo.auditComment = this.verifyInfo.C_AUDIT_COMMENT;
      this.$api.personalCenterMyVerifyApi
        .getMyAuditList(this.verifyInfo, {
          loadingText: this.$t("management.InReview")
        })
        .then(() => {
          this.$message({
            message: this.$t("management.ReviewedSuccessfully"),
            type: "success"
          });
          this.dialogClose();
          this.reset();
          this.getMyAuditListData();
        })
        .catch(() => {});
    },
    reset() {
      this.pageIndex = 1;
      this.pageSize = 10;
      this.total = 0;
      this.searchInfo={
        verifyStatus:1,
        applyTime:[],
        resourceName:""
      }
      this.verifyList = [];
    }
  },
  data() {
    return {
      active: "mapService",
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      verifyList: [],
      verifyDialogVisible: false,
      verifyInfo: {},
      title: this.$t("management.Review"),
      operate: "single",
      searchInfo:{
        verifyStatus:1,
        applyTime:[],
        resourceName:""
      },
      scopeMapping:{
        "1":" ToBeAudited",
        "2":"Audited",
        "3":"Expired"
      },
      applyDialogVisible:false,
      applyInfo:{}
    };
  },
  mounted() {
    this.getMyAuditListData();
  }
};
</script>

<style lang='scss' scoped>
</style>