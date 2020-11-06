async function loadHtml(func) {
  $(".content-editor-pane-point").load("./window/point.html", null, function() {
    $(".content-editor-pane-line").load("./window/line.html", null, function() {
      $(".content-editor-pane-polygon").load("./window/polygon.html", null, function() {
        $(".content-editor-pane-basemap").load("./window/basemap.html", null, function() {
          $("#analysis .analysis-main").load("./window/analysis/main.html", null, function() {
            $("#settings").load("./window/setting.html", null, function() {
              func();
            });
          });
        });
      });
    });
  });
}

function initHtml() {

  window.builderInitDoms.initAllDoms();

  // 添加图层列表显示事件判断
  $(".add-layer-list").blur(function() {
    $('.add-layer-tag').css("focus");
    $(".add-layer-list").css("display", "none");
  })

// 添加图层方式的列表
  $(".add-layer-tag").click(function () {
    let display = $(".add-layer-list").css("display");
    if (display == 'none') {
      $(".add-layer-list").css("display", "block");
      $(".add-layer-list").focus();
    }
  });

  $('.buildersiderbar-back').click(function () {
    $(".sidebar-content-panel").css("display", "none");
    $(".content-editor-pane").css("display", "none");
    $(".sidebar-layers-manager").css("display", "block");
  })

  // 通过远程文件添加
  window.loadFileDialog = null;
  $("#add-layer-list-item-file").click(function() {
    $(".add-layer-list").css("display", "none");

    if (!window.loadFileDialog) {
      window.loadFileDialog = new KQ.Builder.BuilderUi.FileLoadDialog("#load-file-layer-container", {filter: "geojson"});
      window.loadFileDialog.on('load', async function (data) {
        await KQ.Builder.BuilderCommon.addNewLayer(data.dataSourceInfo);
      })

      window.loadFileDialog.on('delete', function (data) {
        // 初始化删除工程按钮
        $("#confirm-div").kendoConfirm({
          title: "删除远程图层文件",
          content: "远程图层文件删除后无法恢复，确定删除？",
          messages:{
            okText: "确定",
            cancelText: "取消",
          }
        }).data("kendoConfirm").result.done(function(){
          $('body').append($('<div id="confirm-div">'));
          window.loadFileDialog.fire("delete_event", data);
        }).fail(function(){
          $('body').append($('<div id="confirm-div">'));
        });
      })

      // 删除图层事件
      window.loadFileDialog.on("delete_event", async function(data) {
        await deleteDataFile(data.dataSourceInfo['url']);
      })
    }

    $("#load-file-layer-container").data("kendoWindow").center().open();
  })

  // 通过数据库添加
  window.loadDatabaseDialog = null;
  $("#add-layer-list-item-database").click(function() {
    $(".add-layer-list").css("display", "none");

    if (!window.loadDatabaseDialog) {
      window.loadDatabaseDialog = new KQ.Builder.BuilderUi.DatabaseLoadDialog("#load-database-layer-container", {filter: "geojson"});

      window.loadDatabaseDialog.on('load', function (data) {
        KQ.Builder.BuilderCommon.addNewLayer(data.dataSourceInfo);
      })
    }

    $("#load-database-layer-container").data("kendoWindow").center().open();
  })

}

