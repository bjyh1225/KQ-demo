<template>
  <div class="content-list" id="group-content-list">
    <el-row class="content-list-details">
      <div class="content-list-details-area">
        <el-row class="header-area">
          <el-col :span="6" class="total-area">
            {{$t('group.Gong')}}<span class="total-nums">{{total}}</span>{{$t('group.Groupsintotal')}}
          </el-col>
          <el-col :span="18" class="sort-btn-area">
            <span>{{$t('group.Sortby')}}：</span>
            <el-dropdown @command="sortChange">
              <span class="el-dropdown-link">
                {{sortList[orderByInfo.sortNo]}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="c_create_time">{{sortList.c_create_time}}</el-dropdown-item>
                <el-dropdown-item command="c_group_name">{{sortList.c_group_name}}</el-dropdown-item>
                <el-dropdown-item command="c_create_by">{{sortList.c_create_by}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <i class="sort-type el-icon-portal-ziyuan1" v-if="orderByInfo.order=='ASC'" @click="sortTypeChange('DESC')"></i>
            <i class="sort-type el-icon-portal-ziyuan" v-else  @click="sortTypeChange('ASC')"></i>
          </el-col>
        </el-row>
        <div v-if="groupList.length>0">
          <el-row class="details-list-area">
            <div class="group-container" v-for="item in groupList" :key="item.id">
              <div class="group-profile-picture-area">
                <el-image :src="item.headImg">
                  <div slot="error" class="image-slot">
                    <i class="el-icon-picture-outline"></i>
                  </div>
                </el-image>
              </div>
              <div class="group-details-area">
                <el-row class="group-top">
                  <el-col :span="8" class="group-name">
                    {{item.groupName}}
                  </el-col>
                  <el-col :span="16" class="group-btn">
                    <el-popover
                      placement="bottom-end"
                      width="400"
                      trigger="click"
                      v-if="(item.currentState==0||!item.currentState)&&item.groupEnterType!=1"
                      @show="applyJoin"
                      :ref="`apply-join-group-popover-${item.id}`"
                      >
                      <div style="position:relative;">
                        <el-input v-model="comments" type="textarea" maxlength="80" :placeholder="$t('service.PleaseEnterYourApplicationReason')" :rows="3" @blur="checkComments"></el-input>
                        <div v-show="errorStatus" style="position:absolute;bottom:-20px;left:0;color:#F56C6C;font-size:12px;margin-top:2px;">{{$t('service.PleaseEnterYourApplicationReason')}}</div>
                      </div>
                      <div style="margin-top:10px;text-align:right;">
                        <el-button
                          class="base-btn"
                          type="primary"
                          icon="el-icon-plus"
                          @click="applyJoinGroup(item)"
                        >{{$t('group.Applytojoin')}}</el-button>
                      </div>
                      <span slot="reference" class="group-operate-normal-btn">
                        <i class="el-icon-portal-shenqingjiaru"></i>
                        <span>{{$t('group.Applytojoin')}}</span>
                      </span>
                    </el-popover>
                    <span class="group-operate-forbid-btn" v-if="(item.currentState==0||!item.currentState)&&item.groupEnterType==1">
                      <i class="el-icon-portal-jinzhi"></i>
                      <span>{{$t('group.Noneisallowedtojointhegroup')}}</span>
                    </span>
                    <span class="group-operate-wait-btn" v-if="item.currentState==3">
                      <i class="el-icon-portal-renyuanshenhe"></i>
                      <span>{{$t('group.Waitingforverification')}}</span>
                    </span>
                    <span class="group-operate-gray-btn" v-if="item.currentState==1||item.currentState==2">
                      <i class="el-icon-portal-yonghudefuben"></i>
                      <span>{{$t('group.Youareamemberofthegroupnow')}}</span>
                    </span>
                    <span class="group-operate-normal-btn" @click="groupDetails(item.id)" v-if="item.currentState==1||item.currentState==2||item.groupType==1">
                      <span>{{$t('management.ViewDetails')}}</span>
                      <i class="el-icon-right"></i>
                    </span>
                  </el-col>
                </el-row>
                <el-row class="group-bottom">
                  <span class="group-details-info">
                    <i class="el-icon-portal-yonghudefuben"></i>
                    <span>{{item.createByDto.name}}</span>
                  </span>
                  <el-divider direction="vertical"></el-divider>
                  <span  class="group-details-info">
                    <i class="el-icon-portal-shijian"></i>
                    <span>{{item.formatCreateTime}}</span>
                  </span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="group-details-info">
                    <i class="el-icon-portal-yunyingduan-kaisuo"></i>
                    <span v-if="item.groupType==1">{{$t('group.All')}}</span>
                    <span v-else>{{$t('group.Onlygroupmembers')}}</span>
                  </span>
                  <el-divider direction="vertical"></el-divider>
                  <span class="group-details-info">
                    <i class="el-icon-portal-biaoqian"></i>
                    <span>{{item.groupTag}}</span>
                  </span>
                </el-row>
              </div>
            </div>
          </el-row>
          <pagination
          :total="total"
          :pageSize="pageSize"
          :pageIndex="pageIndex"
          @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange"
          class="pagination"
          ></pagination>
        </div>
        <div v-else class="no-data">
          <div>
            <el-image :src="noDataImg"></el-image>
          </div>
          <p>{{$t('service.sorryNoDataIsAvailableNow')}}</p>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
export default {
  name:"GroupContentList",
  components: {
    Pagination
  },
  props:{
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    groupList:{
      type:Array,
      default:()=>{
        return []
      }
    },
    filterInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    orderByInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    task:{      
      type:Object,
      default:()=>{
        return {}
      }
    },
    timeStamp:{}
  },
  watch:{
    timeStamp(){
      if(this.task.target=='applyJoinGroup'){
        this.hiddenPop(this.task.params.id);
        // this.groupList.forEach(item=>{
        //   if(item.id==this.task.params.id){
        //     this.$set(item,'currentState',3);
        //   }
        // })
      }
    }
  },
  data(){
    return {
      searchVal:"",
      comments:"",//申请理由
      sortList:{
        "c_create_time":this.$t('management.creationTime'),
        "c_group_name":this.$t('group.Groupname'),
        "c_create_by":this.$t('webAppBuilder.Creator')
      },
      noDataImg:require("img/nodata.jpg"),
      errorStatus:false
    }
  },
  methods:{
    hiddenPop(id){
      this.$refs['apply-join-group-popover-'+id][0].doClose();
    },
    groupDetails(id){
      this.$emit('groupDetails',id);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange",val);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange",val);
    },
    sortChange(key){
      this.orderByInfo.sortNo=key;
      this.$emit("sortChange");
    },
    sortTypeChange(key){
      this.orderByInfo.order=key;
      this.$emit("sortChange");
    },
    applyJoin(){
      this.comments="";
      this.errorStatus=false;
    },
    checkComments(){
      if(!this.comments){
        this.errorStatus=true;
        return false;
      }
      else{
        this.errorStatus=false;
        return true;
      }
    },
    applyJoinGroup(item){
      if(!this.checkComments()){
        return false;
      }
      this.$emit('applyJoinGroup',{
        groupId:item.id,
        comments:this.comments,
        needRefreshList:true
      });
    }
  }
}
</script>

<style lang="scss" scoped>
  
  #group-content-list{
    .content-list-search-input{
      /deep/ .el-input__inner{
        border-radius: 0;
        border:1px solid #a9a9a9;
        &:focus{
          @include base-border();
        }
      }
    }
  }
  .content-list{
    .content-list-details{
      .content-list-details-area{
        .header-area{
          color:#606266;
          font-size:14px;
          height: 40px;
          line-height: 40px;
          background: #fff;
          margin-bottom:20px;
          padding:0 10px;
          .total-nums{
            font-size:15px;
            margin:0 4px;
            @include base-active-color();
          }
          .sort-btn-area{
            text-align: right;
            .el-dropdown-link{
              @include base-active-color();
              cursor: pointer;
            }
            .el-icon-arrow-down{
              color:#606266;
            }
            .sort-type{
              cursor: pointer;
              margin-left:10px;
              &:hover{
                @include base-active-color();
              }
            }
          }
        }
        .details-list-area{
          .group-container{
            background: #fff;
            border:1px solid #dfdfdf;
            color:#7c7c7c;
            padding:14px 0px;
            margin-bottom:20px;
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
                /deep/.image-slot{
                  width: 100%;
                  height: 100%;
                  line-height: 52px;
                  border-radius: 50%;
                  background:#F5F7FA;
                  color:#C0C4CC;
                  text-align: center;
                }
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
                    color:#7c7c7c;
                    margin-left:10px;
                  }
                  .group-operate-gray-btn{
                    color:#7c7c7c;
                    margin-left:10px;
                  }
                  .group-operate-wait-btn{
                    color:#7c7c7c;
                    margin-left:10px;
                  }
                }
              }
              .group-bottom{
                height:36px;
                line-height: 36px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
                .group-details-info{
                  i{
                    margin-right:4px;
                  }
                }
              }
            }
          }
        }
        .pagination{
          /deep/ .el-pagination{
            button {
              background: #fff;
            }
            button[disabled="disabled"] {
              background: #fff;
            }
            .el-pager {
              .number {
                background: #fff;
              }
              .btn-quickprev {
                background: #fff;
              }
              .btn-quicknext {
                background: #fff;
              }
              .active {
                @include base-active-pagination();
              }
            }
          }
        }
      }
    }
  }
  .no-data{
    text-align: center;
    margin-top:20px;
    background: #fff;
    padding:50px 0;
    .el-image{
      display: inline-block;
    }
    p{
      color:#606266;
      font-size:15px;
    }
  }
</style>