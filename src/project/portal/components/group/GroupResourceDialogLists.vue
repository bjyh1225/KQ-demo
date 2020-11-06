<template>
  <div class="resource-list-containner" v-if="shareResourceList.length>0">
    <el-row v-for="list in shareResourceList" :key="list.C_ID" class="resource-block">
      <el-col :span="8" class="img-area">
        <el-image :src="list.C_IMG?list.C_IMG:groupThumbnail" :fit="'cover'"></el-image>
      </el-col>
      <el-col :span="16" class="details-area">
        <p class="title">{{list.C_NAME}}</p>
        <el-row class="author-area">
          <el-col :span="8">
            <span>{{$t('service.author')}}：</span>
            <span>{{list.USERNAME}}</span>
          </el-col>
          <el-col :span="8">
            <span>{{$t('service.time')}}：</span>
            <span>{{list.C_CREATE_TIME}}</span>
          </el-col>
          <el-col :span="8">
            <span>{{$t('service.sharingExtent')}}：</span>
            <span>{{getScope(list.C_SCOPE)}}</span>
          </el-col>
        </el-row>
        <p
          class="comments-area"
        >{{$t('service.introduction')}}：{{list.C_COMMENTS?list.C_COMMENTS:$t('group.Notavailablenow')}}</p>
        <div class="btn-area">
          <el-button
            class="base-linear-btn"
            @click="viewDetails(list)"
          >{{$t('management.ViewDetails')}}</el-button>
          <el-button class="base-linear-btn" @click="share(list)">{{$t('myCenter.Share')}}</el-button>
        </div>
      </el-col>
    </el-row>
    <pagination
      class="pagination"
      :pageIndex="pageIndex"
      :pageSize="pageSize"
      :total="total"
      :pageSizes="[4,8,12]"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    ></pagination>
  </div>
  <div class="resource-list-containner no-data" v-else>
    <div>
      <el-image :src="noDataImg"></el-image>
    </div>
    <p>{{$t('group.Sorrynoresourcesareavailabletoshare')}}</p>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
import { getDefaultImg } from "portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js";
export default {
  name: "GroupResourceDialogLists",
  components: {
    Pagination
  },
  props: {
    shareResourceList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      noDataImg: require("img/nodata.jpg"),
      groupThumbnail: ""
    };
  },
  watch: {
    shareResourceList() {
      if (this.shareResourceList.length > 0) {
        this.groupThumbnail = getDefaultImg(
          this.shareResourceList[0].C_RESOURCE_TYPE
        );
      }
    }
  },
  methods: {
    getScope(val) {
      if (val == "Public") {
        return this.$t("myCenter.Public");
      } else if (val == "Private") {
        return this.$t("myCenter.Private");
      } else if (val == "Partial") {
        return this.$t("service.Partialauthorization");
      } else {
        return this.$t("myCenter.Private");
      }
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    share(resource) {
      this.$emit("share", resource);
    },
    viewDetails(view) {
      this.$emit("details", view);
    }
  }
};
</script>

<style lang='scss' scoped>
.resource-list-containner {
  min-height: 400px;
  .resource-block {
    border: 1px solid #ebebeb;
    margin-bottom: 15px;
    .img-area {
      width: 244px;
      height: 176px;
      border-right: 1px solid #ebebeb;
      padding: 8px;
      .el-image {
        width: 100%;
        height: 100%;
        background: #f3f9f9;
      }
    }
    .details-area {
      height: 176px;
      padding-left: 20px;
      width: 72%;
      .title {
        margin-top: 20px;
        @include base-active-color();
        font-size: 16px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .author-area {
        .el-col:nth-child(1) {
          text-align: left;
        }
        .el-col:nth-child(2) {
          text-align: center;
        }
        .el-col:nth-child(3) {
          text-align: right;
        }
      }
      .comments-area {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn-area {
        margin-top: 20px;
        text-align: right;
        .el-button {
          border-radius: 0;
          padding: 6px 12px;
          margin-left: 15px;
        }
      }
    }
  }
  .pagination {
    margin-bottom: 15px;
  }
}
.no-data {
  padding-top: 20px;
  text-align: center;
}
</style>