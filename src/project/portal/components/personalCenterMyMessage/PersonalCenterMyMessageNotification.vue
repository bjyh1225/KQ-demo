<template>
  <el-row>
    <el-row class="top-menu">
      <span class="top-title">{{$t('myCenter.Message')}}({{unread}})</span>
      <div class="back" @click="goBack" v-show="detailsShow">
        <span class="el-icon-back">{{$t('service.back')}}</span>
      </div>
    </el-row>
    <el-row class="message-container" v-show="!detailsShow">
      <el-row class="top-tips">
        <el-col :span="14">
          <p
            class="tips"
          >{{$t('myCenter.Thesystemautomaticallycleansupthereadmessagesthreemonthsago')}}</p>
        </el-col>
        <el-col :span="10" class="btn-group" v-show="messageList.length>0">
          <span @click="allMarkRead">{{$t('myCenter.Markallasread')}}</span>
          <span @click="deleteAllMessage">{{$t('myCenter.Deleteallreadmessages')}}</span>
        </el-col>
      </el-row>
      <el-row v-if="messageList.length>0">
        <el-row class="list">
          <ul>
            <transition-group
              enter-active-class="animated fadeInRight"
              leave-active-class="animated fadeOutRight"
            >
              <li
                v-for="(item,ix) in messageList"
                :key="item.C_ID"
                @mouseenter="deleteShow"
                @mouseleave="deleteHide"
                v-show="!item.deleted"
                @click="viewDetails(ix)"
              >
                <el-row :class="{'readed':item.status}">
                  <el-col :span="3" class="type">
                    <span>{{type[item.C_TYPE]}}</span>
                  </el-col>
                  <el-col :span="21">
                    <p class="content">{{item.C_MESSAGE}}</p>
                    <div class="author-time">
                      <span>{{$t('myCenter.Publisher')}}：{{item.C_NICKNAME}}</span>
                      <span>{{$t('myCenter.Date')}}：{{item.C_TIME}}</span>
                    </div>
                  </el-col>
                </el-row>
                <i class="el-icon-delete message-del" @click.stop="deleteMessage(ix)"></i>
              </li>
            </transition-group>
          </ul>
        </el-row>
        <el-row class="show-more" v-show="total!=currentLastIndex+1&&messageList.length>0">
          <span @click="showMore">{{$t('myCenter.Clicktoviewmore')}}&gt;&gt;</span>
        </el-row>
        <el-row class="display-all" v-show="total==currentLastIndex+1&&messageList.length>0">
          <span>{{$t('myCenter.Allhasbeenloaded')}}</span>
        </el-row>
      </el-row>
      <el-row class="no-data" v-else>
        <el-image :src="noDataImg"></el-image>
        <p>{{$t('myCenter.Nomessagenow')}}</p>
      </el-row>
    </el-row>
    <el-row class="details-message" v-show="detailsShow">
      <el-row class="title">
        <el-col :span="8">
          <span>{{$t('myCenter.Messagetype')}}：{{type[messageInfo.C_TYPE]}}</span>
        </el-col>
        <el-col :span="8">
          <span>{{$t('myCenter.Publisher')}}：{{messageInfo.C_NICKNAME}}</span>
        </el-col>
        <el-col :span="8">
          <span>{{$t('myCenter.Date')}}：{{messageInfo.C_TIME}}</span>
        </el-col>
      </el-row>
      <el-row class="details">
        <p>{{messageInfo.C_MESSAGE}}</p>
      </el-row>
    </el-row>
  </el-row>
</template>

