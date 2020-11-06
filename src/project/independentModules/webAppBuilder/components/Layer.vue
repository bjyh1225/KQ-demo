<template>
  <div>
    <div class="layer-manage-btn-area">
      <!-- <el-button type="primary" class="app-builder-btn layer-manage-btn" @click="showLayerManage">
        <i class="el-icon-portal-tucengguanli"></i>
        添加图层
      </el-button>-->
      <el-menu
        :default-active="activeIndex"
        class="app-builder-btn layer-manage-btn"
        mode="horizontal"
        @select="showLayerManage"
      >
        <el-submenu index="1" popper-class="menu-layer">
          <template slot="title">
            <i class="el-icon-plus"></i>
            <span>添加图层</span>
          </template>
          <el-menu-item index="KQGIS">添加KQGIS REST服务图层</el-menu-item>
          <el-menu-item index="OGC">添加OGC服务图层</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="tree-search-input-area">
      <el-input :placeholder="$t('myCenter.Inputkeywordstofilter')" v-model="filterText"></el-input>
    </div>
    <el-tree
      class="tab-layer-tree common-layer-manage-tree"
      :data="layerTree"
      :props="defaultProps"
      default-expand-all
      :expand-on-click-node="false"
      :filter-node-method="filterNode"
      node-key="_treeId"
      ref="tree"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span
          class="tree-node-label"
          :title="node.label"
          :style="'width:'+((280-node.level*16-42-24-22+14)<20?20:(280-node.level*16-42-24-22+14))+'px;'"
        >
          <img
            :src="'/thirdParty/kqwebmap/ftree/'+node.data._icon+'.png'"
            class="node-icon-img"
            v-if="node.data._icon"
          />
          <span>{{node.label}}</span>
        </span>
        <span class="tree-node-btn">
          <el-button
            type="text"
            size="mini"
            class="el-icon-edit tree-content-btn"
            @click="() => editLayerTreeNode(data)"
          ></el-button>
          <el-button
            type="text"
            size="mini"
            class="el-icon-delete tree-content-btn"
            :class="{'root-hide':data._treeId=='-1'?true:false}"
            @click="removeLayerTreeNode(node, data)"
          ></el-button>
        </span>
      </span>
    </el-tree>
    <layer-manage-dialog
      :dialogVisible="dialogVisible"
      @dialogClose="dialogClose"
      :tabLayerTree="layerTree"
      @save="dialogSave"
    ></layer-manage-dialog>
    <layer-manage-ogc-dialog
      :dialogVisible="dialogOGCVisible"
      @dialogClose="dialogOGCClose"
      :tabLayerTree="layerTree"
      @save="dialogOGCSave"
      :configJSON="configJSON"
    ></layer-manage-ogc-dialog>
    <layer-catalogue-dialog
      :dialogVisible="layerCataloguerDialogVisible"
      @dialogClose="layerCataloguerDialogClose"
      @save="saveLayerCataloguer"
      :layerInfo="layerCataloguerInfo"
    ></layer-catalogue-dialog>
    <layer-node-edit-dialog
      :dialogVisible="layerNodeEditDialogVisible"
      @dialogClose="layerNodeEditDialogClose"
      @save="saveLayerNodeEdit"
      :layerInfo="layerNodeEditInfo"
    ></layer-node-edit-dialog>
  </div>
</template>

