<template>
  <div>
    <el-row class="data-catalog-list-header">
      <!-- <el-col :span="12">
        测试>
      </el-col> -->
      <el-col :span="24" class="sort-area">
        <span class="label">排序依据</span>
        <span style="font-size:14px;margin-right:3px;">:</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            <span class="el-dropdown-label">最新修改</span
            ><i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="lastModifyTime"
              >最新修改</el-dropdown-item
            >
            <el-dropdown-item command="name">服务名称</el-dropdown-item>
            <el-dropdown-item command="serviceHits">访问次数</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <i
          class="kqserver-ziyuan sort-btn"
          v-if="searchInfo.orderSort == 'desc'"
          @click="sortChange('asc')"
        ></i>
        <i
          class="kqserver-ziyuan1 sort-btn"
          v-else
          @click="sortChange('desc')"
        ></i>
      </el-col>
    </el-row>
    <el-row class="data-catalog-data-list">
      <div class="data-container" v-for="item in dataList" :key="item.id">
        <div class="data-picture">
          <el-image :src="item.headImg">
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
        <div class="data-details-area">
          <el-row class="data-top">
            <el-col :span="8" class="data-name">
              {{ item.name }}
            </el-col>
            <el-col :span="16" class="data-btn">
              <span class="data-operate-normal-btn">
                <span>查看详情</span>
                <i class="el-icon-right"></i>
              </span>
            </el-col>
          </el-row>
          <el-row class="data-bottom">
            <span class="data-details-info">
              <i class="kqserver-yonghudefuben"></i>
              <span>{{ item.username }}</span>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span class="data-details-info">
              <i class="kqserver-shijian"></i>
              <span>{{ item.createTime }}</span>
            </span>
            <el-divider direction="vertical"></el-divider>
            <span class="data-details-info">
              <i class="kqserver-describe"></i>
              <span>{{ item.desc }}</span>
            </span>
          </el-row>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DataCatalogList",
  props: {
    pageIndex: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 12,
    },
    total: {
      type: Number,
      default: 0,
    },
    searchInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    dataList: {
      type: Array,
      default: () => {
        return [
          {
            name: "测试数据名称",
            username: "测试用户名字",
            createTime: "2020-09-09 14:17:00",
            desc: "测试的描述信息",
          },
        ];
      },
    },
  },
  data() {
    return {
      sortList: {
        lastModifyTime: "最新修改",
        name: "服务名称",
        serviceHits: "访问次数",
      },
    };
  },
  methods: {
    handleCommand() {},
  },
};
</script>

<style lang="scss" scoped>
.data-catalog-list-header {
  background: #fff;
  height: 40px;
  line-height: 40px;
  .sort-area {
    line-height: 30px;
    padding-right: 10px;
    text-align: right;
    font-size: 0px;
    .label {
      font-size: 14px;
      color: #242424;
      margin-right: 5px;
    }
    .el-dropdown-link {
      cursor: pointer;
      margin-right: 10px;
      .el-dropdown-label {
        color: #3691e9;
      }
    }
    .sort-btn {
      cursor: pointer;
      &:hover {
        color: #3691e9;
      }
    }
  }
}
.data-catalog-data-list {
  margin-top: 20px;
  .data-container {
    background: #fff;
    border: 1px solid #dfdfdf;
    color: #7c7c7c;
    padding: 14px 0px;
    margin-bottom: 20px;
    .data-picture{
      width: 90px;
      height: 72px;
      float: left;
      position: relative;
      .el-image {
        width: 52px;
        height: 52px;
        border-radius: 50%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        /deep/.image-slot {
          width: 100%;
          height: 100%;
          line-height: 52px;
          border-radius: 50%;
          background: #f5f7fa;
          color: #c0c4cc;
          text-align: center;
        }
      }
    }
    .data-details-area {
      margin-left: 90px;
      padding-right: 30px;
      font-size: 14px;
      .data-top {
        border-bottom: 1px solid #f5f5f5;
        height: 36px;
        line-height: 36px;
        .data-name {
          font-size: 15px;
          @include base-active-color();
        }
        .data-btn {
          text-align: right;
          .data-operate-normal-btn {
            @include base-active-color();
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
      .data-bottom {
        height: 36px;
        line-height: 36px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        .data-details-info {
          i {
            margin-right: 4px;
          }
        }
      }
    }
  }
}
</style>
