<template>
  <div>
    <el-button
      class="visualization-move-symbol el-icon-portal-tuodong base-btn"
      v-if="hideBtn.move?false:true"
    >{{$t('visualization.Move')}}</el-button>
    <el-button
      class="el-icon-delete base-btn-del"
      @click="removeItem"
      v-if="hideBtn.del?false:true"
    >{{$t('visualization.Delete')}}</el-button>
    <el-button
      class="el-icon-portal-shuxing base-btn"
      @click="setProperty"
      v-if="hideBtn.property?false:true"
    >{{$t('visualization.Properties')}}</el-button>
    <el-button class="el-icon-edit base-btn" v-if="hideBtn.edit?false:true">{{$t('myCenter.Edit')}}</el-button>
  </div>
</template>

<script>
export default {
  name: "DragButtonGroup",
  props: {
    hideBtn: {
      type: Object,
      default: () => {
        return { edit: true };
      }
    }
  },
  methods: {
    removeItem() {
      this.$emit("removeItem");
    },
    setProperty() {
      this.$emit("setProperty");
    }
  }
};
</script>

<style lang='scss' scoped>
.el-button {
  padding: 5px 10px;
}
.visualization-move-symbol {
  cursor: move;
}
</style>