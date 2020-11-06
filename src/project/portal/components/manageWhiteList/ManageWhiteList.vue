<template>
  <div>
    <el-row class="service-btn-group">
      <el-col :span="14">
        <el-button
          type="primary base-btn"
          icon="el-icon-plus"
          @click="manageWhiteListAdd"
        >{{$t('management.add')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-delete"
          @click="batchDeleteMapping"
        >{{$t('management.deleteInBatch')}}</el-button>
      </el-col>
      <el-col :span="10" class="add-service-btn-group">
        <el-input
          :placeholder="$t('service.pleaseEnterKeywords')"
          v-model="searchKey"
          @keyup.enter.native="search"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchKey.length===0"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="serviceList" border @selection-change="selectionChange">
        <el-table-column type="selection" min-width="5%"></el-table-column>
        <el-table-column prop="C_PATH" :label="$t('management.Path')" min-width="25%"></el-table-column>
        <el-table-column prop="C_SERVER" :label="$t('webAppBuilder.Service')" min-width="25%"></el-table-column>
        <el-table-column prop="C_DETAILS" :label="$t('service.description')" min-width="28%"></el-table-column>
        <el-table-column :label="$t('myCenter.Operate')" min-width="22%">
          <template slot-scope="scope">
            <el-button
              type="primary base-btn"
              @click="enableDisable(scope.row,true)"
              v-if="!scope.row.C_ALLOW"
              size="mini"
            >{{$t('management.enabled')}}</el-button>
            <el-button
              type="primary base-btn"
              @click="enableDisable(scope.row,false)"
              v-else
              size="mini"
            >{{$t('management.disabled')}}</el-button>
            <el-button
              type="primary base-btn-del"
              @click="removeAntPatterns(scope.row)"
              size="mini"
            >{{$t('management.delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <pagination
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
      :pageSize="pageSize"
      :pageIndex="page"
      class="pagination"
    ></pagination>
    <manage-whiteList-dialog
      @dialogClose="dialogClose"
      :dictionaryInfo="dictionaryInfo"
      @save="saveManageWhiteList"
      :dialogVisible="dialogVisible"
      @empty="empty"
    ></manage-whiteList-dialog>
  </div>
</template>

<script>
ManageWhiteListDialog;
import Pagination from "components/common/page/Pagination";
import ManageWhiteListDialog from "components/manageWhiteList/ManageWhiteListDialog";
export default {
  name: "ManageWhiteList",
  components: {
    Pagination,
    ManageWhiteListDialog
  },
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchKey: "", //搜索框
      serviceList: [], //数据
      pageSize: 10,
      page: 1,
      total: 0,
      sortNo: "",
      dialogVisible: false, //新增弹框显示状态
      dictionaryInfo: {
        //表单
        path: "",
        server: "",
        details: ""
      },
      selectedData: [] //复选框选中Id
    };
  },
  watch: {
       currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal, oldVal) {
        if (newVal) {
          this.getAntPatternsList();
        }
      }
    }
  },
  methods: {
    // 请求   获取列表
    getAntPatternsList() {
      this.$api.manageWhiteListApi
        .getAntPatternsList({
          search: this.searchKey,
          page: this.page,
          size: this.pageSize
        })
        .then(res => {
          if (res.status == 200) {
            this.serviceList = res.data.data.data.rows;
            this.total = res.data.data.data.total;
          }
        })
        .catch(() => {});
    },
    // 请求  删除
    removeAntPatterns(val) {
      this.$api.manageWhiteListApi
        .removeAntPatterns({
          ids: val.C_ID
        })
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("management.Deletesuccessful"),
              type: "success"
            });
            this.getAntPatternsList();
          }
        })
        .catch(() => {});
    },
    // 启用  停用
    enableDisable(val, status) {
      this.$api.manageWhiteListApi
        .updateAllowStatus({ id: val.C_ID, allow: status })
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("management.Statusmodificationsucceeded"),
              type: "success"
            });
            this.getAntPatternsList();
          }
        })
        .catch(() => {});
    },
    //每页显示条数
    handleSizeChange(val) {
      this.pageSize = val;
      this.getAntPatternsList();
    },
    //当前页码
    handleCurrentChange(val) {
      this.page = val;
      this.getAntPatternsList();
    },
    // 复选框
    selectionChange(rows) {
      var array = [];
      this.selectedChange = [];
      rows.forEach(item => {
        this.selectedChange.push(item);
        array.push(item.C_ID);
      });
      this.selectedData = array.join(",");
    },
    // 弹框关闭
    dialogClose() {
      this.dialogVisible = false;
    },
    // 新增
    manageWhiteListAdd() {
      this.dialogVisible = true;
    },
    // 新增确定
    saveManageWhiteList() {
      // 验证
      this.$api.manageWhiteListApi
        .isUniqueAntPatterns(this.dictionaryInfo)
        .then(result => {
          if (!result.data.data.data) {
            this.$api.manageWhiteListApi
              .save(this.dictionaryInfo, {
                loadingText: this.$t("myCenter.Saving")
              })
              .then(res => {
                if (res.status == 200) {
                  this.$message({
                    message: this.$t("management.succeeded"),
                    type: "success"
                  });
                  this.getAntPatternsList();
                  this.dialogClose();
                  this.empty();
                }
              })
              .catch(() => {});
          } else {
            this.$message({
              message: this.$t("management.CannotAddRepeatedly"),
              type: "error"
            });
          }
        })
        .catch(() => {});
    },
    // 搜索
    search() {
      this.getAntPatternsList();
    },
    //批量删除
    batchDeleteMapping() {
      this.removeAntPatterns({ C_ID: this.selectedData });
    },
    // 清空弹框数据
    empty() {
      this.dictionaryInfo = {
        //表单
        path: "",
        server: "",
        details: ""
      };
    }
  }
};
</script>

<style lang='scss' scoped>

.add-service-btn-group {
  text-align: right;
}
.service-btn-group {
  margin-bottom: 10px;
}
.el-table {
  margin-bottom: 13px;
}
.pagination {
  margin-bottom: 30px;
}

.el-icon-view {
  color: #3691e9;
}
.el-icon-portal-hide {
  color: #dcdfe6;
}
/deep/.el-switch.is-checked .el-switch__core {
  @include base-bg-color();
}
</style>