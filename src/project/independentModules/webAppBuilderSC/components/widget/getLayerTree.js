import {traversal} from "@/utils/traversal.js";
import {group} from "@/utils/group.js";
import guid from "@/utils/guid.js";
import { getTree } from "@/utils/getTree.js";
export function getLayerTree(_this, layerTree, mapData = {}) {
  var tempLayerTree = JSON.parse(JSON.stringify(layerTree));
  var combinedData = [];
  traversal(tempLayerTree, "layer", (item, parent, params) => {
    if (mapData[item._src_name + item._id + "_" + item._parentLayerId + "_" + item._parentTreeId + "_" + item._combined_parentTreeId]) {
      item._set_status = true;
    } else {
      item._set_status = false;
    }
    if (item._is_combined_parent == 1) {
      params.push(item);
    }
  }, null, combinedData);
  //分组信息
  var groupResult = group({
    source: combinedData,
    groupRules: "_src_name"
  });
  var serviceGroup = [];
  for (var i in groupResult){
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
    return getCombinedLayerChild(_this, tempLayerTree, mapData,serviceGroup);
  } else {
    return tempLayerTree;
  }
}

function getCombinedLayerChild(_this,tempLayerTree,mapData,serviceGroup){
  //查询融合图层的子图层
  return _this.$api.webAppBuilderApi.selectAllLayerData({
    requestParams: JSON.stringify(serviceGroup)
  }, {
    loadingText: _this.$t("service.searching"),
    __LOGINTYPE: "dialog"
  })
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
                if (params.treeInfo[current.parentLayerId] instanceof Array) {
                  for (var i = 0; i < params.treeInfo[current.parentLayerId].length; i++) {
                    var tempItem = {
                      _id: current.id,
                      _label: current.name,
                      _src_name: params.serviceInfo._src_name,
                      _parentLayerId: current.parentLayerId,
                      _opacity: 1,
                      _icon: current.shapeType == "polyline" ?
                        "line" : current.shapeType,
                      _type: current.layerType,
                      _visible: "0",
                      _is_dynamic: Number(current.isDynamic),
                      _service_type: params.serviceInfo._service_type,
                      _service_name: params.serviceInfo._service_name,
                      _is_mini: "0",
                      _service_id: params.serviceInfo._service_id,
                      _combined_parentTreeId: params.treeInfo[current.parentLayerId][i]
                    };
                    if (current.compositeLayer === true) {
                      if (current.combined === true &&current.parentCombined === false) {
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
                    if (mapData[tempItem._src_name +tempItem._id +"_" +tempItem._parentLayerId +"_" +tempItem._parentTreeId +"_" +tempItem._combined_parentTreeId]){
                      tempItem._set_status = true;
                    }
                    params.allChildrentLayer.push(tempItem);
                  }
                }
              }
            },
            null, {
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
          tempLayerTree,
          "layer",
          function (current, parent, allChildrentLayerTree) {
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
        return tempLayerTree;
      } else {
        if (data.resultcode && data.resultcode == "error") {
          this.$message({
            message: this.$t(
              "webAppBuilder.FailedToQueryLayerInformation"
            ),
            type: "error"
          });
          return {};
        }
      }
    } else {
      this.$message({
        message: this.$t(
          "webAppBuilder.LayerUnableToParseLayerInformation"
        ),
        type: "error"
      });
      return {};
    }
  })
  .catch(() => {});
}

export function setEditStatus(layerTree=[],mapData={}){
  var tempLayerTree = JSON.parse(JSON.stringify(layerTree));
  traversal(tempLayerTree, "layer", (item) => {
    if (mapData[item._src_name + item._id + "_" + item._parentLayerId + "_" + item._parentTreeId + "_" + item._combined_parentTreeId]) {
      item._set_status = true;
    } else {
      item._set_status = false;
    }
  });
  return tempLayerTree;
}