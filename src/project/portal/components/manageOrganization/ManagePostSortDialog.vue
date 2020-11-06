<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('management.editPositionRank')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-form label-width="100px">
          <template v-for="(item,index) in postSortList">
            <el-col :span="12" :key="index">
              <el-form-item :label="$t('management.position')+':'">
                <el-input v-model="item.postName" disabled="disabled"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12" :key="item.id">
              <el-form-item :label="$t('management.rankId')+':'">
                <el-input-number v-model="item.sortNo" :min="1" :max="30"></el-input-number>
              </el-form-item>
            </el-col>
          </template>
        </el-form>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="base-btn" @click="save">{{$t('management.ok')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "ManagePostSortDialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    postSortList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    save() {
      this.$emit("modifyPositionSort");
    }
  },
  data() {
    return {
      formLabelWidth: "100px"
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
  /deep/ .el-cascader {
    width: 100%;
  }
  .el-form {
    padding: 0px 20px;
  }
}
</style>