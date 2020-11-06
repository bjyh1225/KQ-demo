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
          <span>{{$t('myCenter.FileInformation')}}</span>
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
            <el-select
              v-model="registerInfo.power"
              :placeholder="$t('myCenter.PleaseSelect')"
              ref="selectGroup"
            >
              <el-option
                v-for="item in dropdownCategory"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('management.Upload')+':'" prop="upload">
            <el-button
              size="small"
              type="primary"
              class="base-btn"
              @click="formUploadBtn"
              id="filebrowseuploadmulti"
            >{{$t('management.ClickToUpload')}}</el-button>
            <el-table
              v-show="fileUploadList.length>0"
              :data="registerInfo.MultiInfo"
              :row-key="getRowKeys"
              :expand-row-keys="expands"
              @expand-change="expandSelect"
              style="width: 100%"
            >
              <!-- 展开行 -->
              <el-table-column type="expand">
                <template slot-scope="props">
                  <!-- <el-form label-position="left" inline class="demo-table-expand"> -->
                  <!-- 关键字 -->
                  <el-form-item
                    :label="$t('service.label')+':'"
                    prop="keyWord"
                    class="form-item-tag"
                  >
                    <el-row class="key-word-tag">
                      <el-col :span="19">
                        <el-input
                          class="input-new-tag"
                          v-model="props.row.keyWord"
                          ref="saveTagInput"
                          @keyup.enter.native="handleInputConfirm(props.row)"
                          @blur="handleInputConfirm(props.row)"
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
                        v-for="tag in props.row.dynamicTags"
                        closable
                        @close="handleCloseTag(props.row.id,tag)"
                      >{{tag}}</el-tag>
                    </el-row>
                  </el-form-item>
                  <el-form-item
                    :label="$t('management.FileName')+':'"
                    prop="filesname"
                    class="form-item-name"
                  >
                    <el-input v-model="props.row.filesname"></el-input>
                  </el-form-item>
                  <el-form-item :label="$t('management.FileDescription')+':'" prop="describe">
                    <el-input v-model="props.row.describe" type="textarea"></el-input>
                  </el-form-item>
                  <!-- </el-form> -->
                </template>
              </el-table-column>
              <el-table-column prop="name" :label="$t('myCenter.File')" width="180"></el-table-column>
              <el-table-column prop="origSize" :label="$t('myCenter.Size')" width="180"></el-table-column>
              <el-table-column :label="$t('myCenter.Progress')">
                <template slot-scope="scope">
                  <el-row>
                    <el-col :span="20">
                      <el-progress
                        :text-inside="true"
                        :stroke-width="16"
                        :percentage="scope.row.percent"
                        style="width: 90%"
                      ></el-progress>
                    </el-col>
                    <el-col :span="4">
                      <el-tooltip
                        v-show="scope.row.percent!=100"
                        :content="$t('management.delete')"
                        placement="bottom"
                        effect="light"
                        @click.native="closeUploadOnly(scope.row)"
                      >
                        <i class="el-icon-close"></i>
                      </el-tooltip>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
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
  name: "PersonalFileServiceMultiDialog",
  components: { PersonalCenterServiceShare },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.UploadFile");
      },
    },
    dropdownCategory: {
      type: Array,
      default: () => {
        return [];
      },
    },
    registerInfo: {
      type: Object,
      default: {},
    },
    formLabelWidth: {
      type: String,
      default: "120px",
    },
    nextShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    var checkFileName = (rule, value, callback) => {
      let rules = new this.formRules.baseValidateRule({
        errorMsg: this.$t("myCenter.Errorinverifyingthefilename"),
        value: value,
        callback: callback,
      });
      rules.execute([
        {
          name: "requiredFieldValidator",
          errorMsg: this.$t("myCenter.Pleaseenterthefilename"),
        },
        {
          name: "fieldLengthValidator",
          errorMsg: this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength: 50,
        },
      ]);
    };
    var checkFileDescribe = (rule, value, callback) => {
      if (value == undefined) {
        value = "";
      }
      let rules = new this.formRules.baseValidateRule({
        errorMsg: this.$t("myCenter.Errorinverifyingthefiledescription"),
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
      /* eslint-disable */
      var addVerification = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      if (!addVerification.test(value)) {
        callback(new Error(this.$t("myCenter.Errorsinserviceaddressformat")));
      } else {
        callback();
      }
    };
    var validateUpload = (rule, value, callback) => {
      if (this.uploadSuccess == "1") {
        return callback(new Error(this.$t("myCenter.Pleaseuploadthefile")));
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
        keyWord: "",
      },
      rules: {
        upload: [
          {
            required: true,
            validator: validateUpload,
            trigger: "blur",
          },
        ],
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
            validator: checkFileName,
          },
        ],
        describe: [
          {
            trigger: "blur",
            validator: checkFileDescribe,
          },
        ],
      },
      getRowKeys(row) {
        return row.id;
      }, //折叠面板
      expands: [], //折叠面板
      permissionListData: [],
      scope: "Private",
      ywType: "fileService",
      sharingListData: false,
      deleteListUserData: [],
      uploadSuccess: "1", //上传成功
      percentage: 0, //进度条开始为0
      formUploadAlign: "", //文件类型
      sliceFileUploadList: null,
      filesId: [], //上传图片id
      chunk_size: "1", //每个切片的大小bm
      flag: false, //标识是第一次上传还是删除后再上传的
      fileUploadList: [], //多文件列表
    };
  },
  watch: {
    // dynamicTags() {
    //   this.registerInfo.keyWord = this.dynamicTags.toString();
    // },
    dialogVisible() {
      if (!this.dialogVisible) {
        this.$emit("backFun");
        this.$refs.sharedSubmissionFun.dataClearedFun();
        this.openDialog();
        this.$refs.registerForm.resetFields();
        // this.dynamicTags = [];
        this.closeUpload();
        this.formUploadAlign = "";
      }
    },
    // "registerInfo.keyWord"() {
    //   if (this.registerInfo.keyWord) {
    //     if (this.registerInfo.keyWord.length > 0) {
    //       this.dynamicTags = this.registerInfo.keyWord.split(",");
    //     }
    //   }
    // }
  },
  methods: {
    // 折叠面板每次只能展开一行
    expandSelect(row, expandedRows) {
      var that = this;
      if (expandedRows.length) {
        that.expands = [];
        if (row) {
          that.expands.push(row.id); // 每次push进去的是每行的ID
        }
      } else {
        that.expands = []; // 默认不展开
      }
    },
    // 选择文件
    formUploadPublicFun() {
      this.sliceFileUploadList = this.globalMethods.sliceFileUploadTask({
        id: "filebrowseuploadmulti",
        autoStart: true,
        uploadParams: {
          chunk_size: `${this.chunk_size}mb`,
          url: "/api/cos3-portal-manager/sliceFile/sliceFileUploadByPlup",
          extensions: this.formUploadAlign,
          multi_selection: true, //多文件上传
        },
        eventListener: {
          UploadProgress: this.UploadProgress,
          FilesAdded: this.FilesAdded,
          FileUploaded: this.FileUploaded,
          BeforeUpload: this.BeforeUpload,
          UploadComplete: this.UploadComplete,
        },
      });
    },
    formUploadBtn() {
      if (this.filesId.length > 0) {
        this.uploadSuccess = 3;
      } else {
        this.uploadSuccess = 1;
      }
      if (this.sliceFileUploadList != null && this.flag == false) {
        return false;
      }
      this.formUploadPublicFun();
      this.flag = false;
    },
    // 进度条
    UploadProgress(uploader, files) {
      this.registerInfo.MultiInfo.forEach((item) => {
        if (item.id == files.id) {
          item.percent = files.percent;
        }
      });
    },
    // 删除上传
    closeUpload() {
      if (this.filesId.length > 0) {
        this.uploadSuccess = 1;
        this.filesId = [];
        this.registerInfo.MultiInfo = [];
        this.flag = true;
        this.sliceFileUploadList.destroy();
      }
    },
    // 删除单文件上传
    closeUploadOnly(val) {
      var flistOnly = [];
      this.registerInfo.MultiInfo.forEach((flist) => {
        if (flist.id != val.id) {
          flistOnly.push({
            name: flist.name,
            filesname: flist.name,
            describe: "",
            keyWord: "",
            origSize: flist.origSize,
            percent: flist.percent,
            id: flist.id,
            dynamicTags: [],
          });
        }
      });
      this.registerInfo.MultiInfo = flistOnly;
      this.sliceFileUploadList.cancelFileUpload(val.id);
    },
    // 所有文件上传完毕
    UploadComplete(uploader, files) {
      this.filesId = [];
      files.forEach((item) => {
        this.filesId.push(item.id);
      });
      if (files.length > 0) {
        this.uploadSuccess = 3;
      } else {
        this.uploadSuccess = 1;
      }
    },
    BeforeUpload(uploader, files) {
      // 多文件上传
      this.sliceFileUploadList.addOptions({
        multipart_params: {
          id: files.id,
          origSize: files.size,
          chunkSize: this.chunk_size * 1024 * 1024,
        },
      });
    },
    FilesAdded(uploader, files) {
      this.filesId = [];
      files.forEach((item) => {
        this.filesId.push(item.id);
        this.fileUploadList.push(files);
        this.registerInfo.MultiInfo.push({
          //弹框双向数据
          name: item.name,
          filesname: item.name,
          describe: "",
          keyWord: "",
          origSize: item.origSize,
          percent: item.percent,
          id: item.id,
          dynamicTags: [],
        });
      });
    },
    // 上传完毕
    FileUploaded(uploader, file, responseObject) {
      if (
        JSON.parse(responseObject.response).result == "success" &&
        JSON.parse(responseObject.response).uploaded
      ) {
        this.$message({
          message: this.$t("management.Uploadedsuccessfully"),
          type: "success",
        });
        this.uploadSuccess = 2;
      } else if (JSON.parse(responseObject.response).result == "error") {
        this.$message({
          message: this.$t("myCenter.Uploadfailed"),
          type: "error",
        });
        this.uploadSuccess = 1;
        this.closeUpload();
      }
    },
    // 标签
    handleCloseTag(tagid, tag) {
      this.registerInfo.MultiInfo.forEach((info) => {
        if (info.id == tagid) {
          info.dynamicTags.splice(info.dynamicTags.indexOf(tag), 1);
        }
      });
    },
    showInput() {
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm(val) {
      /* eslint-disable */
      var reg = /^[\s　]|[ ]$/gi;
      let inputValue = val.keyWord;
      if (
        inputValue &&
        inputValue.indexOf(",") == -1 &&
        inputValue.indexOf("，") == -1
      ) {
        if (val.dynamicTags.length >= 5) {
          this.$message({
            message: this.$t("management.Addfivelabelsatmost"),
            type: "warning",
          });
        } else if (val.dynamicTags.indexOf(inputValue) != -1) {
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
          val.dynamicTags.push(inputValue);
        }
      }
      if (inputValue.indexOf(",") != -1 || inputValue.indexOf("，") != -1) {
        this.$message({
          message: this.$t("management.Nocommasareallowedinthelabel"),
          type: "warning",
        });
      }
      val.keyWord = "";
    },
    personalCheckData(val) {
      this.sharingListData = val;
    },
    //下一步
    nextStep() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          var flagWarning = true;
          this.registerInfo.MultiInfo.forEach((info) => {
            if (info.filesname == "") {
              this.$message({
                message: this.$t("myCenter.PleaseInputTheNameOfTheAttachment"),
                type: "warning",
              });
              flagWarning = false;
              return false;
            }
          });
          if (!flagWarning) {
            return false;
          }
          if (this.uploadSuccess == "2") {
            this.$confirm(
              this.$t(
                "management.Thisoperationwilloverridethefilebeinguploaded"
              ),
              this.$t("webAppBuilder.Tip"),
              {
                confirmButtonText: this.$t("myCenter.Sure"),
                cancelButtonText: this.$t("myCenter.cancel"),
                type: "warning",
              }
            )
              .then(() => {
                this.closeUpload();
              })
              .catch(() => {});
          } else {
            this.$emit("nextStep");
            this.uploadSuccess = 1;
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
      if (this.filesId.length > 0 && this.uploadSuccess != "1") {
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
            type: "warning",
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
        messageResourceName: this.$t("myCenter.MyFiles"),
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
      this.$emit("saveMulti", {
        referenceId: this.filesId,
        serviceClassify: this.registerInfo.power,
        scope: this.scope,
        permissionListData: this.permissionListData,
        deleteListUserData: null,
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
    },
  },
};
</script>

<style lang='scss' scoped>
@import "~@/style/mixin.scss";
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
        /deep/.input-new-tag.el-input {
          width: 85%;
        }
      }
    }
    .form-item-name {
      margin-bottom: 20px;
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
    .upload-demo {
      position: relative;
    }
    .replace-btn {
      position: absolute;
      top: 6px;
      left: 0;
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
  }
  /deep/.el-select {
    width: 100%;
  }
  // 展开行
  /deep/.el-table__body-wrapper {
    .el-table__expanded-cell {
      padding: 10px 0;
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
}
</style>