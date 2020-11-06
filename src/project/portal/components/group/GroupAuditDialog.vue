<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('group.Applicationlist')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-row class="btn-area">
          <el-col :span="18">
            <el-button class="base-btn" @click="batchAuditAgree">{{$t('group.Batchapprove')}}</el-button>
            <el-button class="base-btn-del" @click="batchAuditRefuse">{{$t('group.Batchreject')}}</el-button>
          </el-col>
          <el-col :span="6">
            <el-input :placeholder="$t('service.pleaseEnterKeywords')" v-model="searchKey"  @keyup.enter.native="search"></el-input>
          </el-col>
        </el-row>
        <el-table :data="auditList" border @selection-change="selectionChange">
          <el-table-column type="selection" min-width="5%"></el-table-column>
          <el-table-column
            :prop="item.prop"
            :label="item.label"
            :min-width="item.minWidth"
            v-for="(item,ix) in tableCol"
            :key="ix"
          ></el-table-column>
          <el-table-column :label="$t('management.operate')" :min-width="'15%'">
            <template slot-scope="scope">
              <el-button size="mini" class="base-btn" @click="singleAuditAgree(scope.row.groupId,scope.row.userId)">{{$t('management.Approve')}}</el-button>
              <el-button size="mini" class="base-btn-del"  @click="singleAuditRefuse(scope.row.groupId,scope.row.userId)">{{$t('management.Reject')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
            :total="total"
            :pageSize="pageSize"
            :pageIndex="pageIndex"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            class="pagination"
          ></pagination>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('webAppBuilder.Close')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
export default {
  name: "GroupAuditDialog",
  components:{
    Pagination
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    groupInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  watch: {
    dialogVisible() {
      if(this.dialogVisible){
        this.reset();
        this.getAuditList();
      }
    }
  },
  data(){
    return {
      selectionList:[],
      auditList:[],
      tableCol: [
        {
          prop: "userName",
          label: this.$t('management.name'),
          minWidth: "15%"
        },
        {
          prop: "comments",
          label: this.$t('management.ApplicationReason'),
          minWidth: "30%"
        },
        {
          prop: "createTime",
          label: this.$t('management.ApplicationTime'),
          minWidth: "20%"
        }
      ],
      searchKey:"",
      pageIndex:1,
      pageSize:9,
      total:0
    }
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    getAuditList(){//获取审核列表
      this.$api.groupApi.getApplyUserList({
        groupId:this.groupInfo.id,
        search:this.searchKey,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }).then(res=>{
        let r=res.data.data;
        let data=r.rows;
        this.pageIndex=r.pageIndex;
        this.pageSize=r.pageSize;
        this.total=r.total;
        let userList=[];
        data.forEach(item=>{
          let info={
            groupId:item.C_GROUP_ID,
            userId:item.C_USER_ID,
            userName:item.C_NAME,
            createTime:item.C_CREATE_TIME,
            comments:item.C_COMMENTS
          }
          userList.push(info);
        });
        this.auditList=userList;
      }).catch(()=>{})
    },
    search(){
      this.pageIndex=1;
      this.getAuditList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getAuditList();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getAuditList();
    },
    saveAudit(data){
      this.$api.groupApi.audit2Group(data,{
        loadingText:this.$t('management.InReview')
      }).then(()=>{
        this.$message({
          type:"success",
          message:this.$t('management.ReviewedSuccessfully')
        })
        this.pageIndex=1;
        this.getAuditList();
        this.$emit('refreshGroupDetails')
      }).catch(()=>{})
    },
    batchAuditAgree(){//批量同意
      if(this.selectionList.length==0){
        this.$message({
          type:"warning",
          message:this.$t('group.Pleaseselectdatabeforeoperation')
        })
        return false;
      }
      let data={};
      let user=[];
      this.selectionList.forEach(item=>{
        user.push(item.userId);
      })
      data.groupId=this.selectionList[0].groupId;
      data.userIds=user.toString();
      data.auditMind=1;
      this.saveAudit(data);
    },
    batchAuditRefuse(){//批量拒绝
      if(this.selectionList.length==0){
        this.$message({
          type:"warning",
          message:this.$t('group.Pleaseselectdatabeforeoperation')
        })
        return false;
      }
      let data={};
      let user=[];
      this.selectionList.forEach(item=>{
        user.push(item.userId);
      })
      data.groupId=this.selectionList[0].groupId;
      data.userIds=user.toString();
      data.auditMind=2;
      this.saveAudit(data);
    },
    singleAuditAgree(groupId,userId){//同意
      let data={};
      data.groupId=groupId;
      data.userIds=userId;
      data.auditMind=1;
      this.saveAudit(data);
    },
    singleAuditRefuse(groupId,userId){//拒绝
      let data={};
      data.groupId=groupId;
      data.userIds=userId;
      data.auditMind=2;
      this.saveAudit(data);
    },
    selectionChange(val){
      this.selectionList=val;
    },
    reset(){
      this.pageIndex=1;
      this.pageSize=10;
      this.total=0;
      this.auditList=[];
      this.searchKey="";
    }
  }
};
</script>

<style lang='scss' scoped>

.manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-body {
    @include manage-border(
      $types: (
        "bottom"
      )
    );
  }
  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom"
      )
    );
    span {
      @include dialog-title($width: 2px);
      padding-bottom: 18px;
    }
  }
  .el-table{
    margin-bottom:15px;
    margin-top:15px;
  }
  .pagination{
    margin-bottom:15px;
  }
}
</style>