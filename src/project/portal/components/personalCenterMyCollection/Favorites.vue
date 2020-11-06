<template>
  <div class="favorites-container">
    <el-collapse
      v-model="activeName"
      accordion
      @change="changeActive"
      v-if="favoritesList.length>0"
    >
      <el-collapse-item v-for="item in favoritesList" :name="item.codeKey" :key="item.id">
        <template slot="title">
          <i :class="item.icon"></i>&nbsp;
          <span>{{item.name}}</span>
        </template>
        <div class="scroll-container">
          <el-scrollbar class="scroll">
            <ul class="folder-container" v-if="item.children&&item.children.length>0">
              <li
                v-for="citem in item.children"
                :key="citem.id"
                :class="{'is_active':currentId==citem.id}"
                @click="favoritesClick(citem)"
              >
                <i class="el-icon-portal-ic_folder"></i>&nbsp;
                <span>{{citem.name}}</span>
              </li>
            </ul>
            <div class="no-data" v-else>{{$t('myCenter.NoFavorite')}}</div>
          </el-scrollbar>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="all-no-data" v-else>
      <span>{{$t('myCenter.NoFavorite')}}</span>
    </div>
    <div class="file-folder">
      <el-button type="primary base-btn" @click="addFavorites">{{$t('myCenter.AddFavorite')}}</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Favorites",
  components: {},
  props: {
    favoritesList: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  watch: {
    favoritesList() {
      if (!this.favoritesOpen) {
        if (this.favoritesList.length > 0) {
          this.activeName = this.favoritesList[0].codeKey;
          if (
            this.favoritesList[0].children &&
            this.favoritesList[0].children.length > 0
          ) {
            this.currentId = this.favoritesList[0].children[0].id;
            this.$emit("favoritesClick", this.favoritesList[0].children[0]);
            var items = document.getElementsByClassName("scroll-container");
            if (items.length === 0) {
              setTimeout(() => {
                this.initScroll(this.favoritesList[0].children);
              });
            } else {
              this.initScroll(this.favoritesList[0].children);
            }
          }
        }
      } else {
        this.favoritesOpen = false;
        this.initScroll(
          this.favoritesList.filter(item => {
            return item.codeKey == this.activeName;
          })[0].children
        );
      }
    }
  },
  methods: {
    changeActive(name) {
      if (name) {
        var data = this.favoritesList.filter(item => item.codeKey == name);
        if (data[0].children) {
          this.initScroll(data[0].children);
        } else {
          this.initScroll([]);
        }
      }
    },
    initScroll(data) {
      if (data.length * 36 + 20 > 200) {
        // eslint-disable-next-line
        var items = document.getElementsByClassName("scroll-container");
        // eslint-disable-next-line
        for (var i = 0; i < items.length; i++) {
          items[i].style.height = "200px";
        }
      } else {
        // eslint-disable-next-line
        var items = document.getElementsByClassName("scroll-container");
        // eslint-disable-next-line
        for (var i = 0; i < items.length; i++) {
          if (data.length == 0) {
            items[i].style.height = "80px";
          } else {
            items[i].style.height = data.length * 36 + 20 + "px";
          }
        }
      }
    },
    addFavorites() {
      this.$emit("addFavorites");
    },
    favoritesClick(item) {
      this.currentId = item.id;
      this.$emit("favoritesClick", item);
    },
    favoritesOpenFun(val) {
      this.favoritesOpen = true;
      this.activeName = val;
    }
  },
  data() {
    return {
      activeName: "",
      serviceData: [],
      currentId: "",
      favoritesOpen: false,
      iconMap: {
        favorites_mapService: "el-icon-portal-map",
        favorites_dataService: "el-icon-portal-shujufuwuqi",
        favorites_functionService: "el-icon-portal-gongnengshezhi",
        favorites_appbuilder: "el-icon-portal-yonghufenzuyingyong",
        favorites_file: "el-icon-portal-wenjian1",
        favorites_data:'el-icon-portal-jichudilishujuku',
        favorites_scene: "el-icon-portal-diqiu1",
        favorites_mapbuilder: "el-icon-portal-map1",
        favorites_scenebuilder: "el-icon-portal-changjingguanli",
        favorites_bigbuilder: "el-icon-portal-daping"
      }
    };
  }
};
</script>

<style lang='scss' scoped>

.favorites-container {
  height: 700px;
  border-bottom: 1px solid #dfdfdf;
  overflow: hidden;
  .scroll-container {
    // height:400px;
    .scroll {
      height: 100%;
    }
  }
  /deep/ .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  /deep/ .el-collapse {
    border-top: 1px solid #dfdfdf;
    .el-collapse-item__header {
      position: relative;
      height: 44px;
      line-height: 44px;
      padding-left: 26px;
      border-left: 1px solid #dfdfdf;
      border-right: 1px solid #dfdfdf;
      border-bottom: 1px solid #dfdfdf;
      font-size: 14px;
      &::before {
        content: "";
        width: 3px;
        background: #dfdfdf;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .el-collapse-item__header.is-active {
      @include base-active-color();
      &::before {
        content: "";
        width: 3px;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        @include base-bg-color();
      }
    }
    .el-collapse-item__wrap {
      border-bottom: 1px solid #dfdfdf;
      border-left: 1px solid #dfdfdf;
      border-right: 1px solid #dfdfdf;
      .el-collapse-item__content {
        padding: 0;
      }
    }
  }
  .folder-container {
    margin: 0px;
    padding: 10px 0 10px 40px;
    list-style: none;
    li {
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        @include base-active-color();
      }
    }
    .is_active {
      @include base-active-color();
    }
  }
  .no-data {
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #606266;
  }
  .file-folder {
    height: 700px;
    border-bottom: 1px solid #dfdfdf;
    border-left: 1px solid #dfdfdf;
    border-right: 1px solid #dfdfdf;
    text-align: center;
    .el-button {
      margin: 36px 0;
    }
  }
  .all-no-data {
    height: 100px;
    line-height: 100px;
    text-align: center;
    color: #606266;
    border: 1px solid #dfdfdf;
  }
}
</style>