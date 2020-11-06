
<template>
  <div class="service-center" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <div>
      <service-center-menu :serviceName="serviceName"></service-center-menu>
    </div>
    <el-row type="flex" justify="space-around">
      <el-col :span="5">
        <side-bar-menu
          :categoryTitle="$t('management.AppsCenterCategory')"
          :searchData="searchData"
          :indexreplace="indexreplace"
          :activeIndex="activeIndex"
          @querySearch="querySearch"
          @handleSelect="handleSelect"
          @handleSidebar="handleSidebar"
        ></side-bar-menu>
      </el-col>
      <el-col :span="17">
        <!-- 右侧地图数据 -->
        <map-resource-display
          @mapDetails="mapDetails"
          @saveKqServiceTop="saveAppTop"
          @deleteKqServiceTop="deleteAppTop"
          @deleteServiceCollection="deleteAppCollection"
          @order="order"
          @dropdownSortList="dropdownSortList"
          @searchFun="searchFun"
          @getListService="getAppList"
          :props="MapResourceDisplayProps"
          :sortDropDown="sortDropDown"
          :pageShowProps="pageShowProps"
          @getFavoritesCategoryCodeKey="getFavoritesCategoryCodeKey"
          @getTopFun="getTopFun"
          :visible="visible"
          @showCollector="showCollector"
          ref="mapResourceDisplay"
        >
          <template slot="searchPageDrop">
            <el-row class="head">
              <el-col :span="4" class="total">
                <span
                  v-if="MapResourceDisplayProps.total==0"
                >{{MapResourceDisplayProps.total}}-{{MapResourceDisplayProps.currentPage*MapResourceDisplayProps.currentSize>MapResourceDisplayProps.total?MapResourceDisplayProps.total:MapResourceDisplayProps.currentPage*MapResourceDisplayProps.currentSize}}</span>
                <span
                  v-if="MapResourceDisplayProps.total>0"
                >{{1+(MapResourceDisplayProps.currentPage-1)*MapResourceDisplayProps.currentSize}}-{{MapResourceDisplayProps.currentPage*MapResourceDisplayProps.currentSize>MapResourceDisplayProps.total?MapResourceDisplayProps.total:MapResourceDisplayProps.currentPage*MapResourceDisplayProps.currentSize}}</span>
                <span>/</span>
                <span>{{MapResourceDisplayProps.total}}</span>
              </el-col>
              <el-col :span="20" class="right-group">
                <el-input
                  :placeholder="$t('myCenter.PleaseEnterTheContent')"
                  @keyup.enter.native="searchFun(searchVal)"
                  v-model="searchVal"
                >
                  <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <!-- 排序 -->
                <div class="dropdown-box">
                  <el-dropdown @command="dropdownSortList">
                    <span>
                      <span class="arrange-hover sortDataColor">{{MapResourceDisplayProps.sortData}}</span>
                      <span class="el-icon-arrow-down arrange-hover"></span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        v-for="(sortitems,i) in sortDropDown"
                        :key="i"
                        :command="sortitems"
                      >{{sortitems.sortname}}</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
                <span
                  v-show="switchShow"
                  class="btn el-icon-portal-pailie"
                  @click="switchingState(false)"
                >{{$t('myCenter.Grid')}}</span>
                <span
                  v-show="!switchShow"
                  class="btn el-icon-portal-liebiao2"
                  @click="switchingState(true)"
                >{{$t('myCenter.List')}}</span>
                <el-button
                  class="el-icon-portal-yingyong"
                  @click="jumpApp"
                >{{$t('webAppBuilder.CustomApplication')}}</el-button>
              </el-col>
            </el-row>
          </template>
        </map-resource-display>
        <!-- 分页 -->
        <pagination
          ref="pagination"
          class="pagination"
          :pageSizes="pageSizes"
          :pageIndex="pageIndex"
          :total="MapResourceDisplayProps.total"
          :pageSize="MapResourceDisplayProps.currentSize"
          @handleCurrentChange="handleCurrentChange"
          @handleSizeChange="handleSizeChange"
          v-show="pageShow"
        ></pagination>
      </el-col>
      <service-function-collection
        :visible="visible"
        @saveServiceCollection="saveAppCollection"
        :collectionClassification="collectionClassification"
        :popoverLeft="popoverLeft"
        :popoverTop="popoverTop"
        @saveFavoritesCategory="saveFavoritesCategory"
      ></service-function-collection>
    </el-row>
  </div>
