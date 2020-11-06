<template>
  <el-row class="service-category">
    <div class="service-category-search">
      <el-autocomplete
        class="inline-input"
        v-model="categorySearch"
        :fetch-suggestions="querySearch"
        :placeholder="placeholder"
        :trigger-on-focus="false"
        @select="handleSelect"
        :disabled="draggable"
      >
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-autocomplete>
    </div>
    <div class="scroll-container">
      <el-scrollbar class="tree_scroll">
        <el-tree
          :data="categoryTree"
          default-expand-all
          node-key="id"
          :expand-on-click-node="false"
          highlight-current
          :props="defaultProps"
          ref="serviceCategoryTree"
          :draggable="draggable"
          :allow-drop="allowDrop"
          :allow-drag="allowDrag"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                class="kqserver-icontuozhuai base-btn-text"
                :class="{ 'root-hide': data.parentId == '-1' ? false : true }"
                @click="draggableTree(data)"
                v-if="!draggable"
              ></el-button>
              <el-button
                v-if="draggable"
                size="mini"
                type="text"
                class="kqserver-baocun base-btn-text"
                :class="{ 'root-hide': data.parentId == '-1' ? false : true }"
                @click="saveTree(data)"
              ></el-button>
              <el-button
                v-if="draggable"
                size="mini"
                type="text"
                class="kqserver-quxiaobaocun base-btn-text"
                :class="{ 'root-hide': data.parentId == '-1' ? false : true }"
                @click="cancelTree(data)"
              ></el-button>
              <el-button
                size="mini"
                type="text"
                class="kqserver-icontuozhuai base-btn-text"
                :class="{ 'root-hide': data.id == '0' ? true : false }"
                v-show="draggable"
              ></el-button>
              <el-button
                size="mini"
                type="text"
                class="el-icon-plus base-btn-text"
                :class="{
                  'root-hide':
                    data.parentId == '0' || data.parentId == '-1'
                      ? false
                      : true,
                }"
                @click="add(data)"
                v-show="!draggable"
              ></el-button>
              <el-button
                size="mini"
                type="text"
                class="el-icon-edit base-btn-text"
                :class="{ 'root-hide': data.id == '0' ? true : false }"
                @click="edit(data)"
                v-show="!draggable"
              ></el-button>
              <el-button
                size="mini"
                type="text"
                class="el-icon-delete base-btn-text"
                :class="{ 'root-hide': data.id == '0' ? true : false }"
                @click.stop="delById(data)"
                v-show="!draggable"
              ></el-button>
            </span>
          </span>
        </el-tree>
      </el-scrollbar>
    </div>
  </el-row>
</template>

<script>
import { filterTreeArrayByString } from "@/utils/filterUtils.js";
export default {
  name: "ManageServiceCategoryTree",
  props: {
    categoryTree: {
      type: Array,
      default: () => {
        return [];
      },
    },
    placeholder: {
      type: String,
      default() {
        return this.$t("management.pleaseEnterTheServiceCategory");
      },
    },
    draggable: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  methods: {
    add(data) {
      this.$emit("add", data);
    },
    delById(data) {
      this.$emit("delById", data);
    },
    edit(data) {
      this.$emit("edit", data);
    },
    draggableTree(data) {
      this.$emit("draggableTree", data);
    },
    saveTree(data) {
      this.$emit("saveTree", data);
    },
    cancelTree(data) {
      this.$emit("cancelTree", data);
    },
    querySearch(queryString, cb) {
      var cloneData = JSON.parse(JSON.stringify(this.categoryTree));
      cloneData[0].typeName = "";
      var results = filterTreeArrayByString(cloneData, queryString, "typeName");
      if (results.length == 0) {
        results.push({ value: "无查询结果" });
      }
      cb(results);
    },
    handleSelect(item) {
      this.$refs.serviceCategoryTree.setCurrentKey(item.id);
      this.categorySearch = item.typeName;
      this.$emit("categorySearch", item);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (draggingNode.childNodes.length > 0) {
        if (dropNode.level == 2) {
          return type === "prev" || type === "next";
        } else {
          return false;
        }
      } else {
        if (draggingNode.level < 4) {
          if (dropNode.level == 2) {
            return type === "prev" || type === "inner" || type === "next";
          } else if (dropNode.level == 3) {
            return type === "prev";
          } else {
            return false;
          }
        } else {
          return false;
        }
      }
    },
    allowDrag(draggingNode) {
      return draggingNode.level !== 1;
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "typeName",
      },
      categorySearch: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.service-category {
  @include manage-border();
  height: 450px;
  .service-category-search {
    @include manage-border(
      $types: (
        "bottom",
      )
    );
    padding: 5px;
    .el-autocomplete {
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
