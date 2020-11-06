<template>
  <el-row>
    <el-col class="service-sidebar">
      <div class="service-sidebar-select">
        <i class="el-icon-portal-liebiao"></i>
        <span>{{categoryTitle}}</span>
      </div>
      <!-- 折叠 -->
      <el-row id="tac">
        <el-col :span="24">
          <el-menu
            :default-active="activeIndex?activeIndex:indexreplace"
            :unique-opened="searchData.length>0?true:false"
            @select="handleSidebar"
            ref="elMenu"
          >
            <div
              v-show="searchData.length>0?false:true"
              class="show-no-data"
            >{{$t('service.noCategories')}}</div>
            <el-submenu
              :index="item.id.toString()"
              v-for="item in searchData"
              :key="item.id"
              v-show="searchData.length>0&&item.children!=undefined?true:false"
              :class="menuOpenIndex==item.id?'menu-open-sub':'menu-stop-sub'"
            >
              <template slot="title">
                <div
                  class="stop-box"
                  @click.stop="menuOpenFun($event,item,item.id)"
                  :class="menuOpenIndex==item.id?'menu-open':'menu-stop'"
                >
                  <i :class="portalIcon" @click.stop></i>
                  <span>{{item.typeName}}</span>
                </div>
              </template>
              <el-menu-item
                v-for="val in item.children"
                :key="val.typeName"
                :index="val.id.toString()"
              >
                {{val.typeName}}
                <i class="el-icon-right"></i>
              </el-menu-item>
              <!-- <div
                v-if="item.children==undefined?true:false"
                id="show-sun-no-data"
              >{{$t('service.noCategories')}}</div>-->
            </el-submenu>
            <el-menu-item
              :index="menuItem.id.toString()"
              v-for="menuItem in searchData"
              :key="`${menuItem.id.toString()}-${menuItem.typeName}`"
              v-show="menuItem.children==undefined?true:false"
              class="nochildren"
            >
              <i :class="portalIcon"></i>
              <span slot="title">{{menuItem.typeName}}</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-col>
    <!-- 标签 -->
    <el-col class="tag" v-show="appPermisClass&&$store.getters.isLogin">
      <el-col class="tag-title">
        <i class="el-icon-portal-liebiao"></i>
        {{$t('portalStatistics.Owner')}}
      </el-col>
      <el-col class="tag-class">
        <el-button
          size="small"
          :autofocus="autofocus"
          @click="allAppShow({laby:'All'})"
          :class="appOwner=='All'?'btn-style':''"
        >{{$t('service.all')}}</el-button>
        <el-button
          size="small"
          @click="allAppShow({laby:'Private'})"
          :class="appOwner=='Private'?'btn-style':''"
        >{{myCenterField}}</el-button>
        <el-button
          size="small"
          @click="allAppShow({laby:'Public'})"
          :class="appOwner=='Public'?'btn-style':''"
        >{{publicField}}</el-button>
      </el-col>
    </el-col>
    <!--关键字  -->
    <el-col>
      <keyword-tag :checkList="checkList" @checkValueChanger="checkValueChanger"></keyword-tag>
    </el-col>
  </el-row>
