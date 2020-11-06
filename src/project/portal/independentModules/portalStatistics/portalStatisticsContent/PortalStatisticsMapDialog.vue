<template>
  <div id="portal-map-dialog">
    <el-dialog
      :visible.sync="dialogPortalTableVisible"
      width="1048px"
      :close-on-click-modal="false"
    >
      <el-row class="statistics-select">
        <el-col>
          <span>{{$t('portalStatistics.Selectpersonnel')}}：</span>
          <el-select
            v-model="mineStatus"
            :placeholder="$t('myCenter.PleaseSelect')"
            multiple
            @change="selectChange"
            filterable
            popper-class="select-class"
          >
            <el-option :value="mineStatusValue" style="height: auto">
              <el-tree
                :data="ShareTree"
                show-checkbox
                node-key="onlyId"
                ref="tree"
                :render-content="renderContent"
                highlight-current
                :props="defaultProps"
                @check-change="handleCheckChange"
              ></el-tree>
            </el-option>
          </el-select>
        </el-col>
      </el-row>
      <!-- 复选框选中标记 -->
      <div class="selected-group" :class="signShow?'':'hide'">
        <span>{{$t('portalStatistics.Youhaveselected')}}：</span>
        <el-button type="primary" v-for="item in multipleSelection" :key="item.C_ID">
          {{item.C_NAME}}
          <i class="el-icon-close el-icon--right" @click="signDel(item)"></i>
        </el-button>
      </div>
      <div class="box">
        <div class="server-input">
          <!-- <span class="title">资源查询:</span> -->
          <el-input
            :placeholder="$t('portalStatistics.Queryresources')"
            v-model="inputData"
            style="width: 87%"
            @keyup.enter.native="loseFocusfun"
          >
            <i class="el-input__icon el-icon-search" slot="suffix" @click="loseFocusfun"></i>
          </el-input>
        </div>
      </div>
      <!-- 表格 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        :row-key="getRowKeys"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" min-width="8%" :reserve-selection="true"></el-table-column>
        <el-table-column prop="C_NAME" :label="$t('myCenter.MapName')" min-width="23%"></el-table-column>
        <el-table-column prop="USERNAME" :label="$t('portalStatistics.Owner')" min-width="23%"></el-table-column>
        <el-table-column prop="C_CREATE_TIME" :label="$t('management.UpdateTime')" min-width="23%"></el-table-column>
        <el-table-column :label="$t('portalStatistics.Visitss')" min-width="23%">
          <template slot-scope="scope">{{scope.row.C_HITS}}</template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <div class="portal-page">
        <span>{{totalPageTitle}}- {{totalPage}} {{$t('pagination.TradeTotal')}} {{total}} {{$t('pagination.RecordsInTotal')}}</span>
        <el-button @click="homePageClick">{{$t('pagination.First')}}</el-button>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="pageIndex"
          :page-size="pageSize"
          layout=" prev, pager, next"
          :total="total"
        ></el-pagination>
        <el-button @click="TailPageClick">{{$t('pagination.Last')}}</el-button>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="save">{{$t('management.ok')}}</el-button>
        <el-button @click="close">{{$t('management.cancel')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { getTree } from "@/utils/getTree.js";
export default {
  name: "PortalStatisticsMapDialog",
  props: {
    totalPageTitle: {
      type: String,
      default() {
        return this.$t("portalStatistics.DetailsOfHottestResources");
      }
    }
  },
  data() {
    return {
      dialogPortalTableVisible: false, //弹框隐藏
      inputData: "", //搜索框
      total: 0,
      pageSize: 10,
      signShow: false, //复选框选中标记
      multipleSelection: [], //复选框选中数据
      cacheMultipleSelection: [], //缓存一份复选框选中数据 取消后用
      pageIndex: 1,
      tableData: [],
      AllTableData: [],
      totalPage: 0, //总页数
      getRowKeys(row) {
        return row.C_ID;
      },
      mineStatus: "",
      mineStatusValue: [],
      ShareTree: [],
      defaultProps: {
        children: "children",
        label: "name"
      }
    };
  },
  watch: {
    pageIndex() {
      this.$emit("changePageIndexFun");
    },
    dialogPortalTableVisible() {
      this.inputData = "";
      setTimeout(() => {
        this.pageIndex = 1;
      }, 100);
    }
  },
  mounted() {
    this.getAuthTree();
  },
  methods: {
    // 树添加字体图标
    renderContent(h, { node, data }) {
      return (
        <span class="custom-tree-node">
          <i class={data.className}></i>
          <span style="margin-left:5px;">{node.label}</span>
        </span>
      );
    },
    getAuthTree() {
      this.$api.personalCenterServiceApi
        .getAuthTree({ loadingText: this.$t("service.searching") })
        .then(res => {
          this.personnelDetailDtoList = res.data.data.personnelDetailDtoList; //用户数据
          let orgData = res.data.data.organizationDtoList; //组织机构数据
          orgData.forEach(element => {
            element.orgId = -1;
            element.f_orgId = element.id;
          });
          this.personnelDetailDtoList.forEach(element => {
            element.onlyId = element.orgId + "-" + element.id;
            element.className = "el-icon-portal-yonghu";
          });
          let createTreeList = JSON.parse(
            JSON.stringify(this.personnelDetailDtoList)
          ).concat(JSON.parse(JSON.stringify(orgData)));
          let personOrgTree = getTree(
            createTreeList,
            "f_orgId",
            "orgId",
            "children"
          );
          let finalTree = getTree(personOrgTree, "id", "parentId", "children");
          var result = [];
          var map = {};
          finalTree.forEach(item => {
            item.onlyId = item.id;
            map[item.id] = item;
          });
          finalTree.forEach(item => {
            var parent = map[item.parentId];
            if (parent) {
              (parent.children || (parent.children = [])).push(item);
            } else {
              result.push(item);
            }
          });
          result.forEach(element => {
            element.userId = -1;
          });
          result.push({
            onlyId: -1,
            id: -1,
            name: this.$t("myCenter.Userlist")
          });
          var array = [];
          result.forEach(list => {
            array.push(list);
          });
          this.ShareTree = getTree(array, "id", "userId", "children");
        });
    },
    //select框值改变时候触发的事件
    selectChange(e) {
      var arrNew = [];
      var dataLength = this.mineStatusValue.length;
      var eleng = e.length;
      for (let i = 0; i < dataLength; i++) {
        for (let j = 0; j < eleng; j++) {
          if (e[j] === this.mineStatusValue[i].name) {
            arrNew.push(this.mineStatusValue[i]);
          }
        }
      }
      this.$refs.tree.setCheckedNodes(arrNew); //设置勾选的值
    },
    handleCheckChange(data, node, checkedNodes) {
      let res = [];
      this.$refs.tree.getCheckedNodes(true, true).forEach(item => {
        if (item.orgId && item.orgId != -1) {
          res.push(item);
        }
      });
      if (node && res.length > 10 && data.children) {
        this.$message({
          message: this.$t("portalStatistics.Youcanselect10usersatmost"),
          type: "warning"
        });
        this.$refs.tree.setCheckedKeys([]);
        return false;
      } else if (node && res.length >= 10 && !data.children) {
        this.$message({
          message: this.$t("portalStatistics.Youcanselect10usersatmost"),
          type: "warning"
        });
        var nodeKey = [];
        res.forEach(item => {
          nodeKey.push(item.onlyId);
        });
        nodeKey.splice(9, 1);
        this.$refs.tree.setCheckedKeys(nodeKey);
        return false;
      }
      let arrLabel = [];
      let arr = [];
      res.forEach(item => {
        arrLabel.push(item.name);
        arr.push(item);
      });
      this.mineStatusValue = arr;
      this.mineStatus = arrLabel;
    },

    // 地图请求
    // 获取所有服务
    selectServiceAll() {
      this.$api.portalStatisticsApi
        .selectServiceAll(
          {
            page: this.pageIndex,
            size: this.pageSize,
            searchVal: this.inputData,
            sort: "1"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.status == 200) {
            this.tableData = res.data.data.rows;
            this.pageIndex = res.data.data.pageIndex;
            this.total = res.data.data.total;
            this.totalPage = Math.ceil(this.total / this.pageSize);
            this.tableData.forEach(item => {
              this.AllTableData.unshift(item);
            });
            let obj = {};
            this.AllTableData = this.AllTableData.reduce((cur, next) => {
              obj[next.C_ID] ? "" : (obj[next.C_ID] = true && cur.push(next));
              return cur;
            }, []);
          }
        })
        .catch(() => {});
    },
    // 数据服务
    selectDataServiceAll() {
      this.$api.portalStatisticsApi
        .selectDataServiceAll(
          {
            page: this.pageIndex,
            size: this.pageSize,
            searchVal: this.inputData,
            sort: "1"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.status == 200) {
            this.tableData = res.data.data.rows;
            this.pageIndex = res.data.data.pageIndex;
            this.total = res.data.data.total;
            this.totalPage = Math.ceil(this.total / this.pageSize);
            this.tableData.forEach(item => {
              this.AllTableData.unshift(item);
            });
            let obj = {};
            this.AllTableData = this.AllTableData.reduce((cur, next) => {
              obj[next.C_ID] ? "" : (obj[next.C_ID] = true && cur.push(next));
              return cur;
            }, []);
          }
        })
        .catch(() => {});
    },
    // 功能请求
    selectFunctionServiceAll() {
      this.$api.portalStatisticsApi
        .selectFunctionServiceAll(
          {
            page: this.pageIndex,
            size: this.pageSize,
            searchVal: this.inputData,
            sort: "1"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.status == 200) {
            this.tableData = res.data.data.rows;
            this.pageIndex = res.data.data.pageIndex;
            this.total = res.data.data.total;
            this.totalPage = Math.ceil(this.total / this.pageSize);
            this.tableData.forEach(item => {
              this.AllTableData.unshift(item);
            });
            let obj = {};
            this.AllTableData = this.AllTableData.reduce((cur, next) => {
              obj[next.C_ID] ? "" : (obj[next.C_ID] = true && cur.push(next));
              return cur;
            }, []);
          }
        })
        .catch(() => {});
    },
    // app
    selectAppAll() {
      this.$api.portalStatisticsApi
        .selectAppAll(
          {
            page: this.pageIndex,
            size: this.pageSize,
            searchVal: this.inputData,
            sort: "1"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.status == 200) {
            this.tableData = res.data.data.rows;
            this.pageIndex = res.data.data.pageIndex;
            this.total = res.data.data.total;
            this.totalPage = Math.ceil(this.total / this.pageSize);
            this.tableData.forEach(item => {
              this.AllTableData.unshift(item);
            });
            let obj = {};
            this.AllTableData = this.AllTableData.reduce((cur, next) => {
              obj[next.C_ID] ? "" : (obj[next.C_ID] = true && cur.push(next));
              return cur;
            }, []);
          }
        })
        .catch(() => {});
    },
    // 文件
    fileAll() {
      this.$api.portalStatisticsApi
        .fileAll(
          {
            page: this.pageIndex,
            size: this.pageSize,
            searchVal: this.inputData,
            sort: "1"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.status == 200) {
            this.tableData = res.data.data.rows;
            this.pageIndex = res.data.data.pageIndex;
            this.total = res.data.data.total;
            this.totalPage = Math.ceil(this.total / this.pageSize);
            this.tableData.forEach(item => {
              this.AllTableData.unshift(item);
            });
            let obj = {};
            this.AllTableData = this.AllTableData.reduce((cur, next) => {
              obj[next.C_ID] ? "" : (obj[next.C_ID] = true && cur.push(next));
              return cur;
            }, []);
          }
        })
        .catch(() => {});
    },
    // getListfunctionService(val) {
    //   this.$api.serviceFunctionApi
    //     .getListfunctionService(
    //       {
    //         page: this.pageIndex,
    //         size: this.pageSize,
    //         searchVal: this.inputData,
    //         serviceClassifyParent: val,
    //         sortOrder: "1",
    //         sort: "1"
    //       },
    //       { loadingText: this.$t("service.searching") }
    //     )
    //     .then(res => {
    //       if (res.status == 200) {
    //         this.tableData = res.data.data.rows;
    //         this.pageIndex = res.data.data.pageIndex;
    //         this.total = res.data.data.total;
    //         this.totalPage = Math.ceil(this.total / this.pageSize);
    //       }
    //     })
    //     .catch(() => {});
    // },
    // 添加字体图标
    // renderHeader(h, { column }) {
    //   return h("span", [
    //     h("span", column.label),
    //     h("i", {
    //       class: "el-icon-sort",
    //       style: "margin-left:3px;font-size: 16px;cursor: pointer;",
    //       on: {
    //         click: $event => {
    //           this.bulletFramePositioning($event, column);
    //         }
    //       }
    //     })
    //   ]);
    // },
    // 弹框显示
    dialogPortalShow() {
      this.dialogPortalTableVisible = true;
      this.cacheMultipleSelection = this.multipleSelection;
      if (this.cacheMultipleSelection.length > 0) {
        this.$refs.multipleTable.clearSelection();
        this.AllTableData.forEach(item => {
          this.cacheMultipleSelection.forEach(Element => {
            if (item.C_ID === Element.C_ID) {
              this.$refs.multipleTable.toggleRowSelection(item, true);
            }
          });
        });
        // this.AllTableData=[];
      }
    },
    // 复选框标记
    handleSelectionChange(val) {
      if (val.length > 10) {
        this.$message({
          message: this.$t("portalStatistics.Youcanselect10resourcesatmost"),
          type: "warning"
        });
        this.$refs.multipleTable.toggleRowSelection(val[10], false);
        val.splice(10, 1);
      }
      this.multipleSelection = val;
      if (val.length > 0) {
        val.forEach(element => {
          this.$refs.multipleTable.toggleRowSelection(element, true);
        });
      }
      if (val.length > 0) {
        this.signShow = true;
      } else {
        this.signShow = false;
      }
    },
    // 删除数据
    signDel(val) {
      this.multipleSelection = this.multipleSelection.filter(item => {
        return item.C_ID !== val.C_ID;
      });
      // 取消表格的勾选
      if (this.cacheMultipleSelection.length > 0) {
        this.AllTableData.map(item => {
          if (item.C_ID === val.C_ID) {
            this.$refs.multipleTable.toggleRowSelection(item, false);
          }
        });
      } else {
        this.AllTableData.map(item => {
          if (item.C_ID === val.C_ID) {
            this.$refs.multipleTable.toggleRowSelection(val, false);
          }
        });
      }
    },
    // 确定
    save() {
      var dataUserIdArr = [];
      this.mineStatusValue.forEach(item => {
        dataUserIdArr.push({ id: item.id, name: item.name });
      });
      this.dialogPortalTableVisible = false;
      this.$emit("checkSelection", {
        signShow: this.signShow,
        multipleSelection: this.multipleSelection,
        dataUserId: dataUserIdArr //选择人员ID
      });
    },
    // 取消
    close() {
      this.dialogPortalTableVisible = false;
      this.multipleSelection = this.cacheMultipleSelection;
      // this.$refs.multipleTable.clearSelection();
    },
    // 点击图标排序
    // bulletFramePositioning(val) {
    //   if (val.path[0].className == "el-icon-bottom") {
    //     // 升序
    //     val.path[0].className = "el-icon-top";
    //   } else {
    //     // 降序
    //     val.path[0].className = "el-icon-bottom";
    //   }
    // },
    // 分页
    handleCurrentChange(val) {
      this.pageIndex = val;
    },
    // 首页
    homePageClick() {
      this.pageIndex = 1;
    },
    // 尾页
    TailPageClick() {
      this.pageIndex = this.totalPage;
    },
    //复选框清空
    multipleSelectionDel() {
      this.mineStatusValue = [];
      this.multipleSelection = [];
      this.$refs.multipleTable.clearSelection();
      this.$refs.tree.setCheckedKeys([]);
      // this.AllTableData = [];
    },
    // input框失去焦点查询数据
    loseFocusfun() {
      if (
        typeof this.inputData != "undefined" ||
        this.inputData != null ||
        this.inputData != ""
      ) {
        this.$emit("changePageIndexFun");
      }
    }
  }
};
</script>
<style lang="scss">
.el-select-dropdown.select-class {
  .el-select-dropdown__wrap {
    .el-select-dropdown__list {
      .el-select-dropdown__item {
        padding: 0;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
#portal-map-dialog {
  .statistics-select {
    margin-left: 30px;
    min-height: 40px;
    span {
      color: #fff;
    }
    /deep/.el-select {
      margin-left: -2px;
      height: 30px;
      width: 88%;
      margin-bottom: 10px;
      .el-select__tags {
        .el-tag.el-tag--info {
          background-color: #21426d;
          border-color: #25558a;
          color: #fff;
          .el-tag__close.el-icon-close {
            background-color: #21426d;
            color: #fff;
          }
        }
      }
      .el-input__icon {
        line-height: 0px;
      }
    }
  }
  .selected-group {
    align-items: flex-start;
    margin-left: 30px;
    opacity: 1;
    transition: 0.25s ease-out;
    transition-property: margin-bottom, height, opacity;
    line-height: 40px;
    &.hide {
      opacity: 0;
      height: 0px;
      margin-bottom: 0px;
      z-index: 9999;
    }
    span {
      color: #fff;
    }
    .el-button {
      padding: 6px 8px;
    }
    .el-button.el-button--primary,
    .el-button.el-button--primary:hover,
    .el-button.el-button--primary:focus {
      color: #fff;
      border: 1px solid #25558a;
      background: #1c2e4e;
      border-radius: 0;
      margin-bottom: 10px;
      cursor: auto;
      i:hover {
        cursor: pointer;
        color: #25558a;
      }
    }
  }
  .box {
    background-color: #21426d;
    height: 40px;
    border-top: 1px solid #25558a;
    line-height: 40px;
    .server-input {
      float: right;
      width: 40%;
    }
  }
  /deep/ .el-dialog,
  .el-pager li {
    box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.1);
    background: #1c2e4e;
    border: 1px solid #25558a;
    border-radius: 0;
  }
  /deep/.el-dialog__wrapper {
    .el-dialog__header {
      display: none;
    }
    .el-dialog__body {
      min-height: 400px;
      padding: 20px 0px;
      .el-input {
        margin-left: 2px;
        .el-input__inner {
          color: #fff;
          height: 30px;
          line-height: 30px;
          padding-left: 10px;
          border-radius: 0;
          background: transparent;
          border: 1px solid #25558a;
        }
      }
      .el-table {
        color: #adbfcf;
        background-color: #21426d;
        &::before {
          height: 0;
        }
        td,
        th.is-leaf {
          border-bottom: 1px solid #25558a;
        }
        th {
          background-color: #21426d;
          color: #fff;
          font-weight: normal;
        }
        tr {
          background-color: #1c2e4e;
        }
        td,
        th {
          padding: 10px 0;
        }
        /deep/.el-table-column--selection {
          .cell {
            padding-left: 24px;
            padding-right: 1px;
            font-weight: normal;
            .is-indeterminate,
            .is-checked {
              .el-checkbox__inner {
                background-color: #fff;
                border-color: #fff;
              }
            }
            .el-checkbox.is-checked {
              .el-checkbox__input.is-checked {
                .el-checkbox__inner::after {
                  border-color: black;
                }
              }
            }
            .el-checkbox {
              .el-checkbox__input {
                .el-checkbox__inner:hover {
                  border-color: #fff;
                }
                .el-checkbox__inner::before {
                  background-color: black;
                }
              }
            }
          }
        }
      }

      .el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: rgba(33, 66, 109, 0.3);
        color: #3691e9;
      }
    }
    .el-dialog__footer {
      padding: 8px 26px 11px;
      border-top: 1px solid #25558a;
      background-color: #21426d;
      .dialog-footer {
        .el-button {
          border-radius: 0;
          width: 82px;
          height: 30px;
          line-height: 6px;
          border: 1px solid #317dca;
          color: #fff;
          background: #1c2e4e;
          &:hover {
            background-color: #3691e9;
            border: 1px solid #317dca;
          }
        }
      }
    }
  }
  .portal-dialog-pagination {
    margin: 20px 0 0 24px;
  }
  .portal-page {
    height: 29px;
    line-height: 26px;
    font-weight: normal;
    margin: 15px 0 0 24px;
    span {
      padding-right: 14px;
      color: #fff;
      font-size: 12px;
    }
    /deep/.el-button {
      border-radius: 0px;
      height: 29px;
      width: 50px;
      line-height: 1px;
      text-align: center;
      padding: 0;
      border: 1px solid #317dca;
      background: #1c2e4e;
      color: #fff;
      font-size: 12px;
      font-weight: normal;
      &:hover {
        background-color: #3691e9;
        border: 1px solid #317dca;
      }
    }
    /deep/.el-pagination {
      display: inline-block;
      padding: 0px 10px;
      height: 29px;
      .btn-prev,
      .btn-next {
        border: 1px solid #317dca;
        background: #1c2e4e;
        color: #fff;
        height: 29px;
      }
      .btn-next {
        border-left: none;
      }
      button[disabled="disabled"] {
        background: #2a3b55;
        color: #626e7e;
      }
      /deep/.el-pager {
        .number,
        .btn-quicknext,
        .btn-quickprev {
          height: 29px;
          font-weight: normal;
          border: 1px solid #317dca;
          border-left: none;
          background: #1c2e4e;
          color: #fff;
        }
        .active {
          border: 1px solid #3691e9;
          background-color: #3691e9;
        }
      }
    }
  }
}
</style>