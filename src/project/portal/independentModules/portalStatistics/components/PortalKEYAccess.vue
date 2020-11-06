
<template>
  <div class="portal-map-access">
    <el-row>
      <el-col>
        <portal-statistics-content-title :titleData="titleName"></portal-statistics-content-title>
      </el-col>
      <el-col>
        <portal-statistics-content-time-slot></portal-statistics-content-time-slot>
      </el-col>
      <el-col class="main">
        <div class="choice">
          <el-button type="primary" class="graphic">{{$t('portalStatistics.AllMaps')}}</el-button>
          <el-dropdown @command="handleCommand">
            <el-button type="primary">
              {{$t('portalStatistics.SelectMap')}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">国土地图</el-dropdown-item>
              <el-dropdown-item command="b">林业地图</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="graphic-selection">
          <el-button type="primary" @click="brokenLineFun" :class="!histogram?'graphic':''">柱状图</el-button>
          <el-button type="primary" @click="histogramFun" :class="histogram?'graphic':''">折线图</el-button>
        </div>
        <div class="echart" v-show="histogram" ref="histogramEchart"></div>
        <div class="echart" v-show="!histogram" ref="brokenLineEchart"></div>
      </el-col>
    </el-row>
    <portal-statistics-map-dialog ref="dialogPortal"></portal-statistics-map-dialog>
  </div>
</template>
<script>
import PortalStatisticsContentTitle from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTitle";
import PortalStatisticsContentTimeSlot from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTimeSlot";
import PortalStatisticsMapDialog from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsMapDialog";
export default {
  name: "PortalKEYAccess",
  components: {
    PortalStatisticsContentTitle,
    PortalStatisticsContentTimeSlot,
    PortalStatisticsMapDialog
  },
  data() {
    return {
      titleName: "KEY访问统计",
      histogram: true //默认显示柱状图
    };
  },
  mounted() {
    this.histogram = false;
    this.histogramFun();
  },
  methods: {
    // 折线图
    histogramFun() {
      this.initChart();
      this.histogram = true;
    },
    // 柱状图
    brokenLineFun() {
      this.brokenLineChart();
      this.histogram = false;
    },
    // 折线图
    initChart() {
      this.$refs.histogramEchart.style.display = "block";
      this.$refs.brokenLineEchart.style.display = "none";
      var histogramEchart = this.$echarts.init(this.$refs.histogramEchart);
      window.addEventListener("resize", () => {
        histogramEchart.resize();
      });
      histogramEchart.setOption({
        color: [
          "#0387EC",
          "#4374F4",
          "#43D6BC",
          "#FE5157",
          "#A25CF0",
          "#1FD187",
          "#71C531",
          "#FC8B3F",
          "#CFE4FF",
          "#18B6CF",
          "#ED5D78"
        ],
        title: {
          text: "KEY访问次数（次）",
          textStyle: {
            color: "#fff",
            fontSize: 16,
            fontWeight: "normal"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          // inactiveColor: "#647890", //取消线条后的颜色
          bottom: 40,
          data: [
            "国土地图",
            "林业地图",
            "农业地图",
            "森林地图",
            "武汉",
            "城镇",
            "其他地图"
          ],
          textStyle: {
            color: "#fff"
          }
        },
        grid: {
          left: "-0%",
          right: "1%",
          width: "95%",
          height: "65%",
          containLabel: true
        },
        xAxis: {
          // 网格线
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
              width: 1,
              type: "solid"
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.4)"
            }
          },
          type: "category",
          boundaryGap: false,
          data: [
            "2019-1",
            "2019-2",
            "2019-3",
            "2019-4",
            "2019-5",
            "2019-6",
            "2019-7"
          ]
        },
        yAxis: {
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.4)"
            }
          },
          type: "value"
        },
        series: [
          {
            name: "国土地图",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "林业地图",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "农业地图",
            type: "line",
            stack: "总量",
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "森林地图",
            type: "line",
            stack: "总量",
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "武汉",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: "城镇",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          },
          {
            name: "其他地图",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      });
    },
    // 柱状图
    brokenLineChart() {
      this.$refs.histogramEchart.style.display = "none";
      this.$refs.brokenLineEchart.style.display = "block";
      var brokenLineEchart = this.$echarts.init(this.$refs.brokenLineEchart);
      window.addEventListener("resize", () => {
        brokenLineEchart.resize();
      });
      var seriesLabel = {
        normal: {
          show: "true",
          position: "insideTop",
          color: "#FFF",
          fontSize: "10"
        }
      };
      brokenLineEchart.setOption({
        color: [
          "#0387EC",
          "#4374F4",
          "#43D6BC",
          "#FE5157",
          "#A25CF0",
          "#1FD187",
          "#71C531",
          "#FC8B3F",
          "#CFE4FF",
          "#18B6CF",
          "#ED5D78"
        ],
        grid: {
          x: "8%",
          y: "5%",
          width: "90%",
          height: "75%"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: [
            "国土地图",
            "林业地图",
            "农业地图",
            "森林地图",
            "武汉",
            "城镇",
            "其他地图"
          ],
          textStyle: {
            color: "#fff"
          },
          bottom: 30
        },
        xAxis: {
          type: "category",
          data: [
            "2019-1",
            "2019-2",
            "2019-3",
            "2019-4",
            "2019-5",
            "2019-6",
            "2019-7"
          ],
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.4)"
            }
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
              width: 1,
              type: "solid"
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 10
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.4)"
            }
          }
        },
        series: [
          {
            name: "国土地图",
            type: "bar",
            label: seriesLabel,
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "林业地图",
            type: "bar",
            label: seriesLabel,
            data: [220, 182, 191, 234, 290, 30, 310]
          },
          {
            name: "农业地图",
            type: "bar",
            label: seriesLabel,
            data: [150, 232, 201, 154, 190, 130, 410]
          },
          {
            name: "森林地图",
            type: "bar",
            label: seriesLabel,
            data: [320, 332, 301, 334, 390, 300, 320]
          },
          {
            name: "武汉",
            type: "bar",
            label: seriesLabel,
            data: [820, 92, 301, 94, 120, 130, 520]
          },
          {
            name: "城镇",
            type: "bar",
            label: seriesLabel,
            data: [620, 502, 91, 914, 290, 330, 320]
          },
          {
            name: "其他地图",
            type: "bar",
            label: seriesLabel,
            data: [520, 932, 601, 534, 120, 130, 320]
          }
        ]
      });
    },
    // 下拉框选中
    handleCommand() {
      this.$refs.dialogPortal.dialogPortalShow();
    }
  }
};
</script>
<style lang="scss" scoped>

.portal-map-access {
  margin-right: 24px;
  .main {
    height: 486px;
    width: 100%;
    border: 1px solid rgba(33, 75, 121, 0.8);
    background-color: rgba(186, 211, 245, 0.1);
    .el-button.el-button--primary.graphic {
      // @include base-bg-font();
      background-color: #3691e9;
    }
    .choice {
      padding: 30px 32px 32px 32px;
      .el-button {
        border-radius: 0;
        width: 102px;
        height: 30px;
        line-height: 30px;
        padding: 0px;
        border: 1px solid rgba(33, 75, 121, 0.8);
        background-color: transparent;
      }
    }
    .graphic-selection {
      height: 30px;
      margin-right: 102px;
      .el-button {
        float: right;
        border-radius: 0;
        width: 102px;
        height: 30px;
        line-height: 30px;
        padding: 0px;
        border: 1px solid rgba(33, 75, 121, 0.8);
        background-color: transparent;
      }
    }
    .echart {
      padding: 0 100px;
      height: 80%;
    }
  }
}
</style>