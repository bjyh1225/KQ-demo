<template>
  <div>
    <el-row>
      <el-col :span="leftSpan" v-if="isLeft" class="leftContainer">
        <slot name="left"></slot>
      </el-col>
      <el-col :span="rightSpan">
        <slot name="rightTop">
          <el-row class="rightTopContainer">
            <el-col :span="rightBtnSpan">
              <slot name="rightBtn">
                <el-button
                  type="primary base-btn"
                  icon="el-icon-plus"
                  @click="add"
                >{{$t('management.add')}}</el-button>
                <el-button
                  type="primary base-btn"
                  icon="el-icon-delete"
                  @click="batchDel"
                >{{$t('management.deleteInBatch')}}</el-button>
                <el-button
                  type="primary base-btn"
                  icon="el-icon-download"
                >{{$t('management.downloadTemplates')}}</el-button>
                <el-button
                  type="primary base-btn"
                  icon="el-icon-upload2"
                >{{$t('management.import')}}</el-button>
              </slot>
            </el-col>
            <el-col :span="rightSearchSpan">
              <el-input
                :placeholder="$t('service.pleaseEnterKeywords')"
                v-model="searchKey"
                @keyup.enter.native="search"
              >
                <i
                  slot="suffix"
                  class="el-input__icon el-icon-search"
                  v-show="searchKey.length===0"
                ></i>
              </el-input>
            </el-col>
          </el-row>
        </slot>
        <slot name="rightMiddle">
          <el-table :data="tableData" border @selection-change="selectionChange">
            <slot name="tableSelection" v-if="tableConf.isSelection">
              <el-table-column type="selection" min-width="5%"></el-table-column>
            </slot>
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              :min-width="item.minWidth"
              v-for="(item,ix) in tableCol"
              :key="ix"
            ></el-table-column>
            <slot name="tableOperate" v-if="tableConf.isOperate">
              <el-table-column prop="cz" :label="$t('management.operate')" :min-width="minWidth">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    class="base-btn"
                    @click="edit(scope.$index, scope.row)"
                  >{{$t('myCenter.Edit')}}</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    class="base-btn-del"
                    @click="deleteById(scope.$index, scope.row)"
                  >{{$t('management.delete')}}</el-button>
                </template>
              </el-table-column>
            </slot>
          </el-table>
        </slot>
        <slot name="rightBottom">
          <pagination
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            :total="total"
            :pageSize="pageSize"
            class="pagination"
            :pageIndex="pageIndex"
          ></pagination>
        </slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
export default {
  name: "ManageTemplate",
  components: {
    Pagination,
  },
  props: {
    isLeft: {
      //控制左边区域显示
      type: Boolean,
      default: true,
    },
    leftSpan: {
      //控制左边宽度
      type: Number,
      default: 6,
    },
    rightSpan: {
      //控制右边宽度
      type: Number,
      default: 18,
    },
    rightBtnSpan: {
      //控制右边按钮宽度
      type: Number,
      default: 14,
    },
    rightSearchSpan: {
      //控制右边搜索框宽度
      type: Number,
      default: 10,
    },
    minWidth: {
      type: String,
      default: "20%",
    },
    tableData: {
      //表格数据
      type: Array,
      default: () => {
        return [];
      },
    },
    tableCol: {
      //表格列
      type: Array,
      default: () => {
        return [];
      },
    },
    tableConf: {
      //表格配置
      type: Object,
      default: () => {
        return {
          isSelection: true,
          isOperate: true,
        };
      },
    },
    //分页信息
    pageSize: {
      type: Number,
      default: 10,
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40];
      },
    },
    total: {
      type: Number,
      default: 0,
    },
    pageIndex: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      searchKey: "",
    };
  },
  methods: {
    edit(index, row) {
      this.$emit("edit", row, index);
    },
    deleteById(index, row) {
      this.$confirm(
        this.$t("management.confirmToDelete") + "?",
        this.$t("webAppBuilder.Tip"),
        {
          type: "warning",
        }
      )
        .then(() => {
          this.$emit("deleteById", row, index);
        })
        .catch(() => {});
    },
    add() {
      this.$emit("add");
    },
    batchDel() {
      this.$emit("batchDel");
    },
    selectionChange(val) {
      this.$emit("selectionChange", val);
    },
    search() {
      this.$emit("search", this.searchKey);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    resetSearch() {
      this.searchKey = "";
    },
  },
};
</script>

<style lang='scss' scoped>
.rightTopContainer {
  padding: 0px 0px 0px 0px;
  margin-bottom: 10px;
}
.el-table {
  margin-bottom: 13px;
}
.pagination {
  margin-bottom: 30px;
}
</style>