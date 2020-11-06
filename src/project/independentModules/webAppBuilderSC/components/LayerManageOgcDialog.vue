<template>
  <div class="layer-manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="900px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      :custom-class="'layer-manage-dialog-pop'"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>添加OGC服务图层</span>
        </div>
      </template>
      <div class="select-input-area">
        <el-select
          v-model="category"
          :placeholder="$t('webAppBuilder.ServiceDirectory')"
          class="service-category-input"
          @change="categoryChange"
          :popper-class="'app-builer-select'"
          :class="{'service-list-input-is-active-select':serviceListVisible}"
        >
          <el-option-group v-for="group in categoryTree" :key="group.id" :label="group.typeName">
            <el-option
              v-for="item in group.children"
              :key="item.id"
              :label="item.typeName"
              :value="item.id"
            ></el-option>
          </el-option-group>
        </el-select>
        <el-popover placement="bottom" width="540" trigger="manual" v-model="serviceListVisible">
          <el-row class="service-list-pop">
            <el-row class="title">
              <el-col :span="12">
                <span class="title-font">{{$t('webAppBuilder.ServiceList')}}</span>
              </el-col>
              <el-col :span="12">
                <el-input
                  :placeholder="$t('myCenter.Pleaseinputcontenttosearch')"
                  v-model="serviceListSearchKey"
                  @keyup.enter.native="searchService"
                ></el-input>
              </el-col>
            </el-row>
            <el-table
              :data="serviceList"
              style="width: 100%"
              :show-header="false"
              :row-class-name="tableRowClassName"
              @row-click="selectService"
            >
              <el-table-column prop="C_NAME" :label="$t('webAppBuilder.ServiceAlias')" width="180">
                <template slot-scope="scope">
                  <i
                    class="el-icon-portal-jinggao icon-warn-service"
                    v-if="scope.row.serviceLinkError"
                  ></i>
                  {{scope.row.C_NAME}}
                </template>
              </el-table-column>
              <el-table-column
                prop="C_SERVICE_NAME"
                :label="$t('myCenter.ServiceName')"
                width="180"
              ></el-table-column>
              <el-table-column prop="C_SERVICE_TYPE" :label="$t('webAppBuilder.ServicesType')"></el-table-column>
              <el-table-column prop="USERNAME" :label="$t('webAppBuilder.Creator')"></el-table-column>
            </el-table>
            <el-row class="layer-manage-pagination">
              <el-pagination
                layout="prev, pager, next"
                :total="total"
                :page-size="pageSize"
                :current-page.sync="pageIndex"
                @current-change="handleCurrentChange"
                :hide-on-single-page="true"
              ></el-pagination>
            </el-row>
          </el-row>
          <div
            slot="reference"
            class="service-list-input"
            @click.stop="showServiceList"
            :class="{'service-list-input-is-active':serviceListVisible,'service-list-input-no-active':!serviceListVisible}"
          >
            <span
              v-if="currentSelectedServiceName==''"
              class="placeholder-font"
            >{{$t('webAppBuilder.SelectService')}}</span>
            <span v-else>{{currentSelectedServiceName}}</span>
            <i class="el-icon-arrow-up arrow-icon"></i>
          </div>
        </el-popover>
      </div>
      <el-row class="layer-operate-area">
        <el-col :span="10" class="layer-select-area common-layer-tree-container">
          <div class="btn-group-area">
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-portal-jia2"
                @click="foldAndUnfoldSelectedLayerTree(true)"
                v-tips="$t('webAppBuilder.ExpandAll')"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-portal-jian"
                @click="foldAndUnfoldSelectedLayerTree(false)"
                v-tips="$t('webAppBuilder.CollapseAll')"
              ></el-button>
            </el-button-group>
          </div>
          <div class="search-area">
            <el-input
              :placeholder="$t('webAppBuilder.PleaseEnterKeywordsToFilter')"
              v-model="selectedLayerTreeFilterText"
            ></el-input>
          </div>
          <div class="tree-area">
            <el-scrollbar class="scroll">
              <personalized-tree
                class="tree-select-area"
                :data="selectedLayerTree"
                :olny-drag-no-drop="true"
                @node-drag-start="selectedLayerDrag"
                draggable
                :props="selectedLayerTreeDefaultProps"
                :drop-data-handle-fun="dropDataHandle"
                :drag-id="'selectedLayerTree'"
                :expand-on-click-node="false"
                default-expand-all
                highlight-current
                node-key="_id"
                ref="selectedLayerTree"
                :filter-node-method="selectedLayerTreeFilterNode"
                @node-click="handleSelectedLayerTreeNodeClick"
                :emptyText="$t('webAppBuilder.NoData')"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span
                    class="tree-node-label"
                    :style="'width:'+((348-node.level*16-42-24)<20?20:(348-node.level*16-42-24))+'px;'"
                  >
                    <img
                      :src="'/thirdParty/kqwebmap/ftree/'+node.data._icon+'.png'"
                      class="node-icon-img"
                      v-if="node.data._icon"
                    />
                    <span>{{node.label}}</span>
                  </span>
                </span>
              </personalized-tree>
            </el-scrollbar>
          </div>
        </el-col>
        <el-col :span="4" class="layer-desc">
          <i class="el-icon-right"></i>
          <span>{{$t('webAppBuilder.AddTo')}}</span>
        </el-col>
        <el-col :span="10" class="layer-tree-area common-layer-tree-container">
          <div class="btn-group-area">
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-portal-jia2"
                @click="foldAndUnfoldLayerTree(true)"
                v-tips="$t('webAppBuilder.ExpandAll')"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-portal-jian"
                @click="foldAndUnfoldLayerTree(false)"
                v-tips="$t('webAppBuilder.CollapseAll')"
              ></el-button>
            </el-button-group>
            <el-button-group>
              <el-button
                type="primary"
                icon="el-icon-portal-BC-BIdetubiao_tianjiamulu_defaul"
                @click="editLayerCatalogue"
                v-tips="$t('webAppBuilder.NewMenu')"
              ></el-button>
              <el-button
                type="primary"
                icon="el-icon-portal-baocun"
                @click="save"
                v-tips="$t('visualization.Save')"
              ></el-button>
            </el-button-group>
          </div>
          <div class="search-area">
            <el-input
              :placeholder="$t('webAppBuilder.PleaseEnterKeywordsToFilter')"
              v-model="layerTreeFilterText"
            ></el-input>
          </div>
          <div class="tree-area">
            <el-scrollbar class="scroll">
              <personalized-tree
                class="tree-select-area"
                :data="layerTree"
                :props="layerTreeDefaultProps"
                default-expand-all
                highlight-current
                ref="layerTree"
                @node-drag-start="selectedLayerDrag"
                :drop-data-handle-fun="dropDataHandle"
                :allow-drop="allowDrop"
                :drag-id="'layerTree'"
                draggable
                :expand-on-click-node="false"
                :filter-node-method="layerTreeFilterNode"
                node-key="_treeId"
                @node-click="handleLayerTreeNodeClick"
              >
                <span class="custom-tree-node" slot-scope="{ node, data }">
                  <span
                    class="tree-node-label"
                    :style="'width:'+((348-node.level*16-42-24)<20?20:(348-node.level*16-42-24))+'px;'"
                  >
                    <img
                      :src="'/thirdParty/kqwebmap/ftree/'+node.data._icon+'.png'"
                      class="node-icon-img"
                      v-if="node.data._icon"
                    />
                    <span>{{node.label}}</span>
                  </span>
                  <span>
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
              </personalized-tree>
            </el-scrollbar>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
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
import { getTree } from "@/utils/getTree.js";
import guid from "@/utils/guid.js";
import PersonalizedTree from "../commonComponents/tree/tree";
import { traversal } from "@/utils/traversal.js";
import LayerCatalogueDialog from "./LayerCatalogueDialog";
import LayerNodeEditDialog from "./LayerNodeEditDialog";
import epsgJson from "../config/epsg.js";
export default {
  name: "LayerManageOgcDialog",
  components: {
    PersonalizedTree,
    LayerCatalogueDialog,
    LayerNodeEditDialog
  },
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    tabLayerTree: {
      type: Array,
      default: () => {
        return [];
      }
    },
    configJSON: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.resetAll();
        this.getServiceCategory();
        this.layerTree = JSON.parse(JSON.stringify(this.tabLayerTree));
      }
    },
    layerTreeFilterText(val) {
      this.$refs.layerTree.filter(val);
    },
    selectedLayerTreeFilterText(val) {
      this.$refs.selectedLayerTree.filter(val);
    }
  },
  data() {
    return {
      categoryTree: [], //服务目录
      category: "",
      serviceList: [], //服务列表
      pageIndex: 1,
      pageSize: 3,
      total: 0,
      serviceListVisible: false,
      serviceListSearchKey: "",
      currentSelectedService: {}, //当前选中的服务
      currentSelectedServiceName: "", //当前选中的服务名
      layerTree: [], //图层树
      currentLayerTreeNode: {}, //当前选中的图层树节点
      layerTreeFilterText: "", //图层树过滤
      selectedLayerTree: [], //待选图层树
      selectedLayerTreeFilterText: "", //待选图层树过滤
      currentSelectedLayerTreeNode: {}, //当前选中的待选图层树节点
      selectedLayerTreeDefaultProps: {
        children: "layer",
        label: "_label"
      },
      layerTreeDefaultProps: {
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
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    handleLayerTreeNodeClick(data, node) {
      //图层数节点单击选择
      this.currentLayerTreeNode = node;
    },
    handleSelectedLayerTreeNodeClick(data, node) {
      //图层数节点单击选择
      this.currentSelectedLayerTreeNode = node;
    },
    layerTreeFilterNode(value, data) {
      //树结构过滤
      if (!value) return true;
      return data._label.indexOf(value) !== -1;
    },
    selectedLayerTreeFilterNode(value, data) {
      //树结构过滤
      if (!value) return true;
      return data._label.indexOf(value) !== -1;
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
      this.layerTree = JSON.parse(JSON.stringify(this.layerTree));
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
    getServiceCategory() {
      //查询服务目录
      this.$api.webAppBuilderApi
        .getServiceCategory({
          loadingText: this.$t("service.searching"),
          __LOGINTYPE: "dialog"
        })
        .then(res => {
          var data = res.data.data;
          this.categoryTree = getTree(data, "id", "parentId", "children");
        })
        .catch(() => {});
    },
    getServiceList() {
      //查询服务列表
      this.$api.webAppBuilderApi
        .getListServiceOGC(
          {
            page: this.pageIndex,
            size: this.pageSize,
            serviceClassify: this.category,
            searchVal: this.serviceListSearchKey
          },
          {
            loadingText: this.$t("service.searching"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          var data = res.data.data;
          this.serviceList = data.rows;
          this.pageIndex = data.pageIndex;
          this.pageSize = data.pageSize;
          this.total = data.total;
        })
        .catch(() => {});
    },
    categoryChange() {
      this.resetServiceList();
      this.getServiceList();
    },
    tableRowClassName({ row }) {
      if (row.serviceLinkError) {
        return "warn-service";
      } else {
        return false;
      }
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getServiceList();
    },
    searchService() {
      //服务搜索
      this.getServiceList();
    },
    selectService(row) {
      //查询图层详情
      if (!row.C_SERVICE_URL) {
        this.$message({
          message: this.$t("webAppBuilder.TheURLOfCurrentServiceIsEmpty"),
          type: "warning"
        });
        return false;
      }
      this.resetCurrentInfo();
      this.currentSelectedService = row;
      this.currentSelectedServiceName = row.C_NAME;
      var urlLayer='';
      if(row.C_SERVICE_TYPE == "bigData"){
        var regex = /.*\:\/\/([^\/]*).*/;
        var match = row.C_SERVICE_URL.match(regex);
        var http=  row.C_SERVICE_URL.substring(0, row.C_SERVICE_URL.indexOf("\/")+2);
        urlLayer=`${http}${match[1]}/bigdata/api/catalog/layer/metainfo?layerId=${row.C_SERVICE_NAME}`
      }else{
        urlLayer=row.C_SERVICE_URL
      }
      this.$api.webAppBuilderApi
        .getLayers(
          {
            url: urlLayer,
            serviceType: row.C_SERVICE_TYPE
          },
          {
            loadingText: this.$t("service.searching"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          var dataStr = res.data.data;
          if (typeof dataStr === "string") {
            var data = JSON.parse(dataStr);
            if (data.resultcode && data.resultcode == "error") {
              this.currentSelectedService.serviceLinkError = true;
              this.serviceList = JSON.parse(JSON.stringify(this.serviceList));
              return false;
            } else {
              this.currentSelectedService.serviceLinkError = false;
              this.serviceList = JSON.parse(JSON.stringify(this.serviceList));
              var layersResult = [];
              if (row.C_SERVICE_TYPE == "WMS") {
                if (data["WMS_Capabilities"]) {
                  var layersList =
                    data["WMS_Capabilities"].Capability.Layer.Layer;
                  if (layersList instanceof Array) {
                    layersList.forEach(item => {
                      var tempItem = {
                        _opacity: 1,
                        _src_name: this.currentSelectedService.C_SERVICE_URL,
                        _icon: '',
                        _type: "sl",
                        _id: item.Name,
                        _is_dynamic: "1",
                        _label: item.Title,
                        _tooltip_forefather: item.Title,
                        _visible: "0",
                        _parentLayerId: -1,
                        _service_name: this.currentSelectedService.C_NAME,
                        _service_type: "wms",
                        _service_id: this.currentSelectedService.C_ID
                      };
                      layersResult.push(tempItem);
                    });
                  } else {
                    var tempItem = {
                      _opacity: 1,
                      _src_name: this.currentSelectedService.C_SERVICE_URL,
                      _icon: '',
                      _type: "sl",
                      _id: layersList.Name,
                      _is_dynamic: "1",
                      _label: layersList.Title,
                      _tooltip_forefather: layersList.Title,
                      _visible: "0",
                      _parentLayerId: -1,
                      _service_name: this.currentSelectedService.C_NAME,
                      _service_type: "wms",
                      _service_id: this.currentSelectedService.C_ID
                    };
                    layersResult.push(tempItem);
                  }
                } else {
                  this.$message({
                    message: "服务类型与地址不符",
                    type: "warning"
                  });
                  return false;
                }
              } else if (row.C_SERVICE_TYPE == "WMTS") {
                if (data.Capabilities) {
                  var layersList = data.Capabilities.Contents.Layer;
                if (layersList instanceof Array) {
                  layersList.forEach(item => {
                    var tempItem = {
                      _opacity: 1,
                      _src_name: this.currentSelectedService.C_SERVICE_URL,
                      _map_src_name: this.currentSelectedService.C_SERVICE_URL,
                      _type: "sl",
                      _icon: '',
                      _is_dynamic: "0",
                      _label: item["ows:Title"],
                      _tooltip_forefather: item["ows:Title"],
                      _id: item["ows:Identifier"],
                      "_ _style": item.Style["ows:Identifier"],
                      "_ _layer": item["ows:Identifier"],
                      "_ _tilematrixSet":
                        item.TileMatrixSetLink[0].TileMatrixSet,
                      "_ _format": item.Format,
                      _service_type: "wmts",
                      _parentLayerId: -1,
                      _service_name: this.currentSelectedService.C_NAME,
                      _service_id: this.currentSelectedService.C_ID
                    };
                    layersResult.push(tempItem);
                  });
                }else {
                    var tempItem = {
                      _opacity: 1,
                      _src_name: this.currentSelectedService.C_SERVICE_URL,
                      _map_src_name: this.currentSelectedService.C_SERVICE_URL,
                      _type: "sl",
                      _is_dynamic: "0",
                      _icon: '',
                      _label: layersList["ows:Title"],
                      _tooltip_forefather: layersList["ows:Title"],
                      _id: layersList["ows:Identifier"],
                      "_ _style": layersList.Style["ows:Identifier"],
                      "_ _layer": layersList["ows:Identifier"],
                      "_ _tilematrixSet":
                        layersList.TileMatrixSetLink[0].TileMatrixSet,
                      "_ _format": layersList.Format,
                      _service_type: "wmts",
                      _parentLayerId: -1,
                      _service_name: this.currentSelectedService.C_NAME,
                      _service_id: this.currentSelectedService.C_ID
                    };
                    layersResult.push(tempItem);
                  }
                } else {
                  this.$message({
                    message: "服务类型与地址不符",
                    type: "warning"
                  });
                  return false;
                }
              }else if(row.C_SERVICE_TYPE =="bigData"){
                if (data.content) {
                  var layersList = data.content.layers;
                if (layersList instanceof Array) {
                  layersList.forEach(item => {
                    var tempItem = {
                      _opacity: 1,
                      _styles:data.content.property.style,
                      _transparent:'true',
                      _src_name: this.currentSelectedService.C_SERVICE_URL,
                      _type: "sl",
                      _icon: '',
                      _id:`kanq:${item.name}`,
                      _layer_extent:`${item.bbox.minX} ${item.bbox.minY} ${item.bbox.maxX} ${item.bbox.maxY}`,
                      _is_dynamic: "0",
                      _label:item.aliasname,
                      _tooltip_forefather:item.aliasname,
                      _visible:'0',
                      _service_type: "wms",
                      _service_type_alias: "bigData",
                      _parentLayerId: -1,
                      _service_name: this.currentSelectedService.C_NAME,
                      _service_id: this.currentSelectedService.C_ID
                    };
                    layersResult.push(tempItem);
                  });
                }else {
                    var tempItem = {
                    };
                    layersResult.push(tempItem);
                  }
                } else {
                  this.$message({
                    message: "服务类型与地址不符",
                    type: "warning"
                  });
                  return false;
                }
              }
              this.selectedLayerTree = getTree(
                layersResult,
                "_id",
                "_parentLayerId",
                "layer"
              );
              if (row.C_SERVICE_TYPE == "WMTS") {
                var wmts_Capabilities={};
                if (data.Capabilities.Contents.Layer instanceof Array) {
                  wmts_Capabilities=data.Capabilities.Contents.Layer[0];
                }else{
                  wmts_Capabilities=data.Capabilities.Contents.Layer;
                }
                //  具体比例尺
                //初始坐标
                this.configJSON.config.map._init_extent = "";
                var initArrmin = wmts_Capabilities[
                  "ows:WGS84BoundingBox"
                ]["ows:LowerCorner"].split(" ");
                var initArrmax = wmts_Capabilities[
                  "ows:WGS84BoundingBox"
                ]["ows:UpperCorner"].split(" ");
                var serviceDetailsInfo = {};
                serviceDetailsInfo._init_extent_x_min = initArrmin[0];
                serviceDetailsInfo._init_extent_y_min = initArrmin[1];
                serviceDetailsInfo._init_extent_x_max = initArrmax[0];
                serviceDetailsInfo._init_extent_y_max = initArrmax[1];
                //更新配置
                this.configJSON.config.map._init_extent = `${initArrmin[0]} ${initArrmin[1]} ${initArrmax[0]} ${initArrmax[1]}`;
                //全图坐标
                this.configJSON.config.map._full_extent = "";
                // eslint-disable-next-line
                serviceDetailsInfo._full_extent_x_min = initArrmin[0];
                serviceDetailsInfo._full_extent_y_min = initArrmin[1];
                serviceDetailsInfo._full_extent_x_max = initArrmax[0];
                serviceDetailsInfo._full_extent_y_max = initArrmax[1];
                //更新配置
                this.configJSON.config.map._full_extent = `${initArrmin[0]} ${initArrmin[1]} ${initArrmax[0]} ${initArrmax[1]}`;
                  // 中心点
              var origins = data.Capabilities.Contents.TileMatrixSet[0].TileMatrix[0].TopLeftCorner.split(" ");
              serviceDetailsInfo._origin = {};
              serviceDetailsInfo._origin._x = origins[1];
              serviceDetailsInfo._origin._y = origins[0];
              //更新配置
              this.configJSON.config.map.projection.origin._x = origins[1];
              this.configJSON.config.map.projection.origin._y = origins[0];
              // // bound
              serviceDetailsInfo._bound = `${initArrmin[0]} ${initArrmin[1]} ${initArrmax[0]} ${initArrmax[1]}`;
              //更新配置
              this.configJSON.config.map.projection.bound = `${initArrmin[0]} ${initArrmin[1]} ${initArrmax[0]} ${initArrmax[1]}`;
                //比例尺
                //更新配置
                var scaleData =
                  data.Capabilities.Contents.TileMatrixSet[0].TileMatrix;
                this.configJSON.config.map.scales.scale = [];
                // eslint-disable-next-line
                for (var i = 0; i < scaleData.length; i++) {
                  var temp = {
                    _id: scaleData[i]["ows:Identifier"],
                    __text:(1/(scaleData[i].ScaleDenominator/0.9449404761904766)).toFixed(28)
                  };
                  this.configJSON.config.map.scales.scale.push(
                    JSON.parse(JSON.stringify(temp))
                  );
                }
                serviceDetailsInfo._scales = this.configJSON.config.map.scales.scale;
                // prj
                var prjs =data.Capabilities.Contents.TileMatrixSet[0]['ows:SupportedCRS'];
                var index=prjs.substring(prjs.lastIndexOf("EPSG::")+6,prjs.length);
                serviceDetailsInfo._prj =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].prj;
                //更新配置
                this.configJSON.config.map.projection.prj =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].prj;
                //   //输出坐标系统
                serviceDetailsInfo._proj4 =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].proj4;
                //更新配置
                this.configJSON.config.map.projection.proj4 =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].proj4;
                this.configJSON.config.map.portalattributeinfo = JSON.parse(
                  JSON.stringify(serviceDetailsInfo)
                );
                this.configJSON.config.map.defaultportalattributeinfo = JSON.parse(
                  JSON.stringify(serviceDetailsInfo)
                );
              }else if(row.C_SERVICE_TYPE == "WMS"){
                var wms_Capabiliti={};
                if (data["WMS_Capabilities"].Capability.Layer.Layer instanceof Array) {
                  wms_Capabiliti=data["WMS_Capabilities"].Capability.Layer.Layer[0];
                }else{
                  wms_Capabiliti=data["WMS_Capabilities"].Capability.Layer.Layer;
                }
                  //  具体比例尺
                //初始坐标
                this.configJSON.config.map._init_extent = "";
                var serviceDetailsInfo = {};
                serviceDetailsInfo._init_extent_x_min = wms_Capabiliti.EX_GeographicBoundingBox.westBoundLongitude;
                serviceDetailsInfo._init_extent_y_min = wms_Capabiliti.EX_GeographicBoundingBox.southBoundLatitude;
                serviceDetailsInfo._init_extent_x_max = wms_Capabiliti.EX_GeographicBoundingBox.eastBoundLongitude;
                serviceDetailsInfo._init_extent_y_max = wms_Capabiliti.EX_GeographicBoundingBox.northBoundLatitude;
                //更新配置
                this.configJSON.config.map._init_extent = `${wms_Capabiliti.EX_GeographicBoundingBox.westBoundLongitude} ${wms_Capabiliti.EX_GeographicBoundingBox.southBoundLatitude} ${wms_Capabiliti.EX_GeographicBoundingBox.eastBoundLongitude} ${wms_Capabiliti.EX_GeographicBoundingBox.northBoundLatitude}`;
                //全图坐标
                this.configJSON.config.map._full_extent = "";
                // eslint-disable-next-line
                serviceDetailsInfo._full_extent_x_min = wms_Capabiliti.EX_GeographicBoundingBox.westBoundLongitude;
                serviceDetailsInfo._full_extent_y_min = wms_Capabiliti.EX_GeographicBoundingBox.southBoundLatitude;
                serviceDetailsInfo._full_extent_x_max = wms_Capabiliti.EX_GeographicBoundingBox.eastBoundLongitude;
                serviceDetailsInfo._full_extent_y_max = wms_Capabiliti.EX_GeographicBoundingBox.northBoundLatitude;
                //更新配置
                this.configJSON.config.map._full_extent = `${wms_Capabiliti.EX_GeographicBoundingBox.westBoundLongitude} ${wms_Capabiliti.EX_GeographicBoundingBox.southBoundLatitude} ${wms_Capabiliti.EX_GeographicBoundingBox.eastBoundLongitude} ${wms_Capabiliti.EX_GeographicBoundingBox.northBoundLatitude}`;
                 // prj
                var wmsprjs =wms_Capabiliti.CRS;
                var index=wmsprjs.substring(wmsprjs.lastIndexOf("EPSG:")+5,wmsprjs.length);
                serviceDetailsInfo._prj =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].prj;
                //更新配置
                this.configJSON.config.map.projection.prj =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].prj;
                //   //输出坐标系统
                serviceDetailsInfo._proj4 =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].proj4;
                //更新配置
                this.configJSON.config.map.projection.proj4 =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].proj4;
                serviceDetailsInfo._scales = this.configJSON.config.map.scales.scale;
                //更新配置
                this.configJSON.config.map.portalattributeinfo = JSON.parse(
                  JSON.stringify(serviceDetailsInfo)
                );
                this.configJSON.config.map.defaultportalattributeinfo = JSON.parse(
                  JSON.stringify(serviceDetailsInfo)
                );
              }else if(row.C_SERVICE_TYPE == "bigData"){
                 var bigData_Capabiliti={};
                if (data.content.layers instanceof Array) {
                  bigData_Capabiliti=data.content.layers[0];
                }else{
                  bigData_Capabiliti=data.content.layers;
                }
                  //  具体比例尺
                //初始坐标
                this.configJSON.config.map._init_extent = "";
                var serviceDetailsInfo = {};
                serviceDetailsInfo._init_extent_x_min = bigData_Capabiliti.bbox.minX;
                serviceDetailsInfo._init_extent_y_min = bigData_Capabiliti.bbox.minY;
                serviceDetailsInfo._init_extent_x_max = bigData_Capabiliti.bbox.maxX;
                serviceDetailsInfo._init_extent_y_max = bigData_Capabiliti.bbox.maxY;
                //更新配置
                this.configJSON.config.map._init_extent = `${bigData_Capabiliti.bbox.minX} ${bigData_Capabiliti.bbox.minY} ${bigData_Capabiliti.bbox.maxX} ${bigData_Capabiliti.bbox.maxY}`;
                //全图坐标
                this.configJSON.config.map._full_extent = "";
                // eslint-disable-next-line
                serviceDetailsInfo._full_extent_x_min = bigData_Capabiliti.bbox.minX;
                serviceDetailsInfo._full_extent_y_min = bigData_Capabiliti.bbox.minY;
                serviceDetailsInfo._full_extent_x_max = bigData_Capabiliti.bbox.maxX;
                serviceDetailsInfo._full_extent_y_max = bigData_Capabiliti.bbox.maxY;
                //更新配置
                this.configJSON.config.map._full_extent = `${bigData_Capabiliti.bbox.minX} ${bigData_Capabiliti.bbox.minY} ${bigData_Capabiliti.bbox.maxX} ${bigData_Capabiliti.bbox.maxY}`;
                 // prj
                var bigDataprjs =bigData_Capabiliti.crs;
                var index=bigDataprjs.substring(bigDataprjs.lastIndexOf("EPSG:")+5,bigDataprjs.length);
                serviceDetailsInfo._prj =`EPSG:${JSON.parse(JSON.stringify(epsgJson)).EPSG[index].prj}`;
                //更新配置
                this.configJSON.config.map.projection.prj =`EPSG:${JSON.parse(JSON.stringify(epsgJson)).EPSG[index].prj}`;
                //   //输出坐标系统
                serviceDetailsInfo._proj4 =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].proj4;
                //更新配置
                this.configJSON.config.map.projection.proj4 =JSON.parse(JSON.stringify(epsgJson)).EPSG[index].proj4;
                serviceDetailsInfo._scales = this.configJSON.config.map.scales.scale;
                if(JSON.parse(JSON.stringify(epsgJson)).EPSG[index].longitudeLatitude){
                  serviceDetailsInfo._origin = {};
                  serviceDetailsInfo._origin._x = 180;
                  serviceDetailsInfo._origin._y = -90;
                  //更新配置
                  this.configJSON.config.map.projection.origin._x = 180;
                  this.configJSON.config.map.projection.origin._y = -90;
                }
              }
              this.serviceListVisible = false;
              document.body.removeEventListener("click", closeServiceListPop);
            }
          }
        })
        .catch(() => {});
    },
    showServiceList() {
      //服务列表下拉框
      if (!this.category) {
        this.$message({
          message: this.$t("webAppBuilder.PleaseSelectAServiceDirectoryFirst"),
          type: "warning"
        });
      } else {
        if (!this.serviceListVisible) {
          this.serviceListVisible = true;
          var closeServiceListPop = () => {
            this.serviceListVisible = false;
            document.body.removeEventListener("click", closeServiceListPop);
          };
          document.body.addEventListener("click", closeServiceListPop);
        }
      }
    },
    selectedLayerDrag(treeNode, ev, dragId) {
      //待选择图层树节点拖拽
      if (dragId == "selectedLayerTree") {
        traversal([treeNode.node.data], "layer", function(item, parent) {
          item._treeId = guid();
          if (parent != "root") {
            item._parentTreeId = parent._treeId;
          }
        });
      }
      this.$store.dispatch("webapplayer/setLayerNode", treeNode);
    },
    dropDataHandle(currentNode, dropNode) {
      //放置时数据处理
      currentNode.data._parentTreeId = dropNode.data._treeId;
    },
    allowDrop(draggingNode, dropNode, type) {
      //判断节点是否能放置
      if (type != "inner" && dropNode.data._treeId == "-1") {
        return false;
      } else if (
        type == "inner" &&
        !dropNode.data._is_group &&
        dropNode.data._treeId != "-1"
      ) {
        return false;
      } else {
        return true;
      }
    },
    editLayerCatalogue() {
      //编辑图层目录
      var node = this.currentLayerTreeNode;
      if (!node || Object.keys(node).length == 0) {
        this.$message({
          message: this.$t("webAppBuilder.PleaseSelectANodeAndThenOperate"),
          type: "warning"
        });
        return false;
      }
      if (!node.data._is_group || node.data._is_group != "1") {
        this.$message({
          message: this.$t(
            "webAppBuilder.OnlyAddALayerDirectoryUnderLayerDirectory"
          ),
          type: "warning"
        });
        return false;
      }
      this.layerCataloguerInfo = {};
      this.layerCataloguerDialogStatus = "add";
      this.layerCataloguerDialogVisible = true;
    },
    layerCataloguerDialogClose() {
      //编辑图层目录关闭
      this.layerCataloguerDialogVisible = false;
    },
    layerNodeEditDialogClose() {
      //编辑图层属性关闭
      this.layerNodeEditDialogVisible = false;
    },
    saveLayerCataloguer(info) {
      //保存图层目录
      if (this.layerCataloguerDialogStatus == "add") {
        info._is_group = "1";
        info._icon = "compound_layer";
        info._treeId = guid();
        info._parentTreeId = this.currentLayerTreeNode.data._treeId;
        if (!this.currentLayerTreeNode.data.layer) {
          this.$set(this.currentLayerTreeNode.data, "layer", []);
        }
        this.currentLayerTreeNode.data.layer.push(info);
      } else {
        for (var i in this.layerCataloguerInfo) {
          this.cacheLayerCataloguerInfo[i] = this.layerCataloguerInfo[i];
        }
      }
      this.layerCataloguerDialogClose();
    },
    saveLayerNodeEdit() {
      //保存图层节点
      for (var i in this.layerNodeEditInfo) {
        this.cacheLayerNodeEditInfo[i] = this.layerNodeEditInfo[i];
      }
      this.layerNodeEditDialogClose();
    },
    save() {
      this.$emit("save", this.layerTree);
      this.handleClose();
    },
    foldAndUnfoldLayerTree(type) {
      //全展开、收起图层树
      var node = this.currentLayerTreeNode;
      if (!node || Object.keys(node).length == 0) {
        this.$message({
          message: this.$t("webAppBuilder.PleaseSelectANodeAndThenOperate"),
          type: "warning"
        });
        return false;
      }
      traversal([node], "childNodes", function(item) {
        item.expanded = type;
      });
    },
    foldAndUnfoldSelectedLayerTree(type) {
      //全展开、收起待选图层树
      var node = this.currentSelectedLayerTreeNode;
      if (!node || Object.keys(node).length == 0) {
        this.$message({
          message: this.$t("webAppBuilder.PleaseSelectANodeAndThenOperate"),
          type: "warning"
        });
        return false;
      }
      traversal([node], "childNodes", function(item) {
        item.expanded = type;
      });
    },
    resetAll() {
      this.category = "";
      this.categoryTree = [];
      this.resetServiceList();
    },
    resetServiceList() {
      this.serviceList = [];
      this.pageIndex = 1;
      this.pageSize = 3;
      this.total = 0;
      this.resetCurrentInfo();
    },
    resetCurrentInfo() {
      //每次选择服务置空
      this.selectedLayerTree = [];
      this.selectedLayerTreeFilterText = "";
      this.layerTreeFilterText = "";
      this.currentSelectedService = {};
      this.currentSelectedServiceName = "";
      this.currentSelectedLayerTreeNode = {};
    }
  }
};
</script>

