<template>
  <el-row class="header app-bg-color app-border-bottom">
    <el-col :span="8">
      <span
        class="title app-bg-font-color"
      >{{currentAppInfo.name?currentAppInfo.name:$t('webAppBuilder.NoTitle')}}</span>
      <i class="el-icon-edit name-edit-btn app-bg-font-color" v-show="currentAppInfo.name&&!onlyGlanceOver" @click="editName"></i>
    </el-col>
    <el-col :span="16" class="right-btn">
      <div class="btn app-bg-font-color app-hover-bg" @click="addApp" v-if="!onlyGlanceOver">
        <i class="el-icon-portal-xinjian icon-area"></i>
        <span class="font-area">{{$t('webAppBuilder.New')}}</span>
      </div>
      <div
        class="btn app-bg-font-color app-hover-bg"
        :class="{'right-header-btn-is-active':popoverStatus}"
        v-if="!onlyGlanceOver"
      >
        <el-popover
          placement="bottom"
          width="400"
          trigger="click"
          @show="showPopover"
          @hide="hidePopover"
          popper-class="app-list-popover"
        >
          <el-row class="app-list">
            <el-row class="title">
              <span class="title-font">{{$t('webAppBuilder.AppList')}}</span>
            </el-row>
            <el-row class="table-area">
              <table>
                <tr
                  v-for="(item,ix) in appList"
                  :key="ix"
                  class="table-tr"
                  @click="tableClick(item)"
                >
                  <td width="50%">{{item.C_NAME}}</td>
                  <td width="20%">{{item.USERNAME}}</td>
                  <td width="30%" style="text-align:right">{{item.C_CREATE_TIME}}</td>
                </tr>
              </table>
            </el-row>
            <el-row class="app-pagination">
              <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :current-page.sync="pageIndex"
                @current-change="handleCurrentChange"
                :hide-on-single-page="true"
              ></el-pagination>
            </el-row>
          </el-row>
          <div slot="reference">
            <i class="el-icon-portal-xiangmuchi icon-area"></i>
            <span class="font-area">{{$t('webAppBuilder.Open')}}</span>
          </div>
        </el-popover>
      </div>
      <div class="btn app-bg-font-color app-hover-bg" @click="save" v-if="!onlyGlanceOver">
        <i class="el-icon-portal-baocun icon-area"></i>
        <span class="font-area">{{$t('visualization.Save')}}</span>
      </div>
      <div class="btn app-bg-font-color app-hover-bg" @click="preview">
        <i class="el-icon-portal-yulan1 icon-area"></i>
        <span class="font-area">{{$t('visualization.Preview')}}</span>
      </div>
      <div class="btn app-bg-font-color app-hover-bg" v-if="!onlyGlanceOver&&currentAppInfo.createBy==currentUserId" @click="share">
        <i class="el-icon-portal-gongxiangwenjian icon-area"></i>
        <span class="font-area">{{$t('myCenter.Share')}}</span>
      </div>
      <div class="btn app-bg-font-color app-hover-bg" v-if="!onlyGlanceOver" @click="download">
        <i class="el-icon-download icon-area"></i>
        <span class="font-area">{{$t('webAppBuilder.Download')}}</span>
      </div>
      <div class="btn app-bg-font-color app-hover-bg" @click="goBack">
        <i class="el-icon-portal-tuichu icon-area"></i>
        <span class="font-area">{{$t('service.back')}}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "RightHeader",
  props: {
    currentAppInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    onlyGlanceOver: {
      type: Boolean,
      default: false
    }
  },
  computed:{
    currentUserId(){
      return this.$store.getters.userInfo.id;
    }
  },
  data() {
    return {
      popoverStatus: false,
      appList: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0
    };
  },
  methods: {
    goBack() {
      this.$emit("goBack");
    },
    addApp() {
      this.$emit("addApp");
    },
    save() {
      this.$emit("save");
    },
    preview() {
      this.$emit("preview");
    },
    share() {
      this.$emit("share");
    },
    download() {
      this.$emit("download");
    },
    showPopover() {
      this.popoverStatus = true;
      this.$api.webAppBuilderApi
        .selectEditApps(
          {
            page: this.pageIndex,
            size: this.pageSize
          },
          {
            loadingTarget: ".table-area",
            loadingText: this.$t("service.searching"),
            loadingBackground: "rgba(0,0,0,0)",
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          var data = res.data.data;
          this.appList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    tableClick(item) {
      this.$emit("selectApp", item);
    },
    hidePopover() {
      this.popoverStatus = false;
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.showPopover();
    },
    editName(){
      this.$emit("editAppName");
    }
  }
};
</script>

<style lang='scss' scoped>
.header {
  height: 50px;
  line-height: 50px;
  // background: #273142;
  box-shadow: 2px 1px 10px rgba(0, 0, 0, 0.5);
  box-sizing: content-box;
  position: relative;
  z-index: 110;
  // border-bottom:1px solid #525a68;
  transition: margin 0.5s;
  .el-col {
    height: 50px;
    line-height: 50px;
  }
  .title {
    margin-left: 20px;
    font-size: 20px;
    // color:#fff;
  }
  .name-edit-btn{
    margin-left:10px;
    cursor: pointer;
  }
  #edit-app-name{
    border:1px solid red;
  }
  .right-btn {
    text-align: right;
    padding-right: 10px;
    .btn {
      // color:#fff;
      display: inline-block;
      // width: 100px;
      padding:0 10px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      cursor: pointer;
      .icon-area {
        font-size: 16px;
      }
      .font-area {
        font-size: 14px;
        margin-left: 2px;
      }
      &:hover {
        // background:#3691e9;
        border-radius: 3px;
      }
    }
    .right-header-btn-is-active {
      border-radius: 3px;
    }
    // .is-active{

    // }
  }
}
</style>

<style lang="scss">
.el-popover.app-list-popover {
  top: 44px !important;
  .app-list {
    padding: 0 10px;
    .title {
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      height: 27px;
    }
    .title-font {
      box-shadow: 0px 2px 0px #3691e9;
      color: #3691e9;
      font-size: 15px;
      font-weight: bold;
      padding-bottom: 4px;
    }
    .table-area {
      min-height: 40px;
      table {
        border-collapse: collapse;
        width: 100%;
      }
      .table-tr {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        cursor: default;
        &:hover {
          background: rgba(39, 49, 66, 0.3);
        }
      }
    }
    .app-pagination {
      margin-top: 10px;
      .el-pagination {
        padding: 0;
        li {
          min-width: 26px;
        }
        .btn-prev {
          padding: 0;
          min-width: 26px;
        }
        .btn-next {
          padding: 0;
          min-width: 26px;
        }
      }
    }
  }
}
</style>
