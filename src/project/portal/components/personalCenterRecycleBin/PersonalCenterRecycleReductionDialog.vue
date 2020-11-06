<template>
  <div class="reduction-batch">
    <el-dialog :visible.sync="reductionDialog" width="800px">
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('myCenter.Restoreconflict')}}</span>
        </div>
        <div
          class="dialog-tips"
        >{{$t('myCenter.KQGISThisoperationistoreplacethecurrentcorrespondingresource')}}</div>
      </template>
      <el-table
        :data="reductionDialogData"
        style="width: 100%"
        @selection-change="reductionChange"
        height="250"
      >
        <el-table-column type="selection" min-width="5%"></el-table-column>
        <el-table-column :label="$t('myCenter.ResourceName')" min-width="20%">
          <template slot-scope="scope">{{ scope.row.C_NAME }}</template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('myCenter.Address')" min-width="50%">
          <template slot-scope="scope">{{ scope.row.C_SERVICE_URL }}</template>
        </el-table-column>
        <el-table-column prop="address" :label="$t('service.time')" min-width="25%">
          <template slot-scope="scope">{{ scope.row.C_UPDATE_TIME}}</template>
        </el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelReduction">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" @click="sureReductionBatch">{{$t('management.ok')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "PersonalCenterRecycleReductionDialog",
  props: {
    reductionDialogData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    codeKey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      reductionDialog: false,
      reductionChangeData: []
    };
  },
  watch: {
    reductionDialog() {
      if (!this.reductionDialog) {
        this.$emit("getRecyclebinDataList", this.codeKey);
      }
    }
  },
  methods: {
    //复选框选项改变时触发
    reductionChange(row) {
      this.reductionChangeData = row;
    },
    //弹框打开的回调
    openDialog() {},
    //弹框取消
    cancelReduction() {
      this.reductionDialog = false;
    },
    //弹框确定
    sureReductionBatch() {
      if (this.reductionChangeData.length <= 0) {
        this.$message({
          message: this.$t("myCenter.Pleaseticktheresourcename"),
          type: "warning"
        });
        return false;
      }
      this.reductionDialog = false;
      this.$emit("resourceReduction", {
        reductionListData: this.reductionChangeData,
        reductionBool: true
      });
    },
    reductiondialogFun(val) {
      this.reductionDialog = val;
    }
  }
};
</script>
<style lang="scss" scoped>

.reduction-batch {
  /deep/.el-dialog__header {
    padding-bottom: 0;
  }
  /deep/.el-dialog__body {
    padding: 0 20px 10px;
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
  div.dialog-tips {
    height: 60px;
    line-height: 60px;
    margin: 0px 30px;
    font-size: 14px;
    @include base-active-color();
  }
}
</style>
