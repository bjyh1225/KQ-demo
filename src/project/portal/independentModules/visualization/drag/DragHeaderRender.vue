<template>
  <div class="drag-render">
    <drag-button-group
      :hideBtn="{move:true,edit:true,del:true}"
      class="drag-button-group"
      @setProperty="setProperty"
    ></drag-button-group>
    <index-header :headerInfo="headerInfo" :pageStatus="'preview'"></index-header>
  </div>
</template>

<script>
import DragButtonGroup from "portal/independentModules/visualization/common/DragButtonGroup";
// import IndexHeader from "portal/independentModules/visualization/components/IndexHeader";
import IndexHeader from 'common/config/allProjectConfig/visualizationConfig/indexHeaderComponentsBoxConfig.js';
export default {
  name: "DragHeaderRender",
  components: {
    DragButtonGroup,
    ...IndexHeader
  },
  props: {
    headerInfo: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  methods: {
    setProperty() {
      //属性设置
      var data = {
        commonTimeStamp: new Date().getTime(),
        commonEventType: "setProperty",
        commonSource: "visualization",
        commonParams: this.headerInfo
      };
      this.$store.dispatch("common/setEventInfo", data);
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