<template>
  <div class="group-details">
    <el-row class="header" v-if="(groupInfo.currentState==2||groupInfo.currentState==1||((groupInfo.currentState==0||!groupInfo.currentState)&&groupInfo.groupEnterType!=1))">
      <el-col :span="24" class="btn-group">
        <el-button class="base-btn" icon="el-icon-portal-shenqingjiaru" v-if="(groupInfo.currentState==0||!groupInfo.currentState)&&groupInfo.groupEnterType!=1"  @click="applyJoin">{{$t('group.Applytojoin')}}</el-button>
        <el-badge :value="groupInfo.auditNum" :max="99" v-if="groupInfo.currentState==1">
          <el-button class="base-btn" icon="el-icon-portal-shenqingjiaru1"  @click="openAuditDialog">{{$t('group.Applytoverify')}}</el-button>
        </el-badge>
        <el-button class="base-btn" icon="el-icon-plus" v-if="groupInfo.currentState==1"  @click="openInviteUserDialog">{{$t('group.Inviteusers')}}</el-button>
        <el-button icon="el-icon-close" class="base-btn-del" v-if="groupInfo.currentState==1"  @click="deleteGroup(groupInfo.id)">{{$t('group.Ungroup')}}</el-button>
        <el-button icon="el-icon-close" class="base-btn-del" v-if="groupInfo.currentState==2"  @click="dropOutGroup">{{$t('group.Quitthegroup')}}</el-button>
      </el-col>
    </el-row>
    <div class="content">
      <div class="group-container">
        <div class="group-profile-picture-area">
          <el-image :src="groupInfo.headImg"></el-image>
        </div>
        <div class="group-details-area">
          <el-row class="group-top">
            <el-col :span="8" class="group-name">
              {{groupInfo.groupName}}
            </el-col>
            <el-col :span="16" class="group-btn">
              <span class="group-operate-normal-btn" v-if="groupInfo.currentState==1" @click="editGroup">
                <i class="el-icon-portal-icon-test"></i>
                <span>{{$t('myCenter.Edit')}}</span>
              </span>
            </el-col>
          </el-row>
          <el-row class="group-bottom">
            <span class="group-details-info">
              <i class="el-icon-portal-yonghudefuben"></i>
              <span>{{groupInfo.createByName}}</span>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span  class="group-details-info">
              <i class="el-icon-portal-shijian"></i>
              <span>{{groupInfo.formatCreateTime}}</span>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span class="group-details-info">
              <i class="el-icon-portal-yunyingduan-kaisuo"></i>
              <span v-if="groupInfo.groupType==1">{{$t('group.All')}}</span>
              <span v-else>{{$t('group.Onlygroupmembers')}}</span>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span class="group-details-info">
              <i class="el-icon-portal-biaoqian"></i>
              <span>
                {{groupInfo.groupTag}}
              </span>
            </span>
          </el-row>
          <el-row class="group-desc">
            {{groupInfo.describe}}
          </el-row>
        </div>
      </div>
      <el-row class="resource-user-area" :gutter="40">
        <el-col :span="18">
          <group-resource-tab :groupInfo="groupInfo" :initTask="initTask"></group-resource-tab>
        </el-col>
        <el-col :span="6">
          <group-user-list :groupUserList="groupUserList" :groupInfo="groupInfo" @kickOutOfGroup="kickOutOfGroup"></group-user-list>
        </el-col>
      </el-row>
    </div>
    <group-audit-dialog 
    :dialogVisible="auditDialogVisible" 
    @dialogClose="closeAuditDialog" 
    :groupInfo="groupInfo"
    @refreshGroupDetails="refreshGroupDetails"
    ></group-audit-dialog>
    <group-invite-user-dialog
    :dialogVisible="inviteUserDialogVisible" 
    @dialogClose="closeInviteUserDialog" 
    :groupInfo="groupInfo"
    @refreshGroupDetails="refreshGroupDetails"
    ></group-invite-user-dialog>
    <group-apply-join-dialog
    :dialogVisible="applyJoinDialogVisible" 
    @dialogClose="closeApplyJoinDialog"
    @save="saveApplyJoin"
    :groupInfo="groupInfo"
    ></group-apply-join-dialog>
  </div>
</template>

