<template>
  <div class="map-edit-dialog">
    <el-dialog
      :visible.sync="editDialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      custom-class="dialog-custom-class"
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
      <el-steps :active="pageNumber" align-center>
        <el-step
          :title="$t('myCenter.ServiceInformation')"
          :icon="pageNumber>1?'el-icon-portal-yuan':'el-icon-portal-yuan3'"
          :class="pageNumber>1?'line-is-finish':''"
        ></el-step>
        <el-step
          :title="$t('management.ModifyThumbnail')"
          :icon="pageNumber>2?'el-icon-portal-yuan':'el-icon-portal-yuan3'"
          :class="pageNumber>2?'line-is-finish':''"
        ></el-step>
        <el-step
          :title="$t('management.ConfirmInformation')"
          :icon="pageNumber>3?'el-icon-portal-yuan':'el-icon-portal-yuan3'"
          :class="pageNumber>3?'line-is-finish':''"
          v-if="resourceData.serviceType !='WMS'&&resourceData.serviceType !='WMTS' "
        ></el-step>
      </el-steps>
      <el-row class="dialog-body" v-if="!thumbnailShow&&!detailsShow">
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
          <el-form-item :label="$t('myCenter.ServiceType')" prop="type">
            <el-input v-model="editInfo.type" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceAddress')+':'" prop="serverAdd">
            <el-input v-model="editInfo.serverAdd" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('management.Proxyname')+':'"
            prop="proxyName"
            v-if="editInfo.isReqProxyUrl&&resourceData.serviceType!='kqmapping'"
          >
            <el-input v-model="editInfo.proxyName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('myCenter.ServiceAddress')+':'"
            v-if="editInfo.isReqProxyUrl&&resourceData.serviceType!='kqmapping'"
          >
            <el-checkbox
              v-model="editInfo.isReqProxyUrl"
              :disabled="true"
            >{{$t('management.Useproxyaddress')}}</el-checkbox>
          </el-form-item>
          <!-- 关键字 -->
          <el-form-item :label="$t('service.label')+':'" prop="keyWord" class="form-item-tag">
            <el-row class="key-word-tag">
              <el-col :span="20">
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
      <!-- 缩略图 -->
      <el-row v-if="thumbnailShow&&!detailsShow" class="dialog-body-secondary">
        <transition
          enter-active-class="animated slideInLeft"
          leave-active-class="animated slideOutLeft"
        >
          <el-row class="img-box" v-show="modifyingNo">
            <el-image :src="resourceData.img"></el-image>
            <el-button
              type="primary"
              class="base-btn"
              @click="getServiceImg"
              size="small"
              v-if="changerShow"
            >{{$t('management.Regain')}}</el-button>
            <el-button
              type="primary"
              :class="!changerShow?'base-btn center-btn':'base-btn left-btn'"
              @click="modifyingThumbnails"
              size="small"
            >{{$t('management.ModifyThumbnail')}}</el-button>
          </el-row>
        </transition>
        <transition
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
        >
          <el-row class="img-operation" v-show="!modifyingNo">
            <upload-clipping-map-next
              ref="dialogUpload"
              @UploadBlackFun="UploadBlackFun"
              :dialogTitleUpload="dialogTitleUpload"
              :autoCropWidth="autoCropWidth"
              :autoCropHeight="autoCropHeight"
              :fileRule="fileRule"
              :recommendShow="true"
              :unifiedMark="unifiedMark"
              @cancelThumbnails="cancelThumbnails"
              @saveThumbnails="saveThumbnails"
            ></upload-clipping-map-next>
          </el-row>
        </transition>
      </el-row>
      <!-- 详情 -->
      <el-row class="dialog-body-third" v-if="detailsShow">
        <el-form
          :model="detailsInfo"
          :rules="rules"
          ref="detailsForm"
          :label-width="formLabelWidth"
        >
          <el-form-item label="Epsg:" prop="Epsg">
            <el-input v-model="detailsInfo.Epsg" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="fullExtent:" prop="fullExtent">
            <el-input v-model="detailsInfo.fullExtent" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="initialExtent:" prop="initialExtent">
            <el-input v-model="detailsInfo.initialExtent" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="origin:" prop="origin">
            <el-input v-model="detailsInfo.origin" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="proj4:" prop="proj4">
            <el-input v-model="detailsInfo.proj4" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="spatialReference:" prop="spatialReference">
            <el-input v-model="detailsInfo.spatialReference" :disabled="true"></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          class="base-btn"
          @click="getServiceDetails"
        >{{$t('management.Regain')}}</el-button>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button
          style="margin-top: 12px;"
          @click="backFun"
          v-show="thumbnailShow||detailsShow"
          :disabled="!modifyingNo"
        >{{$t('myCenter.Back')}}</el-button>
        <el-button
          style="margin-top: 12px;"
          @click="nextStep"
          :disabled="!modifyingNo"
          v-show="!thumbnailShow||!detailsShow&&changerShow"
        >{{$t('myCenter.Next')}}</el-button>
        <el-button
          type="primary"
          class="base-btn"
          :disabled="!modifyingNo&&!changerShow"
          @click="saveEdit"
          v-show="detailsShow||!changerShow"
        >{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UploadClippingMapNext from "components/common/uploadClipping/UploadClippingMapNext";
export default {
  name: "PersonalCenterServiceEditDialog",
  components: {
    UploadClippingMapNext,
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
      default: "140px",
    },
    resourceData: {
      type: Object,
      default: () => {
        return {};
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
            validator: checkMapServiceName,
          },
        ],
        describe: [
          {
            trigger: "blur",
            validator: checkMapServiceDescribe,
          },
        ],
      },
      fileRule: this.$t("service.OnlyJPGPNGFilesUploadedSizeLess1MB") + "1MB",
      autoCropWidth: 236,
      autoCropHeight: 165,
      dialogTitleUpload: this.$t("service.AddThumbnail"),
      thumbnailShow: false, //默认缩略图不显示
      detailsShow: false, //第三页详情页不显示
      changerShow: true, //WMS WMTS类型不显示详情
      pageNumber: 1, //记录第几页（共3页）
      serviceUrlIpData: "",
      serviceUrlName: "",
      unifiedMark: "map", //缩略图推荐缩略图标识
      detailsInfo: {
        Epsg: "",
        fullExtent: "",
        initialExtent: "",
        origin: "",
        proj4: "",
        spatialReference: "",
      }, //详情
      modifyingNo: true, //默认不修改缩略图
      inputValue: "",
      dynamicTags: [],
      whetherToGet: false, //记录是否重新获取
      hiddenState: true, //是否为隐藏状态
    };
  },
  watch: {
    dynamicTags() {
      this.editInfo.keyWord = this.dynamicTags.toString();
    },
    editDialogVisible() {
      if (!this.editDialogVisible) {
        this.serviceUrlIpData = "";
        this.serviceUrlName = "";
        this.pageNumber = 1;
        this.thumbnailShow = false;
        this.detailsShow = false;
        this.modifyingNo = true;
        this.changerShow = true;
        this.dynamicTags = [];
        this.whetherToGet = false;
        this.$nextTick(() => {
          this.$refs.editForm.clearValidate();
        });
      } else {
        var htmlHref = this.editInfo.serverAdd;
        var addr = htmlHref.substr(
          htmlHref.lastIndexOf("/", htmlHref.lastIndexOf("/") - 1) + 1
        );
        var index = addr.lastIndexOf("/");
        this.serviceUrlName = decodeURI(addr.substring(0, index));
        /* eslint-disable */

        var indexIp = htmlHref.split("/");
        // this.serviceUrlIpData = `${indexIp[0]}//${indexIp[2]}`;
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
        this.serviceUrlIpData = htmlHref;
        if (this.resourceData.serviceType == "kqmapping") {
          this.editInfo.type = "KQGIS 服务";
        } else if (this.resourceData.serviceType == "arcmapping") {
          this.editInfo.type = "ArcGIS 服务";
        } else if (this.resourceData.serviceType == "WMS") {
          this.editInfo.type = "OGC WMS 服务";
        } else if (this.resourceData.serviceType == "WMTS") {
          this.editInfo.type = "OGC WMTS 服务";
        } else if (this.resourceData.serviceType == "bigData") {
          this.editInfo.type = "大数据 服务";
        } else if (this.resourceData.serviceType == "OTHER") {
          this.editInfo.type = this.$t("management.Otherservices");
        } else if (this.resourceData.serviceType == "WPS") {
          this.editInfo.type = this.$t("management.OGCWPSservice");
        } else if (this.resourceData.serviceType == "WCS") {
          this.editInfo.type = this.$t("management.OGCWCSservice");
        } else if (this.resourceData.serviceType == "WFS") {
          this.editInfo.type = this.$t("management.OGCWFSservice");
        }
        this.detailsInfo.Epsg = this.resourceData.serviceEpsg;
        this.detailsInfo.fullExtent = this.resourceData.serviceFull;
        this.detailsInfo.initialExtent = this.resourceData.serviceInitial;
        this.detailsInfo.origin = this.resourceData.serviceOrigin;
        this.detailsInfo.proj4 = this.resourceData.serviceProjFour;
        this.detailsInfo.spatialReference = this.resourceData.servicePrj;
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
      /* eslint-disable */

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

    // 修改缩略图
    modifyingThumbnails() {
      // var dialogHegiht = document.getElementsByClassName("dialog-custom-class");
      // for (var i = 0; i < dialogHegiht.length; i++) {
      //   dialogHegiht[i].style.height = "650px";
      // }
      this.modifyingNo = false;
      this.$forceUpdate();
      this.$refs.dialogUpload.mySwiper();
    },
    // 确定 取消
    cancelThumbnails() {
      this.modifyingNo = true;
    },
    saveThumbnails() {
      this.modifyingNo = true;
    },
    //详情重新获取
    getServiceDetails() {
      this.$api.personalCenterServiceApi
        .getMapServiceDetails(
          {
            serviceUrlIp: this.serviceUrlIpData,
            serviceUrlName: this.serviceUrlName,
            serviceType: this.resourceData.serviceType,
          },
          { coverStatusCode: { 394: { messageType: "warning" } } }
        )
        .then((res) => {
          this.whetherToGet = true;
          if (res.data.status == 200) {
            if (res.data.data.servicePrj) {
              this.detailsInfo.Epsg = res.data.data.serviceEpsg;
              this.detailsInfo.fullExtent = res.data.data.serviceFull;
              this.detailsInfo.initialExtent = res.data.data.serviceInitial;
              this.detailsInfo.origin = res.data.data.serviceOrigin;
              this.detailsInfo.proj4 = res.data.data.serviceProjFour;
              this.detailsInfo.spatialReference = res.data.data.servicePrj;
              this.$message({
                message: this.$t("management.RegainedSuccessfully"),
                type: "success",
              });
            } else {
              this.$message({
                message: this.$t(
                  "management.PleaseCheckWhetherTheServiceIsNormal"
                ),
                type: "warning",
              });
            }
          }
        })
        .catch(() => {});
    },
    handleClose() {
      this.thumbnailShow = false;
      this.detailsShow = false;
      this.$emit("editDialogClose");
    },
    //上传返回值
    UploadBlackFun(val) {
      if (val.recommendation) {
        this.resourceData.img = val.uploadrUrl;
      } else {
        this.resourceData.img = `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
      }
    },
    // 下一步
    nextStep() {
      if (this.pageNumber == 1) {
        this.$refs.editForm.validate((valid) => {
          if (valid) {
            if (
              this.resourceData.serviceType == "WMS" ||
              this.resourceData.serviceType == "WMTS" ||
              this.resourceData.serviceType == "WFS" ||
              this.resourceData.serviceType == "WCS" ||
              this.resourceData.serviceType == "WPS" ||
              this.resourceData.serviceType == "OTHER"
            ) {
              this.changerShow = false;
            }
            this.thumbnailShow = true;
            this.pageNumber++;
          } else {
            return false;
          }
        });
      } else if (this.pageNumber == 2) {
        this.detailsShow = true;
        this.pageNumber++;
      }
    },
    // 上一步
    backFun() {
      if (this.pageNumber == 2) {
        this.changerShow = true;
        this.thumbnailShow = false;
        this.detailsShow = false;
        this.pageNumber--;
      } else if (this.pageNumber == 3) {
        this.thumbnailShow = true;
        this.detailsShow = false;
        this.pageNumber--;
      }
    },
    saveEdit() {
      this.$api.personalCenterServiceApi
        .saveKqService({
          id: this.resourceData.id,
          name: this.editInfo.name,
          serviceType: this.resourceData.serviceType,
          serviceClassify: this.editInfo.power,
          serviceScope: this.resourceData.scope,
          serviceImg: this.resourceData.img,
          serviceUrlIp: this.serviceUrlIpData,
          serviceUrlName: this.serviceUrlName,
          regainService: this.whetherToGet,
          serviceComments: this.editInfo.describe,
          keyWord: this.editInfo.keyWord,
          isReqCloud: this.editInfo.isReqCloud,
          proxyUrl: this.resourceData.proxyUrl || null,
          proxyName: this.resourceData.proxyName || null,
          personnelId: this.resourceData.personnelId,
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
    // 缩略图重新获取
    getServiceImg() {
      this.$api.personalCenterServiceApi
        .getServiceImg({
          serviceType: this.resourceData.serviceType,
          serviceUrlIp: this.serviceUrlIpData,
          serviceUrlName: this.serviceUrlName,
        })
        .then((res) => {
          if (res.data.status == 200) {
            if (res.data.data) {
              this.resourceData.img = res.data.data;
              this.$forceUpdate();
              this.$message({
                message: this.$t("myCenter.Reacquired"),
                type: "success",
              });
            } else {
              this.$message({
                message: this.$t("myCenter.TheThumbnailGetsEmpty"),
                type: "warning",
              });
            }
          }
        });
      // 将修改缩略图置空
      this.$refs.dialogUpload.emptySpaceImg();
    },
  },
};
</script>

<style lang="scss" 
>
.map-edit-dialog {
  // /deep/.el-dialog.dialog-custom-class {
  //   height: 650px;
  // }
  .outline-share {
    top: 20px;
    left: 128px;
    position: absolute;
    i {
      color: #e6a23c;
    }
  }
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-body {
    @include manage-border(
      $types: (
        "bottom",
      )
    );
    .el-form {
      padding: 30px 50px 0px 0;
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
  // 步骤条
  .el-steps.el-steps--horizontal {
    padding-bottom: 10px;
  }
  /deep/.el-step__icon.is-icon {
    width: 20px;
  }
  /deep/.el-step__head {
    color: #ccc;
    .el-step__line {
      color: #ccc;
    }
    /deep/.el-step__icon.is-icon {
      border-radius: 50%;
      width: 24px;
      height: 24px;
    }
  }
  /deep/.el-step__head.is-finish {
    color: #ccc;
    @include check-box-border();
    .el-step__icon.is-icon {
      @include base-active-underline($width: 2px);
      .el-step__icon-inner[class*="el-icon"]:not(.is-status) {
        top: -2px;
        position: absolute;
      }
    }
  }
  .line-is-finish {
    /deep/.el-icon-portal-yuan {
      @include base-hover-color-btn();
    }
    /deep/.el-step__head.is-finish {
      .el-step__icon.is-icon {
        border: none;
      }
    }
  }
  /deep/.el-step__title.is-process {
    color: #ccc;
  }
  /deep/.el-step__title.is-finish {
    @include base-hover-color-btn();
  }
  .dialog-body-secondary {
    border-bottom: 1px solid #ebeef5;
    height: 412px;
    overflow: hidden;
    .img-box {
      margin-bottom: 10px;
      font-size: 12px;
      position: relative;
      height: 350px;
      display: flex;
      justify-content: center;
      align-items: center;
      /deep/ .el-collapse-item__header:first-child {
        border-bottom: none;
      }
      .el-button {
        position: absolute;
        bottom: 20px;
        left: 361px;
        margin-right: 100px;
        &.left-btn {
          left: 500px;
        }
        &.center-btn {
          left: 435px;
        }
      }
      .el-image {
        text-align: center;
        width: 238px;
        height: 167px;
        /deep/.el-image__inner {
          width: 236px;
          height: 165px;
          @include base-active-underline();
        }
      }
    }
    .img-operation {
      position: absolute;
      top: 0px;
    }
  }
  .dialog-body-third {
    padding-bottom: 10px;
    .el-form {
      padding: 0px 50px 0 0;
    }
    .el-button {
      margin-left: 140px;
    }
    @include manage-border(
      $types: (
        "bottom",
      )
    );
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

  /deep/.el-select {
    width: 100%;
  }
}
</style>