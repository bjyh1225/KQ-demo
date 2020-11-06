<template>
  <ul class="menu-list">
    <li class="title">
      <i :class="iconfontClass"></i>
      {{title}}
    </li>
    <li v-for="(items,index) in table_data" :key="index" @click="menuChange(items.C_CODE_KEY)"
      :class="{'is-active':active == items.C_CODE_KEY}">
      <i :class="items.C_IMG"></i>
      {{items.C_NAME}}
    </li>
  </ul>
</template>

<script>
  export default {
    name: "PersonalCenterMyMessageMenu",
    methods: {
      menuChange(menu) {
        this.active = menu
        this.$emit("menuChange", menu);
      },
      getResoureCategoryList() {
        this.$api.manageResourceSortApi
          .getResoureCategoryListNotPage({
            personnelId: JSON.parse(sessionStorage.getItem('userInfo')).id
          },
            { loadingText: "正在查询" })
          .then(res => {
            this.table_data = res.data.data;
            this.active = res.data.data[0].C_CODE_KEY
          })
          .catch((error) => {
            return error
          });
      },
    },
    props: {
      title: {
        type: String,
        default() {
          return this.$t("management.MyReviews");
        }
      },
      iconfontClass: {
        type: String,
        default: "el-icon-portal-shenhe"
      }
    },
    created() {
      this.getResoureCategoryList()
    },
    data() {
      return {
        active: "mapService",
        table_data: []
      };
    }
  };
</script>

<style lang='scss' scoped>
  

  .menu-list {
    list-style: none;
    border: 1px solid #dfdfdf;
    padding: 0;
    height: 700px;
    margin: 0;
    margin-bottom: 30px;
    color: #606266;

    li {
      border-bottom: 1px solid #dfdfdf;
      height: 40px;
      line-height: 40px;
      padding-left: 42px;
    }

    li:not(.title) {
      cursor: pointer;
      font-size: 14px;

      &:hover {
        @include base-active-color();
      }
    }

    li:nth-child(1) {
      height: 48px;
      line-height: 48px;
      background: #f8f8f8;
      padding-left: 24px;

      i {
        font-size: 16px;
        margin-right: 0px;
      }
    }

    .is-active {
      @include base-active-color();
      position: relative;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        width: 3px;
        @include base-bg-color();
      }
    }
  }
</style>