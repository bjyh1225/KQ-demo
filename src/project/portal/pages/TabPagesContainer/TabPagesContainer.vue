<template>
  <div class="tab-pages-container">
    <el-tabs v-model="activeName" type="card" @tab-click="tabClick">
      <el-tab-pane :label="$t(item.menuName)" :name="item.name" v-for="item in tabPagesList" :key="item.name">
        <component v-bind:is="item.component" 
        :currentTabShowStatus="pageShowStatusList[item.name]"
        :mountedStatus="mountedStatus"
        ></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import componentConfig from 'portal/router/componentConf/componentConfig.js'
export default {
  name:"TabPagesContainer",
  components:{
    ...componentConfig
  },
  props:{
    customDisplayRule:{
      type:Function
    }
  },
  data(){
    return {
      activeName:"",
      tabPagesList:[],
      pageShowStatusList:{},
      mountedStatus:false
    }
  },
  watch:{
    $route(){
      this.init();
    }
  },
  methods:{
    tabClick(){
      for (var i in this.pageShowStatusList) {
        this.pageShowStatusList[i] = false;
      }
      this.pageShowStatusList[this.activeName] = true;
    },
    init(){
      this.tabPagesList=[];
      this.activeName="";
      let tabPagesConfig=this.$store.getters.tabPagesConfig;
      let currentMenuPath=this.$route.meta.currentMenuPath;
      let allTabList=tabPagesConfig[currentMenuPath]||[];
      let tabList;
      if(this.customDisplayRule){
        let r=this.customDisplayRule(allTabList);
        if(Array.isArray(r)){
          tabList=r;
        }
        else{
          tabList=[];
        } 
      }
      else{
        tabList=allTabList;
      }
      tabList.forEach(item=>{
        this.pageShowStatusList[item.name]=false;
      })
      this.tabPagesList=tabList;
      if(this.tabPagesList.length>0){
        this.activeName=this.tabPagesList[0].name;
        this.pageShowStatusList[this.tabPagesList[0].name]=true
      }
      //加载完状态
      this.mountedStatus=true;
    }
  },
  mounted(){
    this.init();
  }
}
</script>

<style lang='scss' scoped>

.tab-pages-container {
  /deep/ .el-tabs__header {
    margin-bottom: 10px;
  }
  min-height: 700px;
  /deep/.el-tabs--card > .el-tabs__header {
    @include manage-tab-border(
      $types: (
        "bottom"
      )
    );
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__nav {
    @include manage-tab-border(
      $types: (
        "top",
        "right",
        "left"
      )
    );
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__item {
    @include base-color();
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__item:not(:first-child) {
    @include manage-tab-border(
      $types: (
        "left"
      )
    );
  }
  /deep/.el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
    @include base-active-color();
    border-bottom: 1px solid #fff;
  }
}
</style>