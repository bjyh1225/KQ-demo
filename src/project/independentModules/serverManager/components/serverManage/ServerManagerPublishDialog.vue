<template>
  <div class="system-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :modal="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>发布服务</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <div class="steps">
          <ul>
            <li :class="{'is-active':firstStep}">服务基本信息</li>
            <li :class="{'is-active':secondStep}">服务设置</li>
          </ul>
        </div>
        <div class="first-step-form" v-show="firstStep">
          <el-form
            :model="serviceInfo"
            :label-width="'120px'"
            :rules="rules"
            ref="catalogueFirstStepForm"
          >
            <el-row>
              <el-col :span="12">
                <el-form-item :label="'服务目录：'">
                  <span>{{serviceInfo.folderaliasname}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'服务类型：'" prop="serviceType">
                  <el-select v-model="serviceInfo.serviceType" placeholder="请选择服务类型">
                    <el-option
                      v-for="item in typeList"
                      :key="item.name"
                      :label="item.aliasName"
                      :value="item.name"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="'选择节点：'">
              <el-select v-model="serviceInfo.serviceAliases" multiple placeholder="请选择节点">
                <el-option
                  v-for="item in nodeList"
                  :key="item.serviceAlias"
                  :label="item.serviceAlias"
                  :value="item.serviceAlias"
                  :disabled="item.disabled"
                >
                  <span style="float: left">
                    {{
                    (item.serviceAlias
                    ? item.serviceAlias
                    : item.serviceName) +
                    " (" +
                    item.ipAddress +
                    ":" +
                    item.port +
                    ")"
                    }}
                  </span>
                  <span
                    style="float: right; margin-right:20px; color: #8492a6; font-size: 13px"
                  >{{ item.serviceName }}</span>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="'服务名称：'" prop="servicename">
              <el-input v-model="serviceInfo.servicename"></el-input>
            </el-form-item>
            <el-form-item :label="'别名：'">
              <el-input v-model="serviceInfo.aliasname"></el-input>
            </el-form-item>
            <el-form-item :label="'描述：'">
              <el-input v-model="serviceInfo.description" type="textarea"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="second-step-form" v-show="secondStep">
          <el-form
            :model="serviceInfo"
            :label-width="'120px'"
            :rules="rules"
            ref="catalogueSecondStepForm"
          >
            <el-form-item :label="'地图文件：'" prop="file">
              <el-upload
                :limit="1"
                :multiple="false"
                class="upload-demo"
                ref="upload"
                :accept="accept"
                :on-change="uploadChange"
                :on-exceed="handleExceed"
                :http-request="createService"
                action
                :auto-upload="false"
                :on-remove="removeFile"
              >
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <span v-if="accept">只能上传{{accept}}的文件</span>
              </el-upload>
            </el-form-item>
            <el-divider content-position="left">瓦片存储路径</el-divider>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="'存储类型：'">
                  <el-radio-group
                    v-model="serviceInfo.storeType"
                    :disabled="themeDisabled"
                    @change="storeTypeChange"
                  >
                    <el-radio :label="'本地存储'">本地存储</el-radio>
                    <el-radio :label="'MongoDB'">MongoDB</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'IP/端口：'" :class="{'is-required':!disabled}">
                  <el-input v-model="serviceInfo.uri" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="'授权数据库：'" :class="{'is-required':!disabled}">
                  <el-input v-model="serviceInfo.authDb" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'数据库：'" :class="{'is-required':!disabled}">
                  <el-input v-model="serviceInfo.dbName" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item :label="'用户名：'">
                  <el-input v-model="serviceInfo.username" :disabled="disabled"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item :label="'密码：'">
                  <el-input v-model="serviceInfo.password" :disabled="disabled" show-password></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item class="right-form-item">
              <el-button type="primary" size="mini" :disabled="disabled" @click="testConnect">测试连接</el-button>
            </el-form-item>
            <el-divider content-position="left">地图浏览主题</el-divider>
            <el-form-item>
              <el-radio-group v-model="serviceInfo.isDefaultTheme" :disabled="themeDisabled">
                <el-radio :label="true">默认主题</el-radio>
                <el-radio :label="false">浅色主题</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @mousedown.native="nextStep" v-if="firstStep">下一步</el-button>
        <el-button class="base-white-btn" @click="preStep" v-if="secondStep">上一步</el-button>
        <el-button type="primary" class="base-btn" @click="save" v-if="secondStep">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ServerManagerPublishDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    serviceInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    typeList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    serviceTypeConfig: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.getNodeInfo();
        this.firstStep = true;
        this.secondStep = false;
        this.activeServiceType = "";
        if (this.$refs.upload) {
          this.$refs.upload.clearFiles();
        }
      }
    },
  },
  computed: {
    accept() {
      if (this.serviceInfo.serviceType) {
        return this.serviceTypeConfig[this.serviceInfo.serviceType].type;
      } else {
        return "";
      }
    },
    disabled() {
      if (
        this.serviceInfo.serviceType == "MapService" &&
        this.serviceInfo.storeType == "MongoDB"
      ) {
        return false;
      } else {
        return true;
      }
    },
    themeDisabled() {
      if (this.serviceInfo.serviceType == "MapService") {
        return false;
      } else {
        return true;
      }
    },
  },
  data() {
    var checkServicename = (rule, value, callback) => {
      this.$api.serverManageApi
        .checkServiceNameExist(
          {
            serviceName: value,
            serviceAliases: this.serviceInfo.serviceAliases,
          },
          {
            loadingText: "检查中",
          }
        )
        .then((res) => {
          let data = res.data.data;
          if (data) {
            return callback(new Error("服务名称已存在"));
          } else {
            callback();
          }
        })
        .catch(() => {
          return callback(new Error("检查服务名称发生错误"));
        });
    };
    return {
      firstStep: true,
      secondStep: false,
      rules: {
        servicename: [
          { required: true, message: "请填写服务名称", trigger: "blur" },
          {
            pattern: /^[a-z0-9_]*$/,
            message: "只能输入数字，小写字母，下划线的组合",
            trigger: "blur",
          },
          { required: true, validator: checkServicename, trigger: "blur" },
        ],
        serviceType: [
          { required: true, message: "请选择服务类型", trigger: "change" },
        ],
        file: [
          { required: true, message: "请选择地图文件", trigger: "change" },
        ],
      },
      nodeList: [],
      activeServiceType: "",
    };
  },
  methods: {
    handleClose() {
      this.$refs.catalogueFirstStepForm.clearValidate();
      this.$refs.catalogueSecondStepForm.clearValidate();
      this.$emit("dialogClose");
    },
    save() {
      this.$refs.catalogueSecondStepForm.validate((valid) => {
        if (valid) {
          if (this.serviceInfo.storeType == "MongoDB") {
            if (
              !this.serviceInfo.uri ||
              !this.serviceInfo.authDb ||
              !this.serviceInfo.dbName
            ) {
              this.$message({
                type: "warning",
                message: "请填写IP/端口、授权数据库、数据库信息",
              });
              return false;
            }
          }
          this.$refs.upload.submit();
        } else {
          return false;
        }
      });
    },
    nextStep() {
      this.$refs.catalogueFirstStepForm.validate((valid) => {
        if (valid) {
          //效验选择类型改变
          if (this.activeServiceType != this.serviceInfo.serviceType) {
            this.resetServiceInfo();
            this.serviceInfo.file = null;
            this.$refs.upload.clearFiles();
          }
          this.activeServiceType = this.serviceInfo.serviceType;
          this.firstStep = false;
          this.secondStep = true;
        } else {
          return false;
        }
      });
    },
    preStep() {
      this.firstStep = true;
      this.secondStep = false;
    },
    getNodeInfo() {
      this.$api.serverManageApi
        .getServerNodeInfo(
          {
            nodeType: "2",
          },
          {
            loadingText: "正在查询",
          }
        )
        .then((res) => {
          let data = res.data.data;
          data.forEach((item) => {
            if (item.health != "passing") {
              item.disabled = true;
            } else {
              item.disabled = false;
            }
          });
          this.nodeList = data;
        });
    },
    handleExceed() {
      this.$message({
        type: "warning",
        message: "只能选择一个地图文件",
      });
    },
    uploadChange(file) {
      //上传文件改变
      if (
        file.name.indexOf(
          this.serviceTypeConfig[this.serviceInfo.serviceType].type
        ) < 0
      ) {
        this.$message({
          type: "warning",
          message:
            "只能选择" +
            this.serviceTypeConfig[this.serviceInfo.serviceType].type +
            "格式的文件",
        });
        this.$refs.upload.clearFiles();
        return false;
      }
      if (file.raw) {
        this.serviceInfo.file = file.raw;
      } else {
        this.serviceInfo.file = file;
      }
    },
    createService() {
      this.$emit("createService");
    },
    testConnect() {
      if (
        !this.serviceInfo.uri ||
        !this.serviceInfo.authDb ||
        !this.serviceInfo.dbName
      ) {
        this.$message({
          type: "warning",
          message: "请填写IP/端口、授权数据库、数据库信息",
        });
        return false;
      }
      this.$api.serverManageApi
        .testMongodbConnect(
          {
            uri: this.serviceInfo.uri,
            authDb: this.serviceInfo.authDb,
            dbName: this.serviceInfo.dbName,
            password: this.serviceInfo.password,
            username: this.serviceInfo.username,
          },
          {
            loadingText: "正在查询",
          }
        )
        .then(() => {
          this.$message({
            type: "success",
            message: "连接成功",
          });
        });
    },
    removeFile() {
      this.serviceInfo.file = null;
    },
    storeTypeChange(val) {
      if (val == "本地存储") {
        this.serviceInfo.uri = "";
        this.serviceInfo.authDb = "";
        this.serviceInfo.dbName = "";
        this.serviceInfo.password = "";
        this.serviceInfo.username = "";
      } else {
        this.serviceInfo.uri = "";
        this.serviceInfo.authDb = "admin";
        this.serviceInfo.dbName = "";
        this.serviceInfo.password = "";
        this.serviceInfo.username = "";
      }
    },
    resetServiceInfo() {
      this.serviceInfo.storeType = "本地存储";
      this.serviceInfo.uri = "";
      this.serviceInfo.authDb = "";
      this.serviceInfo.dbName = "";
      this.serviceInfo.password = "";
      this.serviceInfo.username = "";
      this.serviceInfo.isDefaultTheme = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.system-dialog {
  .dialog-title {
    border-bottom: 1px solid #ebeef5;
    padding-bottom: 20px;
    span {
      padding-bottom: 18px;
      box-shadow: #1890ff 0px 2px 0px;
    }
  }
  .dialog-body {
    border-bottom: 1px solid #ebeef5;
    .steps {
      background: #f6f7fb;
      height: 40px;
      border-radius: 0 4px 4px 0;
      margin-bottom: 20px;
      ul {
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 0;
        li {
          font-size: 14px;
          display: inline-block;
          height: 40px;
          line-height: 40px;
          padding: 0 10px 0 30px;
          color: #3691e9;
          position: relative;
          &::after {
            content: "";
            position: absolute;
            right: -20px;
            border-left: 20px solid #f6f7fb;
            border-top: 20px solid transparent;
            border-bottom: 20px solid transparent;
            z-index: 1;
          }
        }
        .is-active {
          background: #3691e9;
          color: #fff;
          &::after {
            border-left: 20px solid #3691e9;
          }
        }
      }
    }
    .first-step-form {
      padding: 0 2%;
    }
    .second-step-form {
      padding: 0 2%;
      .right-form-item {
        /deep/ .el-form-item__content {
          text-align: right;
        }
      }
    }
    .el-select {
      width: 100%;
    }
    /deep/ .el-divider--horizontal {
      margin-top: 30px;
    }
  }
  /deep/.el-dialog__body {
    border: none;
    padding: 10px 20px;
  }
}
</style>