<script>
import {dateFormat} from '@/utils/dateUtils.js'
export default {
  name: "PersonalCenterMyMessageNotification",
  components: {},
  props: {
    active: {
      type: String,
      default: ""
    },
    action: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    active() {
      if (this.active == "notification") {
        this.detailsShow = false;
      }
    },
    action() {
      if (this.action.source == "message") {
        this.getMessageList();
      }
      if (
        this.action.source == "index" &&
        this.action.action == "getAllMessage"
      ) {
        this.detailsShow = false;
        this.getMessageList();
      }
      if (this.action.source == "index" && this.action.action == "getDetails") {
        this.detailsShow = true;
        this.messageInfo = this.action.info;
        if (!this.action.info.status) {
          this.$api.personalCenterMyMessageApi
            .modifyMessageHasRead({
              msgId: this.action.info.id,
              fromId: this.action.info.fromId,
              toId: this.action.info.toId
            })
            .then(() => {
              this.action.info.status = true;
              this.getMessageList();
            })
            .catch(() => {});
        }
      }
    }
  },
  methods: {
    deleteShow(e) {
      e.currentTarget.getElementsByClassName("message-del")[0].style.display =
        "block";
    },
    deleteHide(e) {
      e.currentTarget.getElementsByClassName("message-del")[0].style.display =
        "none";
    },
    viewDetails(index) {
      //查看详情,标记已读
      this.detailsShow = true;
      this.messageInfo = this.messageList[index];
      if (!this.messageList[index].status) {
        this.$api.personalCenterMyMessageApi
          .modifyMessageHasRead({
            msgId: this.messageList[index].C_ID,
            fromId: this.messageList[index].C_FROM_ID,
            toId: this.messageList[index].C_TO_ID
          })
          .then(() => {
            this.messageList[index].status = true;
            this.unread = this.unread - 1;
            this.$forceUpdate();
          })
          .catch(() => {});
      }
    },
    goBack() {
      //返回
      this.detailsShow = false;
    },
    showMore() {
      //查看更多消息
      if (
        this.allMessageList.length >=
        this.pageSize + this.messageList.length
      ) {
        this.messageList = this.messageList.concat(
          this.allMessageList.slice(
            this.startIndex,
            this.pageSize + this.messageList.length
          )
        );
        this.currentLastIndex = this.currentLastIndex + this.pageSize;
        this.startIndex = this.currentLastIndex + 1;
      } else {
        this.messageList = this.messageList.concat(
          this.allMessageList.slice(this.startIndex, this.allMessageList.length)
        );
        this.currentLastIndex = this.allMessageList.length - 1;
        this.startIndex = this.allMessageList.length;
      }
    },
    deleteMessage(index) {
      //删除消息
      this.$api.personalCenterMyMessageApi
        .removeMessageById(
          { id: this.messageList[index].C_ID },
          { loadingText: this.$t("management.deleting") }
        )
        .then(() => {
          this.$message({
            message: this.$t("management.Deletesuccessful"),
            type: "success"
          });
          this.messageList[index].deleted = true;
          this.$forceUpdate();
        })
        .catch(() => {});
    },
    deleteAllMessage() {
      //删除全部已读
      this.$api.personalCenterMyMessageApi
        .removeHasReadMsgByPersonnelId({
          loadingText: this.$t("management.deleting")
        })
        .then(() => {
          this.$message({
            message: this.$t("management.Deletesuccessful"),
            type: "success"
          });
          this.getMessageList();
        })
        .catch(() => {});
    },
    allMarkRead() {
      //全部标记为已读
      this.$api.personalCenterMyMessageApi
        .batchModifyMessageHasRead({
          loadingText: this.$t("myCenter.Labeling")
        })
        .then(() => {
          this.$message({
            message: this.$t("myCenter.Labeledsuccessfully"),
            type: "success"
          });
          this.getMessageList();
        })
        .catch(() => {});
    },
    getMessageList() {
      //获取消息列表
      this.reset();
      this.$api.personalCenterMyMessageApi
        .getAllHistoryMessage({}, { loadingText: this.$t("service.searching") })
        .then(res => {
          this.allMessageList = res.data.data.data;
          this.unread = res.data.data.unReadCount;
          this.total = res.data.data.total;
          //加入删除标识
          this.allMessageList.forEach(item => {
            item.deleted = false;
            item.status=item.C_UNREAD==0?false:true;
            item.C_TIME = dateFormat("YYYY-mm-dd HH:MM:SS",item.C_TIME);
          });
          if (this.allMessageList.length >= this.pageSize) {
            this.messageList = this.allMessageList.slice(
              this.startIndex,
              this.pageSize
            );
            this.currentLastIndex = this.pageSize - 1;
            this.startIndex = this.pageSize;
          } else {
            this.messageList = this.allMessageList.slice(
              this.startIndex,
              this.allMessageList.length
            );
            this.currentLastIndex = this.allMessageList.length - 1;
            this.startIndex = this.allMessageList.length;
          }
        })
        .catch(() => {});
    },
    reset() {
      this.allMessageList = [];
      this.messageList = [];
      this.startIndex = 0;
      this.currentLastIndex = 0;
      this.total = 0;
    }
  },
  data() {
    return {
      current: "system",
      detailsShow: false,
      messageList: [],
      allMessageList: [],
      startIndex: 0, //起始位置
      pageSize: 20, //条数
      currentLastIndex: 0, //当前位置
      total: 0, //总数
      unread: 0, //未读消息数
      type: {
        "0": this.$t("myCenter.Personalmessage"),
        "1": this.$t("myCenter.Groupmessage"),
        "2": this.$t("myCenter.Systemmessage")
      },
      noDataImg: require("img/nomessage.jpg"),
      messageInfo: {} //一条消息记录
    };
  }
};
</script>