// 加载网络projectloadProject
async function loadProject(project_url) {
  try {
    let projectString = await KQ.Common.NetworkTools.httpGetAsync(project_url);
    // 工程文件需要解码
    let projectJson = JSON.parse(decodeURIComponent(projectString));

    let buildProject = KQ.Builder.BuilderProject.getInstance();

    // config中加载的layer信息保存到buildProject中
    buildProject.reloadConfig = projectJson;

    // 读取的工程配置信息
    let reloadConfig = KQ.Builder.BuilderProject.getInstance().reloadConfig;
    let projectName = reloadConfig.title;
    let reloadLayers = reloadConfig.layers;

    // 清除原有的图层
    KQ.Builder.BuilderCommon.clearLayersContainer();
    for (let index in reloadLayers) {
      let val = reloadLayers[index][1];
      let featureType = val.featureType;
      let url = val.url;
      let options = val.options;
      let fileName = val.name;
      let dataSourceInfo = {
        type: "STATIC_DATA",
        url: url,
        name: fileName,
      };

      let layer = await KQ.Builder.BuilderCommon.addNewLayerWithoutWaitingDialog(dataSourceInfo);
      layer.setRenderType(options.renderType, mapView);

      // 重新设置layer的options
      let render = layer.getRender();
      render.setOptions(options);
      layer.renderType = options.renderType;
      // 根据option重新生成options.thematicColors
      window.builderInitDoms.refreshThematicColors(layer, options);

      buildProject.setting.layer = layer;

      // 设置当前激活图层，及渲染的样式（basic，single还是section）
      buildProject.setting.layer = layer;

      // 刷新图层的model信息
      switch (featureType) {
        case 'point':
          onPointLayerReady();
          break;
        case 'line':
          onLineLayerReady();
          break;
        case 'polygon':
          onPolygonLayerReady();
          break;
      }
    }

    KQ.Builder.BuilderCommon.refreshLayersContainer();
    window.builderInitDoms.render();
    $("#current-project-name").text(projectName);
  }catch(e) {
    KQ.Control.Notification.getInstance().showError("加载失败，请检查网络！");
  }
}

async function deleteDataFile(url) {
  KQ.Control.Waiting.show(mapView._getMap(), 'pin', 'meter');

  try {
    let result = await deleteFile(url);

    if (result === 'success') {
      KQ.Control.Notification.getInstance().showSuccess("删除数据成功！");
      await window.loadFileDialog._refreshData();
    } else {
      KQ.Control.Notification.getInstance().showError("删除数据失败！");
    }
  } finally {
    KQ.Control.Waiting.close();
  }
}

async function deleteProjectFile(url) {
  KQ.Control.Waiting.show(mapView._getMap(), 'pin', 'meter');

  try {
    let result = await deleteFile(url);

    if (result === 'success') {
      KQ.Control.Notification.getInstance().showSuccess("删除工程成功！");
      await window.loadProjectDialog._refreshData();
    } else {
      KQ.Control.Notification.getInstance().showError("删除工程失败！");
    }
  } finally {
    KQ.Control.Waiting.close();
  }
}

async function deleteFile(url) {
  try {
    if (KQ.Builder.BuilderCommon.isPortalEnvironment()) {
      return await deleteFile_portal(url)
    } else {
      return await deleteFile_server(url);
    }
  } catch (e) {
    return "error"
  }
}

// 删除远程文件
async function deleteFile_server(url) {
  let cmd = url.replace('/download/', '/deleteFileById?taskIds=');
  let result = JSON.parse(await KQ.Common.NetworkTools.httpGetAsync(cmd));

  return result.result;
}

// 删除远程文件
async function deleteFile_portal(url) {
  let taskIds = url.slice(url.lastIndexOf("/") + 1);

  return parent.window.vm.$api.mapBuilderApi.deleteFileById({
    taskIds: taskIds,
  }, {__LOGINTYPE: "dialog", noLoading: true}).then(async function (res) {
    return res.data.result;
  }).catch(() => {
    return "error";
  })
}

