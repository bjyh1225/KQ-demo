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
          <span>{{dialogTitle}}</span>
        </div>
      </template>
      <!-- 步骤条 -->
      <ul class="navs">
        <li :class="nextShow?'active':''">
          <i class="el-icon-portal-duihao" v-show="nextShow"></i>
          <span>{{$t('myCenter.ServiceInformation')}}</span>
        </li>
        <li class="navs-li" :class="nextShow?'active':''">
          <i class="el-icon-portal-duihao" v-show="false"></i>
          <span>{{$t('myCenter.SharingSettings')}}</span>
        </li>
      </ul>
      <!-- 服务基本信息 -->
      <el-row class="dialog-body" v-show="!nextShow">
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
              <el-option v-for="item in arr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceType')" prop="type">
            <el-select
              v-model="registerInfo.type"
              :placeholder="$t('myCenter.PleaseSelect')"
              @change="optionChange"
            >
              <el-option :label="$t('myCenter.KQGISService')" value="kqmapping"></el-option>
              <el-option :label="$t('myCenter.ArcGISService')" value="arcmapping"></el-option>
              <el-option :label="$t('myCenter.OGCWMSService')" value="WMS"></el-option>
              <el-option :label="$t('myCenter.OGCWMTSService')" value="WMTS"></el-option>
              <el-option :label="$t('management.OGCWFSservice')" value="WFS"></el-option>
              <el-option :label="$t('management.OGCWCSservice')" value="WCS"></el-option>
              <el-option :label="$t('management.OGCWPSservice')" value="WPS"></el-option>
              <el-option :label="$t('myCenter.BigDataServices')" value="bigData"></el-option>
              <el-option :label="$t('management.Otherservices')" value="OTHER"></el-option>
            </el-select>
          </el-form-item>
          <!-- 关键字 -->
          <el-form-item :label="$t('service.label')+':'" prop="keyWord" class="form-item-tag">
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
                >+ {{$t('management.Addlabels')}}</el-button>
              </el-col>
            </el-row>
            <el-row class="key-word-tag-box">
              <el-tag
                :key="tag"
                v-for="tag in dynamicTags"
                closable
                @close="handleCloseTag(tag)"
              >{{tag}}</el-tag>
            </el-row>
          </el-form-item>
          <el-form-item
            :label="$t('myCenter.ServiceAddress')+':'"
            prop="add"
            v-if="registerInfo.type!='kqmapping'"
          >
            <el-input
              v-model="registerInfo.add"
              @blur="animateWidth"
              :placeholder="registerInfo.type=='WMS'?`${$t('management.Inputformat')}：http://IP+${$t('management.Port')}/KQGis/rest/services/${$t('myCenter.ServiceName')}/MapServer/WMS`:registerInfo.type=='WMTS'?`${$t('management.Inputformat')}：http://IP+${$t('management.Port')}/KQGis/rest/services/${$t('myCenter.ServiceName')}/MapServer/WMTS`:registerInfo.type=='bigData'?`${$t('management.Inputformat')}：http://ip+${$t('management.Port')}/kqcloudserver/${$t('myCenter.ServiceName')}/wms?layers=${$t('management.Layername')}`:''"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('management.Proxyaddress')+':'"
            v-if="registerInfo.type!='kqmapping'"
          >
            <el-checkbox v-model="registerInfo.isReqProxyUrl">{{$t('management.Useproxyaddress')}}</el-checkbox>
          </el-form-item>
          <el-form-item
            :label="$t('management.Proxyname')+':'"
            prop="proxyName"
            v-if="registerInfo.isReqProxyUrl"
            :rules="registerInfo.isReqProxyUrl? rules.proxyName : [{required: false}]"
          >
            <el-input
              v-model="registerInfo.proxyName"
              :placeholder="$t('management.Chinesecharactersorspecialsymbolsarenotallowed')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('myCenter.ProxyServerAddress')+':'"
            prop="proxyUrl"
            v-if="registerInfo.isReqProxyUrl"
            :rules="registerInfo.isReqProxyUrl? rules.proxyUrl : [{required: false}]"
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
          <el-form-item
            :label="$t('myCenter.ServiceAddress')+':'"
            prop="serverAdd"
            v-if="registerInfo.type=='kqmapping'"
          >
            <el-row>
              <el-col :span="8">
                <el-select
                  v-model="registerInfo.serverUrl"
                  :placeholder="'http(s)://[ip]:[port]'"
                  @change="changeOption"
                  :disabled="registerInfo.type?false:true"
                  allow-create
                  filterable
                >
                  <el-option
                    v-for="list in serverArr"
                    :key="list.C_ID"
                    :label="list.C_SERVER_HTTP+'://'+list.C_SERVER_IP+':'+list.C_SERVER_PORTNUMBER"
                    :value="{value:list.C_SERVER_HTTP+'://'+list.C_SERVER_IP+':'+list.C_SERVER_PORTNUMBER,id:list.C_ID}"
                  ></el-option>
                </el-select>
              </el-col>
              <el-col
                class="line"
                :span="!(registerInfo.splicingUrl!=''&&springcloud==1)?5:15"
              >{{registerInfo.splicingUrl==''||springcloud==0?'':'/'+proxyMicro+'-proxy'}}/{{registerInfo.type=='arcmapping'?'arcgis':'KQGis'}}/rest/services/</el-col>
              <el-col :span="8" v-show="!(registerInfo.splicingUrl!=''&&springcloud==1)">
                <el-select
                  v-model="registerInfo.splicingUrl"
                  :placeholder="$t('myCenter.PleaseSelect')"
                  :disabled="splicingDisabled"
                >
                  <el-option v-for="(item,i) in splicingArr" :key="i" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
              <el-col
                class="line"
                :span="3"
                v-show="!(registerInfo.splicingUrl!=''&&springcloud==1)"
              >/MapServer</el-col>
            </el-row>
            <el-row class="splicing-url" v-show="registerInfo.splicingUrl!=''&&springcloud==1">
              <el-col :span="8">
                <el-select
                  v-model="registerInfo.splicingUrl"
                  :placeholder="$t('myCenter.PleaseSelect')"
                  :disabled="splicingDisabled"
                >
                  <el-option v-for="(item,i) in splicingArr" :key="i" :label="item" :value="item"></el-option>
                </el-select>
              </el-col>
              <el-col class="line" :span="16">/MapServer</el-col>
            </el-row>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceNames')+':'" prop="name">
            <el-input v-model="registerInfo.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceDescription')" prop="describe">
            <el-input v-model="registerInfo.describe" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <personal-center-service-share
        v-show="nextShow"
        ref="sharedSubmissionFun"
        @permissionListDataFun="permissionListDataFun"
        :dialogVisible="dialogVisible"
        @personalCheckData="personalCheckData"
      ></personal-center-service-share>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="margin-top: 12px;"
          @click="nextStep"
          v-show="!nextShow"
        >{{$t('myCenter.Next')}}</el-button>
        <el-button
          style="margin-top: 12px;"
          @click="backFun"
          v-show="nextShow"
        >{{$t('myCenter.Back')}}</el-button>
        <el-button
          type="primary"
          class="base-btn"
          @click="save"
          v-show="nextShow"
        >{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import PersonalCenterServiceShare from "components/personalCenterService/PersonalCenterServiceShare";
export default {
  name: "PersonalCenterServiceDialog",
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
    arr: {
      type: Array,
      default: () => {
        return [];
      },
    },
    serverArr: {
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
    proxyServerList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    var checkMapServiceName = (rule, value, callback) => {
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
    var checkMapServiceDescribe = (rule, value, callback) => {
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
    var checkMapProxyName = (rule, value, callback) => {
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
        type: "",
        add: "",
        name: "",
        serverAdd: "",
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
        type: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectTheServiceType"),
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
            validator: checkMapServiceName,
          },
        ],
        describe: [
          {
            trigger: "blur",
            validator: checkMapServiceDescribe,
          },
        ],
        proxyName: [
          {
            required: true,
            message: this.$t("management.Pleaseentertheproxyname"),
            trigger: "blur",
          },
          { validator: checkMapProxyName, trigger: "blur" },
        ],
        proxyUrl: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectAProxyServerURL"),
            trigger: "blur",
          },
        ],
      },
      active: 0,
      permissionListData: [],
      scope: "Private",
      ywType: "mapService",
      flag: false,
      flagErrorTixt: "",
      sharingListData: false,
      splicingArr: [], //通过选择服务器获取的地址
      splicingDisabled: true, //地址下拉框默认禁用
      inputValue: "",
      dynamicTags: [],
      springcloud: 0, //是否是微服务
      proxyMicro: "", //微服务添加的服务名
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
        // this.$nextTick(() => {
        // this.$refs.registerForm.resetFields();
        // });
        this.splicingArr = [];
        this.splicingDisabled = true;
        this.dynamicTags = [];
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
    "registerInfo.splicingUrl"() {
      if (this.springcloud != 0 && this.registerInfo.splicingUrl) {
        this.proxyMicro = this.registerInfo.splicingUrl.replace(/\./g, "-");
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
    // 分类下拉框选中值变化
    optionChange() {
      this.registerInfo.serverUrl = "";
      this.registerInfo.splicingUrl = "";
      this.splicingArr = [];
      this.splicingDisabled = true;
    },
    //服务器下拉选中
    changeOption(val) {
      this.optionChange();
      var ip_ip = "(25[0-5]|2[0-4]\\d|1\\d\\d|\\d\\d|\\d)";
      var ip_http = "(http|https)://";
      var ip_ipdot = ip_ip + "\\.";
      var ip_port = "(:(\\d\\d\\d\\d|\\d\\d\\d|\\d\\d|\\d))?";
      var isIPaddress = new RegExp(
        "^" + ip_http + ip_ipdot + ip_ipdot + ip_ipdot + ip_ip + ip_port + "$"
      );
      if (!val.value) {
        if (!isIPaddress.test(val)) {
          this.$message({
            message: this.$t("myCenter.ImportFormatIsIncorrect"),
            type: "warning",
          });
          return false;
        }
        this.springcloud = 0;
        this.registerInfo.serverUrl = val;
      } else {
        this.serverArr.forEach((item) => {
          if (item.C_ID == val.id) {
            this.springcloud = item.C_SPRINGCLOUD;
          }
        });
        this.registerInfo.serverUrl = val.value;
      }
      this.$api.personalCenterServiceApi
        .getStartServiceList(
          {
            serviceType: this.registerInfo.type,
            serviceUrlIp: this.registerInfo.serverUrl,
            isReqCloud: this.springcloud == 0 ? false : true,
          },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          this.splicingArr = res.data.data;
          this.splicingDisabled = false;
        })
        .catch(() => {});
    },
    //服务地址验证
    animateWidth() {
      var serviceUrlName = "";
      var serviceUrlIpData = "";
      if (this.registerInfo.add) {
        serviceUrlName = "";
        serviceUrlIpData = this.registerInfo.add;
      } else {
        serviceUrlIpData = this.registerInfo.serverUrl;
        serviceUrlName = this.registerInfo.splicingUrl;
      }
      if (this.registerInfo.add != null && this.registerInfo.add.length != 0) {
        this.$api.personalCenterServiceApi
          .getTypeAllListOnly({
            serviceUrlIp: serviceUrlIpData,
            serviceUrlName: serviceUrlName,
            serviceType: this.registerInfo.type,
            isReqCloud: this.springcloud == 0 ? false : true,
          })
          .then((res) => {
            if (res.status == 200) {
              if (res.data.data) {
                this.flag = true;
              } else {
                this.$message({
                  message: this.$t(
                    "myCenter.Thecurrentserviceaddressalreadyexists"
                  ),
                  type: "error",
                });
                this.flag = false;
                this.flagErrorTixt = this.$t(
                  "myCenter.Thecurrentserviceaddressalreadyexists"
                );
              }
            }
          })
          .catch((error) => {
            this.flagErrorTixt = error.data.title;
          });
      }
    },
    //下一步
    nextStep() {
      if (this.registerInfo.add) {
        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            if (this.flag) {
              this.$emit("nextStep");
              this.flag = false;
            } else {
              this.$message({
                message: this.flagErrorTixt,
                type: "error",
              });
              return false;
            }
          } else {
            this.$message({
              message: this.$t("myCenter.Pleasecompletetheserivcesbasicinfo"),
              type: "warning",
            });
          }
        });
      } else {
        if (
          this.registerInfo.splicingUrl == "" ||
          this.registerInfo.serverUrl == ""
        ) {
          this.$message({
            message: this.$t("management.PleaseEnterTheCompleteServiceUrl"),
            type: "warning",
          });
        } else {
          this.$refs.registerForm.validate((valid) => {
            if (valid) {
              this.$emit("nextStep");
              this.flag = false;
            } else {
              this.$message({
                message: this.$t("myCenter.Pleasecompletetheserivcesbasicinfo"),
                type: "warning",
              });
            }
          });
        }
      }
    },
    // 上一步
    backFun() {
      this.flag = true;
      this.$emit("backFun");
    },
    //弹窗关闭
    handleClose() {
      this.$emit("backFun");
      this.$emit("dialogClose");
    },
    //确定
    save() {
      this.$refs.sharedSubmissionFun.sharedSubmission({
        ywType: this.ywType,
        sourceId: null,
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
      // var serviceSplicingUrl = "";
      // if (this.registerInfo.type == "arcmapping") {
      //   serviceSplicingUrl =
      //     this.registerInfo.serverUrl +
      //     "/arcgis/rest/services/" +
      //     this.registerInfo.splicingUrl +
      //     "/MapServer";
      // } else if (this.registerInfo.type == "kqmapping") {
      //   serviceSplicingUrl =
      //     this.registerInfo.serverUrl +
      //     "/KQGis/rest/services/" +
      //     this.registerInfo.splicingUrl +
      //     "/MapServer";
      // } else {
      //   serviceSplicingUrl = this.registerInfo.add;
      // }
      var serviceUrlName = "";
      var serviceUrlIpData = "";
      if (this.registerInfo.add) {
        serviceUrlName = "";
        serviceUrlIpData = this.registerInfo.add;
      } else {
        serviceUrlIpData = this.registerInfo.serverUrl;
        serviceUrlName = this.registerInfo.splicingUrl;
      }
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.$emit("save", {
            power: this.registerInfo.power,
            type: this.registerInfo.type,
            serviceUrlIp: serviceUrlIpData,
            serviceUrlName: serviceUrlName,
            scope: this.scope,
            permissionListData: this.permissionListData,
            isReqCloud:
              this.registerInfo.type == "kqmapping"
                ? this.springcloud == 0
                  ? false
                  : true
                : this.registerInfo.isReqProxyUrl,
            proxyUrl: this.registerInfo.proxyUrl,
            proxyName: this.registerInfo.proxyName,
          });
        } else {
          return false;
        }
      });
    },
    //移除校验
    openDialog() {
      this.$refs.registerForm.clearValidate();
    },
    //获取permissionListData数据
    permissionListDataFun(val) {
      this.permissionListData = val.permissionListData;
      this.scope = val.scope;
    },
  },
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
        "bottom",
      )
    );
    .splicing-url.el-row {
      margin-top: 20px;
    }
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
  // 步骤条
  ul.navs {
    height: 40px;
    border-radius: 0px 4px 4px 0px;
    width: 100%;
    background-color: #f6f7fb;
    padding: 0;
    margin-top: 0;
    li {
      padding: 0px 10px 0 30px;
      line-height: 40px;
      display: inline-block;

      position: relative;
    }
    li:after {
      content: "";
      display: block;
      border-top: 20px solid #f6f7fb;
      border-bottom: 20px solid #f6f7fb;
      @include base-active-underline($width: 20px, $types: left);
      position: absolute;
      right: -20px;
      top: 0;
      z-index: 99;
    }
    li:before {
      content: "";
      display: block;
      border-top: 20px solid #f6f7fb;
      border-bottom: 20px solid #f6f7fb;
      border-bottom: 20px solid #f6f7fb;
      position: absolute;
      left: 140px;
      top: 0;
    }
    li:first-child {
      @include base-bg-font();
      border-radius: 4px 0 0 4px;
      color: #fff;
    }
    li:first-child:before {
      display: none;
    }
    li:last-child:after,
    .cssNavEnd:after {
      display: none;
    }
    li.active:first-child:after {
      @include base-active-underline($width: 20px, $types: top);
      @include base-active-underline($width: 20px, $types: bottom);
      border-left: 20px solid #f6f7fb;
    }
    li.active:first-child {
      @include base-active-color();
      background-color: #f6f7fb;
    }
    .el-icon-portal-duihao {
      padding-right: 4px;
    }
    li.active:after {
      border-left-color: #f6f7fb;
    }
    .navs-li {
      width: 102px;
      text-align: center;
      background-color: #f6f7fb;
      @include base-active-color();
    }
    .navs-li.active {
      @include base-bg-font();
    }
    .navs-li.active:before {
      @include base-active-underline($width: 20px, $types: left);
    }
  }
  /deep/ .el-cascader {
    width: 100%;
  }
  .el-form {
    padding: 0px 90px;
  }
  /deep/.el-select {
    width: 100%;
  }
}
</style>