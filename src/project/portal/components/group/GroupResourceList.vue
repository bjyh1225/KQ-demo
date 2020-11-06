<template>
  <div class="group-resource-list">
    <div v-if="resourceList.length>0">
      <el-row class="header">
        <el-col :span="6" class="total-area">
          {{$t('group.Gong')}}
          <span class="total-nums">{{total}}</span>
          {{$t('group.Mapsintotal')}}
        </el-col>
        <el-col :span="18" class="sort-btn-area">
          <span>{{$t('group.Sortby')}}：</span>
          <el-dropdown @command="sortChange">
            <span class="el-dropdown-link">
              {{sortList[sortOrder]}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="TIME">{{sortList.TIME}}</el-dropdown-item>
              <el-dropdown-item command="NAME">{{sortList.NAME}}</el-dropdown-item>
              <el-dropdown-item command="USERNAME">{{sortList.USERNAME}}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <i
            class="sort-type el-icon-portal-ziyuan1"
            v-if="sort=='ASC'"
            @click="sortTypeChange('DESC')"
          ></i>
          <i class="sort-type el-icon-portal-ziyuan" v-else @click="sortTypeChange('ASC')"></i>
        </el-col>
      </el-row>
      <el-row class="list">
        <el-row :gutter="40">
          <el-col :span="8" v-for="item in resourceList" :key="item.C_ID">
            <div class="resource-container">
              <el-row class="img-container">
                <div @click="showResourceDetails(item)">
                  <el-image :src="item.C_IMG?item.C_IMG:defaultThumbnail" :fit="'cover'">
                    <div slot="error" class="image-slot">
                      <i class="el-icon-picture-outline"></i>
                    </div>
                  </el-image>
                </div>
              </el-row>
              <el-row class="resource-name">{{item.C_NAME}}</el-row>
              <el-row class="resource-btn">
                <el-col :span="8" class="left">
                  <span>
                    <i class="el-icon-portal-yuedu"></i>
                    <span>{{item.C_HITS}}</span>
                  </span>
                </el-col>
                <el-col :span="16" class="right">
                  <i class="el-icon-portal-kaisuo" v-if="item.C_SCOPE=='Public'"></i>
                  <i class="el-icon-portal-siyou" v-if="item.C_SCOPE=='Private'"></i>
                  <i class="el-icon-portal-kaisuo" v-if="item.C_SCOPE=='Partial'"></i>
                  <i
                    class="el-icon-portal-shoucang2 op-btn"
                    v-if="item.COLLECTIONID&&(groupInfo.currentState==1||groupInfo.currentState==2)"
                    @click="cancelCollector(item.COLLECTIONID)"
                  ></i>
                  <i
                    class="el-icon-portal-shoucang1 op-btn"
                    v-if="!item.COLLECTIONID&&(groupInfo.currentState==1||groupInfo.currentState==2)"
                    @click.stop="showCollector({serviceId:item.C_ID,resourceType:item.C_RESOURCE_TYPE,event:$event})"
                  ></i>
                  <i
                    class="el-icon-delete op-btn"
                    v-if="groupInfo.currentState==1||(currentUserId==item.USERID&&(groupInfo.currentState==1||groupInfo.currentState==2))"
                    @click="cancelShare(item)"
                  ></i>
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-row>
      <pagination
        class="pagination"
        :pageIndex="pageIndex"
        :pageSize="pageSize"
        :total="total"
        :pageSizes="[6,12,18,24]"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
      <service-function-collection
        ref="collection"
        @refreshList="searchFun"
        :resourceType="resourceType"
      ></service-function-collection>
    </div>
    <div v-else class="no-data">
      <div>
        <el-image :src="noDataImg"></el-image>
      </div>
      <p>{{$t('service.sorryNoDataIsAvailableNow')}}</p>
    </div>
    <personal-center-service-details-dialog ref="serviceDetails"></personal-center-service-details-dialog>
  </div>
</template>

<script>
import Pagination from "components/common/page/Pagination";
import ServiceFunctionCollection from "components/serviceFunction/ServiceFunctionCollection";
import PersonalCenterServiceDetailsDialog from "components/personalCenterService/PersonalCenterServiceDetailsDialog";
import { getDefaultImg } from "portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js";
export default {
  name: "GroupResourceList",
  components: {
    Pagination,
    ServiceFunctionCollection,
    PersonalCenterServiceDetailsDialog
  },
  props: {
    resourceType: {
      type: String,
      default: ""
    },
    groupInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    initTimeStamp: {
      default: 0
    },
    activeName: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      pageIndex: 1,
      pageSize: 6,
      total: 0,
      resourceList: [],
      noDataImg: require("img/nodata.jpg"),
      sortOrder: "TIME",
      sort: "DESC",
      sortList: {
        TIME: this.$t("group.Contributiontime"),
        NAME: this.$t("management.ResourceName"),
        USERNAME: this.$t("group.Contributor")
      },
      defaultThumbnail: ""
    };
  },
  computed: {
    currentUserId() {
      return this.$store.getters.userInfo.id;
    }
  },
  watch: {
    initTimeStamp() {
      if (this.activeName == this.name) {
        this.reset();
        this.getGroupResourceListByPage();
      }
    }
  },
  methods: {
    reset() {
      this.pageIndex = 1;
      this.pageSize = 6;
      this.total = 0;
      this.sortOrder = "TIME";
    },
    searchFun() {
      this.getGroupResourceListByPage();
    },
    showCollector(data) {
      //打开收藏夹
      this.$refs.collection.getFavoritesCategoryCodeKey(data, "Group");
    },
    cancelCollector(data) {
      this.$refs.collection.deleteServiceCollection(data);
    },
    getGroupResourceListByPage() {
      this.$api.groupApi
        .getGroupResourceListByPage(
          {
            resourceType: this.resourceType,
            groupId: this.groupInfo.id,
            pageIndex: this.pageIndex,
            pageSize: this.pageSize,
            sortOrder: this.sortOrder,
            sort: this.sort
          },
          {
            loadingText: this.$t("service.searching")
          }
        )
        .then(res => {
          var data = res.data.data;
          if (data) {
            this.pageIndex = data.pageIndex;
            this.pageSize = data.pageSize;
            this.total = data.total;
            this.resourceList = data.rows;
            this.defaultThumbnail = getDefaultImg(this.resourceType);
          }
        })
        .catch(() => {});
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getGroupResourceListByPage();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getGroupResourceListByPage();
    },
    sortChange(key) {
      this.pageIndex = 1;
      this.sortOrder = key;
      this.getGroupResourceListByPage();
    },
    sortTypeChange(type) {
      this.pageIndex = 1;
      this.sort = type;
      this.getGroupResourceListByPage();
    },
    toDoing() {
      this.$message({
        message: this.$t(
          "group.ThefunctionwillbeavailablesoonPleaseuseotherfunctions"
        ),
        type: "warning"
      });
    },
    cancelShare(item) {
      //取消共享
      this.$confirm(
        this.$t("group.Areyousuretocancelsharing") + "？",
        this.$t("webAppBuilder.Tip"),
        {
          confirmButtonText: this.$t("myCenter.Sure"),
          cancelButtonText: this.$t("myCenter.cancel"),
          type: "warning"
        }
      )
        .then(() => {
          this.$api.groupApi
            .deleltGroupByResource({
              gpResourceId: item.GPRESOURCEID,
              createBy: item.C_CREATE_BY,
              resourceId: item.C_ID,
              resourceType: this.resourceType,
              groupId: this.groupInfo.id
            })
            .then(() => {
              this.$message({
                type: "success",
                message: this.$t("group.Cancelledsuccessfully")
              });
              this.reset();
              this.getGroupResourceListByPage();
            });
        })
        .catch(() => {});
    },
    showResourceDetails(val) {
      if (
        this.groupInfo.currentState != 1 &&
        this.groupInfo.currentState != 2
      ) {
        this.$message({
          type: "warning",
          message: this.$t("group.Nongroupmembersarenotallowedtoviewdetails")
        });
      } else {
        if (this.$store.getters.isLogin) {
          this.$refs.serviceDetails.viewDetails(val);
        } else {
          this.$message({
            message: this.$t("service.PleaseLoginToViewDetails"),
            type: "warning"
          });
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.group-resource-list {
  .header {
    height: 30px;
    line-height: 30px;
    background: #f9f9f9;
    font-size: 14px;
    color: #7c7c7c;
    padding: 0 10px;
    .total-area {
      padding-left: 4px;
      .total-nums {
        margin: 0 4px;
        @include base-active-color();
        font-size: 15px;
      }
    }
    .sort-btn-area {
      text-align: right;
      .el-dropdown-link {
        @include base-active-color();
        cursor: pointer;
      }
      .el-icon-arrow-down {
        color: #606266;
      }
      .sort-type {
        cursor: pointer;
        margin-left: 10px;
        &:hover {
          @include base-active-color();
        }
      }
    }
  }
  .list {
    margin-top: 15px;
    .resource-container {
      border: 1px solid #dfdfdf;
      height: 250px;
      padding: 0 1px;
      margin-bottom: 20px;
      .img-container {
        width: 100%;
        height: 180px;
        overflow: hidden;
        cursor: pointer;
        .el-image {
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          background: #f3f9f9;
          /deep/.image-slot {
            width: 100%;
            height: 100%;
            line-height: 180px;
            border-radius: 50%;
            background: #f5f7fa;
            color: #c0c4cc;
            text-align: center;
            i {
              font-size: 24px;
            }
          }
        }
      }
      .resource-name {
        height: 50px;
        line-height: 50px;
        font-size: 14px;
        @include base-active-color();
        padding: 0 4px;
      }
      .resource-btn {
        font-size: 14px;
        @include base-active-color();
        padding: 0 4px;
        .left {
          i {
            margin-right: 4px;
          }
        }
        .right {
          text-align: right;
          i {
            margin-left: 6px;
          }
          .el-icon-delete {
            color: #f56c6c;
          }
          .op-btn {
            cursor: pointer;
          }
        }
      }
    }
  }
  .pagination {
    margin-bottom: 20px;
  }
}
.no-data {
  text-align: center;
  margin-top: 20px;
  .el-image {
    display: inline-block;
  }
  p {
    color: #606266;
    font-size: 15px;
  }
}
</style>