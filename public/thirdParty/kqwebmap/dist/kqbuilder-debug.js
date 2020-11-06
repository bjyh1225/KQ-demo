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

global.builderInitDoms.initFieldColorContainer = initFieldColorContainer;

global.builderInitDoms.fillSvgSymbols = fillSvgSymbols;
global.builderInitDoms.fillImageSymbols = fillImageSymbols;
global.builderInitDoms.render = render;
global.builderInitDoms.refreshThematicColors = refreshThematicColors;

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

  initFieldColorContainer();

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

  initFieldColorContainer();

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

  initFieldColorContainer();

  initKendoDoms();
}

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
}

function render() {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var layer = buildProject.setting.layer; // 当前激活的layer
  var renderType = layer.getRenderType();
  var renderModel = buildProject.getInfo('render_model');
  var options = renderModel.styleOptions;
  var render = layer.render.get(renderType);

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
    options.fillOpacity = renderModel.fillOpacity / 100;
    options.lineOpacity = renderModel.lineOpacity / 100;
  }

  // 特殊处理gradient
  if (options.renderType === "heatmap") {
    options.gradient = KQ.Common.CommonValues.heatmapColorRamp[options.colorIndex];
  }

  render.setOptions(options);
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

function _getColorFieldsArray(featureType, renderType) {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var layer = buildProject.setting.layer; // 当前激活的layer
  var render = layer.render;
  console.log('render: ', render);

  if (renderType === "single") {
    if (featureType == 'point') {
      return render.get('single').options.vectorInfo.thematicColors;
    } else {
      console.log("_initDOms.js 1071, thematicColors: ", render.get('single').options.thematicColors);
      return render.get('single').options.thematicColors;
    }
  } else if (renderType === "section") {
    if (featureType == 'point') {
      return render.get('section').options.vectorInfo.thematicColors.colors;
    } else {
      return render.get('section').options.thematicColors.colors;
    }
  } else if (renderType === "heatmap") {
    return render.get('heatmap').options.gradient;
  }
}

function _getRangeArray(featureType) {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var layer = buildProject.setting.layer; // 当前激活的layer
  var render = layer.render;

  if (featureType == 'point') {
    return render.get('section').options.vectorInfo.thematicColors.breaksData;
  } else {
    return render.get('section').options.thematicColors.breaksData;
  }
}

function _initFieldColorContainer() {
  var buildProject = KQ.Builder.BuilderProject.getInstance();
  var layer = buildProject.setting.layer; // 当前激活的layer
  var featureType = layer.options.featureType;

  // 根据点、线、面来进行划分初始化
  var containers = document.getElementsByClassName(featureType + " editor-fields-color");
  for (var i = 0; i < containers.length; i++) {
    // 判断当前节点是否展开
    var expanded = false;
    var $switchNode = $(containers[i]).find(".fields-div-switch");
    if ($switchNode.length != 0 && !$switchNode.hasClass("state-close")) {
      expanded = true;
    }

    // 清空，防止重复添加
    $(containers[i]).empty();

    var html = "";
    var div = document.createElement("div");
    var shapeClass = "icon-shape-" + featureType;

    // 单值渲染模式
    if (containers[i].classList.contains("single")) {
      // 添加title
      html += "<div class=\"title\">\n                 <span>\u81EA\u5B9A\u4E49\u5355\u503C</span>\n                  <div class=\"unique-show\"><span>\u5C55\u5F00</span><i class=\"fa fa-plus-square-o fields-div-switch state-close\"></i></div>\n                </div>\n                <div class=\"fields-container\" style=\"display: none;\">";

      // 得到颜色的数组
      var colorFieldsArray = _getColorFieldsArray(featureType, "single");

      // 遍历颜色数组，添加各行控件
      colorFieldsArray.forEach(function (value, key) {
        html += "<div class=\"fields-item\">\n                <span class=\"icon iconfont " + shapeClass + " colors-picker\" style=\"color: " + value + "\"><div class=\"single-colors-picker\" value=" + value + "></div></span>\n                <span class=\"value\">";
        html += key + "</span></div>";
      });

      html += "</div>";
      div.innerHTML = html;
      containers[i].appendChild(div);
    } else if (containers[i].classList.contains("section")) {
      (function () {
        // 添加title
        html += "<div class=\"title\">\n                 <span>\u81EA\u5B9A\u4E49\u5206\u6BB5</span>\n                  <div class=\"unique-show\"><span>\u5C55\u5F00</span><i class=\"fa fa-plus-square-o fields-div-switch state-close\"></i></div>\n                </div>\n                <div class=\"fields-container\" style=\"display: none;\">";

        // 得到颜色数组、范围数组
        var colorFieldsArray = _getColorFieldsArray(featureType, "section");
        var rangeArray = _getRangeArray(featureType);

        // 遍历颜色数组，添加各行控件
        colorFieldsArray.forEach(function (value, index) {
          html += "<div class=\"fields-item\" data-index=" + index + " >\n                    <span class=\"icon iconfont " + shapeClass + " colors-picker\" style=\"color: " + value + "\"><div class=\"section-colors-picker\" value=" + value + "></div></span>\n                    <div class=\"range-values\">\n                      <input style=\"width: 100px\" class=\"value-start\" value=" + rangeArray[index].toFixed(3) + ">\n                      <span class=\"value-hr\">-</span>\n                      <input style=\"width: 100px\" class=\"value-end\" value=" + rangeArray[index + 1].toFixed(3) + ">\n                    </div>\n                  </div>";
        });

        html += "</div>";
        div.innerHTML = html;
        containers[i].appendChild(div);

        $(containers[i]).find(".value-start").kendoMaskedTextBox({});
        $(containers[i]).find(".value-end").kendoMaskedTextBox({});
      })();
    } else if (containers[i].classList.contains("heatmap")) {
      (function () {
        html += "<div class=\"editor-fields-color\" >\n            <div class=\"title\"><span>\u81EA\u5B9A\u4E49\u989C\u8272</span>\n              <div class=\"unique-show\"><span>\u5C55\u5F00</span><i class=\"fa fa-plus-square-o fields-div-switch state-close\"></i></div>\n            </div>\n            <div class=\"fields-container\" style=\"display: none;\">";
        var colorFieldsObject = _getColorFieldsArray(featureType, "heatmap");
        var colorFieldsArray = Object.keys(colorFieldsObject).sort();
        colorFieldsArray.forEach(function (key, index) {
          html += "<div class=\"editor-tool\" data-key=" + key + ">\n                  <div class=\"text\">\u70ED\u70B9\u989C\u8272" + (Number(index) + 1) + "</div>\n                  <div class=\"heatmap-colors-picker\" data-role=\"colorpicker\" value=\"" + colorFieldsObject[key] + "\"></div>\n                 </div>";
        });
        html += "</div>";
        div.innerHTML = html;
        containers[i].appendChild(div);
      })();
    }

    // 自定义单值颜色变化, colorpicker颜色变化后修改span的color
    $(containers[i]).find(".single-colors-picker").kendoColorPicker({
      button: false,
      change: function change(e) {
        var color = e.value;
        var key = $(this)[0].element.parents(".fields-item").find(".value").text();
        var classList = $(this)[0].element.parents(".editor-fields-color")[0].classList;
        var featureType = classList[1];
        var renderType = classList[2];
        var thematicColors = _getColorFieldsArray(featureType, renderType);

        // 改变控件的颜色
        $(this)[0].element.parents("span").css("color", color);

        // 改变专题字段的填充色，并进行渲染
        if (thematicColors.has(key)) {
          thematicColors.set(key, color);
        } else if (thematicColors.has(Number(key))) {
          thematicColors.set(Number(key), color);
        }
        render();
      }
    });

    // 自定义分段颜色变化, colorpicker颜色变化后修改span的color
    $(containers[i]).find(".section-colors-picker").kendoColorPicker({
      button: false,
      change: function change(e) {
        var color = e.value;
        var index = $(this)[0].element.parents(".fields-item").attr("data-index");
        var classList = $(this)[0].element.parents(".editor-fields-color")[0].classList;
        var featureType = classList[1];
        var renderType = classList[2];
        var thematicColors = _getColorFieldsArray(featureType, renderType);

        // 改变控件的颜色
        $(this)[0].element.parents("span").css("color", color);

        // 改变专题字段的填充色，并进行渲染
        thematicColors[index] = color;
        render();
      }
    });

    // 自定义热力图颜色变化， colorpicker颜色变化
    $(containers[i]).find(".heatmap-colors-picker").kendoColorPicker({
      button: false,
      change: function change(e) {
        var color = e.value;
        var key = $(this)[0].element.parents(".editor-tool").attr("data-key");

        var buildProject = KQ.Builder.BuilderProject.getInstance();
        var layer = buildProject.setting.layer; // 当前激活的layer
        var renderModel = buildProject.getInfo('render_model');
        var options = renderModel.styleOptions;

        options.gradient = KQ.Common.CommonValues.heatmapColorRamp[options.colorIndex];
        options.gradient[key] = color;

        render();
        initFieldColorContainer();
      }
    });

    // 起始范围变化
    $(containers[i]).find(".value-start input").change(function (e) {
      var index = Number($(this).parents(".fields-item").attr("data-index"));
      var classList = $(this).parents(".editor-fields-color")[0].classList;
      var featureType = classList[1];
      var renderType = classList[2];
      var rangeArray = _getRangeArray(featureType, renderType);
      var min_value = Number.MIN_SAFE_INTEGER;
      var max_value = Number.MAX_SAFE_INTEGER;
      var new_value = Number(e.target.value);
      var $prev_node = null;

      if (index - 1 >= 0) {
        min_value = rangeArray[index - 1];
        $prev_node = $(this).parents(".fields-item").prev().find(".value-end input");
      }

      if (index + 1 < rangeArray.length) {
        max_value = rangeArray[index + 1];
      }

      if (new_value > min_value && new_value < max_value) {
        rangeArray[index] = new_value;

        if ($prev_node) {
          $prev_node.val(new_value);
        }
      } else {
        KQ.Control.Notification.getInstance().showError('数值范围不正确');
        e.target.value = rangeArray[index];
      }
      render();
    });

    // 结束范围变化
    $(containers[i]).find(".value-end input").change(function (e) {
      var index = Number($(this).parents(".fields-item").attr("data-index")) + 1;
      var classList = $(this).parents(".editor-fields-color")[0].classList;
      var featureType = classList[1];
      var renderType = classList[2];
      var rangeArray = _getRangeArray(featureType, renderType);
      var min_value = Number.MIN_SAFE_INTEGER;
      var max_value = Number.MAX_SAFE_INTEGER;
      var new_value = Number(e.target.value);
      var $next_node = null;

      if (index - 1 >= 0) {
        min_value = rangeArray[index - 1];
      }

      if (index + 1 < rangeArray.length) {
        max_value = rangeArray[index + 1];
        $next_node = $(this).parents(".fields-item").next().find(".value-start input");
      }

      if (new_value > min_value && new_value < max_value) {
        rangeArray[index] = new_value;

        if ($next_node) {
          $next_node.val(new_value);
        }
      } else {
        KQ.Control.Notification.getInstance().showError('数值范围不正确');
        e.target.value = rangeArray[index];
      }
      render();
    });

    $(containers[i]).find(".colors-picker").click(function () {
      $(this).find(".k-selected-color")[0].click();
    });

    // 绑定自定义单值展开、收缩事件
    $(containers[i]).find(".fields-div-switch").click(function () {
      var self = $(this);
      if (self.hasClass("state-close")) {
        self.siblings("span").value = "展开";
        self.parents(".title").siblings(".fields-container").css("display", "block");
        self.removeClass("state-close");
        self.removeClass("fa-plus-square-o");
        self.addClass("fa-minus-square-o");
      } else {
        self.siblings("span").value = "收起";
        self.parents(".title").siblings(".fields-container").css("display", "none");
        self.addClass("state-close");
        self.removeClass("fa-minus-square-o");
        self.addClass("fa-plus-square-o");
      }
    });

    // 如果需要展开，则触发click事件
    if (expanded) {
      $(containers[i]).find(".fields-div-switch").trigger('click');
    }
  }
}

