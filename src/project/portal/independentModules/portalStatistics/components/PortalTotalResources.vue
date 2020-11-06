<template>
  <div class="portal-map-access">
    <el-row>
      <el-col>
        <portal-statistics-content-title :titleData="titleName"></portal-statistics-content-title>
      </el-col>
      <el-col>
        <portal-statistics-content-time-slot
          @getServiceStatistcsData="getServiceStatistcsData"
          :exportBoolean="true"
          @downloadResourcesListFun="downloadResourcesListAll"
        ></portal-statistics-content-time-slot>
      </el-col>
      <el-col class="main">
        <div class="graphic-selection">
          <el-button
            type="primary"
            @click="brokenLineFun"
            :class="!histogram?'graphic':''"
          >{{$t('portalStatistics.Histogram')}}</el-button>
          <el-button
            type="primary"
            @click="histogramFun"
            :class="histogram?'graphic':''"
          >{{$t('portalStatistics.LineChart')}}</el-button>
        </div>
        <div class="echart" v-show="histogram" ref="histogramEchart"></div>
        <div class="echart" v-show="!histogram" ref="brokenLineEchart"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PortalStatisticsContentTitle from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTitle";
import PortalStatisticsContentTimeSlot from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTimeSlot";
// import { judgeGetData } from "portal/independentModules/portalStatistics/utils/judgeGetData.js";
import {
  getDateStr,
  getDateArry
} from "portal/independentModules/portalStatistics/utils/timeFrame.js";
export default {
  name: "PortalTotalResources",
  components: {
    PortalStatisticsContentTitle,
    PortalStatisticsContentTimeSlot
  },
  data() {
    return {
      titleName: this.$t("portalStatistics.TotalResources"),
      histogram: true, //默认显示柱状图
      serviceStatistcsData: {}, //3格 7格时间
      timeSlot: [], //时间段
      data: [], //数据
      seriesDataArrSum: [] //整理数据
    };
  },
  methods: {
    // 导出
    downloadResourcesListAll(val) {
      var url = "";
      if (val.startTime) {
        url =
          window.location.href.replace(this.$route.path, "") +
          `/api/Statistcs/select/downloadResourcesListAll?timeType=${val.timeType}&startTime=${val.startTime}&endTime=${val.endTime}&personnelId=${this.$store.getters.userInfo.id}`;
      } else {
        url =
          window.location.href.replace(this.$route.path, "") +
          `/api/Statistcs/select/downloadResourcesListAll?timeType=${val.timeType}&startTime=${val.startTime}&endTime=${val.endTime}&personnelId=${this.$store.getters.userInfo.id}`;
      }
      window.open(url);
      // const link = document.createElement("a");
      // link.style.display = "none";
      // link.setAttribute("href", url);
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    },
    getServiceStatistcsData(val) {
      this.serviceStatistcsData = val;
      this.getResourcesAllDataList();
    },
    // 请求
    getResourcesAllDataList() {
      this.$api.portalStatisticsApi
        .getResourcesAllDataList(this.serviceStatistcsData, {
          loadingText: this.$t("service.searching")
        })
        .then(res => {
          if (res.status == 200) {
            this.seriesDataArrSum = [];
            this.seriesDataArrSum = res.data.data;
            this.histogram = false;
            this.histogramFun();
          }
        })
        .catch(() => {});
    },
    // 折线图
    histogramFun() {
      this.initChart();
      this.histogram = true;
    },
    // 柱状图
    brokenLineFun() {
      this.histogram = false;
      this.brokenLineChart();
    },
    // 选择地图折线图
    initChart() {
      this.$refs.histogramEchart.style.display = "block";
      this.$refs.brokenLineEchart.style.display = "none";
      var histogramEchart = this.$echarts.init(this.$refs.histogramEchart);
      window.addEventListener("resize", () => {
        histogramEchart.resize();
      });
      var initChartLegendData = [];
      var initChartxAxisData = [];
      var initChartSeriesData = [];
      var initChartxAxisDataArr = [];
      var initChartLegendDataArr = [];
      this.seriesDataArrSum.forEach(item => {       
        if (item.NAME == "mapService") {
          item.NAME = this.$t("service.mapServices");
        } else if (item.NAME == "dataService") {
          item.NAME = this.$t("portalStatistics.DataService");
        } else if (item.NAME == "functionservice") {
          item.NAME = this.$t("service.functionServices");
        } else if (item.NAME == "scnenService") {
          item.NAME = this.$t("service.scene");
        } else if (item.NAME == "file") {
          item.NAME = this.$t("service.Files");
        } else if (item.NAME == "apps") {
          item.NAME = this.$t("webAppBuilder.Apps");
        } else if (item.NAME == "all") {
          item.NAME = this.$t("portalStatistics.All");
        }
        initChartxAxisDataArr.push(item.TIME);
        initChartLegendDataArr.push(item.NAME);
      });
      initChartxAxisData = [...new Set(initChartxAxisDataArr)];
      initChartLegendData = [...new Set(initChartLegendDataArr)];
      initChartLegendData.forEach(item => {
        var childrenSeriesData = [];
        this.seriesDataArrSum.forEach(list => {
          if (list.NAME == item) {
            childrenSeriesData.push(list.NUM);
          }
        });
        var seriesDataObj = {};
        seriesDataObj.data = childrenSeriesData;
        seriesDataObj.name = item;
        seriesDataObj.type = "line";
        seriesDataObj.symbol = "none"; //不显示折点
        initChartSeriesData.push(seriesDataObj);
      });
      histogramEchart.setOption(
        {
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
            text: this.$t("portalStatistics.TotalResourcesc"),
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
            bottom: 40,
            data: initChartLegendData,
            textStyle: {
              color: "#fff"
            }
          },
          grid: {
            left: "3%",
            right: "1%",
            width: "90%",
            height: "65%",
            containLabel: true
          },
          dataZoom: [{ type: "inside" }],
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
            data: initChartxAxisData
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
          series: initChartSeriesData
        },
        true
      );
    },
    // 选择地图柱状图
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
          fontSize: "10",
          formatter: function(params) {
            if (params.value > 0) {
              return params.value;
            } else {
              return "";
            }
          }
        }
      };
      var brokenLineChartLegendData = [];
      var brokenLineChartxAxisData = [];
      var brokenLineChartSeriesData = [];
      var brokenLineChartxAxisDataArr = [];
      var brokenLineChartLegendDataArr = [];
      this.seriesDataArrSum.forEach(item => {
        if (item.NAME == "mapService") {
          item.NAME = this.$t("service.mapServices");
        } else if (item.NAME == "dataService") {
          item.NAME = this.$t("portalStatistics.DataService");
        }else if (item.NAME == "functionservice") {
          item.NAME = this.$t("service.functionServices");
        } else if (item.NAME == "scnenService") {
          item.NAME = this.$t("service.scene");
        } else if (item.NAME == "file") {
          item.NAME = this.$t("service.Files");
        } else if (item.NAME == "apps") {
          item.NAME = this.$t("webAppBuilder.Apps");
        } else if (item.NAME == "all") {
          item.NAME = this.$t("portalStatistics.All");
        }
        brokenLineChartxAxisDataArr.push(item.TIME);
        brokenLineChartLegendDataArr.push(item.NAME);
      });
      brokenLineChartxAxisData = [...new Set(brokenLineChartxAxisDataArr)];
      brokenLineChartLegendData = [...new Set(brokenLineChartLegendDataArr)];
      brokenLineChartLegendData.forEach(item => {
        var childrenSeriesData = [];
        this.seriesDataArrSum.forEach(list => {
          if (list.NAME == item) {
            childrenSeriesData.push(list.NUM);
          }
        });
        var seriesDataObj = {};
        seriesDataObj.data = childrenSeriesData;
        seriesDataObj.name = item;
        seriesDataObj.type = "bar";
        seriesDataObj.label = seriesLabel;
        brokenLineChartSeriesData.push(seriesDataObj);
      });

      brokenLineEchart.setOption(
        {
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
            text: this.$t("portalStatistics.TotalResourcesc"),
            textStyle: {
              color: "#fff",
              fontSize: 16,
              fontWeight: "normal"
            }
          },
          grid: {
            x: "8%",
            y: "5%",
            left: "5%",
            top: "15%",
            width: "90%",
            height: "65%"
          },

          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow"
            }
          },
          legend: {
            data: brokenLineChartLegendData,
            textStyle: {
              color: "#fff"
            },
            bottom: 30
          },
          xAxis: {
            type: "category",
            data: brokenLineChartxAxisData,
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
          series: brokenLineChartSeriesData
        },
        true
      );
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
      background-color: #3691e9;
    }

    .graphic-selection {
      padding: 30px 0px 0px 32px;
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