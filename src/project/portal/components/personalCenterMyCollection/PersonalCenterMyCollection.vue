<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <favorites
        ref="favorites"
        :favoritesList="favoritesList"
        @addFavorites="addFavorites"
        @favoritesClick="favoritesClick"
      ></favorites>
    </el-col>
    <el-col :span="18">
      <personal-center-my-collection-map
        ref="collectionMap"
        :pageIndex="pageIndex"
        :pageSize="pageSize"
        :pageSizes="pageSizes"
        :total="total"
        :currentFavoritesInfo="currentFavoritesInfo"
        :favoritesResourceList="favoritesResourceList"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        @search="searchResource"
        @deleteFavorites="deleteFavorites"
        @cancelCollectionInfo="cancelCollectionInfo"
        :sortType="sortType"
        @switchSort="switchSort"
        :fieldConf="fieldConf"
      ></personal-center-my-collection-map>
    </el-col>
    <favorites-dialog
      :dialogVisible="dialogVisible"
      :favoritesTypeList="favoritesTypeList"
      @dialogClose="dialogClose"
      @save="saveFavorites"
      :favoritesInfo="favoritesInfo"
    ></favorites-dialog>
  </el-row>
</template>

<script>
import Favorites from "components/personalCenterMyCollection/Favorites";
import PersonalCenterMyCollectionMap from "components/personalCenterMyCollection/PersonalCenterMyCollectionMap";
import FavoritesDialog from "components/personalCenterMyCollection/FavoritesDialog";
import { getTree } from "@/utils/getTree.js";
export default {
  name: "PersonalCenterMyCollection",
  components: {
    Favorites,
    PersonalCenterMyCollectionMap,
    FavoritesDialog
  },
  methods: {
    getFavoritesList() {
      this.$api.personalCenterCollectionApi
        .getFavoritesList({}, { loadingText: this.$t("service.searching") })
        .then(res => {
          let data = res.data.data;
          let father=data.father;
          let children=data.children;
          children.forEach(item=>{
            item.parentCodeKey=item.codeKey;
            item.codeKey="";
          })

          father.forEach(item=>{
            item.icon=item.C_IMG;
            item.name=item.C_NAME;
            item.codeKey=item.C_CODE_KEY;
            item.father=true;
          })
          let newData=father.concat(children);
          this.favoritesList = getTree(newData, "codeKey", "parentCodeKey","children",function(item){
            return item.father?true:false;
          });
          this.favoritesTypeList = newData.filter(item => item.father);
        })
        .catch(() => {});
    },
    dialogClose() {
      this.dialogVisible = false;
    },
    addFavorites() {
      this.resetFavoritesInfo();
      this.dialogVisible = true;
    },
    saveFavorites() {
      this.$api.personalCenterCollectionApi
        .saveFavoritesCategory(this.favoritesInfo, {
          loadingText: this.$t("myCenter.Saving")
        })
        .then(() => {
          this.$message({
            message: this.$t("management.succeeded"),
            type: "success"
          });
          this.dialogClose();
          this.getFavoritesList();
          this.$refs.favorites.favoritesOpenFun(this.favoritesInfo.codeKey);
        })
        .catch(res => {
          if(res.data.status=='397'){
            this.$message({
            message: res.data.title,
            type: "warning"
          });
          }
        });
    },
    favoritesClick(item) {
      //点击收藏夹
      if(this.currentFavoritesInfo.id!=item.id){
        this.$refs.collectionMap.resetSearchKey();
        this.searchKey="";
      }
      else{
        this.searchKey=this.$refs.collectionMap.getSearchKey();
      }
      this.currentFavoritesInfo = item;
      this.getResourceList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getResourceList();
    },
    handleSizeChange(val) {
      this.pageIndex = 1;
      this.pageSize = val;
      this.getResourceList();
    },
    searchResource(val) {
      this.pageIndex = 1;
      this.searchKey = val;
      this.getResourceList();
    },
    getResourceList() {
      if (
        this.currentFavoritesInfo.id == "" ||
        this.currentFavoritesInfo.id == undefined
      ) {
        this.$message({
          message: this.$t("myCenter.PleaseSelectTheFavoriteBeforeQuery"),
          type: "warning"
        });
        return false;
      }
      var params = {
        id: this.currentFavoritesInfo.id,
        codeKey: this.currentFavoritesInfo.parentCodeKey,
        page: this.pageIndex,
        size: this.pageSize,
        searchVal: this.searchKey,
        sort: this.sortType
      };
      this.$api.personalCenterCollectionApi
        .selectFavoritesResourceList(params, {
          loadingText: this.$t("service.searching")
        })
        .then(res => {
          
          var data = res.data.data;
          this.favoritesResourceList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    deleteFavorites() {
      //删除收藏夹
      if (
        this.currentFavoritesInfo.id == "" ||
        this.currentFavoritesInfo.id == undefined
      ) {
        this.$message({
          message: this.$t("myCenter.PleaseSelectTheFavoriteBeforeDelete"),
          type: "warning"
        });
        return false;
      }
      this.$confirm(this.$t("myCenter.ConfirmToDeleteTheCurrentFavorite"))
        .then(() => {
          this.$api.personalCenterCollectionApi
            .deletetFavoritesById(
              {
                id: this.currentFavoritesInfo.id,
                codeKey: this.currentFavoritesInfo.parentCodeKey
              },
              { loadingText: this.$t("management.deleting") }
            )
            .then(() => {
              this.$message({
                message: this.$t("management.succeeded"),
                type: "success"
              });
              this.currentFavoritesInfo={};
              this.$refs.collectionMap.resetSearchKey();
              this.searchKey="";
              this.favoritesResourceList=[];
              this.getFavoritesList();
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    cancelCollectionInfo(item) {
      this.$api.personalCenterCollectionApi
        .cancelCollection(
          {
            favoritesId: item.FAVORITESID,
            codeKey: this.currentFavoritesInfo.parentCodeKey
          },
          { loadingText: this.$t("myCenter.CancellingCollection") }
        )
        .then(() => {
          this.$message({
            message: this.$t("myCenter.CancelledSuccessfully"),
            type: "success"
          });
          this.getResourceList();
        })
        .catch(() => {});
    },
    switchSort() {
      if (this.sortType == "ASC") {
        this.sortType = "DESC";
      } else {
        this.sortType = "ASC";
      }
      this.getResourceList();
    },
    resetFavoritesInfo() {
      this.favoritesInfo = {};
    }
  },
  data() {
    return {
      dialogVisible: false,
      favoritesList: [], //收藏夹列表
      favoritesTypeList: [], //收藏夹分类列表
      favoritesInfo: {}, //单条收藏夹信息
      currentFavoritesInfo: {}, //当前选中收藏夹信息
      favoritesResourceList: [], //文件夹中资源信息
      searchKey: "",
      pageIndex: 1,
      pageSize: 12,
      total: 0,
      pageSizes: [12, 24, 36],
      sortType: "DESC",
      fieldConf: {
        url: "IMG",
        title: "C_NAME",
        author: "USERNAME",
        time: "CONLLECTIONTIME",
        desc: "C_COMMENTS",
        type: "RESOURCETYPE"
      }
    };
  },
  mounted() {
    this.getFavoritesList();
  }
};
</script>

<style lang='scss' scoped>
</style>