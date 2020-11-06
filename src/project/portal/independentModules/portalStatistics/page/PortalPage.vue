<template>
  <div id="portal-page">
    <span>{{$t('portalStatistics.DetailsOfHottestResources')}}- {{totalPage}} {{$t('pagination.TradeTotal')}} {{total}} {{$t('pagination.RecordsInTotal')}}</span>
    <el-button @click="homePageClick">{{$t('pagination.First')}}</el-button>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="currentIndex"
      :page-size="pageSize"
      layout=" prev, pager, next"
      :total="total"
    ></el-pagination>
    <el-button @click="TailPageClick">{{$t('pagination.Last')}}</el-button>
  </div>
</template>

<script>
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    totalPage: {
      type: Number,
      default: 0
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
    // 首页
    homePageClick() {
      this.$emit("homePageClick");
    },
    // 尾页
    TailPageClick() {
      this.$emit("TailPageClick");
    }
  }
};
</script>

<style lang='scss' scoped>
#portal-page {
  height: 29px;
  line-height: 29px;
  font-weight: normal;
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
    .btn-next.button[disabled="disabled"],
    .btn-prev.button[disabled="disabled"] {
      background: #2a3b55;
      color: #626e7e;
    }
    /deep/.el-pager {
      .number {
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
</style>