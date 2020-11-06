<template>
  <div class="system-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="500px"
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
        <el-form
          :model="scaleSuggestInfo"
          :label-width="'120px'"
          :rules="rules"
          ref="scaleSuggestForm"
        >
          <div v-if="currentScaleMode==1">
            <el-form-item label="需要级别数：" prop="needNum">
              <el-input-number v-model="scaleSuggestInfo.needNum" :min="1" :max="24" label="请输入级别"></el-input-number>
            </el-form-item>
          </div>
          <div v-else>
            <el-form-item label="起始级别：" prop="startNum">
              <el-input-number v-model="scaleSuggestInfo.startNum" :min="0" :max="23" label="请输入级别"></el-input-number>
            </el-form-item>
            <el-form-item label="结束级别：" prop="endNum">
              <el-input-number v-model="scaleSuggestInfo.endNum" :min="0" :max="23" label="请输入级别"></el-input-number>
            </el-form-item>
          </div>
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
  name: "ServerManagerScaleSuggest",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    dialogTitle: {
      type: String,
      default:'比例尺级别'
    },
    currentScaleMode:{}
  },
  watch: {
    dialogVisible(){
      if(this.dialogVisible){
        this.scaleSuggestInfo.needNum=1;
        this.scaleSuggestInfo.startNum=0;
        this.scaleSuggestInfo.endNum=23;
      }
    }
  },
  data() {
    var checkEndNum = (rule, value, callback) => {
      if(this.scaleSuggestInfo.endNum<this.scaleSuggestInfo.startNum){
        return callback(
          new Error("结束级别不能小于开始级别")
        );
      }
      else{
        return callback();
      }
    };
    return {
      rules:{
        needNum:[
          {required:true,message:"请填写级别数",trigger: 'blur'}
        ],
        startNum:[
          {required:true,message:"请填写级别数",trigger: 'blur'}
        ],
        endNum:[
          {required:true,message:"请填写级别数",trigger: 'blur'},
          {required: true,validator: checkEndNum, trigger: "blur" }
        ]
      },
      scaleSuggestInfo:{
        needNum:1,
        startNum:0,
        endNum:23
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.scaleSuggestForm.clearValidate();
      this.$emit("dialogClose");
    },
    save(){
      this.$refs.scaleSuggestForm.validate(valid => {
        if (valid) {
          let val={}
          if(this.currentScaleMode==1){
            val.start=0;
            val.end=this.scaleSuggestInfo.needNum-1;
          }
          else{
            val.start=this.scaleSuggestInfo.startNum;
            val.end=this.scaleSuggestInfo.endNum;
          }
          this.$emit("save",val);
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
