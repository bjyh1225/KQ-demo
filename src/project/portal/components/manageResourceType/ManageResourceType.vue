<template>
  <div class="manage-resource-type">
    <div class="resource-search">
      <div class="resource-search-left">
        <el-button
          type="primary"
          icon="el-icon-view"
          class="base-btn"
          @click="display"
        >{{$t('myCenter.Display')}}</el-button>
        <el-button
          type="primary"
          class="base-btn"
          icon="el-icon-portal-hide"
          @click="hide"
        >{{$t('myCenter.Hide')}}</el-button>
        <el-button
          type="primary"
          icon="el-icon-plus"
          @click="add"
          class="base-btn"
        >{{$t('visualization.Custom')}}</el-button>
      </div>
      <el-input
        :placeholder="$t('myCenter.PleaseEnterTheContent')"
        v-model="searchValue"
        @keyup.enter.native="getSearchInfo"
      >
        <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchValue ==''"></i>
      </el-input>
    </div>
    <div class="resource-data">
      <el-table
        :data="table_data"
        style="width: 100%; font-size: 14px;"
        @selection-change="handleSelectionChange"
        border
        :header-cell-style="{'text-align':'left'}"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column
          :label="$t('myCenter.DisplayState')"
          min-width="10%"
          :show-overflow-tooltip="true"
          align="left"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.C_STATUS"
              :active-value="1"
              :inactive-value="0"
              @change="changeSwitch(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="C_NAME"
          :label="$t('management.ResourceName')"
          min-width="15%"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="C_CODE_KEY"
          :label="$t('management.ResourceKey')"
          min-width="20%"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          prop="C_SORT_NO"
          :label="$t('management.rankId')"
          min-width="8%"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          align="left"
          prop="C_IMG"
          :label="$t('webAppBuilder.Icon')"
          min-width="6%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <i :class="scope.row.C_IMG"></i>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          prop="C_COMMENTS"
          :label="$t('management.remarks')"
          min-width="20%"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <el-table-column
          align="left"
          :label="$t('management.operate')"
          min-width="18%"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)"
              class="base-btn"
            >{{$t('myCenter.Edit')}}</el-button>
            <el-button
              size="mini"
              class="base-btn-del"
              @click="handleDelete(scope.$index, scope.row)"
              v-if="scope.row.C_IS_SYSTEM == 0"
            >{{$t('visualization.Delete')}}</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <pagination
      :total="pgoption.total"
      :page-sizes="pgoption.pagesizes"
      :pageIndex="pgoption.currentPage"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
    <manage-resource-type-dialog
      :resourceDialogVisible="resourceDialogVisible"
      @resHandleClose="resHandleClose"
      :total="total"
    ></manage-resource-type-dialog>
    <manage-resource-type-edit-dialog
      :resourceEditDialogVisible="resourceEditDialogVisible"
      @resEditHandleClose="resEditHandleClose"
      :resourceEditDialogId="resourceEditDialogId"
      :resourceEditDialogIsSystem="resourceEditDialogIsSystem"
    ></manage-resource-type-edit-dialog>
  </div>
</template>
<script>
import ManageResourceTypeDialog from "components/manageResourceType/ManageResourceTypeDialog";
import ManageResourceTypeEditDialog from "components/manageResourceType/ManageResourceTypeEditDialog";
import Pagination from "components/common/page/Pagination";

