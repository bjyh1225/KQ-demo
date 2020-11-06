<template>
  <div class="recycle-list">
    <el-row class="recycle-top">
      <el-col :span="8">
        <el-button class="el-icon-delete" @click="deleteBatch">{{$t('management.deleteInBatch')}}</el-button>
        <el-button
          class="el-icon-portal-huanyuan"
          @click="resourceReduction"
        >{{$t('myCenter.RestoreInBatch')}}</el-button>
      </el-col>
      <el-col :span="16" class="right-group">
        <el-input
          :placeholder="$t('myCenter.PleaseEnterTheContent')"
          :suffix-icon="suffixIcon"
          @keyup.enter.native="searchFun"
          v-model="searchKey"
        ></el-input>
        <span
          class="sort-btn"
          :class="sortType=='DESC'?'el-icon-portal-ziyuan':'el-icon-portal-ziyuan1'"
          @click="sortFun"
        >{{$t('service.time')}}</span>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="recycleList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        ref="multipleTable"
      >
        <el-table-column type="selection" min-width="5%"></el-table-column>
        <el-table-column :label="$t('myCenter.ResourceName')" min-width="15%">
          <template slot-scope="scope">{{ scope.row.C_NAME }}</template>
        </el-table-column>
        <el-table-column prop="name" :label="$t('myCenter.Address')" min-width="40%">
          <template slot-scope="scope">{{ scope.row.C_SERVICE_URL }}</template>
        </el-table-column>
        <el-table-column prop="address" :label="$t('service.time')" min-width="20%">
          <template slot-scope="scope">{{ scope.row.C_UPDATE_TIME}}</template>
        </el-table-column>
        <el-table-column :label="$t('myCenter.Operate')" min-width="20%">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              class="base-btn"
            >{{$t('myCenter.Restore')}}</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >{{$t('management.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "PersonalCenterRecycleList",
  props: {
    recycleList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      searchKey: "", //搜索字段
      sortType: "DESC", //置顶数据
      checkData: [], //复选框选中数据
      suffixIcon: "el-icon-search"
    };
  },
  watch: {
    searchKey() {
      if (this.searchKey) {
        this.suffixIcon = "";
      } else {
        this.suffixIcon = "el-icon-search";
      }
    }
  },
  methods: {
     reset() {
      this.searchKey = "";
    },
    //搜索框
    searchFun() {
      this.$emit("searchFun", this.searchKey);
    },
    //排序
    sortFun() {
      if (this.sortType == "ASC") {
        this.sortType = "DESC";
      } else {
        this.sortType = "ASC";
      }
      this.$emit("sortFun", this.sortType);
    },
    //批量还原
    resourceReduction() {
      if (this.checkData.length <= 0) {
        this.$message({
          message: this.$t("myCenter.PleaseSelectData"),
          type: "warning"
        });
        return false;
      }
      this.$emit("resourceReduction", {
        reductionListData: this.checkData,
        reductionBool: ""
      });
    },
    //批量删除
    deleteBatch() {
      if (this.checkData.length <= 0) {
        this.$message({
          message: this.$t("myCenter.PleaseSelectData"),
          type: "warning"
        });
        return false;
      }
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          this.$emit("deleteResourceReduction", this.checkData);
        })
        .catch(() => {
          this.$refs.multipleTable.clearSelection();
        });
    },
    //复选框发生变化触发
    handleSelectionChange(val) {
      this.checkData = val;
    },
    //列表还原
    handleEdit(index, row) {
      var rowArray = [];
      rowArray.push(row);
      this.$emit("resourceReduction", {
        reductionListData: rowArray,
        reductionBool: ""
      });
    },
    //列表删除
    handleDelete(index, row) {
      var rows = [];
      rows.push(row);
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          this.$emit("deleteResourceReduction", rows);
        })
        .catch(() => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.recycle-list {
  margin-bottom: 15px;
  .recycle-top {
    height: 48px;
    line-height: 48px;
    .el-button {
      margin-left: 14px;
      padding: 10px 12px;
    }
    .right-group {
      text-align: right;
      .el-input {
        height: 32px;
        line-height: 32px;
        width: 334px;
        margin-right: 10px;
        /deep/ .el-input__inner {
          height: 32px;
          line-height: 32px;
          border-radius: 16px;
        }
        /deep/ .el-input__icon {
          line-height: 32px;
        }
      }
      .sort-btn {
        color: #606266;
        margin-right: 6px;
        cursor: pointer;
      }
    }
  }
  /deep/.el-table__header-wrapper {
    border-top: 1px solid #ebeef5;
  }
}
</style>
