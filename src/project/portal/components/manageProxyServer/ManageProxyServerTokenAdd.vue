<template>
  <div class="add-page">
    <el-divider content-position="left">{{$t('management.GenerateToken')}}</el-divider>
    <el-form :model="tokenInfo" :label-width="'160px'" ref="tokenManageForm">
      <el-form-item :label="$t('management.EffectiveTime') +':'">
        <el-select
          v-model="tokenInfo.timeScope"
          :placeholder="$t('management.PleaseSelect')"
          :disabled="disableStatus"
          @change="dateChange"
        >
          <el-option
            v-for="item in expirationDateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-date-picker
          v-model="tokenInfo.dateTime"
          type="datetimerange"
          :start-placeholder="$t('management.Start')"
          :end-placeholder="$t('management.End')"
          class="date-scope"
          v-if="dateShowStatus"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('management.EffectiveScope') +':'">
        <el-select
          v-model="tokenInfo.accessControlType"
          :placeholder="$t('management.PleaseSelect')"
          @change="accessControlTypeChange"
          :disabled="disableStatus"
        >
          <el-option
            v-for="item in authScopeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-row
        class="pattern-input-area"
        v-if="tokenInfo.accessControlType=='Referer'||tokenInfo.accessControlType=='ClientIp'"
      >
        <span class="title">{{accessControlPatternTitle}}</span>
        <div class="pattern-input">
          <div
            v-for="(item,index) in accessControlPatternsList"
            :key="'patterns'+index"
            class="add-patterns-area"
          >
            <el-input
              v-model="item.value"
              :disabled="disableStatus"
              :class="{'error-input':item.status==false}"
              @blur="patternsBlur(item)"
            >
              <i
                slot="suffix"
                class="el-icon-circle-close input-icon-del"
                @click="delPatterns(index)"
                v-if="!disableStatus"
              ></i>
            </el-input>
            <i
              class="el-icon-circle-plus-outline add-patterns-btn"
              v-if="index==(accessControlPatternsList.length-1)&&!disableStatus"
              @click="addPatterns"
            ></i>
            <div v-if="item.msg" class="error-msg">{{item.msg}}</div>
          </div>
        </div>
        <div
          v-if="accessControlPatternsList.length==0&&(tokenInfo.accessControlType=='Referer'||tokenInfo.accessControlType=='ClientIp')&&!disableStatus"
          class="default-add-patterns-btn"
        >
          <div @click="addPatterns">
            <span>{{addAccessControlPatternTitle}}</span>
            <i class="el-icon-circle-plus-outline add-patterns-btn"></i>
          </div>
        </div>
      </el-row>
      <el-form-item :label="$t('management.remarks') + ':'">
        <el-input v-model="tokenInfo.remark" type="textarea" :rows="2" :disabled="disableStatus"></el-input>
      </el-form-item>
    </el-form>
    <div class="btn-area">
      <el-button class="left-btn" @click="cancel">{{$t('myCenter.cancel')}}</el-button>
      <el-button
        type="primary"
        class="right-btn base-btn"
        @click="createToken"
      >{{$t('management.GenerateToken')}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "TokenManageSingleAdd",
  props: {
    addStatus: {
      type: Boolean,
      default: false,
    },
    serverHttpInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    addStatus() {
      if (this.addStatus) {
        this.reset();
      }
    },
  },
  computed: {
    accessControlPatternTitle() {
      if (this.currentAccessControlType == "Referer") {
        return this.$t("management.Domain") + "：";
      } else if (this.currentAccessControlType == "ClientIp") {
        return this.$t("management.IP") + "：";
      } else {
        return "";
      }
    },
    addAccessControlPatternTitle() {
      if (this.currentAccessControlType == "Referer") {
        return this.$t("management.AddADomain");
      } else if (this.currentAccessControlType == "ClientIp") {
        return this.$t("management.AddIP");
      } else {
        return "";
      }
    },
  },
  data() {
    return {
      disableStatus: false,
      tokenInfo: {
        account: "", //授权用户名
        accountList: [], //授权用户名列表
        accessControlType: "None", //授权范围
        accessControlPatterns: [], //授权范围规则
        clientId: "serverManager", //客户端标识
        endTime: 0, //失效时间戳
        // issueTime:"",//签发时间戳
        issueHost: "", //签发者ip
        issuer: "", //签发用户名
        remark: "", //备注
        startTime: 0, //生效时间戳
        timeScope: "oneWeek",
        dateTime: [],
      },
      dateShowStatus: false,
      accessControlPatternsList: [],
      currentAccessControlType: "",
      authScopeOptions: [
        {
          value: "None",
          label: this.$t("management.Unlimited"),
        },
        {
          value: "Referer",
          label: this.$t("management.Domain"),
        },
        {
          value: "ClientIp",
          label: this.$t("management.IP"),
        },
      ],
      expirationDateOptions: [
        {
          value: "oneHour",
          label: this.$t("management.OneHour"),
        },
        {
          value: "oneDay",
          label: this.$t("management.OneDay"),
        },
        {
          value: "oneWeek",
          label: this.$t("management.OneWeek"),
        },
        {
          value: "oneMonth",
          label: this.$t("management.OneMouth"),
        },
        {
          value: "oneYear",
          label: this.$t("management.OneYear"),
        },
        {
          value: "customize",
          label: this.$t("visualization.Custom"),
        },
      ],
    };
  },
  methods: {
    accessControlTypeChange(value) {
      if (this.currentAccessControlType != value) {
        this.accessControlPatternsList = [];
      }
      if (value == "Referer" || value == "ClientIp") {
        this.accessControlPatternsList.push({ value: "" });
      }
      this.currentAccessControlType = value;
    },
    addPatterns() {
      //新增授权范围
      this.accessControlPatternsList.push({ value: "" });
    },
    delPatterns(index) {
      //删除授权范围详情
      this.accessControlPatternsList.splice(index, 1);
    },
    checkPatterns(value, type) {
      if (type == "Referer") {
        if (!value) {
          return {
            status: false,
            msg: this.$t("management.PleaseFillInTheDomainName"),
          };
        } else {
          let p = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/;
          if (!p.test(value)) {
            return {
              status: false,
              msg: this.$t("management.TheDomainFormatIsIncorrect"),
            };
          }
        }
      }
      if (type == "ClientIp") {
        if (!value) {
          return {
            status: false,
            msg: this.$t("management.PleaseFillInTheIPInformation"),
          };
        } else {
          let p = /((^\s*((([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))\s*$)|(^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$))/;
          if (!p.test(value)) {
            return {
              status: false,
              msg: this.$t("management.TheIPFormatIsIncorrect"),
            };
          }
        }
      }
      return {
        status: true,
        msg: "",
      };
    },
    cancel() {
      this.$emit("cancel");
    },
    getDateScope(scope) {
      if (scope == "oneHour") {
        return {
          startTime: new Date().getTime(),
          endTime: new Date().getTime() + 1000 * 60 * 60,
        };
      } else if (scope == "oneDay") {
        return {
          startTime: new Date().getTime(),
          endTime: new Date().getTime() + 1000 * 60 * 60 * 24,
        };
      } else if (scope == "oneWeek") {
        return {
          startTime: new Date().getTime(),
          endTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
        };
      } else if (scope == "oneMonth") {
        return {
          startTime: new Date().getTime(),
          endTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 30,
        };
      } else if (scope == "oneYear") {
        return {
          startTime: new Date().getTime(),
          endTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 365,
        };
      } else {
        return {
          startTime: 0,
          endTime: 0,
        };
      }
    },
    createToken() {
      const emptyTips = {
        Referer: this.$t("management.PleaseAddDomainNameInformation"),
        ClientIp: this.$t("management.PleaseAddNewIPInformation"),
      };
      this.tokenInfo.account = "portal_admin";
      if (this.tokenInfo.timeScope == "customize") {
        if (this.tokenInfo.dateTime && this.tokenInfo.dateTime.length > 0) {
          this.tokenInfo.startTime = new Date(
            this.tokenInfo.dateTime[0]
          ).getTime();
          this.tokenInfo.endTime = new Date(
            this.tokenInfo.dateTime[1]
          ).getTime();
          if (this.tokenInfo.endTime < new Date().getTime()) {
            this.$message({
              type: "warning",
              message: this.$t("management.TheSelectedEffectiveTimeHasExpired"),
            });
            return false;
          }
        } else {
          this.$message({
            type: "warning",
            message: this.$t(
              "management.PleaseSelectACustomEffectiveTimeRange"
            ),
          });
          return false;
        }
      } else {
        let time = this.getDateScope(this.tokenInfo.timeScope);
        this.tokenInfo.startTime = time.startTime;
        this.tokenInfo.endTime = time.endTime;
      }
      let hostname = window.location.hostname;
      this.tokenInfo.issuer = "portal_admin";
      this.tokenInfo.issueHost = hostname;
      if (
        this.tokenInfo.accessControlType == "Referer" ||
        this.tokenInfo.accessControlType == "ClientIp"
      ) {
        if (this.accessControlPatternsList.length == 0) {
          this.$message({
            type: "warning",
            message: emptyTips[this.tokenInfo.accessControlType],
          });
          return false;
        }
        let list = [];
        let errorStatus = false;
        this.accessControlPatternsList.forEach((item) => {
          let r = this.checkPatterns(
            item.value,
            this.tokenInfo.accessControlType
          );
          item.status = r.status;
          item.msg = r.msg;
          if (!r.status) {
            errorStatus = true;
          }
          list.push(item.value);
        });
        this.accessControlPatternsList = JSON.parse(
          JSON.stringify(this.accessControlPatternsList)
        );
        this.tokenInfo.accessControlPatterns = JSON.stringify(list);
        if (errorStatus) {
          return false;
        }
      }
      this.$api.tokenApi
        .getToke(
          {
            ...this.serverHttpInfo,
            ...this.tokenInfo,
          },
          { loadingText: this.$t("management.GeneratingToken") }
        )
        .then(() => {
          this.$message({
            type: "success",
            message: this.$t("management.SuccessfullyGenerated"),
          });
          this.$emit("createTokenSuccess");
        })
        .catch(() => {});
    },
    patternsBlur(item) {
      let r = this.checkPatterns(item.value, this.tokenInfo.accessControlType);
      this.$set(item, "status", r.status);
      this.$set(item, "msg", r.msg);
    },
    reset() {
      this.tokenInfo = {
        account: "", //授权用户名
        accountList: [], //授权用户名列表
        accessControlType: "None", //授权范围
        accessControlPatterns: [], //授权范围规则
        clientId: "serverManager", //客户端标识
        endTime: 0, //失效时间戳
        // issueTime:"",//签发时间戳
        issueHost: "", //签发者ip
        issuer: "", //签发用户名
        remark: "", //备注
        startTime: 0, //生效时间戳
        timeScope: "oneWeek",
        dateTime: [],
      };
      this.accessControlPatternsList = [];
      this.dateShowStatus = false;
    },
    dateChange(value) {
      if (value == "customize") {
        this.dateShowStatus = true;
      } else {
        this.dateShowStatus = false;
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.add-page {
  padding: 20px 20%;
  /deep/ .el-select {
    width: 250px;
  }
  .btn-area {
    margin-top: 40px;
    margin-left: 120px;
    .right-btn {
      margin-left: 30px;
    }
  }
  .pattern-input-area {
    position: relative;
    .title {
      display: block;
      width: 148px;
      float: left;
      font-size: 14px;
      color: #606266;
      text-align: right;
      height: 40px;
      line-height: 40px;
      padding-right: 12px;
    }
    .pattern-input {
      margin-left: 160px;
    }
    .el-input {
      width: 250px;
      line-height: 40px;
      margin-bottom: 20px;
    }
    .default-add-patterns-btn {
      margin-bottom: 20px;
      color: #1890ff;
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      div {
        cursor: pointer;
      }
    }
    .add-patterns-area {
      position: relative;
      .input-icon-del {
        cursor: pointer;
        &:hover {
          color: #1890ff;
        }
      }
      .add-patterns-btn {
        cursor: pointer;
        font-size: 14px;
        color: #1890ff;
      }
    }
    .error-input {
      /deep/ .el-input__inner {
        border: 1px solid #f56c6c;
      }
    }
    .error-msg {
      color: #f56c6c;
      position: absolute;
      top: 42px;
      left: 0;
      font-size: 12px;
    }
  }
  .date-scope {
    margin-top: 20px;
  }
}
</style>