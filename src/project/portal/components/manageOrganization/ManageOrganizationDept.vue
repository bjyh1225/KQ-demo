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
    <div class="scroll-container">
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
            <span>
              <el-button
                size="mini"
                type="text"
                class="el-icon-plus base-btn-text"
                @click.stop="add(data)"
              ></el-button>
              <el-button
                size="mini"
                type="text"
                class="el-icon-delete base-btn-text"
                :class="{'root-hide':data.id=='0'?true:false}"
                @click.stop="delOrgById(data)"
              ></el-button>
            </span>
          </span>
        </el-tree>
      </el-scrollbar>
    </div>
  </el-row>
</template>

<script>
export default {
  name: "ManageOrganizationDept",
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
    }
  },
  methods: {
    selectChange(val) {
      this.$emit("selectChange", val);
    },
    add(data) {
      this.$emit("addDept", data);
    },
    delOrgById(data) {
      this.$emit("delOrgById", data);
    },
    handleNodeClick(data) {
      this.$emit("handleNodeClick", data);
    },
    reset() {
      this.dimensionValue = "";
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "text"
      },
      dimensionValue: ""
    };
  }
};
</script>

<style lang='scss' scoped>

.user-dept {
  @include manage-border();
  height: 750px;
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
  .scroll-container {
    height: 700px;
  }
  .tree_scroll {
    height: 100%;
  }
  /deep/ .el-scrollbar .el-scrollbar__wrap {
    overflow-x: hidden;
  }
  .el-tree {
    width: 96%;
    margin: 0 auto;
    span {
      font-size: 14px;
    }
    .custom-tree-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      padding-right: 8px;
    }
    .root-hide {
      visibility: hidden;
    }
    .base-btn-text {
      cursor: pointer;
    }
  }
}
</style>