<style lang='scss' scoped>
.layer-manage-dialog {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .dialog-title {
    padding-bottom: 20px;
    border-bottom: 1px solid #ebeef5;
    span {
      padding-bottom: 18px;
    }
  } //下拉框
  .select-input-area {
    margin-bottom: 20px;
    .service-category-input {
      width: 300px;
      float: left;
      /deep/.el-input__inner {
        border-top-left-radius: 4px;
        border-top-right-radius: 0px;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 0px;
      }
    }
    .service-list-input {
      height: 38px;
      line-height: 38px;
      padding-left: 15px;
      margin-left: 300px;
      border-top-right-radius: 4px;
      border-bottom-right-radius: 4px;
      color: #606266;
      font-size: 14px;
      cursor: pointer;
      outline: 0;
      position: relative;
      transition: border-color 0.4s;
      .placeholder-font {
        color: #c8cbd2;
      }
      .arrow-icon {
        display: inline-block;
        width: 14px;
        height: 14px;
        position: absolute;
        top: 0;
        right: 8px;
        bottom: 0;
        margin: auto;
        transition: transform 0.3s;
        transform: rotateZ(180deg);
      }
    }
    .service-list-input-no-active {
      border-top: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      border-bottom: 1px solid #dcdfe6;
      &:hover {
        border-color: #c0c4cc;
      }
    }
    .service-list-input-is-active {
      .arrow-icon {
        transform: rotateZ(0);
      }
    }
  }
  //图层选择区域
  .layer-operate-area {
    .el-col {
      min-height: 400px;
    }
    //公共树
    .common-layer-tree-container {
      .btn-group-area {
        margin-bottom: 10px;
        .el-button-group {
          margin-right: 10px;
          .el-button {
            width: 40px;
            height: 34px;
            color: #fff;
            padding: 0;
            text-align: center;
          }
        }
      }
      .search-area {
        .el-input {
          /deep/.el-input__inner {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        }
      }
      .tree-area {
        border: 1px solid #dcdfe6;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        border-top: none;
        height: 300px;
        .scroll {
          height: 100%;
        }
        /deep/ .el-scrollbar .el-scrollbar__wrap {
          overflow-x: hidden;
        }
        .tree-select-area {
          width: 98%;
          margin: 0 auto;
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
      }
    }
    .layer-desc {
      color: #3691e9;
      position: relative;
      i {
        font-size: 24px;
        display: inline-block;
        width: 24px;
        height: 24px;
        position: absolute;
        top: -25px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
      span {
        font-size: 14px;
        display: inline-block;
        width: 100%;
        height: 14px;
        text-align: center;
        position: absolute;
        top: 25px;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
      }
    }
  }
}
//服务列表下拉
.service-list-pop {
  .title {
    height: 42px;
    line-height: 42px;
    border-bottom: 1px solid #ebeef5;
    .title-font {
      color: #242424;
      border-bottom: 2px solid #3691e9;
      font-size: 14px;
      padding-bottom: 10px;
    }
    .el-input {
      /deep/ .el-input__inner {
        height: 36px;
      }
    }
    // .el-input {
    //   width: 300px;
    //   float: right;
    //   /deep/ .el-input__inner {
    //     height: 36px;
    //     width: 300px;
    //   }
    // }
  }
  .layer-manage-pagination {
    margin-top: 10px;
  }
}
.root-hide {
  visibility: hidden;
}
</style>

<style lang="scss">
.service-list-pop {
  //服务连接失败的效果
  .warn-service {
    color: #f56c6c;
  }
}
</style>
