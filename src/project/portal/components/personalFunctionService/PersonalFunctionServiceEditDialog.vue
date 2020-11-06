<template>
  <div class="edit-dialog">
    <el-dialog
      :visible.sync="editDialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('management.EditService')}}</span>
        </div>
      </template>
      <div class="outline-share" v-if="!hiddenState">
        <i class="el-icon-warning"></i>
        <span>{{$t('management.Theresourceishidednow')}}</span>
      </div>
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
        <el-form :model="editInfo" :rules="rules" ref="editForm" :label-width="formLabelWidth">
          <!-- 所属分类 -->
          <el-form-item :label="$t('myCenter.TheCategory')" prop="power">
            <el-select
              v-model="editInfo.power"
              :placeholder="$t('myCenter.PleaseSelect')"
              ref="selectGroup"
              @change="changeSelect"
            >
              <el-option v-for="item in arr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceAddress')+':'" prop="serverAdd">
            <el-input v-model="editInfo.serverAdd" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.Proxyname')+':'" prop="proxyName">
            <el-input v-model="editInfo.proxyName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceAddress')+':'">
            <el-checkbox
              v-model="editInfo.isReqProxyUrl"
              :disabled="true"
            >{{$t('management.Useproxyaddress')}}</el-checkbox>
          </el-form-item>
          <!-- 关键字 -->
          <el-form-item :label="$t('service.label')+':'" prop="keyWord" class="form-item-tag">
            <el-row class="key-word-tag">
              <el-col :span="18">
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
          <el-form-item :label="$t('myCenter.ServiceNames')+':'" prop="name">
            <el-input v-model="editInfo.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceDescription')" prop="describe">
            <el-input v-model="editInfo.describe" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row class="dialog-body params-set" v-show="currentSteps.name == 'second'">
        <div class="request-method">
          <span>{{$t('myCenter.RequestSubmissionMethod') +'：'}}</span>
          <el-select v-model="editInfo.requestMethod" :placeholder="$t('myCenter.PleaseSelect')">
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
              <el-form :model="editInfo" ref="paramsInfoFormEdit">
                <el-table height="280" :data="editInfo.paramsInfoList">
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
                            message:  $t('myCenter.PleaseInputParameterName'),
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
                          <el-option label="是" :value="true"></el-option>
                          <el-option label="否" :value="false"></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="desc" :label="$t('myCenter.Description')" min-width="20%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.desc"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        class="base-btn-del"
                        @click="deleteParamsInfo(scope.$index)"
                      >{{$t(management.delete)}}</el-button>
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
              <el-form :model="editInfo" ref="errorCodeFormEdit">
                <el-table height="280" :data="editInfo.errorCodeList">
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
                  <el-table-column min-width="20%" label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        class="base-btn-del"
                        @click="deleteErrorCode(scope.$index)"
                      >{{$t(management.delete)}}</el-button>
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
                v-model="editInfo.resultExample"
                :rows="12"
              ></el-input>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-row>
      <!-- 缩略图 -->
      <el-row v-if="currentSteps.name == 'third'" class="dialog-body-secondary">
        <upload-clipping-next
          ref="dialogUpload"
          @UploadBlackFun="UploadBlackFun"
          :dialogTitleUpload="dialogTitleUpload"
          :autoCropWidth="autoCropWidth"
          :autoCropHeight="autoCropHeight"
          :fileRule="fileRule"
          :recommendShow="true"
          :unifiedMark="unifiedMark"
        ></upload-clipping-next>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="margin-top: 12px;"
          @click="backFun"
          v-show="currentSteps.name != 'first'"
        >{{$t('myCenter.Back')}}</el-button>
        <el-button
          style="margin-top: 12px;"
          @click="beforeNextStep"
          v-show="currentSteps.name != 'third'"
        >{{$t('myCenter.Next')}}</el-button>
        <el-button
          type="primary"
          class="base-btn"
          @click="saveEdit"
          v-show="currentSteps.name == 'third'"
        >{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UploadClippingNext from "components/common/uploadClipping/UploadClippingNext";
export default {
  name: "PersonalFunctionServiceEditDialog",
  components: {
    UploadClippingNext,
  },
  props: {
    editDialogVisible: {
      type: Boolean,
      default: false,
    },
    editInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    arr: {
      type: Array,
      default: () => {
        return [];
      },
    },
    formLabelWidth: {
      type: String,
      default: "120px",
    },
    resourceData: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    var checkFunctionEditName = (rule, value, callback) => {
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
    var checkFunctionEditDescribe = (rule, value, callback) => {
      if (value == null) {
        value = "";
      }
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
    return {
      ruleForm: {
        power: "",
        type: "",
        serverAdd: "",
        name: "",
        describe: "",
        thumbnail: "",
        keyWord: "",
        proxyName: "",
      },
      rules: {
        power: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectTheItsCategory"),
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            trigger: "blur",
            validator: checkFunctionEditName,
          },
        ],
        describe: [
          {
            trigger: "blur",
            validator: checkFunctionEditDescribe,
          },
        ],
      },
      fileRule: this.$t("service.OnlyJPGPNGFilesUploadedSizeLess1MB") + "1MB",
      autoCropWidth: 236,
      autoCropHeight: 165,
      dialogTitleUpload: this.$t("service.AddThumbnail"),
      thumbnailShow: false, //默认缩略图不显示
      pageNumber: 1, //记录第几页（共2页）
      serviceImg: "",
      unifiedMark: "function", //缩略图推荐缩略图标识
      inputValue: "",
      dynamicTags: [],
      hiddenState: true, //是否为隐藏状态
      steps: [
        {
          label: this.$t("myCenter.ServiceInformation"),
          complete: false,
          name: "first",
        },
        {
          label: "参数设置",
          complete: false,
          name: "second",
        },
        {
          label: this.$t("management.CustomizeThumbnail"),
          complete: false,
          name: "third",
        },
      ],
      currentSteps: {},
      paramsSetActive: "params",
    };
  },
  watch: {
    dynamicTags() {
      this.editInfo.keyWord = this.dynamicTags.toString();
    },
    editDialogVisible() {
      if (!this.editDialogVisible) {
        this.serviceImg = "";
        this.pageNumber = 1;
        this.thumbnailShow = false;
        this.dynamicTags = [];
        //  this.$nextTick(()=>{
        // this.$refs.editForm.clearValidate();
        // })
      } else {
        if (
          this.resourceData.fileStatus == false ||
          this.resourceData.fileStatus == 0
        ) {
          this.hiddenState = false;
        } else if (
          this.resourceData.serviceStatus == false ||
          this.resourceData.serviceStatus == 0
        ) {
          this.hiddenState = false;
        } else {
          this.hiddenState = true;
        }
        this.resetSteps();
        this.resetParams();
      }
    },
    "editInfo.keyWord"() {
      if (this.editInfo.keyWord && this.editDialogVisible) {
        if (this.editInfo.keyWord.length > 0) {
          this.dynamicTags = this.editInfo.keyWord.split(",");
        }
      }
    },
    arr() {
      if (this.arr.length != 0) {
        this.arr.forEach((item) => {
          if (item.children) {
            item.children.forEach((ic) => {
              if (ic.id == this.resourceData.serviceClassify) {
                this.editInfo.power = ic.id;
                return false;
              }
            });
          } else {
            if (item.id == this.resourceData.serviceClassify) {
              this.editInfo.power = item.id;
              return false;
            }
          }
        });
      }
    },
  },
  methods: {
    changeSelect(val) {
      this.editInfo.power = val;
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
    handleClose() {
      this.$refs.editForm.clearValidate();
      this.$refs.paramsInfoFormEdit.clearValidate();
      this.$refs.errorCodeFormEdit.clearValidate();
      this.$emit("editDialogClose");
    },
    //上传返回值
    UploadBlackFun(val) {
      if (val.recommendation) {
        this.serviceImg = val.uploadrUrl;
      } else {
        this.serviceImg = `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
      }
      this.saveFunctionServices();
    },
    beforeNextStep() {
      if (this.currentSteps.name == "first") {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            this.nextStep();
          }
        });
      }
      if (this.currentSteps.name == "second") {
        this.$refs.paramsInfoFormEdit.validate((valid) => {
          if (valid) {
            this.$refs.errorCodeFormEdit.validate((v) => {
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
    // 下一步
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
      let index = this.currentSteps.index;
      this.steps[index].complete = false;
      this.steps[index - 1].complete = false;
      this.currentSteps = JSON.parse(JSON.stringify(this.steps[index - 1]));
      this.currentSteps.index = index - 1;
    },
    paramsSetTabClick() {},
    addParamsInfo() {
      let info = {
        name: "",
        type: "",
        required: false,
        desc: "",
      };
      this.editInfo.paramsInfoList.push(info);
    },
    addErrorCode() {
      let info = {
        code: "",
        desc: "",
      };
      this.editInfo.errorCodeList.push(info);
    },
    deleteParamsInfo(ix) {
      this.editInfo.paramsInfoList.splice(ix, 1);
    },
    deleteErrorCode(ix) {
      this.editInfo.errorCodeList.splice(ix, 1);
    },
    saveEdit() {
      this.$refs.dialogUpload.getImgUrl();
    },
    saveFunctionServices() {
      this.$api.personalFunctionServiceApi
        .saveFunctionServices({
          id: this.resourceData.id,
          name: this.editInfo.name,
          serviceClassify: this.editInfo.power,
          serviceScope: this.resourceData.scope,
          serviceImg: this.serviceImg,
          serviceUrl: this.editInfo.serverAdd,
          serviceComments: this.editInfo.describe,
          keyWord: this.editInfo.keyWord,
          isReqProxyUrl: this.editInfo.isReqProxyUrl,
          personnelId: this.resourceData.personnelId,
          errorCodeList: JSON.stringify(this.editInfo.errorCodeList),
          paramsInfoList: JSON.stringify(this.editInfo.paramsInfoList),
          resultExample: this.editInfo.resultExample,
          requestMethod: this.editInfo.requestMethod,
        })
        .then((res) => {
          if (res.data.status == 200) {
            this.$emit("editDialogClose");
            this.$emit("getserviceListByMe");
            this.$message({
              message: this.$t("management.EditedSuccessfully"),
              type: "success",
            });
          }
        });
    },
    resetSteps() {
      this.steps = [
        {
          label: this.$t("myCenter.ServiceInformation"),
          complete: false,
          name: "first",
        },
        {
          label: "参数设置",
          complete: false,
          name: "second",
        },
        {
          label: this.$t("management.CustomizeThumbnail"),
          complete: false,
          name: "third",
        },
      ];
      this.currentSteps = JSON.parse(JSON.stringify(this.steps[0]));
      this.currentSteps.index = 0;
    },
    resetParams() {
      this.paramsSetActive = "params";
    },
  },
};
</script>

<style lang="scss" scoped>
.edit-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .outline-share {
    top: 20px;
    left: 128px;
    position: absolute;
    i {
      color: #e6a23c;
    }
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
  // .navs {
  //   height: 40px;
  //   border-radius: 4px 0 0 4px;
  //   width: 100%;
  //   background-color: #f6f7fb;
  //   padding: 0;
  //   margin-top: 0;
  // }
  // .navs li {
  //   padding: 0px 10px 0 30px;
  //   line-height: 40px;
  //   background: #f6f7fb;
  //   display: inline-block;
  //   @include base-active-color();
  //   position: relative;
  // }

  // .navs li:after {
  //   content: "";
  //   display: block;
  //   border-top: 20px solid #f6f7fb;
  //   border-bottom: 20px solid #f6f7fb;
  //   border-left: 20px solid #fff;
  //   position: absolute;
  //   right: -20px;
  //   top: 0;
  // }

  // .navs li:after {
  //   content: "";
  //   display: block;
  //   border-top: 20px solid transparent;
  //   border-bottom: 20px solid transparent;
  //   border-left: 20px solid #f6f7fb;
  //   position: absolute;
  //   right: -20px;
  //   top: 0;
  //   z-index: 10;
  // }

  // .navs li:before {
  //   content: "";
  //   display: block;
  //   border-top: 20px solid #f6f7fb;
  //   border-bottom: 20px solid #f6f7fb;
  //   border-left: 20px solid #fff;
  //   position: absolute;
  //   left: 0px;
  //   top: 0;
  // }

  // .navs li:first-child {
  //   border-radius: 4px 0 0 4px;
  //   padding-left: 25px;
  // }
  // .navs li:first-child:before {
  //   display: none;
  // }

  // .navs li.active {
  //   @include base-bg-font();
  // }

  // .navs li.active:after {
  //   @include base-active-underline($width: 20px, $types: left);
  // }
  // .navs li.active:before {
  //   content: "";
  //   display: block;
  //   @include base-active-underline($width: 20px, $types: top);
  //   @include base-active-underline($width: 20px, $types: bottom);
  //   border-left: 20px solid #fff;
  //   position: absolute;
  //   left: 0px;
  //   top: 0;
  // }
  // .navs li:first-child.active:before {
  //   display: none;
  // }
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
  .el-form {
    padding: 0px 50px 0 0;
  }
  /deep/.el-select {
    width: 100%;
  }
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
  .dialog-body-secondary {
    width: 720px;
    margin: auto;
  }
}
</style>