async function initLayersContainer(layersContainer) {
  let buildProject = KQ.Builder.BuilderProject.getInstance();

  // 初始化图层容器
  layersContainer = new KQ.Builder.BuilderUi.LayerListBox("vector-layers-container", {
    dataSource: [],

    // 拖动item的响应函数
    dragend: function () {
      // 添加各个图层 注意这个地方需要反序添加 因为items是从上到下，但是压盖顺序是从下到上
      let items = this.items();
      let length = items.length;

      for (let i = 0; i < length; ++i) {
        let data = layersContainer.getDataFromListItem(items[i]);
        let layer = data.layer;

        layer.setPaneZIndex(length - i);
      }
    }
  });

  buildProject.layersContainer = layersContainer;

  // 响应底图点击信号
  $(".layers-container .base-layers li").click(function () {
    $(".sidebar-content-panel").css("display", "block");
    $(".sidebar-layers-manager").css("display", "none");
    $(".content-editor-pane-basemap").css("display", "block");
  })

  // 图层容器的信号响应函数
  $("#vector-layers-container").bind("select", function (event, dataItem) {
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
    }
  })

  // 监听图层可见信号
  $("#vector-layers-container").bind("builder_layer_visible", function (event, dataItem) {
    let layer = dataItem.layer;
    layer.getRender().addToMapView(mapView);

    buildProject.addLayer(layer);
  });

  // 监听图层不可见信号
  $("#vector-layers-container").bind("builder_layer_invisible", function (event, dataItem) {
    buildProject.removeLayer(dataItem.layer);
  });

  // 监听全图信号
  $("#vector-layers-container").bind("builder_full_map", function (event, dataItem) {
    let layer = dataItem.layer;
    layer.getRender().flyToBounds();
  });

  // 监听导出图层信号
  $("#vector-layers-container").bind("builder_export", function (event, dataItem) {
    let layer = dataItem.layer;
    let geojson = KQ.Builder.BuilderLayerDatas.getInstance().getData(layer.options.guid);
    let geojson_string = JSON.stringify(geojson);

    KQ.Common.CommonTools.exportData(geojson_string, 'exportdata.geojson');
    KQ.Control.Notification.getInstance().showSuccess(KQ.Local.Control.drawControl.exportDraw.success());
  });

  // 监听属性表信号
  $("#vector-layers-container").bind("builder_attribute_table", function (event, dataItem) {
    let layer = dataItem.layer;
    let geojson = KQ.Builder.BuilderLayerDatas.getInstance().getData(layer.options.guid);
    let columns = [];
    let dataSource = [];
    let fields = geojson.fields || Object.keys(geojson.features[0].properties);
    let features = geojson.features;

    // 组织columns
    for (let i = 0; i < fields.length; ++i) {
      let field = fields[i].name || fields[i];
      let title = fields[i].aliasName || field;

      columns.push({
        field: field,
        title: title,
      })
    }

    // 组织dataSource
    for (let i = 0; i < features.length; ++i) {
      dataSource.push(features[i].properties);
    }

    KQ.Builder.BuilderUi.BuilderInfoDialog.getInstance().open(dataSource, columns);
  });

  // 监听图例信号
  $("#vector-layers-container").bind("builder_legend", function (event, dataItem, el) {
    mapView.legend_window.open();
    window.builderInitDoms.updateLegend(dataItem.layer);
  });

  // 监听图层删除信号
  $("#vector-layers-container").bind("builder_layer_delete", function (event, dataItem, el) {
    layersContainer.remove(el);
    buildProject.deleteLayer(dataItem.layer);

    // 刷新图层控件
    KQ.Builder.BuilderCommon.refreshAnalysisLayersControl();
  });

  // 监听图层重命名信号
  $("#vector-layers-container").bind("builder_rename", function (event, dataItem, el) {
    // 隐藏菜单
    $(el).find(".secound-line .lists").css("display", "none");

    // 隐藏span，显示input用于编辑
    let $span = $(el).find(".first-line .title span");
    let $input = $(el).find(".first-line .title input");
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
      let $li = $span.closest("li");
      let dataItem = layersContainer._listbox.dataItem($li);
      dataItem.set("name", $input.val());
    })
  });
}


function swapRenderType(renderType, model_map) {
  let buildProject = KQ.Builder.BuilderProject.getInstance();
  let layer = buildProject.setting.layer; // 当前激活的layer

  layer.setRenderType(renderType, mapView);
  buildProject.setInfo('render_model', model_map.get(renderType));

  //重绘图例
  window.builderInitDoms.updateLegend(layer);
}

