(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){
"use strict";

// import RenderShape from "../../../src/builder/RenderShape";

/**
 * Created by lihuan on 2019/8/19.
 */

global.builderInitDoms = {};
global.builderInitDoms.initAllDoms = initAllDoms;
global.builderInitDoms.initPointDoms = initPointDoms;
global.builderInitDoms.initLineDoms = initLineDoms;
global.builderInitDoms.initPolygonDoms = initPolygonDoms;

global.builderInitDoms.lineStyleDropDownList = lineStyleDropDownList;
global.builderInitDoms.labelFieldDropDownList = labelFieldDropDownList;
global.builderInitDoms.labelFontDropDownList = labelFontDropDownList;
global.builderInitDoms.specialFieldDropDownList = specialFieldDropDownList;
global.builderInitDoms.rampColorDropDownList = rampColorDropDownList;
global.builderInitDoms.sectionSpecialFieldDropDownList = sectionSpecialFieldDropDownList;
global.builderInitDoms.subsectionTypeDropDownList = subsectionTypeDropDownList;
global.builderInitDoms.subsectionNumberDropDownList = subsectionNumberDropDownList;
global.builderInitDoms.labelDirectionDropDownList = labelDirectionDropDownList;
global.builderInitDoms.heatmapRampColorDropDownList = heatmapRampColorDropDownList;
global.builderInitDoms.weightFieldDropDownList = weightFieldDropDownList;

// global.builderInitDoms.initFieldColorContainer = initFieldColorContainer;
// global.builderInitDoms.updateLegend = updateLegend;

global.builderInitDoms.fillSvgSymbols = fillSvgSymbols;
global.builderInitDoms.fillImageSymbols = fillImageSymbols;
global.builderInitDoms.render = render;
global.builderInitDoms.refreshThematicColors = refreshThematicColors;

global.builderInitDoms.extraIconShape = extraIconShape;

function initAllDoms() {
  initSymbolTypeContainer();
  initPointSytleContainer();
  initPointRampColorContainer();
  initPointColorContainer();
  initPointSizeContainer();
  initPointOpacityContainer();
  initHeatmapFilterContainer();
  initHeatmapRadiusContainer();
  initHeatmapRampColorContainer();
  initHeatmapWeightFieldContainer();
  initPointLineColorContainer();
  initPointLineWidthContainer();
  initPointLineOpacityContainer();
  initPointSpecialFieldContainer();
  initPointSubsectionTypeContainer();
  initPointSubsectionNumberContainer();
  initLabelDirectionContainer();
  initLabelOffsetContainer();

  initPointTypeSwitchingContainer();
  initPointRenderType0Container();
  initHandDrawExtraIconShapeContainer();
  initHandDrawExtraIconMarkerColorContainer();
  initHandDrawExtraIconIconColorContainer();

  initLineColorContainer();
  initLineStyleListContainer();
  initLineOpacityContainer();
  initLineWidthContainer();
  initLineRampColorContainer();
  initSpecialFieldContainer();
  initSubsectionTypeContainer();
  initSubsectionNumberContainer();
  initPolygonColorContainer();
  initPolygonOpacityContainer();

  initPolygonRampColorContainer();

  initCommonUis();
  initKendoDoms();
}

function initPointDoms() {
  initSymbolTypeContainer();

  initPointSytleContainer();
  initPointRampColorContainer();
  initPointColorContainer();
  initPointSizeContainer();
  initPointOpacityContainer();

  initHeatmapFilterContainer();
  initHeatmapRadiusContainer();
  initHeatmapRampColorContainer();
  initHeatmapWeightFieldContainer();

  initPointLineColorContainer();
  initPointLineWidthContainer();
  initPointLineOpacityContainer();

  initPointSpecialFieldContainer();
  initPointSubsectionTypeContainer();
  initPointSubsectionNumberContainer();

  initLabelDirectionContainer();
  initLabelOffsetContainer();

  initCommonUis();

  // initFieldColorContainer();

  initKendoDoms();
}

function initLineDoms() {
  initCommonUis();
  initLineColorContainer();
  initLineStyleListContainer();
  initLineOpacityContainer();
  initLineWidthContainer();

  initLineRampColorContainer();
  initSpecialFieldContainer();
  initSubsectionTypeContainer();
  initSubsectionNumberContainer();

  initPolygonColorContainer();
  initPolygonOpacityContainer();

  // initFieldColorContainer();

  initKendoDoms();
}

function initPolygonDoms() {
  initCommonUis();

  initSpecialFieldContainer();

  initSubsectionTypeContainer();
  initSubsectionNumberContainer();
  initPolygonRampColorContainer();
  initPolygonColorContainer();
  initPolygonOpacityContainer();

  initLineColorContainer();
  initLineStyleListContainer();
  initLineOpacityContainer();
  initLineWidthContainer();

  // initFieldColorContainer();

  initKendoDoms();
}

// (function(kendo){
//   kendo.confirm = function(newMessage , option) {
//     var $ = kendo.jQuery ;
//     var _kendoConfirm = kendo['_kendoConfirm'] ;
//     var _kendoConfirmDom = kendo['_kendoConfirmDom'] ;
//     var defaultOption = {
//       width: "400px",
//       height: "150px" ,
//       title: "删除",
//       resizable:false ,
//       actions: [
//         "Close",
//       ],
//       modal:true ,
//       ok:{text:'&nbsp&nbsp确定&nbsp&nbsp',callback:function(kendoConfirm){kendoConfirm.close();}} ,
//       cancel: {text:'&nbsp&nbsp取消&nbsp&nbsp',callback:function(kendoConfirm){kendoConfirm.close();}}
//     } ;
//     $.extend(defaultOption , option) ;
//
//     if(_kendoConfirm){
//       _kendoConfirmDom.children("#msg").html(newConfirm) ;
//       _kendoConfirm.center();
//       _kendoConfirm.open() ;
//     } else {
//
//
//       var html = '<div><div id="msg" style="height: 60%;margin:8px;overflow:hidden;" >' + newMessage +'</div>' +
//         '<div class="k-edit-buttons k-state-default k-window-action" style="text-align:center;margin: 8px;">'+
//         '<a href="#" class="k-button" id="confirmOk" style="margin-right:8px;">'+defaultOption.ok.text+'</a>'+
//         '<a href="#" class="k-button" id="confirmCancel">'+defaultOption.cancel.text+'</a></div></div>' ;
//
//
//       _kendoConfirmDom = $(html) ;
//       _kendoConfirmDom.kendoWindow(defaultOption) ;
//       _kendoConfirm = _kendoConfirmDom.data("kendoWindow");
//       _kendoConfirm.center() ;
//       _kendoConfirm.open() ;
//       _kendoConfirmDom.find("#confirmOk").click(function(){defaultOption.ok.callback(_kendoConfirm);}) ;
//       _kendoConfirmDom.find("#confirmCancel").click(function(){defaultOption.cancel.callback(_kendoConfirm);}) ;
//       kendo['_kendoConfirm'] = _kendoConfirm ;
//       kendo['_kendoConfirmDom'] = _kendoConfirmDom ;
//     }
//   }
// })

function initKendoDoms() {
  $(".colors-picker-input").kendoColorPicker({
    button: false,
    change: render
  });

  // 点大小
  $(".point-size-silder").kendoSlider({
    min: 1,
    max: 20,
    smallStep: 1,
    largeStep: 1,
    showButtons: false,
    tips: false,

    change: render
  }).data("kendoSlider");

  // 热点半径
  $(".heatmap-radius-silder").kendoSlider({
    min: 1,
    max: 20,
    smallStep: 1,
    largeStep: 1,
    showButtons: false,
    tips: false,

    change: render
  }).data("kendoSlider");

  $(".line-width-silder").kendoSlider({
    min: 0,
    max: 20,
    smallStep: 1,
    largeStep: 1,
    showButtons: false,
    tips: false,

    change: render
  }).data("kendoSlider");

  $(".opacity-slider").kendoSlider({
    min: 0,
    max: 100,
    smallStep: 5,
    largeStep: 10,
    showButtons: false,

    change: render
  }).data("kendoSlider");

  $(".line-style-list").kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",

    template: '<span class="k-state-default" style="background-image: url(./images/line_styles/line_style#:data.name#.png)"></span>',
    valueTemplate: '<span class="selected-value" style="background-image: url(./images/line_styles/line_style#:data.name#.png)"></span>',
    height: 200,

    change: render
  });

  $(".point-ramp-color").kendoDropDownList({
    dataTextField: "value",
    dataValueField: "name",
    template: '<span class="k-state-default" style="height: 12px; background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',
    valueTemplate: '<span class="selected-value" style="background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',
    height: 200,

    change: function change() {
      fieldColorsChanged();
      initFieldColorContainer();

      render();
    }
  });

  $(".heatmap-ramp-color").kendoDropDownList({
    dataTextField: "value",
    dataValueField: "name",
    template: '<span class="k-state-default" style="height: 12px; background-image: url(./images/heatmap_ramp/color#:data.name#.png)"></span>',
    valueTemplate: '<span class="selected-value" style="background-image: url(./images/heatmap_ramp/color#:data.name#.png)"></span>',
    height: 200,

    change: function change() {
      fieldColorsChanged();
      initFieldColorContainer();

      render();
    }
  });

  $(".line-ramp-color").kendoDropDownList({
    dataTextField: "value",
    dataValueField: "name",
    template: '<span class="k-state-default" style="height: 12px; background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',
    valueTemplate: '<span class="selected-value" style="background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',
    height: 200,

    change: function change() {
      fieldColorsChanged();
      initFieldColorContainer();

      render();
    }
  });

  $(".polygon-ramp-color").kendoDropDownList({
    dataTextField: "value",
    dataValueField: "name",
    template: '<span class="k-state-default" style="height: 12px; background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',
    valueTemplate: '<span class="selected-value" style="background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',
    height: 200,

    change: function change() {
      fieldColorsChanged();
      initFieldColorContainer();

      render();
    }
  });

  // 专题字段列表
  $(".special-field-list").kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",
    height: 140,

    change: function change() {
      fieldColorsChanged();
      initFieldColorContainer();

      render();
    }
  });

  // 分段方法
  $(".sub-section-method-list").kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",
    height: 140,

    change: function change() {
      fieldColorsChanged();
      initFieldColorContainer();

      render();
    }
  });

  // 分段个数
  $(".sub-section-count-list").kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",
    height: 140,

    change: function change() {
      fieldColorsChanged();
      initFieldColorContainer();

      render();
    }
  });

  // 标签方向
  $(".label-direction-list").kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",
    height: 140,

    change: render
  });

  // 标签偏移
  $(".label-offset-silder").kendoSlider({
    min: 0,
    max: 40,
    smallStep: 1,
    largeStep: 1,
    showButtons: false,
    tips: false,

    change: render
  }).data("kendoSlider");

  // 标签字体列表
  $(".label-field-list").kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",
    height: 140,

    change: render
  });

  // 权重字段列表
  $(".weight-field-list").kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",
    height: 140,

    change: render
  });

  // 标签字段列表
  $(".label-font-list").kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",
    height: 140,

    change: render
  });

  // 过滤条件输入框
  var dv_input = $(".dv-input").kendoMaskedTextBox({
    change: render
  }).data("kendoMaskedTextBox");

  // 响应enter事件
  $("[data-role=maskedtextbox]").on("keydown", function (e) {
    if (e.keyCode === 13) {
      dv_input.trigger('change', { data: $(this).val() });
    }
  });

  // 手绘图层 点图层渲染方式切换按钮
  $(".point-type-switching").kendoButtonGroup({
    index: 0
  });

  // 标签方向
  $(".extra-icon-shape-list").kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",
    height: 140,

    dataSource: extraIconShape()
  });
}

function render() {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var layer = buildProject.setting.layer; // 当前激活的layer
  var renderType = layer.getRenderType();

  if (renderType === "hand-draw") {
    var model = KQ.Builder.BuilderProject.getInstance().setting.currentHandDrawModel;
    var editorOptions = model.styleOptions;

    convertModelOpacity(editorOptions, model);

    // 改变样式
    KQ.Map.MapGeomanStyleEditor.getInstance().changeStyle(KQ.Builder.BuilderProject.getInstance().setting.currentHandDrawLayer, editorOptions);
  } else {
    var renderModel = buildProject.getInfo('render_model');
    var options = renderModel.styleOptions;
    var _render = layer.render.get(renderType);

    if (renderModel.pointSize) {
      // 点数据
      options.vectorInfo.fillOpacity = renderModel.pointOpacity / 100;
      options.vectorInfo.strokeOpacity = renderModel.lineOpacity / 100;

      if (options.pointSymbolType === "vector") {
        options.vectorInfo.fontSize = renderModel.pointSize + "px";
      } else {
        options.imageInfo.radius = renderModel.pointSize / 10;
      }
    } else {
      // 线、面数据
      convertModelOpacity(options, renderModel);
    }

    // 特殊处理gradient
    if (options.renderType === "heatmap") {
      options.gradient = KQ.Common.CommonValues.heatmapColorRamp[options.colorIndex];
    }

    _render.setOptions(options);
  }
}

// 转换model的透明度 由百分比变为小数
function convertModelOpacity(options, model) {
  if (options.fillOpacity) {
    options.fillOpacity = model.fillOpacity / 100;
  }

  if (options.lineOpacity) {
    options.lineOpacity = model.lineOpacity / 100;
  }
}

function fieldColorsChanged() {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var layer = buildProject.setting.layer; // 当前激活的layer
  var renderModel = buildProject.getInfo('render_model');
  refreshThematicColors(layer, renderModel.styleOptions);
}

function refreshThematicColors(layer, options) {
  var renderType = layer.getRenderType();
  var render = layer.render.get(renderType);
  var styleOption = options;
  var renderOption = render.options;

  if (layer.options.featureType === "point") {
    styleOption = styleOption.vectorInfo;
    renderOption = renderOption.vectorInfo;
  }

  if (renderType == "single") {
    styleOption.thematicColors = KQ.Builder.RenderShape.getThematicFieldColorsSingle(render.getGeojsonObject(), styleOption.thematicField, styleOption.colorIndex);
    renderOption.thematicColors = styleOption.thematicColors;
  } else if (renderType == "section") {
    styleOption.thematicColors = KQ.Builder.RenderShape.getThematicFieldColorsSection(render.getGeojsonObject(), styleOption.thematicField, styleOption.colorIndex, styleOption.sectionMethod, styleOption.sectionCount);
    renderOption.thematicColors = styleOption.thematicColors;
  } else if (renderType == "heatmap") {
    options.gradient = KQ.Common.CommonValues.heatmapColorRamp[options.colorIndex];
  }
}

/************************************************************doms init***********************************************/

function initCommonUis() {
  var containers = document.getElementsByClassName("editor-common-uis");
  for (var i = 0; i < containers.length; i++) {
    var editor_common_uis = document.createElement("div");
    editor_common_uis.innerHTML = "\n                <div class=\"editor-tool\">\n                    <div class=\"text\">\u8FC7\u6EE4\u663E\u793A</div>\n                    <input class=\"dv-input\" placeholder=\"featureID < 1000\" data-bind=\"value: styleOptions.filter\"/>\n                </div>\n                <div class=\"editor-tool lable-select\">\n                    <div class=\"text\">\u6807\u7B7E\u5B57\u6BB5</div>\n                    <select class=\"label-field-list\" data-bind=\"source: labelFieldDropDownList, value: styleOptions.labelField\"></select>\n                </div>\n                <div class=\"editor-tool lable-style\">\n                    <div class=\"text\">\u6807\u7B7E\u989C\u8272</div>\n                    <input class=\"colors-picker-input\" data-role=\"colorpicker\"\n                           data-bind=\"value: styleOptions.labelColor\"/>\n                </div>\n                <div class=\"editor-tool lable-select\">\n                    <div class=\"text\">\u6807\u7B7E\u5B57\u4F53</div>\n                    <select class=\"label-font-list\" data-bind=\"source: labelFontDropDownList, value: styleOptions.labelFontName\"> </select>\n                </div>\n            ";
    containers[i].appendChild(editor_common_uis);
  }
}

// 点符号
function initSymbolTypeContainer() {
  var containers = document.getElementsByClassName("symbol-type-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n        <div class=\"editor-tool\">\n          <div class=\"text\">\u7B26\u53F7\u7C7B\u578B</div>\n          <ul class=\"point-symbol-type\">\n            <li class=\"point-symbol point-symbol-svg\">\u77E2\u91CF</li>\n            <li class=\"point-symbol point-symbol-img\">\u56FE\u7247</li>\n          </ul>\n        </div>\n        ";

    containers[i].appendChild(div);

    var symbolTypeGroupButton = $(".point-symbol-type").kendoMobileButtonGroup({
      index: 0
    }).data("kendoMobileButtonGroup");
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    buildProject.symbolTypeGroupButton = symbolTypeGroupButton;
  }
}

// 点样式
function initPointSytleContainer() {
  var containers = document.getElementsByClassName("point-style-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n        <div class=\"editor-tool\">\n          <div class=\"text\">\u70B9\u6837\u5F0F</div>\n          <div class=\"default-point-icon\">\n             <div class=\"iconfont\" data-bind=\"html: styleOptions.vectorInfo.unicode\"></div>\n             <div class=\"icon-container\" style=\"display: none;\" data-bind=\"style: { backgroundImage:  styleOptions.imageInfo.url }\"></div>\n          </div>\n          <div class=\"symbols-container\" style=\"display: none;\">\n            <div class=\"symbols-box\">\n            </div>\n          </div>\n        </div>\n        ";

    containers[i].appendChild(div);

    $(containers[i]).find(".default-point-icon div").eq(0).bind({
      // 设置字体图标变化的响应函数
      'icon_selected': function icon_selected(e, data) {
        // 设置字体图标变化的响应函数
        var buildProject = KQ.Builder.BuilderProject.getInstance();
        var renderModel = buildProject.getInfo('render_model');
        var options = renderModel.styleOptions;

        options.vectorInfo.unicode = data;
        $(this).html(data);

        $(this).css("display", "block").siblings().css("display", "none");

        render();
      },

      'symbol_type_vector': function symbol_type_vector() {
        // 符号类型改变
        $(this).css("display", "block").siblings().css("display", "none");
        render();
      }
    });

    $(containers[i]).find(".default-point-icon div").eq(1).bind({
      'icon_selected': function icon_selected(e, data) {
        // 设置字体图标变化的响应函数
        var buildProject = KQ.Builder.BuilderProject.getInstance();
        var renderModel = buildProject.getInfo('render_model');
        var options = renderModel.styleOptions;

        options.imageInfo.url = "url(./images/point_images/IMAGE" + data.row + "-" + data.col + ".png)";
        $(this).css("background-image", options.imageInfo.url);

        $(this).css("display", "block").siblings().css("display", "none");

        render();
      },

      'symbol_type_image': function symbol_type_image() {
        // 符号类型改变
        $(this).css("display", "block").siblings().css("display", "none");
        render();
      }
    });
  }

  // 点击点样式按钮 显示点样式面板
  $(".default-point-icon").click(function () {
    $(this).next().css("display", "block");
  });

  // 点击其他位置 隐藏点样式面板
  $("body").click(function (e) {
    var $parent = $(e.target).parent();
    if (!$parent.hasClass("default-point-icon")) {
      $(".symbols-container").css("display", "none");
    }
  });
}

// 填充点符号 svg的符号面板
function fillSvgSymbols() {
  // 首先清空面板
  $(".symbols-box").empty();

  var icons_unicode = ["&#xe614", "&#xe6e3", "&#xe6ad", "&#xe629", "&#xe613", "&#xe66b", "&#xe65a", "&#xe75f", "&#xe656", "&#xe679", "&#xe657", "&#xe652", "&#xe615", "&#xe67e", "&#xe620", "&#xe7df", "&#xe667", "&#xe666", "&#xe642", "&#xe640", "&#xe628", "&#xe67b", "&#xeac9", "&#xe63f", "&#xe61a", "&#xe64d", "&#xe626", "&#xe6cb", "&#xe6b5", "&#xe689", "&#xe6f6", "&#xe71c", "&#xe646", "&#xe6c7", "&#xe671", "&#xe66f", "&#xe641", "&#xe63e", "&#xe63a", "&#xe676", "&#xe739", "&#xe651", "&#xe663", "&#xe67a", "&#xe677", "&#xe612", "&#xe81f", "&#xe65c", "&#xe664", "&#xe665", "&#xe61f", "&#xe623", "&#xe624", "&#xe62a", "&#xe62b", "&#xe611", "&#xe66d", "&#xe660", "&#xe64c", "&#xe630"];

  var _loop = function _loop(i) {
    var $row = $('<div class="symbol-row"></div>');

    var _loop2 = function _loop2(j) {
      var $column = $('<div class="iconfont"></div>');
      $column.html(icons_unicode[i * 6 + j]);

      $column.click(function () {
        $(this).closest(".editor-tool").find(".default-point-icon div").eq(0).trigger('icon_selected', icons_unicode[i * 6 + j]);
      });

      $row.append($column);
    };

    for (var j = 0; j < 6; ++j) {
      _loop2(j);
    }

    $(".symbols-box").append($row);
  };

  for (var i = 0; i < 10; ++i) {
    _loop(i);
  }
}

// 填充点符号 image的符号面板
function fillImageSymbols() {
  // 首先清空面板
  $(".symbols-box").empty();

  var _loop3 = function _loop3(i) {
    var $row = $('<div class="symbol-row"></div>');

    var _loop4 = function _loop4(j) {
      var style = "background-image: url(./images/point_images/IMAGE" + i + "-" + j + ".png);";
      var $column = $('<div class="point-img" ><div style="' + style + '"></div></div>');

      $column.click(function () {
        $(this).closest(".editor-tool").find(".default-point-icon div").eq(1).trigger('icon_selected', {
          row: i,
          col: j
        });
      });

      $row.append($column);
    };

    for (var j = 1; j <= 6; ++j) {
      _loop4(j);
    }

    $(".symbols-box").append($row);
  };

  for (var i = 1; i <= 10; ++i) {
    _loop3(i);
  }
}

// 点颜色
function initPointColorContainer() {
  var containers = document.getElementsByClassName("point-color-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u70B9\u989C\u8272</div>\n                <input class=\"colors-picker-input\" data-role=\"colorpicker\" data-bind=\"value: styleOptions.vectorInfo.fillColor\"/>\n            </div>\n            ";
    containers[i].appendChild(div);
  }
}

// 点色块
function initPointRampColorContainer() {
  var containers = document.getElementsByClassName("point-ramp-color-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u70B9\u989C\u8272</div>\n                <input class=\"point-ramp-color\" data-bind=\"source: rampColorDropDownList, value: styleOptions.vectorInfo.colorIndex\"/>\n            </div>          \n            ";
    containers[i].appendChild(div);
  }
}

// 热力图 色块
function initHeatmapRampColorContainer() {
  var containers = document.getElementsByClassName("heatmap-ramp-color-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u70ED\u70B9\u989C\u8272</div>\n                <input class=\"heatmap-ramp-color\" data-bind=\"source: heatmapRampColorDropDownList, value: styleOptions.colorIndex\"/>\n            </div>          \n            ";
    containers[i].appendChild(div);
  }
}

// 热力图 权重字段
function initHeatmapWeightFieldContainer() {
  var containers = document.getElementsByClassName("heatmap-weight-field-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n               <div class=\"text\">\u6743\u91CD\u5B57\u6BB5</div>\n               <select class=\"weight-field-list\" data-bind=\"source: weightFieldDropDownList, value: styleOptions.weightField\"></select>\n            </div>          \n            ";
    containers[i].appendChild(div);
  }
}

// 热力图 过滤显示
function initHeatmapFilterContainer() {
  var containers = document.getElementsByClassName("heatmap-filter-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n               <div class=\"text\">\u8FC7\u6EE4\u663E\u793A</div>\n               <input class=\"dv-input\" placeholder=\"featureID < 1000\" data-bind=\"value: styleOptions.filter\"/>\n            </div>          \n            ";
    containers[i].appendChild(div);
  }
}

// 点大小
function initPointSizeContainer() {
  var containers = document.getElementsByClassName("point-size-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u70B9\u5927\u5C0F</div>\n                <div class=\"value-container\">\n                    <input class=\"point-size-silder\" data-bind=\"value: pointSize\"/>\n                    <input type=\"text\" style=\"border: none;\" data-bind=\"value: pointSize\">\n                    <p stype=\"padding-right: 5px;\">px</p>\n                </div>\n            </div>\n            ";
    containers[i].appendChild(div);
  }
}

// 点不透明度
function initPointOpacityContainer() {
  var containers = document.getElementsByClassName("point-opacity-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u70B9\u4E0D\u900F\u660E\u5EA6</div>\n                <div class=\"value-container\">\n                    <input class=\"opacity-slider\" data-bind=\"value: pointOpacity\"/>\n                    <input type=\"text\" style=\"border: none;\" data-bind=\"value: pointOpacity\">\n                    <p stype=\"padding-right: 5px;\">%</p>\n                </div>\n            </div>           \n            ";
    containers[i].appendChild(div);
  }
}

// 点数据的 线颜色
function initPointLineColorContainer() {
  var containers = document.getElementsByClassName("point-line-color-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u7EBF\u989C\u8272</div>\n                <input class=\"colors-picker-input\" data-role=\"colorpicker\"\n                       data-bind=\"value: styleOptions.vectorInfo.strokeColor\"/>\n            </div>\n            ";
    containers[i].appendChild(div);
  }
}

// 点数据的 线宽度
function initPointLineWidthContainer() {
  var containers = document.getElementsByClassName("point-line-width-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u7EBF\u5BBD\u5EA6</div>\n                <div class=\"value-container\">\n                    <input class=\"line-width-silder\" data-bind=\"value: styleOptions.vectorInfo.strokeWidth\"/>\n                    <input type=\"text\" style=\"border: none;\" data-bind=\"value: styleOptions.vectorInfo.strokeWidth\">\n                    <p stype=\"padding-right: 5px;\">px</p>\n                </div>\n            </div>\n            ";
    containers[i].appendChild(div);
  }
}

// 点数据的 线不透明度
function initPointLineOpacityContainer() {
  var containers = document.getElementsByClassName("point-line-opacity-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u7EBF\u4E0D\u900F\u660E\u5EA6</div>\n                <div class=\"value-container\">\n                    <input class=\"opacity-slider\" data-bind=\"value: lineOpacity\"/>\n                    <input type=\"text\" style=\"border: none;\" data-bind=\"value: lineOpacity\">\n                    <p stype=\"padding-right: 5px;\">%</p>\n                </div>\n            </div>           \n            ";
    containers[i].appendChild(div);
  }
}

// 点数据的专题字段
function initPointSpecialFieldContainer() {
  var containers = document.getElementsByClassName("point-special-field-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">\u4E13\u9898\u5B57\u6BB5</div>\n                <select class=\"special-field-list\" data-bind=\"source: specialFieldDropDownList, value: styleOptions.vectorInfo.thematicField\"/>\n            </div>         \n            ";
    containers[i].appendChild(div);
  }
}

// 点数据的分段方法
function initPointSubsectionTypeContainer() {
  var containers = document.getElementsByClassName("point-subsection-type-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">\u5206\u6BB5\u65B9\u6CD5</div>\n                <select class=\"sub-section-method-list\" data-bind=\"source: subsectionTypeDropDownList, value: styleOptions.vectorInfo.sectionMethod\"/>\n            </div>         \n            ";
    containers[i].appendChild(div);
  }
}

// 热力图的热点半径
function initHeatmapRadiusContainer() {
  var containers = document.getElementsByClassName("heatmap-radius-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u70ED\u70B9\u534A\u5F84</div>\n                <div class=\"value-container\">\n                    <input class=\"heatmap-radius-silder\" data-bind=\"value: styleOptions.radius\"/>\n                    <input type=\"text\" style=\"border: none;\" data-bind=\"value: styleOptions.radius\">\n                    <p stype=\"padding-right: 5px;\">px</p>\n                </div>\n            </div>\n            ";
    containers[i].appendChild(div);
  }
}

// 点数据的分段个数
function initPointSubsectionNumberContainer() {
  var containers = document.getElementsByClassName("point-subsection-number-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">\u5206\u6BB5\u4E2A\u6570</div>\n                <select class=\"sub-section-count-list\" data-bind=\"source: subsectionNumberDropDownList, value: styleOptions.vectorInfo.sectionCount\"/>\n            </div>        \n            ";
    containers[i].appendChild(div);
  }
}

// 点数据 标签位置
function initLabelDirectionContainer() {
  var containers = document.getElementsByClassName("label-direction-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">\u6807\u7B7E\u4F4D\u7F6E</div>\n                <select class=\"label-direction-list\" data-bind=\"source: labelDirectionDropDownList, value: styleOptions.labelPosition\"/>\n            </div>        \n            ";
    containers[i].appendChild(div);
  }
}

// 点数据 标签偏移
function initLabelOffsetContainer() {
  var containers = document.getElementsByClassName("label-offset-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">\u6807\u7B7E\u504F\u79FB</div>\n                <div class=\"value-container\">\n                    <input class=\"label-offset-silder\" data-bind=\"value: styleOptions.labelMarkerPadding\"/>\n                    <input type=\"text\" style=\"border: none;\" data-bind=\"value: styleOptions.labelMarkerPadding\">\n                    <p stype=\"padding-right: 5px;\">px</p>\n                </div>\n            </div>        \n            ";
    containers[i].appendChild(div);
  }
}

// 线颜色
function initLineColorContainer() {
  var containers = document.getElementsByClassName("line-color-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u7EBF\u989C\u8272</div>\n                <input class=\"colors-picker-input\" data-role=\"colorpicker\"\n                       data-bind=\"value: styleOptions.lineColor\"/>\n            </div>\n            ";
    containers[i].appendChild(div);
  }
}

// 线样式
function initLineStyleListContainer() {
  var containers = document.getElementsByClassName("line-style-list-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u7EBF\u6837\u5F0F</div>\n                <input class=\"line-style-list\" style=\"width: 152px; height: 28px;\"\n                       data-bind=\"source: lineStyleDropDownList, value: styleOptions.lineStyle\"/>\n            </div>\n            ";
    containers[i].appendChild(div);
  }
}

// 线宽度
function initLineWidthContainer() {
  var containers = document.getElementsByClassName("line-width-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u7EBF\u5BBD\u5EA6</div>\n                <div class=\"value-container\">\n                    <input class=\"line-width-silder\" data-bind=\"value: styleOptions.lineWidth\"/>\n                    <input type=\"text\" style=\"border: none;\" data-bind=\"value: styleOptions.lineWidth\">\n                    <p stype=\"padding-right: 5px;\">px</p>\n                </div>\n            </div>\n            ";
    containers[i].appendChild(div);
  }
}

// 线不透明度
function initLineOpacityContainer() {
  var containers = document.getElementsByClassName("line-opacity-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u7EBF\u4E0D\u900F\u660E\u5EA6</div>\n                <div class=\"value-container\">\n                    <input class=\"opacity-slider\" data-bind=\"value: lineOpacity\"/>\n                    <input type=\"text\" style=\"border: none;\" data-bind=\"value: lineOpacity\">\n                    <p stype=\"padding-right: 5px;\">%</p>\n                </div>\n            </div>           \n            ";
    containers[i].appendChild(div);
  }
}

// 线渐变颜色
function initLineRampColorContainer() {
  var containers = document.getElementsByClassName("line-ramp-color-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u7EBF\u989C\u8272</div>\n                <input class=\"line-ramp-color\"\n                       data-bind=\"source: lineRampColorDropDownList, value: styleOptions.colorIndex\"/>\n            </div>          \n            ";
    containers[i].appendChild(div);
  }
}

function initSpecialFieldContainer() {
  var containers = document.getElementsByClassName("special-field-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">\u4E13\u9898\u5B57\u6BB5</div>\n                <select class=\"special-field-list\" data-bind=\"source: specialFieldDropDownList, value: styleOptions.thematicField\"/>\n            </div>         \n            ";
    containers[i].appendChild(div);
  }
}

function initSubsectionTypeContainer() {
  var containers = document.getElementsByClassName("subsection-type-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">\u5206\u6BB5\u65B9\u6CD5</div>\n                <select class=\"sub-section-method-list\" data-bind=\"source: subsectionTypeDropDownList, value: styleOptions.sectionMethod\"/>\n            </div>         \n            ";
    containers[i].appendChild(div);
  }
}

function initSubsectionNumberContainer() {
  var containers = document.getElementsByClassName("subsection-number-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">\u5206\u6BB5\u4E2A\u6570</div>\n                <select class=\"sub-section-count-list\" data-bind=\"source: subsectionNumberDropDownList, value: styleOptions.sectionCount\"/>\n            </div>        \n            ";
    containers[i].appendChild(div);
  }
}

// 初始化面颜色
function initPolygonRampColorContainer() {
  var containers = document.getElementsByClassName("polygon-ramp-color-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u9762\u989C\u8272</div>\n                <input class=\"polygon-ramp-color\" data-bind=\"source: rampColorDropDownList, value: styleOptions.colorIndex\"/>\n            </div>          \n            ";
    containers[i].appendChild(div);
  }
}

function initPolygonColorContainer() {
  var containers = document.getElementsByClassName("polygon-color-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool point-color\">\n                <div class=\"text\">\u9762\u989C\u8272</div>\n                <input class=\"colors-picker-input\" data-role=\"colorpicker\" data-bind=\"value: styleOptions.fillColor\"/>\n            </div>   \n            ";
    containers[i].appendChild(div);
  }
}

function initPolygonOpacityContainer() {
  var containers = document.getElementsByClassName("polygon-opacity-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u9762\u4E0D\u900F\u660E\u5EA6</div>\n                  <div class=\"value-container\">\n                     <input class=\"opacity-slider\" data-bind=\"value: fillOpacity\"/>\n                     <input type=\"text\" style=\"border: none;\" data-bind=\"value: fillOpacity\">\n                     <p stype=\"padding-right: 5px;\">%</p>\n                  </div>\n            </div>           \n            ";
    containers[i].appendChild(div);
  }
}

// function _getColorFieldsArray(featureType, renderType) {
//   let buildProject = KQ.Builder.BuilderProject.getInstance();
//   let layer = buildProject.setting.layer; // 当前激活的layer
//   let render = layer.render;
//
//   if (renderType === "single") {
//     if (featureType == 'point') {
//       return render.get('single').options.vectorInfo.thematicColors;
//     } else {
//       console.log("_initDOms.js 1071, thematicColors: ", render.get('single').options.thematicColors);
//       return render.get('single').options.thematicColors;
//     }
//   } else if (renderType === "section") {
//     if (featureType == 'point') {
//       return render.get('section').options.vectorInfo.thematicColors.colors;
//     } else {
//       return render.get('section').options.thematicColors.colors;
//     }
//   } else if (renderType === "heatmap") {
//     return render.get('heatmap').options.gradient;
//   }
// }
//
// function _getRangeArray(featureType) {
//   let buildProject = KQ.Builder.BuilderProject.getInstance();
//   let layer = buildProject.setting.layer; // 当前激活的layer
//   let render = layer.render;
//
//   if (featureType == 'point') {
//     return render.get('section').options.vectorInfo.thematicColors.breaksData;
//   } else {
//     return render.get('section').options.thematicColors.breaksData;
//   }
// }
//
// function _initFieldColorContainer() {
//   let buildProject = KQ.Builder.BuilderProject.getInstance();
//   let layer = buildProject.setting.layer; // 当前激活的layer
//   let featureType = layer.options.featureType;
//
//   updateLegend(layer);
//
//   // 根据点、线、面来进行划分初始化
//   var containers = document.getElementsByClassName(featureType + " editor-fields-color");
//   for (var i = 0; i < containers.length; i++) {
//     // 判断当前节点是否展开
//     let expanded = false;
//     let $switchNode = $(containers[i]).find(".fields-div-switch");
//     if ($switchNode.length != 0 && !$switchNode.hasClass("state-close")) {
//       expanded = true;
//     }
//
//     // 清空，防止重复添加
//     $(containers[i]).empty();
//
//     var html = "";
//     var div = document.createElement("div");
//     var shapeClass = "icon-shape-" + featureType;
//
//     // 单值渲染模式
//     if (containers[i].classList.contains("single")) {
//       // 添加title
//       html += `<div class="title">
//                  <span>自定义单值</span>
//                   <div class="unique-show"><span>展开</span><i class="fa fa-plus-square-o fields-div-switch state-close"></i></div>
//                 </div>
//                 <div class="fields-container" style="display: none;">`;
//
//       // 得到颜色的数组
//       let colorFieldsArray = _getColorFieldsArray(featureType, "single");
//
//       // 遍历颜色数组，添加各行控件
//       colorFieldsArray.forEach(function (value, key) {
//         html += `<div class="fields-item">
//                 <span class="icon iconfont ` + shapeClass + ` colors-picker" style="color: ` + value + `"><div class="single-colors-picker" value=` + value + `></div></span>
//                 <span class="value">`;
//         html += key + `</span></div>`;
//       });
//
//       html += `</div>`;
//       div.innerHTML = html;
//       containers[i].appendChild(div);
//     } else if (containers[i].classList.contains("section")) {
//       // 添加title
//       html += `<div class="title">
//                  <span>自定义分段</span>
//                   <div class="unique-show"><span>展开</span><i class="fa fa-plus-square-o fields-div-switch state-close"></i></div>
//                 </div>
//                 <div class="fields-container" style="display: none;">`;
//
//       // 得到颜色数组、范围数组
//       let colorFieldsArray = _getColorFieldsArray(featureType, "section");
//       let rangeArray = _getRangeArray(featureType);
//
//       // 遍历颜色数组，添加各行控件
//       colorFieldsArray.forEach(function (value, index) {
//         html += `<div class="fields-item" data-index=` + index + ` >
//                     <span class="icon iconfont ` + shapeClass + ` colors-picker" style="color: ` + value + `"><div class="section-colors-picker" value=` + value + `></div></span>
//                     <div class="range-values">
//                       <input style="width: 100px" class="value-start" value=` + rangeArray[index].toFixed(3) + `>
//                       <span class="value-hr">-</span>
//                       <input style="width: 100px" class="value-end" value=` + rangeArray[index + 1].toFixed(3) + `>
//                     </div>
//                   </div>`;
//       })
//
//       html += `</div>`;
//       div.innerHTML = html;
//       containers[i].appendChild(div);
//
//       $(containers[i]).find(".value-start").kendoMaskedTextBox({});
//       $(containers[i]).find(".value-end").kendoMaskedTextBox({});
//     } else if (containers[i].classList.contains("heatmap")) {
//       html += `<div class="editor-fields-color" >
//             <div class="title"><span>自定义颜色</span>
//               <div class="unique-show"><span>展开</span><i class="fa fa-plus-square-o fields-div-switch state-close"></i></div>
//             </div>
//             <div class="fields-container" style="display: none;">`;
//       let colorFieldsObject = _getColorFieldsArray(featureType, "heatmap");
//       let colorFieldsArray = Object.keys(colorFieldsObject).sort();
//       colorFieldsArray.forEach(function (key, index) {
//         html += `<div class="editor-tool" data-key=` + key + `>
//                   <div class="text">热点颜色` + (Number(index) + 1) + `</div>
//                   <div class="heatmap-colors-picker" data-role="colorpicker" value="` + colorFieldsObject[key] + `"></div>
//                  </div>`;
//       })
//       html += `</div>`;
//       div.innerHTML = html;
//       containers[i].appendChild(div);
//     }
//
//     // 自定义单值颜色变化, colorpicker颜色变化后修改span的color
//     $(containers[i]).find(".single-colors-picker").kendoColorPicker({
//       button: false,
//       change: function (e) {
//         let color = e.value;
//         let key = $(this)[0].element.parents(".fields-item").find(".value").text();
//         let classList = $(this)[0].element.parents(".editor-fields-color")[0].classList;
//         let featureType = classList[1];
//         let renderType = classList[2];
//         let thematicColors = _getColorFieldsArray(featureType, renderType);
//
//         // 改变控件的颜色
//         $(this)[0].element.parents("span").css("color", color);
//
//         // 改变专题字段的填充色，并进行渲染
//         if (thematicColors.has(key)) {
//           thematicColors.set(key, color);
//         } else if (thematicColors.has(Number(key))) {
//           thematicColors.set(Number(key), color);
//         }
//         render();
//       },
//     });
//
//     // 自定义分段颜色变化, colorpicker颜色变化后修改span的color
//     $(containers[i]).find(".section-colors-picker").kendoColorPicker({
//       button: false,
//       change: function (e) {
//         let color = e.value;
//         let index = $(this)[0].element.parents(".fields-item").attr("data-index");
//         let classList = $(this)[0].element.parents(".editor-fields-color")[0].classList;
//         let featureType = classList[1];
//         let renderType = classList[2];
//         let thematicColors = _getColorFieldsArray(featureType, renderType);
//
//         // 改变控件的颜色
//         $(this)[0].element.parents("span").css("color", color);
//
//         // 改变专题字段的填充色，并进行渲染
//         thematicColors[index] = color;
//         render();
//       },
//     });
//
//     // 自定义热力图颜色变化， colorpicker颜色变化
//     $(containers[i]).find(".heatmap-colors-picker").kendoColorPicker({
//       button: false,
//       change: function (e) {
//         let color = e.value;
//         let key = $(this)[0].element.parents(".editor-tool").attr("data-key");
//
//         let buildProject = KQ.Builder.BuilderProject.getInstance();
//         let layer = buildProject.setting.layer; // 当前激活的layer
//         let renderModel = buildProject.getInfo('render_model');
//         let options = renderModel.styleOptions;
//
//         options.gradient = KQ.Common.CommonValues.heatmapColorRamp[options.colorIndex];
//         options.gradient[key] = color;
//
//         render();
//         initFieldColorContainer();
//       },
//     });
//
//     // 起始范围变化
//     $(containers[i]).find(".value-start input").change(function (e) {
//       let index = Number($(this).parents(".fields-item").attr("data-index"));
//       let classList = $(this).parents(".editor-fields-color")[0].classList;
//       let featureType = classList[1];
//       let renderType = classList[2];
//       let rangeArray = _getRangeArray(featureType, renderType);
//       let min_value = Number.MIN_SAFE_INTEGER;
//       let max_value = Number.MAX_SAFE_INTEGER;
//       let new_value = Number(e.target.value);
//       let $prev_node = null;
//
//       if (index - 1 >= 0) {
//         min_value = rangeArray[index - 1];
//         $prev_node = $(this).parents(".fields-item").prev().find(".value-end input");
//       }
//
//       if (index + 1 < rangeArray.length) {
//         max_value = rangeArray[index + 1];
//       }
//
//       if (new_value > min_value && new_value < max_value) {
//         rangeArray[index] = new_value;
//
//         if ($prev_node) {
//           $prev_node.val(new_value);
//         }
//       } else {
//         KQ.Control.Notification.getInstance().showError('数值范围不正确');
//         e.target.value = rangeArray[index];
//       }
//       render();
//     });
//
//     // 结束范围变化
//     $(containers[i]).find(".value-end input").change(function (e) {
//       let index = Number($(this).parents(".fields-item").attr("data-index")) + 1;
//       let classList = $(this).parents(".editor-fields-color")[0].classList;
//       let featureType = classList[1];
//       let renderType = classList[2];
//       let rangeArray = _getRangeArray(featureType, renderType);
//       let min_value = Number.MIN_SAFE_INTEGER;
//       let max_value = Number.MAX_SAFE_INTEGER;
//       let new_value = Number(e.target.value);
//       let $next_node = null;
//
//       if (index - 1 >= 0) {
//         min_value = rangeArray[index - 1];
//       }
//
//       if (index + 1 < rangeArray.length) {
//         max_value = rangeArray[index + 1];
//         $next_node = $(this).parents(".fields-item").next().find(".value-start input");
//       }
//
//       if (new_value > min_value && new_value < max_value) {
//         rangeArray[index] = new_value;
//
//         if ($next_node) {
//           $next_node.val(new_value);
//         }
//       } else {
//         KQ.Control.Notification.getInstance().showError('数值范围不正确');
//         e.target.value = rangeArray[index];
//       }
//       render();
//     });
//
//     $(containers[i]).find(".colors-picker").click(function () {
//       $(this).find(".k-selected-color")[0].click();
//     })
//
//     // 绑定自定义单值展开、收缩事件
//     $(containers[i]).find(".fields-div-switch").click(function () {
//       let self = $(this);
//       if (self.hasClass("state-close")) {
//         self.siblings("span").value = "展开";
//         self.parents(".title").siblings(".fields-container").css("display", "block");
//         self.removeClass("state-close");
//         self.removeClass("fa-plus-square-o");
//         self.addClass("fa-minus-square-o");
//       } else {
//         self.siblings("span").value = "收起";
//         self.parents(".title").siblings(".fields-container").css("display", "none");
//         self.addClass("state-close");
//         self.removeClass("fa-minus-square-o");
//         self.addClass("fa-plus-square-o");
//       }
//     })
//
//     // 如果需要展开，则触发click事件
//     if (expanded) {
//       $(containers[i]).find(".fields-div-switch").trigger('click');
//     }
//   }
// }
//
// function initFieldColorContainer() {
//   (asynProxy(_initFieldColorContainer))();
// }

// 更新图例
function updateLegend(layer) {
  // 如果图例窗口不显示，直接返回
  var display = $("#legend-window").parent().css("display");
  if (display == 'none') {
    return;
  }

  var renderType = layer.renderType;
  var render = layer.render;
  var options = layer.options;
  var featureType = options.featureType;
  var featureIcon = "item-icon icon iconfont icon-shape-point";
  if (featureType == "line") {
    featureIcon = "item-icon icon iconfont icon-shape-line";
  } else if (featureType == "polygon") {
    featureIcon = "item-icon icon iconfont icon-shape-polygon";
  }
  // 添加标题头
  var layerName = options.name;
  var item_title = document.createElement('div');
  item_title.setAttribute("class", "item-title");
  if (featureType == 'point') {
    var data_head = render.get(renderType).options.vectorInfo;
  } else if (featureType == 'line' || featureType == 'polygon') {
    data_head = render.get(renderType).options;
  }
  // 渲染类型为basic才显示icon
  if (renderType == "basic") {
    var title_icon = document.createElement('div');
    if (featureType == 'point') {
      var fillColor = data_head.fillColor;
    }
    if (featureType == 'line') {
      fillColor = data_head.lineColor;
    } else if (featureType == 'polygon') {
      fillColor = data_head.fillColor;
    }
    title_icon.setAttribute("class", featureIcon);
    title_icon.style.color = fillColor;
    title_icon.style.marginRight = "5px";
    item_title.append(title_icon);
  }
  var item_p = document.createElement('p');
  item_p.innerText = layerName;
  item_title.append(item_p);
  $("#legend-window .legend-item").empty();
  $("#legend-window .legend-item").append(item_title);

  var html = "";
  var div = document.createElement("div");
  div.className = "content-info";
  var shapeClass = "icon-shape-" + featureType;

  // 单值渲染模式
  if (renderType == "single") {
    html += "<div class=\"title\" style=\"margin: 10px 0 10px;\">\n                 <span>\u4E13\u9898\u5B57\u6BB5\uFF1A</span>\n                 <span>" + data_head.thematicField + "</span>\n                </div>\n                <div class=\"fields-container\" style=\"display: block;\">";

    // 得到颜色的数组
    var colorFieldsArray = _getColorFieldsArray(featureType, "single");

    // 遍历颜色数组，添加各行控件
    colorFieldsArray.forEach(function (value, key) {
      html += "<div class=\"fields-item\">\n                <span class=\"icon iconfont " + shapeClass + "\" style=\"color: " + value + "\"></span>\n                <span class=\"value\">";
      html += key + "</span></div>";
    });

    html += "</div>";
    div.innerHTML = html;
    $("#legend-window .legend-item").append(div);
  } else if (renderType == "section") {
    html += "<div class=\"title\"  style=\"margin: 10px 0 10px;\">\n                 <span>\u4E13\u9898\u5B57\u6BB5\uFF1A</span>\n                 <span>" + data_head.thematicField + "</span>\n                </div>\n                <div class=\"fields-container\" style=\"display: block;\">";

    // 得到颜色数组、范围数组
    var _colorFieldsArray = _getColorFieldsArray(featureType, "section");
    var rangeArray = _getRangeArray(featureType);

    // 遍历颜色数组，添加各行控件
    _colorFieldsArray.forEach(function (value, index) {
      html += "<div class=\"fields-item\" data-index=" + index + " >\n                    <span class=\"icon iconfont " + shapeClass + "\" style=\"color: " + value + "\"></span>\n                    <div class=\"range-values\">\n                      <input style=\"width: 50px\" class=\"value-start\" readonly=\"readonly\" value=" + rangeArray[index].toFixed(3) + ">\n                      <span class=\"value-hr\">-</span>\n                      <input style=\"width: 50px; float: right; margin-left: 20px;\" readonly=\"readonly\" class=\"value-end\" value=" + rangeArray[index + 1].toFixed(3) + ">\n                    </div>\n                  </div>";
    });

    html += "</div>";
    div.innerHTML = html;
    $("#legend-window .legend-item").append(div);
  } else if (renderType == "heatmap") {
    html += "<div class=\"fields-container\" style=\"display: block; margin-top: 5px;\">";

    var color_index = render.get(renderType).options.colorIndex;
    html += '<span>少</span><span style="margin-left: 80px;">中</span><span style="margin-left: 80px;">多</span>';
    html += "<span class=\"selected-value\" style=\"background-image: url(./images/heatmap_ramp/color" + color_index + ".png)\"></span>";
    html += "</div>";
    div.innerHTML = html;
    $("#legend-window .legend-item").append(div);
  }
}

// 包裹函数，返回一个异步执行的函数
function asynProxy(fn) {
  return function () {
    setTimeout(function () {
      fn();
    }, 0);
  };
}

/***************************************data source*********************************************************/

// 标签字体列表
function labelFontDropDownList() {
  return [{ name: "仿宋", value: KQ.Common.CommonValues.labelFontName.fangSong }, { name: "宋体", value: KQ.Common.CommonValues.labelFontName.song }, { name: "微软雅黑", value: KQ.Common.CommonValues.labelFontName.yaHei }];
}

// 专题字段列表
function specialFieldDropDownList() {
  var specialFieldDropDownList = [];
  var buildProject = KQ.Builder.BuilderProject.getInstance();

  var layer = buildProject.setting.layer; // 当前激活的layer
  var render = layer.getRender();
  var fields = Object.keys(render.geojsonObjectFields());

  for (var i = 0; i < fields.length; ++i) {
    specialFieldDropDownList.push({ name: fields[i], value: fields[i] });
  }

  return specialFieldDropDownList;
}

// 分段专题字段列表
function sectionSpecialFieldDropDownList() {
  var sectionSpecialFieldDropDownList = [];
  var buildProject = KQ.Builder.BuilderProject.getInstance();

  var layer = buildProject.setting.layer; // 当前激活的layer
  var render = layer.getRender();
  var fields = Object.keys(render.geojsonObjectSectionFields());

  for (var i = 0; i < fields.length; ++i) {
    sectionSpecialFieldDropDownList.push({ name: fields[i], value: fields[i] });
  }

  return sectionSpecialFieldDropDownList;
}

// 标签字段列表
function labelFieldDropDownList() {
  return fieldsDropDownList();
}

// 权重字段列表
function weightFieldDropDownList() {
  return fieldsDropDownList();
}

function fieldsDropDownList() {
  var fieldsDropDownList = [{ name: "未设置", value: "" }];
  var buildProject = KQ.Builder.BuilderProject.getInstance();

  var layer = buildProject.setting.layer; // 当前激活的layer
  var render = layer.getRender();
  var fields = Object.keys(render.geojsonObjectFields());

  for (var i = 0; i < fields.length; ++i) {
    fieldsDropDownList.push({ name: fields[i], value: fields[i] });
  }

  return fieldsDropDownList;
}

// 线样式列表
function lineStyleDropDownList() {
  var lineStyleDropDownList = [];
  var lineStyle = Object.values(KQ.Common.CommonValues.lineStyle);

  for (var i = 0; i < lineStyle.length; ++i) {
    lineStyleDropDownList.push({ name: String(i), value: lineStyle[i] });
  }

  return lineStyleDropDownList;
}

// 分段方式列表
function subsectionTypeDropDownList() {
  return [{ name: "等距分段法", value: KQ.Common.CommonValues.classBreaksMethod.classBreaks_equidistant }, { name: "等量分段法", value: KQ.Common.CommonValues.classBreaksMethod.classBreaks_quantile }, { name: "对数分段法", value: KQ.Common.CommonValues.classBreaksMethod.classBreaks_logarithmic }, { name: "K聚类分段法", value: KQ.Common.CommonValues.classBreaksMethod.classBreaks_k_means }];
}

function subsectionNumberDropDownList() {
  var subsectionNumberDropDownList = [];

  for (var i = 2; i < 16; ++i) {
    subsectionNumberDropDownList.push({ name: String(i), value: i });
  }

  return subsectionNumberDropDownList;
}

// 色带样式列表
function rampColorDropDownList() {
  var length = 30; // 一共有30种色块
  var rampColorDropDownList = [];

  for (var i = 0; i < length; ++i) {
    rampColorDropDownList.push({ name: String(i), value: String(i) });
  }

  return rampColorDropDownList;
}

// 热力图色带样式列表
function heatmapRampColorDropDownList() {
  var length = 18; // 一共有18种色块
  var heatmapRampColorDropDownList = [];

  for (var i = 0; i < length; ++i) {
    heatmapRampColorDropDownList.push({ name: String(i), value: String(i) });
  }

  return heatmapRampColorDropDownList;
}

// 标签方向列表
function labelDirectionDropDownList() {
  return [{ name: "中", value: "mid" }, { name: "上", value: "up" }, { name: "下", value: "down" }, { name: "左", value: "left" }, { name: "右", value: "right" }];
}

// 标签方向列表
function extraIconShape() {
  return [{ name: "圆形", value: "circle" }, { name: "方形", value: "square" }, { name: "星形", value: "star" }, { name: "五角星", value: "penta" }];
}

// 手绘图层 点图层 渲染方式切换按钮组
function initPointTypeSwitchingContainer() {
  var containers = document.getElementsByClassName("point-type-switching-container");

  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");

    div.innerHTML = "\n            <ul class=\"point-type-switching\">\n                <li style=\"width: 113px\">\u77E2\u91CF\u70B9\u7B26\u53F7</li>\n                <li style=\"width: 113px\">\u5411\u91CF\u70B9\u7B26\u53F7</li>\n                <li style=\"width: 113px\">\u56FE\u5F62\u70B9\u7B26\u53F7</li>\n            </ul>\n            ";
    containers[i].appendChild(div);
  }
}

function initPointRenderType0Container() {
  var containers = document.getElementsByClassName("point-render-type-0-container");

  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");

    div.innerHTML = "\n            <div class=\"hand-draw-svg-symbols\" style=\"height: 130px; overflow: auto; width: 327px; margin: 10px\"></div>\n           \n            <div class=\"hand-draw-extra-icon-shape-container\"></div>\n            <div class=\"hand-draw-extra-icon-marker-color-container\"></div>\n            <div class=\"hand-draw-extra-icon-icon-color-container\"></div>\n            <div class=\"hand-draw-extra-icon-zoom-rate-container\"></div>\n            ";
    containers[i].appendChild(div);
  }

  // 进行数据的填充
  fillHandDrawSvgSymbols();
}

function fillHandDrawSvgSymbols() {
  // 首先清空面板
  $(".hand-draw-svg-symbols").empty();

  var icons_unicode = ["&#xe614", "&#xe6e3", "&#xe6ad", "&#xe629", "&#xe613", "&#xe66b", "&#xe65a", "&#xe75f", "&#xe656", "&#xe679", "&#xe657", "&#xe652", "&#xe615", "&#xe67e", "&#xe620", "&#xe7df", "&#xe667", "&#xe666", "&#xe642", "&#xe640", "&#xe628", "&#xe67b", "&#xeac9", "&#xe63f", "&#xe61a", "&#xe64d", "&#xe626", "&#xe6cb", "&#xe6b5", "&#xe689", "&#xe6f6", "&#xe71c", "&#xe646", "&#xe6c7", "&#xe671", "&#xe66f", "&#xe641", "&#xe63e", "&#xe63a", "&#xe676", "&#xe739", "&#xe651", "&#xe663", "&#xe67a", "&#xe677", "&#xe612", "&#xe81f", "&#xe65c", "&#xe664", "&#xe665", "&#xe61f", "&#xe623", "&#xe624", "&#xe62a"];

  var rows = 6;
  var cols = 9;

  for (var i = 0; i < rows; ++i) {
    var _$row = $('<div class="symbol-row"></div>');

    for (var j = 0; j < cols; ++j) {
      var $column = $('<div class="iconfont"></div>');
      $column.html(icons_unicode[i * cols + j]);

      // 图标选中的事件
      // $column.click(function () {
      //   $(this).closest(".editor-tool").find(".default-point-icon div").eq(0).trigger('icon_selected', icons_unicode[i * 6 + j]);
      // })

      _$row.append($column);
    }

    $(".hand-draw-svg-symbols").append(_$row);
  }
}

// 点数据 标签位置
function initHandDrawExtraIconShapeContainer() {
  var containers = document.getElementsByClassName("hand-draw-extra-icon-shape-container");

  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">\u6807\u8BB0\u5F62\u72B6</div>\n                <select class=\"extra-icon-shape-list\" data-bind=\"value: styleOptions.vectorInfo.shape\"/>\n            </div>        \n            ";
    containers[i].appendChild(div);
  }
}

// 点数据 标签位置
function initHandDrawExtraIconMarkerColorContainer() {
  var containers = document.getElementsByClassName("hand-draw-extra-icon-marker-color-container");

  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">\u6807\u8BB0\u989C\u8272</div>\n                <input class=\"colors-picker-input\" data-role=\"colorpicker\" data-bind=\"value: styleOptions.vectorInfo.markerColor\"/>\n            </div>        \n            ";
    containers[i].appendChild(div);
  }
}

// 点数据 标签位置
function initHandDrawExtraIconIconColorContainer() {
  var containers = document.getElementsByClassName("hand-draw-extra-icon-icon-color-container");

  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool lable-select\">\n                <div class=\"text\">Icon\u989C\u8272</div>\n                    <input class=\"colors-picker-input\" data-role=\"colorpicker\"\n                           data-bind=\"value: styleOptions.vectorInfo.iconColor\"/>\n            </div>        \n            ";
    containers[i].appendChild(div);
  }
}

// // 点数据 标签位置
// function initHandDrawExtraIconZoomRateContainer() {
//   var containers = document.getElementsByClassName("hand-draw-extra-icon-icon-color-container");
//
//   for (var i = 0; i < containers.length; i++) {
//     var div = document.createElement("div");
//     div.innerHTML = `
//             <div class="editor-tool lable-select">
//                 <div class="text">Icon颜色</div>
//                     <input class="colors-picker-input" data-role="colorpicker"
//                            data-bind="value: styleOptions.labelColor"/>
//             </div>
//             `;
//     containers[i].appendChild(div);
//   }
// }

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
(function (global){
/**
 * Created by zhumou on 2019/11/12.
 */

'use strict';

// 第一部分 创建html部分

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

global.createParametersHtml = function (selector) {
  createParameterSrcLayersHtml(selector);
  createParameterDifferenceLayersHtml(selector);
  createParameterOverlapLayersHtml(selector);
  createParameterDestLayersHtml(selector);

  createParameterGeoSRSHtml(selector);
  createParameterDestGeoSRSHtml(selector);
  createParameterPrjHtml(selector);

  createParameterOutSRSHtml(selector);
  createParameterOutSRSTypeHtml(selector);
  createParameterAreaSRSHtml(selector);
  createAnalysisItemRunHtml(selector);
  createParameterGeometryAttributeHtml(selector);
  createParameterExportShpFormatHtml(selector);
  createParameterBufferSideTypeHtml(selector);
  createParameterBufferRadiusHtml(selector);
  createParameterGeometry1Html(selector);
  createParameterGeometry2Html(selector);
  createParameterOperatorTypeHtml(selector);
  createParameterOperatorCheckGeoHtml(selector);
  createParameterReturnFieldsAreaHtml(selector);
  createParameterReturnFieldsLengthHtml(selector);
  createParameterToleranceHtml(selector);
  createParameterCheckParamsPointLimitHtml(selector);
  createParameterCheckParamsAreaLimitHtml(selector);

  createParameterResultHtml(selector);
  createParameterHandleResultHtml(selector);
  createParameterReturnResultButtonHtml(selector);

  createParameterGroupFieldsHtml(selector);
  createParameterSummaryFieldsHtml(selector);
  createParameterSummarTypesHtml(selector);

  createParameterFieldsHtml(selector);
  createParameterOperationSymbolsHtml(selector);
  createParameterFieldValuesHtml(selector);
  createParameterSQLsHtml(selector);
};

global.isValidElement = function (selector) {
  return $(selector).length > 0;
};

global.createParameterSrcLayersHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-src-layers")) {
    return;
  } else {
    $(selector + " .parameter-src-layers").append("\n        <label>\n            \u6E90\u56FE\u5C42\n        </label>\n        <div class=\"control\"></div>");
  }
};

global.createParameterDifferenceLayersHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-difference-layers")) {
    return;
  } else {
    $(selector + " .parameter-difference-layers").append("\n        <label>\n            \u5DEE\u5F02\u56FE\u5C42\n        </label>\n        <div class=\"control\"></div>");
  }
};

global.createParameterOverlapLayersHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-overlap-layers")) {
    return;
  } else {
    $(selector + " .parameter-overlap-layers").append("\n        <label>\n            \u53E0\u7F6E\u56FE\u5C42\n        </label>\n        <div class=\"control\"></div>");
  }
};

global.createParameterDestLayersHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-dest-layers")) {
    return;
  } else {
    $(selector + " .parameter-dest-layers").append("\n        <label>\n             \u76EE\u6807\u56FE\u5C42\n        </label>\n        <div class=\"control\"></div>\n    ");
  }
};

global.createParameterGeometry1Html = function (selector) {
  if (!isValidElement(selector + " .parameter-operator-geometry1")) {
    return;
  } else {
    $(selector + " .parameter-operator-geometry1").append("\n        <label>\u51E0\u4F55\u5BF9\u8C61A</label>\n        <div class=\"control\"></div>\n    ");
  }
};

global.createParameterGeometry2Html = function (selector) {
  if (!isValidElement(selector + " .parameter-operator-geometry2")) {
    return;
  } else {
    $(selector + " .parameter-operator-geometry2").append("\n        <label>\u51E0\u4F55\u5BF9\u8C61B</label>\n        <div class=\"control\"></div>\n    ");
  }
};

global.createParameterGeoSRSHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-geo-srs")) {
    return;
  } else {
    $(selector + " .parameter-geo-srs").append("\n        <label>\u6E90\u56FE\u5F62\u7A7A\u95F4\u53C2\u8003</label>\n        <div class=\"control-text-area\">\n            <textarea class=\"k-textbox\"></textarea>\n        </div>\n    ");
  }
};

global.createParameterPrjHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-prj")) {
    return;
  } else {
    $(selector + " .parameter-prj").append("\n        <label>\u6E90\u7A7A\u95F4\u53C2\u8003</label>\n        <div class=\"control-text-area\">\n            <textarea class=\"k-textbox\"></textarea>\n        </div>\n    ");
  }
};

global.createParameterDestGeoSRSHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-dest-geo-srs")) {
    return;
  } else {
    $(selector + " .parameter-dest-geo-srs").append("\n        <label>\u76EE\u6807\u56FE\u5F62\u7A7A\u95F4\u53C2\u8003</label>\n        <div class=\"control-text-area\">\n            <textarea class=\"k-textbox\"></textarea>\n        </div>\n    ");
  }
};

global.createParameterOutSRSHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-out-srs")) {
    return;
  } else {
    $(selector + " .parameter-out-srs").append("\n        <label>\u76EE\u6807\u7A7A\u95F4\u53C2\u8003</label>\n        <div class=\"control-text-area\">\n            <textarea class=\"k-textbox\"></textarea>\n        </div>\n    ");
  }
};

global.createParameterOutSRSTypeHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-out-srs-type")) {
    return;
  } else {
    $(selector + " .parameter-out-srs-type").append("\n        <label>\u76EE\u6807\u7A7A\u95F4\u53C2\u8003\u7C7B\u578B</label>\n        <div class=\"control\"></div>\n    ");
  }
};

global.createParameterAreaSRSHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-area-srs")) {
    return;
  } else {
    $(selector + " .parameter-area-srs").append("\n        <label>\u8BA1\u7B97\u9762\u79EF\u6240\u4F7F\u7528\u7684\u7A7A\u95F4\u53C2\u8003</label>\n        <div class=\"control-text-area\">\n            <textarea class=\"k-textbox\"></textarea>\n        </div>\n    ");
  }
};

global.createParameterReturnFieldsAreaHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-return-fields-area")) {
    return;
  } else {
    $(selector + " .parameter-return-fields-area").append("\n        <label>\u8FD4\u56DE\u56FE\u5F62\u7684\u9762\u79EF (\u5E73\u65B9\u7C73)</label>\n        <div class=\"control\">\n            <input type=\"text\" class=\"k-input k-textbox\">\n        </div>\n    ");
  }
};

global.createParameterReturnFieldsLengthHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-return-fields-length")) {
    return;
  } else {
    $(selector + " .parameter-return-fields-length").append("\n        <label>\u8FD4\u56DE\u56FE\u5F62\u7684\u957F\u5EA6 (\u7C73)</label>\n        <div class=\"control\">\n            <input type=\"text\" class=\"k-input k-textbox\">\n        </div>\n    ");
  }
};

global.createParameterToleranceHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-tolerance")) {
    return;
  } else {
    $(selector + " .parameter-tolerance").append("\n        <label>\u5BB9\u5DEE (\u7C73)</label>\n        <div class=\"control\">\n            <input type=\"number\" class=\"tolerance\">\n        </div>\n    ");
  }
};

global.createParameterCheckParamsPointLimitHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-geometry-check-params-pointLimit")) {
    return;
  } else {
    $(selector + " .parameter-geometry-check-params-pointLimit").append("\n        <label>\u5BB9\u5DEE (\u7C73)</label>\n        <div class=\"control\">\n            <input class=\"pointLimit\" type=\"number\">\n        </div>\n    ");
  }
};

global.createParameterCheckParamsAreaLimitHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-geometry-check-params-areaLimit")) {
    return;
  } else {
    $(selector + " .parameter-geometry-check-params-areaLimit").append("\n        <label>\u6700\u5C0F\u9762\u79EF (\u5E73\u65B9\u7C73)</label>\n        <div class=\"control\">\n            <input class=\"areaLimit\" type=\"number\">\n        </div>\n    ");
  }
};

global.createParameterGeometryAttributeHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-geometry-attribute")) {
    return;
  } else {
    $(selector + " .parameter-geometry-attribute").append("\n        <label>\u9700\u8981\u8BA1\u7B97\u7684\u5C5E\u6027\u53C2\u6570</label>\n        <div class=\"control\"></div>\n    ");
  }
};

global.createParameterExportShpFormatHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-exportshp-format")) {
    return;
  } else {
    $(selector + " .parameter-exportshp-format").append("\n        <label>\u8FD4\u56DE\u7ED9\u524D\u7AEF\u65F6\u7684\u683C\u5F0F</label>\n        <div class=\"control\"></div>\n    ");
  }
};

global.createParameterBufferSideTypeHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-buffer-sideType")) {
    return;
  } else {
    $(selector + " .parameter-buffer-sideType").append("\n        <label>\u7F13\u51B2\u533A\u65B9\u5411</label>\n        <div class=\"control\">\n            <input type=\"text\" class=\"sideType\">\n        </div>\n    ");
  }
};

global.createParameterBufferRadiusHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-buffer-radius")) {
    return;
  } else {
    $(selector + " .parameter-buffer-radius").append("\n        <label>\u7F13\u51B2\u534A\u5F84 (\u7C73)</label>\n        <div class=\"control\">\n            <input type=\"number\" class=\"radius\" min=\"0\" max=\"1000000\">  \n        </div>\n    ");
  }
};

global.createParameterOperatorTypeHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-operator-type")) {
    return;
  } else {
    $(selector + " .parameter-operator-type").append("\n        <label>\u56FE\u5F62\u64CD\u4F5C\u7C7B\u578B</label>\n        <div class=\"control\"></div>\n    ");
  }
};

global.createParameterOperatorCheckGeoHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-operator-checkGeo")) {
    return;
  } else {
    $(selector + " .parameter-operator-checkGeo").append("\n        <label>\u662F\u5426\u68C0\u67E5\u51E0\u4F55</label>\n        <div class=\"control\"></div>\n    ");
  }
};

global.createParameterResultHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-result")) {
    return;
  } else {
    $(selector + " .parameter-result").append("\n        <label>\u5206\u6790\u7ED3\u679C</label>\n        <div class=\"control-text-area\">\n            <textarea class=\"k-textbox\"></textarea>\n            <div class=\"copy\" style=\"display: none;\">\u590D\u5236</div>\n        </div>\n    ");
  }
};

global.createParameterHandleResultHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-handle-result")) {
    return;
  } else {
    $(selector + " .parameter-handle-result").append("\n        <label>\u7ED3\u679C\u56FE\u5C42\u540D\u79F0</label>\n        <div class=\"control\">\n            <input type=\"text\" class=\"k-input k-textbox\">\n            <div class=\"handle-button\">\n                <button class=\"save-layer\">\u4FDD\u5B58\u56FE\u5C42</button>\n                <button class=\"cancel\">\u64A4\u9500\u56FE\u5C42</button>\n            </div>\n        </div>\n    ");
  }
};

global.createParameterReturnResultButtonHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-return-result-button")) {
    return;
  } else {
    $(selector + " .parameter-return-result-button").append("\n      <div class=\"control\">\n        <button class=\"return-result\">\u5206\u6790\u7ED3\u679C</button>\n      </div>\n    ");
  }
};

global.createAnalysisItemRunHtml = function (selector) {
  if (!isValidElement(selector + " .analysis-item-run")) {
    return;
  } else {
    $(selector + " .analysis-item-run").append("\n        <hr>\n        <div class=\"control k-primary k-button\">\u8FD0\u884C\u5206\u6790</div>\n    ");
  }
};

global.createParameterGroupFieldsHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-groupfields")) {
    return;
  } else {
    $(selector + " .parameter-groupfields").append("\n        <label>\u5206\u7EC4\u5B57\u6BB5</label>\n        <div class=\"control\"></div>");
  }
};

global.createParameterSummaryFieldsHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-summaryfields")) {
    return;
  } else {
    $(selector + " .parameter-summaryfields").append("\n        <label>\u6C47\u603B\u5B57\u6BB5</label>\n        <div class=\"control\"></div>");
  }
};

global.createParameterSummarTypesHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-summarytypes")) {
    return;
  } else {
    $(selector + " .parameter-summarytypes").append("\n        <label>\u6C47\u603B\u7C7B\u578B</label>\n        <div class=\"control\"></div>");
  }
};

// 初始化字段信息
global.createParameterFieldsHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-fields")) {
    return;
  } else {
    $(selector + " .parameter-fields").append("\n        <label>\u5B57\u6BB5\u4FE1\u606F</label>\n        <div class=\"control\"></div>");
  }
};

global.createParameterOperationSymbolsHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-operation-symbols")) {
    return;
  } else {
    $(selector + " .parameter-operation-symbols").append("\n        <div class=\"control\">\n            <div>\n                <button class=\"equal\"> = </button>\n                <button class=\"less-than\"> < </button>\n                <button class=\"greater-than\"> > </button>\n            </div>\n            \n            <div>\n                <button class=\"greater-or-equal\"> >= </button>\n                <button class=\"less-or-equal\" > <= </button>\n                <button class=\"greater-or-less-button\"> <> </button>\n            </div>\n\n            <div>\n                <button class=\"like\"> LIKE </button>\n                <button class=\"or\"> OR </button>\n                <button class=\"and\"> AND </button>\n            </div>\n        </div>");
  }
};

global.createParameterFieldValuesHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-field-values")) {
    return;
  } else {
    $(selector + " .parameter-field-values").append("\n        <label>\u5B57\u6BB5\u503C</label>\n        <div class=\"control\">\n            <div class=\"field-values\"></div>\n            <button style=\"width: 90px\"> \u83B7\u53D6\u552F\u4E00\u503C </button>\n        </div>");
  }
};

global.createParameterSQLsHtml = function (selector) {
  if (!isValidElement(selector + " .parameter-sql")) {
    return;
  } else {
    $(selector + " .parameter-sql").append("\n        <label>\u67E5\u8BE2\u6761\u4EF6</label>\n        <div class=\"control-text-area\">\n            <textarea id=\"sql-condition\" class=\"k-textbox\"></textarea>\n        </div>");
  }
};

// 第二部分 初始化控件
global.initControls = function (selector) {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  buildProject.analysis_controls[selector] = new Map(); // 存放控件

  initSrcLayersControl(selector);
  initDifferenceLayersControl(selector);
  initOverlapLayersControl(selector);
  initDestLayersControl(selector);
  initPrjControl(selector);

  initOperatorGeometry1LayersControl(selector);
  initOperatorGeometry2LayersControl(selector);

  initGeoSRSControl(selector);
  initOutSRSControl(selector);
  initOutSRSTypeControl(selector);
  initDestGeoSRSControl(selector);
  initGeometryAttributeControl(selector);
  initExportShpFormatControl(selector);
  initOperatorTypeControl(selector);
  initOperatorCheckGeoControl(selector);
  initBufferRadiusControl(selector);
  initReturnFieldsAreaControl(selector);
  initReturnFieldsLengthControl(selector);
  initToleranceControl(selector);
  initCheckParamsPointLimitControl(selector);
  initCheckParamsAreaLimitControl(selector);

  initResultControl(selector);
  initHandleResultControl(selector);
  initReturnResultButtonControl(selector);

  initGroupFieldsControl(selector);
  initSummaryFieldsControl(selector);
  initSummaryTypesControl(selector);

  initFieldsControl(selector);
  initOperationSymbolsControl(selector);
  initFieldValuesControl(selector);

  // 存放运行分析按钮
  buildProject.analysis_controls[selector].set(selector + " run", $(selector + " .analysis-item-run .control"));
};

global.setOverlayPanezIndex = function (zIndex) {
  mapView.getPane('overlayPane').style.zIndex = zIndex;
};

global.initSrcLayersControl = function (selector) {
  if (!isValidElement(selector + " .parameter-src-layers .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var control = _createLayersControl(selector + " .parameter-src-layers .control");

    control.bind('dataBound', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // 防止图层还未添加完毕，就进行查询，结果为空
              setTimeout(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        control.trigger('change');

                      case 1:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, this);
              })), 100);

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, this);
    })));

    control.bind('change', _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
      var controlsMap, geoSRS;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              controlsMap = KQ.Builder.BuilderProject.getInstance().analysis_controls[selector];
              geoSRS = _getGeoSRSFromControl(selector + " src-layers");

              $(selector + " .parameter-geo-srs .k-textbox").html(geoSRS);

              if (isValidElement(selector + " .parameter-buffer-sideType .control .sideType")) {
                controlsMap.get(selector + " bufferSideType").setDataSource(bufferSideTypeDataSource(selector));
                controlsMap.get(selector + " bufferSideType").value(bufferSideTypeDataSource(selector)[0]);
              }

              // 填充分组字段和汇总字段

              if (!(isValidElement(selector + " .parameter-groupfields .control") && isValidElement(selector + " .parameter-summaryfields .control"))) {
                _context3.next = 7;
                break;
              }

              _context3.next = 7;
              return fillGroupFieldsAndSummaryFields(selector);

            case 7:
              if (!isValidElement(selector + " .parameter-fields .control")) {
                _context3.next = 10;
                break;
              }

              _context3.next = 10;
              return fillQueryFields(selector);

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    })));

    buildProject.analysis_controls[selector].set(selector + " src-layers", control);
  }
};

// 填充分组字段与汇总字段
global.fillGroupFieldsAndSummaryFields = function () {
  var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(selector) {
    var controlsMap, fields, groupfields, summaryfields, groupFieldsControl, summaryFieldsControl;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            controlsMap = KQ.Builder.BuilderProject.getInstance().analysis_controls[selector];
            _context4.next = 3;
            return getFieldsFromLayer(selector, true);

          case 3:
            fields = _context4.sent;


            if (fields) {
              groupfields = [];
              summaryfields = [];


              fields.groupfields.forEach(function (item) {
                groupfields.push({ name: item.name, value: item.name });
              });

              fields.summaryfields.forEach(function (item) {
                summaryfields.push({ name: item.name, value: item.name });
              });

              // 汇总字段中加上面积和长度
              summaryfields.push({ name: "面积", value: "$area$" });
              summaryfields.push({ name: "长度", value: "$length$" });

              groupFieldsControl = controlsMap.get(selector + " groupfields");

              groupFieldsControl.setDataSource(groupfields);
              groupFieldsControl.select(0);

              summaryFieldsControl = controlsMap.get(selector + " summaryfields");

              summaryFieldsControl.setDataSource(summaryfields);
              summaryFieldsControl.select(0);
            } else {
              controlsMap.get(selector + " groupfields").setDataSource([]);
              controlsMap.get(selector + " summaryfields").setDataSource([]);
            }

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function (_x) {
    return _ref4.apply(this, arguments);
  };
}();

// 填充查询字段
global.fillQueryFields = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(selector) {
    var controlsMap, queryFields, fieldsControl;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            controlsMap = KQ.Builder.BuilderProject.getInstance().analysis_controls[selector];
            _context5.next = 3;
            return getQueryFields(selector);

          case 3:
            queryFields = _context5.sent;
            fieldsControl = controlsMap.get(selector + " fields");


            fieldsControl.setDataSource(new kendo.data.DataSource({ data: queryFields }));
            fieldsControl.select(fieldsControl.element.children().first());

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function (_x2) {
    return _ref5.apply(this, arguments);
  };
}();

// 返回查询字段
global.getQueryFields = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(selector) {
    var data, result, fields;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            data = [];

            if (!isValidElement(selector + " .parameter-fields .control")) {
              _context6.next = 6;
              break;
            }

            _context6.next = 4;
            return getFieldsFromLayer(selector, false);

          case 4:
            result = _context6.sent;


            if (result) {
              fields = result.fields;


              fields.forEach(function (item) {
                data.push({ name: item.name });
              });
            }

          case 6:
            return _context6.abrupt("return", data);

          case 7:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function (_x3) {
    return _ref6.apply(this, arguments);
  };
}();

global.initDifferenceLayersControl = function (selector) {
  if (!isValidElement(selector + " .parameter-difference-layers .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var control = _createLayersControl(selector + " .parameter-difference-layers .control");

    buildProject.analysis_controls[selector].set(selector + " difference-layers", control);
  }
};

global.initOverlapLayersControl = function (selector) {
  if (!isValidElement(selector + " .parameter-overlap-layers .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var control = _createLayersControl(selector + " .parameter-overlap-layers .control");

    buildProject.analysis_controls[selector].set(selector + " overlap-layers", control);
  }
};

global.initDestLayersControl = function (selector) {
  if (!isValidElement(selector + " .parameter-dest-layers .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var control = _createLayersControl(selector + " .parameter-dest-layers .control");

    control.bind('change', function () {
      var geoSRS = _getGeoSRSFromControl(selector + " dest-layers");
      $(selector + " .parameter-dest-geo-srs .k-textbox").html(geoSRS);
    });

    buildProject.analysis_controls[selector].set(selector + " dest-layers", control);
  }
};

global.initOperatorGeometry1LayersControl = function (selector) {
  if (!isValidElement(selector + " .parameter-operator-geometry1 .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var control = _createLayersControl(selector + " .parameter-operator-geometry1 .control");

    buildProject.analysis_controls[selector].set(selector + " geometry1-layers", control);
  }
};

global.initOperatorGeometry2LayersControl = function (selector) {
  if (!isValidElement(selector + " .parameter-operator-geometry2 .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var control = _createLayersControl(selector + " .parameter-operator-geometry2 .control");

    buildProject.analysis_controls[selector].set(selector + " geometry2-layers", control);
  }
};

global._createLayersControl = function (selector) {
  var dataSource = KQ.Builder.BuilderCommon.layersControlDataSource();

  return $(selector).kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",
    dataSource: dataSource,
    index: 0
  }).data('kendoDropDownList');
};

global._getGeoSRSFromControl = function (control) {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var selector = buildProject.setting.analysisCurrentPage;
  var controlsMap = buildProject.analysis_controls[selector];
  var layersControl = controlsMap.get(control);
  var layerFeatureCollection = KQ.Builder.BuilderLayerDatas.getInstance().getData(layersControl.value());

  return KQ.Builder.BuilderCommon.getGeoSRSFromGeojson(layerFeatureCollection);
};

global.initGeoSRSControl = function (selector) {
  if (!isValidElement(selector + " .parameter-geo-srs .k-textbox")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var geoSRS = _getGeoSRSFromControl(selector + " src-layers");

    $(selector + " .parameter-geo-srs .k-textbox").html(geoSRS);
    buildProject.analysis_controls[selector].set(selector + " geoSRS", $(selector + " .parameter-geo-srs .k-textbox"));
  }
};

global.initPrjControl = function (selector) {
  if (!isValidElement(selector + " .parameter-prj .k-textbox")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    $(selector + " .parameter-prj .k-textbox").html("EPSG:4326");

    buildProject.analysis_controls[selector].set(selector + " prj", $(selector + " .parameter-prj .k-textbox"));
  }
};

global.initDestGeoSRSControl = function (selector) {
  if (!isValidElement(selector + " .parameter-dest-geo-srs .k-textbox")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var geoSRS = _getGeoSRSFromControl(selector + " dest-layers");

    $(selector + " .parameter-dest-geo-srs .k-textbox").html(geoSRS);
    buildProject.analysis_controls[selector].set(selector + " destGeoSRS", $(selector + " .parameter-dest-geo-srs .k-textbox"));
  }
};

global.initOutSRSControl = function (selector) {
  if (!isValidElement(selector + " .parameter-out-srs .k-textbox")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    $(selector + " .parameter-out-srs .k-textbox").html('EPSG:4326');
    buildProject.analysis_controls[selector].set(selector + " outSRS", $(selector + " .parameter-out-srs .k-textbox"));
  }
};

global.initOutSRSTypeControl = function (selector) {
  if (!isValidElement(selector + " .parameter-out-srs-type .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var dataSource = ['proj4', 'epsg', 'wkt', 'esri'];

    var control = $(selector + " .parameter-out-srs-type .control").kendoDropDownList({
      dataSource: dataSource
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " outSRSType", control);
  }
};

global.initGeometryAttributeControl = function (selector) {
  if (!isValidElement(selector + " .parameter-geometry-attribute .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var dataSource = [{ text: '面积', value: 'area' }, { text: '长度', value: 'length' }, { text: '中心点', value: 'center' }, { text: '外接矩形', value: 'bound' }];

    var control = $(selector + " .parameter-geometry-attribute .control").kendoDropDownList({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: dataSource,
      index: 0,
      value: dataSource[0]
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " geometryAttribute", control);
  }
};

global.initExportShpFormatControl = function (selector) {
  if (!isValidElement(selector + " .parameter-exportshp-format .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var dataSource = ['filestream'];

    var control = $(selector + " .parameter-exportshp-format .control").kendoMultiSelect({
      dataSource: dataSource
    }).data('kendoMultiSelect');

    buildProject.analysis_controls[selector].set(selector + " exportShpFormat", control);
  }
};

function bufferSideTypeDataSource(selector) {
  var dataSource = void 0;
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var controlsMap = buildProject.analysis_controls[selector];
  var layersControl = controlsMap.get(selector + " src-layers");
  if (layersControl.value() === '') {
    dataSource = ['both'];
  } else {
    var layerFeatureCollection = KQ.Builder.BuilderLayerDatas.getInstance().getData(layersControl && layersControl.value());
    if (layerFeatureCollection === undefined) {
      dataSource = [];
    } else {
      var data = KQ.Common.CommonTools.getGeomFromFeatureCollection(layerFeatureCollection);
      if (data.geometries[0].type === "Point") {
        dataSource = ['outer', 'left', 'both'];
      } else if (data.geometries[0].type === "LineString") {
        dataSource = ['left', 'right', 'both'];
      } else if (data.geometries[0].type === "Polygon" || "MultiPolygon") {
        dataSource = ['inner', 'outer', 'both'];
      } else {
        dataSource = ['both'];
      }
    }
  }
  return dataSource;
}

global.initBufferSideTypeControl = function (selector) {
  if (!isValidElement(selector + " .parameter-buffer-sideType .control .sideType")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var control = $(selector + " .parameter-buffer-sideType .control .sideType").kendoDropDownList({
      dataSource: bufferSideTypeDataSource(selector),
      value: bufferSideTypeDataSource(selector)[0]
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " bufferSideType", control);
  }
};

global.initOperatorTypeControl = function (selector) {
  if (!isValidElement(selector + " .parameter-operator-type .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var dataSource = ['intersect', 'equals', 'disjoint', 'touches', 'crosses', 'within', 'contains', 'overlaps'];

    var control = $(selector + " .parameter-operator-type .control").kendoDropDownList({
      dataSource: dataSource
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " operatorType", control);
  }
};

global.initOperatorCheckGeoControl = function (selector) {
  if (!isValidElement(selector + " .parameter-operator-checkGeo .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var dataSource = ['true', 'false'];

    var control = $(selector + " .parameter-operator-checkGeo .control").kendoDropDownList({
      dataSource: dataSource
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " operatorCheckGeo", control);
  }
};

global.initCheckParamsPointLimitControl = function (selector) {
  if (!isValidElement(selector + " .parameter-geometry-check-params-pointLimit .control .pointLimit")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var AreaLimitcontrol = $(selector + " .parameter-geometry-check-params-pointLimit .control .pointLimit").kendoNumericTextBox({
      value: 0
    }).data('kendoNumericTextBox');

    buildProject.analysis_controls[selector].set(selector + " pointLimit", AreaLimitcontrol);
  }
};

global.initCheckParamsAreaLimitControl = function (selector) {
  if (!isValidElement(selector + " .parameter-geometry-check-params-areaLimit .control .areaLimit")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var AreaLimitcontrol = $(selector + " .parameter-geometry-check-params-areaLimit .control .areaLimit").kendoNumericTextBox({
      value: 0
    }).data('kendoNumericTextBox');

    buildProject.analysis_controls[selector].set(selector + " areaLimit", AreaLimitcontrol);
  }
};

global.initBufferRadiusControl = function (selector) {
  if (!isValidElement(selector + " .parameter-buffer-radius .control .radius")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var control = $(selector + " .parameter-buffer-radius .control .radius").kendoNumericTextBox({
      value: 1
    }).data('kendoNumericTextBox');

    buildProject.analysis_controls[selector].set(selector + " bufferRadius", control);
  }
};

global.initResultControl = function (selector) {
  if (!isValidElement(selector + " .parameter-result .k-textbox")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var resultControl = $(selector + " .parameter-result .k-textbox");
    var copyControl = $(selector + " .parameter-result .copy");

    buildProject.analysis_controls[selector].set(selector + " result", resultControl);
    buildProject.analysis_controls[selector].set(selector + " copy", copyControl);
  }
};

global.initHandleResultControl = function (selector) {
  if (!isValidElement(selector + " .parameter-handle-result .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var inputControl = $(selector + " .parameter-handle-result .control .k-input.k-textbox");
    var saveLayerControl = $(selector + " .parameter-handle-result .control .save-layer").kendoButton({
      enable: false
    }).data('kendoButton');

    var cancelControl = $(selector + " .parameter-handle-result .control .cancel").kendoButton({
      enable: false
    }).data('kendoButton');

    buildProject.analysis_controls[selector].set(selector + " resultLayerName", inputControl);
    buildProject.analysis_controls[selector].set(selector + " saveLayer", saveLayerControl);
    buildProject.analysis_controls[selector].set(selector + " cancel", cancelControl);
  }
};

global.saveLayer = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(fileName, geoJSON) {
    var o, res, dataSourceInfo, layer, render, options;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // 第一步 上传JSON数据到服务器
            o = {
              contentJson: geoJSON.toGeoJSON(),
              fileName: fileName,
              fileType: "geojson"
            };
            _context7.next = 3;
            return KQ.Common.NetworkTools.uploadJsonToFileServer(o);

          case 3:
            res = _context7.sent;

            if (!(res.result == "error")) {
              _context7.next = 7;
              break;
            }

            KQ.Control.Notification.getInstance().showError("保存图层失败！");
            return _context7.abrupt("return");

          case 7:

            // 组织图层信息
            dataSourceInfo = {
              type: "STATIC_DATA",
              url: res.downloadPath,
              name: fileName
            };

            // 加载图层

            _context7.next = 10;
            return KQ.Builder.BuilderCommon.addNewLayer(dataSourceInfo);

          case 10:
            layer = _context7.sent;
            render = layer.getRender();

            // 组织options

            options = L.extend(render.options, {
              fillColor: "red",
              fillOpacity: 0.2,
              lineColor: "red",
              lineWidth: 3
            });

            // 删除原图层、渲染新图层

            geoJSON.remove();
            render.setOptions(options);

            KQ.Builder.BuilderProject.getInstance().siderbar.open("layers");
            KQ.Data.DataManager.getInstance().addWebFileDataSourceInfo(dataSourceInfo);

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this);
  }));

  return function (_x4, _x5) {
    return _ref7.apply(this, arguments);
  };
}();

global.refreshButtonState = function (selector, buttonState) {
  var controlsMap = KQ.Builder.BuilderProject.getInstance().analysis_controls[selector];

  if (buttonState.saveLayerButtonOpen === 'saveLayerButtonOpen') {
    controlsMap.get(selector + " saveLayer").enable(true);
  }
  if (buttonState.cancelLayerButtonOpen === 'cancelLayerButtonOpen') {
    controlsMap.get(selector + " cancel").enable(true);
  }
  if (buttonState.saveLayerButtonClose === 'saveLayerButtonClose') {
    controlsMap.get(selector + " saveLayer").enable(false);
  }
  if (buttonState.cancelLayerButtonClose === 'cancelLayerButtonClose') {
    controlsMap.get(selector + " cancel").enable(false);
  }
  if (buttonState.returnResultButtonOpen === 'returnResultButtonOpen') {
    controlsMap.get(selector + " returnResultButton").enable(true);
  }
};

global.initReturnFieldsAreaControl = function (selector) {
  if (!isValidElement(selector + " .parameter-return-fields-area .control .k-input.k-textbox")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var control = $(selector + " .parameter-return-fields-area .control .k-input.k-textbox");

    buildProject.analysis_controls[selector].set(selector + " returnFieldsArea", control);
  }
};

global.initReturnFieldsLengthControl = function (selector) {
  if (!isValidElement(selector + " .parameter-return-fields-length .control .k-input.k-textbox")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var control = $(selector + " .parameter-return-fields-length .control .k-input.k-textbox");

    buildProject.analysis_controls[selector].set(selector + " returnFieldsLength", control);
  }
};

global.initToleranceControl = function (selector) {
  if (!isValidElement(selector + " .parameter-tolerance .control .tolerance")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var control = $(selector + " .parameter-tolerance .control .tolerance").kendoNumericTextBox({
      value: 0
      // decimals: 8,
      // format: '{0:n8}',
    }).data('kendoNumericTextBox');

    buildProject.analysis_controls[selector].set(selector + " tolerance", control);
  }
};

global.returnFields = function (selector, data, fields) {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var controlsMap = buildProject.analysis_controls[selector];

  if (fields === 'area') {
    // 得到输出图形的面积
    var returnFieldsAreaControl = controlsMap.get(selector + " returnFieldsArea");
    if (data.type === 'GeometryCollection') {
      var area = 0;
      for (var i = 0; i < data.geometries.length; i++) {
        if (data.geometries[i].Area == null) {
          data.geometries[i].Area = 0;
        }
        area += data.geometries[i].Area;
      }
      returnFieldsAreaControl.val(area.toFixed(4));
    } else {
      returnFieldsAreaControl.val(data.Area.toFixed(4));
    }
  } else if (fields === 'length') {
    // 得到输出图形的长度
    var returnFieldsLengthControl = controlsMap.get(selector + " returnFieldsLength");
    if (data.type === 'GeometryCollection') {
      var length = 0;
      for (var _i = 0; _i < data.geometries.length; _i++) {
        if (data.geometries[_i].Length == null) {
          data.geometries[_i].Length = 0;
        }
        length += data.geometries[_i].Length;
      }
      returnFieldsLengthControl.val(length.toFixed(4));
    } else {
      returnFieldsLengthControl.val(data.Length.toFixed(4));
    }
  }
};

global.copyResult = function (selector) {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var controlsMap = buildProject.analysis_controls[selector];
  var copyControl = controlsMap.get(selector + " copy");
  var resultControl = $(selector + " .parameter-result .control-text-area");
  var resultText = controlsMap.get(selector + " result");

  resultControl.mouseenter(function () {
    copyControl.css('display', 'block');
  });

  resultControl.mouseleave(function () {
    copyControl.css('display', 'none');
  });

  copyControl.click(function () {
    resultText.select();
    document.execCommand('copy');

    var result = resultText.val();
    if (result !== '') {
      copyControl.html('复制成功');
      copyControl.css("background", "#28A344");
      setTimeout(function () {
        copyControl.html('复制');
        copyControl.css("background", "#fff");
      }, 1000);
    }
    // if (result === '') {
    //   KQ.Control.Notification.getInstance().showError('结果复制失败！', 0);
    // } else {
    //   KQ.Control.Notification.getInstance().showSuccess('结果复制成功！', 0);
    // }
  });
};

global.initReturnResultButtonControl = function (selector) {
  if (!isValidElement(selector + " .parameter-return-result-button .control .return-result")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var returnResultButtonControl = $(selector + " .parameter-return-result-button .control .return-result").kendoButton({
      enable: false
    }).data('kendoButton');

    buildProject.analysis_controls[selector].set(selector + " returnResultButton", returnResultButtonControl);
  }
};

global.returnResultTableDataSource = function (data, dataSource, attributeNames) {
  if (attributeNames === 'area') {
    for (var i = 0; i < data.length; i++) {
      dataSource.push(data[i]);
    }
  } else if (attributeNames === 'length') {
    for (var _i2 = 0; _i2 < data.length; _i2++) {
      dataSource.push(data[_i2]);
    }
  } else if (attributeNames === 'center') {
    for (var _i3 = 0; _i3 < data.length; _i3++) {
      dataSource.push({
        id: data[_i3].id,
        center: data[_i3].center.toString()
      });
    }
  } else if (attributeNames === 'bound') {
    for (var _i4 = 0; _i4 < data.length; _i4++) {
      dataSource.push({
        id: data[_i4].id,
        bound: data[_i4].bound.toString()
      });
    }
  }
};

global.initGroupFieldsControl = function (selector) {
  if (!isValidElement(selector + " .parameter-groupfields .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var control = $(selector + " .parameter-groupfields .control").kendoDropDownList({
      dataTextField: "name",
      dataValueField: "value",
      dataSource: [],
      index: 0
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " groupfields", control);
  }
};

global.initSummaryFieldsControl = function (selector) {
  if (!isValidElement(selector + " .parameter-summaryfields .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var control = $(selector + " .parameter-summaryfields .control").kendoDropDownList({
      dataTextField: "name",
      dataValueField: "value",
      dataSource: [], // 暂时空
      index: 0
    }).data('kendoDropDownList');

    setTimeout(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return fillGroupFieldsAndSummaryFields(selector);

            case 2:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    })), 0);

    buildProject.analysis_controls[selector].set(selector + " summaryfields", control);
  }
};

global.initSummaryTypesControl = function (selector) {
  if (!isValidElement(selector + " .parameter-summarytypes .control")) {
    return;
  } else {
    var buildProject = KQ.Builder.BuilderProject.getInstance();

    var control = $(selector + " .parameter-summarytypes .control").kendoMultiSelect({
      dataTextField: "name",
      dataValueField: "value",
      dataSource: [{ name: "求和", value: "sum" }, { name: "最小值", value: "min" }, { name: "最大值", value: "max" }, { name: "平均值", value: "avg" }, { name: "计数", value: "count" }],

      value: ["min"] // 默认选中最小值
    }).data('kendoMultiSelect');

    buildProject.analysis_controls[selector].set(selector + " summarytypes", control);
  }
};

global.getDatasourceInfo = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(selector) {
    var buildProject, controlsMap, layersControl, layer;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            buildProject = KQ.Builder.BuilderProject.getInstance();
            controlsMap = buildProject.analysis_controls[selector];
            layersControl = controlsMap.get(selector + " src-layers");
            layer = KQ.Builder.BuilderProject.getInstance().getLayerFromGuid(layersControl.value());

            if (layer) {
              _context9.next = 8;
              break;
            }

            return _context9.abrupt("return", null);

          case 8:
            return _context9.abrupt("return", layer.options.dataSource);

          case 9:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function (_x6) {
    return _ref9.apply(this, arguments);
  };
}();

global.getDatasource = function (datasourceInfo) {
  return {
    "type": "dataservice",
    "url": datasourceInfo.url + "/proc",
    "datasourceid": datasourceInfo.datasourceId,
    "featureclassname": datasourceInfo.featureClassName
  };
};

// 获取分段字段和汇总字段
global.getFieldsFromLayer = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(selector, isSummaryField) {
    var datasourceInfo, datasource, serverFields, fields;
    return regeneratorRuntime.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return getDatasourceInfo(selector);

          case 2:
            datasourceInfo = _context10.sent;

            if (datasourceInfo) {
              _context10.next = 7;
              break;
            }

            return _context10.abrupt("return", null);

          case 7:
            if (!(datasourceInfo.type !== "DS_DATA")) {
              _context10.next = 12;
              break;
            }

            KQ.Control.Notification.getInstance().showError('请求失败，非数据服务数据！', 0);
            return _context10.abrupt("return", null);

          case 12:
            datasource = getDatasource(datasourceInfo);
            serverFields = new KQ.ServiceTool.ServiceToolAnalysisServerFields();
            _context10.next = 16;
            return serverFields.getFieldsResult({
              datasource: encodeURIComponent(JSON.stringify(datasource)),
              isSummaryField: isSummaryField
            }).then(function (res) {
              if (res === 'error' || JSON.parse(res).resultcode === 'error') {
                KQ.Control.Notification.getInstance().showError('获取图层字段失败！', 0);
                return null;
              } else {
                return JSON.parse(res).result;
              }
            });

          case 16:
            fields = _context10.sent;
            return _context10.abrupt("return", fields);

          case 18:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, this);
  }));

  return function (_x7, _x8) {
    return _ref10.apply(this, arguments);
  };
}();

// 初始化图层的字段信息
global.initFieldsControl = function () {
  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(selector) {
    var buildProject, control;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            if (isValidElement(selector + " .parameter-fields .control")) {
              _context12.next = 4;
              break;
            }

            return _context12.abrupt("return");

          case 4:
            buildProject = KQ.Builder.BuilderProject.getInstance();
            control = $(selector + " .parameter-fields .control").kendoListView({
              dataSource: {
                data: []
              },
              template: "<div>#:name#</div>",
              selectable: true
            }).data('kendoListView');


            setTimeout(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
              return regeneratorRuntime.wrap(function _callee11$(_context11) {
                while (1) {
                  switch (_context11.prev = _context11.next) {
                    case 0:
                      _context11.next = 2;
                      return fillQueryFields(selector);

                    case 2:
                    case "end":
                      return _context11.stop();
                  }
                }
              }, _callee11, this);
            })), 0);

            // 绑定双击事件
            $(selector + " .parameter-fields .control").dblclick(function () {
              var selectField = control.dataItem(control.select()).name;

              addSQLCondition(selectField);
            });

            buildProject.analysis_controls[selector].set(selector + " fields", control);

          case 9:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function (_x9) {
    return _ref11.apply(this, arguments);
  };
}();

global.addSQLCondition = function (text) {
  var newText = $("#sql-condition").val() + ' ' + text;
  $("#sql-condition").val(newText);
};

// 初始化SQL的运算符号
global.initOperationSymbolsControl = function (selector) {
  if (!isValidElement(selector + " .parameter-operation-symbols .control")) {
    return;
  } else {

    $(selector + " .parameter-operation-symbols .control button").kendoButton({
      click: function click() {
        addSQLCondition($.trim(this.element.text()));
      }
    });

    $(selector + " .parameter-operation-symbols .control button").css("width", "32%");
    $(selector + " .parameter-operation-symbols .control div").css("margin-top", "8px");
  }
};

global.initFieldValuesControl = function (selector) {
  if (!isValidElement(selector + " .parameter-field-values .control")) {
    return;
  } else {
    var fieldValuesControl = $(selector + " .parameter-field-values .control .field-values").kendoListView({
      dataSource: {
        data: []
      },
      template: "<div>#:name#</div>",

      selectable: true
    }).data('kendoListView');

    $(selector + " .parameter-field-values .control button").kendoButton({
      click: function () {
        var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
          var datasourceInfo, datasource, fieldsControl, dataItem, field, executeServer;
          return regeneratorRuntime.wrap(function _callee13$(_context13) {
            while (1) {
              switch (_context13.prev = _context13.next) {
                case 0:
                  _context13.next = 2;
                  return getDatasourceInfo(selector);

                case 2:
                  datasourceInfo = _context13.sent;

                  if (datasourceInfo) {
                    _context13.next = 7;
                    break;
                  }

                  return _context13.abrupt("return", null);

                case 7:
                  if (!(datasourceInfo.type !== "DS_DATA")) {
                    _context13.next = 11;
                    break;
                  }

                  KQ.Control.Notification.getInstance().showError('请求失败，非数据服务数据！', 0);
                  _context13.next = 18;
                  break;

                case 11:
                  // 第一步 获取图层
                  datasource = getDatasource(datasourceInfo);

                  // 第二步 获取字段

                  fieldsControl = $(selector + " .parameter-fields .control").data("kendoListView");
                  dataItem = fieldsControl.dataItem(fieldsControl.select());
                  field = dataItem.name;

                  // 第三步 进行查询

                  executeServer = new KQ.ServiceTool.ServiceToolAnalysisServerExecute();
                  _context13.next = 18;
                  return executeServer.getExecuteResult({
                    datasource: encodeURIComponent(JSON.stringify(datasource)),
                    sql: "select distinct(" + field + ") from " + datasource.featureclassname + " order by " + field
                  }).then(function (res) {
                    if (res === 'error' || JSON.parse(res).resultcode === 'error') {
                      KQ.Control.Notification.getInstance().showError('请求失败！', 0);
                    } else {
                      KQ.Control.Notification.getInstance().showSuccess('请求成功！', 0);
                      res = JSON.parse(res);

                      if (res.resultcode === "success") {
                        var result = res.result;
                        var features = result.features;
                        var data = [];

                        features.forEach(function (feature) {
                          data.push({ "name": feature.properties[field] });
                        });

                        fieldValuesControl.setDataSource(new kendo.data.DataSource({ data: data }));
                        fieldValuesControl.select(0);
                      } else {
                        fieldValuesControl.setDataSource([]);
                      }
                    }
                  });

                case 18:
                case "end":
                  return _context13.stop();
              }
            }
          }, _callee13, this);
        }));

        function click() {
          return _ref13.apply(this, arguments);
        }

        return click;
      }()
    });

    $(selector + " .parameter-field-values .control .field-values").dblclick(function () {
      var value = fieldValuesControl.dataItem(fieldValuesControl.select()).name;
      addSQLCondition(value);
    });

    $(selector + " .parameter-field-values .control").children().css("margin", "4px 0");
  }
};

// 进行KQBuilder的一些初始化工作
global.initMap = function (taskId, projName) {
  var config = KQ.Map.MapConfig.getInstance();
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var mapView = null;
  var layersContainer = null;

  config.initAsync('', false, function () {
    KQ.Local.setLanguage('cn');
    mapView = new KQ.Map.MapView({
      center: [40, -50],
      zoom: 2
    });

    buildProject.mapView = mapView;

    mapView.initAsync(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
      var mapEventForwarder, map, baselayers, basemapListView, url, builderUpdate;
      return regeneratorRuntime.wrap(function _callee14$(_context14) {
        while (1) {
          switch (_context14.prev = _context14.next) {
            case 0:
              // Catches unhandled canvas layer events and re-dispatches them to the next layer in the stack
              // 修正问题：点线面图层添加后，鼠标点击事件无法穿透
              mapEventForwarder = new L.eventForwarder({
                // ref to leaflet map
                map: mapView._getMap(),
                // events to forward
                events: {
                  click: true,
                  mousemove: false
                },
                // throttle options for mousemove events (same as underscore.js)
                throttleMs: 100,
                throttleOptions: {
                  leading: true,
                  trailing: false
                }
              });

              // enable event forwarding

              mapEventForwarder.enable();

              map = mapView._getMap();

              map.mapEventForwarder = mapEventForwarder;

              KQ.Control.Waiting.show(mapView._getMap(), 'pin', 'meter');

              _context14.prev = 5;

              initHtml();
              initSiderbar(mapView);

              _context14.next = 10;
              return initLayersContainer(layersContainer);

            case 10:
              _context14.next = 12;
              return initHandDrawLayersContainer();

            case 12:
              _context14.next = 14;
              return initMapGeoman();

            case 14:

              // 添加智图 矢量图层 午夜蓝
              baselayers = KQ.Control.MapBaseLayer.getLayers('geoq', 'blue');


              buildProject.basemapGroup = L.layerGroup(baselayers);
              buildProject.basemapGroup.addTo(mapView._getMap());

              // 默认选中第一个智图蓝色
              basemapListView = $(".basemap-list").data("kendoListView");

              basemapListView.select(basemapListView.element.children().first());

              if (!taskId) {
                _context14.next = 24;
                break;
              }

              url = KQ.Builder.BuilderPortalProxy.downloadUrl(taskId);
              _context14.next = 23;
              return loadProject(url);

            case 23:

              if (projName) {
                $("#current-project-name").text(projName);
              }

            case 24:

              // portal隐藏工程拉取按钮
              if (KQ.Builder.BuilderPortal.isPortalEnvironment()) {
                $("[data-type=clouddown]").css("display", "none");
              }

            case 25:
              _context14.prev = 25;

              setTimeout(function () {
                KQ.Control.Waiting.close();
                KQ.Builder.BuilderProject.getInstance().siderbar.open("layers");
                KQ.Builder.BuilderUi.CreateFirstMapDialog.getInstance().init();
              }, 1000);

              // add by liwei
              builderUpdate = KQ.Builder.BuilderUpdate.getInstance();

              builderUpdate.bindEvent();
              return _context14.finish(25);

            case 30:
            case "end":
              return _context14.stop();
          }
        }
      }, _callee14, this, [[5,, 25, 30]]);
    })));

    buildProject.mapView = mapView;
  });
};

// 基本地图 光标进入
global.onmouseenterHandleBaseMap = function (el) {
  $(el).parent().addClass("largeSize"); // li标签变成大尺寸
  $(el).children(".secound-line").css("display", "block"); // 显示第二行
  $(el).find(".fa-eye").css("opacity", "1"); // 显示图层是否可见按钮
};

// 基本地图 光标退出
global.onmouseleaveHandleBaseMap = function (el) {
  $(el).parent().removeClass("largeSize"); // li标签变成小尺寸
  $(el).children(".secound-line").css("display", "none"); // 隐藏第二行
  $(el).find(".fa-eye").css("opacity", "0"); // 隐藏图层是否可见按钮
};

// 切换底图的可见性
global.toggleBaseMapVisible = function (el) {

  event.stopPropagation();

  var basemapGroup = KQ.Builder.BuilderProject.getInstance().basemapGroup;

  // 切换图层可用不可用
  if ($(el).hasClass("fa-eye")) {
    $(el).removeClass("fa-eye");
    $(el).addClass("fa-eye-slash");

    // 设置底图的ui为不可用状态
    $(el).closest("li").css("opacity", 0.65);
    $(el).closest("li").css("pointer-events", "none");

    // 清除之前的图层
    basemapGroup.clearLayers();
  } else {
    $(el).addClass("fa-eye");
    $(el).removeClass("fa-eye-slash");

    // 设置底图的ui为可用状态
    $(el).closest("li").css("opacity", 1); // 接受鼠标点击事件
    $(el).closest("li").css("pointer-events", "auto"); // 接受鼠标点击事件

    // 添加新的图层
    var type = $(el).closest("li").attr("data-type");
    var subType = $(el).closest("li").attr("data-sub-type");
    var baselayers = KQ.Control.MapBaseLayer.getLayers(type, subType);

    for (var i = 0; i < baselayers.length; ++i) {
      basemapGroup.addLayer(baselayers[i]);
    }
  }

  $(el).css("pointer-events", "auto"); // 接受鼠标点击事件
};

global.addHandDrawLayerItem = function (id, type) {
  // MapGeoman中的layer和HandDrawLayerListBox中的item通过id关联起来
  KQ.Builder.BuilderProject.getInstance().handDrawLayersContainer.add({
    id: id,
    name: "测试数据3",
    type: type
  });
};

global.builderInit = function () {
  //loadHtml();           // portal会主动调用initMap
  loadHtml(initMap);
};

/* toolBox滚动条 */
function toolBox(selector) {
  var parametersContainerHeight = Number.parseFloat($(selector + " .parameters-container > div").css('height'));
  var toolboxScrollbarHeight = Number.parseFloat($(selector + " .toolbox-scrollbar").css('height'));
  var toolBoxScroll = $(selector + " .toolbox-scrollbar div");

  if (parametersContainerHeight + 44 > toolboxScrollbarHeight) {
    toolBoxScroll.css({ "display": "block" });
  } else {
    toolBoxScroll.css({ "display": "none" });
  }

  $(selector + " .parameters-container").scroll(function () {
    var scrollTop = $(selector + " .parameters-container").scrollTop();
    var toolboxScrollbar = (toolboxScrollbarHeight - 204) * (scrollTop / (parametersContainerHeight + 44 - toolboxScrollbarHeight));
    toolBoxScroll.css({ "transform": "translateY(" + toolboxScrollbar + "px)" });
  });
}

global.toolBoxScrollBar = function (selector) {
  toolBox(selector);
  $(window).resize(function () {
    toolBox(selector);
  });
};

/* setting滚动条 */
function settingScroll() {
  var layerDataContainerHeight = Number.parseFloat($(".mapsetting-content .layer-data-container > div").css('height'));
  var settingScrollbarHeight = Number.parseFloat($(".mapsetting-content .mapsetting-scrollbar").css('height'));
  var settingScroll = $(".mapsetting-content .mapsetting-scrollbar div");

  if (layerDataContainerHeight + 34 > settingScrollbarHeight) {
    settingScroll.css({ "display": "block" });
  } else {
    settingScroll.css({ "display": "none" });
  }

  $(".mapsetting-content .layer-data-container").scroll(function () {
    var scrollTop = $(".mapsetting-content .layer-data-container").scrollTop();
    var settingScrollbar = (settingScrollbarHeight - 204) * (scrollTop / (layerDataContainerHeight + 34 - settingScrollbarHeight));
    settingScroll.css({ "transform": "translateY(" + settingScrollbar + "px)" });
  });
}

global.settingScrollBar = function () {
  $(window).on("click", function () {
    if ($("#settings").hasClass("active")) {
      settingScroll();
      $(window).resize(function () {
        settingScroll();
      });
    }
  });
};

/**
 * 改变dialog的背景色
 * @param {string} selector
 * @param {string} backgroundColor
 */
global.changeDialogBackgroundColor = function (selector, backgroundColor) {
  $(selector).parent().css("backgroundColor", backgroundColor);
};

/**
 * 获取节点的translateY
 * @param {string} node   // dom节点
 * */
global.getTranslateY = function (node) {
  var regRule = /translate(Y|\dd)?\(\s*(\w+\s*,)?\s*([^,]+)(\s*,[^)]+)?\s*\)/;
  var regRule2 = /matrix\(.*,\s*(\w+)\s*\)/;
  var transform = node.style.transform;
  var reg = void 0;
  if (!transform) {
    return null;
  }
  reg = regRule.exec(transform);
  if (null === reg) {
    reg = regRule2.exec(transform);
    return reg ? reg[1] : null;
  }
  return reg[3];
};

/**
 * transitionJsonToString()  json对象转换为字符串变量
 * @param {object} jsonObj
 * @param {string} callback
 * */
function transitionJsonToString(jsonObj, callback) {
  // 转换后的jsonObj受体对象
  var _jsonObj = null;
  // 判断传入的jsonObj对象是不是字符串，如果是字符串需要先转换为对象，再转换为字符串，这样做是为了保证转换后的字符串为双引号
  if (Object.prototype.toString.call(jsonObj) !== "[object String]") {
    try {
      _jsonObj = JSON.stringify(jsonObj);
    } catch (error) {
      // 转换失败错误信息
      console.error('您传递的json数据格式有误，请核对...');
      console.error(error);
      callback(error);
    }
  } else {
    try {
      jsonObj = jsonObj.replace(/(\')/g, '\"');
      _jsonObj = JSON.stringify(JSON.parse(jsonObj));
    } catch (error) {
      // 转换失败错误信息
      console.error('您传递的json数据格式有误，请核对...');
      console.error(error);
      callback(error);
    }
  }
  return _jsonObj;
}

/**
 * formatJson()  格式化JSON
 * @param {object} jsonObj
 * @param {string} callback
 * */
global.formatJson = function (jsonObj, callback) {
  // 正则表达式匹配规则变量
  var reg = null;
  // 转换后的字符串变量
  var formatted = '';
  // 换行缩进位数
  var pad = 0;
  // 一个tab对应空格位数
  var PADDING = '    ';
  // json对象转换为字符串变量
  var jsonString = transitionJsonToString(jsonObj, callback);
  if (!jsonString) {
    return jsonString;
  }
  // 存储需要特殊处理的字符串段
  var _index = [];
  // 存储需要特殊处理的“再数组中的开始位置变量索引
  var _indexStart = null;
  // 存储需要特殊处理的“再数组中的结束位置变量索引
  var _indexEnd = null;
  // 将jsonString字符串内容通过\r\n符分割成数组
  var jsonArray = [];
  // 正则匹配到{,}符号则在两边添加回车换行
  jsonString = jsonString.replace(/([\{\}])/g, '\r\n$1\r\n');
  // 正则匹配到[,]符号则在两边添加回车换行
  jsonString = jsonString.replace(/([\[\]])/g, '\r\n$1\r\n');
  // 正则匹配到,符号则在两边添加回车换行
  jsonString = jsonString.replace(/(\,)/g, '$1\r\n');
  // 正则匹配到要超过一行的换行需要改为一行
  jsonString = jsonString.replace(/(\r\n\r\n)/g, '\r\n');
  // 正则匹配到单独处于一行的,符号时需要去掉换行，将,置于同行
  jsonString = jsonString.replace(/\r\n\,/g, ',');
  // 特殊处理双引号中的内容
  jsonArray = jsonString.split('\r\n');
  jsonArray.forEach(function (node, index) {
    // 获取当前字符串段中"的数量
    var num = node.match(/\"/g) ? node.match(/\"/g).length : 0;
    // 判断num是否为奇数来确定是否需要特殊处理
    if (num % 2 && !_indexStart) {
      _indexStart = index;
    }
    if (num % 2 && _indexStart && _indexStart !== index) {
      _indexEnd = index;
    }
    // 将需要特殊处理的字符串段的其实位置和结束位置信息存入，并对应重置开始时和结束变量
    if (_indexStart && _indexEnd) {
      _index.push({
        start: _indexStart,
        end: _indexEnd
      });
      _indexStart = null;
      _indexEnd = null;
    }
  });
  // 开始处理双引号中的内容，将多余的"去除
  _index.reverse().forEach(function (item, index) {
    var newArray = jsonArray.slice(item.start, item.end + 1);
    jsonArray.splice(item.start, item.end + 1 - item.start, newArray.join(''));
  });
  // 奖处理后的数组通过\r\n连接符重组为字符串
  jsonString = jsonArray.join('\r\n');
  // 将匹配到:后为回车换行加大括号替换为冒号加大括号
  jsonString = jsonString.replace(/\:\r\n\{/g, ':{');
  // 将匹配到:后为回车换行加中括号替换为冒号加中括号
  jsonString = jsonString.replace(/\:\r\n\[/g, ':[');
  // 将上述转换后的字符串再次以\r\n分割成数组
  jsonArray = jsonString.split('\r\n');
  // 将转换完成的字符串根据PADDING值来组合成最终的形态
  jsonArray.forEach(function (item, index) {
    // console.log(item)
    var i = 0;
    // 表示缩进的位数，以tab作为计数单位
    var indent = 0;
    // 表示缩进的位数，以空格作为计数单位
    var padding = '';
    if (item.match(/\{$/) || item.match(/\[$/)) {
      // 匹配到以{和[结尾的时候indent加1
      indent += 1;
    } else if (item.match(/\}$/) || item.match(/\]$/) || item.match(/\},$/) || item.match(/\],$/)) {
      // 匹配到以}和]结尾的时候indent减1
      if (pad !== 0) {
        pad -= 1;
      }
    } else {
      indent = 0;
    }
    for (i = 0; i < pad; i++) {
      padding += PADDING;
    }
    formatted += padding + item + '\r\n';
    pad += indent;
  });
  // 返回的数据需要去除两边的空格
  return formatted.trim();
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
'use strict';

/**
 * Create a new buildersidebar on this jQuery object.
 *
 * @example
 * var buildersidebar = $('#buildersidebar').buildersidebar();
 *
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the buildersidebar: 'left' or 'right'
 * @returns {jQuery}
 */

var currentID = null;

// option中可以添加回调函数
$.fn.buildersidebar = function (options) {
  var $sidebar = this;
  var $tabs = $sidebar.find('ul.buildersidebar-tabs, .buildersidebar-tabs > ul');
  var $container = $sidebar.children('.buildersidebar-content').first();

  options = $.extend({
    position: 'left',
    onOpened: function onOpened(id) {
      console.log('sidebar run onOpened! id:' + id);
    },
    onClosed: function onClosed() {
      console.log('sidebar run onClosed!');
    }
  }, options || {});

  $sidebar.options = options;

  $sidebar.addClass('buildersidebar-' + options.position);

  $tabs.children('li').children('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    if (this.hash.slice(1) !== 'home') {
      var $tab = $(this).closest('li');
      if ($tab.hasClass('active')) $sidebar.close();else if (!$tab.hasClass('disabled')) {
        $sidebar.open(this.hash.slice(1), $tab);
      }
    } else {
      if (currentID) {
        if ($sidebar.hasClass('collapsed')) $sidebar.open(currentID);else $sidebar.close();
      }
    }
  });

  $sidebar.find('.buildersidebar-close').on('click', function () {
    $sidebar.close();
  });

  /**
   * Open buildersidebar (if necessary) and show the specified tab.
   *
   * @param {string} id - The id of the tab to show (without the # character)
   * @param {jQuery} [$tab] - The jQuery object representing the tab node (used internally for efficiency)
   */
  $sidebar.open = function (id, $tab) {
    if (typeof $tab === 'undefined') $tab = $tabs.find('li > a[href="#' + id + '"]').parent();

    // hide old active contents
    $container.children('.buildersidebar-pane.active').removeClass('active');

    // show new content
    $container.children('#' + id).addClass('active');

    // remove old active highlights
    $tabs.children('li.active').removeClass('active');

    // set new highlight
    $tab.addClass('active');

    $sidebar.trigger('content', { 'id': id });

    if ($sidebar.hasClass('collapsed')) {
      // open buildersidebar
      $sidebar.trigger('opening');
      $sidebar.removeClass('collapsed');
    }

    $sidebar.find('#builder-title-image').show();

    currentID = id;

    $sidebar.options.onOpened(id);
  };

  /**
   * Close the buildersidebar (if necessary).
   */
  $sidebar.close = function () {
    // remove old active highlights
    $tabs.children('li.active').removeClass('active');

    $sidebar.find('#builder-title-image').hide();

    if (!$sidebar.hasClass('collapsed')) {
      // close buildersidebar
      $sidebar.trigger('closing');
      $sidebar.addClass('collapsed');
    }

    $sidebar.options.onClosed();
  };

  return $sidebar;
};

},{}],4:[function(require,module,exports){
(function (global){
"use strict";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

global.loadHtml = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(func) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            $(".content-editor-pane-point").load("./window/point.html", null, function () {
              $(".content-editor-pane-line").load("./window/line.html", null, function () {
                $(".content-editor-pane-polygon").load("./window/polygon.html", null, function () {
                  $(".content-editor-pane-basemap").load("./window/basemap.html", null, function () {
                    $("#analysis .analysis-main").load("./window/analysis/main.html", null, function () {
                      $("#settings").load("./window/setting.html", null, function () {
                        $(".content-editor-pane-hand-draw").load("./window/hand_draw.html", null, function () {
                          $("#hand-draw-edit-content").load("./window/hand_draw_edit.html", null, function () {
                            if (func) {
                              func();
                            }
                          });
                        });
                      });
                    });
                  });
                });
              });
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();

global.initHtml = function () {

  KQ.Builder.BuilderUi.RenderSettingUi.getInstance().init();

  // 添加图层方式的列表
  $(".add-layer-tag").click(function () {
    var display = $(".add-layer-list").css("display");
    if (display == 'none') {
      $(".add-layer-list").css("display", "block");
      $(".add-layer-list").focus();
    }
  });

  $('.buildersiderbar-back').click(function () {
    $(".sidebar-content-panel").css("display", "none");
    $(".content-editor-pane").css("display", "none");
    $(".sidebar-layers-manager").css("display", "block");

    // 进行数据的交换
    var buildProject = KQ.Builder.BuilderProject.getInstance();
    var render = buildProject.setting.layer.getRender(); // 当前激活的layer
    var handDrawLayersContainer = buildProject.handDrawLayersContainer;

    render.dataSource = handDrawLayersContainer.dataSource();
  });

  // 通过远程文件添加
  window.loadFileDialog = null;
  // ie模式下click的响应在blur之后，改为mousedown修复此问题
  $("#add-layer-list-item-file").on('mousedown', function () {
    $(".add-layer-list").css("display", "none");

    if (!window.loadFileDialog) {
      window.loadFileDialog = new KQ.Builder.BuilderUi.FileLoadDialog("#load-file-layer-container", { filter: "geojson" });
      window.loadFileDialog.on('load', function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(data) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return KQ.Builder.BuilderCommon.addNewLayer(data.dataSourceInfo);

                case 2:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());

      window.loadFileDialog.on('delete', function (data) {
        // 初始化删除工程按钮
        $("#confirm-div").kendoConfirm({
          title: "删除远程图层文件",
          content: "远程图层文件删除后无法恢复，确定删除？",
          messages: {
            okText: "确定",
            cancelText: "取消"
          }
        }).data("kendoConfirm").result.done(function () {
          $('body').append($('<div id="confirm-div">'));
          window.loadFileDialog.fire("delete_event", data);
        }).fail(function () {
          $('body').append($('<div id="confirm-div">'));
        });
      });

      // 删除图层事件
      window.loadFileDialog.on("delete_event", function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(data) {
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _context3.next = 2;
                  return deleteDataFile(data.dataSourceInfo['url']);

                case 2:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, this);
        }));

        return function (_x3) {
          return _ref3.apply(this, arguments);
        };
      }());
    }

    $("#load-file-layer-container").data("kendoWindow").center().open();
  });

  // 通过数据库添加
  window.loadDataServiceDialog = null;
  $("#add-layer-list-item-database").on('mousedown', function () {
    $(".add-layer-list").css("display", "none");

    if (!window.loadDataServiceDialog) {
      window.loadDataServiceDialog = new KQ.Builder.BuilderUi.DataServiceLoadDialog("#load-database-layer-container", { filter: "geojson" });

      window.loadDataServiceDialog.on('load', function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(data) {
          return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _context4.next = 2;
                  return KQ.Builder.BuilderCommon.addNewLayer(data.dataSourceInfo);

                case 2:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, this);
        }));

        return function (_x4) {
          return _ref4.apply(this, arguments);
        };
      }());
    }

    $("#load-database-layer-container").data("kendoWindow").center().open();
  });

  // 通过web添加
  window.webLayerLoadDialog = null;
  var mapView = KQ.Builder.BuilderProject.getInstance().mapView;
  $("#add-layer-list-item-web").on('mousedown', function () {
    $(".add-layer-list").css("display", "none");

    if (!window.webLayerLoadDialog) {
      window.webLayerLoadDialog = new KQ.Builder.BuilderUi.WebLayerLoadDialog("#load-web-layer-container");

      window.webLayerLoadDialog.on("confirm", function (data) {
        KQ.Control.Waiting.show(mapView._getMap(), 'pin', 'meter');

        try {
          //TODO 朱谋调用
          console.log("dataSourceInfo", data.dataSourceInfo);
          KQ.Builder.BuilderCommon.addNewLayer(data.dataSourceInfo);
        } finally {
          KQ.Control.Waiting.close();
        }
      });
    }

    $("#load-web-layer-container").data("kendoWindow").center().open();
  });

  // 创建注记图层
  $("#add-layer-list-item-hand-draw").on('mousedown', function () {
    $(".add-layer-list").css("display", "none");

    KQ.Control.Waiting.show(mapView._getMap(), 'pin', 'meter');

    try {
      var dataSourceInfo = {
        name: '未命名注记图层',
        type: 'HAND_DRAW_DATA'
      };

      KQ.Builder.BuilderCommon.addNewLayer(dataSourceInfo);
    } finally {
      KQ.Control.Waiting.close();
    }
  });

  // 添加图层列表显示事件判断
  $(".add-layer-list").blur(function () {
    $('.add-layer-tag').css("focus");
    $(".add-layer-list").css("display", "none");
  });
};

// 加载网络projectloadProject
global.loadProject = function () {
  var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(project_url) {
    var projectString, projectJson, buildProject, taskId, reloadConfig, projectName, reloadLayers, orderLayers, i, layerId, _index, mapGeoman, mapView, index, val, featureType, options, dataSourceInfo, layer, render, projectManager;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return KQ.Common.NetworkTools.httpGetAsync(project_url);

          case 3:
            projectString = _context5.sent;

            // 工程文件需要解码
            projectJson = JSON.parse(decodeURIComponent(projectString));
            buildProject = KQ.Builder.BuilderProject.getInstance();
            // url最后部分为taskId

            taskId = KQ.Common.CommonTools.getUrlname(project_url);

            // config中加载的layer信息保存到buildProject中

            buildProject.reloadConfig = projectJson;

            // 读取的工程配置信息
            reloadConfig = KQ.Builder.BuilderProject.getInstance().reloadConfig;
            projectName = reloadConfig.title;
            reloadLayers = reloadConfig.layers;

            // 清除原有的图层

            KQ.Builder.BuilderCommon.clearLayersContainer();

            // 重排reloadLayers的顺序
            orderLayers = [];

            for (i = 0; i < reloadLayers.length; ++i) {
              layerId = reloadLayers[i][0];
              _index = buildProject.reloadConfig.layersOrderMap[layerId];


              orderLayers.splice(_index, 0, reloadLayers[i][1]);
            }

            // 恢复hand-draw图层
            mapGeoman = KQ.Map.MapGeoman.getInstance();

            if (reloadConfig.geomanArray) {
              mapGeoman.fromSaveString(reloadConfig.geomanArray);
            }

            mapView = KQ.Builder.BuilderProject.getInstance().mapView;

            KQ.Control.Waiting.show(mapView._getMap(), 'pin', 'meter');
            index = 0;

          case 19:
            if (!(index < orderLayers.length)) {
              _context5.next = 46;
              break;
            }

            val = orderLayers[index];
            featureType = val.featureType;
            options = val.options;
            dataSourceInfo = val.dataSource;
            _context5.next = 26;
            return KQ.Builder.BuilderCommon.addNewLayerWithoutWaitingDialog(dataSourceInfo);

          case 26:
            layer = _context5.sent;

            layer.setRenderType(options.renderType, mapView);

            // 手绘图层 需要还原dataSource
            if (layer.renderType === "hand-draw") {
              layer.getRender().setDataSource(val.renderDataSource);
            }

            // 重新设置layer的options
            render = layer.getRender();

            render.setOptions(options);
            layer.renderType = options.renderType;
            // 根据option重新生成options.thematicColors
            window.builderInitDoms.refreshThematicColors(layer, options);

            // 设置当前激活图层，及渲染的样式（basic，single还是section）
            buildProject.setting.layer = layer;

            // 刷新图层的model信息
            _context5.t0 = featureType;
            _context5.next = _context5.t0 === 'point' ? 37 : _context5.t0 === 'line' ? 39 : _context5.t0 === 'polygon' ? 41 : 43;
            break;

          case 37:
            onPointLayerReady();
            return _context5.abrupt("break", 43);

          case 39:
            onLineLayerReady();
            return _context5.abrupt("break", 43);

          case 41:
            onPolygonLayerReady();
            return _context5.abrupt("break", 43);

          case 43:
            index++;
            _context5.next = 19;
            break;

          case 46:
            // TODO 恢复工程的设置信息
            // 重新拉取一个工程时，如果当前页面没有图层选中or底图图层（不存在model），render不存在render_model，会报错误
            // window.builderInitDoms.render();
            $("#current-project-name").text(projectName);
            // 重新赋值给taskId, 保存工程才能覆盖原工程
            projectManager = KQ.Builder.ProjectManager.getInstance();

            projectManager.taskId = taskId;

            // 恢复map的中心点及level
            // mapView.zoomToMap();
            mapView.setView([reloadConfig.center.y, reloadConfig.center.x], reloadConfig.level);

            KQ.Control.Notification.getInstance().showSuccess("加载工程成功！");
            _context5.next = 56;
            break;

          case 53:
            _context5.prev = 53;
            _context5.t1 = _context5["catch"](0);

            KQ.Control.Notification.getInstance().showError("加载失败，请检查网络！");

          case 56:
            _context5.prev = 56;

            KQ.Control.Waiting.close();
            return _context5.finish(56);

          case 59:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this, [[0, 53, 56, 59]]);
  }));

  return function (_x5) {
    return _ref5.apply(this, arguments);
  };
}();

global.deleteDataFile = function () {
  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(url) {
    var mapView, result;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            mapView = KQ.Builder.BuilderProject.getInstance().mapView;

            KQ.Control.Waiting.show(mapView._getMap(), 'pin', 'meter');

            _context6.prev = 2;
            _context6.next = 5;
            return deleteFile(url);

          case 5:
            result = _context6.sent;

            if (!(result === 'success')) {
              _context6.next = 12;
              break;
            }

            KQ.Control.Notification.getInstance().showSuccess("删除数据成功！");
            _context6.next = 10;
            return window.loadFileDialog._refreshData();

          case 10:
            _context6.next = 13;
            break;

          case 12:
            KQ.Control.Notification.getInstance().showError("删除数据失败！");

          case 13:
            _context6.prev = 13;

            KQ.Control.Waiting.close();
            return _context6.finish(13);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this, [[2,, 13, 16]]);
  }));

  return function (_x6) {
    return _ref6.apply(this, arguments);
  };
}();

global.deleteProjectFile = function () {
  var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(url) {
    var mapView, result;
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            mapView = KQ.Builder.BuilderProject.getInstance().mapView;

            KQ.Control.Waiting.show(mapView._getMap(), 'pin', 'meter');

            _context7.prev = 2;
            _context7.next = 5;
            return deleteFile(url);

          case 5:
            result = _context7.sent;

            if (!(result === 'success')) {
              _context7.next = 12;
              break;
            }

            KQ.Control.Notification.getInstance().showSuccess("删除工程成功！");
            _context7.next = 10;
            return window.loadProjectDialog._refreshData();

          case 10:
            _context7.next = 13;
            break;

          case 12:
            KQ.Control.Notification.getInstance().showError("删除工程失败！");

          case 13:
            _context7.prev = 13;

            KQ.Control.Waiting.close();
            return _context7.finish(13);

          case 16:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, this, [[2,, 13, 16]]);
  }));

  return function (_x7) {
    return _ref7.apply(this, arguments);
  };
}();

global.deleteFile = function () {
  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(url) {
    return regeneratorRuntime.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;

            if (!KQ.Builder.BuilderCommon.isPortalEnvironment()) {
              _context8.next = 7;
              break;
            }

            _context8.next = 4;
            return deleteFile_portal(url);

          case 4:
            return _context8.abrupt("return", _context8.sent);

          case 7:
            _context8.next = 9;
            return deleteFile_server(url);

          case 9:
            return _context8.abrupt("return", _context8.sent);

          case 10:
            _context8.next = 15;
            break;

          case 12:
            _context8.prev = 12;
            _context8.t0 = _context8["catch"](0);
            return _context8.abrupt("return", "error");

          case 15:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, this, [[0, 12]]);
  }));

  return function (_x8) {
    return _ref8.apply(this, arguments);
  };
}();

// 删除远程文件
global.deleteFile_server = function () {
  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(url) {
    var cmd, result;
    return regeneratorRuntime.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            cmd = url.replace('/download/', '/deleteFileById?taskIds=');
            _context9.t0 = JSON;
            _context9.next = 4;
            return KQ.Common.NetworkTools.httpGetAsync(cmd);

          case 4:
            _context9.t1 = _context9.sent;
            result = _context9.t0.parse.call(_context9.t0, _context9.t1);
            return _context9.abrupt("return", result.result);

          case 7:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, this);
  }));

  return function (_x9) {
    return _ref9.apply(this, arguments);
  };
}();

// 删除远程文件
global.deleteFile_portal = function () {
  var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(url) {
    var taskIds;
    return regeneratorRuntime.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            taskIds = url.slice(url.lastIndexOf("/") + 1);
            return _context11.abrupt("return", parent.window.vm.$api.mapBuilderApi.deleteFileById({
              taskIds: taskIds
            }, { __LOGINTYPE: "dialog", noLoading: true }).then(function () {
              var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(res) {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                  while (1) {
                    switch (_context10.prev = _context10.next) {
                      case 0:
                        return _context10.abrupt("return", res.data.result);

                      case 1:
                      case "end":
                        return _context10.stop();
                    }
                  }
                }, _callee10, this);
              }));

              return function (_x11) {
                return _ref11.apply(this, arguments);
              };
            }()).catch(function () {
              return "error";
            }));

          case 2:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, this);
  }));

  return function (_x10) {
    return _ref10.apply(this, arguments);
  };
}();

global.initLayersContainer = function () {
  var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(layersContainer) {
    var buildProject, mapView;
    return regeneratorRuntime.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            buildProject = KQ.Builder.BuilderProject.getInstance();
            mapView = buildProject.mapView;

            // 初始化图层容器

            layersContainer = new KQ.Builder.BuilderUi.LayerListBox("vector-layers-container", {
              dataSource: [],

              dragend: function dragend(e) {
                // 刷新、同步dataSource
                var dataSource = [];
                var layersContainer = buildProject.layersContainer;
                var items = layersContainer.items();

                items.each(function (index, elem) {
                  var dataItem = layersContainer.dataItem(elem);
                  dataSource.push({
                    layerId: dataItem.layerId,
                    name: dataItem.name,
                    type: dataItem.type
                  });
                });

                layersContainer.setDataSource(dataSource);
                buildProject.resetLayersZIndex(); // 拖动item的响应函数
              }
            });

            buildProject.layersContainer = layersContainer;

            // 响应底图点击信号
            $(".layers-container .base-layers li").click(function () {
              $(".sidebar-content-panel").css("display", "block");
              $(".sidebar-layers-manager").css("display", "none");
              $(".content-editor-pane-basemap").css("display", "block");
            });

            // 图层容器的信号响应函数
            $("#vector-layers-container").bind("select", function (event, dataItem) {
              if (dataItem.type == 'tile') {
                return;
              }

              buildProject.setting.name = dataItem.name;
              buildProject.setting.layer = dataItem.layer;

              $(".sidebar-content-panel").css("display", "block");
              $(".sidebar-layers-manager").css("display", "none");
              $(".content-editor-pane-" + dataItem.type).css("display", "block");

              $(".layer-editor-title-name").text(dataItem.name);

              if (dataItem.type == 'point') {
                onPointLayerReady();
              } else if (dataItem.type == 'line') {
                onLineLayerReady();
              } else if (dataItem.type == 'polygon') {
                onPolygonLayerReady();
              } else if (dataItem.type == 'hand-draw') {
                onHandDrawLayerReady();
              }
            });

            // 监听图层可见信号
            $("#vector-layers-container").bind("builder_layer_visible", function (event, dataItem) {
              var layer = dataItem.layer;
              layer.visible = true;

              layer.getRender().addToMapView(mapView);
            });

            // 监听图层不可见信号
            $("#vector-layers-container").bind("builder_layer_invisible", function (event, dataItem) {
              var layer = dataItem.layer;
              layer.visible = false;

              layer.getRender().remove();
            });

            // 监听全图信号
            $("#vector-layers-container").bind("builder_full_map", function (event, dataItem) {
              var layer = dataItem.layer;
              layer.getRender().flyToBounds();
            });

            // 监听导出图层信号
            $("#vector-layers-container").bind("builder_export", function (event, dataItem) {
              var layer = dataItem.layer;
              var geojson = KQ.Builder.BuilderLayerDatas.getInstance().getData(layer.options.guid);
              var geojson_string = JSON.stringify(geojson);

              KQ.Common.CommonTools.exportData(geojson_string, 'exportdata.geojson');
              KQ.Control.Notification.getInstance().showSuccess(KQ.Local.Control.drawControl.exportDraw.success());
            });

            // 监听属性表信号
            $("#vector-layers-container").bind("builder_attribute_table", function (event, dataItem) {
              var layer = dataItem.layer;
              var geojson = KQ.Builder.BuilderLayerDatas.getInstance().getData(layer.options.guid);
              var columns = [];
              var dataSource = [];
              var fields = geojson.fields || Object.keys(geojson.features[0].properties);
              var features = geojson.features;

              // 组织columns
              for (var i = 0; i < fields.length; ++i) {
                var field = fields[i].name || fields[i];
                var title = fields[i].aliasName || field;

                columns.push({
                  field: field,
                  title: title
                });
              }

              // 组织dataSource
              for (var _i = 0; _i < features.length; ++_i) {
                dataSource.push(features[_i].properties);
              }

              KQ.Builder.BuilderUi.BuilderInfoDialog.getInstance().open(dataSource, columns);
            });

            // 监听图例信号
            $("#vector-layers-container").bind("builder_legend", function (event, dataItem, el) {
              mapView.legend_window.open();
              KQ.Builder.BuilderUi.ColorField.getInstance()._updateLegend();
            });

            // 监听图层删除信号
            $("#vector-layers-container").bind("builder_layer_delete", function (event, dataItem, el) {
              layersContainer.remove(el);
              buildProject.deleteLayer(dataItem.layer);

              // 刷新分析功能的图层控件
              KQ.Builder.BuilderCommon.refreshAnalysisLayersControl();
            });

            // 监听图层重命名信号
            $("#vector-layers-container").bind("builder_rename", function (event, dataItem, el) {
              // 隐藏菜单
              $(el).find(".secound-line .lists").css("display", "none");

              // 隐藏span，显示input用于编辑
              var $span = $(el).find(".first-line .title span");
              var $input = $(el).find(".first-line .title input");
              $span.css("display", "none");
              $input.css("display", "inline-block");

              // 光标移动到最后一个字符
              var value = $input.val();
              $input.val("").focus().val(value);

              // 阻止click、mousedown事件冒泡
              $input.bind("click mousedown", function (e) {
                e.stopPropagation();
              });

              // 失去焦点
              $input.blur(function (e) {
                // 隐藏input，显示span用于显示
                $span.css("display", "inline-block");
                $input.css("display", "none");

                // 修改数据
                var $li = $span.closest("li");
                var dataItem = layersContainer._listbox.dataItem($li);
                dataItem.set("name", $input.val());
                dataItem.layer.options.dataSource.name = $input.val(); // 更新dataSource中的name 用于project的恢复
              });
            });

            // 监听图层属性信号
            $("#vector-layers-container").bind("builder_layer_attribute", function (event, dataItem) {
              var layer = dataItem.layer;
              var geojson = KQ.Builder.BuilderLayerDatas.getInstance().getData(layer.options.guid);
              var columns = [];

              var titles = ["名称", "显示名称", "类型"];
              var fields = ["name", "aliasName", "type"];

              // 组织columns
              for (var i = 0; i < fields.length; ++i) {
                columns.push({
                  field: fields[i],
                  title: titles[i]
                });
              }

              var dataSource = geojson.fields || Object.keys(geojson.features[0].properties);
              // 组织dataSource
              for (var _i2 = 0; _i2 < dataSource.length; ++_i2) {
                dataSource[_i2].aliasName = dataSource[_i2].aliasName || dataSource[_i2].name;
              }

              KQ.Builder.BuilderUi.BuilderLayerAttributeDialog.getInstance().open(dataSource, columns);
            });

          case 15:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, this);
  }));

  return function (_x12) {
    return _ref12.apply(this, arguments);
  };
}();

global.initHandDrawLayersContainer = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
  var container;
  return regeneratorRuntime.wrap(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          // 初始化图层容器
          container = new KQ.Builder.BuilderUi.HandDrawLayerListBox("hand-draw-list", {
            dataSource: []
          });


          KQ.Builder.BuilderProject.getInstance().handDrawLayersContainer = container;

          // 监听图层重命名的信号
          $("#hand-draw-list").bind("hand_draw_layer_rename", function (event, dataItem, el) {
            var $span = $(el).find(".editable-span span");
            var $input = $(el).find(".editable-span input");

            // 隐藏span，显示input用于编辑
            $span.css("display", "none");
            $input.css("display", "inline-block");

            // 光标移动到最后一个字符
            var value = $input.val();
            $input.val("").focus().val(value);

            // 输入完毕 修改name的值
            $input.blur(function () {
              // 隐藏input，显示span用于显示
              $span.css("display", "inline-block");
              $input.css("display", "none");

              // 修改数据
              var $li = $span.closest("li");
              var dataItem = container._listbox.dataItem($li);
              dataItem.set("name", $input.val());
            });
          });

          // 监听图层编辑的信号
          $("#hand-draw-list").bind("hand_draw_layer_edit", function (event, dataItem) {
            var editorOptions = dataItem.layer.editorOptions;
            var radius = editorOptions.imageInfo ? editorOptions.imageInfo.radius * 100 : 0;
            var zoomRate = editorOptions.vectorInfo ? editorOptions.vectorInfo.zoomRate * 100 : 0;

            // 组织model
            var model = kendo.observable({
              styleOptions: editorOptions,

              radius: radius,
              zoomRate: zoomRate,
              lineOpacity: editorOptions.lineOpacity * 100,
              fillOpacity: editorOptions.fillOpacity * 100,
              lineStyleList: KQ.Builder.BuilderUi.RenderSettingDataSource.lineStyleList()
            });

            // 圆、矩形按照polygon来处理
            var type = dataItem.type;

            if (type === "text") {
              // 弹出手绘文本图层编辑框
              KQ.Builder.BuilderUi.HandDrawTextEditDialog.getInstance().open({ editorOptions: editorOptions });

              // 记录layer
              KQ.Builder.BuilderProject.getInstance().setting.handDrawLayer = dataItem.layer;
            } else {
              if (type === "circle" || type === "rectangle") {
                type = "polygon";
              }

              // 控件和model进行绑定
              var el = $("#tabstrip .hand-draw-edit-" + type);
              kendo.bind(el, model);

              // 记录model和layer
              KQ.Builder.BuilderProject.getInstance().setInfo('render_model', model);
              KQ.Builder.BuilderProject.getInstance().setting.handDrawLayer = dataItem.layer;

              // 显示对应的图形编辑界面
              el.css("display", "block").siblings().css("display", "none");

              // 弹出图层编辑框
              KQ.Builder.BuilderUi.HandDrawEditDialog.getInstance().open(dataItem);

              console.log("event", event, "dataItem", dataItem);
              // 编辑框信息
              KQ.Builder.BuilderUi.HandDrawEdtInfo.getInstance().init(dataItem);
              // 编辑框属性
              KQ.Builder.BuilderUi.HandDrawEditAttribute.getInstance().init(dataItem);
            }
          });

          // 监听图层删除的信号
          $("#hand-draw-list").bind("hand_draw_layer_delete", function (event, dataItem, el) {
            KQ.Builder.BuilderProject.getInstance().geoman.removeGeomanLayer(dataItem.layer);

            container.remove(el);
          });

        case 5:
        case "end":
          return _context13.stop();
      }
    }
  }, _callee13, this);
}));

global.swapRenderType = function (renderType, model_map) {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var mapView = buildProject.mapView;
  var layer = buildProject.setting.layer; // 当前激活的layer

  layer.setRenderType(renderType, mapView);
  buildProject.setInfo('render_model', model_map.get(renderType));

  //重绘图例
  KQ.Builder.BuilderUi.ColorField.getInstance()._updateLegend();
};

global.onPointLayerReady = function () {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var layer = buildProject.setting.layer; // 当前激活的layer

  var symbolType = layer.render.get('basic').options.pointSymbolType;
  if (symbolType == 'vector') {
    buildProject.symbolTypeSwapButton.select(0);
  } else {
    buildProject.symbolTypeSwapButton.select(1);
  }

  // 点数据 基本类型
  var basicStyleOptions = layer.render.get('basic').options;
  KQ.Builder.BuilderCommon.convertPointVectorInfoOptions(basicStyleOptions);

  var basicModel = kendo.observable({
    styleOptions: basicStyleOptions,
    pointSize: basicStyleOptions.vectorInfo.fontSize.split("px")[0], // 点大小

    pointOpacity: basicStyleOptions.vectorInfo.fillOpacity * 100, // 点的不透明度
    lineOpacity: basicStyleOptions.vectorInfo.strokeOpacity * 100, // 线的不透明度

    labelDirectionList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelDirectionList(),
    labelFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFieldList(),
    labelFontList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFontList()
  });

  // 点数据 单值类型
  var singleStyleOptions = layer.render.get('single').options;
  KQ.Builder.BuilderCommon.convertPointVectorInfoOptions(singleStyleOptions);

  var singleModel = kendo.observable({
    styleOptions: singleStyleOptions,

    pointSize: singleStyleOptions.vectorInfo.fontSize.split("px")[0], // 点大小

    pointOpacity: singleStyleOptions.vectorInfo.fillOpacity * 100, // 点的不透明度
    lineOpacity: singleStyleOptions.vectorInfo.strokeOpacity * 100, // 线的不透明度

    thematicFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.thematicFieldList(),
    rampColorList: KQ.Builder.BuilderUi.RenderSettingDataSource.rampColorList(),

    labelDirectionList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelDirectionList(),
    labelFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFieldList(),
    labelFontList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFontList()
  });

  // 点数据 分段类型
  var sectionStyleOptions = layer.render.get('section').options;
  KQ.Builder.BuilderCommon.convertPointVectorInfoOptions(sectionStyleOptions);

  var sectionModel = kendo.observable({
    styleOptions: sectionStyleOptions,
    pointSize: sectionStyleOptions.vectorInfo.fontSize.split("px")[0], // 点大小

    pointOpacity: sectionStyleOptions.vectorInfo.fillOpacity * 100, // 点的不透明度
    lineOpacity: sectionStyleOptions.vectorInfo.strokeOpacity * 100, // 线的不透明度

    thematicFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.thematicFieldList(),
    sectionMethodList: KQ.Builder.BuilderUi.RenderSettingDataSource.sectionMethodList(),
    sectionNumberList: KQ.Builder.BuilderUi.RenderSettingDataSource.sectionNumberList(),
    rampColorList: KQ.Builder.BuilderUi.RenderSettingDataSource.rampColorList(),
    lineStyleList: KQ.Builder.BuilderUi.RenderSettingDataSource.lineStyleList(),

    labelDirectionList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelDirectionList(),
    labelFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFieldList(),
    labelFontList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFontList()
  });

  // 点数据 热力图类型
  var heatmapStyleOptions = layer.render.get('heatmap').options;
  var heatmapModel = kendo.observable({
    styleOptions: heatmapStyleOptions,

    weightFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.weightFieldList(),
    heatmapRampColorList: KQ.Builder.BuilderUi.RenderSettingDataSource.heatmapRampColorList()
  });

  // 初始化model
  var model_map = new Map([["basic", basicModel], ["single", singleModel], ["section", sectionModel], ["heatmap", heatmapModel]]);

  // 视图和model进行绑定
  model_map.forEach(function (value, key) {
    kendo.bind($("div#point-theme-tools-" + key), value);
  });

  // window.builderInitDoms.initFieldColorContainer();
  KQ.Builder.BuilderUi.RenderSettingUi.getInstance().initColorField();

  $(".point-layer-types " + ".layer-type-img").removeClass('img-selected');
  $(".point-layer-types .point-" + layer.renderType).addClass('img-selected');
  $(".point-theme-tools > .theme-tools-item").css("display", "none");
  $("#point-theme-tools-" + layer.renderType).css("display", "block");

  $('.point-layer-types .layer-type-img').click(function () {
    // 如果为激活的layer type，不做响应
    if ($(this).hasClass("img-selected")) {
      return;
    }
    $(".point-layer-types " + ".layer-type-img").removeClass('img-selected');
    $(this).addClass('img-selected');
    $(".point-theme-tools > .theme-tools-item").css("display", "none");

    var render_type = $(this).attr("type");
    $("#point-theme-tools-" + render_type).css("display", "block");

    swapRenderType(render_type, model_map);
  });

  swapRenderType(layer.renderType, model_map);

  /* point basic symbol type switch */
  var pointSymbolType = basicStyleOptions.pointSymbolType;
  if (pointSymbolType == 'vector') swapPointSvg();else swapPointImg();

  $(".point-symbol-svg").click(function () {
    swapPointSvg();
  });
  $(".point-symbol-img").click(function () {
    swapPointImg();
  });

  /* swap svg/img */
  function swapPointSvg() {
    $('<style>.only-svg-symbol-tyle{display:block;}</style>').appendTo(document.body);

    buildProject.getInfo('render_model').styleOptions.pointSymbolType = "vector";
    KQ.Builder.BuilderCommon.fillSvgSymbols($(".symbols-box"), 6);

    // 防止多个点图层存在时 svg/img相互彼此影响
    $(".symbols-container .symbols-box").trigger('symbol_type_vector');
  }

  function swapPointImg() {
    $('<style>.only-svg-symbol-tyle{display:none;}</style>').appendTo(document.body);

    buildProject.getInfo('render_model').styleOptions.pointSymbolType = "image";
    KQ.Builder.BuilderCommon.fillImageSymbols($(".symbols-box"), 10, 6);

    $(".symbols-container .symbols-box").trigger('symbol_type_image');
  }
};

global.onLineLayerReady = function () {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var layer = buildProject.setting.layer; // 当前激活的layer

  var basicStyleOptions = layer.render.get('basic').options;
  var basicModel = kendo.observable({
    styleOptions: basicStyleOptions,
    lineOpacity: basicStyleOptions.lineOpacity * 100,

    lineStyleList: KQ.Builder.BuilderUi.RenderSettingDataSource.lineStyleList(),
    labelFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFieldList(),
    labelFontList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFontList()
  });

  var singleStyleOptions = layer.render.get('single').options;
  var singleModel = kendo.observable({
    styleOptions: singleStyleOptions,
    lineOpacity: singleStyleOptions.lineOpacity * 100,

    thematicFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.thematicFieldList(),
    lineStyleList: KQ.Builder.BuilderUi.RenderSettingDataSource.lineStyleList(),
    rampColorList: KQ.Builder.BuilderUi.RenderSettingDataSource.rampColorList(),
    labelFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFieldList(),
    labelFontList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFontList()
  });

  var sectionStyleOptions = layer.render.get('section').options;
  var sectionModel = kendo.observable({
    styleOptions: sectionStyleOptions,
    lineOpacity: sectionStyleOptions.lineOpacity * 100,

    thematicFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.thematicFieldList(),
    sectionMethodList: KQ.Builder.BuilderUi.RenderSettingDataSource.sectionMethodList(),
    sectionNumberList: KQ.Builder.BuilderUi.RenderSettingDataSource.sectionNumberList(),

    lineStyleList: KQ.Builder.BuilderUi.RenderSettingDataSource.lineStyleList(),
    rampColorList: KQ.Builder.BuilderUi.RenderSettingDataSource.rampColorList(),
    labelFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFieldList(),
    labelFontList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFontList()
  });

  // 初始化model
  var model_map = new Map([["basic", basicModel], ["single", singleModel], ["section", sectionModel]]);

  // 视图和model进行绑定
  model_map.forEach(function (value, key) {
    kendo.bind($("div#line-theme-tools-" + key), value);
  });

  // window.builderInitDoms.initFieldColorContainer();
  KQ.Builder.BuilderUi.RenderSettingUi.getInstance().initColorField();

  $(".line-layer-types " + ".layer-type-img").removeClass('img-selected');
  $(".line-layer-types .line-" + layer.renderType).addClass('img-selected');
  $(".line-theme-tools > .theme-tools-item").css("display", "none");
  $("#line-theme-tools-" + layer.renderType).css("display", "block");

  $('.line-layer-types .layer-type-img').click(function () {
    $(".line-layer-types " + ".layer-type-img").removeClass('img-selected');
    $(this).addClass('img-selected');

    $(".line-theme-tools > .theme-tools-item").css("display", "none");

    var render_type = $(this).attr("type");

    $("#line-theme-tools-" + render_type).css("display", "block");
    swapRenderType(render_type, model_map);
  });

  swapRenderType(layer.renderType, model_map);
};

global.onPolygonLayerReady = function () {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var layer = buildProject.setting.layer; // 当前激活的layer

  // 面数据、基本类型
  var basicStyleOpacity = layer.render.get('basic').options;
  var basicModel = kendo.observable({
    styleOptions: basicStyleOpacity,
    fillOpacity: basicStyleOpacity.fillOpacity * 100,
    lineOpacity: basicStyleOpacity.lineOpacity * 100,

    lineStyleList: KQ.Builder.BuilderUi.RenderSettingDataSource.lineStyleList(),
    labelFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFieldList(),
    labelFontList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFontList()
  });

  // 面数据、单值类型
  var singleStyleOpacity = layer.render.get('single').options;
  var singleModel = kendo.observable({
    styleOptions: singleStyleOpacity,
    fillOpacity: singleStyleOpacity.fillOpacity * 100,
    lineOpacity: singleStyleOpacity.lineOpacity * 100,

    thematicFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.thematicFieldList(),
    rampColorList: KQ.Builder.BuilderUi.RenderSettingDataSource.rampColorList(),
    lineStyleList: KQ.Builder.BuilderUi.RenderSettingDataSource.lineStyleList(),
    labelFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFieldList(),
    labelFontList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFontList()
  });

  // 面数据、分段类型
  var sectionStyleOpacity = layer.render.get('section').options;
  var sectionModel = kendo.observable({
    styleOptions: sectionStyleOpacity,
    fillOpacity: sectionStyleOpacity.fillOpacity * 100,
    lineOpacity: sectionStyleOpacity.lineOpacity * 100,

    thematicFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.thematicFieldList(),
    sectionMethodList: KQ.Builder.BuilderUi.RenderSettingDataSource.sectionMethodList(),
    sectionNumberList: KQ.Builder.BuilderUi.RenderSettingDataSource.sectionNumberList(),
    rampColorList: KQ.Builder.BuilderUi.RenderSettingDataSource.rampColorList(),
    lineStyleList: KQ.Builder.BuilderUi.RenderSettingDataSource.lineStyleList(),
    labelFieldList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFieldList(),
    labelFontList: KQ.Builder.BuilderUi.RenderSettingDataSource.labelFontList()
  });

  // 初始化model
  var model_map = new Map([["basic", basicModel], ["single", singleModel], ["section", sectionModel]]);

  // 视图和model进行绑定
  model_map.forEach(function (value, key) {
    kendo.bind($("div#polygon-theme-tools-" + key), value);
  });

  // window.builderInitDoms.initFieldColorContainer();
  KQ.Builder.BuilderUi.RenderSettingUi.getInstance().initColorField();

  $(".polygon-layer-types " + ".layer-type-img").removeClass('img-selected');
  $(".polygon-layer-types .region-" + layer.renderType).addClass('img-selected');
  $(".polygon-theme-tools > .theme-tools-item").css("display", "none");
  $("#polygon-theme-tools-" + layer.renderType).css("display", "block");

  $('.polygon-layer-types .layer-type-img').click(function () {
    $(".polygon-layer-types " + ".layer-type-img").removeClass('img-selected');
    $(this).addClass('img-selected');

    $(".polygon-theme-tools > .theme-tools-item").css("display", "none");

    var render_type = $(this).attr("type");
    $("#polygon-theme-tools-" + render_type).css("display", "block");
    swapRenderType(render_type, model_map);
  });

  swapRenderType(layer.renderType, model_map);
};

global.onHandDrawLayerReady = function () {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var render = buildProject.setting.layer.getRender(); // 当前激活的layer
  var handDrawLayersContainer = buildProject.handDrawLayersContainer;
  var dataSource = render.dataSource;

  handDrawLayersContainer.reset(dataSource);
};

global.initSiderbar = function (mapView) {

  // 初始化图例window
  var win = new KQ.Control.Window('legend-window', {
    parentID: 'KqMapID',
    position: {
      left: '355px',
      top: '10px'
    },
    icon: 'fa fa-bar-chart',
    width: '240px',
    title: ' 图例',
    draggable: false,
    resizable: false,
    scrollable: false,
    close: function close(e) {
      // e.preventDefault();
    }
  });

  win.initAsync(function () {
    mapView.legend_window = win;
  });

  // 图例跟随sidebar
  jQuery.extend(jQuery.easing, {
    easeOutQuad: function easeOutQuad(x, t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }
  });
  var options = {
    onOpened: function onOpened() {
      $("#legend-window").parent().animate({ left: "355px" }, 500, 'easeOutQuad');
    },
    onClosed: function onClosed() {
      $("#legend-window").parent().animate({ left: "63px" }, 500, 'easeOutQuad');
    }

    // 初始化侧边栏
  };var buildProject = KQ.Builder.BuilderProject.getInstance();
  var buildersidebar = $('#buildersidebar').buildersidebar(options);
  buildProject.siderbar = buildersidebar;
  buildersidebar.close();

  $('.saveToolBar').kendoSaveToolBar({
    sidebar: buildersidebar,
    onSelect: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(e) {
        var type, projectManager, projectName, option;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                type = $(e.item).data("type");

                console.log("Selected: " + type);
                _context19.t0 = type;
                _context19.next = _context19.t0 === 'save' ? 5 : _context19.t0 === 'saveas' ? 23 : _context19.t0 === 'clouddown' ? 27 : _context19.t0 === 'fold' ? 31 : 34;
                break;

              case 5:
                _context19.prev = 5;

                KQ.Control.Waiting.show(mapView._getMap(), 'pin', 'meter');
                projectManager = KQ.Builder.ProjectManager.getInstance();
                projectName = $("#current-project-name")[0].innerText;
                option = {};

                option.projectName = projectName;
                option.isSaveAs = false;
                _context19.next = 14;
                return projectManager.saveProject(option);

              case 14:
                _context19.next = 19;
                break;

              case 16:
                _context19.prev = 16;
                _context19.t1 = _context19["catch"](5);

                KQ.Control.Waiting.close();

              case 19:
                _context19.prev = 19;

                KQ.Control.Waiting.close();
                return _context19.finish(19);

              case 22:
                return _context19.abrupt("break", 34);

              case 23:
                window.ProjectSaveAsDialog = null;
                if (!window.ProjectSaveAsDialog) {
                  window.ProjectSaveAsDialog = new KQ.Builder.BuilderUi.ProjectSaveAsDialog("#project-saveas-container", {});
                  window.ProjectSaveAsDialog.on("save", function () {
                    var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(data) {
                      var projectManager, option;
                      return regeneratorRuntime.wrap(function _callee14$(_context14) {
                        while (1) {
                          switch (_context14.prev = _context14.next) {
                            case 0:
                              console.log("save project: ", data);
                              projectManager = KQ.Builder.ProjectManager.getInstance();
                              option = {};

                              option.projectName = data.dataSourceInfo.name;
                              option.isSaveAs = true;
                              _context14.next = 7;
                              return projectManager.saveProject(option);

                            case 7:
                            case "end":
                              return _context14.stop();
                          }
                        }
                      }, _callee14, this);
                    }));

                    return function (_x14) {
                      return _ref15.apply(this, arguments);
                    };
                  }());
                  window.ProjectSaveAsDialog.on("cancal", function () {
                    var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(data) {
                      return regeneratorRuntime.wrap(function _callee15$(_context15) {
                        while (1) {
                          switch (_context15.prev = _context15.next) {
                            case 0:
                              console.log("cancel save: ", data);

                            case 1:
                            case "end":
                              return _context15.stop();
                          }
                        }
                      }, _callee15, this);
                    }));

                    return function (_x15) {
                      return _ref16.apply(this, arguments);
                    };
                  }());
                }
                $("#project-saveas-container").data("kendoWindow").center().open();
                return _context19.abrupt("break", 34);

              case 27:
                window.loadProjectDialog = null;
                if (!window.loadProjectDialog) {
                  window.loadProjectDialog = new KQ.Builder.BuilderUi.ProjectLoadDialog("#project-download-container", { filter: "prj" });

                  window.loadProjectDialog.on('load', function () {
                    var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(data) {
                      return regeneratorRuntime.wrap(function _callee16$(_context16) {
                        while (1) {
                          switch (_context16.prev = _context16.next) {
                            case 0:
                              _context16.next = 2;
                              return loadProject(data.dataSourceInfo['url']);

                            case 2:
                            case "end":
                              return _context16.stop();
                          }
                        }
                      }, _callee16, this);
                    }));

                    return function (_x16) {
                      return _ref17.apply(this, arguments);
                    };
                  }());

                  window.loadProjectDialog.on('delete', function () {
                    var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(data) {
                      return regeneratorRuntime.wrap(function _callee17$(_context17) {
                        while (1) {
                          switch (_context17.prev = _context17.next) {
                            case 0:
                              // 初始化删除工程按钮
                              $("#confirm-div").kendoConfirm({
                                title: "删除远程工程",
                                content: "工程删除后无法恢复，确定删除？",
                                messages: {
                                  okText: "确定",
                                  cancelText: "取消"
                                }
                              }).data("kendoConfirm").result.done(function () {
                                $('body').append($('<div id="confirm-div">'));
                                window.loadProjectDialog.fire("delete_event", data);
                              }).fail(function () {
                                $('body').append($('<div id="confirm-div">'));
                              });

                            case 1:
                            case "end":
                              return _context17.stop();
                          }
                        }
                      }, _callee17, this);
                    }));

                    return function (_x17) {
                      return _ref18.apply(this, arguments);
                    };
                  }());

                  window.loadProjectDialog.on("delete_event", function () {
                    var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(data) {
                      return regeneratorRuntime.wrap(function _callee18$(_context18) {
                        while (1) {
                          switch (_context18.prev = _context18.next) {
                            case 0:
                              _context18.next = 2;
                              return deleteProjectFile(data.dataSourceInfo['url']);

                            case 2:
                            case "end":
                              return _context18.stop();
                          }
                        }
                      }, _callee18, this);
                    }));

                    return function (_x18) {
                      return _ref19.apply(this, arguments);
                    };
                  }());
                }

                $("#project-download-container").data("kendoWindow").center().open();
                return _context19.abrupt("break", 34);

              case 31:
                console.log('do fold1!');
                if (this.options.sidebar) this.options.sidebar.close();
                return _context19.abrupt("break", 34);

              case 34:
              case "end":
                return _context19.stop();
            }
          }
        }, _callee19, this, [[5, 16, 19, 22]]);
      }));

      function onSelect(_x13) {
        return _ref14.apply(this, arguments);
      }

      return onSelect;
    }()
  });

  // 初始化userinfo
  new KQ.Builder.BuilderUi.BuilderUserInfo();
};

global.initMapGeoman = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20() {
  var pmlayers, geoman, buildProject, map;
  return regeneratorRuntime.wrap(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          pmlayers = [];
          geoman = KQ.Map.MapGeoman.getInstance();
          buildProject = KQ.Builder.BuilderProject.getInstance();
          map = buildProject.mapView._getMap();


          geoman.init(pmlayers, map, {
            onCreate: function onCreate(layer) {
              var type = KQ.Builder.BuilderCommon.geomanShapeToType(layer.shape);
              addHandDrawLayerItem(layer.id, type);
              geoman.disableDraw(type);
            }
          });

          buildProject.geoman = geoman;

        case 6:
        case "end":
          return _context20.stop();
      }
    }
  }, _callee20, this);
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],5:[function(require,module,exports){
/**
 * Created by liwei on 2019/10/14.
 */
'use strict';

require('./builder/_initDoms');
require('./builder/libs/jquery-sidebar');
require('./builder/viewer');

require('./builder/common');
// require('./builder/BuilderInit');

},{"./builder/_initDoms":1,"./builder/common":2,"./builder/libs/jquery-sidebar":3,"./builder/viewer":4}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci9faW5pdERvbXMuanMiLCJzcmMvYnVpbGRlci9jb21tb24uanMiLCJzcmMvYnVpbGRlci9saWJzL2pxdWVyeS1zaWRlYmFyLmpzIiwic3JjL2J1aWxkZXIvdmlld2VyLmpzIiwic3JjL2txYnVpbGRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBOztBQUVBOzs7O0FBSUEsT0FBTyxlQUFQLEdBQXlCLEVBQXpCO0FBQ0EsT0FBTyxlQUFQLENBQXVCLFdBQXZCLEdBQXFDLFdBQXJDO0FBQ0EsT0FBTyxlQUFQLENBQXVCLGFBQXZCLEdBQXVDLGFBQXZDO0FBQ0EsT0FBTyxlQUFQLENBQXVCLFlBQXZCLEdBQXNDLFlBQXRDO0FBQ0EsT0FBTyxlQUFQLENBQXVCLGVBQXZCLEdBQXlDLGVBQXpDOztBQUVBLE9BQU8sZUFBUCxDQUF1QixxQkFBdkIsR0FBK0MscUJBQS9DO0FBQ0EsT0FBTyxlQUFQLENBQXVCLHNCQUF2QixHQUFnRCxzQkFBaEQ7QUFDQSxPQUFPLGVBQVAsQ0FBdUIscUJBQXZCLEdBQStDLHFCQUEvQztBQUNBLE9BQU8sZUFBUCxDQUF1Qix3QkFBdkIsR0FBa0Qsd0JBQWxEO0FBQ0EsT0FBTyxlQUFQLENBQXVCLHFCQUF2QixHQUErQyxxQkFBL0M7QUFDQSxPQUFPLGVBQVAsQ0FBdUIsK0JBQXZCLEdBQXlELCtCQUF6RDtBQUNBLE9BQU8sZUFBUCxDQUF1QiwwQkFBdkIsR0FBb0QsMEJBQXBEO0FBQ0EsT0FBTyxlQUFQLENBQXVCLDRCQUF2QixHQUFzRCw0QkFBdEQ7QUFDQSxPQUFPLGVBQVAsQ0FBdUIsMEJBQXZCLEdBQW9ELDBCQUFwRDtBQUNBLE9BQU8sZUFBUCxDQUF1Qiw0QkFBdkIsR0FBc0QsNEJBQXREO0FBQ0EsT0FBTyxlQUFQLENBQXVCLHVCQUF2QixHQUFpRCx1QkFBakQ7O0FBRUE7QUFDQTs7QUFFQSxPQUFPLGVB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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QXpCO0FBQ0QsQ0F4SUQ7O0FBMklBLE9BQU8sYUFBUCwyREFBdUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ2pCLGtCQURpQixHQUNOLEVBRE07QUFFakIsZ0JBRmlCLEdBRVIsR0FBRyxHQUFILENBQU8sU0FBUCxDQUFpQixXQUFqQixFQUZRO0FBR2pCLHNCQUhpQixHQUdGLEdBQUcsT0FBSCxDQUFXLGNBQVgsQ0FBMEIsV0FBMUIsRUFIRTtBQUlqQixhQUppQixHQUlYLGFBQWEsT0FBYixDQUFxQixPQUFyQixFQUpXOzs7QUFNckIsaUJBQU8sSUFBUCxDQUFZLFFBQVosRUFBc0IsR0FBdEIsRUFBMkI7QUFDekIsc0JBQVUsa0JBQVUsS0FBVixFQUFpQjtBQUN6QixrQkFBSSxPQUFPLEdBQUcsT0FBSCxDQUFXLGFBQVgsQ0FBeUIsaUJBQXpCLENBQTJDLE1BQU0sS0FBakQsQ0FBWDtBQUNBLG1DQUFxQixNQUFNLEVBQTNCLEVBQStCLElBQS9CO0FBQ0EscUJBQU8sV0FBUCxDQUFtQixJQUFuQjtBQUNEO0FBTHdCLFdBQTNCOztBQVFBLHVCQUFhLE1BQWIsR0FBc0IsTUFBdEI7O0FBZHFCO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLENBQXZCOzs7OztBQzNqQ0E7OztBQUdBOztBQUVBLFFBQVEscUJBQVI7QUFDQSxRQUFRLCtCQUFSO0FBQ0EsUUFBUSxrQkFBUjs7QUFFQSxRQUFRLGtCQUFSO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvLyBpbXBvcnQgUmVuZGVyU2hhcGUgZnJvbSBcIi4uLy4uLy4uL3NyYy9idWlsZGVyL1JlbmRlclNoYXBlXCI7XHJcblxyXG4vKipcclxuICogQ3JlYXRlZCBieSBsaWh1YW4gb24gMjAxOS84LzE5LlxyXG4gKi9cclxuXHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMgPSB7fTtcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5pbml0QWxsRG9tcyA9IGluaXRBbGxEb21zO1xyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLmluaXRQb2ludERvbXMgPSBpbml0UG9pbnREb21zO1xyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLmluaXRMaW5lRG9tcyA9IGluaXRMaW5lRG9tcztcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5pbml0UG9seWdvbkRvbXMgPSBpbml0UG9seWdvbkRvbXM7XHJcblxyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLmxpbmVTdHlsZURyb3BEb3duTGlzdCA9IGxpbmVTdHlsZURyb3BEb3duTGlzdDtcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5sYWJlbEZpZWxkRHJvcERvd25MaXN0ID0gbGFiZWxGaWVsZERyb3BEb3duTGlzdDtcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5sYWJlbEZvbnREcm9wRG93bkxpc3QgPSBsYWJlbEZvbnREcm9wRG93bkxpc3Q7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMuc3BlY2lhbEZpZWxkRHJvcERvd25MaXN0ID0gc3BlY2lhbEZpZWxkRHJvcERvd25MaXN0O1xyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLnJhbXBDb2xvckRyb3BEb3duTGlzdCA9IHJhbXBDb2xvckRyb3BEb3duTGlzdDtcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5zZWN0aW9uU3BlY2lhbEZpZWxkRHJvcERvd25MaXN0ID0gc2VjdGlvblNwZWNpYWxGaWVsZERyb3BEb3duTGlzdDtcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5zdWJzZWN0aW9uVHlwZURyb3BEb3duTGlzdCA9IHN1YnNlY3Rpb25UeXBlRHJvcERvd25MaXN0O1xyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLnN1YnNlY3Rpb25OdW1iZXJEcm9wRG93bkxpc3QgPSBzdWJzZWN0aW9uTnVtYmVyRHJvcERvd25MaXN0O1xyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLmxhYmVsRGlyZWN0aW9uRHJvcERvd25MaXN0ID0gbGFiZWxEaXJlY3Rpb25Ecm9wRG93bkxpc3Q7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMuaGVhdG1hcFJhbXBDb2xvckRyb3BEb3duTGlzdCA9IGhlYXRtYXBSYW1wQ29sb3JEcm9wRG93bkxpc3Q7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMud2VpZ2h0RmllbGREcm9wRG93bkxpc3QgPSB3ZWlnaHRGaWVsZERyb3BEb3duTGlzdDtcclxuXHJcbi8vIGdsb2JhbC5idWlsZGVySW5pdERvbXMuaW5pdEZpZWxkQ29sb3JDb250YWluZXIgPSBpbml0RmllbGRDb2xvckNvbnRhaW5lcjtcclxuLy8gZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy51cGRhdGVMZWdlbmQgPSB1cGRhdGVMZWdlbmQ7XHJcblxyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLmZpbGxTdmdTeW1ib2xzID0gZmlsbFN2Z1N5bWJvbHM7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMuZmlsbEltYWdlU3ltYm9scyA9IGZpbGxJbWFnZVN5bWJvbHM7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMucmVuZGVyID0gcmVuZGVyO1xyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLnJlZnJlc2hUaGVtYXRpY0NvbG9ycyA9IHJlZnJlc2hUaGVtYXRpY0NvbG9ycztcclxuXHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMuZXh0cmFJY29uU2hhcGUgPSBleHRyYUljb25TaGFwZTtcclxuXHJcbmZ1bmN0aW9uIGluaXRBbGxEb21zKCkge1xyXG4gIGluaXRTeW1ib2xUeXBlQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50U3l0bGVDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRSYW1wQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludFNpemVDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRPcGFjaXR5Q29udGFpbmVyKCk7XHJcbiAgaW5pdEhlYXRtYXBGaWx0ZXJDb250YWluZXIoKTtcclxuICBpbml0SGVhdG1hcFJhZGl1c0NvbnRhaW5lcigpO1xyXG4gIGluaXRIZWF0bWFwUmFtcENvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdEhlYXRtYXBXZWlnaHRGaWVsZENvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludExpbmVDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludExpbmVXaWR0aENvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludExpbmVPcGFjaXR5Q29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50U3BlY2lhbEZpZWxkQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50U3Vic2VjdGlvblR5cGVDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRTdWJzZWN0aW9uTnVtYmVyQ29udGFpbmVyKCk7XHJcbiAgaW5pdExhYmVsRGlyZWN0aW9uQ29udGFpbmVyKCk7XHJcbiAgaW5pdExhYmVsT2Zmc2V0Q29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRQb2ludFR5cGVTd2l0Y2hpbmdDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRSZW5kZXJUeXBlMENvbnRhaW5lcigpO1xyXG4gIGluaXRIYW5kRHJhd0V4dHJhSWNvblNoYXBlQ29udGFpbmVyKCk7XHJcbiAgaW5pdEhhbmREcmF3RXh0cmFJY29uTWFya2VyQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0SGFuZERyYXdFeHRyYUljb25JY29uQ29sb3JDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdExpbmVDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRMaW5lU3R5bGVMaXN0Q29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVPcGFjaXR5Q29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVXaWR0aENvbnRhaW5lcigpO1xyXG4gIGluaXRMaW5lUmFtcENvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFNwZWNpYWxGaWVsZENvbnRhaW5lcigpO1xyXG4gIGluaXRTdWJzZWN0aW9uVHlwZUNvbnRhaW5lcigpO1xyXG4gIGluaXRTdWJzZWN0aW9uTnVtYmVyQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvbHlnb25Db2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2x5Z29uT3BhY2l0eUNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0UG9seWdvblJhbXBDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0Q29tbW9uVWlzKCk7XHJcbiAgaW5pdEtlbmRvRG9tcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0UG9pbnREb21zKCkge1xyXG4gIGluaXRTeW1ib2xUeXBlQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRQb2ludFN5dGxlQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50UmFtcENvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50Q29sb3JDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRTaXplQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50T3BhY2l0eUNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0SGVhdG1hcEZpbHRlckNvbnRhaW5lcigpO1xyXG4gIGluaXRIZWF0bWFwUmFkaXVzQ29udGFpbmVyKCk7XHJcbiAgaW5pdEhlYXRtYXBSYW1wQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0SGVhdG1hcFdlaWdodEZpZWxkQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRQb2ludExpbmVDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludExpbmVXaWR0aENvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludExpbmVPcGFjaXR5Q29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRQb2ludFNwZWNpYWxGaWVsZENvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludFN1YnNlY3Rpb25UeXBlQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50U3Vic2VjdGlvbk51bWJlckNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0TGFiZWxEaXJlY3Rpb25Db250YWluZXIoKTtcclxuICBpbml0TGFiZWxPZmZzZXRDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdENvbW1vblVpcygpO1xyXG5cclxuICAvLyBpbml0RmllbGRDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0S2VuZG9Eb21zKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRMaW5lRG9tcygpIHtcclxuICBpbml0Q29tbW9uVWlzKCk7XHJcbiAgaW5pdExpbmVDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRMaW5lU3R5bGVMaXN0Q29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVPcGFjaXR5Q29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVXaWR0aENvbnRhaW5lcigpO1xyXG5cclxuICBpbml0TGluZVJhbXBDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRTcGVjaWFsRmllbGRDb250YWluZXIoKTtcclxuICBpbml0U3Vic2VjdGlvblR5cGVDb250YWluZXIoKTtcclxuICBpbml0U3Vic2VjdGlvbk51bWJlckNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0UG9seWdvbkNvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvbHlnb25PcGFjaXR5Q29udGFpbmVyKCk7XHJcblxyXG4gIC8vIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRLZW5kb0RvbXMoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFBvbHlnb25Eb21zKCkge1xyXG4gIGluaXRDb21tb25VaXMoKTtcclxuXHJcbiAgaW5pdFNwZWNpYWxGaWVsZENvbnRhaW5lcigpO1xyXG5cclxuICBpbml0U3Vic2VjdGlvblR5cGVDb250YWluZXIoKTtcclxuICBpbml0U3Vic2VjdGlvbk51bWJlckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2x5Z29uUmFtcENvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvbHlnb25Db2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2x5Z29uT3BhY2l0eUNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0TGluZUNvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVTdHlsZUxpc3RDb250YWluZXIoKTtcclxuICBpbml0TGluZU9wYWNpdHlDb250YWluZXIoKTtcclxuICBpbml0TGluZVdpZHRoQ29udGFpbmVyKCk7XHJcblxyXG4gIC8vIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRLZW5kb0RvbXMoKTtcclxufVxyXG5cclxuLy8gKGZ1bmN0aW9uKGtlbmRvKXtcclxuLy8gICBrZW5kby5jb25maXJtID0gZnVuY3Rpb24obmV3TWVzc2FnZSAsIG9wdGlvbikge1xyXG4vLyAgICAgdmFyICQgPSBrZW5kby5qUXVlcnkgO1xyXG4vLyAgICAgdmFyIF9rZW5kb0NvbmZpcm0gPSBrZW5kb1snX2tlbmRvQ29uZmlybSddIDtcclxuLy8gICAgIHZhciBfa2VuZG9Db25maXJtRG9tID0ga2VuZG9bJ19rZW5kb0NvbmZpcm1Eb20nXSA7XHJcbi8vICAgICB2YXIgZGVmYXVsdE9wdGlvbiA9IHtcclxuLy8gICAgICAgd2lkdGg6IFwiNDAwcHhcIixcclxuLy8gICAgICAgaGVpZ2h0OiBcIjE1MHB4XCIgLFxyXG4vLyAgICAgICB0aXRsZTogXCLliKDpmaRcIixcclxuLy8gICAgICAgcmVzaXphYmxlOmZhbHNlICxcclxuLy8gICAgICAgYWN0aW9uczogW1xyXG4vLyAgICAgICAgIFwiQ2xvc2VcIixcclxuLy8gICAgICAgXSxcclxuLy8gICAgICAgbW9kYWw6dHJ1ZSAsXHJcbi8vICAgICAgIG9rOnt0ZXh0OicmbmJzcCZuYnNw56Gu5a6aJm5ic3AmbmJzcCcsY2FsbGJhY2s6ZnVuY3Rpb24oa2VuZG9Db25maXJtKXtrZW5kb0NvbmZpcm0uY2xvc2UoKTt9fSAsXHJcbi8vICAgICAgIGNhbmNlbDoge3RleHQ6JyZuYnNwJm5ic3Dlj5bmtogmbmJzcCZuYnNwJyxjYWxsYmFjazpmdW5jdGlvbihrZW5kb0NvbmZpcm0pe2tlbmRvQ29uZmlybS5jbG9zZSgpO319XHJcbi8vICAgICB9IDtcclxuLy8gICAgICQuZXh0ZW5kKGRlZmF1bHRPcHRpb24gLCBvcHRpb24pIDtcclxuLy9cclxuLy8gICAgIGlmKF9rZW5kb0NvbmZpcm0pe1xyXG4vLyAgICAgICBfa2VuZG9Db25maXJtRG9tLmNoaWxkcmVuKFwiI21zZ1wiKS5odG1sKG5ld0NvbmZpcm0pIDtcclxuLy8gICAgICAgX2tlbmRvQ29uZmlybS5jZW50ZXIoKTtcclxuLy8gICAgICAgX2tlbmRvQ29uZmlybS5vcGVuKCkgO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy9cclxuLy9cclxuLy8gICAgICAgdmFyIGh0bWwgPSAnPGRpdj48ZGl2IGlkPVwibXNnXCIgc3R5bGU9XCJoZWlnaHQ6IDYwJTttYXJnaW46OHB4O292ZXJmbG93OmhpZGRlbjtcIiA+JyArIG5ld01lc3NhZ2UgKyc8L2Rpdj4nICtcclxuLy8gICAgICAgICAnPGRpdiBjbGFzcz1cImstZWRpdC1idXR0b25zIGstc3RhdGUtZGVmYXVsdCBrLXdpbmRvdy1hY3Rpb25cIiBzdHlsZT1cInRleHQtYWxpZ246Y2VudGVyO21hcmdpbjogOHB4O1wiPicrXHJcbi8vICAgICAgICAgJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCJrLWJ1dHRvblwiIGlkPVwiY29uZmlybU9rXCIgc3R5bGU9XCJtYXJnaW4tcmlnaHQ6OHB4O1wiPicrZGVmYXVsdE9wdGlvbi5vay50ZXh0Kyc8L2E+JytcclxuLy8gICAgICAgICAnPGEgaHJlZj1cIiNcIiBjbGFzcz1cImstYnV0dG9uXCIgaWQ9XCJjb25maXJtQ2FuY2VsXCI+JytkZWZhdWx0T3B0aW9uLmNhbmNlbC50ZXh0Kyc8L2E+PC9kaXY+PC9kaXY+JyA7XHJcbi8vXHJcbi8vXHJcbi8vICAgICAgIF9rZW5kb0NvbmZpcm1Eb20gPSAkKGh0bWwpIDtcclxuLy8gICAgICAgX2tlbmRvQ29uZmlybURvbS5rZW5kb1dpbmRvdyhkZWZhdWx0T3B0aW9uKSA7XHJcbi8vICAgICAgIF9rZW5kb0NvbmZpcm0gPSBfa2VuZG9Db25maXJtRG9tLmRhdGEoXCJrZW5kb1dpbmRvd1wiKTtcclxuLy8gICAgICAgX2tlbmRvQ29uZmlybS5jZW50ZXIoKSA7XHJcbi8vICAgICAgIF9rZW5kb0NvbmZpcm0ub3BlbigpIDtcclxuLy8gICAgICAgX2tlbmRvQ29uZmlybURvbS5maW5kKFwiI2NvbmZpcm1Pa1wiKS5jbGljayhmdW5jdGlvbigpe2RlZmF1bHRPcHRpb24ub2suY2FsbGJhY2soX2tlbmRvQ29uZmlybSk7fSkgO1xyXG4vLyAgICAgICBfa2VuZG9Db25maXJtRG9tLmZpbmQoXCIjY29uZmlybUNhbmNlbFwiKS5jbGljayhmdW5jdGlvbigpe2RlZmF1bHRPcHRpb24uY2FuY2VsLmNhbGxiYWNrKF9rZW5kb0NvbmZpcm0pO30pIDtcclxuLy8gICAgICAga2VuZG9bJ19rZW5kb0NvbmZpcm0nXSA9IF9rZW5kb0NvbmZpcm0gO1xyXG4vLyAgICAgICBrZW5kb1snX2tlbmRvQ29uZmlybURvbSddID0gX2tlbmRvQ29uZmlybURvbSA7XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vLyB9KVxyXG5cclxuZnVuY3Rpb24gaW5pdEtlbmRvRG9tcygpIHtcclxuICAkKFwiLmNvbG9ycy1waWNrZXItaW5wdXRcIikua2VuZG9Db2xvclBpY2tlcih7XHJcbiAgICBidXR0b246IGZhbHNlLFxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIOeCueWkp+Wwj1xyXG4gICQoXCIucG9pbnQtc2l6ZS1zaWxkZXJcIikua2VuZG9TbGlkZXIoe1xyXG4gICAgbWluOiAxLFxyXG4gICAgbWF4OiAyMCxcclxuICAgIHNtYWxsU3RlcDogMSxcclxuICAgIGxhcmdlU3RlcDogMSxcclxuICAgIHNob3dCdXR0b25zOiBmYWxzZSxcclxuICAgIHRpcHM6IGZhbHNlLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pLmRhdGEoXCJrZW5kb1NsaWRlclwiKTtcclxuXHJcbiAgLy8g54Ot54K55Y2K5b6EXHJcbiAgJChcIi5oZWF0bWFwLXJhZGl1cy1zaWxkZXJcIikua2VuZG9TbGlkZXIoe1xyXG4gICAgbWluOiAxLFxyXG4gICAgbWF4OiAyMCxcclxuICAgIHNtYWxsU3RlcDogMSxcclxuICAgIGxhcmdlU3RlcDogMSxcclxuICAgIHNob3dCdXR0b25zOiBmYWxzZSxcclxuICAgIHRpcHM6IGZhbHNlLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pLmRhdGEoXCJrZW5kb1NsaWRlclwiKTtcclxuXHJcbiAgJChcIi5saW5lLXdpZHRoLXNpbGRlclwiKS5rZW5kb1NsaWRlcih7XHJcbiAgICBtaW46IDAsXHJcbiAgICBtYXg6IDIwLFxyXG4gICAgc21hbGxTdGVwOiAxLFxyXG4gICAgbGFyZ2VTdGVwOiAxLFxyXG4gICAgc2hvd0J1dHRvbnM6IGZhbHNlLFxyXG4gICAgdGlwczogZmFsc2UsXHJcblxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSkuZGF0YShcImtlbmRvU2xpZGVyXCIpO1xyXG5cclxuICAkKFwiLm9wYWNpdHktc2xpZGVyXCIpLmtlbmRvU2xpZGVyKHtcclxuICAgIG1pbjogMCxcclxuICAgIG1heDogMTAwLFxyXG4gICAgc21hbGxTdGVwOiA1LFxyXG4gICAgbGFyZ2VTdGVwOiAxMCxcclxuICAgIHNob3dCdXR0b25zOiBmYWxzZSxcclxuXHJcbiAgICBjaGFuZ2U6IHJlbmRlcixcclxuICB9KS5kYXRhKFwia2VuZG9TbGlkZXJcIik7XHJcblxyXG4gICQoXCIubGluZS1zdHlsZS1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuXHJcbiAgICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwiay1zdGF0ZS1kZWZhdWx0XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvbGluZV9zdHlsZXMvbGluZV9zdHlsZSM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICB2YWx1ZVRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJzZWxlY3RlZC12YWx1ZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2xpbmVfc3R5bGVzL2xpbmVfc3R5bGUjOmRhdGEubmFtZSMucG5nKVwiPjwvc3Bhbj4nLFxyXG4gICAgaGVpZ2h0OiAyMDAsXHJcblxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSk7XHJcblxyXG4gICQoXCIucG9pbnQtcmFtcC1jb2xvclwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICBkYXRhVGV4dEZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJuYW1lXCIsXHJcbiAgICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwiay1zdGF0ZS1kZWZhdWx0XCIgc3R5bGU9XCJoZWlnaHQ6IDEycHg7IGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9jb2xvcl9yYW1wL2NvbG9yIzpkYXRhLm5hbWUjLnBuZylcIj48L3NwYW4+JyxcclxuICAgIHZhbHVlVGVtcGxhdGU6ICc8c3BhbiBjbGFzcz1cInNlbGVjdGVkLXZhbHVlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvY29sb3JfcmFtcC9jb2xvciM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICBoZWlnaHQ6IDIwMCxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZmllbGRDb2xvcnNDaGFuZ2VkKCk7XHJcbiAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICByZW5kZXIoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gICQoXCIuaGVhdG1hcC1yYW1wLWNvbG9yXCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwidmFsdWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcIm5hbWVcIixcclxuICAgIHRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJrLXN0YXRlLWRlZmF1bHRcIiBzdHlsZT1cImhlaWdodDogMTJweDsgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2hlYXRtYXBfcmFtcC9jb2xvciM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICB2YWx1ZVRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJzZWxlY3RlZC12YWx1ZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2hlYXRtYXBfcmFtcC9jb2xvciM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICBoZWlnaHQ6IDIwMCxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZmllbGRDb2xvcnNDaGFuZ2VkKCk7XHJcbiAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICByZW5kZXIoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gICQoXCIubGluZS1yYW1wLWNvbG9yXCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwidmFsdWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcIm5hbWVcIixcclxuICAgIHRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJrLXN0YXRlLWRlZmF1bHRcIiBzdHlsZT1cImhlaWdodDogMTJweDsgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2NvbG9yX3JhbXAvY29sb3IjOmRhdGEubmFtZSMucG5nKVwiPjwvc3Bhbj4nLFxyXG4gICAgdmFsdWVUZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwic2VsZWN0ZWQtdmFsdWVcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9jb2xvcl9yYW1wL2NvbG9yIzpkYXRhLm5hbWUjLnBuZylcIj48L3NwYW4+JyxcclxuICAgIGhlaWdodDogMjAwLFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICBmaWVsZENvbG9yc0NoYW5nZWQoKTtcclxuICAgICAgaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKTtcclxuXHJcbiAgICAgIHJlbmRlcigpO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgJChcIi5wb2x5Z29uLXJhbXAtY29sb3JcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwibmFtZVwiLFxyXG4gICAgdGVtcGxhdGU6ICc8c3BhbiBjbGFzcz1cImstc3RhdGUtZGVmYXVsdFwiIHN0eWxlPVwiaGVpZ2h0OiAxMnB4OyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvY29sb3JfcmFtcC9jb2xvciM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICB2YWx1ZVRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJzZWxlY3RlZC12YWx1ZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2NvbG9yX3JhbXAvY29sb3IjOmRhdGEubmFtZSMucG5nKVwiPjwvc3Bhbj4nLFxyXG4gICAgaGVpZ2h0OiAyMDAsXHJcblxyXG4gICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZpZWxkQ29sb3JzQ2hhbmdlZCgpO1xyXG4gICAgICBpbml0RmllbGRDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgcmVuZGVyKCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAvLyDkuJPpopjlrZfmrrXliJfooahcclxuICAkKFwiLnNwZWNpYWwtZmllbGQtbGlzdFwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICBkYXRhVGV4dEZpZWxkOiBcIm5hbWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICBoZWlnaHQ6IDE0MCxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZmllbGRDb2xvcnNDaGFuZ2VkKCk7XHJcbiAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICByZW5kZXIoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIC8vIOWIhuauteaWueazlVxyXG4gICQoXCIuc3ViLXNlY3Rpb24tbWV0aG9kLWxpc3RcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJuYW1lXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgaGVpZ2h0OiAxNDAsXHJcblxyXG4gICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZpZWxkQ29sb3JzQ2hhbmdlZCgpO1xyXG4gICAgICBpbml0RmllbGRDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgcmVuZGVyKCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAvLyDliIbmrrXkuKrmlbBcclxuICAkKFwiLnN1Yi1zZWN0aW9uLWNvdW50LWxpc3RcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJuYW1lXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgaGVpZ2h0OiAxNDAsXHJcblxyXG4gICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZpZWxkQ29sb3JzQ2hhbmdlZCgpO1xyXG4gICAgICBpbml0RmllbGRDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgcmVuZGVyKCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAvLyDmoIfnrb7mlrnlkJFcclxuICAkKFwiLmxhYmVsLWRpcmVjdGlvbi1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgIGhlaWdodDogMTQwLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pO1xyXG5cclxuICAvLyDmoIfnrb7lgY/np7tcclxuICAkKFwiLmxhYmVsLW9mZnNldC1zaWxkZXJcIikua2VuZG9TbGlkZXIoe1xyXG4gICAgbWluOiAwLFxyXG4gICAgbWF4OiA0MCxcclxuICAgIHNtYWxsU3RlcDogMSxcclxuICAgIGxhcmdlU3RlcDogMSxcclxuICAgIHNob3dCdXR0b25zOiBmYWxzZSxcclxuICAgIHRpcHM6IGZhbHNlLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pLmRhdGEoXCJrZW5kb1NsaWRlclwiKTtcclxuXHJcbiAgLy8g5qCH562+5a2X5L2T5YiX6KGoXHJcbiAgJChcIi5sYWJlbC1maWVsZC1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgIGhlaWdodDogMTQwLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pO1xyXG5cclxuICAvLyDmnYPph43lrZfmrrXliJfooahcclxuICAkKFwiLndlaWdodC1maWVsZC1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgIGhlaWdodDogMTQwLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pO1xyXG5cclxuICAvLyDmoIfnrb7lrZfmrrXliJfooahcclxuICAkKFwiLmxhYmVsLWZvbnQtbGlzdFwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICBkYXRhVGV4dEZpZWxkOiBcIm5hbWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICBoZWlnaHQ6IDE0MCxcclxuXHJcbiAgICBjaGFuZ2U6IHJlbmRlcixcclxuICB9KTtcclxuXHJcbiAgLy8g6L+H5ruk5p2h5Lu26L6T5YWl5qGGXHJcbiAgbGV0IGR2X2lucHV0ID0gJChcIi5kdi1pbnB1dFwiKS5rZW5kb01hc2tlZFRleHRCb3goe1xyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSkuZGF0YShcImtlbmRvTWFza2VkVGV4dEJveFwiKTtcclxuXHJcbiAgLy8g5ZON5bqUZW50ZXLkuovku7ZcclxuICAkKFwiW2RhdGEtcm9sZT1tYXNrZWR0ZXh0Ym94XVwiKS5vbihcImtleWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgIGR2X2lucHV0LnRyaWdnZXIoJ2NoYW5nZScsIHtkYXRhOiAkKHRoaXMpLnZhbCgpfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIC8vIOaJi+e7mOWbvuWxgiDngrnlm77lsYLmuLLmn5PmlrnlvI/liIfmjaLmjInpkq5cclxuICAkKFwiLnBvaW50LXR5cGUtc3dpdGNoaW5nXCIpLmtlbmRvQnV0dG9uR3JvdXAoe1xyXG4gICAgaW5kZXg6IDAsXHJcbiAgfSk7XHJcblxyXG4gIC8vIOagh+etvuaWueWQkVxyXG4gICQoXCIuZXh0cmEtaWNvbi1zaGFwZS1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgIGhlaWdodDogMTQwLFxyXG5cclxuICAgIGRhdGFTb3VyY2U6IGV4dHJhSWNvblNoYXBlKCksXHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gIGxldCBsYXllciA9IGJ1aWxkUHJvamVjdC5zZXR0aW5nLmxheWVyOyAvLyDlvZPliY3mv4DmtLvnmoRsYXllclxyXG4gIGxldCByZW5kZXJUeXBlID0gbGF5ZXIuZ2V0UmVuZGVyVHlwZSgpO1xyXG4gIFxyXG4gIGlmIChyZW5kZXJUeXBlID09PSBcImhhbmQtZHJhd1wiKSB7XHJcbiAgICBsZXQgbW9kZWwgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkuc2V0dGluZy5jdXJyZW50SGFuZERyYXdNb2RlbDtcclxuICAgIGxldCBlZGl0b3JPcHRpb25zID0gbW9kZWwuc3R5bGVPcHRpb25zO1xyXG5cclxuICAgIGNvbnZlcnRNb2RlbE9wYWNpdHkoZWRpdG9yT3B0aW9ucywgbW9kZWwpO1xyXG5cclxuICAgIC8vIOaUueWPmOagt+W8j1xyXG4gICAgS1EuTWFwLk1hcEdlb21hblN0eWxlRWRpdG9yLmdldEluc3RhbmNlKCkuY2hhbmdlU3R5bGUoS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpLnNldHRpbmcuY3VycmVudEhhbmREcmF3TGF5ZXIsIGVkaXRvck9wdGlvbnMpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgcmVuZGVyTW9kZWwgPSBidWlsZFByb2plY3QuZ2V0SW5mbygncmVuZGVyX21vZGVsJyk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHJlbmRlck1vZGVsLnN0eWxlT3B0aW9ucztcclxuICAgIGxldCByZW5kZXIgPSBsYXllci5yZW5kZXIuZ2V0KHJlbmRlclR5cGUpO1xyXG5cclxuICAgIGlmIChyZW5kZXJNb2RlbC5wb2ludFNpemUpIHtcclxuICAgICAgLy8g54K55pWw5o2uXHJcbiAgICAgIG9wdGlvbnMudmVjdG9ySW5mby5maWxsT3BhY2l0eSA9IHJlbmRlck1vZGVsLnBvaW50T3BhY2l0eSAvIDEwMDtcclxuICAgICAgb3B0aW9ucy52ZWN0b3JJbmZvLnN0cm9rZU9wYWNpdHkgPSByZW5kZXJNb2RlbC5saW5lT3BhY2l0eSAvIDEwMDtcclxuXHJcbiAgICAgIGlmIChvcHRpb25zLnBvaW50U3ltYm9sVHlwZSA9PT0gXCJ2ZWN0b3JcIikge1xyXG4gICAgICAgIG9wdGlvbnMudmVjdG9ySW5mby5mb250U2l6ZSA9IHJlbmRlck1vZGVsLnBvaW50U2l6ZSArIFwicHhcIjtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBvcHRpb25zLmltYWdlSW5mby5yYWRpdXMgPSByZW5kZXJNb2RlbC5wb2ludFNpemUgLyAxMDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8g57q/44CB6Z2i5pWw5o2uXHJcbiAgICAgIGNvbnZlcnRNb2RlbE9wYWNpdHkob3B0aW9ucywgcmVuZGVyTW9kZWwpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOeJueauiuWkhOeQhmdyYWRpZW50XHJcbiAgICBpZiAob3B0aW9ucy5yZW5kZXJUeXBlID09PSBcImhlYXRtYXBcIikge1xyXG4gICAgICBvcHRpb25zLmdyYWRpZW50ID0gS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5oZWF0bWFwQ29sb3JSYW1wW29wdGlvbnMuY29sb3JJbmRleF07XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyLnNldE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDovazmjaJtb2RlbOeahOmAj+aYjuW6piDnlLHnmb7liIbmr5Tlj5jkuLrlsI/mlbBcclxuZnVuY3Rpb24gY29udmVydE1vZGVsT3BhY2l0eShvcHRpb25zLCBtb2RlbCkge1xyXG4gIGlmIChvcHRpb25zLmZpbGxPcGFjaXR5KSB7XHJcbiAgICBvcHRpb25zLmZpbGxPcGFjaXR5ID0gbW9kZWwuZmlsbE9wYWNpdHkgLyAxMDA7XHJcbiAgfVxyXG5cclxuICBpZiAob3B0aW9ucy5saW5lT3BhY2l0eSkge1xyXG4gICAgb3B0aW9ucy5saW5lT3BhY2l0eSA9IG1vZGVsLmxpbmVPcGFjaXR5IC8gMTAwO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gZmllbGRDb2xvcnNDaGFuZ2VkKCkge1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgbGV0IHJlbmRlck1vZGVsID0gYnVpbGRQcm9qZWN0LmdldEluZm8oJ3JlbmRlcl9tb2RlbCcpO1xyXG4gIHJlZnJlc2hUaGVtYXRpY0NvbG9ycyhsYXllciwgcmVuZGVyTW9kZWwuc3R5bGVPcHRpb25zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVmcmVzaFRoZW1hdGljQ29sb3JzKGxheWVyLCBvcHRpb25zKSB7XHJcbiAgbGV0IHJlbmRlclR5cGUgPSBsYXllci5nZXRSZW5kZXJUeXBlKCk7XHJcbiAgbGV0IHJlbmRlciA9IGxheWVyLnJlbmRlci5nZXQocmVuZGVyVHlwZSk7XHJcbiAgbGV0IHN0eWxlT3B0aW9uID0gb3B0aW9ucztcclxuICBsZXQgcmVuZGVyT3B0aW9uID0gcmVuZGVyLm9wdGlvbnM7XHJcblxyXG4gIGlmIChsYXllci5vcHRpb25zLmZlYXR1cmVUeXBlID09PSBcInBvaW50XCIpIHtcclxuICAgIHN0eWxlT3B0aW9uID0gc3R5bGVPcHRpb24udmVjdG9ySW5mbztcclxuICAgIHJlbmRlck9wdGlvbiA9IHJlbmRlck9wdGlvbi52ZWN0b3JJbmZvO1xyXG4gIH1cclxuXHJcbiAgaWYgKHJlbmRlclR5cGUgPT0gXCJzaW5nbGVcIikge1xyXG4gICAgc3R5bGVPcHRpb24udGhlbWF0aWNDb2xvcnMgPSBLUS5CdWlsZGVyLlJlbmRlclNoYXBlLmdldFRoZW1hdGljRmllbGRDb2xvcnNTaW5nbGUocmVuZGVyLmdldEdlb2pzb25PYmplY3QoKSwgc3R5bGVPcHRpb24udGhlbWF0aWNGaWVsZCwgc3R5bGVPcHRpb24uY29sb3JJbmRleCk7XHJcbiAgICByZW5kZXJPcHRpb24udGhlbWF0aWNDb2xvcnMgPSBzdHlsZU9wdGlvbi50aGVtYXRpY0NvbG9ycztcclxuICB9IGVsc2UgaWYgKHJlbmRlclR5cGUgPT0gXCJzZWN0aW9uXCIpIHtcclxuICAgIHN0eWxlT3B0aW9uLnRoZW1hdGljQ29sb3JzID0gS1EuQnVpbGRlci5SZW5kZXJTaGFwZS5nZXRUaGVtYXRpY0ZpZWxkQ29sb3JzU2VjdGlvbihyZW5kZXIuZ2V0R2VvanNvbk9iamVjdCgpLCBzdHlsZU9wdGlvbi50aGVtYXRpY0ZpZWxkLFxyXG4gICAgICBzdHlsZU9wdGlvbi5jb2xvckluZGV4LCBzdHlsZU9wdGlvbi5zZWN0aW9uTWV0aG9kLCBzdHlsZU9wdGlvbi5zZWN0aW9uQ291bnQpO1xyXG4gICAgcmVuZGVyT3B0aW9uLnRoZW1hdGljQ29sb3JzID0gc3R5bGVPcHRpb24udGhlbWF0aWNDb2xvcnM7XHJcbiAgfSBlbHNlIGlmIChyZW5kZXJUeXBlID09IFwiaGVhdG1hcFwiKSB7XHJcbiAgICBvcHRpb25zLmdyYWRpZW50ID0gS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5oZWF0bWFwQ29sb3JSYW1wW29wdGlvbnMuY29sb3JJbmRleF1cclxuICB9XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipkb21zIGluaXQqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbmZ1bmN0aW9uIGluaXRDb21tb25VaXMoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiZWRpdG9yLWNvbW1vbi11aXNcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZWRpdG9yX2NvbW1vbl91aXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZWRpdG9yX2NvbW1vbl91aXMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7ov4fmu6TmmL7npLo8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJkdi1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiZmVhdHVyZUlEIDwgMTAwMFwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMuZmlsdGVyXCIvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7moIfnrb7lrZfmrrU8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwibGFiZWwtZmllbGQtbGlzdFwiIGRhdGEtYmluZD1cInNvdXJjZTogbGFiZWxGaWVsZERyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy5sYWJlbEZpZWxkXCI+PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zdHlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5qCH562+6aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3JzLXBpY2tlci1pbnB1dFwiIGRhdGEtcm9sZT1cImNvbG9ycGlja2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy5sYWJlbENvbG9yXCIvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7moIfnrb7lrZfkvZM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwibGFiZWwtZm9udC1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiBsYWJlbEZvbnREcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMubGFiZWxGb250TmFtZVwiPiA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChlZGl0b3JfY29tbW9uX3Vpcyk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnnrKblj7dcclxuZnVuY3Rpb24gaW5pdFN5bWJvbFR5cGVDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3ltYm9sLXR5cGUtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nrKblj7fnsbvlnos8L2Rpdj5cclxuICAgICAgICAgIDx1bCBjbGFzcz1cInBvaW50LXN5bWJvbC10eXBlXCI+XHJcbiAgICAgICAgICAgIDxsaSBjbGFzcz1cInBvaW50LXN5bWJvbCBwb2ludC1zeW1ib2wtc3ZnXCI+55+i6YePPC9saT5cclxuICAgICAgICAgICAgPGxpIGNsYXNzPVwicG9pbnQtc3ltYm9sIHBvaW50LXN5bWJvbC1pbWdcIj7lm77niYc8L2xpPlxyXG4gICAgICAgICAgPC91bD5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuXHJcbiAgICBsZXQgc3ltYm9sVHlwZUdyb3VwQnV0dG9uID0gJChcIi5wb2ludC1zeW1ib2wtdHlwZVwiKS5rZW5kb01vYmlsZUJ1dHRvbkdyb3VwKHtcclxuICAgICAgaW5kZXg6IDAsXHJcbiAgICB9KS5kYXRhKFwia2VuZG9Nb2JpbGVCdXR0b25Hcm91cFwiKTtcclxuICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgICBidWlsZFByb2plY3Quc3ltYm9sVHlwZUdyb3VwQnV0dG9uID0gc3ltYm9sVHlwZUdyb3VwQnV0dG9uO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54K55qC35byPXHJcbmZ1bmN0aW9uIGluaXRQb2ludFN5dGxlQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LXN0eWxlLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+54K55qC35byPPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVmYXVsdC1wb2ludC1pY29uXCI+XHJcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbmZvbnRcIiBkYXRhLWJpbmQ9XCJodG1sOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby51bmljb2RlXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbi1jb250YWluZXJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgZGF0YS1iaW5kPVwic3R5bGU6IHsgYmFja2dyb3VuZEltYWdlOiAgc3R5bGVPcHRpb25zLmltYWdlSW5mby51cmwgfVwiPjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ltYm9scy1jb250YWluZXJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW1ib2xzLWJveFwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5kZWZhdWx0LXBvaW50LWljb24gZGl2XCIpLmVxKDApLmJpbmQoe1xyXG4gICAgICAvLyDorr7nva7lrZfkvZPlm77moIflj5jljJbnmoTlk43lupTlh73mlbBcclxuICAgICAgJ2ljb25fc2VsZWN0ZWQnOiBmdW5jdGlvbiAoZSwgZGF0YSkgeyAgICAgLy8g6K6+572u5a2X5L2T5Zu+5qCH5Y+Y5YyW55qE5ZON5bqU5Ye95pWwXHJcbiAgICAgICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgcmVuZGVyTW9kZWwgPSBidWlsZFByb2plY3QuZ2V0SW5mbygncmVuZGVyX21vZGVsJyk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSByZW5kZXJNb2RlbC5zdHlsZU9wdGlvbnM7XHJcblxyXG4gICAgICAgIG9wdGlvbnMudmVjdG9ySW5mby51bmljb2RlID0gZGF0YTtcclxuICAgICAgICAkKHRoaXMpLmh0bWwoZGF0YSk7XHJcblxyXG4gICAgICAgICQodGhpcykuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpLnNpYmxpbmdzKCkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3N5bWJvbF90eXBlX3ZlY3Rvcic6IGZ1bmN0aW9uICgpIHsgICAgICAvLyDnrKblj7fnsbvlnovmlLnlj5hcclxuICAgICAgICAkKHRoaXMpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKS5zaWJsaW5ncygpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICB9LFxyXG4gICAgfSlcclxuXHJcbiAgICAkKGNvbnRhaW5lcnNbaV0pLmZpbmQoXCIuZGVmYXVsdC1wb2ludC1pY29uIGRpdlwiKS5lcSgxKS5iaW5kKHtcclxuICAgICAgJ2ljb25fc2VsZWN0ZWQnOiBmdW5jdGlvbiAoZSwgZGF0YSkgeyAgICAvLyDorr7nva7lrZfkvZPlm77moIflj5jljJbnmoTlk43lupTlh73mlbBcclxuICAgICAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCByZW5kZXJNb2RlbCA9IGJ1aWxkUHJvamVjdC5nZXRJbmZvKCdyZW5kZXJfbW9kZWwnKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHJlbmRlck1vZGVsLnN0eWxlT3B0aW9ucztcclxuXHJcbiAgICAgICAgb3B0aW9ucy5pbWFnZUluZm8udXJsID0gXCJ1cmwoLi9pbWFnZXMvcG9pbnRfaW1hZ2VzL0lNQUdFXCIgKyBkYXRhLnJvdyArIFwiLVwiICsgZGF0YS5jb2wgKyBcIi5wbmcpXCI7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIG9wdGlvbnMuaW1hZ2VJbmZvLnVybCk7XHJcblxyXG4gICAgICAgICQodGhpcykuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpLnNpYmxpbmdzKCkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3N5bWJvbF90eXBlX2ltYWdlJzogZnVuY3Rpb24gKCkgeyAgICAvLyDnrKblj7fnsbvlnovmlLnlj5hcclxuICAgICAgICAkKHRoaXMpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKS5zaWJsaW5ncygpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8vIOeCueWHu+eCueagt+W8j+aMiemSriDmmL7npLrngrnmoLflvI/pnaLmnb9cclxuICAkKFwiLmRlZmF1bHQtcG9pbnQtaWNvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLm5leHQoKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgfSk7XHJcblxyXG4gIC8vIOeCueWHu+WFtuS7luS9jee9riDpmpDol4/ngrnmoLflvI/pnaLmnb9cclxuICAkKFwiYm9keVwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0ICRwYXJlbnQgPSAkKGUudGFyZ2V0KS5wYXJlbnQoKTtcclxuICAgIGlmICghJHBhcmVudC5oYXNDbGFzcyhcImRlZmF1bHQtcG9pbnQtaWNvblwiKSkge1xyXG4gICAgICAkKFwiLnN5bWJvbHMtY29udGFpbmVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOWhq+WFheeCueespuWPtyBzdmfnmoTnrKblj7fpnaLmnb9cclxuZnVuY3Rpb24gZmlsbFN2Z1N5bWJvbHMoKSB7XHJcbiAgLy8g6aaW5YWI5riF56m66Z2i5p2/XHJcbiAgJChcIi5zeW1ib2xzLWJveFwiKS5lbXB0eSgpO1xyXG5cclxuICBsZXQgaWNvbnNfdW5pY29kZSA9IFtcclxuICAgIFwiJiN4ZTYxNFwiLCBcIiYjeGU2ZTNcIiwgXCImI3hlNmFkXCIsIFwiJiN4ZTYyOVwiLCBcIiYjeGU2MTNcIiwgXCImI3hlNjZiXCIsXHJcbiAgICBcIiYjeGU2NWFcIiwgXCImI3hlNzVmXCIsIFwiJiN4ZTY1NlwiLCBcIiYjeGU2NzlcIiwgXCImI3hlNjU3XCIsIFwiJiN4ZTY1MlwiLFxyXG4gICAgXCImI3hlNjE1XCIsIFwiJiN4ZTY3ZVwiLCBcIiYjeGU2MjBcIiwgXCImI3hlN2RmXCIsIFwiJiN4ZTY2N1wiLCBcIiYjeGU2NjZcIixcclxuICAgIFwiJiN4ZTY0MlwiLCBcIiYjeGU2NDBcIiwgXCImI3hlNjI4XCIsIFwiJiN4ZTY3YlwiLCBcIiYjeGVhYzlcIiwgXCImI3hlNjNmXCIsXHJcbiAgICBcIiYjeGU2MWFcIiwgXCImI3hlNjRkXCIsIFwiJiN4ZTYyNlwiLCBcIiYjeGU2Y2JcIiwgXCImI3hlNmI1XCIsIFwiJiN4ZTY4OVwiLFxyXG4gICAgXCImI3hlNmY2XCIsIFwiJiN4ZTcxY1wiLCBcIiYjeGU2NDZcIiwgXCImI3hlNmM3XCIsIFwiJiN4ZTY3MVwiLCBcIiYjeGU2NmZcIixcclxuICAgIFwiJiN4ZTY0MVwiLCBcIiYjeGU2M2VcIiwgXCImI3hlNjNhXCIsIFwiJiN4ZTY3NlwiLCBcIiYjeGU3MzlcIiwgXCImI3hlNjUxXCIsXHJcbiAgICBcIiYjeGU2NjNcIiwgXCImI3hlNjdhXCIsIFwiJiN4ZTY3N1wiLCBcIiYjeGU2MTJcIiwgXCImI3hlODFmXCIsIFwiJiN4ZTY1Y1wiLFxyXG4gICAgXCImI3hlNjY0XCIsIFwiJiN4ZTY2NVwiLCBcIiYjeGU2MWZcIiwgXCImI3hlNjIzXCIsIFwiJiN4ZTYyNFwiLCBcIiYjeGU2MmFcIixcclxuICAgIFwiJiN4ZTYyYlwiLCBcIiYjeGU2MTFcIiwgXCImI3hlNjZkXCIsIFwiJiN4ZTY2MFwiLCBcIiYjeGU2NGNcIiwgXCImI3hlNjMwXCIsXHJcbiAgXVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyArK2kpIHtcclxuICAgIGxldCAkcm93ID0gJCgnPGRpdiBjbGFzcz1cInN5bWJvbC1yb3dcIj48L2Rpdj4nKTtcclxuXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDY7ICsraikge1xyXG4gICAgICBsZXQgJGNvbHVtbiA9ICQoJzxkaXYgY2xhc3M9XCJpY29uZm9udFwiPjwvZGl2PicpO1xyXG4gICAgICAkY29sdW1uLmh0bWwoaWNvbnNfdW5pY29kZVtpICogNiArIGpdKTtcclxuXHJcbiAgICAgICRjb2x1bW4uY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuY2xvc2VzdChcIi5lZGl0b3ItdG9vbFwiKS5maW5kKFwiLmRlZmF1bHQtcG9pbnQtaWNvbiBkaXZcIikuZXEoMCkudHJpZ2dlcignaWNvbl9zZWxlY3RlZCcsIGljb25zX3VuaWNvZGVbaSAqIDYgKyBqXSk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAkcm93LmFwcGVuZCgkY29sdW1uKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiLnN5bWJvbHMtYm94XCIpLmFwcGVuZCgkcm93KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOWhq+WFheeCueespuWPtyBpbWFnZeeahOespuWPt+mdouadv1xyXG5mdW5jdGlvbiBmaWxsSW1hZ2VTeW1ib2xzKCkge1xyXG4gIC8vIOmmluWFiOa4heepuumdouadv1xyXG4gICQoXCIuc3ltYm9scy1ib3hcIikuZW1wdHkoKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTA7ICsraSkge1xyXG4gICAgbGV0ICRyb3cgPSAkKCc8ZGl2IGNsYXNzPVwic3ltYm9sLXJvd1wiPjwvZGl2PicpO1xyXG5cclxuICAgIGZvciAobGV0IGogPSAxOyBqIDw9IDY7ICsraikge1xyXG4gICAgICBsZXQgc3R5bGUgPSBcImJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9wb2ludF9pbWFnZXMvSU1BR0VcIiArIGkgKyBcIi1cIiArIGogKyBcIi5wbmcpO1wiO1xyXG4gICAgICBsZXQgJGNvbHVtbiA9ICQoJzxkaXYgY2xhc3M9XCJwb2ludC1pbWdcIiA+PGRpdiBzdHlsZT1cIicgKyBzdHlsZSArICdcIj48L2Rpdj48L2Rpdj4nKTtcclxuXHJcbiAgICAgICRjb2x1bW4uY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuY2xvc2VzdChcIi5lZGl0b3ItdG9vbFwiKS5maW5kKFwiLmRlZmF1bHQtcG9pbnQtaWNvbiBkaXZcIikuZXEoMSkudHJpZ2dlcignaWNvbl9zZWxlY3RlZCcsIHtcclxuICAgICAgICAgIHJvdzogaSxcclxuICAgICAgICAgIGNvbDogaixcclxuICAgICAgICB9KTtcclxuICAgICAgfSlcclxuXHJcbiAgICAgICRyb3cuYXBwZW5kKCRjb2x1bW4pO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIuc3ltYm9scy1ib3hcIikuYXBwZW5kKCRyb3cpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54K56aKc6ImyXHJcbmZ1bmN0aW9uIGluaXRQb2ludENvbG9yQ29udGFpbmVyKCkge1xyXG4gIGxldCBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LWNvbG9yLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPueCueminOiJsjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3JzLXBpY2tlci1pbnB1dFwiIGRhdGEtcm9sZT1cImNvbG9ycGlja2VyXCIgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLmZpbGxDb2xvclwiLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnoibLlnZdcclxuZnVuY3Rpb24gaW5pdFBvaW50UmFtcENvbG9yQ29udGFpbmVyKCkge1xyXG4gIGxldCBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LXJhbXAtY29sb3ItY29udGFpbmVyXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+54K56aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJwb2ludC1yYW1wLWNvbG9yXCIgZGF0YS1iaW5kPVwic291cmNlOiByYW1wQ29sb3JEcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby5jb2xvckluZGV4XCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDng63lipvlm74g6Imy5Z2XXHJcbmZ1bmN0aW9uIGluaXRIZWF0bWFwUmFtcENvbG9yQ29udGFpbmVyKCkge1xyXG4gIGxldCBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhlYXRtYXAtcmFtcC1jb2xvci1jb250YWluZXJcIik7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7ng63ngrnpopzoibI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImhlYXRtYXAtcmFtcC1jb2xvclwiIGRhdGEtYmluZD1cInNvdXJjZTogaGVhdG1hcFJhbXBDb2xvckRyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy5jb2xvckluZGV4XCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDng63lipvlm74g5p2D6YeN5a2X5q61XHJcbmZ1bmN0aW9uIGluaXRIZWF0bWFwV2VpZ2h0RmllbGRDb250YWluZXIoKSB7XHJcbiAgbGV0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGVhdG1hcC13ZWlnaHQtZmllbGQtY29udGFpbmVyXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7mnYPph43lrZfmrrU8L2Rpdj5cclxuICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cIndlaWdodC1maWVsZC1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiB3ZWlnaHRGaWVsZERyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy53ZWlnaHRGaWVsZFwiPjwvc2VsZWN0PlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDng63lipvlm74g6L+H5ruk5pi+56S6XHJcbmZ1bmN0aW9uIGluaXRIZWF0bWFwRmlsdGVyQ29udGFpbmVyKCkge1xyXG4gIGxldCBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhlYXRtYXAtZmlsdGVyLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+6L+H5ruk5pi+56S6PC9kaXY+XHJcbiAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImR2LWlucHV0XCIgcGxhY2Vob2xkZXI9XCJmZWF0dXJlSUQgPCAxMDAwXCIgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy5maWx0ZXJcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueWkp+Wwj1xyXG5mdW5jdGlvbiBpbml0UG9pbnRTaXplQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LXNpemUtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+54K55aSn5bCPPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwicG9pbnQtc2l6ZS1zaWxkZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogcG9pbnRTaXplXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBwb2ludFNpemVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj5weDwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueS4jemAj+aYjuW6plxyXG5mdW5jdGlvbiBpbml0UG9pbnRPcGFjaXR5Q29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LW9wYWNpdHktY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+54K55LiN6YCP5piO5bqmPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwib3BhY2l0eS1zbGlkZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogcG9pbnRPcGFjaXR5XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBwb2ludE9wYWNpdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj4lPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja7nmoQg57q/6aKc6ImyXHJcbmZ1bmN0aW9uIGluaXRQb2ludExpbmVDb2xvckNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1saW5lLWNvbG9yLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPue6v+minOiJsjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3JzLXBpY2tlci1pbnB1dFwiIGRhdGEtcm9sZT1cImNvbG9ycGlja2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLnZlY3RvckluZm8uc3Ryb2tlQ29sb3JcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54K55pWw5o2u55qEIOe6v+WuveW6plxyXG5mdW5jdGlvbiBpbml0UG9pbnRMaW5lV2lkdGhDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtbGluZS13aWR0aC1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nur/lrr3luqY8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJsaW5lLXdpZHRoLXNpbGRlclwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby5zdHJva2VXaWR0aFwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImJvcmRlcjogbm9uZTtcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLnZlY3RvckluZm8uc3Ryb2tlV2lkdGhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj5weDwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueaVsOaNrueahCDnur/kuI3pgI/mmI7luqZcclxuZnVuY3Rpb24gaW5pdFBvaW50TGluZU9wYWNpdHlDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtbGluZS1vcGFjaXR5LWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPue6v+S4jemAj+aYjuW6pjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIm9wYWNpdHktc2xpZGVyXCIgZGF0YS1iaW5kPVwidmFsdWU6IGxpbmVPcGFjaXR5XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBsaW5lT3BhY2l0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eXBlPVwicGFkZGluZy1yaWdodDogNXB4O1wiPiU8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueaVsOaNrueahOS4k+mimOWtl+autVxyXG5mdW5jdGlvbiBpbml0UG9pbnRTcGVjaWFsRmllbGRDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtc3BlY2lhbC1maWVsZC1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5LiT6aKY5a2X5q61PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwic3BlY2lhbC1maWVsZC1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiBzcGVjaWFsRmllbGREcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby50aGVtYXRpY0ZpZWxkXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueaVsOaNrueahOWIhuauteaWueazlVxyXG5mdW5jdGlvbiBpbml0UG9pbnRTdWJzZWN0aW9uVHlwZUNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1zdWJzZWN0aW9uLXR5cGUtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuWIhuauteaWueazlTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInN1Yi1zZWN0aW9uLW1ldGhvZC1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiBzdWJzZWN0aW9uVHlwZURyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLnNlY3Rpb25NZXRob2RcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54Ot5Yqb5Zu+55qE54Ot54K55Y2K5b6EXHJcbmZ1bmN0aW9uIGluaXRIZWF0bWFwUmFkaXVzQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhlYXRtYXAtcmFkaXVzLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPueDreeCueWNiuW+hDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImhlYXRtYXAtcmFkaXVzLXNpbGRlclwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMucmFkaXVzXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMucmFkaXVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5cGU9XCJwYWRkaW5nLXJpZ2h0OiA1cHg7XCI+cHg8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja7nmoTliIbmrrXkuKrmlbBcclxuZnVuY3Rpb24gaW5pdFBvaW50U3Vic2VjdGlvbk51bWJlckNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1zdWJzZWN0aW9uLW51bWJlci1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5YiG5q615Liq5pWwPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwic3ViLXNlY3Rpb24tY291bnQtbGlzdFwiIGRhdGEtYmluZD1cInNvdXJjZTogc3Vic2VjdGlvbk51bWJlckRyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLnNlY3Rpb25Db3VudFwiLz5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueaVsOaNriDmoIfnrb7kvY3nva5cclxuZnVuY3Rpb24gaW5pdExhYmVsRGlyZWN0aW9uQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxhYmVsLWRpcmVjdGlvbi1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5qCH562+5L2N572uPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwibGFiZWwtZGlyZWN0aW9uLWxpc3RcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IGxhYmVsRGlyZWN0aW9uRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLmxhYmVsUG9zaXRpb25cIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja4g5qCH562+5YGP56e7XHJcbmZ1bmN0aW9uIGluaXRMYWJlbE9mZnNldENvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsYWJlbC1vZmZzZXQtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuagh+etvuWBj+enuzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImxhYmVsLW9mZnNldC1zaWxkZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLmxhYmVsTWFya2VyUGFkZGluZ1wiLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImJvcmRlcjogbm9uZTtcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLmxhYmVsTWFya2VyUGFkZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eXBlPVwicGFkZGluZy1yaWdodDogNXB4O1wiPnB4PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDnur/popzoibJcclxuZnVuY3Rpb24gaW5pdExpbmVDb2xvckNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsaW5lLWNvbG9yLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPue6v+minOiJsjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3JzLXBpY2tlci1pbnB1dFwiIGRhdGEtcm9sZT1cImNvbG9ycGlja2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLmxpbmVDb2xvclwiLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDnur/moLflvI9cclxuZnVuY3Rpb24gaW5pdExpbmVTdHlsZUxpc3RDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGluZS1zdHlsZS1saXN0LWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPue6v+agt+W8jzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwibGluZS1zdHlsZS1saXN0XCIgc3R5bGU9XCJ3aWR0aDogMTUycHg7IGhlaWdodDogMjhweDtcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYmluZD1cInNvdXJjZTogbGluZVN0eWxlRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLmxpbmVTdHlsZVwiLz5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDnur/lrr3luqZcclxuZnVuY3Rpb24gaW5pdExpbmVXaWR0aENvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsaW5lLXdpZHRoLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPue6v+WuveW6pjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImxpbmUtd2lkdGgtc2lsZGVyXCIgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy5saW5lV2lkdGhcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9XCJib3JkZXI6IG5vbmU7XCIgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy5saW5lV2lkdGhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj5weDwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOe6v+S4jemAj+aYjuW6plxyXG5mdW5jdGlvbiBpbml0TGluZU9wYWNpdHlDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGluZS1vcGFjaXR5LWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPue6v+S4jemAj+aYjuW6pjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIm9wYWNpdHktc2xpZGVyXCIgZGF0YS1iaW5kPVwidmFsdWU6IGxpbmVPcGFjaXR5XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBsaW5lT3BhY2l0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eXBlPVwicGFkZGluZy1yaWdodDogNXB4O1wiPiU8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOe6v+a4kOWPmOminOiJslxyXG5mdW5jdGlvbiBpbml0TGluZVJhbXBDb2xvckNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsaW5lLXJhbXAtY29sb3ItY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+57q/6aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJsaW5lLXJhbXAtY29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYmluZD1cInNvdXJjZTogbGluZVJhbXBDb2xvckRyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy5jb2xvckluZGV4XCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0U3BlY2lhbEZpZWxkQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNwZWNpYWwtZmllbGQtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuS4k+mimOWtl+autTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInNwZWNpYWwtZmllbGQtbGlzdFwiIGRhdGEtYmluZD1cInNvdXJjZTogc3BlY2lhbEZpZWxkRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLnRoZW1hdGljRmllbGRcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFN1YnNlY3Rpb25UeXBlQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN1YnNlY3Rpb24tdHlwZS1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5YiG5q615pa55rOVPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwic3ViLXNlY3Rpb24tbWV0aG9kLWxpc3RcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IHN1YnNlY3Rpb25UeXBlRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLnNlY3Rpb25NZXRob2RcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFN1YnNlY3Rpb25OdW1iZXJDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3Vic2VjdGlvbi1udW1iZXItY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuWIhuauteS4quaVsDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInN1Yi1zZWN0aW9uLWNvdW50LWxpc3RcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IHN1YnNlY3Rpb25OdW1iZXJEcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMuc2VjdGlvbkNvdW50XCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g5Yid5aeL5YyW6Z2i6aKc6ImyXHJcbmZ1bmN0aW9uIGluaXRQb2x5Z29uUmFtcENvbG9yQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvbHlnb24tcmFtcC1jb2xvci1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7pnaLpopzoibI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInBvbHlnb24tcmFtcC1jb2xvclwiIGRhdGEtYmluZD1cInNvdXJjZTogcmFtcENvbG9yRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLmNvbG9ySW5kZXhcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRQb2x5Z29uQ29sb3JDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9seWdvbi1jb2xvci1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBwb2ludC1jb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7pnaLpopzoibI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9ycy1waWNrZXItaW5wdXRcIiBkYXRhLXJvbGU9XCJjb2xvcnBpY2tlclwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMuZmlsbENvbG9yXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRQb2x5Z29uT3BhY2l0eUNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2x5Z29uLW9wYWNpdHktY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+6Z2i5LiN6YCP5piO5bqmPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwib3BhY2l0eS1zbGlkZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogZmlsbE9wYWNpdHlcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBmaWxsT3BhY2l0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj4lPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIGZ1bmN0aW9uIF9nZXRDb2xvckZpZWxkc0FycmF5KGZlYXR1cmVUeXBlLCByZW5kZXJUeXBlKSB7XHJcbi8vICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuLy8gICBsZXQgbGF5ZXIgPSBidWlsZFByb2plY3Quc2V0dGluZy5sYXllcjsgLy8g5b2T5YmN5r+A5rS755qEbGF5ZXJcclxuLy8gICBsZXQgcmVuZGVyID0gbGF5ZXIucmVuZGVyO1xyXG4vL1xyXG4vLyAgIGlmIChyZW5kZXJUeXBlID09PSBcInNpbmdsZVwiKSB7XHJcbi8vICAgICBpZiAoZmVhdHVyZVR5cGUgPT0gJ3BvaW50Jykge1xyXG4vLyAgICAgICByZXR1cm4gcmVuZGVyLmdldCgnc2luZ2xlJykub3B0aW9ucy52ZWN0b3JJbmZvLnRoZW1hdGljQ29sb3JzO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgY29uc29sZS5sb2coXCJfaW5pdERPbXMuanMgMTA3MSwgdGhlbWF0aWNDb2xvcnM6IFwiLCByZW5kZXIuZ2V0KCdzaW5nbGUnKS5vcHRpb25zLnRoZW1hdGljQ29sb3JzKTtcclxuLy8gICAgICAgcmV0dXJuIHJlbmRlci5nZXQoJ3NpbmdsZScpLm9wdGlvbnMudGhlbWF0aWNDb2xvcnM7XHJcbi8vICAgICB9XHJcbi8vICAgfSBlbHNlIGlmIChyZW5kZXJUeXBlID09PSBcInNlY3Rpb25cIikge1xyXG4vLyAgICAgaWYgKGZlYXR1cmVUeXBlID09ICdwb2ludCcpIHtcclxuLy8gICAgICAgcmV0dXJuIHJlbmRlci5nZXQoJ3NlY3Rpb24nKS5vcHRpb25zLnZlY3RvckluZm8udGhlbWF0aWNDb2xvcnMuY29sb3JzO1xyXG4vLyAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgcmV0dXJuIHJlbmRlci5nZXQoJ3NlY3Rpb24nKS5vcHRpb25zLnRoZW1hdGljQ29sb3JzLmNvbG9ycztcclxuLy8gICAgIH1cclxuLy8gICB9IGVsc2UgaWYgKHJlbmRlclR5cGUgPT09IFwiaGVhdG1hcFwiKSB7XHJcbi8vICAgICByZXR1cm4gcmVuZGVyLmdldCgnaGVhdG1hcCcpLm9wdGlvbnMuZ3JhZGllbnQ7XHJcbi8vICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIGZ1bmN0aW9uIF9nZXRSYW5nZUFycmF5KGZlYXR1cmVUeXBlKSB7XHJcbi8vICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuLy8gICBsZXQgbGF5ZXIgPSBidWlsZFByb2plY3Quc2V0dGluZy5sYXllcjsgLy8g5b2T5YmN5r+A5rS755qEbGF5ZXJcclxuLy8gICBsZXQgcmVuZGVyID0gbGF5ZXIucmVuZGVyO1xyXG4vL1xyXG4vLyAgIGlmIChmZWF0dXJlVHlwZSA9PSAncG9pbnQnKSB7XHJcbi8vICAgICByZXR1cm4gcmVuZGVyLmdldCgnc2VjdGlvbicpLm9wdGlvbnMudmVjdG9ySW5mby50aGVtYXRpY0NvbG9ycy5icmVha3NEYXRhO1xyXG4vLyAgIH0gZWxzZSB7XHJcbi8vICAgICByZXR1cm4gcmVuZGVyLmdldCgnc2VjdGlvbicpLm9wdGlvbnMudGhlbWF0aWNDb2xvcnMuYnJlYWtzRGF0YTtcclxuLy8gICB9XHJcbi8vIH1cclxuLy9cclxuLy8gZnVuY3Rpb24gX2luaXRGaWVsZENvbG9yQ29udGFpbmVyKCkge1xyXG4vLyAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbi8vICAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbi8vICAgbGV0IGZlYXR1cmVUeXBlID0gbGF5ZXIub3B0aW9ucy5mZWF0dXJlVHlwZTtcclxuLy9cclxuLy8gICB1cGRhdGVMZWdlbmQobGF5ZXIpO1xyXG4vL1xyXG4vLyAgIC8vIOagueaNrueCueOAgee6v+OAgemdouadpei/m+ihjOWIkuWIhuWIneWni+WMllxyXG4vLyAgIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShmZWF0dXJlVHlwZSArIFwiIGVkaXRvci1maWVsZHMtY29sb3JcIik7XHJcbi8vICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbi8vICAgICAvLyDliKTmlq3lvZPliY3oioLngrnmmK/lkKblsZXlvIBcclxuLy8gICAgIGxldCBleHBhbmRlZCA9IGZhbHNlO1xyXG4vLyAgICAgbGV0ICRzd2l0Y2hOb2RlID0gJChjb250YWluZXJzW2ldKS5maW5kKFwiLmZpZWxkcy1kaXYtc3dpdGNoXCIpO1xyXG4vLyAgICAgaWYgKCRzd2l0Y2hOb2RlLmxlbmd0aCAhPSAwICYmICEkc3dpdGNoTm9kZS5oYXNDbGFzcyhcInN0YXRlLWNsb3NlXCIpKSB7XHJcbi8vICAgICAgIGV4cGFuZGVkID0gdHJ1ZTtcclxuLy8gICAgIH1cclxuLy9cclxuLy8gICAgIC8vIOa4heepuu+8jOmYsuatoumHjeWkjea3u+WKoFxyXG4vLyAgICAgJChjb250YWluZXJzW2ldKS5lbXB0eSgpO1xyXG4vL1xyXG4vLyAgICAgdmFyIGh0bWwgPSBcIlwiO1xyXG4vLyAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vICAgICB2YXIgc2hhcGVDbGFzcyA9IFwiaWNvbi1zaGFwZS1cIiArIGZlYXR1cmVUeXBlO1xyXG4vL1xyXG4vLyAgICAgLy8g5Y2V5YC85riy5p+T5qih5byPXHJcbi8vICAgICBpZiAoY29udGFpbmVyc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaW5nbGVcIikpIHtcclxuLy8gICAgICAgLy8g5re75YqgdGl0bGVcclxuLy8gICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cInRpdGxlXCI+XHJcbi8vICAgICAgICAgICAgICAgICAgPHNwYW4+6Ieq5a6a5LmJ5Y2V5YC8PC9zcGFuPlxyXG4vLyAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidW5pcXVlLXNob3dcIj48c3Bhbj7lsZXlvIA8L3NwYW4+PGkgY2xhc3M9XCJmYSBmYS1wbHVzLXNxdWFyZS1vIGZpZWxkcy1kaXYtc3dpdGNoIHN0YXRlLWNsb3NlXCI+PC9pPjwvZGl2PlxyXG4vLyAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbi8vICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRzLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5gO1xyXG4vL1xyXG4vLyAgICAgICAvLyDlvpfliLDpopzoibLnmoTmlbDnu4RcclxuLy8gICAgICAgbGV0IGNvbG9yRmllbGRzQXJyYXkgPSBfZ2V0Q29sb3JGaWVsZHNBcnJheShmZWF0dXJlVHlwZSwgXCJzaW5nbGVcIik7XHJcbi8vXHJcbi8vICAgICAgIC8vIOmBjeWOhuminOiJsuaVsOe7hO+8jOa3u+WKoOWQhOihjOaOp+S7tlxyXG4vLyAgICAgICBjb2xvckZpZWxkc0FycmF5LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuLy8gICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiZmllbGRzLWl0ZW1cIj5cclxuLy8gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbiBpY29uZm9udCBgICsgc2hhcGVDbGFzcyArIGAgY29sb3JzLXBpY2tlclwiIHN0eWxlPVwiY29sb3I6IGAgKyB2YWx1ZSArIGBcIj48ZGl2IGNsYXNzPVwic2luZ2xlLWNvbG9ycy1waWNrZXJcIiB2YWx1ZT1gICsgdmFsdWUgKyBgPjwvZGl2Pjwvc3Bhbj5cclxuLy8gICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidmFsdWVcIj5gO1xyXG4vLyAgICAgICAgIGh0bWwgKz0ga2V5ICsgYDwvc3Bhbj48L2Rpdj5gO1xyXG4vLyAgICAgICB9KTtcclxuLy9cclxuLy8gICAgICAgaHRtbCArPSBgPC9kaXY+YDtcclxuLy8gICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbi8vICAgICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuLy8gICAgIH0gZWxzZSBpZiAoY29udGFpbmVyc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWN0aW9uXCIpKSB7XHJcbi8vICAgICAgIC8vIOa3u+WKoHRpdGxlXHJcbi8vICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxyXG4vLyAgICAgICAgICAgICAgICAgIDxzcGFuPuiHquWumuS5ieWIhuautTwvc3Bhbj5cclxuLy8gICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVuaXF1ZS1zaG93XCI+PHNwYW4+5bGV5byAPC9zcGFuPjxpIGNsYXNzPVwiZmEgZmEtcGx1cy1zcXVhcmUtbyBmaWVsZHMtZGl2LXN3aXRjaCBzdGF0ZS1jbG9zZVwiPjwvaT48L2Rpdj5cclxuLy8gICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4vLyAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkcy1jb250YWluZXJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+YDtcclxuLy9cclxuLy8gICAgICAgLy8g5b6X5Yiw6aKc6Imy5pWw57uE44CB6IyD5Zu05pWw57uEXHJcbi8vICAgICAgIGxldCBjb2xvckZpZWxkc0FycmF5ID0gX2dldENvbG9yRmllbGRzQXJyYXkoZmVhdHVyZVR5cGUsIFwic2VjdGlvblwiKTtcclxuLy8gICAgICAgbGV0IHJhbmdlQXJyYXkgPSBfZ2V0UmFuZ2VBcnJheShmZWF0dXJlVHlwZSk7XHJcbi8vXHJcbi8vICAgICAgIC8vIOmBjeWOhuminOiJsuaVsOe7hO+8jOa3u+WKoOWQhOihjOaOp+S7tlxyXG4vLyAgICAgICBjb2xvckZpZWxkc0FycmF5LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG4vLyAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJmaWVsZHMtaXRlbVwiIGRhdGEtaW5kZXg9YCArIGluZGV4ICsgYCA+XHJcbi8vICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uIGljb25mb250IGAgKyBzaGFwZUNsYXNzICsgYCBjb2xvcnMtcGlja2VyXCIgc3R5bGU9XCJjb2xvcjogYCArIHZhbHVlICsgYFwiPjxkaXYgY2xhc3M9XCJzZWN0aW9uLWNvbG9ycy1waWNrZXJcIiB2YWx1ZT1gICsgdmFsdWUgKyBgPjwvZGl2Pjwvc3Bhbj5cclxuLy8gICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFuZ2UtdmFsdWVzXCI+XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIiBjbGFzcz1cInZhbHVlLXN0YXJ0XCIgdmFsdWU9YCArIHJhbmdlQXJyYXlbaW5kZXhdLnRvRml4ZWQoMykgKyBgPlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2YWx1ZS1oclwiPi08L3NwYW4+XHJcbi8vICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9XCJ3aWR0aDogMTAwcHhcIiBjbGFzcz1cInZhbHVlLWVuZFwiIHZhbHVlPWAgKyByYW5nZUFycmF5W2luZGV4ICsgMV0udG9GaXhlZCgzKSArIGA+XHJcbi8vICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbi8vICAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbi8vICAgICAgIH0pXHJcbi8vXHJcbi8vICAgICAgIGh0bWwgKz0gYDwvZGl2PmA7XHJcbi8vICAgICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4vLyAgICAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbi8vXHJcbi8vICAgICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi52YWx1ZS1zdGFydFwiKS5rZW5kb01hc2tlZFRleHRCb3goe30pO1xyXG4vLyAgICAgICAkKGNvbnRhaW5lcnNbaV0pLmZpbmQoXCIudmFsdWUtZW5kXCIpLmtlbmRvTWFza2VkVGV4dEJveCh7fSk7XHJcbi8vICAgICB9IGVsc2UgaWYgKGNvbnRhaW5lcnNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGVhdG1hcFwiKSkge1xyXG4vLyAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiZWRpdG9yLWZpZWxkcy1jb2xvclwiID5cclxuLy8gICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRpdGxlXCI+PHNwYW4+6Ieq5a6a5LmJ6aKc6ImyPC9zcGFuPlxyXG4vLyAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1bmlxdWUtc2hvd1wiPjxzcGFuPuWxleW8gDwvc3Bhbj48aSBjbGFzcz1cImZhIGZhLXBsdXMtc3F1YXJlLW8gZmllbGRzLWRpdi1zd2l0Y2ggc3RhdGUtY2xvc2VcIj48L2k+PC9kaXY+XHJcbi8vICAgICAgICAgICAgIDwvZGl2PlxyXG4vLyAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRzLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5gO1xyXG4vLyAgICAgICBsZXQgY29sb3JGaWVsZHNPYmplY3QgPSBfZ2V0Q29sb3JGaWVsZHNBcnJheShmZWF0dXJlVHlwZSwgXCJoZWF0bWFwXCIpO1xyXG4vLyAgICAgICBsZXQgY29sb3JGaWVsZHNBcnJheSA9IE9iamVjdC5rZXlzKGNvbG9yRmllbGRzT2JqZWN0KS5zb3J0KCk7XHJcbi8vICAgICAgIGNvbG9yRmllbGRzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoa2V5LCBpbmRleCkge1xyXG4vLyAgICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiIGRhdGEta2V5PWAgKyBrZXkgKyBgPlxyXG4vLyAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPueDreeCueminOiJsmAgKyAoTnVtYmVyKGluZGV4KSArIDEpICsgYDwvZGl2PlxyXG4vLyAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGVhdG1hcC1jb2xvcnMtcGlja2VyXCIgZGF0YS1yb2xlPVwiY29sb3JwaWNrZXJcIiB2YWx1ZT1cImAgKyBjb2xvckZpZWxkc09iamVjdFtrZXldICsgYFwiPjwvZGl2PlxyXG4vLyAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbi8vICAgICAgIH0pXHJcbi8vICAgICAgIGh0bWwgKz0gYDwvZGl2PmA7XHJcbi8vICAgICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4vLyAgICAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbi8vICAgICB9XHJcbi8vXHJcbi8vICAgICAvLyDoh6rlrprkuYnljZXlgLzpopzoibLlj5jljJYsIGNvbG9ycGlja2Vy6aKc6Imy5Y+Y5YyW5ZCO5L+u5pS5c3BhbueahGNvbG9yXHJcbi8vICAgICAkKGNvbnRhaW5lcnNbaV0pLmZpbmQoXCIuc2luZ2xlLWNvbG9ycy1waWNrZXJcIikua2VuZG9Db2xvclBpY2tlcih7XHJcbi8vICAgICAgIGJ1dHRvbjogZmFsc2UsXHJcbi8vICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuLy8gICAgICAgICBsZXQgY29sb3IgPSBlLnZhbHVlO1xyXG4vLyAgICAgICAgIGxldCBrZXkgPSAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcIi5maWVsZHMtaXRlbVwiKS5maW5kKFwiLnZhbHVlXCIpLnRleHQoKTtcclxuLy8gICAgICAgICBsZXQgY2xhc3NMaXN0ID0gJCh0aGlzKVswXS5lbGVtZW50LnBhcmVudHMoXCIuZWRpdG9yLWZpZWxkcy1jb2xvclwiKVswXS5jbGFzc0xpc3Q7XHJcbi8vICAgICAgICAgbGV0IGZlYXR1cmVUeXBlID0gY2xhc3NMaXN0WzFdO1xyXG4vLyAgICAgICAgIGxldCByZW5kZXJUeXBlID0gY2xhc3NMaXN0WzJdO1xyXG4vLyAgICAgICAgIGxldCB0aGVtYXRpY0NvbG9ycyA9IF9nZXRDb2xvckZpZWxkc0FycmF5KGZlYXR1cmVUeXBlLCByZW5kZXJUeXBlKTtcclxuLy9cclxuLy8gICAgICAgICAvLyDmlLnlj5jmjqfku7bnmoTpopzoibJcclxuLy8gICAgICAgICAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcInNwYW5cIikuY3NzKFwiY29sb3JcIiwgY29sb3IpO1xyXG4vL1xyXG4vLyAgICAgICAgIC8vIOaUueWPmOS4k+mimOWtl+auteeahOWhq+WFheiJsu+8jOW5tui/m+ihjOa4suafk1xyXG4vLyAgICAgICAgIGlmICh0aGVtYXRpY0NvbG9ycy5oYXMoa2V5KSkge1xyXG4vLyAgICAgICAgICAgdGhlbWF0aWNDb2xvcnMuc2V0KGtleSwgY29sb3IpO1xyXG4vLyAgICAgICAgIH0gZWxzZSBpZiAodGhlbWF0aWNDb2xvcnMuaGFzKE51bWJlcihrZXkpKSkge1xyXG4vLyAgICAgICAgICAgdGhlbWF0aWNDb2xvcnMuc2V0KE51bWJlcihrZXkpLCBjb2xvcik7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICAgIHJlbmRlcigpO1xyXG4vLyAgICAgICB9LFxyXG4vLyAgICAgfSk7XHJcbi8vXHJcbi8vICAgICAvLyDoh6rlrprkuYnliIbmrrXpopzoibLlj5jljJYsIGNvbG9ycGlja2Vy6aKc6Imy5Y+Y5YyW5ZCO5L+u5pS5c3BhbueahGNvbG9yXHJcbi8vICAgICAkKGNvbnRhaW5lcnNbaV0pLmZpbmQoXCIuc2VjdGlvbi1jb2xvcnMtcGlja2VyXCIpLmtlbmRvQ29sb3JQaWNrZXIoe1xyXG4vLyAgICAgICBidXR0b246IGZhbHNlLFxyXG4vLyAgICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbi8vICAgICAgICAgbGV0IGNvbG9yID0gZS52YWx1ZTtcclxuLy8gICAgICAgICBsZXQgaW5kZXggPSAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcIi5maWVsZHMtaXRlbVwiKS5hdHRyKFwiZGF0YS1pbmRleFwiKTtcclxuLy8gICAgICAgICBsZXQgY2xhc3NMaXN0ID0gJCh0aGlzKVswXS5lbGVtZW50LnBhcmVudHMoXCIuZWRpdG9yLWZpZWxkcy1jb2xvclwiKVswXS5jbGFzc0xpc3Q7XHJcbi8vICAgICAgICAgbGV0IGZlYXR1cmVUeXBlID0gY2xhc3NMaXN0WzFdO1xyXG4vLyAgICAgICAgIGxldCByZW5kZXJUeXBlID0gY2xhc3NMaXN0WzJdO1xyXG4vLyAgICAgICAgIGxldCB0aGVtYXRpY0NvbG9ycyA9IF9nZXRDb2xvckZpZWxkc0FycmF5KGZlYXR1cmVUeXBlLCByZW5kZXJUeXBlKTtcclxuLy9cclxuLy8gICAgICAgICAvLyDmlLnlj5jmjqfku7bnmoTpopzoibJcclxuLy8gICAgICAgICAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcInNwYW5cIikuY3NzKFwiY29sb3JcIiwgY29sb3IpO1xyXG4vL1xyXG4vLyAgICAgICAgIC8vIOaUueWPmOS4k+mimOWtl+auteeahOWhq+WFheiJsu+8jOW5tui/m+ihjOa4suafk1xyXG4vLyAgICAgICAgIHRoZW1hdGljQ29sb3JzW2luZGV4XSA9IGNvbG9yO1xyXG4vLyAgICAgICAgIHJlbmRlcigpO1xyXG4vLyAgICAgICB9LFxyXG4vLyAgICAgfSk7XHJcbi8vXHJcbi8vICAgICAvLyDoh6rlrprkuYnng63lipvlm77popzoibLlj5jljJbvvIwgY29sb3JwaWNrZXLpopzoibLlj5jljJZcclxuLy8gICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5oZWF0bWFwLWNvbG9ycy1waWNrZXJcIikua2VuZG9Db2xvclBpY2tlcih7XHJcbi8vICAgICAgIGJ1dHRvbjogZmFsc2UsXHJcbi8vICAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuLy8gICAgICAgICBsZXQgY29sb3IgPSBlLnZhbHVlO1xyXG4vLyAgICAgICAgIGxldCBrZXkgPSAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcIi5lZGl0b3ItdG9vbFwiKS5hdHRyKFwiZGF0YS1rZXlcIik7XHJcbi8vXHJcbi8vICAgICAgICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuLy8gICAgICAgICBsZXQgbGF5ZXIgPSBidWlsZFByb2plY3Quc2V0dGluZy5sYXllcjsgLy8g5b2T5YmN5r+A5rS755qEbGF5ZXJcclxuLy8gICAgICAgICBsZXQgcmVuZGVyTW9kZWwgPSBidWlsZFByb2plY3QuZ2V0SW5mbygncmVuZGVyX21vZGVsJyk7XHJcbi8vICAgICAgICAgbGV0IG9wdGlvbnMgPSByZW5kZXJNb2RlbC5zdHlsZU9wdGlvbnM7XHJcbi8vXHJcbi8vICAgICAgICAgb3B0aW9ucy5ncmFkaWVudCA9IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMuaGVhdG1hcENvbG9yUmFtcFtvcHRpb25zLmNvbG9ySW5kZXhdO1xyXG4vLyAgICAgICAgIG9wdGlvbnMuZ3JhZGllbnRba2V5XSA9IGNvbG9yO1xyXG4vL1xyXG4vLyAgICAgICAgIHJlbmRlcigpO1xyXG4vLyAgICAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcbi8vICAgICAgIH0sXHJcbi8vICAgICB9KTtcclxuLy9cclxuLy8gICAgIC8vIOi1t+Wni+iMg+WbtOWPmOWMllxyXG4vLyAgICAgJChjb250YWluZXJzW2ldKS5maW5kKFwiLnZhbHVlLXN0YXJ0IGlucHV0XCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4vLyAgICAgICBsZXQgaW5kZXggPSBOdW1iZXIoJCh0aGlzKS5wYXJlbnRzKFwiLmZpZWxkcy1pdGVtXCIpLmF0dHIoXCJkYXRhLWluZGV4XCIpKTtcclxuLy8gICAgICAgbGV0IGNsYXNzTGlzdCA9ICQodGhpcykucGFyZW50cyhcIi5lZGl0b3ItZmllbGRzLWNvbG9yXCIpWzBdLmNsYXNzTGlzdDtcclxuLy8gICAgICAgbGV0IGZlYXR1cmVUeXBlID0gY2xhc3NMaXN0WzFdO1xyXG4vLyAgICAgICBsZXQgcmVuZGVyVHlwZSA9IGNsYXNzTGlzdFsyXTtcclxuLy8gICAgICAgbGV0IHJhbmdlQXJyYXkgPSBfZ2V0UmFuZ2VBcnJheShmZWF0dXJlVHlwZSwgcmVuZGVyVHlwZSk7XHJcbi8vICAgICAgIGxldCBtaW5fdmFsdWUgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjtcclxuLy8gICAgICAgbGV0IG1heF92YWx1ZSA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG4vLyAgICAgICBsZXQgbmV3X3ZhbHVlID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcclxuLy8gICAgICAgbGV0ICRwcmV2X25vZGUgPSBudWxsO1xyXG4vL1xyXG4vLyAgICAgICBpZiAoaW5kZXggLSAxID49IDApIHtcclxuLy8gICAgICAgICBtaW5fdmFsdWUgPSByYW5nZUFycmF5W2luZGV4IC0gMV07XHJcbi8vICAgICAgICAgJHByZXZfbm9kZSA9ICQodGhpcykucGFyZW50cyhcIi5maWVsZHMtaXRlbVwiKS5wcmV2KCkuZmluZChcIi52YWx1ZS1lbmQgaW5wdXRcIik7XHJcbi8vICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgaWYgKGluZGV4ICsgMSA8IHJhbmdlQXJyYXkubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgbWF4X3ZhbHVlID0gcmFuZ2VBcnJheVtpbmRleCArIDFdO1xyXG4vLyAgICAgICB9XHJcbi8vXHJcbi8vICAgICAgIGlmIChuZXdfdmFsdWUgPiBtaW5fdmFsdWUgJiYgbmV3X3ZhbHVlIDwgbWF4X3ZhbHVlKSB7XHJcbi8vICAgICAgICAgcmFuZ2VBcnJheVtpbmRleF0gPSBuZXdfdmFsdWU7XHJcbi8vXHJcbi8vICAgICAgICAgaWYgKCRwcmV2X25vZGUpIHtcclxuLy8gICAgICAgICAgICRwcmV2X25vZGUudmFsKG5ld192YWx1ZSk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgICB9IGVsc2Uge1xyXG4vLyAgICAgICAgIEtRLkNvbnRyb2wuTm90aWZpY2F0aW9uLmdldEluc3RhbmNlKCkuc2hvd0Vycm9yKCfmlbDlgLzojIPlm7TkuI3mraPnoa4nKTtcclxuLy8gICAgICAgICBlLnRhcmdldC52YWx1ZSA9IHJhbmdlQXJyYXlbaW5kZXhdO1xyXG4vLyAgICAgICB9XHJcbi8vICAgICAgIHJlbmRlcigpO1xyXG4vLyAgICAgfSk7XHJcbi8vXHJcbi8vICAgICAvLyDnu5PmnZ/ojIPlm7Tlj5jljJZcclxuLy8gICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi52YWx1ZS1lbmQgaW5wdXRcIikuY2hhbmdlKGZ1bmN0aW9uIChlKSB7XHJcbi8vICAgICAgIGxldCBpbmRleCA9IE51bWJlcigkKHRoaXMpLnBhcmVudHMoXCIuZmllbGRzLWl0ZW1cIikuYXR0cihcImRhdGEtaW5kZXhcIikpICsgMTtcclxuLy8gICAgICAgbGV0IGNsYXNzTGlzdCA9ICQodGhpcykucGFyZW50cyhcIi5lZGl0b3ItZmllbGRzLWNvbG9yXCIpWzBdLmNsYXNzTGlzdDtcclxuLy8gICAgICAgbGV0IGZlYXR1cmVUeXBlID0gY2xhc3NMaXN0WzFdO1xyXG4vLyAgICAgICBsZXQgcmVuZGVyVHlwZSA9IGNsYXNzTGlzdFsyXTtcclxuLy8gICAgICAgbGV0IHJhbmdlQXJyYXkgPSBfZ2V0UmFuZ2VBcnJheShmZWF0dXJlVHlwZSwgcmVuZGVyVHlwZSk7XHJcbi8vICAgICAgIGxldCBtaW5fdmFsdWUgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjtcclxuLy8gICAgICAgbGV0IG1heF92YWx1ZSA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG4vLyAgICAgICBsZXQgbmV3X3ZhbHVlID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcclxuLy8gICAgICAgbGV0ICRuZXh0X25vZGUgPSBudWxsO1xyXG4vL1xyXG4vLyAgICAgICBpZiAoaW5kZXggLSAxID49IDApIHtcclxuLy8gICAgICAgICBtaW5fdmFsdWUgPSByYW5nZUFycmF5W2luZGV4IC0gMV07XHJcbi8vICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgaWYgKGluZGV4ICsgMSA8IHJhbmdlQXJyYXkubGVuZ3RoKSB7XHJcbi8vICAgICAgICAgbWF4X3ZhbHVlID0gcmFuZ2VBcnJheVtpbmRleCArIDFdO1xyXG4vLyAgICAgICAgICRuZXh0X25vZGUgPSAkKHRoaXMpLnBhcmVudHMoXCIuZmllbGRzLWl0ZW1cIikubmV4dCgpLmZpbmQoXCIudmFsdWUtc3RhcnQgaW5wdXRcIik7XHJcbi8vICAgICAgIH1cclxuLy9cclxuLy8gICAgICAgaWYgKG5ld192YWx1ZSA+IG1pbl92YWx1ZSAmJiBuZXdfdmFsdWUgPCBtYXhfdmFsdWUpIHtcclxuLy8gICAgICAgICByYW5nZUFycmF5W2luZGV4XSA9IG5ld192YWx1ZTtcclxuLy9cclxuLy8gICAgICAgICBpZiAoJG5leHRfbm9kZSkge1xyXG4vLyAgICAgICAgICAgJG5leHRfbm9kZS52YWwobmV3X3ZhbHVlKTtcclxuLy8gICAgICAgICB9XHJcbi8vICAgICAgIH0gZWxzZSB7XHJcbi8vICAgICAgICAgS1EuQ29udHJvbC5Ob3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5zaG93RXJyb3IoJ+aVsOWAvOiMg+WbtOS4jeato+ehricpO1xyXG4vLyAgICAgICAgIGUudGFyZ2V0LnZhbHVlID0gcmFuZ2VBcnJheVtpbmRleF07XHJcbi8vICAgICAgIH1cclxuLy8gICAgICAgcmVuZGVyKCk7XHJcbi8vICAgICB9KTtcclxuLy9cclxuLy8gICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5jb2xvcnMtcGlja2VyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuLy8gICAgICAgJCh0aGlzKS5maW5kKFwiLmstc2VsZWN0ZWQtY29sb3JcIilbMF0uY2xpY2soKTtcclxuLy8gICAgIH0pXHJcbi8vXHJcbi8vICAgICAvLyDnu5Hlrproh6rlrprkuYnljZXlgLzlsZXlvIDjgIHmlLbnvKnkuovku7ZcclxuLy8gICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5maWVsZHMtZGl2LXN3aXRjaFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbi8vICAgICAgIGxldCBzZWxmID0gJCh0aGlzKTtcclxuLy8gICAgICAgaWYgKHNlbGYuaGFzQ2xhc3MoXCJzdGF0ZS1jbG9zZVwiKSkge1xyXG4vLyAgICAgICAgIHNlbGYuc2libGluZ3MoXCJzcGFuXCIpLnZhbHVlID0gXCLlsZXlvIBcIjtcclxuLy8gICAgICAgICBzZWxmLnBhcmVudHMoXCIudGl0bGVcIikuc2libGluZ3MoXCIuZmllbGRzLWNvbnRhaW5lclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbi8vICAgICAgICAgc2VsZi5yZW1vdmVDbGFzcyhcInN0YXRlLWNsb3NlXCIpO1xyXG4vLyAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoXCJmYS1wbHVzLXNxdWFyZS1vXCIpO1xyXG4vLyAgICAgICAgIHNlbGYuYWRkQ2xhc3MoXCJmYS1taW51cy1zcXVhcmUtb1wiKTtcclxuLy8gICAgICAgfSBlbHNlIHtcclxuLy8gICAgICAgICBzZWxmLnNpYmxpbmdzKFwic3BhblwiKS52YWx1ZSA9IFwi5pS26LW3XCI7XHJcbi8vICAgICAgICAgc2VsZi5wYXJlbnRzKFwiLnRpdGxlXCIpLnNpYmxpbmdzKFwiLmZpZWxkcy1jb250YWluZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbi8vICAgICAgICAgc2VsZi5hZGRDbGFzcyhcInN0YXRlLWNsb3NlXCIpO1xyXG4vLyAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoXCJmYS1taW51cy1zcXVhcmUtb1wiKTtcclxuLy8gICAgICAgICBzZWxmLmFkZENsYXNzKFwiZmEtcGx1cy1zcXVhcmUtb1wiKTtcclxuLy8gICAgICAgfVxyXG4vLyAgICAgfSlcclxuLy9cclxuLy8gICAgIC8vIOWmguaenOmcgOimgeWxleW8gO+8jOWImeinpuWPkWNsaWNr5LqL5Lu2XHJcbi8vICAgICBpZiAoZXhwYW5kZWQpIHtcclxuLy8gICAgICAgJChjb250YWluZXJzW2ldKS5maW5kKFwiLmZpZWxkcy1kaXYtc3dpdGNoXCIpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbi8vICAgICB9XHJcbi8vICAgfVxyXG4vLyB9XHJcbi8vXHJcbi8vIGZ1bmN0aW9uIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCkge1xyXG4vLyAgIChhc3luUHJveHkoX2luaXRGaWVsZENvbG9yQ29udGFpbmVyKSkoKTtcclxuLy8gfVxyXG5cclxuLy8g5pu05paw5Zu+5L6LXHJcbmZ1bmN0aW9uIHVwZGF0ZUxlZ2VuZChsYXllcikge1xyXG4gIC8vIOWmguaenOWbvuS+i+eql+WPo+S4jeaYvuekuu+8jOebtOaOpei/lOWbnlxyXG4gIGxldCBkaXNwbGF5ID0gJChcIiNsZWdlbmQtd2luZG93XCIpLnBhcmVudCgpLmNzcyhcImRpc3BsYXlcIik7XHJcbiAgaWYgKGRpc3BsYXkgPT0gJ25vbmUnKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG5cclxuICB2YXIgcmVuZGVyVHlwZSA9IGxheWVyLnJlbmRlclR5cGU7XHJcbiAgdmFyIHJlbmRlciA9IGxheWVyLnJlbmRlcjtcclxuICB2YXIgb3B0aW9ucyA9IGxheWVyLm9wdGlvbnM7XHJcbiAgdmFyIGZlYXR1cmVUeXBlID0gb3B0aW9ucy5mZWF0dXJlVHlwZTtcclxuICB2YXIgZmVhdHVyZUljb24gPSBcIml0ZW0taWNvbiBpY29uIGljb25mb250IGljb24tc2hhcGUtcG9pbnRcIjtcclxuICBpZiAoZmVhdHVyZVR5cGUgPT0gXCJsaW5lXCIpIHtcclxuICAgIGZlYXR1cmVJY29uID0gXCJpdGVtLWljb24gaWNvbiBpY29uZm9udCBpY29uLXNoYXBlLWxpbmVcIjtcclxuICB9IGVsc2UgaWYgKGZlYXR1cmVUeXBlID09IFwicG9seWdvblwiKSB7XHJcbiAgICBmZWF0dXJlSWNvbiA9IFwiaXRlbS1pY29uIGljb24gaWNvbmZvbnQgaWNvbi1zaGFwZS1wb2x5Z29uXCI7XHJcbiAgfVxyXG4gIC8vIOa3u+WKoOagh+mimOWktFxyXG4gIHZhciBsYXllck5hbWUgPSBvcHRpb25zLm5hbWU7XHJcbiAgdmFyIGl0ZW1fdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICBpdGVtX3RpdGxlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwiaXRlbS10aXRsZVwiKTtcclxuICBpZiAoZmVhdHVyZVR5cGUgPT0gJ3BvaW50Jykge1xyXG4gICAgdmFyIGRhdGFfaGVhZCA9IHJlbmRlci5nZXQocmVuZGVyVHlwZSkub3B0aW9ucy52ZWN0b3JJbmZvO1xyXG4gIH0gZWxzZSBpZiAoZmVhdHVyZVR5cGUgPT0gJ2xpbmUnIHx8IGZlYXR1cmVUeXBlID09ICdwb2x5Z29uJykge1xyXG4gICAgZGF0YV9oZWFkID0gcmVuZGVyLmdldChyZW5kZXJUeXBlKS5vcHRpb25zO1xyXG4gIH1cclxuICAvLyDmuLLmn5PnsbvlnovkuLpiYXNpY+aJjeaYvuekumljb25cclxuICBpZiAocmVuZGVyVHlwZSA9PSBcImJhc2ljXCIpIHtcclxuICAgIHZhciB0aXRsZV9pY29uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBpZiAoZmVhdHVyZVR5cGUgPT0gJ3BvaW50Jykge1xyXG4gICAgICB2YXIgZmlsbENvbG9yID0gZGF0YV9oZWFkLmZpbGxDb2xvcjtcclxuICAgIH1cclxuICAgIGlmIChmZWF0dXJlVHlwZSA9PSAnbGluZScpIHtcclxuICAgICAgZmlsbENvbG9yID0gZGF0YV9oZWFkLmxpbmVDb2xvcjtcclxuICAgIH0gZWxzZSBpZiAoZmVhdHVyZVR5cGUgPT0gJ3BvbHlnb24nKXtcclxuICAgICAgZmlsbENvbG9yID0gZGF0YV9oZWFkLmZpbGxDb2xvcjtcclxuICAgIH1cclxuICAgIHRpdGxlX2ljb24uc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgZmVhdHVyZUljb24pO1xyXG4gICAgdGl0bGVfaWNvbi5zdHlsZS5jb2xvciA9IGZpbGxDb2xvcjtcclxuICAgIHRpdGxlX2ljb24uc3R5bGUubWFyZ2luUmlnaHQgPSBcIjVweFwiO1xyXG4gICAgaXRlbV90aXRsZS5hcHBlbmQodGl0bGVfaWNvbik7XHJcbiAgfVxyXG4gIHZhciBpdGVtX3AgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgaXRlbV9wLmlubmVyVGV4dCA9IGxheWVyTmFtZTtcclxuICBpdGVtX3RpdGxlLmFwcGVuZChpdGVtX3ApO1xyXG4gICQoXCIjbGVnZW5kLXdpbmRvdyAubGVnZW5kLWl0ZW1cIikuZW1wdHkoKTtcclxuICAkKFwiI2xlZ2VuZC13aW5kb3cgLmxlZ2VuZC1pdGVtXCIpLmFwcGVuZChpdGVtX3RpdGxlKTtcclxuXHJcbiAgdmFyIGh0bWwgPSBcIlwiO1xyXG4gIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gIGRpdi5jbGFzc05hbWUgPSBcImNvbnRlbnQtaW5mb1wiO1xyXG4gIHZhciBzaGFwZUNsYXNzID0gXCJpY29uLXNoYXBlLVwiICsgZmVhdHVyZVR5cGU7XHJcblxyXG4gIC8vIOWNleWAvOa4suafk+aooeW8j1xyXG4gIGlmIChyZW5kZXJUeXBlID09IFwic2luZ2xlXCIpIHtcclxuICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJ0aXRsZVwiIHN0eWxlPVwibWFyZ2luOiAxMHB4IDAgMTBweDtcIj5cclxuICAgICAgICAgICAgICAgICA8c3Bhbj7kuJPpopjlrZfmrrXvvJo8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgPHNwYW4+YCArIGRhdGFfaGVhZC50aGVtYXRpY0ZpZWxkICsgYDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkcy1jb250YWluZXJcIiBzdHlsZT1cImRpc3BsYXk6IGJsb2NrO1wiPmA7XHJcblxyXG4gICAgLy8g5b6X5Yiw6aKc6Imy55qE5pWw57uEXHJcbiAgICBsZXQgY29sb3JGaWVsZHNBcnJheSA9IF9nZXRDb2xvckZpZWxkc0FycmF5KGZlYXR1cmVUeXBlLCBcInNpbmdsZVwiKTtcclxuXHJcbiAgICAvLyDpgY3ljobpopzoibLmlbDnu4TvvIzmt7vliqDlkITooYzmjqfku7ZcclxuICAgIGNvbG9yRmllbGRzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiZmllbGRzLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbiBpY29uZm9udCBgICsgc2hhcGVDbGFzcyArIGBcIiBzdHlsZT1cImNvbG9yOiBgICsgdmFsdWUgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPmA7XHJcbiAgICAgIGh0bWwgKz0ga2V5ICsgYDwvc3Bhbj48L2Rpdj5gO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaHRtbCArPSBgPC9kaXY+YDtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgJChcIiNsZWdlbmQtd2luZG93IC5sZWdlbmQtaXRlbVwiKS5hcHBlbmQoZGl2KTtcclxuICB9IGVsc2UgaWYgKHJlbmRlclR5cGUgPT0gXCJzZWN0aW9uXCIpIHtcclxuICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJ0aXRsZVwiICBzdHlsZT1cIm1hcmdpbjogMTBweCAwIDEwcHg7XCI+XHJcbiAgICAgICAgICAgICAgICAgPHNwYW4+5LiT6aKY5a2X5q6177yaPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgIDxzcGFuPmAgKyBkYXRhX2hlYWQudGhlbWF0aWNGaWVsZCArIGA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWVsZHMtY29udGFpbmVyXCIgc3R5bGU9XCJkaXNwbGF5OiBibG9jaztcIj5gO1xyXG5cclxuICAgIC8vIOW+l+WIsOminOiJsuaVsOe7hOOAgeiMg+WbtOaVsOe7hFxyXG4gICAgbGV0IGNvbG9yRmllbGRzQXJyYXkgPSBfZ2V0Q29sb3JGaWVsZHNBcnJheShmZWF0dXJlVHlwZSwgXCJzZWN0aW9uXCIpO1xyXG4gICAgbGV0IHJhbmdlQXJyYXkgPSBfZ2V0UmFuZ2VBcnJheShmZWF0dXJlVHlwZSk7XHJcblxyXG4gICAgLy8g6YGN5Y6G6aKc6Imy5pWw57uE77yM5re75Yqg5ZCE6KGM5o6n5Lu2XHJcbiAgICBjb2xvckZpZWxkc0FycmF5LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG4gICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiZmllbGRzLWl0ZW1cIiBkYXRhLWluZGV4PWAgKyBpbmRleCArIGAgPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvbiBpY29uZm9udCBgICsgc2hhcGVDbGFzcyArIGBcIiBzdHlsZT1cImNvbG9yOiBgICsgdmFsdWUgKyBgXCI+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYW5nZS12YWx1ZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cIndpZHRoOiA1MHB4XCIgY2xhc3M9XCJ2YWx1ZS1zdGFydFwiIHJlYWRvbmx5PVwicmVhZG9ubHlcIiB2YWx1ZT1gICsgcmFuZ2VBcnJheVtpbmRleF0udG9GaXhlZCgzKSArIGA+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZhbHVlLWhyXCI+LTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cIndpZHRoOiA1MHB4OyBmbG9hdDogcmlnaHQ7IG1hcmdpbi1sZWZ0OiAyMHB4O1wiIHJlYWRvbmx5PVwicmVhZG9ubHlcIiBjbGFzcz1cInZhbHVlLWVuZFwiIHZhbHVlPWAgKyByYW5nZUFycmF5W2luZGV4ICsgMV0udG9GaXhlZCgzKSArIGA+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICB9KVxyXG5cclxuICAgIGh0bWwgKz0gYDwvZGl2PmA7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICQoXCIjbGVnZW5kLXdpbmRvdyAubGVnZW5kLWl0ZW1cIikuYXBwZW5kKGRpdik7XHJcbiAgfSBlbHNlIGlmIChyZW5kZXJUeXBlID09IFwiaGVhdG1hcFwiKSB7XHJcbiAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiZmllbGRzLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogYmxvY2s7IG1hcmdpbi10b3A6IDVweDtcIj5gO1xyXG5cclxuICAgIHZhciBjb2xvcl9pbmRleCA9IHJlbmRlci5nZXQocmVuZGVyVHlwZSkub3B0aW9ucy5jb2xvckluZGV4O1xyXG4gICAgaHRtbCArPSAnPHNwYW4+5bCRPC9zcGFuPjxzcGFuIHN0eWxlPVwibWFyZ2luLWxlZnQ6IDgwcHg7XCI+5LitPC9zcGFuPjxzcGFuIHN0eWxlPVwibWFyZ2luLWxlZnQ6IDgwcHg7XCI+5aSaPC9zcGFuPic7XHJcbiAgICBodG1sICs9IGA8c3BhbiBjbGFzcz1cInNlbGVjdGVkLXZhbHVlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvaGVhdG1hcF9yYW1wL2NvbG9yYCArIGNvbG9yX2luZGV4ICsgYC5wbmcpXCI+PC9zcGFuPmA7XHJcbiAgICBodG1sICs9IGA8L2Rpdj5gO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAkKFwiI2xlZ2VuZC13aW5kb3cgLmxlZ2VuZC1pdGVtXCIpLmFwcGVuZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g5YyF6KO55Ye95pWw77yM6L+U5Zue5LiA5Liq5byC5q2l5omn6KGM55qE5Ye95pWwXHJcbmZ1bmN0aW9uIGFzeW5Qcm94eShmbikge1xyXG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgZm4oKTtcclxuICAgIH0sIDApXHJcbiAgfVxyXG59XHJcblxyXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqZGF0YSBzb3VyY2UqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXHJcblxyXG4vLyDmoIfnrb7lrZfkvZPliJfooahcclxuZnVuY3Rpb24gbGFiZWxGb250RHJvcERvd25MaXN0KCkge1xyXG4gIHJldHVybiBbXHJcbiAgICB7bmFtZTogXCLku7/lrotcIiwgdmFsdWU6IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMubGFiZWxGb250TmFtZS5mYW5nU29uZ30sXHJcbiAgICB7bmFtZTogXCLlrovkvZNcIiwgdmFsdWU6IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMubGFiZWxGb250TmFtZS5zb25nfSxcclxuICAgIHtuYW1lOiBcIuW+rui9r+mbhem7kVwiLCB2YWx1ZTogS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5sYWJlbEZvbnROYW1lLnlhSGVpfSxcclxuICBdO1xyXG59XHJcblxyXG4vLyDkuJPpopjlrZfmrrXliJfooahcclxuZnVuY3Rpb24gc3BlY2lhbEZpZWxkRHJvcERvd25MaXN0KCkge1xyXG4gIGxldCBzcGVjaWFsRmllbGREcm9wRG93bkxpc3QgPSBbXTtcclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICBsZXQgbGF5ZXIgPSBidWlsZFByb2plY3Quc2V0dGluZy5sYXllcjsgLy8g5b2T5YmN5r+A5rS755qEbGF5ZXJcclxuICBsZXQgcmVuZGVyID0gbGF5ZXIuZ2V0UmVuZGVyKCk7XHJcbiAgdmFyIGZpZWxkcyA9IE9iamVjdC5rZXlzKHJlbmRlci5nZW9qc29uT2JqZWN0RmllbGRzKCkpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7ICsraSkge1xyXG4gICAgc3BlY2lhbEZpZWxkRHJvcERvd25MaXN0LnB1c2goe25hbWU6IGZpZWxkc1tpXSwgdmFsdWU6IGZpZWxkc1tpXX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHNwZWNpYWxGaWVsZERyb3BEb3duTGlzdDtcclxufVxyXG5cclxuLy8g5YiG5q615LiT6aKY5a2X5q615YiX6KGoXHJcbmZ1bmN0aW9uIHNlY3Rpb25TcGVjaWFsRmllbGREcm9wRG93bkxpc3QoKSB7XHJcbiAgbGV0IHNlY3Rpb25TcGVjaWFsRmllbGREcm9wRG93bkxpc3QgPSBbXTtcclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICBsZXQgbGF5ZXIgPSBidWlsZFByb2plY3Quc2V0dGluZy5sYXllcjsgLy8g5b2T5YmN5r+A5rS755qEbGF5ZXJcclxuICBsZXQgcmVuZGVyID0gbGF5ZXIuZ2V0UmVuZGVyKCk7XHJcbiAgbGV0IGZpZWxkcyA9IE9iamVjdC5rZXlzKHJlbmRlci5nZW9qc29uT2JqZWN0U2VjdGlvbkZpZWxkcygpKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyArK2kpIHtcclxuICAgIHNlY3Rpb25TcGVjaWFsRmllbGREcm9wRG93bkxpc3QucHVzaCh7bmFtZTogZmllbGRzW2ldLCB2YWx1ZTogZmllbGRzW2ldfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc2VjdGlvblNwZWNpYWxGaWVsZERyb3BEb3duTGlzdDtcclxufVxyXG5cclxuLy8g5qCH562+5a2X5q615YiX6KGoXHJcbmZ1bmN0aW9uIGxhYmVsRmllbGREcm9wRG93bkxpc3QoKSB7XHJcbiAgcmV0dXJuIGZpZWxkc0Ryb3BEb3duTGlzdCgpO1xyXG59XHJcblxyXG4vLyDmnYPph43lrZfmrrXliJfooahcclxuZnVuY3Rpb24gd2VpZ2h0RmllbGREcm9wRG93bkxpc3QoKSB7XHJcbiAgcmV0dXJuIGZpZWxkc0Ryb3BEb3duTGlzdCgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWVsZHNEcm9wRG93bkxpc3QoKSB7XHJcbiAgbGV0IGZpZWxkc0Ryb3BEb3duTGlzdCA9IFt7bmFtZTogXCLmnKrorr7nva5cIiwgdmFsdWU6IFwiXCJ9XTtcclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICBsZXQgbGF5ZXIgPSBidWlsZFByb2plY3Quc2V0dGluZy5sYXllcjsgLy8g5b2T5YmN5r+A5rS755qEbGF5ZXJcclxuICBsZXQgcmVuZGVyID0gbGF5ZXIuZ2V0UmVuZGVyKCk7XHJcbiAgbGV0IGZpZWxkcyA9IE9iamVjdC5rZXlzKHJlbmRlci5nZW9qc29uT2JqZWN0RmllbGRzKCkpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7ICsraSkge1xyXG4gICAgZmllbGRzRHJvcERvd25MaXN0LnB1c2goe25hbWU6IGZpZWxkc1tpXSwgdmFsdWU6IGZpZWxkc1tpXX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGZpZWxkc0Ryb3BEb3duTGlzdDtcclxufVxyXG5cclxuLy8g57q/5qC35byP5YiX6KGoXHJcbmZ1bmN0aW9uIGxpbmVTdHlsZURyb3BEb3duTGlzdCgpIHtcclxuICBsZXQgbGluZVN0eWxlRHJvcERvd25MaXN0ID0gW107XHJcbiAgbGV0IGxpbmVTdHlsZSA9IE9iamVjdC52YWx1ZXMoS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5saW5lU3R5bGUpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxpbmVTdHlsZS5sZW5ndGg7ICsraSkge1xyXG4gICAgbGluZVN0eWxlRHJvcERvd25MaXN0LnB1c2goe25hbWU6IFN0cmluZyhpKSwgdmFsdWU6IGxpbmVTdHlsZVtpXX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGxpbmVTdHlsZURyb3BEb3duTGlzdDtcclxufVxyXG5cclxuLy8g5YiG5q615pa55byP5YiX6KGoXHJcbmZ1bmN0aW9uIHN1YnNlY3Rpb25UeXBlRHJvcERvd25MaXN0KCkge1xyXG4gIHJldHVybiBbXHJcbiAgICB7bmFtZTogXCLnrYnot53liIbmrrXms5VcIiwgdmFsdWU6IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMuY2xhc3NCcmVha3NNZXRob2QuY2xhc3NCcmVha3NfZXF1aWRpc3RhbnR9LFxyXG4gICAge25hbWU6IFwi562J6YeP5YiG5q615rOVXCIsIHZhbHVlOiBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmNsYXNzQnJlYWtzTWV0aG9kLmNsYXNzQnJlYWtzX3F1YW50aWxlfSxcclxuICAgIHtuYW1lOiBcIuWvueaVsOWIhuauteazlVwiLCB2YWx1ZTogS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5jbGFzc0JyZWFrc01ldGhvZC5jbGFzc0JyZWFrc19sb2dhcml0aG1pY30sXHJcbiAgICB7bmFtZTogXCJL6IGa57G75YiG5q615rOVXCIsIHZhbHVlOiBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmNsYXNzQnJlYWtzTWV0aG9kLmNsYXNzQnJlYWtzX2tfbWVhbnN9LFxyXG4gIF07XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHN1YnNlY3Rpb25OdW1iZXJEcm9wRG93bkxpc3QoKSB7XHJcbiAgbGV0IHN1YnNlY3Rpb25OdW1iZXJEcm9wRG93bkxpc3QgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDI7IGkgPCAxNjsgKytpKSB7XHJcbiAgICBzdWJzZWN0aW9uTnVtYmVyRHJvcERvd25MaXN0LnB1c2goe25hbWU6IFN0cmluZyhpKSwgdmFsdWU6IGl9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBzdWJzZWN0aW9uTnVtYmVyRHJvcERvd25MaXN0O1xyXG59XHJcblxyXG4vLyDoibLluKbmoLflvI/liJfooahcclxuZnVuY3Rpb24gcmFtcENvbG9yRHJvcERvd25MaXN0KCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IDMwOyAgLy8g5LiA5YWx5pyJMzDnp43oibLlnZdcclxuICBsZXQgcmFtcENvbG9yRHJvcERvd25MaXN0ID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgIHJhbXBDb2xvckRyb3BEb3duTGlzdC5wdXNoKHtuYW1lOiBTdHJpbmcoaSksIHZhbHVlOiBTdHJpbmcoaSl9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiByYW1wQ29sb3JEcm9wRG93bkxpc3Q7XHJcbn1cclxuXHJcbi8vIOeDreWKm+WbvuiJsuW4puagt+W8j+WIl+ihqFxyXG5mdW5jdGlvbiBoZWF0bWFwUmFtcENvbG9yRHJvcERvd25MaXN0KCkge1xyXG4gIGNvbnN0IGxlbmd0aCA9IDE4OyAgLy8g5LiA5YWx5pyJMTjnp43oibLlnZdcclxuICBsZXQgaGVhdG1hcFJhbXBDb2xvckRyb3BEb3duTGlzdCA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICBoZWF0bWFwUmFtcENvbG9yRHJvcERvd25MaXN0LnB1c2goe25hbWU6IFN0cmluZyhpKSwgdmFsdWU6IFN0cmluZyhpKX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIGhlYXRtYXBSYW1wQ29sb3JEcm9wRG93bkxpc3Q7XHJcbn1cclxuXHJcbi8vIOagh+etvuaWueWQkeWIl+ihqFxyXG5mdW5jdGlvbiBsYWJlbERpcmVjdGlvbkRyb3BEb3duTGlzdCgpIHtcclxuICByZXR1cm4gW1xyXG4gICAge25hbWU6IFwi5LitXCIsIHZhbHVlOiBcIm1pZFwifSxcclxuICAgIHtuYW1lOiBcIuS4ilwiLCB2YWx1ZTogXCJ1cFwifSxcclxuICAgIHtuYW1lOiBcIuS4i1wiLCB2YWx1ZTogXCJkb3duXCJ9LFxyXG4gICAge25hbWU6IFwi5bemXCIsIHZhbHVlOiBcImxlZnRcIn0sXHJcbiAgICB7bmFtZTogXCLlj7NcIiwgdmFsdWU6IFwicmlnaHRcIn0sXHJcbiAgXTtcclxufVxyXG5cclxuLy8g5qCH562+5pa55ZCR5YiX6KGoXHJcbmZ1bmN0aW9uIGV4dHJhSWNvblNoYXBlKCkge1xyXG4gIHJldHVybiBbXHJcbiAgICB7bmFtZTogXCLlnIblvaJcIiwgdmFsdWU6IFwiY2lyY2xlXCJ9LFxyXG4gICAge25hbWU6IFwi5pa55b2iXCIsIHZhbHVlOiBcInNxdWFyZVwifSxcclxuICAgIHtuYW1lOiBcIuaYn+W9olwiLCB2YWx1ZTogXCJzdGFyXCJ9LFxyXG4gICAge25hbWU6IFwi5LqU6KeS5pifXCIsIHZhbHVlOiBcInBlbnRhXCJ9LFxyXG4gIF07XHJcbn1cclxuXHJcbi8vIOaJi+e7mOWbvuWxgiDngrnlm77lsYIg5riy5p+T5pa55byP5YiH5o2i5oyJ6ZKu57uEXHJcbmZ1bmN0aW9uIGluaXRQb2ludFR5cGVTd2l0Y2hpbmdDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtdHlwZS1zd2l0Y2hpbmctY29udGFpbmVyXCIpO1xyXG5cclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG5cclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInBvaW50LXR5cGUtc3dpdGNoaW5nXCI+XHJcbiAgICAgICAgICAgICAgICA8bGkgc3R5bGU9XCJ3aWR0aDogMTEzcHhcIj7nn6Lph4/ngrnnrKblj7c8L2xpPlxyXG4gICAgICAgICAgICAgICAgPGxpIHN0eWxlPVwid2lkdGg6IDExM3B4XCI+5ZCR6YeP54K556ym5Y+3PC9saT5cclxuICAgICAgICAgICAgICAgIDxsaSBzdHlsZT1cIndpZHRoOiAxMTNweFwiPuWbvuW9oueCueespuWPtzwvbGk+XHJcbiAgICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0UG9pbnRSZW5kZXJUeXBlMENvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1yZW5kZXItdHlwZS0wLWNvbnRhaW5lclwiKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuXHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFuZC1kcmF3LXN2Zy1zeW1ib2xzXCIgc3R5bGU9XCJoZWlnaHQ6IDEzMHB4OyBvdmVyZmxvdzogYXV0bzsgd2lkdGg6IDMyN3B4OyBtYXJnaW46IDEwcHhcIj48L2Rpdj5cclxuICAgICAgICAgICBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhhbmQtZHJhdy1leHRyYS1pY29uLXNoYXBlLWNvbnRhaW5lclwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFuZC1kcmF3LWV4dHJhLWljb24tbWFya2VyLWNvbG9yLWNvbnRhaW5lclwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaGFuZC1kcmF3LWV4dHJhLWljb24taWNvbi1jb2xvci1jb250YWluZXJcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhhbmQtZHJhdy1leHRyYS1pY29uLXpvb20tcmF0ZS1jb250YWluZXJcIj48L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcblxyXG4gIC8vIOi/m+ihjOaVsOaNrueahOWhq+WFhVxyXG4gIGZpbGxIYW5kRHJhd1N2Z1N5bWJvbHMoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmlsbEhhbmREcmF3U3ZnU3ltYm9scygpIHtcclxuICAvLyDpppblhYjmuIXnqbrpnaLmnb9cclxuICAkKFwiLmhhbmQtZHJhdy1zdmctc3ltYm9sc1wiKS5lbXB0eSgpO1xyXG5cclxuICBsZXQgaWNvbnNfdW5pY29kZSA9IFtcclxuICAgIFwiJiN4ZTYxNFwiLCBcIiYjeGU2ZTNcIiwgXCImI3hlNmFkXCIsIFwiJiN4ZTYyOVwiLCBcIiYjeGU2MTNcIiwgXCImI3hlNjZiXCIsIFwiJiN4ZTY1YVwiLCBcIiYjeGU3NWZcIiwgXCImI3hlNjU2XCIsXHJcbiAgICBcIiYjeGU2NzlcIiwgXCImI3hlNjU3XCIsIFwiJiN4ZTY1MlwiLCBcIiYjeGU2MTVcIiwgXCImI3hlNjdlXCIsIFwiJiN4ZTYyMFwiLCBcIiYjeGU3ZGZcIiwgXCImI3hlNjY3XCIsIFwiJiN4ZTY2NlwiLFxyXG4gICAgXCImI3hlNjQyXCIsIFwiJiN4ZTY0MFwiLCBcIiYjeGU2MjhcIiwgXCImI3hlNjdiXCIsIFwiJiN4ZWFjOVwiLCBcIiYjeGU2M2ZcIiwgXCImI3hlNjFhXCIsIFwiJiN4ZTY0ZFwiLCBcIiYjeGU2MjZcIixcclxuICAgIFwiJiN4ZTZjYlwiLCBcIiYjeGU2YjVcIiwgXCImI3hlNjg5XCIsIFwiJiN4ZTZmNlwiLCBcIiYjeGU3MWNcIiwgXCImI3hlNjQ2XCIsIFwiJiN4ZTZjN1wiLCBcIiYjeGU2NzFcIiwgXCImI3hlNjZmXCIsXHJcbiAgICBcIiYjeGU2NDFcIiwgXCImI3hlNjNlXCIsIFwiJiN4ZTYzYVwiLCBcIiYjeGU2NzZcIiwgXCImI3hlNzM5XCIsIFwiJiN4ZTY1MVwiLCBcIiYjeGU2NjNcIiwgXCImI3hlNjdhXCIsIFwiJiN4ZTY3N1wiLFxyXG4gICAgXCImI3hlNjEyXCIsIFwiJiN4ZTgxZlwiLCBcIiYjeGU2NWNcIiwgXCImI3hlNjY0XCIsIFwiJiN4ZTY2NVwiLCBcIiYjeGU2MWZcIiwgXCImI3hlNjIzXCIsIFwiJiN4ZTYyNFwiLCBcIiYjeGU2MmFcIixcclxuICAgIC8vIFwiJiN4ZTYyYlwiLCBcIiYjeGU2MTFcIiwgXCImI3hlNjZkXCIsIFwiJiN4ZTY2MFwiLCBcIiYjeGU2NGNcIiwgXCImI3hlNjMwXCIsXHJcbiAgXTtcclxuXHJcbiAgbGV0IHJvd3MgPSA2O1xyXG4gIGxldCBjb2xzID0gOTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyArK2kpIHtcclxuICAgIGxldCAkcm93ID0gJCgnPGRpdiBjbGFzcz1cInN5bWJvbC1yb3dcIj48L2Rpdj4nKTtcclxuXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHM7ICsraikge1xyXG4gICAgICBsZXQgJGNvbHVtbiA9ICQoJzxkaXYgY2xhc3M9XCJpY29uZm9udFwiPjwvZGl2PicpO1xyXG4gICAgICAkY29sdW1uLmh0bWwoaWNvbnNfdW5pY29kZVtpICogY29scyArIGpdKTtcclxuXHJcbiAgICAgIC8vIOWbvuagh+mAieS4reeahOS6i+S7tlxyXG4gICAgICAvLyAkY29sdW1uLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gICAkKHRoaXMpLmNsb3Nlc3QoXCIuZWRpdG9yLXRvb2xcIikuZmluZChcIi5kZWZhdWx0LXBvaW50LWljb24gZGl2XCIpLmVxKDApLnRyaWdnZXIoJ2ljb25fc2VsZWN0ZWQnLCBpY29uc191bmljb2RlW2kgKiA2ICsgal0pO1xyXG4gICAgICAvLyB9KVxyXG5cclxuICAgICAgJHJvdy5hcHBlbmQoJGNvbHVtbik7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIi5oYW5kLWRyYXctc3ZnLXN5bWJvbHNcIikuYXBwZW5kKCRyb3cpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54K55pWw5o2uIOagh+etvuS9jee9rlxyXG5mdW5jdGlvbiBpbml0SGFuZERyYXdFeHRyYUljb25TaGFwZUNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoYW5kLWRyYXctZXh0cmEtaWNvbi1zaGFwZS1jb250YWluZXJcIik7XHJcblxyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuagh+iusOW9oueKtjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImV4dHJhLWljb24tc2hhcGUtbGlzdFwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby5zaGFwZVwiLz5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueaVsOaNriDmoIfnrb7kvY3nva5cclxuZnVuY3Rpb24gaW5pdEhhbmREcmF3RXh0cmFJY29uTWFya2VyQ29sb3JDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGFuZC1kcmF3LWV4dHJhLWljb24tbWFya2VyLWNvbG9yLWNvbnRhaW5lclwiKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5qCH6K6w6aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjb2xvcnMtcGlja2VyLWlucHV0XCIgZGF0YS1yb2xlPVwiY29sb3JwaWNrZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLnZlY3RvckluZm8ubWFya2VyQ29sb3JcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja4g5qCH562+5L2N572uXHJcbmZ1bmN0aW9uIGluaXRIYW5kRHJhd0V4dHJhSWNvbkljb25Db2xvckNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoYW5kLWRyYXctZXh0cmEtaWNvbi1pY29uLWNvbG9yLWNvbnRhaW5lclwiKTtcclxuXHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+SWNvbuminOiJsjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9ycy1waWNrZXItaW5wdXRcIiBkYXRhLXJvbGU9XCJjb2xvcnBpY2tlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby5pY29uQ29sb3JcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyAvLyDngrnmlbDmja4g5qCH562+5L2N572uXHJcbi8vIGZ1bmN0aW9uIGluaXRIYW5kRHJhd0V4dHJhSWNvblpvb21SYXRlQ29udGFpbmVyKCkge1xyXG4vLyAgIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhhbmQtZHJhdy1leHRyYS1pY29uLWljb24tY29sb3ItY29udGFpbmVyXCIpO1xyXG4vL1xyXG4vLyAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4vLyAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbi8vICAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4vLyAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbi8vICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPkljb27popzoibI8L2Rpdj5cclxuLy8gICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjb2xvcnMtcGlja2VyLWlucHV0XCIgZGF0YS1yb2xlPVwiY29sb3JwaWNrZXJcIlxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLmxhYmVsQ29sb3JcIi8+XHJcbi8vICAgICAgICAgICAgIDwvZGl2PlxyXG4vLyAgICAgICAgICAgICBgO1xyXG4vLyAgICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4vLyAgIH1cclxuLy8gfSIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IHpodW1vdSBvbiAyMDE5LzExLzEyLlxyXG4gKi9cclxuXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcblxyXG4vLyDnrKzkuIDpg6jliIYg5Yib5bu6aHRtbOmDqOWIhlxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyc0h0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBjcmVhdGVQYXJhbWV0ZXJTcmNMYXllcnNIdG1sKHNlbGVjdG9yKTtcclxuICBjcmVhdGVQYXJhbWV0ZXJEaWZmZXJlbmNlTGF5ZXJzSHRtbChzZWxlY3Rvcik7XHJcbiAgY3JlYXRlUGFyYW1ldGVyT3ZlcmxhcExheWVyc0h0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZVBhcmFtZXRlckRlc3RMYXllcnNIdG1sKHNlbGVjdG9yKTtcclxuXHJcbiAgY3JlYXRlUGFyYW1ldGVyR2VvU1JTSHRtbChzZWxlY3Rvcik7XHJcbiAgY3JlYXRlUGFyYW1ldGVyRGVzdEdlb1NSU0h0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZVBhcmFtZXRlclByakh0bWwoc2VsZWN0b3IpO1xyXG5cclxuICBjcmVhdGVQYXJhbWV0ZXJPdXRTUlNIdG1sKHNlbGVjdG9yKTtcclxuICBjcmVhdGVQYXJhbWV0ZXJPdXRTUlNUeXBlSHRtbChzZWxlY3Rvcik7XHJcbiAgY3JlYXRlUGFyYW1ldGVyQXJlYVNSU0h0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZUFuYWx5c2lzSXRlbVJ1bkh0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZVBhcmFtZXRlckdlb21ldHJ5QXR0cmlidXRlSHRtbChzZWxlY3Rvcik7XHJcbiAgY3JlYXRlUGFyYW1ldGVyRXhwb3J0U2hwRm9ybWF0SHRtbChzZWxlY3Rvcik7XHJcbiAgY3JlYXRlUGFyYW1ldGVyQnVmZmVyU2lkZVR5cGVIdG1sKHNlbGVjdG9yKTtcclxuICBjcmVhdGVQYXJhbWV0ZXJCdWZmZXJSYWRpdXNIdG1sKHNlbGVjdG9yKTtcclxuICBjcmVhdGVQYXJhbWV0ZXJHZW9tZXRyeTFIdG1sKHNlbGVjdG9yKTtcclxuICBjcmVhdGVQYXJhbWV0ZXJHZW9tZXRyeTJIdG1sKHNlbGVjdG9yKTtcclxuICBjcmVhdGVQYXJhbWV0ZXJPcGVyYXRvclR5cGVIdG1sKHNlbGVjdG9yKTtcclxuICBjcmVhdGVQYXJhbWV0ZXJPcGVyYXRvckNoZWNrR2VvSHRtbChzZWxlY3Rvcik7XHJcbiAgY3JlYXRlUGFyYW1ldGVyUmV0dXJuRmllbGRzQXJlYUh0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZVBhcmFtZXRlclJldHVybkZpZWxkc0xlbmd0aEh0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZVBhcmFtZXRlclRvbGVyYW5jZUh0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZVBhcmFtZXRlckNoZWNrUGFyYW1zUG9pbnRMaW1pdEh0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZVBhcmFtZXRlckNoZWNrUGFyYW1zQXJlYUxpbWl0SHRtbChzZWxlY3Rvcik7XHJcblxyXG4gIGNyZWF0ZVBhcmFtZXRlclJlc3VsdEh0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZVBhcmFtZXRlckhhbmRsZVJlc3VsdEh0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZVBhcmFtZXRlclJldHVyblJlc3VsdEJ1dHRvbkh0bWwoc2VsZWN0b3IpO1xyXG5cclxuICBjcmVhdGVQYXJhbWV0ZXJHcm91cEZpZWxkc0h0bWwoc2VsZWN0b3IpO1xyXG4gIGNyZWF0ZVBhcmFtZXRlclN1bW1hcnlGaWVsZHNIdG1sKHNlbGVjdG9yKTtcclxuICBjcmVhdGVQYXJhbWV0ZXJTdW1tYXJUeXBlc0h0bWwoc2VsZWN0b3IpO1xyXG5cclxuICBjcmVhdGVQYXJhbWV0ZXJGaWVsZHNIdG1sKHNlbGVjdG9yKTtcclxuICBjcmVhdGVQYXJhbWV0ZXJPcGVyYXRpb25TeW1ib2xzSHRtbChzZWxlY3Rvcik7XHJcbiAgY3JlYXRlUGFyYW1ldGVyRmllbGRWYWx1ZXNIdG1sKHNlbGVjdG9yKTtcclxuICBjcmVhdGVQYXJhbWV0ZXJTUUxzSHRtbChzZWxlY3Rvcik7XHJcbn1cclxuXHJcbmdsb2JhbC5pc1ZhbGlkRWxlbWVudCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIHJldHVybiAoJChzZWxlY3RvcikubGVuZ3RoID4gMCk7XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJTcmNMYXllcnNIdG1sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItc3JjLWxheWVyc1wiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1zcmMtbGF5ZXJzXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICDmupDlm77lsYJcclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+PC9kaXY+YFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJEaWZmZXJlbmNlTGF5ZXJzSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWRpZmZlcmVuY2UtbGF5ZXJzXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWRpZmZlcmVuY2UtbGF5ZXJzXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICDlt67lvILlm77lsYJcclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+PC9kaXY+YFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJPdmVybGFwTGF5ZXJzSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW92ZXJsYXAtbGF5ZXJzXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW92ZXJsYXAtbGF5ZXJzXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICDlj6Dnva7lm77lsYJcclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+PC9kaXY+YFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJEZXN0TGF5ZXJzSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWRlc3QtbGF5ZXJzXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWRlc3QtbGF5ZXJzXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgICAg55uu5qCH5Zu+5bGCXHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPjwvZGl2PlxyXG4gICAgYCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyR2VvbWV0cnkxSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW9wZXJhdG9yLWdlb21ldHJ5MVwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vcGVyYXRvci1nZW9tZXRyeTFcIikuYXBwZW5kKGBcclxuICAgICAgICA8bGFiZWw+5Yeg5L2V5a+56LGhQTwvbGFiZWw+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj48L2Rpdj5cclxuICAgIGApO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmNyZWF0ZVBhcmFtZXRlckdlb21ldHJ5Mkh0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vcGVyYXRvci1nZW9tZXRyeTJcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItb3BlcmF0b3ItZ2VvbWV0cnkyXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPuWHoOS9leWvueixoUI8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+PC9kaXY+XHJcbiAgICBgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJHZW9TUlNIdG1sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZ2VvLXNyc1wiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1nZW8tc3JzXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPua6kOWbvuW9ouepuumXtOWPguiAgzwvbGFiZWw+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtdGV4dC1hcmVhXCI+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImstdGV4dGJveFwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJQcmpIdG1sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItcHJqXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXByalwiKS5hcHBlbmQoYFxyXG4gICAgICAgIDxsYWJlbD7mupDnqbrpl7Tlj4LogIM8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLXRleHQtYXJlYVwiPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJrLXRleHRib3hcIj48L3RleHRhcmVhPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyRGVzdEdlb1NSU0h0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1kZXN0LWdlby1zcnNcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZGVzdC1nZW8tc3JzXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPuebruagh+WbvuW9ouepuumXtOWPguiAgzwvbGFiZWw+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtdGV4dC1hcmVhXCI+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImstdGV4dGJveFwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJPdXRTUlNIdG1sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItb3V0LXNyc1wiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vdXQtc3JzXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPuebruagh+epuumXtOWPguiAgzwvbGFiZWw+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2wtdGV4dC1hcmVhXCI+XHJcbiAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzcz1cImstdGV4dGJveFwiPjwvdGV4dGFyZWE+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJPdXRTUlNUeXBlSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW91dC1zcnMtdHlwZVwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vdXQtc3JzLXR5cGVcIikuYXBwZW5kKGBcclxuICAgICAgICA8bGFiZWw+55uu5qCH56m66Ze05Y+C6ICD57G75Z6LPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPjwvZGl2PlxyXG4gICAgYCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyQXJlYVNSU0h0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1hcmVhLXNyc1wiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1hcmVhLXNyc1wiKS5hcHBlbmQoYFxyXG4gICAgICAgIDxsYWJlbD7orqHnrpfpnaLnp6/miYDkvb/nlKjnmoTnqbrpl7Tlj4LogIM8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLXRleHQtYXJlYVwiPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgY2xhc3M9XCJrLXRleHRib3hcIj48L3RleHRhcmVhPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyUmV0dXJuRmllbGRzQXJlYUh0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1yZXR1cm4tZmllbGRzLWFyZWFcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItcmV0dXJuLWZpZWxkcy1hcmVhXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPui/lOWbnuWbvuW9oueahOmdouenryAo5bmz5pa557GzKTwvbGFiZWw+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJrLWlucHV0IGstdGV4dGJveFwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyUmV0dXJuRmllbGRzTGVuZ3RoSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXJldHVybi1maWVsZHMtbGVuZ3RoXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXJldHVybi1maWVsZHMtbGVuZ3RoXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPui/lOWbnuWbvuW9oueahOmVv+W6piAo57GzKTwvbGFiZWw+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3M9XCJrLWlucHV0IGstdGV4dGJveFwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyVG9sZXJhbmNlSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXRvbGVyYW5jZVwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci10b2xlcmFuY2VcIikuYXBwZW5kKGBcclxuICAgICAgICA8bGFiZWw+5a655beuICjnsbMpPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwidG9sZXJhbmNlXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJDaGVja1BhcmFtc1BvaW50TGltaXRIdG1sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZ2VvbWV0cnktY2hlY2stcGFyYW1zLXBvaW50TGltaXRcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZ2VvbWV0cnktY2hlY2stcGFyYW1zLXBvaW50TGltaXRcIikuYXBwZW5kKGBcclxuICAgICAgICA8bGFiZWw+5a655beuICjnsbMpPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJwb2ludExpbWl0XCIgdHlwZT1cIm51bWJlclwiPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgYClcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJDaGVja1BhcmFtc0FyZWFMaW1pdEh0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1nZW9tZXRyeS1jaGVjay1wYXJhbXMtYXJlYUxpbWl0XCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWdlb21ldHJ5LWNoZWNrLXBhcmFtcy1hcmVhTGltaXRcIikuYXBwZW5kKGBcclxuICAgICAgICA8bGFiZWw+5pyA5bCP6Z2i56evICjlubPmlrnnsbMpPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJhcmVhTGltaXRcIiB0eXBlPVwibnVtYmVyXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgKVxyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmNyZWF0ZVBhcmFtZXRlckdlb21ldHJ5QXR0cmlidXRlSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWdlb21ldHJ5LWF0dHJpYnV0ZVwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1nZW9tZXRyeS1hdHRyaWJ1dGVcIikuYXBwZW5kKGBcclxuICAgICAgICA8bGFiZWw+6ZyA6KaB6K6h566X55qE5bGe5oCn5Y+C5pWwPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPjwvZGl2PlxyXG4gICAgYClcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJFeHBvcnRTaHBGb3JtYXRIdG1sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZXhwb3J0c2hwLWZvcm1hdFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1leHBvcnRzaHAtZm9ybWF0XCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPui/lOWbnue7meWJjeerr+aXtueahOagvOW8jzwvbGFiZWw+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj48L2Rpdj5cclxuICAgIGApXHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyQnVmZmVyU2lkZVR5cGVIdG1sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItYnVmZmVyLXNpZGVUeXBlXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWJ1ZmZlci1zaWRlVHlwZVwiKS5hcHBlbmQoYFxyXG4gICAgICAgIDxsYWJlbD7nvJPlhrLljLrmlrnlkJE8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwic2lkZVR5cGVcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGApXHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyQnVmZmVyUmFkaXVzSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWJ1ZmZlci1yYWRpdXNcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItYnVmZmVyLXJhZGl1c1wiKS5hcHBlbmQoYFxyXG4gICAgICAgIDxsYWJlbD7nvJPlhrLljYrlvoQgKOexsyk8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XHJcbiAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwibnVtYmVyXCIgY2xhc3M9XCJyYWRpdXNcIiBtaW49XCIwXCIgbWF4PVwiMTAwMDAwMFwiPiAgXHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgKVxyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmNyZWF0ZVBhcmFtZXRlck9wZXJhdG9yVHlwZUh0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vcGVyYXRvci10eXBlXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW9wZXJhdG9yLXR5cGVcIikuYXBwZW5kKGBcclxuICAgICAgICA8bGFiZWw+5Zu+5b2i5pON5L2c57G75Z6LPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPjwvZGl2PlxyXG4gICAgYClcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJPcGVyYXRvckNoZWNrR2VvSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW9wZXJhdG9yLWNoZWNrR2VvXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW9wZXJhdG9yLWNoZWNrR2VvXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPuaYr+WQpuajgOafpeWHoOS9lTwvbGFiZWw+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj48L2Rpdj5cclxuICAgIGApXHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyUmVzdWx0SHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXJlc3VsdFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1yZXN1bHRcIikuYXBwZW5kKGBcclxuICAgICAgICA8bGFiZWw+5YiG5p6Q57uT5p6cPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbC10ZXh0LWFyZWFcIj5cclxuICAgICAgICAgICAgPHRleHRhcmVhIGNsYXNzPVwiay10ZXh0Ym94XCI+PC90ZXh0YXJlYT5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvcHlcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+5aSN5Yi2PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICBgKVxyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmNyZWF0ZVBhcmFtZXRlckhhbmRsZVJlc3VsdEh0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1oYW5kbGUtcmVzdWx0XCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWhhbmRsZS1yZXN1bHRcIikuYXBwZW5kKGBcclxuICAgICAgICA8bGFiZWw+57uT5p6c5Zu+5bGC5ZCN56ewPC9sYWJlbD5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29udHJvbFwiPlxyXG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImstaW5wdXQgay10ZXh0Ym94XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoYW5kbGUtYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwic2F2ZS1sYXllclwiPuS/neWtmOWbvuWxgjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbmNlbFwiPuaSpOmUgOWbvuWxgjwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIGApXHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyUmV0dXJuUmVzdWx0QnV0dG9uSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXJldHVybi1yZXN1bHQtYnV0dG9uXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXJldHVybi1yZXN1bHQtYnV0dG9uXCIpLmFwcGVuZChgXHJcbiAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cInJldHVybi1yZXN1bHRcIj7liIbmnpDnu5Pmnpw8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICBgKVxyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmNyZWF0ZUFuYWx5c2lzSXRlbVJ1bkh0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLmFuYWx5c2lzLWl0ZW0tcnVuXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAuYW5hbHlzaXMtaXRlbS1ydW5cIikuYXBwZW5kKGBcclxuICAgICAgICA8aHI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2wgay1wcmltYXJ5IGstYnV0dG9uXCI+6L+Q6KGM5YiG5p6QPC9kaXY+XHJcbiAgICBgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJHcm91cEZpZWxkc0h0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1ncm91cGZpZWxkc1wiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1ncm91cGZpZWxkc1wiKS5hcHBlbmQoYFxyXG4gICAgICAgIDxsYWJlbD7liIbnu4TlrZfmrrU8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+PC9kaXY+YFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJTdW1tYXJ5RmllbGRzSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXN1bW1hcnlmaWVsZHNcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItc3VtbWFyeWZpZWxkc1wiKS5hcHBlbmQoYFxyXG4gICAgICAgIDxsYWJlbD7msYfmgLvlrZfmrrU8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+PC9kaXY+YFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJTdW1tYXJUeXBlc0h0bWwgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1zdW1tYXJ5dHlwZXNcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItc3VtbWFyeXR5cGVzXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGxhYmVsPuaxh+aAu+exu+WeizwvbGFiZWw+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj48L2Rpdj5gXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuLy8g5Yid5aeL5YyW5a2X5q615L+h5oGvXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJGaWVsZHNIdG1sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZmllbGRzXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWZpZWxkc1wiKS5hcHBlbmQoYFxyXG4gICAgICAgIDxsYWJlbD7lrZfmrrXkv6Hmga88L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+PC9kaXY+YFxyXG4gICAgKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5jcmVhdGVQYXJhbWV0ZXJPcGVyYXRpb25TeW1ib2xzSHRtbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW9wZXJhdGlvbi1zeW1ib2xzXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW9wZXJhdGlvbi1zeW1ib2xzXCIpLmFwcGVuZChgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbnRyb2xcIj5cclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJlcXVhbFwiPiA9IDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImxlc3MtdGhhblwiPiA8IDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImdyZWF0ZXItdGhhblwiPiA+IDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZ3JlYXRlci1vci1lcXVhbFwiPiA+PSA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJsZXNzLW9yLWVxdWFsXCIgPiA8PSA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJncmVhdGVyLW9yLWxlc3MtYnV0dG9uXCI+IDw+IDwvYnV0dG9uPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwibGlrZVwiPiBMSUtFIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cIm9yXCI+IE9SIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImFuZFwiPiBBTkQgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PmBcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY3JlYXRlUGFyYW1ldGVyRmllbGRWYWx1ZXNIdG1sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZmllbGQtdmFsdWVzXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWZpZWxkLXZhbHVlc1wiKS5hcHBlbmQoYFxyXG4gICAgICAgIDxsYWJlbD7lrZfmrrXlgLw8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWVsZC12YWx1ZXNcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBzdHlsZT1cIndpZHRoOiA5MHB4XCI+IOiOt+WPluWUr+S4gOWAvCA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj5gXHJcbiAgICApO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmNyZWF0ZVBhcmFtZXRlclNRTHNIdG1sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItc3FsXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXNxbFwiKS5hcHBlbmQoYFxyXG4gICAgICAgIDxsYWJlbD7mn6Xor6LmnaHku7Y8L2xhYmVsPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sLXRleHQtYXJlYVwiPlxyXG4gICAgICAgICAgICA8dGV4dGFyZWEgaWQ9XCJzcWwtY29uZGl0aW9uXCIgY2xhc3M9XCJrLXRleHRib3hcIj48L3RleHRhcmVhPlxyXG4gICAgICAgIDwvZGl2PmBcclxuICAgICk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDnrKzkuozpg6jliIYg5Yid5aeL5YyW5o6n5Lu2XHJcbmdsb2JhbC5pbml0Q29udHJvbHMgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0gPSBuZXcgTWFwKCk7ICAgICAgICAgICAgICAgICAgLy8g5a2Y5pS+5o6n5Lu2XHJcblxyXG4gIGluaXRTcmNMYXllcnNDb250cm9sKHNlbGVjdG9yKTtcclxuICBpbml0RGlmZmVyZW5jZUxheWVyc0NvbnRyb2woc2VsZWN0b3IpO1xyXG4gIGluaXRPdmVybGFwTGF5ZXJzQ29udHJvbChzZWxlY3Rvcik7XHJcbiAgaW5pdERlc3RMYXllcnNDb250cm9sKHNlbGVjdG9yKTtcclxuICBpbml0UHJqQ29udHJvbChzZWxlY3Rvcik7XHJcblxyXG4gIGluaXRPcGVyYXRvckdlb21ldHJ5MUxheWVyc0NvbnRyb2woc2VsZWN0b3IpO1xyXG4gIGluaXRPcGVyYXRvckdlb21ldHJ5MkxheWVyc0NvbnRyb2woc2VsZWN0b3IpO1xyXG5cclxuICBpbml0R2VvU1JTQ29udHJvbChzZWxlY3Rvcik7XHJcbiAgaW5pdE91dFNSU0NvbnRyb2woc2VsZWN0b3IpO1xyXG4gIGluaXRPdXRTUlNUeXBlQ29udHJvbChzZWxlY3Rvcik7XHJcbiAgaW5pdERlc3RHZW9TUlNDb250cm9sKHNlbGVjdG9yKTtcclxuICBpbml0R2VvbWV0cnlBdHRyaWJ1dGVDb250cm9sKHNlbGVjdG9yKTtcclxuICBpbml0RXhwb3J0U2hwRm9ybWF0Q29udHJvbChzZWxlY3Rvcik7XHJcbiAgaW5pdE9wZXJhdG9yVHlwZUNvbnRyb2woc2VsZWN0b3IpO1xyXG4gIGluaXRPcGVyYXRvckNoZWNrR2VvQ29udHJvbChzZWxlY3Rvcik7XHJcbiAgaW5pdEJ1ZmZlclJhZGl1c0NvbnRyb2woc2VsZWN0b3IpO1xyXG4gIGluaXRSZXR1cm5GaWVsZHNBcmVhQ29udHJvbChzZWxlY3Rvcik7XHJcbiAgaW5pdFJldHVybkZpZWxkc0xlbmd0aENvbnRyb2woc2VsZWN0b3IpO1xyXG4gIGluaXRUb2xlcmFuY2VDb250cm9sKHNlbGVjdG9yKTtcclxuICBpbml0Q2hlY2tQYXJhbXNQb2ludExpbWl0Q29udHJvbChzZWxlY3Rvcik7XHJcbiAgaW5pdENoZWNrUGFyYW1zQXJlYUxpbWl0Q29udHJvbChzZWxlY3Rvcik7XHJcblxyXG4gIGluaXRSZXN1bHRDb250cm9sKHNlbGVjdG9yKTtcclxuICBpbml0SGFuZGxlUmVzdWx0Q29udHJvbChzZWxlY3Rvcik7XHJcbiAgaW5pdFJldHVyblJlc3VsdEJ1dHRvbkNvbnRyb2woc2VsZWN0b3IpO1xyXG5cclxuICBpbml0R3JvdXBGaWVsZHNDb250cm9sKHNlbGVjdG9yKTtcclxuICBpbml0U3VtbWFyeUZpZWxkc0NvbnRyb2woc2VsZWN0b3IpO1xyXG4gIGluaXRTdW1tYXJ5VHlwZXNDb250cm9sKHNlbGVjdG9yKTtcclxuXHJcbiAgaW5pdEZpZWxkc0NvbnRyb2woc2VsZWN0b3IpO1xyXG4gIGluaXRPcGVyYXRpb25TeW1ib2xzQ29udHJvbChzZWxlY3Rvcik7XHJcbiAgaW5pdEZpZWxkVmFsdWVzQ29udHJvbChzZWxlY3RvcilcclxuXHJcbiAgLy8g5a2Y5pS+6L+Q6KGM5YiG5p6Q5oyJ6ZKuXHJcbiAgYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXS5zZXQoc2VsZWN0b3IgKyBcIiBydW5cIiwgJChzZWxlY3RvciArIFwiIC5hbmFseXNpcy1pdGVtLXJ1biAuY29udHJvbFwiKSk7XHJcbn1cclxuXHJcbmdsb2JhbC5zZXRPdmVybGF5UGFuZXpJbmRleCA9IGZ1bmN0aW9uICh6SW5kZXgpIHtcclxuICBtYXBWaWV3LmdldFBhbmUoJ292ZXJsYXlQYW5lJykuc3R5bGUuekluZGV4ID0gekluZGV4O1xyXG59XHJcblxyXG5nbG9iYWwuaW5pdFNyY0xheWVyc0NvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1zcmMtbGF5ZXJzIC5jb250cm9sXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgICBsZXQgY29udHJvbCA9IF9jcmVhdGVMYXllcnNDb250cm9sKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1zcmMtbGF5ZXJzIC5jb250cm9sXCIpO1xyXG5cclxuICAgIGNvbnRyb2wuYmluZCgnZGF0YUJvdW5kJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAvLyDpmLLmraLlm77lsYLov5jmnKrmt7vliqDlrozmr5XvvIzlsLHov5vooYzmn6Xor6LvvIznu5PmnpzkuLrnqbpcclxuICAgICAgc2V0VGltZW91dChhc3luYyBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29udHJvbC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgICAgfSwgMTAwKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnRyb2wuYmluZCgnY2hhbmdlJywgYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgY29udHJvbHNNYXAgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdO1xyXG4gICAgICBsZXQgZ2VvU1JTID0gX2dldEdlb1NSU0Zyb21Db250cm9sKHNlbGVjdG9yICsgXCIgc3JjLWxheWVyc1wiKTtcclxuICAgICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZ2VvLXNycyAuay10ZXh0Ym94XCIpLmh0bWwoZ2VvU1JTKTtcclxuXHJcbiAgICAgIGlmIChpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItYnVmZmVyLXNpZGVUeXBlIC5jb250cm9sIC5zaWRlVHlwZVwiKSkge1xyXG4gICAgICAgIGNvbnRyb2xzTWFwLmdldChzZWxlY3RvciArIFwiIGJ1ZmZlclNpZGVUeXBlXCIpLnNldERhdGFTb3VyY2UoYnVmZmVyU2lkZVR5cGVEYXRhU291cmNlKHNlbGVjdG9yKSk7XHJcbiAgICAgICAgY29udHJvbHNNYXAuZ2V0KHNlbGVjdG9yICsgXCIgYnVmZmVyU2lkZVR5cGVcIikudmFsdWUoYnVmZmVyU2lkZVR5cGVEYXRhU291cmNlKHNlbGVjdG9yKVswXSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIOWhq+WFheWIhue7hOWtl+auteWSjOaxh+aAu+Wtl+autVxyXG4gICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWdyb3VwZmllbGRzIC5jb250cm9sXCIpICYmIGlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1zdW1tYXJ5ZmllbGRzIC5jb250cm9sXCIpKSB7XHJcbiAgICAgICAgYXdhaXQgZmlsbEdyb3VwRmllbGRzQW5kU3VtbWFyeUZpZWxkcyhzZWxlY3Rvcik7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIOWhq+WFheafpeivouWtl+autVxyXG4gICAgICBpZiAoaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWZpZWxkcyAuY29udHJvbFwiKSkge1xyXG4gICAgICAgIGF3YWl0IGZpbGxRdWVyeUZpZWxkcyhzZWxlY3Rvcik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgc3JjLWxheWVyc1wiLCBjb250cm9sKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOWhq+WFheWIhue7hOWtl+auteS4juaxh+aAu+Wtl+autVxyXG5nbG9iYWwuZmlsbEdyb3VwRmllbGRzQW5kU3VtbWFyeUZpZWxkcyA9IGFzeW5jIGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGxldCBjb250cm9sc01hcCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKS5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl07XHJcbiAgbGV0IGZpZWxkcyA9IGF3YWl0IGdldEZpZWxkc0Zyb21MYXllcihzZWxlY3RvciwgdHJ1ZSk7XHJcblxyXG4gIGlmIChmaWVsZHMpIHtcclxuICAgIGxldCBncm91cGZpZWxkcyA9IFtdO1xyXG4gICAgbGV0IHN1bW1hcnlmaWVsZHMgPSBbXTtcclxuXHJcbiAgICBmaWVsZHMuZ3JvdXBmaWVsZHMuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICBncm91cGZpZWxkcy5wdXNoKHtuYW1lOiBpdGVtLm5hbWUsIHZhbHVlOiBpdGVtLm5hbWV9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZpZWxkcy5zdW1tYXJ5ZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgc3VtbWFyeWZpZWxkcy5wdXNoKHtuYW1lOiBpdGVtLm5hbWUsIHZhbHVlOiBpdGVtLm5hbWV9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOaxh+aAu+Wtl+auteS4reWKoOS4iumdouenr+WSjOmVv+W6plxyXG4gICAgc3VtbWFyeWZpZWxkcy5wdXNoKHtuYW1lOiBcIumdouenr1wiLCB2YWx1ZTogXCIkYXJlYSRcIn0pO1xyXG4gICAgc3VtbWFyeWZpZWxkcy5wdXNoKHtuYW1lOiBcIumVv+W6plwiLCB2YWx1ZTogXCIkbGVuZ3RoJFwifSk7XHJcblxyXG4gICAgbGV0IGdyb3VwRmllbGRzQ29udHJvbCA9IGNvbnRyb2xzTWFwLmdldChzZWxlY3RvciArIFwiIGdyb3VwZmllbGRzXCIpO1xyXG4gICAgZ3JvdXBGaWVsZHNDb250cm9sLnNldERhdGFTb3VyY2UoZ3JvdXBmaWVsZHMpO1xyXG4gICAgZ3JvdXBGaWVsZHNDb250cm9sLnNlbGVjdCgwKTtcclxuXHJcbiAgICBsZXQgc3VtbWFyeUZpZWxkc0NvbnRyb2wgPSBjb250cm9sc01hcC5nZXQoc2VsZWN0b3IgKyBcIiBzdW1tYXJ5ZmllbGRzXCIpO1xyXG4gICAgc3VtbWFyeUZpZWxkc0NvbnRyb2wuc2V0RGF0YVNvdXJjZShzdW1tYXJ5ZmllbGRzKTtcclxuICAgIHN1bW1hcnlGaWVsZHNDb250cm9sLnNlbGVjdCgwKTtcclxuICB9IGVsc2Uge1xyXG4gICAgY29udHJvbHNNYXAuZ2V0KHNlbGVjdG9yICsgXCIgZ3JvdXBmaWVsZHNcIikuc2V0RGF0YVNvdXJjZShbXSk7XHJcbiAgICBjb250cm9sc01hcC5nZXQoc2VsZWN0b3IgKyBcIiBzdW1tYXJ5ZmllbGRzXCIpLnNldERhdGFTb3VyY2UoW10pO1xyXG4gIH1cclxufVxyXG5cclxuLy8g5aGr5YWF5p+l6K+i5a2X5q61XHJcbmdsb2JhbC5maWxsUXVlcnlGaWVsZHMgPSBhc3luYyBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBsZXQgY29udHJvbHNNYXAgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdO1xyXG4gIGxldCBxdWVyeUZpZWxkcyA9IGF3YWl0IGdldFF1ZXJ5RmllbGRzKHNlbGVjdG9yKTtcclxuICBsZXQgZmllbGRzQ29udHJvbCA9IGNvbnRyb2xzTWFwLmdldChzZWxlY3RvciArIFwiIGZpZWxkc1wiKTtcclxuXHJcbiAgZmllbGRzQ29udHJvbC5zZXREYXRhU291cmNlKG5ldyBrZW5kby5kYXRhLkRhdGFTb3VyY2Uoe2RhdGE6IHF1ZXJ5RmllbGRzfSkpO1xyXG4gIGZpZWxkc0NvbnRyb2wuc2VsZWN0KGZpZWxkc0NvbnRyb2wuZWxlbWVudC5jaGlsZHJlbigpLmZpcnN0KCkpO1xyXG59XHJcblxyXG4vLyDov5Tlm57mn6Xor6LlrZfmrrVcclxuZ2xvYmFsLmdldFF1ZXJ5RmllbGRzID0gYXN5bmMgZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgbGV0IGRhdGEgPSBbXTtcclxuXHJcbiAgaWYgKGlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1maWVsZHMgLmNvbnRyb2xcIikpIHtcclxuICAgIGxldCByZXN1bHQgPSBhd2FpdCBnZXRGaWVsZHNGcm9tTGF5ZXIoc2VsZWN0b3IsIGZhbHNlKTtcclxuXHJcbiAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgIGxldCBmaWVsZHMgPSByZXN1bHQuZmllbGRzO1xyXG5cclxuICAgICAgZmllbGRzLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICBkYXRhLnB1c2goe25hbWU6IGl0ZW0ubmFtZX0pO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5nbG9iYWwuaW5pdERpZmZlcmVuY2VMYXllcnNDb250cm9sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZGlmZmVyZW5jZS1sYXllcnMgLmNvbnRyb2xcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGxldCBjb250cm9sID0gX2NyZWF0ZUxheWVyc0NvbnRyb2woc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWRpZmZlcmVuY2UtbGF5ZXJzIC5jb250cm9sXCIpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgZGlmZmVyZW5jZS1sYXllcnNcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdE92ZXJsYXBMYXllcnNDb250cm9sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItb3ZlcmxhcC1sYXllcnMgLmNvbnRyb2xcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGxldCBjb250cm9sID0gX2NyZWF0ZUxheWVyc0NvbnRyb2woc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW92ZXJsYXAtbGF5ZXJzIC5jb250cm9sXCIpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgb3ZlcmxhcC1sYXllcnNcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdERlc3RMYXllcnNDb250cm9sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZGVzdC1sYXllcnMgLmNvbnRyb2xcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGxldCBjb250cm9sID0gX2NyZWF0ZUxheWVyc0NvbnRyb2woc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWRlc3QtbGF5ZXJzIC5jb250cm9sXCIpO1xyXG5cclxuICAgIGNvbnRyb2wuYmluZCgnY2hhbmdlJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgZ2VvU1JTID0gX2dldEdlb1NSU0Zyb21Db250cm9sKHNlbGVjdG9yICsgXCIgZGVzdC1sYXllcnNcIik7XHJcbiAgICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWRlc3QtZ2VvLXNycyAuay10ZXh0Ym94XCIpLmh0bWwoZ2VvU1JTKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgZGVzdC1sYXllcnNcIiwgY29udHJvbCk7XHJcbiAgfVxyXG5cclxufVxyXG5cclxuZ2xvYmFsLmluaXRPcGVyYXRvckdlb21ldHJ5MUxheWVyc0NvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vcGVyYXRvci1nZW9tZXRyeTEgLmNvbnRyb2xcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGxldCBjb250cm9sID0gX2NyZWF0ZUxheWVyc0NvbnRyb2woc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW9wZXJhdG9yLWdlb21ldHJ5MSAuY29udHJvbFwiKTtcclxuXHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIGdlb21ldHJ5MS1sYXllcnNcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdE9wZXJhdG9yR2VvbWV0cnkyTGF5ZXJzQ29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW9wZXJhdG9yLWdlb21ldHJ5MiAuY29udHJvbFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gICAgbGV0IGNvbnRyb2wgPSBfY3JlYXRlTGF5ZXJzQ29udHJvbChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItb3BlcmF0b3ItZ2VvbWV0cnkyIC5jb250cm9sXCIpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgZ2VvbWV0cnkyLWxheWVyc1wiLCBjb250cm9sKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5fY3JlYXRlTGF5ZXJzQ29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGxldCBkYXRhU291cmNlID0gS1EuQnVpbGRlci5CdWlsZGVyQ29tbW9uLmxheWVyc0NvbnRyb2xEYXRhU291cmNlKCk7XHJcblxyXG4gIHJldHVybiAkKHNlbGVjdG9yKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICBkYXRhVGV4dEZpZWxkOiBcIm5hbWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICBkYXRhU291cmNlOiBkYXRhU291cmNlLFxyXG4gICAgaW5kZXg6IDAsXHJcbiAgfSkuZGF0YSgna2VuZG9Ecm9wRG93bkxpc3QnKTtcclxufVxyXG5cclxuZ2xvYmFsLl9nZXRHZW9TUlNGcm9tQ29udHJvbCA9IGZ1bmN0aW9uIChjb250cm9sKSB7XHJcbiAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICBsZXQgc2VsZWN0b3IgPSBidWlsZFByb2plY3Quc2V0dGluZy5hbmFseXNpc0N1cnJlbnRQYWdlO1xyXG4gIGxldCBjb250cm9sc01hcCA9IGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl07XHJcbiAgbGV0IGxheWVyc0NvbnRyb2wgPSBjb250cm9sc01hcC5nZXQoY29udHJvbCk7XHJcbiAgbGV0IGxheWVyRmVhdHVyZUNvbGxlY3Rpb24gPSBLUS5CdWlsZGVyLkJ1aWxkZXJMYXllckRhdGFzLmdldEluc3RhbmNlKCkuZ2V0RGF0YShsYXllcnNDb250cm9sLnZhbHVlKCkpO1xyXG5cclxuICByZXR1cm4gS1EuQnVpbGRlci5CdWlsZGVyQ29tbW9uLmdldEdlb1NSU0Zyb21HZW9qc29uKGxheWVyRmVhdHVyZUNvbGxlY3Rpb24pO1xyXG59XHJcblxyXG5nbG9iYWwuaW5pdEdlb1NSU0NvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1nZW8tc3JzIC5rLXRleHRib3hcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGxldCBnZW9TUlMgPSBfZ2V0R2VvU1JTRnJvbUNvbnRyb2woc2VsZWN0b3IgKyBcIiBzcmMtbGF5ZXJzXCIpO1xyXG5cclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWdlby1zcnMgLmstdGV4dGJveFwiKS5odG1sKGdlb1NSUyk7XHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIGdlb1NSU1wiLCAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1nZW8tc3JzIC5rLXRleHRib3hcIikpO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmluaXRQcmpDb250cm9sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItcHJqIC5rLXRleHRib3hcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXByaiAuay10ZXh0Ym94XCIpLmh0bWwoXCJFUFNHOjQzMjZcIik7XHJcblxyXG4gICAgYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXS5zZXQoc2VsZWN0b3IgKyBcIiBwcmpcIiwgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItcHJqIC5rLXRleHRib3hcIikpO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmluaXREZXN0R2VvU1JTQ29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWRlc3QtZ2VvLXNycyAuay10ZXh0Ym94XCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgICBsZXQgZ2VvU1JTID0gX2dldEdlb1NSU0Zyb21Db250cm9sKHNlbGVjdG9yICsgXCIgZGVzdC1sYXllcnNcIik7XHJcblxyXG4gICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZGVzdC1nZW8tc3JzIC5rLXRleHRib3hcIikuaHRtbChnZW9TUlMpO1xyXG4gICAgYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXS5zZXQoc2VsZWN0b3IgKyBcIiBkZXN0R2VvU1JTXCIsICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWRlc3QtZ2VvLXNycyAuay10ZXh0Ym94XCIpKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5pbml0T3V0U1JTQ29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW91dC1zcnMgLmstdGV4dGJveFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItb3V0LXNycyAuay10ZXh0Ym94XCIpLmh0bWwoJ0VQU0c6NDMyNicpO1xyXG4gICAgYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXS5zZXQoc2VsZWN0b3IgKyBcIiBvdXRTUlNcIiwgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItb3V0LXNycyAuay10ZXh0Ym94XCIpKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5pbml0T3V0U1JTVHlwZUNvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vdXQtc3JzLXR5cGUgLmNvbnRyb2xcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGxldCBkYXRhU291cmNlID0gWydwcm9qNCcsICdlcHNnJywgJ3drdCcsICdlc3JpJ107XHJcblxyXG4gICAgbGV0IGNvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vdXQtc3JzLXR5cGUgLmNvbnRyb2xcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgICBkYXRhU291cmNlOiBkYXRhU291cmNlLFxyXG4gICAgfSkuZGF0YSgna2VuZG9Ecm9wRG93bkxpc3QnKTtcclxuXHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIG91dFNSU1R5cGVcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdEdlb21ldHJ5QXR0cmlidXRlQ29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWdlb21ldHJ5LWF0dHJpYnV0ZSAuY29udHJvbFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gICAgbGV0IGRhdGFTb3VyY2UgPSBbXHJcbiAgICAgIHt0ZXh0OiAn6Z2i56evJywgdmFsdWU6ICdhcmVhJ30sXHJcbiAgICAgIHt0ZXh0OiAn6ZW/5bqmJywgdmFsdWU6ICdsZW5ndGgnfSxcclxuICAgICAge3RleHQ6ICfkuK3lv4PngrknLCB2YWx1ZTogJ2NlbnRlcid9LFxyXG4gICAgICB7dGV4dDogJ+WkluaOpeefqeW9oicsIHZhbHVlOiAnYm91bmQnfSxcclxuICAgIF07XHJcblxyXG4gICAgbGV0IGNvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1nZW9tZXRyeS1hdHRyaWJ1dGUgLmNvbnRyb2xcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgICBkYXRhVGV4dEZpZWxkOiBcInRleHRcIixcclxuICAgICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgICAgZGF0YVNvdXJjZTogZGF0YVNvdXJjZSxcclxuICAgICAgaW5kZXg6IDAsXHJcbiAgICAgIHZhbHVlOiBkYXRhU291cmNlWzBdXHJcbiAgICB9KS5kYXRhKCdrZW5kb0Ryb3BEb3duTGlzdCcpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgZ2VvbWV0cnlBdHRyaWJ1dGVcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdEV4cG9ydFNocEZvcm1hdENvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1leHBvcnRzaHAtZm9ybWF0IC5jb250cm9sXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgICBsZXQgZGF0YVNvdXJjZSA9IFsnZmlsZXN0cmVhbSddO1xyXG5cclxuICAgIGxldCBjb250cm9sID0gJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZXhwb3J0c2hwLWZvcm1hdCAuY29udHJvbFwiKS5rZW5kb011bHRpU2VsZWN0KHtcclxuICAgICAgZGF0YVNvdXJjZTogZGF0YVNvdXJjZSxcclxuICAgIH0pLmRhdGEoJ2tlbmRvTXVsdGlTZWxlY3QnKTtcclxuXHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIGV4cG9ydFNocEZvcm1hdFwiLCBjb250cm9sKTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGJ1ZmZlclNpZGVUeXBlRGF0YVNvdXJjZShzZWxlY3Rvcikge1xyXG4gIGxldCBkYXRhU291cmNlO1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IGNvbnRyb2xzTWFwID0gYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXTtcclxuICBsZXQgbGF5ZXJzQ29udHJvbCA9IGNvbnRyb2xzTWFwLmdldChzZWxlY3RvciArIFwiIHNyYy1sYXllcnNcIik7XHJcbiAgaWYgKGxheWVyc0NvbnRyb2wudmFsdWUoKSA9PT0gJycpIHtcclxuICAgIGRhdGFTb3VyY2UgPSBbJ2JvdGgnXVxyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgbGF5ZXJGZWF0dXJlQ29sbGVjdGlvbiA9IEtRLkJ1aWxkZXIuQnVpbGRlckxheWVyRGF0YXMuZ2V0SW5zdGFuY2UoKS5nZXREYXRhKGxheWVyc0NvbnRyb2wgJiYgbGF5ZXJzQ29udHJvbC52YWx1ZSgpKTtcclxuICAgIGlmIChsYXllckZlYXR1cmVDb2xsZWN0aW9uID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgZGF0YVNvdXJjZSA9IFtdXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBsZXQgZGF0YSA9IEtRLkNvbW1vbi5Db21tb25Ub29scy5nZXRHZW9tRnJvbUZlYXR1cmVDb2xsZWN0aW9uKGxheWVyRmVhdHVyZUNvbGxlY3Rpb24pO1xyXG4gICAgICBpZiAoZGF0YS5nZW9tZXRyaWVzWzBdLnR5cGUgPT09IFwiUG9pbnRcIikge1xyXG4gICAgICAgIGRhdGFTb3VyY2UgPSBbJ291dGVyJywgJ2xlZnQnLCAnYm90aCddXHJcbiAgICAgIH0gZWxzZSBpZiAoZGF0YS5nZW9tZXRyaWVzWzBdLnR5cGUgPT09IFwiTGluZVN0cmluZ1wiKSB7XHJcbiAgICAgICAgZGF0YVNvdXJjZSA9IFsnbGVmdCcsICdyaWdodCcsICdib3RoJ11cclxuICAgICAgfSBlbHNlIGlmIChkYXRhLmdlb21ldHJpZXNbMF0udHlwZSA9PT0gXCJQb2x5Z29uXCIgfHwgXCJNdWx0aVBvbHlnb25cIikge1xyXG4gICAgICAgIGRhdGFTb3VyY2UgPSBbJ2lubmVyJywgJ291dGVyJywgJ2JvdGgnXVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRhdGFTb3VyY2UgPSBbJ2JvdGgnXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBkYXRhU291cmNlO1xyXG59XHJcblxyXG5nbG9iYWwuaW5pdEJ1ZmZlclNpZGVUeXBlQ29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWJ1ZmZlci1zaWRlVHlwZSAuY29udHJvbCAuc2lkZVR5cGVcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGxldCBjb250cm9sID0gJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItYnVmZmVyLXNpZGVUeXBlIC5jb250cm9sIC5zaWRlVHlwZVwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICAgIGRhdGFTb3VyY2U6IGJ1ZmZlclNpZGVUeXBlRGF0YVNvdXJjZShzZWxlY3RvciksXHJcbiAgICAgIHZhbHVlOiBidWZmZXJTaWRlVHlwZURhdGFTb3VyY2Uoc2VsZWN0b3IpWzBdXHJcbiAgICB9KS5kYXRhKCdrZW5kb0Ryb3BEb3duTGlzdCcpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgYnVmZmVyU2lkZVR5cGVcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdE9wZXJhdG9yVHlwZUNvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vcGVyYXRvci10eXBlIC5jb250cm9sXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgICBsZXQgZGF0YVNvdXJjZSA9IFsnaW50ZXJzZWN0JywgJ2VxdWFscycsICdkaXNqb2ludCcsICd0b3VjaGVzJywgJ2Nyb3NzZXMnLCAnd2l0aGluJywgJ2NvbnRhaW5zJywgJ292ZXJsYXBzJ107XHJcblxyXG4gICAgbGV0IGNvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vcGVyYXRvci10eXBlIC5jb250cm9sXCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgICAgZGF0YVNvdXJjZTogZGF0YVNvdXJjZSxcclxuICAgIH0pLmRhdGEoJ2tlbmRvRHJvcERvd25MaXN0Jyk7XHJcblxyXG4gICAgYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXS5zZXQoc2VsZWN0b3IgKyBcIiBvcGVyYXRvclR5cGVcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdE9wZXJhdG9yQ2hlY2tHZW9Db250cm9sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItb3BlcmF0b3ItY2hlY2tHZW8gLmNvbnRyb2xcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGxldCBkYXRhU291cmNlID0gWyd0cnVlJywgJ2ZhbHNlJ107XHJcblxyXG4gICAgbGV0IGNvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vcGVyYXRvci1jaGVja0dlbyAuY29udHJvbFwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICAgIGRhdGFTb3VyY2U6IGRhdGFTb3VyY2UsXHJcbiAgICB9KS5kYXRhKCdrZW5kb0Ryb3BEb3duTGlzdCcpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgb3BlcmF0b3JDaGVja0dlb1wiLCBjb250cm9sKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5pbml0Q2hlY2tQYXJhbXNQb2ludExpbWl0Q29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWdlb21ldHJ5LWNoZWNrLXBhcmFtcy1wb2ludExpbWl0IC5jb250cm9sIC5wb2ludExpbWl0XCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgbGV0IEFyZWFMaW1pdGNvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1nZW9tZXRyeS1jaGVjay1wYXJhbXMtcG9pbnRMaW1pdCAuY29udHJvbCAucG9pbnRMaW1pdFwiKS5rZW5kb051bWVyaWNUZXh0Qm94KHtcclxuICAgICAgdmFsdWU6IDBcclxuICAgIH0pLmRhdGEoJ2tlbmRvTnVtZXJpY1RleHRCb3gnKTtcclxuXHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIHBvaW50TGltaXRcIiwgQXJlYUxpbWl0Y29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdENoZWNrUGFyYW1zQXJlYUxpbWl0Q29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWdlb21ldHJ5LWNoZWNrLXBhcmFtcy1hcmVhTGltaXQgLmNvbnRyb2wgLmFyZWFMaW1pdFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGxldCBBcmVhTGltaXRjb250cm9sID0gJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZ2VvbWV0cnktY2hlY2stcGFyYW1zLWFyZWFMaW1pdCAuY29udHJvbCAuYXJlYUxpbWl0XCIpLmtlbmRvTnVtZXJpY1RleHRCb3goe1xyXG4gICAgICB2YWx1ZTogMFxyXG4gICAgfSkuZGF0YSgna2VuZG9OdW1lcmljVGV4dEJveCcpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgYXJlYUxpbWl0XCIsIEFyZWFMaW1pdGNvbnRyb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmluaXRCdWZmZXJSYWRpdXNDb250cm9sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItYnVmZmVyLXJhZGl1cyAuY29udHJvbCAucmFkaXVzXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgbGV0IGNvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1idWZmZXItcmFkaXVzIC5jb250cm9sIC5yYWRpdXNcIikua2VuZG9OdW1lcmljVGV4dEJveCh7XHJcbiAgICAgIHZhbHVlOiAxXHJcbiAgICB9KS5kYXRhKCdrZW5kb051bWVyaWNUZXh0Qm94Jyk7XHJcblxyXG4gICAgYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXS5zZXQoc2VsZWN0b3IgKyBcIiBidWZmZXJSYWRpdXNcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdFJlc3VsdENvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1yZXN1bHQgLmstdGV4dGJveFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGxldCByZXN1bHRDb250cm9sID0gJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItcmVzdWx0IC5rLXRleHRib3hcIik7XHJcbiAgICBsZXQgY29weUNvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1yZXN1bHQgLmNvcHlcIik7XHJcblxyXG4gICAgYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXS5zZXQoc2VsZWN0b3IgKyBcIiByZXN1bHRcIiwgcmVzdWx0Q29udHJvbCk7XHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIGNvcHlcIiwgY29weUNvbnRyb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmluaXRIYW5kbGVSZXN1bHRDb250cm9sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItaGFuZGxlLXJlc3VsdCAuY29udHJvbFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGxldCBpbnB1dENvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1oYW5kbGUtcmVzdWx0IC5jb250cm9sIC5rLWlucHV0LmstdGV4dGJveFwiKTtcclxuICAgIGxldCBzYXZlTGF5ZXJDb250cm9sID0gJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItaGFuZGxlLXJlc3VsdCAuY29udHJvbCAuc2F2ZS1sYXllclwiKS5rZW5kb0J1dHRvbih7XHJcbiAgICAgIGVuYWJsZTogZmFsc2VcclxuICAgIH0pLmRhdGEoJ2tlbmRvQnV0dG9uJyk7XHJcblxyXG4gICAgbGV0IGNhbmNlbENvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1oYW5kbGUtcmVzdWx0IC5jb250cm9sIC5jYW5jZWxcIikua2VuZG9CdXR0b24oe1xyXG4gICAgICBlbmFibGU6IGZhbHNlXHJcbiAgICB9KS5kYXRhKCdrZW5kb0J1dHRvbicpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgcmVzdWx0TGF5ZXJOYW1lXCIsIGlucHV0Q29udHJvbCk7XHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIHNhdmVMYXllclwiLCBzYXZlTGF5ZXJDb250cm9sKTtcclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgY2FuY2VsXCIsIGNhbmNlbENvbnRyb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLnNhdmVMYXllciA9IGFzeW5jIGZ1bmN0aW9uIChmaWxlTmFtZSwgZ2VvSlNPTikge1xyXG4gIC8vIOesrOS4gOatpSDkuIrkvKBKU09O5pWw5o2u5Yiw5pyN5Yqh5ZmoXHJcbiAgbGV0IG8gPSB7XHJcbiAgICBjb250ZW50SnNvbjogZ2VvSlNPTi50b0dlb0pTT04oKSxcclxuICAgIGZpbGVOYW1lOiBmaWxlTmFtZSxcclxuICAgIGZpbGVUeXBlOiBcImdlb2pzb25cIixcclxuICB9O1xyXG5cclxuICBsZXQgcmVzID0gYXdhaXQgS1EuQ29tbW9uLk5ldHdvcmtUb29scy51cGxvYWRKc29uVG9GaWxlU2VydmVyKG8pO1xyXG5cclxuICBpZiAocmVzLnJlc3VsdCA9PSBcImVycm9yXCIpIHtcclxuICAgIEtRLkNvbnRyb2wuTm90aWZpY2F0aW9uLmdldEluc3RhbmNlKCkuc2hvd0Vycm9yKFwi5L+d5a2Y5Zu+5bGC5aSx6LSl77yBXCIpO1xyXG4gICAgcmV0dXJuO1xyXG4gIH1cclxuXHJcbiAgLy8g57uE57uH5Zu+5bGC5L+h5oGvXHJcbiAgbGV0IGRhdGFTb3VyY2VJbmZvID0ge1xyXG4gICAgdHlwZTogXCJTVEFUSUNfREFUQVwiLFxyXG4gICAgdXJsOiByZXMuZG93bmxvYWRQYXRoLFxyXG4gICAgbmFtZTogZmlsZU5hbWUsXHJcbiAgfTtcclxuXHJcbiAgLy8g5Yqg6L295Zu+5bGCXHJcbiAgbGV0IGxheWVyID0gYXdhaXQgS1EuQnVpbGRlci5CdWlsZGVyQ29tbW9uLmFkZE5ld0xheWVyKGRhdGFTb3VyY2VJbmZvKTtcclxuICBsZXQgcmVuZGVyID0gbGF5ZXIuZ2V0UmVuZGVyKCk7XHJcblxyXG4gIC8vIOe7hOe7h29wdGlvbnNcclxuICBsZXQgb3B0aW9ucyA9IEwuZXh0ZW5kKHJlbmRlci5vcHRpb25zLCB7XHJcbiAgICBmaWxsQ29sb3I6IFwicmVkXCIsXHJcbiAgICBmaWxsT3BhY2l0eTogMC4yLFxyXG4gICAgbGluZUNvbG9yOiBcInJlZFwiLFxyXG4gICAgbGluZVdpZHRoOiAzLFxyXG4gIH0pO1xyXG5cclxuICAvLyDliKDpmaTljp/lm77lsYLjgIHmuLLmn5PmlrDlm77lsYJcclxuICBnZW9KU09OLnJlbW92ZSgpO1xyXG4gIHJlbmRlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xyXG5cclxuICBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkuc2lkZXJiYXIub3BlbihcImxheWVyc1wiKTtcclxuICBLUS5EYXRhLkRhdGFNYW5hZ2VyLmdldEluc3RhbmNlKCkuYWRkV2ViRmlsZURhdGFTb3VyY2VJbmZvKGRhdGFTb3VyY2VJbmZvKTtcclxufVxyXG5cclxuZ2xvYmFsLnJlZnJlc2hCdXR0b25TdGF0ZSA9IGZ1bmN0aW9uIChzZWxlY3RvciwgYnV0dG9uU3RhdGUpIHtcclxuICBsZXQgY29udHJvbHNNYXAgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdO1xyXG5cclxuICBpZiAoYnV0dG9uU3RhdGUuc2F2ZUxheWVyQnV0dG9uT3BlbiA9PT0gJ3NhdmVMYXllckJ1dHRvbk9wZW4nKSB7XHJcbiAgICBjb250cm9sc01hcC5nZXQoc2VsZWN0b3IgKyBcIiBzYXZlTGF5ZXJcIikuZW5hYmxlKHRydWUpO1xyXG4gIH1cclxuICBpZiAoYnV0dG9uU3RhdGUuY2FuY2VsTGF5ZXJCdXR0b25PcGVuID09PSAnY2FuY2VsTGF5ZXJCdXR0b25PcGVuJykge1xyXG4gICAgY29udHJvbHNNYXAuZ2V0KHNlbGVjdG9yICsgXCIgY2FuY2VsXCIpLmVuYWJsZSh0cnVlKTtcclxuICB9XHJcbiAgaWYgKGJ1dHRvblN0YXRlLnNhdmVMYXllckJ1dHRvbkNsb3NlID09PSAnc2F2ZUxheWVyQnV0dG9uQ2xvc2UnKSB7XHJcbiAgICBjb250cm9sc01hcC5nZXQoc2VsZWN0b3IgKyBcIiBzYXZlTGF5ZXJcIikuZW5hYmxlKGZhbHNlKTtcclxuICB9XHJcbiAgaWYgKGJ1dHRvblN0YXRlLmNhbmNlbExheWVyQnV0dG9uQ2xvc2UgPT09ICdjYW5jZWxMYXllckJ1dHRvbkNsb3NlJykge1xyXG4gICAgY29udHJvbHNNYXAuZ2V0KHNlbGVjdG9yICsgXCIgY2FuY2VsXCIpLmVuYWJsZShmYWxzZSk7XHJcbiAgfVxyXG4gIGlmIChidXR0b25TdGF0ZS5yZXR1cm5SZXN1bHRCdXR0b25PcGVuID09PSAncmV0dXJuUmVzdWx0QnV0dG9uT3BlbicpIHtcclxuICAgIGNvbnRyb2xzTWFwLmdldChzZWxlY3RvciArIFwiIHJldHVyblJlc3VsdEJ1dHRvblwiKS5lbmFibGUodHJ1ZSk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdFJldHVybkZpZWxkc0FyZWFDb250cm9sID0gZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgaWYgKCFpc1ZhbGlkRWxlbWVudChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItcmV0dXJuLWZpZWxkcy1hcmVhIC5jb250cm9sIC5rLWlucHV0LmstdGV4dGJveFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGxldCBjb250cm9sID0gJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItcmV0dXJuLWZpZWxkcy1hcmVhIC5jb250cm9sIC5rLWlucHV0LmstdGV4dGJveFwiKTtcclxuXHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIHJldHVybkZpZWxkc0FyZWFcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdFJldHVybkZpZWxkc0xlbmd0aENvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1yZXR1cm4tZmllbGRzLWxlbmd0aCAuY29udHJvbCAuay1pbnB1dC5rLXRleHRib3hcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICBsZXQgY29udHJvbCA9ICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXJldHVybi1maWVsZHMtbGVuZ3RoIC5jb250cm9sIC5rLWlucHV0LmstdGV4dGJveFwiKTtcclxuXHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIHJldHVybkZpZWxkc0xlbmd0aFwiLCBjb250cm9sKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5pbml0VG9sZXJhbmNlQ29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXRvbGVyYW5jZSAuY29udHJvbCAudG9sZXJhbmNlXCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgbGV0IGNvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci10b2xlcmFuY2UgLmNvbnRyb2wgLnRvbGVyYW5jZVwiKS5rZW5kb051bWVyaWNUZXh0Qm94KHtcclxuICAgICAgdmFsdWU6IDAsXHJcbiAgICAgIC8vIGRlY2ltYWxzOiA4LFxyXG4gICAgICAvLyBmb3JtYXQ6ICd7MDpuOH0nLFxyXG4gICAgfSkuZGF0YSgna2VuZG9OdW1lcmljVGV4dEJveCcpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgdG9sZXJhbmNlXCIsIGNvbnRyb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLnJldHVybkZpZWxkcyA9IGZ1bmN0aW9uIChzZWxlY3RvciwgZGF0YSwgZmllbGRzKSB7XHJcbiAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICBsZXQgY29udHJvbHNNYXAgPSBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdO1xyXG5cclxuICBpZiAoZmllbGRzID09PSAnYXJlYScpIHtcclxuICAgIC8vIOW+l+WIsOi+k+WHuuWbvuW9oueahOmdouenr1xyXG4gICAgbGV0IHJldHVybkZpZWxkc0FyZWFDb250cm9sID0gY29udHJvbHNNYXAuZ2V0KHNlbGVjdG9yICsgXCIgcmV0dXJuRmllbGRzQXJlYVwiKTtcclxuICAgIGlmIChkYXRhLnR5cGUgPT09ICdHZW9tZXRyeUNvbGxlY3Rpb24nKSB7XHJcbiAgICAgIGxldCBhcmVhID0gMDtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmdlb21ldHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZGF0YS5nZW9tZXRyaWVzW2ldLkFyZWEgPT0gbnVsbCkge1xyXG4gICAgICAgICAgZGF0YS5nZW9tZXRyaWVzW2ldLkFyZWEgPSAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBhcmVhICs9IGRhdGEuZ2VvbWV0cmllc1tpXS5BcmVhO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybkZpZWxkc0FyZWFDb250cm9sLnZhbChhcmVhLnRvRml4ZWQoNCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuRmllbGRzQXJlYUNvbnRyb2wudmFsKGRhdGEuQXJlYS50b0ZpeGVkKDQpKTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGZpZWxkcyA9PT0gJ2xlbmd0aCcpIHtcclxuICAgIC8vIOW+l+WIsOi+k+WHuuWbvuW9oueahOmVv+W6plxyXG4gICAgbGV0IHJldHVybkZpZWxkc0xlbmd0aENvbnRyb2wgPSBjb250cm9sc01hcC5nZXQoc2VsZWN0b3IgKyBcIiByZXR1cm5GaWVsZHNMZW5ndGhcIik7XHJcbiAgICBpZiAoZGF0YS50eXBlID09PSAnR2VvbWV0cnlDb2xsZWN0aW9uJykge1xyXG4gICAgICBsZXQgbGVuZ3RoID0gMDtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmdlb21ldHJpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICBpZiAoZGF0YS5nZW9tZXRyaWVzW2ldLkxlbmd0aCA9PSBudWxsKSB7XHJcbiAgICAgICAgICBkYXRhLmdlb21ldHJpZXNbaV0uTGVuZ3RoID0gMDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGVuZ3RoICs9IGRhdGEuZ2VvbWV0cmllc1tpXS5MZW5ndGg7XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuRmllbGRzTGVuZ3RoQ29udHJvbC52YWwobGVuZ3RoLnRvRml4ZWQoNCkpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuRmllbGRzTGVuZ3RoQ29udHJvbC52YWwoZGF0YS5MZW5ndGgudG9GaXhlZCg0KSk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuY29weVJlc3VsdCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IGNvbnRyb2xzTWFwID0gYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXTtcclxuICBsZXQgY29weUNvbnRyb2wgPSBjb250cm9sc01hcC5nZXQoc2VsZWN0b3IgKyBcIiBjb3B5XCIpO1xyXG4gIGxldCByZXN1bHRDb250cm9sID0gJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItcmVzdWx0IC5jb250cm9sLXRleHQtYXJlYVwiKTtcclxuICBsZXQgcmVzdWx0VGV4dCA9IGNvbnRyb2xzTWFwLmdldChzZWxlY3RvciArIFwiIHJlc3VsdFwiKTtcclxuXHJcbiAgcmVzdWx0Q29udHJvbC5tb3VzZWVudGVyKGZ1bmN0aW9uICgpIHtcclxuICAgIGNvcHlDb250cm9sLmNzcygnZGlzcGxheScsICdibG9jaycpO1xyXG4gIH0pO1xyXG5cclxuICByZXN1bHRDb250cm9sLm1vdXNlbGVhdmUoZnVuY3Rpb24gKCkge1xyXG4gICAgY29weUNvbnRyb2wuY3NzKCdkaXNwbGF5JywgJ25vbmUnKVxyXG4gIH0pO1xyXG5cclxuICBjb3B5Q29udHJvbC5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICByZXN1bHRUZXh0LnNlbGVjdCgpO1xyXG4gICAgZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2NvcHknKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0ID0gcmVzdWx0VGV4dC52YWwoKTtcclxuICAgIGlmIChyZXN1bHQgIT09ICcnKSB7XHJcbiAgICAgIGNvcHlDb250cm9sLmh0bWwoJ+WkjeWItuaIkOWKnycpO1xyXG4gICAgICBjb3B5Q29udHJvbC5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwiIzI4QTM0NFwiKVxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb3B5Q29udHJvbC5odG1sKCflpI3liLYnKTtcclxuICAgICAgICBjb3B5Q29udHJvbC5jc3MoXCJiYWNrZ3JvdW5kXCIsIFwiI2ZmZlwiKVxyXG4gICAgICB9LCAxMDAwKTtcclxuICAgIH1cclxuICAgIC8vIGlmIChyZXN1bHQgPT09ICcnKSB7XHJcbiAgICAvLyAgIEtRLkNvbnRyb2wuTm90aWZpY2F0aW9uLmdldEluc3RhbmNlKCkuc2hvd0Vycm9yKCfnu5PmnpzlpI3liLblpLHotKXvvIEnLCAwKTtcclxuICAgIC8vIH0gZWxzZSB7XHJcbiAgICAvLyAgIEtRLkNvbnRyb2wuTm90aWZpY2F0aW9uLmdldEluc3RhbmNlKCkuc2hvd1N1Y2Nlc3MoJ+e7k+aenOWkjeWItuaIkOWKn++8gScsIDApO1xyXG4gICAgLy8gfVxyXG4gIH0pXHJcbn1cclxuXHJcbmdsb2JhbC5pbml0UmV0dXJuUmVzdWx0QnV0dG9uQ29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXJldHVybi1yZXN1bHQtYnV0dG9uIC5jb250cm9sIC5yZXR1cm4tcmVzdWx0XCIpKSB7XHJcbiAgICByZXR1cm47XHJcbiAgfSBlbHNlIHtcclxuICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcblxyXG4gICAgbGV0IHJldHVyblJlc3VsdEJ1dHRvbkNvbnRyb2wgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1yZXR1cm4tcmVzdWx0LWJ1dHRvbiAuY29udHJvbCAucmV0dXJuLXJlc3VsdFwiKS5rZW5kb0J1dHRvbih7XHJcbiAgICAgIGVuYWJsZTogZmFsc2VcclxuICAgIH0pLmRhdGEoJ2tlbmRvQnV0dG9uJyk7XHJcblxyXG4gICAgYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXS5zZXQoc2VsZWN0b3IgKyBcIiByZXR1cm5SZXN1bHRCdXR0b25cIiwgcmV0dXJuUmVzdWx0QnV0dG9uQ29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwucmV0dXJuUmVzdWx0VGFibGVEYXRhU291cmNlID0gZnVuY3Rpb24gKGRhdGEsIGRhdGFTb3VyY2UsIGF0dHJpYnV0ZU5hbWVzKSB7XHJcbiAgaWYgKGF0dHJpYnV0ZU5hbWVzID09PSAnYXJlYScpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBkYXRhU291cmNlLnB1c2goZGF0YVtpXSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChhdHRyaWJ1dGVOYW1lcyA9PT0gJ2xlbmd0aCcpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBkYXRhU291cmNlLnB1c2goZGF0YVtpXSk7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChhdHRyaWJ1dGVOYW1lcyA9PT0gJ2NlbnRlcicpIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBkYXRhU291cmNlLnB1c2goe1xyXG4gICAgICAgIGlkOiBkYXRhW2ldLmlkLFxyXG4gICAgICAgIGNlbnRlcjogZGF0YVtpXS5jZW50ZXIudG9TdHJpbmcoKVxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKGF0dHJpYnV0ZU5hbWVzID09PSAnYm91bmQnKSB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgZGF0YVNvdXJjZS5wdXNoKHtcclxuICAgICAgICBpZDogZGF0YVtpXS5pZCxcclxuICAgICAgICBib3VuZDogZGF0YVtpXS5ib3VuZC50b1N0cmluZygpXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmluaXRHcm91cEZpZWxkc0NvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1ncm91cGZpZWxkcyAuY29udHJvbFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGxldCBjb250cm9sID0gJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZ3JvdXBmaWVsZHMgLmNvbnRyb2xcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgICBkYXRhVGV4dEZpZWxkOiBcIm5hbWVcIixcclxuICAgICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgICAgZGF0YVNvdXJjZTogW10sXHJcbiAgICAgIGluZGV4OiAwLFxyXG4gICAgfSkuZGF0YSgna2VuZG9Ecm9wRG93bkxpc3QnKTtcclxuXHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIGdyb3VwZmllbGRzXCIsIGNvbnRyb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmluaXRTdW1tYXJ5RmllbGRzQ29udHJvbCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXN1bW1hcnlmaWVsZHMgLmNvbnRyb2xcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICBsZXQgY29udHJvbCA9ICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXN1bW1hcnlmaWVsZHMgLmNvbnRyb2xcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgICBkYXRhVGV4dEZpZWxkOiBcIm5hbWVcIixcclxuICAgICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgICAgZGF0YVNvdXJjZTogW10sICAgICAgICAgICAgICAgICAvLyDmmoLml7bnqbpcclxuICAgICAgaW5kZXg6IDAsXHJcbiAgICB9KS5kYXRhKCdrZW5kb0Ryb3BEb3duTGlzdCcpO1xyXG5cclxuXHJcbiAgICBzZXRUaW1lb3V0KGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgYXdhaXQgZmlsbEdyb3VwRmllbGRzQW5kU3VtbWFyeUZpZWxkcyhzZWxlY3Rvcik7XHJcbiAgICB9LCAwKTtcclxuXHJcbiAgICBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdLnNldChzZWxlY3RvciArIFwiIHN1bW1hcnlmaWVsZHNcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuaW5pdFN1bW1hcnlUeXBlc0NvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1zdW1tYXJ5dHlwZXMgLmNvbnRyb2xcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgICBsZXQgY29udHJvbCA9ICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLXN1bW1hcnl0eXBlcyAuY29udHJvbFwiKS5rZW5kb011bHRpU2VsZWN0KHtcclxuICAgICAgZGF0YVRleHRGaWVsZDogXCJuYW1lXCIsXHJcbiAgICAgIGRhdGFWYWx1ZUZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICAgIGRhdGFTb3VyY2U6IFtcclxuICAgICAgICB7bmFtZTogXCLmsYLlkoxcIiwgdmFsdWU6IFwic3VtXCJ9LFxyXG4gICAgICAgIHtuYW1lOiBcIuacgOWwj+WAvFwiLCB2YWx1ZTogXCJtaW5cIn0sXHJcbiAgICAgICAge25hbWU6IFwi5pyA5aSn5YC8XCIsIHZhbHVlOiBcIm1heFwifSxcclxuICAgICAgICB7bmFtZTogXCLlubPlnYflgLxcIiwgdmFsdWU6IFwiYXZnXCJ9LFxyXG4gICAgICAgIHtuYW1lOiBcIuiuoeaVsFwiLCB2YWx1ZTogXCJjb3VudFwifSxcclxuICAgICAgXSxcclxuXHJcbiAgICAgIHZhbHVlOiBbXCJtaW5cIl0sICAgIC8vIOm7mOiupOmAieS4reacgOWwj+WAvFxyXG4gICAgfSkuZGF0YSgna2VuZG9NdWx0aVNlbGVjdCcpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5hbmFseXNpc19jb250cm9sc1tzZWxlY3Rvcl0uc2V0KHNlbGVjdG9yICsgXCIgc3VtbWFyeXR5cGVzXCIsIGNvbnRyb2wpO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmdldERhdGFzb3VyY2VJbmZvID0gYXN5bmMgZnVuY3Rpb24gKHNlbGVjdG9yKSB7XHJcbiAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICBsZXQgY29udHJvbHNNYXAgPSBidWlsZFByb2plY3QuYW5hbHlzaXNfY29udHJvbHNbc2VsZWN0b3JdO1xyXG4gIGxldCBsYXllcnNDb250cm9sID0gY29udHJvbHNNYXAuZ2V0KHNlbGVjdG9yICsgXCIgc3JjLWxheWVyc1wiKTtcclxuICBsZXQgbGF5ZXIgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkuZ2V0TGF5ZXJGcm9tR3VpZChsYXllcnNDb250cm9sLnZhbHVlKCkpO1xyXG5cclxuICBpZiAoIWxheWVyKSB7XHJcbiAgICByZXR1cm4gbnVsbDtcclxuICB9IGVsc2Uge1xyXG4gICAgcmV0dXJuIGxheWVyLm9wdGlvbnMuZGF0YVNvdXJjZTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5nZXREYXRhc291cmNlID0gZnVuY3Rpb24gKGRhdGFzb3VyY2VJbmZvKSB7XHJcbiAgcmV0dXJuIHtcclxuICAgIFwidHlwZVwiOiBcImRhdGFzZXJ2aWNlXCIsXHJcbiAgICBcInVybFwiOiBkYXRhc291cmNlSW5mby51cmwgKyBcIi9wcm9jXCIsXHJcbiAgICBcImRhdGFzb3VyY2VpZFwiOiBkYXRhc291cmNlSW5mby5kYXRhc291cmNlSWQsXHJcbiAgICBcImZlYXR1cmVjbGFzc25hbWVcIjogZGF0YXNvdXJjZUluZm8uZmVhdHVyZUNsYXNzTmFtZSxcclxuICB9O1xyXG59XHJcblxyXG4vLyDojrflj5bliIbmrrXlrZfmrrXlkozmsYfmgLvlrZfmrrVcclxuZ2xvYmFsLmdldEZpZWxkc0Zyb21MYXllciA9IGFzeW5jIGZ1bmN0aW9uIChzZWxlY3RvciwgaXNTdW1tYXJ5RmllbGQpIHtcclxuICBsZXQgZGF0YXNvdXJjZUluZm8gPSBhd2FpdCBnZXREYXRhc291cmNlSW5mbyhzZWxlY3Rvcik7XHJcblxyXG4gIGlmICghZGF0YXNvdXJjZUluZm8pIHtcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBpZiAoZGF0YXNvdXJjZUluZm8udHlwZSAhPT0gXCJEU19EQVRBXCIpIHtcclxuICAgICAgS1EuQ29udHJvbC5Ob3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5zaG93RXJyb3IoJ+ivt+axguWksei0pe+8jOmdnuaVsOaNruacjeWKoeaVsOaNru+8gScsIDApO1xyXG4gICAgICByZXR1cm4gbnVsbDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGxldCBkYXRhc291cmNlID0gZ2V0RGF0YXNvdXJjZShkYXRhc291cmNlSW5mbyk7XHJcblxyXG4gICAgICBsZXQgc2VydmVyRmllbGRzID0gbmV3IEtRLlNlcnZpY2VUb29sLlNlcnZpY2VUb29sQW5hbHlzaXNTZXJ2ZXJGaWVsZHMoKTtcclxuICAgICAgbGV0IGZpZWxkcyA9IGF3YWl0IHNlcnZlckZpZWxkcy5nZXRGaWVsZHNSZXN1bHQoe1xyXG4gICAgICAgIGRhdGFzb3VyY2U6IGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShkYXRhc291cmNlKSksXHJcbiAgICAgICAgaXNTdW1tYXJ5RmllbGQ6IGlzU3VtbWFyeUZpZWxkLFxyXG4gICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgaWYgKHJlcyA9PT0gJ2Vycm9yJyB8fCBKU09OLnBhcnNlKHJlcykucmVzdWx0Y29kZSA9PT0gJ2Vycm9yJykge1xyXG4gICAgICAgICAgS1EuQ29udHJvbC5Ob3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5zaG93RXJyb3IoJ+iOt+WPluWbvuWxguWtl+auteWksei0pe+8gScsIDApO1xyXG4gICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKHJlcykucmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcblxyXG4gICAgICByZXR1cm4gZmllbGRzO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuLy8g5Yid5aeL5YyW5Zu+5bGC55qE5a2X5q615L+h5oGvXHJcbmdsb2JhbC5pbml0RmllbGRzQ29udHJvbCA9IGFzeW5jIGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIGlmICghaXNWYWxpZEVsZW1lbnQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWZpZWxkcyAuY29udHJvbFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG5cclxuICAgIGxldCBjb250cm9sID0gJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItZmllbGRzIC5jb250cm9sXCIpLmtlbmRvTGlzdFZpZXcoe1xyXG4gICAgICBkYXRhU291cmNlOiB7XHJcbiAgICAgICAgZGF0YTogW10sXHJcbiAgICAgIH0sXHJcbiAgICAgIHRlbXBsYXRlOiBcIjxkaXY+IzpuYW1lIzwvZGl2PlwiLFxyXG4gICAgICBzZWxlY3RhYmxlOiB0cnVlLFxyXG4gICAgfSkuZGF0YSgna2VuZG9MaXN0VmlldycpO1xyXG5cclxuICAgIHNldFRpbWVvdXQoYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICBhd2FpdCBmaWxsUXVlcnlGaWVsZHMoc2VsZWN0b3IpO1xyXG4gICAgfSwgMCk7XHJcblxyXG4gICAgLy8g57uR5a6a5Y+M5Ye75LqL5Lu2XHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1maWVsZHMgLmNvbnRyb2xcIikuZGJsY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICBsZXQgc2VsZWN0RmllbGQgPSBjb250cm9sLmRhdGFJdGVtKGNvbnRyb2wuc2VsZWN0KCkpLm5hbWU7XHJcblxyXG4gICAgICBhZGRTUUxDb25kaXRpb24oc2VsZWN0RmllbGQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgYnVpbGRQcm9qZWN0LmFuYWx5c2lzX2NvbnRyb2xzW3NlbGVjdG9yXS5zZXQoc2VsZWN0b3IgKyBcIiBmaWVsZHNcIiwgY29udHJvbCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuYWRkU1FMQ29uZGl0aW9uID0gZnVuY3Rpb24gKHRleHQpIHtcclxuICBsZXQgbmV3VGV4dCA9ICQoXCIjc3FsLWNvbmRpdGlvblwiKS52YWwoKSArICcgJyArIHRleHQ7XHJcbiAgJChcIiNzcWwtY29uZGl0aW9uXCIpLnZhbChuZXdUZXh0KTtcclxufVxyXG5cclxuLy8g5Yid5aeL5YyWU1FM55qE6L+Q566X56ym5Y+3XHJcbmdsb2JhbC5pbml0T3BlcmF0aW9uU3ltYm9sc0NvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1vcGVyYXRpb24tc3ltYm9scyAuY29udHJvbFwiKSkge1xyXG4gICAgcmV0dXJuO1xyXG4gIH0gZWxzZSB7XHJcblxyXG4gICAgJChzZWxlY3RvciArIFwiIC5wYXJhbWV0ZXItb3BlcmF0aW9uLXN5bWJvbHMgLmNvbnRyb2wgYnV0dG9uXCIpLmtlbmRvQnV0dG9uKHtcclxuICAgICAgY2xpY2s6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBhZGRTUUxDb25kaXRpb24oJC50cmltKHRoaXMuZWxlbWVudC50ZXh0KCkpKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW9wZXJhdGlvbi1zeW1ib2xzIC5jb250cm9sIGJ1dHRvblwiKS5jc3MoXCJ3aWR0aFwiLCBcIjMyJVwiKTtcclxuICAgICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLW9wZXJhdGlvbi1zeW1ib2xzIC5jb250cm9sIGRpdlwiKS5jc3MoXCJtYXJnaW4tdG9wXCIsIFwiOHB4XCIpO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmluaXRGaWVsZFZhbHVlc0NvbnRyb2wgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcclxuICBpZiAoIWlzVmFsaWRFbGVtZW50KHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1maWVsZC12YWx1ZXMgLmNvbnRyb2xcIikpIHtcclxuICAgIHJldHVybjtcclxuICB9IGVsc2Uge1xyXG4gICAgbGV0IGZpZWxkVmFsdWVzQ29udHJvbCA9ICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWZpZWxkLXZhbHVlcyAuY29udHJvbCAuZmllbGQtdmFsdWVzXCIpLmtlbmRvTGlzdFZpZXcoe1xyXG4gICAgICBkYXRhU291cmNlOiB7XHJcbiAgICAgICAgZGF0YTogW10sXHJcbiAgICAgIH0sXHJcbiAgICAgIHRlbXBsYXRlOiBcIjxkaXY+IzpuYW1lIzwvZGl2PlwiLFxyXG5cclxuICAgICAgc2VsZWN0YWJsZTogdHJ1ZSxcclxuICAgIH0pLmRhdGEoJ2tlbmRvTGlzdFZpZXcnKTtcclxuXHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1maWVsZC12YWx1ZXMgLmNvbnRyb2wgYnV0dG9uXCIpLmtlbmRvQnV0dG9uKHtcclxuICAgICAgY2xpY2s6IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBsZXQgZGF0YXNvdXJjZUluZm8gPSBhd2FpdCBnZXREYXRhc291cmNlSW5mbyhzZWxlY3Rvcik7XHJcblxyXG4gICAgICAgIGlmICghZGF0YXNvdXJjZUluZm8pIHtcclxuICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBpZiAoZGF0YXNvdXJjZUluZm8udHlwZSAhPT0gXCJEU19EQVRBXCIpIHtcclxuICAgICAgICAgICAgS1EuQ29udHJvbC5Ob3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5zaG93RXJyb3IoJ+ivt+axguWksei0pe+8jOmdnuaVsOaNruacjeWKoeaVsOaNru+8gScsIDApO1xyXG4gICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8g56ys5LiA5q2lIOiOt+WPluWbvuWxglxyXG4gICAgICAgICAgICBsZXQgZGF0YXNvdXJjZSA9IGdldERhdGFzb3VyY2UoZGF0YXNvdXJjZUluZm8pO1xyXG5cclxuICAgICAgICAgICAgLy8g56ys5LqM5q2lIOiOt+WPluWtl+autVxyXG4gICAgICAgICAgICBsZXQgZmllbGRzQ29udHJvbCA9ICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVyLWZpZWxkcyAuY29udHJvbFwiKS5kYXRhKFwia2VuZG9MaXN0Vmlld1wiKTtcclxuICAgICAgICAgICAgbGV0IGRhdGFJdGVtID0gZmllbGRzQ29udHJvbC5kYXRhSXRlbShmaWVsZHNDb250cm9sLnNlbGVjdCgpKTtcclxuICAgICAgICAgICAgbGV0IGZpZWxkID0gZGF0YUl0ZW0ubmFtZTtcclxuXHJcbiAgICAgICAgICAgIC8vIOesrOS4ieatpSDov5vooYzmn6Xor6JcclxuICAgICAgICAgICAgbGV0IGV4ZWN1dGVTZXJ2ZXIgPSBuZXcgS1EuU2VydmljZVRvb2wuU2VydmljZVRvb2xBbmFseXNpc1NlcnZlckV4ZWN1dGUoKTtcclxuICAgICAgICAgICAgYXdhaXQgZXhlY3V0ZVNlcnZlci5nZXRFeGVjdXRlUmVzdWx0KHtcclxuICAgICAgICAgICAgICBkYXRhc291cmNlOiBlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoZGF0YXNvdXJjZSkpLFxyXG4gICAgICAgICAgICAgIHNxbDogXCJzZWxlY3QgZGlzdGluY3QoXCIgKyBmaWVsZCArIFwiKSBmcm9tIFwiICsgZGF0YXNvdXJjZS5mZWF0dXJlY2xhc3NuYW1lICsgXCIgb3JkZXIgYnkgXCIgKyBmaWVsZCxcclxuICAgICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgIGlmIChyZXMgPT09ICdlcnJvcicgfHwgSlNPTi5wYXJzZShyZXMpLnJlc3VsdGNvZGUgPT09ICdlcnJvcicpIHtcclxuICAgICAgICAgICAgICAgIEtRLkNvbnRyb2wuTm90aWZpY2F0aW9uLmdldEluc3RhbmNlKCkuc2hvd0Vycm9yKCfor7fmsYLlpLHotKXvvIEnLCAwKTtcclxuICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgS1EuQ29udHJvbC5Ob3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5zaG93U3VjY2Vzcygn6K+35rGC5oiQ5Yqf77yBJywgMCk7XHJcbiAgICAgICAgICAgICAgICByZXMgPSBKU09OLnBhcnNlKHJlcyk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlcy5yZXN1bHRjb2RlID09PSBcInN1Y2Nlc3NcIikge1xyXG4gICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gcmVzLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgICAgbGV0IGZlYXR1cmVzID0gcmVzdWx0LmZlYXR1cmVzO1xyXG4gICAgICAgICAgICAgICAgICBsZXQgZGF0YSA9IFtdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgZmVhdHVyZXMuZm9yRWFjaChmdW5jdGlvbiAoZmVhdHVyZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGEucHVzaCh7XCJuYW1lXCI6IGZlYXR1cmUucHJvcGVydGllc1tmaWVsZF19KTtcclxuICAgICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlc0NvbnRyb2wuc2V0RGF0YVNvdXJjZShuZXcga2VuZG8uZGF0YS5EYXRhU291cmNlKHtkYXRhOiBkYXRhfSkpO1xyXG4gICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlc0NvbnRyb2wuc2VsZWN0KDApO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZXNDb250cm9sLnNldERhdGFTb3VyY2UoW10pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1maWVsZC12YWx1ZXMgLmNvbnRyb2wgLmZpZWxkLXZhbHVlc1wiKS5kYmxjbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCB2YWx1ZSA9IGZpZWxkVmFsdWVzQ29udHJvbC5kYXRhSXRlbShmaWVsZFZhbHVlc0NvbnRyb2wuc2VsZWN0KCkpLm5hbWU7XHJcbiAgICAgIGFkZFNRTENvbmRpdGlvbih2YWx1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlci1maWVsZC12YWx1ZXMgLmNvbnRyb2xcIikuY2hpbGRyZW4oKS5jc3MoXCJtYXJnaW5cIiwgXCI0cHggMFwiKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOi/m+ihjEtRQnVpbGRlcueahOS4gOS6m+WIneWni+WMluW3peS9nFxyXG5nbG9iYWwuaW5pdE1hcCA9IGZ1bmN0aW9uICh0YXNrSWQsIHByb2pOYW1lKSB7XHJcbiAgdmFyIGNvbmZpZyA9IEtRLk1hcC5NYXBDb25maWcuZ2V0SW5zdGFuY2UoKTtcclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gIHZhciBtYXBWaWV3ID0gbnVsbDtcclxuICB2YXIgbGF5ZXJzQ29udGFpbmVyID0gbnVsbDtcclxuXHJcbiAgY29uZmlnLmluaXRBc3luYygnJywgZmFsc2UsIGZ1bmN0aW9uICgpIHtcclxuICAgIEtRLkxvY2FsLnNldExhbmd1YWdlKCdjbicpO1xyXG4gICAgbWFwVmlldyA9IG5ldyBLUS5NYXAuTWFwVmlldyh7XHJcbiAgICAgIGNlbnRlcjogWzQwLCAtNTBdLFxyXG4gICAgICB6b29tOiAyLFxyXG4gICAgfSk7XHJcblxyXG4gICAgYnVpbGRQcm9qZWN0Lm1hcFZpZXcgPSBtYXBWaWV3O1xyXG5cclxuICAgIG1hcFZpZXcuaW5pdEFzeW5jKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgLy8gQ2F0Y2hlcyB1bmhhbmRsZWQgY2FudmFzIGxheWVyIGV2ZW50cyBhbmQgcmUtZGlzcGF0Y2hlcyB0aGVtIHRvIHRoZSBuZXh0IGxheWVyIGluIHRoZSBzdGFja1xyXG4gICAgICAvLyDkv67mraPpl67popjvvJrngrnnur/pnaLlm77lsYLmt7vliqDlkI7vvIzpvKDmoIfngrnlh7vkuovku7bml6Dms5Xnqb/pgI9cclxuICAgICAgY29uc3QgbWFwRXZlbnRGb3J3YXJkZXIgPSBuZXcgTC5ldmVudEZvcndhcmRlcih7XHJcbiAgICAgICAgLy8gcmVmIHRvIGxlYWZsZXQgbWFwXHJcbiAgICAgICAgbWFwOiBtYXBWaWV3Ll9nZXRNYXAoKSxcclxuICAgICAgICAvLyBldmVudHMgdG8gZm9yd2FyZFxyXG4gICAgICAgIGV2ZW50czoge1xyXG4gICAgICAgICAgY2xpY2s6IHRydWUsXHJcbiAgICAgICAgICBtb3VzZW1vdmU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyB0aHJvdHRsZSBvcHRpb25zIGZvciBtb3VzZW1vdmUgZXZlbnRzIChzYW1lIGFzIHVuZGVyc2NvcmUuanMpXHJcbiAgICAgICAgdGhyb3R0bGVNczogMTAwLFxyXG4gICAgICAgIHRocm90dGxlT3B0aW9uczoge1xyXG4gICAgICAgICAgbGVhZGluZzogdHJ1ZSxcclxuICAgICAgICAgIHRyYWlsaW5nOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIC8vIGVuYWJsZSBldmVudCBmb3J3YXJkaW5nXHJcbiAgICAgIG1hcEV2ZW50Rm9yd2FyZGVyLmVuYWJsZSgpO1xyXG5cclxuICAgICAgbGV0IG1hcCA9IG1hcFZpZXcuX2dldE1hcCgpO1xyXG4gICAgICBtYXAubWFwRXZlbnRGb3J3YXJkZXIgPSBtYXBFdmVudEZvcndhcmRlcjtcclxuXHJcbiAgICAgIEtRLkNvbnRyb2wuV2FpdGluZy5zaG93KG1hcFZpZXcuX2dldE1hcCgpLCAncGluJywgJ21ldGVyJyk7XHJcblxyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGluaXRIdG1sKCk7XHJcbiAgICAgICAgaW5pdFNpZGVyYmFyKG1hcFZpZXcpO1xyXG5cclxuICAgICAgICBhd2FpdCBpbml0TGF5ZXJzQ29udGFpbmVyKGxheWVyc0NvbnRhaW5lcik7XHJcbiAgICAgICAgYXdhaXQgaW5pdEhhbmREcmF3TGF5ZXJzQ29udGFpbmVyKCk7XHJcbiAgICAgICAgYXdhaXQgaW5pdE1hcEdlb21hbigpO1xyXG5cclxuICAgICAgICAvLyDmt7vliqDmmbrlm74g55+i6YeP5Zu+5bGCIOWNiOWknOiTnVxyXG4gICAgICAgIGxldCBiYXNlbGF5ZXJzID0gS1EuQ29udHJvbC5NYXBCYXNlTGF5ZXIuZ2V0TGF5ZXJzKCdnZW9xJywgJ2JsdWUnKTtcclxuXHJcbiAgICAgICAgYnVpbGRQcm9qZWN0LmJhc2VtYXBHcm91cCA9IEwubGF5ZXJHcm91cChiYXNlbGF5ZXJzKTtcclxuICAgICAgICBidWlsZFByb2plY3QuYmFzZW1hcEdyb3VwLmFkZFRvKG1hcFZpZXcuX2dldE1hcCgpKTtcclxuXHJcbiAgICAgICAgLy8g6buY6K6k6YCJ5Lit56ys5LiA5Liq5pm65Zu+6JOd6ImyXHJcbiAgICAgICAgbGV0IGJhc2VtYXBMaXN0VmlldyA9ICQoXCIuYmFzZW1hcC1saXN0XCIpLmRhdGEoXCJrZW5kb0xpc3RWaWV3XCIpO1xyXG4gICAgICAgIGJhc2VtYXBMaXN0Vmlldy5zZWxlY3QoYmFzZW1hcExpc3RWaWV3LmVsZW1lbnQuY2hpbGRyZW4oKS5maXJzdCgpKTtcclxuXHJcbiAgICAgICAgaWYgKHRhc2tJZCkge1xyXG4gICAgICAgICAgbGV0IHVybCA9IEtRLkJ1aWxkZXIuQnVpbGRlclBvcnRhbFByb3h5LmRvd25sb2FkVXJsKHRhc2tJZCk7XHJcblxyXG4gICAgICAgICAgYXdhaXQgbG9hZFByb2plY3QodXJsKTtcclxuXHJcbiAgICAgICAgICBpZiAocHJvak5hbWUpIHtcclxuICAgICAgICAgICAgJChcIiNjdXJyZW50LXByb2plY3QtbmFtZVwiKS50ZXh0KHByb2pOYW1lKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHBvcnRhbOmakOiXj+W3peeoi+aLieWPluaMiemSrlxyXG4gICAgICAgIGlmIChLUS5CdWlsZGVyLkJ1aWxkZXJQb3J0YWwuaXNQb3J0YWxFbnZpcm9ubWVudCgpKSB7XHJcbiAgICAgICAgICAkKFwiW2RhdGEtdHlwZT1jbG91ZGRvd25dXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgIEtRLkNvbnRyb2wuV2FpdGluZy5jbG9zZSgpO1xyXG4gICAgICAgICAgS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpLnNpZGVyYmFyLm9wZW4oXCJsYXllcnNcIik7XHJcbiAgICAgICAgICBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5DcmVhdGVGaXJzdE1hcERpYWxvZy5nZXRJbnN0YW5jZSgpLmluaXQoKTtcclxuICAgICAgICB9LCAxMDAwKTtcclxuXHJcbiAgICAgICAgLy8gYWRkIGJ5IGxpd2VpXHJcbiAgICAgICAgbGV0IGJ1aWxkZXJVcGRhdGUgPSBLUS5CdWlsZGVyLkJ1aWxkZXJVcGRhdGUuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBidWlsZGVyVXBkYXRlLmJpbmRFdmVudCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBidWlsZFByb2plY3QubWFwVmlldyA9IG1hcFZpZXc7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8vIOWfuuacrOWcsOWbviDlhYnmoIfov5vlhaVcclxuZ2xvYmFsLm9ubW91c2VlbnRlckhhbmRsZUJhc2VNYXAgPSBmdW5jdGlvbiAoZWwpIHtcclxuICAkKGVsKS5wYXJlbnQoKS5hZGRDbGFzcyhcImxhcmdlU2l6ZVwiKTsgICAgICAgICAgICAgICAgICAgICAvLyBsaeagh+etvuWPmOaIkOWkp+WwuuWvuFxyXG4gICQoZWwpLmNoaWxkcmVuKFwiLnNlY291bmQtbGluZVwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7ICAvLyDmmL7npLrnrKzkuozooYxcclxuICAkKGVsKS5maW5kKFwiLmZhLWV5ZVwiKS5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTsgICAgICAgICAgICAgICAgLy8g5pi+56S65Zu+5bGC5piv5ZCm5Y+v6KeB5oyJ6ZKuXHJcbn1cclxuXHJcbi8vIOWfuuacrOWcsOWbviDlhYnmoIfpgIDlh7pcclxuZ2xvYmFsLm9ubW91c2VsZWF2ZUhhbmRsZUJhc2VNYXAgPSBmdW5jdGlvbiAoZWwpIHtcclxuICAkKGVsKS5wYXJlbnQoKS5yZW1vdmVDbGFzcyhcImxhcmdlU2l6ZVwiKTsgICAgICAgICAgICAgICAgICAvLyBsaeagh+etvuWPmOaIkOWwj+WwuuWvuFxyXG4gICQoZWwpLmNoaWxkcmVuKFwiLnNlY291bmQtbGluZVwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTsgICAvLyDpmpDol4/nrKzkuozooYxcclxuICAkKGVsKS5maW5kKFwiLmZhLWV5ZVwiKS5jc3MoXCJvcGFjaXR5XCIsIFwiMFwiKTsgICAgICAgICAgICAgICAgLy8g6ZqQ6JeP5Zu+5bGC5piv5ZCm5Y+v6KeB5oyJ6ZKuXHJcbn1cclxuXHJcbi8vIOWIh+aNouW6leWbvueahOWPr+ingeaAp1xyXG5nbG9iYWwudG9nZ2xlQmFzZU1hcFZpc2libGUgPSBmdW5jdGlvbiAoZWwpIHtcclxuXHJcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblxyXG4gIGxldCBiYXNlbWFwR3JvdXAgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkuYmFzZW1hcEdyb3VwO1xyXG5cclxuICAvLyDliIfmjaLlm77lsYLlj6/nlKjkuI3lj6/nlKhcclxuICBpZiAoJChlbCkuaGFzQ2xhc3MoXCJmYS1leWVcIikpIHtcclxuICAgICQoZWwpLnJlbW92ZUNsYXNzKFwiZmEtZXllXCIpO1xyXG4gICAgJChlbCkuYWRkQ2xhc3MoXCJmYS1leWUtc2xhc2hcIik7XHJcblxyXG4gICAgLy8g6K6+572u5bqV5Zu+55qEdWnkuLrkuI3lj6/nlKjnirbmgIFcclxuICAgICQoZWwpLmNsb3Nlc3QoXCJsaVwiKS5jc3MoXCJvcGFjaXR5XCIsIDAuNjUpO1xyXG4gICAgJChlbCkuY2xvc2VzdChcImxpXCIpLmNzcyhcInBvaW50ZXItZXZlbnRzXCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICAvLyDmuIXpmaTkuYvliY3nmoTlm77lsYJcclxuICAgIGJhc2VtYXBHcm91cC5jbGVhckxheWVycygpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICAkKGVsKS5hZGRDbGFzcyhcImZhLWV5ZVwiKTtcclxuICAgICQoZWwpLnJlbW92ZUNsYXNzKFwiZmEtZXllLXNsYXNoXCIpO1xyXG5cclxuICAgIC8vIOiuvue9ruW6leWbvueahHVp5Li65Y+v55So54q25oCBXHJcbiAgICAkKGVsKS5jbG9zZXN0KFwibGlcIikuY3NzKFwib3BhY2l0eVwiLCAxKTsgIC8vIOaOpeWPl+m8oOagh+eCueWHu+S6i+S7tlxyXG4gICAgJChlbCkuY2xvc2VzdChcImxpXCIpLmNzcyhcInBvaW50ZXItZXZlbnRzXCIsIFwiYXV0b1wiKTsgIC8vIOaOpeWPl+m8oOagh+eCueWHu+S6i+S7tlxyXG5cclxuICAgIC8vIOa3u+WKoOaWsOeahOWbvuWxglxyXG4gICAgbGV0IHR5cGUgPSAkKGVsKS5jbG9zZXN0KFwibGlcIikuYXR0cihcImRhdGEtdHlwZVwiKTtcclxuICAgIGxldCBzdWJUeXBlID0gJChlbCkuY2xvc2VzdChcImxpXCIpLmF0dHIoXCJkYXRhLXN1Yi10eXBlXCIpO1xyXG4gICAgbGV0IGJhc2VsYXllcnMgPSBLUS5Db250cm9sLk1hcEJhc2VMYXllci5nZXRMYXllcnModHlwZSwgc3ViVHlwZSk7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiYXNlbGF5ZXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGJhc2VtYXBHcm91cC5hZGRMYXllcihiYXNlbGF5ZXJzW2ldKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gICQoZWwpLmNzcyhcInBvaW50ZXItZXZlbnRzXCIsIFwiYXV0b1wiKTsgIC8vIOaOpeWPl+m8oOagh+eCueWHu+S6i+S7tlxyXG59XHJcblxyXG5nbG9iYWwuYWRkSGFuZERyYXdMYXllckl0ZW0gPSBmdW5jdGlvbiAoaWQsIHR5cGUpIHtcclxuICAvLyBNYXBHZW9tYW7kuK3nmoRsYXllcuWSjEhhbmREcmF3TGF5ZXJMaXN0Qm945Lit55qEaXRlbemAmui/h2lk5YWz6IGU6LW35p2lXHJcbiAgS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpLmhhbmREcmF3TGF5ZXJzQ29udGFpbmVyLmFkZCh7XHJcbiAgICBpZDogaWQsXHJcbiAgICBuYW1lOiBcIua1i+ivleaVsOaNrjNcIixcclxuICAgIHR5cGU6IHR5cGUsXHJcbiAgfSlcclxufVxyXG5cclxuZ2xvYmFsLmJ1aWxkZXJJbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gIC8vbG9hZEh0bWwoKTsgICAgICAgICAgIC8vIHBvcnRhbOS8muS4u+WKqOiwg+eUqGluaXRNYXBcclxuICBsb2FkSHRtbChpbml0TWFwKTtcclxufVxyXG5cclxuLyogdG9vbEJveOa7muWKqOadoSAqL1xyXG5mdW5jdGlvbiB0b29sQm94KHNlbGVjdG9yKSB7XHJcbiAgbGV0IHBhcmFtZXRlcnNDb250YWluZXJIZWlnaHQgPSBOdW1iZXIucGFyc2VGbG9hdCgkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlcnMtY29udGFpbmVyID4gZGl2XCIpLmNzcygnaGVpZ2h0JykpO1xyXG4gIGxldCB0b29sYm94U2Nyb2xsYmFySGVpZ2h0ID0gTnVtYmVyLnBhcnNlRmxvYXQoJChzZWxlY3RvciArIFwiIC50b29sYm94LXNjcm9sbGJhclwiKS5jc3MoJ2hlaWdodCcpKTtcclxuICBsZXQgdG9vbEJveFNjcm9sbCA9ICQoc2VsZWN0b3IgKyBcIiAudG9vbGJveC1zY3JvbGxiYXIgZGl2XCIpO1xyXG5cclxuICBpZiAocGFyYW1ldGVyc0NvbnRhaW5lckhlaWdodCArIDQ0ID4gdG9vbGJveFNjcm9sbGJhckhlaWdodCkge1xyXG4gICAgdG9vbEJveFNjcm9sbC5jc3Moe1wiZGlzcGxheVwiOiBcImJsb2NrXCJ9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICB0b29sQm94U2Nyb2xsLmNzcyh7XCJkaXNwbGF5XCI6IFwibm9uZVwifSlcclxuICB9XHJcblxyXG4gICQoc2VsZWN0b3IgKyBcIiAucGFyYW1ldGVycy1jb250YWluZXJcIikuc2Nyb2xsKGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBzY3JvbGxUb3AgPSAkKHNlbGVjdG9yICsgXCIgLnBhcmFtZXRlcnMtY29udGFpbmVyXCIpLnNjcm9sbFRvcCgpO1xyXG4gICAgbGV0IHRvb2xib3hTY3JvbGxiYXIgPSAodG9vbGJveFNjcm9sbGJhckhlaWdodCAtIDIwNCkgKiAoc2Nyb2xsVG9wIC8gKHBhcmFtZXRlcnNDb250YWluZXJIZWlnaHQgKyA0NCAtIHRvb2xib3hTY3JvbGxiYXJIZWlnaHQpKTtcclxuICAgIHRvb2xCb3hTY3JvbGwuY3NzKHtcInRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVkoXCIgKyB0b29sYm94U2Nyb2xsYmFyICsgXCJweClcIn0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5nbG9iYWwudG9vbEJveFNjcm9sbEJhciA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xyXG4gIHRvb2xCb3goc2VsZWN0b3IpO1xyXG4gICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG4gICAgdG9vbEJveChzZWxlY3Rvcik7XHJcbiAgfSk7XHJcbn1cclxuXHJcbi8qIHNldHRpbmfmu5rliqjmnaEgKi9cclxuZnVuY3Rpb24gc2V0dGluZ1Njcm9sbCgpIHtcclxuICBsZXQgbGF5ZXJEYXRhQ29udGFpbmVySGVpZ2h0ID0gTnVtYmVyLnBhcnNlRmxvYXQoJChcIi5tYXBzZXR0aW5nLWNvbnRlbnQgLmxheWVyLWRhdGEtY29udGFpbmVyID4gZGl2XCIpLmNzcygnaGVpZ2h0JykpO1xyXG4gIGxldCBzZXR0aW5nU2Nyb2xsYmFySGVpZ2h0ID0gTnVtYmVyLnBhcnNlRmxvYXQoJChcIi5tYXBzZXR0aW5nLWNvbnRlbnQgLm1hcHNldHRpbmctc2Nyb2xsYmFyXCIpLmNzcygnaGVpZ2h0JykpO1xyXG4gIGxldCBzZXR0aW5nU2Nyb2xsID0gJChcIi5tYXBzZXR0aW5nLWNvbnRlbnQgLm1hcHNldHRpbmctc2Nyb2xsYmFyIGRpdlwiKTtcclxuXHJcbiAgaWYgKGxheWVyRGF0YUNvbnRhaW5lckhlaWdodCArIDM0ID4gc2V0dGluZ1Njcm9sbGJhckhlaWdodCkge1xyXG4gICAgc2V0dGluZ1Njcm9sbC5jc3Moe1wiZGlzcGxheVwiOiBcImJsb2NrXCJ9KVxyXG4gIH0gZWxzZSB7XHJcbiAgICBzZXR0aW5nU2Nyb2xsLmNzcyh7XCJkaXNwbGF5XCI6IFwibm9uZVwifSlcclxuICB9XHJcblxyXG4gICQoXCIubWFwc2V0dGluZy1jb250ZW50IC5sYXllci1kYXRhLWNvbnRhaW5lclwiKS5zY3JvbGwoZnVuY3Rpb24gKCkge1xyXG4gICAgbGV0IHNjcm9sbFRvcCA9ICQoXCIubWFwc2V0dGluZy1jb250ZW50IC5sYXllci1kYXRhLWNvbnRhaW5lclwiKS5zY3JvbGxUb3AoKTtcclxuICAgIGxldCBzZXR0aW5nU2Nyb2xsYmFyID0gKHNldHRpbmdTY3JvbGxiYXJIZWlnaHQgLSAyMDQpICogKHNjcm9sbFRvcCAvIChsYXllckRhdGFDb250YWluZXJIZWlnaHQgKyAzNCAtIHNldHRpbmdTY3JvbGxiYXJIZWlnaHQpKTtcclxuICAgIHNldHRpbmdTY3JvbGwuY3NzKHtcInRyYW5zZm9ybVwiOiBcInRyYW5zbGF0ZVkoXCIgKyBzZXR0aW5nU2Nyb2xsYmFyICsgXCJweClcIn0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5nbG9iYWwuc2V0dGluZ1Njcm9sbEJhciA9IGZ1bmN0aW9uICgpIHtcclxuICAkKHdpbmRvdykub24oXCJjbGlja1wiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoJChcIiNzZXR0aW5nc1wiKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSkge1xyXG4gICAgICBzZXR0aW5nU2Nyb2xsKCk7XHJcbiAgICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHNldHRpbmdTY3JvbGwoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuLyoqXHJcbiAqIOaUueWPmGRpYWxvZ+eahOiDjOaZr+iJslxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc2VsZWN0b3JcclxuICogQHBhcmFtIHtzdHJpbmd9IGJhY2tncm91bmRDb2xvclxyXG4gKi9cclxuZ2xvYmFsLmNoYW5nZURpYWxvZ0JhY2tncm91bmRDb2xvciA9IGZ1bmN0aW9uIChzZWxlY3RvciwgYmFja2dyb3VuZENvbG9yKSB7XHJcbiAgJChzZWxlY3RvcikucGFyZW50KCkuY3NzKFwiYmFja2dyb3VuZENvbG9yXCIsIGJhY2tncm91bmRDb2xvcik7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDojrflj5boioLngrnnmoR0cmFuc2xhdGVZXHJcbiAqIEBwYXJhbSB7c3RyaW5nfSBub2RlICAgLy8gZG9t6IqC54K5XHJcbiAqICovXHJcbmdsb2JhbC5nZXRUcmFuc2xhdGVZID0gZnVuY3Rpb24gKG5vZGUpIHtcclxuICBsZXQgcmVnUnVsZSA9IC90cmFuc2xhdGUoWXxcXGRkKT9cXChcXHMqKFxcdytcXHMqLCk/XFxzKihbXixdKykoXFxzKixbXildKyk/XFxzKlxcKS87XHJcbiAgbGV0IHJlZ1J1bGUyID0gL21hdHJpeFxcKC4qLFxccyooXFx3KylcXHMqXFwpLztcclxuICBsZXQgdHJhbnNmb3JtID0gbm9kZS5zdHlsZS50cmFuc2Zvcm07XHJcbiAgbGV0IHJlZztcclxuICBpZiAoIXRyYW5zZm9ybSkge1xyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfVxyXG4gIHJlZyA9IHJlZ1J1bGUuZXhlYyh0cmFuc2Zvcm0pO1xyXG4gIGlmIChudWxsID09PSByZWcpIHtcclxuICAgIHJlZyA9IHJlZ1J1bGUyLmV4ZWModHJhbnNmb3JtKTtcclxuICAgIHJldHVybiByZWcgPyByZWdbMV0gOiBudWxsO1xyXG4gIH1cclxuICByZXR1cm4gcmVnWzNdO1xyXG59XHJcblxyXG5cclxuLyoqXHJcbiAqIHRyYW5zaXRpb25Kc29uVG9TdHJpbmcoKSAganNvbuWvueixoei9rOaNouS4uuWtl+espuS4suWPmOmHj1xyXG4gKiBAcGFyYW0ge29iamVjdH0ganNvbk9ialxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FsbGJhY2tcclxuICogKi9cclxuZnVuY3Rpb24gdHJhbnNpdGlvbkpzb25Ub1N0cmluZyhqc29uT2JqLCBjYWxsYmFjaykge1xyXG4gIC8vIOi9rOaNouWQjueahGpzb25PYmrlj5fkvZPlr7nosaFcclxuICBsZXQgX2pzb25PYmogPSBudWxsO1xyXG4gIC8vIOWIpOaWreS8oOWFpeeahGpzb25PYmrlr7nosaHmmK/kuI3mmK/lrZfnrKbkuLLvvIzlpoLmnpzmmK/lrZfnrKbkuLLpnIDopoHlhYjovazmjaLkuLrlr7nosaHvvIzlho3ovazmjaLkuLrlrZfnrKbkuLLvvIzov5nmoLflgZrmmK/kuLrkuobkv53or4HovazmjaLlkI7nmoTlrZfnrKbkuLLkuLrlj4zlvJXlj7dcclxuICBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGpzb25PYmopICE9PSBcIltvYmplY3QgU3RyaW5nXVwiKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICBfanNvbk9iaiA9IEpTT04uc3RyaW5naWZ5KGpzb25PYmopO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgLy8g6L2s5o2i5aSx6LSl6ZSZ6K+v5L+h5oGvXHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ+aCqOS8oOmAkueahGpzb27mlbDmja7moLzlvI/mnInor6/vvIzor7fmoLjlr7kuLi4nKTtcclxuICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XHJcbiAgICAgIGNhbGxiYWNrKGVycm9yKTtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgdHJ5IHtcclxuICAgICAganNvbk9iaiA9IGpzb25PYmoucmVwbGFjZSgvKFxcJykvZywgJ1xcXCInKTtcclxuICAgICAgX2pzb25PYmogPSBKU09OLnN0cmluZ2lmeShKU09OLnBhcnNlKGpzb25PYmopKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIC8vIOi9rOaNouWksei0pemUmeivr+S/oeaBr1xyXG4gICAgICBjb25zb2xlLmVycm9yKCfmgqjkvKDpgJLnmoRqc29u5pWw5o2u5qC85byP5pyJ6K+v77yM6K+35qC45a+5Li4uJyk7XHJcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xyXG4gICAgICBjYWxsYmFjayhlcnJvcik7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiBfanNvbk9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIGZvcm1hdEpzb24oKSAg5qC85byP5YyWSlNPTlxyXG4gKiBAcGFyYW0ge29iamVjdH0ganNvbk9ialxyXG4gKiBAcGFyYW0ge3N0cmluZ30gY2FsbGJhY2tcclxuICogKi9cclxuZ2xvYmFsLmZvcm1hdEpzb24gPSBmdW5jdGlvbiAoanNvbk9iaiwgY2FsbGJhY2spIHtcclxuICAvLyDmraPliJnooajovr7lvI/ljLnphY3op4TliJnlj5jph49cclxuICBsZXQgcmVnID0gbnVsbDtcclxuICAvLyDovazmjaLlkI7nmoTlrZfnrKbkuLLlj5jph49cclxuICBsZXQgZm9ybWF0dGVkID0gJyc7XHJcbiAgLy8g5o2i6KGM57yp6L+b5L2N5pWwXHJcbiAgbGV0IHBhZCA9IDA7XHJcbiAgLy8g5LiA5LiqdGFi5a+55bqU56m65qC85L2N5pWwXHJcbiAgbGV0IFBBRERJTkcgPSAnICAgICc7XHJcbiAgLy8ganNvbuWvueixoei9rOaNouS4uuWtl+espuS4suWPmOmHj1xyXG4gIGxldCBqc29uU3RyaW5nID0gdHJhbnNpdGlvbkpzb25Ub1N0cmluZyhqc29uT2JqLCBjYWxsYmFjayk7XHJcbiAgaWYgKCFqc29uU3RyaW5nKSB7XHJcbiAgICByZXR1cm4ganNvblN0cmluZztcclxuICB9XHJcbiAgLy8g5a2Y5YKo6ZyA6KaB54m55q6K5aSE55CG55qE5a2X56ym5Liy5q61XHJcbiAgbGV0IF9pbmRleCA9IFtdO1xyXG4gIC8vIOWtmOWCqOmcgOimgeeJueauiuWkhOeQhueahOKAnOWGjeaVsOe7hOS4reeahOW8gOWni+S9jee9ruWPmOmHj+e0ouW8lVxyXG4gIGxldCBfaW5kZXhTdGFydCA9IG51bGw7XHJcbiAgLy8g5a2Y5YKo6ZyA6KaB54m55q6K5aSE55CG55qE4oCc5YaN5pWw57uE5Lit55qE57uT5p2f5L2N572u5Y+Y6YeP57Si5byVXHJcbiAgbGV0IF9pbmRleEVuZCA9IG51bGw7XHJcbiAgLy8g5bCGanNvblN0cmluZ+Wtl+espuS4suWGheWuuemAmui/h1xcclxcbuespuWIhuWJsuaIkOaVsOe7hFxyXG4gIGxldCBqc29uQXJyYXkgPSBbXTtcclxuICAvLyDmraPliJnljLnphY3liLB7LH3nrKblj7fliJnlnKjkuKTovrnmt7vliqDlm57ovabmjaLooYxcclxuICBqc29uU3RyaW5nID0ganNvblN0cmluZy5yZXBsYWNlKC8oW1xce1xcfV0pL2csICdcXHJcXG4kMVxcclxcbicpO1xyXG4gIC8vIOato+WImeWMuemFjeWIsFssXeespuWPt+WImeWcqOS4pOi+uea3u+WKoOWbnui9puaNouihjFxyXG4gIGpzb25TdHJpbmcgPSBqc29uU3RyaW5nLnJlcGxhY2UoLyhbXFxbXFxdXSkvZywgJ1xcclxcbiQxXFxyXFxuJyk7XHJcbiAgLy8g5q2j5YiZ5Yy56YWN5YiwLOespuWPt+WImeWcqOS4pOi+uea3u+WKoOWbnui9puaNouihjFxyXG4gIGpzb25TdHJpbmcgPSBqc29uU3RyaW5nLnJlcGxhY2UoLyhcXCwpL2csICckMVxcclxcbicpO1xyXG4gIC8vIOato+WImeWMuemFjeWIsOimgei2hei/h+S4gOihjOeahOaNouihjOmcgOimgeaUueS4uuS4gOihjFxyXG4gIGpzb25TdHJpbmcgPSBqc29uU3RyaW5nLnJlcGxhY2UoLyhcXHJcXG5cXHJcXG4pL2csICdcXHJcXG4nKTtcclxuICAvLyDmraPliJnljLnphY3liLDljZXni6zlpITkuo7kuIDooYznmoQs56ym5Y+35pe26ZyA6KaB5Y675o6J5o2i6KGM77yM5bCGLOe9ruS6juWQjOihjFxyXG4gIGpzb25TdHJpbmcgPSBqc29uU3RyaW5nLnJlcGxhY2UoL1xcclxcblxcLC9nLCAnLCcpO1xyXG4gIC8vIOeJueauiuWkhOeQhuWPjOW8leWPt+S4reeahOWGheWuuVxyXG4gIGpzb25BcnJheSA9IGpzb25TdHJpbmcuc3BsaXQoJ1xcclxcbicpO1xyXG4gIGpzb25BcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChub2RlLCBpbmRleCkge1xyXG4gICAgLy8g6I635Y+W5b2T5YmN5a2X56ym5Liy5q615LitXCLnmoTmlbDph49cclxuICAgIGxldCBudW0gPSBub2RlLm1hdGNoKC9cXFwiL2cpID8gbm9kZS5tYXRjaCgvXFxcIi9nKS5sZW5ndGggOiAwO1xyXG4gICAgLy8g5Yik5patbnVt5piv5ZCm5Li65aWH5pWw5p2l56Gu5a6a5piv5ZCm6ZyA6KaB54m55q6K5aSE55CGXHJcbiAgICBpZiAobnVtICUgMiAmJiAhX2luZGV4U3RhcnQpIHtcclxuICAgICAgX2luZGV4U3RhcnQgPSBpbmRleFxyXG4gICAgfVxyXG4gICAgaWYgKG51bSAlIDIgJiYgX2luZGV4U3RhcnQgJiYgX2luZGV4U3RhcnQgIT09IGluZGV4KSB7XHJcbiAgICAgIF9pbmRleEVuZCA9IGluZGV4XHJcbiAgICB9XHJcbiAgICAvLyDlsIbpnIDopoHnibnmrorlpITnkIbnmoTlrZfnrKbkuLLmrrXnmoTlhbblrp7kvY3nva7lkoznu5PmnZ/kvY3nva7kv6Hmga/lrZjlhaXvvIzlubblr7nlupTph43nva7lvIDlp4vml7blkoznu5PmnZ/lj5jph49cclxuICAgIGlmIChfaW5kZXhTdGFydCAmJiBfaW5kZXhFbmQpIHtcclxuICAgICAgX2luZGV4LnB1c2goe1xyXG4gICAgICAgIHN0YXJ0OiBfaW5kZXhTdGFydCxcclxuICAgICAgICBlbmQ6IF9pbmRleEVuZFxyXG4gICAgICB9KVxyXG4gICAgICBfaW5kZXhTdGFydCA9IG51bGxcclxuICAgICAgX2luZGV4RW5kID0gbnVsbFxyXG4gICAgfVxyXG4gIH0pXHJcbiAgLy8g5byA5aeL5aSE55CG5Y+M5byV5Y+35Lit55qE5YaF5a6577yM5bCG5aSa5L2Z55qEXCLljrvpmaRcclxuICBfaW5kZXgucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XHJcbiAgICBsZXQgbmV3QXJyYXkgPSBqc29uQXJyYXkuc2xpY2UoaXRlbS5zdGFydCwgaXRlbS5lbmQgKyAxKVxyXG4gICAganNvbkFycmF5LnNwbGljZShpdGVtLnN0YXJ0LCBpdGVtLmVuZCArIDEgLSBpdGVtLnN0YXJ0LCBuZXdBcnJheS5qb2luKCcnKSlcclxuICB9KVxyXG4gIC8vIOWlluWkhOeQhuWQjueahOaVsOe7hOmAmui/h1xcclxcbui/nuaOpeespumHjee7hOS4uuWtl+espuS4slxyXG4gIGpzb25TdHJpbmcgPSBqc29uQXJyYXkuam9pbignXFxyXFxuJyk7XHJcbiAgLy8g5bCG5Yy56YWN5YiwOuWQjuS4uuWbnui9puaNouihjOWKoOWkp+aLrOWPt+abv+aNouS4uuWGkuWPt+WKoOWkp+aLrOWPt1xyXG4gIGpzb25TdHJpbmcgPSBqc29uU3RyaW5nLnJlcGxhY2UoL1xcOlxcclxcblxcey9nLCAnOnsnKTtcclxuICAvLyDlsIbljLnphY3liLA65ZCO5Li65Zue6L2m5o2i6KGM5Yqg5Lit5ous5Y+35pu/5o2i5Li65YaS5Y+35Yqg5Lit5ous5Y+3XHJcbiAganNvblN0cmluZyA9IGpzb25TdHJpbmcucmVwbGFjZSgvXFw6XFxyXFxuXFxbL2csICc6WycpO1xyXG4gIC8vIOWwhuS4iui/sOi9rOaNouWQjueahOWtl+espuS4suWGjeasoeS7pVxcclxcbuWIhuWJsuaIkOaVsOe7hFxyXG4gIGpzb25BcnJheSA9IGpzb25TdHJpbmcuc3BsaXQoJ1xcclxcbicpO1xyXG4gIC8vIOWwhui9rOaNouWujOaIkOeahOWtl+espuS4suagueaNrlBBRERJTkflgLzmnaXnu4TlkIjmiJDmnIDnu4jnmoTlvaLmgIFcclxuICBqc29uQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaW5kZXgpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0pXHJcbiAgICBsZXQgaSA9IDA7XHJcbiAgICAvLyDooajnpLrnvKnov5vnmoTkvY3mlbDvvIzku6V0YWLkvZzkuLrorqHmlbDljZXkvY1cclxuICAgIGxldCBpbmRlbnQgPSAwO1xyXG4gICAgLy8g6KGo56S657yp6L+b55qE5L2N5pWw77yM5Lul56m65qC85L2c5Li66K6h5pWw5Y2V5L2NXHJcbiAgICBsZXQgcGFkZGluZyA9ICcnO1xyXG4gICAgaWYgKGl0ZW0ubWF0Y2goL1xceyQvKSB8fCBpdGVtLm1hdGNoKC9cXFskLykpIHtcclxuICAgICAgLy8g5Yy56YWN5Yiw5Lule+WSjFvnu5PlsL7nmoTml7blgJlpbmRlbnTliqAxXHJcbiAgICAgIGluZGVudCArPSAxXHJcbiAgICB9IGVsc2UgaWYgKGl0ZW0ubWF0Y2goL1xcfSQvKSB8fCBpdGVtLm1hdGNoKC9cXF0kLykgfHwgaXRlbS5tYXRjaCgvXFx9LCQvKSB8fCBpdGVtLm1hdGNoKC9cXF0sJC8pKSB7XHJcbiAgICAgIC8vIOWMuemFjeWIsOS7pX3lkoxd57uT5bC+55qE5pe25YCZaW5kZW505YePMVxyXG4gICAgICBpZiAocGFkICE9PSAwKSB7XHJcbiAgICAgICAgcGFkIC09IDFcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaW5kZW50ID0gMFxyXG4gICAgfVxyXG4gICAgZm9yIChpID0gMDsgaSA8IHBhZDsgaSsrKSB7XHJcbiAgICAgIHBhZGRpbmcgKz0gUEFERElOR1xyXG4gICAgfVxyXG4gICAgZm9ybWF0dGVkICs9IHBhZGRpbmcgKyBpdGVtICsgJ1xcclxcbidcclxuICAgIHBhZCArPSBpbmRlbnRcclxuICB9KVxyXG4gIC8vIOi/lOWbnueahOaVsOaNrumcgOimgeWOu+mZpOS4pOi+ueeahOepuuagvFxyXG4gIHJldHVybiBmb3JtYXR0ZWQudHJpbSgpO1xyXG59XHJcbiIsIi8qKlxyXG4gKiBDcmVhdGUgYSBuZXcgYnVpbGRlcnNpZGViYXIgb24gdGhpcyBqUXVlcnkgb2JqZWN0LlxyXG4gKlxyXG4gKiBAZXhhbXBsZVxyXG4gKiB2YXIgYnVpbGRlcnNpZGViYXIgPSAkKCcjYnVpbGRlcnNpZGViYXInKS5idWlsZGVyc2lkZWJhcigpO1xyXG4gKlxyXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIC0gT3B0aW9uYWwgb3B0aW9ucyBvYmplY3RcclxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLnBvc2l0aW9uPWxlZnRdIC0gUG9zaXRpb24gb2YgdGhlIGJ1aWxkZXJzaWRlYmFyOiAnbGVmdCcgb3IgJ3JpZ2h0J1xyXG4gKiBAcmV0dXJucyB7alF1ZXJ5fVxyXG4gKi9cclxuXHJcbnZhciBjdXJyZW50SUQgPSBudWxsO1xyXG5cclxuLy8gb3B0aW9u5Lit5Y+v5Lul5re75Yqg5Zue6LCD5Ye95pWwXHJcbiQuZm4uYnVpbGRlcnNpZGViYXIgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gIHZhciAkc2lkZWJhciA9IHRoaXM7XHJcbiAgdmFyICR0YWJzID0gJHNpZGViYXIuZmluZCgndWwuYnVpbGRlcnNpZGViYXItdGFicywgLmJ1aWxkZXJzaWRlYmFyLXRhYnMgPiB1bCcpO1xyXG4gIHZhciAkY29udGFpbmVyID0gJHNpZGViYXIuY2hpbGRyZW4oJy5idWlsZGVyc2lkZWJhci1jb250ZW50JykuZmlyc3QoKTtcclxuXHJcbiAgb3B0aW9ucyA9ICQuZXh0ZW5kKHtcclxuICAgIHBvc2l0aW9uOiAnbGVmdCcsXHJcbiAgICBvbk9wZW5lZDogZnVuY3Rpb24gKGlkKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdzaWRlYmFyIHJ1biBvbk9wZW5lZCEgaWQ6JyArIGlkKTtcclxuICAgIH0sXHJcbiAgICBvbkNsb3NlZDogZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnc2lkZWJhciBydW4gb25DbG9zZWQhJyk7XHJcbiAgICB9LFxyXG4gIH0sIG9wdGlvbnMgfHwge30pO1xyXG5cclxuICAkc2lkZWJhci5vcHRpb25zID0gb3B0aW9ucztcclxuXHJcbiAgJHNpZGViYXIuYWRkQ2xhc3MoJ2J1aWxkZXJzaWRlYmFyLScgKyBvcHRpb25zLnBvc2l0aW9uKTtcclxuXHJcbiAgJHRhYnMuY2hpbGRyZW4oJ2xpJykuY2hpbGRyZW4oJ2FbaHJlZl49XCIjXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGlmICh0aGlzLmhhc2guc2xpY2UoMSkgIT09ICdob21lJykge1xyXG4gICAgICB2YXIgJHRhYiA9ICQodGhpcykuY2xvc2VzdCgnbGknKTtcclxuICAgICAgaWYgKCR0YWIuaGFzQ2xhc3MoJ2FjdGl2ZScpKVxyXG4gICAgICAgICRzaWRlYmFyLmNsb3NlKCk7XHJcbiAgICAgIGVsc2UgaWYgKCEkdGFiLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XHJcbiAgICAgICAgJHNpZGViYXIub3Blbih0aGlzLmhhc2guc2xpY2UoMSksICR0YWIpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAoY3VycmVudElEKSB7XHJcbiAgICAgICAgaWYgKCRzaWRlYmFyLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSlcclxuICAgICAgICAgICRzaWRlYmFyLm9wZW4oY3VycmVudElEKTtcclxuICAgICAgICBlbHNlXHJcbiAgICAgICAgICAkc2lkZWJhci5jbG9zZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICRzaWRlYmFyLmZpbmQoJy5idWlsZGVyc2lkZWJhci1jbG9zZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICRzaWRlYmFyLmNsb3NlKCk7XHJcbiAgfSk7XHJcblxyXG4gIC8qKlxyXG4gICAqIE9wZW4gYnVpbGRlcnNpZGViYXIgKGlmIG5lY2Vzc2FyeSkgYW5kIHNob3cgdGhlIHNwZWNpZmllZCB0YWIuXHJcbiAgICpcclxuICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgLSBUaGUgaWQgb2YgdGhlIHRhYiB0byBzaG93ICh3aXRob3V0IHRoZSAjIGNoYXJhY3RlcilcclxuICAgKiBAcGFyYW0ge2pRdWVyeX0gWyR0YWJdIC0gVGhlIGpRdWVyeSBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSB0YWIgbm9kZSAodXNlZCBpbnRlcm5hbGx5IGZvciBlZmZpY2llbmN5KVxyXG4gICAqL1xyXG4gICRzaWRlYmFyLm9wZW4gPSBmdW5jdGlvbiAoaWQsICR0YWIpIHtcclxuICAgIGlmICh0eXBlb2YgJHRhYiA9PT0gJ3VuZGVmaW5lZCcpXHJcbiAgICAgICR0YWIgPSAkdGFicy5maW5kKCdsaSA+IGFbaHJlZj1cIiMnICsgaWQgKyAnXCJdJykucGFyZW50KCk7XHJcblxyXG4gICAgLy8gaGlkZSBvbGQgYWN0aXZlIGNvbnRlbnRzXHJcbiAgICAkY29udGFpbmVyLmNoaWxkcmVuKCcuYnVpbGRlcnNpZGViYXItcGFuZS5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgLy8gc2hvdyBuZXcgY29udGVudFxyXG4gICAgJGNvbnRhaW5lci5jaGlsZHJlbignIycgKyBpZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgIC8vIHJlbW92ZSBvbGQgYWN0aXZlIGhpZ2hsaWdodHNcclxuICAgICR0YWJzLmNoaWxkcmVuKCdsaS5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgLy8gc2V0IG5ldyBoaWdobGlnaHRcclxuICAgICR0YWIuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICRzaWRlYmFyLnRyaWdnZXIoJ2NvbnRlbnQnLCB7J2lkJzogaWR9KTtcclxuXHJcbiAgICBpZiAoJHNpZGViYXIuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKSB7XHJcbiAgICAgIC8vIG9wZW4gYnVpbGRlcnNpZGViYXJcclxuICAgICAgJHNpZGViYXIudHJpZ2dlcignb3BlbmluZycpO1xyXG4gICAgICAkc2lkZWJhci5yZW1vdmVDbGFzcygnY29sbGFwc2VkJyk7XHJcbiAgICB9XHJcblxyXG4gICAgJHNpZGViYXIuZmluZCgnI2J1aWxkZXItdGl0bGUtaW1hZ2UnKS5zaG93KCk7XHJcblxyXG4gICAgY3VycmVudElEID0gaWQ7XHJcblxyXG4gICAgJHNpZGViYXIub3B0aW9ucy5vbk9wZW5lZChpZCk7XHJcbiAgfTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ2xvc2UgdGhlIGJ1aWxkZXJzaWRlYmFyIChpZiBuZWNlc3NhcnkpLlxyXG4gICAqL1xyXG4gICRzaWRlYmFyLmNsb3NlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgLy8gcmVtb3ZlIG9sZCBhY3RpdmUgaGlnaGxpZ2h0c1xyXG4gICAgJHRhYnMuY2hpbGRyZW4oJ2xpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAkc2lkZWJhci5maW5kKCcjYnVpbGRlci10aXRsZS1pbWFnZScpLmhpZGUoKTtcclxuXHJcbiAgICBpZiAoISRzaWRlYmFyLmhhc0NsYXNzKCdjb2xsYXBzZWQnKSkge1xyXG4gICAgICAvLyBjbG9zZSBidWlsZGVyc2lkZWJhclxyXG4gICAgICAkc2lkZWJhci50cmlnZ2VyKCdjbG9zaW5nJyk7XHJcbiAgICAgICRzaWRlYmFyLmFkZENsYXNzKCdjb2xsYXBzZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAkc2lkZWJhci5vcHRpb25zLm9uQ2xvc2VkKCk7XHJcbiAgfTtcclxuXHJcbiAgcmV0dXJuICRzaWRlYmFyO1xyXG59O1xyXG4iLCJnbG9iYWwubG9hZEh0bWwgPSBhc3luYyBmdW5jdGlvbiAoZnVuYykge1xyXG4gICQoXCIuY29udGVudC1lZGl0b3ItcGFuZS1wb2ludFwiKS5sb2FkKFwiLi93aW5kb3cvcG9pbnQuaHRtbFwiLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiLmNvbnRlbnQtZWRpdG9yLXBhbmUtbGluZVwiKS5sb2FkKFwiLi93aW5kb3cvbGluZS5odG1sXCIsIG51bGwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChcIi5jb250ZW50LWVkaXRvci1wYW5lLXBvbHlnb25cIikubG9hZChcIi4vd2luZG93L3BvbHlnb24uaHRtbFwiLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJChcIi5jb250ZW50LWVkaXRvci1wYW5lLWJhc2VtYXBcIikubG9hZChcIi4vd2luZG93L2Jhc2VtYXAuaHRtbFwiLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAkKFwiI2FuYWx5c2lzIC5hbmFseXNpcy1tYWluXCIpLmxvYWQoXCIuL3dpbmRvdy9hbmFseXNpcy9tYWluLmh0bWxcIiwgbnVsbCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkKFwiI3NldHRpbmdzXCIpLmxvYWQoXCIuL3dpbmRvdy9zZXR0aW5nLmh0bWxcIiwgbnVsbCwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICQoXCIuY29udGVudC1lZGl0b3ItcGFuZS1oYW5kLWRyYXdcIikubG9hZChcIi4vd2luZG93L2hhbmRfZHJhdy5odG1sXCIsIG51bGwsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoXCIjaGFuZC1kcmF3LWVkaXQtY29udGVudFwiKS5sb2FkKFwiLi93aW5kb3cvaGFuZF9kcmF3X2VkaXQuaHRtbFwiLCBudWxsLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgIGlmIChmdW5jKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZnVuYygpO1xyXG4gICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbmdsb2JhbC5pbml0SHRtbCA9IGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ1VpLmdldEluc3RhbmNlKCkuaW5pdCgpO1xyXG5cclxuLy8g5re75Yqg5Zu+5bGC5pa55byP55qE5YiX6KGoXHJcbiAgJChcIi5hZGQtbGF5ZXItdGFnXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIGxldCBkaXNwbGF5ID0gJChcIi5hZGQtbGF5ZXItbGlzdFwiKS5jc3MoXCJkaXNwbGF5XCIpO1xyXG4gICAgaWYgKGRpc3BsYXkgPT0gJ25vbmUnKSB7XHJcbiAgICAgICQoXCIuYWRkLWxheWVyLWxpc3RcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgICAkKFwiLmFkZC1sYXllci1saXN0XCIpLmZvY3VzKCk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gICQoJy5idWlsZGVyc2lkZXJiYXItYmFjaycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIuc2lkZWJhci1jb250ZW50LXBhbmVsXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgJChcIi5jb250ZW50LWVkaXRvci1wYW5lXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgJChcIi5zaWRlYmFyLWxheWVycy1tYW5hZ2VyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuXHJcbiAgICAvLyDov5vooYzmlbDmja7nmoTkuqTmjaJcclxuICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgICBsZXQgcmVuZGVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXIuZ2V0UmVuZGVyKCk7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgICBsZXQgaGFuZERyYXdMYXllcnNDb250YWluZXIgPSBidWlsZFByb2plY3QuaGFuZERyYXdMYXllcnNDb250YWluZXI7XHJcblxyXG4gICAgcmVuZGVyLmRhdGFTb3VyY2UgPSBoYW5kRHJhd0xheWVyc0NvbnRhaW5lci5kYXRhU291cmNlKCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIOmAmui/h+i/nOeoi+aWh+S7tua3u+WKoFxyXG4gIHdpbmRvdy5sb2FkRmlsZURpYWxvZyA9IG51bGw7XHJcbiAgLy8gaWXmqKHlvI/kuItjbGlja+eahOWTjeW6lOWcqGJsdXLkuYvlkI7vvIzmlLnkuLptb3VzZWRvd27kv67lpI3mraTpl67pophcclxuICAkKFwiI2FkZC1sYXllci1saXN0LWl0ZW0tZmlsZVwiKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIi5hZGQtbGF5ZXItbGlzdFwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICBpZiAoIXdpbmRvdy5sb2FkRmlsZURpYWxvZykge1xyXG4gICAgICB3aW5kb3cubG9hZEZpbGVEaWFsb2cgPSBuZXcgS1EuQnVpbGRlci5CdWlsZGVyVWkuRmlsZUxvYWREaWFsb2coXCIjbG9hZC1maWxlLWxheWVyLWNvbnRhaW5lclwiLCB7ZmlsdGVyOiBcImdlb2pzb25cIn0pO1xyXG4gICAgICB3aW5kb3cubG9hZEZpbGVEaWFsb2cub24oJ2xvYWQnLCBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGF3YWl0IEtRLkJ1aWxkZXIuQnVpbGRlckNvbW1vbi5hZGROZXdMYXllcihkYXRhLmRhdGFTb3VyY2VJbmZvKTtcclxuICAgICAgfSlcclxuXHJcbiAgICAgIHdpbmRvdy5sb2FkRmlsZURpYWxvZy5vbignZGVsZXRlJywgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAvLyDliJ3lp4vljJbliKDpmaTlt6XnqIvmjInpkq5cclxuICAgICAgICAkKFwiI2NvbmZpcm0tZGl2XCIpLmtlbmRvQ29uZmlybSh7XHJcbiAgICAgICAgICB0aXRsZTogXCLliKDpmaTov5znqIvlm77lsYLmlofku7ZcIixcclxuICAgICAgICAgIGNvbnRlbnQ6IFwi6L+c56iL5Zu+5bGC5paH5Lu25Yig6Zmk5ZCO5peg5rOV5oGi5aSN77yM56Gu5a6a5Yig6Zmk77yfXCIsXHJcbiAgICAgICAgICBtZXNzYWdlczoge1xyXG4gICAgICAgICAgICBva1RleHQ6IFwi56Gu5a6aXCIsXHJcbiAgICAgICAgICAgIGNhbmNlbFRleHQ6IFwi5Y+W5raIXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0pLmRhdGEoXCJrZW5kb0NvbmZpcm1cIikucmVzdWx0LmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgkKCc8ZGl2IGlkPVwiY29uZmlybS1kaXZcIj4nKSk7XHJcbiAgICAgICAgICB3aW5kb3cubG9hZEZpbGVEaWFsb2cuZmlyZShcImRlbGV0ZV9ldmVudFwiLCBkYXRhKTtcclxuICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJCgnPGRpdiBpZD1cImNvbmZpcm0tZGl2XCI+JykpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgLy8g5Yig6Zmk5Zu+5bGC5LqL5Lu2XHJcbiAgICAgIHdpbmRvdy5sb2FkRmlsZURpYWxvZy5vbihcImRlbGV0ZV9ldmVudFwiLCBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgIGF3YWl0IGRlbGV0ZURhdGFGaWxlKGRhdGEuZGF0YVNvdXJjZUluZm9bJ3VybCddKTtcclxuICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2xvYWQtZmlsZS1sYXllci1jb250YWluZXJcIikuZGF0YShcImtlbmRvV2luZG93XCIpLmNlbnRlcigpLm9wZW4oKTtcclxuICB9KVxyXG5cclxuICAvLyDpgJrov4fmlbDmja7lupPmt7vliqBcclxuICB3aW5kb3cubG9hZERhdGFTZXJ2aWNlRGlhbG9nID0gbnVsbDtcclxuICAkKFwiI2FkZC1sYXllci1saXN0LWl0ZW0tZGF0YWJhc2VcIikub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uICgpIHtcclxuICAgICQoXCIuYWRkLWxheWVyLWxpc3RcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgaWYgKCF3aW5kb3cubG9hZERhdGFTZXJ2aWNlRGlhbG9nKSB7XHJcbiAgICAgIHdpbmRvdy5sb2FkRGF0YVNlcnZpY2VEaWFsb2cgPSBuZXcgS1EuQnVpbGRlci5CdWlsZGVyVWkuRGF0YVNlcnZpY2VMb2FkRGlhbG9nKFwiI2xvYWQtZGF0YWJhc2UtbGF5ZXItY29udGFpbmVyXCIsIHtmaWx0ZXI6IFwiZ2VvanNvblwifSk7XHJcblxyXG4gICAgICB3aW5kb3cubG9hZERhdGFTZXJ2aWNlRGlhbG9nLm9uKCdsb2FkJywgYXN5bmMgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBhd2FpdCBLUS5CdWlsZGVyLkJ1aWxkZXJDb21tb24uYWRkTmV3TGF5ZXIoZGF0YS5kYXRhU291cmNlSW5mbyk7XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgJChcIiNsb2FkLWRhdGFiYXNlLWxheWVyLWNvbnRhaW5lclwiKS5kYXRhKFwia2VuZG9XaW5kb3dcIikuY2VudGVyKCkub3BlbigpO1xyXG4gIH0pXHJcblxyXG4gIC8vIOmAmui/h3dlYua3u+WKoFxyXG4gIHdpbmRvdy53ZWJMYXllckxvYWREaWFsb2cgPSBudWxsO1xyXG4gIGxldCBtYXBWaWV3ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpLm1hcFZpZXc7XHJcbiAgJChcIiNhZGQtbGF5ZXItbGlzdC1pdGVtLXdlYlwiKS5vbignbW91c2Vkb3duJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIi5hZGQtbGF5ZXItbGlzdFwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICBpZiAoIXdpbmRvdy53ZWJMYXllckxvYWREaWFsb2cpIHtcclxuICAgICAgd2luZG93LndlYkxheWVyTG9hZERpYWxvZyA9IG5ldyBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5XZWJMYXllckxvYWREaWFsb2coXCIjbG9hZC13ZWItbGF5ZXItY29udGFpbmVyXCIpO1xyXG5cclxuICAgICAgd2luZG93LndlYkxheWVyTG9hZERpYWxvZy5vbihcImNvbmZpcm1cIiwgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICBLUS5Db250cm9sLldhaXRpbmcuc2hvdyhtYXBWaWV3Ll9nZXRNYXAoKSwgJ3BpbicsICdtZXRlcicpO1xyXG5cclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgLy9UT0RPIOacseiwi+iwg+eUqFxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJkYXRhU291cmNlSW5mb1wiLCBkYXRhLmRhdGFTb3VyY2VJbmZvKTtcclxuICAgICAgICAgIEtRLkJ1aWxkZXIuQnVpbGRlckNvbW1vbi5hZGROZXdMYXllcihkYXRhLmRhdGFTb3VyY2VJbmZvKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgS1EuQ29udHJvbC5XYWl0aW5nLmNsb3NlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9KVxyXG5cclxuICAgIH1cclxuXHJcbiAgICAkKFwiI2xvYWQtd2ViLWxheWVyLWNvbnRhaW5lclwiKS5kYXRhKFwia2VuZG9XaW5kb3dcIikuY2VudGVyKCkub3BlbigpO1xyXG5cclxuICB9KVxyXG5cclxuICAvLyDliJvlu7rms6jorrDlm77lsYJcclxuICAkKFwiI2FkZC1sYXllci1saXN0LWl0ZW0taGFuZC1kcmF3XCIpLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiLmFkZC1sYXllci1saXN0XCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG5cclxuICAgIEtRLkNvbnRyb2wuV2FpdGluZy5zaG93KG1hcFZpZXcuX2dldE1hcCgpLCAncGluJywgJ21ldGVyJyk7XHJcblxyXG4gICAgdHJ5IHtcclxuICAgICAgbGV0IGRhdGFTb3VyY2VJbmZvID0ge1xyXG4gICAgICAgIG5hbWU6ICfmnKrlkb3lkI3ms6jorrDlm77lsYInLFxyXG4gICAgICAgIHR5cGU6ICdIQU5EX0RSQVdfREFUQScsXHJcbiAgICAgIH07XHJcblxyXG4gICAgICBLUS5CdWlsZGVyLkJ1aWxkZXJDb21tb24uYWRkTmV3TGF5ZXIoZGF0YVNvdXJjZUluZm8pO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgS1EuQ29udHJvbC5XYWl0aW5nLmNsb3NlKCk7XHJcbiAgICB9XHJcbiAgfSlcclxuXHJcbiAgLy8g5re75Yqg5Zu+5bGC5YiX6KGo5pi+56S65LqL5Lu25Yik5patXHJcbiAgJChcIi5hZGQtbGF5ZXItbGlzdFwiKS5ibHVyKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJy5hZGQtbGF5ZXItdGFnJykuY3NzKFwiZm9jdXNcIik7XHJcbiAgICAkKFwiLmFkZC1sYXllci1saXN0XCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOWKoOi9vee9kee7nHByb2plY3Rsb2FkUHJvamVjdFxyXG5nbG9iYWwubG9hZFByb2plY3QgPSBhc3luYyBmdW5jdGlvbiAocHJvamVjdF91cmwpIHtcclxuICB0cnkge1xyXG4gICAgbGV0IHByb2plY3RTdHJpbmcgPSBhd2FpdCBLUS5Db21tb24uTmV0d29ya1Rvb2xzLmh0dHBHZXRBc3luYyhwcm9qZWN0X3VybCk7XHJcbiAgICAvLyDlt6XnqIvmlofku7bpnIDopoHop6PnoIFcclxuICAgIGxldCBwcm9qZWN0SnNvbiA9IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KHByb2plY3RTdHJpbmcpKTtcclxuXHJcbiAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gICAgLy8gdXJs5pyA5ZCO6YOo5YiG5Li6dGFza0lkXHJcbiAgICBsZXQgdGFza0lkID0gS1EuQ29tbW9uLkNvbW1vblRvb2xzLmdldFVybG5hbWUocHJvamVjdF91cmwpO1xyXG5cclxuICAgIC8vIGNvbmZpZ+S4reWKoOi9veeahGxheWVy5L+h5oGv5L+d5a2Y5YiwYnVpbGRQcm9qZWN05LitXHJcbiAgICBidWlsZFByb2plY3QucmVsb2FkQ29uZmlnID0gcHJvamVjdEpzb247XHJcblxyXG4gICAgLy8g6K+75Y+W55qE5bel56iL6YWN572u5L+h5oGvXHJcbiAgICBsZXQgcmVsb2FkQ29uZmlnID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpLnJlbG9hZENvbmZpZztcclxuICAgIGxldCBwcm9qZWN0TmFtZSA9IHJlbG9hZENvbmZpZy50aXRsZTtcclxuICAgIGxldCByZWxvYWRMYXllcnMgPSByZWxvYWRDb25maWcubGF5ZXJzO1xyXG5cclxuICAgIC8vIOa4hemZpOWOn+acieeahOWbvuWxglxyXG4gICAgS1EuQnVpbGRlci5CdWlsZGVyQ29tbW9uLmNsZWFyTGF5ZXJzQ29udGFpbmVyKCk7XHJcblxyXG4gICAgLy8g6YeN5o6ScmVsb2FkTGF5ZXJz55qE6aG65bqPXHJcbiAgICBsZXQgb3JkZXJMYXllcnMgPSBbXTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVsb2FkTGF5ZXJzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGxldCBsYXllcklkID0gcmVsb2FkTGF5ZXJzW2ldWzBdO1xyXG4gICAgICBsZXQgaW5kZXggPSBidWlsZFByb2plY3QucmVsb2FkQ29uZmlnLmxheWVyc09yZGVyTWFwW2xheWVySWRdO1xyXG5cclxuICAgICAgb3JkZXJMYXllcnMuc3BsaWNlKGluZGV4LCAwLCByZWxvYWRMYXllcnNbaV1bMV0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOaBouWkjWhhbmQtZHJhd+WbvuWxglxyXG4gICAgbGV0IG1hcEdlb21hbiA9IEtRLk1hcC5NYXBHZW9tYW4uZ2V0SW5zdGFuY2UoKTtcclxuICAgIGlmIChyZWxvYWRDb25maWcuZ2VvbWFuQXJyYXkpIHtcclxuICAgICAgbWFwR2VvbWFuLmZyb21TYXZlU3RyaW5nKHJlbG9hZENvbmZpZy5nZW9tYW5BcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IG1hcFZpZXcgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkubWFwVmlldztcclxuICAgIEtRLkNvbnRyb2wuV2FpdGluZy5zaG93KG1hcFZpZXcuX2dldE1hcCgpLCAncGluJywgJ21ldGVyJyk7XHJcbiAgICBmb3IgKHZhciBpbmRleCA9IDA7IGluZGV4IDwgb3JkZXJMYXllcnMubGVuZ3RoOyBpbmRleCsrKSB7XHJcbiAgICAgIGxldCB2YWwgPSBvcmRlckxheWVyc1tpbmRleF07XHJcbiAgICAgIGxldCBmZWF0dXJlVHlwZSA9IHZhbC5mZWF0dXJlVHlwZTtcclxuICAgICAgbGV0IG9wdGlvbnMgPSB2YWwub3B0aW9ucztcclxuICAgICAgbGV0IGRhdGFTb3VyY2VJbmZvID0gdmFsLmRhdGFTb3VyY2U7XHJcblxyXG4gICAgICBsZXQgbGF5ZXIgPSBhd2FpdCBLUS5CdWlsZGVyLkJ1aWxkZXJDb21tb24uYWRkTmV3TGF5ZXJXaXRob3V0V2FpdGluZ0RpYWxvZyhkYXRhU291cmNlSW5mbyk7XHJcbiAgICAgIGxheWVyLnNldFJlbmRlclR5cGUob3B0aW9ucy5yZW5kZXJUeXBlLCBtYXBWaWV3KTtcclxuXHJcbiAgICAgIC8vIOaJi+e7mOWbvuWxgiDpnIDopoHov5jljp9kYXRhU291cmNlXHJcbiAgICAgIGlmIChsYXllci5yZW5kZXJUeXBlID09PSBcImhhbmQtZHJhd1wiKSB7XHJcbiAgICAgICAgbGF5ZXIuZ2V0UmVuZGVyKCkuc2V0RGF0YVNvdXJjZSh2YWwucmVuZGVyRGF0YVNvdXJjZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIOmHjeaWsOiuvue9rmxheWVy55qEb3B0aW9uc1xyXG4gICAgICBsZXQgcmVuZGVyID0gbGF5ZXIuZ2V0UmVuZGVyKCk7XHJcbiAgICAgIHJlbmRlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xyXG4gICAgICBsYXllci5yZW5kZXJUeXBlID0gb3B0aW9ucy5yZW5kZXJUeXBlO1xyXG4gICAgICAvLyDmoLnmja5vcHRpb27ph43mlrDnlJ/miJBvcHRpb25zLnRoZW1hdGljQ29sb3JzXHJcbiAgICAgIHdpbmRvdy5idWlsZGVySW5pdERvbXMucmVmcmVzaFRoZW1hdGljQ29sb3JzKGxheWVyLCBvcHRpb25zKTtcclxuXHJcbiAgICAgIC8vIOiuvue9ruW9k+WJjea/gOa0u+WbvuWxgu+8jOWPiua4suafk+eahOagt+W8j++8iGJhc2lj77yMc2luZ2xl6L+Y5pivc2VjdGlvbu+8iVxyXG4gICAgICBidWlsZFByb2plY3Quc2V0dGluZy5sYXllciA9IGxheWVyO1xyXG5cclxuICAgICAgLy8g5Yi35paw5Zu+5bGC55qEbW9kZWzkv6Hmga9cclxuICAgICAgc3dpdGNoIChmZWF0dXJlVHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ3BvaW50JzpcclxuICAgICAgICAgIG9uUG9pbnRMYXllclJlYWR5KCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdsaW5lJzpcclxuICAgICAgICAgIG9uTGluZUxheWVyUmVhZHkoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ3BvbHlnb24nOlxyXG4gICAgICAgICAgb25Qb2x5Z29uTGF5ZXJSZWFkeSgpO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIFRPRE8g5oGi5aSN5bel56iL55qE6K6+572u5L+h5oGvXHJcbiAgICAvLyDph43mlrDmi4nlj5bkuIDkuKrlt6XnqIvml7bvvIzlpoLmnpzlvZPliY3pobXpnaLmsqHmnInlm77lsYLpgInkuK1vcuW6leWbvuWbvuWxgu+8iOS4jeWtmOWcqG1vZGVs77yJ77yMcmVuZGVy5LiN5a2Y5ZyocmVuZGVyX21vZGVs77yM5Lya5oql6ZSZ6K+vXHJcbiAgICAvLyB3aW5kb3cuYnVpbGRlckluaXREb21zLnJlbmRlcigpO1xyXG4gICAgJChcIiNjdXJyZW50LXByb2plY3QtbmFtZVwiKS50ZXh0KHByb2plY3ROYW1lKTtcclxuICAgIC8vIOmHjeaWsOi1i+WAvOe7mXRhc2tJZCwg5L+d5a2Y5bel56iL5omN6IO96KaG55uW5Y6f5bel56iLXHJcbiAgICBsZXQgcHJvamVjdE1hbmFnZXIgPSBLUS5CdWlsZGVyLlByb2plY3RNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICBwcm9qZWN0TWFuYWdlci50YXNrSWQgPSB0YXNrSWQ7XHJcblxyXG4gICAgLy8g5oGi5aSNbWFw55qE5Lit5b+D54K55Y+KbGV2ZWxcclxuICAgIC8vIG1hcFZpZXcuem9vbVRvTWFwKCk7XHJcbiAgICBtYXBWaWV3LnNldFZpZXcoW3JlbG9hZENvbmZpZy5jZW50ZXIueSwgcmVsb2FkQ29uZmlnLmNlbnRlci54XSwgcmVsb2FkQ29uZmlnLmxldmVsKTtcclxuXHJcbiAgICBLUS5Db250cm9sLk5vdGlmaWNhdGlvbi5nZXRJbnN0YW5jZSgpLnNob3dTdWNjZXNzKFwi5Yqg6L295bel56iL5oiQ5Yqf77yBXCIpO1xyXG4gIH0gY2F0Y2ggKGUpIHtcclxuICAgIEtRLkNvbnRyb2wuTm90aWZpY2F0aW9uLmdldEluc3RhbmNlKCkuc2hvd0Vycm9yKFwi5Yqg6L295aSx6LSl77yM6K+35qOA5p+l572R57uc77yBXCIpO1xyXG4gIH0gZmluYWxseSB7XHJcbiAgICBLUS5Db250cm9sLldhaXRpbmcuY2xvc2UoKTtcclxuICB9XHJcbn1cclxuXHJcbmdsb2JhbC5kZWxldGVEYXRhRmlsZSA9IGFzeW5jIGZ1bmN0aW9uICh1cmwpIHtcclxuICBsZXQgbWFwVmlldyA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKS5tYXBWaWV3O1xyXG4gIEtRLkNvbnRyb2wuV2FpdGluZy5zaG93KG1hcFZpZXcuX2dldE1hcCgpLCAncGluJywgJ21ldGVyJyk7XHJcblxyXG4gIHRyeSB7XHJcbiAgICBsZXQgcmVzdWx0ID0gYXdhaXQgZGVsZXRlRmlsZSh1cmwpO1xyXG5cclxuICAgIGlmIChyZXN1bHQgPT09ICdzdWNjZXNzJykge1xyXG4gICAgICBLUS5Db250cm9sLk5vdGlmaWNhdGlvbi5nZXRJbnN0YW5jZSgpLnNob3dTdWNjZXNzKFwi5Yig6Zmk5pWw5o2u5oiQ5Yqf77yBXCIpO1xyXG4gICAgICBhd2FpdCB3aW5kb3cubG9hZEZpbGVEaWFsb2cuX3JlZnJlc2hEYXRhKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBLUS5Db250cm9sLk5vdGlmaWNhdGlvbi5nZXRJbnN0YW5jZSgpLnNob3dFcnJvcihcIuWIoOmZpOaVsOaNruWksei0pe+8gVwiKTtcclxuICAgIH1cclxuICB9IGZpbmFsbHkge1xyXG4gICAgS1EuQ29udHJvbC5XYWl0aW5nLmNsb3NlKCk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwuZGVsZXRlUHJvamVjdEZpbGUgPSBhc3luYyBmdW5jdGlvbiAodXJsKSB7XHJcbiAgbGV0IG1hcFZpZXcgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkubWFwVmlldztcclxuICBLUS5Db250cm9sLldhaXRpbmcuc2hvdyhtYXBWaWV3Ll9nZXRNYXAoKSwgJ3BpbicsICdtZXRlcicpO1xyXG5cclxuICB0cnkge1xyXG4gICAgbGV0IHJlc3VsdCA9IGF3YWl0IGRlbGV0ZUZpbGUodXJsKTtcclxuXHJcbiAgICBpZiAocmVzdWx0ID09PSAnc3VjY2VzcycpIHtcclxuICAgICAgS1EuQ29udHJvbC5Ob3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5zaG93U3VjY2VzcyhcIuWIoOmZpOW3peeoi+aIkOWKn++8gVwiKTtcclxuICAgICAgYXdhaXQgd2luZG93LmxvYWRQcm9qZWN0RGlhbG9nLl9yZWZyZXNoRGF0YSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgS1EuQ29udHJvbC5Ob3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5zaG93RXJyb3IoXCLliKDpmaTlt6XnqIvlpLHotKXvvIFcIik7XHJcbiAgICB9XHJcbiAgfSBmaW5hbGx5IHtcclxuICAgIEtRLkNvbnRyb2wuV2FpdGluZy5jbG9zZSgpO1xyXG4gIH1cclxufVxyXG5cclxuZ2xvYmFsLmRlbGV0ZUZpbGUgPSBhc3luYyBmdW5jdGlvbiAodXJsKSB7XHJcbiAgdHJ5IHtcclxuICAgIGlmIChLUS5CdWlsZGVyLkJ1aWxkZXJDb21tb24uaXNQb3J0YWxFbnZpcm9ubWVudCgpKSB7XHJcbiAgICAgIHJldHVybiBhd2FpdCBkZWxldGVGaWxlX3BvcnRhbCh1cmwpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gYXdhaXQgZGVsZXRlRmlsZV9zZXJ2ZXIodXJsKTtcclxuICAgIH1cclxuICB9IGNhdGNoIChlKSB7XHJcbiAgICByZXR1cm4gXCJlcnJvclwiXHJcbiAgfVxyXG59XHJcblxyXG4vLyDliKDpmaTov5znqIvmlofku7ZcclxuZ2xvYmFsLmRlbGV0ZUZpbGVfc2VydmVyID0gYXN5bmMgZnVuY3Rpb24gKHVybCkge1xyXG4gIGxldCBjbWQgPSB1cmwucmVwbGFjZSgnL2Rvd25sb2FkLycsICcvZGVsZXRlRmlsZUJ5SWQ/dGFza0lkcz0nKTtcclxuICBsZXQgcmVzdWx0ID0gSlNPTi5wYXJzZShhd2FpdCBLUS5Db21tb24uTmV0d29ya1Rvb2xzLmh0dHBHZXRBc3luYyhjbWQpKTtcclxuXHJcbiAgcmV0dXJuIHJlc3VsdC5yZXN1bHQ7XHJcbn1cclxuXHJcbi8vIOWIoOmZpOi/nOeoi+aWh+S7tlxyXG5nbG9iYWwuZGVsZXRlRmlsZV9wb3J0YWwgPSBhc3luYyBmdW5jdGlvbiAodXJsKSB7XHJcbiAgbGV0IHRhc2tJZHMgPSB1cmwuc2xpY2UodXJsLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpO1xyXG5cclxuICByZXR1cm4gcGFyZW50LndpbmRvdy52bS4kYXBpLm1hcEJ1aWxkZXJBcGkuZGVsZXRlRmlsZUJ5SWQoe1xyXG4gICAgdGFza0lkczogdGFza0lkcyxcclxuICB9LCB7X19MT0dJTlRZUEU6IFwiZGlhbG9nXCIsIG5vTG9hZGluZzogdHJ1ZX0pLnRoZW4oYXN5bmMgZnVuY3Rpb24gKHJlcykge1xyXG4gICAgcmV0dXJuIHJlcy5kYXRhLnJlc3VsdDtcclxuICB9KS5jYXRjaCgoKSA9PiB7XHJcbiAgICByZXR1cm4gXCJlcnJvclwiO1xyXG4gIH0pXHJcbn1cclxuXHJcbmdsb2JhbC5pbml0TGF5ZXJzQ29udGFpbmVyID0gYXN5bmMgZnVuY3Rpb24gKGxheWVyc0NvbnRhaW5lcikge1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IG1hcFZpZXcgPSBidWlsZFByb2plY3QubWFwVmlldztcclxuXHJcbiAgLy8g5Yid5aeL5YyW5Zu+5bGC5a655ZmoXHJcbiAgbGF5ZXJzQ29udGFpbmVyID0gbmV3IEtRLkJ1aWxkZXIuQnVpbGRlclVpLkxheWVyTGlzdEJveChcInZlY3Rvci1sYXllcnMtY29udGFpbmVyXCIsIHtcclxuICAgIGRhdGFTb3VyY2U6IFtdLFxyXG5cclxuICAgIGRyYWdlbmQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIC8vIOWIt+aWsOOAgeWQjOatpWRhdGFTb3VyY2VcclxuICAgICAgbGV0IGRhdGFTb3VyY2UgPSBbXTtcclxuICAgICAgbGV0IGxheWVyc0NvbnRhaW5lciA9IGJ1aWxkUHJvamVjdC5sYXllcnNDb250YWluZXI7XHJcbiAgICAgIGxldCBpdGVtcyA9IGxheWVyc0NvbnRhaW5lci5pdGVtcygpO1xyXG5cclxuICAgICAgaXRlbXMuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsZW0pIHtcclxuICAgICAgICBsZXQgZGF0YUl0ZW0gPSBsYXllcnNDb250YWluZXIuZGF0YUl0ZW0oZWxlbSk7XHJcbiAgICAgICAgZGF0YVNvdXJjZS5wdXNoKHtcclxuICAgICAgICAgIGxheWVySWQ6IGRhdGFJdGVtLmxheWVySWQsXHJcbiAgICAgICAgICBuYW1lOiBkYXRhSXRlbS5uYW1lLFxyXG4gICAgICAgICAgdHlwZTogZGF0YUl0ZW0udHlwZSxcclxuICAgICAgICB9KVxyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGxheWVyc0NvbnRhaW5lci5zZXREYXRhU291cmNlKGRhdGFTb3VyY2UpO1xyXG4gICAgICBidWlsZFByb2plY3QucmVzZXRMYXllcnNaSW5kZXgoKTsgICAgIC8vIOaLluWKqGl0ZW3nmoTlk43lupTlh73mlbBcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIGJ1aWxkUHJvamVjdC5sYXllcnNDb250YWluZXIgPSBsYXllcnNDb250YWluZXI7XHJcblxyXG4gIC8vIOWTjeW6lOW6leWbvueCueWHu+S/oeWPt1xyXG4gICQoXCIubGF5ZXJzLWNvbnRhaW5lciAuYmFzZS1sYXllcnMgbGlcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIi5zaWRlYmFyLWNvbnRlbnQtcGFuZWxcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgJChcIi5zaWRlYmFyLWxheWVycy1tYW5hZ2VyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgJChcIi5jb250ZW50LWVkaXRvci1wYW5lLWJhc2VtYXBcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gIH0pXHJcblxyXG4gIC8vIOWbvuWxguWuueWZqOeahOS/oeWPt+WTjeW6lOWHveaVsFxyXG4gICQoXCIjdmVjdG9yLWxheWVycy1jb250YWluZXJcIikuYmluZChcInNlbGVjdFwiLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGFJdGVtKSB7XHJcbiAgICBpZiAoZGF0YUl0ZW0udHlwZSA9PSAndGlsZScpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5zZXR0aW5nLm5hbWUgPSBkYXRhSXRlbS5uYW1lO1xyXG4gICAgYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXIgPSBkYXRhSXRlbS5sYXllcjtcclxuXHJcbiAgICAkKFwiLnNpZGViYXItY29udGVudC1wYW5lbFwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAkKFwiLnNpZGViYXItbGF5ZXJzLW1hbmFnZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAkKFwiLmNvbnRlbnQtZWRpdG9yLXBhbmUtXCIgKyBkYXRhSXRlbS50eXBlKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcblxyXG4gICAgJChcIi5sYXllci1lZGl0b3ItdGl0bGUtbmFtZVwiKS50ZXh0KGRhdGFJdGVtLm5hbWUpO1xyXG5cclxuICAgIGlmIChkYXRhSXRlbS50eXBlID09ICdwb2ludCcpIHtcclxuICAgICAgb25Qb2ludExheWVyUmVhZHkoKTtcclxuICAgIH0gZWxzZSBpZiAoZGF0YUl0ZW0udHlwZSA9PSAnbGluZScpIHtcclxuICAgICAgb25MaW5lTGF5ZXJSZWFkeSgpO1xyXG4gICAgfSBlbHNlIGlmIChkYXRhSXRlbS50eXBlID09ICdwb2x5Z29uJykge1xyXG4gICAgICBvblBvbHlnb25MYXllclJlYWR5KCk7XHJcbiAgICB9IGVsc2UgaWYgKGRhdGFJdGVtLnR5cGUgPT0gJ2hhbmQtZHJhdycpIHtcclxuICAgICAgb25IYW5kRHJhd0xheWVyUmVhZHkoKTtcclxuICAgIH1cclxuICB9KVxyXG5cclxuICAvLyDnm5HlkKzlm77lsYLlj6/op4Hkv6Hlj7dcclxuICAkKFwiI3ZlY3Rvci1sYXllcnMtY29udGFpbmVyXCIpLmJpbmQoXCJidWlsZGVyX2xheWVyX3Zpc2libGVcIiwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhSXRlbSkge1xyXG4gICAgbGV0IGxheWVyID0gZGF0YUl0ZW0ubGF5ZXI7XHJcbiAgICBsYXllci52aXNpYmxlID0gdHJ1ZTtcclxuXHJcbiAgICBsYXllci5nZXRSZW5kZXIoKS5hZGRUb01hcFZpZXcobWFwVmlldyk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIOebkeWQrOWbvuWxguS4jeWPr+ingeS/oeWPt1xyXG4gICQoXCIjdmVjdG9yLWxheWVycy1jb250YWluZXJcIikuYmluZChcImJ1aWxkZXJfbGF5ZXJfaW52aXNpYmxlXCIsIGZ1bmN0aW9uIChldmVudCwgZGF0YUl0ZW0pIHtcclxuICAgIGxldCBsYXllciA9IGRhdGFJdGVtLmxheWVyO1xyXG4gICAgbGF5ZXIudmlzaWJsZSA9IGZhbHNlO1xyXG5cclxuICAgIGxheWVyLmdldFJlbmRlcigpLnJlbW92ZSgpO1xyXG4gIH0pO1xyXG5cclxuICAvLyDnm5HlkKzlhajlm77kv6Hlj7dcclxuICAkKFwiI3ZlY3Rvci1sYXllcnMtY29udGFpbmVyXCIpLmJpbmQoXCJidWlsZGVyX2Z1bGxfbWFwXCIsIGZ1bmN0aW9uIChldmVudCwgZGF0YUl0ZW0pIHtcclxuICAgIGxldCBsYXllciA9IGRhdGFJdGVtLmxheWVyO1xyXG4gICAgbGF5ZXIuZ2V0UmVuZGVyKCkuZmx5VG9Cb3VuZHMoKTtcclxuICB9KTtcclxuXHJcbiAgLy8g55uR5ZCs5a+85Ye65Zu+5bGC5L+h5Y+3XHJcbiAgJChcIiN2ZWN0b3ItbGF5ZXJzLWNvbnRhaW5lclwiKS5iaW5kKFwiYnVpbGRlcl9leHBvcnRcIiwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhSXRlbSkge1xyXG4gICAgbGV0IGxheWVyID0gZGF0YUl0ZW0ubGF5ZXI7XHJcbiAgICBsZXQgZ2VvanNvbiA9IEtRLkJ1aWxkZXIuQnVpbGRlckxheWVyRGF0YXMuZ2V0SW5zdGFuY2UoKS5nZXREYXRhKGxheWVyLm9wdGlvbnMuZ3VpZCk7XHJcbiAgICBsZXQgZ2VvanNvbl9zdHJpbmcgPSBKU09OLnN0cmluZ2lmeShnZW9qc29uKTtcclxuXHJcbiAgICBLUS5Db21tb24uQ29tbW9uVG9vbHMuZXhwb3J0RGF0YShnZW9qc29uX3N0cmluZywgJ2V4cG9ydGRhdGEuZ2VvanNvbicpO1xyXG4gICAgS1EuQ29udHJvbC5Ob3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5zaG93U3VjY2VzcyhLUS5Mb2NhbC5Db250cm9sLmRyYXdDb250cm9sLmV4cG9ydERyYXcuc3VjY2VzcygpKTtcclxuICB9KTtcclxuXHJcbiAgLy8g55uR5ZCs5bGe5oCn6KGo5L+h5Y+3XHJcbiAgJChcIiN2ZWN0b3ItbGF5ZXJzLWNvbnRhaW5lclwiKS5iaW5kKFwiYnVpbGRlcl9hdHRyaWJ1dGVfdGFibGVcIiwgZnVuY3Rpb24gKGV2ZW50LCBkYXRhSXRlbSkge1xyXG4gICAgbGV0IGxheWVyID0gZGF0YUl0ZW0ubGF5ZXI7XHJcbiAgICBsZXQgZ2VvanNvbiA9IEtRLkJ1aWxkZXIuQnVpbGRlckxheWVyRGF0YXMuZ2V0SW5zdGFuY2UoKS5nZXREYXRhKGxheWVyLm9wdGlvbnMuZ3VpZCk7XHJcbiAgICBsZXQgY29sdW1ucyA9IFtdO1xyXG4gICAgbGV0IGRhdGFTb3VyY2UgPSBbXTtcclxuICAgIGxldCBmaWVsZHMgPSBnZW9qc29uLmZpZWxkcyB8fCBPYmplY3Qua2V5cyhnZW9qc29uLmZlYXR1cmVzWzBdLnByb3BlcnRpZXMpO1xyXG4gICAgbGV0IGZlYXR1cmVzID0gZ2VvanNvbi5mZWF0dXJlcztcclxuXHJcbiAgICAvLyDnu4Tnu4djb2x1bW5zXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBsZXQgZmllbGQgPSBmaWVsZHNbaV0ubmFtZSB8fCBmaWVsZHNbaV07XHJcbiAgICAgIGxldCB0aXRsZSA9IGZpZWxkc1tpXS5hbGlhc05hbWUgfHwgZmllbGQ7XHJcblxyXG4gICAgICBjb2x1bW5zLnB1c2goe1xyXG4gICAgICAgIGZpZWxkOiBmaWVsZCxcclxuICAgICAgICB0aXRsZTogdGl0bGUsXHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLy8g57uE57uHZGF0YVNvdXJjZVxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWF0dXJlcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBkYXRhU291cmNlLnB1c2goZmVhdHVyZXNbaV0ucHJvcGVydGllcyk7XHJcbiAgICB9XHJcblxyXG4gICAgS1EuQnVpbGRlci5CdWlsZGVyVWkuQnVpbGRlckluZm9EaWFsb2cuZ2V0SW5zdGFuY2UoKS5vcGVuKGRhdGFTb3VyY2UsIGNvbHVtbnMpO1xyXG4gIH0pO1xyXG5cclxuICAvLyDnm5HlkKzlm77kvovkv6Hlj7dcclxuICAkKFwiI3ZlY3Rvci1sYXllcnMtY29udGFpbmVyXCIpLmJpbmQoXCJidWlsZGVyX2xlZ2VuZFwiLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGFJdGVtLCBlbCkge1xyXG4gICAgbWFwVmlldy5sZWdlbmRfd2luZG93Lm9wZW4oKTtcclxuICAgIEtRLkJ1aWxkZXIuQnVpbGRlclVpLkNvbG9yRmllbGQuZ2V0SW5zdGFuY2UoKS5fdXBkYXRlTGVnZW5kKCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIOebkeWQrOWbvuWxguWIoOmZpOS/oeWPt1xyXG4gICQoXCIjdmVjdG9yLWxheWVycy1jb250YWluZXJcIikuYmluZChcImJ1aWxkZXJfbGF5ZXJfZGVsZXRlXCIsIGZ1bmN0aW9uIChldmVudCwgZGF0YUl0ZW0sIGVsKSB7XHJcbiAgICBsYXllcnNDb250YWluZXIucmVtb3ZlKGVsKTtcclxuICAgIGJ1aWxkUHJvamVjdC5kZWxldGVMYXllcihkYXRhSXRlbS5sYXllcik7XHJcblxyXG4gICAgLy8g5Yi35paw5YiG5p6Q5Yqf6IO955qE5Zu+5bGC5o6n5Lu2XHJcbiAgICBLUS5CdWlsZGVyLkJ1aWxkZXJDb21tb24ucmVmcmVzaEFuYWx5c2lzTGF5ZXJzQ29udHJvbCgpO1xyXG4gIH0pO1xyXG5cclxuICAvLyDnm5HlkKzlm77lsYLph43lkb3lkI3kv6Hlj7dcclxuICAkKFwiI3ZlY3Rvci1sYXllcnMtY29udGFpbmVyXCIpLmJpbmQoXCJidWlsZGVyX3JlbmFtZVwiLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGFJdGVtLCBlbCkge1xyXG4gICAgLy8g6ZqQ6JeP6I+c5Y2VXHJcbiAgICAkKGVsKS5maW5kKFwiLnNlY291bmQtbGluZSAubGlzdHNcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgLy8g6ZqQ6JePc3Bhbu+8jOaYvuekumlucHV055So5LqO57yW6L6RXHJcbiAgICBsZXQgJHNwYW4gPSAkKGVsKS5maW5kKFwiLmZpcnN0LWxpbmUgLnRpdGxlIHNwYW5cIik7XHJcbiAgICBsZXQgJGlucHV0ID0gJChlbCkuZmluZChcIi5maXJzdC1saW5lIC50aXRsZSBpbnB1dFwiKTtcclxuICAgICRzcGFuLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgJGlucHV0LmNzcyhcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIik7XHJcblxyXG4gICAgLy8g5YWJ5qCH56e75Yqo5Yiw5pyA5ZCO5LiA5Liq5a2X56ymXHJcbiAgICB2YXIgdmFsdWUgPSAkaW5wdXQudmFsKCk7XHJcbiAgICAkaW5wdXQudmFsKFwiXCIpLmZvY3VzKCkudmFsKHZhbHVlKTtcclxuXHJcbiAgICAvLyDpmLvmraJjbGlja+OAgW1vdXNlZG93buS6i+S7tuWGkuazoVxyXG4gICAgJGlucHV0LmJpbmQoXCJjbGljayBtb3VzZWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOWkseWOu+eEpueCuVxyXG4gICAgJGlucHV0LmJsdXIoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgLy8g6ZqQ6JePaW5wdXTvvIzmmL7npLpzcGFu55So5LqO5pi+56S6XHJcbiAgICAgICRzcGFuLmNzcyhcImRpc3BsYXlcIiwgXCJpbmxpbmUtYmxvY2tcIik7XHJcbiAgICAgICRpbnB1dC5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICAgIC8vIOS/ruaUueaVsOaNrlxyXG4gICAgICBsZXQgJGxpID0gJHNwYW4uY2xvc2VzdChcImxpXCIpO1xyXG4gICAgICBsZXQgZGF0YUl0ZW0gPSBsYXllcnNDb250YWluZXIuX2xpc3Rib3guZGF0YUl0ZW0oJGxpKTtcclxuICAgICAgZGF0YUl0ZW0uc2V0KFwibmFtZVwiLCAkaW5wdXQudmFsKCkpO1xyXG4gICAgICBkYXRhSXRlbS5sYXllci5vcHRpb25zLmRhdGFTb3VyY2UubmFtZSA9ICRpbnB1dC52YWwoKTsgIC8vIOabtOaWsGRhdGFTb3VyY2XkuK3nmoRuYW1lIOeUqOS6jnByb2plY3TnmoTmgaLlpI1cclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gIC8vIOebkeWQrOWbvuWxguWxnuaAp+S/oeWPt1xyXG4gICQoXCIjdmVjdG9yLWxheWVycy1jb250YWluZXJcIikuYmluZChcImJ1aWxkZXJfbGF5ZXJfYXR0cmlidXRlXCIsIGZ1bmN0aW9uIChldmVudCwgZGF0YUl0ZW0pIHtcclxuICAgIGxldCBsYXllciA9IGRhdGFJdGVtLmxheWVyO1xyXG4gICAgbGV0IGdlb2pzb24gPSBLUS5CdWlsZGVyLkJ1aWxkZXJMYXllckRhdGFzLmdldEluc3RhbmNlKCkuZ2V0RGF0YShsYXllci5vcHRpb25zLmd1aWQpO1xyXG4gICAgbGV0IGNvbHVtbnMgPSBbXTtcclxuXHJcbiAgICBsZXQgdGl0bGVzID0gW1wi5ZCN56ewXCIsIFwi5pi+56S65ZCN56ewXCIsIFwi57G75Z6LXCJdO1xyXG4gICAgbGV0IGZpZWxkcyA9IFtcIm5hbWVcIiwgXCJhbGlhc05hbWVcIiwgXCJ0eXBlXCJdO1xyXG5cclxuICAgIC8vIOe7hOe7h2NvbHVtbnNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgIGNvbHVtbnMucHVzaCh7XHJcbiAgICAgICAgZmllbGQ6IGZpZWxkc1tpXSxcclxuICAgICAgICB0aXRsZTogdGl0bGVzW2ldLFxyXG4gICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGxldCBkYXRhU291cmNlID0gZ2VvanNvbi5maWVsZHMgfHwgT2JqZWN0LmtleXMoZ2VvanNvbi5mZWF0dXJlc1swXS5wcm9wZXJ0aWVzKTtcclxuICAgIC8vIOe7hOe7h2RhdGFTb3VyY2VcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGF0YVNvdXJjZS5sZW5ndGg7ICsraSkge1xyXG4gICAgICBkYXRhU291cmNlW2ldLmFsaWFzTmFtZSA9IGRhdGFTb3VyY2VbaV0uYWxpYXNOYW1lIHx8IGRhdGFTb3VyY2VbaV0ubmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5CdWlsZGVyTGF5ZXJBdHRyaWJ1dGVEaWFsb2cuZ2V0SW5zdGFuY2UoKS5vcGVuKGRhdGFTb3VyY2UsIGNvbHVtbnMpO1xyXG4gIH0pO1xyXG59XHJcblxyXG5nbG9iYWwuaW5pdEhhbmREcmF3TGF5ZXJzQ29udGFpbmVyID0gYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gIC8vIOWIneWni+WMluWbvuWxguWuueWZqFxyXG4gIGxldCBjb250YWluZXIgPSBuZXcgS1EuQnVpbGRlci5CdWlsZGVyVWkuSGFuZERyYXdMYXllckxpc3RCb3goXCJoYW5kLWRyYXctbGlzdFwiLCB7XHJcbiAgICBkYXRhU291cmNlOiBbXSxcclxuICB9KTtcclxuXHJcbiAgS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpLmhhbmREcmF3TGF5ZXJzQ29udGFpbmVyID0gY29udGFpbmVyO1xyXG5cclxuXHJcbiAgLy8g55uR5ZCs5Zu+5bGC6YeN5ZG95ZCN55qE5L+h5Y+3XHJcbiAgJChcIiNoYW5kLWRyYXctbGlzdFwiKS5iaW5kKFwiaGFuZF9kcmF3X2xheWVyX3JlbmFtZVwiLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGFJdGVtLCBlbCkge1xyXG4gICAgbGV0ICRzcGFuID0gJChlbCkuZmluZChcIi5lZGl0YWJsZS1zcGFuIHNwYW5cIik7XHJcbiAgICBsZXQgJGlucHV0ID0gJChlbCkuZmluZChcIi5lZGl0YWJsZS1zcGFuIGlucHV0XCIpO1xyXG5cclxuICAgIC8vIOmakOiXj3NwYW7vvIzmmL7npLppbnB1dOeUqOS6jue8lui+kVxyXG4gICAgJHNwYW4uY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAkaW5wdXQuY3NzKFwiZGlzcGxheVwiLCBcImlubGluZS1ibG9ja1wiKTtcclxuXHJcbiAgICAvLyDlhYnmoIfnp7vliqjliLDmnIDlkI7kuIDkuKrlrZfnrKZcclxuICAgIHZhciB2YWx1ZSA9ICRpbnB1dC52YWwoKTtcclxuICAgICRpbnB1dC52YWwoXCJcIikuZm9jdXMoKS52YWwodmFsdWUpO1xyXG5cclxuICAgIC8vIOi+k+WFpeWujOavlSDkv67mlLluYW1l55qE5YC8XHJcbiAgICAkaW5wdXQuYmx1cihmdW5jdGlvbiAoKSB7XHJcbiAgICAgIC8vIOmakOiXj2lucHV077yM5pi+56S6c3BhbueUqOS6juaYvuekulxyXG4gICAgICAkc3Bhbi5jc3MoXCJkaXNwbGF5XCIsIFwiaW5saW5lLWJsb2NrXCIpO1xyXG4gICAgICAkaW5wdXQuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgICAvLyDkv67mlLnmlbDmja5cclxuICAgICAgbGV0ICRsaSA9ICRzcGFuLmNsb3Nlc3QoXCJsaVwiKTtcclxuICAgICAgbGV0IGRhdGFJdGVtID0gY29udGFpbmVyLl9saXN0Ym94LmRhdGFJdGVtKCRsaSk7XHJcbiAgICAgIGRhdGFJdGVtLnNldChcIm5hbWVcIiwgJGlucHV0LnZhbCgpKTtcclxuICAgIH0pXHJcbiAgfSk7XHJcblxyXG4gIC8vIOebkeWQrOWbvuWxgue8lui+keeahOS/oeWPt1xyXG4gICQoXCIjaGFuZC1kcmF3LWxpc3RcIikuYmluZChcImhhbmRfZHJhd19sYXllcl9lZGl0XCIsIGZ1bmN0aW9uIChldmVudCwgZGF0YUl0ZW0pIHtcclxuICAgIGxldCBlZGl0b3JPcHRpb25zID0gZGF0YUl0ZW0ubGF5ZXIuZWRpdG9yT3B0aW9ucztcclxuICAgIGxldCByYWRpdXMgPSBlZGl0b3JPcHRpb25zLmltYWdlSW5mbyA/IGVkaXRvck9wdGlvbnMuaW1hZ2VJbmZvLnJhZGl1cyAqIDEwMCA6IDA7XHJcbiAgICBsZXQgem9vbVJhdGUgPSBlZGl0b3JPcHRpb25zLnZlY3RvckluZm8gPyBlZGl0b3JPcHRpb25zLnZlY3RvckluZm8uem9vbVJhdGUgKiAxMDAgOiAwO1xyXG5cclxuICAgIC8vIOe7hOe7h21vZGVsXHJcbiAgICB2YXIgbW9kZWwgPSBrZW5kby5vYnNlcnZhYmxlKHtcclxuICAgICAgc3R5bGVPcHRpb25zOiBlZGl0b3JPcHRpb25zLFxyXG5cclxuICAgICAgcmFkaXVzOiByYWRpdXMsXHJcbiAgICAgIHpvb21SYXRlOiB6b29tUmF0ZSxcclxuICAgICAgbGluZU9wYWNpdHk6IGVkaXRvck9wdGlvbnMubGluZU9wYWNpdHkgKiAxMDAsXHJcbiAgICAgIGZpbGxPcGFjaXR5OiBlZGl0b3JPcHRpb25zLmZpbGxPcGFjaXR5ICogMTAwLFxyXG4gICAgICBsaW5lU3R5bGVMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5saW5lU3R5bGVMaXN0KCksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDlnIbjgIHnn6nlvaLmjInnhadwb2x5Z29u5p2l5aSE55CGXHJcbiAgICBsZXQgdHlwZSA9IGRhdGFJdGVtLnR5cGU7XHJcblxyXG4gICAgaWYgKHR5cGUgPT09IFwidGV4dFwiKSB7XHJcbiAgICAgIC8vIOW8ueWHuuaJi+e7mOaWh+acrOWbvuWxgue8lui+keahhlxyXG4gICAgICBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5IYW5kRHJhd1RleHRFZGl0RGlhbG9nLmdldEluc3RhbmNlKCkub3Blbih7ZWRpdG9yT3B0aW9uczogZWRpdG9yT3B0aW9uc30pO1xyXG5cclxuICAgICAgLy8g6K6w5b2VbGF5ZXJcclxuICAgICAgS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpLnNldHRpbmcuaGFuZERyYXdMYXllciA9IGRhdGFJdGVtLmxheWVyO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHR5cGUgPT09IFwiY2lyY2xlXCIgfHwgdHlwZSA9PT0gXCJyZWN0YW5nbGVcIikge1xyXG4gICAgICAgIHR5cGUgPSBcInBvbHlnb25cIjtcclxuICAgICAgfVxyXG5cclxuICAgICAgLy8g5o6n5Lu25ZKMbW9kZWzov5vooYznu5HlrppcclxuICAgICAgbGV0IGVsID0gJChcIiN0YWJzdHJpcCAuaGFuZC1kcmF3LWVkaXQtXCIgKyB0eXBlKTtcclxuICAgICAga2VuZG8uYmluZChlbCwgbW9kZWwpO1xyXG5cclxuICAgICAgLy8g6K6w5b2VbW9kZWzlkoxsYXllclxyXG4gICAgICBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkuc2V0SW5mbygncmVuZGVyX21vZGVsJywgbW9kZWwpO1xyXG4gICAgICBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCkuc2V0dGluZy5oYW5kRHJhd0xheWVyID0gZGF0YUl0ZW0ubGF5ZXI7XHJcblxyXG4gICAgICAvLyDmmL7npLrlr7nlupTnmoTlm77lvaLnvJbovpHnlYzpnaJcclxuICAgICAgZWwuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpLnNpYmxpbmdzKCkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgICAvLyDlvLnlh7rlm77lsYLnvJbovpHmoYZcclxuICAgICAgS1EuQnVpbGRlci5CdWlsZGVyVWkuSGFuZERyYXdFZGl0RGlhbG9nLmdldEluc3RhbmNlKCkub3BlbihkYXRhSXRlbSk7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZyhcImV2ZW50XCIsIGV2ZW50LFwiZGF0YUl0ZW1cIiwgZGF0YUl0ZW0pO1xyXG4gICAgICAvLyDnvJbovpHmoYbkv6Hmga9cclxuICAgICAgS1EuQnVpbGRlci5CdWlsZGVyVWkuSGFuZERyYXdFZHRJbmZvLmdldEluc3RhbmNlKCkuaW5pdChkYXRhSXRlbSk7XHJcbiAgICAgIC8vIOe8lui+keahhuWxnuaAp1xyXG4gICAgICBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5IYW5kRHJhd0VkaXRBdHRyaWJ1dGUuZ2V0SW5zdGFuY2UoKS5pbml0KGRhdGFJdGVtKTtcclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgLy8g55uR5ZCs5Zu+5bGC5Yig6Zmk55qE5L+h5Y+3XHJcbiAgJChcIiNoYW5kLWRyYXctbGlzdFwiKS5iaW5kKFwiaGFuZF9kcmF3X2xheWVyX2RlbGV0ZVwiLCBmdW5jdGlvbiAoZXZlbnQsIGRhdGFJdGVtLCBlbCkge1xyXG4gICAgS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpLmdlb21hbi5yZW1vdmVHZW9tYW5MYXllcihkYXRhSXRlbS5sYXllcik7XHJcblxyXG4gICAgY29udGFpbmVyLnJlbW92ZShlbCk7XHJcbiAgfSk7XHJcblxyXG59XHJcblxyXG5nbG9iYWwuc3dhcFJlbmRlclR5cGUgPSBmdW5jdGlvbiAocmVuZGVyVHlwZSwgbW9kZWxfbWFwKSB7XHJcbiAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICBsZXQgbWFwVmlldyA9IGJ1aWxkUHJvamVjdC5tYXBWaWV3O1xyXG4gIGxldCBsYXllciA9IGJ1aWxkUHJvamVjdC5zZXR0aW5nLmxheWVyOyAvLyDlvZPliY3mv4DmtLvnmoRsYXllclxyXG5cclxuICBsYXllci5zZXRSZW5kZXJUeXBlKHJlbmRlclR5cGUsIG1hcFZpZXcpO1xyXG4gIGJ1aWxkUHJvamVjdC5zZXRJbmZvKCdyZW5kZXJfbW9kZWwnLCBtb2RlbF9tYXAuZ2V0KHJlbmRlclR5cGUpKTtcclxuXHJcbiAgLy/ph43nu5jlm77kvotcclxuICBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5Db2xvckZpZWxkLmdldEluc3RhbmNlKCkuX3VwZGF0ZUxlZ2VuZCgpO1xyXG59XHJcblxyXG5nbG9iYWwub25Qb2ludExheWVyUmVhZHkgPSBmdW5jdGlvbiAoKSB7XHJcbiAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICBsZXQgbGF5ZXIgPSBidWlsZFByb2plY3Quc2V0dGluZy5sYXllcjsgLy8g5b2T5YmN5r+A5rS755qEbGF5ZXJcclxuXHJcbiAgbGV0IHN5bWJvbFR5cGUgPSBsYXllci5yZW5kZXIuZ2V0KCdiYXNpYycpLm9wdGlvbnMucG9pbnRTeW1ib2xUeXBlO1xyXG4gIGlmIChzeW1ib2xUeXBlID09ICd2ZWN0b3InKSB7XHJcbiAgICBidWlsZFByb2plY3Quc3ltYm9sVHlwZVN3YXBCdXR0b24uc2VsZWN0KDApO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBidWlsZFByb2plY3Quc3ltYm9sVHlwZVN3YXBCdXR0b24uc2VsZWN0KDEpO1xyXG4gIH1cclxuXHJcbiAgLy8g54K55pWw5o2uIOWfuuacrOexu+Wei1xyXG4gIGxldCBiYXNpY1N0eWxlT3B0aW9ucyA9IGxheWVyLnJlbmRlci5nZXQoJ2Jhc2ljJykub3B0aW9ucztcclxuICBLUS5CdWlsZGVyLkJ1aWxkZXJDb21tb24uY29udmVydFBvaW50VmVjdG9ySW5mb09wdGlvbnMoYmFzaWNTdHlsZU9wdGlvbnMpO1xyXG5cclxuICBsZXQgYmFzaWNNb2RlbCA9IGtlbmRvLm9ic2VydmFibGUoe1xyXG4gICAgc3R5bGVPcHRpb25zOiBiYXNpY1N0eWxlT3B0aW9ucyxcclxuICAgIHBvaW50U2l6ZTogYmFzaWNTdHlsZU9wdGlvbnMudmVjdG9ySW5mby5mb250U2l6ZS5zcGxpdChcInB4XCIpWzBdLCAgLy8g54K55aSn5bCPXHJcblxyXG4gICAgcG9pbnRPcGFjaXR5OiBiYXNpY1N0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLmZpbGxPcGFjaXR5ICogMTAwLCAgICAgLy8g54K555qE5LiN6YCP5piO5bqmXHJcbiAgICBsaW5lT3BhY2l0eTogYmFzaWNTdHlsZU9wdGlvbnMudmVjdG9ySW5mby5zdHJva2VPcGFjaXR5ICogMTAwLCAgICAvLyDnur/nmoTkuI3pgI/mmI7luqZcclxuXHJcbiAgICBsYWJlbERpcmVjdGlvbkxpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxhYmVsRGlyZWN0aW9uTGlzdCgpLFxyXG4gICAgbGFiZWxGaWVsZExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxhYmVsRmllbGRMaXN0KCksXHJcbiAgICBsYWJlbEZvbnRMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5sYWJlbEZvbnRMaXN0KCksXHJcbiAgfSk7XHJcblxyXG4gIC8vIOeCueaVsOaNriDljZXlgLznsbvlnotcclxuICBsZXQgc2luZ2xlU3R5bGVPcHRpb25zID0gbGF5ZXIucmVuZGVyLmdldCgnc2luZ2xlJykub3B0aW9ucztcclxuICBLUS5CdWlsZGVyLkJ1aWxkZXJDb21tb24uY29udmVydFBvaW50VmVjdG9ySW5mb09wdGlvbnMoc2luZ2xlU3R5bGVPcHRpb25zKTtcclxuXHJcbiAgbGV0IHNpbmdsZU1vZGVsID0ga2VuZG8ub2JzZXJ2YWJsZSh7XHJcbiAgICBzdHlsZU9wdGlvbnM6IHNpbmdsZVN0eWxlT3B0aW9ucyxcclxuXHJcbiAgICBwb2ludFNpemU6IHNpbmdsZVN0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLmZvbnRTaXplLnNwbGl0KFwicHhcIilbMF0sIC8vIOeCueWkp+Wwj1xyXG5cclxuICAgIHBvaW50T3BhY2l0eTogc2luZ2xlU3R5bGVPcHRpb25zLnZlY3RvckluZm8uZmlsbE9wYWNpdHkgKiAxMDAsICAgLy8g54K555qE5LiN6YCP5piO5bqmXHJcbiAgICBsaW5lT3BhY2l0eTogc2luZ2xlU3R5bGVPcHRpb25zLnZlY3RvckluZm8uc3Ryb2tlT3BhY2l0eSAqIDEwMCwgIC8vIOe6v+eahOS4jemAj+aYjuW6plxyXG5cclxuICAgIHRoZW1hdGljRmllbGRMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS50aGVtYXRpY0ZpZWxkTGlzdCgpLFxyXG4gICAgcmFtcENvbG9yTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UucmFtcENvbG9yTGlzdCgpLFxyXG5cclxuICAgIGxhYmVsRGlyZWN0aW9uTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UubGFiZWxEaXJlY3Rpb25MaXN0KCksXHJcbiAgICBsYWJlbEZpZWxkTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UubGFiZWxGaWVsZExpc3QoKSxcclxuICAgIGxhYmVsRm9udExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxhYmVsRm9udExpc3QoKSxcclxuICB9KTtcclxuXHJcbiAgLy8g54K55pWw5o2uIOWIhuauteexu+Wei1xyXG4gIGxldCBzZWN0aW9uU3R5bGVPcHRpb25zID0gbGF5ZXIucmVuZGVyLmdldCgnc2VjdGlvbicpLm9wdGlvbnM7XHJcbiAgS1EuQnVpbGRlci5CdWlsZGVyQ29tbW9uLmNvbnZlcnRQb2ludFZlY3RvckluZm9PcHRpb25zKHNlY3Rpb25TdHlsZU9wdGlvbnMpO1xyXG5cclxuICBsZXQgc2VjdGlvbk1vZGVsID0ga2VuZG8ub2JzZXJ2YWJsZSh7XHJcbiAgICBzdHlsZU9wdGlvbnM6IHNlY3Rpb25TdHlsZU9wdGlvbnMsXHJcbiAgICBwb2ludFNpemU6IHNlY3Rpb25TdHlsZU9wdGlvbnMudmVjdG9ySW5mby5mb250U2l6ZS5zcGxpdChcInB4XCIpWzBdLCAvLyDngrnlpKflsI9cclxuXHJcbiAgICBwb2ludE9wYWNpdHk6IHNlY3Rpb25TdHlsZU9wdGlvbnMudmVjdG9ySW5mby5maWxsT3BhY2l0eSAqIDEwMCwgICAvLyDngrnnmoTkuI3pgI/mmI7luqZcclxuICAgIGxpbmVPcGFjaXR5OiBzZWN0aW9uU3R5bGVPcHRpb25zLnZlY3RvckluZm8uc3Ryb2tlT3BhY2l0eSAqIDEwMCwgIC8vIOe6v+eahOS4jemAj+aYjuW6plxyXG5cclxuICAgIHRoZW1hdGljRmllbGRMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS50aGVtYXRpY0ZpZWxkTGlzdCgpLFxyXG4gICAgc2VjdGlvbk1ldGhvZExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLnNlY3Rpb25NZXRob2RMaXN0KCksXHJcbiAgICBzZWN0aW9uTnVtYmVyTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2Uuc2VjdGlvbk51bWJlckxpc3QoKSxcclxuICAgIHJhbXBDb2xvckxpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLnJhbXBDb2xvckxpc3QoKSxcclxuICAgIGxpbmVTdHlsZUxpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxpbmVTdHlsZUxpc3QoKSxcclxuXHJcbiAgICBsYWJlbERpcmVjdGlvbkxpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxhYmVsRGlyZWN0aW9uTGlzdCgpLFxyXG4gICAgbGFiZWxGaWVsZExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxhYmVsRmllbGRMaXN0KCksXHJcbiAgICBsYWJlbEZvbnRMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5sYWJlbEZvbnRMaXN0KCksXHJcbiAgfSk7XHJcblxyXG4gIC8vIOeCueaVsOaNriDng63lipvlm77nsbvlnotcclxuICBsZXQgaGVhdG1hcFN0eWxlT3B0aW9ucyA9IGxheWVyLnJlbmRlci5nZXQoJ2hlYXRtYXAnKS5vcHRpb25zO1xyXG4gIGxldCBoZWF0bWFwTW9kZWwgPSBrZW5kby5vYnNlcnZhYmxlKHtcclxuICAgIHN0eWxlT3B0aW9uczogaGVhdG1hcFN0eWxlT3B0aW9ucyxcclxuXHJcbiAgICB3ZWlnaHRGaWVsZExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLndlaWdodEZpZWxkTGlzdCgpLFxyXG4gICAgaGVhdG1hcFJhbXBDb2xvckxpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmhlYXRtYXBSYW1wQ29sb3JMaXN0KCksXHJcbiAgfSk7XHJcblxyXG4gIC8vIOWIneWni+WMlm1vZGVsXHJcbiAgbGV0IG1vZGVsX21hcCA9IG5ldyBNYXAoW1xyXG4gICAgW1wiYmFzaWNcIiwgYmFzaWNNb2RlbF0sXHJcbiAgICBbXCJzaW5nbGVcIiwgc2luZ2xlTW9kZWxdLFxyXG4gICAgW1wic2VjdGlvblwiLCBzZWN0aW9uTW9kZWxdLFxyXG4gICAgW1wiaGVhdG1hcFwiLCBoZWF0bWFwTW9kZWxdLFxyXG4gIF0pO1xyXG5cclxuICAvLyDop4blm77lkoxtb2RlbOi/m+ihjOe7keWumlxyXG4gIG1vZGVsX21hcC5mb3JFYWNoKGZ1bmN0aW9uICh2YWx1ZSwga2V5KSB7XHJcbiAgICBrZW5kby5iaW5kKCQoXCJkaXYjcG9pbnQtdGhlbWUtdG9vbHMtXCIgKyBrZXkpLCB2YWx1ZSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIHdpbmRvdy5idWlsZGVySW5pdERvbXMuaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKTtcclxuICBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nVWkuZ2V0SW5zdGFuY2UoKS5pbml0Q29sb3JGaWVsZCgpO1xyXG5cclxuICAkKFwiLnBvaW50LWxheWVyLXR5cGVzIFwiICsgXCIubGF5ZXItdHlwZS1pbWdcIikucmVtb3ZlQ2xhc3MoJ2ltZy1zZWxlY3RlZCcpO1xyXG4gICQoXCIucG9pbnQtbGF5ZXItdHlwZXMgLnBvaW50LVwiICsgbGF5ZXIucmVuZGVyVHlwZSkuYWRkQ2xhc3MoJ2ltZy1zZWxlY3RlZCcpO1xyXG4gICQoXCIucG9pbnQtdGhlbWUtdG9vbHMgPiAudGhlbWUtdG9vbHMtaXRlbVwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAkKFwiI3BvaW50LXRoZW1lLXRvb2xzLVwiICsgbGF5ZXIucmVuZGVyVHlwZSkuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG5cclxuXHJcbiAgJCgnLnBvaW50LWxheWVyLXR5cGVzIC5sYXllci10eXBlLWltZycpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vIOWmguaenOS4uua/gOa0u+eahGxheWVyIHR5cGXvvIzkuI3lgZrlk43lupRcclxuICAgIGlmICgkKHRoaXMpLmhhc0NsYXNzKFwiaW1nLXNlbGVjdGVkXCIpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgICQoXCIucG9pbnQtbGF5ZXItdHlwZXMgXCIgKyBcIi5sYXllci10eXBlLWltZ1wiKS5yZW1vdmVDbGFzcygnaW1nLXNlbGVjdGVkJyk7XHJcbiAgICAkKHRoaXMpLmFkZENsYXNzKCdpbWctc2VsZWN0ZWQnKTtcclxuICAgICQoXCIucG9pbnQtdGhlbWUtdG9vbHMgPiAudGhlbWUtdG9vbHMtaXRlbVwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICBsZXQgcmVuZGVyX3R5cGUgPSAkKHRoaXMpLmF0dHIoXCJ0eXBlXCIpO1xyXG4gICAgJChcIiNwb2ludC10aGVtZS10b29scy1cIiArIHJlbmRlcl90eXBlKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcblxyXG4gICAgc3dhcFJlbmRlclR5cGUocmVuZGVyX3R5cGUsIG1vZGVsX21hcCk7XHJcbiAgfSk7XHJcblxyXG4gIHN3YXBSZW5kZXJUeXBlKGxheWVyLnJlbmRlclR5cGUsIG1vZGVsX21hcCk7XHJcblxyXG4gIC8qIHBvaW50IGJhc2ljIHN5bWJvbCB0eXBlIHN3aXRjaCAqL1xyXG4gIGxldCBwb2ludFN5bWJvbFR5cGUgPSBiYXNpY1N0eWxlT3B0aW9ucy5wb2ludFN5bWJvbFR5cGU7XHJcbiAgaWYgKHBvaW50U3ltYm9sVHlwZSA9PSAndmVjdG9yJylcclxuICAgIHN3YXBQb2ludFN2ZygpO1xyXG4gIGVsc2VcclxuICAgIHN3YXBQb2ludEltZygpO1xyXG5cclxuICAkKFwiLnBvaW50LXN5bWJvbC1zdmdcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgc3dhcFBvaW50U3ZnKCk7XHJcbiAgfSk7XHJcbiAgJChcIi5wb2ludC1zeW1ib2wtaW1nXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIHN3YXBQb2ludEltZygpO1xyXG4gIH0pO1xyXG5cclxuICAvKiBzd2FwIHN2Zy9pbWcgKi9cclxuICBmdW5jdGlvbiBzd2FwUG9pbnRTdmcoKSB7XHJcbiAgICAkKCc8c3R5bGU+Lm9ubHktc3ZnLXN5bWJvbC10eWxle2Rpc3BsYXk6YmxvY2s7fTwvc3R5bGU+JykuYXBwZW5kVG8oZG9jdW1lbnQuYm9keSk7XHJcblxyXG4gICAgYnVpbGRQcm9qZWN0LmdldEluZm8oJ3JlbmRlcl9tb2RlbCcpLnN0eWxlT3B0aW9ucy5wb2ludFN5bWJvbFR5cGUgPSBcInZlY3RvclwiO1xyXG4gICAgS1EuQnVpbGRlci5CdWlsZGVyQ29tbW9uLmZpbGxTdmdTeW1ib2xzKCQoXCIuc3ltYm9scy1ib3hcIiksIDYpO1xyXG5cclxuICAgIC8vIOmYsuatouWkmuS4queCueWbvuWxguWtmOWcqOaXtiBzdmcvaW1n55u45LqS5b285q2k5b2x5ZONXHJcbiAgICAkKFwiLnN5bWJvbHMtY29udGFpbmVyIC5zeW1ib2xzLWJveFwiKS50cmlnZ2VyKCdzeW1ib2xfdHlwZV92ZWN0b3InKTtcclxuICB9XHJcblxyXG4gIGZ1bmN0aW9uIHN3YXBQb2ludEltZygpIHtcclxuICAgICQoJzxzdHlsZT4ub25seS1zdmctc3ltYm9sLXR5bGV7ZGlzcGxheTpub25lO308L3N0eWxlPicpLmFwcGVuZFRvKGRvY3VtZW50LmJvZHkpO1xyXG5cclxuICAgIGJ1aWxkUHJvamVjdC5nZXRJbmZvKCdyZW5kZXJfbW9kZWwnKS5zdHlsZU9wdGlvbnMucG9pbnRTeW1ib2xUeXBlID0gXCJpbWFnZVwiO1xyXG4gICAgS1EuQnVpbGRlci5CdWlsZGVyQ29tbW9uLmZpbGxJbWFnZVN5bWJvbHMoJChcIi5zeW1ib2xzLWJveFwiKSwgMTAsIDYpO1xyXG5cclxuICAgICQoXCIuc3ltYm9scy1jb250YWluZXIgLnN5bWJvbHMtYm94XCIpLnRyaWdnZXIoJ3N5bWJvbF90eXBlX2ltYWdlJyk7XHJcbiAgfVxyXG59XHJcblxyXG5nbG9iYWwub25MaW5lTGF5ZXJSZWFkeSA9IGZ1bmN0aW9uICgpIHtcclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gIGxldCBsYXllciA9IGJ1aWxkUHJvamVjdC5zZXR0aW5nLmxheWVyOyAvLyDlvZPliY3mv4DmtLvnmoRsYXllclxyXG5cclxuICBsZXQgYmFzaWNTdHlsZU9wdGlvbnMgPSBsYXllci5yZW5kZXIuZ2V0KCdiYXNpYycpLm9wdGlvbnM7XHJcbiAgdmFyIGJhc2ljTW9kZWwgPSBrZW5kby5vYnNlcnZhYmxlKHtcclxuICAgIHN0eWxlT3B0aW9uczogYmFzaWNTdHlsZU9wdGlvbnMsXHJcbiAgICBsaW5lT3BhY2l0eTogYmFzaWNTdHlsZU9wdGlvbnMubGluZU9wYWNpdHkgKiAxMDAsXHJcblxyXG4gICAgbGluZVN0eWxlTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UubGluZVN0eWxlTGlzdCgpLFxyXG4gICAgbGFiZWxGaWVsZExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxhYmVsRmllbGRMaXN0KCksXHJcbiAgICBsYWJlbEZvbnRMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5sYWJlbEZvbnRMaXN0KCksXHJcbiAgfSk7XHJcblxyXG4gIHZhciBzaW5nbGVTdHlsZU9wdGlvbnMgPSBsYXllci5yZW5kZXIuZ2V0KCdzaW5nbGUnKS5vcHRpb25zO1xyXG4gIHZhciBzaW5nbGVNb2RlbCA9IGtlbmRvLm9ic2VydmFibGUoe1xyXG4gICAgc3R5bGVPcHRpb25zOiBzaW5nbGVTdHlsZU9wdGlvbnMsXHJcbiAgICBsaW5lT3BhY2l0eTogc2luZ2xlU3R5bGVPcHRpb25zLmxpbmVPcGFjaXR5ICogMTAwLFxyXG5cclxuICAgIHRoZW1hdGljRmllbGRMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS50aGVtYXRpY0ZpZWxkTGlzdCgpLFxyXG4gICAgbGluZVN0eWxlTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UubGluZVN0eWxlTGlzdCgpLFxyXG4gICAgcmFtcENvbG9yTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UucmFtcENvbG9yTGlzdCgpLFxyXG4gICAgbGFiZWxGaWVsZExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxhYmVsRmllbGRMaXN0KCksXHJcbiAgICBsYWJlbEZvbnRMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5sYWJlbEZvbnRMaXN0KCksXHJcbiAgfSk7XHJcblxyXG4gIGxldCBzZWN0aW9uU3R5bGVPcHRpb25zID0gbGF5ZXIucmVuZGVyLmdldCgnc2VjdGlvbicpLm9wdGlvbnM7XHJcbiAgdmFyIHNlY3Rpb25Nb2RlbCA9IGtlbmRvLm9ic2VydmFibGUoe1xyXG4gICAgc3R5bGVPcHRpb25zOiBzZWN0aW9uU3R5bGVPcHRpb25zLFxyXG4gICAgbGluZU9wYWNpdHk6IHNlY3Rpb25TdHlsZU9wdGlvbnMubGluZU9wYWNpdHkgKiAxMDAsXHJcblxyXG4gICAgdGhlbWF0aWNGaWVsZExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLnRoZW1hdGljRmllbGRMaXN0KCksXHJcbiAgICBzZWN0aW9uTWV0aG9kTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2Uuc2VjdGlvbk1ldGhvZExpc3QoKSxcclxuICAgIHNlY3Rpb25OdW1iZXJMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5zZWN0aW9uTnVtYmVyTGlzdCgpLFxyXG5cclxuICAgIGxpbmVTdHlsZUxpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxpbmVTdHlsZUxpc3QoKSxcclxuICAgIHJhbXBDb2xvckxpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLnJhbXBDb2xvckxpc3QoKSxcclxuICAgIGxhYmVsRmllbGRMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5sYWJlbEZpZWxkTGlzdCgpLFxyXG4gICAgbGFiZWxGb250TGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UubGFiZWxGb250TGlzdCgpLFxyXG4gIH0pO1xyXG5cclxuICAvLyDliJ3lp4vljJZtb2RlbFxyXG4gIGxldCBtb2RlbF9tYXAgPSBuZXcgTWFwKFtcclxuICAgIFtcImJhc2ljXCIsIGJhc2ljTW9kZWxdLFxyXG4gICAgW1wic2luZ2xlXCIsIHNpbmdsZU1vZGVsXSxcclxuICAgIFtcInNlY3Rpb25cIiwgc2VjdGlvbk1vZGVsXSxcclxuICBdKTtcclxuXHJcbiAgLy8g6KeG5Zu+5ZKMbW9kZWzov5vooYznu5HlrppcclxuICBtb2RlbF9tYXAuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAga2VuZG8uYmluZCgkKFwiZGl2I2xpbmUtdGhlbWUtdG9vbHMtXCIgKyBrZXkpLCB2YWx1ZSk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIHdpbmRvdy5idWlsZGVySW5pdERvbXMuaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKTtcclxuICBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nVWkuZ2V0SW5zdGFuY2UoKS5pbml0Q29sb3JGaWVsZCgpO1xyXG5cclxuICAkKFwiLmxpbmUtbGF5ZXItdHlwZXMgXCIgKyBcIi5sYXllci10eXBlLWltZ1wiKS5yZW1vdmVDbGFzcygnaW1nLXNlbGVjdGVkJyk7XHJcbiAgJChcIi5saW5lLWxheWVyLXR5cGVzIC5saW5lLVwiICsgbGF5ZXIucmVuZGVyVHlwZSkuYWRkQ2xhc3MoJ2ltZy1zZWxlY3RlZCcpO1xyXG4gICQoXCIubGluZS10aGVtZS10b29scyA+IC50aGVtZS10b29scy1pdGVtXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICQoXCIjbGluZS10aGVtZS10b29scy1cIiArIGxheWVyLnJlbmRlclR5cGUpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuXHJcbiAgJCgnLmxpbmUtbGF5ZXItdHlwZXMgLmxheWVyLXR5cGUtaW1nJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIi5saW5lLWxheWVyLXR5cGVzIFwiICsgXCIubGF5ZXItdHlwZS1pbWdcIikucmVtb3ZlQ2xhc3MoJ2ltZy1zZWxlY3RlZCcpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaW1nLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgJChcIi5saW5lLXRoZW1lLXRvb2xzID4gLnRoZW1lLXRvb2xzLWl0ZW1cIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgbGV0IHJlbmRlcl90eXBlID0gJCh0aGlzKS5hdHRyKFwidHlwZVwiKTtcclxuXHJcbiAgICAkKFwiI2xpbmUtdGhlbWUtdG9vbHMtXCIgKyByZW5kZXJfdHlwZSkuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xyXG4gICAgc3dhcFJlbmRlclR5cGUocmVuZGVyX3R5cGUsIG1vZGVsX21hcCk7XHJcbiAgfSk7XHJcblxyXG4gIHN3YXBSZW5kZXJUeXBlKGxheWVyLnJlbmRlclR5cGUsIG1vZGVsX21hcCk7XHJcbn1cclxuXHJcbmdsb2JhbC5vblBvbHlnb25MYXllclJlYWR5ID0gZnVuY3Rpb24gKCkge1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcblxyXG4gIC8vIOmdouaVsOaNruOAgeWfuuacrOexu+Wei1xyXG4gIGxldCBiYXNpY1N0eWxlT3BhY2l0eSA9IGxheWVyLnJlbmRlci5nZXQoJ2Jhc2ljJykub3B0aW9ucztcclxuICB2YXIgYmFzaWNNb2RlbCA9IGtlbmRvLm9ic2VydmFibGUoe1xyXG4gICAgc3R5bGVPcHRpb25zOiBiYXNpY1N0eWxlT3BhY2l0eSxcclxuICAgIGZpbGxPcGFjaXR5OiBiYXNpY1N0eWxlT3BhY2l0eS5maWxsT3BhY2l0eSAqIDEwMCxcclxuICAgIGxpbmVPcGFjaXR5OiBiYXNpY1N0eWxlT3BhY2l0eS5saW5lT3BhY2l0eSAqIDEwMCxcclxuXHJcbiAgICBsaW5lU3R5bGVMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5saW5lU3R5bGVMaXN0KCksXHJcbiAgICBsYWJlbEZpZWxkTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UubGFiZWxGaWVsZExpc3QoKSxcclxuICAgIGxhYmVsRm9udExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxhYmVsRm9udExpc3QoKSxcclxuICB9KTtcclxuXHJcbiAgLy8g6Z2i5pWw5o2u44CB5Y2V5YC857G75Z6LXHJcbiAgbGV0IHNpbmdsZVN0eWxlT3BhY2l0eSA9IGxheWVyLnJlbmRlci5nZXQoJ3NpbmdsZScpLm9wdGlvbnM7XHJcbiAgbGV0IHNpbmdsZU1vZGVsID0ga2VuZG8ub2JzZXJ2YWJsZSh7XHJcbiAgICBzdHlsZU9wdGlvbnM6IHNpbmdsZVN0eWxlT3BhY2l0eSxcclxuICAgIGZpbGxPcGFjaXR5OiBzaW5nbGVTdHlsZU9wYWNpdHkuZmlsbE9wYWNpdHkgKiAxMDAsXHJcbiAgICBsaW5lT3BhY2l0eTogc2luZ2xlU3R5bGVPcGFjaXR5LmxpbmVPcGFjaXR5ICogMTAwLFxyXG5cclxuICAgIHRoZW1hdGljRmllbGRMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS50aGVtYXRpY0ZpZWxkTGlzdCgpLFxyXG4gICAgcmFtcENvbG9yTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UucmFtcENvbG9yTGlzdCgpLFxyXG4gICAgbGluZVN0eWxlTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UubGluZVN0eWxlTGlzdCgpLFxyXG4gICAgbGFiZWxGaWVsZExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxhYmVsRmllbGRMaXN0KCksXHJcbiAgICBsYWJlbEZvbnRMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5sYWJlbEZvbnRMaXN0KCksXHJcbiAgfSk7XHJcblxyXG4gIC8vIOmdouaVsOaNruOAgeWIhuauteexu+Wei1xyXG4gIGxldCBzZWN0aW9uU3R5bGVPcGFjaXR5ID0gbGF5ZXIucmVuZGVyLmdldCgnc2VjdGlvbicpLm9wdGlvbnM7XHJcbiAgbGV0IHNlY3Rpb25Nb2RlbCA9IGtlbmRvLm9ic2VydmFibGUoe1xyXG4gICAgc3R5bGVPcHRpb25zOiBzZWN0aW9uU3R5bGVPcGFjaXR5LFxyXG4gICAgZmlsbE9wYWNpdHk6IHNlY3Rpb25TdHlsZU9wYWNpdHkuZmlsbE9wYWNpdHkgKiAxMDAsXHJcbiAgICBsaW5lT3BhY2l0eTogc2VjdGlvblN0eWxlT3BhY2l0eS5saW5lT3BhY2l0eSAqIDEwMCxcclxuXHJcbiAgICB0aGVtYXRpY0ZpZWxkTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UudGhlbWF0aWNGaWVsZExpc3QoKSxcclxuICAgIHNlY3Rpb25NZXRob2RMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5zZWN0aW9uTWV0aG9kTGlzdCgpLFxyXG4gICAgc2VjdGlvbk51bWJlckxpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLnNlY3Rpb25OdW1iZXJMaXN0KCksXHJcbiAgICByYW1wQ29sb3JMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5yYW1wQ29sb3JMaXN0KCksXHJcbiAgICBsaW5lU3R5bGVMaXN0OiBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5SZW5kZXJTZXR0aW5nRGF0YVNvdXJjZS5saW5lU3R5bGVMaXN0KCksXHJcbiAgICBsYWJlbEZpZWxkTGlzdDogS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ0RhdGFTb3VyY2UubGFiZWxGaWVsZExpc3QoKSxcclxuICAgIGxhYmVsRm9udExpc3Q6IEtRLkJ1aWxkZXIuQnVpbGRlclVpLlJlbmRlclNldHRpbmdEYXRhU291cmNlLmxhYmVsRm9udExpc3QoKSxcclxuICB9KTtcclxuXHJcbiAgLy8g5Yid5aeL5YyWbW9kZWxcclxuICBsZXQgbW9kZWxfbWFwID0gbmV3IE1hcChbXHJcbiAgICBbXCJiYXNpY1wiLCBiYXNpY01vZGVsXSxcclxuICAgIFtcInNpbmdsZVwiLCBzaW5nbGVNb2RlbF0sXHJcbiAgICBbXCJzZWN0aW9uXCIsIHNlY3Rpb25Nb2RlbF0sXHJcbiAgXSk7XHJcblxyXG4gIC8vIOinhuWbvuWSjG1vZGVs6L+b6KGM57uR5a6aXHJcbiAgbW9kZWxfbWFwLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBrZXkpIHtcclxuICAgIGtlbmRvLmJpbmQoJChcImRpdiNwb2x5Z29uLXRoZW1lLXRvb2xzLVwiICsga2V5KSwgdmFsdWUpO1xyXG4gIH0pO1xyXG5cclxuICAvLyB3aW5kb3cuYnVpbGRlckluaXREb21zLmluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcbiAgS1EuQnVpbGRlci5CdWlsZGVyVWkuUmVuZGVyU2V0dGluZ1VpLmdldEluc3RhbmNlKCkuaW5pdENvbG9yRmllbGQoKTtcclxuXHJcbiAgJChcIi5wb2x5Z29uLWxheWVyLXR5cGVzIFwiICsgXCIubGF5ZXItdHlwZS1pbWdcIikucmVtb3ZlQ2xhc3MoJ2ltZy1zZWxlY3RlZCcpO1xyXG4gICQoXCIucG9seWdvbi1sYXllci10eXBlcyAucmVnaW9uLVwiICsgbGF5ZXIucmVuZGVyVHlwZSkuYWRkQ2xhc3MoJ2ltZy1zZWxlY3RlZCcpO1xyXG4gICQoXCIucG9seWdvbi10aGVtZS10b29scyA+IC50aGVtZS10b29scy1pdGVtXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICQoXCIjcG9seWdvbi10aGVtZS10b29scy1cIiArIGxheWVyLnJlbmRlclR5cGUpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuXHJcbiAgJCgnLnBvbHlnb24tbGF5ZXItdHlwZXMgLmxheWVyLXR5cGUtaW1nJykuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIi5wb2x5Z29uLWxheWVyLXR5cGVzIFwiICsgXCIubGF5ZXItdHlwZS1pbWdcIikucmVtb3ZlQ2xhc3MoJ2ltZy1zZWxlY3RlZCcpO1xyXG4gICAgJCh0aGlzKS5hZGRDbGFzcygnaW1nLXNlbGVjdGVkJyk7XHJcblxyXG4gICAgJChcIi5wb2x5Z29uLXRoZW1lLXRvb2xzID4gLnRoZW1lLXRvb2xzLWl0ZW1cIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgbGV0IHJlbmRlcl90eXBlID0gJCh0aGlzKS5hdHRyKFwidHlwZVwiKTtcclxuICAgICQoXCIjcG9seWdvbi10aGVtZS10b29scy1cIiArIHJlbmRlcl90eXBlKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICBzd2FwUmVuZGVyVHlwZShyZW5kZXJfdHlwZSwgbW9kZWxfbWFwKTtcclxuICB9KTtcclxuXHJcbiAgc3dhcFJlbmRlclR5cGUobGF5ZXIucmVuZGVyVHlwZSwgbW9kZWxfbWFwKTtcclxufVxyXG5cclxuZ2xvYmFsLm9uSGFuZERyYXdMYXllclJlYWR5ID0gZnVuY3Rpb24gKCkge1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IHJlbmRlciA9IGJ1aWxkUHJvamVjdC5zZXR0aW5nLmxheWVyLmdldFJlbmRlcigpOyAvLyDlvZPliY3mv4DmtLvnmoRsYXllclxyXG4gIGxldCBoYW5kRHJhd0xheWVyc0NvbnRhaW5lciA9IGJ1aWxkUHJvamVjdC5oYW5kRHJhd0xheWVyc0NvbnRhaW5lcjtcclxuICBsZXQgZGF0YVNvdXJjZSA9IHJlbmRlci5kYXRhU291cmNlO1xyXG5cclxuICBoYW5kRHJhd0xheWVyc0NvbnRhaW5lci5yZXNldChkYXRhU291cmNlKTtcclxufVxyXG5cclxuZ2xvYmFsLmluaXRTaWRlcmJhciA9IGZ1bmN0aW9uIChtYXBWaWV3KSB7XHJcblxyXG4gIC8vIOWIneWni+WMluWbvuS+i3dpbmRvd1xyXG4gIHZhciB3aW4gPSBuZXcgS1EuQ29udHJvbC5XaW5kb3coJ2xlZ2VuZC13aW5kb3cnLCB7XHJcbiAgICBwYXJlbnRJRDogJ0txTWFwSUQnLFxyXG4gICAgcG9zaXRpb246IHtcclxuICAgICAgbGVmdDogJzM1NXB4JyxcclxuICAgICAgdG9wOiAnMTBweCcsXHJcbiAgICB9LFxyXG4gICAgaWNvbjogJ2ZhIGZhLWJhci1jaGFydCcsXHJcbiAgICB3aWR0aDogJzI0MHB4JyxcclxuICAgIHRpdGxlOiAnIOWbvuS+iycsXHJcbiAgICBkcmFnZ2FibGU6IGZhbHNlLFxyXG4gICAgcmVzaXphYmxlOiBmYWxzZSxcclxuICAgIHNjcm9sbGFibGU6IGZhbHNlLFxyXG4gICAgY2xvc2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIC8vIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIHdpbi5pbml0QXN5bmMoZnVuY3Rpb24gKCkge1xyXG4gICAgbWFwVmlldy5sZWdlbmRfd2luZG93ID0gd2luO1xyXG4gIH0pO1xyXG5cclxuICAvLyDlm77kvovot5/pmo9zaWRlYmFyXHJcbiAgalF1ZXJ5LmV4dGVuZChqUXVlcnkuZWFzaW5nLFxyXG4gICAgICB7XHJcbiAgICAgICAgZWFzZU91dFF1YWQ6IGZ1bmN0aW9uICh4LCB0LCBiLCBjLCBkKSB7XHJcbiAgICAgICAgICByZXR1cm4gLWMgKiAodCAvPSBkKSAqICh0IC0gMikgKyBiO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0pO1xyXG4gIHZhciBvcHRpb25zID0ge1xyXG4gICAgb25PcGVuZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChcIiNsZWdlbmQtd2luZG93XCIpLnBhcmVudCgpLmFuaW1hdGUoe2xlZnQ6IFwiMzU1cHhcIn0sIDUwMCwgJ2Vhc2VPdXRRdWFkJyk7XHJcbiAgICB9LFxyXG4gICAgb25DbG9zZWQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgJChcIiNsZWdlbmQtd2luZG93XCIpLnBhcmVudCgpLmFuaW1hdGUoe2xlZnQ6IFwiNjNweFwifSwgNTAwLCAnZWFzZU91dFF1YWQnKTtcclxuICAgIH0sXHJcbiAgfVxyXG5cclxuICAvLyDliJ3lp4vljJbkvqfovrnmoI9cclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gIHZhciBidWlsZGVyc2lkZWJhciA9ICQoJyNidWlsZGVyc2lkZWJhcicpLmJ1aWxkZXJzaWRlYmFyKG9wdGlvbnMpO1xyXG4gIGJ1aWxkUHJvamVjdC5zaWRlcmJhciA9IGJ1aWxkZXJzaWRlYmFyO1xyXG4gIGJ1aWxkZXJzaWRlYmFyLmNsb3NlKCk7XHJcblxyXG4gICQoJy5zYXZlVG9vbEJhcicpLmtlbmRvU2F2ZVRvb2xCYXIoe1xyXG4gICAgc2lkZWJhcjogYnVpbGRlcnNpZGViYXIsXHJcbiAgICBvblNlbGVjdDogYXN5bmMgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdmFyIHR5cGUgPSAkKGUuaXRlbSkuZGF0YShcInR5cGVcIik7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiU2VsZWN0ZWQ6IFwiICsgdHlwZSk7XHJcbiAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgIGNhc2UgJ3NhdmUnOiB7XHJcbiAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBLUS5Db250cm9sLldhaXRpbmcuc2hvdyhtYXBWaWV3Ll9nZXRNYXAoKSwgJ3BpbicsICdtZXRlcicpO1xyXG4gICAgICAgICAgICBsZXQgcHJvamVjdE1hbmFnZXIgPSBLUS5CdWlsZGVyLlByb2plY3RNYW5hZ2VyLmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgICAgIGxldCBwcm9qZWN0TmFtZSA9ICQoXCIjY3VycmVudC1wcm9qZWN0LW5hbWVcIilbMF0uaW5uZXJUZXh0O1xyXG4gICAgICAgICAgICBsZXQgb3B0aW9uID0ge307XHJcbiAgICAgICAgICAgIG9wdGlvbi5wcm9qZWN0TmFtZSA9IHByb2plY3ROYW1lO1xyXG4gICAgICAgICAgICBvcHRpb24uaXNTYXZlQXMgPSBmYWxzZTtcclxuICAgICAgICAgICAgYXdhaXQgcHJvamVjdE1hbmFnZXIuc2F2ZVByb2plY3Qob3B0aW9uKTtcclxuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgS1EuQ29udHJvbC5XYWl0aW5nLmNsb3NlKCk7XHJcbiAgICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICBLUS5Db250cm9sLldhaXRpbmcuY2xvc2UoKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAnc2F2ZWFzJzoge1xyXG4gICAgICAgICAgd2luZG93LlByb2plY3RTYXZlQXNEaWFsb2cgPSBudWxsO1xyXG4gICAgICAgICAgaWYgKCF3aW5kb3cuUHJvamVjdFNhdmVBc0RpYWxvZykge1xyXG4gICAgICAgICAgICB3aW5kb3cuUHJvamVjdFNhdmVBc0RpYWxvZyA9IG5ldyBLUS5CdWlsZGVyLkJ1aWxkZXJVaS5Qcm9qZWN0U2F2ZUFzRGlhbG9nKFwiI3Byb2plY3Qtc2F2ZWFzLWNvbnRhaW5lclwiLCB7fSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5Qcm9qZWN0U2F2ZUFzRGlhbG9nLm9uKFwic2F2ZVwiLCBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwic2F2ZSBwcm9qZWN0OiBcIiwgZGF0YSk7XHJcbiAgICAgICAgICAgICAgbGV0IHByb2plY3RNYW5hZ2VyID0gS1EuQnVpbGRlci5Qcm9qZWN0TWFuYWdlci5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgICAgICAgIGxldCBvcHRpb24gPSB7fTtcclxuICAgICAgICAgICAgICBvcHRpb24ucHJvamVjdE5hbWUgPSBkYXRhLmRhdGFTb3VyY2VJbmZvLm5hbWU7XHJcbiAgICAgICAgICAgICAgb3B0aW9uLmlzU2F2ZUFzID0gdHJ1ZTtcclxuICAgICAgICAgICAgICBhd2FpdCBwcm9qZWN0TWFuYWdlci5zYXZlUHJvamVjdChvcHRpb24pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB3aW5kb3cuUHJvamVjdFNhdmVBc0RpYWxvZy5vbihcImNhbmNhbFwiLCBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY2FuY2VsIHNhdmU6IFwiLCBkYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH1cclxuICAgICAgICAgICQoXCIjcHJvamVjdC1zYXZlYXMtY29udGFpbmVyXCIpLmRhdGEoXCJrZW5kb1dpbmRvd1wiKS5jZW50ZXIoKS5vcGVuKCk7XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhc2UgJ2Nsb3VkZG93bic6IHtcclxuICAgICAgICAgIHdpbmRvdy5sb2FkUHJvamVjdERpYWxvZyA9IG51bGw7XHJcbiAgICAgICAgICBpZiAoIXdpbmRvdy5sb2FkUHJvamVjdERpYWxvZykge1xyXG4gICAgICAgICAgICB3aW5kb3cubG9hZFByb2plY3REaWFsb2cgPSBuZXcgS1EuQnVpbGRlci5CdWlsZGVyVWkuUHJvamVjdExvYWREaWFsb2coXCIjcHJvamVjdC1kb3dubG9hZC1jb250YWluZXJcIiwge2ZpbHRlcjogXCJwcmpcIn0pO1xyXG5cclxuICAgICAgICAgICAgd2luZG93LmxvYWRQcm9qZWN0RGlhbG9nLm9uKCdsb2FkJywgYXN5bmMgZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICBhd2FpdCBsb2FkUHJvamVjdChkYXRhLmRhdGFTb3VyY2VJbmZvWyd1cmwnXSk7XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICB3aW5kb3cubG9hZFByb2plY3REaWFsb2cub24oJ2RlbGV0ZScsIGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgLy8g5Yid5aeL5YyW5Yig6Zmk5bel56iL5oyJ6ZKuXHJcbiAgICAgICAgICAgICAgJChcIiNjb25maXJtLWRpdlwiKS5rZW5kb0NvbmZpcm0oe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IFwi5Yig6Zmk6L+c56iL5bel56iLXCIsXHJcbiAgICAgICAgICAgICAgICBjb250ZW50OiBcIuW3peeoi+WIoOmZpOWQjuaXoOazleaBouWkje+8jOehruWumuWIoOmZpO+8n1wiLFxyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXM6IHtcclxuICAgICAgICAgICAgICAgICAgb2tUZXh0OiBcIuehruWumlwiLFxyXG4gICAgICAgICAgICAgICAgICBjYW5jZWxUZXh0OiBcIuWPlua2iFwiLFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0pLmRhdGEoXCJrZW5kb0NvbmZpcm1cIikucmVzdWx0LmRvbmUoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgJCgnYm9keScpLmFwcGVuZCgkKCc8ZGl2IGlkPVwiY29uZmlybS1kaXZcIj4nKSk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9hZFByb2plY3REaWFsb2cuZmlyZShcImRlbGV0ZV9ldmVudFwiLCBkYXRhKTtcclxuICAgICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoJ2JvZHknKS5hcHBlbmQoJCgnPGRpdiBpZD1cImNvbmZpcm0tZGl2XCI+JykpO1xyXG4gICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgd2luZG93LmxvYWRQcm9qZWN0RGlhbG9nLm9uKFwiZGVsZXRlX2V2ZW50XCIsIGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgYXdhaXQgZGVsZXRlUHJvamVjdEZpbGUoZGF0YS5kYXRhU291cmNlSW5mb1sndXJsJ10pO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICQoXCIjcHJvamVjdC1kb3dubG9hZC1jb250YWluZXJcIikuZGF0YShcImtlbmRvV2luZG93XCIpLmNlbnRlcigpLm9wZW4oKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FzZSAnZm9sZCc6IHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdkbyBmb2xkMSEnKTtcclxuICAgICAgICAgIGlmICh0aGlzLm9wdGlvbnMuc2lkZWJhcilcclxuICAgICAgICAgICAgdGhpcy5vcHRpb25zLnNpZGViYXIuY2xvc2UoKTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgLy8g5Yid5aeL5YyWdXNlcmluZm9cclxuICBuZXcgS1EuQnVpbGRlci5CdWlsZGVyVWkuQnVpbGRlclVzZXJJbmZvKCk7XHJcbn1cclxuXHJcblxyXG5nbG9iYWwuaW5pdE1hcEdlb21hbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICBsZXQgcG1sYXllcnMgPSBbXTtcclxuICBsZXQgZ2VvbWFuID0gS1EuTWFwLk1hcEdlb21hbi5nZXRJbnN0YW5jZSgpO1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IG1hcCA9IGJ1aWxkUHJvamVjdC5tYXBWaWV3Ll9nZXRNYXAoKTtcclxuXHJcbiAgZ2VvbWFuLmluaXQocG1sYXllcnMsIG1hcCwge1xyXG4gICAgb25DcmVhdGU6IGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgICBsZXQgdHlwZSA9IEtRLkJ1aWxkZXIuQnVpbGRlckNvbW1vbi5nZW9tYW5TaGFwZVRvVHlwZShsYXllci5zaGFwZSk7XHJcbiAgICAgIGFkZEhhbmREcmF3TGF5ZXJJdGVtKGxheWVyLmlkLCB0eXBlKTtcclxuICAgICAgZ2VvbWFuLmRpc2FibGVEcmF3KHR5cGUpO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgYnVpbGRQcm9qZWN0Lmdlb21hbiA9IGdlb21hbjtcclxufVxyXG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBsaXdlaSBvbiAyMDE5LzEwLzE0LlxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxucmVxdWlyZSgnLi9idWlsZGVyL19pbml0RG9tcycpO1xyXG5yZXF1aXJlKCcuL2J1aWxkZXIvbGlicy9qcXVlcnktc2lkZWJhcicpO1xyXG5yZXF1aXJlKCcuL2J1aWxkZXIvdmlld2VyJyk7XHJcblxyXG5yZXF1aXJlKCcuL2J1aWxkZXIvY29tbW9uJyk7XHJcbi8vIHJlcXVpcmUoJy4vYnVpbGRlci9CdWlsZGVySW5pdCcpO1xyXG4iXX0=
