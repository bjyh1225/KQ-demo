<template>
  <el-row id="time-slot">
    <el-col>
      <span>{{$t('service.time')}}：</span>
      <el-button-group>
        <el-button
          v-for="item in timeSlotData"
          :key="item.id"
          type="primary"
          :class="item.active?'graphic':''"
          @click="switchingFun(item)"
        >{{item.data}}</el-button>
      </el-button-group>
    </el-col>
    <el-col>
      <span>{{$t('portalStatistics.Start')}}：</span>
      <el-date-picker
        v-model="serviceStatistcsData.startTime"
        type="date"
        value-format="yyyy-MM-dd"
        :placeholder="$t('portalStatistics.SelectDate')"
        @change="startTimeStatus"
        :picker-options="pickerOptionsStart"
      ></el-date-picker>
      <span>{{$t('portalStatistics.End')}}：</span>
      <el-date-picker
        v-model="serviceStatistcsData.endTime"
        type="date"
        value-format="yyyy-MM-dd"
        :placeholder="$t('portalStatistics.SelectDate')"
        @change="endTimeStatus"
        :picker-options="pickerOptionsEnd"
      ></el-date-picker>
      <el-button-group>
        <el-button
          type="primary"
          v-for="list in specificDate"
          :key="list.id"
          :class="list.active?'graphic':''"
          :disabled="list.disabled"
          @click="specificFun(list)"
        >{{list.data}}</el-button>
      </el-button-group>
      <el-button
        v-if="exportBoolean"
        type="primary"
        class="export-btn"
        @click="downloadResourcesListFun"
      >{{$t('portalStatistics.Export')}}</el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "PortalStatisticsContentTimeSlot",
  props: {
    exportBoolean: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 时间
      timeSlotData: [
        {
          data: this.$t("portalStatistics.Today"),
          id: "1",
          active: false,
          summaryDays: 0
        },
        {
          data: this.$t("portalStatistics.LastWeek"),
          id: "2",
          active: false,
          summaryDays: 7
        },
        {
          data: this.$t("portalStatistics.LastMonth"),
          id: "3",
          active: true,
          summaryDays: 30
        },
        {
          data: this.$t("portalStatistics.Last3Months"),
          id: "4",
          active: false,
          summaryDays: 3
        },
        {
          data: this.$t("portalStatistics.Last6Months"),
          id: "5",
          active: false,
          summaryDays: 6
        },
        {
          data: this.$t("portalStatistics.LastYear"),
          id: "6",
          active: false,
          summaryDays: 12
        },
        {
          data: this.$t("portalStatistics.All"),
          id: "7",
          active: false,
          summaryDays: "all"
        }
      ],
      // 年月日
      specificDate: [
        {
          data: this.$t("portalStatistics.Hour"),
          id: "1",
          active: false,
          disabled: false,
          transferValue: "HH"
        },
        {
          data: this.$t("portalStatistics.Day"),
          id: "2",
          disabled: false,
          active: true,
          transferValue: "DD"
        },
        {
          data: this.$t("portalStatistics.Month"),
          id: "3",
          disabled: false,
          active: false,
          transferValue: "MM"
        }
      ],
      timeDate: true, //按时
      serviceStatistcsData: {
        personnelId: this.$store.getters.userInfo.id,
        timeType: "DD", //3格选择
        startTime: "", //选择开始日期
        endTime:
          new Date().getFullYear() +
          "-" +
          (new Date().getMonth() + 1) +
          "-" +
          new Date().getDate() //选择结束日期
      },
      pickerOptionsStart: {
        disabledDate: time => {
          let endDateVal = this.serviceStatistcsData.endTime;
          if (endDateVal) {
            return new Date(endDateVal).getTime() < time.getTime();
          } else {
            return time.getTime() > Date.now();
          }
        }
      },
      pickerOptionsEnd: {
        disabledDate: time => {
          let beginDateVal = this.serviceStatistcsData.startTime;
          if (beginDateVal) {
            return (
              time.getTime() > Date.now() ||
              time.getTime() < new Date(beginDateVal).getTime() - 8.64e7
            );
          } else {
            return time.getTime() < Date.now();
          }
        }
      }
    };
  },
  mounted() {
    this.serviceStatistcsData.endTime = this.dateListFun(0);
    this.serviceStatistcsData.startTime = this.dateListFun(0);
    this.switchingFun({
      data: this.$t("portalStatistics.LastMonth"),
      id: "3",
      active: true,
      summaryDays: 30
    });
  },
  watch: {
    // 深度监听对象的属性
    serviceStatistcsData: {
      handler: function() {
        this.$emit("getServiceStatistcsData", this.serviceStatistcsData);
      },
      deep: true
    }
  },
  methods: {
    // 导出
    downloadResourcesListFun() {
      this.$emit("downloadResourcesListFun", this.serviceStatistcsData);
    },
    // 获取最近天数日期函数
    dateListFun(val) {
      let t = new Date(Date.now() - 86400000 * val);
      let str = `${t.getFullYear()}-${
        t.getMonth() + 1 > 9 ? t.getMonth() + 1 : "0" + (t.getMonth() + 1)
      }-${t.getDate() > 9 ? t.getDate() : "0" + t.getDate()}`;
      return str;
    },
    // 获取最近月数日期函数
    getPreMonthDay(date, monthNum) {
      let dateArr = date.split("-");
      let year = dateArr[0];
      let month = dateArr[1];
      let day = dateArr[2];
      let year2 = year;
      let month2 = parseInt(month) - monthNum;
      if (month2 <= 0) {
        year2 =
          parseInt(year2) -
          parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1);
        month2 = 12 - (Math.abs(month2) % 12);
      }
      let day2 = day;
      let days2 = new Date(year2, month2, 0);
      days2 = days2.getDate();
      if (day2 > days2) {
        day2 = days2;
      }
      if (month2 < 10) {
        month2 = "0" + month2;
      }
      let t2 = year2 + "-" + month2 + "-" + day2;
      return t2;
    },
    // 按时 按钮禁用
    buttonDisabledFun() {
      if (this.specificDate[0].active) {
        this.specificDate[0].active = false;
        this.specificDate[1].active = true;
        this.specificFun(this.specificDate[1]);
      }
      this.specificDate[0].disabled = true;
    },
    // 7格时间选择
    switchingFun(val) {
      this.timeSlotData.forEach(Element => {
        if (Element.id == val.id) {
          Element.active = true;
        } else {
          Element.active = false;
        }
      });
      this.serviceStatistcsData.endTime = this.dateListFun(0);
      if (val.summaryDays == 0) {
        this.serviceStatistcsData.startTime = this.serviceStatistcsData.endTime;
        this.specificDate[0].disabled = false;
      } else if (val.summaryDays == 7) {
        this.serviceStatistcsData.startTime = this.dateListFun(
          val.summaryDays - 1
        );
        this.specificDate[0].disabled = false;
      } else if (val.summaryDays == 30) {
        this.serviceStatistcsData.startTime = this.dateListFun(
          val.summaryDays - 1
        );
        this.buttonDisabledFun();
      } else if (val.summaryDays == 3) {
        this.serviceStatistcsData.startTime = this.getPreMonthDay(
          this.serviceStatistcsData.endTime,
          3
        );
        this.buttonDisabledFun();
      } else if (val.summaryDays == 6) {
        this.serviceStatistcsData.startTime = this.getPreMonthDay(
          this.serviceStatistcsData.endTime,
          6
        );
        this.buttonDisabledFun();
      } else if (val.summaryDays == 12) {
        this.serviceStatistcsData.startTime = this.getPreMonthDay(
          this.serviceStatistcsData.endTime,
          12
        );
        this.buttonDisabledFun();
      } else {
        this.serviceStatistcsData.startTime = null;
        this.buttonDisabledFun();
      }
    },
    // 3格时间选择
    specificFun(val) {
      this.specificDate.forEach(Element => {
        if (Element.id == val.id) {
          Element.active = true;
        } else {
          Element.active = false;
        }
      });
      this.serviceStatistcsData.timeType = val.transferValue;
    },
    //开始时间
    startTimeStatus(value) {
if((Date.parse(this.serviceStatistcsData.endTime)-Date.parse(value))/ (1000*3600*24*6)>1){
      this.buttonDisabledFun();
      }else{
        this.specificDate[0].disabled = false;
      } 
      this.serviceStatistcsData.startTime = value;
      this.timeSlotData.forEach(Element => {
        Element.active = false;
      });
      
    },
    // 结束时间
    endTimeStatus(value) {
      if((Date.parse(value)-Date.parse(this.serviceStatistcsData.startTime))/ (1000*3600*24*7)>1){
      this.buttonDisabledFun();
      }else{
        this.specificDate[0].disabled = false;
      }  
      this.serviceStatistcsData.endTime = value;
      this.timeSlotData.forEach(Element => {
        Element.active = false;
      });
       
    }
  }
};
</script>
<style lang="scss" scoped>

