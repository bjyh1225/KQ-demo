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
          <span>{{dialogTitle}}</span>
        </div>
      </template>
      <el-row class="dialog-body"> 
        <div class="steps" v-if="editDialogStep">
          <ul>
            <li :class="{'is-active':firstStep}">常规</li>
            <li :class="{'is-active':secondStep}">缓存</li>
          </ul>
        </div>
        <div class="first-step-form" v-show="firstStep">
          <el-form
            :model="serviceInfo"
            :label-width="'120px'"
            :rules="rules"
            ref="catalogueForm"
          >
            <el-row>
              <el-col :span="scaleShow?12:24">
                <el-form-item :label="'服务名称：'">
                  <el-input v-model="serviceInfo.name" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="scaleShow?12:24">
                <el-form-item :label="'别名：'">
                  <el-input v-model="serviceInfo.aliasName"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12" v-if="scaleShow">
                <el-form-item :label="'矢量格式：'">
                  <el-select v-model="serviceInfo.vectorformat" placeholder="请选择">
                    <el-option :label="'JPG'" :value="'JPG'"></el-option>
                    <el-option :label="'PNG'" :value="'PNG'"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="scaleShow">
                <el-form-item :label="'影像格式：'">
                  <el-select v-model="serviceInfo.imageformat" placeholder="请选择">
                    <el-option :label="'JPG'" :value="'JPG'"></el-option>
                    <el-option :label="'PNG'" :value="'PNG'"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item :label="'空间范围：'" v-if="scaleShow">
              <el-input v-model="serviceInfo.rect" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item :label="'空间参考：'" v-if="scaleShow">
              <el-input v-model="serviceInfo.sr.prj" type="textarea"></el-input>
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
            ref="catalogueForm"
          >
            <el-form-item :label="'比例尺模式：'">
              <el-radio-group v-model="serviceInfo.copyScalemode" @change="scaleModeChange">
                <el-radio :label="1">自定义模式</el-radio>
                <el-radio :label="0">谷歌模式</el-radio>
                <el-radio :label="2">三维模式</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="'比例尺：'">
              <div class="add-scale">
                <el-input placeholder="添加比例尺" v-model="addScaleValue" :disabled="serviceInfo.copyScalemode!=1"></el-input>
                <el-button type="primary" class="base-btn" :disabled="serviceInfo.copyScalemode!=1" @click="addScale">添加</el-button>
              </div>
              <div class="btn-group">
                <el-button type="primary" class="base-btn" size="mini" @click="suggest">建议</el-button>
                <el-button type="primary" class="base-btn" size="mini" :disabled="serviceInfo.copyScalemode!=2" @click="binary">二分</el-button>
                <el-button type="primary" class="base-btn" size="mini" :disabled="serviceInfo.copyScalemode==1" @click="resetScale">重置</el-button>
                <el-button type="primary" class="base-btn" size="mini" @click="allStatic">全静态</el-button>
                <el-button type="primary" class="base-btn" size="mini" @click="allDynamic">全动态</el-button>
                <el-upload
                  :limit="1"
                  :multiple="false"
                  class="upload-import"
                  ref="uploadImport"
                  :accept="'.xml'"
                  :on-change="uploadChange"
                  :on-exceed="handleExceed"
                  :http-request="importScale"
                  action=""
                  :auto-upload="true"
                  :disabled="serviceInfo.copyScalemode!=1"
                  :show-file-list="false"
                  >
                  <el-button slot="trigger" type="primary" class="base-btn" size="mini" :disabled="serviceInfo.copyScalemode!=1">导入</el-button>
                </el-upload>
                <el-button type="primary" class="base-btn" size="mini" @click="exportScale">导出</el-button>
              </div>
              <el-table :data="serviceInfo.copyScales" border height="300">
                <el-table-column
                  :prop="item.prop"
                  :label="item.label"
                  :min-width="item.minWidth"
                  v-for="(item,ix) in tableCol"
                  :key="ix"
                ></el-table-column>
                <el-table-column :label="'模式'" :min-width="'30%'">
                  <template slot-scope="scope">
                    <el-select v-model="scope.row.static" placeholder="请选择" @change="staticChange">
                      <el-option :label="'静态'" :value="true"></el-option>
                      <el-option :label="'动态'" :value="false"></el-option>
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column :label="'操作'" :min-width="'10%'">
                  <template slot-scope="scope">
                    <el-button type="primary" class="base-btn" size="mini" @click="deleteScale(scope)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-form-item>
          </el-form>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose" v-if="!editDialogStep">取消</el-button>
        <el-button class="base-white-btn" @click="nextStep" v-if="firstStep&&editDialogStep">下一步</el-button>
        <el-button class="base-white-btn" @click="preStep" v-if="secondStep&&editDialogStep">上一步</el-button>
        <el-button type="primary" class="base-btn" @click="save" v-if="secondStep||!editDialogStep">确定</el-button>
        <el-button type="primary" class="base-btn" @click="save('cache')" :disabled="!hasStatic" v-if="(secondStep||!editDialogStep)&&cachePermission&&(limits['limit_cacheprocess']||serviceInfo.isowner||serviceInfo.isSuperAdmin)">缓存管理</el-button>
      </span>
    </el-dialog>
    <server-manager-scale-suggest
    :dialogVisible="scaleSuggestDialogVisible"
    :dialogTitle="scaleSuggestDialogTitle"
    :currentScaleMode="serviceInfo.copyScalemode"
    @dialogClose="scaleSuggestDialogClose"
    @save="scaleSuggestSave"
    >
    </server-manager-scale-suggest>
    <server-manager-binary-dialog
    :dialogVisible="binaryDialogVisible"
    @dialogClose="binaryDialogClose"
    :binaryAlgorithm="binaryAlgorithm"
    :threeDScale="threeDScale"
    @save="binarySave"
    >
    </server-manager-binary-dialog>
  </div>
