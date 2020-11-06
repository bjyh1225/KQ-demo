<template>
  <el-row id="time-slot">
    <el-col>
      <span>{{$t('myCenter.Type')}}：</span>
      <el-button-group>
        <el-button
          v-for="item in typeData"
          :key="item.id"
          type="primary"
          :class="item.active?'graphic':''"
          @click="switchingFun(item)"
        >{{item.data}}</el-button>
      </el-button-group>
    </el-col>
    <el-col>
      <span>{{$t('portalStatistics.TotalTips')}}：</span>
      <el-input-number v-model="num"  :min="0" :max="30" @blur='handleBlur' @change='handleChange'></el-input-number>
      <el-button
        type="primary"
        class="export-btn"
        @click="downloadResourcesNumFun"
      >{{$t('portalStatistics.Export')}}</el-button>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "PortalStatisticsNumTitleSlot",
  data() {
    return {
      // 类型
      typeData: [
        {
          data: this.$t("service.mapServices"),
          id: "1",
          active: true,
          flag: "mapService"
        },
        {
          data: this.$t("service.functionServices"),
          id: "2",
          active: false,
          flag: "functionService"
        },
        {
          data: this.$t("webAppBuilder.Apps"),
          id: "3",
          active: false,
          flag: "apps"
        },

        {
          data: this.$t("service.Files"),
          id: "4",
          active: false,
          flag: "file"
        },
        // {
        //   data: "KEY",
        //   id: "5",
        //   active: false,
        //   flag: "key"
        // },
        {
          data: this.$t("portalStatistics.All"),
          id: "6",
          active: false,
          flag: "",
          handleBlurPrevent:false
        }
      ],
      // 个数
      num: 10,
      resourseType: "mapService"
    };
  },
  mounted() {
    this.$emit("changeFun", {
      resourseType: this.resourseType,
      num: this.num
    });
  },
  methods: {
    // 导出
    downloadResourcesNumFun() {
      this.$emit("downloadResourcesNumFun", {
        resourseType: this.resourseType,
        num: this.num
      });
    },
    switchingFun(val) {
      this.typeData.forEach(Element => {
        if (Element.id == val.id) {
          Element.active = true;
        } else {
          Element.active = false;
        }
      });
      this.resourseType = val.flag;
      this.$emit("changeFun", {
        resourseType: this.resourseType,
        num: this.num
      });
    },
    handleChange(val){
this.handleBlurPrevent=true;
      this.num = val;
      this.$emit("changeFun", {
        resourseType: this.resourseType,
        num: this.num
      });
    },
     handleBlur(val) {
      if(!this.handleBlurPrevent){        
this.num = Number(val.srcElement.value);
      this.$emit("changeFun", {
        resourseType: this.resourseType,
        num: this.num
      });
      }else{
        this.handleBlurPrevent=false;
      }
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
    }
    .el-button-group {
      .el-button {
        padding: 6px 16px;
        border-radius: 0;
        background-color: transparent;
        border-color: rgba(33, 75, 121, 0.8);
      }
      .el-button.graphic {
        background-color: #3691e9;
      }
    }
    /deep/.el-input-number {
      height: 35px;
      line-height: 35px;
      .el-input__inner {
        height: 35px;
        line-height: 35px;
        &:focus {
          border: 1px solid #fff;
        }
      }
      .el-input-number__decrease,
      .el-input-number__increase {
        height: 34px;
        background: #3691e9;
        &:hover:not(.is-disabled) {
          color: #ccc;
        }
        color: #fff;
      }
      .el-input-number__decrease {
        border-right: 1px solid #3691e9;
      }
      .el-input-number__increase {
        border-left: 1px solid #3691e9;
      }
      .el-input {
        .el-input__inner {
          background-color: rgba(14, 22, 45, 0.7);
          color: #fff;
          border: 1px solid #3691e9;
        }
      }
    }
  }
}
</style>