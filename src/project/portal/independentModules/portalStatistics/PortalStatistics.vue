<template>
  <div id="portal" :style="{ height: screenHeight + 'px' }">
    <div
      id="portal-statistics-animate-container"
      class="animate-container"
      v-show="backgroundStyleShow"
      :style="{ height: (screenHeight-4) + 'px' }"
    ></div>
    <!-- 侧边栏 -->
    <div :style="navbarStyle" id="portal-left">
      <div
        v-show="!isCollapse"
        :style="'animation-duration:500ms'"
        :class="{'fadeInLeft':!isCollapse}"
      >
        <el-row class="fl left-icon">
          <i class="el-icon-portal-zhuye" @click="back"></i>
          <i class="el-icon-portal-collapse-left" @click="portalSwitchOpen()"></i>
        </el-row>
        <el-scrollbar class="scroll" :style="{ height: (screenHeight- 50) + 'px' }">
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            :default-openeds="defaultOpeneds"
            router
            :default-active="this.$route.path"
            :style="{ height: (screenHeight- 68) + 'px' }"
          >
            <el-menu-item index="/portalOverview" class="portal-overview">
              <i class="el-icon-portal-zujian"></i>
              <span slot="title">{{$t('portalStatistics.PortalOverview')}}</span>
            </el-menu-item>
            <el-submenu :index="ik.toString()" v-for="(item,ik) in componentTree" :key="ik">
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
              </template>
              <el-menu-item
                v-for="(menuItem,mik) in item.componentChild"
                :key="ik-mik"
                :index="menuItem.index"
                style="padding-left: 52px;"
              >{{menuItem.text}}</el-menu-item>
            </el-submenu>
          </el-menu>
        </el-scrollbar>
      </div>
      <el-row class="component-box-close animated" v-show="isCollapse">
        <ul
          :style="{ height: screenHeight + 'px',animationDuration:'200ms' }"
          :class="{'fadeInRight':isCollapse}"
          ref="liHover"
        >
          <li @click="portalSwitchOpen" :class="[liHovers?'lihover':'']">
            <i class="el-icon-portal-collapse-left-copy"></i>
          </li>
          <li @click="jump('portalOverview')" class="lihover">
            <i class="el-icon-portal-zujian"></i>
          </li>
          <li
            v-for="item in componentTree"
            :key="item.name"
            @mouseover="displayFun(item)"
            @mouseout="displayNoneFun(item)"
            class="lihover"
          >
            <i :class="item.icon"></i>
            <ul v-show="item.childBarShow" id="menuLeb" :style="marginTop">
              <li
                v-for="(menuItem,mik) in item.componentChild"
                :key="mik"
                class="hoverMenu"
                @click="jump(menuItem.name)"
              >{{menuItem.text}}</li>
            </ul>
          </li>
        </ul>
      </el-row>
    </div>
    <div :style="{ height: screenHeight + 'px'}">
      <!-- 头 -->
      <portal-statistics-head
        :style="{marginLeft:contentStyle}"
        class="portal-head"
        @backgroundStyleFun="backgroundStyleFun"
      ></portal-statistics-head>
      <!-- 内容 -->
      <div
        :style="{ height: (screenHeight- 50) + 'px' ,marginLeft:contentStyle}"
        class="portal-content"
      >
        <el-scrollbar class="scroll">
          <router-view />
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>
<script>
import PortalStatisticsHead from "portal/independentModules//portalStatistics/portalStatisticsContent/PortalStatisticsHead";
import { setTimeout } from "timers";
import { particleAnimate } from "common/animate/particleAnimate.js";
export default {
  name: "PortalStatistics",
  components: {
    PortalStatisticsHead
  },
  data() {
    return {
      screenHeight: document.documentElement.clientHeight,
      marginTop: "margin-top:-40px",
      liHovers: false,
      navbarStyle: "",
      contentStyle: "",
      isCollapse: false,
      animateStatus: false,
      backgroundStyleShow: true,
      defaultOpeneds: ["0", "1", "2"],
      componentTree: [
        // {
        //   title: this.$t("portalStatistics.PortalStatistics"),
        //   name: "layout",
        //   icon: "el-icon-portal-yonghu1",
        //   childBarShow: false,
        //   componentChild: [
        //     {
        //       text: this.$t("portalStatistics.CurrentOnlineUsers"),
        //       index: "/userStatistics",
        //       name: "userStatistics"
        //     },
        //     {
        //       text: this.$t("portalStatistics.TotalUsers"),
        //       index: "/userTotalStatistics",
        //       name: "userTotalStatistics"
        //     }
        //   ]
        // },
        {
          title: this.$t("portalStatistics.ResourcesStatistics"),
          name: "base",
          icon: "el-icon-portal-tongji1",
          childBarShow: false,
          componentChild: [
            {
              text: this.$t("portalStatistics.TotalResources"),
              index: "/portalTotalResources",
              name: "portalTotalResources"
            },
            {
              text: this.$t("portalStatistics.NewResources"),
              index: "/portalNewResources",
              name: "portalNewResources"
            },
            {
              text: this.$t("portalStatistics.LatestMapServices"),
              index: "/portalLatestResources",
              name: "portalLatestResources"
            },
            {
              text: this.$t("portalStatistics.HottestResources"),
              index: "/portalHottestResource",
              name: "portalHottestResource"
            }
          ]
        },
        {
          title: this.$t("portalStatistics.VisitStatistics"),
          name: "visit",
          icon: "el-icon-portal-tongji",
          childBarShow: false,
          componentChild: [
            {
              text: this.$t("portalStatistics.Mapservicevisitstatistics"),
              index: "/portalMapAccess",
              name: "portalMapAccess"
            },
            {
              text: this.$t("portalStatistics.Dataservicevisitstatistics"),
              index: "/portalDataAccess",
              name: "portalDataAccess"
            },
            {
              text: this.$t("portalStatistics.Functionservicevisitstatistics"),
              index: "/portalFunctionAccess",
              name: "portalFunctionAccess"
            },
            // {
            //   text: "三维服务访问统计',
            //   index: "/portalKEYAccess",
            //   name: "portalKEYAccess"
            // },
            {
              text: this.$t("portalStatistics.StatisticsOfAppVisits"),
              index: "/portalAppAccess",
              name: "portalAppAccess"
            },
            {
              text: this.$t("portalStatistics.FileDownloads"),
              index: "/portalFileDownloadAccess",
              name: "portalFileDownloadAccess"
            }
            // {
            //   text: this.$t("portalStatistics.TotalVisitsOfKEY"),
            //   index: "/portalKEYAccess",
            //   name: "portalKEYAccess"
            // },
          ]
        }
      ]
    };
  },

  mounted() {
    var height =
      document.documentElement.clientHeight ||
      document.body.clientHeight ||
      "700";
    this.screenHeight = height;
    new particleAnimate({
      el: "#portal-statistics-animate-container",
      speed: 0.8,
      dotsAlpha: 0.6, //粒子透明度
      lineMaxLength: 250, //粒子连线的最大长度
      dotsNumber: 50, //粒子数
      maxRadius: 6, //生成粒子的最大半径
      dotsColor: "29,93,197", //粒子的颜色
      lineColor: "29,93,197" //连线的颜色
    });
  },
  methods: {
    // 背景效果
    backgroundStyleFun(val) {
      if (val) {
        this.backgroundStyleShow = true;
      } else {
        this.backgroundStyleShow = false;
      }
    },
    // 页面跳转
    jump(jumpAdd) {
      this.$router.replace({ name: jumpAdd });
    },
    // 返回首页
    back() {
      this.$router.push({ path: "/" });
      return false;
    },
    // 侧边栏伸缩
    portalSwitchOpen() {
      this.animateStatus = true;
      this.isCollapse = !this.isCollapse;
      if (!this.isCollapse) {
        this.navbarStyle = "width:220px";
        this.contentStyle = "220px";
        this.liHovers = false;
      } else {
        this.navbarStyle = "width:66px";
        this.contentStyle = "66px";
        setTimeout(() => {
          this.liHovers = true;
        }, 200);
      }
    },
    // 侧边栏收缩二级菜单显示
    displayFun(item) {
      item.childBarShow = true;
      if (this.$refs.menuLeb.clientHeight < 250) {
        this.marginTop = "margin-top:-250px";
      } else {
        this.marginTop = "margin-top:-40px";
      }
    },
    // 侧边栏收缩二级菜单隐藏
    displayNoneFun(item) {
      item.childBarShow = false;
    },
    handleOpen() {},
    handleClose() {}
  }
};
</script>
<style lang="scss" scoped>
#portal {
  background: linear-gradient(to bottom, #09132c 0%, #153d7b 100%);
  background: url("~img/tj_bj.jpg") no-repeat center;
  #portal-left {
    float: left;
    width: 220px;
    transition: width 500ms ease-out;
    color: #fff;
    border-right: 1px solid rgba(33, 75, 121, 0.8);
    background-color: rgba(186, 211, 245, 0.1);
    height: 100%;
    .scroll {
      height: 100%;
      overflow-x: hidden;
    }
    /deep/ .el-scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
      height: 100%;
      .el-scrollbar__view {
        height: 100%;
      }
    }
    ::-webkit-scrollbar {
      width: 0px;
    }
    .fadeInLeft {
      height: 100%;
      .left-icon {
        height: 50px;
        line-height: 50px;
        background-color: rgba(186, 211, 245, 0.1);
        border-bottom: 1px solid rgba(33, 75, 121, 0.8);
        position: relative;
        i:first-child {
          position: absolute;
          font-size: 24px;
          color: #fff;
          left: 8px;
          top: 12px;
          cursor: pointer;
        }
        i:last-child {
          position: absolute;
          font-size: 24px;
          color: #fff;
          right: 8px;
          top: 12px;
          cursor: pointer;
        }
      }
    }
    /deep/.el-menu-vertical-demo.el-menu {
      border: none;
      padding-top: 18px;
      background-color: transparent;
      box-shadow: 5px 0px 5px rgba(0, 0, 0, 0.2);
      .el-menu-item.is-active,
      .el-menu-item.is-active:hover {
        color: #fff;
        background-color: #3691e9;
      }
      .el-menu-item:hover {
        background-color: rgba(38, 73, 143, 0.4);
      }
      .el-submenu {
        .el-menu.el-menu--inline {
          background-color: transparent;
          .el-menu-item.is-active,
          .el-menu-item.is-active:hover {
            color: #fff;
            background-color: #3691e9;
          }
          .el-menu-item {
            height: 32px;
            line-height: 32px;
            color: #acbece;
            background-color: transparent;
          }
          .el-menu-item:hover {
            background-color: rgba(38, 73, 143, 0.4);
          }
        }
        /deep/.el-submenu__title {
          color: #fff;
          padding-left: 0px !important;
          margin: 0 24px;
          border-top: 1px solid rgba(54, 145, 233, 0.35);
          i {
            color: #fff;
          }
          .el-submenu__icon-arrow {
            right: -8px;
            font-size: 16px;
          }
        }
        .el-submenu__title:hover {
          background-color: rgba(23, 38, 61, 0.4);
        }
      }
      .portal-overview {
        height: 32px;
        line-height: 32px;
        color: #fff;
        margin: 6px 0;
        background-color: transparent;
        i {
          color: #fff;
        }
      }
    }
  }
  .component-box-close {
    height: 100%;
    z-index: 99999;
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      .lihover:hover {
        background-color: #3691e9;
      }
      li {
        height: 55px;
        border-bottom: 1px solid rgba(33, 75, 121, 0.8);
        text-align: center;
        color: #fff;
        cursor: pointer;
        i {
          font-size: 26px;
          vertical-align: middle;
          margin-top: 14px;
          margin-bottom: 4px;
        }
        ul {
          border-radius: 3px;
          li.hoverMenu {
            border: none;
            width: 150px;
            height: 50px;
            line-height: 50px;
            background-color: #0b1931;
            list-style: none;
            margin-left: 67px;
            text-align: left;
            padding-left: 10px;
          }
          li:hover {
            background-color: #3691e9;
          }
        }
      }
      li:nth-child(1) {
        height: 50px;
        line-height: 50px;
        i {
          margin: 0;
        }
      }
    }
  }
  .portal-head {
    padding-left: 26px;
    margin-left: 220px;
    transition: margin-left 500ms ease-out;
  }

  .portal-content {
    padding-left: 26px;
    margin-left: 220px;
    transition: margin-left 500ms ease-out;
    .scroll {
      height: 100%;
      overflow-x: hidden;
    }
    /deep/ .el-scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
    }
    ::-webkit-scrollbar {
      width: 0px;
    }
  }
}
.animate-container {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>