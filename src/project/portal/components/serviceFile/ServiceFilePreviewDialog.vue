<template>
  <div class="preview-dialog">
    <el-dialog
      :visible.sync="fileServiceDialogVisible"
      width="1000px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      custom-class="dialog-custom-class"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('myCenter.Preview')}}</span>
        </div>
      </template>
      <!-- <transition
        enter-active-class="animated slideInLeft"
        leave-active-class="animated slideOutLeft"
      >-->
      <el-row
        v-if="fileServiceDetails.SUFFIX=='mp4'||fileServiceDetails.SUFFIX=='avi'||fileServiceDetails.SUFFIX=='mov'||fileServiceDetails.SUFFIX=='mkv'||fileServiceDetails.SUFFIX=='flv'||fileServiceDetails.SUFFIX=='vmvb'||fileServiceDetails.SUFFIX=='scs'"
      >
        <video-player
          class="video-player-box"
          ref="videoPlayer"
          :options="playerOptions"
          :playsinline="true"
          customEventName="customstatechangedeventname"
        ></video-player>
      </el-row>
      <el-row
        v-if="fileServiceDetails.SUFFIX=='jpg'||fileServiceDetails.SUFFIX=='png'||fileServiceDetails.SUFFIX=='jpeg'||fileServiceDetails.SUFFIX=='gif'"
      >
        <el-row class="img-box">
          <img class="swiper-img" :src="imgPreviewUrl" alt />
        </el-row>
      </el-row>
      <el-row v-if="fileServiceDetails.C_FOLDER==1&&modifyingNo" class="table-box">
        <el-table
          ref="multipleTable"
          :data="isDetailsFilelist"
          tooltip-effect="dark"
          style="width: 100%"
        >
          <el-table-column prop="C_NAME" label="文件名" min-width="32%"></el-table-column>
          <el-table-column label="文件大小（bytes）" prop="C_SIZE" min-width="28%"></el-table-column>
          <el-table-column label="文件格式" min-width="25%" prop="SUFFIX"></el-table-column>
          <el-table-column prop="cz" :label="$t('management.operate')" min-width="15%">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.SUFFIX=='jpg'||scope.row.SUFFIX=='png'||scope.row.SUFFIX=='jpeg'||scope.row.SUFFIX=='gif'||  scope.row.SUFFIX=='mp4'||scope.row.SUFFIX=='avi'||scope.row.SUFFIX=='mov'||scope.row.SUFFIX=='mkv'||  scope.row.SUFFIX=='flv'||scope.row.SUFFIX=='vmvb'||scope.row.SUFFIX=='scs'"
                size="mini"
                class="base-btn"
                @click="folderPreview(scope.$index, scope.row)"
              >{{$t('visualization.Preview')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
      <!-- </transition>
      <transition
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight"
      >-->
      <el-row v-show="!modifyingNo">
        <el-row @click.native="previewReturn()" class="preview-back">
          <i class="el-icon-back"></i>
          <span>{{$t('service.back')}}</span>
        </el-row>
        <el-row
          v-if="oneFileLiDetails.SUFFIX=='mp4'||oneFileLiDetails.SUFFIX=='avi'||oneFileLiDetails.SUFFIX=='mov'||oneFileLiDetails.SUFFIX=='mkv'||oneFileLiDetails.SUFFIX=='flv'||oneFileLiDetails.SUFFIX=='vmvb'||oneFileLiDetails.SUFFIX=='scs'"
        >
          <video-player
            class="video-player-box"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            customEventName="customstatechangedeventname"
          ></video-player>
        </el-row>
        <el-row
          v-if="oneFileLiDetails.SUFFIX=='jpg'||oneFileLiDetails.SUFFIX=='png'||oneFileLiDetails.SUFFIX=='jpeg'||oneFileLiDetails.SUFFIX=='gif'"
        >
          <el-row class="img-box">
            <img class="swiper-img" :src="imgPreviewUrl" alt />
          </el-row>
        </el-row>
      </el-row>
      <!-- </transition> -->
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "ServiceFilePreviewDialog",
  props: {
    fileServiceDialogVisible: {
      type: Boolean,
      default: false,
    },
    fileServiceDetails: {
      type: Object,
      default: () => {
        return {};
      },
    },
    isDetailsFilelist: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: true, //如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如    "16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: "", //url地址
          },
        ],
        poster: "", //你的封面地址
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true, //全屏按钮
        },
      },
      imgPreviewUrl: "", //图片预览地址
      modifyingNo: true, //默认不预览文件夹子文件
      oneFileLiDetails: {}, //单文件详情
    };
  },
  watch: {
    fileServiceDetails() {
      this.imgPreviewUrl = `/fileapi/file/download/${this.fileServiceDetails.C_FILE_REFERENCEID}/true`;
      this.playerOptions.sources[0].src = `${window.location.protocol}//${window.location.host}/fileapi/file/download/${this.fileServiceDetails.C_FILE_REFERENCEID}/true`;
    },
  },
  computed: {
    /* eslint-disable */
    player() {
      if (this.$refs.videoPlayer) {
        return this.$refs.videoPlayer.player;
      }
    },
  },
  methods: {
    // 文件夹预览返回
    previewReturn() {
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.player.pause(); //视频停止播放
        this.player.currentTime(""); //时间归零
      }
      this.modifyingNo = true;
      this.imgPreviewUrl = "";
    },
    handleClose() {
      this.$emit("handleClose");
      this.modifyingNo = true;
      if (this.$refs.videoPlayer) {
        this.$refs.videoPlayer.player.pause(); //视频停止播放
        this.player.currentTime(""); //时间归零
      }
      this.imgPreviewUrl = "";
    },
    // 文件夹子文件预览
    folderPreview(index, val) {
      this.oneFileLiDetails = val;
      this.modifyingNo = false;
      this.imgPreviewUrl = `/fileapi/file/download/${val.C_FILE_REFERENCEID}/true`;
      this.playerOptions.sources[0].src = `${window.location.protocol}//${window.location.host}/fileapi/file/download/${val.C_FILE_REFERENCEID}/true`;
    },
  },
  mounted() {},
};
</script>

