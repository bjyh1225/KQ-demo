(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

// import RenderShape from "../../../src/builder/RenderShape";

/**
 * Created by lihuan on 2019/8/19.
 */

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

function initSettingDoms() {}

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
  var renderType = layer.getRenderType();
  var renderModel = buildProject.getInfo('render_model');
  var options = renderModel.styleOptions;
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
    editor_common_uis.innerHTML = "\n                <div class=\"editor-tool\">\n                    <div class=\"text\">\u8FC7\u6EE4\u663E\u793A</div>\n                    <input class=\"dv-input\" placeholder=\"\u4F8B\u5982: id > 5\" data-bind=\"value: styleOptions.filter\"/>\n                </div>\n                <div class=\"editor-tool lable-select\">\n                    <div class=\"text\">\u6807\u7B7E\u5B57\u6BB5</div>\n                    <select class=\"label-field-list\" data-bind=\"source: labelFieldDropDownList, value: styleOptions.labelField\"></select>\n                </div>\n                <div class=\"editor-tool lable-style\">\n                    <div class=\"text\">\u6807\u7B7E\u989C\u8272</div>\n                    <input class=\"colors-picker-input\" data-role=\"colorpicker\"\n                           data-bind=\"value: styleOptions.labelColor\"/>\n                </div>\n                <div class=\"editor-tool lable-select\">\n                    <div class=\"text\">\u6807\u7B7E\u5B57\u4F53</div>\n                    <select class=\"label-font-list\" data-bind=\"source: labelFontDropDownList, value: styleOptions.labelFontName\"> </select>\n                </div>\n            ";
    containers[i].appendChild(editor_common_uis);
  }
}

