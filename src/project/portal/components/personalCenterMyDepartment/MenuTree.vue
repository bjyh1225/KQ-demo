<template>
  <el-row id='tree'>
    <template v-for="(item,index) in searchData">
      <template v-if="item.children">
        <el-submenu :key="index" :index="item.code">
          <template :index="item.code" slot="title">
            <i class="el-icon-portal-map"></i>
            <span>{{item.text}}</span>
          </template>
          <menu-tree :searchData="item.children"></menu-tree>
        </el-submenu>
      </template>
      <template v-else>
        <el-menu-item :key="index" :index="item.code">
          <i class="el-icon-portal-map"></i>
          <span>{{item.text}}</span>
        </el-menu-item>
      </template>
    </template>
  </el-row> 
</template>

<script>
export default {
  name: "MenuTree",
  props: {
    searchData: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  }
};
</script>
<style lang="scss" scoped>

#tree{
      /deep/.el-submenu {
        .el-submenu__title {
          i,
          span {
            @include base-active-color();
          }
        }
      }
      /deep/.el-submenu.is-opened {
        .el-submenu__title {
          .el-submenu__icon-arrow {
            transform: rotate(0deg);
            -webkit-transform: rotate(0deg);
          }
        }
      }
      /deep/.el-submenu {
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
        }
        /deep/.el-menu.el-menu--inline {
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
</style>