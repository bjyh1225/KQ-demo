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
          <span>{{$t('management.associateToPosition')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-select
          v-model="orgPostSelection"
          multiple
          :placeholder="$t('management.pleaseSelectPosition')"
        >
          <el-option
            v-for="item in orgPostList"
            :key="item.value"
            :label="item.text"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="base-btn" @click="savePost">{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ManageUserDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    orgPostList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    isSelectionPost: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    isSelectionPost() {
      this.orgPostSelection = this.isSelectionPost;
    }
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    savePost() {
      if (this.orgPostSelection.length == 0) {
        this.$message({
          message: this.$t("management.pleaseSelectPosition"),
          type: "warning"
        });
        return false;
      }
      this.$emit("savePost", this.orgPostSelection);
    }
  },
  data() {
    return {
      orgPostSelection: []
    };
  }
};
</script>

<style lang='scss' scoped>

.manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-body {
    padding: 0px 50px 20px 50px;
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
  /deep/ .el-select {
    width: 100%;
  }
}
</style>