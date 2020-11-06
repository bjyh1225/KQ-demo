<template>
  <div
    class="assistive-touch-container"
    :style="positionStyle"
    @mousedown="mouseDown"
    @click="touchOpen"
  >
    <div class="assistive-touch-content">
      <i class="el-icon-portal-liebiao3 assistive-touch-icon"></i>
    </div>
    <div
      class="assistive-touch-panel"
      v-show="panelStatus"
      :style="panelPositionStyle"
      id="assistive-touch-panel"
      @mousedown.stop="1==1"
      @click.stop="1==1"
    >
      <el-row>
        <el-col :span="8" v-for="(btn,ix) in btnList" :key="ix">
          <div class="btn-area" @click="btnClick(btn.type)">
            <i :class="btn.icon"></i>
            <p>{{btn.label}}</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "AssistiveTouch",
  props: {
    startTop: {
      type: Number,
      default: 100
    },
    startRight: {
      type: Number,
      default: 100
    },
    source: {
      type: String,
      default: ""
    },
    addBtnList: {
      //添加按钮
      type: Array, //对象数组
      default: () => {
        return [];
      }
    },
    hideBtnList: {
      //隐藏按钮
      type: Array, //一维数组
      default: () => {
        return [];
      }
    },
    editBtnList: {
      //修改按钮
      type: Object, //对象
      default: () => {
        return {};
      }
    },
    move: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    positionStyle() {
      return (
        "top:" + this.startTop + "px;" + "right:" + this.startRight + "px;"
      );
    },
    assistiveTouchPanelHeight() {
      return Math.ceil(this.btnList.length / 3) != 0
        ? Math.ceil(this.btnList.length / 3) * 62 + 20
        : 82;
    }
  },
  watch: {
    source() {
      this.getBtnList();
    }
  },
  data() {
    return {
      moveStatus: false,
      currentTarget: null,
      panelPositionStyle: "",
      panelStatus: false,
      assistiveTouchWidth: 62, //小圆点宽度
      assistiveTouchHeight: 62, //小圆点高度
      assistiveTouchPanelWidth: 206, //小圆点面板的宽度
      marginWidth: 20, //小圆点和面板之间的距离
      currentPanelX: 0, //当前面板的X轴
      currentPanelY: 0, //当前面板的Y轴
      defaultBtnList: [
        {
          label: this.$t("webAppBuilder.New"),
          icon: "el-icon-portal-xinjian",
          sortNo: 1,
          type: "add"
        },
        {
          label: this.$t("webAppBuilder.Open"),
          icon: "el-icon-portal-xiangmuchi",
          sortNo: 2,
          type: "open"
        },
        {
          label: this.$t("visualization.Save"),
          icon: "el-icon-portal-baocun",
          sortNo: 3,
          type: "save"
        },
        {
          label: this.$t("visualization.Preview"),
          icon: "el-icon-portal-yulan1",
          sortNo: 4,
          type: "preview"
        },
        {
          label: this.$t("myCenter.Share"),
          icon: "el-icon-portal-gongxiangwenjian",
          sortNo: 5,
          type: "share"
        },
        {
          label: this.$t("webAppBuilder.Download"),
          icon: "el-icon-download",
          sortNo: 6,
          type: "download"
        },
        {
          label: this.$t("service.back"),
          icon: "el-icon-portal-tuichu",
          sortNo: 7,
          type: "goback"
        }
      ],
      btnList: []
    };
  },
  methods: {
    mouseDown(e) {
      if (!this.move) {
        return false;
      }
      this.moveStatus = false;
      this.currentTarget = e.currentTarget;
      document.onmousemove = event => {
        event.preventDefault();
        this.moveStatus = true;
        var height =
          document.documentElement.clientHeight ||
          document.body.clientHeight ||
          600;
        var width =
          document.documentElement.clientWidth || document.body.clientWidth;
        var x = event.x - this.assistiveTouchWidth / 2;
        if (x < 0) {
          x = 0;
        }
        if (x > width - this.assistiveTouchWidth) {
          x = width - this.assistiveTouchWidth;
        }
        this.currentTarget.style.left = x + "px";
        this.currentTarget.style.right = 0 + "px";
        var y = event.y - this.assistiveTouchHeight / 2;
        if (y < 0) {
          y = 0;
        }
        if (y > height - this.assistiveTouchHeight) {
          y = height - this.assistiveTouchHeight;
        }
        this.currentTarget.style.top = y + "px";
        //改变面板的位置
        if (this.panelStatus) {
          this.getPanelPosition(x, y);
        }
      };
      document.onmouseup = event => {
        event.preventDefault();
        document.onmousemove = null;
        document.onmouseup = null;
      };
    },
    touchOpen(e) {
      if (!this.moveStatus && !this.panelStatus) {
        this.getPanelPosition(e.x, e.y);
        this.panelStatus = true;
      } else {
        if (!this.moveStatus) {
          this.panelStatus = false;
        }
      }
    },
    getPanelPosition(x, y) {
      var panelX = 0;
      var panelY = 0;
      if (x > this.assistiveTouchPanelWidth + this.marginWidth) {
        //放置在小圆点的左侧
        panelX = 0 - (this.assistiveTouchPanelWidth + this.marginWidth);
      } else {
        //放置在小圆点的右侧
        panelX = this.assistiveTouchWidth + this.marginWidth;
      }
      //可视区域的高度
      var clientHeight =
        document.documentElement.clientHeight ||
        document.body.clientHeight ||
        600;
      if (y + this.assistiveTouchPanelHeight > clientHeight) {
        //需要底部对齐
        panelY = 0 - this.assistiveTouchPanelHeight + this.assistiveTouchHeight;
      } else {
        panelY = 0;
      }
      this.currentPanelX = panelX;
      this.currentPanelY = panelY;
      this.panelPositionStyle =
        "top:" + this.currentPanelY + "px;left:" + this.currentPanelX + "px;";
    },
    getBtnList() {
      this.btnList=[];
      this.defaultBtnList.forEach(item => {
        if (this.hideBtnList.indexOf(item.type) < 0) {
          if (this.editBtnList[item.type]) {
            for (var i in this.editBtnList[item.type]) {
              item[i] = this.editBtnList[item.type][i];
            }
          }
          this.btnList.push(item);
        }
      });
      this.btnList = this.btnList.concat(this.addBtnList);
    },
    btnClick(type) {
      this.$emit(type);
    }
  },
  mounted() {
    this.getBtnList();
  }
};
</script>