<style lang="scss">
.preview-dialog {
  .dialog-title {
    padding-bottom: 20px;
    @include manage-border(
      $types: (
        "bottom",
      )
    );
    span {
      @include dialog-title($width: 2px);
      padding-bottom: 18px;
    }
  }
  /deep/.el-dialog__body {
    height: 540px;
    overflow-x: hidden;
    padding: 0px 20px 20px;
    .table-box {
      margin: 40px 60px 10px;
    }
    .preview-back{
      cursor: pointer;
    }
  }
  .img-box {
    height: 500px;
    overflow: auto;
    display: relative;
    .swiper-img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .video-js .vjs-big-play-button {
    top: 50%;
    left: 50%;
    margin-left: -1.5em;
    margin-top: -0.75em;
  }
  // 视频列表
  .right-list {
    height: 500px;
    overflow-y: auto;
    padding: 0 0 0 5px;
    margin: 0px;
    li {
      height: 80px;
      margin-bottom: 5px;
      display: inline-block;
      background-color: #f6f7fb;
      border: 1px solid #f6f7fb;
      .list-img {
        height: 100%;
      }
      &:hover {
        border: 1px solid #ccc;
      }
    }
  }
  .recommend-img {
    position: relative;
    margin-top: 20px;
    .my-button-disabled {
      opacity: 0;
    }
    .swiper_btn {
      width: 20px;
      height: 80px;
      line-height: 80px;
      top: 2px;
      background-size: auto;
      position: absolute;
      background-color: #ccc;

      &:hover {
        @include base-bg-color();
      }
    }
    .swiper-item {
      width: 116px;
      height: 82px;
      position: relative;
      img {
        position: absolute;
        left: 2px;
        top: 2px;
        width: 114px;
        height: 80px;
        &:hover {
          cursor: pointer;
          @include base-active-underline();
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }
      }
    }
    .swiper-container {
      width: 820px;
      height: 100px;
    }
    .el-icon-arrow-left.swiper_btn {
      left: 0px;
      @include base-active-color();
      border-radius: 4px 0 0 4px;
      font-size: 20px;
      font-weight: 900;
      &:hover {
        color: #fff;
      }
    }
    .el-icon-arrow-right.swiper_btn {
      right: 0px;
      @include base-active-color();
      border-radius: 0 4px 4px 0;
      font-size: 20px;
      font-weight: 900;
      &:hover {
        color: #fff;
      }
    }
    .swiper-pagination-fraction,
    .swiper-pagination-custom,
    .swiper-container-horizontal > .swiper-pagination-bullets {
      bottom: -3px;
      /deep/.swiper-pagination-bullet-active {
        @include base-bg-color();
      }
    }
  }
}
</style>