</template>
<script>
import ServiceCenterMenu from "components/serviceCenter/ServiceCenterMenu";
import MapResourceDisplay from "components/common/mapResourceDisplay/MapResourceDisplay";
import SideBarMenu from "components/common/sideBarMenu/SideBarMenu";
import { filterTreeArrayByString } from "@/utils/filterUtils.js";
import Pagination from "../common/page/Pagination";
import { getTree } from "@/utils/getTree.js";
import ServiceFunctionCollection from "components/serviceFunction/ServiceFunctionCollection";
export default {
  data() {
    return {
      switchShow: true, //默认网格
      visible: false,
      MapResourceDisplayProps: {
        currentPage: 1,
        currentSize: 12,
        getList: [],
        total: 0,
        defaultSrc: "/config/imageConfig/function/app/app1.png",
        displayNoDataSrc: require("img/nodata.jpg"),
        sortData: this.$t("service.updateTime"),
        placeholderData: this.$t("service.SearchApps"),
        instructions: "el-icon-portal-gongju"
      },
      pageShowProps: {
        serviceSearchBoxShow: true,
        servicePagesBoxShow: true,
        serviceSortBoxShow: true,
        instructionsShow: false
      },
      sortDropDown: [
        {
          sortname: this.$t("service.updateTime"),
          sortid: "CREATE_TIME"
        },
        {
          sortname: this.$t("service.visits"),
          sortid: "HITS"
        },
        {
          sortname: this.$t("service.title"),
          sortid: "NAME"
        }
      ],
      serviceName: this.$t("myCenter.AppCenter"),
      searchVal: "", //top搜索框值
      serviceClassify: "", //侧边栏
      serviceClassifyParent: 1,
      sort: "DESC", //请求返回默认排序值
      sortOrder: "CREATE_TIME", //排序下拉框默认的id
      searchData: [],
      category: [],
      activeIndex: "1",
      indexreplace: "1",
      pageSizes: [12, 24, 36],
      pageIndex: 0,
      pageShow: false,
      collectionClassification: [],
      serviceId: 0,
      popoverLeft: 0,
      popoverTop: 0,
      all: "全部"
    };
  },
  name: "ServiceAppCenterNav",
  components: {
    ServiceCenterMenu,
    MapResourceDisplay,
    SideBarMenu,
    Pagination,
    ServiceFunctionCollection
  },
  computed: {
    homePageHeaderHeight() {
      return this.$store.getters.homePageHeaderHeight;
    }
  },
  mounted() {
    this.getAppCategory();
  },
  methods: {
    // 列表  网格  切换
    switchingState(val) {
      this.switchShow = !this.switchShow;
      this.$refs.mapResourceDisplay.switchingState(val);
    },
    // 跳转到应用定制
    jumpApp() {
      this.$router.push({
        path: "/appbuilder"
      });
    },
    showCollector() {
      this.visible = true;
      var collectorPop = () => {
        this.visible = false;
        document.body.removeEventListener("click", collectorPop);
      };
      document.body.addEventListener("click", collectorPop);
    },
    getTopFun(row) {
      this.popoverTop = row.tops;
      this.popoverLeft = row.lefts;
    },
    //侧边栏公共组件事件
    // 搜索
    querySearch(queryString, cb) {
      var cloneData = JSON.parse(JSON.stringify(this.searchData));
      var results = filterTreeArrayByString(
        cloneData,
        queryString,
        "typeName",
        "children",
        true,
        true,
        "value",
        function(arr) {
          if (!arr.parentId && arr.id != -1) {
            return false;
          } else {
            return true;
          }
        }
      );
      if (results.length == 0) {
        results.push({ value: this.$t("service.noResultsFound") });
      }
      cb(results);
      this.activeIndex = results.id;
    },
    //搜索下拉选中
    handleSelect(item) {
      this.activeIndex = item.id.toString();
      if (item.id < 0) {
        item.id = "";
      }
      this.getserviceClassify(item.id);
      this.getserviceClassifyParent(item.parentId);
      this.getAppList();
    },
    //分类下拉框
    handleSidebar(val, k) {
      if (k[1] < 0) {
        k[1] = "";
      }
      this.resetHomePage();
      this.getserviceClassify(k[1]);
      this.getserviceClassifyParent(k[0]);
      this.getAppList();
      this.indexreplace = k[0];
    },
    //触发地图详情
    clickServiceDetails(val) {
      this.$emit("getAppDetails", val);
    },

    getserviceClassifyParent(val) {
      this.serviceClassifyParent = val;
    },
    getserviceClassify(val) {
      this.serviceClassify = val;
    },
    //  请求 侧边栏数据 0
    getAppCategory() {
      this.$api.serviceAppCenterApi
        .getAppCategory({ loadingText: this.$t("service.searching") })
        .then(res => {
          this.searchData = getTree(
            res.data.data,
            "id",
            "parentId",
            "children",
            null,
            function(arr) {
              if (arr.length > 0) {
                var oll = {
                  id: arr[0].parentId,
                  parentId: 0,
                  typeName: this.$t("service.all"),
                  sortNo: 9999
                };
                arr.push(oll);
                arr.sort(function(a, b) {
                  return b.sortNo - a.sortNo;
                });
              }
            }.bind(this)
          );
          this.searchData.some(item => {
            if (item.children != undefined) {
              this.activeIndex = item.id.toString();
              this.serviceClassifyParent = this.activeIndex;
              this.serviceClassify = this.activeIndex;
              this.getAppList();
              return true;
            }
          });
        })
        .catch(() => {});
    },
    //请求  右侧数据 0
    getAppList() {
      if (this.serviceClassify == this.serviceClassifyParent) {
        this.serviceClassify = "";
      }
      this.$api.serviceAppCenterApi
        .getAppList(
          {
            page: this.MapResourceDisplayProps.currentPage,
            size: this.MapResourceDisplayProps.currentSize,
            searchVal: this.searchVal,
            appClassify: this.serviceClassify?this.serviceClassify:this.serviceClassifyParent,
            appClassifyParent: this.serviceClassifyParent,
            sortOrder: this.sortOrder,
            sort: this.sort
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.status == 200) {
            this.MapResourceDisplayProps.getList = res.data.data.rows;
            this.MapResourceDisplayProps.total = res.data.data.total;
            if (this.MapResourceDisplayProps.getList.length > 0) {
              this.pageShow = true;
            } else {
              this.pageShow = false;
            }
          }
        })
        .catch(() => {});
    },
    //地图服务列表公共组件
    //图片详情 编辑权限判断C_YW_EDIT
    mapDetails(val) {
      val.valList.forEach(Element => {
        if (Element.C_ID == val.valId) {
          if (this.$store.getters.isLogin) {
            this.clickServiceDetails(val.valId);
            // if (Element.C_YW_BROWSE == 1) {
            //   this.clickServiceDetails(val.valId);
            // } else {
            //   this.$message({
            //     message: this.$t("myCenter.Youhavenopermissiontoview"),
            //     type: "warning"
            //   });
            // }
          } else {
            this.$message({
              message: this.$t("service.PleaseLoginToViewDetails"),
              type: "warning"
            });
          }
        }
      });
    },

    //请求 置顶 0
    saveAppTop(row) {
      this.$api.serviceAppCenterApi
        .saveAppTop(
          {
            appId: row
          },
          { loadingText: this.$t("service.movingToTop") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("service.Stickedsuccessfully"),
              type: "success"
            });
            this.resetHomePage();
            this.getAppList();
          }
        })
        .catch(() => {});
    },
    //请求  取消置顶 0
    deleteAppTop(row) {
      this.$api.serviceAppCenterApi
        .deleteAppTop(
          {
            topId: row
          },
          { loadingText: this.$t("service.cancellingTopPlace") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("service.Unstickedsuccessfully"),
              type: "success"
            });
            this.resetHomePage();
            this.getAppList();
          }
        })
        .catch(() => {});
    },
    //获取收藏分类列表
    getFavoritesCategoryCodeKey(row) {
      this.serviceId = row.serviceId;
      this.$api.serviceFunctionApi
        .getFavoritesCategoryCodeKey(
          {
            codeKey: "favorites_app"
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.data.status == 200) {
            this.collectionClassification = res.data.data;
          }
        })
        .catch(() => {});
    },
    //收藏
    saveAppCollection(row) {
      this.visible = false;
      this.$api.serviceAppCenterApi
        .saveAppCollection(
          {
            appId: this.serviceId,
            resourceType: "appbuilder",
            favoritesId: row.id
          },
          { loadingText: this.$t("service.collecting") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("service.Collectedsuccessfully"),
              type: "success"
            });
            this.resetHomePage();
            this.getAppList();
          }
        })
        .catch(() => {});
    },
    //添加文件夹
    saveFavoritesCategory(row) {
      if (row == "") {
        this.$message({
          message: this.$t("service.pleaseEnterANameForTheNewFavoriteFolder"),
          type: "warning"
        });
        return;
      }
      this.$api.personalCenterCollectionApi
        .getFavoritesCategoryOnly({
          name: row,
          codeKey: this.collectionClassification[0].codeKey
        })
        .then(resData => {
          if (!resData.data.data) {
            this.$message({
              message: this.$t("service.Favoritesalreadyadded"),
              type: "warning"
            });
          } else {
            this.$api.personalCenterCollectionApi
              .saveFavoritesCategory(
                {
                  codeKey: this.collectionClassification[0].codeKey,
                  parentId: this.collectionClassification[0].id,
                  name: row
                },
                { loadingText: this.$t("service.addingFavorite") }
              )
              .then(res => {
                if (res.data.status == 200) {
                  this.getFavoritesCategoryCodeKey({
                    serviceId: this.serviceId
                  });
                  this.$message({
                    message: this.$t("service.addedFavoriteSuccessfully"),
                    type: "success"
                  });
                }
              })
              .catch(() => {});
          }
        });
    },
    //取消收藏
    deleteAppCollection(row) {
      this.visible = false;
      this.$api.serviceAppCenterApi
        .deleteAppCollection(
          {
            collectionId: row
          },
          { loadingText: this.$t("service.cancellingCollection") }
        )
        .then(res => {
          if (res.status == 200) {
            this.$message({
              message: this.$t("myCenter.CancelledSuccessfully"),
              type: "success"
            });
            this.resetHomePage();
            this.getAppList();
          }
        })
        .catch(() => {});
    },
    //请求  倒序，正序排序
    order(val) {
      this.resetHomePage();
      this.sort = val;
      this.getAppList();
    },
    //请求 下拉排序列表
    dropdownSortList(command) {
      this.MapResourceDisplayProps.sortData = command.sortname;
      this.sortOrder = command.sortid;
      this.resetHomePage();
      this.getAppList();
    },
    //请求  top搜索
    searchFun(val) {
      this.searchVal = val;
      this.resetHomePage();
      this.getAppList();
    },
    //当前页码  子向父传值
    handleCurrentChange(val) {
      this.MapResourceDisplayProps.currentPage = val;
      this.getAppList();
    },
    //每页显示的条数   子向父传值
    handleSizeChange(val) {
      this.MapResourceDisplayProps.currentSize = val;
      this.getAppList();
    },
    //分页重置到首页
    resetHomePage() {
      this.pageIndex = 1;
      this.$refs.pagination.handlePageIndexChange(this.pageIndex);
      this.MapResourceDisplayProps.currentPage = 1;
    }
  }
};
</script>
<style lang="scss" scoped>
.service-center {
  min-height: 700px;
  .common-pagination {
    margin-bottom: 30px;
  }
  .head {
    border-bottom: 1px solid #ebeef5;
    margin-bottom: 20px;
    height: 45px;
    line-height: 40px;
    .dropdown-box {
      height: 48px;
      display: inline-block;
      .el-dropdown {
        height: 30px;
        margin-right: 10px;
      }
    }
    .total {
      color: #818181;
      font-size: 14px;
      float: left;
      padding-left: 10px;
      span {
        margin-right: 8px;
      }
    }
    .right-group {
      text-align: right;
      .el-input {
        height: 32px;
        line-height: 32px;
        width: 300px;
        margin-right: 10px;
        /deep/ .el-input__inner {
          height: 32px;
          line-height: 32px;
          border-radius: 16px;
        }
        /deep/ .el-input__icon {
          line-height: 32px;
        }
      }
      .btn {
        color: #606266;
        cursor: pointer;
      }
      .el-button {
        margin-left: 10px;
        padding: 10px 5px;
      }
    }
  }
}
</style>

