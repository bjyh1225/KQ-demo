<template>
  <el-row class="property-bar" :style="style" :class="{'opened':openStatus}">
    <div v-show="!openStatus" class="animated" :style="'animation-duration:500ms'"
    :class="{'fadeInRight':animateStatus}">
      <ul>
        <li @click="openToolPannel('selectedComponent')">
          <i class="el-icon-portal-yixuanziyuan"></i>
        </li>
      </ul>
    </div>
    <div v-show="openStatus"     
    class="animated"
    :style="'animation-duration:500ms'"
    :class="{'fadeInRight':animateStatus}">
      <selected-component :dataList="dataList" @closePannel="openToolPannel('selectedComponent')" v-show="type=='selectedComponent'" :heightInfo="heightInfo"></selected-component>
    </div>
  </el-row>
</template>

<script>
  import SelectedComponent from './SelectedComponent'
  export default {
    name: "VisualizationBar",
    components:{
      SelectedComponent
    },
    data() {
      return {
        style: "",
        openStatus: false,
        animateStatus:false,//动画效果
        type:"selectedComponent"
      };
    },
    props: {
      dataList: {
        type: Array,
        default: () => {
          return []
        }
      },
      heightInfo:{
        type:Number,
        default:300
      }
    },
    methods: {
      openToolPannel(type) {
        this.animateStatus=true;
        this.openStatus = !this.openStatus;
        if (this.openStatus) {
          this.style = "width:290px";
        } else {
          this.style = "width:66px";
        }
        this.type=type;
        // this.$emit('openToolPannel', type);
      }
    }
  };
</script>

<style lang='scss' scoped>
  
  .property-bar {
    width: 66px;
    min-height: 300px;
    background: #fff;
    transition: width .5s;
    border-left: 1px solid #ccd0d3; // box-shadow:0px 12px 10px 2px rgba(0,0,0,.2);
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        height: 58px;
        line-height: 58px;
        border-bottom: 1px solid #ccd0d3;
        text-align: center;
        color: #4c4c4c;
        cursor: pointer;
        i {
          font-size: 26px;
          vertical-align: middle;
          // margin-top: 14px;
          // margin-bottom: 4px;
          margin:0;
        }
        &:hover {
          background: #f6f6f6;
          @include base-active-color();
        }
      }
    }
  }
  .opened{
    box-shadow:0px 12px 10px 2px rgba(0,0,0,.2);
  }
</style>