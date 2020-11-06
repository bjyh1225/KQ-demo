<template>
  <div class="content">
    <div class="details-chart">
      <span class="chart-stand"></span>
      <span class="chart">{{titleData}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "PortalStatisticsContentTitle",
  props: {
    titleData: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss" scoped>

.content {
  margin-top: 24px;
  .details-chart {
    height: 36px;
    display: flex;
    align-items: center;
    .chart-stand {
      margin: 0 12px 0 0px;
      width: 3px;
      height: 25px;
      display: inline-block;
      // @include base-bg-color();
      background-color: #3691e9;
    }
    .chart {
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>