function onPointLayerReady() {
  let buildProject = KQ.Builder.BuilderProject.getInstance();
  let layer = buildProject.setting.layer; // 当前激活的layer

  var symbolType = layer.render.get('basic').options.pointSymbolType;
  if (symbolType == 'vector') {
    buildProject.symbolTypeGroupButton.select(0);
  } else {
    buildProject.symbolTypeGroupButton.select(1);
  }

  // 点数据 基本类型
  let basicStyleOptions = layer.render.get('basic').options;
  basicStyleOptions.lineColor = basicStyleOptions.vectorInfo.strokeColor;
  basicStyleOptions.lineWidth = basicStyleOptions.vectorInfo.strokeWidth;
  let basicModel = kendo.observable({
    styleOptions: basicStyleOptions,
    pointSize: basicStyleOptions.vectorInfo.fontSize.split("px")[0],  // 点大小

    pointOpacity: basicStyleOptions.vectorInfo.fillOpacity * 100,     // 点的不透明度
    lineOpacity: basicStyleOptions.vectorInfo.strokeOpacity * 100,    // 线的不透明度

    labelDirectionDropDownList: window.builderInitDoms.labelDirectionDropDownList,
    labelFieldDropDownList: window.builderInitDoms.labelFieldDropDownList,
    labelFontDropDownList: window.builderInitDoms.labelFontDropDownList
  });

  // 点数据 单值类型
  let singleStyleOptions = layer.render.get('single').options;
  let singleModel = kendo.observable({
    styleOptions: singleStyleOptions,
    pointSize: singleStyleOptions.vectorInfo.fontSize.split("px")[0], // 点大小

    pointOpacity: singleStyleOptions.vectorInfo.fillOpacity * 100,   // 点的不透明度
    lineOpacity: singleStyleOptions.vectorInfo.strokeOpacity * 100,  // 线的不透明度

    specialFieldDropDownList: window.builderInitDoms.specialFieldDropDownList,
    rampColorDropDownList: window.builderInitDoms.rampColorDropDownList,

    labelDirectionDropDownList: window.builderInitDoms.labelDirectionDropDownList,
    labelFieldDropDownList: window.builderInitDoms.labelFieldDropDownList,
    labelFontDropDownList: window.builderInitDoms.labelFontDropDownList
  });

  // 点数据 分段类型
  let sectionStyleOptions = layer.render.get('section').options;
  let sectionModel = kendo.observable({
    styleOptions: sectionStyleOptions,
    pointSize: sectionStyleOptions.vectorInfo.fontSize.split("px")[0], // 点大小

    pointOpacity: sectionStyleOptions.vectorInfo.fillOpacity * 100,   // 点的不透明度
    lineOpacity: sectionStyleOptions.vectorInfo.strokeOpacity * 100,  // 线的不透明度

    specialFieldDropDownList: window.builderInitDoms.sectionSpecialFieldDropDownList,
    subsectionTypeDropDownList: window.builderInitDoms.subsectionTypeDropDownList,
    subsectionNumberDropDownList: window.builderInitDoms.subsectionNumberDropDownList,
    rampColorDropDownList: window.builderInitDoms.rampColorDropDownList,
    lineStyleDropDownList: window.builderInitDoms.lineStyleDropDownList,

    labelDirectionDropDownList: window.builderInitDoms.labelDirectionDropDownList,
    labelFieldDropDownList: window.builderInitDoms.labelFieldDropDownList,
    labelFontDropDownList: window.builderInitDoms.labelFontDropDownList
  });

  // 点数据 热力图类型
  let heatmapStyleOptions = layer.render.get('heatmap').options;
  let heatmapModel = kendo.observable({
    styleOptions: heatmapStyleOptions,

    weightFieldDropDownList: window.builderInitDoms.weightFieldDropDownList,
    heatmapRampColorDropDownList: window.builderInitDoms.heatmapRampColorDropDownList,
  });

  // 初始化model
  let model_map = new Map([
    ["basic", basicModel],
    ["single", singleModel],
    ["section", sectionModel],
    ["heatmap", heatmapModel],
  ]);

  // 视图和model进行绑定
  model_map.forEach(function (value, key) {
    kendo.bind($("div#point-theme-tools-" + key), value);
  });

  window.builderInitDoms.initFieldColorContainer();

  $(".point-layer-types " + ".layer-type-img").removeClass('img-selected');
  $(".point-layer-types .point-" + layer.renderType).addClass('img-selected');
  $(".point-theme-tools > .theme-tools-item").css("display", "none");
  $("#point-theme-tools-" + layer.renderType).css("display", "block");


  $('.point-layer-types .layer-type-img').click(function () {
    // 如果为激活的layer type，不做相应
    if ( $(this).hasClass("img-selected") ) {
      return;
    }
    $(".point-layer-types " + ".layer-type-img").removeClass('img-selected');
    $(this).addClass('img-selected');
    $(".point-theme-tools > .theme-tools-item").css("display", "none");

    let render_type = $(this).attr("type");
    $("#point-theme-tools-" + render_type).css("display", "block");

    swapRenderType(render_type, model_map);
  });

  swapRenderType(layer.renderType, model_map);

  /* point basic symbol type switch */
  let pointSymbolType = basicStyleOptions.pointSymbolType;
  if (pointSymbolType == 'vector')
    swapPointSvg();
  else
    swapPointImg();

  $(".point-symbol-svg").click(function () {
    swapPointSvg();
    $(".default-point-icon div").eq(0).trigger('symbol_type_vector');
  });
  $(".point-symbol-img").click(function () {
    swapPointImg();
    $(".default-point-icon div").eq(1).trigger('symbol_type_image');
  });

  /* swap svg/img */
  function swapPointSvg() {
    $('<style>.only-svg-symbol-tyle{display:block;}</style>').appendTo(document.body);

    let renderModel = buildProject.getInfo('render_model');
    let options = renderModel.styleOptions;
    buildProject.getInfo('render_model').styleOptions.pointSymbolType = "vector";
    window.builderInitDoms.fillSvgSymbols();
    // 防止多个点图层存在时 svg/img相互彼此影响
    $(".default-point-icon div").eq(0).trigger('symbol_type_vector');
  }

  function swapPointImg() {
    $('<style>.only-svg-symbol-tyle{display:none;}</style>').appendTo(document.body);

    let renderModel = buildProject.getInfo('render_model');
    let options = renderModel.styleOptions;
    buildProject.getInfo('render_model').styleOptions.pointSymbolType = "image";
    window.builderInitDoms.fillImageSymbols();
    $(".default-point-icon div").eq(1).trigger('symbol_type_image');
  }
}

