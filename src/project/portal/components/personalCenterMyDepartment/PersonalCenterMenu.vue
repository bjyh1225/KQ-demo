<template>
  <el-row>
    <el-col class="service-sidebar">
      <div class="service-sidebar-select">
        <i class="el-icon-portal-liebiao"></i>
        <span>组织机构</span>
      </div>
      <el-row id="tac">
        <el-col :span="24">
          <el-menu
            :default-active="indexreplace"
            :active="indexreplace"
            :unique-opened="true"
            @select="handleSidebar"
            @open="openSidebar"
            @close="closeSidebar"
          >
            <div
              v-show="searchData.length>0?false:true"
              class="show-no-data"
            >{{$t('service.noCategories')}}</div>
            <menu-tree :searchData="searchData"></menu-tree>
          </el-menu>
        </el-col>
      </el-row>
    </el-col>
    <!-- 标签 -->
    <el-col class="tag">
      <el-col class="tag-title">
        <i class="el-icon-portal-liebiao"></i>
        {{$t('management.TypeOfOperation')}}
      </el-col>
      <el-col class="tag-class">
        <el-button
          size="small"
          :autofocus="autofocus"
          @click="allAppShow({laby:'All'})"
          :class="appOwner=='All'?'btn-style':''"
        >{{$t('myCenter.ResourceManagement')}}</el-button>
        <el-button
          size="small"
          @click="allAppShow({laby:'Examine'})"
          :class="appOwner=='Examine'?'btn-style':''"
        >审核管理</el-button>
      </el-col>
    </el-col>
  </el-row>
</template>
<script>
import MenuTree from "./MenuTree.vue";
export default {
  name: "PersonalCenterMenu",
  components: {
    MenuTree,
  },
  props: {
    autofocus: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      appOwner: "All",
      indexreplace: "",
      searchData: [], //部门数数据
    };
  },
  methods: {
    // 初始获取组织机构
    getOrgListByPersonnelId() {
      this.$api.personalCenterMyDepartmentApi
        .getOrgListByPersonnelId(
          { rtTree: true, personnelId: this.$store.getters.userInfo.id },
          {
            loadingText: this.$t("service.searching"),
          }
        )
        .then((res) => {
          this.searchData = res.data.data;
          this.indexreplace = this.searchData[0].code;
          this.$emit("getIndexreplace", this.indexreplace);
        })
        .catch(() => {});
    },
    allAppShow(val) {
      this.appOwner = val.laby;
      this.$emit("allAppShow", val.laby);
    },
    //分类下拉框
    handleSidebar(val, k) {
      this.indexreplace = val;
      this.$emit("handleSidebar", val);
    },
    openSidebar(val, k) {
      this.indexreplace = val;
      this.$emit("handleSidebar", val);
    },
    closeSidebar(val, k) {
      this.indexreplace = val;
      this.$emit("handleSidebar", val);
    },
  },
  mounted() {
    this.getOrgListByPersonnelId();
  },
};
</script>
<style lang="scss" scoped>
.service-sidebar {
  border: 1px solid #ebebeb;
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

