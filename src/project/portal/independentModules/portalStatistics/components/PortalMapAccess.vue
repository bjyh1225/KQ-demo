<template>
  <el-row class="portal-map-access">
    <el-row>
      <el-col>
        <portal-statistics-content-title :titleData="titleName"></portal-statistics-content-title>
      </el-col>
      <el-col>
        <portal-statistics-content-time-slot @getServiceStatistcsData="getServiceStatistcsData"></portal-statistics-content-time-slot>
      </el-col>
      <!-- :style="'height:'+(387*(dataUserId.split(',').length)+122)+'px;'" -->
      <el-col class="main">
        <div class="choice">
          <el-button
            type="primary"
            :class="buttonChoiceAll?'graphic':''"
            @click="buttonChoiceAllFun"
          >{{$t('portalStatistics.Totalvisits')}}</el-button>
          <el-button type="primary" :class="!buttonChoiceAll?'graphic':''" @click="handleCommand">
            {{$t('portalStatistics.SelectMap')}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </el-button>
        </div>
        <div id="graphic-selection">
          <el-radio v-model="pieSwitch" label="userOlay" @change="toggleAngleFun" v-show="pieToggleAngle">{{$t('portalStatistics.Displayuserperspective')}}</el-radio>
          <el-radio v-model="pieSwitch" label="serviceOlay" @change="toggleAngleFun" v-show="pieToggleAngle">{{$t('portalStatistics.Displayresourceperspective')}}</el-radio>
          <!-- 柱状 1 -->
          <el-button
            type="primary"
            @click="brokenLineFun"
            :class="histogram==1?'graphic':''"
          >{{$t('portalStatistics.Histogram')}}</el-button>
          <el-button
            type="primary"
            @click="pieChartFun"
            :class="histogram==2?'graphic':''"
            style="margin-left:0px;"
          >{{$t('portalStatistics.Piechart')}}</el-button>
          <!-- 折线 3-->
          <el-button
            type="primary"
            @click="histogramFun"
            :class="histogram==3?'graphic':''"
          >{{$t('portalStatistics.LineChart')}}</el-button>
        </div>
        <div
          class="echart"
          v-show="histogram==3"
          v-for="ech in histogramBoxNum"
          :key="ech"
          :id="`histogramEchart${ech}`"
        ></div>
        <div
          class="echart"
          id="pieChartEchart"
          v-show="dataServiceName.length<1||dataUserId.split(',').length<1&&histogram==2"
        ></div>
        <div
          class="echart"
          v-for="(echs,i) in dataServiceName"
          :key="i+'-'+echs"
          :id="`pieChartEchart${echs}`"
          v-show="dataServiceName.length>0&&histogram==2&&pieSwitch=='serviceOlay'"
        ></div>
        <div
          class="echart"
          v-for="(ech,e) in dataUserId.split(',')"
          :key="e+'-'+ech"
          :id="`pieChartEchart${ech}`"
          v-show="dataServiceName.length>0&&dataUserId.split(',')!=''&&dataUserId.split(',').length>0&&histogram==2&&pieSwitch=='userOlay'"
        ></div>
        <div
          class="echart"
          v-show="histogram==1"
          v-for="(lineech,l) in brokenLineBoxNum"
          :key="`${l}*${lineech}`"
          :id="`brokenLineEchart${lineech}`"
        ></div>
      </el-col>
    </el-row>
    <!-- <portal-statistics-map-dialog
      ref="dialogPortal"
      @checkSelection="checkSelection"
      @changePageIndexFun="changePageIndexFun"
      :totalPageTitle="$t('portalStatistics.Functionserviceresourcelist')"
    ></portal-statistics-map-dialog> -->
    <portal-statistics-map-dialog
      ref="dialogPortal"
      @checkSelection="checkSelection"
      @changePageIndexFun="changePageIndexFun"
      :totalPageTitle="$t('portalStatistics.Mapserviceresourcelist')"
    ></portal-statistics-map-dialog>
  </el-row>
</template>
<script>
import PortalStatisticsContentTitle from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTitle";
import PortalStatisticsContentTimeSlot from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTimeSlot";
import PortalStatisticsMapDialog from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsMapDialog";
import { judgeGetData } from "portal/independentModules/portalStatistics/utils/judgeGetData.js";
import {
  getDateStr,
  getDateArry
} from "portal/independentModules/portalStatistics/utils/timeFrame.js";
export default {
  name: "PortalMapAccess",
  components: {
    PortalStatisticsContentTitle,
    PortalStatisticsContentTimeSlot,
    PortalStatisticsMapDialog
  },
  data() {
    return {
      titleName: this.$t("portalStatistics.MapVisitStatistics"),
      histogram: "3", //默认显示柱状图
      buttonChoiceAll: true, //默认显示所有地图
      checkSelectionSign: false, //弹框复选框默认不选中
      serviceStatistcsData: {}, //3格 7格时间
      dataServiceType: "", //所有
      dataServiceId: "", //选择   复选框选中资源ID
      dataUserId: "", //选择  选中人员ID
      dataUserArr: [], //选择  选中人员ID  NAME
      timeSlot: [], //时间段
      dataServiceName: [], //复选框选中地图名称
      data: [], //数据
      pieData: [], //饼状图
      seriesDataArrSum: [], //整理数据
      pieSwitch: "userOlay", //饼状图已单个资源为唯一
      pieToggleAngle: false,
      histogramBoxNum: ["0"], //折线图个数  用户ID  资源NAME
      brokenLineBoxNum: ["0"] //柱状图个数  用户ID  资源NAME
    };
  },
  // watch: {
  //   dataServiceId() {
  //     this.getDataServiceStatistcs();
  //   }
  // },
  methods: {
    getServiceStatistcsData(val) {
      this.serviceStatistcsData = val;
      this.getDataServiceStatistcs();
    },
    changePageIndexFun() {
      this.$refs.dialogPortal.selectServiceAll();
    },
    // 数组相加合并
    merge(list, name, num) {
      let result = [];
      let cache = {};
      list.forEach(item => {
        let key = `${name}:${item[name]}`;
        let index = cache[key];
        if (index !== undefined) {
          result[index][num] += item[num];
        } else {
          result.push(Object.assign({}, item));
          cache[key] = result.length - 1;
        }
      });
      return result;
    },
    // 请求
    getDataServiceStatistcs() {
      this.serviceStatistcsData.dataServiceType = this.dataServiceType;
      this.serviceStatistcsData.dataServiceId = this.dataServiceId;
      this.serviceStatistcsData.dataUserId = this.dataUserId;
      this.$api.portalStatisticsApi
        .getDataServiceStatistcs(this.serviceStatistcsData, {
          loadingText: this.$t("service.searching")
        })
        .then(res => {
          if (res.status == 200) {
            this.timeSlot = [];
            this.data = [];
            this.pieData = [];
            this.data = res.data.data;
            this.pieData = JSON.parse(JSON.stringify(res.data.data));
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
            // 公共函数
            this.seriesDataArrSum = judgeGetData(
              this.dataServiceType,
              this.seriesDataArrSum,
              this.data,
              this.timeSlot,
              this.serviceStatistcsData,
              this.dataServiceName,
              this.dataUserId,
              this.dataUserArr
            );
            this.histogram = "3";
            this.histogramBoxNum = ["0"];
            this.brokenLineBoxNum = ["0"];
            this.$nextTick(() => {
              this.histogramFun();
            });
          }
        })
        .catch(() => {});
    },
    // 折线图
    histogramFun() {
      if (!this.buttonChoiceAll) {
        this.initChart();
      } else {
        this.initChartAll();
      }
      this.histogram = "3";
      this.pieToggleAngle = false;
    },
    // 饼状图
    pieChartFun() {
      this.histogram = "2";
      if (!this.buttonChoiceAll) {
        this.pieChartChart();
      } else {
        this.pieChartChartAll();
      }
    },
    // 柱状图
    brokenLineFun() {
      this.histogram = "1";
      if (!this.buttonChoiceAll) {
        this.brokenLineChart();
      } else {
        this.brokenLineChartAll();
      }
      this.pieToggleAngle = false;
    },
    // 所有饼状图
    pieChartChartAll() {
      var seriesType = [];
      var legendData = [];
      if (this.dataServiceType == "") {
        this.pieData.forEach(element => {
          legendData.push(element.NAME);
          seriesType.push({ value: element.NUM, name: element.NAME });
        });
      }
      this.pieChartCharPublic(
        legendData,
        seriesType,
        this.$t('portalStatistics.Totalmapvisits'),
        "noUser"
      );
    },
    // 饼状图公共
    pieChartCharPublic(legendData, seriesType, seriesName, yEchart) {
      var pieChart = "";
      if (yEchart == "" || yEchart == "noUser") {
        pieChart = document.getElementById("pieChartEchart");
      } else {
        pieChart = document.getElementById("pieChartEchart" + yEchart);
      }
      pieChart.style.display = "block";
      var pieEchart = this.$echarts.init(pieChart, "light");
      window.addEventListener("resize", () => {
        pieEchart.resize();
      });
      pieEchart.setOption(
        {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            textStyle: {
              color: "#fff"
            },
            top: 40,
            orient: "vertical",
            x: "left",
            data: legendData
          },
          title: {
            text: seriesName,
            textStyle: {
              color: "#fff",
              fontSize: 16,
              fontWeight: "normal"
            }
          },
          series: [
            {
              name: seriesName,
              type: "pie",
              selectedMode: "single",
              radius: [0, "65%"],
              center: ["50%", "50%"],
              data: seriesType
            }
          ]
        },
        true
      );
    },
    // 选择饼状图
    pieChartChart() {
      var seriesType = [];
      var legendData = [];
      if (this.dataServiceName.length > 0 && this.dataUserId == "") {
        this.pieToggleAngle = false;
        // 多资源  0
        var pieDatagifyService = this.merge(
          JSON.parse(JSON.stringify(this.pieData)),
          "CHILDRENNAME",
          "NUM"
        );
        legendData = this.dataServiceName;
        if (pieDatagifyService.length > 0) {
          this.dataServiceName.forEach(service => {
            pieDatagifyService.forEach(element => {
              if (element.CHILDRENNAME == service) {
                seriesType.push({ value: element.NUM, name: service });
                return;
              }
            });
            seriesType.push({ value: 0, name: service });
          });
        } else {
          this.dataServiceName.forEach(service => {
            seriesType.push({ value: 0, name: service });
          });
        }
        this.pieChartCharPublic(
          legendData,
          this.merge(seriesType, "name", "value"),
          this.$t('portalStatistics.Mapvisits'),
          "noUser"
        );
      } else if (
        this.dataServiceName.length >= 1 &&
        this.dataUserId != "" &&
        this.dataUserId.split(",").length >= 1
      ) {
        //多资源  多用户    切换    serviceOlay 资源     userOlay
        this.pieToggleAngle = true;
        if (this.pieSwitch == "serviceOlay") {
          if (this.pieData.length > 0) {
            this.dataServiceName.forEach(service => {
              seriesType = [];
              legendData = [];
              this.pieData.forEach(element => {
                if (element.CHILDRENNAME == service) {
                  seriesType.push({
                    value: element.NUM,
                    name: element.USERNAME
                  });
                  this.dataUserArr.forEach(item => {
                    if (item.id != element.CREATEBY) {
                      seriesType.push({ value: 0, name: item.name });
                    }
                    legendData.push(item.name);
                  });
                }
                seriesType = this.merge(seriesType, "name", "value");
              });
              if (seriesType.length <= 0) {
                this.dataUserArr.forEach(item => {
                  seriesType.push({ value: 0, name: item.name });
                  legendData.push(item.name);
                });
              }
              this.pieChartCharPublic(
                legendData,
                seriesType,
                `${service}-${this.$t('portalStatistics.Visits')}`,
                service
              );
            });
          } else {
            this.dataServiceName.forEach(service => {
              seriesType = [];
              legendData = [];
              this.dataUserArr.forEach(item => {
                seriesType.push({ value: 0, name: item.name });
                legendData.push(item.name);
              });
              this.pieChartCharPublic(
                legendData,
                seriesType,
                `${service}-${this.$t('portalStatistics.Visits')}`,
                service
              );
            });
          }
        } else {
          if (this.pieData.length > 0) {
            this.dataUserArr.forEach(user => {
              seriesType = [];
              legendData = [];
              this.pieData.forEach(element => {
                if (element.CREATEBY == user.id) {
                  seriesType.push({
                    value: element.NUM,
                    name: element.CHILDRENNAME
                  });
                  this.dataServiceName.forEach(serviceName => {
                    if (serviceName != element.CHILDRENNAME) {
                      seriesType.push({ value: 0, name: serviceName });
                    }
                  });
                }
                seriesType = this.merge(seriesType, "name", "value");
              });
              if (seriesType.length <= 0) {
                this.dataServiceName.forEach(serviceName => {
                  seriesType.push({ value: 0, name: serviceName });
                });
              }
              legendData = this.dataServiceName;
              this.pieChartCharPublic(
                legendData,
                seriesType,
                `${user.name}-${this.$t('portalStatistics.Visits')}`,
                user.id
              );
            });
          } else {
            this.dataUserArr.forEach(user => {
              seriesType = [];
              legendData = [];
              this.dataServiceName.forEach(serviceName => {
                seriesType.push({ value: 0, name: serviceName });
                legendData.push(serviceName);
              });
              this.pieChartCharPublic(
                legendData,
                seriesType,
                `${user.name}-${this.$t('portalStatistics.Visits')}`,
                user.id
              );
            });
          }
        }
      } else if (
        this.dataServiceName.length < 1 &&
        this.dataUserId != "" &&
        this.dataUserId.split(",").length >= 1
      ) {
        // 多用户  0
        this.pieToggleAngle = false;
        var pieDatagifyUser = this.merge(
          JSON.parse(JSON.stringify(this.pieData)),
          "CREATEBY",
          "NUM"
        );
        if (pieDatagifyUser.length > 0) {
          this.dataUserArr.forEach(service => {
            legendData.push(service.name);
            pieDatagifyUser.forEach(element => {
              if (element.CREATEBY == service.id) {
                seriesType.push({ value: element.NUM, name: service.name });
                return;
              }
            });
            seriesType.push({ value: 0, name: service.name });
          });
        } else {
          this.dataUserArr.forEach(item => {
            seriesType.push({ value: 0, name: item.name });
            legendData.push(item.name);
          });
        }
        this.pieChartCharPublic(
          legendData,
          this.merge(seriesType, "name", "value"),
          this.$t('portalStatistics.Personnelvisits'),
          "noUser"
        );
      }
    },
    // 所有地图柱状图
    brokenLineChartAll() {
      document.getElementById("pieChartEchart").style.display = "none";
      var brokenEchart = document.getElementById("brokenLineEchart0");
      brokenEchart.style.display = "block";
      var brokenLineEchart = this.$echarts.init(brokenEchart);
      window.addEventListener("resize", () => {
        brokenLinechart.resize();
      });
      var brokenLineChartAllTime = [];
      var brokenLineChartAllNum = [];
      this.seriesDataArrSum.forEach(item => {
        brokenLineChartAllTime.push(item.NAME);
        brokenLineChartAllNum.push(item.NUM);
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
            text: this.$t('portalStatistics.Totalmapvisits'),
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
            data: [this.$t("portalStatistics.AllMaps")],
            textStyle: {
              color: "#fff"
            },
            bottom: 30
          },
          xAxis: {
            type: "category",
            data: brokenLineChartAllTime,
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
              name: this.$t("portalStatistics.AllMaps"),
              type: "bar",
              label: seriesLabel,
              data: brokenLineChartAllNum
            }
          ]
        },
        true
      );
    },
    // 所有地图折线图
    initChartAll() {
      document.getElementById("pieChartEchart").style.display = "none";
      var chart = document.getElementById("histogramEchart0");
      chart.style.display = "block";
      var histogramEchart = this.$echarts.init(chart);
      window.addEventListener("resize", () => {
        histogramEchart.resize();
      });
      var initChartAllTime = [];
      var initChartAllNum = [];
      this.seriesDataArrSum.forEach(item => {
        initChartAllTime.push(item.NAME);
        initChartAllNum.push(item.NUM);
      });
      // histogramEchart.setOption(option, true);
      histogramEchart.setOption(
        {
          color: ["#0387EC"],
          title: {
            text: this.$t('portalStatistics.Totalmapvisits'),
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
            data: [this.$t("portalStatistics.AllMaps")],
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
            data: initChartAllTime
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
              name: this.$t("portalStatistics.AllMaps"),
              type: "line",
              data: initChartAllNum,
              symbol: "none"
            }
          ]
        },
        true
      );
    },
    // 选择地图折线图
    initChart() {
      this.histogramBoxNum = [];
      if (
        this.seriesDataArrSum[0].noUser &&
        this.seriesDataArrSum[0].noUser.length > 0
      ) {
        // 多资源  0
        this.histogramBoxNum = ["0"];
        this.createChartFun(
          this.seriesDataArrSum[0].noUser,
          "noUser",
          this.$t('portalStatistics.Mapvisits')
        );
      } else {
        // //多资源  用户
        if (
          this.dataUserId != "" &&
          this.dataUserId.split(",").length > 0 &&
          this.dataServiceName.length > 0
        ) {
          this.histogramBoxNum = this.dataUserId.split(",");
          this.dataUserArr.forEach(echVal => {
            this.$nextTick(() => {
              this.createChartFun(
                this.seriesDataArrSum[0][echVal.id],
                echVal.id,
                `${echVal.name}-${this.$t('portalStatistics.Visits')}`
              );
            });
          });
        } else {
          //0   多用户
          if (this.seriesDataArrSum[0].CHILDRENNAME == "所有地图") {
            this.histogramBoxNum = ["0"];
            this.createChartFun(
              this.seriesDataArrSum,
              "",
              this.$t('portalStatistics.Personnelvisits')
            );
          } else {
            if (this.seriesDataArrSum.length <= 1) {
              this.histogramBoxNum = this.dataUserId.split(",");
              this.dataUserArr.forEach(echVal => {
                this.$nextTick(() => {
                  this.createChartFun(
                    this.seriesDataArrSum[0][echVal.id],
                    echVal.id,
                    `${echVal.name}-${this.$t('portalStatistics.Visits')}`
                  );
                });
              });
            } else {
              this.histogramBoxNum = ["0"];
              this.createChartFun(
                this.seriesDataArrSum,
                "",
                this.$t('portalStatistics.Personnelvisits')
              );
            }
          }
        }
      }
    },
    createChartFun(dataEchart, yEchart, title) {
      if (!dataEchart) {
        return false;
      }
      var chart = "";
      document.getElementById("pieChartEchart").style.display = "none";
      if (yEchart == "" || yEchart == "noUser") {
        chart = document.getElementById("histogramEchart0");
      } else {
        chart = document.getElementById("histogramEchart" + yEchart);
      }
      chart.style.display = "block";
      var histogramEchart = this.$echarts.init(chart);
      window.addEventListener("resize", () => {
        histogramEchart.resize();
      });
      var initChartLegendData = [];
      var initChartxAxisData = [];
      var initChartSeriesData = [];
      var initChartxAxisDataArr = [];
      var initChartLegendDataArr = [];
      dataEchart.forEach(item => {
        initChartxAxisDataArr.push(item.NAME);
        initChartLegendDataArr.push(item.CHILDRENNAME);
      });
      initChartxAxisData = [...new Set(initChartxAxisDataArr)];
      initChartLegendData = [...new Set(initChartLegendDataArr)];
      initChartLegendData.forEach(item => {
        var childrenSeriesData = [];
        dataEchart.forEach(list => {
          if (list.CHILDRENNAME == item) {
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
            text: title,
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
            bottom: 20,
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
    // 柱状图公共
    createBrokenLineChartFun(dataEchart, yEchart, title) {
      if (!dataEchart) {
        return false;
      }
      var chartLine = "";
      document.getElementById("pieChartEchart").style.display = "none";
      if (yEchart == "" || yEchart == "noUser") {
        chartLine = document.getElementById("brokenLineEchart0");
      } else {
        chartLine = document.getElementById("brokenLineEchart" + yEchart);
      }
      chartLine.style.display = "block";
      var brokenLineEchart = this.$echarts.init(chartLine);
      window.addEventListener("resize", () => {
        brokenLineEchart.resize();
      });
      var brokenLineChartLegendData = [];
      var brokenLineChartxAxisData = [];
      var brokenLineChartSeriesData = [];
      var brokenLineChartxAxisDataArr = [];
      var brokenLineChartLegendDataArr = [];
      dataEchart.forEach(item => {
        brokenLineChartxAxisDataArr.push(item.NAME);
        brokenLineChartLegendDataArr.push(item.CHILDRENNAME);
      });
      brokenLineChartxAxisData = [...new Set(brokenLineChartxAxisDataArr)];
      brokenLineChartLegendData = [...new Set(brokenLineChartLegendDataArr)];
      brokenLineChartLegendData.forEach(item => {
        var childrenSeriesData = [];
        dataEchart.forEach(list => {
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
            text: title,
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
            bottom: 15
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
    },
    // 选择地图柱状图
    brokenLineChart() {
      this.brokenLineBoxNum = [];
      if (
        this.seriesDataArrSum[0].noUser &&
        this.seriesDataArrSum[0].noUser.length > 0
      ) {
        // 多资源  0
        this.brokenLineBoxNum = ["0"];
        this.createBrokenLineChartFun(
          this.seriesDataArrSum[0].noUser,
          "noUser",
          this.$t('portalStatistics.Mapvisits')
        );
      } else {
        // //多资源  用户
        if (
          this.dataUserId != "" &&
          this.dataUserId.split(",").length > 0 &&
          this.dataServiceName.length > 0
        ) {
          this.brokenLineBoxNum = this.dataUserId.split(",");
          this.dataUserArr.forEach(echVal => {
            this.$nextTick(() => {
              this.createBrokenLineChartFun(
                this.seriesDataArrSum[0][echVal.id],
                echVal.id,
                `${echVal.name}-${this.$t('portalStatistics.Visits')}`
              );
            });
          });
        } else {
          //0   多用户
          if (this.seriesDataArrSum[0].CHILDRENNAME == "所有地图") {
            this.brokenLineBoxNum = ["0"];
            this.createBrokenLineChartFun(
              this.seriesDataArrSum,
              "",
              this.$t('portalStatistics.Personnelvisits')
            );
          } else {
            if (this.seriesDataArrSum.length <= 1) {
              this.brokenLineBoxNum = this.dataUserId.split(",");
              this.dataUserArr.forEach(echVal => {
                this.$nextTick(() => {
                  this.createBrokenLineChartFun(
                    this.seriesDataArrSum[0][echVal.id],
                    echVal.id,
                    `${echVal.name}-${this.$t('portalStatistics.Visits')}`
                  );
                });
              });
            } else {
              this.brokenLineBoxNum = ["0"];
              this.createBrokenLineChartFun(
                this.seriesDataArrSum,
                "",
                this.$t('portalStatistics.Personnelvisits')
              );
            }
          }
        }
      }
    },
    //所有地图选中
    buttonChoiceAllFun() {
      this.pieToggleAngle = false;
      this.dataServiceName = [];
      this.$refs.dialogPortal.multipleSelectionDel();
      this.dataServiceType = "";
      this.dataServiceId = "";
      this.dataUserId = "";
      this.buttonChoiceAll = true;
      document.getElementById("pieChartEchart").style.display = "none";
      this.getDataServiceStatistcs();
    },
    // 下拉框选中 选择地图选中
    handleCommand() {
      this.$refs.dialogPortal.dialogPortalShow();
      this.$refs.dialogPortal.selectServiceAll();
    },
    // 获取弹框复选框是否选中与选中ID
    checkSelection(val) {
      var idArr = [];
      val.dataUserId.forEach(res => {
        idArr.push(res.id);
      });
      this.dataUserId = idArr.toString();
      this.dataUserArr = val.dataUserId;
      this.checkSelectionSign = val.signShow;
      var dataServiceIdArr = [];
      this.dataServiceName = [];
      val.multipleSelection.forEach(item => {
        dataServiceIdArr.push(item.C_ID);
        this.dataServiceName.push(item.C_NAME);
      });
      if (dataServiceIdArr.length > 0 || val.dataUserId.length > 0) {
        // 有资源没有用户
        this.dataServiceType = "1";
        this.dataServiceId = dataServiceIdArr.join(",");
        this.buttonChoiceAll = false;
        this.histogramFun();
        this.getDataServiceStatistcs();
      } else {
        // 没资源没用户
        this.buttonChoiceAllFun();
      }
    },
    // 切换
    toggleAngleFun() {
      this.pieChartChart();
    }
  }
};
</script>
<style lang="scss" scoped>
.portal-map-access {
  margin-right: 24px;
  .main {
    margin-bottom: 20px;
    width: 100%;
    border: 1px solid rgba(33, 75, 121, 0.8);
    background-color: rgba(186, 211, 245, 0.1);
    .el-button.el-button--primary.graphic {
      background-color: #3691e9;
    }
    .choice {
      padding: 30px 32px 32px 32px;
      .el-button {
        margin-left: 0;
        border-radius: 0;
        width: 102px;
        height: 30px;
        line-height: 30px;
        padding: 0px;
        border: 1px solid rgba(33, 75, 121, 0.8);
        background-color: transparent;
      }
    }
    /deep/#graphic-selection {
      height: 40px;
      margin-right: 102px;
      margin-left: 105px;
      .el-button.el-button--primary.graphic {
      background-color: #3691e9;
    }
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
      .el-radio {
        color: #fff;
      }
      .el-radio__input.is-checked .el-radio__inner {
        background-color: #3691e9;
        border-color: #3691e9;
        z-index:999;
      }
      .el-radio__input.is-checked + .el-radio__label {
        color: #3691e9;
        z-index:999;
      }
      .el-radio__inner:hover {
        border-color: #3691e9;
      }
    }
    .echart {
      padding: 0 100px;
      height: 400px;
    }
  }
}
</style>