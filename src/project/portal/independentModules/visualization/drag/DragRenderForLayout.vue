<template>
  <div class="drag-render">
    <drag-button-group class="drag-button-group" @removeItem='remove' @setProperty="setProperty"></drag-button-group>
    <component v-bind:is="componentName" :parentList="parentList" :current="current" :currentix="currentix" :styleConf="styleConf"
      :propsConf="propsConf" :pageStatus="pageStatus"></component>
  </div>
</template>

<script>
  import DragButtonGroup from 'portal/independentModules/visualization/common/DragButtonGroup'
  import excludeLayout from 'portal/independentModules/visualization/config/dragAllExcludeLayout.js'
  export default {
    name: "DragRender",
    components: {
      DragButtonGroup,
      ...excludeLayout
    },
    props: {
      //组件名
      componentName: {
        type: String,
        default: ""
      },
      //父级结构
      parentList: {
        type: Array,
        default: () => {
          return []
        }
      },
      //当前结构
      current: {
        type: Object,
        default: () => {
          return {}
        }
      },
      //当前的索引
      currentix: {
        type: Number,
        default: 0
      },
      //样式配置
      styleConf: {
        type: Object,
        default: () => {
          return {}
        }
      },
      //属性配置
      propsConf: {
        type: Object,
        default: () => {
          return {}
        }
      },
      //页面状态
      pageStatus: {
        type: String,
        default: 'drag'
      }
    },
    methods: {
      remove() { //删除组件
        this.parentList.splice(this.currentix, 1);
      },
      setProperty(){//属性设置
        var data={
          commonTimeStamp:new Date().getTime(),
          commonEventType:"setProperty",
          commonSource:"visualization",
          commonParams:this.current
        }
        this.$store.dispatch('common/setEventInfo',data);
      }
    }
  };
</script>

<style lang='scss' scoped>
  .drag-render {
    margin-bottom: 10px;
    padding: 10px 2%;
  }

  .drag-button-group {
    margin-bottom: 5px;
  }
</style>