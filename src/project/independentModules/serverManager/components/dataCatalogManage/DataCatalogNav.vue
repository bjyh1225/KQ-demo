<template>
  <div class="data-catalog-nav">
    <el-row class="title">
      <span class="left">
        <i class="kqserver-liebiao catologue-icon"></i>
        <span>目录</span>
      </span>
      <span class="right">
        <i class="el-icon-setting" v-tips="'目录管理'" @click="openCatalogManageDialog"></i>
      </span>
    </el-row>
    <el-row class="nav">
      <el-menu
        :default-active="defaultActive"
        :unique-opened="false"
        @select="menuClick"
        @open="openMenu"
        @close="closeMenu"
        class="catalog-nav-menu"
        ref="catalogNavMenu"
        >
        <template v-for="item in catalogTree">
          <el-submenu
            :index="item.id"
            v-if="item.children&&item.children.length>0"
            :key="item.id"
            :class="{'is-active-nav-sub':defaultActive==item.id}"
          >
            <template slot="title">
              <span class="left">
                <i class="el-icon-arrow-right" @click.stop="arrowOpen(item.id)"></i>
                <span class="menu-item-name">{{$t(item.typeName)}}</span>
              </span>
              <span class="right">
                <i class="kqserver-tianjiashujubiao" v-tips="'发布数据'"></i>
              </span>
            </template>
            <el-menu-item
              :index="child.id"
              v-for="child in item.children"
              :key="child.id"
              :class="{'is-active-nav':defaultActive==child.id}"
            >
              <span class="left">
                <span class="menu-item-name">{{$t(child.typeName)}}</span>
              </span>
              <span class="right">
                <i class="kqserver-tianjiashujubiao" v-tips="'发布数据'"></i>
              </span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item :index="item.id" :key="item.id" :class="{'is-active-nav':defaultActive==item.id}" v-else>
            <span class="left">
              <span class="menu-item-name">{{$t(item.typeName)}}</span>
            </span>
            <span class="right">
              <i class="kqserver-tianjiashujubiao" v-tips="'发布数据'"></i>
            </span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"DataCatalogNav",
  props:{
    catalogTree:{
      type:Array,
      default:()=>{
        return [];
      }
    }
  },
  data(){
    return {
      defaultActive:"",
      openStatus:false
    }
  },
  methods:{
    menuClick(index){
      this.defaultActive=index;
    },
    openMenu(index){
      this.defaultActive=index;
      this.$refs.catalogNavMenu.close(index);
    },
    closeMenu(index){
      this.defaultActive=index;
      this.$refs.catalogNavMenu.open(index);
    },
    arrowOpen(index){
      if(this.openStatus){
        this.$refs.catalogNavMenu.close(index);
      }
      else{
        this.$refs.catalogNavMenu.open(index);
      }
      this.openStatus=!this.openStatus;
    },
    openCatalogManageDialog(){
      this.$emit('openCatalogManageDialog');
    }
  }
}
</script>

<style lang="scss" scoped>
  .data-catalog-nav{
    .title{
      font-size:14px;
      height:38px;
      line-height:38px;
      color:#242424;
      border:1px solid #ebebeb;
      display: flex;
      padding:0 20px;
      .left{
        flex:1;
        i{
          margin-right:6px;
          @include base-active-color();
        }
      }
      .right{
        @include base-active-color();
        cursor: pointer;
      }
    }
    .nav{
      .catalog-nav-menu{
        border-right:none;
        /deep/ .el-menu-item{
          height:38px;
          line-height:38px;
          border:1px solid #ebebeb;
          border-top:none;
          &:hover{
            @include resources-hover();
          }
          display: flex;
          .left{
            flex:1;
          }
          .right{
            i{
              font-size:14px;
              @include base-active-color();
              margin-right:0px;
              width:auto;
            }
          }
        }
        /deep/ .el-submenu{
          border:1px solid #ebebeb;
          border-top:none;
        }
        /deep/ .el-submenu__title{
          height:38px;
          line-height:38px;
          padding:0 20px;
          display:flex;
          .left{
            flex:1;
            i{
              transition:all 0.1s;
              width:auto;
              margin-right:6px;
            }
          }
          .right{
            cursor: pointer;
            i{
              width:auto;
              margin-right:0px;
              @include base-active-color();
            }
          }
          &:hover{
            @include resources-hover();
          }
          position: relative;
          .el-submenu__icon-arrow{
            display: none;
          }
          i{
            font-size:14px;
            color:#242424;
          }
        }
        /deep/ .is-opened{
          .el-submenu__title{
            .left{
              i{
                transform: rotate(90deg);
              }
            }
          }
        }
        /deep/ .el-menu--inline{
          border:1px solid #ebebeb;
          border-top:none;
          border-bottom:none;
          .el-menu-item{
            border:none;
            padding-right:20px;
          }
        }
        .is-active-nav-sub{
          /deep/ .el-submenu__title{
            @include resources-hover();
            .menu-item-name{
              @include base-active-color();
            }
            .left{
              i{
                @include base-active-color();
              }
            }
            position: relative;
            &::after{
              content:'';
              width:3px;
              height:38px;
              @include base-bg-color();
              position:absolute;
              top:0;
              left:0;
            }
          }
        }
        .is-active-nav{
          @include resources-hover();
          .menu-item-name{
            @include base-active-color();
          }
          position: relative;
          &::after{
            content:'';
            width:3px;
            height:38px;
            @include base-bg-color();
            position:absolute;
            top:0;
            left:0;
          }
        }
      }
    }
  }
</style>