<style lang='scss' scoped>
.assistive-touch-container {
  height: 62px;
  width: 62px;
  line-height: 62px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.7);
  text-align: center;
  position: fixed;
  cursor: pointer;
  z-index: 999;
  .assistive-touch-content {
    width: 32px;
    height: 32px;
    line-height: 32px;
    border-radius: 50%;
    background: #fff;
    display: inline-block;
    vertical-align: middle;
    border: 1px solid #828083;
    box-shadow: 0px 0px 0px 3px rgba(170, 163, 170, 0.8),
      0px 0px 0px 4px rgba(83, 76, 83, 0.5),
      0px 0px 0px 8px rgba(107, 100, 107, 0.7);
    .assistive-touch-icon {
      font-size: 16px;
      color: #6b7178;
      vertical-align: middle;
    }
  }
  &:hover {
    background: rgba(0, 0, 0, 0.8);
    .assistive-touch-content {
      box-shadow: 0px 0px 0px 3px rgba(170, 163, 170, 1),
        0px 0px 0px 4px rgba(83, 76, 83, 0.6),
        0px 0px 0px 8px rgba(107, 100, 107, 1);
    }
  }
  .assistive-touch-panel {
    width: 206px;
    min-height: 82px;
    background: rgba(23, 29, 40, 0.8);
    position: absolute;
    border-radius: 10px;
    color: #fff;
    cursor: default;
    z-index: 999;
    .el-row {
      margin: 10px;
    }
    .el-col {
      height: 62px;
      .btn-area {
        height: 100%;
        width: 100%;
        position: relative;
        border-radius: 10px;
        cursor: pointer;
        i {
          font-size: 26px;
          position: absolute;
          display: inline-block;
          width: 26px;
          height: 26px;
          top: -20px;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
        p {
          margin: 0;
          padding: 0;
          height: 16px;
          width: 100%;
          line-height: 16px;
          font-size: 14px;
          position: absolute;
          top: 32px;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
        &:hover {
          background: #3691e9;
        }
      }
    }
  }
}
</style>