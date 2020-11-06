<template>
  <div class="portal-map-access">
    <el-row>
      <el-col>
        <portal-statistics-content-title :titleData="titleName"></portal-statistics-content-title>
      </el-col>
      <el-col>
        <portal-statistics-num-title-slot
          @changeFun="changeFun"
          @downloadResourcesNumFun="downloadResourcesListTime"
        ></portal-statistics-num-title-slot>
      </el-col>
      <el-col class="main">
        <div class="echart" ref="histogramEchart"></div>
        <div class="table">
          <div class="title">{{$t('portalStatistics.DetailsOfLatestResources')}}</div>
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
            <span>{{$t('portalStatistics.DetailsOfLatestResources')}}- {{totalPage}}{{$t('pagination.TradeTotal')}} {{total}} {{$t('pagination.RecordsInTotal')}}</span>
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
    <portal-statistics-map-dialog ref="dialogPortal"></portal-statistics-map-dialog>
  </div>
</template>
<script>
import PortalStatisticsContentTitle from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsContentTitle";
import PortalStatisticsNumTitleSlot from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsNumTitleSlot";
import PortalStatisticsMapDialog from "portal/independentModules/portalStatistics/portalStatisticsContent/PortalStatisticsMapDialog";
export default {
  name: "PortalLatestResources",
  components: {
    PortalStatisticsContentTitle,
    PortalStatisticsNumTitleSlot,
    PortalStatisticsMapDialog
  },
  data() {
    return {
      titleName: this.$t("portalStatistics.LatestMapServices"),
      tableData: [],
      tableCol: [
        {
          prop: "name",
          label: this.$t("management.ResourceName"),
          width: "25%"
        },
        { prop: "type", label: this.$t("myCenter.Type"), width: "25%" },
        {
          prop: "owner",
          label: this.$t("portalStatistics.Owner"),
          width: "25%"
        },
        {
          prop: "time",
          label: this.$t("management.creationTime"),
          width: "25%"
        }
      ],
      total: 0,
      pageSize: 10,
      pageIndex: 1,
      totalPage: 0, //总页数
      echartsDataSum: {},
      tableDataSum: [],
      numberResources: 0
    };
  },
  methods: {
    // 导出
    downloadResourcesListTime(val) {
      var url = "";
      url =
        window.location.href.replace(this.$route.path, "") +
        `/api/Statistcs/select/downloadResourcesListTime?personnelId=${this.$store.getters.userInfo.id}&num=${val.num}&resourseType=${val.resourseType}`;
      window.open(url);
      // const link = document.createElement("a");
      // link.style.display = "none";
      // link.setAttribute("href", url);
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    },
    changeFun(val) {
      if (!val.num) {
        this.$message({
          message: this.$t(
            "portalStatistics.Thepromptnumbermustbeanintegergreaterthan0"
          ),
          type: "warning"
        });
      } else {
        this.numberResources = val;
        this.getStatistcsResourceTime(val);
      }
    },
    // 请求
    getStatistcsResourceTime(val) {
      this.$api.portalStatisticsApi
        .getStatistcsResourceTime(val, {
          loadingText: this.$t("service.searching")
        })
        .then(res => {
          var legendData = [];
          var seriesType = [];
          var seriesList = [];
          this.tableData = [];
          this.tableDataSum = [];
          this.total = res.data.data.length;
          this.pageIndex = 1;
          this.totalPage = Math.ceil(this.total / this.pageSize);
          res.data.data.forEach(item => {
            this.tableDataSum.push({
              name: item.NAME,
              type: item.TYPE,
              owner: item.USERNAME,
              time: item.CREATETIME
            });
            seriesType.push({ name: item.TYPE });
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
          seriesList = seriesType.reduce(function(prev, element) {
            if (!prev.find(el => el.name == element.name)) {
              prev.push(element);
            }
            return prev;
          }, []);
          var typeArr = [];
          seriesList.forEach(list => {
            var number = 0;
            res.data.data.forEach(el => {
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
          this.echartsDataSum.seriesType[0].selected = true;
          this.echartsDataSum.typeArr = typeArr;
          this.initChart();
        })
        .catch(() => {});
    },
    // 分页
    handleCurrentChange(val) {
      this.changePageFun(val);
    },
    // 首页
    homePageClick() {
      this.changePageFun(1);
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
    // 尾页
    TailPageClick() {
      this.changePageFun(this.totalPage);
    },
    // 饼状图
    initChart() {
      var histogramEchart = this.$echarts.init(
        this.$refs.histogramEchart,
        "light"
      );
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
            top: 40,
            orient: "vertical",
            x: "left",
            data: this.echartsDataSum.legendData
          },
          title: {
            text: this.$t("portalStatistics.LatestMapServicesc"),
            textStyle: {
              color: "#fff",
              fontSize: 16,
              fontWeight: "normal"
            }
          },
          series: [
            {
              name: this.$t("portalStatistics.TotalResources"),
              type: "pie",
              selectedMode: "single",
              radius: [0, "30%"],
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
              radius: ["40%", "55%"],
              label: {
                normal: {
                  formatter:
                    "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c|{c}}  {per|{d}%}  ",
                  backgroundColor: "rgba(14, 22, 45,.7)",
                  borderColor: "rgba(44, 129, 210,.8)",
                  borderWidth: 1,
                  borderRadius: 4,
                  boxShadow: "5px 0px 5px rgba(0, 0, 0, 0.2)",
                  rich: {
                    a: {
                      color: "#fff",
                      lineHeight: 22,
                      align: "center"
                    },
                    hr: {
                      borderColor: "rgba(44, 129, 210,.8)",
                      width: "100%",
                      borderWidth: 0.5,
                      height: 0
                    },
                    b: {
                      fontSize: 12,
                      lineHeight: 30,
                      color: "#fff"
                    },
                    c: {
                      fontSize: 12,
                      lineHeight: 30,
                      color: "#fff"
                    },
                    per: {
                      color: "#fff",
                      backgroundColor: "#2c6eb4",
                      padding: [2, 4],
                      borderRadius: 2
                    }
                  }
                }
              },
              data: this.echartsDataSum.typeArr
            }
          ]
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
    .echart {
      padding: 60px 80px 0;
      height: 400px;
    }
    .table {
      border-top: 1px solid rgba(33, 75, 121, 0.8);
      padding: 10px 0;
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