<template>
  <div class="system-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="700px"
      :modal="true"
      :close-on-click-modal="false"
      :before-close="handleClose"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>二分比例尺</span>
        </div>
      </template>
      <el-row class="dialog-body"> 
        <el-form
          :model="binaryInfo"
          :label-width="'120px'"
          :rules="rules"
          ref="binaryForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item label="起始级别：" prop="startNum">
                <el-input-number v-model="binaryInfo.startNum" :min="0" :max="23" label="请输入级别"  @change="scale"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="1:" prop="startScale">
                <el-input v-model="binaryInfo.startScale" @change="scale"></el-input>
              </el-form-item>   
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="结束级别：" prop="endNum">
                <el-input-number v-model="binaryInfo.endNum" :min="0" :max="23" label="请输入级别"  @change="scale"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="1:">
                <el-input v-model="binaryInfo.endScale" :disabled="true"></el-input>
              </el-form-item>   
            </el-col>
          </el-row>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">取消</el-button>
        <el-button type="primary" class="base-btn" @click="save">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ServerManagerBinaryDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    binaryAlgorithm:{},
    threeDScale:{}
  },
  watch: {
    dialogVisible(){
      if(this.dialogVisible){
        let r=this.binaryAlgorithm(this.threeDScale,24,'scale',false,0,23);
        this.binaryInfo={
          startNum:0,
          startScale:r[0].scaleNum.toFixed(4),
          endNum:23,
          endScale:r[23].scaleNum.toFixed(4)
        }
      }
    }
  },
  data() {
    var checkEndNum = (rule, value, callback) => {
      if(this.binaryInfo.endNum<this.binaryInfo.startNum){
        return callback(
          new Error("结束级别不能小于开始级别")
        );
      }
      else{
        return callback();
      }
    };
    var checkScale= (rule, value, callback) => {
      if(isNaN(value)){
        return callback(
          new Error("请输入数字")
        );
      }
      else{
        if(value.indexOf(".")>-1&&(value.length-value.indexOf("."))>5){
          return callback(
            new Error("只能输入到小数点后四位")
          );
        }
        let val=Number(value);
        if(val<1||val>600000000){
          return callback(
            new Error("不能小于1，不能大于600,000,000")
          );
        }
        else{
          callback();
        }
      }
    };
    return {
      binaryInfo:{
        startNum:0,
        startScale:0,
        endNum:23,
        endScale:0
      },
      rules:{
        startScale:[
          {required:true,message:"请填写比例尺",trigger: 'blur'},
          {required: true,validator: checkScale, trigger: "blur"}
        ],
        startNum:[
          {required:true,message:"请填写级别数",trigger: 'blur'}
        ],
        endNum:[
          {required:true,message:"请填写级别数",trigger: 'blur'},
          {required: true,validator: checkEndNum, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    scale(){
      this.binaryInfo.endScale="";
      if(!this.binaryInfo.startNum&&this.binaryInfo.startNum!=0){
        return false;
      }
      if(!this.binaryInfo.endNum&&this.binaryInfo.endNum!=0){
        return false;
      }
      if(this.binaryInfo.startNum>this.binaryInfo.endNum){
        return false;
      }
      if(!this.binaryInfo.startScale||isNaN(this.binaryInfo.startScale)||Number(this.binaryInfo.startScale)>600000000){
        return false;
      }
      let r=this.binaryAlgorithm(Number(this.binaryInfo.startScale),24,'scale',false,this.binaryInfo.startNum,this.binaryInfo.endNum);
      if(r[r.length-1].scaleNum<1){
        this.$message({
          type:"warning",
          message:"起始和结束比例尺值均应介于1:1和1:600,000,000之间"
        })
        return false;
      }
      this.binaryInfo.endScale=r[r.length-1].scaleNum.toFixed(4);
      return true;
    },
    save(){
      this.$refs.binaryForm.validate(valid => {
        if (valid) {
          let r=this.scale();
          if(r){  
            this.$emit("save",this.binaryInfo);
          }
        } else {
          return false;
        }
      });
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
  }
  /deep/.el-dialog__body {
    border: none;
    padding: 10px 20px;
  }
}
</style>
