
<template>
  <div id="service-center" :style="'margin-top:'+homePageHeaderHeight+'px'">
    <el-row class="service-center-menu">
      <el-col :span="14">
        <span class="service-center-left">{{this.serviceName}}</span>
      </el-col>
      <el-col :span="10">
        <el-row type="flex" justify="space-between" class="map-search">
          <el-col :span="20">
            <div class="inp">
              <el-input
                :placeholder="$t('service.SearchFiles')"
                v-model="searchVal"
                class="input-with-select"
                @keyup.enter.native="searchFun"
              >
                <el-button
                  slot="append"
                  @click="searchFun"
                  class="base-btn"
                >{{$t('service.search')}}</el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="4" class="icon">
            <div
              class="btn el-icon-portal-liebiao1"
              @click="switchingState(true)"
              :class="MapResourceDisplayProps.gridding?'btn-focus':''"
            ></div>
            <div
              class="btn el-icon-portal-liebiao"
              @click="switchingState(false)"
              :class="!MapResourceDisplayProps.gridding?'btn-focus':''"
            ></div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="5">
        <side-bar-menu
          :categoryTitle="$t('management.MyFileCategory')"
          :searchData="searchData"
          :indexreplace="indexreplace"
          :activeIndex="activeIndex"
          @querySearch="querySearch"
          @handleSelect="handleSelect"
          @handleSidebar="handleSidebar"
          :portalIcon="portalIcon"
          :myKeyWordData="myKeyWordData"
          @serviceCheckValueChanger="serviceCheckValueChanger"
        ></side-bar-menu>
      </el-col>
      <el-col :span="17">
        <!-- 右侧地图数据 -->
        <map-resource-display
          @mapDetails="mapDetails"
          @saveKqServiceTop="saveFileTop"
          @deleteKqServiceTop="deleteFileTop"
          @deleteServiceCollection="deleteFileCollection"
          @order="order"
          @dropdownSortList="dropdownSortList"
          @getListService="getFileList"
          :props="MapResourceDisplayProps"
          :sortDropDown="sortDropDown"
          :pageShowProps="pageShowProps"
          @getFavoritesCategoryCodeKey="getFavoritesCategoryCodeKey"
          @showCollector="showCollector"
        ></map-resource-display>

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
        ref="collection"
        @refreshList="searchFun"
        :resourceType="'fileService'"
      ></service-function-collection>
      <service-file-preview-dialog
        :fileServiceDialogVisible="fileServiceDialogVisible"
        @handleClose="handleClose"
        :fileServiceDetails="fileServiceDetails"
        :isDetailsFilelist="isDetailsFilelist"
      ></service-file-preview-dialog>
    </el-row>
  </div>
