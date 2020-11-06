<template>
  <div class="help-center-display" :style="'height:'+height+'px;'" :class="{'display-no-paading':editableTabs.length==0}">
    <el-tabs v-model="editableTabsValue" type="card" closable @tab-remove="removeTab"  v-if="editableTabs.length>0">
      <el-tab-pane
        v-for="item in editableTabs"
        :key="item.name"
        :label="item.title"
        :name="item.name"
      >
        <el-scrollbar class="scroll" ref="scrollbar">
          <component :is="item.content" @scrollEvent="scrollEvent" :taskTimeStamp="taskTimeStamp" @innerGoTo="innerGoTo"></component>
        </el-scrollbar>
      </el-tab-pane>
    </el-tabs>
    <div class="home-page" v-else>
      <el-scrollbar class="scroll">
        <component :is="homePage.displayComponentsName"></component>
      </el-scrollbar>
    </div>
  </div>
</template>
<script>
import componentsList from '../config/componentsListConfig.js'
import {throttle} from '@/utils/throttle.js'
export default {
  name:"HelpCenterDisplay",
  components:{
    ...componentsList
  },
  props:{
    height:{
      type:Number,
      default:700
    },
    currentSelectedMenuInfo:{
      type:Object,
      default:()=>{
        return {}
      }
    },
    menuClickTimeStamp:{
      default:0
    },
    homePage:{
      type:Object,
      default:()=>{
        return {}
      }
    }
  },
  watch:{
    menuClickTimeStamp(){
      if(this.currentSelectedMenuInfo.isHomePage){
        this.editableTabs=[];
        this.editableTabsValue="";
        this.selectedTab={};
      }
      else{
        if(this.selectedTab[this.currentSelectedMenuInfo.name]){
          this.editableTabsValue=this.currentSelectedMenuInfo.name;
        }
        else{
          var tab={
            title:this.currentSelectedMenuInfo.label,
            name:this.currentSelectedMenuInfo.name,
            content:this.currentSelectedMenuInfo.displayComponentsName
          }
          this.editableTabs.push(tab);
          this.editableTabsValue=tab.name;
          this.selectedTab[tab.name]=true;
        }
      }
    },
    editableTabsValue(){
      if(this.editableTabsValue=='whatsNew'){
        this.$nextTick(() => {
          this.addScrollEvent();
        })
      }
      else{
        if(!this.currentSelectedMenuInfo.isHomePage){
          this.$nextTick(() => {
            this.removeScrollEvent();
          })
        }
      }
    }
  },
  data() {
    return {
      editableTabsValue: '',
      editableTabs: [],
      selectedTab:{},
      taskTimeStamp:0
    }
  },
  methods: {
    removeTab(targetName) {
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1]||tabs[index - 1];
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.editableTabsValue = activeName;
      this.editableTabs =tabs.filter(tab => tab.name !== targetName);
      this.selectedTab[targetName]=false;
    },
    scrollEvent(height){
      let scroll = this.$refs['scrollbar'][0].wrap;
      this.$nextTick(() => {
        scroll.scrollTo({left: 0,
        top: height,
        behavior: 'smooth'})
      })
    },
    addScrollEvent(){
      let scroll = this.$refs['scrollbar'][0].wrap;
      scroll.addEventListener('scroll',throttle(this.handleScroll,200,this,true));
    },
    removeScrollEvent(){
      let scroll = this.$refs['scrollbar'][0].wrap;
      scroll.removeEventListener('scroll',throttle);
    },
    handleScroll(){
      this.taskTimeStamp=new Date();
    },
    innerGoTo(menu){
      this.$emit("innerGoTo",menu);
    }
  }
}
</script>
<style lang="scss" scoped>
  
  .help-center-display{
    box-sizing: border-box;
    padding:10px 10px 0 10px;
    .el-tabs{
      width:100%;
      height:100%;
      /deep/ .el-tabs__content{
        height: calc(100% - 60px);
        .el-tab-pane{
          height:100%;
        }
      }
      /deep/ .el-tabs__item.is-active {
        @include base-active-color();
      }
      /deep/ .el-tabs__item:hover{
        @include base-active-color();
      }
      .scroll {
        height: 100%;
      }
      /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
  }
  .display-no-paading{
    padding:0;
  }
  .home-page{
    height:100%;
    .scroll {
      height: 100%;
    }
    /deep/ .el-scrollbar .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
</style>