function onLineLayerReady() {
  let buildProject = KQ.Builder.BuilderProject.getInstance();
  let layer = buildProject.setting.layer; // 当前激活的layer

  let basicStyleOptions = layer.render.get('basic').options;
  var basicModel = kendo.observable({
    styleOptions: basicStyleOptions,
    lineOpacity: basicStyleOptions.lineOpacity * 100,

    lineStyleDropDownList: window.builderInitDoms.lineStyleDropDownList,
    labelFieldDropDownList: window.builderInitDoms.labelFieldDropDownList,
    labelFontDropDownList: window.builderInitDoms.labelFontDropDownList
  });


  var singleStyleOptions = layer.render.get('single').options;
  var singleModel = kendo.observable({
    styleOptions: layer.render.get('single').options,
    lineOpacity: singleStyleOptions.lineOpacity * 100,
    specialFieldDropDownList: window.builderInitDoms.specialFieldDropDownList,
    lineStyleDropDownList: window.builderInitDoms.lineStyleDropDownList,
    lineRampColorDropDownList: window.builderInitDoms.rampColorDropDownList,
    labelFieldDropDownList: window.builderInitDoms.labelFieldDropDownList,
    labelFontDropDownList: window.builderInitDoms.labelFontDropDownList
  });

  let sectionStyleOptions = layer.render.get('section').options;
  var sectionModel = kendo.observable({
    styleOptions: layer.render.get('section').options,
    specialFieldDropDownList: window.builderInitDoms.sectionSpecialFieldDropDownList,
    subsectionTypeDropDownList: window.builderInitDoms.subsectionTypeDropDownList,
    subsectionNumberDropDownList: window.builderInitDoms.subsectionNumberDropDownList,
    lineRampColorDropDownList: window.builderInitDoms.rampColorDropDownList,
    lineOpacity: sectionStyleOptions.lineOpacity * 100,
    lineStyleDropDownList: window.builderInitDoms.lineStyleDropDownList,
    labelFieldDropDownList: window.builderInitDoms.labelFieldDropDownList,
    labelFontDropDownList: window.builderInitDoms.labelFontDropDownList
  });

  // 初始化model
  let model_map = new Map([
    ["basic", basicModel],
    ["single", singleModel],
    ["section", sectionModel],
  ]);

  // 视图和model进行绑定
  model_map.forEach(function (value, key) {
    kendo.bind($("div#line-theme-tools-" + key), value);
  });

  window.builderInitDoms.initFieldColorContainer();

  $(".line-layer-types " + ".layer-type-img").removeClass('img-selected');
  $(".line-layer-types .line-" + layer.renderType).addClass('img-selected');
  $(".line-theme-tools > .theme-tools-item").css("display", "none");
  $("#line-theme-tools-" + layer.renderType).css("display", "block");

  $('.line-layer-types .layer-type-img').click(function () {
    $(".line-layer-types " + ".layer-type-img").removeClass('img-selected');
    $(this).addClass('img-selected');

    $(".line-theme-tools > .theme-tools-item").css("display", "none");

    let render_type = $(this).attr("type");

    $("#line-theme-tools-" + render_type).css("display", "block");
    swapRenderType(render_type, model_map);
  });

  swapRenderType(layer.renderType, model_map);
}

