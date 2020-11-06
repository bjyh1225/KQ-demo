<template>
  <el-row>
    <el-col class="service-sidebar">
      <div class="service-sidebar-select">
        <el-autocomplete
          v-model="inputName"
          :fetch-suggestions="querySearch"
          :placeholder="$t('service.pleaseEnterKEY')"
          @select="handleSelect"
          :trigger-on-focus="false"
        >
          <i slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-autocomplete>
      </div>
      <!-- 折叠 -->
      <el-row id="tac">
        <el-col :span="24">
          <el-menu
            :default-active="activeIndex?activeIndex:indexreplace"
            :unique-opened="true"
            @select="handleSidebar"
          >
            <div
              v-show="searchData.length>0?false:true"
              class="show-no-data"
            >{{$t('service.noCategories')}}</div>
            <el-submenu
              :index="item.id.toString()"
              v-for="item in searchData"
              :key="item.id"
              v-show="searchData.length>0?true:false"
            >
              <template slot="title">
                <span>{{item.typeName}}</span>
              </template>
              <el-menu-item
                v-for="val in item.children"
                :key="val.typeName"
                :index="val.id.toString()"
              >
                {{val.typeName}}
                <i class="el-icon-right"></i>
              </el-menu-item>
              <div
                v-if="item.children==undefined?true:false"
                id="show-sun-no-data"
              >{{$t('service.noCategories')}}</div>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-row>
    </el-col>
    <!-- 标签 -->
    <el-col class="tag" v-show="appPermisClass">
      <el-col class="tag-title">
        <i class="el-icon-portal-liebiao"></i>
        所有者
      </el-col>
      <el-col class="tag-class">
        <el-button size="small" :autofocus="autofocus" @click="allAppShow">全部</el-button>
        <el-button size="small" @click="myAppShow">我的应用</el-button>
        <el-button size="small" @click="publicAppShow">{{$t('service.Publicapps')}}</el-button>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "SideBarMenu2",
  props: {
    showSunNoData: {
      type: Boolean,
      default: false
    },
    showNoData: {
      type: Boolean,
      default: false
    },
    searchData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    activeIndex: {
      type: String,
      default: ""
    },
    indexreplace: {
      type: String,
      default: ""
    },
    autofocus: {
      type: Boolean,
      default: true
    },
    appPermisClass: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      inputName: ""
    };
  },
  methods: {
    // 搜索
    querySearch(queryString, cb) {
      this.$emit("querySearch", queryString, cb);
    },
    //搜索下拉选中
    handleSelect(item) {
      if (item.id == -9999) {
        this.inputName = "";
        return false;
      }
      this.$emit("handleSelect", item);
    },
    //分类下拉框
    handleSidebar(val, k) {
      this.$emit("handleSidebar", val, k);
    },
    // 标签
    allAppShow() {
      this.$emit("allAppShow");
    },
    myAppShow() {
      this.$emit("myAppShow");
    },
    publicAppShow() {
      this.$emit("publicAppShow");
    }
  }
};
</script>
<style lang="scss" scoped>

.service-sidebar {
  margin: 20px 0 0;
  border: 1px solid #dfdfdf;
  #tac {
    /deep/.el-menu {
      border-right: none;
      .show-no-data {
        border-top: 1px solid #dfdfdf;
        position: relative;
        height: 60px;
        margin-bottom: 300px;
        color: #909399;
        line-height: 60px;
        text-align: center;
        width: 100%;
        height: 100%;
        font-size: 14px;
      }
      .el-submenu.is-opened {
        .el-submenu__title {
          .el-submenu__icon-arrow {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
          }
        }
      }
      .el-submenu {
        @include manage-border(
          $types: (
            "top"
          )
        );
        .el-submenu__title {
          color: #242424;
          background-color: #fff;
          padding-left: 34px;
          height: 38px;
          line-height: 38px;
          span {
            padding-left: 10px;
          }
          i {
            color: #242424;
            position: absolute;
            left: 16px;
            font-size: 12px;
            display: inline-block;
            width: 10px;
            transform: rotate(-90deg);
            -webkit-transform: rotate(-90deg);
          }
          i.el-submenu__icon-arrow {
            color: #242424;
            position: absolute;
            left: 13px;
            margin-top: -4px;
            -webkit-transition: -webkit-transform 0.3s;
            transition: -webkit-transform 0.3s;
            transition: transform 0.3s;
            transition: transform 0.3s, -webkit-transform 0.3s;
            transition: transform 0.3s, -webkit-transform 0.3s;
            font-size: 14px;
          }
        }
        .el-menu.el-menu--inline {
          #show-sun-no-data {
            height: 90px;
            line-height: 90px;
            text-align: center;
            color: #909399;
            font-size: 14px;
          }
        }
        .el-menu-item {
          height: 36px;
          line-height: 36px;
          font-size: 14px;
          color: #4c4c4c;
          border-left: 3px solid transparent;
          border-top: 1px solid #efefef;
          padding: 0 0 0 45px;
          .el-icon-right {
            font-size: 0;
          }
        }
        .el-menu-item.is-active {
          @include base-active-underline($width: 3px, $types: "left");
          @include base-active-color();

          background-color: #ffffff;
          .el-icon-right {
            font-size: 14px;
            float: right;
            line-height: 36px;
          }
        }
        /deep/.el-menu--inline {
          .el-menu-item:focus {
            background-color: #ffffff;
          }
          .el-menu-item:not(.is-active):hover {
            background-color: #f8f8f8;
          }
          .el-menu-item {
            padding-left: 44px;
            font-size: #4c4c4c;

            .is-active {
              @include base-active-color();
              background-color: #ffffff;
              @include base-active-underline($width: 3px, $types: "left");
            }
          }
        }
      }
    }
  }
  .service-sidebar-select {
    padding: 5px;
    background-color: #fff;
    /deep/ .el-autocomplete {
      font-size: 14px;
      color: #818181;
      width: 100%;
      .el-input__inner {
        border-radius: 0;
      }
      .el-input__inner:focus {
        border: 1px solid #0079c1;
      }
      .el-input__suffix {
        margin: 1px 0;
        height: 38px;
      }
    }
  }
}
.tag {
  font-size: 14px;
  margin: 20px 0 0;
  border: 1px solid #dfdfdf;
  .tag-title {
    padding-left: 20px;
    border-bottom: 1px solid #dfdfdf;
    height: 36px;
    line-height: 36px;
  }
  .tag-class {
    padding: 0px 20px 40px;
    .el-button--small,
    .el-button--small.is-round {
      padding: 9px 8px;
      margin-top: 20px;
    }
  }
}
</style>

