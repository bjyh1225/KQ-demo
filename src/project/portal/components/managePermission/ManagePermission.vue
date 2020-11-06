<template>
  <div>
    <manage-template
      :tableData="permissionList"
      :tableCol="tableCol"
      :isLeft="isLeft"
      :leftSpan="leftSpan"
      :rightSpan="rightSpan"
      :rightBtnSpan="16"
      :rightSearchSpan="8"
      :total="total"
      :pageSize="pageSize"
      :pageIndex="pageIndex"
      :minWidth="minWidth"
      @deleteById="deleteById"
      @selectionChange="selectionChange"
      @search="search"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      @edit="edit"
    >
      <template slot="rightBtn">
        <el-button type="primary base-btn" icon="el-icon-plus" @click="add">{{$t('management.add')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-delete"
          @click="deleteBatch"
        >{{$t('management.deleteInBatch')}}</el-button>
      </template>
    </manage-template>
    <manage-permission-dialog
      :dialogTitle="dialogTitle"
      :dialogVisible="dialogVisible"
      :permissionInfo="permissionInfo"
      :operate="operate"
      @save="save"
      @dialogClose="dialogClose"
    ></manage-permission-dialog>
  </div>
</template>

<script>
import ManageTemplate from "components/template/ManageTemplate";
import ManagePermissionDialog from "components/managePermission/ManagePermissionDialog";
export default {
  name: "ManagePermission",
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false
    }
  },
  components: {
    ManageTemplate,
    ManagePermissionDialog
  },
  data() {
    return {
      dialogVisible: false,
      permissionInfo: {
        code: "",
        name: "",
        describe: "",
        sortNo: "0",
        include: [],
        includeResourceRul: "",
        includeResourceJson:""
      }, //一条记录
      operate: "add", //弹出窗操作状态
      selectList: [], //当前选中的list
      permissionList: [], //全部列表
      pageIndex: 1, //分页信息
      pageSize: 10,
      total: 0,
      searchKey: "",
      dialogTitle: this.$t("management.addPermission"),
      isLeft: false,
      leftSpan: 0,
      rightSpan: 24,
      minWidth: "12%",
      tableCol: [
        {
          prop: "code",
          label: this.$t("management.permissionCode"),
          minWidth: "15%"
        },
        {
          prop: "name",
          label: this.$t("management.permissionName"),
          minWidth: "15%"
        },
        {
          prop: "describe",
          label: this.$t("management.remarks"),
          minWidth: "25%"
        },
        {
          prop: "createTime",
          label: this.$t("management.creationTime"),
          minWidth: "18%"
        }
      ]
    };
  },
  watch: {
     currentTabShowStatus:{
        immediate: true, // immediate选项可以开启首次赋值监听
        handler(newVal, oldVal) {
            if(newVal){
              this.getPermissionByPage();
            }
        }
    }
  },
  methods: {
    //新增
    add() {
      this.dialogTitle = this.$t("management.addPermission");
      this.operate = "add";
      this.resetPermissionInfo();
      this.dialogVisible = true;
    },
    //修改
    edit(row) {
      this.$api.managePermissionApi
        .getPermissionByIds(
          { ids: row.id },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.data.data.length > 0) {
            this.resetPermissionInfo();
            var data=res.data.data[0];
            for(var key in data){
              this.permissionInfo[key]=data[key];
            }
            this.permissionInfo.include = JSON.parse(
              data.includeResourceJson
            );
            this.dialogTitle = this.$t("management.editPermission");
            this.operate = "edit";
            this.dialogVisible = true;
          } else {
            this.$message({
              message: this.$t("management.theCurrentDataNoLongerExists"),
              type: "warning"
            });
          }
        })
        .catch(() => {});
    },
    //保存
    save() {
      this.permissionInfo.includeResourceRul = JSON.stringify(this.permissionInfo.include);
      this.$api.managePermissionApi
        .save(this.permissionInfo, { loadingText: this.$t("myCenter.Saving") })
        .then(()=> {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
          this.dialogClose();
          this.pageIndex = 1;
          this.getPermissionByPage();
        })
        .catch(() => {});
    },
    //删除
    selectionChange(val) {
      this.selectList = val;
    },
    deleteById(row) {
      this.$api.managePermissionApi
        .deleteById(
          { ids: row.id },
          { loadingText: this.$t("management.deleting") }
        )
        .then(() => {
          this.$message({
            message: this.$t("management.Deletesuccessful"),
            type: "success"
          });
          this.pageIndex = 1;
          this.getPermissionByPage();
        })
        .catch(() => {});
    },
    deleteBatch() {
      if (this.selectList.length == 0) {
        this.$message({
          message: this.$t("management.pleaseSelectDataToDelete"),
          type: "warning"
        });       
        return false;
      } else {
        this.$confirm(this.$t("management.confirmToDelete") + "?")
          .then(() => {
            var idList = [];
            this.selectList.forEach(function(value) {
              idList.push(value.id);
            });
            var ids = idList.toString();
            this.$api.managePermissionApi
              .deleteById(
                { ids: ids },
                { loadingText: this.$t("management.deleting") }
              )
              .then(() => {
                this.$message({
                  message: this.$t("management.Deletesuccessful"),
                  type: "success"
                });
                this.pageIndex = 1;
                this.getPermissionByPage();
              })
              .catch(() => {});
          })
          .catch(() => {});
      }
    },
    //查询
    search(searchKey) {
      this.searchKey = searchKey;
      this.getPermissionByPage("search");
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getPermissionByPage();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getPermissionByPage();
    },
    getPermissionByPage(status) {
      var params = {};
      if (status) {
        params = {
          name: this.searchKey,
          pageIndex: 1,
          pageSize: this.pageSize
        };
      } else {
        params = {
          name: this.searchKey,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
      }
      this.$api.managePermissionApi
        .getPermissionByPage(params, {
          loadingText: this.$t("service.searching")
        })
        .then(res => {
          var data = res.data.data;
          this.permissionList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    //状态控制
    dialogClose() {
      //对话框关闭
      this.dialogVisible = false;
    },
    //重置
    resetPermissionInfo() {
      //重置记录
      this.permissionInfo = {
        code: "",
        name: "",
        describe: "",
        sortNo: "0",
        include: [],
        includeResourceRul: "",
        includeResourceJson:""
      };
    }
  }
};
</script>

<style lang='scss' scoped>
</style>