</template>
<script>
import KeywordTag from "./KeywordTag.vue";
export default {
  name: "SideBarMenu",
  components: {
    KeywordTag
  },
  props: {
    searchData: {
      type: Array,
      default: () => {
        return [];
      }
    },
    myKeyWordData: {
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
    },
    portalIcon: {
      type: String,
      default: "el-icon-portal-map"
    },
    categoryTitle: {
      type: String,
      default() {
        return this.$t("management.categoriesOfMapServices");
      }
    },
    publicField: {
      type: String,
      default() {
        return this.$t("service.Publicapps");
      }
    },
    myCenterField: {
      type: String,
      default() {
        return this.$t("myCenter.MyApps");
      }
    }
  },
  computed: {
    checkList() {
      return this.myKeyWordData;
    }
  },
  watch:{
    searchData(){
      if(this.searchData){
        this.menuOpenIndex= this.searchData[0].id;
      }
    }
  },
  data() {
    return {
      appOwner: "All",
      menuOpenIndex: ''
    };
  },
  methods: {
    menuOpenFun(e, val, k) {
      this.menuOpenIndex = k;
      var arr = [];
      arr.push(k.toString());
      this.$refs.elMenu.activeIndex = null;
      this.$emit("handleSidebar", val, arr);
    },
    //分类下拉框
    handleSidebar(val, k) {
      this.menuOpenIndex = "";
      this.$emit("handleSidebar", val, k);
    },
    // 标签
    allAppShow(val) {
      this.appOwner = val.laby;
      this.$emit("allAppShow", val.laby);
    },
    //关键字变化
    checkValueChanger(val) {
      this.$emit("serviceCheckValueChanger", val);
    }
  }
};
</script>
<style lang="scss" scoped>
.service-sidebar {
  margin: 20px 0 0;
  border: 1px solid #ebebeb;
  #tac {
    /deep/.el-menu {
      border-right: none;
      .nochildren.el-menu-item {
        padding-left: 34px;
        height: 38px;
        line-height: 38px;
        @include manage-border(
          $types: (
            "top"
          )
        );
        span {
          padding-left: 6px;
        }
        i {
          color: #242424;
          font-size: 12px;
          display: inline-block;
          width: 10px;
        }
      }
      .nochildren.el-menu-item.is-active {
         &:after{
          content: "";
          display: block;
          position: absolute;
          left: 0px;
          top: 0px;
          width: 3px;
          height: 100%;
          @include base-bg-color();
        }
        @include resources-hover();
        i,
        span {
          @include base-active-color();
        }
      }
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
      .el-submenu {
        @include manage-border(
          $types: (
            "top"
          )
        );
        .el-submenu__title {
          padding: 0px !important;
          color: #242424;
          background-color: #fff;
          height: 38px;
          line-height: 38px;
          span {
            padding-left: 6px;
          }
          i {
            color: #242424;
            font-size: 12px;
            display: inline-block;
            width: 10px;
          }
          .el-icon-arrow-down {
            transform: rotate(-90deg);
            -webkit-transform: rotate(-90deg);
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
          padding: 0 0 0 45px;
          .el-icon-right {
            font-size: 0;
            margin-right: 11px;
          }
        }
        .el-menu-item.is-active {
          @include base-active-underline($width: 3px, $types: "left");
          @include base-active-color();
          @include resources-hover();
          .el-icon-right {
            font-size: 14px;
            float: right;
            line-height: 36px;
          }
        }
        /deep/.el-menu--inline {
          .el-menu-item:focus {
            outline: 0;
            @include resources-hover();
          }
          .el-menu-item:not(.is-active):hover {
            outline: 0;
            @include resources-hover();
            .el-icon-right {
              font-size: 14px;
              float: right;
              line-height: 36px;
            }
          }
          .el-menu-item {
            padding-left: 44px;
            color: #4c4c4c;
            .is-active {
              @include base-active-underline($width: 3px, $types: "left");
            }
          }
        }
      }
      .menu-open {
        padding-left: 20px;
        @include base-active-color();
        @include resources-hover();
        &:after{
          content: "";
          display: block;
          position: absolute;
          left: 0px;
          top: 0px;
          width: 3px;
          height: 100%;
          @include base-bg-color();
        }
        i{
            @include base-active-color();
        }
      }
      .menu-stop {
        padding-left: 20px;
      }
      .el-submenu.is-opened{
        .el-submenu__title {
          .el-submenu__icon-arrow {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
          }
        }
      }
      .el-submenu.is-opened.menu-open-sub {
        .el-submenu__title {
          i,
          span {
            @include base-active-color();
          }
        }
      }
      .el-submenu.is-active.is-opened {
        .el-submenu__title {
          border-left: 0px;
          background-color: #fff;
          i,
          span {
            color: #242424;
          }
        }
      }
    }
  }
  .service-sidebar-select {
    padding-left: 18px;
    background-color: #fff;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    i {
      @include base-active-color();
    }
    span {
      padding-left: 8px;
    }
  }
}
.tag {
  font-size: 14px;
  margin: 50px 0 0;
  border: 1px solid #ebebeb;
  background: #fff;
  .tag-title {
    padding-left: 20px;
    border-bottom: 1px solid #ebebeb;
    height: 36px;
    line-height: 36px;
    i {
      @include base-active-color();
    }
  }
  .tag-class {
    padding: 0px 20px 40px;
    .el-button--small,
    .el-button--small.is-round {
      padding: 9px 8px;
      margin-top: 20px;
    }
    .el-button:not(.btn-style):hover {
      @include base-active-color();
      @include base-active-underline();
    }
    .btn-style {
      @include base-radio-button();
    }
  }
}
</style>

