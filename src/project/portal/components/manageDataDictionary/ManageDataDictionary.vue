<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <manage-data-dictionary-tree :treeData="treeData" @add="addDictionary" @edit="editDictionary"
        @delById="delDictionary" @handleNodeClick="treeClick" @dictionarySearch="dictionarySearch" ref="dictionaryTree">
      </manage-data-dictionary-tree>
    </el-col>
    <el-col :span="16">
      <manage-data-dictionary-table :tableData="dictionaryItemList" @add="addDictionaryItem" :pageIndex="pageIndex"
        :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange" @search="search" @deleteBatch="deleteBatch"
        @selectionChange="selectionChange" ref="dictionaryTable"></manage-data-dictionary-table>
    </el-col>
    <manage-data-dictionary-dialog :dialogVisible="dictionaryDialogVisible" @dialogClose="dialogClose"
      :dictionaryInfo="dictionaryInfo" @save="saveDictionary" :operate="operate" :dialogTitle="dialogTitle">
    </manage-data-dictionary-dialog>
    <manage-data-dictionary-item-dialog :dictionaryItemInfo="dictionaryItemInfo"
      :dialogVisible="dictionaryItemDialogVisible" @dialogClose="dialogClose" @save="saveDictionaryItem">
    </manage-data-dictionary-item-dialog>
  </el-row>
</template>

