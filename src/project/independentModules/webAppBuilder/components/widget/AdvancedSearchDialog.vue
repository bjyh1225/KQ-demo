<template>
  <div class="layer-manage-dialog">
    <el-dialog
      :visible.sync="dialogVisible"
      width="1000px"
      :before-close="handleClose"
      :modal-append-to-body="false"
      :custom-class="'layer-cataloguer-dialog-pop'"
      :close-on-click-modal="false"
    >
      <template slot="title">
        <div class="dialog-title">
          <span>{{$t('webAppBuilder.CustomizeAdvancedQuery')}}</span>
        </div>
      </template>
      <el-row class="dialog-body">
        <el-col :span="8" class="dialog-body-col tree-area">
          <el-scrollbar class="scroll">
            <el-tree
              class="tab-layer-tree common-layer-manage-tree"
              :data="layerTreeAll"
              :props="defaultProps"
              :highlight-current="true"
              :default-expand-all="true"
              :expand-on-click-node="false"
              @node-click="handleNodeClick"
              :node-key="'treeId'"
            >
              <span class="custom-tree-node" slot-scope="{node}">
                <span
                  class="tree-node-label"
                  :title="node.label"
                  :style="'width:'+((320-node.level*16-42-24-22+14)<20?20:(320-node.level*16-42-24-22+14))+'px;'"
                >
                  <img
                    :src="'/thirdParty/kqwebmap/ftree/'+node.data._icon+'.png'"
                    class="node-icon-img"
                    v-if="node.data._icon"
                  />
                  <span>{{node.label}}</span>
                </span>
                <span v-if="node.data._set_status">
                  <el-button type="text" size="mini" class="el-icon-portal-xing tree-span-set-icon"></el-button>
                  <el-button
                    type="text"
                    size="mini"
                    class="el-icon-delete tree-span-del-icon"
                    @click.stop="deleteSet(node.data)"
                  ></el-button>
                </span>
              </span>
            </el-tree>
          </el-scrollbar>
        </el-col>
        <el-col :span="16" class="dialog-body-col form-area">
          <el-scrollbar class="scroll">
            <el-row class="table-area" v-if="isEditStatus&&setEdit">
              <el-col :span="12">
                <div class="table-title">{{$t('webAppBuilder.QueryField')}}：</div>
                <el-table
                  :data="searchFieldTableList"
                  height="250"
                  border
                  style="width: 100%"
                  @selection-change="searchSelectionChange"
                  ref="searchFieldTable"
                >
                  <el-table-column type="selection" min-width="5%"></el-table-column>
                  <el-table-column prop="fields" :label="$t('webAppBuilder.Field')" min-width="30%"></el-table-column>
                  <el-table-column
                    prop="fields_alias"
                    :label="$t('webAppBuilder.Alias')"
                    min-width="30%"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.fields_alias"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-col :span="12">
                <div class="table-title">{{$t('webAppBuilder.ReturnFields')}}：</div>
                <el-table
                  :data="returnFieldTableList"
                  height="250"
                  border
                  style="width: 100%"
                  @selection-change="returnSelectionChange"
                  ref="returnFieldTable"
                >
                  <el-table-column type="selection" min-width="5%"></el-table-column>
                  <el-table-column prop="fields" :label="$t('webAppBuilder.Field')" min-width="30%"></el-table-column>
                  <el-table-column
                    prop="fields_alias"
                    :label="$t('webAppBuilder.Alias')"
                    min-width="30%"
                  >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.fields_alias"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
            </el-row>
            <el-form
              :model="formInfo"
              :label-width="'150px'"
              v-show="isEditStatus&&setEdit"
              ref="advancedSearchForm"
              :rules="rules"
            >
              <el-form-item :label="$t('webAppBuilder.CountFields')+'：'">
                <el-select
                  multiple
                  v-model="formInfo.chart_field"
                  style="width:100%;"
                  :popper-class="'app-builer-select'"
                >
                  <el-option
                    v-for="item in statisticsFieldList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('webAppBuilder.SummarizeFields')+'：'">
                <el-select
                  multiple
                  v-model="formInfo.summary_field"
                  style="width:100%;"
                  :placeholder="$t('webAppBuilder.PleaseSelectANumericField')"
                  :popper-class="'app-builer-select'"
                >
                  <el-option
                    v-for="item in collectFieldList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('webAppBuilder.MaxNumberReturned')+'：'" prop="reqcount">
                <el-input-number v-model="formInfo.reqcount" :min="0" :max="10000"></el-input-number>
              </el-form-item>
            </el-form>
            <div v-show="!isEditStatus&&setEdit" class="no-edit">
              <i class="el-icon-portal-jinzhishezhi"></i>
              {{$t('webAppBuilder.CannotSetTheCurrentNode')}}
            </div>
            <div v-show="!setEdit" class="no-edit">{{$t('webAppBuilder.SelectTheLeftNodeToSet')}}</div>
          </el-scrollbar>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button class="base-white-btn" @click="handleClose">{{$t('webAppBuilder.Close')}}</el-button>
        <el-button type="primary" class="app-builder-btn" @click="addSet">{{$t('service.add')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { traversal } from "@/utils/traversal.js";
import { group } from "@/utils/group.js";
import guid from "@/utils/guid.js";
import { getTree } from "@/utils/getTree.js";
export default {
  name: "AdvancedSearchDialog",
  components: {},
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    layerTree: {
      type: Array,
      default: () => {
        return [];
      }
    },
    advancedSearchConfigJSON: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  watch: {
    dialogVisible() {
      if (this.dialogVisible) {
        this.reset();
        this.initAllData();
        this.getLayerTree();
      }
    }
  },
  data() {
    var checkReqcount = (rule, value, callback) => {
      if (!this.formInfo.reqcount && this.formInfo.reqcount != 0) {
        return callback(
          new Error(this.$t("webAppBuilder.EnterTheMaxNumberOfReturnedFields"))
        );
      } else {
        callback();
      }
    };
    return {
      layerTreeAll: [],
      tempLayerTreeAll: [], //临时树
      advancedSearchConfigMap: {}, //高级查询配置
      isEditStatus: true, //编辑状态
      setEdit: false, //设置编辑
      currentNodeData: {}, //当前节点数据
      defaultProps: {
        children: "layer",
        label: "_label"
      },
      formInfo: {
        chart_field: [],
        reqcount: 500,
        summary_field: []
      },
      searchFieldTableList: [], //查询字段
      returnFieldTableList: [], //返回字段
      statisticsFieldList: [], //统计字段
      collectFieldList: [], //汇总字段
      selectSearchFieldTableData: [], //查询字段表格选择的数据
      selectReturnFieldTableData: [], //查询字段表格选择的数据
      rules: {
        reqcount: [
          {
            required: true,
            validator: checkReqcount,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit("dialogClose");
    },
    save() {},
    getLayerTree() {
      //获取图层数据
      this.tempLayerTreeAll = JSON.parse(JSON.stringify(this.layerTree));
      var data = [];
      traversal(
        this.tempLayerTreeAll,
        "layer",
        (item, parent, params) => {
          if (
            this.advancedSearchConfigMap[
              item._src_name +
                item._id +
                "_" +
                item._parentLayerId +
                "_" +
                item._parentTreeId +
                "_" +
                item._combined_parentTreeId
            ]
          ) {
            item._set_status = true;
          } else {
            item._set_status = false;
          }
          if (item._is_combined_parent == 1) {
            params.push(item);
          }
        },
        null,
        data
      );
      var groupResult = group({
        source: data,
        groupRules: "_src_name"
      });
      var serviceGroup = [];
      for (var i in groupResult) {
        var info = {
          url: i,
          layer: [],
          treeInfo: {},
          serviceInfo: {
            _src_name: groupResult[i][0]._src_name,
            _service_type: groupResult[i][0]._service_type,
            _service_name: groupResult[i][0]._service_name,
            _service_id: groupResult[i][0]._service_id
          }
        };
        groupResult[i].forEach(item => {
          if (info.layer.indexOf(item._id) < 0) {
            info.layer.push(item._id);
          }
          if (!info.treeInfo[item._id.toString()]) {
            info.treeInfo[item._id.toString()] = [];
          }
          info.treeInfo[item._id.toString()].push(item._treeId);
        });
        serviceGroup.push(info);
      }
      if (serviceGroup.length > 0) {
        this.getCombinedLayerChild(serviceGroup);
      } else {
        this.layerTreeAll = JSON.parse(JSON.stringify(this.tempLayerTreeAll));
      }
    },
    getCombinedLayerChild(data) {
      //查询融合图层的子图层
      this.$api.webAppBuilderApi
        .selectAllLayerData(
          {
            requestParams: JSON.stringify(data)
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
            if (typeof data === "object" && data instanceof Array) {
              var allChildrentLayer = [];
              data.forEach(item => {
                var layerResult = JSON.parse(item.result);
                traversal(
                  layerResult.layers,
                  "subLayers",
                  (current, parent, params) => {
                    if (parent != "root") {
                      if (
                        params.treeInfo[current.parentLayerId] instanceof Array
                      ) {
                        for (
                          var i = 0;
                          i < params.treeInfo[current.parentLayerId].length;
                          i++
                        ) {
                          var tempItem = {
                            _id: current.id,
                            _label: current.name,
                            _src_name: params.serviceInfo._src_name,
                            _parentLayerId: current.parentLayerId,
                            _opacity: 1,
                            _icon:
                              current.shapeType == "polyline"
                                ? "line"
                                : current.shapeType,
                            _type: current.layerType,
                            _visible: "0",
                            _is_dynamic: Number(current.isDynamic),
                            _service_type: params.serviceInfo._service_type,
                            _service_name: params.serviceInfo._service_name,
                            _is_mini: "0",
                            _service_id: params.serviceInfo._service_id,
                            _combined_parentTreeId:
                              params.treeInfo[current.parentLayerId][i]
                          };
                          if (current.compositeLayer === true) {
                            if (
                              current.combined === true &&
                              current.parentCombined === false
                            ) {
                              tempItem["_icon"] = "compound_layer";
                              tempItem._is_combined_parent = 1;
                            } else {
                              tempItem["_is_group"] = "1";
                              tempItem["_icon"] = "compound_layer";
                            }
                          }
                          if (current.parentCombined == true) {
                            tempItem._is_combined_children = 1;
                          }
                          tempItem._set_status = false;
                          tempItem._treeId = guid();
                          if (parent._treeId) {
                            tempItem._parentTreeId = parent._treeId;
                          } else {
                            tempItem._parentTreeId =
                              params.treeInfo[current.parentLayerId][i];
                          }
                          if (
                            this.advancedSearchConfigMap[
                              tempItem._src_name +
                                tempItem._id +
                                "_" +
                                tempItem._parentLayerId +
                                "_" +
                                tempItem._parentTreeId +
                                "_" +
                                tempItem._combined_parentTreeId
                            ]
                          ) {
                            tempItem._set_status = true;
                          }
                          params.allChildrentLayer.push(tempItem);
                        }
                      }
                    }
                  },
                  null,
                  {
                    allChildrentLayer: allChildrentLayer,
                    treeInfo: item.treeInfo,
                    serviceInfo: item.serviceInfo
                  }
                );
              });
              var allChildrentLayerTree = getTree(
                allChildrentLayer,
                "_treeId",
                "_parentTreeId",
                "layer"
              );
              traversal(
                this.tempLayerTreeAll,
                "layer",
                function(current, parent, allChildrentLayerTree) {
                  if (current._is_combined_parent == 1) {
                    var currentChild = allChildrentLayerTree.filter(item => {
                      return item._parentTreeId == current._treeId;
                    });
                    current.layer = currentChild;
                  }
                },
                null,
                allChildrentLayerTree
              );
              this.layerTreeAll = this.tempLayerTreeAll;
            } else {
              if (data.resultcode && data.resultcode == "error") {
                this.$message({
                  message: this.$t(
                    "webAppBuilder.FailedToQueryLayerInformation"
                  ),
                  type: "error"
                });
                return false;
              }
            }
          } else {
            this.$message({
              message: this.$t(
                "webAppBuilder.LayerUnableToParseLayerInformation"
              ),
              type: "error"
            });
            return false;
          }
        })
        .catch(() => {});
    },
    handleNodeClick(data) {
      this.setEdit = true;
       if(data._service_type!='kqmapping'){
        this.isEditStatus = false;
        return false;
      }else{
      
      if (
        data._is_group != 1 &&
        data._is_combined_parent != 1 &&
        data._type != "yx"
      ) {
        this.isEditStatus = true;
        var url = data._src_name + "/" + data._id;
        this.getLayerFields(url);
        this.currentNodeData = data;
      } else {
        this.isEditStatus = false;
      }
      }
    },
    getLayerFields(url) {
      this.resetForm();
      this.$api.webAppBuilderApi
        .selectLayerData(
          {
            url: url
          },
          {
            loadingText: this.$t("service.searching"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          var data = res.data.data;
          if(Array.isArray(data)&&data.length>0){
            var fields=data[0].fields;
            var fieldTableList = [];
            var fieldSelectList = [];
            var temp = {
              fields: "",
              fields_alias: ""
            };
            for (var i = 0; i < fields.length; i++) {
              if (i % 2 != 0) {
                temp.fields_alias = fields[i];
                fieldTableList.push(JSON.parse(JSON.stringify(temp)));
              } else {
                temp.fields = fields[i];
                fieldSelectList.push({ key: fields[i], value: fields[i] });
              }
            }
            this.searchFieldTableList = JSON.parse(
              JSON.stringify(fieldTableList)
            );
            this.returnFieldTableList = JSON.parse(
              JSON.stringify(fieldTableList)
            );
            this.statisticsFieldList = JSON.parse(
              JSON.stringify(fieldSelectList)
            );
            this.collectFieldList = JSON.parse(JSON.stringify(fieldSelectList));
            if (
              this.currentNodeData._set_status &&
              this.advancedSearchConfigMap[
                this.currentNodeData._src_name +
                  this.currentNodeData._id +
                  "_" +
                  this.currentNodeData._parentLayerId +
                  "_" +
                  this.currentNodeData._parentTreeId +
                  "_" +
                  this.currentNodeData._combined_parentTreeId
              ]
            ) {
              this.initForm(
                this.advancedSearchConfigMap[
                  this.currentNodeData._src_name +
                    this.currentNodeData._id +
                    "_" +
                    this.currentNodeData._parentLayerId +
                    "_" +
                    this.currentNodeData._parentTreeId +
                    "_" +
                    this.currentNodeData._combined_parentTreeId
                ]
              );
            }
          }
          else{
            this.$message({
              message: this.$t("webAppBuilder.FailedToQueryLayerInformation"),
              type: "error"
            });
            return false;
          }
          /*
          if (typeof data === "string") {
            var r = JSON.parse(data);
            if (r.resultcode && r.resultcode == "error") {
              this.$message({
                message: this.$t("webAppBuilder.FailedToQueryLayerInformation"),
                type: "error"
              });
              return false;
            }
          } else {
            var fields = data.fields;
            var fieldTableList = [];
            var fieldSelectList = [];
            var temp = {
              fields: "",
              fields_alias: ""
            };
            for (var i = 0; i < fields.length; i++) {
              if (i % 2 != 0) {
                temp.fields_alias = fields[i];
                fieldTableList.push(JSON.parse(JSON.stringify(temp)));
              } else {
                temp.fields = fields[i];
                fieldSelectList.push({ key: fields[i], value: fields[i] });
              }
            }
            this.searchFieldTableList = JSON.parse(
              JSON.stringify(fieldTableList)
            );
            this.returnFieldTableList = JSON.parse(
              JSON.stringify(fieldTableList)
            );
            this.statisticsFieldList = JSON.parse(
              JSON.stringify(fieldSelectList)
            );
            this.collectFieldList = JSON.parse(JSON.stringify(fieldSelectList));
            if (
              this.currentNodeData._set_status &&
              this.advancedSearchConfigMap[
                this.currentNodeData._src_name +
                  this.currentNodeData._id +
                  "_" +
                  this.currentNodeData._parentLayerId +
                  "_" +
                  this.currentNodeData._parentTreeId +
                  "_" +
                  this.currentNodeData._combined_parentTreeId
              ]
            ) {
              this.initForm(
                this.advancedSearchConfigMap[
                  this.currentNodeData._src_name +
                    this.currentNodeData._id +
                    "_" +
                    this.currentNodeData._parentLayerId +
                    "_" +
                    this.currentNodeData._parentTreeId +
                    "_" +
                    this.currentNodeData._combined_parentTreeId
                ]
              );
            }
          }*/
        })
        .catch(() => {});
    },
    searchSelectionChange(data) {
      this.selectSearchFieldTableData = data;
    },
    returnSelectionChange(data) {
      this.selectReturnFieldTableData = data;
    },
    addSet() {
      if (!this.setEdit) {
        this.$message({
          message: this.$t("webAppBuilder.SelectNodeSettingsClickToAdd"),
          type: "warning"
        });
        return false;
      }
      if (!this.isEditStatus) {
        this.$message({
          message: this.$t("webAppBuilder.CannotSetUnablePerformAdd"),
          type: "warning"
        });
        return false;
      }
      this.$refs.advancedSearchForm.validate(valid => {
        if (valid) {
          if (this.selectSearchFieldTableData.length == 0) {
            this.$message({
              message: this.$t("webAppBuilder.SelectQueryField"),
              type: "warning"
            });
            return false;
          }
          if (this.selectReturnFieldTableData.length == 0) {
            this.$message({
              message: this.$t("webAppBuilder.SelectReturnField"),
              type: "warning"
            });
            return false;
          }
          this.saveSet();
        } else {
          return false;
        }
      });
    },
    saveSet() {
      if (!this.advancedSearchConfigJSON.config) {
        this.advancedSearchConfigJSON.config = {};
        this.advancedSearchConfigJSON.config.layers = {};
        this.advancedSearchConfigJSON.config.layers.layer = [];
      }
      //查询字段和返回字段
      var search_fields = [];
      var search_fields_alias = [];
      var return_fields = [];
      var return_fields_alias = [];
      this.selectSearchFieldTableData.forEach(item => {
        search_fields.push(item.fields);
        search_fields_alias.push(item.fields_alias);
      });
      this.selectReturnFieldTableData.forEach(item => {
        return_fields.push(item.fields);
        return_fields_alias.push(item.fields_alias);
      });
      //如果是融合图层，id取父图层id
      var data = {
        _src_name: this.currentNodeData._src_name,
        _label: this.currentNodeData._label,
        _query_id: this.currentNodeData._id,
        _id:
          this.currentNodeData._is_combined_children == 1
            ? this.currentNodeData._parentLayerId
            : this.currentNodeData._id,
        _parentTreeId: this.currentNodeData._parentTreeId,
        _currentLayerId: this.currentNodeData._id,
        _parentLayerId: this.currentNodeData._parentLayerId,
        _combined_parentTreeId: this.currentNodeData._combined_parentTreeId,
        list_fields: {
          __text: search_fields.toString()
        },
        list_fields_alias: {
          __text: search_fields_alias.toString()
        },
        fields: {
          __text: return_fields.toString()
        },
        fields_alias: {
          __text: return_fields_alias.toString()
        },
        chart_field: {
          __text: this.formInfo.chart_field.join("|")
        },
        summary_field: {
          __text: this.formInfo.summary_field.join("|")
        },
        reqcount: {
          __text: this.formInfo.reqcount
        },
        expression: {
          __text: ""
        }
      };
      if (
        this.advancedSearchConfigMap[
          data._src_name +
            data._currentLayerId +
            "_" +
            data._parentLayerId +
            "_" +
            data._parentTreeId +
            "_" +
            data._combined_parentTreeId
        ]
      ) {
        this.advancedSearchConfigJSON.config.layers.layer[
          this.advancedSearchConfigMap[
            data._src_name +
              data._currentLayerId +
              "_" +
              data._parentLayerId +
              "_" +
              data._parentTreeId +
              "_" +
              data._combined_parentTreeId
          ].index
        ] = JSON.parse(JSON.stringify(data));
      } else {
        this.advancedSearchConfigJSON.config.layers.layer.push(
          JSON.parse(JSON.stringify(data))
        );
        data.index =
          this.advancedSearchConfigJSON.config.layers.layer.length - 1;
        this.advancedSearchConfigMap[
          data._src_name +
            data._currentLayerId +
            "_" +
            data._parentLayerId +
            "_" +
            data._parentTreeId +
            "_" +
            data._combined_parentTreeId
        ] = data;
      }
      this.currentNodeData._set_status = true;
      this.layerTreeAll = JSON.parse(JSON.stringify(this.layerTreeAll));
      this.$message({
        message: this.$t("webAppBuilder.AddedSuccessfully"),
        type: "success"
      });
      this.setEdit = false;
      this.resetForm();
      this.$emit("advancedSearchChange");
    },
    deleteSet(data) {
      //删除配置
      if (
        this.advancedSearchConfigMap[
          data._src_name +
            data._id +
            "_" +
            data._parentLayerId +
            "_" +
            data._parentTreeId +
            "_" +
            data._combined_parentTreeId
        ]
      ) {
        var index = this.advancedSearchConfigMap[
          data._src_name +
            data._id +
            "_" +
            data._parentLayerId +
            "_" +
            data._parentTreeId +
            "_" +
            data._combined_parentTreeId
        ].index;
        this.advancedSearchConfigJSON.config.layers.layer.splice(index, 1);
        this.advancedSearchConfigMap[
          data._src_name +
            data._id +
            "_" +
            data._parentLayerId +
            "_" +
            data._parentTreeId +
            "_" +
            data._combined_parentTreeId
        ] = null;
        if (data._treeId == this.currentNodeData._treeId) {
          this.setEdit = false;
        }
        // data._set_status=false;
        this.$set(data, "_set_status", false);
        this.$message({
          message: this.$t("management.Deletesuccessful"),
          type: "success"
        });
        this.$emit("advancedSearchChange");
      }
    },
    initAllData() {
      //初始化数据
      if (this.advancedSearchConfigJSON.config) {
        var advancedSearchData = this.advancedSearchConfigJSON.config.layers
          .layer;
        advancedSearchData.forEach((item, ix) => {
          item.index = ix;
          this.advancedSearchConfigMap[
            item._src_name +
              item._currentLayerId +
              "_" +
              item._parentLayerId +
              "_" +
              item._parentTreeId +
              "_" +
              item._combined_parentTreeId
          ] = JSON.parse(JSON.stringify(item));
        });
      }
    },
    initForm(info) {
      if (info.reqcount.__text) {
        this.formInfo.reqcount = info.reqcount.__text;
      }
      if (info.chart_field.__text) {
        this.formInfo.chart_field = info.chart_field.__text.split("|");
      }
      if (info.summary_field.__text) {
        this.formInfo.summary_field = info.summary_field.__text.split("|");
      }
      this.$nextTick(() => {
        if (info.list_fields.__text) {
          var fields = info.list_fields.__text.split(",");
          var fields_alias = info.list_fields_alias.__text.split(",");
          this.searchFieldTableList.forEach(item => {
            if (fields.indexOf(item.fields) > -1) {
              item.fields_alias = fields_alias[fields.indexOf(item.fields)];
              this.$refs.searchFieldTable.toggleRowSelection(item, true);
            }
          });
        }
        if (info.fields.__text) {
          // eslint-disable-next-line
          var fields = info.fields.__text.split(",");
          // eslint-disable-next-line
          var fields_alias = info.fields_alias.__text.split(",");
          this.returnFieldTableList.forEach(item => {
            if (fields.indexOf(item.fields) > -1) {
              item.fields_alias = fields_alias[fields.indexOf(item.fields)];
              this.$refs.returnFieldTable.toggleRowSelection(item, true);
            }
          });
        }
      });
    },
    reset() {
      this.tempLayerTreeAll = [];
      this.layerTreeAll = [];
      this.setEdit = false;
      this.resetForm();
    },
    resetForm() {
      if (
        this.$refs.advancedSearchForm &&
        this.$refs.advancedSearchForm.clearValidate
      ) {
        this.$refs.advancedSearchForm.clearValidate();
      }
      this.searchFieldTableList = [];
      this.returnFieldTableList = [];
      this.statisticsFieldList = [];
      this.collectFieldList = [];
      this.selectSearchFieldTableData = [];
      this.selectReturnFieldTableData = [];
      this.formInfo = {
        chart_field: [],
        reqcount: 500,
        summary_field: []
      };
    }
  }
};
</script>

<style lang='scss' scoped>
.layer-manage-dialog {
  /deep/.el-dialog__body {
    padding: 0px 20px 10px 20px;
  }
  /deep/ .el-dialog__header {
    padding: 20px 20px 0px;
  }
  .dialog-title {
    padding-bottom: 20px;
    border-bottom: 1px solid #ebeef5;
    span {
      padding-bottom: 18px;
    }
  }
  .dialog-body {
    border-bottom: 1px solid #ebeef5;
    .dialog-body-col {
      height: 430px;
      .scroll {
        height: 100%;
      }
      /deep/ .el-scrollbar .el-scrollbar__wrap {
        overflow-x: hidden;
      }
    }
    .tree-area {
      border-right: 1px solid #ebeef5;
      padding: 5px;
    }
    .form-area {
      padding: 5px 0 5px 5px;
      .table-area {
        margin-bottom: 20px;
        margin-top: 10px;
        padding-left: 10px;
        padding-right: 15px;
        .el-col:nth-child(1) {
          padding-right: 10px;
        }
        .el-col:nth-child(2) {
          padding-left: 10px;
        }
        .table-title {
          height: 24px;
          line-height: 24px;
        }
      }
      .el-form {
        padding-right: 15px;
      }
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

.no-edit {
  height: 420px;
  text-align: center;
  line-height: 420px;
  font-size: 14px;
}
//五角星颜色
.tree-span-set-icon {
  color: #ffca28;
  cursor: default;
}
.tree-span-del-icon {
  color: #f56c6c;
  &:hover {
    color: rgba(245, 108, 108, 0.8);
  }
}
</style>

