<template>
  <div>
    <el-row class="header">
      <el-col :span="12">
        <el-button type="primary base-btn" @click="addServer">{{$t('management.RegisterServer')}}</el-button>
      </el-col>
      <el-col :span="12" class="search-area">
        <el-input
          :placeholder="$t('service.pleaseEnterKeywords')"
          v-model="searchKey"
          @keyup.enter.native="search"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchKey.length===0"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-table :data="serverList" border>
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :min-width="item.minWidth"
        v-for="(item,ix) in tableCol"
        :key="ix"
      ></el-table-column>
      <el-table-column prop="springClound" :label="$t('management.MicroService')" :min-width="'8%'">
        <template slot-scope="scope">
          <span v-if="scope.row.springCloud=='1'">{{$t('webAppBuilder.Yes')}}</span>
          <span v-else>{{$t('webAppBuilder.No')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="springClound" :label="$t('management.Proxy')" :min-width="'8%'">
        <template slot-scope="scope">
          <span v-if="scope.row.proxyServer=='1'">{{$t('webAppBuilder.Yes')}}</span>
          <span v-else>{{$t('webAppBuilder.No')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="springClound" :label="$t('management.Hosting')" :min-width="'8%'">
        <template slot-scope="scope">
          <span v-if="scope.row.trusteeship=='1'">{{$t('webAppBuilder.Yes')}}</span>
          <span v-else>{{$t('webAppBuilder.No')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="springClound" :label="$t('management.Listening')" :min-width="'8%'">
        <template slot-scope="scope">
          <span v-if="scope.row.monitored=='1'">{{$t('webAppBuilder.Yes')}}</span>
          <span v-else>{{$t('webAppBuilder.No')}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cz" :label="$t('management.operate')" :min-width="'7%'">
        <template slot-scope="scope">
          <el-dropdown class="switch-operate" @command="operateCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-portal-more el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="token" :info="scope.row" v-if="scope.row.proxyServer=='1'"></el-dropdown-item>
              <!-- <el-dropdown-item command="open" :info="scope.row">{{$t('management.Manage')}}</el-dropdown-item> -->
              <el-dropdown-item command="edit" :info="scope.row.id">{{$t('myCenter.Edit')}}</el-dropdown-item>
              <el-dropdown-item
                command="deleteById"
                :info="scope.row.id"
              >{{$t('management.delete')}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
    <manage-server-dialog
      :dialogVisible="dialogVisible"
      :dialogTitle="dialogTitle"
      @dialogClose="close"
      :serverInfo="serverInfo"
      @save="save"
      :operate="operate"
    ></manage-server-dialog>
    <manage-proxy-server-token-dialog
      :dialogVisible="tokenDialogVisible"
      @dialogClose="tokenDialogClose"
      :serverHttpInfo="serverHttpInfo"
    ></manage-proxy-server-token-dialog>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
import ManageServerDialog from "./ManageServerDialog";
import ManageProxyServerTokenDialog from "components/manageProxyServer/ManageProxyServerTokenDialog";
export default {
  name: "ManageLog",
  components: {
    Pagination,
    ManageServerDialog,
    ManageProxyServerTokenDialog,
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
          this.reset();
          this.getServerList();
        }
      },
    },
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 10,
      total: 0,
      searchKey: "",
      serverList: [],
      serverInfo: {
        id: "",
        name: "",
        serverIp: "",
        serverPortnumber: "",
        comments: "",
        springCloud: "0",
        trusteeship: "0",
        monitored: "0",
        proxyServer: "0",
        sortNo: "1",
      }, //服务器信息
      tableCol: [
        {
          prop: "name",
          label: this.$t("management.ServerName"),
          minWidth: "10%",
        },
        {
          prop: "serverHttp",
          label: this.$t("management.HTTPProtocol"),
          minWidth: "10%",
        },
        {
          prop: "serverIp",
          label: this.$t("management.ServerIP"),
          minWidth: "10%",
        },
        {
          prop: "serverPortnumber",
          label: this.$t("management.ServerPort"),
          minWidth: "10%",
        },
        {
          prop: "comments",
          label: this.$t("management.remarks"),
          minWidth: "10%",
        },
      ],
      dialogVisible: false,
      dialogTitle: this.$t("management.RegisterServer"),
      operate: "add",
      tokenDialogVisible: false,
      serverHttpInfo: {},
    };
  },
  methods: {
    operateCommand(command, $item) {
      switch (command) {
        case "token":
          this.serverHttpInfo = {
            serverHttp: $item.$attrs.info.serverHttp,
            serverIp: $item.$attrs.info.serverIp,
            serverPortnumber: $item.$attrs.info.serverPortnumber,
          };
          this.tokenDialogVisible = true;
          break;
        case "open":
          this.open($item.$attrs.info);
          break;
        case "deleteById":
          this.deleteById($item.$attrs.info);
          break;
        default:
          break;
        case "edit":
          this.edit($item.$attrs.info);
          break;
      }
    },
    addServer() {
      this.serverInfo = {
        id: "",
        name: "",
        serverIp: "",
        serverPortnumber: "",
        comments: "",
        springCloud: "0",
        trusteeship: "0",
        monitored: "0",
        proxyServer: "0",
        sortNo: "1",
      };
      this.operate = "add";
      this.dialogTitle = this.$t("management.RegisterServer");
      this.dialogVisible = true;
    },
    close() {
      this.dialogVisible = false;
    },
    tokenDialogClose() {
      this.tokenDialogVisible = false;
    },
    save() {
      this.$api.manageServerApi
        .saveServer(this.serverInfo, {
          loadingText: this.$t("myCenter.Saving"),
        })
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success",
          });
          this.close();
          this.getServerList();
        })
        .catch(() => {});
    },
    edit(id) {
      this.$api.manageServerApi
        .getServerById(
          {
            id: id,
          },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          var data = res.data.data;
          this.serverInfo = data;
          if (!data.springCloud) {
            data.springCloud = "0";
          }
          if (!data.trusteeship) {
            data.trusteeship = "0";
          }
          if (!data.monitored) {
            data.monitored = "0";
          }
          if (!data.proxyServer) {
            data.proxyServer = "0";
          }
          this.operate = "edit";
          this.dialogTitle = this.$t("management.EditServer");
          this.dialogVisible = true;
        })
        .catch(() => {});
    },
    deleteById(id) {
      this.$confirm(this.$t("management.confirmToDelete") + "?")
        .then(() => {
          this.$api.manageServerApi
            .deleteServiceId(
              { id: id },
              { loadingText: this.$t("management.deleting") }
            )
            .then(() => {
              this.$message({
                message: this.$t("management.Deletesuccessful"),
                type: "success",
              });
              this.getServerList();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    getServerList() {
      this.$api.manageServerApi
        .getListServerData(
          {
            page: this.pageIndex,
            size: this.pageSize,
            searchVal: this.searchKey,
          },
          { loadingText: this.$t("service.searching") }
        )
        .then((res) => {
          var data = res.data.data;
          this.serverList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getServerList();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getServerList();
    },
    search() {
      this.pageIndex = 1;
      this.getServerList();
    },
    open(row) {
      var url =
        row.serverHttp +
        "://" +
        row.serverIp +
        ":" +
        row.serverPortnumber +
        "/kqServer?";
      var params = "kqportal-sso-servermanager-";
      params = window.btoa(unescape(encodeURIComponent(params)));
      url = url + "loginType=" + params;
      window.open(url);
    },
    reset() {
      this.searchKey = "";
      this.pageIndex = 1;
      this.pageSize = 10;
      this.total = 0;
    },
  },
  mounted() {
    this.getServerList();
  },
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
</style>