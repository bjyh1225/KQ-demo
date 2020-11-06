<template>
  <el-row class="user-dept">
    <div class="user-dept-select">
      <el-select
        v-model="dimensionValue"
        :placeholder="$t('management.pleaseSelectDimension')"
        @change="selectChange"
      >
        <el-option
          v-for="item in orgDimension"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="scroll-container" :style="style">
      <el-scrollbar class="tree_scroll">
        <el-tree
          :data="deptList"
          default-expand-all
          node-key="id"
          :expand-on-click-node="false"
          highlight-current
          @node-click="handleNodeClick"
          :props="defaultProps"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span v-show="data.parentId=='-1'&&acquisitionFlag?true:false">
              <!-- 剔除子集 -->
              <el-checkbox @change="acquisition(checked)" v-model="checked" @click.stop.native>展示子集</el-checkbox>
            </span>
          </span>
        </el-tree>
      </el-scrollbar>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "ManageDept",
  props: {
    orgDimension: {
      type: Array,
      default: () => {
        return [];
      }
    },
    deptList: {
      type: Array,
      default: () => {
        return [];
      }
    },
    height: {
      type: Number,
      default: 700
    },
    acquisitionFlag: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return "height:" + this.height + "px;";
    }
  },
  methods: {
    selectChange(val) {
      this.$emit("selectChange", val);
    },
    handleNodeClick(data) {
      this.$emit("handleNodeClick", data);
    },
    reset() {
      this.dimensionValue = "";
    },
    acquisition(val) {
      this.$emit("acquisition", val);
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "text"
      },
      dimensionValue: "",
      checked: false
    };
  }
};
</script>

<style lang='scss' scoped>

.user-dept {
  @include manage-border();
  // height:750px;
  .user-dept-select {
    @include manage-border(
      $types: (
        "bottom"
      )
    );
    padding: 5px;
    .el-select {
      width: 100%;
    }
  }
  // .scroll-container{
  //   height:700px;
  // }
  .tree_scroll {
    height: 100%;
  }
  /deep/ .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-tree {
    width: 96%;
    margin: 0 auto;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>