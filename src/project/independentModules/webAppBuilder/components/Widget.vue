<template>
  <div>
    <div class="area">
      <div class="title app-aside-border-bottom">
        <div
          class="title-font app-aside-title-font-color app-aside-title-icon"
        >{{$t('webAppBuilder.BasicWidgets')}}</div>
      </div>
      <div class="content">
        <el-row class="widget">
          <template v-for="item in widgetList">
            <el-col
              :span="8"
              :key="item._widget_id"
              v-if="item._iswidget=='1'&&item._widge_type=='base'"
            >
              <div
                class="widget-container"
                :class="{'is-hidden':item._isshow=='0'}"
                @mouseenter="showBtn"
                @mouseleave="hideBtn"
              >
                <div class="widget-box">
                  <i class="widget-icon" :class="item._icon"></i>
                  <i
                    class="el-icon-portal-bi widget-box-edit"
                    v-if="item._iseditbtn=='1'&&item._isshow=='1'"
                    @click="edit(item)"
                  ></i>
                  <i
                    class="widget-box-show"
                    v-if="item._isshowbtn=='1'"
                    :class="item._isshow=='0'?'el-icon-portal-xianshi-yincang':'el-icon-portal-xianshiyincang-'"
                    @click="showOrHide(item)"
                  ></i>
                </div>
                <p class="widget-box-font" :title="$t(item._widge_name)">{{$t(item._widge_name)}}</p>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </div>
    <div class="area">
      <div class="title app-aside-border-bottom">
        <div
          class="title-font app-aside-title-font-color app-aside-title-icon"
        >{{$t('webAppBuilder.ThematicWidgets')}}</div>
      </div>
      <div class="content">
        <el-row class="widget">
          <template v-for="item in widgetList">
            <el-col
              :span="8"
              :key="item._widget_id"
              v-if="item._iswidget=='1'&&item._widge_type=='specialSubject'"
            >
              <div
                class="widget-container"
                :class="{'is-hidden':item._isshow=='0'}"
                @mouseenter="showBtn"
                @mouseleave="hideBtn"
              >
                <div class="widget-box">
                  <i class="widget-icon" :class="item._icon"></i>
                  <i
                    class="el-icon-portal-bi widget-box-edit"
                    v-if="item._iseditbtn=='1'&&item._isshow=='1'"
                    @click="edit(item)"
                  >{{item._isshow}}</i>
                  <i
                    class="widget-box-show"
                    v-if="item._isshowbtn=='1'"
                    :class="item._isshow=='0'?'el-icon-portal-xianshi-yincang':'el-icon-portal-xianshiyincang-'"
                    @click="showOrHide(item)"
                  ></i>
                </div>
                <p class="widget-box-font" :title="$t(item._widge_name)">{{$t(item._widge_name)}}</p>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
    </div>
    <info-query-dialog
      :dialogVisible="infoQueryDialogVisible"
      @dialogClose="editDialogClose"
      :layerTree="layerTree"
      :infoQueryConfigJSON="infoQueryConfigJSON"
      @infoQueryChange="infoQueryChange"
    ></info-query-dialog>
    <advanced-search-dialog
      :dialogVisible="advancedSearchDialogVisible"
      @dialogClose="editDialogClose"
      :layerTree="layerTree"
      :advancedSearchConfigJSON="advancedSearchConfigJSON"
      @advancedSearchChange="advancedSearchChange"
    ></advanced-search-dialog>
    <overlay-analysis-dialog
      :dialogVisible="overlayAnalysisDialogVisible"
      @dialogClose="editDialogClose"
      :layerTree="layerTree"
      :overlayAnalysisConfigJSON="overlayAnalysisConfigJSON"
      @overlayAnalysisChange="overlayAnalysisChange"
    ></overlay-analysis-dialog>
    <search-bar-dialog
      :dialogVisible="searchBarDialogVisible"
      @dialogClose="editDialogClose"
      :layerTree="layerTree"
      :searchBarConfigJSON="searchBarConfigJSON"
      @searchBarChange="searchBarChange"
    ></search-bar-dialog>
  </div>