function initFieldColorContainer() {
  asynProxy(_initFieldColorContainer)();
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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
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

$.fn.buildersidebar = function (options) {
  var $sidebar = this;
  var $tabs = $sidebar.find('ul.buildersidebar-tabs, .buildersidebar-tabs > ul');
  var $container = $sidebar.children('.buildersidebar-content').first();

  options = $.extend({
    position: 'left'
  }, options || {});

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
  };

  return $sidebar;
};

},{}],3:[function(require,module,exports){
/**
 * Created by liwei on 2019/10/14.
 */
'use strict';

require('./builder/_initDoms');
require('./builder/libs/jquery-sidebar');

},{"./builder/_initDoms":1,"./builder/libs/jquery-sidebar":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci9faW5pdERvbXMuanMiLCJzcmMvYnVpbGRlci9saWJzL2pxdWVyeS1zaWRlYmFyLmpzIiwic3JjL2txYnVpbGRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7OztBQ0FBOztBQUVBOzs7O0FBSUEsT0FBTyxlQUFQLEdBQXlCLEVBQXpCO0FBQ0EsT0FBTyxlQUFQLENBQXVCLFdBQXZCLEdBQXFDLFdBQXJDO0FBQ0EsT0FBTyxlQUFQLENBQXVCLGFBQXZCLEdBQXVDLGFBQXZDO0FBQ0EsT0FBTyxlQUFQLENBQXVCLFlBQXZCLEdBQXNDLFlBQXRDO0FBQ0EsT0FBTyxlQUFQLENBQXVCLGVBQXZCLEdBQXlDLGVBQXpDOztBQUVBLE9BQU8sZUFBUCxDQUF1QixxQkFBdkIsR0FBK0MscUJBQS9DO0FBQ0EsT0FBTyxlQUFQLENBQXVCLHNCQUF2QixHQUFnRCxzQkFBaEQ7QUFDQSxPQUFPLGVBQVAsQ0FBdUIscUJBQXZCLEdBQStDLHFCQUEvQztBQUNBLE9BQU8sZUFBUCxDQUF1Qix3QkFBdkIsR0FBa0Qsd0JBQWxEO0FBQ0EsT0FBTyxlQUFQLENBQXVCLHFCQUF2QixHQUErQyxxQkFBL0M7QUFDQSxPQUFPLGVBQVAsQ0FBdUIsK0JBQXZCLEdBQXlELCtCQUF6RDtBQUNBLE9BQU8sZUFBUCxDQUF1QiwwQkFBdkIsR0FBb0QsMEJBQXBEO0FBQ0EsT0FBTyxlQUFQLENBQXVCLDRCQUF2QixHQUFzRCw0QkFBdEQ7QUFDQSxPQUFPLGVBQVAsQ0FBdUIsMEJBQXZCLEdBQW9ELDBCQUFwRDtBQUNBLE9BQU8sZUFBUCxDQUF1Qiw0QkFBdkIsR0FBc0QsNEJBQXREO0FBQ0EsT0FBTyxlQUFQLENBQXVCLHVCQUF2QixHQUFpRCx1QkFBakQ7O0FBRUEsT0FBTyxlQUFQLENBQXVCLHVCQUF2QixHQUFpRCx1QkFBakQ7O0FBRUEsT0FBTyxlQUFQLENBQXVCLGNBQXZCLEdB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QUFKLEVBQW9DO0FBQ2xDO0FBQ0EsZUFBUyxPQUFULENBQWlCLFNBQWpCO0FBQ0EsZUFBUyxXQUFULENBQXFCLFdBQXJCO0FBQ0Q7O0FBRUQsYUFBUyxJQUFULENBQWMsc0JBQWQsRUFBc0MsSUFBdEM7O0FBRUEsZ0JBQVksRUFBWjtBQUNELEdBM0JEOztBQTZCQTs7O0FBR0EsV0FBUyxLQUFULEdBQWlCLFlBQVk7QUFDM0I7QUFDQSxVQUFNLFFBQU4sQ0FBZSxXQUFmLEVBQTRCLFdBQTVCLENBQXdDLFFBQXhDOztBQUVBLGFBQVMsSUFBVCxDQUFjLHNCQUFkLEVBQXNDLElBQXRDOztBQUVBLFFBQUksQ0FBQyxTQUFTLFFBQVQsQ0FBa0IsV0FBbEIsQ0FBTCxFQUFxQztBQUNuQztBQUNBLGVBQVMsT0FBVCxDQUFpQixTQUFqQjtBQUNBLGVBQVMsUUFBVCxDQUFrQixXQUFsQjtBQUNEO0FBQ0YsR0FYRDs7QUFhQSxTQUFPLFFBQVA7QUFDRCxDQXRGRDs7O0FDYkE7OztBQUdBOztBQUVBLFFBQVEscUJBQVI7QUFDQSxRQUFRLCtCQUFSIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy8gaW1wb3J0IFJlbmRlclNoYXBlIGZyb20gXCIuLi8uLi8uLi9zcmMvYnVpbGRlci9SZW5kZXJTaGFwZVwiO1xyXG5cclxuLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGlodWFuIG9uIDIwMTkvOC8xOS5cclxuICovXHJcblxyXG5nbG9iYWwuYnVpbGRlckluaXREb21zID0ge307XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMuaW5pdEFsbERvbXMgPSBpbml0QWxsRG9tcztcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5pbml0UG9pbnREb21zID0gaW5pdFBvaW50RG9tcztcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5pbml0TGluZURvbXMgPSBpbml0TGluZURvbXM7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMuaW5pdFBvbHlnb25Eb21zID0gaW5pdFBvbHlnb25Eb21zO1xyXG5cclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5saW5lU3R5bGVEcm9wRG93bkxpc3QgPSBsaW5lU3R5bGVEcm9wRG93bkxpc3Q7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMubGFiZWxGaWVsZERyb3BEb3duTGlzdCA9IGxhYmVsRmllbGREcm9wRG93bkxpc3Q7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMubGFiZWxGb250RHJvcERvd25MaXN0ID0gbGFiZWxGb250RHJvcERvd25MaXN0O1xyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLnNwZWNpYWxGaWVsZERyb3BEb3duTGlzdCA9IHNwZWNpYWxGaWVsZERyb3BEb3duTGlzdDtcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5yYW1wQ29sb3JEcm9wRG93bkxpc3QgPSByYW1wQ29sb3JEcm9wRG93bkxpc3Q7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMuc2VjdGlvblNwZWNpYWxGaWVsZERyb3BEb3duTGlzdCA9IHNlY3Rpb25TcGVjaWFsRmllbGREcm9wRG93bkxpc3Q7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMuc3Vic2VjdGlvblR5cGVEcm9wRG93bkxpc3QgPSBzdWJzZWN0aW9uVHlwZURyb3BEb3duTGlzdDtcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5zdWJzZWN0aW9uTnVtYmVyRHJvcERvd25MaXN0ID0gc3Vic2VjdGlvbk51bWJlckRyb3BEb3duTGlzdDtcclxuZ2xvYmFsLmJ1aWxkZXJJbml0RG9tcy5sYWJlbERpcmVjdGlvbkRyb3BEb3duTGlzdCA9IGxhYmVsRGlyZWN0aW9uRHJvcERvd25MaXN0O1xyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLmhlYXRtYXBSYW1wQ29sb3JEcm9wRG93bkxpc3QgPSBoZWF0bWFwUmFtcENvbG9yRHJvcERvd25MaXN0O1xyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLndlaWdodEZpZWxkRHJvcERvd25MaXN0ID0gd2VpZ2h0RmllbGREcm9wRG93bkxpc3Q7XHJcblxyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLmluaXRGaWVsZENvbG9yQ29udGFpbmVyID0gaW5pdEZpZWxkQ29sb3JDb250YWluZXI7XHJcblxyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLmZpbGxTdmdTeW1ib2xzID0gZmlsbFN2Z1N5bWJvbHM7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMuZmlsbEltYWdlU3ltYm9scyA9IGZpbGxJbWFnZVN5bWJvbHM7XHJcbmdsb2JhbC5idWlsZGVySW5pdERvbXMucmVuZGVyID0gcmVuZGVyO1xyXG5nbG9iYWwuYnVpbGRlckluaXREb21zLnJlZnJlc2hUaGVtYXRpY0NvbG9ycyA9IHJlZnJlc2hUaGVtYXRpY0NvbG9ycztcclxuXHJcblxyXG5mdW5jdGlvbiBpbml0QWxsRG9tcygpIHtcclxuICBpbml0U3ltYm9sVHlwZUNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludFN5dGxlQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50UmFtcENvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50Q29sb3JDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRTaXplQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50T3BhY2l0eUNvbnRhaW5lcigpO1xyXG4gIGluaXRIZWF0bWFwRmlsdGVyQ29udGFpbmVyKCk7XHJcbiAgaW5pdEhlYXRtYXBSYWRpdXNDb250YWluZXIoKTtcclxuICBpbml0SGVhdG1hcFJhbXBDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRIZWF0bWFwV2VpZ2h0RmllbGRDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRMaW5lQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRMaW5lV2lkdGhDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRMaW5lT3BhY2l0eUNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludFNwZWNpYWxGaWVsZENvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludFN1YnNlY3Rpb25UeXBlQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50U3Vic2VjdGlvbk51bWJlckNvbnRhaW5lcigpO1xyXG4gIGluaXRMYWJlbERpcmVjdGlvbkNvbnRhaW5lcigpO1xyXG4gIGluaXRMYWJlbE9mZnNldENvbnRhaW5lcigpO1xyXG5cclxuICBpbml0TGluZUNvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVTdHlsZUxpc3RDb250YWluZXIoKTtcclxuICBpbml0TGluZU9wYWNpdHlDb250YWluZXIoKTtcclxuICBpbml0TGluZVdpZHRoQ29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVSYW1wQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0U3BlY2lhbEZpZWxkQ29udGFpbmVyKCk7XHJcbiAgaW5pdFN1YnNlY3Rpb25UeXBlQ29udGFpbmVyKCk7XHJcbiAgaW5pdFN1YnNlY3Rpb25OdW1iZXJDb250YWluZXIoKTtcclxuICBpbml0UG9seWdvbkNvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvbHlnb25PcGFjaXR5Q29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRQb2x5Z29uUmFtcENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRDb21tb25VaXMoKTtcclxuICBpbml0S2VuZG9Eb21zKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRQb2ludERvbXMoKSB7XHJcbiAgaW5pdFN5bWJvbFR5cGVDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdFBvaW50U3l0bGVDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRSYW1wQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludFNpemVDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRPcGFjaXR5Q29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRIZWF0bWFwRmlsdGVyQ29udGFpbmVyKCk7XHJcbiAgaW5pdEhlYXRtYXBSYWRpdXNDb250YWluZXIoKTtcclxuICBpbml0SGVhdG1hcFJhbXBDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRIZWF0bWFwV2VpZ2h0RmllbGRDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdFBvaW50TGluZUNvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50TGluZVdpZHRoQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50TGluZU9wYWNpdHlDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdFBvaW50U3BlY2lhbEZpZWxkQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50U3Vic2VjdGlvblR5cGVDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRTdWJzZWN0aW9uTnVtYmVyQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRMYWJlbERpcmVjdGlvbkNvbnRhaW5lcigpO1xyXG4gIGluaXRMYWJlbE9mZnNldENvbnRhaW5lcigpO1xyXG5cclxuICBpbml0Q29tbW9uVWlzKCk7XHJcblxyXG4gIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRLZW5kb0RvbXMoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdExpbmVEb21zKCkge1xyXG4gIGluaXRDb21tb25VaXMoKTtcclxuICBpbml0TGluZUNvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVTdHlsZUxpc3RDb250YWluZXIoKTtcclxuICBpbml0TGluZU9wYWNpdHlDb250YWluZXIoKTtcclxuICBpbml0TGluZVdpZHRoQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRMaW5lUmFtcENvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFNwZWNpYWxGaWVsZENvbnRhaW5lcigpO1xyXG4gIGluaXRTdWJzZWN0aW9uVHlwZUNvbnRhaW5lcigpO1xyXG4gIGluaXRTdWJzZWN0aW9uTnVtYmVyQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRQb2x5Z29uQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0UG9seWdvbk9wYWNpdHlDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdEtlbmRvRG9tcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0UG9seWdvbkRvbXMoKSB7XHJcbiAgaW5pdENvbW1vblVpcygpO1xyXG5cclxuICBpbml0U3BlY2lhbEZpZWxkQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRTdWJzZWN0aW9uVHlwZUNvbnRhaW5lcigpO1xyXG4gIGluaXRTdWJzZWN0aW9uTnVtYmVyQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvbHlnb25SYW1wQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0UG9seWdvbkNvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvbHlnb25PcGFjaXR5Q29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRMaW5lQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0TGluZVN0eWxlTGlzdENvbnRhaW5lcigpO1xyXG4gIGluaXRMaW5lT3BhY2l0eUNvbnRhaW5lcigpO1xyXG4gIGluaXRMaW5lV2lkdGhDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdEtlbmRvRG9tcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0S2VuZG9Eb21zKCkge1xyXG4gICQoXCIuY29sb3JzLXBpY2tlci1pbnB1dFwiKS5rZW5kb0NvbG9yUGlja2VyKHtcclxuICAgIGJ1dHRvbjogZmFsc2UsXHJcbiAgICBjaGFuZ2U6IHJlbmRlcixcclxuICB9KTtcclxuXHJcbiAgLy8g54K55aSn5bCPXHJcbiAgJChcIi5wb2ludC1zaXplLXNpbGRlclwiKS5rZW5kb1NsaWRlcih7XHJcbiAgICBtaW46IDEsXHJcbiAgICBtYXg6IDIwLFxyXG4gICAgc21hbGxTdGVwOiAxLFxyXG4gICAgbGFyZ2VTdGVwOiAxLFxyXG4gICAgc2hvd0J1dHRvbnM6IGZhbHNlLFxyXG4gICAgdGlwczogZmFsc2UsXHJcblxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSkuZGF0YShcImtlbmRvU2xpZGVyXCIpO1xyXG5cclxuICAvLyDng63ngrnljYrlvoRcclxuICAkKFwiLmhlYXRtYXAtcmFkaXVzLXNpbGRlclwiKS5rZW5kb1NsaWRlcih7XHJcbiAgICBtaW46IDEsXHJcbiAgICBtYXg6IDIwLFxyXG4gICAgc21hbGxTdGVwOiAxLFxyXG4gICAgbGFyZ2VTdGVwOiAxLFxyXG4gICAgc2hvd0J1dHRvbnM6IGZhbHNlLFxyXG4gICAgdGlwczogZmFsc2UsXHJcblxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSkuZGF0YShcImtlbmRvU2xpZGVyXCIpO1xyXG5cclxuICAkKFwiLmxpbmUtd2lkdGgtc2lsZGVyXCIpLmtlbmRvU2xpZGVyKHtcclxuICAgIG1pbjogMCxcclxuICAgIG1heDogMjAsXHJcbiAgICBzbWFsbFN0ZXA6IDEsXHJcbiAgICBsYXJnZVN0ZXA6IDEsXHJcbiAgICBzaG93QnV0dG9uczogZmFsc2UsXHJcbiAgICB0aXBzOiBmYWxzZSxcclxuXHJcbiAgICBjaGFuZ2U6IHJlbmRlcixcclxuICB9KS5kYXRhKFwia2VuZG9TbGlkZXJcIik7XHJcblxyXG4gICQoXCIub3BhY2l0eS1zbGlkZXJcIikua2VuZG9TbGlkZXIoe1xyXG4gICAgbWluOiAwLFxyXG4gICAgbWF4OiAxMDAsXHJcbiAgICBzbWFsbFN0ZXA6IDUsXHJcbiAgICBsYXJnZVN0ZXA6IDEwLFxyXG4gICAgc2hvd0J1dHRvbnM6IGZhbHNlLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pLmRhdGEoXCJrZW5kb1NsaWRlclwiKTtcclxuXHJcbiAgJChcIi5saW5lLXN0eWxlLWxpc3RcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJuYW1lXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJ2YWx1ZVwiLFxyXG5cclxuICAgIHRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJrLXN0YXRlLWRlZmF1bHRcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9saW5lX3N0eWxlcy9saW5lX3N0eWxlIzpkYXRhLm5hbWUjLnBuZylcIj48L3NwYW4+JyxcclxuICAgIHZhbHVlVGVtcGxhdGU6ICc8c3BhbiBjbGFzcz1cInNlbGVjdGVkLXZhbHVlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvbGluZV9zdHlsZXMvbGluZV9zdHlsZSM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICBoZWlnaHQ6IDIwMCxcclxuXHJcbiAgICBjaGFuZ2U6IHJlbmRlcixcclxuICB9KTtcclxuXHJcbiAgJChcIi5wb2ludC1yYW1wLWNvbG9yXCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwidmFsdWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcIm5hbWVcIixcclxuICAgIHRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJrLXN0YXRlLWRlZmF1bHRcIiBzdHlsZT1cImhlaWdodDogMTJweDsgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2NvbG9yX3JhbXAvY29sb3IjOmRhdGEubmFtZSMucG5nKVwiPjwvc3Bhbj4nLFxyXG4gICAgdmFsdWVUZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwic2VsZWN0ZWQtdmFsdWVcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9jb2xvcl9yYW1wL2NvbG9yIzpkYXRhLm5hbWUjLnBuZylcIj48L3NwYW4+JyxcclxuICAgIGhlaWdodDogMjAwLFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICBmaWVsZENvbG9yc0NoYW5nZWQoKTtcclxuICAgICAgaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKTtcclxuXHJcbiAgICAgIHJlbmRlcigpO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgJChcIi5oZWF0bWFwLXJhbXAtY29sb3JcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwibmFtZVwiLFxyXG4gICAgdGVtcGxhdGU6ICc8c3BhbiBjbGFzcz1cImstc3RhdGUtZGVmYXVsdFwiIHN0eWxlPVwiaGVpZ2h0OiAxMnB4OyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvaGVhdG1hcF9yYW1wL2NvbG9yIzpkYXRhLm5hbWUjLnBuZylcIj48L3NwYW4+JyxcclxuICAgIHZhbHVlVGVtcGxhdGU6ICc8c3BhbiBjbGFzcz1cInNlbGVjdGVkLXZhbHVlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvaGVhdG1hcF9yYW1wL2NvbG9yIzpkYXRhLm5hbWUjLnBuZylcIj48L3NwYW4+JyxcclxuICAgIGhlaWdodDogMjAwLFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICBmaWVsZENvbG9yc0NoYW5nZWQoKTtcclxuICAgICAgaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKTtcclxuXHJcbiAgICAgIHJlbmRlcigpO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgJChcIi5saW5lLXJhbXAtY29sb3JcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwibmFtZVwiLFxyXG4gICAgdGVtcGxhdGU6ICc8c3BhbiBjbGFzcz1cImstc3RhdGUtZGVmYXVsdFwiIHN0eWxlPVwiaGVpZ2h0OiAxMnB4OyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvY29sb3JfcmFtcC9jb2xvciM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICB2YWx1ZVRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJzZWxlY3RlZC12YWx1ZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2NvbG9yX3JhbXAvY29sb3IjOmRhdGEubmFtZSMucG5nKVwiPjwvc3Bhbj4nLFxyXG4gICAgaGVpZ2h0OiAyMDAsXHJcblxyXG4gICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZpZWxkQ29sb3JzQ2hhbmdlZCgpO1xyXG4gICAgICBpbml0RmllbGRDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgcmVuZGVyKCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAkKFwiLnBvbHlnb24tcmFtcC1jb2xvclwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICBkYXRhVGV4dEZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJuYW1lXCIsXHJcbiAgICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwiay1zdGF0ZS1kZWZhdWx0XCIgc3R5bGU9XCJoZWlnaHQ6IDEycHg7IGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9jb2xvcl9yYW1wL2NvbG9yIzpkYXRhLm5hbWUjLnBuZylcIj48L3NwYW4+JyxcclxuICAgIHZhbHVlVGVtcGxhdGU6ICc8c3BhbiBjbGFzcz1cInNlbGVjdGVkLXZhbHVlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvY29sb3JfcmFtcC9jb2xvciM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICBoZWlnaHQ6IDIwMCxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZmllbGRDb2xvcnNDaGFuZ2VkKCk7XHJcbiAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICByZW5kZXIoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIC8vIOS4k+mimOWtl+auteWIl+ihqFxyXG4gICQoXCIuc3BlY2lhbC1maWVsZC1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgIGhlaWdodDogMTQwLFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICBmaWVsZENvbG9yc0NoYW5nZWQoKTtcclxuICAgICAgaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKTtcclxuXHJcbiAgICAgIHJlbmRlcigpO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgLy8g5YiG5q615pa55rOVXHJcbiAgJChcIi5zdWItc2VjdGlvbi1tZXRob2QtbGlzdFwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICBkYXRhVGV4dEZpZWxkOiBcIm5hbWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICBoZWlnaHQ6IDE0MCxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZmllbGRDb2xvcnNDaGFuZ2VkKCk7XHJcbiAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICByZW5kZXIoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIC8vIOWIhuauteS4quaVsFxyXG4gICQoXCIuc3ViLXNlY3Rpb24tY291bnQtbGlzdFwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICBkYXRhVGV4dEZpZWxkOiBcIm5hbWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICBoZWlnaHQ6IDE0MCxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZmllbGRDb2xvcnNDaGFuZ2VkKCk7XHJcbiAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICByZW5kZXIoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIC8vIOagh+etvuaWueWQkVxyXG4gICQoXCIubGFiZWwtZGlyZWN0aW9uLWxpc3RcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJuYW1lXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgaGVpZ2h0OiAxNDAsXHJcblxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIOagh+etvuWBj+enu1xyXG4gICQoXCIubGFiZWwtb2Zmc2V0LXNpbGRlclwiKS5rZW5kb1NsaWRlcih7XHJcbiAgICBtaW46IDAsXHJcbiAgICBtYXg6IDQwLFxyXG4gICAgc21hbGxTdGVwOiAxLFxyXG4gICAgbGFyZ2VTdGVwOiAxLFxyXG4gICAgc2hvd0J1dHRvbnM6IGZhbHNlLFxyXG4gICAgdGlwczogZmFsc2UsXHJcblxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSkuZGF0YShcImtlbmRvU2xpZGVyXCIpO1xyXG5cclxuICAvLyDmoIfnrb7lrZfkvZPliJfooahcclxuICAkKFwiLmxhYmVsLWZpZWxkLWxpc3RcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJuYW1lXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgaGVpZ2h0OiAxNDAsXHJcblxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIOadg+mHjeWtl+auteWIl+ihqFxyXG4gICQoXCIud2VpZ2h0LWZpZWxkLWxpc3RcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJuYW1lXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgaGVpZ2h0OiAxNDAsXHJcblxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIOagh+etvuWtl+auteWIl+ihqFxyXG4gICQoXCIubGFiZWwtZm9udC1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgIGhlaWdodDogMTQwLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pO1xyXG5cclxuICAvLyDov4fmu6TmnaHku7bovpPlhaXmoYZcclxuICBsZXQgZHZfaW5wdXQgPSAkKFwiLmR2LWlucHV0XCIpLmtlbmRvTWFza2VkVGV4dEJveCh7XHJcbiAgICBjaGFuZ2U6IHJlbmRlcixcclxuICB9KS5kYXRhKFwia2VuZG9NYXNrZWRUZXh0Qm94XCIpO1xyXG5cclxuICAvLyDlk43lupRlbnRlcuS6i+S7tlxyXG4gICQoXCJbZGF0YS1yb2xlPW1hc2tlZHRleHRib3hdXCIpLm9uKFwia2V5ZG93blwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHtcclxuICAgICAgZHZfaW5wdXQudHJpZ2dlcignY2hhbmdlJywge2RhdGE6ICQodGhpcykudmFsKCl9KTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gcmVuZGVyKCkge1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgbGV0IHJlbmRlclR5cGUgPSBsYXllci5nZXRSZW5kZXJUeXBlKCk7XHJcbiAgbGV0IHJlbmRlck1vZGVsID0gYnVpbGRQcm9qZWN0LmdldEluZm8oJ3JlbmRlcl9tb2RlbCcpO1xyXG4gIGxldCBvcHRpb25zID0gcmVuZGVyTW9kZWwuc3R5bGVPcHRpb25zO1xyXG4gIGxldCByZW5kZXIgPSBsYXllci5yZW5kZXIuZ2V0KHJlbmRlclR5cGUpO1xyXG5cclxuICBpZiAocmVuZGVyTW9kZWwucG9pbnRTaXplKSB7XHJcbiAgICAvLyDngrnmlbDmja5cclxuICAgIG9wdGlvbnMudmVjdG9ySW5mby5maWxsT3BhY2l0eSA9IHJlbmRlck1vZGVsLnBvaW50T3BhY2l0eSAvIDEwMDtcclxuICAgIG9wdGlvbnMudmVjdG9ySW5mby5zdHJva2VPcGFjaXR5ID0gcmVuZGVyTW9kZWwubGluZU9wYWNpdHkgLyAxMDA7XHJcblxyXG4gICAgaWYgKG9wdGlvbnMucG9pbnRTeW1ib2xUeXBlID09PSBcInZlY3RvclwiKSB7XHJcbiAgICAgIG9wdGlvbnMudmVjdG9ySW5mby5mb250U2l6ZSA9IHJlbmRlck1vZGVsLnBvaW50U2l6ZSArIFwicHhcIjtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIG9wdGlvbnMuaW1hZ2VJbmZvLnJhZGl1cyA9IHJlbmRlck1vZGVsLnBvaW50U2l6ZSAvIDEwO1xyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAvLyDnur/jgIHpnaLmlbDmja5cclxuICAgIG9wdGlvbnMuZmlsbE9wYWNpdHkgPSByZW5kZXJNb2RlbC5maWxsT3BhY2l0eSAvIDEwMDtcclxuICAgIG9wdGlvbnMubGluZU9wYWNpdHkgPSByZW5kZXJNb2RlbC5saW5lT3BhY2l0eSAvIDEwMDtcclxuICB9XHJcblxyXG4gIC8vIOeJueauiuWkhOeQhmdyYWRpZW50XHJcbiAgaWYgKG9wdGlvbnMucmVuZGVyVHlwZSA9PT0gXCJoZWF0bWFwXCIpIHtcclxuICAgIG9wdGlvbnMuZ3JhZGllbnQgPSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmhlYXRtYXBDb2xvclJhbXBbb3B0aW9ucy5jb2xvckluZGV4XTtcclxuICB9XHJcblxyXG4gIHJlbmRlci5zZXRPcHRpb25zKG9wdGlvbnMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBmaWVsZENvbG9yc0NoYW5nZWQoKSB7XHJcbiAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICBsZXQgbGF5ZXIgPSBidWlsZFByb2plY3Quc2V0dGluZy5sYXllcjsgLy8g5b2T5YmN5r+A5rS755qEbGF5ZXJcclxuICBsZXQgcmVuZGVyTW9kZWwgPSBidWlsZFByb2plY3QuZ2V0SW5mbygncmVuZGVyX21vZGVsJyk7XHJcbiAgcmVmcmVzaFRoZW1hdGljQ29sb3JzKGxheWVyLCByZW5kZXJNb2RlbC5zdHlsZU9wdGlvbnMpO1xyXG59XHJcblxyXG5mdW5jdGlvbiByZWZyZXNoVGhlbWF0aWNDb2xvcnMobGF5ZXIsIG9wdGlvbnMpIHtcclxuICBsZXQgcmVuZGVyVHlwZSA9IGxheWVyLmdldFJlbmRlclR5cGUoKTtcclxuICBsZXQgcmVuZGVyID0gbGF5ZXIucmVuZGVyLmdldChyZW5kZXJUeXBlKTtcclxuICBsZXQgc3R5bGVPcHRpb24gPSBvcHRpb25zO1xyXG4gIGxldCByZW5kZXJPcHRpb24gPSByZW5kZXIub3B0aW9ucztcclxuXHJcbiAgaWYgKGxheWVyLm9wdGlvbnMuZmVhdHVyZVR5cGUgPT09IFwicG9pbnRcIikge1xyXG4gICAgc3R5bGVPcHRpb24gPSBzdHlsZU9wdGlvbi52ZWN0b3JJbmZvO1xyXG4gICAgcmVuZGVyT3B0aW9uID0gcmVuZGVyT3B0aW9uLnZlY3RvckluZm87XHJcbiAgfVxyXG5cclxuICBpZiAocmVuZGVyVHlwZSA9PSBcInNpbmdsZVwiKSB7XHJcbiAgICBzdHlsZU9wdGlvbi50aGVtYXRpY0NvbG9ycyA9IEtRLkJ1aWxkZXIuUmVuZGVyU2hhcGUuZ2V0VGhlbWF0aWNGaWVsZENvbG9yc1NpbmdsZShyZW5kZXIuZ2V0R2VvanNvbk9iamVjdCgpLCBzdHlsZU9wdGlvbi50aGVtYXRpY0ZpZWxkLCBzdHlsZU9wdGlvbi5jb2xvckluZGV4KTtcclxuICAgIHJlbmRlck9wdGlvbi50aGVtYXRpY0NvbG9ycyA9IHN0eWxlT3B0aW9uLnRoZW1hdGljQ29sb3JzO1xyXG4gIH0gZWxzZSBpZiAocmVuZGVyVHlwZSA9PSBcInNlY3Rpb25cIikge1xyXG4gICAgc3R5bGVPcHRpb24udGhlbWF0aWNDb2xvcnMgPSBLUS5CdWlsZGVyLlJlbmRlclNoYXBlLmdldFRoZW1hdGljRmllbGRDb2xvcnNTZWN0aW9uKHJlbmRlci5nZXRHZW9qc29uT2JqZWN0KCksIHN0eWxlT3B0aW9uLnRoZW1hdGljRmllbGQsXHJcbiAgICAgIHN0eWxlT3B0aW9uLmNvbG9ySW5kZXgsIHN0eWxlT3B0aW9uLnNlY3Rpb25NZXRob2QsIHN0eWxlT3B0aW9uLnNlY3Rpb25Db3VudCk7XHJcbiAgICByZW5kZXJPcHRpb24udGhlbWF0aWNDb2xvcnMgPSBzdHlsZU9wdGlvbi50aGVtYXRpY0NvbG9ycztcclxuICB9IGVsc2UgaWYgKHJlbmRlclR5cGUgPT0gXCJoZWF0bWFwXCIpIHtcclxuICAgIG9wdGlvbnMuZ3JhZGllbnQgPSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmhlYXRtYXBDb2xvclJhbXBbb3B0aW9ucy5jb2xvckluZGV4XVxyXG4gIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKmRvbXMgaW5pdCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZnVuY3Rpb24gaW5pdENvbW1vblVpcygpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlZGl0b3ItY29tbW9uLXVpc1wiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBlZGl0b3JfY29tbW9uX3VpcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBlZGl0b3JfY29tbW9uX3Vpcy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPui/h+a7pOaYvuekujwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImR2LWlucHV0XCIgcGxhY2Vob2xkZXI9XCJmZWF0dXJlSUQgPCAxMDAwXCIgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy5maWx0ZXJcIi8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuagh+etvuWtl+autTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJsYWJlbC1maWVsZC1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiBsYWJlbEZpZWxkRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLmxhYmVsRmllbGRcIj48L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sIGxhYmxlLXN0eWxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7moIfnrb7popzoibI8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjb2xvcnMtcGlja2VyLWlucHV0XCIgZGF0YS1yb2xlPVwiY29sb3JwaWNrZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLmxhYmVsQ29sb3JcIi8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuagh+etvuWtl+S9kzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJsYWJlbC1mb250LWxpc3RcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IGxhYmVsRm9udERyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy5sYWJlbEZvbnROYW1lXCI+IDwvc2VsZWN0PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGVkaXRvcl9jb21tb25fdWlzKTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueespuWPt1xyXG5mdW5jdGlvbiBpbml0U3ltYm9sVHlwZUNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzeW1ib2wtdHlwZS1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuespuWPt+exu+WeizwvZGl2PlxyXG4gICAgICAgICAgPHVsIGNsYXNzPVwicG9pbnQtc3ltYm9sLXR5cGVcIj5cclxuICAgICAgICAgICAgPGxpIGNsYXNzPVwicG9pbnQtc3ltYm9sIHBvaW50LXN5bWJvbC1zdmdcIj7nn6Lph488L2xpPlxyXG4gICAgICAgICAgICA8bGkgY2xhc3M9XCJwb2ludC1zeW1ib2wgcG9pbnQtc3ltYm9sLWltZ1wiPuWbvueJhzwvbGk+XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgIGxldCBzeW1ib2xUeXBlR3JvdXBCdXR0b24gPSAkKFwiLnBvaW50LXN5bWJvbC10eXBlXCIpLmtlbmRvTW9iaWxlQnV0dG9uR3JvdXAoe1xyXG4gICAgICBpbmRleDogMCxcclxuICAgIH0pLmRhdGEoXCJrZW5kb01vYmlsZUJ1dHRvbkdyb3VwXCIpO1xyXG4gICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgIGJ1aWxkUHJvamVjdC5zeW1ib2xUeXBlR3JvdXBCdXR0b24gPSBzeW1ib2xUeXBlR3JvdXBCdXR0b247XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmoLflvI9cclxuZnVuY3Rpb24gaW5pdFBvaW50U3l0bGVDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtc3R5bGUtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7ngrnmoLflvI88L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZWZhdWx0LXBvaW50LWljb25cIj5cclxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uZm9udFwiIGRhdGEtYmluZD1cImh0bWw6IHN0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLnVuaWNvZGVcIj48L2Rpdj5cclxuICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJpY29uLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiBkYXRhLWJpbmQ9XCJzdHlsZTogeyBiYWNrZ3JvdW5kSW1hZ2U6ICBzdHlsZU9wdGlvbnMuaW1hZ2VJbmZvLnVybCB9XCI+PC9kaXY+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW1ib2xzLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bWJvbHMtYm94XCI+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgJChjb250YWluZXJzW2ldKS5maW5kKFwiLmRlZmF1bHQtcG9pbnQtaWNvbiBkaXZcIikuZXEoMCkuYmluZCh7XHJcbiAgICAgIC8vIOiuvue9ruWtl+S9k+Wbvuagh+WPmOWMlueahOWTjeW6lOWHveaVsFxyXG4gICAgICAnaWNvbl9zZWxlY3RlZCc6IGZ1bmN0aW9uIChlLCBkYXRhKSB7ICAgICAvLyDorr7nva7lrZfkvZPlm77moIflj5jljJbnmoTlk43lupTlh73mlbBcclxuICAgICAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCByZW5kZXJNb2RlbCA9IGJ1aWxkUHJvamVjdC5nZXRJbmZvKCdyZW5kZXJfbW9kZWwnKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHJlbmRlck1vZGVsLnN0eWxlT3B0aW9ucztcclxuXHJcbiAgICAgICAgb3B0aW9ucy52ZWN0b3JJbmZvLnVuaWNvZGUgPSBkYXRhO1xyXG4gICAgICAgICQodGhpcykuaHRtbChkYXRhKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIikuc2libGluZ3MoKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnc3ltYm9sX3R5cGVfdmVjdG9yJzogZnVuY3Rpb24gKCkgeyAgICAgIC8vIOespuWPt+exu+Wei+aUueWPmFxyXG4gICAgICAgICQodGhpcykuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpLnNpYmxpbmdzKCkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG5cclxuICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5kZWZhdWx0LXBvaW50LWljb24gZGl2XCIpLmVxKDEpLmJpbmQoe1xyXG4gICAgICAnaWNvbl9zZWxlY3RlZCc6IGZ1bmN0aW9uIChlLCBkYXRhKSB7ICAgIC8vIOiuvue9ruWtl+S9k+Wbvuagh+WPmOWMlueahOWTjeW6lOWHveaVsFxyXG4gICAgICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IHJlbmRlck1vZGVsID0gYnVpbGRQcm9qZWN0LmdldEluZm8oJ3JlbmRlcl9tb2RlbCcpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gcmVuZGVyTW9kZWwuc3R5bGVPcHRpb25zO1xyXG5cclxuICAgICAgICBvcHRpb25zLmltYWdlSW5mby51cmwgPSBcInVybCguL2ltYWdlcy9wb2ludF9pbWFnZXMvSU1BR0VcIiArIGRhdGEucm93ICsgXCItXCIgKyBkYXRhLmNvbCArIFwiLnBuZylcIjtcclxuICAgICAgICAkKHRoaXMpLmNzcyhcImJhY2tncm91bmQtaW1hZ2VcIiwgb3B0aW9ucy5pbWFnZUluZm8udXJsKTtcclxuXHJcbiAgICAgICAgJCh0aGlzKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIikuc2libGluZ3MoKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuXHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgIH0sXHJcblxyXG4gICAgICAnc3ltYm9sX3R5cGVfaW1hZ2UnOiBmdW5jdGlvbiAoKSB7ICAgIC8vIOespuWPt+exu+Wei+aUueWPmFxyXG4gICAgICAgICQodGhpcykuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpLnNpYmxpbmdzKCkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgLy8g54K55Ye754K55qC35byP5oyJ6ZKuIOaYvuekuueCueagt+W8j+mdouadv1xyXG4gICQoXCIuZGVmYXVsdC1wb2ludC1pY29uXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQodGhpcykubmV4dCgpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICB9KTtcclxuXHJcbiAgLy8g54K55Ye75YW25LuW5L2N572uIOmakOiXj+eCueagt+W8j+mdouadv1xyXG4gICQoXCJib2R5XCIpLmNsaWNrKGZ1bmN0aW9uIChlKSB7XHJcbiAgICBsZXQgJHBhcmVudCA9ICQoZS50YXJnZXQpLnBhcmVudCgpO1xyXG4gICAgaWYgKCEkcGFyZW50Lmhhc0NsYXNzKFwiZGVmYXVsdC1wb2ludC1pY29uXCIpKSB7XHJcbiAgICAgICQoXCIuc3ltYm9scy1jb250YWluZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG5cclxuLy8g5aGr5YWF54K556ym5Y+3IHN2Z+eahOespuWPt+mdouadv1xyXG5mdW5jdGlvbiBmaWxsU3ZnU3ltYm9scygpIHtcclxuICAvLyDpppblhYjmuIXnqbrpnaLmnb9cclxuICAkKFwiLnN5bWJvbHMtYm94XCIpLmVtcHR5KCk7XHJcblxyXG4gIGxldCBpY29uc191bmljb2RlID0gW1xyXG4gICAgXCImI3hlNjE0XCIsIFwiJiN4ZTZlM1wiLCBcIiYjeGU2YWRcIiwgXCImI3hlNjI5XCIsIFwiJiN4ZTYxM1wiLCBcIiYjeGU2NmJcIixcclxuICAgIFwiJiN4ZTY1YVwiLCBcIiYjeGU3NWZcIiwgXCImI3hlNjU2XCIsIFwiJiN4ZTY3OVwiLCBcIiYjeGU2NTdcIiwgXCImI3hlNjUyXCIsXHJcbiAgICBcIiYjeGU2MTVcIiwgXCImI3hlNjdlXCIsIFwiJiN4ZTYyMFwiLCBcIiYjeGU3ZGZcIiwgXCImI3hlNjY3XCIsIFwiJiN4ZTY2NlwiLFxyXG4gICAgXCImI3hlNjQyXCIsIFwiJiN4ZTY0MFwiLCBcIiYjeGU2MjhcIiwgXCImI3hlNjdiXCIsIFwiJiN4ZWFjOVwiLCBcIiYjeGU2M2ZcIixcclxuICAgIFwiJiN4ZTYxYVwiLCBcIiYjeGU2NGRcIiwgXCImI3hlNjI2XCIsIFwiJiN4ZTZjYlwiLCBcIiYjeGU2YjVcIiwgXCImI3hlNjg5XCIsXHJcbiAgICBcIiYjeGU2ZjZcIiwgXCImI3hlNzFjXCIsIFwiJiN4ZTY0NlwiLCBcIiYjeGU2YzdcIiwgXCImI3hlNjcxXCIsIFwiJiN4ZTY2ZlwiLFxyXG4gICAgXCImI3hlNjQxXCIsIFwiJiN4ZTYzZVwiLCBcIiYjeGU2M2FcIiwgXCImI3hlNjc2XCIsIFwiJiN4ZTczOVwiLCBcIiYjeGU2NTFcIixcclxuICAgIFwiJiN4ZTY2M1wiLCBcIiYjeGU2N2FcIiwgXCImI3hlNjc3XCIsIFwiJiN4ZTYxMlwiLCBcIiYjeGU4MWZcIiwgXCImI3hlNjVjXCIsXHJcbiAgICBcIiYjeGU2NjRcIiwgXCImI3hlNjY1XCIsIFwiJiN4ZTYxZlwiLCBcIiYjeGU2MjNcIiwgXCImI3hlNjI0XCIsIFwiJiN4ZTYyYVwiLFxyXG4gICAgXCImI3hlNjJiXCIsIFwiJiN4ZTYxMVwiLCBcIiYjeGU2NmRcIiwgXCImI3hlNjYwXCIsIFwiJiN4ZTY0Y1wiLCBcIiYjeGU2MzBcIixcclxuICBdXHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7ICsraSkge1xyXG4gICAgbGV0ICRyb3cgPSAkKCc8ZGl2IGNsYXNzPVwic3ltYm9sLXJvd1wiPjwvZGl2PicpO1xyXG5cclxuICAgIGZvciAobGV0IGogPSAwOyBqIDwgNjsgKytqKSB7XHJcbiAgICAgIGxldCAkY29sdW1uID0gJCgnPGRpdiBjbGFzcz1cImljb25mb250XCI+PC9kaXY+Jyk7XHJcbiAgICAgICRjb2x1bW4uaHRtbChpY29uc191bmljb2RlW2kgKiA2ICsgal0pO1xyXG5cclxuICAgICAgJGNvbHVtbi5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KFwiLmVkaXRvci10b29sXCIpLmZpbmQoXCIuZGVmYXVsdC1wb2ludC1pY29uIGRpdlwiKS5lcSgwKS50cmlnZ2VyKCdpY29uX3NlbGVjdGVkJywgaWNvbnNfdW5pY29kZVtpICogNiArIGpdKTtcclxuICAgICAgfSlcclxuXHJcbiAgICAgICRyb3cuYXBwZW5kKCRjb2x1bW4pO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIuc3ltYm9scy1ib3hcIikuYXBwZW5kKCRyb3cpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g5aGr5YWF54K556ym5Y+3IGltYWdl55qE56ym5Y+36Z2i5p2/XHJcbmZ1bmN0aW9uIGZpbGxJbWFnZVN5bWJvbHMoKSB7XHJcbiAgLy8g6aaW5YWI5riF56m66Z2i5p2/XHJcbiAgJChcIi5zeW1ib2xzLWJveFwiKS5lbXB0eSgpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDsgKytpKSB7XHJcbiAgICBsZXQgJHJvdyA9ICQoJzxkaXYgY2xhc3M9XCJzeW1ib2wtcm93XCI+PC9kaXY+Jyk7XHJcblxyXG4gICAgZm9yIChsZXQgaiA9IDE7IGogPD0gNjsgKytqKSB7XHJcbiAgICAgIGxldCBzdHlsZSA9IFwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL3BvaW50X2ltYWdlcy9JTUFHRVwiICsgaSArIFwiLVwiICsgaiArIFwiLnBuZyk7XCI7XHJcbiAgICAgIGxldCAkY29sdW1uID0gJCgnPGRpdiBjbGFzcz1cInBvaW50LWltZ1wiID48ZGl2IHN0eWxlPVwiJyArIHN0eWxlICsgJ1wiPjwvZGl2PjwvZGl2PicpO1xyXG5cclxuICAgICAgJGNvbHVtbi5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5jbG9zZXN0KFwiLmVkaXRvci10b29sXCIpLmZpbmQoXCIuZGVmYXVsdC1wb2ludC1pY29uIGRpdlwiKS5lcSgxKS50cmlnZ2VyKCdpY29uX3NlbGVjdGVkJywge1xyXG4gICAgICAgICAgcm93OiBpLFxyXG4gICAgICAgICAgY29sOiBqXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAkcm93LmFwcGVuZCgkY29sdW1uKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiLnN5bWJvbHMtYm94XCIpLmFwcGVuZCgkcm93KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueminOiJslxyXG5mdW5jdGlvbiBpbml0UG9pbnRDb2xvckNvbnRhaW5lcigpIHtcclxuICBsZXQgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1jb2xvci1jb250YWluZXJcIik7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7ngrnpopzoibI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9ycy1waWNrZXItaW5wdXRcIiBkYXRhLXJvbGU9XCJjb2xvcnBpY2tlclwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby5maWxsQ29sb3JcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54K56Imy5Z2XXHJcbmZ1bmN0aW9uIGluaXRQb2ludFJhbXBDb2xvckNvbnRhaW5lcigpIHtcclxuICBsZXQgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1yYW1wLWNvbG9yLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPueCueminOiJsjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwicG9pbnQtcmFtcC1jb2xvclwiIGRhdGEtYmluZD1cInNvdXJjZTogcmFtcENvbG9yRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLnZlY3RvckluZm8uY29sb3JJbmRleFwiLz5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54Ot5Yqb5Zu+IOiJsuWdl1xyXG5mdW5jdGlvbiBpbml0SGVhdG1hcFJhbXBDb2xvckNvbnRhaW5lcigpIHtcclxuICBsZXQgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoZWF0bWFwLXJhbXAtY29sb3ItY29udGFpbmVyXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+54Ot54K56aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJoZWF0bWFwLXJhbXAtY29sb3JcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IGhlYXRtYXBSYW1wQ29sb3JEcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMuY29sb3JJbmRleFwiLz5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54Ot5Yqb5Zu+IOadg+mHjeWtl+autVxyXG5mdW5jdGlvbiBpbml0SGVhdG1hcFdlaWdodEZpZWxkQ29udGFpbmVyKCkge1xyXG4gIGxldCBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhlYXRtYXAtd2VpZ2h0LWZpZWxkLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5p2D6YeN5a2X5q61PC9kaXY+XHJcbiAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJ3ZWlnaHQtZmllbGQtbGlzdFwiIGRhdGEtYmluZD1cInNvdXJjZTogd2VpZ2h0RmllbGREcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMud2VpZ2h0RmllbGRcIj48L3NlbGVjdD5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54Ot5Yqb5Zu+IOi/h+a7pOaYvuekulxyXG5mdW5jdGlvbiBpbml0SGVhdG1hcEZpbHRlckNvbnRhaW5lcigpIHtcclxuICBsZXQgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoZWF0bWFwLWZpbHRlci1jb250YWluZXJcIik7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPui/h+a7pOaYvuekujwvZGl2PlxyXG4gICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJkdi1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiZmVhdHVyZUlEIDwgMTAwMFwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMuZmlsdGVyXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnlpKflsI9cclxuZnVuY3Rpb24gaW5pdFBvaW50U2l6ZUNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1zaXplLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPueCueWkp+WwjzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInBvaW50LXNpemUtc2lsZGVyXCIgZGF0YS1iaW5kPVwidmFsdWU6IHBvaW50U2l6ZVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImJvcmRlcjogbm9uZTtcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogcG9pbnRTaXplXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5cGU9XCJwYWRkaW5nLXJpZ2h0OiA1cHg7XCI+cHg8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnkuI3pgI/mmI7luqZcclxuZnVuY3Rpb24gaW5pdFBvaW50T3BhY2l0eUNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1vcGFjaXR5LWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPueCueS4jemAj+aYjuW6pjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIm9wYWNpdHktc2xpZGVyXCIgZGF0YS1iaW5kPVwidmFsdWU6IHBvaW50T3BhY2l0eVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImJvcmRlcjogbm9uZTtcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogcG9pbnRPcGFjaXR5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5cGU9XCJwYWRkaW5nLXJpZ2h0OiA1cHg7XCI+JTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54K55pWw5o2u55qEIOe6v+minOiJslxyXG5mdW5jdGlvbiBpbml0UG9pbnRMaW5lQ29sb3JDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtbGluZS1jb2xvci1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nur/popzoibI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9ycy1waWNrZXItaW5wdXRcIiBkYXRhLXJvbGU9XCJjb2xvcnBpY2tlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLnN0cm9rZUNvbG9yXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueaVsOaNrueahCDnur/lrr3luqZcclxuZnVuY3Rpb24gaW5pdFBvaW50TGluZVdpZHRoQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LWxpbmUtd2lkdGgtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+57q/5a695bqmPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwibGluZS13aWR0aC1zaWxkZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLnZlY3RvckluZm8uc3Ryb2tlV2lkdGhcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9XCJib3JkZXI6IG5vbmU7XCIgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLnN0cm9rZVdpZHRoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5cGU9XCJwYWRkaW5nLXJpZ2h0OiA1cHg7XCI+cHg8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja7nmoQg57q/5LiN6YCP5piO5bqmXHJcbmZ1bmN0aW9uIGluaXRQb2ludExpbmVPcGFjaXR5Q29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LWxpbmUtb3BhY2l0eS1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nur/kuI3pgI/mmI7luqY8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJvcGFjaXR5LXNsaWRlclwiIGRhdGEtYmluZD1cInZhbHVlOiBsaW5lT3BhY2l0eVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImJvcmRlcjogbm9uZTtcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogbGluZU9wYWNpdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj4lPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja7nmoTkuJPpopjlrZfmrrVcclxuZnVuY3Rpb24gaW5pdFBvaW50U3BlY2lhbEZpZWxkQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LXNwZWNpYWwtZmllbGQtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuS4k+mimOWtl+autTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInNwZWNpYWwtZmllbGQtbGlzdFwiIGRhdGEtYmluZD1cInNvdXJjZTogc3BlY2lhbEZpZWxkRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLnZlY3RvckluZm8udGhlbWF0aWNGaWVsZFwiLz5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja7nmoTliIbmrrXmlrnms5VcclxuZnVuY3Rpb24gaW5pdFBvaW50U3Vic2VjdGlvblR5cGVDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtc3Vic2VjdGlvbi10eXBlLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sIGxhYmxlLXNlbGVjdFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7liIbmrrXmlrnms5U8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJzdWItc2VjdGlvbi1tZXRob2QtbGlzdFwiIGRhdGEtYmluZD1cInNvdXJjZTogc3Vic2VjdGlvblR5cGVEcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby5zZWN0aW9uTWV0aG9kXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeDreWKm+WbvueahOeDreeCueWNiuW+hFxyXG5mdW5jdGlvbiBpbml0SGVhdG1hcFJhZGl1c0NvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoZWF0bWFwLXJhZGl1cy1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7ng63ngrnljYrlvoQ8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJoZWF0bWFwLXJhZGl1cy1zaWxkZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLnJhZGl1c1wiLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImJvcmRlcjogbm9uZTtcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLnJhZGl1c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eXBlPVwicGFkZGluZy1yaWdodDogNXB4O1wiPnB4PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54K55pWw5o2u55qE5YiG5q615Liq5pWwXHJcbmZ1bmN0aW9uIGluaXRQb2ludFN1YnNlY3Rpb25OdW1iZXJDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtc3Vic2VjdGlvbi1udW1iZXItY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuWIhuauteS4quaVsDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInN1Yi1zZWN0aW9uLWNvdW50LWxpc3RcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IHN1YnNlY3Rpb25OdW1iZXJEcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby5zZWN0aW9uQ291bnRcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja4g5qCH562+5L2N572uXHJcbmZ1bmN0aW9uIGluaXRMYWJlbERpcmVjdGlvbkNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsYWJlbC1kaXJlY3Rpb24tY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuagh+etvuS9jee9rjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cImxhYmVsLWRpcmVjdGlvbi1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiBsYWJlbERpcmVjdGlvbkRyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy5sYWJlbFBvc2l0aW9uXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54K55pWw5o2uIOagh+etvuWBj+enu1xyXG5mdW5jdGlvbiBpbml0TGFiZWxPZmZzZXRDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGFiZWwtb2Zmc2V0LWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sIGxhYmxlLXNlbGVjdFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7moIfnrb7lgY/np7s8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJsYWJlbC1vZmZzZXQtc2lsZGVyXCIgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy5sYWJlbE1hcmtlclBhZGRpbmdcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgc3R5bGU9XCJib3JkZXI6IG5vbmU7XCIgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy5sYWJlbE1hcmtlclBhZGRpbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj5weDwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g57q/6aKc6ImyXHJcbmZ1bmN0aW9uIGluaXRMaW5lQ29sb3JDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGluZS1jb2xvci1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nur/popzoibI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9ycy1waWNrZXItaW5wdXRcIiBkYXRhLXJvbGU9XCJjb2xvcnBpY2tlclwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy5saW5lQ29sb3JcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g57q/5qC35byPXHJcbmZ1bmN0aW9uIGluaXRMaW5lU3R5bGVMaXN0Q29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxpbmUtc3R5bGUtbGlzdC1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nur/moLflvI88L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImxpbmUtc3R5bGUtbGlzdFwiIHN0eWxlPVwid2lkdGg6IDE1MnB4OyBoZWlnaHQ6IDI4cHg7XCJcclxuICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJpbmQ9XCJzb3VyY2U6IGxpbmVTdHlsZURyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy5saW5lU3R5bGVcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g57q/5a695bqmXHJcbmZ1bmN0aW9uIGluaXRMaW5lV2lkdGhDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGluZS13aWR0aC1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nur/lrr3luqY8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJsaW5lLXdpZHRoLXNpbGRlclwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMubGluZVdpZHRoXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMubGluZVdpZHRoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5cGU9XCJwYWRkaW5nLXJpZ2h0OiA1cHg7XCI+cHg8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDnur/kuI3pgI/mmI7luqZcclxuZnVuY3Rpb24gaW5pdExpbmVPcGFjaXR5Q29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxpbmUtb3BhY2l0eS1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nur/kuI3pgI/mmI7luqY8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJvcGFjaXR5LXNsaWRlclwiIGRhdGEtYmluZD1cInZhbHVlOiBsaW5lT3BhY2l0eVwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImJvcmRlcjogbm9uZTtcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogbGluZU9wYWNpdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj4lPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDnur/muJDlj5jpopzoibJcclxuZnVuY3Rpb24gaW5pdExpbmVSYW1wQ29sb3JDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwibGluZS1yYW1wLWNvbG9yLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPue6v+minOiJsjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwibGluZS1yYW1wLWNvbG9yXCJcclxuICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJpbmQ9XCJzb3VyY2U6IGxpbmVSYW1wQ29sb3JEcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMuY29sb3JJbmRleFwiLz5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFNwZWNpYWxGaWVsZENvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzcGVjaWFsLWZpZWxkLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sIGxhYmxlLXNlbGVjdFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7kuJPpopjlrZfmrrU8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJzcGVjaWFsLWZpZWxkLWxpc3RcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IHNwZWNpYWxGaWVsZERyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy50aGVtYXRpY0ZpZWxkXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRTdWJzZWN0aW9uVHlwZUNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJzdWJzZWN0aW9uLXR5cGUtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuWIhuauteaWueazlTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInN1Yi1zZWN0aW9uLW1ldGhvZC1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiBzdWJzZWN0aW9uVHlwZURyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy5zZWN0aW9uTWV0aG9kXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRTdWJzZWN0aW9uTnVtYmVyQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN1YnNlY3Rpb24tbnVtYmVyLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sIGxhYmxlLXNlbGVjdFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7liIbmrrXkuKrmlbA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3M9XCJzdWItc2VjdGlvbi1jb3VudC1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiBzdWJzZWN0aW9uTnVtYmVyRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLnNlY3Rpb25Db3VudFwiLz5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOWIneWni+WMlumdouminOiJslxyXG5mdW5jdGlvbiBpbml0UG9seWdvblJhbXBDb2xvckNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2x5Z29uLXJhbXAtY29sb3ItY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+6Z2i6aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJwb2x5Z29uLXJhbXAtY29sb3JcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IHJhbXBDb2xvckRyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy5jb2xvckluZGV4XCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0UG9seWdvbkNvbG9yQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvbHlnb24tY29sb3ItY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgcG9pbnQtY29sb3JcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+6Z2i6aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjb2xvcnMtcGlja2VyLWlucHV0XCIgZGF0YS1yb2xlPVwiY29sb3JwaWNrZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLmZpbGxDb2xvclwiLz5cclxuICAgICAgICAgICAgPC9kaXY+ICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0UG9seWdvbk9wYWNpdHlDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9seWdvbi1vcGFjaXR5LWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPumdouS4jemAj+aYjuW6pjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIm9wYWNpdHktc2xpZGVyXCIgZGF0YS1iaW5kPVwidmFsdWU6IGZpbGxPcGFjaXR5XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImJvcmRlcjogbm9uZTtcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogZmlsbE9wYWNpdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPHAgc3R5cGU9XCJwYWRkaW5nLXJpZ2h0OiA1cHg7XCI+JTwvcD5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfZ2V0Q29sb3JGaWVsZHNBcnJheShmZWF0dXJlVHlwZSwgcmVuZGVyVHlwZSkge1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgbGV0IHJlbmRlciA9IGxheWVyLnJlbmRlcjtcclxuICBjb25zb2xlLmxvZygncmVuZGVyOiAnLCByZW5kZXIpO1xyXG5cclxuICBpZiAocmVuZGVyVHlwZSA9PT0gXCJzaW5nbGVcIikge1xyXG4gICAgaWYgKGZlYXR1cmVUeXBlID09ICdwb2ludCcpIHtcclxuICAgICAgcmV0dXJuIHJlbmRlci5nZXQoJ3NpbmdsZScpLm9wdGlvbnMudmVjdG9ySW5mby50aGVtYXRpY0NvbG9ycztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiX2luaXRET21zLmpzIDEwNzEsIHRoZW1hdGljQ29sb3JzOiBcIiwgcmVuZGVyLmdldCgnc2luZ2xlJykub3B0aW9ucy50aGVtYXRpY0NvbG9ycyk7XHJcbiAgICAgIHJldHVybiByZW5kZXIuZ2V0KCdzaW5nbGUnKS5vcHRpb25zLnRoZW1hdGljQ29sb3JzO1xyXG4gICAgfVxyXG4gIH0gZWxzZSBpZiAocmVuZGVyVHlwZSA9PT0gXCJzZWN0aW9uXCIpIHtcclxuICAgIGlmIChmZWF0dXJlVHlwZSA9PSAncG9pbnQnKSB7XHJcbiAgICAgIHJldHVybiByZW5kZXIuZ2V0KCdzZWN0aW9uJykub3B0aW9ucy52ZWN0b3JJbmZvLnRoZW1hdGljQ29sb3JzLmNvbG9ycztcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiByZW5kZXIuZ2V0KCdzZWN0aW9uJykub3B0aW9ucy50aGVtYXRpY0NvbG9ycy5jb2xvcnM7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyZW5kZXJUeXBlID09PSBcImhlYXRtYXBcIikge1xyXG4gICAgcmV0dXJuIHJlbmRlci5nZXQoJ2hlYXRtYXAnKS5vcHRpb25zLmdyYWRpZW50O1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX2dldFJhbmdlQXJyYXkoZmVhdHVyZVR5cGUpIHtcclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gIGxldCBsYXllciA9IGJ1aWxkUHJvamVjdC5zZXR0aW5nLmxheWVyOyAvLyDlvZPliY3mv4DmtLvnmoRsYXllclxyXG4gIGxldCByZW5kZXIgPSBsYXllci5yZW5kZXI7XHJcblxyXG4gIGlmIChmZWF0dXJlVHlwZSA9PSAncG9pbnQnKSB7XHJcbiAgICByZXR1cm4gcmVuZGVyLmdldCgnc2VjdGlvbicpLm9wdGlvbnMudmVjdG9ySW5mby50aGVtYXRpY0NvbG9ycy5icmVha3NEYXRhO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gcmVuZGVyLmdldCgnc2VjdGlvbicpLm9wdGlvbnMudGhlbWF0aWNDb2xvcnMuYnJlYWtzRGF0YTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9pbml0RmllbGRDb2xvckNvbnRhaW5lcigpIHtcclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gIGxldCBsYXllciA9IGJ1aWxkUHJvamVjdC5zZXR0aW5nLmxheWVyOyAvLyDlvZPliY3mv4DmtLvnmoRsYXllclxyXG4gIGxldCBmZWF0dXJlVHlwZSA9IGxheWVyLm9wdGlvbnMuZmVhdHVyZVR5cGU7XHJcblxyXG4gIC8vIOagueaNrueCueOAgee6v+OAgemdouadpei/m+ihjOWIkuWIhuWIneWni+WMllxyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShmZWF0dXJlVHlwZSArIFwiIGVkaXRvci1maWVsZHMtY29sb3JcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAvLyDliKTmlq3lvZPliY3oioLngrnmmK/lkKblsZXlvIBcclxuICAgIGxldCBleHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgbGV0ICRzd2l0Y2hOb2RlID0gJChjb250YWluZXJzW2ldKS5maW5kKFwiLmZpZWxkcy1kaXYtc3dpdGNoXCIpO1xyXG4gICAgaWYgKCRzd2l0Y2hOb2RlLmxlbmd0aCAhPSAwICYmICEkc3dpdGNoTm9kZS5oYXNDbGFzcyhcInN0YXRlLWNsb3NlXCIpKSB7XHJcbiAgICAgIGV4cGFuZGVkID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmuIXnqbrvvIzpmLLmraLph43lpI3mt7vliqBcclxuICAgICQoY29udGFpbmVyc1tpXSkuZW1wdHkoKTtcclxuXHJcbiAgICB2YXIgaHRtbCA9IFwiXCI7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIHZhciBzaGFwZUNsYXNzID0gXCJpY29uLXNoYXBlLVwiICsgZmVhdHVyZVR5cGU7XHJcblxyXG4gICAgLy8g5Y2V5YC85riy5p+T5qih5byPXHJcbiAgICBpZiAoY29udGFpbmVyc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzaW5nbGVcIikpIHtcclxuICAgICAgLy8g5re75YqgdGl0bGVcclxuICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cInRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgPHNwYW4+6Ieq5a6a5LmJ5Y2V5YC8PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidW5pcXVlLXNob3dcIj48c3Bhbj7lsZXlvIA8L3NwYW4+PGkgY2xhc3M9XCJmYSBmYS1wbHVzLXNxdWFyZS1vIGZpZWxkcy1kaXYtc3dpdGNoIHN0YXRlLWNsb3NlXCI+PC9pPjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmllbGRzLWNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj5gO1xyXG5cclxuICAgICAgLy8g5b6X5Yiw6aKc6Imy55qE5pWw57uEXHJcbiAgICAgIGxldCBjb2xvckZpZWxkc0FycmF5ID0gX2dldENvbG9yRmllbGRzQXJyYXkoZmVhdHVyZVR5cGUsIFwic2luZ2xlXCIpO1xyXG5cclxuICAgICAgLy8g6YGN5Y6G6aKc6Imy5pWw57uE77yM5re75Yqg5ZCE6KGM5o6n5Lu2XHJcbiAgICAgIGNvbG9yRmllbGRzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJmaWVsZHMtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uIGljb25mb250IGAgKyBzaGFwZUNsYXNzICsgYCBjb2xvcnMtcGlja2VyXCIgc3R5bGU9XCJjb2xvcjogYCArIHZhbHVlICsgYFwiPjxkaXYgY2xhc3M9XCJzaW5nbGUtY29sb3JzLXBpY2tlclwiIHZhbHVlPWAgKyB2YWx1ZSArIGA+PC9kaXY+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPmA7XHJcbiAgICAgICAgaHRtbCArPSBrZXkgKyBgPC9zcGFuPjwvZGl2PmA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaHRtbCArPSBgPC9kaXY+YDtcclxuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWN0aW9uXCIpKSB7XHJcbiAgICAgIC8vIOa3u+WKoHRpdGxlXHJcbiAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgIDxzcGFuPuiHquWumuS5ieWIhuautTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVuaXF1ZS1zaG93XCI+PHNwYW4+5bGV5byAPC9zcGFuPjxpIGNsYXNzPVwiZmEgZmEtcGx1cy1zcXVhcmUtbyBmaWVsZHMtZGl2LXN3aXRjaCBzdGF0ZS1jbG9zZVwiPjwvaT48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkcy1jb250YWluZXJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+YDtcclxuXHJcbiAgICAgIC8vIOW+l+WIsOminOiJsuaVsOe7hOOAgeiMg+WbtOaVsOe7hFxyXG4gICAgICBsZXQgY29sb3JGaWVsZHNBcnJheSA9IF9nZXRDb2xvckZpZWxkc0FycmF5KGZlYXR1cmVUeXBlLCBcInNlY3Rpb25cIik7XHJcbiAgICAgIGxldCByYW5nZUFycmF5ID0gX2dldFJhbmdlQXJyYXkoZmVhdHVyZVR5cGUpO1xyXG5cclxuICAgICAgLy8g6YGN5Y6G6aKc6Imy5pWw57uE77yM5re75Yqg5ZCE6KGM5o6n5Lu2XHJcbiAgICAgIGNvbG9yRmllbGRzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4KSB7XHJcbiAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cImZpZWxkcy1pdGVtXCIgZGF0YS1pbmRleD1gICsgaW5kZXggKyBgID5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImljb24gaWNvbmZvbnQgYCArIHNoYXBlQ2xhc3MgKyBgIGNvbG9ycy1waWNrZXJcIiBzdHlsZT1cImNvbG9yOiBgICsgdmFsdWUgKyBgXCI+PGRpdiBjbGFzcz1cInNlY3Rpb24tY29sb3JzLXBpY2tlclwiIHZhbHVlPWAgKyB2YWx1ZSArIGA+PC9kaXY+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYW5nZS12YWx1ZXNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cIndpZHRoOiAxMDBweFwiIGNsYXNzPVwidmFsdWUtc3RhcnRcIiB2YWx1ZT1gICsgcmFuZ2VBcnJheVtpbmRleF0udG9GaXhlZCgzKSArIGA+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInZhbHVlLWhyXCI+LTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT1cIndpZHRoOiAxMDBweFwiIGNsYXNzPVwidmFsdWUtZW5kXCIgdmFsdWU9YCArIHJhbmdlQXJyYXlbaW5kZXggKyAxXS50b0ZpeGVkKDMpICsgYD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgfSlcclxuXHJcbiAgICAgIGh0bWwgKz0gYDwvZGl2PmA7XHJcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcblxyXG4gICAgICAkKGNvbnRhaW5lcnNbaV0pLmZpbmQoXCIudmFsdWUtc3RhcnRcIikua2VuZG9NYXNrZWRUZXh0Qm94KHt9KTtcclxuICAgICAgJChjb250YWluZXJzW2ldKS5maW5kKFwiLnZhbHVlLWVuZFwiKS5rZW5kb01hc2tlZFRleHRCb3goe30pO1xyXG4gICAgfSBlbHNlIGlmIChjb250YWluZXJzW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImhlYXRtYXBcIikpIHtcclxuICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cImVkaXRvci1maWVsZHMtY29sb3JcIiA+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuPuiHquWumuS5ieminOiJsjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidW5pcXVlLXNob3dcIj48c3Bhbj7lsZXlvIA8L3NwYW4+PGkgY2xhc3M9XCJmYSBmYS1wbHVzLXNxdWFyZS1vIGZpZWxkcy1kaXYtc3dpdGNoIHN0YXRlLWNsb3NlXCI+PC9pPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkcy1jb250YWluZXJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+YDtcclxuICAgICAgbGV0IGNvbG9yRmllbGRzT2JqZWN0ID0gX2dldENvbG9yRmllbGRzQXJyYXkoZmVhdHVyZVR5cGUsIFwiaGVhdG1hcFwiKTtcclxuICAgICAgbGV0IGNvbG9yRmllbGRzQXJyYXkgPSBPYmplY3Qua2V5cyhjb2xvckZpZWxkc09iamVjdCkuc29ydCgpO1xyXG4gICAgICBjb2xvckZpZWxkc0FycmF5LmZvckVhY2goZnVuY3Rpb24gKGtleSwgaW5kZXgpIHtcclxuICAgICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIiBkYXRhLWtleT1gICsga2V5ICsgYD5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7ng63ngrnpopzoibJgICsgKE51bWJlcihpbmRleCkgKyAxKSArIGA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhlYXRtYXAtY29sb3JzLXBpY2tlclwiIGRhdGEtcm9sZT1cImNvbG9ycGlja2VyXCIgdmFsdWU9XCJgICsgY29sb3JGaWVsZHNPYmplY3Rba2V5XSArIGBcIj48L2Rpdj5cclxuICAgICAgICAgICAgICAgICA8L2Rpdj5gO1xyXG4gICAgICB9KVxyXG4gICAgICBodG1sICs9IGA8L2Rpdj5gO1xyXG4gICAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOiHquWumuS5ieWNleWAvOminOiJsuWPmOWMliwgY29sb3JwaWNrZXLpopzoibLlj5jljJblkI7kv67mlLlzcGFu55qEY29sb3JcclxuICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5zaW5nbGUtY29sb3JzLXBpY2tlclwiKS5rZW5kb0NvbG9yUGlja2VyKHtcclxuICAgICAgYnV0dG9uOiBmYWxzZSxcclxuICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCBjb2xvciA9IGUudmFsdWU7XHJcbiAgICAgICAgbGV0IGtleSA9ICQodGhpcylbMF0uZWxlbWVudC5wYXJlbnRzKFwiLmZpZWxkcy1pdGVtXCIpLmZpbmQoXCIudmFsdWVcIikudGV4dCgpO1xyXG4gICAgICAgIGxldCBjbGFzc0xpc3QgPSAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcIi5lZGl0b3ItZmllbGRzLWNvbG9yXCIpWzBdLmNsYXNzTGlzdDtcclxuICAgICAgICBsZXQgZmVhdHVyZVR5cGUgPSBjbGFzc0xpc3RbMV07XHJcbiAgICAgICAgbGV0IHJlbmRlclR5cGUgPSBjbGFzc0xpc3RbMl07XHJcbiAgICAgICAgbGV0IHRoZW1hdGljQ29sb3JzID0gX2dldENvbG9yRmllbGRzQXJyYXkoZmVhdHVyZVR5cGUsIHJlbmRlclR5cGUpO1xyXG5cclxuICAgICAgICAvLyDmlLnlj5jmjqfku7bnmoTpopzoibJcclxuICAgICAgICAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcInNwYW5cIikuY3NzKFwiY29sb3JcIiwgY29sb3IpO1xyXG5cclxuICAgICAgICAvLyDmlLnlj5jkuJPpopjlrZfmrrXnmoTloavlhYXoibLvvIzlubbov5vooYzmuLLmn5NcclxuICAgICAgICBpZiAodGhlbWF0aWNDb2xvcnMuaGFzKGtleSkpIHtcclxuICAgICAgICAgIHRoZW1hdGljQ29sb3JzLnNldChrZXksIGNvbG9yKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHRoZW1hdGljQ29sb3JzLmhhcyhOdW1iZXIoa2V5KSkpIHtcclxuICAgICAgICAgIHRoZW1hdGljQ29sb3JzLnNldChOdW1iZXIoa2V5KSwgY29sb3IpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZW5kZXIoKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOiHquWumuS5ieWIhuauteminOiJsuWPmOWMliwgY29sb3JwaWNrZXLpopzoibLlj5jljJblkI7kv67mlLlzcGFu55qEY29sb3JcclxuICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5zZWN0aW9uLWNvbG9ycy1waWNrZXJcIikua2VuZG9Db2xvclBpY2tlcih7XHJcbiAgICAgIGJ1dHRvbjogZmFsc2UsXHJcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgY29sb3IgPSBlLnZhbHVlO1xyXG4gICAgICAgIGxldCBpbmRleCA9ICQodGhpcylbMF0uZWxlbWVudC5wYXJlbnRzKFwiLmZpZWxkcy1pdGVtXCIpLmF0dHIoXCJkYXRhLWluZGV4XCIpO1xyXG4gICAgICAgIGxldCBjbGFzc0xpc3QgPSAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcIi5lZGl0b3ItZmllbGRzLWNvbG9yXCIpWzBdLmNsYXNzTGlzdDtcclxuICAgICAgICBsZXQgZmVhdHVyZVR5cGUgPSBjbGFzc0xpc3RbMV07XHJcbiAgICAgICAgbGV0IHJlbmRlclR5cGUgPSBjbGFzc0xpc3RbMl07XHJcbiAgICAgICAgbGV0IHRoZW1hdGljQ29sb3JzID0gX2dldENvbG9yRmllbGRzQXJyYXkoZmVhdHVyZVR5cGUsIHJlbmRlclR5cGUpO1xyXG5cclxuICAgICAgICAvLyDmlLnlj5jmjqfku7bnmoTpopzoibJcclxuICAgICAgICAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcInNwYW5cIikuY3NzKFwiY29sb3JcIiwgY29sb3IpO1xyXG5cclxuICAgICAgICAvLyDmlLnlj5jkuJPpopjlrZfmrrXnmoTloavlhYXoibLvvIzlubbov5vooYzmuLLmn5NcclxuICAgICAgICB0aGVtYXRpY0NvbG9yc1tpbmRleF0gPSBjb2xvcjtcclxuICAgICAgICByZW5kZXIoKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOiHquWumuS5ieeDreWKm+WbvuminOiJsuWPmOWMlu+8jCBjb2xvcnBpY2tlcuminOiJsuWPmOWMllxyXG4gICAgJChjb250YWluZXJzW2ldKS5maW5kKFwiLmhlYXRtYXAtY29sb3JzLXBpY2tlclwiKS5rZW5kb0NvbG9yUGlja2VyKHtcclxuICAgICAgYnV0dG9uOiBmYWxzZSxcclxuICAgICAgY2hhbmdlOiBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGxldCBjb2xvciA9IGUudmFsdWU7XHJcbiAgICAgICAgbGV0IGtleSA9ICQodGhpcylbMF0uZWxlbWVudC5wYXJlbnRzKFwiLmVkaXRvci10b29sXCIpLmF0dHIoXCJkYXRhLWtleVwiKTtcclxuXHJcbiAgICAgICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgbGF5ZXIgPSBidWlsZFByb2plY3Quc2V0dGluZy5sYXllcjsgLy8g5b2T5YmN5r+A5rS755qEbGF5ZXJcclxuICAgICAgICBsZXQgcmVuZGVyTW9kZWwgPSBidWlsZFByb2plY3QuZ2V0SW5mbygncmVuZGVyX21vZGVsJyk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSByZW5kZXJNb2RlbC5zdHlsZU9wdGlvbnM7XHJcblxyXG4gICAgICAgIG9wdGlvbnMuZ3JhZGllbnQgPSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmhlYXRtYXBDb2xvclJhbXBbb3B0aW9ucy5jb2xvckluZGV4XTtcclxuICAgICAgICBvcHRpb25zLmdyYWRpZW50W2tleV0gPSBjb2xvcjtcclxuXHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgICAgaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOi1t+Wni+iMg+WbtOWPmOWMllxyXG4gICAgJChjb250YWluZXJzW2ldKS5maW5kKFwiLnZhbHVlLXN0YXJ0IGlucHV0XCIpLmNoYW5nZShmdW5jdGlvbiAoZSkge1xyXG4gICAgICBsZXQgaW5kZXggPSBOdW1iZXIoJCh0aGlzKS5wYXJlbnRzKFwiLmZpZWxkcy1pdGVtXCIpLmF0dHIoXCJkYXRhLWluZGV4XCIpKTtcclxuICAgICAgbGV0IGNsYXNzTGlzdCA9ICQodGhpcykucGFyZW50cyhcIi5lZGl0b3ItZmllbGRzLWNvbG9yXCIpWzBdLmNsYXNzTGlzdDtcclxuICAgICAgbGV0IGZlYXR1cmVUeXBlID0gY2xhc3NMaXN0WzFdO1xyXG4gICAgICBsZXQgcmVuZGVyVHlwZSA9IGNsYXNzTGlzdFsyXTtcclxuICAgICAgbGV0IHJhbmdlQXJyYXkgPSBfZ2V0UmFuZ2VBcnJheShmZWF0dXJlVHlwZSwgcmVuZGVyVHlwZSk7XHJcbiAgICAgIGxldCBtaW5fdmFsdWUgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjtcclxuICAgICAgbGV0IG1heF92YWx1ZSA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG4gICAgICBsZXQgbmV3X3ZhbHVlID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgbGV0ICRwcmV2X25vZGUgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKGluZGV4IC0gMSA+PSAwKSB7XHJcbiAgICAgICAgbWluX3ZhbHVlID0gcmFuZ2VBcnJheVtpbmRleCAtIDFdO1xyXG4gICAgICAgICRwcmV2X25vZGUgPSAkKHRoaXMpLnBhcmVudHMoXCIuZmllbGRzLWl0ZW1cIikucHJldigpLmZpbmQoXCIudmFsdWUtZW5kIGlucHV0XCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaW5kZXggKyAxIDwgcmFuZ2VBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBtYXhfdmFsdWUgPSByYW5nZUFycmF5W2luZGV4ICsgMV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChuZXdfdmFsdWUgPiBtaW5fdmFsdWUgJiYgbmV3X3ZhbHVlIDwgbWF4X3ZhbHVlKSB7XHJcbiAgICAgICAgcmFuZ2VBcnJheVtpbmRleF0gPSBuZXdfdmFsdWU7XHJcblxyXG4gICAgICAgIGlmICgkcHJldl9ub2RlKSB7XHJcbiAgICAgICAgICAkcHJldl9ub2RlLnZhbChuZXdfdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBLUS5Db250cm9sLk5vdGlmaWNhdGlvbi5nZXRJbnN0YW5jZSgpLnNob3dFcnJvcign5pWw5YC86IyD5Zu05LiN5q2j56GuJyk7XHJcbiAgICAgICAgZS50YXJnZXQudmFsdWUgPSByYW5nZUFycmF5W2luZGV4XTtcclxuICAgICAgfVxyXG4gICAgICByZW5kZXIoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIOe7k+adn+iMg+WbtOWPmOWMllxyXG4gICAgJChjb250YWluZXJzW2ldKS5maW5kKFwiLnZhbHVlLWVuZCBpbnB1dFwiKS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgbGV0IGluZGV4ID0gTnVtYmVyKCQodGhpcykucGFyZW50cyhcIi5maWVsZHMtaXRlbVwiKS5hdHRyKFwiZGF0YS1pbmRleFwiKSkgKyAxO1xyXG4gICAgICBsZXQgY2xhc3NMaXN0ID0gJCh0aGlzKS5wYXJlbnRzKFwiLmVkaXRvci1maWVsZHMtY29sb3JcIilbMF0uY2xhc3NMaXN0O1xyXG4gICAgICBsZXQgZmVhdHVyZVR5cGUgPSBjbGFzc0xpc3RbMV07XHJcbiAgICAgIGxldCByZW5kZXJUeXBlID0gY2xhc3NMaXN0WzJdO1xyXG4gICAgICBsZXQgcmFuZ2VBcnJheSA9IF9nZXRSYW5nZUFycmF5KGZlYXR1cmVUeXBlLCByZW5kZXJUeXBlKTtcclxuICAgICAgbGV0IG1pbl92YWx1ZSA9IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSO1xyXG4gICAgICBsZXQgbWF4X3ZhbHVlID0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XHJcbiAgICAgIGxldCBuZXdfdmFsdWUgPSBOdW1iZXIoZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICBsZXQgJG5leHRfbm9kZSA9IG51bGw7XHJcblxyXG4gICAgICBpZiAoaW5kZXggLSAxID49IDApIHtcclxuICAgICAgICBtaW5fdmFsdWUgPSByYW5nZUFycmF5W2luZGV4IC0gMV07XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChpbmRleCArIDEgPCByYW5nZUFycmF5Lmxlbmd0aCkge1xyXG4gICAgICAgIG1heF92YWx1ZSA9IHJhbmdlQXJyYXlbaW5kZXggKyAxXTtcclxuICAgICAgICAkbmV4dF9ub2RlID0gJCh0aGlzKS5wYXJlbnRzKFwiLmZpZWxkcy1pdGVtXCIpLm5leHQoKS5maW5kKFwiLnZhbHVlLXN0YXJ0IGlucHV0XCIpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobmV3X3ZhbHVlID4gbWluX3ZhbHVlICYmIG5ld192YWx1ZSA8IG1heF92YWx1ZSkge1xyXG4gICAgICAgIHJhbmdlQXJyYXlbaW5kZXhdID0gbmV3X3ZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoJG5leHRfbm9kZSkge1xyXG4gICAgICAgICAgJG5leHRfbm9kZS52YWwobmV3X3ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgS1EuQ29udHJvbC5Ob3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5zaG93RXJyb3IoJ+aVsOWAvOiMg+WbtOS4jeato+ehricpO1xyXG4gICAgICAgIGUudGFyZ2V0LnZhbHVlID0gcmFuZ2VBcnJheVtpbmRleF07XHJcbiAgICAgIH1cclxuICAgICAgcmVuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGNvbnRhaW5lcnNbaV0pLmZpbmQoXCIuY29sb3JzLXBpY2tlclwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICQodGhpcykuZmluZChcIi5rLXNlbGVjdGVkLWNvbG9yXCIpWzBdLmNsaWNrKCk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIOe7keWumuiHquWumuS5ieWNleWAvOWxleW8gOOAgeaUtue8qeS6i+S7tlxyXG4gICAgJChjb250YWluZXJzW2ldKS5maW5kKFwiLmZpZWxkcy1kaXYtc3dpdGNoXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICAgbGV0IHNlbGYgPSAkKHRoaXMpO1xyXG4gICAgICBpZiAoc2VsZi5oYXNDbGFzcyhcInN0YXRlLWNsb3NlXCIpKSB7XHJcbiAgICAgICAgc2VsZi5zaWJsaW5ncyhcInNwYW5cIikudmFsdWUgPSBcIuWxleW8gFwiO1xyXG4gICAgICAgIHNlbGYucGFyZW50cyhcIi50aXRsZVwiKS5zaWJsaW5ncyhcIi5maWVsZHMtY29udGFpbmVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcclxuICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKFwic3RhdGUtY2xvc2VcIik7XHJcbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcyhcImZhLXBsdXMtc3F1YXJlLW9cIik7XHJcbiAgICAgICAgc2VsZi5hZGRDbGFzcyhcImZhLW1pbnVzLXNxdWFyZS1vXCIpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNlbGYuc2libGluZ3MoXCJzcGFuXCIpLnZhbHVlID0gXCLmlLbotbdcIjtcclxuICAgICAgICBzZWxmLnBhcmVudHMoXCIudGl0bGVcIikuc2libGluZ3MoXCIuZmllbGRzLWNvbnRhaW5lclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcclxuICAgICAgICBzZWxmLmFkZENsYXNzKFwic3RhdGUtY2xvc2VcIik7XHJcbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcyhcImZhLW1pbnVzLXNxdWFyZS1vXCIpO1xyXG4gICAgICAgIHNlbGYuYWRkQ2xhc3MoXCJmYS1wbHVzLXNxdWFyZS1vXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KVxyXG5cclxuICAgIC8vIOWmguaenOmcgOimgeWxleW8gO+8jOWImeinpuWPkWNsaWNr5LqL5Lu2XHJcbiAgICBpZiAoZXhwYW5kZWQpIHtcclxuICAgICAgJChjb250YWluZXJzW2ldKS5maW5kKFwiLmZpZWxkcy1kaXYtc3dpdGNoXCIpLnRyaWdnZXIoJ2NsaWNrJyk7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0RmllbGRDb2xvckNvbnRhaW5lcigpIHtcclxuICAoYXN5blByb3h5KF9pbml0RmllbGRDb2xvckNvbnRhaW5lcikpKCk7XHJcbn1cclxuXHJcbi8vIOWMheijueWHveaVsO+8jOi/lOWbnuS4gOS4quW8guatpeaJp+ihjOeahOWHveaVsFxyXG5mdW5jdGlvbiBhc3luUHJveHkoZm4pIHtcclxuICByZXR1cm4gZnVuY3Rpb24gKCkge1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZuKCk7XHJcbiAgICB9LCAwKVxyXG4gIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKmRhdGEgc291cmNlKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuLy8g5qCH562+5a2X5L2T5YiX6KGoXHJcbmZ1bmN0aW9uIGxhYmVsRm9udERyb3BEb3duTGlzdCgpIHtcclxuICByZXR1cm4gW1xyXG4gICAge25hbWU6IFwi5Lu/5a6LXCIsIHZhbHVlOiBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmxhYmVsRm9udE5hbWUuZmFuZ1Nvbmd9LFxyXG4gICAge25hbWU6IFwi5a6L5L2TXCIsIHZhbHVlOiBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmxhYmVsRm9udE5hbWUuc29uZ30sXHJcbiAgICB7bmFtZTogXCLlvq7ova/pm4Xpu5FcIiwgdmFsdWU6IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMubGFiZWxGb250TmFtZS55YUhlaX0sXHJcbiAgXTtcclxufVxyXG5cclxuLy8g5LiT6aKY5a2X5q615YiX6KGoXHJcbmZ1bmN0aW9uIHNwZWNpYWxGaWVsZERyb3BEb3duTGlzdCgpIHtcclxuICBsZXQgc3BlY2lhbEZpZWxkRHJvcERvd25MaXN0ID0gW107XHJcbiAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgbGV0IHJlbmRlciA9IGxheWVyLmdldFJlbmRlcigpO1xyXG4gIHZhciBmaWVsZHMgPSBPYmplY3Qua2V5cyhyZW5kZXIuZ2VvanNvbk9iamVjdEZpZWxkcygpKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyArK2kpIHtcclxuICAgIHNwZWNpYWxGaWVsZERyb3BEb3duTGlzdC5wdXNoKHtuYW1lOiBmaWVsZHNbaV0sIHZhbHVlOiBmaWVsZHNbaV19KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBzcGVjaWFsRmllbGREcm9wRG93bkxpc3Q7XHJcbn1cclxuXHJcbi8vIOWIhuauteS4k+mimOWtl+auteWIl+ihqFxyXG5mdW5jdGlvbiBzZWN0aW9uU3BlY2lhbEZpZWxkRHJvcERvd25MaXN0KCkge1xyXG4gIGxldCBzZWN0aW9uU3BlY2lhbEZpZWxkRHJvcERvd25MaXN0ID0gW107XHJcbiAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgbGV0IHJlbmRlciA9IGxheWVyLmdldFJlbmRlcigpO1xyXG4gIGxldCBmaWVsZHMgPSBPYmplY3Qua2V5cyhyZW5kZXIuZ2VvanNvbk9iamVjdFNlY3Rpb25GaWVsZHMoKSk7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICBzZWN0aW9uU3BlY2lhbEZpZWxkRHJvcERvd25MaXN0LnB1c2goe25hbWU6IGZpZWxkc1tpXSwgdmFsdWU6IGZpZWxkc1tpXX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHNlY3Rpb25TcGVjaWFsRmllbGREcm9wRG93bkxpc3Q7XHJcbn1cclxuXHJcbi8vIOagh+etvuWtl+auteWIl+ihqFxyXG5mdW5jdGlvbiBsYWJlbEZpZWxkRHJvcERvd25MaXN0KCkge1xyXG4gIHJldHVybiBmaWVsZHNEcm9wRG93bkxpc3QoKTtcclxufVxyXG5cclxuLy8g5p2D6YeN5a2X5q615YiX6KGoXHJcbmZ1bmN0aW9uIHdlaWdodEZpZWxkRHJvcERvd25MaXN0KCkge1xyXG4gIHJldHVybiBmaWVsZHNEcm9wRG93bkxpc3QoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmllbGRzRHJvcERvd25MaXN0KCkge1xyXG4gIGxldCBmaWVsZHNEcm9wRG93bkxpc3QgPSBbe25hbWU6IFwi5pyq6K6+572uXCIsIHZhbHVlOiBcIlwifV07XHJcbiAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuXHJcbiAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgbGV0IHJlbmRlciA9IGxheWVyLmdldFJlbmRlcigpO1xyXG4gIGxldCBmaWVsZHMgPSBPYmplY3Qua2V5cyhyZW5kZXIuZ2VvanNvbk9iamVjdEZpZWxkcygpKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBmaWVsZHMubGVuZ3RoOyArK2kpIHtcclxuICAgIGZpZWxkc0Ryb3BEb3duTGlzdC5wdXNoKHtuYW1lOiBmaWVsZHNbaV0sIHZhbHVlOiBmaWVsZHNbaV19KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBmaWVsZHNEcm9wRG93bkxpc3Q7XHJcbn1cclxuXHJcbi8vIOe6v+agt+W8j+WIl+ihqFxyXG5mdW5jdGlvbiBsaW5lU3R5bGVEcm9wRG93bkxpc3QoKSB7XHJcbiAgbGV0IGxpbmVTdHlsZURyb3BEb3duTGlzdCA9IFtdO1xyXG4gIGxldCBsaW5lU3R5bGUgPSBPYmplY3QudmFsdWVzKEtRLkNvbW1vbi5Db21tb25WYWx1ZXMubGluZVN0eWxlKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaW5lU3R5bGUubGVuZ3RoOyArK2kpIHtcclxuICAgIGxpbmVTdHlsZURyb3BEb3duTGlzdC5wdXNoKHtuYW1lOiBTdHJpbmcoaSksIHZhbHVlOiBsaW5lU3R5bGVbaV19KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBsaW5lU3R5bGVEcm9wRG93bkxpc3Q7XHJcbn1cclxuXHJcbi8vIOWIhuauteaWueW8j+WIl+ihqFxyXG5mdW5jdGlvbiBzdWJzZWN0aW9uVHlwZURyb3BEb3duTGlzdCgpIHtcclxuICByZXR1cm4gW1xyXG4gICAge25hbWU6IFwi562J6Led5YiG5q615rOVXCIsIHZhbHVlOiBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmNsYXNzQnJlYWtzTWV0aG9kLmNsYXNzQnJlYWtzX2VxdWlkaXN0YW50fSxcclxuICAgIHtuYW1lOiBcIuetiemHj+WIhuauteazlVwiLCB2YWx1ZTogS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5jbGFzc0JyZWFrc01ldGhvZC5jbGFzc0JyZWFrc19xdWFudGlsZX0sXHJcbiAgICB7bmFtZTogXCLlr7nmlbDliIbmrrXms5VcIiwgdmFsdWU6IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMuY2xhc3NCcmVha3NNZXRob2QuY2xhc3NCcmVha3NfbG9nYXJpdGhtaWN9LFxyXG4gICAge25hbWU6IFwiS+iBmuexu+WIhuauteazlVwiLCB2YWx1ZTogS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5jbGFzc0JyZWFrc01ldGhvZC5jbGFzc0JyZWFrc19rX21lYW5zfSxcclxuICBdO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdWJzZWN0aW9uTnVtYmVyRHJvcERvd25MaXN0KCkge1xyXG4gIGxldCBzdWJzZWN0aW9uTnVtYmVyRHJvcERvd25MaXN0ID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAyOyBpIDwgMTY7ICsraSkge1xyXG4gICAgc3Vic2VjdGlvbk51bWJlckRyb3BEb3duTGlzdC5wdXNoKHtuYW1lOiBTdHJpbmcoaSksIHZhbHVlOiBpfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3Vic2VjdGlvbk51bWJlckRyb3BEb3duTGlzdDtcclxufVxyXG5cclxuLy8g6Imy5bim5qC35byP5YiX6KGoXHJcbmZ1bmN0aW9uIHJhbXBDb2xvckRyb3BEb3duTGlzdCgpIHtcclxuICBjb25zdCBsZW5ndGggPSAzMDsgIC8vIOS4gOWFseaciTMw56eN6Imy5Z2XXHJcbiAgbGV0IHJhbXBDb2xvckRyb3BEb3duTGlzdCA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XHJcbiAgICByYW1wQ29sb3JEcm9wRG93bkxpc3QucHVzaCh7bmFtZTogU3RyaW5nKGkpLCB2YWx1ZTogU3RyaW5nKGkpfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gcmFtcENvbG9yRHJvcERvd25MaXN0O1xyXG59XHJcblxyXG4vLyDng63lipvlm77oibLluKbmoLflvI/liJfooahcclxuZnVuY3Rpb24gaGVhdG1hcFJhbXBDb2xvckRyb3BEb3duTGlzdCgpIHtcclxuICBjb25zdCBsZW5ndGggPSAxODsgIC8vIOS4gOWFseaciTE456eN6Imy5Z2XXHJcbiAgbGV0IGhlYXRtYXBSYW1wQ29sb3JEcm9wRG93bkxpc3QgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xyXG4gICAgaGVhdG1hcFJhbXBDb2xvckRyb3BEb3duTGlzdC5wdXNoKHtuYW1lOiBTdHJpbmcoaSksIHZhbHVlOiBTdHJpbmcoaSl9KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBoZWF0bWFwUmFtcENvbG9yRHJvcERvd25MaXN0O1xyXG59XHJcblxyXG4vLyDmoIfnrb7mlrnlkJHliJfooahcclxuZnVuY3Rpb24gbGFiZWxEaXJlY3Rpb25Ecm9wRG93bkxpc3QoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHtuYW1lOiBcIuS4rVwiLCB2YWx1ZTogXCJtaWRcIn0sXHJcbiAgICB7bmFtZTogXCLkuIpcIiwgdmFsdWU6IFwidXBcIn0sXHJcbiAgICB7bmFtZTogXCLkuItcIiwgdmFsdWU6IFwiZG93blwifSxcclxuICAgIHtuYW1lOiBcIuW3plwiLCB2YWx1ZTogXCJsZWZ0XCJ9LFxyXG4gICAge25hbWU6IFwi5Y+zXCIsIHZhbHVlOiBcInJpZ2h0XCJ9LFxyXG4gIF07XHJcbn1cclxuIiwiLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBidWlsZGVyc2lkZWJhciBvbiB0aGlzIGpRdWVyeSBvYmplY3QuXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBidWlsZGVyc2lkZWJhciA9ICQoJyNidWlsZGVyc2lkZWJhcicpLmJ1aWxkZXJzaWRlYmFyKCk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25hbCBvcHRpb25zIG9iamVjdFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucG9zaXRpb249bGVmdF0gLSBQb3NpdGlvbiBvZiB0aGUgYnVpbGRlcnNpZGViYXI6ICdsZWZ0JyBvciAncmlnaHQnXHJcbiAqIEByZXR1cm5zIHtqUXVlcnl9XHJcbiAqL1xyXG5cclxudmFyIGN1cnJlbnRJRCA9IG51bGw7XHJcblxyXG4kLmZuLmJ1aWxkZXJzaWRlYmFyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICB2YXIgJHNpZGViYXIgPSB0aGlzO1xyXG4gIHZhciAkdGFicyA9ICRzaWRlYmFyLmZpbmQoJ3VsLmJ1aWxkZXJzaWRlYmFyLXRhYnMsIC5idWlsZGVyc2lkZWJhci10YWJzID4gdWwnKTtcclxuICB2YXIgJGNvbnRhaW5lciA9ICRzaWRlYmFyLmNoaWxkcmVuKCcuYnVpbGRlcnNpZGViYXItY29udGVudCcpLmZpcnN0KCk7XHJcblxyXG4gIG9wdGlvbnMgPSAkLmV4dGVuZCh7XHJcbiAgICBwb3NpdGlvbjogJ2xlZnQnLFxyXG4gIH0sIG9wdGlvbnMgfHwge30pO1xyXG5cclxuICAkc2lkZWJhci5hZGRDbGFzcygnYnVpbGRlcnNpZGViYXItJyArIG9wdGlvbnMucG9zaXRpb24pO1xyXG5cclxuICAkdGFicy5jaGlsZHJlbignbGknKS5jaGlsZHJlbignYVtocmVmXj1cIiNcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKHRoaXMuaGFzaC5zbGljZSgxKSAhPT0gJ2hvbWUnKSB7XHJcbiAgICAgIHZhciAkdGFiID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpO1xyXG4gICAgICBpZiAoJHRhYi5oYXNDbGFzcygnYWN0aXZlJykpXHJcbiAgICAgICAgJHNpZGViYXIuY2xvc2UoKTtcclxuICAgICAgZWxzZSBpZiAoISR0YWIuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcclxuICAgICAgICAkc2lkZWJhci5vcGVuKHRoaXMuaGFzaC5zbGljZSgxKSwgJHRhYik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChjdXJyZW50SUQpIHtcclxuICAgICAgICBpZiAoJHNpZGViYXIuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKVxyXG4gICAgICAgICAgJHNpZGViYXIub3BlbihjdXJyZW50SUQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICRzaWRlYmFyLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJHNpZGViYXIuZmluZCgnLmJ1aWxkZXJzaWRlYmFyLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJHNpZGViYXIuY2xvc2UoKTtcclxuICB9KTtcclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbiBidWlsZGVyc2lkZWJhciAoaWYgbmVjZXNzYXJ5KSBhbmQgc2hvdyB0aGUgc3BlY2lmaWVkIHRhYi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFRoZSBpZCBvZiB0aGUgdGFiIHRvIHNob3cgKHdpdGhvdXQgdGhlICMgY2hhcmFjdGVyKVxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBbJHRhYl0gLSBUaGUgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHRhYiBub2RlICh1c2VkIGludGVybmFsbHkgZm9yIGVmZmljaWVuY3kpXHJcbiAgICovXHJcbiAgJHNpZGViYXIub3BlbiA9IGZ1bmN0aW9uIChpZCwgJHRhYikge1xyXG4gICAgaWYgKHR5cGVvZiAkdGFiID09PSAndW5kZWZpbmVkJylcclxuICAgICAgJHRhYiA9ICR0YWJzLmZpbmQoJ2xpID4gYVtocmVmPVwiIycgKyBpZCArICdcIl0nKS5wYXJlbnQoKTtcclxuXHJcbiAgICAvLyBoaWRlIG9sZCBhY3RpdmUgY29udGVudHNcclxuICAgICRjb250YWluZXIuY2hpbGRyZW4oJy5idWlsZGVyc2lkZWJhci1wYW5lLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAvLyBzaG93IG5ldyBjb250ZW50XHJcbiAgICAkY29udGFpbmVyLmNoaWxkcmVuKCcjJyArIGlkKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgLy8gcmVtb3ZlIG9sZCBhY3RpdmUgaGlnaGxpZ2h0c1xyXG4gICAgJHRhYnMuY2hpbGRyZW4oJ2xpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAvLyBzZXQgbmV3IGhpZ2hsaWdodFxyXG4gICAgJHRhYi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgJHNpZGViYXIudHJpZ2dlcignY29udGVudCcsIHsnaWQnOiBpZH0pO1xyXG5cclxuICAgIGlmICgkc2lkZWJhci5oYXNDbGFzcygnY29sbGFwc2VkJykpIHtcclxuICAgICAgLy8gb3BlbiBidWlsZGVyc2lkZWJhclxyXG4gICAgICAkc2lkZWJhci50cmlnZ2VyKCdvcGVuaW5nJyk7XHJcbiAgICAgICRzaWRlYmFyLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAkc2lkZWJhci5maW5kKCcjYnVpbGRlci10aXRsZS1pbWFnZScpLnNob3coKTtcclxuXHJcbiAgICBjdXJyZW50SUQgPSBpZDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSB0aGUgYnVpbGRlcnNpZGViYXIgKGlmIG5lY2Vzc2FyeSkuXHJcbiAgICovXHJcbiAgJHNpZGViYXIuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyByZW1vdmUgb2xkIGFjdGl2ZSBoaWdobGlnaHRzXHJcbiAgICAkdGFicy5jaGlsZHJlbignbGkuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICRzaWRlYmFyLmZpbmQoJyNidWlsZGVyLXRpdGxlLWltYWdlJykuaGlkZSgpO1xyXG5cclxuICAgIGlmICghJHNpZGViYXIuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKSB7XHJcbiAgICAgIC8vIGNsb3NlIGJ1aWxkZXJzaWRlYmFyXHJcbiAgICAgICRzaWRlYmFyLnRyaWdnZXIoJ2Nsb3NpbmcnKTtcclxuICAgICAgJHNpZGViYXIuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAkc2lkZWJhcjtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl3ZWkgb24gMjAxOS8xMC8xNC5cclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJy4vYnVpbGRlci9faW5pdERvbXMnKTtcclxucmVxdWlyZSgnLi9idWlsZGVyL2xpYnMvanF1ZXJ5LXNpZGViYXInKTtcclxuXHJcbiJdfQ==
