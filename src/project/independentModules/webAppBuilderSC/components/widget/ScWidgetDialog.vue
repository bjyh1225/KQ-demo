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
          <span>{{dialogTitle}}</span>
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
              ref="dialogForm"
              :rules="rules"
              v-if="isEditStatus&&setEdit"
            >
              <el-form-item :label="$t('webAppBuilder.Yearoptions')+'：'" prop="yearField" v-if="showList.indexOf('year')>-1">
                <el-select
                  v-model="formInfo._portal_yearfield"
                  style="width:100%;"
                  :popper-class="'app-builer-select'"
                >
                  <el-option v-for="item in yearList" :key="item" :label="item" :value="item"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item :label="$t('webAppBuilder.Detailedfield')+'：'" prop="field" v-if="showList.indexOf('fields')>-1">
                <el-table
                  :data="fieldTableList"
                  height="250"
                  border
                  style="width: 100%"
                  @selection-change="fieldSelectionChange"
                  ref="fieldTable"
                >
                  <el-table-column type="selection" min-width="5%"></el-table-column>
                  <el-table-column prop="fields" :label="$t('webAppBuilder.Detailedfield')" min-width="30%"></el-table-column>
                  <el-table-column prop="fields_alias" :label="$t('webAppBuilder.Detailedfieldalias')" min-width="30%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.fields_alias"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
              <el-form-item
                :label="$t('webAppBuilder.SummarizeFields')+'：'"
                prop="summaryField"
                v-if="showList.indexOf('summary')>-1"
              >
                <el-table
                  :data="fieldSummaryTableList"
                  height="250"
                  border
                  style="width: 100%"
                  @selection-change="fieldSummarySelectionChange"
                  ref="fieldSummaryTable"
                >
                  <el-table-column type="selection" min-width="5%"></el-table-column>
                  <el-table-column
                    prop="fields"
                    :label="$t('webAppBuilder.SummarizeFields')+'：'"
                    min-width="30%"
                  ></el-table-column>
                  <el-table-column prop="fields_alias" :label="$t('webAppBuilder.Summaryfiledalias')" min-width="30%">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.fields_alias"></el-input>
                    </template>
                  </el-table-column>
                </el-table>
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
        <el-button class="base-white-btn" @click="handleClose">{{$t('myCenter.cancel')}}</el-button>
        <el-button type="primary" class="app-builder-btn" @click="addSet">{{$t('myCenter.Sure')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { traversal } from "@/utils/traversal.js";
// import { group } from "@/utils/group.js";
// import guid from "@/utils/guid.js";
// import { getTree } from "@/utils/getTree.js";
import { getLayerTree, setEditStatus } from "./getLayerTree.js";
export default {
  name: "ScWidgetDialog",
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
    allLayerConfigJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    dialogConfig: {
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
        this.initTree();
      }
    }
  },
  data() {
    var checkYearField = (rule, value, callback) => {
      if (!this.formInfo._portal_yearfield) {
        return callback(new Error(this.$t('webAppBuilder.Pleasechooseyear')));
      } else {
        callback();
      }
    };
    var checkField = (rule, value, callback) => {
      if (this.selectFieldsTableData.length == 0) {
        return callback(new Error(this.$t('webAppBuilder.Pleasechoosedetailedfield')));
      } else {
        callback();
      }
    };
    var checkSummaryField = (rule, value, callback) => {
      if (this.selectFieldsSummaryTableData.length == 0) {
        return callback(new Error(this.$t('webAppBuilder.Pleasechoosesummaryfield')));
      } else {
        callback();
      }
    };
    return {
      layerTreeAll: [],
      layerConfigMap: {}, //属性查询配置
      defaultProps: {
        children: "layer",
        label: "_label"
      },
      formInfo: {
        _portal_yearfield: "2017"
      },
      fieldTableList: [], //表格字段列表
      fieldSummaryTableList: [], //表格字段列表
      yearList: ["2017", "2018"], //年份列表字段
      selectFieldsTableData: [], //表格选择的数据
      selectFieldsSummaryTableData: [], //表格选择的数据
      isEditStatus: true, //编辑状态
      currentNodeData: {}, //当前节点数据
      setEdit: false, //设置编辑
      rules: {
        yearField: [
          {
            required: true,
            validator: checkYearField,
            trigger: "change"
          }
        ],
        field: [
          {
            required: true,
            validator: checkField,
            trigger: "blur"
          }
        ],
        summaryField: [
          {
            required: true,
            validator: checkSummaryField,
            trigger: "blur"
          }
        ]
      },
      //弹出窗配置
      dialogTitle: "", //弹出窗标题
      showList: [] //显示列表
    };
  },
  methods: {
    reset() {
      this.layerTreeAll = [];
      this.layerConfigMap = {};
      this.setEdit = false;
      this.resetForm();
    },
    initTree() {
      let result = getLayerTree(this, this.layerTree, this.layerConfigMap);
      if (result && typeof result.then === "function") {
        result.then(res => {
          this.layerTreeAll = res;
        });
      } else {
        this.layerTreeAll = result;
      }
    },
    initAllData() {
      this.dialogTitle = this.dialogConfig.dialogTitle; //标题
      this.showList = this.dialogConfig.showList; //显示列表
      if (
        this.allLayerConfigJSON.config &&
        this.allLayerConfigJSON.config.groups
      ) {
        this.allLayerConfigJSON.config.groups.forEach(item => {
          if (item._name == this.dialogConfig.typeName) {
            let data = item.group;
            data.forEach(citem => {
              if (
                citem._name == this.dialogConfig.name ||
                (this.dialogConfig.name == "土地利用现状" &&
                  (citem._name == "土地利用现状17" ||
                    citem._name == "土地利用现状18"))
              ) {
                this.layerConfigMap[
                  citem.layer._src_name +
                    citem.layer._currentLayerId +
                    "_" +
                    citem.layer._parentLayerId +
                    "_" +
                    citem.layer._parentTreeId +
                    "_" +
                    citem.layer._combined_parentTreeId
                ] = JSON.parse(JSON.stringify(citem));
              }
            });
          }
        });
      }
    },
    handleClose() {
      this.$emit("dialogClose");
    },
    handleNodeClick(data) {
      //树节点点击
      this.setEdit = true;
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
    },
    getLayerFields(url) {
      this.resetForm();
      this.$api.webAppBuilderApi
        .selectLayerData(
          { url: url },
          {
            loadingText: this.$t("service.searching"),
            __LOGINTYPE: "dialog"
          }
        )
        .then(res => {
          var data = res.data.data;
          if(Array.isArray(data)&&data.length>0){
            var fields=data[0].fields;
            var tableField = [];
            var temp = {
              fields: "",
              fields_alias: ""
            };
            for (var i = 0; i < fields.length; i++) {
              if (i % 2 != 0) {
                temp.fields_alias = fields[i];
                tableField.push(JSON.parse(JSON.stringify(temp)));
              } else {
                temp.fields = fields[i];
              }
            }
            this.fieldTableList = JSON.parse(JSON.stringify(tableField));
            this.fieldSummaryTableList = JSON.parse(JSON.stringify(tableField));
            if (
              this.currentNodeData._set_status &&
              this.layerConfigMap[
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
                this.layerConfigMap[
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
            var tableField = [];
            var temp = {
              fields: "",
              fields_alias: ""
            };
            for (var i = 0; i < fields.length; i++) {
              if (i % 2 != 0) {
                temp.fields_alias = fields[i];
                tableField.push(JSON.parse(JSON.stringify(temp)));
              } else {
                temp.fields = fields[i];
              }
            }
            this.fieldTableList = JSON.parse(JSON.stringify(tableField));
            this.fieldSummaryTableList = JSON.parse(JSON.stringify(tableField));
            if (
              this.currentNodeData._set_status &&
              this.layerConfigMap[
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
                this.layerConfigMap[
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
    initForm(info) {
      this.$nextTick(() => {
        //初始化form
        if (info._year) {
          this.formInfo._portal_yearfield = info._year;
        }
        if (info.layer && info.layer.fields) {
          let fields = info.layer.fields.__text.split(",");
          let fields_alias = info.layer.fields_alias.__text.split(",");
          this.fieldTableList.forEach(item => {
            if (fields.indexOf(item.fields) > -1) {
              item.fields_alias = fields_alias[fields.indexOf(item.fields)];
              this.$refs.fieldTable.toggleRowSelection(item, true);
            }
          });
        }
        if (info.layer && info.layer.summary_fields) {
          let fields = info.layer.summary_fields.__text.split(",");
          let fields_alias = info.layer.summary_fieldsAlias.__text.split(",");
          this.fieldSummaryTableList.forEach(item => {
            if (fields.indexOf(item.fields) > -1) {
              item.fields_alias = fields_alias[fields.indexOf(item.fields)];
              this.$refs.fieldSummaryTable.toggleRowSelection(item, true);
            }
          });
        }
      });
    },
    resetForm() {
      if (this.$refs.dialogForm && this.$refs.dialogForm.clearValidate) {
        this.$refs.dialogForm.clearValidate();
      }
      this.fieldTableList = [];
      this.fieldSummaryTableList = [];
      this.selectFieldsTableData = [];
      this.selectFieldsSummaryTableData = [];
      this.formInfo = {
        _portal_yearfield: "2017"
      };
    },
    fieldSelectionChange(data) {
      this.selectFieldsTableData = data;
    },
    fieldSummarySelectionChange(data) {
      this.selectFieldsSummaryTableData = data;
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
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          this.saveSet();
        } else {
          return false;
        }
      });
    },
    saveSet() {
      var group = {};
      var typeStatus = false; //当前分类是否存在
      if (!this.allLayerConfigJSON.config) {
        this.allLayerConfigJSON.config = {};
        this.allLayerConfigJSON.config.groups = [];
      }
      //当前类型下的配置
      if (this.allLayerConfigJSON.config.groups.length > 0) {
        this.allLayerConfigJSON.config.groups.forEach(item => {
          if (item._name == this.dialogConfig.typeName) {
            typeStatus = true;
            group = item;
          }
        });
      }
      //基本数据
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
        _combined_parentTreeId: this.currentNodeData._combined_parentTreeId
      };
      //详情字段
      if (this.showList.indexOf("fields") > -1) {
        let fields = [];
        let fields_alias = [];
        this.selectFieldsTableData.forEach(item => {
          fields.push(item.fields);
          fields_alias.push(item.fields_alias);
        });
        data.fields = {
          __text: fields.toString()
        };
        data.fields_alias = {
          __text: fields_alias.toString()
        };
      }
      //汇总字段
      if (this.showList.indexOf("summary") > -1) {
        let summary_fields = [];
        let summary_fieldsAlias = [];
        this.selectFieldsSummaryTableData.forEach(item => {
          summary_fields.push(item.fields);
          summary_fieldsAlias.push(item.fields_alias);
        });
        data.summary_fields = {
          __text: summary_fields.toString()
        };
        data.summary_fieldsAlias = {
          __text: summary_fieldsAlias.toString()
        };
      }
      //拼最终数据
      var lastData = {
        layer: data,
        _type: this.dialogConfig.xmlType,
        _name: this.dialogConfig.name
      };
      if (this.dialogConfig.name == "土地利用现状") {
        let name = "";
        if (this.formInfo._portal_yearfield == "2017") {
          name = this.dialogConfig.name + "17";
        }
        if (this.formInfo._portal_yearfield == "2018") {
          name = this.dialogConfig.name + "18";
        }
        lastData._name = name;
        lastData._year = this.formInfo._portal_yearfield;
      }
      if (typeStatus && group.group) {
        //查看当前类型下的微件数据是否存在
        let setStatus = false;
        for (let i = 0; i < group.group.length; i++) {
          let item = group.group[i];
          if (
            item._name == this.dialogConfig.name ||
            (this.dialogConfig.name == "土地利用现状" &&
              (item._name == "土地利用现状17" ||
                item._name == "土地利用现状18"))
          ) {
            setStatus = true;
            group.group[i] = lastData;
          }
        }
        if (!setStatus) {
          group.group.push(lastData);
        }
      } else {
        group.group = [];
        group._name = this.dialogConfig.typeName;
        group.group.push(lastData);
        this.allLayerConfigJSON.config.groups.push(group);
      }
      //单一原则，清空
      this.layerConfigMap = {};
      this.layerConfigMap[
        data._src_name +
          data._currentLayerId +
          "_" +
          data._parentLayerId +
          "_" +
          data._parentTreeId +
          "_" +
          data._combined_parentTreeId
      ] = JSON.parse(JSON.stringify(lastData));
      // this.currentNodeData._set_status = true;
      // this.layerTreeAll = JSON.parse(JSON.stringify(this.layerTreeAll));
      this.layerTreeAll = setEditStatus(this.layerTreeAll, this.layerConfigMap);
      this.$message({
        message: this.$t("webAppBuilder.Setsuccessfully"),
        type: "success"
      });
      this.setEdit = false;
      this.resetForm();
      this.handleClose();
      // this.$emit("infoQueryChange");
    },
    //删除配置
    deleteSet(data) {
      if (
        this.layerConfigMap[
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
        // this.infoQueryConfigJSON.config.layers.layer.splice(index, 1);
        let group = {};
        let index = null;
        if (this.allLayerConfigJSON.config.groups.length > 0) {
          this.allLayerConfigJSON.config.groups.forEach(item => {
            if (item._name == this.dialogConfig.typeName) {
              group = item;
            }
          });
        }
        group.group.forEach((item, ix) => {
          if (
            item._name == this.dialogConfig.name ||
            (this.dialogConfig.name == "土地利用现状" &&
              (item._name == "土地利用现状17" ||
                item._name == "土地利用现状18"))
          ) {
            index = ix;
          }
        });
        if (index != null) {
          group.group.splice(index, 1);
        }
        this.layerConfigMap = {};
        if (data._treeId == this.currentNodeData._treeId) {
          this.setEdit = false;
        }
        this.layerTreeAll = setEditStatus(
          this.layerTreeAll,
          this.layerConfigMap
        );
        this.$message({
          message: this.$t("management.Deletesuccessful"),
          type: "success"
        });
      }
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