// 点符号
function initSymbolTypeContainer() {
  var containers = document.getElementsByClassName("symbol-type-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n        <div class=\"editor-tool\">\n          <div class=\"text\">\u7B26\u53F7\u7C7B\u578B</div>\n          <div class=\"point-symbol point-symbol-svg symbol-active\">\u77E2\u91CF</div>\n          <div class=\"point-symbol point-symbol-img\">\u56FE\u7247</div>\n        </div>\n        ";
    containers[i].appendChild(div);
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
    div.innerHTML = "\n            <div class=\"editor-tool\">\n               <div class=\"text\">\u8FC7\u6EE4\u663E\u793A</div>\n               <input class=\"dv-input\" placeholder=\"\u4F8B\u5982: id > 5\" data-bind=\"value: styleOptions.filter\"/>\n            </div>          \n            ";
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
  var containers = document.getElementsByClassName("line-line-color-container");
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
  var containers = document.getElementsByClassName("line-line-width-container");
  for (var i = 0; i < containers.length; i++) {
    var div = document.createElement("div");
    div.innerHTML = "\n            <div class=\"editor-tool\">\n                <div class=\"text\">\u7EBF\u5BBD\u5EA6</div>\n                <div class=\"value-container\">\n                    <input class=\"line-width-silder\" data-bind=\"value: styleOptions.lineWidth\"/>\n                    <input type=\"text\" style=\"border: none;\" data-bind=\"value: styleOptions.lineWidth\">\n                    <p stype=\"padding-right: 5px;\">px</p>\n                </div>\n            </div>\n            ";
    containers[i].appendChild(div);
  }
}

// 线不透明度
function initLineOpacityContainer() {
  var containers = document.getElementsByClassName("line-line-opacity-container");
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
      html += "<div class=\"title\">\n                 <span>\u81EA\u5B9A\u4E49\u5355\u503C</span>\n                  <div class=\"unique-show\"><span>\u5C55\u5F00</span><i class=\"fa fa-plus-square-o fields-div-switch state-close\"></i></div>\n                </div>\n                <div class=\"fields-container\" style=\"min-height: 244px; display: none;\">";

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
        html += "<div class=\"title\">\n                 <span>\u81EA\u5B9A\u4E49\u5206\u6BB5</span>\n                  <div class=\"unique-show\"><span>\u5C55\u5F00</span><i class=\"fa fa-plus-square-o fields-div-switch state-close\"></i></div>\n                </div>\n                <div class=\"fields-container\" style=\"min-height: 244px; display: none;\">";

        // 得到颜色数组、范围数组
        var colorFieldsArray = _getColorFieldsArray(featureType, "section");
        var rangeArray = _getRangeArray(featureType);

        // 遍历颜色数组，添加各行控件
        colorFieldsArray.forEach(function (value, index) {
          html += "<div class=\"fields-item\" data-index=" + index + " >\n                    <span class=\"icon iconfont " + shapeClass + " colors-picker\" style=\"color: " + value + "\"><div class=\"section-colors-picker\" value=" + value + "></div></span>\n                    <div class=\"range-values\">\n                      <div class=\"value-start\"><input type=\"text\" placeholder=\"\" value=" + rangeArray[index] + "></div>\n                      <div class=\"value-hr\"> -</div>\n                      <div class=\"value-end\"><input type=\"text\" placeholder=\"\" value=" + rangeArray[index + 1] + "></div>\n                    </div>\n                  </div>";
        });

        html += "</div>";
        div.innerHTML = html;
        containers[i].appendChild(div);
      })();
    } else if (containers[i].classList.contains("heatmap")) {
      (function () {
        html += "<div class=\"editor-fields-color\" >\n            <div class=\"title\"><span>\u81EA\u5B9A\u4E49\u989C\u8272</span>\n              <div class=\"unique-show\"><span>\u5C55\u5F00</span><i class=\"fa fa-plus-square-o fields-div-switch state-close\"></i></div>\n            </div>\n            <div class=\"fields-container\" style=\"min-height: 244px; display: none;\">";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYnVpbGRlci9faW5pdERvbXMuanMiLCJzcmMvYnVpbGRlci9saWJzL2pxdWVyeS1zaWRlYmFyLmpzIiwic3JjL2txYnVpbGRlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7O0FBRUE7Ozs7QUFJQSxTQUFTLFdBQVQsR0FBdUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDRDs7QUFFRCxTQUFTLGFBQVQsR0FBeUI7QUFDdkI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDRDs7QUFFRCxTQUFTLFlBQVQsR0FBd0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0Q7O0FBRUQsU0FBUyxlQUFULEdBQTJCO0FBQ3pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDRDs7QUFFRCxTQUFTLGVBQVQsR0FBMkIsQ0FFMUI7O0FBRUQsU0FBUyxhQUFULEdBQXlCO0FBQ3ZCLElBQUUsc0JBQUYsRUFBMEIsZ0JBQTFCLENBQTJDO0FBQ3pDLFlBQVEsS0FEaUM7QUFFekMsWUFBUTtBQUZpQyxHQUEzQzs7QUFLQTtBQUNBLElBQUUsb0JBQUYsRUFBd0IsV0FBeEIsQ0FBb0M7QUFDbEMsU0FBSyxDQUQ2QjtBQUVs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QTs7QUFFQSxRQUFRLHFCQUFSO0FBQ0EsUUFBUSwrQkFBUiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vIGltcG9ydCBSZW5kZXJTaGFwZSBmcm9tIFwiLi4vLi4vLi4vc3JjL2J1aWxkZXIvUmVuZGVyU2hhcGVcIjtcclxuXHJcbi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpaHVhbiBvbiAyMDE5LzgvMTkuXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gaW5pdEFsbERvbXMoKSB7XHJcbiAgaW5pdFN5bWJvbFR5cGVDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRTeXRsZUNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludFJhbXBDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludENvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50U2l6ZUNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludE9wYWNpdHlDb250YWluZXIoKTtcclxuICBpbml0SGVhdG1hcEZpbHRlckNvbnRhaW5lcigpO1xyXG4gIGluaXRIZWF0bWFwUmFkaXVzQ29udGFpbmVyKCk7XHJcbiAgaW5pdEhlYXRtYXBSYW1wQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0SGVhdG1hcFdlaWdodEZpZWxkQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50TGluZUNvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50TGluZVdpZHRoQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50TGluZU9wYWNpdHlDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRTcGVjaWFsRmllbGRDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRTdWJzZWN0aW9uVHlwZUNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludFN1YnNlY3Rpb25OdW1iZXJDb250YWluZXIoKTtcclxuICBpbml0TGFiZWxEaXJlY3Rpb25Db250YWluZXIoKTtcclxuICBpbml0TGFiZWxPZmZzZXRDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdExpbmVDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRMaW5lU3R5bGVMaXN0Q29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVPcGFjaXR5Q29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVXaWR0aENvbnRhaW5lcigpO1xyXG4gIGluaXRMaW5lUmFtcENvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFNwZWNpYWxGaWVsZENvbnRhaW5lcigpO1xyXG4gIGluaXRTdWJzZWN0aW9uVHlwZUNvbnRhaW5lcigpO1xyXG4gIGluaXRTdWJzZWN0aW9uTnVtYmVyQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvbHlnb25Db2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2x5Z29uT3BhY2l0eUNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0UG9seWdvblJhbXBDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0Q29tbW9uVWlzKCk7XHJcbiAgaW5pdEtlbmRvRG9tcygpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0UG9pbnREb21zKCkge1xyXG4gIGluaXRTeW1ib2xUeXBlQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRQb2ludFN5dGxlQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50UmFtcENvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50Q29sb3JDb250YWluZXIoKTtcclxuICBpbml0UG9pbnRTaXplQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50T3BhY2l0eUNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0SGVhdG1hcEZpbHRlckNvbnRhaW5lcigpO1xyXG4gIGluaXRIZWF0bWFwUmFkaXVzQ29udGFpbmVyKCk7XHJcbiAgaW5pdEhlYXRtYXBSYW1wQ29sb3JDb250YWluZXIoKTtcclxuICBpbml0SGVhdG1hcFdlaWdodEZpZWxkQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRQb2ludExpbmVDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludExpbmVXaWR0aENvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludExpbmVPcGFjaXR5Q29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRQb2ludFNwZWNpYWxGaWVsZENvbnRhaW5lcigpO1xyXG4gIGluaXRQb2ludFN1YnNlY3Rpb25UeXBlQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvaW50U3Vic2VjdGlvbk51bWJlckNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0TGFiZWxEaXJlY3Rpb25Db250YWluZXIoKTtcclxuICBpbml0TGFiZWxPZmZzZXRDb250YWluZXIoKTtcclxuXHJcbiAgaW5pdENvbW1vblVpcygpO1xyXG5cclxuICBpbml0RmllbGRDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0S2VuZG9Eb21zKCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRMaW5lRG9tcygpIHtcclxuICBpbml0Q29tbW9uVWlzKCk7XHJcbiAgaW5pdExpbmVDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRMaW5lU3R5bGVMaXN0Q29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVPcGFjaXR5Q29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVXaWR0aENvbnRhaW5lcigpO1xyXG5cclxuICBpbml0TGluZVJhbXBDb2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRTcGVjaWFsRmllbGRDb250YWluZXIoKTtcclxuICBpbml0U3Vic2VjdGlvblR5cGVDb250YWluZXIoKTtcclxuICBpbml0U3Vic2VjdGlvbk51bWJlckNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0UG9seWdvbkNvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvbHlnb25PcGFjaXR5Q29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRLZW5kb0RvbXMoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFBvbHlnb25Eb21zKCkge1xyXG4gIGluaXRDb21tb25VaXMoKTtcclxuXHJcbiAgaW5pdFNwZWNpYWxGaWVsZENvbnRhaW5lcigpO1xyXG5cclxuICBpbml0U3Vic2VjdGlvblR5cGVDb250YWluZXIoKTtcclxuICBpbml0U3Vic2VjdGlvbk51bWJlckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2x5Z29uUmFtcENvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdFBvbHlnb25Db2xvckNvbnRhaW5lcigpO1xyXG4gIGluaXRQb2x5Z29uT3BhY2l0eUNvbnRhaW5lcigpO1xyXG5cclxuICBpbml0TGluZUNvbG9yQ29udGFpbmVyKCk7XHJcbiAgaW5pdExpbmVTdHlsZUxpc3RDb250YWluZXIoKTtcclxuICBpbml0TGluZU9wYWNpdHlDb250YWluZXIoKTtcclxuICBpbml0TGluZVdpZHRoQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gIGluaXRLZW5kb0RvbXMoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFNldHRpbmdEb21zKCkge1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEtlbmRvRG9tcygpIHtcclxuICAkKFwiLmNvbG9ycy1waWNrZXItaW5wdXRcIikua2VuZG9Db2xvclBpY2tlcih7XHJcbiAgICBidXR0b246IGZhbHNlLFxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSk7XHJcblxyXG4gIC8vIOeCueWkp+Wwj1xyXG4gICQoXCIucG9pbnQtc2l6ZS1zaWxkZXJcIikua2VuZG9TbGlkZXIoe1xyXG4gICAgbWluOiAxLFxyXG4gICAgbWF4OiAyMCxcclxuICAgIHNtYWxsU3RlcDogMSxcclxuICAgIGxhcmdlU3RlcDogMSxcclxuICAgIHNob3dCdXR0b25zOiBmYWxzZSxcclxuICAgIHRpcHM6IGZhbHNlLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pLmRhdGEoXCJrZW5kb1NsaWRlclwiKTtcclxuXHJcbiAgLy8g54Ot54K55Y2K5b6EXHJcbiAgJChcIi5oZWF0bWFwLXJhZGl1cy1zaWxkZXJcIikua2VuZG9TbGlkZXIoe1xyXG4gICAgbWluOiAxLFxyXG4gICAgbWF4OiAyMCxcclxuICAgIHNtYWxsU3RlcDogMSxcclxuICAgIGxhcmdlU3RlcDogMSxcclxuICAgIHNob3dCdXR0b25zOiBmYWxzZSxcclxuICAgIHRpcHM6IGZhbHNlLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pLmRhdGEoXCJrZW5kb1NsaWRlclwiKTtcclxuXHJcbiAgJChcIi5saW5lLXdpZHRoLXNpbGRlclwiKS5rZW5kb1NsaWRlcih7XHJcbiAgICBtaW46IDAsXHJcbiAgICBtYXg6IDIwLFxyXG4gICAgc21hbGxTdGVwOiAxLFxyXG4gICAgbGFyZ2VTdGVwOiAxLFxyXG4gICAgc2hvd0J1dHRvbnM6IGZhbHNlLFxyXG4gICAgdGlwczogZmFsc2UsXHJcblxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSkuZGF0YShcImtlbmRvU2xpZGVyXCIpO1xyXG5cclxuICAkKFwiLm9wYWNpdHktc2xpZGVyXCIpLmtlbmRvU2xpZGVyKHtcclxuICAgIG1pbjogMCxcclxuICAgIG1heDogMTAwLFxyXG4gICAgc21hbGxTdGVwOiA1LFxyXG4gICAgbGFyZ2VTdGVwOiAxMCxcclxuICAgIHNob3dCdXR0b25zOiBmYWxzZSxcclxuXHJcbiAgICBjaGFuZ2U6IHJlbmRlcixcclxuICB9KS5kYXRhKFwia2VuZG9TbGlkZXJcIik7XHJcblxyXG4gICQoXCIubGluZS1zdHlsZS1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuXHJcbiAgICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwiay1zdGF0ZS1kZWZhdWx0XCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvbGluZV9zdHlsZXMvbGluZV9zdHlsZSM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICB2YWx1ZVRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJzZWxlY3RlZC12YWx1ZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2xpbmVfc3R5bGVzL2xpbmVfc3R5bGUjOmRhdGEubmFtZSMucG5nKVwiPjwvc3Bhbj4nLFxyXG4gICAgaGVpZ2h0OiAyMDAsXHJcblxyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSk7XHJcblxyXG4gICQoXCIucG9pbnQtcmFtcC1jb2xvclwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICBkYXRhVGV4dEZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJuYW1lXCIsXHJcbiAgICB0ZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwiay1zdGF0ZS1kZWZhdWx0XCIgc3R5bGU9XCJoZWlnaHQ6IDEycHg7IGJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9jb2xvcl9yYW1wL2NvbG9yIzpkYXRhLm5hbWUjLnBuZylcIj48L3NwYW4+JyxcclxuICAgIHZhbHVlVGVtcGxhdGU6ICc8c3BhbiBjbGFzcz1cInNlbGVjdGVkLXZhbHVlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvY29sb3JfcmFtcC9jb2xvciM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICBoZWlnaHQ6IDIwMCxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZmllbGRDb2xvcnNDaGFuZ2VkKCk7XHJcbiAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICByZW5kZXIoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gICQoXCIuaGVhdG1hcC1yYW1wLWNvbG9yXCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwidmFsdWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcIm5hbWVcIixcclxuICAgIHRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJrLXN0YXRlLWRlZmF1bHRcIiBzdHlsZT1cImhlaWdodDogMTJweDsgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2hlYXRtYXBfcmFtcC9jb2xvciM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICB2YWx1ZVRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJzZWxlY3RlZC12YWx1ZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2hlYXRtYXBfcmFtcC9jb2xvciM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICBoZWlnaHQ6IDIwMCxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZmllbGRDb2xvcnNDaGFuZ2VkKCk7XHJcbiAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICByZW5kZXIoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gICQoXCIubGluZS1yYW1wLWNvbG9yXCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwidmFsdWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcIm5hbWVcIixcclxuICAgIHRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJrLXN0YXRlLWRlZmF1bHRcIiBzdHlsZT1cImhlaWdodDogMTJweDsgYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2NvbG9yX3JhbXAvY29sb3IjOmRhdGEubmFtZSMucG5nKVwiPjwvc3Bhbj4nLFxyXG4gICAgdmFsdWVUZW1wbGF0ZTogJzxzcGFuIGNsYXNzPVwic2VsZWN0ZWQtdmFsdWVcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9jb2xvcl9yYW1wL2NvbG9yIzpkYXRhLm5hbWUjLnBuZylcIj48L3NwYW4+JyxcclxuICAgIGhlaWdodDogMjAwLFxyXG5cclxuICAgIGNoYW5nZTogZnVuY3Rpb24gKCkge1xyXG4gICAgICBmaWVsZENvbG9yc0NoYW5nZWQoKTtcclxuICAgICAgaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKTtcclxuXHJcbiAgICAgIHJlbmRlcigpO1xyXG4gICAgfSxcclxuICB9KTtcclxuXHJcbiAgJChcIi5wb2x5Z29uLXJhbXAtY29sb3JcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwibmFtZVwiLFxyXG4gICAgdGVtcGxhdGU6ICc8c3BhbiBjbGFzcz1cImstc3RhdGUtZGVmYXVsdFwiIHN0eWxlPVwiaGVpZ2h0OiAxMnB4OyBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoLi9pbWFnZXMvY29sb3JfcmFtcC9jb2xvciM6ZGF0YS5uYW1lIy5wbmcpXCI+PC9zcGFuPicsXHJcbiAgICB2YWx1ZVRlbXBsYXRlOiAnPHNwYW4gY2xhc3M9XCJzZWxlY3RlZC12YWx1ZVwiIHN0eWxlPVwiYmFja2dyb3VuZC1pbWFnZTogdXJsKC4vaW1hZ2VzL2NvbG9yX3JhbXAvY29sb3IjOmRhdGEubmFtZSMucG5nKVwiPjwvc3Bhbj4nLFxyXG4gICAgaGVpZ2h0OiAyMDAsXHJcblxyXG4gICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZpZWxkQ29sb3JzQ2hhbmdlZCgpO1xyXG4gICAgICBpbml0RmllbGRDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgcmVuZGVyKCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAvLyDkuJPpopjlrZfmrrXliJfooahcclxuICAkKFwiLnNwZWNpYWwtZmllbGQtbGlzdFwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICBkYXRhVGV4dEZpZWxkOiBcIm5hbWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICBoZWlnaHQ6IDE0MCxcclxuXHJcbiAgICBjaGFuZ2U6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgZmllbGRDb2xvcnNDaGFuZ2VkKCk7XHJcbiAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcblxyXG4gICAgICByZW5kZXIoKTtcclxuICAgIH0sXHJcbiAgfSk7XHJcblxyXG4gIC8vIOWIhuauteaWueazlVxyXG4gICQoXCIuc3ViLXNlY3Rpb24tbWV0aG9kLWxpc3RcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJuYW1lXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgaGVpZ2h0OiAxNDAsXHJcblxyXG4gICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZpZWxkQ29sb3JzQ2hhbmdlZCgpO1xyXG4gICAgICBpbml0RmllbGRDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgcmVuZGVyKCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAvLyDliIbmrrXkuKrmlbBcclxuICAkKFwiLnN1Yi1zZWN0aW9uLWNvdW50LWxpc3RcIikua2VuZG9Ecm9wRG93bkxpc3Qoe1xyXG4gICAgZGF0YVRleHRGaWVsZDogXCJuYW1lXCIsXHJcbiAgICBkYXRhVmFsdWVGaWVsZDogXCJ2YWx1ZVwiLFxyXG4gICAgaGVpZ2h0OiAxNDAsXHJcblxyXG4gICAgY2hhbmdlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGZpZWxkQ29sb3JzQ2hhbmdlZCgpO1xyXG4gICAgICBpbml0RmllbGRDb2xvckNvbnRhaW5lcigpO1xyXG5cclxuICAgICAgcmVuZGVyKCk7XHJcbiAgICB9LFxyXG4gIH0pO1xyXG5cclxuICAvLyDmoIfnrb7mlrnlkJFcclxuICAkKFwiLmxhYmVsLWRpcmVjdGlvbi1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgIGhlaWdodDogMTQwLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pO1xyXG5cclxuICAvLyDmoIfnrb7lgY/np7tcclxuICAkKFwiLmxhYmVsLW9mZnNldC1zaWxkZXJcIikua2VuZG9TbGlkZXIoe1xyXG4gICAgbWluOiAwLFxyXG4gICAgbWF4OiA0MCxcclxuICAgIHNtYWxsU3RlcDogMSxcclxuICAgIGxhcmdlU3RlcDogMSxcclxuICAgIHNob3dCdXR0b25zOiBmYWxzZSxcclxuICAgIHRpcHM6IGZhbHNlLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pLmRhdGEoXCJrZW5kb1NsaWRlclwiKTtcclxuXHJcbiAgLy8g5qCH562+5a2X5L2T5YiX6KGoXHJcbiAgJChcIi5sYWJlbC1maWVsZC1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgIGhlaWdodDogMTQwLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pO1xyXG5cclxuICAvLyDmnYPph43lrZfmrrXliJfooahcclxuICAkKFwiLndlaWdodC1maWVsZC1saXN0XCIpLmtlbmRvRHJvcERvd25MaXN0KHtcclxuICAgIGRhdGFUZXh0RmllbGQ6IFwibmFtZVwiLFxyXG4gICAgZGF0YVZhbHVlRmllbGQ6IFwidmFsdWVcIixcclxuICAgIGhlaWdodDogMTQwLFxyXG5cclxuICAgIGNoYW5nZTogcmVuZGVyLFxyXG4gIH0pO1xyXG5cclxuICAvLyDmoIfnrb7lrZfmrrXliJfooahcclxuICAkKFwiLmxhYmVsLWZvbnQtbGlzdFwiKS5rZW5kb0Ryb3BEb3duTGlzdCh7XHJcbiAgICBkYXRhVGV4dEZpZWxkOiBcIm5hbWVcIixcclxuICAgIGRhdGFWYWx1ZUZpZWxkOiBcInZhbHVlXCIsXHJcbiAgICBoZWlnaHQ6IDE0MCxcclxuXHJcbiAgICBjaGFuZ2U6IHJlbmRlcixcclxuICB9KTtcclxuXHJcbiAgLy8g6L+H5ruk5p2h5Lu26L6T5YWl5qGGXHJcbiAgbGV0IGR2X2lucHV0ID0gJChcIi5kdi1pbnB1dFwiKS5rZW5kb01hc2tlZFRleHRCb3goe1xyXG4gICAgY2hhbmdlOiByZW5kZXIsXHJcbiAgfSkuZGF0YShcImtlbmRvTWFza2VkVGV4dEJveFwiKTtcclxuXHJcbiAgLy8g5ZON5bqUZW50ZXLkuovku7ZcclxuICAkKFwiW2RhdGEtcm9sZT1tYXNrZWR0ZXh0Ym94XVwiKS5vbihcImtleWRvd25cIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB7XHJcbiAgICAgIGR2X2lucHV0LnRyaWdnZXIoJ2NoYW5nZScsIHtkYXRhOiAkKHRoaXMpLnZhbCgpfSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbmRlcigpIHtcclxuICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gIGxldCBsYXllciA9IGJ1aWxkUHJvamVjdC5zZXR0aW5nLmxheWVyOyAvLyDlvZPliY3mv4DmtLvnmoRsYXllclxyXG4gIGxldCByZW5kZXJUeXBlID0gbGF5ZXIuZ2V0UmVuZGVyVHlwZSgpO1xyXG4gIGxldCByZW5kZXJNb2RlbCA9IGJ1aWxkUHJvamVjdC5nZXRJbmZvKCdyZW5kZXJfbW9kZWwnKTtcclxuICBsZXQgb3B0aW9ucyA9IHJlbmRlck1vZGVsLnN0eWxlT3B0aW9ucztcclxuICBsZXQgcmVuZGVyID0gbGF5ZXIucmVuZGVyLmdldChyZW5kZXJUeXBlKTtcclxuXHJcbiAgaWYgKHJlbmRlck1vZGVsLnBvaW50U2l6ZSkge1xyXG4gICAgLy8g54K55pWw5o2uXHJcbiAgICBvcHRpb25zLnZlY3RvckluZm8uZmlsbE9wYWNpdHkgPSByZW5kZXJNb2RlbC5wb2ludE9wYWNpdHkgLyAxMDA7XHJcbiAgICBvcHRpb25zLnZlY3RvckluZm8uc3Ryb2tlT3BhY2l0eSA9IHJlbmRlck1vZGVsLmxpbmVPcGFjaXR5IC8gMTAwO1xyXG5cclxuICAgIGlmIChvcHRpb25zLnBvaW50U3ltYm9sVHlwZSA9PT0gXCJ2ZWN0b3JcIikge1xyXG4gICAgICBvcHRpb25zLnZlY3RvckluZm8uZm9udFNpemUgPSByZW5kZXJNb2RlbC5wb2ludFNpemUgKyBcInB4XCI7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBvcHRpb25zLmltYWdlSW5mby5yYWRpdXMgPSByZW5kZXJNb2RlbC5wb2ludFNpemUgLyAxMDtcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgLy8g57q/44CB6Z2i5pWw5o2uXHJcbiAgICBvcHRpb25zLmZpbGxPcGFjaXR5ID0gcmVuZGVyTW9kZWwuZmlsbE9wYWNpdHkgLyAxMDA7XHJcbiAgICBvcHRpb25zLmxpbmVPcGFjaXR5ID0gcmVuZGVyTW9kZWwubGluZU9wYWNpdHkgLyAxMDA7XHJcbiAgfVxyXG5cclxuICAvLyDnibnmrorlpITnkIZncmFkaWVudFxyXG4gIGlmIChvcHRpb25zLnJlbmRlclR5cGUgPT09IFwiaGVhdG1hcFwiKSB7XHJcbiAgICBvcHRpb25zLmdyYWRpZW50ID0gS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5oZWF0bWFwQ29sb3JSYW1wW29wdGlvbnMuY29sb3JJbmRleF07XHJcbiAgfVxyXG5cclxuICByZW5kZXIuc2V0T3B0aW9ucyhvcHRpb25zKTtcclxufVxyXG5cclxuZnVuY3Rpb24gZmllbGRDb2xvcnNDaGFuZ2VkKCkge1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgbGV0IHJlbmRlclR5cGUgPSBsYXllci5nZXRSZW5kZXJUeXBlKCk7XHJcbiAgbGV0IHJlbmRlck1vZGVsID0gYnVpbGRQcm9qZWN0LmdldEluZm8oJ3JlbmRlcl9tb2RlbCcpO1xyXG4gIGxldCBvcHRpb25zID0gcmVuZGVyTW9kZWwuc3R5bGVPcHRpb25zO1xyXG4gIGxldCByZW5kZXIgPSBsYXllci5yZW5kZXIuZ2V0KHJlbmRlclR5cGUpO1xyXG4gIGxldCBzdHlsZU9wdGlvbiA9IG9wdGlvbnM7XHJcbiAgbGV0IHJlbmRlck9wdGlvbiA9IHJlbmRlci5vcHRpb25zO1xyXG5cclxuICBpZiAobGF5ZXIub3B0aW9ucy5mZWF0dXJlVHlwZSA9PT0gXCJwb2ludFwiKSB7XHJcbiAgICBzdHlsZU9wdGlvbiA9IHN0eWxlT3B0aW9uLnZlY3RvckluZm87XHJcbiAgICByZW5kZXJPcHRpb24gPSByZW5kZXJPcHRpb24udmVjdG9ySW5mbztcclxuICB9XHJcblxyXG4gIGlmIChyZW5kZXJUeXBlID09IFwic2luZ2xlXCIpIHtcclxuICAgIHN0eWxlT3B0aW9uLnRoZW1hdGljQ29sb3JzID0gS1EuQnVpbGRlci5SZW5kZXJTaGFwZS5nZXRUaGVtYXRpY0ZpZWxkQ29sb3JzU2luZ2xlKHJlbmRlci5nZXRHZW9qc29uT2JqZWN0KCksIHN0eWxlT3B0aW9uLnRoZW1hdGljRmllbGQsIHN0eWxlT3B0aW9uLmNvbG9ySW5kZXgpO1xyXG4gICAgcmVuZGVyT3B0aW9uLnRoZW1hdGljQ29sb3JzID0gc3R5bGVPcHRpb24udGhlbWF0aWNDb2xvcnM7XHJcbiAgfSBlbHNlIGlmIChyZW5kZXJUeXBlID09IFwic2VjdGlvblwiKSB7XHJcbiAgICBzdHlsZU9wdGlvbi50aGVtYXRpY0NvbG9ycyA9IEtRLkJ1aWxkZXIuUmVuZGVyU2hhcGUuZ2V0VGhlbWF0aWNGaWVsZENvbG9yc1NlY3Rpb24ocmVuZGVyLmdldEdlb2pzb25PYmplY3QoKSwgc3R5bGVPcHRpb24udGhlbWF0aWNGaWVsZCxcclxuICAgICAgc3R5bGVPcHRpb24uY29sb3JJbmRleCwgc3R5bGVPcHRpb24uc2VjdGlvbk1ldGhvZCwgc3R5bGVPcHRpb24uc2VjdGlvbkNvdW50KTtcclxuXHJcbiAgICByZW5kZXJPcHRpb24udGhlbWF0aWNDb2xvcnMgPSBzdHlsZU9wdGlvbi50aGVtYXRpY0NvbG9ycztcclxuICB9IGVsc2UgaWYgKHJlbmRlclR5cGUgPT0gXCJoZWF0bWFwXCIpIHtcclxuICAgIG9wdGlvbnMuZ3JhZGllbnQgPSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmhlYXRtYXBDb2xvclJhbXBbb3B0aW9ucy5jb2xvckluZGV4XVxyXG4gIH1cclxufVxyXG5cclxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKmRvbXMgaW5pdCoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xyXG5cclxuZnVuY3Rpb24gaW5pdENvbW1vblVpcygpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJlZGl0b3ItY29tbW9uLXVpc1wiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBlZGl0b3JfY29tbW9uX3VpcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBlZGl0b3JfY29tbW9uX3Vpcy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPui/h+a7pOaYvuekujwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImR2LWlucHV0XCIgcGxhY2Vob2xkZXI9XCLkvovlpoI6IGlkID4gNVwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMuZmlsdGVyXCIvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7moIfnrb7lrZfmrrU8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwibGFiZWwtZmllbGQtbGlzdFwiIGRhdGEtYmluZD1cInNvdXJjZTogbGFiZWxGaWVsZERyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy5sYWJlbEZpZWxkXCI+PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zdHlsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5qCH562+6aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3JzLXBpY2tlci1pbnB1dFwiIGRhdGEtcm9sZT1cImNvbG9ycGlja2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy5sYWJlbENvbG9yXCIvPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7moIfnrb7lrZfkvZM8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwibGFiZWwtZm9udC1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiBsYWJlbEZvbnREcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMubGFiZWxGb250TmFtZVwiPiA8L3NlbGVjdD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChlZGl0b3JfY29tbW9uX3Vpcyk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnnrKblj7dcclxuZnVuY3Rpb24gaW5pdFN5bWJvbFR5cGVDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3ltYm9sLXR5cGUtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nrKblj7fnsbvlnos8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJwb2ludC1zeW1ib2wgcG9pbnQtc3ltYm9sLXN2ZyBzeW1ib2wtYWN0aXZlXCI+55+i6YePPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwicG9pbnQtc3ltYm9sIHBvaW50LXN5bWJvbC1pbWdcIj7lm77niYc8L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54K55qC35byPXHJcbmZ1bmN0aW9uIGluaXRQb2ludFN5dGxlQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LXN0eWxlLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+54K55qC35byPPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiZGVmYXVsdC1wb2ludC1pY29uXCI+XHJcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbmZvbnRcIiBkYXRhLWJpbmQ9XCJodG1sOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby51bmljb2RlXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaWNvbi1jb250YWluZXJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgZGF0YS1iaW5kPVwic3R5bGU6IHsgYmFja2dyb3VuZEltYWdlOiAgc3R5bGVPcHRpb25zLmltYWdlSW5mby51cmwgfVwiPjwvZGl2PlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwic3ltYm9scy1jb250YWluZXJcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW1ib2xzLWJveFwiPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG5cclxuICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5kZWZhdWx0LXBvaW50LWljb24gZGl2XCIpLmVxKDApLmJpbmQoe1xyXG4gICAgICAvLyDorr7nva7lrZfkvZPlm77moIflj5jljJbnmoTlk43lupTlh73mlbBcclxuICAgICAgJ2ljb25fc2VsZWN0ZWQnOiBmdW5jdGlvbiAoZSwgZGF0YSkgeyAgICAgLy8g6K6+572u5a2X5L2T5Zu+5qCH5Y+Y5YyW55qE5ZON5bqU5Ye95pWwXHJcbiAgICAgICAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICAgICAgICBsZXQgcmVuZGVyTW9kZWwgPSBidWlsZFByb2plY3QuZ2V0SW5mbygncmVuZGVyX21vZGVsJyk7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSByZW5kZXJNb2RlbC5zdHlsZU9wdGlvbnM7XHJcblxyXG4gICAgICAgIG9wdGlvbnMudmVjdG9ySW5mby51bmljb2RlID0gZGF0YTtcclxuICAgICAgICAkKHRoaXMpLmh0bWwoZGF0YSk7XHJcblxyXG4gICAgICAgICQodGhpcykuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpLnNpYmxpbmdzKCkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3N5bWJvbF90eXBlX3ZlY3Rvcic6IGZ1bmN0aW9uICgpIHsgICAgICAvLyDnrKblj7fnsbvlnovmlLnlj5hcclxuICAgICAgICAkKHRoaXMpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKS5zaWJsaW5ncygpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICB9LFxyXG4gICAgfSlcclxuXHJcbiAgICAkKGNvbnRhaW5lcnNbaV0pLmZpbmQoXCIuZGVmYXVsdC1wb2ludC1pY29uIGRpdlwiKS5lcSgxKS5iaW5kKHtcclxuICAgICAgJ2ljb25fc2VsZWN0ZWQnOiBmdW5jdGlvbiAoZSwgZGF0YSkgeyAgICAvLyDorr7nva7lrZfkvZPlm77moIflj5jljJbnmoTlk43lupTlh73mlbBcclxuICAgICAgICBsZXQgYnVpbGRQcm9qZWN0ID0gS1EuQnVpbGRlci5CdWlsZGVyUHJvamVjdC5nZXRJbnN0YW5jZSgpO1xyXG4gICAgICAgIGxldCByZW5kZXJNb2RlbCA9IGJ1aWxkUHJvamVjdC5nZXRJbmZvKCdyZW5kZXJfbW9kZWwnKTtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHJlbmRlck1vZGVsLnN0eWxlT3B0aW9ucztcclxuXHJcbiAgICAgICAgb3B0aW9ucy5pbWFnZUluZm8udXJsID0gXCJ1cmwoLi9pbWFnZXMvcG9pbnRfaW1hZ2VzL0lNQUdFXCIgKyBkYXRhLnJvdyArIFwiLVwiICsgZGF0YS5jb2wgKyBcIi5wbmcpXCI7XHJcbiAgICAgICAgJCh0aGlzKS5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIsIG9wdGlvbnMuaW1hZ2VJbmZvLnVybCk7XHJcblxyXG4gICAgICAgICQodGhpcykuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpLnNpYmxpbmdzKCkuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcblxyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICB9LFxyXG5cclxuICAgICAgJ3N5bWJvbF90eXBlX2ltYWdlJzogZnVuY3Rpb24gKCkgeyAgICAvLyDnrKblj7fnsbvlnovmlLnlj5hcclxuICAgICAgICAkKHRoaXMpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKS5zaWJsaW5ncygpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICB9LFxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIC8vIOeCueWHu+eCueagt+W8j+aMiemSriDmmL7npLrngrnmoLflvI/pnaLmnb9cclxuICAkKFwiLmRlZmF1bHQtcG9pbnQtaWNvblwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAkKHRoaXMpLm5leHQoKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgfSk7XHJcblxyXG4gIC8vIOeCueWHu+WFtuS7luS9jee9riDpmpDol4/ngrnmoLflvI/pnaLmnb9cclxuICAkKFwiYm9keVwiKS5jbGljayhmdW5jdGlvbiAoZSkge1xyXG4gICAgbGV0ICRwYXJlbnQgPSAkKGUudGFyZ2V0KS5wYXJlbnQoKTtcclxuICAgIGlmICghJHBhcmVudC5oYXNDbGFzcyhcImRlZmF1bHQtcG9pbnQtaWNvblwiKSkge1xyXG4gICAgICAkKFwiLnN5bWJvbHMtY29udGFpbmVyXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuXHJcbi8vIOWhq+WFheeCueespuWPtyBzdmfnmoTnrKblj7fpnaLmnb9cclxuZnVuY3Rpb24gZmlsbFN2Z1N5bWJvbHMoKSB7XHJcbiAgLy8g6aaW5YWI5riF56m66Z2i5p2/XHJcbiAgJChcIi5zeW1ib2xzLWJveFwiKS5lbXB0eSgpO1xyXG5cclxuICBsZXQgaWNvbnNfdW5pY29kZSA9IFtcclxuICAgIFwiJiN4ZTYxNFwiLCBcIiYjeGU2ZTNcIiwgXCImI3hlNmFkXCIsIFwiJiN4ZTYyOVwiLCBcIiYjeGU2MTNcIiwgXCImI3hlNjZiXCIsXHJcbiAgICBcIiYjeGU2NWFcIiwgXCImI3hlNzVmXCIsIFwiJiN4ZTY1NlwiLCBcIiYjeGU2NzlcIiwgXCImI3hlNjU3XCIsIFwiJiN4ZTY1MlwiLFxyXG4gICAgXCImI3hlNjE1XCIsIFwiJiN4ZTY3ZVwiLCBcIiYjeGU2MjBcIiwgXCImI3hlN2RmXCIsIFwiJiN4ZTY2N1wiLCBcIiYjeGU2NjZcIixcclxuICAgIFwiJiN4ZTY0MlwiLCBcIiYjeGU2NDBcIiwgXCImI3hlNjI4XCIsIFwiJiN4ZTY3YlwiLCBcIiYjeGVhYzlcIiwgXCImI3hlNjNmXCIsXHJcbiAgICBcIiYjeGU2MWFcIiwgXCImI3hlNjRkXCIsIFwiJiN4ZTYyNlwiLCBcIiYjeGU2Y2JcIiwgXCImI3hlNmI1XCIsIFwiJiN4ZTY4OVwiLFxyXG4gICAgXCImI3hlNmY2XCIsIFwiJiN4ZTcxY1wiLCBcIiYjeGU2NDZcIiwgXCImI3hlNmM3XCIsIFwiJiN4ZTY3MVwiLCBcIiYjeGU2NmZcIixcclxuICAgIFwiJiN4ZTY0MVwiLCBcIiYjeGU2M2VcIiwgXCImI3hlNjNhXCIsIFwiJiN4ZTY3NlwiLCBcIiYjeGU3MzlcIiwgXCImI3hlNjUxXCIsXHJcbiAgICBcIiYjeGU2NjNcIiwgXCImI3hlNjdhXCIsIFwiJiN4ZTY3N1wiLCBcIiYjeGU2MTJcIiwgXCImI3hlODFmXCIsIFwiJiN4ZTY1Y1wiLFxyXG4gICAgXCImI3hlNjY0XCIsIFwiJiN4ZTY2NVwiLCBcIiYjeGU2MWZcIiwgXCImI3hlNjIzXCIsIFwiJiN4ZTYyNFwiLCBcIiYjeGU2MmFcIixcclxuICAgIFwiJiN4ZTYyYlwiLCBcIiYjeGU2MTFcIiwgXCImI3hlNjZkXCIsIFwiJiN4ZTY2MFwiLCBcIiYjeGU2NGNcIiwgXCImI3hlNjMwXCIsXHJcbiAgXVxyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyArK2kpIHtcclxuICAgIGxldCAkcm93ID0gJCgnPGRpdiBjbGFzcz1cInN5bWJvbC1yb3dcIj48L2Rpdj4nKTtcclxuXHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IDY7ICsraikge1xyXG4gICAgICBsZXQgJGNvbHVtbiA9ICQoJzxkaXYgY2xhc3M9XCJpY29uZm9udFwiPjwvZGl2PicpO1xyXG4gICAgICAkY29sdW1uLmh0bWwoaWNvbnNfdW5pY29kZVtpICogNiArIGpdKTtcclxuXHJcbiAgICAgICRjb2x1bW4uY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuY2xvc2VzdChcIi5lZGl0b3ItdG9vbFwiKS5maW5kKFwiLmRlZmF1bHQtcG9pbnQtaWNvbiBkaXZcIikuZXEoMCkudHJpZ2dlcignaWNvbl9zZWxlY3RlZCcsIGljb25zX3VuaWNvZGVbaSAqIDYgKyBqXSk7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICAkcm93LmFwcGVuZCgkY29sdW1uKTtcclxuICAgIH1cclxuXHJcbiAgICAkKFwiLnN5bWJvbHMtYm94XCIpLmFwcGVuZCgkcm93KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOWhq+WFheeCueespuWPtyBpbWFnZeeahOespuWPt+mdouadv1xyXG5mdW5jdGlvbiBmaWxsSW1hZ2VTeW1ib2xzKCkge1xyXG4gIC8vIOmmluWFiOa4heepuumdouadv1xyXG4gICQoXCIuc3ltYm9scy1ib3hcIikuZW1wdHkoKTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTA7ICsraSkge1xyXG4gICAgbGV0ICRyb3cgPSAkKCc8ZGl2IGNsYXNzPVwic3ltYm9sLXJvd1wiPjwvZGl2PicpO1xyXG5cclxuICAgIGZvciAobGV0IGogPSAxOyBqIDw9IDY7ICsraikge1xyXG4gICAgICBsZXQgc3R5bGUgPSBcImJhY2tncm91bmQtaW1hZ2U6IHVybCguL2ltYWdlcy9wb2ludF9pbWFnZXMvSU1BR0VcIiArIGkgKyBcIi1cIiArIGogKyBcIi5wbmcpO1wiO1xyXG4gICAgICBsZXQgJGNvbHVtbiA9ICQoJzxkaXYgY2xhc3M9XCJwb2ludC1pbWdcIiA+PGRpdiBzdHlsZT1cIicgKyBzdHlsZSArICdcIj48L2Rpdj48L2Rpdj4nKTtcclxuXHJcbiAgICAgICRjb2x1bW4uY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQodGhpcykuY2xvc2VzdChcIi5lZGl0b3ItdG9vbFwiKS5maW5kKFwiLmRlZmF1bHQtcG9pbnQtaWNvbiBkaXZcIikuZXEoMSkudHJpZ2dlcignaWNvbl9zZWxlY3RlZCcsIHtcclxuICAgICAgICAgIHJvdzogaSxcclxuICAgICAgICAgIGNvbDogalxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KVxyXG5cclxuICAgICAgJHJvdy5hcHBlbmQoJGNvbHVtbik7XHJcbiAgICB9XHJcblxyXG4gICAgJChcIi5zeW1ib2xzLWJveFwiKS5hcHBlbmQoJHJvdyk7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnpopzoibJcclxuZnVuY3Rpb24gaW5pdFBvaW50Q29sb3JDb250YWluZXIoKSB7XHJcbiAgbGV0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtY29sb3ItY29udGFpbmVyXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+54K56aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjb2xvcnMtcGlja2VyLWlucHV0XCIgZGF0YS1yb2xlPVwiY29sb3JwaWNrZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLnZlY3RvckluZm8uZmlsbENvbG9yXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueiJsuWdl1xyXG5mdW5jdGlvbiBpbml0UG9pbnRSYW1wQ29sb3JDb250YWluZXIoKSB7XHJcbiAgbGV0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtcmFtcC1jb2xvci1jb250YWluZXJcIik7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7ngrnpopzoibI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInBvaW50LXJhbXAtY29sb3JcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IHJhbXBDb2xvckRyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLmNvbG9ySW5kZXhcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeDreWKm+WbviDoibLlnZdcclxuZnVuY3Rpb24gaW5pdEhlYXRtYXBSYW1wQ29sb3JDb250YWluZXIoKSB7XHJcbiAgbGV0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGVhdG1hcC1yYW1wLWNvbG9yLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPueDreeCueminOiJsjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiaGVhdG1hcC1yYW1wLWNvbG9yXCIgZGF0YS1iaW5kPVwic291cmNlOiBoZWF0bWFwUmFtcENvbG9yRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLmNvbG9ySW5kZXhcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeDreWKm+WbviDmnYPph43lrZfmrrVcclxuZnVuY3Rpb24gaW5pdEhlYXRtYXBXZWlnaHRGaWVsZENvbnRhaW5lcigpIHtcclxuICBsZXQgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJoZWF0bWFwLXdlaWdodC1maWVsZC1jb250YWluZXJcIik7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBsZXQgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuadg+mHjeWtl+autTwvZGl2PlxyXG4gICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwid2VpZ2h0LWZpZWxkLWxpc3RcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IHdlaWdodEZpZWxkRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLndlaWdodEZpZWxkXCI+PC9zZWxlY3Q+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeDreWKm+WbviDov4fmu6TmmL7npLpcclxuZnVuY3Rpb24gaW5pdEhlYXRtYXBGaWx0ZXJDb250YWluZXIoKSB7XHJcbiAgbGV0IGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiaGVhdG1hcC1maWx0ZXItY29udGFpbmVyXCIpO1xyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7ov4fmu6TmmL7npLo8L2Rpdj5cclxuICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiZHYtaW5wdXRcIiBwbGFjZWhvbGRlcj1cIuS+i+WmgjogaWQgPiA1XCIgZGF0YS1iaW5kPVwidmFsdWU6IHN0eWxlT3B0aW9ucy5maWx0ZXJcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueWkp+Wwj1xyXG5mdW5jdGlvbiBpbml0UG9pbnRTaXplQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LXNpemUtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+54K55aSn5bCPPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwicG9pbnQtc2l6ZS1zaWxkZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogcG9pbnRTaXplXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBwb2ludFNpemVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj5weDwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueS4jemAj+aYjuW6plxyXG5mdW5jdGlvbiBpbml0UG9pbnRPcGFjaXR5Q29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvaW50LW9wYWNpdHktY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+54K55LiN6YCP5piO5bqmPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWUtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwib3BhY2l0eS1zbGlkZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogcG9pbnRPcGFjaXR5XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBwb2ludE9wYWNpdHlcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj4lPC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja7nmoQg57q/6aKc6ImyXHJcbmZ1bmN0aW9uIGluaXRQb2ludExpbmVDb2xvckNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1saW5lLWNvbG9yLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPue6v+minOiJsjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwiY29sb3JzLXBpY2tlci1pbnB1dFwiIGRhdGEtcm9sZT1cImNvbG9ycGlja2VyXCJcclxuICAgICAgICAgICAgICAgICAgICAgICBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLnZlY3RvckluZm8uc3Ryb2tlQ29sb3JcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54K55pWw5o2u55qEIOe6v+WuveW6plxyXG5mdW5jdGlvbiBpbml0UG9pbnRMaW5lV2lkdGhDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtbGluZS13aWR0aC1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nur/lrr3luqY8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJsaW5lLXdpZHRoLXNpbGRlclwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby5zdHJva2VXaWR0aFwiLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImJvcmRlcjogbm9uZTtcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLnZlY3RvckluZm8uc3Ryb2tlV2lkdGhcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj5weDwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueaVsOaNrueahCDnur/kuI3pgI/mmI7luqZcclxuZnVuY3Rpb24gaW5pdFBvaW50TGluZU9wYWNpdHlDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtbGluZS1vcGFjaXR5LWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPue6v+S4jemAj+aYjuW6pjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIm9wYWNpdHktc2xpZGVyXCIgZGF0YS1iaW5kPVwidmFsdWU6IGxpbmVPcGFjaXR5XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBsaW5lT3BhY2l0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eXBlPVwicGFkZGluZy1yaWdodDogNXB4O1wiPiU8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueaVsOaNrueahOS4k+mimOWtl+autVxyXG5mdW5jdGlvbiBpbml0UG9pbnRTcGVjaWFsRmllbGRDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9pbnQtc3BlY2lhbC1maWVsZC1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5LiT6aKY5a2X5q61PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwic3BlY2lhbC1maWVsZC1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiBzcGVjaWFsRmllbGREcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMudmVjdG9ySW5mby50aGVtYXRpY0ZpZWxkXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueaVsOaNrueahOWIhuauteaWueazlVxyXG5mdW5jdGlvbiBpbml0UG9pbnRTdWJzZWN0aW9uVHlwZUNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1zdWJzZWN0aW9uLXR5cGUtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuWIhuauteaWueazlTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInN1Yi1zZWN0aW9uLW1ldGhvZC1saXN0XCIgZGF0YS1iaW5kPVwic291cmNlOiBzdWJzZWN0aW9uVHlwZURyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLnNlY3Rpb25NZXRob2RcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g54Ot5Yqb5Zu+55qE54Ot54K55Y2K5b6EXHJcbmZ1bmN0aW9uIGluaXRIZWF0bWFwUmFkaXVzQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImhlYXRtYXAtcmFkaXVzLWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPueDreeCueWNiuW+hDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImhlYXRtYXAtcmFkaXVzLXNpbGRlclwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMucmFkaXVzXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMucmFkaXVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5cGU9XCJwYWRkaW5nLXJpZ2h0OiA1cHg7XCI+cHg8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja7nmoTliIbmrrXkuKrmlbBcclxuZnVuY3Rpb24gaW5pdFBvaW50U3Vic2VjdGlvbk51bWJlckNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2ludC1zdWJzZWN0aW9uLW51bWJlci1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5YiG5q615Liq5pWwPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwic3ViLXNlY3Rpb24tY291bnQtbGlzdFwiIGRhdGEtYmluZD1cInNvdXJjZTogc3Vic2VjdGlvbk51bWJlckRyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy52ZWN0b3JJbmZvLnNlY3Rpb25Db3VudFwiLz5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOeCueaVsOaNriDmoIfnrb7kvY3nva5cclxuZnVuY3Rpb24gaW5pdExhYmVsRGlyZWN0aW9uQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxhYmVsLWRpcmVjdGlvbi1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5qCH562+5L2N572uPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwibGFiZWwtZGlyZWN0aW9uLWxpc3RcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IGxhYmVsRGlyZWN0aW9uRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLmxhYmVsUG9zaXRpb25cIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDngrnmlbDmja4g5qCH562+5YGP56e7XHJcbmZ1bmN0aW9uIGluaXRMYWJlbE9mZnNldENvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsYWJlbC1vZmZzZXQtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuagh+etvuWBj+enuzwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImxhYmVsLW9mZnNldC1zaWxkZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLmxhYmVsTWFya2VyUGFkZGluZ1wiLz5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImJvcmRlcjogbm9uZTtcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogc3R5bGVPcHRpb25zLmxhYmVsTWFya2VyUGFkZGluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eXBlPVwicGFkZGluZy1yaWdodDogNXB4O1wiPnB4PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDnur/popzoibJcclxuZnVuY3Rpb24gaW5pdExpbmVDb2xvckNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsaW5lLWxpbmUtY29sb3ItY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+57q/6aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJjb2xvcnMtcGlja2VyLWlucHV0XCIgZGF0YS1yb2xlPVwiY29sb3JwaWNrZXJcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMubGluZUNvbG9yXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOe6v+agt+W8j1xyXG5mdW5jdGlvbiBpbml0TGluZVN0eWxlTGlzdENvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsaW5lLXN0eWxlLWxpc3QtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+57q/5qC35byPPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJsaW5lLXN0eWxlLWxpc3RcIiBzdHlsZT1cIndpZHRoOiAxNTJweDsgaGVpZ2h0OiAyOHB4O1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgZGF0YS1iaW5kPVwic291cmNlOiBsaW5lU3R5bGVEcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMubGluZVN0eWxlXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOe6v+WuveW6plxyXG5mdW5jdGlvbiBpbml0TGluZVdpZHRoQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxpbmUtbGluZS13aWR0aC1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7nur/lrr3luqY8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJsaW5lLXdpZHRoLXNpbGRlclwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMubGluZVdpZHRoXCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMubGluZVdpZHRoXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgc3R5cGU9XCJwYWRkaW5nLXJpZ2h0OiA1cHg7XCI+cHg8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG4vLyDnur/kuI3pgI/mmI7luqZcclxuZnVuY3Rpb24gaW5pdExpbmVPcGFjaXR5Q29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImxpbmUtbGluZS1vcGFjaXR5LWNvbnRhaW5lclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPue6v+S4jemAj+aYjuW6pjwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cIm9wYWNpdHktc2xpZGVyXCIgZGF0YS1iaW5kPVwidmFsdWU6IGxpbmVPcGFjaXR5XCIvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBsaW5lT3BhY2l0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIHN0eXBlPVwicGFkZGluZy1yaWdodDogNXB4O1wiPiU8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbi8vIOe6v+a4kOWPmOminOiJslxyXG5mdW5jdGlvbiBpbml0TGluZVJhbXBDb2xvckNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJsaW5lLXJhbXAtY29sb3ItY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+57q/6aKc6ImyPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3M9XCJsaW5lLXJhbXAtY29sb3JcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgIGRhdGEtYmluZD1cInNvdXJjZTogbGluZVJhbXBDb2xvckRyb3BEb3duTGlzdCwgdmFsdWU6IHN0eWxlT3B0aW9ucy5jb2xvckluZGV4XCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgICAgXHJcbiAgICAgICAgICAgIGA7XHJcbiAgICBjb250YWluZXJzW2ldLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBpbml0U3BlY2lhbEZpZWxkQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInNwZWNpYWwtZmllbGQtY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuS4k+mimOWtl+autTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInNwZWNpYWwtZmllbGQtbGlzdFwiIGRhdGEtYmluZD1cInNvdXJjZTogc3BlY2lhbEZpZWxkRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLnRoZW1hdGljRmllbGRcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFN1YnNlY3Rpb25UeXBlQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInN1YnNlY3Rpb24tdHlwZS1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBsYWJsZS1zZWxlY3RcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+5YiG5q615pa55rOVPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzPVwic3ViLXNlY3Rpb24tbWV0aG9kLWxpc3RcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IHN1YnNlY3Rpb25UeXBlRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLnNlY3Rpb25NZXRob2RcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdFN1YnNlY3Rpb25OdW1iZXJDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwic3Vic2VjdGlvbi1udW1iZXItY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2wgbGFibGUtc2VsZWN0XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGV4dFwiPuWIhuauteS4quaVsDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzcz1cInN1Yi1zZWN0aW9uLWNvdW50LWxpc3RcIiBkYXRhLWJpbmQ9XCJzb3VyY2U6IHN1YnNlY3Rpb25OdW1iZXJEcm9wRG93bkxpc3QsIHZhbHVlOiBzdHlsZU9wdGlvbnMuc2VjdGlvbkNvdW50XCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIFxyXG4gICAgICAgICAgICBgO1xyXG4gICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gIH1cclxufVxyXG5cclxuLy8g5Yid5aeL5YyW6Z2i6aKc6ImyXHJcbmZ1bmN0aW9uIGluaXRQb2x5Z29uUmFtcENvbG9yQ29udGFpbmVyKCkge1xyXG4gIHZhciBjb250YWluZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcInBvbHlnb24tcmFtcC1jb2xvci1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7pnaLpopzoibI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cInBvbHlnb24tcmFtcC1jb2xvclwiIGRhdGEtYmluZD1cInNvdXJjZTogcmFtcENvbG9yRHJvcERvd25MaXN0LCB2YWx1ZTogc3R5bGVPcHRpb25zLmNvbG9ySW5kZXhcIi8+XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRQb2x5Z29uQ29sb3JDb250YWluZXIoKSB7XHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwicG9seWdvbi1jb2xvci1jb250YWluZXJcIik7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb250YWluZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlZGl0b3ItdG9vbCBwb2ludC1jb2xvclwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRleHRcIj7pnaLpopzoibI8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzcz1cImNvbG9ycy1waWNrZXItaW5wdXRcIiBkYXRhLXJvbGU9XCJjb2xvcnBpY2tlclwiIGRhdGEtYmluZD1cInZhbHVlOiBzdHlsZU9wdGlvbnMuZmlsbENvbG9yXCIvPlxyXG4gICAgICAgICAgICA8L2Rpdj4gICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRQb2x5Z29uT3BhY2l0eUNvbnRhaW5lcigpIHtcclxuICB2YXIgY29udGFpbmVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJwb2x5Z29uLW9wYWNpdHktY29udGFpbmVyXCIpO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29udGFpbmVycy5sZW5ndGg7IGkrKykge1xyXG4gICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZWRpdG9yLXRvb2xcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+6Z2i5LiN6YCP5piO5bqmPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ2YWx1ZS1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzPVwib3BhY2l0eS1zbGlkZXJcIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogZmlsbE9wYWNpdHlcIi8+XHJcbiAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiYm9yZGVyOiBub25lO1wiIGRhdGEtYmluZD1cInZhbHVlOiBmaWxsT3BhY2l0eVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICA8cCBzdHlwZT1cInBhZGRpbmctcmlnaHQ6IDVweDtcIj4lPC9wPlxyXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+ICAgICAgICAgICBcclxuICAgICAgICAgICAgYDtcclxuICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICB9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9nZXRDb2xvckZpZWxkc0FycmF5KGZlYXR1cmVUeXBlLCByZW5kZXJUeXBlKSB7XHJcbiAgbGV0IGJ1aWxkUHJvamVjdCA9IEtRLkJ1aWxkZXIuQnVpbGRlclByb2plY3QuZ2V0SW5zdGFuY2UoKTtcclxuICBsZXQgbGF5ZXIgPSBidWlsZFByb2plY3Quc2V0dGluZy5sYXllcjsgLy8g5b2T5YmN5r+A5rS755qEbGF5ZXJcclxuICBsZXQgcmVuZGVyID0gbGF5ZXIucmVuZGVyO1xyXG4gIGNvbnNvbGUubG9nKCdyZW5kZXI6ICcsIHJlbmRlcik7XHJcblxyXG4gIGlmIChyZW5kZXJUeXBlID09PSBcInNpbmdsZVwiKSB7XHJcbiAgICBpZiAoZmVhdHVyZVR5cGUgPT0gJ3BvaW50Jykge1xyXG4gICAgICByZXR1cm4gcmVuZGVyLmdldCgnc2luZ2xlJykub3B0aW9ucy52ZWN0b3JJbmZvLnRoZW1hdGljQ29sb3JzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHJlbmRlci5nZXQoJ3NpbmdsZScpLm9wdGlvbnMudGhlbWF0aWNDb2xvcnM7XHJcbiAgICB9XHJcbiAgfSBlbHNlIGlmIChyZW5kZXJUeXBlID09PSBcInNlY3Rpb25cIikge1xyXG4gICAgaWYgKGZlYXR1cmVUeXBlID09ICdwb2ludCcpIHtcclxuICAgICAgcmV0dXJuIHJlbmRlci5nZXQoJ3NlY3Rpb24nKS5vcHRpb25zLnZlY3RvckluZm8udGhlbWF0aWNDb2xvcnMuY29sb3JzO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHJlbmRlci5nZXQoJ3NlY3Rpb24nKS5vcHRpb25zLnRoZW1hdGljQ29sb3JzLmNvbG9ycztcclxuICAgIH1cclxuICB9IGVsc2UgaWYgKHJlbmRlclR5cGUgPT09IFwiaGVhdG1hcFwiKSB7XHJcbiAgICByZXR1cm4gcmVuZGVyLmdldCgnaGVhdG1hcCcpLm9wdGlvbnMuZ3JhZGllbnQ7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBfZ2V0UmFuZ2VBcnJheShmZWF0dXJlVHlwZSkge1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgbGV0IHJlbmRlciA9IGxheWVyLnJlbmRlcjtcclxuXHJcbiAgaWYgKGZlYXR1cmVUeXBlID09ICdwb2ludCcpIHtcclxuICAgIHJldHVybiByZW5kZXIuZ2V0KCdzZWN0aW9uJykub3B0aW9ucy52ZWN0b3JJbmZvLnRoZW1hdGljQ29sb3JzLmJyZWFrc0RhdGE7XHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiByZW5kZXIuZ2V0KCdzZWN0aW9uJykub3B0aW9ucy50aGVtYXRpY0NvbG9ycy5icmVha3NEYXRhO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX2luaXRGaWVsZENvbG9yQ29udGFpbmVyKCkge1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgbGV0IGZlYXR1cmVUeXBlID0gbGF5ZXIub3B0aW9ucy5mZWF0dXJlVHlwZTtcclxuXHJcbiAgLy8g5qC55o2u54K544CB57q/44CB6Z2i5p2l6L+b6KGM5YiS5YiG5Yid5aeL5YyWXHJcbiAgdmFyIGNvbnRhaW5lcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGZlYXR1cmVUeXBlICsgXCIgZWRpdG9yLWZpZWxkcy1jb2xvclwiKTtcclxuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbnRhaW5lcnMubGVuZ3RoOyBpKyspIHtcclxuICAgIC8vIOWIpOaWreW9k+WJjeiKgueCueaYr+WQpuWxleW8gFxyXG4gICAgbGV0IGV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgJHN3aXRjaE5vZGUgPSAkKGNvbnRhaW5lcnNbaV0pLmZpbmQoXCIuZmllbGRzLWRpdi1zd2l0Y2hcIik7XHJcbiAgICBpZiAoJHN3aXRjaE5vZGUubGVuZ3RoICE9IDAgJiYgISRzd2l0Y2hOb2RlLmhhc0NsYXNzKFwic3RhdGUtY2xvc2VcIikpIHtcclxuICAgICAgZXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIOa4heepuu+8jOmYsuatoumHjeWkjea3u+WKoFxyXG4gICAgJChjb250YWluZXJzW2ldKS5lbXB0eSgpO1xyXG5cclxuICAgIHZhciBodG1sID0gXCJcIjtcclxuICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgdmFyIHNoYXBlQ2xhc3MgPSBcImljb24tc2hhcGUtXCIgKyBmZWF0dXJlVHlwZTtcclxuXHJcbiAgICAvLyDljZXlgLzmuLLmn5PmqKHlvI9cclxuICAgIGlmIChjb250YWluZXJzW2ldLmNsYXNzTGlzdC5jb250YWlucyhcInNpbmdsZVwiKSkge1xyXG4gICAgICAvLyDmt7vliqB0aXRsZVxyXG4gICAgICBodG1sICs9IGA8ZGl2IGNsYXNzPVwidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICA8c3Bhbj7oh6rlrprkuYnljZXlgLw8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1bmlxdWUtc2hvd1wiPjxzcGFuPuWxleW8gDwvc3Bhbj48aSBjbGFzcz1cImZhIGZhLXBsdXMtc3F1YXJlLW8gZmllbGRzLWRpdi1zd2l0Y2ggc3RhdGUtY2xvc2VcIj48L2k+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmaWVsZHMtY29udGFpbmVyXCIgc3R5bGU9XCJtaW4taGVpZ2h0OiAyNDRweDsgZGlzcGxheTogbm9uZTtcIj5gO1xyXG5cclxuICAgICAgLy8g5b6X5Yiw6aKc6Imy55qE5pWw57uEXHJcbiAgICAgIGxldCBjb2xvckZpZWxkc0FycmF5ID0gX2dldENvbG9yRmllbGRzQXJyYXkoZmVhdHVyZVR5cGUsIFwic2luZ2xlXCIpO1xyXG5cclxuICAgICAgLy8g6YGN5Y6G6aKc6Imy5pWw57uE77yM5re75Yqg5ZCE6KGM5o6n5Lu2XHJcbiAgICAgIGNvbG9yRmllbGRzQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGtleSkge1xyXG4gICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJmaWVsZHMtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uIGljb25mb250IGAgKyBzaGFwZUNsYXNzICsgYCBjb2xvcnMtcGlja2VyXCIgc3R5bGU9XCJjb2xvcjogYCArIHZhbHVlICsgYFwiPjxkaXYgY2xhc3M9XCJzaW5nbGUtY29sb3JzLXBpY2tlclwiIHZhbHVlPWAgKyB2YWx1ZSArIGA+PC9kaXY+PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPmA7XHJcbiAgICAgICAgaHRtbCArPSBrZXkgKyBgPC9zcGFuPjwvZGl2PmA7XHJcbiAgICAgIH0pO1xyXG5cclxuICAgICAgaHRtbCArPSBgPC9kaXY+YDtcclxuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIH0gZWxzZSBpZiAoY29udGFpbmVyc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoXCJzZWN0aW9uXCIpKSB7XHJcbiAgICAgIC8vIOa3u+WKoHRpdGxlXHJcbiAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgIDxzcGFuPuiHquWumuS5ieWIhuautTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVuaXF1ZS1zaG93XCI+PHNwYW4+5bGV5byAPC9zcGFuPjxpIGNsYXNzPVwiZmEgZmEtcGx1cy1zcXVhcmUtbyBmaWVsZHMtZGl2LXN3aXRjaCBzdGF0ZS1jbG9zZVwiPjwvaT48L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkcy1jb250YWluZXJcIiBzdHlsZT1cIm1pbi1oZWlnaHQ6IDI0NHB4OyBkaXNwbGF5OiBub25lO1wiPmA7XHJcblxyXG4gICAgICAvLyDlvpfliLDpopzoibLmlbDnu4TjgIHojIPlm7TmlbDnu4RcclxuICAgICAgbGV0IGNvbG9yRmllbGRzQXJyYXkgPSBfZ2V0Q29sb3JGaWVsZHNBcnJheShmZWF0dXJlVHlwZSwgXCJzZWN0aW9uXCIpO1xyXG4gICAgICBsZXQgcmFuZ2VBcnJheSA9IF9nZXRSYW5nZUFycmF5KGZlYXR1cmVUeXBlKTtcclxuXHJcbiAgICAgIC8vIOmBjeWOhuminOiJsuaVsOe7hO+8jOa3u+WKoOWQhOihjOaOp+S7tlxyXG4gICAgICBjb2xvckZpZWxkc0FycmF5LmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xyXG4gICAgICAgIGh0bWwgKz0gYDxkaXYgY2xhc3M9XCJmaWVsZHMtaXRlbVwiIGRhdGEtaW5kZXg9YCArIGluZGV4ICsgYCA+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJpY29uIGljb25mb250IGAgKyBzaGFwZUNsYXNzICsgYCBjb2xvcnMtcGlja2VyXCIgc3R5bGU9XCJjb2xvcjogYCArIHZhbHVlICsgYFwiPjxkaXYgY2xhc3M9XCJzZWN0aW9uLWNvbG9ycy1waWNrZXJcIiB2YWx1ZT1gICsgdmFsdWUgKyBgPjwvZGl2Pjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmFuZ2UtdmFsdWVzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWUtc3RhcnRcIj48aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlwiIHZhbHVlPWAgKyByYW5nZUFycmF5W2luZGV4XSArIGA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidmFsdWUtaHJcIj4gLTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInZhbHVlLWVuZFwiPjxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiXCIgdmFsdWU9YCArIHJhbmdlQXJyYXlbaW5kZXggKyAxXSArIGA+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDwvZGl2PmA7XHJcbiAgICAgIH0pXHJcblxyXG4gICAgICBodG1sICs9IGA8L2Rpdj5gO1xyXG4gICAgICBkaXYuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgICAgY29udGFpbmVyc1tpXS5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgfSBlbHNlIGlmIChjb250YWluZXJzW2ldLmNsYXNzTGlzdC5jb250YWlucyhcImhlYXRtYXBcIikpIHtcclxuICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cImVkaXRvci1maWVsZHMtY29sb3JcIiA+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0aXRsZVwiPjxzcGFuPuiHquWumuS5ieminOiJsjwvc3Bhbj5cclxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidW5pcXVlLXNob3dcIj48c3Bhbj7lsZXlvIA8L3NwYW4+PGkgY2xhc3M9XCJmYSBmYS1wbHVzLXNxdWFyZS1vIGZpZWxkcy1kaXYtc3dpdGNoIHN0YXRlLWNsb3NlXCI+PC9pPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZpZWxkcy1jb250YWluZXJcIiBzdHlsZT1cIm1pbi1oZWlnaHQ6IDI0NHB4OyBkaXNwbGF5OiBub25lO1wiPmA7XHJcbiAgICAgIGxldCBjb2xvckZpZWxkc09iamVjdCA9IF9nZXRDb2xvckZpZWxkc0FycmF5KGZlYXR1cmVUeXBlLCBcImhlYXRtYXBcIik7XHJcbiAgICAgIGxldCBjb2xvckZpZWxkc0FycmF5ID0gT2JqZWN0LmtleXMoY29sb3JGaWVsZHNPYmplY3QpLnNvcnQoKTtcclxuICAgICAgY29sb3JGaWVsZHNBcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChrZXksIGluZGV4KSB7XHJcbiAgICAgICAgaHRtbCArPSBgPGRpdiBjbGFzcz1cImVkaXRvci10b29sXCIgZGF0YS1rZXk9YCArIGtleSArIGA+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0XCI+54Ot54K56aKc6ImyYCArIChOdW1iZXIoaW5kZXgpICsgMSkgKyBgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJoZWF0bWFwLWNvbG9ycy1waWNrZXJcIiBkYXRhLXJvbGU9XCJjb2xvcnBpY2tlclwiIHZhbHVlPVwiYCArIGNvbG9yRmllbGRzT2JqZWN0W2tleV0gKyBgXCI+PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgICAgfSlcclxuICAgICAgaHRtbCArPSBgPC9kaXY+YDtcclxuICAgICAgZGl2LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICAgIGNvbnRhaW5lcnNbaV0uYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDoh6rlrprkuYnljZXlgLzpopzoibLlj5jljJYsIGNvbG9ycGlja2Vy6aKc6Imy5Y+Y5YyW5ZCO5L+u5pS5c3BhbueahGNvbG9yXHJcbiAgICAkKGNvbnRhaW5lcnNbaV0pLmZpbmQoXCIuc2luZ2xlLWNvbG9ycy1waWNrZXJcIikua2VuZG9Db2xvclBpY2tlcih7XHJcbiAgICAgIGJ1dHRvbjogZmFsc2UsXHJcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgY29sb3IgPSBlLnZhbHVlO1xyXG4gICAgICAgIGxldCBrZXkgPSAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcIi5maWVsZHMtaXRlbVwiKS5maW5kKFwiLnZhbHVlXCIpLnRleHQoKTtcclxuICAgICAgICBsZXQgY2xhc3NMaXN0ID0gJCh0aGlzKVswXS5lbGVtZW50LnBhcmVudHMoXCIuZWRpdG9yLWZpZWxkcy1jb2xvclwiKVswXS5jbGFzc0xpc3Q7XHJcbiAgICAgICAgbGV0IGZlYXR1cmVUeXBlID0gY2xhc3NMaXN0WzFdO1xyXG4gICAgICAgIGxldCByZW5kZXJUeXBlID0gY2xhc3NMaXN0WzJdO1xyXG4gICAgICAgIGxldCB0aGVtYXRpY0NvbG9ycyA9IF9nZXRDb2xvckZpZWxkc0FycmF5KGZlYXR1cmVUeXBlLCByZW5kZXJUeXBlKTtcclxuXHJcbiAgICAgICAgLy8g5pS55Y+Y5o6n5Lu255qE6aKc6ImyXHJcbiAgICAgICAgJCh0aGlzKVswXS5lbGVtZW50LnBhcmVudHMoXCJzcGFuXCIpLmNzcyhcImNvbG9yXCIsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgLy8g5pS55Y+Y5LiT6aKY5a2X5q6155qE5aGr5YWF6Imy77yM5bm26L+b6KGM5riy5p+TXHJcbiAgICAgICAgaWYgKHRoZW1hdGljQ29sb3JzLmhhcyhrZXkpKSB7XHJcbiAgICAgICAgICB0aGVtYXRpY0NvbG9ycy5zZXQoa2V5LCBjb2xvcik7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGVtYXRpY0NvbG9ycy5oYXMoTnVtYmVyKGtleSkpKSB7XHJcbiAgICAgICAgICB0aGVtYXRpY0NvbG9ycy5zZXQoTnVtYmVyKGtleSksIGNvbG9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDoh6rlrprkuYnliIbmrrXpopzoibLlj5jljJYsIGNvbG9ycGlja2Vy6aKc6Imy5Y+Y5YyW5ZCO5L+u5pS5c3BhbueahGNvbG9yXHJcbiAgICAkKGNvbnRhaW5lcnNbaV0pLmZpbmQoXCIuc2VjdGlvbi1jb2xvcnMtcGlja2VyXCIpLmtlbmRvQ29sb3JQaWNrZXIoe1xyXG4gICAgICBidXR0b246IGZhbHNlLFxyXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgbGV0IGNvbG9yID0gZS52YWx1ZTtcclxuICAgICAgICBsZXQgaW5kZXggPSAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcIi5maWVsZHMtaXRlbVwiKS5hdHRyKFwiZGF0YS1pbmRleFwiKTtcclxuICAgICAgICBsZXQgY2xhc3NMaXN0ID0gJCh0aGlzKVswXS5lbGVtZW50LnBhcmVudHMoXCIuZWRpdG9yLWZpZWxkcy1jb2xvclwiKVswXS5jbGFzc0xpc3Q7XHJcbiAgICAgICAgbGV0IGZlYXR1cmVUeXBlID0gY2xhc3NMaXN0WzFdO1xyXG4gICAgICAgIGxldCByZW5kZXJUeXBlID0gY2xhc3NMaXN0WzJdO1xyXG4gICAgICAgIGxldCB0aGVtYXRpY0NvbG9ycyA9IF9nZXRDb2xvckZpZWxkc0FycmF5KGZlYXR1cmVUeXBlLCByZW5kZXJUeXBlKTtcclxuXHJcbiAgICAgICAgLy8g5pS55Y+Y5o6n5Lu255qE6aKc6ImyXHJcbiAgICAgICAgJCh0aGlzKVswXS5lbGVtZW50LnBhcmVudHMoXCJzcGFuXCIpLmNzcyhcImNvbG9yXCIsIGNvbG9yKTtcclxuXHJcbiAgICAgICAgLy8g5pS55Y+Y5LiT6aKY5a2X5q6155qE5aGr5YWF6Imy77yM5bm26L+b6KGM5riy5p+TXHJcbiAgICAgICAgdGhlbWF0aWNDb2xvcnNbaW5kZXhdID0gY29sb3I7XHJcbiAgICAgICAgcmVuZGVyKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDoh6rlrprkuYnng63lipvlm77popzoibLlj5jljJbvvIwgY29sb3JwaWNrZXLpopzoibLlj5jljJZcclxuICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5oZWF0bWFwLWNvbG9ycy1waWNrZXJcIikua2VuZG9Db2xvclBpY2tlcih7XHJcbiAgICAgIGJ1dHRvbjogZmFsc2UsXHJcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBsZXQgY29sb3IgPSBlLnZhbHVlO1xyXG4gICAgICAgIGxldCBrZXkgPSAkKHRoaXMpWzBdLmVsZW1lbnQucGFyZW50cyhcIi5lZGl0b3ItdG9vbFwiKS5hdHRyKFwiZGF0YS1rZXlcIik7XHJcblxyXG4gICAgICAgIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcbiAgICAgICAgbGV0IGxheWVyID0gYnVpbGRQcm9qZWN0LnNldHRpbmcubGF5ZXI7IC8vIOW9k+WJjea/gOa0u+eahGxheWVyXHJcbiAgICAgICAgbGV0IHJlbmRlck1vZGVsID0gYnVpbGRQcm9qZWN0LmdldEluZm8oJ3JlbmRlcl9tb2RlbCcpO1xyXG4gICAgICAgIGxldCBvcHRpb25zID0gcmVuZGVyTW9kZWwuc3R5bGVPcHRpb25zO1xyXG5cclxuICAgICAgICBvcHRpb25zLmdyYWRpZW50ID0gS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5oZWF0bWFwQ29sb3JSYW1wW29wdGlvbnMuY29sb3JJbmRleF07XHJcbiAgICAgICAgb3B0aW9ucy5ncmFkaWVudFtrZXldID0gY29sb3I7XHJcblxyXG4gICAgICAgIHJlbmRlcigpO1xyXG4gICAgICAgIGluaXRGaWVsZENvbG9yQ29udGFpbmVyKCk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDotbflp4vojIPlm7Tlj5jljJZcclxuICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi52YWx1ZS1zdGFydCBpbnB1dFwiKS5jaGFuZ2UoZnVuY3Rpb24gKGUpIHtcclxuICAgICAgbGV0IGluZGV4ID0gTnVtYmVyKCQodGhpcykucGFyZW50cyhcIi5maWVsZHMtaXRlbVwiKS5hdHRyKFwiZGF0YS1pbmRleFwiKSk7XHJcbiAgICAgIGxldCBjbGFzc0xpc3QgPSAkKHRoaXMpLnBhcmVudHMoXCIuZWRpdG9yLWZpZWxkcy1jb2xvclwiKVswXS5jbGFzc0xpc3Q7XHJcbiAgICAgIGxldCBmZWF0dXJlVHlwZSA9IGNsYXNzTGlzdFsxXTtcclxuICAgICAgbGV0IHJlbmRlclR5cGUgPSBjbGFzc0xpc3RbMl07XHJcbiAgICAgIGxldCByYW5nZUFycmF5ID0gX2dldFJhbmdlQXJyYXkoZmVhdHVyZVR5cGUsIHJlbmRlclR5cGUpO1xyXG4gICAgICBsZXQgbWluX3ZhbHVlID0gTnVtYmVyLk1JTl9TQUZFX0lOVEVHRVI7XHJcbiAgICAgIGxldCBtYXhfdmFsdWUgPSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUjtcclxuICAgICAgbGV0IG5ld192YWx1ZSA9IE51bWJlcihlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgIGxldCAkcHJldl9ub2RlID0gbnVsbDtcclxuXHJcbiAgICAgIGlmIChpbmRleCAtIDEgPj0gMCkge1xyXG4gICAgICAgIG1pbl92YWx1ZSA9IHJhbmdlQXJyYXlbaW5kZXggLSAxXTtcclxuICAgICAgICAkcHJldl9ub2RlID0gJCh0aGlzKS5wYXJlbnRzKFwiLmZpZWxkcy1pdGVtXCIpLnByZXYoKS5maW5kKFwiLnZhbHVlLWVuZCBpbnB1dFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGluZGV4ICsgMSA8IHJhbmdlQXJyYXkubGVuZ3RoKSB7XHJcbiAgICAgICAgbWF4X3ZhbHVlID0gcmFuZ2VBcnJheVtpbmRleCArIDFdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAobmV3X3ZhbHVlID4gbWluX3ZhbHVlICYmIG5ld192YWx1ZSA8IG1heF92YWx1ZSkge1xyXG4gICAgICAgIHJhbmdlQXJyYXlbaW5kZXhdID0gbmV3X3ZhbHVlO1xyXG5cclxuICAgICAgICBpZiAoJHByZXZfbm9kZSkge1xyXG4gICAgICAgICAgJHByZXZfbm9kZS52YWwobmV3X3ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgS1EuQ29udHJvbC5Ob3RpZmljYXRpb24uZ2V0SW5zdGFuY2UoKS5zaG93RXJyb3IoJ+aVsOWAvOiMg+WbtOS4jeato+ehricpO1xyXG4gICAgICAgIGUudGFyZ2V0LnZhbHVlID0gcmFuZ2VBcnJheVtpbmRleF07XHJcbiAgICAgIH1cclxuICAgICAgcmVuZGVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyDnu5PmnZ/ojIPlm7Tlj5jljJZcclxuICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi52YWx1ZS1lbmQgaW5wdXRcIikuY2hhbmdlKGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGxldCBpbmRleCA9IE51bWJlcigkKHRoaXMpLnBhcmVudHMoXCIuZmllbGRzLWl0ZW1cIikuYXR0cihcImRhdGEtaW5kZXhcIikpICsgMTtcclxuICAgICAgbGV0IGNsYXNzTGlzdCA9ICQodGhpcykucGFyZW50cyhcIi5lZGl0b3ItZmllbGRzLWNvbG9yXCIpWzBdLmNsYXNzTGlzdDtcclxuICAgICAgbGV0IGZlYXR1cmVUeXBlID0gY2xhc3NMaXN0WzFdO1xyXG4gICAgICBsZXQgcmVuZGVyVHlwZSA9IGNsYXNzTGlzdFsyXTtcclxuICAgICAgbGV0IHJhbmdlQXJyYXkgPSBfZ2V0UmFuZ2VBcnJheShmZWF0dXJlVHlwZSwgcmVuZGVyVHlwZSk7XHJcbiAgICAgIGxldCBtaW5fdmFsdWUgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUjtcclxuICAgICAgbGV0IG1heF92YWx1ZSA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSO1xyXG4gICAgICBsZXQgbmV3X3ZhbHVlID0gTnVtYmVyKGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgbGV0ICRuZXh0X25vZGUgPSBudWxsO1xyXG5cclxuICAgICAgaWYgKGluZGV4IC0gMSA+PSAwKSB7XHJcbiAgICAgICAgbWluX3ZhbHVlID0gcmFuZ2VBcnJheVtpbmRleCAtIDFdO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoaW5kZXggKyAxIDwgcmFuZ2VBcnJheS5sZW5ndGgpIHtcclxuICAgICAgICBtYXhfdmFsdWUgPSByYW5nZUFycmF5W2luZGV4ICsgMV07XHJcbiAgICAgICAgJG5leHRfbm9kZSA9ICQodGhpcykucGFyZW50cyhcIi5maWVsZHMtaXRlbVwiKS5uZXh0KCkuZmluZChcIi52YWx1ZS1zdGFydCBpbnB1dFwiKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKG5ld192YWx1ZSA+IG1pbl92YWx1ZSAmJiBuZXdfdmFsdWUgPCBtYXhfdmFsdWUpIHtcclxuICAgICAgICByYW5nZUFycmF5W2luZGV4XSA9IG5ld192YWx1ZTtcclxuXHJcbiAgICAgICAgaWYgKCRuZXh0X25vZGUpIHtcclxuICAgICAgICAgICRuZXh0X25vZGUudmFsKG5ld192YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIEtRLkNvbnRyb2wuTm90aWZpY2F0aW9uLmdldEluc3RhbmNlKCkuc2hvd0Vycm9yKCfmlbDlgLzojIPlm7TkuI3mraPnoa4nKTtcclxuICAgICAgICBlLnRhcmdldC52YWx1ZSA9IHJhbmdlQXJyYXlbaW5kZXhdO1xyXG4gICAgICB9XHJcbiAgICAgIHJlbmRlcigpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChjb250YWluZXJzW2ldKS5maW5kKFwiLmNvbG9ycy1waWNrZXJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgICAkKHRoaXMpLmZpbmQoXCIuay1zZWxlY3RlZC1jb2xvclwiKVswXS5jbGljaygpO1xyXG4gICAgfSlcclxuXHJcbiAgICAvLyDnu5Hlrproh6rlrprkuYnljZXlgLzlsZXlvIDjgIHmlLbnvKnkuovku7ZcclxuICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5maWVsZHMtZGl2LXN3aXRjaFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgIGxldCBzZWxmID0gJCh0aGlzKTtcclxuICAgICAgaWYgKHNlbGYuaGFzQ2xhc3MoXCJzdGF0ZS1jbG9zZVwiKSkge1xyXG4gICAgICAgIHNlbGYuc2libGluZ3MoXCJzcGFuXCIpLnZhbHVlID0gXCLlsZXlvIBcIjtcclxuICAgICAgICBzZWxmLnBhcmVudHMoXCIudGl0bGVcIikuc2libGluZ3MoXCIuZmllbGRzLWNvbnRhaW5lclwiKS5jc3MoXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XHJcbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcyhcInN0YXRlLWNsb3NlXCIpO1xyXG4gICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoXCJmYS1wbHVzLXNxdWFyZS1vXCIpO1xyXG4gICAgICAgIHNlbGYuYWRkQ2xhc3MoXCJmYS1taW51cy1zcXVhcmUtb1wiKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxmLnNpYmxpbmdzKFwic3BhblwiKS52YWx1ZSA9IFwi5pS26LW3XCI7XHJcbiAgICAgICAgc2VsZi5wYXJlbnRzKFwiLnRpdGxlXCIpLnNpYmxpbmdzKFwiLmZpZWxkcy1jb250YWluZXJcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XHJcbiAgICAgICAgc2VsZi5hZGRDbGFzcyhcInN0YXRlLWNsb3NlXCIpO1xyXG4gICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoXCJmYS1taW51cy1zcXVhcmUtb1wiKTtcclxuICAgICAgICBzZWxmLmFkZENsYXNzKFwiZmEtcGx1cy1zcXVhcmUtb1wiKTtcclxuICAgICAgfVxyXG4gICAgfSlcclxuXHJcbiAgICAvLyDlpoLmnpzpnIDopoHlsZXlvIDvvIzliJnop6blj5FjbGlja+S6i+S7tlxyXG4gICAgaWYgKGV4cGFuZGVkKSB7XHJcbiAgICAgICQoY29udGFpbmVyc1tpXSkuZmluZChcIi5maWVsZHMtZGl2LXN3aXRjaFwiKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaW5pdEZpZWxkQ29sb3JDb250YWluZXIoKSB7XHJcbiAgKGFzeW5Qcm94eShfaW5pdEZpZWxkQ29sb3JDb250YWluZXIpKSgpO1xyXG59XHJcblxyXG4vLyDljIXoo7nlh73mlbDvvIzov5Tlm57kuIDkuKrlvILmraXmiafooYznmoTlh73mlbBcclxuZnVuY3Rpb24gYXN5blByb3h5KGZuKSB7XHJcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICBmbigpO1xyXG4gICAgfSwgMClcclxuICB9XHJcbn1cclxuXHJcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipkYXRhIHNvdXJjZSoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cclxuXHJcbi8vIOagh+etvuWtl+S9k+WIl+ihqFxyXG5mdW5jdGlvbiBsYWJlbEZvbnREcm9wRG93bkxpc3QoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHtuYW1lOiBcIuS7v+Wui1wiLCB2YWx1ZTogS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5sYWJlbEZvbnROYW1lLmZhbmdTb25nfSxcclxuICAgIHtuYW1lOiBcIuWui+S9k1wiLCB2YWx1ZTogS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5sYWJlbEZvbnROYW1lLnNvbmd9LFxyXG4gICAge25hbWU6IFwi5b6u6L2v6ZuF6buRXCIsIHZhbHVlOiBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmxhYmVsRm9udE5hbWUueWFIZWl9LFxyXG4gIF07XHJcbn1cclxuXHJcbi8vIOS4k+mimOWtl+auteWIl+ihqFxyXG5mdW5jdGlvbiBzcGVjaWFsRmllbGREcm9wRG93bkxpc3QoKSB7XHJcbiAgbGV0IHNwZWNpYWxGaWVsZERyb3BEb3duTGlzdCA9IFtdO1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcblxyXG4gIGxldCBsYXllciA9IGJ1aWxkUHJvamVjdC5zZXR0aW5nLmxheWVyOyAvLyDlvZPliY3mv4DmtLvnmoRsYXllclxyXG4gIGxldCByZW5kZXIgPSBsYXllci5nZXRSZW5kZXIoKTtcclxuICB2YXIgZmllbGRzID0gT2JqZWN0LmtleXMocmVuZGVyLmdlb2pzb25PYmplY3RGaWVsZHMoKSk7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICBzcGVjaWFsRmllbGREcm9wRG93bkxpc3QucHVzaCh7bmFtZTogZmllbGRzW2ldLCB2YWx1ZTogZmllbGRzW2ldfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gc3BlY2lhbEZpZWxkRHJvcERvd25MaXN0O1xyXG59XHJcblxyXG4vLyDliIbmrrXkuJPpopjlrZfmrrXliJfooahcclxuZnVuY3Rpb24gc2VjdGlvblNwZWNpYWxGaWVsZERyb3BEb3duTGlzdCgpIHtcclxuICBsZXQgc2VjdGlvblNwZWNpYWxGaWVsZERyb3BEb3duTGlzdCA9IFtdO1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcblxyXG4gIGxldCBsYXllciA9IGJ1aWxkUHJvamVjdC5zZXR0aW5nLmxheWVyOyAvLyDlvZPliY3mv4DmtLvnmoRsYXllclxyXG4gIGxldCByZW5kZXIgPSBsYXllci5nZXRSZW5kZXIoKTtcclxuICBsZXQgZmllbGRzID0gT2JqZWN0LmtleXMocmVuZGVyLmdlb2pzb25PYmplY3RTZWN0aW9uRmllbGRzKCkpO1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IGZpZWxkcy5sZW5ndGg7ICsraSkge1xyXG4gICAgc2VjdGlvblNwZWNpYWxGaWVsZERyb3BEb3duTGlzdC5wdXNoKHtuYW1lOiBmaWVsZHNbaV0sIHZhbHVlOiBmaWVsZHNbaV19KTtcclxuICB9XHJcblxyXG4gIHJldHVybiBzZWN0aW9uU3BlY2lhbEZpZWxkRHJvcERvd25MaXN0O1xyXG59XHJcblxyXG4vLyDmoIfnrb7lrZfmrrXliJfooahcclxuZnVuY3Rpb24gbGFiZWxGaWVsZERyb3BEb3duTGlzdCgpIHtcclxuICByZXR1cm4gZmllbGRzRHJvcERvd25MaXN0KCk7XHJcbn1cclxuXHJcbi8vIOadg+mHjeWtl+auteWIl+ihqFxyXG5mdW5jdGlvbiB3ZWlnaHRGaWVsZERyb3BEb3duTGlzdCgpIHtcclxuICByZXR1cm4gZmllbGRzRHJvcERvd25MaXN0KCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpZWxkc0Ryb3BEb3duTGlzdCgpIHtcclxuICBsZXQgZmllbGRzRHJvcERvd25MaXN0ID0gW3tuYW1lOiBcIuacquiuvue9rlwiLCB2YWx1ZTogXCJcIn1dO1xyXG4gIGxldCBidWlsZFByb2plY3QgPSBLUS5CdWlsZGVyLkJ1aWxkZXJQcm9qZWN0LmdldEluc3RhbmNlKCk7XHJcblxyXG4gIGxldCBsYXllciA9IGJ1aWxkUHJvamVjdC5zZXR0aW5nLmxheWVyOyAvLyDlvZPliY3mv4DmtLvnmoRsYXllclxyXG4gIGxldCByZW5kZXIgPSBsYXllci5nZXRSZW5kZXIoKTtcclxuICBsZXQgZmllbGRzID0gT2JqZWN0LmtleXMocmVuZGVyLmdlb2pzb25PYmplY3RGaWVsZHMoKSk7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICBmaWVsZHNEcm9wRG93bkxpc3QucHVzaCh7bmFtZTogZmllbGRzW2ldLCB2YWx1ZTogZmllbGRzW2ldfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gZmllbGRzRHJvcERvd25MaXN0O1xyXG59XHJcblxyXG4vLyDnur/moLflvI/liJfooahcclxuZnVuY3Rpb24gbGluZVN0eWxlRHJvcERvd25MaXN0KCkge1xyXG4gIGxldCBsaW5lU3R5bGVEcm9wRG93bkxpc3QgPSBbXTtcclxuICBsZXQgbGluZVN0eWxlID0gT2JqZWN0LnZhbHVlcyhLUS5Db21tb24uQ29tbW9uVmFsdWVzLmxpbmVTdHlsZSk7XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGluZVN0eWxlLmxlbmd0aDsgKytpKSB7XHJcbiAgICBsaW5lU3R5bGVEcm9wRG93bkxpc3QucHVzaCh7bmFtZTogU3RyaW5nKGkpLCB2YWx1ZTogbGluZVN0eWxlW2ldfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gbGluZVN0eWxlRHJvcERvd25MaXN0O1xyXG59XHJcblxyXG4vLyDliIbmrrXmlrnlvI/liJfooahcclxuZnVuY3Rpb24gc3Vic2VjdGlvblR5cGVEcm9wRG93bkxpc3QoKSB7XHJcbiAgcmV0dXJuIFtcclxuICAgIHtuYW1lOiBcIuetiei3neWIhuauteazlVwiLCB2YWx1ZTogS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5jbGFzc0JyZWFrc01ldGhvZC5jbGFzc0JyZWFrc19lcXVpZGlzdGFudH0sXHJcbiAgICB7bmFtZTogXCLnrYnph4/liIbmrrXms5VcIiwgdmFsdWU6IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMuY2xhc3NCcmVha3NNZXRob2QuY2xhc3NCcmVha3NfcXVhbnRpbGV9LFxyXG4gICAge25hbWU6IFwi5a+55pWw5YiG5q615rOVXCIsIHZhbHVlOiBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmNsYXNzQnJlYWtzTWV0aG9kLmNsYXNzQnJlYWtzX2xvZ2FyaXRobWljfSxcclxuICAgIHtuYW1lOiBcIkvogZrnsbvliIbmrrXms5VcIiwgdmFsdWU6IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMuY2xhc3NCcmVha3NNZXRob2QuY2xhc3NCcmVha3Nfa19tZWFuc30sXHJcbiAgXTtcclxufVxyXG5cclxuZnVuY3Rpb24gc3Vic2VjdGlvbk51bWJlckRyb3BEb3duTGlzdCgpIHtcclxuICBsZXQgc3Vic2VjdGlvbk51bWJlckRyb3BEb3duTGlzdCA9IFtdO1xyXG5cclxuICBmb3IgKGxldCBpID0gMjsgaSA8IDE2OyArK2kpIHtcclxuICAgIHN1YnNlY3Rpb25OdW1iZXJEcm9wRG93bkxpc3QucHVzaCh7bmFtZTogU3RyaW5nKGkpLCB2YWx1ZTogaX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHN1YnNlY3Rpb25OdW1iZXJEcm9wRG93bkxpc3Q7XHJcbn1cclxuXHJcbi8vIOiJsuW4puagt+W8j+WIl+ihqFxyXG5mdW5jdGlvbiByYW1wQ29sb3JEcm9wRG93bkxpc3QoKSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gMzA7ICAvLyDkuIDlhbHmnIkzMOenjeiJsuWdl1xyXG4gIGxldCByYW1wQ29sb3JEcm9wRG93bkxpc3QgPSBbXTtcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xyXG4gICAgcmFtcENvbG9yRHJvcERvd25MaXN0LnB1c2goe25hbWU6IFN0cmluZyhpKSwgdmFsdWU6IFN0cmluZyhpKX0pO1xyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHJhbXBDb2xvckRyb3BEb3duTGlzdDtcclxufVxyXG5cclxuLy8g54Ot5Yqb5Zu+6Imy5bim5qC35byP5YiX6KGoXHJcbmZ1bmN0aW9uIGhlYXRtYXBSYW1wQ29sb3JEcm9wRG93bkxpc3QoKSB7XHJcbiAgY29uc3QgbGVuZ3RoID0gMTg7ICAvLyDkuIDlhbHmnIkxOOenjeiJsuWdl1xyXG4gIGxldCBoZWF0bWFwUmFtcENvbG9yRHJvcERvd25MaXN0ID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcclxuICAgIGhlYXRtYXBSYW1wQ29sb3JEcm9wRG93bkxpc3QucHVzaCh7bmFtZTogU3RyaW5nKGkpLCB2YWx1ZTogU3RyaW5nKGkpfSk7XHJcbiAgfVxyXG5cclxuICByZXR1cm4gaGVhdG1hcFJhbXBDb2xvckRyb3BEb3duTGlzdDtcclxufVxyXG5cclxuLy8g5qCH562+5pa55ZCR5YiX6KGoXHJcbmZ1bmN0aW9uIGxhYmVsRGlyZWN0aW9uRHJvcERvd25MaXN0KCkge1xyXG4gIHJldHVybiBbXHJcbiAgICB7bmFtZTogXCLkuK1cIiwgdmFsdWU6IFwibWlkXCJ9LFxyXG4gICAge25hbWU6IFwi5LiKXCIsIHZhbHVlOiBcInVwXCJ9LFxyXG4gICAge25hbWU6IFwi5LiLXCIsIHZhbHVlOiBcImRvd25cIn0sXHJcbiAgICB7bmFtZTogXCLlt6ZcIiwgdmFsdWU6IFwibGVmdFwifSxcclxuICAgIHtuYW1lOiBcIuWPs1wiLCB2YWx1ZTogXCJyaWdodFwifSxcclxuICBdO1xyXG59IiwiLyoqXHJcbiAqIENyZWF0ZSBhIG5ldyBidWlsZGVyc2lkZWJhciBvbiB0aGlzIGpRdWVyeSBvYmplY3QuXHJcbiAqXHJcbiAqIEBleGFtcGxlXHJcbiAqIHZhciBidWlsZGVyc2lkZWJhciA9ICQoJyNidWlsZGVyc2lkZWJhcicpLmJ1aWxkZXJzaWRlYmFyKCk7XHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gLSBPcHRpb25hbCBvcHRpb25zIG9iamVjdFxyXG4gKiBAcGFyYW0ge3N0cmluZ30gW29wdGlvbnMucG9zaXRpb249bGVmdF0gLSBQb3NpdGlvbiBvZiB0aGUgYnVpbGRlcnNpZGViYXI6ICdsZWZ0JyBvciAncmlnaHQnXHJcbiAqIEByZXR1cm5zIHtqUXVlcnl9XHJcbiAqL1xyXG5cclxudmFyIGN1cnJlbnRJRCA9IG51bGw7XHJcblxyXG4kLmZuLmJ1aWxkZXJzaWRlYmFyID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICB2YXIgJHNpZGViYXIgPSB0aGlzO1xyXG4gIHZhciAkdGFicyA9ICRzaWRlYmFyLmZpbmQoJ3VsLmJ1aWxkZXJzaWRlYmFyLXRhYnMsIC5idWlsZGVyc2lkZWJhci10YWJzID4gdWwnKTtcclxuICB2YXIgJGNvbnRhaW5lciA9ICRzaWRlYmFyLmNoaWxkcmVuKCcuYnVpbGRlcnNpZGViYXItY29udGVudCcpLmZpcnN0KCk7XHJcblxyXG4gIG9wdGlvbnMgPSAkLmV4dGVuZCh7XHJcbiAgICBwb3NpdGlvbjogJ2xlZnQnLFxyXG4gIH0sIG9wdGlvbnMgfHwge30pO1xyXG5cclxuICAkc2lkZWJhci5hZGRDbGFzcygnYnVpbGRlcnNpZGViYXItJyArIG9wdGlvbnMucG9zaXRpb24pO1xyXG5cclxuICAkdGFicy5jaGlsZHJlbignbGknKS5jaGlsZHJlbignYVtocmVmXj1cIiNcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgaWYgKHRoaXMuaGFzaC5zbGljZSgxKSAhPT0gJ2hvbWUnKSB7XHJcbiAgICAgIHZhciAkdGFiID0gJCh0aGlzKS5jbG9zZXN0KCdsaScpO1xyXG4gICAgICBpZiAoJHRhYi5oYXNDbGFzcygnYWN0aXZlJykpXHJcbiAgICAgICAgJHNpZGViYXIuY2xvc2UoKTtcclxuICAgICAgZWxzZSBpZiAoISR0YWIuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpIHtcclxuICAgICAgICAkc2lkZWJhci5vcGVuKHRoaXMuaGFzaC5zbGljZSgxKSwgJHRhYik7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmIChjdXJyZW50SUQpIHtcclxuICAgICAgICBpZiAoJHNpZGViYXIuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKVxyXG4gICAgICAgICAgJHNpZGViYXIub3BlbihjdXJyZW50SUQpO1xyXG4gICAgICAgIGVsc2VcclxuICAgICAgICAgICRzaWRlYmFyLmNsb3NlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KTtcclxuXHJcbiAgJHNpZGViYXIuZmluZCgnLmJ1aWxkZXJzaWRlYmFyLWNsb3NlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJHNpZGViYXIuY2xvc2UoKTtcclxuICB9KTtcclxuXHJcbiAgLyoqXHJcbiAgICogT3BlbiBidWlsZGVyc2lkZWJhciAoaWYgbmVjZXNzYXJ5KSBhbmQgc2hvdyB0aGUgc3BlY2lmaWVkIHRhYi5cclxuICAgKlxyXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAtIFRoZSBpZCBvZiB0aGUgdGFiIHRvIHNob3cgKHdpdGhvdXQgdGhlICMgY2hhcmFjdGVyKVxyXG4gICAqIEBwYXJhbSB7alF1ZXJ5fSBbJHRhYl0gLSBUaGUgalF1ZXJ5IG9iamVjdCByZXByZXNlbnRpbmcgdGhlIHRhYiBub2RlICh1c2VkIGludGVybmFsbHkgZm9yIGVmZmljaWVuY3kpXHJcbiAgICovXHJcbiAgJHNpZGViYXIub3BlbiA9IGZ1bmN0aW9uIChpZCwgJHRhYikge1xyXG4gICAgaWYgKHR5cGVvZiAkdGFiID09PSAndW5kZWZpbmVkJylcclxuICAgICAgJHRhYiA9ICR0YWJzLmZpbmQoJ2xpID4gYVtocmVmPVwiIycgKyBpZCArICdcIl0nKS5wYXJlbnQoKTtcclxuXHJcbiAgICAvLyBoaWRlIG9sZCBhY3RpdmUgY29udGVudHNcclxuICAgICRjb250YWluZXIuY2hpbGRyZW4oJy5idWlsZGVyc2lkZWJhci1wYW5lLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAvLyBzaG93IG5ldyBjb250ZW50XHJcbiAgICAkY29udGFpbmVyLmNoaWxkcmVuKCcjJyArIGlkKS5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgLy8gcmVtb3ZlIG9sZCBhY3RpdmUgaGlnaGxpZ2h0c1xyXG4gICAgJHRhYnMuY2hpbGRyZW4oJ2xpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHJcbiAgICAvLyBzZXQgbmV3IGhpZ2hsaWdodFxyXG4gICAgJHRhYi5hZGRDbGFzcygnYWN0aXZlJyk7XHJcblxyXG4gICAgJHNpZGViYXIudHJpZ2dlcignY29udGVudCcsIHsnaWQnOiBpZH0pO1xyXG5cclxuICAgIGlmICgkc2lkZWJhci5oYXNDbGFzcygnY29sbGFwc2VkJykpIHtcclxuICAgICAgLy8gb3BlbiBidWlsZGVyc2lkZWJhclxyXG4gICAgICAkc2lkZWJhci50cmlnZ2VyKCdvcGVuaW5nJyk7XHJcbiAgICAgICRzaWRlYmFyLnJlbW92ZUNsYXNzKCdjb2xsYXBzZWQnKTtcclxuICAgIH1cclxuXHJcbiAgICAkc2lkZWJhci5maW5kKCcjYnVpbGRlci10aXRsZS1pbWFnZScpLnNob3coKTtcclxuXHJcbiAgICBjdXJyZW50SUQgPSBpZDtcclxuICB9O1xyXG5cclxuICAvKipcclxuICAgKiBDbG9zZSB0aGUgYnVpbGRlcnNpZGViYXIgKGlmIG5lY2Vzc2FyeSkuXHJcbiAgICovXHJcbiAgJHNpZGViYXIuY2xvc2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyByZW1vdmUgb2xkIGFjdGl2ZSBoaWdobGlnaHRzXHJcbiAgICAkdGFicy5jaGlsZHJlbignbGkuYWN0aXZlJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuICAgICRzaWRlYmFyLmZpbmQoJyNidWlsZGVyLXRpdGxlLWltYWdlJykuaGlkZSgpO1xyXG5cclxuICAgIGlmICghJHNpZGViYXIuaGFzQ2xhc3MoJ2NvbGxhcHNlZCcpKSB7XHJcbiAgICAgIC8vIGNsb3NlIGJ1aWxkZXJzaWRlYmFyXHJcbiAgICAgICRzaWRlYmFyLnRyaWdnZXIoJ2Nsb3NpbmcnKTtcclxuICAgICAgJHNpZGViYXIuYWRkQ2xhc3MoJ2NvbGxhcHNlZCcpO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIHJldHVybiAkc2lkZWJhcjtcclxufTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbGl3ZWkgb24gMjAxOS8xMC8xNC5cclxuICovXHJcbid1c2Ugc3RyaWN0JztcclxuXHJcbnJlcXVpcmUoJy4vYnVpbGRlci9faW5pdERvbXMnKTtcclxucmVxdWlyZSgnLi9idWlsZGVyL2xpYnMvanF1ZXJ5LXNpZGViYXInKTtcclxuXHJcbiJdfQ==