<script>
import GroupUserList from './GroupUserList'
import GroupResourceTab from './GroupResourceTab'
import GroupAuditDialog from './GroupAuditDialog'
import GroupInviteUserDialog from './GroupInviteUserDialog'
import GroupApplyJoinDialog from './GroupApplyJoinDialog'
export default {
  name:"GroupDetails",
  components:{
    GroupUserList,
    GroupResourceTab,
    GroupAuditDialog,
    GroupInviteUserDialog,
    GroupApplyJoinDialog
  },
  props:{
    groupInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    groupUserList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    activeName:{
      type:String,
      default:""
    },
    task:{      
      type:Object,
      default:()=>{
        return {}
      }
    },
    timeStamp:{}
  },
  data(){
    return {
      initTask:0,
      auditDialogVisible:false,
      inviteUserDialogVisible:false,
      applyJoinDialogVisible:false
    }
  },
  watch:{
    activeName(){
      if(this.activeName=='details'){
        this.initTask=new Date();
      }
    },
    timeStamp(){
      if(this.task.target=='applyJoinGroup'){
        this.closeApplyJoinDialog();
      }
    }
  },
  methods:{
    applyJoin(){//申请加入群组
      this.applyJoinDialogVisible=true;
    },
    closeApplyJoinDialog(){
      this.applyJoinDialogVisible=false;
    },
    saveApplyJoin(val){
      this.$emit('applyJoinGroup',val);
    },
    editGroup(){//编辑群组
      this.$emit('editGroup');
    },
    openInviteUserDialog(){
      this.inviteUserDialogVisible=true;
    },
    closeInviteUserDialog(){
      this.inviteUserDialogVisible=false;
    },
    openAuditDialog(){
      this.auditDialogVisible=true;
    },
    closeAuditDialog(){
      this.auditDialogVisible=false;
    },
    deleteGroup(id){
      this.$confirm(this.$t('group.Areyousuretoungroupit')+'?', this.$t('webAppBuilder.Tip'), {
        confirmButtonText: this.$t('myCenter.Sure'),
        cancelButtonText: this.$t('myCenter.cancel'),
        type: 'warning'
      }).then(() => {
        this.$emit('deleteGroup',id)
      }).catch(() => {});
    },
    dropOutGroup(){
      this.$confirm(this.$t('group.Areyousuretoquitthegroup')+'?', this.$t('webAppBuilder.Tip'), {
        confirmButtonText: this.$t('myCenter.Sure'),
        cancelButtonText: this.$t('myCenter.cancel'),
        type: 'warning'
      }).then(() => {
        let id=this.$store.getters.userInfo.id;
        this.$emit('kickOutOfGroup',id);
      }).catch(() => {});
    },
    kickOutOfGroup(id){
      this.$emit('kickOutOfGroup',id);
    },
    refreshGroupDetails(){
      this.$emit("refreshGroupDetails")
    }
  }
}
</script>

<style lang="scss" scoped>
  
  .group-details{
    padding:15px 2%;
    background: #f5f5f5;
    .header{
      .el-col{
        height: 44px;
      }
      .nav{
        font-size:14px;
        color:#4c4c4c;
        padding-top: 16px;
        .home{
          cursor: pointer;
          &:hover{
            @include base-active-color();
          }
        }
        span{
          vertical-align: bottom;
        }
      }
      .btn-group{
        text-align: right;
        .el-button{
          margin-left:15px;
        }
        .el-badge{
          margin-right:10px;
        }
      }
    }
    .content{
      border:1px solid #dfdfdf;
      box-shadow: 0px 0px 3px #dfdfdf;
      padding:0 70px;
      background: #fff;
      .group-container{
        color:#7c7c7c;
        margin-top:30px;
        .group-profile-picture-area{
          width:90px;
          height:72px;
          float: left;
          position:relative;
          .el-image{
            width: 52px;
            height: 52px;
            border-radius: 50%;
            position:absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            margin:auto;
          }
        }
        .group-details-area{
          margin-left:90px;
          padding-right:30px;
          font-size:14px;
          .group-top{
            border-bottom:1px solid #f5f5f5;
            height:36px;
            line-height: 36px;
            .group-name{
              font-size:15px;
              @include base-active-color();
            }
            .group-btn{
              text-align: right;
              .group-operate-normal-btn{
                @include base-active-color();
                margin-left:10px;
                cursor: pointer;
              }
              .group-operate-forbid-btn{
                color:#f56c6c;
                margin-left:10px;
              }
            }
          }
          .group-bottom{
            height:36px;
            line-height: 36px;
            .group-details-info{
              i{
                margin-right:4px;
              }
            }
          }
          .group-desc{
            height:40px;
            line-height: 40px;
            background: #f9f9f9;
            padding-left: 10px;
          }
        }
      }
    }
    .resource-user-area{
      margin-top:20px;
    }
  }
</style>