#time-slot {
  color: #fff;
  background-color: rgba(186, 211, 245, 0.1);
  border: 1px solid rgba(33, 75, 121, 0.8);
  padding: 20px 32px;
  margin-bottom: 16px;
  .el-col:nth-child(1) {
    padding-bottom: 18px;
  }
  .el-col {
    .export-btn.el-button {
      margin-left: 40px;
      padding: 6px 16px;
      border-radius: 0;
      background-color: transparent;
      border-color: rgba(33, 75, 121, 0.8);
      &:hover {
        background-color: #3691e9;
      }
    }
    .el-button-group {
      .el-button {
        padding: 6px 16px;
        border-radius: 0;
        background-color: transparent;
        border-color: rgba(33, 75, 121, 0.8);
      }
      .el-button.graphic {
        // @include base-bg-font();
        background-color: #3691e9;
      }
    }
    /deep/.el-date-editor.el-input.el-input--prefix.el-input--suffix.el-date-editor--date {
      margin-right: 30px;
      width: 190px;
      .el-input__inner {
        height: 28px;
        line-height: 28px;
        border-radius: 0;
        background-color: transparent;
        border: 1px solid rgba(33, 75, 121, 0.8);
        color: #fff;
      }
      .el-input__icon {
        line-height: 28px;
      }
    }
  }
}
</style>