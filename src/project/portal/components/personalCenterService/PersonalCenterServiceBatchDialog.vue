<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="batchDialogVisible"
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
          :model="batchRegisterInfo"
          :label-width="formLabelWidth"
          :rules="rules"
          ref="batchRegisterForm"
        >
          <el-form-item :label="$t('myCenter.TheCategory')" prop="power">
            <el-select
              v-model="batchRegisterInfo.power"
              :placeholder="$t('myCenter.PleaseSelect')"
              ref="selectGroup"
              @change="changeSelect"
            >
              <el-option v-for="item in arr" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceType')" prop="type">
            <el-select v-model="batchRegisterInfo.type" :placeholder="$t('myCenter.PleaseSelect')">
              <el-option :label="$t('myCenter.KQGISService')" value="kqmapping"></el-option>
              <!-- <el-option :label="$t('myCenter.ArcGISService')" value="arcmapping"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('myCenter.ServiceAddress')+':'" prop="address">
            <el-col :span="16">
              <el-select
                v-model="batchRegisterInfo.url"
                 @change="changeBatchOption"
                :placeholder="$t('myCenter.PleaseSelect')"
                :disabled="batchRegisterInfo.type?false:true"
              >
                <el-option
                  v-for="list in serverArr"
                  :key="list.C_ID"
                  :label="list.C_SERVER_HTTP+'://'+list.C_SERVER_IP+':'+list.C_SERVER_PORTNUMBER"
                  :value="{value:list.C_SERVER_HTTP+'://'+list.C_SERVER_IP+':'+list.C_SERVER_PORTNUMBER,id:list.C_ID}"
                ></el-option>
              </el-select>
            </el-col>
            <el-col class="line" :span="8">{{springcloud==0?'/KQGis/rest/Manager/services/list':'/gismgr/v1/cluster/services'}}</el-col>
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
          <el-form-item :label="$t('myCenter.ServiceDescription')" prop="describe">
            <el-input v-model="batchRegisterInfo.describe" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <personal-center-service-share
        v-show="nextShow"
        ref="sharedSubmissionBatch"
        @permissionListDataBatchFun="permissionListDataBatchFun"
        :serviceName="this.batchRegisterInfo.type"
        :batchDialogVisible="batchDialogVisible"
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
  name: "ManageUserDialog",
  components: { PersonalCenterServiceShare },
  props: {
    batchDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("myCenter.RegisterServicesInBatch");
      }
    },
    arr: {
      type: Array,
      default: () => {
        return [];
      }
    },
    batchRegisterInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    serverArr: {
      type: Array,
      default: () => {
        return [];
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
    const isSelect = (rule, value, callback) => {
      if (this.batchRegisterInfo.url == "") {
        return callback(new Error(this.$t("myCenter.SelectServiceURL")));
      } else {
        callback();
      }
    };
     var checkMaperviceDescribe = (rule, value, callback) => {
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
      textPrompts: "",
      display: false, //端口号错误提示默认隐藏
      ruleForm: {
        power: "",
        type: "",
        address: "",
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
        address: [
          {
            required: true,
            validator: isSelect,
            trigger: "change"
          }
        ],
        describe:[{
            trigger: "blur",
            validator: checkMaperviceDescribe
        }]
      },
      scope: "Private",
      ywType: "mapService",
      permissionListData: [],
      sharingListData: false,
      inputValue: '',
      dynamicTags:[],
      springcloud:0
    };
  },
  watch: {
    dynamicTags(){
      this.batchRegisterInfo.keyWord=this.dynamicTags.toString();
    },
    batchDialogVisible() {
      if (!this.batchDialogVisible) {
        this.$emit("backFun");
        this.$refs.sharedSubmissionBatch.dataClearedFun();
        this.openDialog();
        this.$refs.batchRegisterForm.resetFields();
        this.dynamicTags=[];
      }
    },
    'batchRegisterInfo.keyWord'(){
      if(this.batchRegisterInfo.keyWord){
      if(this.batchRegisterInfo.keyWord.length > 0){
          this.dynamicTags=this.batchRegisterInfo.keyWord.split(",");
        }
      }
    }
  },
  methods: {
    changeSelect(val){
      this.batchRegisterInfo.power=val;
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
    //下一步
    nextStep() {
      this.$refs.batchRegisterForm.validate(valid => {
        // var portVerification = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{4}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
        // if (!portVerification.test(this.batchRegisterInfo.port)) {
        //   this.textPrompts = this.$t("myCenter.PortFormatIsIncorrect");
        //   this.display = true;
        //   return false;
        // }
        // var ipVerification = /^(?:(?:1[0-9][0-9]\.)|(?:2[0-4][0-9]\.)|(?:25[0-5]\.)|(?:[1-9][0-9]\.)|(?:[0-9]\.)){3}(?:(?:1[0-9][0-9])|(?:2[0-4][0-9])|(?:25[0-5])|(?:[1-9][0-9])|(?:[0-9]))$/;
        // if (!ipVerification.test(this.batchRegisterInfo.Ipadd)) {
        //   this.textPrompts = this.$t("myCenter.IPAddressFormatIsIncorrect");
        //   this.display = true;
        //   return false;
        // }
        if (valid) {
          this.display = false;
          this.$emit("nextStep");
          this.textPrompts = "";
        }
      });
    },
    // 上一步
    backFun() {
      this.$emit("backFun");
    },
    //弹窗关闭
    handleClose() {
      this.$emit("backFun");
      this.$emit("batchDialogClose");
      this.textPrompts = "";
    },
    changeBatchOption(val){
      this.serverArr.forEach(item=>{
        if(item.C_ID==val.id){
          this.springcloud=item.C_SPRINGCLOUD;
        }
      })
      this.batchRegisterInfo.url = val.value;
    },
    //确定
    save() {
      this.$refs.sharedSubmissionBatch.sharedSubmission({
        ywType: this.ywType,
        sourceId: null
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
      this.$refs.batchRegisterForm.validate(valid => {
        if (valid) {
          this.$emit("batchSave", {
            power: this.batchRegisterInfo.power,
            addUrl: this.springcloud==0?`${this.batchRegisterInfo.url}/KQGis/rest/Manager/services/list`:`${this.batchRegisterInfo.url}/gismgr/v1/cluster/services`,
            type: this.batchRegisterInfo.type,
            scope: this.scope,
            permissionListData: this.permissionListData,
            isReqCloud:this.springcloud==0?false:true
          });
          this.$emit("backFun");
          this.textPrompts = "";
          this.batchSuccessVisible=true;//批量成功弹框
        } else {
          return false;
        }
      });
    },
    openDialog() {
      this.$refs.batchRegisterForm.clearValidate();
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
    }}

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
  .line {
    text-align: center;
  }
  .el-form-item {
    position: relative;
    .el-form-item__error {
      color: #f56c6c;
      font-size: 12px;
      line-height: 1;
      padding-top: 4px;
      position: absolute;
      top: 100%;
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