<style lang='scss' scoped>

.top-menu {
  height: 49px;
  line-height: 49px;
  border-bottom: 1px solid #b7bbbf;
  .top-title {
    @include dialog-title($width: 2px);
    padding-bottom: 13px;
    font-size: 16px;
    @include base-color();
  }
  .back {
    float: right;
    margin-right: 20px;
    cursor: pointer;
    @include base-active-color();
  }
}
.top-tips {
  background: #f3f5f7;
  height: 50px;
  .tips {
    color: #93999f;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    padding: 0;
    margin: 0;
    padding-left: 30px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .btn-group {
    height: 50px;
    line-height: 50px;
    text-align: right;
    span {
      @include base-color();
      font-size: 14px;
      margin-right: 20px;
      cursor: pointer;
      &:hover {
        @include base-active-color();
      }
    }
  }
}
.list {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      height: 76px;
      border-bottom: 1px solid #ebeef5;
      cursor: pointer;
      position: relative;
      .type {
        height: 76px;
        line-height: 76px;
        text-align: right;
        padding-right: 2%;
        span {
          @include base-border();
          @include base-active-color();
          padding: 8px 10px;
          font-size: 15px;
        }
      }
      .content {
        margin: 0;
        padding: 0;
        font-size: 16px;
        @include base-color();
        height: 38px;
        line-height: 58px;
        width: 90%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .author-time {
        font-size: 14px;
        color: #93999f;
        height: 38px;
        line-height: 38px;
        span:nth-child(1) {
          display: inline-block;
          min-width: 25%;
          margin-right: 20px;
        }
      }
      &:hover {
        background: #fafafa;
      }
      .message-del {
        position: absolute;
        height: 16px;
        width: 16px;
        top: 0;
        right: 20px;
        bottom: 0;
        margin: auto;
        font-size: 16px;
        color: #606266;
        display: none;
        cursor: pointer;
      }
      //已读
      .readed {
        .type {
          span {
            color: #93999f;
            border: 1px solid #d9dde1;
          }
        }
        .content {
          color: #93999f;
        }
      }
    }
  }
}
.show-more {
  margin-top: 15px;
  text-align: center;
  @include base-active-color();
  margin-bottom: 30px;
  span {
    cursor: pointer;
    font-size: 14px;
  }
}
.display-all {
  margin-top: 15px;
  text-align: center;
  color: #93999f;
  margin-bottom: 30px;
  span {
    font-size: 14px;
  }
}
.no-data {
  margin-top: 30px;
  position: relative;
  .el-image {
    width: 198px;
    height: 192px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
  p {
    width: 198px;
    text-align: center;
    color: #93999f;
    position: absolute;
    top: 210px;
    left: 0;
    right: 0;
    margin: auto;
  }
}
//详情页面
.details-message {
  margin-top: 40px;
  .title {
    background: #f9f9f9;
    height: 48px;
    line-height: 48px;
    font-size: 14px;
    color: #606266;
    .el-col:nth-child(1) {
      text-align: right;
    }
    .el-col:nth-child(2) {
      text-align: center;
    }
    .el-col:nth-child(3) {
      text-align: left;
    }
  }
  .details {
    margin-top: 30px;
    p {
      text-indent: 32px;
      color: #606266;
      line-height: 30px;
    }
  }
}
</style>