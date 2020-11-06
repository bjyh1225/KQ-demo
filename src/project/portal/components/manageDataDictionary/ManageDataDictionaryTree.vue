<template>
  <el-row class="service-category">
    <div class="service-category-search">
      <el-autocomplete
        class="inline-input"
        v-model="dictionarySearch"
        :fetch-suggestions="querySearch"
        :placeholder="$t('management.pleaseEnterTheDictionary')"
        :trigger-on-focus="false"
        @select="handleSelect"
      >
        <i slot="suffix" class="el-input__icon el-icon-search"></i>
      </el-autocomplete>
    </div>
    <div class="scroll-container">
      <el-scrollbar class="tree_scroll">
        <el-tree
          :data="treeData"
          default-expand-all
          node-key="id"
          :expand-on-click-node="false"
          highlight-current
          @node-click="handleNodeClick"
          ref="dataDictionaryTree"
          :props="defaultProps"
        >
          <span class="custom-tree-node" slot-scope="{ node, data }">
            <span>{{ node.label }}</span>
            <span>
              <el-button
                size="mini"
                type="text"
                class="el-icon-plus base-btn-text"
                v-if="data.id<0"
                @click.stop="add(data)"
              ></el-button>
              <el-button
                size="mini"
                type="text"
                class="el-icon-edit base-btn-text"
                v-else
                @click.stop="edit(data)"
              ></el-button>
              <el-button
                size="mini"
                type="text"
                class="el-icon-delete base-btn-text"
                :class="{'root-hide':data.id<0?true:false}"
                @click.stop="delById(data)"
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
  name: "ManageDataDictionaryTree",
  props: {
    treeData: {
      type: Array,
      default: () => {
        return [];
      }
    }
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
    handleNodeClick(data) {
      this.$emit("handleNodeClick", data);
    },
    querySearch(queryString, cb) {
      var cloneData = JSON.parse(JSON.stringify(this.treeData));
      cloneData[0].typeName = "";
      var results = filterTreeArrayByString(
        cloneData,
        queryString,
        "name",
        "children",
        true,
        true,
        "value",
        function(item) {
          if (item.id < 0) {
            return false;
          } else {
            return true;
          }
        }
      );
      if (results.length == 0) {
        results.push({ value: this.$t("service.noResultsFound"), id: "-9999" });
      }
      cb(results);
    },
    handleSelect(item) {
      if (item.id < 0) {
        return false;
      }
      this.$refs.dataDictionaryTree.setCurrentKey(item.id);
      this.dictionarySearch = item.name;
      this.$emit("dictionarySearch", item);
    },
    reset() {
      this.dictionarySearch = "";
    }
  },
  data() {
    return {
      defaultProps: {
        children: "children",
        label: "name"
      },
      dictionarySearch: ""
    };
  }
};
</script>

<style lang='scss' scoped>

.service-category {
  @include manage-border();
  height: 750px;
  .service-category-search {
    @include manage-border(
      $types: (
        "bottom"
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