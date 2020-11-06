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
          <span>{{ dialogTitle }}</span>
        </div>
      </template>
      <!-- 步骤条 -->
      <div class="steps">
        <ul>
          <li
            v-for="(item, ix) in steps"
            :key="ix"
            :class="{ 'is-active': currentSteps.name == item.name }"
          >
            <i class="el-icon-portal-duihao" v-show="item.complete"></i>
            <span>{{ item.label }}</span>
          </li>
        </ul>
      </div>
      <el-row class="dialog-body" v-show="currentSteps.name == 'first'">
        <el-form
          :model="registerInfo"
          :rules="rules"
          ref="registerForm"
          :label-width="formLabelWidth"
        >
          <el-form-item :label="$t('myCenter.TheCategory')" prop="power">
            <el-select
              v-model="registerInfo.power"
              :placeholder="$t('myCenter.PleaseSelect')"
              ref="selectGroup"
              @change="changeSelect"
            >
              <el-option
                v-for="item in dropdownCategory"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceAddress') + ':'" prop="add">
            <el-input v-model="registerInfo.add"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.Proxyaddress') + ':'">
            <el-checkbox v-model="registerInfo.isReqProxyUrl">
              {{
              $t("management.Useproxyaddress")
              }}
            </el-checkbox>
          </el-form-item>
          <el-form-item
            :label="$t('management.Proxyname') + ':'"
            prop="proxyName"
            v-if="registerInfo.isReqProxyUrl"
            :rules="
              registerInfo.isReqProxyUrl
                ? rules.proxyName
                : [{ required: false }]
            "
          >
            <el-input
              v-model="registerInfo.proxyName"
              :placeholder="
                $t('management.Chinesecharactersorspecialsymbolsarenotallowed')
              "
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('myCenter.ProxyServerAddress') + ':'"
            prop="proxyUrl"
            v-if="registerInfo.isReqProxyUrl"
            :rules="
              registerInfo.isReqProxyUrl
                ? rules.proxyUrl
                : [{ required: false }]
            "
          >
            <el-select v-model="registerInfo.proxyUrl" :placeholder="$t('myCenter.PleaseSelect')">
              <el-option
                v-for="itemProxy in proxyServerList"
                :key="itemProxy.value"
                :label="itemProxy.label"
                :value="itemProxy.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- 关键字 -->
          <el-form-item :label="$t('service.label') + ':'" prop="keyWord" class="form-item-tag">
            <el-row class="key-word-tag">
              <el-col :span="19">
                <el-input
                  class="input-new-tag"
                  v-model="inputValue"
                  ref="saveTagInput"
                  @keyup.enter.native="handleInputConfirm"
                  @blur="handleInputConfirm"
                  type="text"
                  maxlength="15"
                  show-word-limit
                ></el-input>
              </el-col>
              <el-col :span="4">
                <el-button
                  type="primary"
                  class="base-btn"
                  @click="showInput"
                >+ {{ $t("management.Addlabels") }}</el-button>
              </el-col>
            </el-row>
            <el-row class="key-word-tag-box">
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                @close="handleCloseTag(tag)"
              >{{ tag }}</el-tag>
            </el-row>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceNames') + ':'" prop="name">
            <el-input v-model="registerInfo.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceDescription')" prop="describe">
            <el-input v-model="registerInfo.describe" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="dialog-body params-set" v-show="currentSteps.name == 'second'">
        <div class="request-method">
          <span>{{$t('myCenter.RequestSubmissionMethod') +''}}</span>
          <el-select
            v-model="paramsSetInfo.requestMethod"
            :placeholder="$t('myCenter.PleaseSelect')"
          >
            <el-option label="get" value="get"></el-option>
            <el-option label="post" value="post"></el-option>
            <el-option label="put" value="put"></el-option>
            <el-option label="delete" value="delete"></el-option>
            <el-option label="patch" value="patch"></el-option>
          </el-select>
        </div>
        <el-tabs v-model="paramsSetActive" type="card" @tab-click="paramsSetTabClick">
          <el-tab-pane :label="$t('myCenter.ParameterType')" name="params">
            <div class="tab-content">
              <div class="add-btn" @click="addParamsInfo">
                <span class="el-icon-circle-plus-outline btn-icon"></span>
                <span>{{$t('management.add')}}</span>
              </div>
              <el-form :model="paramsSetInfo" ref="paramsInfoForm">
                <el-table height="280" :data="paramsSetInfo.paramsInfoList">
                  <el-table-column
                    prop="name"
                    :label="$t('myCenter.ParameterName')"
                    min-width="20%"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'paramsInfoList.' + scope.$index + '.name'"
                        :rules="[
                          {
                            required: true,
                            message: $t('myCenter.PleaseInputParameterName'),
                            trigger: 'blur',
                          },
                        ]"
                      >
                        <el-input
                          v-model="scope.row.name"
                          :placeholder="$t('myCenter.PleaseInput')"
                        ></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="type"
                    :label="$t('myCenter.ParameterType')"
                    min-width="20%"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'paramsInfoList.' + scope.$index + '.type'"
                        :rules="[
                          {
                            required: true,
                            message: this.$t('myCenter.PleaseSelectParameterType'),
                            trigger: 'change',
                          },
                        ]"
                      >
                        <el-select
                          v-model="scope.row.type"
                          :placeholder="$t('myCenter.PleaseSelect')"
                        >
                          <el-option label="Number" value="Number"></el-option>
                          <el-option label="String" value="String"></el-option>
                          <el-option label="Boolean" value="Boolean"></el-option>
                          <el-option label="Object" value="Object"></el-option>
                          <el-option label="Array" value="Array"></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="required"
                    :label="$t('myCenter.Mandatory')"
                    min-width="20%"
                  >
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'paramsInfoList.' + scope.$index + '.required'"
                        :rules="[
                          {
                            required: true,
                            message: this.$t('myCenter.PleaseSelectWhetherIsMandatory'),
                            trigger: 'change',
                          },
                        ]"
                      >
                        <el-select
                          v-model="scope.row.required"
                          :placeholder="$t('myCenter.PleaseSelect')"
                        >
                          <el-option :label="$t('webAppBuilder.Yes')" :value="true"></el-option>
                          <el-option label="$t('webAppBuilder.No')" :value="false"></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="desc" :label="$t('myCenter.Description')" min-width="20%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.desc"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column :label="$t('myCenter.Operate')" min-width="20%">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        class="base-btn-del"
                        @click="deleteParamsInfo(scope.$index)"
                      >{{$t('management.delete')}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('myCenter.ErrorCode')" name="errorCode">
            <div class="tab-content">
              <div class="add-btn" @click="addErrorCode">
                <span class="el-icon-circle-plus-outline btn-icon"></span>
                <span>{{$t('management.add')}}</span>
              </div>
              <el-form :model="paramsSetInfo" ref="errorCodeForm">
                <el-table height="280" :data="paramsSetInfo.errorCodeList">
                  <el-table-column prop="code" :label="$t('myCenter.ErrorCode')" min-width="30%">
                    <template slot-scope="scope">
                      <el-form-item
                        :prop="'errorCodeList.' + scope.$index + '.code'"
                        :rules="[
                          {
                            required: true,
                            message: this.$t('myCenter.TheErrorCodeMustNotBeEmpty'),
                            trigger: 'blur',
                          },
                          {
                            pattern: /^\+?[1-9][0-9]*$/,
                            message: this.$t('myCenter.TheErrorCodeMustBeNoneZeroInteger'),
                            trigger: 'blur',
                          },
                        ]"
                      >
                        <el-input
                          v-model="scope.row.code"
                          :placeholder="$t('myCenter.PleaseInput')"
                        ></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="desc" :label="$t('myCenter.Description')" min-width="50%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.desc"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column min-width="20%" :label="$t('myCenter.Operate')">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        class="base-btn-del"
                        @click="deleteErrorCode(scope.$index)"
                      >{{$t('management.delete')}}</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('myCenter.ReturnResultExamples')" name="resultExample">
            <div class="tab-content">
              <el-input
                class="result-input"
                type="textarea"
                v-model="paramsSetInfo.resultExample"
                :rows="12"
              ></el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <personal-center-service-share
        v-show="currentSteps.name == 'third'"
        ref="sharedSubmissionFun"
        @permissionListDataBatchFun="permissionListDataBatchFun"
        :serviceName="this.registerInfo.name"
        :dialogVisible="dialogVisible"
        @personalCheckData="personalCheckData"
      ></personal-center-service-share>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="margin-top: 12px;"
          @click="backFun"
          v-show="currentSteps.name != 'first'"
        >{{ $t("myCenter.Back") }}</el-button>
        <el-button
          style="margin-top: 12px;"
          @click="beforeNextStep"
          v-show="currentSteps.name != 'third'"
        >{{ $t("myCenter.Next") }}</el-button>
        <el-button
          type="primary"
          class="base-btn"
          @click="save"
          v-show="currentSteps.name == 'third'"
        >{{ $t("management.ok") }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PersonalCenterServiceShare from "components/personalCenterService/PersonalCenterServiceShare";
export default {
  name: "PersonalFunctionServiceDialog",
  components: { PersonalCenterServiceShare },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("myCenter.RegisterServices");
      },
    },
    dropdownCategory: {
      type: Array,
      default: () => {
        return [];
      },
    },
    proxyServerList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    registerInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    formLabelWidth: {
      type: String,
      default: "130px",
    },
    nextShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    var checkFunctionName = (rule, value, callback) => {
      let rules = new this.formRules.baseValidateRule({
        errorMsg: this.$t("management.Errorinverifyingtheservicename"),
        value: value,
        callback: callback,
      });
      rules.execute([
        {
          name: "requiredFieldValidator",
          errorMsg: this.$t("myCenter.PleaseEnterTheServiceName"),
        },
        {
          name: "fieldLengthValidator",
          errorMsg: this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength: 50,
        },
      ]);
    };
    var checkFunctionDescribe = (rule, value, callback) => {
      let rules = new this.formRules.baseValidateRule({
        errorMsg: this.$t("management.Errorinverifyingtheservicedescription"),
        value: value,
        callback: callback,
      });
      rules.execute([
        {
          name: "fieldLengthValidator",
          errorMsg: this.$t("management.Theinputcharactersmustbelessthan80"),
          maxFieldLength: 80,
        },
      ]);
    };
    var validatePass = (rule, value, callback) => {
      var addVerification = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      if (!addVerification.test(value)) {
        callback(new Error(this.$t("myCenter.Errorsinserviceaddressformat")));
      } else {
        callback();
      }
    };
    var checkFunctionProxyName = (rule, value, callback) => {
      var addVerification = /^[A-Za-z0-9]+$/;
      if (!addVerification.test(value)) {
        callback(
          new Error(this.$t("management.Theformatoftheproxynameisincorrect"))
        );
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        power: "",
        add: "",
        name: "",
        describe: "",
        keyWord: "",
        proxyName: "",
        proxyUrl: "",
      },
      rules: {
        power: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectTheItsCategory"),
            trigger: "change",
          },
        ],
        add: [
          {
            required: true,
            message: this.$t("myCenter.PleaseEnterTheServiceAddress"),
            trigger: "blur",
          },
          { validator: validatePass, trigger: "blur" },
        ],
        name: [
          {
            required: true,
            trigger: "blur",
            validator: checkFunctionName,
          },
        ],
        describe: [
          {
            trigger: "blur",
            validator: checkFunctionDescribe,
          },
        ],
        proxyName: [
          {
            required: true,
            message: this.$t("management.Pleaseentertheproxyname"),
            trigger: "blur",
          },
          { validator: checkFunctionProxyName, trigger: "blur" },
        ],
        proxyUrl: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectAProxyServerURL"),
            trigger: "blur",
          },
        ],
      },
      permissionListData: [],
      scope: "Private",
      ywType: "functionService",
      sharingListData: false,
      deleteListUserData: [],
      inputValue: "",
      dynamicTags: [],
      steps: [
        {
          label: this.$t("myCenter.ServiceInformation"),
          complete: false,
          name: "first",
        },
        {
          label: this.$t("myCenter.ParameterSettings"),
          complete: false,
          name: "second",
        },
        {
          label: this.$t("myCenter.SharingSettings"),
          complete: false,
          name: "third",
        },
      ],
      currentSteps: {},
      paramsSetActive: "params",
      paramsSetInfo: {
        errorCodeList: [],
        paramsInfoList: [],
        resultExample: "",
        requestMethod: "get",
      },
    };
  },
  watch: {
    dynamicTags() {
      this.registerInfo.keyWord = this.dynamicTags.toString();
    },
    dialogVisible() {
      if (!this.dialogVisible) {
        this.$emit("backFun");
        this.$refs.sharedSubmissionFun.dataClearedFun();
        this.openDialog();
        this.$refs.registerForm.resetFields();
        this.dynamicTags = [];
      } else {
        this.resetSteps();
        this.resetParams();
      }
    },
    "registerInfo.keyWord"() {
      if (this.registerInfo.keyWord) {
        if (this.registerInfo.keyWord.length > 0) {
          this.dynamicTags = this.registerInfo.keyWord.split(",");
        }
      }
    },
    "registerInfo.isReqProxyUrl"() {
      if (!this.registerInfo.isReqProxyUrl) {
        this.registerInfo.proxyName = "";
        this.registerInfo.proxyUrl = "";
      } else {
        if (this.proxyServerList.length < 1) {
          this.$message({
            message: this.$t(
              "myCenter.ThereIsNoProxyServerAvailablePleaseRegisterAGeographicServerFirst"
            ),
            type: "warning",
          });
          this.registerInfo.isReqProxyUrl = false;
        } else {
          this.registerInfo.proxyUrl = this.proxyServerList[0].value;
        }
      }
    },
  },
  methods: {
    changeSelect(val) {
      this.registerInfo.power = val;
    },
    // 标签
    handleCloseTag(tag) {
      this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
    },
    showInput() {
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      var reg = /^[\s　]|[ ]$/gi;
      let inputValue = this.inputValue;
      if (
        inputValue &&
        inputValue.indexOf(",") == -1 &&
        inputValue.indexOf("，") == -1
      ) {
        if (this.dynamicTags.length >= 5) {
          this.$message({
            message: this.$t("management.Addfivelabelsatmost"),
            type: "warning",
          });
        } else if (this.dynamicTags.indexOf(inputValue) != -1) {
          this.$message({
            message: this.$t("management.Thelabelscannotberepeated"),
            type: "warning",
          });
        } else if (reg.test(inputValue)) {
          this.$message({
            message: this.$t(
              "management.Nospacesareallowedatthebeginningandtheendofthelabel"
            ),
            type: "warning",
          });
        } else {
          this.dynamicTags.push(inputValue);
        }
      }
      if (inputValue.indexOf(",") != -1 || inputValue.indexOf("，") != -1) {
        this.$message({
          message: this.$t("management.Nocommasareallowedinthelabel"),
          type: "warning",
        });
      }
      this.inputValue = "";
    },
    personalCheckData(val) {
      this.sharingListData = val;
    },
    beforeNextStep() {
      if (this.currentSteps.name == "first") {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            var addVerification = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
            if (!addVerification.test(this.registerInfo.add)) {
              this.textPrompts = this.$t("myCenter.Errorinserviceaddress");
            } else {
              this.$api.personalFunctionServiceApi
                .getServiceUrlOnly({
                  serviceUrl: this.registerInfo.add,
                  serviceType: this.registerInfo.power,
                })
                .then((res) => {
                  if (res.status == 200) {
                    if (res.data.data) {
                      this.nextStep();
                    } else {
                      this.$message({
                        message: this.$t(
                          "myCenter.Thecurrentserviceaddressalreadyexists"
                        ),
                        type: "error",
                      });
                    }
                  }
                })
                .catch(() => {});
            }
          } else {
            this.$message({
              message: this.$t("myCenter.Pleasecompletetheserivcesbasicinfo"),
              type: "warning",
            });
          }
        });
      }
      if (this.currentSteps.name == "second") {
        this.$refs.paramsInfoForm.validate((valid) => {
          if (valid) {
            this.$refs.errorCodeForm.validate((v) => {
              if (v) {
                this.nextStep();
              } else {
                this.paramsSetActive = "errorCode";
              }
            });
          } else {
            this.paramsSetActive = "params";
          }
        });
      }
      if (this.currentSteps.name == "third") {
        this.nextStep();
      }
    },
    //下一步
    nextStep() {
      let index = this.currentSteps.index;
      if (index + 1 < this.steps.length) {
        this.steps[index].complete = true;
        this.currentSteps = JSON.parse(JSON.stringify(this.steps[index + 1]));
        this.currentSteps.index = index + 1;
      }
    },
    // 上一步
    backFun() {
      // this.$emit("backFun");
      let index = this.currentSteps.index;
      this.steps[index].complete = false;
      this.steps[index - 1].complete = false;
      this.currentSteps = JSON.parse(JSON.stringify(this.steps[index - 1]));
      this.currentSteps.index = index - 1;
    },
    //弹窗关闭
    handleClose() {
      this.$emit("backFun");
      this.$emit("dialogClose");
    },
    paramsSetTabClick() {},
    addParamsInfo() {
      let info = {
        name: "",
        type: "",
        required: false,
        desc: "",
      };
      this.paramsSetInfo.paramsInfoList.push(info);
    },
    addErrorCode() {
      let info = {
        code: "",
        desc: "",
      };
      this.paramsSetInfo.errorCodeList.push(info);
    },
    deleteParamsInfo(ix) {
      this.paramsSetInfo.paramsInfoList.splice(ix, 1);
    },
    deleteErrorCode(ix) {
      this.paramsSetInfo.errorCodeList.splice(ix, 1);
    },
    //确定
    save() {
      this.$refs.sharedSubmissionFun.sharedSubmission({
        ywType: this.ywType,
        sourceId: null,
        messageResourceName: this.$t("service.functionServices"),
      });
      // 判断当前页面是否为空  弹框提示
      if (
        typeof this.sharingListData == "undefined" ||
        (this.sharingListData == false && this.permissionListData.length == 0)
      ) {
        this.$message({
          message: this.$t("myCenter.PleasetickSharepermission"),
          type: "warning",
        });
        return false;
      }
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.$emit("save", {
            power: this.registerInfo.power,
            scope: this.scope,
            permissionListData: this.permissionListData,
            deleteListUserData: null,
            paramsSetInfo: this.paramsSetInfo,
          });
        } else {
          return false;
        }
      });
    },
    //移除校验
    openDialog() {
      this.$refs.registerForm.clearValidate();
      this.$refs.paramsInfoForm.clearValidate();
      this.$refs.errorCodeForm.clearValidate();
    },
    //获取permissionListData数据
    permissionListDataBatchFun(val) {
      this.permissionListData = val.permissionListData;
      this.scope = val.scope;
    },
    resetSteps() {
      this.steps = [
        {
          label: this.$t("myCenter.ServiceInformation"),
          complete: false,
          name: "first",
        },
        {
          label: this.$t("myCenter.ParameterSettings"),
          complete: false,
          name: "second",
        },
        {
          label: this.$t("myCenter.SharingSettings"),
          complete: false,
          name: "third",
        },
      ];
      this.currentSteps = JSON.parse(JSON.stringify(this.steps[0]));
      this.currentSteps.index = 0;
    },
    resetParams() {
      this.paramsSetActive = "params";
      this.paramsSetInfo = {
        errorCodeList: [],
        paramsInfoList: [],
        resultExample: "",
        requestMethod: "get",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-body {
    @include manage-border(
      $types: (
        "bottom",
      )
    );
    .form-item-tag {
      margin-bottom: 10px;
      .key-word-tag-box {
        margin-top: 12px;
      }
      .key-word-tag {
        /deep/.el-button {
          position: absolute;
          right: 0;
        }
      }
    }
    /deep/.el-tag {
      margin-right: 10px;
    }
    /deep/.el-tag {
      @include base-active-color();
      .el-tag__close {
        @include base-active-color();
        &:hover {
          @include base-active-pagination();
        }
      }
    }
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
  /deep/ .el-cascader {
    width: 100%;
  }
  .el-form {
    padding: 0px 100px;
  }
  /deep/.el-select {
    width: 100%;
  }

  // 步骤条
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
        @include base-active-color();
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
        @include base-bg-font();
        &::after {
          @include base-active-underline($width: 20px, $types: left);
        }
      }
    }
  }
  // ul.navs {
  //   height: 40px;
  //   border-radius: 0px 4px 4px 0px;
  //   width: 100%;
  //   background-color: #f6f7fb;
  //   padding: 0;
  //   margin-top: 0;
  //   li {
  //     padding: 0px 10px 0 30px;
  //     line-height: 40px;
  //     display: inline-block;
  //     position: relative;
  //   }
  //   li:after {
  //     content: "";
  //     display: block;
  //     border-top: 20px solid #f6f7fb;
  //     border-bottom: 20px solid #f6f7fb;
  //     @include base-active-underline($width: 20px, $types: left);
  //     position: absolute;
  //     right: -20px;
  //     top: 0;
  //     z-index: 99;
  //   }
  //   li:before {
  //     content: "";
  //     display: block;
  //     border-top: 20px solid #f6f7fb;
  //     border-bottom: 20px solid #f6f7fb;
  //     border-bottom: 20px solid #f6f7fb;
  //     position: absolute;
  //     left: 140px;
  //     top: 0;
  //   }
  //   li:first-child {
  //     @include base-bg-font();
  //     border-radius: 4px 0 0 4px;
  //     color: #fff;
  //   }
  //   li:first-child:before {
  //     display: none;
  //   }
  //   li:last-child:after,
  //   .cssNavEnd:after {
  //     display: none;
  //   }
  //   li.active:first-child:after {
  //     @include base-active-underline($width: 20px, $types: top);
  //     @include base-active-underline($width: 20px, $types: bottom);
  //     border-left: 20px solid #f6f7fb;
  //   }
  //   li.active:first-child {
  //     @include base-active-color();
  //     background-color: #f6f7fb;
  //   }
  //   .el-icon-portal-duihao {
  //     padding-right: 4px;
  //   }
  //   li.active:after {
  //     border-left-color: #f6f7fb;
  //   }
  //   .navs-li {
  //     width: 102px;
  //     text-align: center;
  //     background-color: #f6f7fb;
  //     @include base-active-color();
  //   }
  //   .navs-li.active {
  //     @include base-bg-font();
  //   }
  //   .navs-li.active:before {
  //     @include base-active-underline($width: 20px, $types: left);
  //   }
  // }
  //参数设置
  .params-set {
    position: relative;
    .request-method {
      position: absolute;
      right: 0;
      top: -4px;
      z-index: 1;
      .el-select {
        width: 200px;
      }
    }
    .tab-content {
      height: 300px;
      position: relative;
      .el-form {
        padding: 0;
        /deep/ .el-form-item {
          margin: 0;
        }
      }
      /deep/ .el-table__row {
        td {
          padding: 0;
        }
        .cell {
          padding-top: 18px;
          padding-bottom: 18px;
        }
      }
      .result-input {
        margin-top: 10px;
      }
      .add-btn {
        @include base-active-color();
        cursor: pointer;
        position: absolute;
        top: 16px;
        right: 18px;
        z-index: 1;
        .btn-icon {
          margin-right: 6px;
        }
      }
      /deep/ .el-table__body-wrapper {
        height: 232px !important;
      }
    }
  }
}
</style>
