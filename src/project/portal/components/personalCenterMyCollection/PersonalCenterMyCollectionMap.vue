<template>
  <el-row>
    <el-row class="top">
      <el-col :span="8">
        <div class="title" v-if="favoritesInfo.name||editStatus">
          <span v-if="!editStatus">{{favoritesInfo.name}}</span>
          <el-input
            class="file-folder-name"
            id="file-folder-name"
            v-model="favoritesInfo.name"
            @keyup.enter.native="editName"
            autofocus="true"
            @click.native.stop="1==1"
            v-else
          ></el-input>
          <i class="el-icon-edit" @click="edit"></i>
        </div>
        <div class="title" style="height:1px;" v-else></div>
      </el-col>
      <el-col :span="16" class="right-group">
        <el-input
          :placeholder="$t('myCenter.PleaseEnterTheContent')"
          @keyup.enter.native="search"
          v-model="searchKey"
        >
          <i slot="suffix" class="el-input__icon el-icon-search" v-show="searchKey.length===0"></i>
        </el-input>
        <span
          class="sort-btn"
          :class="sortType=='ASC'?'el-icon-portal-ziyuan1':'el-icon-portal-ziyuan'"
          @click="switchSort"
        >{{$t('service.time')}}</span>
        <span
          class="switch-btn"
          :class="layout=='grid'?'el-icon-portal-pailie':'el-icon-portal-liebiao2'"
          @click="switchLayout"
        >{{layoutTitle}}</span>
        <el-button class="el-icon-delete" @click="deleteFavorites">{{$t('myCenter.DeleteFavorite')}}</el-button>
      </el-col>
    </el-row>
    <el-row v-if="favoritesResourceList.length>0">
      <personal-center-my-collection-map-list
        class="map-list"
        :layout="layout"
        :favoritesResourceList="favoritesResourceList"
        @cancelCollectionInfo="cancelCollectionInfo"
        :fieldConf="fieldConf"
      ></personal-center-my-collection-map-list>
      <pagination
        class="pagination"
        :pageIndex="pageIndex"
        :pageSize="pageSize"
        :pageSizes="pageSizes"
        :total="total"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
      ></pagination>
    </el-row>
    <el-row class="no-data" v-else>
      <el-image :src="noDataImg"></el-image>
      <p>{{$t('myCenter.NoCollectionNow')}}</p>
    </el-row>
  </el-row>
</template>

