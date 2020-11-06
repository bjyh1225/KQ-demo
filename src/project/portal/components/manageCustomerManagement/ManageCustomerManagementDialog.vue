<template>
  <div class="manageCustomerManagementDialog">
    <el-dialog
      :visible.sync="dialogCustomerVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <div slot="title" class="dialog-title">
        <span class="title-text">{{$t('management.NewTenant')}}</span>
      </div>
      <el-form :label-width="labelWidth" :model="form" ref="ruleForm" :rules="rules">
        <el-form-item :label="$t('management.TenantName') + ':'" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.TenantIdentifier') + ':'" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.DatabaseType') + ':'" prop="dbType">
          <el-select
            v-model="form.dbType"
            :placeholder="$t('myCenter.PleaseSelect')"
            style="width:100%"
          >
            <el-option value="Mysql"></el-option>
            <el-option value="Oracle"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('management.Address') + ':'" required>
          <el-row class="urlData">
            <el-col :span="8">
              <el-form-item prop="ip">
                <el-input
                  v-model="form.ip"
                  style="border: none;"
                  :placeholder="$t('management.PleaseInputDataSourceIP')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="fontUrl">
              <span>:</span>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="port">
                <el-input
                  v-model="form.port"
                  :placeholder="$t('management.PleaseInputDataSourcePortNumber')"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="1" class="fontUrl">
              <span>/</span>
            </el-col>
            <el-col :span=" 6">
              <el-form-item prop="dbName">
                <el-input
                  v-model="form.dbName"
                  :placeholder="$t('management.PleaseInputDatabaseName')"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item :label="$t('management.Username') + ':'" prop="dsUserName">
          <el-input v-model="form.dsUserName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.Password') + ':'" prop="dsPassword">
          <el-input v-model="form.dsPassword"></el-input>
        </el-form-item>
        <el-form-item :label="$t('management.NoOfConnection') + ':'">
          <el-input-number v-model="form.dsMaxActive" step-strictly @blur="getDefaultNum" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('management.DefaultSize') + ':'">
          <el-input-number v-model="form.dsMinIdle" step-strictly @blur="getDefaultNum" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item :label="$t('management.MaOnlineUser') + ':'">
          <el-input-number v-model="form.onlineUser" step-strictly @blur="getDefaultNum" :min="1"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button class="base-btn" @click="test">{{$t('management.Test')}}</el-button>
        <el-button class="base-btn" @click="handleSure">{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    dialogCustomerVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("management.PleaseInputTenantName")));
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("management.PleaseInputIdentifier")));
      } else if (value !== "") {
        this.$api.manageCustomerManagementApi
          .isUniqueCustomerCode({
            code: this.form.code,
          })
          .then((res) => {
            if (res.data.data == true) {
              callback(
                new Error(this.$t("management.IdentifierAlreadyExisted"))
              );
            } else if (res.data.data == false) {
              callback();
            }
          });
      }
    };
    var validateDbType = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("management.PleaseDatabaseType")));
      } else {
        callback();
      }
    };
    var validateDsUserName = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(this.$t("management.PleaseInputDataSourceUsername"))
        );
      } else {
        callback();
      }
    };
    var validateDsPassword = (rule, value, callback) => {
      if (value === "") {
        callback(
          new Error(this.$t("management.PleaseInputDataSourcePassword"))
        );
      } else {
        callback();
      }
    };
    return {
      labelWidth: "140px",
      form: {
        name: "",
        code: "",
        dbType: "",
        dsUrl: "",
        dsUserName: "",
        dsPassword: "",
        codeStatus: false,
        dsMaxActive: 5,
        dsMinIdle: 1,
        onlineUser: 5,
        ip: "",
        port: "",
        dbName: "",
      },
      dsUrlData: {},
      rules: {
        name: [
          {
            validator: validateName,
            trigger: "blur",
            required: true,
          },
          {
            max: 50,
            message: this.$t("management.Theinputcharactersmustbelessthan50"),
            trigger: "blur",
          },
        ],

        code: [
          {
            validator: validateCode,
            trigger: "blur",
            required: true,
          },
          {
            max: 50,
            message: this.$t("management.Theinputcharactersmustbelessthan50"),
            trigger: "blur",
          },
        ],
        dbType: [
          {
            validator: validateDbType,
            trigger: "blur",
            required: true,
          },
          {
            max: 50,
            message: this.$t("management.Theinputcharactersmustbelessthan50"),
            trigger: "blur",
          },
        ],
        dsUrl: [
          {
            trigger: "blur",
            required: true,
          },
          {
            max: 50,
            message: this.$t("management.Theinputcharactersmustbelessthan50"),
            trigger: "blur",
          },
        ],
        ip: [
          {
            required: true,
            message: this.$t("management.PleaseInputDataSourceIP"),
            trigger: "blur",
          },
          {
            pattern: /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
            message: this.$t("management.TheDataSourceIPFormatIsIncorrect"),
            trigger: "blur",
          },
          {
            max: 50,
            message: this.$t("management.Theinputcharactersmustbelessthan50"),
            trigger: "blur",
          },
          // {required: true, validator: checkServerIp, trigger: "submit" }
        ],
        dbName: [
          {
            required: true,
            message: this.$t("management.PleaseInputDatabaseName"),
            trigger: "blur",
          },
          {
            max: 50,
            message: this.$t("management.Theinputcharactersmustbelessthan50"),
            trigger: "blur",
          },
        ],
        port: [
          {
            required: true,
            message: this.$t("management.PleaseInputDataSourcePortNumber"),
            trigger: "blur",
          },
          {
            pattern: /^([0-9]|[1-9]\d|[1-9]\d{2}|[1-9]\d{3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/,
            message: this.$t(
              "management.TheDataSourcePortNumberFormatIsIncorrect"
            ),
            trigger: "blur",
          },
          {
            max: 50,
            message: this.$t("management.Theinputcharactersmustbelessthan50"),
            trigger: "blur",
          },
          // {required: true, validator: checkServerPort, trigger: "submit" }
        ],
        dsUserName: [
          {
            validator: validateDsUserName,
            trigger: "blur",
            required: true,
          },
        ],
        dsPassword: [
          {
            validator: validateDsPassword,
            trigger: "blur",
            required: true,
          },
        ],
      },
      urlrules: {
        ip: [{}],
      },
    };
  },
  methods: {
    //测试连接
    test() {
      var flag = true;
      this.form.dsUrl =
        this.form.ip + ":" + this.form.port + "/" + this.form.dbName;
      this.$refs.ruleForm.validateField(
        ["dbType", "ip", "port", "dbName", "dsUserName", "dsPassword"],
        (valid) => {
          if (valid) {
            flag = false;
          }
        }
      );
      if (flag) {
        this.$api.manageCustomerManagementApi
          .testCustomerConn(
            {
              dbType: this.form.dbType,
              dsUrl: this.form.dsUrl,
              dsUserName: this.form.dsUserName,
              dsPassword: this.form.dsPassword,
            },
            {
              loadingText: this.$t("management.TestingConnection"),
            }
          )
          .then((res) => {
            if (res.data.title == "连接成功") {
              this.$message({
                type: "success",
                message: this.$t("management.ConnectionSucceeded"),
              });
            } else if (res.data.title == "连接失败") {
              this.$message({
                type: "error",
                message: this.$t("management.ConnectionFailed"),
              });
            }
          });
      }
    },
    handleClose() {
      this.$refs.ruleForm.resetFields();
      this.$emit("handClose");
      this.form.dsMaxActive = 5;
      this.form.dsMinIdle = 1;
      this.form.onlineUser = 5;
    },
    handleSure() {
      var formObj = {};
      for (const key in this.form) {
        if (key !== "ip" && key != "port" && key != "dbName") {
          formObj[key] = this.form[key];
        }
      }
      formObj.dsUrl =
        this.form.ip + ":" + this.form.port + "/" + this.form.dbName;

      var that = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          that.$api.manageCustomerManagementApi
            .saveCustomer(formObj, {
              loadingText: that.$t("management.SavingTenantInformation"),
            })
            .then(() => {
              that.$emit("handClose");
              that.$refs.ruleForm.resetFields();
              that.$emit("getCustomerList");
            });
        } else {
          return false;
        }
      });
    },
    getDefaultNum() {
      this.form.dsMaxActive
        ? this.form.dsMaxActive == ""
        : (this.form.dsMaxActive = 5);
      this.form.dsMinIdle
        ? this.form.dsMinIdle == ""
        : (this.form.dsMinIdle = 1);
      this.form.onlineUser
        ? this.form.onlineUser == ""
        : (this.form.onlineUser = 5);
    },
  },
  mounted() {
    if (this.$store.getters.language == "english") {
      this.labelWidth = "160px";
    } else {
      this.labelWidth = "120px";
    }
  },
};
</script>
<style lang="scss" scoped>
.manageCustomerManagementDialog {
  /deep/ .el-dialog {
  }

  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom",
      )
    );

    span {
      @include dialog-title($width: 2px);
      padding-bottom: 18px;
    }
  }

  .urlData {
    height: 42px;
    border-radius: 4px;

    .fontUrl {
      font-size: 16px;
      font-weight: 700;
      text-align: center;
    }
  }

  .el-form {
    padding: 0px 100px;
    border-bottom: 1px solid #ebeef5;
  }
}
</style>