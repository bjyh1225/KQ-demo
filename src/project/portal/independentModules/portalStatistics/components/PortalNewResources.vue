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
          @downloadResourcesListFun="downloadResourcesDataList"
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
        <div class="table">
          <div class="title">{{$t('portalStatistics.DetailsOfNewResources')}}</div>
          <!-- 表格 -->
          <el-table :data="tableData">
            <el-table-column
              :prop="item.prop"
              :label="item.label"
              :min-width="item.width"
              v-for="(item,ix) in tableCol"
              :key="ix"
            ></el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="portal-page">
            <span>{{$t('portalStatistics.DetailsOfNewResources')}}- {{totalPage}} {{$t('pagination.TradeTotal')}} {{total}} {{$t('pagination.RecordsInTotal')}}</span>
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import PortalStatisticsContentTitle from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTitle";
import PortalStatisticsContentTimeSlot from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTimeSlot";
import { judgeGetData } from "portal/independentModules/portalStatistics/utils/judgeGetData.js";
import {
  getDateStr,
  getDateArry
} from "portal/independentModules/portalStatistics/utils/timeFrame.js";
export default {
  name: "PortalNewResources",
  components: {
    PortalStatisticsContentTitle,
    PortalStatisticsContentTimeSlot
  },
  data() {
    return {
      titleName: this.$t("portalStatistics.NewResources"),
      histogram: true, //默认显示柱状图
      serviceStatistcsData: {}, //3格 7格时间
      timeSlot: [], //时间段
      data: [], //数据
      seriesDataArrSum: [], //整理数据
      tableData: [],
      tableDataSum: [],
      tableCol: [
        {
          prop: "name",
          label: this.$t("management.ResourceName"),
          width: "20%"
        },
        { prop: "type", label: this.$t("myCenter.Type"), width: "20%" },
        {
          prop: "owner",
          label: this.$t("portalStatistics.Owner"),
          width: "20%"
        },
        {
          prop: "visitsNum",
          label: this.$t("portalStatistics.Visits"),
          width: "20%"
        },
        {
          prop: "time",
          label: this.$t("management.creationTime"),
          width: "20%"
        }
      ],
      total: 0,
      pageSize: 10,
      pageIndex: 1,
      totalPage: 0 //总页数
    };
  },
  methods: {
    // 导出
    downloadResourcesDataList(val) {
      var url = "";
      if (val.startTime) {
        url =
          window.location.href.replace(this.$route.path, "") +
          `/api/Statistcs/select/downloadResourcesDataList?timeType=${val.timeType}&startTime=${val.startTime}&endTime=${val.endTime}&personnelId=${this.$store.getters.userInfo.id}`;
      } else {
        url =
          window.location.href.replace(this.$route.path, "") +
          `/api/Statistcs/select/downloadResourcesDataList?timeType=${val.timeType}&endTime=${val.endTime}&personnelId=${this.$store.getters.userInfo.id}`;
      }
      window.open(url);
      // const link = document.createElement("a");
      // link.style.display = "none";
      // link.setAttribute("href", url);
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    },
    // 前端分页公共部分
    changePageFun(val) {
      this.pageIndex = val;
      this.tableData = [];
      for (
        var i = (this.pageIndex - 1) * this.pageSize;
        i < this.pageIndex * this.pageSize;
        i++
      ) {
        if (this.tableDataSum[i]) {
          this.tableData.push(this.tableDataSum[i]);
        }
      }
    },
    // 分页
    handleCurrentChange(val) {
      this.changePageFun(val);
    },
    // 首页
    homePageClick() {
      this.changePageFun(1);
    },
    // 尾页
    TailPageClick() {
      this.changePageFun(this.totalPage);
    },
    getServiceStatistcsData(val) {
      this.serviceStatistcsData = val;
      this.getSaveResourcesDataList();
    },
    // 请求
    getSaveResourcesDataList() {
      this.$api.portalStatisticsApi
        .getSaveResourcesDataList(this.serviceStatistcsData, {
          loadingText: this.$t("service.searching")
        })
        .then(res => {
          if (res.status == 200) {
            this.timeSlot = [];
            this.data = [];
            this.tableData = [];
            this.tableDataSum = [];
            this.total = res.data.data[0].dataListdetailed.length;
            this.pageIndex = 1;
            this.totalPage = Math.ceil(this.total / this.pageSize);

            res.data.data[0].dataListdetailed.forEach(item => {
              if (item.TYPE == "mapService") {
                item.TYPE = "地图服务";
              } else if (item.TYPE == "functionService") {
                item.TYPE = "功能服务";
              } else if (item.TYPE == "sceneService") {
                item.TYPE = "三维服务";
              } else if (item.TYPE == "fileService") {
                item.TYPE = "附件";
              } else if (item.TYPE == "appbuilder") {
                item.TYPE = "应用";
              } else if (item.TYPE == "mapbuilder") {
                item.TYPE = "制图";
              }
              this.tableDataSum.push({
                name: item.NAME,
                type: item.TYPE,
                owner: item.USERNAME,
                visitsNum: item.HITS,
                time: item.TIME
              });
            });
            if (this.total <= this.pageIndex * this.pageSize) {
              this.tableData = this.tableDataSum;
            } else {
              for (var i = 0; i < 10; i++) {
                if (this.tableDataSum[i]) {
                  this.tableData.push(this.tableDataSum[i]);
                }
              }
            }
            this.data = res.data.data[0].dataList;
            // 全部  为开始日期赋值
            if (this.serviceStatistcsData.startTime == null) {
              this.serviceStatistcsData.startTime = res.data.data[0].NAME;
            }
            // if (this.serviceStatistcsData.endTime == null) {
            //   this.serviceStatistcsData.endTime =
            //     new Date().getFullYear() +
            //     "-" +
            //     (new Date().getMonth() + 1) +
            //     "-" +
            //     new Date().getDate();
            // }
            // 拼接日期
            // 天
            if (this.serviceStatistcsData.timeType == "DD") {
              if (
                this.serviceStatistcsData.startTime !=
                this.serviceStatistcsData.endTime
              ) {
                this.timeSlot = getDateStr(
                  this.serviceStatistcsData.startTime,
                  this.serviceStatistcsData.endTime,
                  0
                ).split(",");
              } else {
                this.timeSlot.push(this.serviceStatistcsData.startTime);
              }
            } else if (this.serviceStatistcsData.timeType == "MM") {
              // 月
              this.timeSlot = getDateArry(
                this.serviceStatistcsData.startTime,
                this.serviceStatistcsData.endTime
              );
            } else {
              // 时
              if (
                this.serviceStatistcsData.startTime !=
                this.serviceStatistcsData.endTime
              ) {
                this.timeSlot = getDateStr(
                  this.serviceStatistcsData.startTime,
                  this.serviceStatistcsData.endTime,
                  0
                ).split(",");
              } else {
                this.timeSlot.push(this.serviceStatistcsData.startTime);
              }
              var arrHH = [];
              this.timeSlot.forEach(ele => {
                for (var i = 0; i < 24; i++) {
                  if (i < 10) {
                    arrHH.push(ele + " " + "0" + i);
                  } else {
                    arrHH.push(ele + " " + i);
                  }
                }
              });
              this.timeSlot = arrHH;
            }
            this.seriesDataArrSum = judgeGetData(
              null,
              this.seriesDataArrSum,
              this.data,
              this.timeSlot,
              this.serviceStatistcsData,
              null
            );
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
        initChartxAxisDataArr.push(item.NAME);
        initChartLegendDataArr.push(item.CHILDRENNAME);
      });
      initChartxAxisData = [...new Set(initChartxAxisDataArr)];
      initChartLegendData = [...new Set(initChartLegendDataArr)];
      initChartLegendData.forEach(item => {
        var childrenSeriesData = [];
        this.seriesDataArrSum.forEach(list => {
          if (list.CHILDRENNAME == item) {
            childrenSeriesData.push(list.NUM);
          }
        });
        var seriesDataObj = {};
        seriesDataObj.data = childrenSeriesData;
        seriesDataObj.name = item;
        seriesDataObj.type = "line";
        seriesDataObj.symbol = "none";
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
            text: this.$t("portalStatistics.NewResourcesc"),
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
        brokenLineChartxAxisDataArr.push(item.NAME);
        brokenLineChartLegendDataArr.push(item.CHILDRENNAME);
      });
      brokenLineChartxAxisData = [...new Set(brokenLineChartxAxisDataArr)];
      brokenLineChartLegendData = [...new Set(brokenLineChartLegendDataArr)];
      brokenLineChartLegendData.forEach(item => {
        var childrenSeriesData = [];
        this.seriesDataArrSum.forEach(list => {
          if (list.CHILDRENNAME == item) {
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
            text: this.$t("portalStatistics.NewResourcesc"),
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
    padding-bottom: 20px;
    height: 100%;
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
      height: 400px;
    }
    .table {
      border-top: 1px solid rgba(33, 75, 121, 0.8);
      padding-top: 10px;
      .title {
        height: 40px;
        line-height: 40px;
        color: #fff;
        font-size: 16px;
        text-align: center;
      }
      /deep/.el-table {
        color: #adbfcf;
        background-color: rgba(186, 211, 245, 0.1);
        &::before {
          height: 0;
        }
        td,
        th.is-leaf {
          border-bottom: 1px solid #25558a;
        }
        th {
          background-color: rgba(186, 211, 245, 0.1);
          color: #fff;
          font-weight: normal;
        }
        tr {
          background-color: rgba(28, 46, 78, 0.1);
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
        .el-table__header-wrapper {
          .el-table__header {
            border-top: 1px solid #25558a;
          }
        }
      }
      /deep/.el-table--enable-row-hover .el-table__body tr:hover > td {
        background-color: rgba(33, 66, 109, 0.3);
        color: #3691e9;
      }
      .portal-page {
        height: 29px;
        line-height: 25px;
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
          background: rgba(28, 46, 78, 0.1);
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
            background: rgba(28, 46, 78, 0.1);
            color: #fff;
            height: 29px;
          }
          .btn-next {
            border-left: none;
          }
          button[disabled="disabled"] {
            background: rgba(42, 59, 85, 0.1);
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
              background: rgba(28, 46, 78, 0.1);
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
  }
}
</style>