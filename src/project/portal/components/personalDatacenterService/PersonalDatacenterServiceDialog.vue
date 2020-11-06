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
          <span>{{$t('management.Basicinfoofdata')}}</span>
        </li>
        <li class="navs-li" :class="nextShow?'active':''">
          <i class="el-icon-portal-duihao" v-show="false"></i>
          <span>{{$t('myCenter.SharingSettings')}}</span>
        </li>
      </ul>
      <el-row class="dialog-body" v-show="!nextShow">
        <el-form
          :model="registerInfo"
          :rules="rules"
          ref="registerForm"
          :label-width="formLabelWidth"
        >
          <el-form-item :label="$t('myCenter.TheCategory')" prop="power">
            <el-select v-model="registerInfo.power" :placeholder="$t('myCenter.PleaseSelect')" ref='selectGroup' @change='changeSelect'>
                <el-option
                  v-for="item in dropdownCategory"
                  :key="item.id"
                  :label="item.typeName"
                  :value="item.id"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('management.Uploaddata')+':'" prop="upload" class="upload-data">
            <el-row class="upload-form">
              <el-col :span="15">
                <el-form ref="uploadForm" label-width="70px" :model="formUploadAlign">
                  <el-form-item :label="$t('management.Datatype')">
                    <el-select
                      v-model="formUploadAlign.type"
                      :placeholder="$t('management.Pleaseselectthedatatype')"
                      @change="formUploadtTypeChange"
                    >
                      <el-option
                        :label="$t('management.Shapefiledata')"
                        value="zip"
                      >{{$t('management.Shapefiledata')}}</el-option>
                      <el-option
                        :label="$t('management.GeoJSONdata')"
                        value="geojson"
                      >{{$t('management.GeoJSONdata')}}</el-option>
                      <el-option
                        :label="$t('management.Exceldata')"
                        value="xls,xlsx"
                      >{{$t('management.Exceldata')}}</el-option>
                      <el-option
                        :label="$t('management.CSVdata')"
                        value="csv"
                      >{{$t('management.CSVdata')}}</el-option>
                      <!-- <el-option label="其他数据" value="*.zip">其他数据</el-option> -->
                    </el-select>
                  </el-form-item>
                  <el-form-item :label="$t('management.Datafile')">
                    <el-button
                      style="width: 100%"
                      @click="formUploadBtn"
                      id="browseupload"
                    >{{$t('management.Selectfile')}}</el-button>
                  </el-form-item>
                </el-form>
                <el-row class="from-progress" v-show="filesId!=''">
                  <el-col :span="4" class="progress-filename">
                    <el-tooltip :content="fileUploadName" placement="bottom" effect="light">
                      <span>{{fileUploadName}}</span>
                    </el-tooltip>
                  </el-col>
                  <el-col :span="20" v-show="uploadSuccess=='3'" class="progress-success">
                    <i class="el-icon-portal-duihao1"></i>
                    {{$t('management.Uploadedsuccessfully')}}
                  </el-col>
                  <el-col :span="18" v-show="uploadSuccess!='3'">
                    <el-progress
                      :text-inside="true"
                      :stroke-width="16"
                      :percentage="percentage"
                      style="width: 100%"
                    ></el-progress>
                  </el-col>
                  <el-col :span="2" v-show="uploadSuccess!='3'">
                    <el-tooltip
                      :content="$t('management.delete')"
                      placement="bottom"
                      effect="light"
                      @click.native="closeUpload"
                    >
                      <i class="el-icon-close"></i>
                    </el-tooltip>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="1" class="center-box"></el-col>
              <el-col :span="8" class="right-box">
                <div v-show="formUploadAlign.type=='zip'" class="right-box-div-shp">
                  <span>{{$t('management.PleaseuploadsingleShapefiledatacompressedinZIP')}}</span>
                  <img src="~img/shp.jpg" alt />
                </div>
                <div v-show="formUploadAlign.type=='geojson'" class="right-box-div">
                  <img src="~img/geojson.jpg" alt />
                </div>
                <div v-show="formUploadAlign.type=='xls,xlsx'" class="right-box-div">
                  <img src="~img/xlsx.jpg" alt />
                </div>
                <div v-show="formUploadAlign.type=='csv'" class="right-box-div">
                  <img src="~img/csv.png" alt />
                </div>
                <!-- <div class="text">{{formUploadAlign.type}}</div> -->
              </el-col>
            </el-row>
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
          <el-form-item :label="$t('management.Dataname')+':'" prop="name">
            <el-input v-model="registerInfo.name"></el-input>
          </el-form-item>
          <el-form-item :label="$t('management.Datadescription')+':'" prop="describe">
            <el-input v-model="registerInfo.describe" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <personal-center-service-share
        v-show="nextShow"
        ref="sharedSubmissionFun"
        @permissionListDataBatchFun="permissionListDataBatchFun"
        :serviceName="this.registerInfo.name"
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
  name: "PersonalDatacenterServiceDialog",
  components: { PersonalCenterServiceShare },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.Uploaddata");
      }
    },
    dropdownCategory: {
      type: Array,
      default: () => {
        return [];
      }
    },
    registerInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    formLabelWidth: {
      type: String,
      default: "120px"
    },
    nextShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var checkFileName = (rule, value, callback) => {
      let rules = new this.formRules.baseValidateRule({
        errorMsg: this.$t("management.Errorinverifyingdataname"),
        value: value,
        callback: callback
      });
      rules.execute([
        {
          name: "requiredFieldValidator",
          errorMsg: this.$t("management.Pleaseenterthedataname")
        },
        {
          name: "fieldLengthValidator",
          errorMsg: this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength: 50
        }
      ]);
    };
    var checkFileDescribe = (rule, value, callback) => {
      let rules = new this.formRules.baseValidateRule({
        errorMsg: this.$t("management.Errorinverifyingdatadescription"),
        value: value,
        callback: callback
      });
      rules.execute([
        {
          name: "fieldLengthValidator",
          errorMsg: this.$t("management.Theinputcharactersmustbelessthan80"),
          maxFieldLength: 80
        }
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
    var validateUpload = (rule, value, callback) => {
      if (this.uploadSuccess == "1") {
        return callback(new Error(this.$t("management.Pleaseuploaddata")));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        upload: "",
        power: "",
        add: "",
        name: "",
        keyWord: ""
      },
      rules: {
        upload: [
          {
            required: true,
            validator: validateUpload,
            trigger: "blur"
          }
        ],
        power: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectTheItsCategory"),
            trigger: "change"
          }
        ],
        add: [
          {
            required: true,
            message: this.$t("myCenter.PleaseEnterTheServiceAddress"),
            trigger: "blur"
          },
          { validator: validatePass, trigger: "blur" }
        ],
        name: [
          {
            required: true,
            trigger: "blur",
            validator: checkFileName
          }
        ],
        describe: [
          {
            trigger: "blur",
            validator: checkFileDescribe
          }
        ]
      },
      permissionListData: [],
      scope: "Private",
      ywType: "data",
      sharingListData: false,
      deleteListUserData: [],
      uploadSuccess: "1", //上传成功
      inputValue: "",
      dynamicTags: [],
      percentage: 0, //进度条开始为0
      formUploadAlign: {
        type: "zip",
        oldType: ""
      },
      sliceFileUploadList: null,
      filesId: "", //上传图片id
      chunk_size: "10", //每个切片的大小bm
      fileUploadName: "", //上传文件名
      fileUploadType: "", //上传文件type
      flag:false //标识
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
        this.closeUpload();
        this.formUploadAlign.type = "zip";
      }
    },
    "registerInfo.keyWord"() {
      if (this.registerInfo.keyWord) {
        if (this.registerInfo.keyWord.length > 0) {
          this.dynamicTags = this.registerInfo.keyWord.split(",");
        }
      }
    },
    "formUploadAlign.type"(newVal, oldVal) {
      this.formUploadAlign.oldType = oldVal;
    }
  },
  methods: {
    changeSelect(val){
      this.registerInfo.power=val;
    },
    // 数据文件类型改变
    formUploadtTypeChange(val) {
      if (this.uploadSuccess != "1") {
        this.$confirm(
          this.uploadSuccess == "2"
            ? this.$t(
                "management.Thisoperationwilloverridethefilebeinguploaded"
              )
            : this.$t("management.Thisoperationwilloverridetheuploadedfile"),
          this.$t("webAppBuilder.Tip"),
          {
            confirmButtonText: this.$t("myCenter.Sure"),
            cancelButtonText: this.$t("myCenter.cancel"),
            type: "warning"
          }
        )
          .then(() => {
            this.closeUpload();
          })
          .catch(() => {
            this.formUploadAlign.type = this.formUploadAlign.oldType;
          });
      }
    },
    // 选择文件
    formUploadPublicFun() {
      this.sliceFileUploadList = this.globalMethods.sliceFileUploadTask({
        id: "browseupload",
        autoStart: true,
        uploadParams: {
          chunk_size: `${this.chunk_size}mb`,
          url: "/api/cos3-portal-manager/sliceData/sliceFileUploadByPlup",
          extensions: this.formUploadAlign.type,
          multi_selection: false
        },
        eventListener: {
          UploadProgress: this.UploadProgress,
          FilesAdded: this.FilesAdded,
          FileUploaded: this.FileUploaded,
          BeforeUpload: this.BeforeUpload
        }
      });
    },
    formUploadBtn(e) {
      if (this.uploadSuccess != "1") {
        this.$confirm(
          this.uploadSuccess == "2"
            ? this.$t(
                "management.Thisoperationwilloverridethefilebeinguploaded"
              )
            : this.$t("management.Thisoperationwilloverridetheuploadedfile"),
          this.$t("webAppBuilder.Tip"),
          {
            confirmButtonText: this.$t("myCenter.Sure"),
            cancelButtonText: this.$t("myCenter.cancel"),
            type: "warning"
          }
        )
          .then(() => {
            this.flag=true;
            this.closeUpload();
            this.$nextTick(() => {
              this.formUploadPublicFun();
            });
          })
          .catch(() => {});
      } else {
        if (this.sliceFileUploadList != null&&this.flag==false) {
          return false;
        }
        this.formUploadPublicFun();
        this.flag=false;
      }
    },
    BeforeUpload(uploader, file) {
      // const isLt5M = file.size / 1024 / 1024 < 1;
      var isTYPE = false;
      this.filesId = file.id;
      this.formUploadAlign.type.split(",").forEach(item => {
        if (item == file.name.substring(file.name.lastIndexOf(".") + 1)) {
          isTYPE = true;
          this.fileUploadName = file.name;
          this.fileUploadType = file.name.substring(
            file.name.lastIndexOf(".") + 1
          );
        } else {
          isTYPE = false;
        }
      });
      // if (!isLt5M) {
      //   this.$message({message:this.$t("service.TheFileSizeCannotExceed1MB"),type:'error'});
      // }
      if (!isTYPE) {
        this.$message({
          message: `${this.$t("management.Onlyfilein")}${
            this.formUploadAlign.type
          }${this.$t("management.Formatcanbeuploaded")}`,
          type: "error"
        });
        this.flag=true;
        this.closeUpload();
      }
      // return isTYPE && isLt5M;
      return isTYPE;
    },
    // 进度条
    UploadProgress(uploader, files) {
      this.percentage = files.percent;
      if (0 < this.percentage < 100) {
        this.uploadSuccess = 2;
      }
    },
    // 删除上传
    closeUpload() {
      if (this.filesId != "") {
        this.uploadSuccess = 1;
        this.percentage = 0;
        this.filesId = "";
        this.fileUploadName = "";
         this.flag=true;
        // this.sliceFileUploadList.cancelFileUpload(this.filesId);
        this.sliceFileUploadList.destroy();
      }
    },
    FilesAdded(uploader, files) {
      if (files.length > 1) {
        this.$message({
          message: this.$t("management.Onlyonefilecanbeuploadedatmost"),
          type: "warning"
        });
        this.sliceFileUploadList.cancelFileUpload(files[0].id);
      } else {
        this.sliceFileUploadList.addOptions({
          multipart_params: {
            id: files[0].id,
            origSize: files[0].size,
            chunkSize: this.chunk_size * 1024 * 1024
          }
        });
        document
          .getElementById(`${files[0].getSource().ruid}_container`)
          .remove();
      }
    },
    // 上传完毕
    FileUploaded(uploader, file, responseObject) {
      if (
        JSON.parse(responseObject.response).result == "success" &&
        JSON.parse(responseObject.response).uploaded
      ) {
        this.$message({
          message: this.$t("management.Uploadedsuccessfully"),
          type: "success"
        });
        this.uploadSuccess = 3;
      } else if (JSON.parse(responseObject.response).result == "error") {
        this.$message({
          message: this.$t("myCenter.Uploadfailed"),
          type: "error"
        });
        this.uploadSuccess = 1;
        // uploader.refresh();
        this.closeUpload();
      }
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
            type: "warning"
          });
        } else if (this.dynamicTags.indexOf(inputValue) != -1) {
          this.$message({
            message: this.$t("management.Thelabelscannotberepeated"),
            type: "warning"
          });
        } else if (reg.test(inputValue)) {
          this.$message({
            message: this.$t(
              "management.Nospacesareallowedatthebeginningandtheendofthelabel"
            ),
            type: "warning"
          });
        } else {
          this.dynamicTags.push(inputValue);
        }
      }
      if (inputValue.indexOf(",") != -1 || inputValue.indexOf("，") != -1) {
        this.$message({
          message: this.$t("management.Nocommasareallowedinthelabel"),
          type: "warning"
        });
      }
      this.inputValue = "";
    },
    personalCheckData(val) {
      this.sharingListData = val;
    },
    //下一步
    nextStep() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          if (this.uploadSuccess == "2") {
        this.$confirm(this.$t(
                "management.Thisoperationwilloverridethefilebeinguploaded"
              ),
          this.$t("webAppBuilder.Tip"),
          {
            confirmButtonText: this.$t("myCenter.Sure"),
            cancelButtonText: this.$t("myCenter.cancel"),
            type: "warning"
          }
        )
          .then(() => {
            this.closeUpload();
          })
          .catch(() => {});
      }else{
        this.$emit("nextStep");
        this.uploadSuccess=1;
      }
        }
      }); 
    },
    // 上一步
    backFun() {
      this.uploadSuccess = 3;
      this.$emit("backFun");
    },
    //弹窗关闭
    handleClose() {
      if (this.filesId != "" && this.uploadSuccess != "1") {
        this.$confirm(
          this.uploadSuccess == "2"
            ? this.$t(
                "management.Thisoperationwilloverridethefilebeinguploaded"
              )
            : this.$t("management.Thisoperationwilloverridetheuploadedfile"),
          this.$t("webAppBuilder.Tip"),
          {
            confirmButtonText: this.$t("myCenter.Sure"),
            cancelButtonText: this.$t("myCenter.cancel"),
            type: "warning"
          }
        )
          .then(() => {
            this.$emit("backFun");
            this.$emit("dialogClose");
          })
          .catch(() => {});
      } else {
        this.$emit("backFun");
        this.$emit("dialogClose");
      }
    },
    //确定
    save() {
      this.$refs.sharedSubmissionFun.sharedSubmission({
        ywType: this.ywType,
        sourceId: null,
        messageResourceName: "我的数据"
      });
      // 判断当前页面是否为空  弹框提示
      if (
        typeof this.sharingListData == "undefined" ||
        (this.sharingListData == false && this.permissionListData.length == 0)
      ) {
        this.$message({
          message: this.$t("myCenter.PleasetickSharepermission"),
          type: "warning"
        });
        return false;
      }
      this.$emit("save", {
        referenceId: this.filesId,
        serviceClassify: this.registerInfo.power,
        scope: this.scope,
        permissionListData: this.permissionListData,
        deleteListUserData: null,
        fileSuffix: this.fileUploadType
      });
    },
    //移除校验
    openDialog() {
      this.$refs.registerForm.clearValidate();
    },
    //获取permissionListData数据
    permissionListDataBatchFun(val) {
      this.permissionListData = val.permissionListData;
      this.scope = val.scope;
    }
  }
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
        "bottom"
      )
    );
    /deep/.el-form-item:first-child {
      margin-bottom: 32px;
    }
    /deep/.el-form-item.upload-data {
      margin-bottom: 32px;
      .el-form-item__content {
        margin-top: -10px;
      }
    }

    .upload-form {
      position: relative;
      border: 1px solid #dcdfe6;
      border-radius: 5px;
      padding: 10px 10px;
      height: 172px;
      .center-box {
        border-right: 1px solid #dcdfe6;
        height: 140px;
        padding-right: 5px;
      }
      /deep/.el-form {
        padding: 0px;
        .el-form-item {
          margin: 15px 0;
          .el-form-item__content {
            margin-top: 0px;
          }
        }
        .el-form-item:first-child {
          margin: 0;
        }
      }
      .from-progress {
        padding-left: 3px;
        .progress-filename {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .progress-success {
          border-radius: 4px;
          text-align: center;
          color: rgb(19, 206, 102);
        }
        .el-progress {
          line-height: 40px;
        }
        .el-col.el-col-2 {
          text-align: right;
          i {
            font-size: 18px;
            &:hover {
              cursor: pointer;
              @include base-active-color();
            }
          }
        }
      }
      .right-box {
        height: 140px;
        padding-left: 10px;
        .right-box-div-shp {
          height: 80%;
          line-height: normal;
          text-align: center;
          img {
            width: 100%;
            height: 99%;
          }
          span {
            text-align: left;
            font-size: 12px;
          }
        }
        .right-box-div {
          img {
            width: 100%;
          }
        }
      }
    }

    .el-button + .el-button {
      margin-left: 0px;
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
        "bottom"
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
    .upload-demo {
      position: relative;
    }
    .replace-btn {
      position: absolute;
      top: 6px;
      left: 0;
    }
  }
  /deep/.el-select {
    width: 100%;
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
}
</style>