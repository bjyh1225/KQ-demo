<template>
  <ul class="menu-list">
    <li class="title">
      <i class="el-icon-portal-message"></i>
      {{$t('myCenter.Messagelist')}}
    </li>
    <li
      :class="{'is-active':active=='publish'}"
      @click="menuChange('publish')"
    >{{$t('myCenter.Publishsystemmessage')}}</li>
    <li
      :class="{'is-active':active=='notification'}"
      @click="menuChange('notification')"
    >{{$t('myCenter.Message')}}</li>
    <!-- <li>{{$t('myCenter.Privatemessage')}}</li> -->
  </ul>
</template>

<script>
export default {
  name: "PersonalCenterMyMessageMenu",
  methods: {
    menuChange(menu) {
      this.active = menu;
      if (menu == "notification") {
        this.$emit("menuChange", menu, {
          source: "message"
        });
      } else {
        this.$emit("menuChange", menu, {});
      }
    }
  },
  computed: {
    action() {
      return this.$store.getters.messageAction;
    }
  },
  watch: {
    action() {
      if (this.action && this.action.action) {
        this.active = "notification";
        this.$emit("menuChange", "notification", this.action);
      }
    }
  },
  data() {
    return {
      active: "publish"
    };
  },
  mounted() {
    if (this.action && this.action.action) {
      this.active = "notification";
      this.$emit("menuChange", "notification", this.action);
    }
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
    padding-left: 20px;
    i {
      font-size: 16px;
      margin-right: 6px;
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