<script>
import PersonalCenterMyCollectionMapList from "components/personalCenterMyCollection/PersonalCenterMyCollectionMapList";
import Pagination from "components/common/page/Pagination";
import { setTimeout } from "timers";
export default {
  name: "PersonalCenterMyCollectionMap",
  components: {
    PersonalCenterMyCollectionMapList,
    Pagination
  },
  props: {
    pageIndex: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 12
    },
    pageSizes: {
      type: Array,
      default: () => {
        return [12, 24, 36];
      }
    },
    total: {
      type: Number,
      default: 0
    },
    currentFavoritesInfo: {
      type: Object,
      default: () => {
        return {};
      }
    },
    favoritesResourceList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    sortType: {
      type: String,
      default: "DESC"
    },
    fieldConf: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    currentFavoritesInfo() {
      this.favoritesInfo = JSON.parse(
        JSON.stringify(this.currentFavoritesInfo)
      );
    }
  },
  data() {
    return {
      searchKey: "",
      layoutTitle: this.$t("myCenter.Grid"),
      layout: "grid",
      editStatus: false,
      favoritesInfo: {},
      noDataImg: require("img/nocollection.jpg")
    };
  },
  methods: {
    switchLayout() {
      if (this.layoutTitle == this.$t("myCenter.List")) {
        this.layoutTitle = this.$t("myCenter.Grid");
        this.layout = "grid";
      } else {
        this.layoutTitle = this.$t("myCenter.List");
        this.layout = "list";
      }
    },
    switchSort() {
      this.$emit("switchSort");
    },
    edit() {
      this.editStatus = true;
      setTimeout(() => {
        document.getElementById("file-folder-name").focus();
        var closeInput = () => {
          this.editName();
          document.body.removeEventListener("click", closeInput);
        };
        document.body.addEventListener("click", closeInput);
      });
    },
    editName() {
      if (this.editStatus) {
        if (this.favoritesInfo.name == this.currentFavoritesInfo.name) {
          this.editStatus = false;
          return false;
        }
        if (this.favoritesInfo.name == "") {
          this.$message({
            message: this.$t("myCenter.TheFolderNameCannotBeEmpty"),
            type: "error"
          });
          this.favoritesInfo.name = this.currentFavoritesInfo.name;
          this.editStatus = false;
          return false;
        }
        this.$api.personalCenterCollectionApi
          .getFavoritesCategoryOnly({
            id: this.favoritesInfo.id,
            name: this.favoritesInfo.name,
            parentId: this.favoritesInfo.parentId,
            codeKey:this.favoritesInfo.parentCodeKey
          })
          .then(res => {
            if (res.data.data) {
              this.$api.personalCenterCollectionApi
                .saveFavoritesCategory(this.favoritesInfo, {
                  loadingText: this.$t("myCenter.Modifying")
                })
                .then(() => {
                  this.$message({
                    message: this.$t("myCenter.ModifiedSuccessfully"),
                    type: "success"
                  });
                  this.currentFavoritesInfo.name = this.favoritesInfo.name;
                  this.editStatus = false;
                })
                .catch(() => {
                  this.favoritesInfo.name = this.currentFavoritesInfo.name;
                  this.editStatus = false;
                });
            } else {
              this.$message({
                message: this.$t("myCenter.TheFolderNameHasAlreadyExisted"),
                type: "error"
              });
              this.favoritesInfo.name = this.currentFavoritesInfo.name;
              this.editStatus = false;
            }
          })
          .catch(() => {
            this.favoritesInfo.name = this.currentFavoritesInfo.name;
            this.editStatus = false;
          });
      }
    },
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    search() {
      this.$emit("search", this.searchKey);
    },
    deleteFavorites() {
      this.$emit("deleteFavorites");
    },
    cancelCollectionInfo(item) {
      this.$emit("cancelCollectionInfo", item);
    },
    resetSearchKey(){
      this.searchKey="";
    },
    getSearchKey(){
      return this.searchKey;
    }
  }
};
</script>

<style lang='scss' scoped>

.top {
  font-size: 14px;
  // border-top:1px solid #dfdfdf;
  border-bottom: 1px solid #dfdfdf;
  height: 48px;
  line-height: 48px;
  .title {
    font-size: 16px;
    width: 100%;
    span {
      color: #606266;
      // @include base-active-color();
      margin-right: 4px;
    }
    i {
      color: #606266;
      cursor: pointer;
    }
    .file-folder-name {
      width: 90%;
      /deep/ #file-folder-name {
        padding: 0px;
        font-size: 16px;
        border: none;
        border-bottom: 1px solid #dcdfe6;
        border-radius: 0;
        height: 30px;
        line-height: 30px;
      }
    }
  }
  .right-group {
    text-align: right;
    .el-input {
      height: 32px;
      line-height: 32px;
      width: 250px;
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
    .el-button {
      margin-left: 10px;
      padding: 10px 5px;
    }
    .sort-btn {
      color: #606266;
      margin-right: 6px;
      cursor: pointer;
    }
    .switch-btn {
      color: #606266;
      cursor: pointer;
    }
  }
}
.map-list {
  margin-top: 15px;
}
.pagination {
  margin-bottom: 22px;
}
.no-data {
  height: 322px;
  border-bottom: 1px solid #dfdfdf;
  position: relative;
  .el-image {
    width: 198px;
    height: 192px;
    position: absolute;
    top: -30px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  p {
    width: 198px;
    padding: 0;
    height: 30px;
    line-height: 30px;
    font-size: 15px;
    color: #606266;
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    margin-top: 242px;
  }
}
</style>