<script>
import LayerManageDialog from "./LayerManageDialog";
import LayerCatalogueDialog from "./LayerCatalogueDialog";
import LayerNodeEditDialog from "./LayerNodeEditDialog";
import LayerManageOgcDialog from "./LayerManageOgcDialog";
export default {
  name: "Layer",
  components: {
    LayerManageDialog,
    LayerCatalogueDialog,
    LayerNodeEditDialog,
    LayerManageOgcDialog
  },
  props: {
    configJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    updateDataTimeStamp: {
      default: 0
    },
    activeName: {
      type: String,
      default: ""
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
    activeName() {
      if (this.activeName == "layer") {
        this.createData();
      }
    },
    updateDataTimeStamp() {
      this.createData();
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data._label.indexOf(value) !== -1;
    },
    showLayerManage(key) {
      this.activeIndex = key;
      if (key == "KQGIS") {
        this.dialogVisible = true;
      } else {
        this.dialogOGCVisible = true;
      }
    },
    dialogClose() {
      this.dialogVisible = false;
      this.activeIndex = "";
    },
    dialogOGCClose() {
      this.dialogOGCVisible = false;
      this.activeIndex = "";
    },
    dialogSave(data) {
      this.layerTree = JSON.parse(JSON.stringify(data));
      this.$emit("save", this.layerTree);
    },
    dialogOGCSave(data) {
      this.layerTree = JSON.parse(JSON.stringify(data));
      this.$emit("save", this.layerTree);
    },
    removeTreeNode(node, layerTree) {
      if (node.data._treeId == "-1") {
        this.$message({
          message: this.$t("webAppBuilder.TheCurrentNodeCannotBeDeleted"),
          type: "warning"
        });
        return false;
      }
      const parent = node.parent;
      const children = parent.data.layer || parent.data;
      const index = children.findIndex(d => d._treeId === layerTree._treeId);
      children.splice(index, 1);
    },
    createData() {
      if (!this.configJSON.config.tree.layers) {
        this.layerTree = [
          {
            _treeId: "-1",
            _label: this.configJSON.config.tree._label,
            layer: [],
            _icon: "image_folder",
            _is_group: "1"
          }
        ];
      } else {
        this.layerTree = [
          {
            _treeId: "-1",
            _label: this.configJSON.config.tree._label,
            layer: this.configJSON.config.tree.layers.layer,
            _icon: "image_folder",
            _is_group: "1"
          }
        ];
      }
    },
    editLayerTreeNode(data) {
      if (data._is_group == "1") {
        this.layerCataloguerDialogVisible = true;
        this.layerCataloguerDialogStatus = "edit";
        this.layerCataloguerInfo = JSON.parse(JSON.stringify(data));
        this.cacheLayerCataloguerInfo = data;
      } else {
        this.layerNodeEditDialogVisible = true;
        this.layerNodeEditInfo = JSON.parse(JSON.stringify(data));
        this.cacheLayerNodeEditInfo = data;
      }
    },
    removeLayerTreeNode(node, layerTree) {
      if (node.data._treeId == "-1") {
        this.$message({
          message: this.$t("webAppBuilder.TheCurrentNodeCannotBeDeleted"),
          type: "warning"
        });
        return false;
      }
      const parent = node.parent;
      const children = parent.data.layer || parent.data;
      const index = children.findIndex(d => d._treeId === layerTree._treeId);
      children.splice(index, 1);
      this.$emit("save", this.layerTree);
    },
    layerCataloguerDialogClose() {
      //编辑图层目录关闭
      this.layerCataloguerDialogVisible = false;
    },
    layerNodeEditDialogClose() {
      //编辑图层属性关闭
      this.layerNodeEditDialogVisible = false;
    },
    saveLayerCataloguer() {
      //保存图层目录
      for (var i in this.layerCataloguerInfo) {
        this.cacheLayerCataloguerInfo[i] = this.layerCataloguerInfo[i];
      }
      this.$emit("save", this.layerTree);
      this.layerCataloguerDialogClose();
    },
    saveLayerNodeEdit() {
      //保存图层节点
      for (var i in this.layerNodeEditInfo) {
        this.cacheLayerNodeEditInfo[i] = this.layerNodeEditInfo[i];
      }
      this.$emit("save", this.layerTree);
      this.layerNodeEditDialogClose();
    }
  },
  data() {
    return {
      activeIndex: "",
      dialogVisible: false, //弹出窗状态
      dialogOGCVisible: false, //OGC弹出窗状态
      filterText: "",
      layerTree: [],
      defaultProps: {
        children: "layer",
        label: "_label"
      },
      layerCataloguerDialogVisible: false, //图层目录设置弹窗
      layerCataloguerDialogStatus: "add", //图层目录设置弹窗状态
      layerCataloguerInfo: {}, //图层目录设置信息
      layerNodeEditDialogVisible: false, //图层属性设置弹窗
      layerNodeEditInfo: {}, //图层属性编辑信息
      cacheLayerCataloguerInfo: {}, //图层目录设置信息缓存
      cacheLayerNodeEditInfo: {} //图层属性编辑信息缓存
    };
  },
  mounted() {
    this.createData();
  }
};
</script>

<style lang="scss">
.menu-layer .el-menu--popup {
  min-width: 260px;
  /deep/.el-menu-item:hover {
    color: #3691e9 !important;
    background: #f8f6f6;
  }
}
.menu-layer .el-menu--popup-bottom-start {
  margin-top: 10px;
}
</style>
<style lang='scss' scoped>
.layer-manage-btn-area {
  margin-top: 15px;
  margin-bottom: 10px;
  .layer-manage-btn {
    width: 260px;
    margin-left: 14px;
    height: 35px;
    font-size: 16px;
    /deep/.el-submenu__title i {
      color: #3691e9;
    }
    /deep/.el-submenu__title i.el-icon-plus {
      font-size: 16px;
      margin-right: 6px;
      color: #fff;
    }
    /deep/.el-submenu__title {
      width: 260px;
      height: 36px;
      line-height: 36px;
      text-align: center;
      color: #fff;
      &:hover {
        background: #3691e9;
        border: none;
      }
    }
  }
}
.tree-search-input-area {
  margin-bottom: 10px;
  .el-input {
    width: 260px;
    margin-left: 14px;
    /deep/.el-input__inner {
      height: 36px;
    }
  }
}
//树样式
.tab-layer-tree {
  width: 98%;
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
    padding-right: 4px;
  }
  .tree-node-label {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    .node-icon-img {
      width: 16px;
      height: 16px;
      vertical-align: middle;
      margin-right: 4px;
    }
    span {
      vertical-align: middle;
    }
  }
}
.root-hide {
  visibility: hidden;
}
</style>