<script>
  import ManageDataDictionaryTree from "components/manageDataDictionary/ManageDataDictionaryTree";
  import ManageDataDictionaryTable from "components/manageDataDictionary/ManageDataDictionaryTable";
  import ManageDataDictionaryDialog from "components/manageDataDictionary/ManageDataDictionaryDialog";
  import ManageDataDictionaryItemDialog from "components/manageDataDictionary/ManageDataDictionaryItemDialog";
  export default {
    name: "ManageDataDictionary",
    components: {
      ManageDataDictionaryTree,
      ManageDataDictionaryTable,
      ManageDataDictionaryDialog,
      ManageDataDictionaryItemDialog
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
            this.getTreeList();
          }
        }
      }
    },
    methods: {
      dialogClose() {
        this.dictionaryDialogVisible = false;
        this.dictionaryItemDialogVisible = false;
      },
      addDictionary(data) {
        //新增字典
        this.resetDictionaryInfo();
        if (data.id == -1) {
          this.dictionaryInfo.type = "";
        } else {
          this.dictionaryInfo.type = data.name;
        }
        this.operate = "add";
        this.dialogTitle = this.$t("management.addDictionary");
        this.dictionaryDialogVisible = true;
      },
      editDictionary(data) {
        this.$api.dictionaryFunApi
          .getDicById({
            id: data.id
          }, {
            loadingText: this.$t("service.searching")
          })
          .then(res => {
            var data = res.data.data;
            this.dictionaryInfo = data;
            this.operate = "edit";
            this.dialogTitle = this.$t("management.editDictionary");
            this.dictionaryDialogVisible = true;
          })
          .catch(() => {});
      },
      addDictionaryItem() {
        //新增字典项
        this.resetDictionaryItemInfo();
        if (!this.currentDicKey) {
          this.$message({
            message: this.$t("management.pleaseSelectDictionaryBeforeAdding"),
            type: "warning"
          });
          return false;
        }
        this.dictionaryItemInfo.dicId = this.treeCheckInfo.id;
        this.dictionaryItemInfo.dicKey = this.treeCheckInfo.key;
        this.dictionaryItemInfo.dicName = this.treeCheckInfo.name;
        this.dictionaryItemDialogVisible = true;
      },
      saveDictionary() {
        this.$api.dictionaryFunApi
          .saveDicData(this.dictionaryInfo, {
            loadingText: this.$t("myCenter.Saving")
          })
          .then(() => {
            this.$message({
              message: this.$t("management.succeeded"),
              type: "success"
            });
            this.getTreeList();
            this.dialogClose();
          })
          .catch(() => {});
      },
      saveDictionaryItem() {
        this.$api.dictionaryFunApi
          .saveDicItem(this.dictionaryItemInfo, {
            loadingText: this.$t("myCenter.Saving")
          })
          .then(() => {
            this.$message({
              message: this.$t("management.succeeded"),
              type: "success"
            });
            this.getDicItem();
            this.dialogClose();
          })
          .catch(() => {});
      },
      delDictionary(data) {
        //删除数据字典
        this.$confirm(
            this.$t("management.confirmToDeleteTheDataDictionaryAndAllItsItems") +
            "？", this.$t("webAppBuilder.Tip"), {
              type: 'warning'
            }
          )
          .then(() => {
            this.$api.dictionaryFunApi
              .removeDictionary({
                id: data.id
              }, {
                loadingText: this.$t("management.deleting")
              })
              .then(() => {
                this.$message({
                  message: this.$t("management.succeeded"),
                  type: "success"
                });
                this.resetSearch();
                this.getTreeList();
              })
              .catch(() => {});
          })
          .catch(() => {});
      },
      treeClick(data) {
        //点击树的一行查询字典项
        this.treeCheckInfo = data;
        this.resetSearch();
        if (data.id < 0) {
          return false;
        }
        this.currentDicKey = data.key;
        this.getDicItem();
      },
      dictionarySearch(data) {
        //树搜索
        this.treeCheckInfo = data;
        this.currentDicKey = data.key;
        this.getDicItem();
      },
      getDicItem() {
        //查询字典项
        if (!this.currentDicKey) {
          this.$message({
            message: this.$t("management.pleaseSelectDictionaryBeforeSearching"),
            type: "warning"
          });
          return false;
        }
        var params = {
          dicKey: this.currentDicKey,
          search: this.searchKey,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        };
        this.$api.dictionaryFunApi
          .getDicItemListByDicKey(params, {
            loadingText: this.$t("service.searching")
          })
          .then(res => {
            var data = res.data.data;
            this.dictionaryItemList = data.rows;
            this.pageIndex = data.pageIndex;
            this.pageSize = data.pageSize;
            this.total = data.total;
          })
          .catch(() => {});
      },
      search(val) {
        this.searchKey = val;
        this.getDicItem();
      },
      handleCurrentChange(val) {
        this.pageIndex = val;
        this.getDicItem();
      },
      handleSizeChange(val) {
        this.pageIndex = 1;
        this.pageSize = val;
        this.getDicItem();
      },
      getTreeList() {
        this.$api.dictionaryFunApi
          .getListByType({
            type: ""
          })
          .then(res => {
            var data = res.data.data;
            var map = {};
            data.forEach(item => {
              if (map[item.type]) {
                map[item.type].children.push(item);
              } else {
                map[item.type] = JSON.parse(JSON.stringify(item));
                map[item.type].children = [];
                map[item.type].children.push(item);
              }
            });
            this.treeData = [];
            var count = -2;
            for (var i in map) {
              map[i].id = count;
              count--;
              map[i].name = map[i].type;
              this.treeData.push(map[i]);
            }
            let root = {
              id: -1,
              name: this.$t('myCenter.Dictionaryrootdirectory'),
              children: JSON.parse(JSON.stringify(this.treeData))
            }
            this.treeData = [root];
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
          this.$confirm(this.$t("management.confirmToDelete") + "？")
            .then(() => {
              var idList = [];
              this.selectList.forEach(function (value) {
                idList.push(value.id);
              });
              var ids = idList.toString();
              this.$api.dictionaryFunApi
                .batchDelDicItem({
                  ids: ids
                }, {
                  loadingText: this.$t("management.deleting")
                })
                .then(() => {
                  this.$message({
                    message: this.$t("management.succeeded"),
                    type: "success"
                  });
                  this.getDicItem();
                })
                .catch(() => {});
            })
            .catch(() => {});
        }
      },
      selectionChange(val) {
        this.selectList = val;
      },
      resetDictionaryInfo() {
        this.dictionaryInfo = {
          type: "",
          key: "",
          name: "",
          remark: ""
        };
      },
      resetDictionaryItemInfo() {
        this.dictionaryItemInfo = {
          dicId: "",
          dicKey: "",
          dicName: "",
          value: "",
          text: "",
          remark: "",
          sortNo: 1
        };
      },
      resetSearch() {
        this.dictionaryItemList = [];
        this.searchKey = "";
        this.pageIndex = 1;
        this.pageSize = 10;
        this.total = 0;
        this.currentDicKey = "";
        this.$refs.dictionaryTable.reset();
        this.$refs.dictionaryTree.reset();
      }
    },
    data() {
      return {
        treeData: [], //左侧树数据
        dictionaryDialogVisible: false,
        dictionaryItemDialogVisible: false,
        operate: "add",
        dictionaryInfo: {
          type: "",
          key: "",
          name: "",
          remark: ""
        },
        dictionaryItemInfo: {
          dicId: "",
          dicKey: "",
          dicName: "",
          value: "",
          text: "",
          remark: "",
          sortNo: 1
        },
        treeCheckInfo: {},
        dictionaryItemList: [],
        searchKey: "",
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        currentDicKey: "",
        selectList: [],
        dialogTitle: this.$t("management.addDictionary")
      };
    }
  };
</script>

<style lang='scss' scoped>
</style>