<template>
  <div class="system-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
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
          :model="catalogueInfo"
          :label-width="'120px'"
          :rules="rules"
          ref="catalogueForm"
        >
          <el-form-item :label="'目录名称：'" prop="name">
            <el-input v-model="catalogueInfo.name" :disabled="disableStatus"></el-input>
          </el-form-item>
          <el-form-item :label="'目录别名：'">
            <el-input v-model="catalogueInfo.aliasname"></el-input>
          </el-form-item>
          <el-form-item :label="'目录描述：'">
            <el-input v-model="catalogueInfo.description" type="textarea"></el-input>
          </el-form-item>
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
  name: "ServerManagerCatalogueDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    catalogueInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    dialogTitle: {
      type: String,
      default() {
        return '添加目录';
      }
    },
    operate: {
      type: String,
      default: "add"
    }
  },
  watch: {
    operate() {
      if (this.operate == "edit") {
        this.disableStatus = true;
      } else {
        this.disableStatus = false;
      }
    }
  },
  data() {
    return {
      disableStatus:false,
      rules:{
        name:[
          {required:true,message:"请填写目录名称",trigger: 'blur'},
          {
            pattern:/^[a-z0-9_]*$/,
            message: "只能输入数字，小写字母，下划线的组合",
            trigger: 'blur'
          }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$refs.catalogueForm.clearValidate();
      this.$emit("dialogClose");
    },
    save(){
      this.$refs.catalogueForm.validate(valid => {
        if (valid) {
          this.$emit("save");
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
