<template>
  <div class="manage-dialog">
    <el-dialog
      :visible.sync="mobileDialogVisible"
      width="500px"
      :before-close="handleClose"
      @close="closeDialog"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{dialogTitle}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-col>
          <!-- 维度选择 -->
          <manage-dept
            ref="manageDeptOrg"
            class="manage-dept-loading"
            @selectChange="selectChange"
            @handleNodeClick="handleNodeClick"
            :orgDimension="orgDimension"
            :deptList="deptList"
            :height="height"
          ></manage-dept>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('management.cancel')}}</el-button>
        <el-button type="primary" class="base-btn" @click="move">{{$t('visualization.Move')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ManageDept from "components/common/manageDept/ManageDept";
export default {
  name: "ManageUserMobileDialog",
  components: { ManageDept },
  data() {
    return {
      deptList: [], //部门数据
      orgDimension: [],
      dimensionValue: "",
      height: 300,
      mobileSectorId: null
    };
  },
  props: {
    mobileDialogVisible: {
      type: Boolean,
      default: false
    },
    dialogTitle: {
      type: String,
      default() {
        return this.$t("management.MoveToDepartment");
      }
    }
  },
  watch: {
    mobileDialogVisible() {
      if (!this.mobileDialogVisible) {
        this.resetOrgDimension();
      } else {
        this.getOrgDimension();
      }
    }
  },
  methods: {
    handleClose() {
      this.$emit("mobileDialogClose");
    },
    //维度改变
    selectChange(val) {
      this.dimensionValue = val;
      this.getDepByNameAndDimension();
    },
    //选中一个节点
    handleNodeClick(data) {
      this.mobileSectorId = data.id;
    },
    //查询维度
    getOrgDimension() {
      this.resetOrgDimension();
      this.$api.dictionaryApi
        .getOrgDimension({
          loadingTarget: ".manage-dept-loading",
          loadingText: this.$t("management.searchingOrganizations")
        })
        .then(res => {
          var data = res.data.data.rows;
          data.forEach(item => {
            this.orgDimension.push({ value: item.value, label: item.text });
          });
        })
        .catch(() => {});
    },
    //根据维度查询部门
    getDepByNameAndDimension() {
      this.$api.manageOrganizationApi
        .getDepByNameAndDimension(
          { dimension: this.dimensionValue },
          {
            loadingTarget: ".manage-dept-loading",
            loadingText: this.$t("management.searchingOrganizations")
          }
        )
        .then(res => {
          var data = res.data.data;
          this.deptList = data;
        })
        .catch(() => {});
    },
    //重置维度数据
    resetOrgDimension() {
      this.dimensionValue = "";
      this.orgDimension = [];
      this.deptList = [];
    },
    move() {
      if (!this.mobileSectorId) {
        this.$message({
          message: this.$t("management.PleaseSelectADepartment"),
          type: "warning"
        });
        return false;
      } else if(this.mobileSectorId==0){
        this.$message({
          message: '默认维度不支持移动',
          type: "warning"
        });
        return false;
      }else {
        this.$emit("mobile", this.mobileSectorId);
        this.$emit("mobileDialogClose");
      }
    },
    closeDialog() {
      this.$refs.manageDeptOrg.reset();
    }
  }
};
</script>
<style lang='scss' scoped>

.manage-dialog {
  .dialog-body {
    padding-bottom: 10px;
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
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
</style>