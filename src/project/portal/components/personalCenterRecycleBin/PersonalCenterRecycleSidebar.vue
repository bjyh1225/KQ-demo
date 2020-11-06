<template>
  <div class="recycle-sidebar">
    <div class="list-top">
      <i class="el-icon-portal-jiajiabaojie-tubiao-"></i>
      <span>{{$t('myCenter.RecycleBin')}}</span>
    </div>
    <ul class="list-tail">
      <li v-for="(item,k) in recyclebinCategory" :key="k"
        @click="handleCurrentChange({codeKey:item.C_CODE_KEY,index:k})" :class="{ nowpage: k==selectItem }">
        <i :class="item.C_IMG"></i>&nbsp;
        <span>{{item.C_NAME}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    name: "PersonalCenterRecycleSidebar",
    data() {
      return {
        recyclebinCategory: [],
        selectItem: 0, //默认选中
        defaultCodeKey: "",

      };
    },
    methods: {
      //获取分类数据
      getRecyclebinCategoryList() {
        this.$api.manageResourceSortApi
          .getResoureCategoryListNotPage({
            personnelId: JSON.parse(sessionStorage.getItem('userInfo')).id
          }, {
            loadingText: this.$t("service.searching")
          })
          .then(res => {
            if (res.data.status == 200) {
              this.recyclebinCategory = res.data.data;
              this.defaultCodeKey = res.data.data[0].C_CODE_KEY;
              this.defaultCodeKeyFun();
            }
          })
          .catch(() => { });
      },
      //单行选中后触发事件
      handleCurrentChange(val) {
        this.selectItem = val.index;

        this.$emit("menuChange", val.codeKey);
      },
      defaultCodeKeyFun() {
        this.$emit("defaultCodeKeyFun", this.defaultCodeKey);
      }
    },
    mounted() {
      this.getRecyclebinCategoryList();
    }
  };
</script>
<style lang="scss" scoped>
  

  .recycle-sidebar {
    height: 700px;
    border: 1px solid #dfdfdf;
    color: #606266;

    .list-top {
      padding-left: 18px;
      height: 40px;
      line-height: 40px;
      background-color: #f9f9f9;

      i {
        margin-right: 6px;
        font-size: 14px;
      }
    }

    .list-tail {
      padding: 0;
      margin: 0;
      border-bottom: 1px solid #dfdfdf;
      font-size: 14px;

      li {
        height: 40px;
        line-height: 40px;
        padding-left: 40px;
        list-style: none;
        border-top: 1px solid #dfdfdf;
      }

      li:hover {
        cursor: pointer;
        @include base-active-color();
      }

      .nowpage {
        @include base-active-color();
        @include base-active-underline($width: 3px, $types: "right");
      }
    }
  }
</style>