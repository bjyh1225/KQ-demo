<template>
  <el-row class="layout" @click.native="chooseThis" :class="{'is-active':chooseStatus,'is-top':isTop}">
    <drag-button-group class="drag-button-group" @removeItem='remove' @setProperty="setProperty"></drag-button-group>
    <el-col v-for="el in current.componentsList" :key="el.id" :span="el.colSpan">
      <draggable class="childDragArea" tag="div" :list="el.componentsList" :group="{name:'componentsDrag'}" :animation="150" @change="dragChange"
        :sort="true" :ghostClass="'drag-ghost'">
        <div v-for="(cel,ix) in el.componentsList" :key="cel.id">
          <base-layout v-if="cel.componentName=='BaseLayout'" :current="cel" :parentList="el.componentsList" :currentix="ix"  :styleConf="cel.styleConf"
          :propsConf="cel.propsConf"></base-layout>
          <drag-render-for-layout :componentName="cel.componentName" :current="cel" :parentList="el.componentsList" :currentix="ix"  :styleConf="cel.styleConf"
          :propsConf="cel.propsConf"
            v-else></drag-render-for-layout>
        </div>
      </draggable>
    </el-col>
  </el-row>
</template>

<script>
  import DragButtonGroup from 'portal/independentModules/visualization/common/DragButtonGroup'
  import guid from 'portal/independentModules/visualization/util/guid.js'
  import DragRenderForLayout from 'portal/independentModules/visualization/drag/DragRenderForLayout'
  export default {
    name: "BaseLayout",
    components: {
      DragButtonGroup,
      DragRenderForLayout
    },
    data() {
      return {
        chooseStatus: false
      }
    },
    props: {
      current: {
        type: Object,
        default: () => {
          return {}
        }
      },
      parentList: {
        type: Array,
        default: () => {
          return []
        }
      },
      currentix: {
        type: Number,
        default: 0
      },
      isTop: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      dragChange(data) {
        //特殊处理布局
        if (data.added) {
          if (data.added.element.componentName == 'BaseLayout' && data.added.element.componentsList.length == 0) {
            var layoutData = JSON.parse(JSON.stringify(data.added.element));
            data.added.element.colConf.forEach(item => {
              var tempData = JSON.parse(JSON.stringify(layoutData));
              tempData.id = guid();
              tempData.colSpan = item;
              tempData.componentName = 'layoutcol';
              tempData.text="列";
              data.added.element.componentsList.push(tempData);
            })
          }
        }
      },
      remove() {
        this.parentList.splice(this.currentix, 1);
      },
      chooseThis() {
        this.chooseStatus = true;
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
  .layout {
    margin-bottom: 10px;
    padding: 10px 2%;
  }

  .childDragArea {
    min-height: 100px;
    outline: 1px dashed #000;
    background: #fff;
  }

  .drag-button-group {
    margin-bottom: 5px;
  }
</style>