</template>

<script>
import { traversal } from "@/utils/traversal.js";
import guid from "@/utils/guid.js";
import { getTree } from "@/utils/getTree.js";
import xmlJson from "../config/configJSON";
import InfoQueryDialog from "./widget/InfoQueryDialog";
import AdvancedSearchDialog from "./widget/AdvancedSearchDialog";
import OverlayAnalysisDialog from "./widget/OverlayAnalysisDialog";
import SearchBarDialog from "./widget/SearchBarDialog";
export default {
  name: "Widget",
  components: {
    InfoQueryDialog,
    AdvancedSearchDialog,
    OverlayAnalysisDialog,
    SearchBarDialog
  },
  props: {
    configJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    infoQueryConfigJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    advancedSearchConfigJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    overlayAnalysisConfigJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    searchBarConfigJSON: {
      type: Object,
      default: () => {
        return {};
      }
    },
    activeName: {
      type: String,
      default: ""
    },
    updateDataTimeStamp: {
      default: 0
    }
  },
  data() {
    return {
      widgetList: [],
      infoQueryDialogVisible: false,
      advancedSearchDialogVisible: false,
      overlayAnalysisDialogVisible: false,
      searchBarDialogVisible: false,
      editDialogList: {
        "info-query": "infoQueryDialogVisible",
        advanced: "advancedSearchDialogVisible",
        overlay: "overlayAnalysisDialogVisible",
        searchbar: "searchBarDialogVisible"
      },
      layerTree: []
    };
  },
  watch: {
    activeName() {
      if (this.activeName == "widget") {
        this.createData();
      }
    },
    updateDataTimeStamp() {
      this.createData();
    }
  },
  methods: {
    createData() {
      this.widgetList = [];
      var copyXmlJson = JSON.parse(JSON.stringify(xmlJson));
      var controlList = copyXmlJson.config.allControls.control; //所有微件
      var hideControl = {}; //隐藏的控件
      var hideControlList = this.configJSON.config.selectedWidgetControl;
      var defaultControlList = this.configJSON.config.controls.control; //默认配置中的微件
      var defaultControl = {};
      traversal(
        defaultControlList,
        "subcontrol",
        (item, parent, defaultControl) => {
          if(item._type){
            defaultControl[item._type] = true;
          }
        },
        null,
        defaultControl
      );
      if (hideControlList) {
        hideControlList.forEach(item => {
          if (item._isshow == 0) {
            hideControl[item._type] = true;
          }
        });
      }
      traversal(controlList, "subcontrol", (item, parent) => {
        item._widget_id = guid();
        var temp = JSON.parse(JSON.stringify(item));
        if (item.subcontrol) {
          temp.subcontrol = [];
        }
        if (parent != "root") {
          if (!temp._iswidget) {
            temp._iswidget = 1; //是微件
          }
          temp._parentid = parent._widget_id;
        } else {
          if (item.subcontrol) {
            temp._iswidget = 0;
          } else {
            if (!temp._iswidget) {
              temp._iswidget = 1; //是微件
            }
          }
        }
        //是微件
        if (temp._iswidget) {
          if (hideControlList) {
            if (hideControl[temp._type]) {
              temp._isshow = 0;
            } else {
              temp._isshow = 1;
            }
          } else {
            if (defaultControl[temp._type]) {
              temp._isshow = 1;
            } else {
              temp._isshow = 0;
            }
          }
        }
        this.widgetList.push(temp);
      });
      //获取图层的数据
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
    showOrHide(item) {
      if (item._isshow == "0") {
        item._isshow = "1";
      } else {
        item._isshow = "0";
      }
      var r = this.updateWidget();
      this.configJSON.config.selectedWidgetControl = this.widgetList;
      this.$emit("change", r);
    },
    updateWidget() {
      var list = [];
      var noFields = {
        _icon: true,
        _iseditbtn: true,
        _isshowbtn: true,
        _isshow: true,
        _iswidget: true,
        _widge_name: true,
        _isspecial: true
      };
      this.widgetList.forEach(item => {
        if (item._isshow != "0") {
          var tempItem = {};
          for (var i in item) {
            if (!noFields[i]) {
              tempItem[i] = item[i];
            }
          }
          list.push(tempItem);
        }
      });
      var r = getTree(list, "_widget_id", "_parentid", "subcontrol");
      // var r=getTree(list,'_widge_widget_id','_widge_parent_widget_id','subcontrol');
      return r;
    },
    showBtn(e) {
      var edit = e.currentTarget.getElementsByClassName("widget-box-edit");
      var showOrHideBtn = e.currentTarget.getElementsByClassName(
        "widget-box-show"
      );
      if (edit && edit.length > 0) {
        edit[0].style.display = "block";
      }
      if (showOrHideBtn && showOrHideBtn.length > 0) {
        showOrHideBtn[0].style.display = "block";
      }
    },
    hideBtn(e) {
      var edit = e.currentTarget.getElementsByClassName("widget-box-edit");
      var showOrHideBtn = e.currentTarget.getElementsByClassName(
        "widget-box-show"
      );
      if (edit && edit.length > 0) {
        edit[0].style.display = "none";
      }
      if (showOrHideBtn && showOrHideBtn.length > 0) {
        showOrHideBtn[0].style.display = "none";
      }
    },
    edit(item) {
      //编辑功能
      this[this.editDialogList[item._type]] = true;
    },
    editDialogClose() {
      //弹出窗关闭
      for (var i in this.editDialogList) {
        this[this.editDialogList[i]] = false;
      }
    },
    infoQueryChange() {
      //属性查询改变
      this.$emit("directUpdateConfig");
    },
    advancedSearchChange() {
      this.$emit("directUpdateConfig");
    },
    overlayAnalysisChange() {
      this.$emit("directUpdateConfig");
    },
    searchBarChange() {
      this.$emit("directUpdateConfig");
    }
  }
};
</script>

<style lang='scss' scoped>
.area:nth-child(1) {
  padding-top: 10px;
}

.area {
  margin-left: 20px;
  margin-right: 6px;
  .title {
    height: 34px;
    line-height: 34px;
    .title-font {
      font-size: 14px;
      display: inline-block;
      padding-left: 10px;
      position: relative;
      &::before {
        content: "";
        display: inline-block;
        height: 14px;
        width: 4px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        margin: auto;
        border-radius: 3px;
      }
    }
  }
}
.widget {
  margin-top: 15px;
}
.widget-container {
  margin-bottom: 16px;
  cursor: pointer;
  .widget-box {
    width: 64px;
    height: 64px;
    line-height: 64px;
    text-align: center;
    border-radius: 3px;
    margin: 0 10px;
    position: relative;
    .widget-icon {
      font-size: 30px;
      position: absolute;
      display: inline-block;
      height: 30px;
      width: 30px;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
    .widget-box-edit {
      position: absolute;
      display: inline-block;
      width: 18px;
      height: 18px;
      font-size: 16px;
      line-height: 18px;
      text-align: center;
      bottom: 0;
      right: 0;
      border-radius: 4px;
      display: none;
    }
    .widget-box-show {
      position: absolute;
      display: inline-block;
      width: 18px;
      height: 18px;
      font-size: 18px;
      line-height: 18px;
      text-align: center;
      top: 0;
      right: 0;
      border-radius: 4px;
      display: none;
    }
  }
  .widget-box-font {
    width: 64px;
    margin: 0 10px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    padding: 0;
    font-size: 14px;
    color: #595959;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>