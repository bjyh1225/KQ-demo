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
          <span>{{$t('webAppBuilder.CustomizeAttributeQuery')}}</span>
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
            <el-form
              :model="formInfo"
              :label-width="'150px'"
              v-if="isEditStatus&&setEdit"
              ref="infoQueryForm"
              :rules="rules"
            >
              <el-form-item
                :label="$t('webAppBuilder.QueryField')
              +'：'"
                prop="searchField"
              >
                <el-table
                  :data="fieldTableList"
                  height="250"
                  border
                  style="width: 100%"
                  @selection-change="selectionChange"
                  ref="fieldTable"
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
              </el-form-item>
              <el-form-item :label="$t('webAppBuilder.DisplayField')+'：'" prop="showName">
                <el-select
                  v-model="formInfo.show_name"
                  style="width:100%;"
                  :popper-class="'app-builer-select'"
                >
                  <el-option v-for="item in fieldList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('webAppBuilder.QueryMode')+'：'" prop="queryMode">
                <el-radio-group v-model="formInfo._query_mode">
                  <el-radio label="single">{{$t('webAppBuilder.SinglelayerQuery')}}</el-radio>
                  <el-radio label="multi">{{$t('webAppBuilder.MultilayerQuery')}}</el-radio>
                </el-radio-group>
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
  name: "InfoQueryDialog",
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
    infoQueryConfigJSON: {
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
    var checkSearchField = (rule, value, callback) => {
      if (this.selectTableData.length == 0) {
        return callback(new Error(this.$t("webAppBuilder.TickQueryField")));
      } else {
        callback();
      }
    };
    var checkQueryMode = (rule, value, callback) => {
      if (!this.formInfo._query_mode) {
        return callback(new Error(this.$t("webAppBuilder.SelectQueryMode")));
      } else {
        callback();
      }
    };
    var checkShowName = (rule, value, callback) => {
      if (!this.formInfo.show_name) {
        return callback(new Error(this.$t("webAppBuilder.SelectDisplayField")));
      } else {
        callback();
      }
    };
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
      infoQueryConfigMap: {}, //属性查询配置
      defaultProps: {
        children: "layer",
        label: "_label"
      },
      formInfo: {
        _query_mode: "single",
        reqcount: 500,
        show_name: ""
      },
      fieldTableList: [],
      fieldList: [], //显示字段列表
      selectTableData: [], //表格选择的数据
      isEditStatus: true, //编辑状态
      currentNodeData: {}, //当前节点数据
      setEdit: false, //设置编辑
      rules: {
        searchField: [
          {
            required: true,
            validator: checkSearchField,
            trigger: "blur"
          }
        ],
        showName: [
          {
            required: true,
            validator: checkShowName,
            trigger: "blur"
          }
        ],
        queryMode: [
          {
            required: true,
            validator: checkQueryMode,
            trigger: "blur"
          }
        ],
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
    getLayerTree() {
      //获取图层数据
      this.tempLayerTreeAll = JSON.parse(JSON.stringify(this.layerTree));
      var data = [];
      traversal(
        this.tempLayerTreeAll,
        "layer",
        (item, parent, params) => {
          if (
            this.infoQueryConfigMap[
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
                            this.infoQueryConfigMap[
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
      //树节点点击
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
            var temp = {
              fields: "",
              fields_alias: ""
            };
            for (var i = 0; i < fields.length; i++) {
              if (i % 2 != 0) {
                temp.fields_alias = fields[i];
                this.fieldTableList.push(JSON.parse(JSON.stringify(temp)));
              } else {
                temp.fields = fields[i];
                this.fieldList.push(fields[i]);
              }
            }
            if (
              this.currentNodeData._set_status &&
              this.infoQueryConfigMap[
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
                this.infoQueryConfigMap[
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
            var temp = {
              fields: "",
              fields_alias: ""
            };
            for (var i = 0; i < fields.length; i++) {
              if (i % 2 != 0) {
                temp.fields_alias = fields[i];
                this.fieldTableList.push(JSON.parse(JSON.stringify(temp)));
              } else {
                temp.fields = fields[i];
                this.fieldList.push(fields[i]);
              }
            }
            if (
              this.currentNodeData._set_status &&
              this.infoQueryConfigMap[
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
                this.infoQueryConfigMap[
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
    selectionChange(data) {
      this.selectTableData = data;
    },
    addSet() {
      //添加设置
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
      this.$refs.infoQueryForm.validate(valid => {
        if (valid) {
          this.saveSet();
        } else {
          return false;
        }
      });
    },
    saveSet() {
      if (!this.infoQueryConfigJSON.config) {
        this.infoQueryConfigJSON.config = {};
        this.infoQueryConfigJSON.config.layers = {};
        this.infoQueryConfigJSON.config.layers.layer = [];
      }
      var fields = [];
      var fields_alias = [];
      this.selectTableData.forEach(item => {
        fields.push(item.fields);
        fields_alias.push(item.fields_alias);
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
        fields: {
          __text: fields.toString()
        },
        fields_alias: {
          __text: fields_alias.toString()
        },
        show_name: {
          __text: this.formInfo.show_name
        },
        reqcount: {
          __text: this.formInfo.reqcount
        },
        expression: {
          __text: ""
        }
      };
      this.infoQueryConfigJSON.config._query_mode = this.formInfo._query_mode;
      if (
        this.infoQueryConfigMap[
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
        this.infoQueryConfigJSON.config.layers.layer[
          this.infoQueryConfigMap[
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
        this.infoQueryConfigJSON.config.layers.layer.push(
          JSON.parse(JSON.stringify(data))
        );
        data.index = this.infoQueryConfigJSON.config.layers.layer.length - 1;
        this.infoQueryConfigMap[
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
      this.$emit("infoQueryChange");
    },
    deleteSet(data) {
      //删除配置
      if (
        this.infoQueryConfigMap[
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
        var index = this.infoQueryConfigMap[
          data._src_name +
            data._id +
            "_" +
            data._parentLayerId +
            "_" +
            data._parentTreeId +
            "_" +
            data._combined_parentTreeId
        ].index;
        this.infoQueryConfigJSON.config.layers.layer.splice(index, 1);
        this.infoQueryConfigMap[
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
        this.$emit("infoQueryChange");
      }
    },
    initAllData() {
      //初始化数据
      if (this.infoQueryConfigJSON.config) {
        var infoQueryData = this.infoQueryConfigJSON.config.layers.layer;
        infoQueryData.forEach((item, ix) => {
          item.index = ix;
          this.infoQueryConfigMap[
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
      //初始化form
      if (info.reqcount.__text) {
        this.formInfo.reqcount = info.reqcount.__text;
      }
      if (info.show_name.__text) {
        this.formInfo.show_name = info.show_name.__text;
      }
      if (this.infoQueryConfigJSON.config._query_mode) {
        this.formInfo._query_mode = this.infoQueryConfigJSON.config._query_mode;
      }
      if (info.fields.__text) {
        var fields = info.fields.__text.split(",");
        var fields_alias = info.fields_alias.__text.split(",");
        this.fieldTableList.forEach(item => {
          if (fields.indexOf(item.fields) > -1) {
            item.fields_alias = fields_alias[fields.indexOf(item.fields)];
            this.$refs.fieldTable.toggleRowSelection(item, true);
          }
        });
      }
    },
    reset() {
      this.tempLayerTreeAll = [];
      this.layerTreeAll = [];
      this.setEdit = false;
      this.resetForm();
    },
    resetForm() {
      if (this.$refs.infoQueryForm && this.$refs.infoQueryForm.clearValidate) {
        this.$refs.infoQueryForm.clearValidate();
      }
      this.fieldTableList = [];
      this.fieldList = [];
      this.selectTableData = [];
      this.formInfo = {
        _query_mode: "single",
        reqcount: 500,
        show_name: ""
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

