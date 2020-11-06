<template>
  <div class="manageCustomerManagement">
    <el-row class="top">
      <el-col :span="2">
        <el-button
          class="base-btn"
          icon="el-icon-plus"
          @click="addCustomer"
        >{{$t("management.add")}}</el-button>
      </el-col>
      <el-col :span="6" :offset="16" class="search-input">
        <el-input
          v-model="searchValue"
          :placeholder="$t('service.pleaseEnterKeywords')"
          @keyup.enter.native="searchCustomer"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchValue ==''"></i>
        </el-input>
      </el-col>
    </el-row>
    <div class="main">
      <el-table :data="table_data" border>
        <el-table-column
          v-for="(item,index) in table_L"
          :key="index"
          :label="item.name"
          :prop="item.prop"
          :show-overflow-tooltip="true"
          :min-width="item.width"
        ></el-table-column>
        <el-table-column :show-overflow-tooltip="true" label="操作" min-width="18%">
          <template slot-scope="scope">
            <el-button
              @click="getList(scope.row)"
              class="base-btn"
              size="mini"
            >{{$t('management.Details')}}</el-button>
            <el-button
              class="base-btn-del"
              @click="handleDelete(scope.row)"
              size="mini"
            >{{$t("management.delete")}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :total="total"
      :page-sizes="pagesizes"
      :pageIndex="currentPage"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
    <manage-customer-management-dialog
      @getCustomerList="getCustomerList"
      :dialogCustomerVisible="dialogCustomerVisible"
      @handClose="handClose"
    ></manage-customer-management-dialog>
    <manage-customer-management-list
      :tableList="tableList"
      :dialogCustomerListVisible="dialogCustomerListVisible"
      @handListColse="handListColse"
    ></manage-customer-management-list>
  </div>
</template>
<script>
import ManageCustomerManagementDialog from "./ManageCustomerManagementDialog.vue";
import ManageCustomerManagementList from "./ManageCustomerManagementList.vue";
import Pagination from "components/common/page/Pagination";

export default {
  components: {
    ManageCustomerManagementDialog,
    ManageCustomerManagementList,
    Pagination,
  },
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal) {
        if (newVal) {
          this.getCustomerList();
        }
      },
    },
  },
  data() {
    return {
      table_L: [
        {
          name: this.$t("management.TenantName"),
          prop: "C_NAME",
          width: "10%",
        },
        {
          name: this.$t("management.TenantIdentifier"),
          prop: "C_CODE",
          width: "12%",
        },
        {
          name: this.$t("management.DatabaseType"),
          prop: "C_DB_TYPE",
          width: "12%",
        },
        {
          name: this.$t("management.Address"),
          prop: "C_DSURL",
          width: "24%",
        },
        {
          name: this.$t("management.Username"),
          prop: "C_DSUSERNAME",
          width: "12%",
        },
        {
          name: this.$t("management.Password"),
          prop: "C_DSPASSWORD",
          width: "12%",
        },
      ],
      table_data: [],
      dialogCustomerVisible: false,
      dialogCustomerListVisible: false,
      dialogCustomerListId: "",
      searchValue: "",
      total: 0,
      pagesizes: [10, 20, 30, 50],
      currentPage: 1,
      pagesize: 10,
      tableList: {},
      searchIcon: "el-icon-search",
      searchKey: true,
    };
  },
  methods: {
    //搜索
    searchCustomer() {
      this.$api.manageCustomerManagementApi
        .getCustomerList(
          {
            page: this.currentPage,
            size: this.pagesize,
            search: this.searchValue,
          },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          this.table_data = res.data.data.rows;
        });
    },
    //打开添加页面
    addCustomer() {
      this.dialogCustomerVisible = true;
    },
    //关闭添加页
    handClose() {
      this.dialogCustomerVisible = false;
    },
    //关闭详情页
    handListColse() {
      this.dialogCustomerListVisible = false;
    },
    //打开详情页
    getList(row) {
      this.$api.manageCustomerManagementApi
        .getCustomerById(
          {
            id: row.C_ID,
          },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          this.dialogCustomerListVisible = true;
          if (this.tableList) {
            this.tableList = res.data.data;
          }
        });
    },
    //获取数据
    getCustomerList() {
      this.$api.manageCustomerManagementApi
        .getCustomerList(
          {
            page: this.currentPage,
            size: this.pagesize,
          },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          this.table_data = res.data.data.rows;
          this.total = res.data.data.total;
        });
    },

    //删除
    handleDelete(row) {
      this.$confirm(
        this.$t("management.AreYouSureToDeleteThisTenant"),
        this.$t("webAppBuilder.Tip"),
        {
          confirmButtonText: this.$t("myCenter.Sure"),
          cancelButtonText: this.$t("myCenter.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          this.$api.manageCustomerManagementApi
            .deleteCustomer(
              {
                id: row.C_ID,
              },
              {
                loadingText: this.$t("management.deleting"),
              }
            )
            .then(() => {
              if (
                this.total == (this.currentPage - 1) * this.pagesize + 1 &&
                this.total != 0
              ) {
                this.currentPage -= 1;
              }
              this.$message({
                type: "success",
                message: this.$t("management.Deletesuccessful"),
              });
              this.getCustomerList();
            });
        })
        .catch(() => {});
    },
    //分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.getCustomerList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getCustomerList();
    },
  },
  created() {
    this.getCustomerList();
  },
};
</script>
<style lang="scss" scoped>
.top {
  height: 40px;
  margin-bottom: 20px;

  .search-input {
    height: 40px;
  }
}

.main {
  margin-bottom: 20px;
}
</style>