<template>
  <div class="key-manage">
    <div class="key-manage-display">
      <transition
        enter-active-class="animated slideInLeft left-leave"
        leave-active-class="animated slideOutLeft left-leave"
      >
        <div v-show="!addStatus" class="token-display">
          <div class="token-info">
            <el-divider content-position="left">{{$t('management.TokenInformation')}}</el-divider>
            <div class="label-item">
              <span class="label">{{$t('management.Token') + ":"}}</span>
              <span>{{dataStatus?tokenInfo.token:$t("management.TokenHasNotBeenGenerated")}}</span>
            </div>
            <div class="label-item">
              <span class="label">{{$t('management.Start')}}：</span>
              <span>{{tokenInfo.startTime}}</span>
            </div>
            <div class="label-item">
              <span class="label">{{$t('management.End')}}：</span>
              <span>{{tokenInfo.endTime}}</span>
            </div>
            <div class="label-item">
              <span class="label">{{$t('management.EffectiveScope') + ':'}</span>
              <span>{{tokenInfo.accessControlTypeLabel}}</span>
            </div>
            <el-row class="label-item" v-if="tokenInfo.accessControlType!='None'&&dataStatus">
              <div class="scope-details-label">{{$t('management.ScopeDetails') + ':'}}</div>
              <div class="scope-details">
                <p v-for="item in tokenInfo.accessControlPatterns" :key="item">{{item}}</p>
              </div>
            </el-row>
            <div class="label-item">
              <span class="label">{{$t('management.remarks') +':'}} </span>
              <span>{{tokenInfo.remark?tokenInfo.remark:dataStatus?$t('group.Notavailablenow'):''}}</span>
            </div>
            <div class="label-item">
              <span class="label">{{$t('management.state') + ':'}}</span>
              <span>{{tokenInfo.enabled?$t("management.enabled"):dataStatus?$t("management.prohibit"):''}}</span>
            </div>
          </div>
          <div class="btn-area">
            <el-button
              type="primary"
              class="left-btn base-btn"
              v-if="!tokenInfo.enabled&&dataStatus"
              @click="enableToken"
            >{{$t("management.enabled")}}</el-button>
            <el-button
              type="primary"
              class="left-btn base-btn"
              v-if="tokenInfo.enabled&&dataStatus"
              @click="disableToken"
            >{{$t("management.prohibit")}}</el-button>
            <el-button
              type="primary"
              class="center-btn base-btn"
              v-if="!dataStatus"
              @click="openAdd"
            >{{$t('management.GenerateToken')}}</el-button>
            <el-button type="primary" class="right-btn base-btn" v-else @click="openAdd">{{$t('management.RegenerateToken')}}</el-button>
          </div>
        </div>
      </transition>
      <transition
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <div v-show="addStatus">
          <manage-proxy-server-token-add
            :serverHttpInfo="serverHttpInfo"
            @cancel="cancel"
            @createTokenSuccess="createTokenSuccess"
            :addStatus="addStatus"
          ></manage-proxy-server-token-add>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ManageProxyServerTokenAdd from "./ManageProxyServerTokenAdd.vue";
import { dateFormat } from "@/utils/dateUtils.js";
export default {
  name: "ManageProxyServerToken",
  components: {
    ManageProxyServerTokenAdd,
  },
  props: {
    serverHttpInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    initTask: {},
  },
  watch: {
    initTask() {
      this.reset();
      this.getTokenList();
    },
  },
  data() {
    return {
      tokenInfo: {},
      dataStatus: false,
      addStatus: false,
    };
  },
  methods: {
    getTokenList() {
      //获取token列表
      this.$api.tokenApi
        .tokeList(
          {
            ...this.serverHttpInfo,
          },
          { loadingText: "正在查询" }
        )
        .then((res) => {
          if (!res.data.data) {
            return false;
          }
          let data = res.data.data.recordSet;
          if (data.length == 0) {
            return false;
          }
          let tableList = [];
          data.forEach((item) => {
            let info = {
              enabled: item.enabled,
              token: item.token,
              ...item.tokenInfo,
            };
            info.startTime = dateFormat("YYYY-mm-dd HH:MM:SS", info.startTime);
            info.endTime = dateFormat("YYYY-mm-dd HH:MM:SS", info.endTime);
            let accountList = info.account.split(",");
            let aliasList = info.aliasName.split(",");
            let accountName = [];
            for (let i = 0; i < accountList.length; i++) {
              let temp = aliasList[i] + "(" + accountList[i] + ")";
              accountName.push(temp);
            }
            info.accountName = accountName;
            if (info.accessControlType == "None") {
              info.accessControlTypeLabel = this.$t('managment.Unlimited');
            } else if (info.accessControlType == "Referer") {
              info.accessControlTypeLabel = this.$t('management.Domain');
            } else if (info.accessControlType == "ClientIp") {
              info.accessControlTypeLabel = this.$t('management.IP');
            }
            tableList.push(info);
          });
          this.tokenInfo = tableList[0];
          this.dataStatus = true;
        })
        .catch(() => {});
    },
    openAdd() {
      this.addStatus = true;
    },
    cancel() {
      this.addStatus = false;
    },
    reset() {
      this.dataStatus = false;
      this.tokenInfo = {};
      this.addStatus = false;
    },
    enableToken() {
      //启用Token
      this.$api.tokenApi
        .enableToke(
          {
            ...this.serverHttpInfo,
            tokens: JSON.stringify([this.tokenInfo.token]),
          },
          { loadingText: this.$t('management.Activating') }
        )
        .then(() => {
          this.$message({
            type: "success",
            message: this.$t('management.SuccessfullyActivated'),
          });
          this.getTokenList();
        })
        .catch(() => {});
    },
    disableToken() {
      //禁用Token
      this.$api.tokenApi
        .disableToke(
          {
            ...this.serverHttpInfo,
            tokens: JSON.stringify([this.tokenInfo.token]),
          },
          { loadingText: this.$t('management.Disabling') }
        )
        .then(() => {
          this.$message({
            type: "success",
            message: this.$t('management.SuccessfullyDisabled'),
          });
          this.getTokenList();
        })
        .catch(() => {});
    },
    createTokenSuccess() {
      this.getTokenList();
      this.cancel();
    },
  },
};
</script>

<style lang="scss" scoped>
.key-manage {
  // padding:20px 5%;
  // min-height:580px;
  .key-manage-display {
    min-height: 540px;
    // border: 1px solid #ebebeb;
    overflow: hidden;
    position: relative;
  }
  .token-display {
    padding: 20px 20%;
  }
  .token-info {
    color: #606066;
    font-size: 14px;
    .label-item {
      margin-bottom: 20px;
      .label {
        display: inline-block;
        width: 160px;
        text-align: right;
        margin-right: 5px;
      }
      .scope-details-label {
        width: 160px;
        text-align: right;
        float: left;
      }
      .scope-details {
        margin-left: 165px;
        p {
          margin: 0;
          margin-bottom: 14px;
        }
        p:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
  .btn-area {
    margin-top: 40px;
    margin-left: 120px;
    .center-btn {
      margin-left: 40px;
    }
    .right-btn {
      margin-left: 30px;
    }
  }
  .left-leave {
    position: absolute;
    top: 0px;
    left: 0;
  }
}
</style>