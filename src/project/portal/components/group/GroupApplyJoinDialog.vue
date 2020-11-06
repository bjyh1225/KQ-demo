<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('group.Applytojoin')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form :model="applyJoinInfo" :label-width="'100px'" :rules="rules" ref="applyJoinForm">
          <el-form-item :label="$t('management.ApplicationReason')+':'" prop="comments">
            <el-input v-model="applyJoinInfo.comments" type="textarea"></el-input>
          </el-form-item>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="base-btn" @mousedown.native="save">{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "GroupApplyJoinDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    groupInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  watch: {
    dialogVisible() {
      if(this.dialogVisible){
        this.reset();
      }
    }
  },
  data(){
    return {
      applyJoinInfo:{
        comments:""
      },
      rules:{
        comments:[
          {required:true,message:this.$t('service.PleaseEnterYourApplicationReason'),trigger: 'blur'},
          {max:80,message:this.$t('management.Theinputcharactersmustbelessthan80'),trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    reset(){
      this.applyJoinInfo={
        comments:""
      }
    },
    handleClose() {
      this.$refs.applyJoinForm.clearValidate();
      this.$emit("dialogClose");
    },
    save(){
      this.$refs.applyJoinForm.validate(valid => {
        if (valid) {
          this.$emit("save",{
            groupId:this.groupInfo.id,
            comments:this.applyJoinInfo.comments,
            needRefresh:true
          });
        } else {
          return false;
        }
      });
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
  .el-table{
    margin-bottom:15px;
    margin-top:15px;
  }
  .pagination{
    margin-bottom:15px;
  }
}
</style>