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
          <span>编辑缩略图</span>
        </div>
      </template>
      <el-row class="dialog-body"> 
        <server-manager-thumbnail :serviceInfo="serviceInfo"></server-manager-thumbnail>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import ServerManagerThumbnail from './ServerManagerThumbnail.vue'
export default {
  name: "ServerManagerThumbnailDialog",
  components:{
    ServerManagerThumbnail
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
    }
  },
  data() {
    return {
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
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
  }
  /deep/.el-dialog__body {
    border: none;
    padding: 10px 20px;
  }
}
</style>
