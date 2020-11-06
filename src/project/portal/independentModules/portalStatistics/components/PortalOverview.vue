<template>
  <div class="portal-overview row-rectangle">
    <el-row :gutter="20">
      <el-col :span="5" v-for="item in statisticsNum" :key="item.id">
        <div class="rectangle" :style="item.background">
          <div class="title" ref="getheight">
            <span>{{item.name}}</span>
            <i class="el-icon-portal-gengduo1" @click="jump(item.jumpAdd)" v-if="item.id!='6'"></i>
          </div>
          <div class="frequency">
            {{item.num}}
            <span>{{$t('service.times')}}</span>
          </div>
          <div class="draw top"></div>
          <div class="draw bottom"></div>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-echarts" :gutter="20">
      <el-col :span="9">
        <div class="online-users display-box">
          <div class="title">
            <span>
              <i class="line"></i>
              {{$t('portalStatistics.OnlineUsersTotalUsers')}}
            </span>
            <!-- <i class="el-icon-portal-gengduo1" @click="jump('userStatistics')"></i> -->
          </div>
          <div class="frequency">
            <el-popover
              placement="right"
              width="280"
              trigger="hover"
              visible-arrow
              popper-class="frequency-popper"
            >
              <el-table :data="gridData" max-height="180">
                <el-table-column
                  width="100"
                  property="name"
                  :label="$t('portalStatistics.Onlineusers')"
                ></el-table-column>
                <el-table-column
                  width="180"
                  property="lastLogin"
                  :label="$t('portalStatistics.Loginduration')"
                ></el-table-column>
              </el-table>
              <span class="numFirst" slot="reference">{{currentOnlineCount}}</span>
            </el-popover>&nbsp;/&nbsp;
            <span class="numLast">{{totalUserCount}}</span>
            <span>&nbsp;&nbsp;{{$t('portalStatistics.Individual')}}</span>
          </div>
        </div>
        <div class="total-resources display-box">
          <div class="title">
            <span>
              <i class="line"></i>
              {{$t('portalStatistics.TotalResources')}}
            </span>
            <i class="el-icon-portal-gengduo1" @click="jump('portalTotalResources')"></i>
          </div>
          <div class="frequency">{{$t('portalStatistics.Total')}}：{{totalResourcesAll}}</div>
          <div class="echarts" ref="totalResources"></div>
        </div>
      </el-col>
      <el-col :span="15">
        <div class="hottest-map display-box">
          <div class="title">
            <span>
              <i class="line"></i>
              <el-dropdown @command="handleClickHottest">
                <span class="el-dropdown-link">
                  {{$t('portalStatistics.HottestResources')}}
                  <i
                    class="el-icon-arrow-down el-icon--right"
                  ></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item,i) in resourceName"
                    :key="i"
                    :command="item"
                  >{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
            <i class="el-icon-portal-gengduo1" @click="jump('portalHottestResource')"></i>
          </div>
          <div class="echarts" ref="hottestMap"></div>
        </div>
        <div class="newest-map display-box">
          <div class="title">
            <span>
              <i class="line"></i>
              <el-dropdown @command="handleClickLatest">
                <span class="el-dropdown-link">
                  {{$t('portalStatistics.LatestMapServices')}}
                  <i
                    class="el-icon-arrow-down el-icon--right"
                  ></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-for="(item,i) in resourceName"
                    :key="i"
                    :command="item"
                  >{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
            <i class="el-icon-portal-gengduo1" @click="jump('portalLatestResources')"></i>
          </div>
          <div class="echarts" ref="newestMap"></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "PortalOverview",
  data() {
    return {
      echartsDataSum: [],
      currentOnlineCount: 0,
      totalUserCount: 0,
      gridData: [],
      statisticsNum: [
        {
          name: this.$t("portalStatistics.TotalVisitsOfMapServices"),
          num: "0",
          byte: "MAPSERVICE", //后台返回数据字节
          id: "1",
          background: "background: linear-gradient(135deg, #51afea, #3d62f6)",
          jumpAdd: "portalMapAccess" //跳转地址name
        },
        {
          name: this.$t("portalStatistics.Totaldataservicevisits"),
          num: "0",
          byte: "DATASERVICE",
          id: "2",
          background: "background: linear-gradient(135deg, #76e9c0, #13c4b8)",
          jumpAdd: "portalDataAccess"
        },
        {
          name: this.$t("portalStatistics.TotalVisitsOfFunctionServices"),
          num: "0",
          byte: "FUNCTIONSERVICE",
          id: "3",
          background: "background: linear-gradient(135deg, #ff9780, #ff3d4c)",
          jumpAdd: "portalFunctionAccess"
        },

        {
          name: this.$t("portalStatistics.TotalVisitsOfDataServices"),
          num: "0",
          byte: "APPS",
          id: "4",
          background: "background: linear-gradient(135deg, #56d9ff, #1763ff)",
          jumpAdd: "portalAppAccess"
        },
        {
          name: this.$t("portalStatistics.FileDownloads"),
          num: "0",
          byte: "FILES",
          id: "5",
          background: "background: linear-gradient(135deg, #b87cf6, #903be7)",
          jumpAdd: "portalFileDownloadAccess"
        }
        // {
        //   name: this.$t("portalStatistics.TotalVisitsOfKEY"),
        //   num: "0",
        //   byte: "nullData",
        //   id: "6",
        //   background: "background: linear-gradient(135deg, #56d9ff, #1763ff)",
        //   jumpAdd: "portalKEYAccess"
        // }
      ],
      resourceName: [
        { name: this.$t("service.mapServices"), data: "mapService" },
        { name: this.$t("portalStatistics.DataService"), data: "dataService" },
        { name: this.$t("service.functionServices"), data: "functionService" },
        { name: this.$t("webAppBuilder.Apps"), data: "apps" },
        { name: this.$t("service.Files"), data: "file" }
        // { name: "KEY", data: "" }
      ],
      totalResources: [
        // { name: "KEY", num: "0", byte: "nullData" },
        { name: this.$t("service.Files"), num: "0", byte: "FILES" },
        { name: this.$t("webAppBuilder.Apps"), num: "0", byte: "APPS" },
        {
          name: this.$t("service.functionServices"),
          num: "0",
          byte: "FUNCTIONSERVICE"
        },
        {
          name: this.$t("portalStatistics.DataService"),
          num: "0",
          byte: "DATA"
        },
        { name: this.$t("service.mapServices"), num: "0", byte: "MAPSERVICE" }
      ], // 资源总数
      totalResourcesAll: 0,
      hottestMap: [], //最热门
      newestMap: [] //最新
    };
  },
  created() {
    this.styleFun();
    window.onresize = () => {
      return (() => {
        this.styleFun();
      })();
    };
    this.getOnlineUsersCount();
  },
  mounted() {
    this.getStatistcsResourcesDataList();
  },
  methods: {
    // 最新
    handleClickLatest(val) {
      this.getStatistcsResourceTime(val.data);
    },
    getStatistcsResourceTime(val) {
      this.$api.portalStatisticsApi
        .getStatistcsResourceTime(
          { resourseType: val },
          {
            loadingText: this.$t("service.searching")
          }
        )
        .then(res => {
          this.newestMap = res.data.data;
          this.newestMapFun();
        })
        .catch(() => {});
    },
    // 最热
    handleClickHottest(val) {
      this.getStatistcsResourceHist(val.data);
    },
    getStatistcsResourceHist(val) {
      this.$api.portalStatisticsApi
        .getStatistcsResourceHist(
          { resourseType: val },
          {
            loadingText: this.$t("service.searching")
          }
        )
        .then(res => {
          this.hottestMap = res.data.data;
          this.hottestMapFun();
        })
        .catch(() => {});
    },
    timer() {
      setTimeout(() => {
        this.getOnlineUsersCount();
      }, 5000);
    },
    // 获取在线用户数
    getOnlineUsersCount() {
      this.$api.portalStatisticsApi
        .getOnlineUsersCount({ loadingText: this.$t("service.searching") })
        .then(res => {
          if (res.status == 200) {
            this.currentOnlineCount = res.data.data.currentOnlineCount;
            this.gridData = res.data.data.currentOnlineUserList;
            this.totalUserCount = res.data.data.totalUserCount;
            // this.timer(); 动态获取在线用户数
          }
        })
        .catch(() => {});
    },
    // 获取门户总览 数据
    getStatistcsResourcesDataList() {
      this.$api.portalStatisticsApi
        .getStatistcsResourcesDataList({
          loadingText: this.$t("service.searching")
        })
        .then(res => {
          if (res.status == 200) {
            // 访问次数
            var visitsNumberRes = res.data.data[0].cisu[0];
            this.statisticsNum.forEach(item => {
              if (item.byte != "nullData") {
                item.num = visitsNumberRes[item.byte];
              }
            });
            // 资源总数
            var totalResourcesRes = res.data.data[0].zongsu[0];
            this.totalResources.forEach(total => {
              if (total.byte != "nullData") {
                total.num = totalResourcesRes[total.byte];
              }
            });
            // 最热门
            res.data.data[0].zuire.forEach(zuire => {
              this.hottestMap.push(zuire);
            });
            // 最新 zuixin
            res.data.data[0].zuixin.forEach(zuixin => {
              this.newestMap.push(zuixin);
            });
            this.totalResourcesFun();
            this.hottestMapFun();
            this.newestMapFun();
          }
        })
        .catch(() => {});
    },
    // 文字标题换行样式
    styleFun() {
      this.$nextTick(() => {
        var index = 0;
        this.$refs.getheight.forEach(item => {
          if (item.scrollHeight > 36) {
            this.$refs.getheight.forEach(list => {
              list.style.height = 36 + "px";
            });
          }
          if (item.scrollHeight <= 36) {
            index++;
            return index;
          }
        });
        if (index == 5) {
          this.$refs.getheight.forEach(list => {
            list.style.height = 18 + "px";
          });
        }
      });
    },
    // 页面跳转
    jump(jumpAdd) {
      this.$router.replace({ name: jumpAdd });
    },
    // 资源总数
    totalResourcesFun() {
      var totalResourcesData = [];
      var totalResourcesSeriesData = [];
      this.totalResources.forEach(item => {
        totalResourcesData.push(item.name);
        totalResourcesSeriesData.push(item.num.toString());
        this.totalResourcesAll += Number(item.num);
      });
      var myChart = this.$echarts.init(this.$refs.totalResources);
      window.addEventListener("resize", () => {
        myChart.resize();
      });
      myChart.setOption({
        yAxis: {
          // 网格线
          splitLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.2)",
              width: 1,
              type: "solid"
            }
          },
          // 不显示刻度
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
          // 坐标轴颜色
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.4)"
            }
          },
          type: "category",
          data: totalResourcesData,
          itemStyle: {
            narmal: {
              color: "orange"
            }
          }
        },
        grid: {
          x: "15%",
          y: "1%",
          width: "75%",
          height: "80%"
        },
        xAxis: {
          type: "value",
          axisTick: {
            show: false
          },
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
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,0.4)"
            }
          }
        },
        series: [
          {
            data: totalResourcesSeriesData,
            type: "bar",
            barWidth: "30%",
            itemStyle: {
              normal: {
                //每根柱子颜色设置
                color: function(params) {
                  let colorList = [
                    "#A15EEC",
                    "#FF4C61",
                    "#41D6B8",
                    "#4472F9",
                    "#0287EC"
                  ];
                  return colorList[params.dataIndex];
                }
              }
            },
            //柱状图上显示数据
            label: {
              show: "true",
              position: "right",
              color: "#FFF",
              fontSize: "14"
            }
          }
        ]
      });
    },
    // 最热门地图服务
    hottestMapFun() {
      var hottestMapData = [];
      var hottestMapSeriesData = [];
      var hottestMapSeriesDatas = [];
      this.hottestMap.forEach(item => {
        hottestMapData.push(item.NAME);
        hottestMapSeriesData.push(item.HITS);
        hottestMapSeriesDatas.push({ value: item.HITS, symbol: "none" });
      });
      var hottestMapChart = this.$echarts.init(this.$refs.hottestMap);
      window.addEventListener("resize", () => {
        hottestMapChart.resize();
      });
      hottestMapChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none"
          },
          formatter: function(params) {
            return params[0].name + ": " + params[0].value;
          }
        },
        grid: {
          x: "10%",
          y: "1%",
          width: "80%",
          height: "90%"
        },
        xAxis: {
          data: hottestMapData,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            textStyle: {
              color: "#fff"
            }
          }
        },
        yAxis: {
          splitLine: {
            show: false,
            lineStyle: {
              color: "#0494FF",
              width: 1,
              type: "solid"
            }
          },
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { show: false }
        },
        visualMap: {
          min: 10,
          max: 100,
          show: false,
          inRange: {
            color: ["#0394FF", "#0394FF"],
            opacity: 1
          }
        },
        series: [
          {
            name: "hill",
            type: "pictorialBar",
            barCategoryGap: "-130%",
            symbol:
              "path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z",
            itemStyle: {
              normal: {
                opacity: 0.5
              },
              emphasis: {
                opacity: 1
              }
            },
            data: hottestMapSeriesData,
            z: 10
          },
          {
            name: "glyph",
            type: "pictorialBar",
            barGap: "-100%",
            symbolPosition: "end",
            symbolSize: 50,
            symbolOffset: [0, "-120%"],
            label: {
              show: "true",
              position: ["45%", "30%"],
              color: "#FFF",
              fontSize: "12"
            },
            data: hottestMapSeriesDatas
          }
        ]
      });
    },
    //最新地图服务
    newestMapFun() {
      var legendData = [];
      var seriesType = [];
      var seriesList = [];
      this.newestMap.forEach(item => {
        if (item.TYPE == "mapService") {
          item.TYPE = this.$t("service.mapServices");
        } else if (item.TYPE == "functionService") {
          item.TYPE = this.$t("service.functionServices");
        } else if (item.TYPE == "senceService") {
          item.TYPE = this.$t("service.scene");
        } else if (item.TYPE == "file") {
          item.TYPE = this.$t("service.Files");
        } else if (item.TYPE == "appbuilder") {
          item.TYPE = this.$t("webAppBuilder.Apps");
        }
        seriesType.push({ name: item.TYPE });
      });
      seriesList = seriesType.reduce(function(prev, element) {
        if (!prev.find(el => el.name == element.name)) {
          prev.push(element);
        }
        return prev;
      }, []);
      var typeArr = [];
      seriesList.forEach(list => {
        var number = 0;
        this.newestMap.forEach(el => {
          if (el.TYPE == list.name) {
            typeArr.push({ value: 1, name: el.NAME });
            number = number + 1;
          }
        });
        list.value = number;
      });
      var seriesTypeArr = [];
      seriesList.forEach(is => {
        seriesTypeArr.push({
          value: is.value,
          name: is.name
        });
        legendData.push(is.name);
      });
      typeArr.forEach(it => {
        legendData.push(it.name);
      });
      this.echartsDataSum.legendData = legendData;
      this.echartsDataSum.seriesType = seriesTypeArr;
      this.echartsDataSum.typeArr = typeArr;
      var histogramEchart = this.$echarts.init(this.$refs.newestMap, "light");
      window.addEventListener("resize", () => {
        histogramEchart.resize();
      });
      histogramEchart.setOption(
        {
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
            textStyle: {
              color: "#fff"
            },
            top: 10,
            left: 20,
            orient: "vertical",
            x: "left",
            data: this.echartsDataSum.legendData
          },
          series: [
            {
              name: this.$t("portalStatistics.TotalResources"),
              type: "pie",
              selectedMode: "single",
              radius: [0, "60%"],
              center: ["60%", "50%"],
              label: {
                normal: {
                  position: "inner"
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data: this.echartsDataSum.seriesType
            },
            {
              name: this.$t("portalStatistics.TotalResources"),
              type: "pie",
              radius: ["70%", "100%"],
              center: ["60%", "50%"],
              data: this.echartsDataSum.typeArr,
              label: {
                show: false
              }
            }
          ]
        },
        true
      );
    }
    // newestMapFun() {
    //   debugger;
    //   var newestMapData = [];
    //   var newestMapSeriesData = [];
    //   this.newestMap.forEach(item => {
    //     newestMapData.push(item.NAME);
    //     newestMapSeriesData.push(item.NUM);
    //   });
    //   var newestMapChart = this.$echarts.init(this.$refs.newestMap);
    //   window.addEventListener("resize", () => {
    //     newestMapChart.resize();
    //   });
    //   newestMapChart.setOption({
    //     color: ["#19b7cf"],
    //     grid: {
    //       x: "8%",
    //       y: "18%",
    //       width: "90%",
    //       height: "74%"
    //     },
    //     xAxis: {
    //       type: "category",
    //       data: newestMapData,
    //       splitLine: {
    //         show: true,
    //         lineStyle: {
    //           color: "rgba(255,255,255,0.2)",
    //           width: 1,
    //           type: "solid"
    //         }
    //       },
    //       axisTick: {
    //         show: false
    //       },
    //       axisLabel: {
    //         show: true,
    //         textStyle: {
    //           color: "#fff",
    //           fontSize: 10
    //         }
    //       },
    //       axisLine: {
    //         show: true,
    //         lineStyle: {
    //           color: "rgba(255,255,255,0.4)"
    //         }
    //       }
    //     },
    //     yAxis: {
    //       type: "value",
    //       splitLine: {
    //         show: true,
    //         lineStyle: {
    //           color: "rgba(255,255,255,0.2)",
    //           width: 1,
    //           type: "solid"
    //         }
    //       },
    //       axisTick: {
    //         show: false
    //       },
    //       axisLabel: {
    //         show: true,
    //         textStyle: {
    //           color: "#fff",
    //           fontSize: 10
    //         }
    //       },
    //       axisLine: {
    //         show: true,
    //         lineStyle: {
    //           color: "rgba(255,255,255,0.4)"
    //         }
    //       }
    //     },
    //     series: [
    //       {
    //         data: newestMapSeriesData,
    //         type: "bar",
    //         barWidth: 42,
    //         label: {
    //           show: "true",
    //           position: "top",
    //           color: "#FFF",
    //           fontSize: "14"
    //         }
    //       }
    //     ]
    //   });
    // }
  },
  destroyed() {
    clearInterval(this.timer);
  }
};
</script>
<style lang="scss">
.frequency-popper.el-popover {
  // background: #1c2e4e;
  background: rgba(28, 46, 78, 0.9);
  border: 1px solid rgba(33, 75, 121, 0.8);
  .el-table {
    color: #fff;
  }
  ::-webkit-scrollbar-track-piece {
    background-color: rgba(28, 46, 78, 0.9);
  }
  ::-webkit-scrollbar {
    width: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(72, 97, 146, 0.3);
  }
  .el-table th,
  .el-table tr {
    background-color: rgba(28, 46, 78, 1);
  }
  .el-table thead {
    color: #fff;
    font-weight: normal;
  }
  .el-table td,
  .el-table th.is-leaf {
    border-bottom: 1px solid rgba(33, 75, 121, 0.8);
  }
  .el-table th > .cell {
    font-weight: normal;
  }
  .el-table::before {
    background-color: rgba(33, 75, 121, 0.8);
  }
  .el-table--enable-row-hover .el-table__body tr:hover > td {
    background-color: rgba(28, 46, 78, 0.9);
    color: #fff;
  }
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
  }
}
</style>
<style lang="scss" scoped>
.portal-overview {
  margin: 10px;
  @media screen and (min-width: 10px) {
    .el-col-5 {
      width: 19.83333%;
    }
  }
  .rectangle {
    width: 100%;
    position: relative;
    overflow: hidden;
    border-radius: 4px;
    color: #fff;
    height: 116px;
    .title {
      width: 70%;
      margin: 26px 16px 20px 16px;
      .el-icon-portal-gengduo1 {
        cursor: pointer;
        position: absolute;
        right: 12px;
        top: 27px;
        font-size: 18px;
        z-index: 99;
      }
    }
    .frequency {
      margin: 0px 0px 20px 16px;
      font-size: 32px;
      span {
        font-size: 14px;
      }
    }
    .draw {
      border-radius: 50%;
      background: red;
      position: absolute;
      right: 0;
    }
    .top {
      width: 150px;
      height: 150px;
      top: -45px;
      right: -60px;
      background: rgba(255, 255, 255, 0.1);
    }
    .bottom {
      width: 150px;
      height: 150px;
      bottom: -80px;
      right: -40px;
      background: rgba(255, 255, 255, 0.1);
    }
  }

  .row-echarts {
    .display-box {
      margin: 10px 10px 10px 0;
      width: 100%;
      border: 1px solid rgba(33, 75, 121, 0.8);
      background-color: rgba(186, 211, 245, 0.1);
      border-radius: 4px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
    }
    .online-users {
      .title {
        position: relative;
        margin: 12px 0px 0px 16px;
        color: #fff;
        span {
          border-bottom: 1px solid #fff;
          padding-bottom: 6px;
          .line {
            margin: 0 12px -2px 4px;
            width: 4px;
            height: 15px;
            display: inline-block;
            background-color: #3691e9;
          }
        }
        .el-icon-portal-gengduo1 {
          cursor: pointer;
          position: absolute;
          right: 12px;
          font-size: 18px;
        }
      }
      .frequency {
        margin: 40px 16px 44px 16px;
        font-size: 30px;
        color: #0487ed;
        span.numFirst {
          font-size: 30px;
          color: #44d6bc;
          cursor: pointer;
        }
        span.numLast {
          font-size: 30px;
          color: #0487ed;
        }
        span {
          font-size: 16px;
          color: #fff;
        }
      }
    }
    .total-resources {
      width: 100%;
      height: 370px;
      .title {
        position: relative;
        margin: 12px 0px 0px 16px;
        color: #fff;
        span {
          border-bottom: 1px solid #fff;
          padding-bottom: 6px;
          .line {
            margin: 0 12px -2px 4px;
            width: 4px;
            height: 15px;
            display: inline-block;
            background-color: #3691e9;
          }
        }
        .el-icon-portal-gengduo1 {
          cursor: pointer;
          position: absolute;
          right: 12px;
          font-size: 18px;
        }
      }
      .frequency {
        margin: 26px 16px 32px 16px;
        font-size: 16px;
        color: #35c9bd;
        text-align: center;
      }
      .echarts {
        width: 100%;
        height: 75%;
      }
    }
    .hottest-map {
      width: 98%;
      height: 260px;
      .title {
        position: relative;
        margin: 12px 0px 0px 16px;
        color: #fff;
        span {
          border-bottom: 1px solid #fff;
          padding-bottom: 6px;
          .line {
            margin: 0 12px -2px 4px;
            width: 4px;
            height: 15px;
            display: inline-block;
            background-color: #3691e9;
          }
          .el-dropdown {
            color: #fff;
            font-size: 16px;
          }
        }
        .el-icon-portal-gengduo1 {
          cursor: pointer;
          position: absolute;
          right: 12px;
          font-size: 18px;
        }
      }
      .echarts {
        height: 80%;
        width: 100%;
      }
    }
    .newest-map {
      width: 98%;
      height: 260px;
      .title {
        position: relative;
        margin: 12px 0px 0px 16px;
        color: #fff;
        .el-icon-portal-gengduo1 {
          cursor: pointer;
          position: absolute;
          right: 12px;
          font-size: 18px;
        }
        span {
          border-bottom: 1px solid #fff;
          padding-bottom: 6px;
          .line {
            margin: 0 12px -2px 4px;
            width: 4px;
            height: 15px;
            display: inline-block;
            background-color: #3691e9;
          }
          .el-dropdown {
            color: #fff;
            font-size: 16px;
          }
        }
      }
      .echarts {
        height: 80%;
        width: 100%;
      }
    }
  }
}
</style>