function onPolygonLayerReady() {
  let buildProject = KQ.Builder.BuilderProject.getInstance();
  let layer = buildProject.setting.layer; // 当前激活的layer

  // 面数据、基本类型
  let basicStyleOpacity = layer.render.get('basic').options;
  var basicModel = kendo.observable({
    styleOptions: basicStyleOpacity,
    fillOpacity: basicStyleOpacity.fillOpacity * 100,
    lineOpacity: basicStyleOpacity.lineOpacity * 100,

    lineStyleDropDownList: window.builderInitDoms.lineStyleDropDownList(),
    labelFieldDropDownList: window.builderInitDoms.labelFieldDropDownList(),
    labelFontDropDownList: window.builderInitDoms.labelFontDropDownList()
  });

  // 面数据、单值类型
  let singleStyleOpacity = layer.render.get('single').options;
  let singleModel = kendo.observable({
    styleOptions: singleStyleOpacity,
    fillOpacity: singleStyleOpacity.fillOpacity * 100,
    lineOpacity: singleStyleOpacity.lineOpacity * 100,

    specialFieldDropDownList: window.builderInitDoms.specialFieldDropDownList(),
    rampColorDropDownList: window.builderInitDoms.rampColorDropDownList(),
    lineStyleDropDownList: window.builderInitDoms.lineStyleDropDownList(),
    labelFieldDropDownList: window.builderInitDoms.labelFieldDropDownList(),
    labelFontDropDownList: window.builderInitDoms.labelFontDropDownList()
  });

  // 面数据、分段类型
  let sectionStyleOpacity = layer.render.get('section').options;
  let sectionModel = kendo.observable({
    styleOptions: sectionStyleOpacity,
    fillOpacity: sectionStyleOpacity.fillOpacity * 100,
    lineOpacity: sectionStyleOpacity.lineOpacity * 100,

    specialFieldDropDownList: window.builderInitDoms.sectionSpecialFieldDropDownList,
    subsectionTypeDropDownList: window.builderInitDoms.subsectionTypeDropDownList,
    subsectionNumberDropDownList: window.builderInitDoms.subsectionNumberDropDownList,
    rampColorDropDownList: window.builderInitDoms.rampColorDropDownList,
    lineStyleDropDownList: window.builderInitDoms.lineStyleDropDownList,
    labelFieldDropDownList: window.builderInitDoms.labelFieldDropDownList,
    labelFontDropDownList: window.builderInitDoms.labelFontDropDownList
  });

  // 初始化model
  let model_map = new Map([
    ["basic", basicModel],
    ["single", singleModel],
    ["section", sectionModel],
  ]);

  // 视图和model进行绑定
  model_map.forEach(function (value, key) {
    kendo.bind($("div#polygon-theme-tools-" + key), value);
  });

  window.builderInitDoms.initFieldColorContainer();

  $(".polygon-layer-types " + ".layer-type-img").removeClass('img-selected');
  $(".polygon-layer-types .region-" + layer.renderType).addClass('img-selected');
  $(".polygon-theme-tools > .theme-tools-item").css("display", "none");
  $("#polygon-theme-tools-" + layer.renderType).css("display", "block");

  $('.polygon-layer-types .layer-type-img').click(function () {
    $(".polygon-layer-types " + ".layer-type-img").removeClass('img-selected');
    $(this).addClass('img-selected');

    $(".polygon-theme-tools > .theme-tools-item").css("display", "none");

    let render_type = $(this).attr("type");
    $("#polygon-theme-tools-" + render_type).css("display", "block");
    swapRenderType(render_type, model_map);
  });

  swapRenderType(layer.renderType, model_map);
}

