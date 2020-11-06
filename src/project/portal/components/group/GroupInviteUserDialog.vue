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
          <span>{{$t('group.Inviteusers')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-row class="search-button">
          <el-input :placeholder="$t('service.pleaseEnterKEY')" v-model="searchKey" @keyup.enter.native="userSearch">
            <el-button slot="append" icon="el-icon-search" @click="userSearch">{{$t('service.search')}}</el-button>
          </el-input>
        </el-row>
        <el-row class="user-show">
          <el-row v-show="noDataStatus" class="no-data">
            {{$t('group.Sorrynorelevantuserfound')}}
          </el-row>
          <div class="user-block" v-for="item in userList" :key="item.C_ID">
            <div class="user-info">
              <el-image :src="getHeaderImg(item.C_HEAD_IMG)"></el-image>
              <span>{{item.C_NAME}}</span>
            </div>
            <div class="user-btn">
              <el-button size="mini" class="base-btn" @click="inviteUser(item)" v-if="item.waitInvite">{{$t('group.Invite')}}</el-button>
              <el-button size="mini" class="base-btn" v-else :disabled="true">{{$t('group.Invited')}}</el-button>
            </div>
          </div>
          <pagination
            v-if="total>9"
            :total="total"
            :pageSize="pageSize"
            :pageIndex="pageIndex"
            :pageSizes="[9,12,15]"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            class="pagination"
          ></pagination>
        </el-row>
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
  name: "GroupInviteUserDialog",
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
      }
    }
  },
  data(){
    return {
      searchKey:"",
      pageIndex:1,
      pageSize:9,
      total:0,
      userList:[],
      noDataStatus:false
    }
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    getHeaderImg(url){
      if(url){
        return '/fileapi/file/download/'+url+"/true";
      }
      else{
        return '/config/imageConfig/system/defaultProfilepicture/defaultProfilePicture1.png';
      }
    },
    reset(){
      this.pageIndex=1;
      this.pageSize=9;
      this.total=0;
      this.searchKey="";
      this.userList=[];
      this.noDataStatus=false;
    },
    userSearch(){
      if(!this.searchKey){
        this.$message({
          type:"warning",
          message:this.$t('group.Pleaseenteruserkeyword')
        })
        return false;
      }
      this.$api.groupApi
      .getInviteUserPageList({
        groupId:this.groupInfo.id,
        search:this.searchKey,
        pageIndex:this.pageIndex,
        pageSize:this.pageSize
      }, {
        loadingText: this.$t("service.searching")
      }).then(res=>{
        let data=res.data.data;
        if(data.rows.length==0){
          this.noDataStatus=true;
        }
        else{
          this.noDataStatus=false;
        }
        data.rows.forEach(item=>{
          item.waitInvite=true;
        })
        this.userList=data.rows;
        this.pageIndex = data.pageIndex;
        this.pageSize = data.pageSize;
        this.total = data.total;
      }).catch(()=>{})
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.userSearch();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.userSearch();
    },
    inviteUser(item){
      this.$api.groupApi.inviteUser2Group({
        groupId:this.groupInfo.id,
        userIds:item.C_ID
      }).then(()=>{
        this.$message({
          type:"success",
          message:this.$t('group.Invitedsuccessfully')
        })
        this.$set(item,'waitInvite',false);
        this.$emit("refreshGroupDetails");
      }).catch(()=>{})
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
  .search-button{
    margin-bottom:20px;
    padding:0 10%;
    /deep/ .el-input-group__append{
      @include base-bg-color();
      color:#fff;
      @include base-border-color();
    }
  }
  .user-show{
    width:846px;
    margin:0 auto;
    min-height:210px;
    .pagination{
      margin-bottom:15px;
    }
    .no-data{
      text-align: center;
      color:#606266;
      font-size:14px;
    }
  }
  .user-block{
    width:250px;
    border:1px solid #ebebeb;
    display: inline-block;
    margin-right:15px;
    margin-left:15px;
    margin-bottom:20px;
    .user-info{
      text-align: left;
      border-bottom:1px solid #ebebeb;
      height:70px;
      line-height:70px;
      width:230px;
      margin:0 auto;
      .el-image{
        width:50px;
        height:50px;
        border-radius:50%;
        vertical-align: middle;
      }
      span{
        font-size:15px;
        color:#606266;
        margin-left:25px;
      }
    }
    .user-btn{
      text-align:right;
      height:50px;
      line-height:50px;
      padding-right:10px;
    }
  }
}
</style>