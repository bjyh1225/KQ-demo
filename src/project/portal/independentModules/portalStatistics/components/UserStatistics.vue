<template>
  <div class="user-statistics">
    <el-row>
      <el-col>
        <portal-statistics-content-title :titleData="titleName"></portal-statistics-content-title>
      </el-col>
      <el-col>
        <portal-statistics-content-time-slot></portal-statistics-content-time-slot>
      </el-col>
      <el-col>
        <div class="main" ref="myEchart"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PortalStatisticsContentTitle from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTitle";
import PortalStatisticsContentTimeSlot from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTimeSlot";

export default {
  name: "UserStatistics",
  components: {
    PortalStatisticsContentTitle,
    PortalStatisticsContentTimeSlot
  },
  data() {
    return {
      titleName: this.$t("portalStatistics.CurrentOnlineUsers")
    };
  },
  mounted() {
    // this.initChart();
  },
  methods: {
    // 柱状图
    initChart() {
      var myChart = this.$echarts.init(this.$refs.myEchart);
      myChart.setOption({
        title: {
          text: "ECharts 入门示例",
          subtext: "demo",
          textAlign: "auto"
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [
              { value: 335, name: "直接访问" },
              { value: 310, name: "邮件营销" },
              { value: 274, name: "联盟广告" },
              { value: 235, name: "视频广告" },
              { value: 400, name: "搜索引擎" }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.user-statistics {
  margin-right: 24px;
  .main {
    height: 486px;
    width: 100%;
    border: 1px solid rgba(33, 75, 121, 0.8);
    background-color: rgba(186, 211, 245, 0.1);
  }
}
</style>