function initSiderbar(mapView) {

  // 初始化图例window
  var win = new KQ.Control.Window('legend-window', {
    parentID: 'KqMapID',
    position: {
      left: '355px',
      top: '10px',
    },
    icon: 'fa fa-bar-chart',
    width: '240px',
    title: ' 图例',
    draggable: false,
    resizable: false,
    scrollable: false,
    close: function(e) {
      // e.preventDefault();
    },
  });

  win.initAsync(function () {
    mapView.legend_window = win;
  });

  // 图例跟随sidebar
  jQuery.extend( jQuery.easing,
    {
      easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
      },
    });
  var options = {
    onOpened: function() {
      $("#legend-window").parent().animate({left: "355px"}, 500, 'easeOutQuad');
    },
    onClosed: function() {
      $("#legend-window").parent().animate({left: "63px"}, 500, 'easeOutQuad');
    },
  }

  // 初始化侧边栏
  let buildProject = KQ.Builder.BuilderProject.getInstance();
  var buildersidebar = $('#buildersidebar').buildersidebar(options);
  buildProject.siderbar = buildersidebar;
  buildersidebar.close();

  $('.saveToolBar').kendoSaveToolBar({
    sidebar: buildersidebar,
    onSelect: async function (e) {
      var type = $(e.item).data("type");
      console.log("Selected: " + type);
      switch (type) {
        case 'save': {
          try {
            KQ.Control.Waiting.show(mapView._getMap(), 'pin', 'meter');
            let projectManager = KQ.Builder.ProjectManager.getInstance();
            await projectManager.saveProject();
          } catch (e) {
            KQ.Control.Waiting.close();
          } finally {
            KQ.Control.Waiting.close();
          }
          break;
        }

        case 'saveas': {
          let dialog = $("#save-as-dialog-container").kendoDialog({
            content: "<label style='margin: 10px;'>另存名称：</label>" +
              "<input id='save-as-project-name' style='width: 360px;' /><br/></br>" +
              "<label style='margin: 10px;'>用户标记：</label>" +
              "<input id='save-as-project-mark' style='width: 360px;' /><br/>" +
              "<button id='new-layer-add' style='margin: 10px; width: 60px' class='k-primary'>保存</button>"
          }).data("kendoDialog");

          var title = '<i class="fa fa-cloud-download" aria-hidden="true"></i><span style="margin-left: 6px">另存为</span>';
          dialog.wrapper.find('.k-window-title').html(title);
          dialog.wrapper.find('.k-dialog-titlebar').css("background-color", "rgba(27,43,82, .86)");
          $("#save-as-dialog-container").css("background-color", "rgba(27,43,82, .86)");
          dialog.wrapper.find('#save-as-project-name').css("background-color", "rgba(0,0,0, .2)");
          dialog.wrapper.find('#save-as-project-mark').css("background-color", "rgba(0,0,0, .2)");
          dialog.wrapper.find('.k-window-actions .k-dialog-close').css("margin", "-3px 3px 0px -0.5rem");
          break;
        }

        case 'clouddown': {
          window.loadProjectDialog = null;
          if (!window.loadProjectDialog) {
            window.loadProjectDialog = new KQ.Builder.BuilderUi.ProjectLoadDialog("#project-download-container", {filter: "prj"});

            window.loadProjectDialog.on('load', async function (data) {
              KQ.Control.Waiting.show( mapView._getMap(), 'pin', 'meter' );
              await loadProject(data.dataSourceInfo['url']);
            })

            window.loadProjectDialog.on('delete', async function (data) {
              // 初始化删除工程按钮
              $("#confirm-div").kendoConfirm({
                title: "删除远程工程",
                content: "工程删除后无法恢复，确定删除？",
                messages:{
                  okText: "确定",
                  cancelText: "取消",
                }
              }).data("kendoConfirm").result.done(function(){
                $('body').append($('<div id="confirm-div">'));
                window.loadProjectDialog.fire("delete_event", data);
              }).fail(function(){
                $('body').append($('<div id="confirm-div">'));
              });
            })

            window.loadProjectDialog.on("delete_event", async function(data) {
              await deleteProjectFile(data.dataSourceInfo['url']);
            })
          }

          $("#project-download-container").data("kendoWindow").center().open();
          break;
        }

        case 'fold': {
          console.log('do fold1!');
          if (this.options.sidebar)
            this.options.sidebar.close();
          break;
        }
      }
    },
  });
}