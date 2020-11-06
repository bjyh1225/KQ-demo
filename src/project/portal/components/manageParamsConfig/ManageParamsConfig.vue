<template>
  <div>
    <el-row class="header">
      <el-col :span="24" class="search-area">
        <el-input
          :placeholder="$t('service.pleaseEnterKeywords')"
          v-model="searchKey"
          @keyup.enter.native="search"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchKey.length===0"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="paramsList" border>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        v-for="(item,ix) in tableCol"
        :key="ix"
      ></el-table-column>
      <el-table-column :label="$t('management.state')" min-width="10%">
        <template slot-scope="scope">
          <span v-if="scope.row.status">{{$t('management.enabled')}}</span>
          <span class="stop-status" v-else>{{$t('management.prohibit')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cz" :label="$t('management.operate')" :min-width="'15%'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            class="base-btn"
            @click="editStatus(scope.row,false)"
            v-if="scope.row.status"
          >{{$t('management.prohibit')}}</el-button>
          <el-button
            size="mini"
            class="base-btn"
            @click="editStatus(scope.row,true)"
            v-else
          >{{$t('management.enabled')}}</el-button>
          <el-button
            size="mini"
            type="danger"
            class="base-btn-del"
            @click="deleteById(scope.row)"
          >{{$t('management.delete')}}</el-button>
        </template>
      </el-table-column>
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
  name: "ManageParamsConfig",
  components: {
    Pagination
  },
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      searchKey: "",
      paramsList: [],
      tableCol: [
        {
          prop: "key",
          label: this.$t("management.KEY"),
          minWidth: "15%"
        },
        {
          prop: "name",
          label: this.$t("myCenter.Name"),
          minWidth: "15%"
        },
        {
          prop: "remark",
          label: this.$t("management.remarks"),
          minWidth: "20%"
        },
        {
          prop: "createTime",
          label: this.$t("management.creationTime"),
          minWidth: "15%"
        },
        {
          prop: "updateTime",
          label: this.$t("management.UpdateTime"),
          minWidth: "15%"
        }
      ]
    };
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal, oldVal) {
        if (newVal) {
          this.getParamsList();
        }
      }
    }
  },
  methods: {
    deleteById(row) {
      if (row.key == "visualizationInfo") {
        this.$store.dispatch("common/setEventInfo", {
          commonTimeStamp: new Date().getTime(),
          commonEventType: "refreshVisualizationData",
          commonSource: "paramsConfig",
          commonParams: {}
        });
      }
      this.$api.manageParamsApi
        .deleteById(
          { id: row.id },
          { loadingText: this.$t("management.deleting") }
        )
        .then(() => {
          this.$message({
            message: this.$t("management.Deletesuccessful"),
            type: "success"
          });
          this.getParamsList();
        })
        .catch(() => {});
    },
    getParamsList() {
      this.$api.manageParamsApi
        .getParamConfigure(
          {
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            searchVal: this.searchKey
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          var data = res.data.data;
          this.paramsList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getParamsList();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getParamsList();
    },
    search() {
      this.pageIndex = 1;
      this.getParamsList();
    },
    editStatus(row, stauts) {
      if (row.key == "visualizationInfo") {
        this.$store.dispatch("common/setEventInfo", {
          commonTimeStamp: new Date().getTime(),
          commonEventType: "refreshVisualizationData",
          commonSource: "paramsConfig",
          commonParams: {}
        });
      }
      this.$api.manageParamsApi
        .updateStatus(
          {
            id: row.id,
            status: stauts
          },
          { loadingText: this.$t("management.Modifyingstatus") }
        )
        .then(() => {
          this.$message({
            message: this.$t("management.Statusmodificationsucceeded"),
            type: "success"
          });
          this.getParamsList();
        })
        .catch(() => {});
    }
  }
  // mounted() {
  //   this.getParamsList();
  // }
};
</script>

<style lang='scss' scoped>
.header {
  margin-bottom: 10px;
  .search-area {
    text-align: right;
    .el-input {
      width: 300px;
    }
  }
}
.el-table {
  margin-bottom: 13px;
}
.pagination {
  margin-bottom: 20px;
}
.stop-status {
  color: #f56c6c;
}
</style>