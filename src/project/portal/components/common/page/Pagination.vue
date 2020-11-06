<template>
  <div :class="classStyle">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentIndex"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30, 40];
      }
    },
    total: {
      type: Number,
      default: 0
    },
    classStyle: {
      type: String,
      default: "common-pagination"
    },
    pageIndex: {
      type: Number,
      default: 1
    }
  },
  watch: {
    pageIndex() {
      this.currentIndex = this.pageIndex;
    }
  },
  data() {
    return {
      currentIndex: 1
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handlePageIndexChange(val) {
      this.currentIndex = val;
    }
  }
};
</script>

<style lang='scss' scoped>

.el-pagination {
  /deep/button {
    @include base-pagination();
  }
  /deep/button[disabled="disabled"] {
    @include base-disable-pagination();
  }
  /deep/.el-pager {
    .number {
      @include base-pagination();
      margin-right: 10px;
      font-weight: normal;
    }
    .number:nth-child(1) {
      margin-left: 10px;
    }
    .active {
      @include base-active-pagination();
    }
    /deep/ .btn-quickprev {
      @include base-pagination();
      margin-right: 10px;
      &:hover {
        @include base-active-color();
      }
    }
    /deep/ .btn-quicknext {
      @include base-pagination();
      margin-right: 10px;
      &:hover {
        @include base-active-color();
      }
    }
  }
}
</style>