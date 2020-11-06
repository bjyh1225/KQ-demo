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
          <el-form-item :label="$t('myCenter.ServiceType')" prop="type">
            <el-select v-model="registerInfo.type" :placeholder="$t('myCenter.PleaseSelect')">
              <el-option label="影像三维服务(Imagery3DServer)" value="1"></el-option>
              <el-option label="影像三维瓦片文件(ImageryTileFile)" value="2"></el-option>
              <el-option label="地形三维服务(Terrain3DServer)" value="3"></el-option>
              <el-option label="地形三维瓦片文件(TerrainTileFile)" value="4"></el-option>
              <el-option label="模型瓦片服务(3dtiles)" value="5"></el-option>
              <el-option label="动态模型瓦片服务(3dtiles)" value="6"></el-option>
              <el-option label="STK地形" value="7"></el-option>
              <el-option label="矢量服务(GeoJson)" value="8"></el-option>
              <el-option label="谷歌 KML/KMZ" value="9"></el-option>
              <el-option label="CZML(Cesium)" value="10"></el-option>
              <el-option label="K3d服务(Cesium)" value="11"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceAddress')+':'" prop="add">
            <el-input v-model="registerInfo.add" @blur="animateWidth"></el-input>
          </el-form-item>
          <!-- 关键字 -->
         <el-form-item :label="$t('service.label')+':'" prop="keyWord" class='form-item-tag'>
            <el-row class='key-word-tag'>
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
  name: "PersonalSceneServiceDialog",
  components: { PersonalCenterServiceShare },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.Register3DServices");
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
      var checkSceneName = (rule, value, callback) => {
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
     var checkSceneDescribe = (rule, value, callback) => {
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
    var validatePass = (rule, value, callback) => {
      var addVerification = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
      if (!addVerification.test(value)) {
        callback(new Error(this.$t("myCenter.Errorsinserviceaddressformat")));
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
        describe:'',
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
        type: [
          {
            required: true,
            message: this.$t("myCenter.PleaseSelectTheServiceType"),
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
            validator:checkSceneName
          }
        ],
        describe:[{
            trigger: "blur",
            validator: checkSceneDescribe
        }]
      },
      permissionListData: [],
      scope: "Private",
      ywType: "sceneService",
      sharingListData: false,
      deleteListUserData: [],
      flag: false,
       inputValue: '',
        dynamicTags:[],
    };
  },
  watch: {
    dynamicTags(){
      this.registerInfo.keyWord=this.dynamicTags.toString();
    },
    dialogVisible() {
      if (!this.dialogVisible) {
        this.$emit("backFun");
        this.$refs.sharedSubmissionFun.dataClearedFun();
        this.openDialog();
        this.$refs.registerForm.resetFields();
        this.dynamicTags=[];
      }
    },
    'registerInfo.keyWord'(){
      if(this.registerInfo.keyWord){
      if(this.registerInfo.keyWord.length > 0){
          this.dynamicTags=this.registerInfo.keyWord.split(",");
        }
      }
    }
  },
  methods: {
    changeSelect(val){
      this.registerInfo.power=val;
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

    personalCheckData(val) {
      this.sharingListData = val;
    },
    //服务地址验证
    animateWidth() {
      if (this.registerInfo.add != null && this.registerInfo.add.length != 0) {
        this.$api.personalSceneServiceApi
          .getTypeAllListOnly({
            serviceUrl: this.registerInfo.add
          })
          .then(res => {
            if (res.status == 200) {
              if (res.data.data) {
                this.flag = true;
              } else {
                this.$message({
                  message: this.$t(
                    "myCenter.Thecurrentserviceaddressalreadyexists"
                  ),
                  type: "error"
                });
                this.flag = false;
              }
            }
          })
          .catch(() => {});
      }
    },
    //下一步
    nextStep() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          var addVerification = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
          if (!addVerification.test(this.registerInfo.add)) {
            this.textPrompts = this.$t("myCenter.Errorinserviceaddress");
            return false;
          }
          if (this.flag) {
            this.$emit("nextStep");
            this.flag = false;
          } else {
            this.$message({
              message: this.$t(
                "myCenter.Thecurrentserviceaddressalreadyexists"
              ),
              type: "error"
            });
            return false;
          }
        } else {
          this.$message({
            message: this.$t("myCenter.Pleasecompletetheserivcesbasicinfo"),
            type: "warning"
          });
        }
      });
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
        messageResourceName: this.$t('service.scene')
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
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$emit("save", {
            power: this.registerInfo.power,
            scope: this.scope,
            type: this.registerInfo.type,
            permissionListData: this.permissionListData,
            deleteListUserData: null
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