</template>

<script>
import ServerManagerScaleSuggest from './ServerManagerScaleSuggest.vue'
import ServerManagerBinaryDialog from './ServerManagerBinaryDialog.vue'
export default {
  name: "ServerManagerEditServiceDialog",
  components:{
    ServerManagerScaleSuggest,
    ServerManagerBinaryDialog
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    serviceInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    dialogTitle: {
      type: String,
      default:'编辑服务'
    },
    serviceTypeConfig:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  watch:{
    dialogVisible(){
      if(this.dialogVisible){
        this.firstStep=true;
        this.secondStep=false;
        this.currentCustomScale=null;
        this.currentGoogleScale=null;
        this.currentThreeDScale=null;
        this.currentScaleMode=this.serviceInfo.copyScalemode;
        if(this.currentScaleMode==0){//谷歌模式
           this.currentGoogleScale=this.serviceInfo.copyScales;
        }
        else if(this.currentScaleMode==1){//自定义模式
          this.currentCustomScale=this.serviceInfo.copyScales;
        }
        else if(this.currentScaleMode==2){//三维模式
          this.currentThreeDScale=this.serviceInfo.copyScales;
        }
      }
    }
  },
  computed:{
    editDialogStep(){
      if(!this.serviceInfo.serviceType){
        return false;
      }
      if(this.serviceTypeConfig[this.serviceInfo.serviceType].editDialogStep){
        return true;
      }
      else{
        return false;
      }
    },
    cachePermission(){
      if(!this.serviceInfo.serviceType){
        return false;
      }
      if(this.serviceTypeConfig[this.serviceInfo.serviceType].serverManagerListCache){
        return true;
      }
      else{
        return false;
      }
    },
    scaleShow(){
      if(!this.serviceInfo.serviceType){
        return false;
      }
      if(this.serviceTypeConfig[this.serviceInfo.serviceType].scale){
        return true;
      }
      else{
        return false;
      }
    }
  },
  data() {
    return {
      rules:{
        name:[
          {required:true,message:"请填写目录名称",trigger: 'blur'},
          {
            pattern:/^[a-z0-9_]*$/,
            message: "只能输入数字，小写字母，下划线的组合",
            trigger: 'blur'
          }
        ]
      },
      addScaleValue:"",
      tableCol:[
        {
          prop:"id",
          label:"级别",
          minWidth:"30%"
        },
        {
          prop:"scaleHandle",
          label:"比例尺",
          minWidth:"30%"
        }
      ],
      firstStep:true,
      secondStep:false,
      googleScale:591658710.9090,
      threeDScale:590996368.1102,
      scaleSuggestDialogVisible:false,
      scaleSuggestDialogTitle:"",
      binaryDialogVisible:false,
      fileInfo:null,
      limits:JSON.parse(sessionStorage.getItem("limits")),
      hasStatic:false,
      currentScaleMode:null,//当前的比例尺模式
      currentCustomScale:null,//自定义比例尺
      currentGoogleScale:null,//谷歌比例尺
      currentThreeDScale:null//三维比例尺
    };
  },
  methods: {
    handleClose() {
      this.$refs.catalogueForm.clearValidate();
      this.$emit("dialogClose");
    },
    save(type){
      this.$emit("save",type);
    },
    nextStep(){
      this.firstStep=false;
      this.secondStep=true;
      this.updateCacheButtonStatus();
    },
    preStep(){
      this.firstStep=true;
      this.secondStep=false;
    },
    staticChange(){//静态状态改变
      this.updateCacheButtonStatus();
    },
    getCustomscale(startScale,start,end,staticType=false){
      let SCALE_K = 1000;
      let SCALE_M = SCALE_K * SCALE_K;
      let scaleArray=[
        128 * SCALE_M,
        64 * SCALE_M,
        32 * SCALE_M,
        16 * SCALE_M,
        8 * SCALE_M,
        4 * SCALE_M,
        2 * SCALE_M,
        1 * SCALE_M,
        500 * SCALE_K,
        250 * SCALE_K,
        125 * SCALE_K,
        64 * SCALE_K,
        32 * SCALE_K,
        16 * SCALE_K,
        8 * SCALE_K,
        4 * SCALE_K,
        2 * SCALE_K,
        1 * SCALE_K,
        500,
        250,
        100,
        50,
        25,
        10,
        5,
        2,
        1
      ];
      let result=[];
      let startStatus=false;
      let startNum=0;
      let len=end-start+1;
      for(let i=0;i<scaleArray.length;i++){
        if(startScale){
          if(scaleArray[i]==startScale){
            startStatus=true;
            startNum=i;
          }
          if(startStatus&&i<startNum+len){
            result.push({
              static:staticType,
              id:i-startNum,
              scale:1/scaleArray[i],
              scaleNum:scaleArray[i],
              scaleHandle:`1:${scaleArray[i].toFixed(4)}`
            })
          }
        }
        else{
          if(i<len){
            result.push({
              static:staticType,
              id:i-startNum,
              scale:1/scaleArray[i],
              scaleNum:scaleArray[i],
              scaleHandle:`1:${scaleArray[i].toFixed(4)}`
            })
          }
        }
      }
      return result;
    },
    updateCacheButtonStatus(){
      this.hasStatic=false;
      this.serviceInfo.copyScales.forEach(item=>{
        if(item.static){
          this.hasStatic=true;
        }
      })
    },
    addScale(){//添加
      if(isNaN(this.addScaleValue)){
        this.$message({
          type:"warning",
          message:"请填写1至600,000,000之间的数字"
        })
        return false;
      }
      if(Number(this.addScaleValue)<1||Number(this.addScaleValue)>600000000){
        this.$message({
          type:"warning",
          message:"请填写1至600,000,000之间的数字"
        })
        return false;
      }
      if(this.addScaleValue.indexOf(".")>-1&&(this.addScaleValue.length-this.addScaleValue.indexOf("."))>5){
        this.$message({
          type:"warning",
          message:"只能输入到小数点后四位"
        })
        return false;
      }
      let exist=false;
      this.serviceInfo.copyScales.forEach(item=>{
        if(item.scaleNum==Number(this.addScaleValue)){
          exist=true;
        }
      })
      if(exist){
        this.$message({
          type:"warning",
          message:"已存在该比例尺不能重复添加"
        })
        return false;
      }
      let scale=JSON.parse(JSON.stringify(this.serviceInfo.copyScales));
      this.addScaleValue=Number(this.addScaleValue);
      scale.push({
        static:false,
        scale:1/this.addScaleValue,
        scaleNum:this.addScaleValue.toFixed(4),
        scaleHandle:`1:${this.addScaleValue.toFixed(4)}`
      })
      scale.forEach(item=>{
        item.scaleNum=Number(item.scaleNum);
      })
      this.globalMethods.sortUtil(scale,['scaleNum'],'desc');
      scale.forEach((item,ix)=>{
        item.id=ix;
      })
      this.serviceInfo.copyScales=JSON.parse(JSON.stringify(scale));
      this.addScaleValue="";
    },
    allStatic(){//全静态
      this.serviceInfo.copyScales.forEach(item=>{
        item.static=true;
      })
      this.updateCacheButtonStatus();
    },
    allDynamic(){//全动态
      this.serviceInfo.copyScales.forEach(item=>{
        item.static=false;
      })
      this.updateCacheButtonStatus();
    },
    deleteScale(scope){//删除比例尺
      let ix=scope.$index;
      this.serviceInfo.copyScales.splice(ix,1);
      this.serviceInfo.copyScales.forEach((item,ix)=>{
        item.id=ix;
      })
      this.updateCacheButtonStatus();
    },
    scaleModeChange(val){
      if(this.currentScaleMode==0){//谷歌模式
        this.currentGoogleScale=JSON.parse(JSON.stringify(this.serviceInfo.copyScales));
      }
      else if(this.currentScaleMode==1){//自定义模式
        this.currentCustomScale=JSON.parse(JSON.stringify(this.serviceInfo.copyScales));
      }
      else if(this.currentScaleMode==2){//三维模式
        this.currentScaleMode=JSON.parse(JSON.stringify(this.serviceInfo.copyScales));
      }
      this.addScaleValue="";
      this.serviceInfo.copyScales=[];
      if(val==0){//谷歌模式
        if(this.currentGoogleScale){
          this.serviceInfo.copyScales=JSON.parse(JSON.stringify(this.currentGoogleScale));
        }
        else{
          let r=this.binaryAlgorithm(this.googleScale,24,'scale',false,0,23);
          this.serviceInfo.copyScales=r;
        }
      }
      else if(val==1){//自定义模式
        if(this.currentCustomScale){
          this.serviceInfo.copyScales=JSON.parse(JSON.stringify(this.currentCustomScale));
        }
        else{
          let r=this.getCustomscale(Number(this.serviceInfo.fullcustomscale),0,9);
          this.serviceInfo.copyScales=r;
        }
      }
      else if(val==2){//三维模式
        if(this.currentThreeDScale){
          this.serviceInfo.copyScales=JSON.parse(JSON.stringify(this.currentThreeDScale));
        }
        else{
          let r=this.binaryAlgorithm(this.threeDScale,24,'scale',false,0,23);
          this.serviceInfo.copyScales=r;
        }
      }
      this.currentScaleMode=val;
      this.updateCacheButtonStatus();
    },
    scaleSuggestSave(val){
      let mode=this.serviceInfo.copyScalemode;
      if(mode==0){
        let r=this.binaryAlgorithm(this.googleScale,24,'scale',false,val.start,val.end);
        this.serviceInfo.copyScales=r;
      }
      else if(mode==1){
        let r=this.getCustomscale(Number(this.serviceInfo.fullcustomscale),val.start,val.end);
        this.serviceInfo.copyScales=r;
      }
      else if(mode==2){
        let r=this.binaryAlgorithm(this.threeDScale,24,'scale',false,val.start,val.end);
        this.serviceInfo.copyScales=r;
      }
      this.scaleSuggestDialogClose();
      this.updateCacheButtonStatus();
    },
    resetScale(){//重置
      let val=this.serviceInfo.copyScalemode;
      if(val==0){//谷歌模式
        let r=this.binaryAlgorithm(this.googleScale,24,'scale',false,0,23);
        this.serviceInfo.copyScales=r;
      }      
      else if(val==2){//三维模式
        let r=this.binaryAlgorithm(this.threeDScale,24,'scale',false,0,23);
        this.serviceInfo.copyScales=r;
      }
      this.updateCacheButtonStatus();
    },
    exportScale(){//导出比例尺
      let params=[];
      this.serviceInfo.copyScales.forEach(item=>{
        params.push({
          static:item.static,
          scale:item.scale,
          id:item.id
        })
      })
      this.$api.serverManageApi.downloadScaleFile({
          isDownload: true,
          scales:params
        },{
          loadingText:"导出中"         
        }
      )
      .then(data => {
        var filePath = data.data.data.message; //download/ScaleFile.xml             
        var src=this.$path_servermanager_downloadScaleFilePath().path +
          "?filename=" +
          filePath;
        var elemIF = document.createElement('a');
        elemIF.href = src;
        elemIF.style.display = 'none';
        document.body.appendChild(elemIF);
        elemIF.click();
        elemIF.remove();
        this.$message({
          type:"success",
          message:"导出成功"
        })
      })
    },
    suggest(){//建议
      this.scaleSuggestDialogVisible=true;
      if(this.serviceInfo.copyScalemode==1){
        this.scaleSuggestDialogTitle="比例尺级别";
      }
      else{
        this.scaleSuggestDialogTitle="比例尺级别范围";
      }
    },
    scaleSuggestDialogClose(){
      this.scaleSuggestDialogVisible=false;
    },
    binary(){//二分
      this.binaryDialogVisible=true;
    },
    binaryDialogClose(){
      this.binaryDialogVisible=false;
    },
    binarySave(val){
      let r=this.binaryAlgorithm(Number(val.startScale),24,'scale',false,val.startNum,val.endNum);
      this.serviceInfo.copyScales=r;
      this.binaryDialogClose();
      this.updateCacheButtonStatus();
    },
    binaryAlgorithm(max,num,type,staticType,start,end){//二分算法
      let result=[];
      let current;
      for(var i=0;i<num;i++){
        if(i==0){
          current=max;
        }
        else{
          current=(current/2);
        }  
        if(i>=start&&i<=end){
          if(type=='scale'){//比例
            result.push({
              static:staticType,
              id:i,
              scale:1/current,
              scaleNum:current,
              scaleHandle:`1:${current.toFixed(4)}`
            })
          }
          else{//计算后的
            let num=(1/current).toFixed(4);
            result.push({
              static:staticType,
              id:i,
              scale:current,
              scaleNum:num,
              scaleHandle:`1:${num}`
            })
          }
        }
      }
      return result;
    },
    uploadChange(file){//上传文件改变
      if(file.name.indexOf(".xml")<0){
        this.$message({
          type:"warning",
          message:"只能选择.xml格式的文件"
        })
        this.$refs.uploadImport.clearFiles();
        return false;
      }
      if (file.raw) {
        this.fileInfo= file.raw;
      } else {
        this.fileInfo= file;
      }
    },
    handleExceed(){
      this.$message({
        type:"warning",
        message:"只能选择一个.xml格式的文件"
      })
    },
    importScale(){
      this.$refs.uploadImport.clearFiles();
      let params = new window.FormData();
      params.append("dataFile", this.fileInfo);
      this.$api.serverManageApi.uploadScaleFile(params,{
        loadingText:"导入中"         
      }
      ).then(res=>{
        let data=res.data.data;
        if(data.message&&data.message.scale){
          let scales=data.message.scale;
          this.globalMethods.sortUtil(scales,['scale'],'desc');
          scales.forEach((item,ix)=>{
            let num=(1/item.scale);
            // item.static=item.astatic;
            item.scaleNum=item.scale;
            item.scaleHandle=`1:${item.scale.toFixed(4)}`;
            item.scale=num;
            item.id=ix;
          })
          this.serviceInfo.copyScales=scales;
          this.updateCacheButtonStatus();
        }
      })
    }
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
    padding: 0 20px;
    border-bottom: 1px solid #ebeef5;
    .steps{
      background:#f6f7fb;
      height: 40px;
      border-radius: 0 4px 4px 0;
      margin-bottom:20px;
      ul{
        list-style:none;
        margin:0;
        padding:0;
        font-size:0;
        li{
          font-size:14px;
          display:inline-block;
          height:40px;
          line-height:40px;
          padding:0 10px 0 30px;
          color:#3691e9;
          position: relative;
          &::after{
            content:'';
            position:absolute;  
            right:-20px;
            border-left:20px solid #f6f7fb;
            border-top:20px solid transparent;
            border-bottom:20px solid transparent;
            z-index:1;
          }
        }
        .is-active{
          background:#3691e9;
          color:#fff;
          &::after{
            border-left:20px solid #3691e9;
          }
        }
      }
    }
    .add-scale{
      font-size:0;
      .el-input{
        width:500px;
        /deep/.el-input__inner{
          height:30px;
          border-radius:0;
        }
      }
      .el-button{
        padding: 0 10px;
        height: 30px;
        line-height: 28px;
        border-radius: 0;
        margin-right:20px;
      }
    }
    .btn-group{
      margin-bottom:10px;
      margin-right:10px;
    }
    .el-select{
      width:100%;
    }
    .upload-import{
      display: inline-block;
      padding: 0 10px;
    }
  }
  /deep/.el-dialog__body {
    border: none;
    padding: 10px 20px;
  }
}
</style>
