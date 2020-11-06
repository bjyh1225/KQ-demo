<template>
  <div class="edit-dialog">
    <el-dialog
      :visible.sync="editDialogVisible"
      width="720px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('management.EditService')}}</span>
        </div>
      </template>
      <div class='outline-share' v-if='!hiddenState'>
        <i class='el-icon-warning'></i>
        <span> {{$t('management.Theresourceishidednow')}}</span>
      </div>
      <!-- 步骤条 -->
      <ul class="navs">
        <li :class="pageNumber==1?'active':''">
          <i class="el-icon-portal-duihao" v-show="pageNumber==2"></i>
          <span>{{$t('myCenter.ServiceInformation')}}</span>
        </li>
        <li :class="pageNumber==2?'active':''">
          <span>{{$t('management.CustomizeThumbnail')}}</span>
        </li>
      </ul>
      <el-row class="dialog-body" v-if="!thumbnailShow">
        <el-form :model="editInfo" :rules="rules" ref="editForm" :label-width="formLabelWidth">
          <!-- 所属分类 -->
          <el-form-item :label="$t('myCenter.TheCategory')" prop="power">
            <el-select v-model="editInfo.power" :placeholder="$t('myCenter.PleaseSelect')" ref='selectGroup' @change='changeSelect'>
                <el-option
                  v-for="item in arr"
                  :key="item.id"
                  :label="item.typeName"
                  :value="item.id"
                ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceType')" prop="type">
            <el-input v-model="editInfo.type" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceAddress')+':'" prop="serverAdd">
            <el-input v-model="editInfo.serverAdd" :disabled="true"></el-input>
          </el-form-item>
          <!-- 关键字 -->
          <el-form-item :label="$t('service.label')+':'" prop="keyWord" class='form-item-tag'>
            <el-row class='key-word-tag'>
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
            >
            </el-input>
            </el-col>
            <el-col
              :span="4"
            >
            <el-button type="primary" class="base-btn" @click="showInput">+ {{$t('management.Addlabels')}}</el-button>
            </el-col>
            </el-row>
            <el-row class='key-word-tag-box'>
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              @close="handleCloseTag(tag)">
              {{tag}}
            </el-tag>
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
      <el-row v-if="thumbnailShow" class="dialog-body-secondary">
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
          v-show="thumbnailShow"
        >{{$t('myCenter.Back')}}</el-button>
        <el-button
          style="margin-top: 12px;"
          @click="nextStep"
          v-show="!thumbnailShow"
        >{{$t('myCenter.Next')}}</el-button>
        <el-button
          type="primary"
          class="base-btn"
          @click="saveEdit"
          v-show="thumbnailShow"
        >{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UploadClippingNext from "components/common/uploadClipping/UploadClippingNext";
export default {
  name: "PersonalSceneServiceEditDialog",
  components: {
    UploadClippingNext
  },
  props: {
    editDialogVisible: {
      type: Boolean,
      default: false
    },
    editInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    arr: {
      type: Array,
      default: () => {
        return [];
      }
    },
    formLabelWidth: {
      type: String,
      default: "120px"
    },
    resourceData: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
        var checkSceneEditName = (rule, value, callback) => {
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t("management.Errorinverifyingtheservicename"),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"requiredFieldValidator",
          errorMsg:this.$t("myCenter.PleaseEnterTheServiceName")
        },
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t("management.Theinputcharactersmustbelessthan50"),
          maxFieldLength:50
        }
      ])
    };
     var checkSceneEditDescribe = (rule, value, callback) => {
       if(value==null){
         value='';
       }
      let rules=new this.formRules.baseValidateRule({
        errorMsg:this.$t('management.Errorinverifyingtheservicedescription'),
        value:value,
        callback:callback
      });
      rules.execute([
        {
          name:"fieldLengthValidator",
          errorMsg:this.$t('management.Theinputcharactersmustbelessthan80'),
          maxFieldLength:80
        }
      ])
    };
    return {
      ruleForm: {
        power: "",
        type: "",
        serverAdd: "",
        name: "",
        describe: "",
        thumbnail: "",
        keyWord:''
      },
      rules: {
        power: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectTheItsCategory"),
            trigger: "change"
          }
        ],
        name: [
          {
            required: true,
            trigger: "blur",
            validator: checkSceneEditName
          }
        ],
        describe:[{
            trigger: "blur",
            validator: checkSceneEditDescribe
        }]
      },
      fileRule: this.$t("service.OnlyJPGPNGFilesUploadedSizeLess1MB") + "1MB",
      autoCropWidth: 236,
      autoCropHeight: 165,
      dialogTitleUpload: this.$t("service.AddThumbnail"),
      thumbnailShow: false, //默认缩略图不显示
      pageNumber: 1, //记录第几页（共2页）
      serviceImg: "",
      unifiedMark: "scene", //缩略图推荐缩略图标识
      inputValue: '',
        dynamicTags:[],
      hiddenState:true,//是否为隐藏状态
    };
  },
  watch: {
    dynamicTags(){
      this.editInfo.keyWord=this.dynamicTags.toString();
    },
    editDialogVisible() {
      if (!this.editDialogVisible) {
        this.serviceImg = "";
        this.pageNumber = 1;
        this.thumbnailShow = false;
        this.dynamicTags=[];
         this.$nextTick(()=>{
        this.$refs.editForm.clearValidate();
        })
      } else {
        if(this.resourceData.fileStatus==false||this.resourceData.fileStatus==0){
          this.hiddenState =false;
        }else if(this.resourceData.serviceStatus==false||this.resourceData.serviceStatus==0){
          this.hiddenState = false;
        }else{
        this.hiddenState =true;
        }
        if (this.resourceData.serviceType == "1") {
          this.editInfo.type = "影像三维服务(Imagery3DServer)";
        } else if (this.resourceData.serviceType == "2") {
          this.editInfo.type = "影像三维瓦片文件(ImageryTileFile)";
        } else if (this.resourceData.serviceType == "3") {
          this.editInfo.type = "地形三维服务(Terrain3DServer)";
        } else if (this.resourceData.serviceType == "4") {
          this.editInfo.type = "地形三维瓦片文件(TerrainTileFile)";
        } else if (this.resourceData.serviceType == "5") {
          this.editInfo.type = "模型瓦片服务(3dtiles)";
        } else if (this.resourceData.serviceType == "6") {
          this.editInfo.type = "动态模型瓦片服务(3dtiles)";
        } else if (this.resourceData.serviceType == "7") {
          this.editInfo.type = "STK地形";
        } else if (this.resourceData.serviceType == "8") {
          this.editInfo.type = "矢量服务(GeoJson)";
        } else if (this.resourceData.serviceType == "9") {
          this.editInfo.type = "谷歌 KML/KMZ";
        } else if (this.resourceData.serviceType == "10") {
          this.editInfo.type = "CZML(Cesium)";
        } else if (this.resourceData.serviceType == "11") {
          this.editInfo.type = "K3d服务(Cesium)";
        }
      }
    },
    'editInfo.keyWord'(){
      if(this.editInfo.keyWord&&this.editDialogVisible){
      if(this.editInfo.keyWord.length > 0){
          this.dynamicTags=this.editInfo.keyWord.split(",");
        }
      }
    },
    arr() {
      if (this.arr.length != 0) {
        this.arr.forEach(item => {
          if(item.children){
          item.children.forEach(ic => {
            if (ic.id == this.resourceData.serviceClassify) {
              this.editInfo.power = ic.id;
              return false;
            }
          });
           }else{
            if (item.id == this.resourceData.serviceClassify) {
              this.editInfo.power = item.id;
              return false;
            }
          }
        });
      }
    }
  },
  methods: {
    changeSelect(val){
      this.editInfo.power=val;
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
        var reg=/^[\s　]|[ ]$/gi;
        let inputValue = this.inputValue;
        if (inputValue&&inputValue.indexOf(',')==-1&&inputValue.indexOf('，')==-1) {
          if(this.dynamicTags.length>=5){
          this.$message({
                    message:this.$t('management.Addfivelabelsatmost'),
                    type: "warning"
                  });
       }else if(this.dynamicTags.indexOf(inputValue)!=-1){
         this.$message({
                    message:this.$t('management.Thelabelscannotberepeated'),
                    type: "warning"
                  });
       }else if(reg.test(inputValue)){
            this.$message({
              message:this.$t('management.Nospacesareallowedatthebeginningandtheendofthelabel'),
              type: "warning"
            });
          }else{
          this.dynamicTags.push(inputValue);
       }
        }
        if(inputValue.indexOf(',')!=-1||inputValue.indexOf('，')!=-1){
          this.$message({
                    message:this.$t('management.Nocommasareallowedinthelabel'),
                    type: "warning"
                  });
        }
        this.inputValue = '';
      },

    handleClose() {
      this.thumbnailShow = false;
      this.$emit("editDialogClose");
    },
    //上传返回值
    UploadBlackFun(val) {
      if (val.recommendation) {
        this.serviceImg = val.uploadrUrl;
      } else {
        this.serviceImg = `/fileapi/file/download/${val.uploadrUrl.referenceId}/true`;
      }
      this.savesceneService();
    },

    // 下一步
    nextStep() {
      if (this.pageNumber == 1) {
        this.$refs.editForm.validate(valid => {
          if (valid) {
            this.thumbnailShow = true;
            this.pageNumber++;
          } else {
            return false;
          }
        });
      }
    },
    // 上一步
    backFun() {
      if (this.pageNumber == 2) {
        this.thumbnailShow = false;
        this.pageNumber--;
      }
    },
    saveEdit() {
      this.$refs.dialogUpload.getImgUrl();
    },
    savesceneService() {
      this.$api.personalSceneServiceApi
        .savesceneService({
          id: this.resourceData.id,
          name: this.editInfo.name,
          serviceType: this.resourceData.serviceType,
          serviceClassify: this.editInfo.power,
          serviceScope: this.resourceData.scope,
          serviceImg: this.serviceImg,
          serviceUrl: this.editInfo.serverAdd,
          serviceComments:this.editInfo.describe,
          keyWord:this.editInfo.keyWord,
          personnelId:this.resourceData.personnelId
        })
        .then(res => {
          if (res.data.status == 200) {
            this.$emit("editDialogClose");
            this.$emit("getserviceListByMe");
            this.$message({
              message: this.$t("management.EditedSuccessfully"),
              type: "success"
            });
          }
        });
    }
  }
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
    i{
      color:#e6a23c;
    }
}
  .dialog-body {
    @include manage-border(
      $types: (
        "bottom"
      )
    );
    .form-item-tag{
    margin-bottom:10px;
    .key-word-tag-box{
      margin-top:12px;
    }
    .key-word-tag{
      /deep/.el-button{
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
    .el-tag__close{
     @include base-active-color();
     &:hover {
    @include base-active-pagination();
    }
  }
    }
  }
  // 步骤条
  .navs {
    height: 40px;
    border-radius: 4px 0 0 4px;
    width: 100%;
    background-color: #f6f7fb;
    padding: 0;
    margin-top: 0;
  }
  .navs li {
    padding: 0px 10px 0 30px;
    line-height: 40px;
    background: #f6f7fb;
    display: inline-block;
    @include base-active-color();
    position: relative;
  }

  .navs li:after {
    content: "";
    display: block;
    border-top: 20px solid #f6f7fb;
    border-bottom: 20px solid #f6f7fb;
    border-left: 20px solid #fff;
    position: absolute;
    right: -20px;
    top: 0;
  }

  .navs li:after {
    content: "";
    display: block;
    border-top: 20px solid transparent;
    border-bottom: 20px solid transparent;
    border-left: 20px solid #f6f7fb;
    position: absolute;
    right: -20px;
    top: 0;
    z-index: 10;
  }

  .navs li:before {
    content: "";
    display: block;
    border-top: 20px solid #f6f7fb;
    border-bottom: 20px solid #f6f7fb;
    border-left: 20px solid #fff;
    position: absolute;
    left: 0px;
    top: 0;
  }

  .navs li:first-child {
    border-radius: 4px 0 0 4px;
    padding-left: 25px;
  }
  .navs li:first-child:before {
    display: none;
  }

  .navs li.active {
    @include base-bg-font();
  }

  .navs li.active:after {
    @include base-active-underline($width: 20px, $types: left);
  }
  .navs li.active:before {
    content: "";
    display: block;
    @include base-active-underline($width: 20px, $types: top);
    @include base-active-underline($width: 20px, $types: bottom);
    border-left: 20px solid #fff;
    position: absolute;
    left: 0px;
    top: 0;
  }
  .navs li:first-child.active:before {
    display: none;
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
  .el-form {
    padding: 0px 50px 0 0;
  }
  /deep/.el-select {
    width: 100%;
  }
}
</style>