<template>
  <div>
    <el-row class="select-area">
      <el-select
        v-model="serverValue"
        :placeholder="$t('myCenter.PleaseSelect')"
        @change="serverChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-row>
    <el-row class="content">
      <el-form :model="emailInfo" :label-width="'160px'" :rules="rules" ref="emailForm">
        <el-divider content-position="left">{{$t('management.Configurenotificationrules')}}</el-divider>
        <el-form-item :label="$t('management.Rulename')+'：'" prop="alert">
          <el-input v-model="emailInfo.alert"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.CPUusageisover')+'：'">
          <el-slider v-model="emailInfo.cpu"></el-slider>
        </el-form-item>
        <el-form-item :label="$t('management.CPUnote')+'：'">
          <el-input v-model="emailInfo.cpuRemark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.Memoryusageisover')+'：'">
          <el-slider v-model="emailInfo.memory"></el-slider>
        </el-form-item>
        <el-form-item :label="$t('management.Memorynote')+'：'">
          <el-input v-model="emailInfo.memoryRemark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.Diskusageisover')+'：'">
          <el-slider v-model="emailInfo.diskspace"></el-slider>
        </el-form-item>
        <el-form-item :label="$t('management.Disknote')+'：'">
          <el-input v-model="emailInfo.diskspaceRemark" type="textarea"></el-input>
        </el-form-item>
        <el-divider content-position="left">{{$t('management.Configureemailnotification')}}</el-divider>
        <el-form-item :label="$t('management.Notificationlevel')+'：'" prop="severity">
          <el-select
            v-model="emailInfo.severity"
            :placeholder="$t('myCenter.PleaseSelect')"
            style="width:100%;"
          >
            <el-option :label="$t('management.Warning')" :value="'warning'"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('management.Emailfornotification')+'：'" prop="email">
          <el-input v-model="emailInfo.email"></el-input>
        </el-form-item>
        <el-divider content-position="left">{{$t('management.ConfigureSMTPinfo')}}</el-divider>
        <el-form-item :label="$t('management.SMTPaddress')+'：'" prop="host">
          <el-input v-model="emailInfo.host"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.SMTPport')+'：'" prop="port">
          <el-input v-model="emailInfo.port"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.Useraccount')+'：'" prop="user">
          <el-input v-model="emailInfo.user"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.Password')+'：'" prop="pass">
          <el-input v-model="emailInfo.pass" show-password></el-input>
        </el-form-item>
        <el-divider></el-divider>
      </el-form>
      <el-row class="button-area">
        <el-button class="base-btn" @click="save">{{$t('visualization.Save')}}</el-button>
      </el-row>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "ManageEmailNotification",
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal, oldVal) {
        if (newVal) {
          this. getListServerDataNotPage();
          
        }
      }
    }
  },
  data() {
    return {
      rules: {
        alert: [
          {
            required: true,
            message: this.$t("management.Pleaseentertherulename"),
            trigger: "blur"
          }
        ],
        severity: [
          {
            required: true,
            message: this.$t("management.Pleasespecifythenotificationlevel"),
            trigger: "change"
          }
        ],
        email: [
          {
            required: true,
            message: this.$t(
              "management.Pleaseentertheemailaddressfornotification"
            ),
            trigger: "blur"
          },
          {
            // eslint-disable-next-line
            pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: this.$t("myCenter.EMailFormatIsIncorrect"),
            trigger: "blur"
          }
        ],
        host: [
          {
            required: true,
            message: this.$t("management.PleaseentertheSMTPaddress"),
            trigger: "blur"
          }
        ],
        port: [
          {
            required: true,
            message: this.$t("management.PleaseentertheSMTPport"),
            trigger: "blur"
          },
          {
            pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: this.$t("management.TheformatofSMTPportisincorrect"),
            trigger: "blur"
          }
        ],
        user: [
          {
            required: true,
            message: this.$t("management.Pleaseentertheuseraccount"),
            trigger: "blur"
          }
        ],
        pass: [
          {
            required: true,
            message: this.$t("management.Pleaseenterthepassword"),
            trigger: "blur"
          }
        ]
      },
      lastAlert: "",
      options: [],
      serverValue: "",
      serverList:[],
      emailInfo: {
        alert: "",
        cpu: 0,
        cpuRemark: "",
        memory: 0,
        memoryRemark: "",
        diskspace: 0,
        diskspaceRemark: "",
        severity: "",
        email: "",
        host: "",
        port: "",
        user: "",
        pass: ""
      }
    };
  },
  methods: {
     getListServerDataNotPage(){//获取微服务服务器列表
      this.serverList=[];
      this.$api.manageServerApi.getListServerDataNotPage().then(res=>{
        let data=res.data.data;
        data.forEach(item=>{
          let temp={
            value:item.C_SERVER_HTTP+","+item.C_SERVER_IP+","+item.C_SERVER_PORTNUMBER,
            label:item.C_SERVER_IP+":"+item.C_SERVER_PORTNUMBER,
            leaf:false
          }
          this.serverList.push(temp);
        })
        this.reset();
      }).catch(()=>{
      })
    },
    save() {
      this.$refs.emailForm.validate(valid => {
        if (valid) {
          if (!this.serverValue) {
            this.$message({
              type: "warning",
              message: this.$t("management.Pleaseselectserverinfofirst")
            });
          }
          let arr = this.serverValue.split(",");
          let data = {
            serverHttp: arr[0],
            serverIp: arr[1],
            serverPortnumber: arr[2]
          };
          this.$api.manageServerApi
            .savaEmailData(
              {
                ...data,
                ...this.emailInfo,
                alertName: this.lastAlert
              },
              { loadingText: this.$t("myCenter.Saving") }
            )
            .then(() => {
              this.$message({
                type: "success",
                message: this.$t("management.succeeded")
              });
            })
            .catch(() => {});
        } else {
          return false;
        }
      });
    },
    getServerInfo(serverHttp, serverIp, serverPortnumber) {
      this.$refs.emailForm.clearValidate();
      this.$api.manageServerApi
        .getServerManagerData(
          {
            serverHttp: serverHttp,
            serverIp: serverIp,
            serverPortnumber: serverPortnumber
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          let data = res.data.data.data;
          let emailConfig = data.emailConfig;
          let ymlFileDetail = data.ymlFileDetail;
          Object.keys(emailConfig).forEach(key => {
            this.emailInfo[key] = emailConfig[key];
          });
          Object.keys(ymlFileDetail).forEach(key => {
            this.emailInfo[key] = ymlFileDetail[key];
          });
          this.emailInfo.cpu = parseInt(this.emailInfo.cpu);
          this.emailInfo.memory = parseInt(this.emailInfo.memory);
          this.emailInfo.diskspace = parseInt(this.emailInfo.diskspace);
          this.lastAlert = this.emailInfo.alert;
        })
        .catch(() => {});
    },
    serverChange(value) {
      this.resetInfo();
      let arr = value.split(",");
      this.getServerInfo(arr[0], arr[1], arr[2]);
    },
    resetInfo() {
      this.emailInfo = {
        alert: "",
        cpu: 0,
        cpuRemark: "",
        memory: 0,
        memoryRemark: "",
        diskspace: 0,
        diskspaceRemark: "",
        severity: "",
        email: "",
        host: "",
        port: "",
        user: "",
        pass: ""
      };
    },
    reset() {
      if (this.options.length == 0) {
        this.options = JSON.parse(JSON.stringify(this.serverList));
        if (this.options.length > 0) {
          this.serverValue = this.options[0].value;
          let arr = this.serverValue.split(",");
          this.getServerInfo(arr[0], arr[1], arr[2]);
        }
      }
    }
  }
};
</script>

<style lang='scss' scoped>
.select-area {
  margin-bottom: 10px;
}
.content {
  border: 1px solid #ebebeb;
  padding: 10px 20%;
}
.button-area {
  text-align: center;
}
</style>