export default {
  components: {
    ManageResourceTypeDialog,
    ManageResourceTypeEditDialog,
    Pagination,
  },
  props: {
    currentTabShowStatus: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      searchValue: "",
      statusValue: true,
      resourceDialogVisible: false,
      resourceEditDialogVisible: false,
      resourceEditDialogId: "",
      size: 10,
      page: 1,
      total: "",
      resourceEditDialogIsSystem: "",
      sectionData: [],
      table_data: [],
      getSection: [],
      form: {},
      pgoption: {},
    };
  },

  methods: {
    changeSwitch(row) {
      if (row.C_STATUS == 1) {
        this.$api.manageResourceSortApi
          .getResCategoryShow(
            {
              IDS: row.C_ID,
            },
            {
              loadingText: this.$t("myCenter.Displaying"),
            }
          )
          .then((res) => {
            if (res.data.title == "显示成功") {
              this.$message({
                type: "success",
                message: this.$t(
                  "management.DisplayResourceCategoriesSuccessfully"
                ),
              });
            }
          });
      } else {
        this.$api.manageResourceSortApi
          .getResCategoryHide(
            {
              IDS: row.C_ID,
            },
            {
              loadingText: this.$t("myCenter.Hiding"),
            }
          )
          .then((res) => {
            if (res.data.title == "隐藏成功") {
              this.$message({
                type: "success",
                message: this.$t(
                  "management.HideResourceCategoriesSuccessfully"
                ),
              });
            }
          });
      }
    },
    //编辑弹窗
    handleEdit(index, row) {
      this.resourceEditDialogVisible = true;
      this.resourceEditDialogId = row.C_ID.toString();
      this.resourceEditDialogIsSystem = row.C_IS_SYSTEM.toString();
    },
    //删除弹窗
    handleDelete(index, row) {
      this.$confirm(
        this.$t(
          "management.ThisOperationWillDeleteSelectedCategoriesPermanentlyAreYouSureToContinue"
        ),
        this.$t("webAppBuilder.Tip"),
        {
          confirmButtonText: this.$t("myCenter.Sure"),
          cancelButtonText: this.$t("myCenter.cancel"),
          type: "warning",
        }
      )
        .then(() => {
          this.$api.manageResourceSortApi
            .delResoureCategory(
              {
                IDS: row.C_ID,
                isSystem: row.C_IS_SYSTEM,
                codeKey: row.C_CODE_KEY,
              },
              {
                loadingText: this.$t("myCenter.Deleting"),
              }
            )
            .then((res) => {
              if (res.data.title == "删除成功") {
                if (
                  this.total == (this.page - 1) * this.size + 1 &&
                  this.total != 0
                ) {
                  this.page -= 1;
                }
                this.$message({
                  type: "success",
                  message: this.$t("management.Deletesuccessful"),
                });
                this.getResoureCategoryList();
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    //关闭增加分类弹窗
    resHandleClose() {
      this.resourceDialogVisible = false;
      this.getResoureCategoryList();
    },
    //关闭编辑弹窗
    resEditHandleClose() {
      this.resourceEditDialogVisible = false;
      this.getResoureCategoryList();
    },
    //自定义新增分类
    add() {
      this.resourceDialogVisible = true;
    },
    //显示
    display() {
      var sectionId = "";
      this.sectionData.forEach((item) => {
        sectionId += item.C_ID += ",";
      });
      if (sectionId == "") {
        this.$message({
          message: this.$t(
            "management.PleaseTickResourceCategoriesBeforeFurtherOperations"
          ),
          type: "warning",
        });
      } else {
        this.$api.manageResourceSortApi
          .getResCategoryShow(
            {
              IDS: sectionId,
            },
            {
              loadingText: this.$t("myCenter.Displaying"),
            }
          )
          .then((res) => {
            if (res.data.title == "显示成功") {
              sectionId = "";
              this.getResoureCategoryList();
              this.$message({
                type: "success",
                message: this.$t(
                  "management.DisplayResourceCategoriesSuccessfully"
                ),
              });
            }
          })
          .catch((error) => {
            return error;
          });
      }
    },
    //隐藏
    hide() {
      var sectionIdS = "";
      this.sectionData.forEach((item) => {
        sectionIdS += item.C_ID += ",";
      });
      if (sectionIdS == "") {
        this.$message({
          message: this.$t(
            "management.PleaseTickResourceCategoriesBeforeFurtherOperations"
          ),
          type: "warning",
        });
      } else {
        this.$api.manageResourceSortApi
          .getResCategoryHide(
            {
              IDS: sectionIdS,
            },
            {
              loadingText: this.$t("myCenter.Hiding"),
            }
          )
          .then((res) => {
            if (res.data.title == "隐藏成功") {
              this.getResoureCategoryList();
              (sectionIdS = ""),
                this.$message({
                  type: "success",
                  message: this.$t(
                    "management.HideResourceCategoriesSuccessfully"
                  ),
                });
            }
          })
          .catch((error) => {
            return error;
          });
      }
    },
    //获取数据列表
    getResoureCategoryList() {
      this.$api.manageResourceSortApi
        .getResoureCategoryList(
          {
            page: this.page,
            size: this.size,
          },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          this.table_data = res.data.data.rows;
          this.total = res.data.data.total;
          this.pgoption = {
            pagesizes: [10, 20, 30, 50],
            pagesize: this.size,
            layout: "total, sizes, prev, pager, next, jumper",
            total: this.total,
            currentPage: this.page,
          };
        })
        .catch((error) => {
          return error;
        });
    },
    //查询
    getSearchInfo() {
      this.$api.manageResourceSortApi
        .getResoureCategoryList(
          {
            size: this.size,
            page: this.page,
            searchVal: this.searchValue,
          },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          this.table_data = res.data.data.rows;
          this.pgoption = {
            pagesizes: [10, 20, 30, 50],
            pagesize: this.size,
            layout: "total, sizes, prev, pager, next, jumper",
            total: this.total,
            currentPage: this.page,
          };
        })
        .catch((error) => {
          return error;
        });
    },
    handleSelectionChange(val) {
      this.sectionData = val;
    },
    handleSizeChange(val) {
      this.size = val;
      this.getResoureCategoryList();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getResoureCategoryList();
    },
  },
  created() {
    this.getResoureCategoryList();
  },
  watch: {
    currentTabShowStatus: {
      immediate: true, // immediate选项可以开启首次赋值监听
      handler(newVal) {
        if (newVal) {
          this.getResoureCategoryList();
        }
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.resource-search {
  height: 40px;
  margin-bottom: 20px;

  .resource-search-left {
    float: left;
  }

  .el-input {
    width: 30%;
    float: right;
  }
}

.resource-data {
  margin-bottom: 14px;
}
</style>