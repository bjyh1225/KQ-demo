<template>
  <div>
    <el-row class="search-area">
      <el-input
        :placeholder="$t('service.pleaseEnterKeywords')"
        v-model="searchKey"
        @keyup.enter.native="search"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchKey.length===0"></i>
      </el-input>
    </el-row>
    <el-table :data="logList" border>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        v-for="(item,ix) in tableCol"
        :key="ix"
      ></el-table-column>
    </el-table>
    <pagination
      :total="total"
      :pageSize="pageSize"
      :pageIndex="pageIndex"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      class="pagination"
    ></pagination>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
export default {
  name: "ManageLog",
  components: {
    Pagination
  },
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal, oldVal) {
        if (newVal) {
          this.getLogList();
        }
      }
    }
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      searchKey: "",
      logList: [],
      tableCol: [
        {
          prop: "operation",
          label: this.$t("management.OperationContent"),
          minWidth: "15%"
        },
        {
          prop: "userName",
          label: this.$t("management.OperationUser"),
          minWidth: "10%"
        },
        {
          prop: "method",
          label: this.$t("management.MethodName"),
          minWidth: "20%"
        },
        {
          prop: "ip",
          label: this.$t("management.ClientIP"),
          minWidth: "10%"
        },
        {
          prop: "createTime",
          label: this.$t("service.time"),
          minWidth: "12%"
        },
        {
          prop: "remark",
          label: this.$t("management.remarks"),
          minWidth: "15%"
        }
      ]
    };
  },
  methods: {
    getLogList() {
      this.$api.manageOperationLogApi
        .getLogsList(
          {
            page: this.pageIndex,
            size: this.pageSize,
            search: this.searchKey
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          var data = res.data.data;
          this.logList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getLogList();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getLogList();
    },
    search() {
      this.pageIndex = 1;
      this.getLogList();
    }
  }
  // mounted() {
  //   this.getLogList();
  // }
};
</script>

<style lang='scss' scoped>
.search-area {
  text-align: right;
  margin-bottom: 10px;
  .el-input {
    width: 300px;
  }
}
.el-table {
  margin-bottom: 13px;
}
.pagination {
  margin-bottom: 20px;
}
</style>