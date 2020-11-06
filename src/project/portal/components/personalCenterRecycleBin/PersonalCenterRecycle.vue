<template>
  <div>
    <el-row :gutter="40">
      <el-col :span="6">
        <personal-center-recycle-sidebar @menuChange="menuChange" @defaultCodeKeyFun="defaultCodeKeyFun">
        </personal-center-recycle-sidebar>
      </el-col>
      <el-col :span="18">
        <personal-center-recycle-list ref='recycleList' @searchFun="searchFun" @sortFun="sortFun"
          :recycleList="recycleList" @resourceReduction="resourceReduction"
          @deleteResourceReduction="deleteResourceReduction"></personal-center-recycle-list>
        <!-- 分页 -->
        <pagination class="pagination" :pageSizes="pageSizes" :pageIndex="pageIndex" :total="total" :pageSize="pageSize"
          @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pagination>
      </el-col>
    </el-row>
    <personal-center-recycle-reduction-dialog :reductionDialogData="reductionDialogData" :codeKey="codeKey"
      @getRecyclebinDataList="getRecyclebinDataList" ref="reductiondialog" @resourceReduction="resourceReduction">
    </personal-center-recycle-reduction-dialog>
  </div>
</template>
<script>
  import PersonalCenterRecycleSidebar from "components/personalCenterRecycleBin/PersonalCenterRecycleSidebar";
  import PersonalCenterRecycleList from "components/personalCenterRecycleBin/PersonalCenterRecycleList";
  import Pagination from "../common/page/Pagination";
  import PersonalCenterRecycleReductionDialog from "components/personalCenterRecycleBin/PersonalCenterRecycleReductionDialog";
  export default {
    name: "PersonalCenterRecycle",
    components: {
      PersonalCenterRecycleSidebar,
      PersonalCenterRecycleList,
      Pagination,
      PersonalCenterRecycleReductionDialog
    },
    props: {},
    data() {
      return {
        pageSizes: [10, 20, 30],
        pageIndex: 1,
        total: 0,
        pageSize: 10,
        searchVal: "",
        sort: "DESC",
        recycleList: [], //右侧数据
        defaultCodeKey: "",
        codeKey: "",
        reductionDialogData: [] //弹框数据
      };
    },
    methods: {
      menuChange(menu) {
        this.reset();
        this.$refs.recycleList.reset();
        this.getRecyclebinDataList(menu);
      },
      //初始获取右侧列表数据
      getRecyclebinDataList(menu) {
        this.codeKey = menu;
        this.$api.personalCenterRecycleApi
          .getRecyclebinDataList(
            {
              codeKey: this.codeKey,
              page: this.pageIndex,
              size: this.pageSize,
              searchVal: this.searchVal,
              sort: this.sort
            },
            { loadingText: this.$t("service.searching") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.total = res.data.data.total;
              this.recycleList = res.data.data.rows;
            }
          })
          .catch(() => { });
      },
      //批量还原
      resourceReduction(val) {
        var params = [];
        val.reductionListData.forEach(element => {
          var obj = {
            C_ID: element.C_ID,
            C_SERVICE_URL: element.C_SERVICE_URL,
            USERNAME: element.USERNAME,
            C_UPDATE_TIME: element.C_UPDATE_TIME,
            C_NAME: element.C_NAME
          };
          params.push(obj);
        });
        this.$api.personalCenterRecycleApi
          .resourceReduction(
            {
              codeKey: this.codeKey,
              reductionListData: JSON.stringify(params),
              reductionBool: val.reductionBool
            },
            { loadingText: this.$t("myCenter.Restoring") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                message: this.$t("myCenter.RestoredSuccessfully"),
                type: "success"
              });
              this.getRecyclebinDataList(this.codeKey);
              this.$refs.reductiondialog.reductiondialogFun(false);
            }
          })
          .catch(error => {
            if (error.data.status == 201) {
              this.$refs.reductiondialog.reductiondialogFun(true);
              this.reductionDialogData = error.data.data;
            }
          });
      },
      //批量删除
      deleteResourceReduction(val) {
        var arr = [];
        val.forEach(item => {
          arr.push(item.C_ID);
        });
        var recycleIDS = arr.join(",");
        this.$api.personalCenterRecycleApi
          .deleteResourceReduction(
            {
              IDS: recycleIDS,
              codeKey: this.codeKey
            },
            { loadingText: this.$t("myCenter.Deleting") }
          )
          .then(res => {
            if (res.data.status == 200) {
              this.$message({
                message: this.$t("management.succeeded"),
                type: "success"
              });
            }
            this.getRecyclebinDataList(this.codeKey);
          });
      },
      //获取top搜索字段
      searchFun(val) {
        this.searchVal = val;
        this.pageIndex = 1;
        this.getRecyclebinDataList(this.codeKey);
      },
      //获取排序字段
      sortFun(val) {
        this.sort = val;
        this.pageIndex = 1;
        this.getRecyclebinDataList(this.codeKey);
      },
      //获取初始左侧codeKey
      defaultCodeKeyFun(val) {
        this.defaultCodeKey = val;
        this.getRecyclebinDataList(this.defaultCodeKey);
      },
      //当前页码  子向父传值
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getRecyclebinDataList(this.codeKey);
      },
      //每页显示的条数   子向父传值
      handleSizeChange(val) {
        this.pageSize = val;
        this.getRecyclebinDataList(this.codeKey);
      },
      reset() {
        this.pageIndex = 1;
        this.pageSize = 10;
        this.total = 0;
        this.searchVal = "";
      },
    }
  };
</script>
<style lang="scss" scoped>
  .pagination {
    margin-bottom: 15px;
  }
</style>