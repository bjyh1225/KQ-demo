<template>
  <el-row>
    <el-row class="top-container">
      <el-col :span="10">
        <el-button type="primary base-btn" icon="el-icon-plus" @click="add">{{$t('management.add')}}</el-button>
        <el-button
          type="primary base-btn"
          icon="el-icon-delete"
          @click="deleteBatch"
        >{{$t('management.deleteInBatch')}}</el-button>
      </el-col>
      <el-col :span="14">
        <el-input
          :placeholder="$t('service.pleaseEnterKeywords')"
          v-model="searchKey"
          @keyup.enter.native="search"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchKey.length===0"></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table :data="tableData" border @selection-change="selectionChange">
        <el-table-column type="selection" min-width="5%"></el-table-column>
        <el-table-column
          :prop="item.prop"
          :label="item.label"
          :min-width="item.minWidth"
          v-for="(item,ix) in tableCol"
          :key="ix"
        ></el-table-column>
      </el-table>
    </el-row>
    <pagination
      :pageIndex="pageIndex"
      :pageSize="pageSize"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
  </el-row>
</template>

<script>
import Pagination from "components/common/page/Pagination";
export default {
  name: "ManageDataDictionaryTable",
  components: {
    Pagination
  },
  props: {
    tableData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  methods: {
    selectionChange(val) {
      this.$emit("selectionChange", val);
    },
    add() {
      this.$emit("add");
    },
    deleteBatch() {
      this.$emit("deleteBatch");
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
    reset() {
      this.searchKey = "";
    }
  },
  data() {
    return {
      tableCol: [
        {
          prop: "value",
          label: this.$t("management.dictionaryReferenceCode"),
          minWidth: "10%"
        },
        {
          prop: "text",
          label: this.$t("management.dictionaryReferenceValue"),
          minWidth: "10%"
        },
        {
          prop: "sortNo",
          label: this.$t("management.dictionaryRank"),
          minWidth: "10%"
        }
      ],
      searchKey: ""
    };
  }
};
</script>

<style lang='scss' scoped>
.top-container {
  margin-bottom: 10px;
}
.el-table {
  margin-bottom: 13px;
}
</style>