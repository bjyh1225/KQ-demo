<template>
  <el-row class="visualization">
    <transition
      enter-active-class="animated fadeInLeft fix"
      leave-active-class="animated fadeOutLeft fix"
    >
      <el-row class="visualization-container" v-show="!previewStatus">
        <visualization-header @goBack="goBack" @preview="preview" @clear="clearData" @save="save"></visualization-header>
        <visualization-component-box
          class="left visualization-height"
          @switchComponentBox="switchComponentBox"
          :style="componentBoxStyle"
          :heightInfo="height"
        ></visualization-component-box>
        <visualization-workspace
          class="middle visualization-height"
          :style="workspaceStyle"
          :dataList="dataList"
          :headerInfo="headerInfo"
        ></visualization-workspace>
        <visualization-bar
          class="right visualization-height"
          :dataList="dataList"
          :heightInfo="height"
        ></visualization-bar>
        <transition
          enter-active-class="animated slideInRight"
          leave-active-class="animated bounceOutRight"
        >
          <visualization-property-set
            class="right visualization-height"
            :currentPropertySetInfo="currentPropertySetInfo"
            v-show="propertySetStatus"
            @close="switchProperty"
            :heightInfo="height"
          ></visualization-property-set>
        </transition>
      </el-row>
    </transition>
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    >
      <el-row class="visualization-preview-container" v-show="previewStatus">
        <preview @goBack="backToVisualization" :dataList="previewData"></preview>
      </el-row>
    </transition>
  </el-row>
</template>

<script>
import { defaultHeader } from "portal/independentModules/visualization/config/defaultVisualization.js";
import VisualizationHeader from "portal/independentModules/visualization/visualizationComponents/VisualizationHeader";
import VisualizationWorkspace from "portal/independentModules/visualization/visualizationComponents/VisualizationWorkspace";
import VisualizationComponentBox from "portal/independentModules/visualization/visualizationComponents/VisualizationComponentBox";
import VisualizationBar from "portal/independentModules/visualization/visualizationComponents/VisualizationBar";
import Preview from "portal/independentModules/visualization/visualizationComponents/Preview";
import VisualizationPropertySet from "portal/independentModules/visualization/visualizationComponents/VisualizationPropertySet";
import { getDefaultCarouselFigure } from "common/config/theme/theme.js";
export default {
  name: "Visualization",
  components: {
    VisualizationHeader,
    VisualizationWorkspace,
    VisualizationComponentBox,
    VisualizationBar,
    Preview,
    VisualizationPropertySet
  },
  computed: {
    time() {
      return this.$store.getters.commonTimeStamp;
    }
  },
  watch: {
    time() {
      var type = this.$store.getters.commonEventType;
      var source = this.$store.getters.commonSource;
      if (type == "setProperty" && source == "visualization") {
        this.currentPropertySetInfo = this.$store.getters.commonParams;
        this.propertySetStatus = true;
      }
    }
  },
  data() {
    return {
      componentBoxStyle: "",
      workspaceStyle: "",
      height: 300,
      previewStatus: false,
      dataList: [],
      headerInfo: defaultHeader, //头部信息
      previewData: [],
      propertySetStatus: false,
      currentPropertySetInfo: {}, //属性设置信息
      currentParamsConfigId: "", //参数Id
      paramsConfigStatus: true
    };
  },
  methods: {
    //切换组件面板
    switchComponentBox(status) {
      if (status) {
        this.componentBoxStyle = "width:220px";
        this.workspaceStyle = "margin-left:220px";
      } else {
        this.componentBoxStyle = "width:66px";
        this.workspaceStyle = "margin-left:66px";
      }
    },
    //切换属性面板
    switchProperty() {
      this.propertySetStatus = false;
    },
    //返回首页
    goBack() {
      this.$router.push("/");
    },
    //预览
    preview() {
      var data = JSON.parse(JSON.stringify(this.dataList));
      data.unshift(JSON.parse(JSON.stringify(this.headerInfo)));
      this.previewData = data;
      this.previewStatus = true;
    },
    backToVisualization() {
      this.previewStatus = false;
    },
    clearData() {
      //清空
      this.dataList = [];
    },
    save() {
      if (!this.paramsConfigStatus) {
        this.$message({
          message: this.$t("management.EnableItBeforeConfiguration"),
          type: "warning"
        });
        return false;
      }
      //保存
      if (this.dataList.length == 0) {
        this.$confirm(this.$t("visualization.NoComponentsMovedSavingFailed"))
          .then(() => {})
          .catch(() => {});
        return false;
      }
      var data = {
        dataList: this.dataList,
        headerInfo: this.headerInfo
      };
      this.$api.visualizationApi
        .saveSysParamConfigure(
          {
            key: "visualizationInfo",
            value: this.Base64.encode(JSON.stringify(data)),
            force: true,
            id: this.currentParamsConfigId
          },
          { loadingText: this.$t("webAppBuilder.BeingSaved"),coverStatusCode:{395:{needAlertMessage:false}} }
        )
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
          this.$store.dispatch("visualization/setVisualizationComponents", []);
          this.$store.dispatch("visualization/setVisualizationHeadInfo", {});
        })
        .catch(error => {
          if (error.data && error.data.status == 395) {
            this.$message({
              message: this.$t("management.EnableItBeforeConfiguration"),
              type: "error"
            });
          }
        });
    }
  },
  mounted() {
    var height =
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      "700";
    height = height - 67;
    var visualizationHegiht = document.getElementsByClassName(
      "visualization-height"
    );
    for (var i = 0; i < visualizationHegiht.length; i++) {
      visualizationHegiht[i].style.height = height + "px";
    }
    this.height = height;
    //请求数据
    this.$api.visualizationApi
      .getSysParamConfigureByKey(
        {
          key: "visualizationInfo"
        },
        { loadingText: this.$t("service.searching") }
      )
      .then(res => {
        var rs = res.data.data;
        if (rs) {
          var data = rs.value;
          if (data) {
            data = JSON.parse(this.Base64.decode(data));
            this.dataList = data.dataList;
            // this.headerInfo = data.headerInfo;
            //头部数据合并
            var defaultHeaderCopy = JSON.parse(JSON.stringify(defaultHeader));
            var merge = function(defaultData, data) {
              for (var key in defaultData) {
                if (data[key]) {
                  if (
                    typeof data[key] === "object" &&
                    !(data[key] instanceof Array)
                  ) {
                    merge(defaultData[key], data[key]);
                  } else {
                    defaultData[key] = data[key];
                  }
                }
              }
            };
            merge(defaultHeaderCopy, data.headerInfo);
            this.headerInfo = defaultHeaderCopy;
          }
          this.currentParamsConfigId = rs.id;
          this.paramsConfigStatus = rs.status;
        }
      })
      .catch(() => {});
  }
};
</script>

<style lang='scss' scoped>
.visualization {
  position: relative;
  width: 100%;
}
.visualization-container {
  position: relative;
}
.left {
  float: left;
}
.middle {
  margin-left: 220px;
  margin-right: 66px;
}
.right {
  position: absolute;
  top: 67px;
  right: 0;
  z-index: 999;
}
.slide-enter {
  background: red;
}

.slide-leave-active {
  will-change: transform;
  transition: all 500ms;
  position: absolute;
  background: green;
}
.abs {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}

.fix {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
}
</style>