</template>
<script>
import MapResourceDisplay from "components/common/mapResourceDisplay/MapResourceDisplay";
import SideBarMenu from "components/common/sideBarMenu/SideBarMenu";
import { filterTreeArrayByString } from "@/utils/filterUtils.js";
import Pagination from "../common/page/Pagination";
import { getTree } from "@/utils/getTree.js";
import ServiceFunctionCollection from "components/serviceFunction/ServiceFunctionCollection";
import ServiceFilePreviewDialog from "./ServiceFilePreviewDialog";
import { getFileDefaultImg } from "portal/components/common/uploadClipping/uploadClippingConfig/uploadClippingConfig.js";
export default {
  data() {
    return {
      MapResourceDisplayProps: {
        currentPage: 1,
        currentSize: 12,
        getList: [],
        total: 0,
        defaultSrc: "",
        displayNoDataSrc: require("img/nodata.jpg"),
        sortData: this.$t("service.updateTime"),
        instructions: "el-icon-portal-gongju",
        gridding: true, //网格不显示的内容隐藏
        pnav: "", //父导航
        snav: "" //子导航
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
      serviceName: this.$t("service.Files"),
      searchVal: "", //top搜索框值
      serviceClassify: "", //侧边栏
      serviceClassifyParent: 1,
      sort: "DESC", //请求返回默认排序值
      sortOrder: "CREATE_TIME", //排序下拉框默认的id
      searchData: [],
      myKeyWordData: [], //关键字
      keyWord: "", //选中关键字
      category: [],
      activeIndex: "1",
      indexreplace: "1",
      pageSizes: [12, 24, 36],
      pageIndex: 0,
      pageShow: false,
      all: "全部",
      portalIcon: "el-icon-portal-wenjian1",
      fileServiceDialogVisible: false, //文件预览
      fileServiceDetails: {}, //文件详情
      isDetailsFilelist: [] //文件夹单文件详情
    };
  },
  name: "ServiceFileCen",
  components: {
    MapResourceDisplay,
    SideBarMenu,
    Pagination,
    ServiceFunctionCollection,
    ServiceFilePreviewDialog
  },
  computed: {
    homePageHeaderHeight() {
      return this.$store.getters.homePageHeaderHeight;
    }
  },
  mounted() {
    this.getFileCategory();
  },
  methods: {
    // 网格切换
    switchingState(val) {
      this.MapResourceDisplayProps.gridding = val;
    },
    showCollector() {
      this.$refs.collection.showCollector();
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
      this.getFileList();
    },
    //分类下拉框
    handleSidebar(val, k) {
      if (k[1] < 0) {
        k[1] = "";
      }
      if (k.length > 1) {
        this.searchData.forEach(item => {
          if (item.id == k[0]) {
            this.MapResourceDisplayProps.pnav = item.typeName;
            item.children.forEach(i => {
              if (i.id == k[1]) {
                this.MapResourceDisplayProps.snav = i.typeName;
              }
            });
          }
        });
      } else {
        this.searchData.forEach(item => {
          if (item.id == k[0]) {
            this.MapResourceDisplayProps.pnav = item.typeName;
            this.MapResourceDisplayProps.snav = null;
          }
        });
      }
      this.resetHomePage();
      this.getserviceClassify(k[1]);
      this.getserviceClassifyParent(k[0]);
      this.getFileList();
      this.indexreplace = k[0];
    },
    //触发地图详情
    clickServiceDetails(val) {
      this.$emit("getServiceDetails", val);
    },
    // 关闭文件预览
    handleClose() {
      this.fileServiceDialogVisible = false;
    },
    getserviceClassifyParent(val) {
      this.serviceClassifyParent = val;
    },
    getserviceClassify(val) {
      this.serviceClassify = val;
    },
    //  请求 侧边栏数据 0
    getFileCategory() {
      this.$api.serviceFileCenApi
        .getFileCategory({}, { loadingText: this.$t("service.searching") })
        .then(res => {
          this.searchData = getTree(
            res.data.data,
            "id",
            "parentId",
            "children",
            null
            // function(arr) {
            //   if (arr.length > 0) {
            //     var oll = {
            //       id: arr[0].parentId,
            //       parentId: 0,
            //       typeName: this.$t("service.all"),
            //       sortNo: 9999
            //     };
            //     arr.push(oll);
            //     arr.sort(function(a, b) {
            //       return b.sortNo - a.sortNo;
            //     });
            //   }
            // }.bind(this)
          );
          this.searchData.some(item => {
            if (item.children != undefined) {
              this.activeIndex = item.id.toString();
              this.MapResourceDisplayProps.pnav = item.typeName;
              this.MapResourceDisplayProps.snav = null;
              this.serviceClassifyParent = this.activeIndex;
              this.serviceClassify = this.activeIndex;
              this.getFileList();
              return true;
            }
          });
        })
        .catch(() => {});
    },
    //获取我能看到关键字
    getFileKwList() {
      this.$api.serviceFileCenApi
        .getFileKwList({}, { loadingText: this.$t("service.searching") })
        .then(res => {
           this.myKeyWordData = [];
          function compare(property) {
            return function(a, b) {
              return b[property] - a[property];
            };
          }
          var obj = res.data.data;
          for (let i in obj) {
            let o = { name: i, num: obj[i] };
            this.myKeyWordData.push(o);
          }
          let newObj = {};
          this.myKeyWordData.sort(compare("num")).forEach((item, index) => {
            newObj[index] = item;
          });
        })
        .catch(() => {});
    },
    serviceCheckValueChanger(val) {
      this.keyWord = val;
      this.getFileList();
    },
    //请求  右侧数据 0
    getFileList() {
      if (this.serviceClassify == this.serviceClassifyParent) {
        this.serviceClassify = "";
      }
      this.getFileKwList();
      this.$api.serviceFileCenApi
        .getFileList(
          {
            page: this.MapResourceDisplayProps.currentPage,
            size: this.MapResourceDisplayProps.currentSize,
            searchVal: this.searchVal,
            fileClassify: this.serviceClassify
              ? this.serviceClassify
              : this.serviceClassifyParent,
            fileClassifyParent: this.serviceClassifyParent,
            sortOrder: this.sortOrder,
            sort: this.sort,
            keyWord: this.keyWord
          },
          { loadingText: this.$t("service.searching") }
        )
        .then(res => {
          if (res.status == 200) {
            res.data.data.rows.forEach(item => {
              if (item.C_FOLDER == 1) {
                item.defaultSrc = getFileDefaultImg("folder");
              } else {
                item.defaultSrc = getFileDefaultImg(item.SUFFIX);
              }
            });
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
            if (val.flag == "fileDetail") {
              //文件详情
              this.clickServiceDetails(val.valItem);
            } else {
              if (Element.YWBROWSE > 0) {
                if (
                  val.valItem.SUFFIX == "jpg" ||
                  val.valItem.SUFFIX == "png" ||
                  val.valItem.SUFFIX == "jpeg" ||
                  val.valItem.SUFFIX == "gif" ||
                  val.valItem.SUFFIX == "mp4" ||
                  val.valItem.SUFFIX == "avi" ||
                  val.valItem.SUFFIX == "mov" ||
                  val.valItem.SUFFIX == "mkv" ||
                  val.valItem.SUFFIX == "flv" ||
                  val.valItem.SUFFIX == "vmvb" ||
                  val.valItem.SUFFIX == "scs" ||
                  val.valItem.C_FOLDER == 1
                ) {
                  if (val.valItem.C_FOLDER == 1) {
                    // 文件夹  获取单文件信息
                    this.$api.serviceFileCenApi
                      .getFolderDatails({
                        folderId: val.valItem.C_ID
                      })
                      .then(res => {
                        if (res.data.data[0].folderlist[0].YWBROWSE > 0) {
                          this.isDetailsFilelist = res.data.data[0].filelist;
                          this.fileServiceDialogVisible = true;
                        }
                      })
                      .catch(() => {});
                  } else {
                    this.fileServiceDialogVisible = true;
                  }
                  this.fileServiceDetails = val.valItem; //图片视频文件预览
                } else {
                  // this.clickServiceDetails(val.valItem); //文件详情
                  this.$message({
                    message: '当前文件暂不支持预览',
                    type: "warning"
                  });
                }
              } else {
                this.$message({
                  message: '您目前没有预览权限',
                  type: "warning"
                });
              }
            }
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
    saveFileTop(row) {
      this.$api.serviceFileCenApi
        .saveFileTop(
          {
            fileId: row
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
            this.getFileList();
          }
        })
        .catch(() => {});
    },
    //请求  取消置顶 0
    deleteFileTop(row) {
      this.$api.serviceFileCenApi
        .deleteFileTop(
          {
            TOPID: row.topId,
            fileId: row.serviceId
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
            this.getFileList();
          }
        })
        .catch(() => {});
    },
    //获取收藏分类列表
    getFavoritesCategoryCodeKey(row) {
      this.$refs.collection.getFavoritesCategoryCodeKey(row);
    },
    //取消收藏
    deleteFileCollection(row) {
      this.$refs.collection.deleteServiceCollection(row);
    },
    //请求  倒序，正序排序
    order(val) {
      this.resetHomePage();
      this.sort = val;
      this.getFileList();
    },
    //请求 下拉排序列表
    dropdownSortList(command) {
      this.MapResourceDisplayProps.sortData = command.sortname;
      this.sortOrder = command.sortid;
      this.resetHomePage();
      this.getFileList();
    },
    //请求  top搜索
    searchFun() {
      this.resetHomePage();
      this.getFileList();
    },
    //当前页码  子向父传值
    handleCurrentChange(val) {
      this.MapResourceDisplayProps.currentPage = val;
      this.getFileList();
    },
    //每页显示的条数   子向父传值
    handleSizeChange(val) {
      this.MapResourceDisplayProps.currentSize = val;
      this.getFileList();
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
#service-center {
  min-height: 700px;
  .el-row--flex.is-justify-space-around {
    background: #f5f5f5;
    min-height: 700px;
  }
  .common-pagination {
    margin-bottom: 30px;
  }
  .service-center-menu {
    width: 100%;
    // height: 48px;
    line-height: 48px;
    background: #fff;
    border-bottom: 1px solid #dfdfdf;
    padding: 0 2%;
    color: #4c4c4c;
    .service-center-left {
      display: inline-block;
      height: 48px;
      &::after {
        content: "";
        width: 100%;
        height: 3px;
        @include menu-active-bg();
        position: absolute;
        bottom: -1px;
        left: 0px;
        z-index: 2;
      }
      position: relative;
      @include menu-active-color();
    }
    .map-search {
      height: 30px;
      width: 100%;
      .inp {
        float: left;
        height: 30px;
        width: 100%;
        /deep/.el-input-group__append {
          width: 50px;
          font-size: 14px;
          color: #ffffff;
          padding: 0;
          text-align: center;
          border: none;
          border-radius: 0;
          vertical-align: text-top;
          .el-button {
            width: 50px;
            height: 30px;
            border-radius: 0;
            padding: 0;
          }
          .base-btn {
            @include base-radio-button();
          }
        }
        /deep/.el-input__inner {
          border-radius: 0;
          border: 1px solid #dcdfe6;
          border-right: none;
          height: 30px;
          line-height: 30px;
        }
        /deep/.el-input__inner:focus {
          @include base-active-underline(
            $types: (
              "top",
              "bottom",
              "left"
            )
          );
        }
      }
      .icon {
        text-align: right;
        .btn {
          width: 32px;
          border: 10px 0;
          padding: 7px 0px;
          border: 1px solid #dcdfe6;
          text-align: center;
        }
        div:first-child {
          border-right: none;
        }
        .btn-focus {
          @include base-active-color();
          @include base-active-underline($width: 3px, $types: "bottom");
          height: 12px;
        }
      }
    }
  }
  .pagination {
    /deep/.el-pagination {
      .btn-prev,
      .btn-next {
        background: #fff;
      }
      .el-pager {
        .number {
          background: #fff;
        }
        .active {
          @include base-active-pagination();
        }
      }
    }
  }
}
</style>

