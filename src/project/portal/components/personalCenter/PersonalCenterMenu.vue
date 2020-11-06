<template>
  <el-menu
    :default-active="menuActive"
    class="el-menu-demo personal-center-menu"
    mode="horizontal"
    @select="selectMenu"
  >
    <el-menu-item v-for="(item,ix) in menuList" :key="ix" :index="item.path" :externalLinksRouter="item.externalLinksRouter">{{$t(item.menuName)}}</el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "PersonalCenterMenu",
  data(){
    return {
      menuList:[],
      activeName:""
    }
  },
  computed:{
    menuActive(){
      return this.$route.meta.childMenuActive+this.activeName;
    }
  },
  methods:{
    selectMenu(index, indexPath,el) {
      if(el.$attrs.externalLinksRouter){
        this.activeName=index;
        window.open(index,"_blank");
        this.$nextTick(()=>{
          this.activeName="";
        })
      }
      else{
        this.activeName="";
        this.$router.push({path:index});
        this.$store.dispatch("menu/setActiveMenuStatus", true);
      }
    }
  },
  mounted(){
    this.menuList=this.$store.getters.menus[this.$route.meta.indexMenuActive].children;
  }
};
</script>

<style lang='scss' scoped>

.personal-center-menu {
  width: 100%;
  height: 48px;
  background:#fff;
  border-bottom:1px solid #dfdfdf;
  padding-left:2%;
  .el-menu-item {
    height: 48px;
    line-height: 48px;
    font-size: 15px;
    color:#4c4c4c;
    border: none;
    &:hover {
      background-color: transparent;
      @include menu-active-color();
    }
    &:focus {
      background-color: transparent;
      @include menu-active-color();
    }
  }
  .is-active {
    border: none;
    position: relative;
    &::after {
      content: "";
      width: 100%;
      height: 3px;
      @include menu-active-bg();
      position: absolute;
      bottom: -2px;
      left: 0px;
    }
    @include menu-active-color();
  }
}
</style>