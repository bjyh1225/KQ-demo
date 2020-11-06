/**
 * Created by zhumou on 2019/11/12.
 */

'use strict';


// 第一部分 创建html部分
function createParametersHtml(selector) {
  createParameterSrcLayersHtml(selector);
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
}

function isValidElement(selector) {
  return ($(selector).length > 0);
}

function createParameterSrcLayersHtml(selector) {
  if (!isValidElement(selector + " .parameter-src-layers")) {
    return;
  } else {
    $(selector + " .parameter-src-layers").append(`
        <label>源图层</label>
        <div class="control"></div>`
    );
  }
}

function createParameterDestLayersHtml(selector) {
  if (!isValidElement(selector + " .parameter-dest-layers")) {
    return;
  } else {
    $(selector + " .parameter-dest-layers").append(`
        <label>目标图层</label>
        <div class="control"></div>
    `);
  }
}

function createParameterGeometry1Html(selector) {
  if (!isValidElement(selector + " .parameter-operator-geometry1")) {
    return;
  } else {
    $(selector + " .parameter-operator-geometry1").append(`
        <label>几何对象A</label>
        <div class="control"></div>
    `);
  }
}

function createParameterGeometry2Html(selector) {
  if (!isValidElement(selector + " .parameter-operator-geometry2")) {
    return;
  } else {
    $(selector + " .parameter-operator-geometry2").append(`
        <label>几何对象B</label>
        <div class="control"></div>
    `);
  }
}

function createParameterGeoSRSHtml(selector) {
  if (!isValidElement(selector + " .parameter-geo-srs")) {
    return;
  } else {
    $(selector + " .parameter-geo-srs").append(`
        <label>源图形空间参考</label>
        <div class="control-text-area">
            <textarea class="k-textbox"></textarea>
        </div>
    `);
  }
}

function createParameterPrjHtml(selector) {
  if (!isValidElement(selector + " .parameter-prj")) {
    return;
  } else {
    $(selector + " .parameter-prj").append(`
        <label>源空间参考</label>
        <div class="control-text-area">
            <textarea class="k-textbox"></textarea>
        </div>
    `);
  }
}

function createParameterDestGeoSRSHtml(selector) {
  if (!isValidElement(selector + " .parameter-dest-geo-srs")) {
    return;
  } else {
    $(selector + " .parameter-dest-geo-srs").append(`
        <label>目标图形空间参考</label>
        <div class="control-text-area">
            <textarea class="k-textbox"></textarea>
        </div>
    `);
  }
}

function createParameterOutSRSHtml(selector) {
  if (!isValidElement(selector + " .parameter-out-srs")) {
    return;
  } else {
    $(selector + " .parameter-out-srs").append(`
        <label>目标空间参考</label>
        <div class="control-text-area">
            <textarea class="k-textbox"></textarea>
        </div>
    `);
  }
}

function createParameterOutSRSTypeHtml(selector) {
  if (!isValidElement(selector + " .parameter-out-srs-type")) {
    return;
  } else {
    $(selector + " .parameter-out-srs-type").append(`
        <label>目标空间参考类型</label>
        <div class="control"></div>
    `);
  }
}

function createParameterAreaSRSHtml(selector) {
  if (!isValidElement(selector + " .parameter-area-srs")) {
    return;
  } else {
    $(selector + " .parameter-area-srs").append(`
        <label>计算面积所使用的空间参考</label>
        <div class="control-text-area">
            <textarea class="k-textbox"></textarea>
        </div>
    `);
  }
}

function createParameterReturnFieldsAreaHtml(selector) {
  if (!isValidElement(selector + " .parameter-return-fields-area")) {
    return;
  } else {
    $(selector + " .parameter-return-fields-area").append(`
        <label>返回图形的面积 (平方米)</label>
        <div class="control">
            <input type="text" class="k-input k-textbox">
        </div>
    `);
  }
}

function createParameterReturnFieldsLengthHtml(selector) {
  if (!isValidElement(selector + " .parameter-return-fields-length")) {
    return;
  } else {
    $(selector + " .parameter-return-fields-length").append(`
        <label>返回图形的长度 (米)</label>
        <div class="control">
            <input type="text" class="k-input k-textbox">
        </div>
    `);
  }
}

function createParameterToleranceHtml(selector) {
  if (!isValidElement(selector + " .parameter-tolerance")) {
    return;
  } else {
    $(selector + " .parameter-tolerance").append(`
        <label>容差 (米)</label>
        <div class="control">
            <input type="number" class="tolerance">
        </div>
    `);
  }
}

function createParameterCheckParamsPointLimitHtml(selector) {
  if (!isValidElement(selector + " .parameter-geometry-check-params-pointLimit")) {
    return;
  } else {
    $(selector + " .parameter-geometry-check-params-pointLimit").append(`
        <label>容差 (米)</label>
        <div class="control">
            <input class="pointLimit" type="number">
        </div>
    `)
  }
}

function createParameterCheckParamsAreaLimitHtml(selector) {
  if (!isValidElement(selector + " .parameter-geometry-check-params-areaLimit")) {
    return;
  } else {
    $(selector + " .parameter-geometry-check-params-areaLimit").append(`
        <label>最小面积 (平方米)</label>
        <div class="control">
            <input class="areaLimit" type="number">
        </div>
    `)
  }
}

function createParameterGeometryAttributeHtml(selector) {
  if (!isValidElement(selector + " .parameter-geometry-attribute")) {
    return;
  } else {
    $(selector + " .parameter-geometry-attribute").append(`
        <label>需要计算的属性参数</label>
        <div class="control"></div>
    `)
  }
}

function createParameterExportShpFormatHtml(selector) {
  if (!isValidElement(selector + " .parameter-exportshp-format")) {
    return;
  } else {
    $(selector + " .parameter-exportshp-format").append(`
        <label>返回给前端时的格式</label>
        <div class="control"></div>
    `)
  }
}

function createParameterBufferSideTypeHtml(selector) {
  if (!isValidElement(selector + " .parameter-buffer-sideType")) {
    return;
  } else {
    $(selector + " .parameter-buffer-sideType").append(`
        <label>缓冲区方向</label>
        <div class="control">
            <input type="text" class="sideType">
        </div>
    `)
  }
}

function createParameterBufferRadiusHtml(selector) {
  if (!isValidElement(selector + " .parameter-buffer-radius")) {
    return;
  } else {
    $(selector + " .parameter-buffer-radius").append(`
        <label>缓冲半径 (米)</label>
        <div class="control">
            <input type="number" class="radius" min="0" max="1000000">  
        </div>
    `)
  }
}

function createParameterOperatorTypeHtml(selector) {
  if (!isValidElement(selector + " .parameter-operator-type")) {
    return;
  } else {
    $(selector + " .parameter-operator-type").append(`
        <label>图形操作类型</label>
        <div class="control"></div>
    `)
  }
}

function createParameterOperatorCheckGeoHtml(selector) {
  if (!isValidElement(selector + " .parameter-operator-checkGeo")) {
    return;
  } else {
    $(selector + " .parameter-operator-checkGeo").append(`
        <label>是否检查几何</label>
        <div class="control"></div>
    `)
  }
}

function createParameterResultHtml(selector) {
  if (!isValidElement(selector + " .parameter-result")) {
    return;
  } else {
    $(selector + " .parameter-result").append(`
        <label>分析结果</label>
        <div class="control-text-area">
            <textarea class="k-textbox" readonly="readonly"></textarea>
            <div class="copy" style="display: none;">复制</div>
        </div>
    `)
  }
}

function createParameterHandleResultHtml(selector) {
  if (!isValidElement(selector + " .parameter-handle-result")) {
    return;
  } else {
    $(selector + " .parameter-handle-result").append(`
        <label>结果图层名称</label>
        <div class="control">
            <input type="text" class="k-input k-textbox">
            <div class="handle-button">
                <button class="save-layer">保存图层</button>
                <button class="cancel">撤销图层</button>
            </div>
        </div>
    `)
  }
}

function createParameterReturnResultButtonHtml(selector) {
  if (!isValidElement(selector + " .parameter-return-result-button")) {
    return;
  } else {
    $(selector + " .parameter-return-result-button").append(`
      <div class="control">
        <button class="return-result">分析结果</button>
      </div>
    `)
  }
}

function createAnalysisItemRunHtml(selector) {
  if (!isValidElement(selector + " .analysis-item-run")) {
    return;
  } else {
    $(selector + " .analysis-item-run").append(`
        <hr>
        <div class="control k-primary k-button">运行分析</div>
    `);
  }
}


// 第二部分 初始化控件
function initControls(selector) {
  let buildProject = KQ.Builder.BuilderProject.getInstance();
  buildProject.analysis_controls[selector] =  new Map();                  // 存放控件

  initSrcLayersControl(selector);
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

  // 存放运行分析按钮
  buildProject.analysis_controls[selector].set(selector + " run", $(selector + " .analysis-item-run .control"));
}

function setOverlayPanezIndex(zIndex) {
  mapView.getPane('overlayPane').style.zIndex = zIndex;
}

function initSrcLayersControl(selector) {
  if (!isValidElement(selector + " .parameter-src-layers .control")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let control = _createLayersControl(selector + " .parameter-src-layers .control");

    control.bind('change', function () {
      let controlsMap = KQ.Builder.BuilderProject.getInstance().analysis_controls[selector];
      let geoSRS = _getGeoSRSFromControl(selector + " src-layers");
      $(selector + " .parameter-geo-srs .k-textbox").html(geoSRS);

      if (!isValidElement(selector + " .parameter-buffer-sideType .control .sideType")) {
        return;
      } else {
        controlsMap.get(selector + " bufferSideType").setDataSource(bufferSideTypeDataSource(selector));
        controlsMap.get(selector + " bufferSideType").value(bufferSideTypeDataSource(selector)[0])
      }
    });

    buildProject.analysis_controls[selector].set(selector + " src-layers", control);
  }
}

function initDestLayersControl(selector) {
  if (!isValidElement(selector + " .parameter-dest-layers .control")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let control = _createLayersControl(selector + " .parameter-dest-layers .control");

    control.bind('change', function () {
      let geoSRS = _getGeoSRSFromControl(selector + " dest-layers");
      $(selector + " .parameter-dest-geo-srs .k-textbox").html(geoSRS);
    });

    buildProject.analysis_controls[selector].set(selector + " dest-layers", control);
  }
}

function initOperatorGeometry1LayersControl(selector) {
  if (!isValidElement(selector + " .parameter-operator-geometry1 .control")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let control = _createLayersControl(selector + " .parameter-operator-geometry1 .control");

    buildProject.analysis_controls[selector].set(selector + " geometry1-layers", control);
  }
}

function initOperatorGeometry2LayersControl(selector) {
  if (!isValidElement(selector + " .parameter-operator-geometry2 .control")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let control = _createLayersControl(selector + " .parameter-operator-geometry2 .control");

    buildProject.analysis_controls[selector].set(selector + " geometry2-layers", control);
  }
}

function _createLayersControl(selector) {
  let dataSource = KQ.Builder.BuilderCommon.layersControlDataSource();

  return $(selector).kendoDropDownList({
    dataTextField: "name",
    dataValueField: "value",
    dataSource: dataSource,
    index: 0,
  }).data('kendoDropDownList');
}

function _getGeoSRSFromControl(control) {
  let buildProject = KQ.Builder.BuilderProject.getInstance();
  let selector = buildProject.setting.analysisCurrentPage;
  let controlsMap = buildProject.analysis_controls[selector];
  let layersControl = controlsMap.get(control);
  let layerFeatureCollection = KQ.Builder.BuilderLayerDatas.getInstance().getData(layersControl.value());

  return KQ.Builder.BuilderCommon.getGeoSRSFromGeojson(layerFeatureCollection);
}

function initGeoSRSControl(selector) {
  if (!isValidElement(selector + " .parameter-geo-srs .k-textbox")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let geoSRS = _getGeoSRSFromControl(selector + " src-layers");

    $(selector + " .parameter-geo-srs .k-textbox").html(geoSRS);
    buildProject.analysis_controls[selector].set(selector + " geoSRS", $(selector + " .parameter-geo-srs .k-textbox"));
  }
}

function initPrjControl(selector) {
  if (!isValidElement(selector + " .parameter-prj .k-textbox")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    $(selector + " .parameter-prj .k-textbox").html("EPSG:4326");

    buildProject.analysis_controls[selector].set(selector + " prj", $(selector + " .parameter-prj .k-textbox"));
  }
}

function initDestGeoSRSControl(selector) {
  if (!isValidElement(selector + " .parameter-dest-geo-srs .k-textbox")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let geoSRS = _getGeoSRSFromControl(selector + " dest-layers");

    $(selector + " .parameter-dest-geo-srs .k-textbox").html(geoSRS);
    buildProject.analysis_controls[selector].set(selector + " destGeoSRS", $(selector + " .parameter-dest-geo-srs .k-textbox"));
  }
}

function initOutSRSControl(selector) {
  if (!isValidElement(selector + " .parameter-out-srs .k-textbox")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    $(selector + " .parameter-out-srs .k-textbox").html('EPSG:4326');
    buildProject.analysis_controls[selector].set(selector + " outSRS", $(selector + " .parameter-out-srs .k-textbox"));
  }
}

function initOutSRSTypeControl(selector) {
  if (!isValidElement(selector + " .parameter-out-srs-type .control")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let dataSource = ['proj4', 'epsg', 'wkt', 'esri'];

    let control = $(selector + " .parameter-out-srs-type .control").kendoDropDownList({
      dataSource: dataSource,
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " outSRSType", control);
  }
}

function initGeometryAttributeControl(selector) {
  if (!isValidElement(selector + " .parameter-geometry-attribute .control")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let dataSource = [
      {text: '面积', value: 'area'},
      {text: '长度', value: 'length'},
      {text: '中心点', value: 'center'},
      {text: '外接矩形', value: 'bound'},
    ];

    let control = $(selector + " .parameter-geometry-attribute .control").kendoDropDownList({
      dataTextField: "text",
      dataValueField: "value",
      dataSource: dataSource,
      index: 0,
      value: dataSource[0]
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " geometryAttribute", control);
  }
}

function initExportShpFormatControl(selector) {
  if (!isValidElement(selector + " .parameter-exportshp-format .control")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let dataSource = ['filestream'];

    let control = $(selector + " .parameter-exportshp-format .control").kendoMultiSelect({
      dataSource: dataSource,
    }).data('kendoMultiSelect');

    buildProject.analysis_controls[selector].set(selector + " exportShpFormat", control);
  }
}

function bufferSideTypeDataSource(selector) {
  let dataSource;
  let buildProject = KQ.Builder.BuilderProject.getInstance();
  let controlsMap = buildProject.analysis_controls[selector];
  let layersControl = controlsMap.get(selector + " src-layers");
  if (layersControl.value() === '') {
    dataSource = ['both']
  } else {
    let layerFeatureCollection = KQ.Builder.BuilderLayerDatas.getInstance().getData(layersControl && layersControl.value());
    let data = KQ.Common.CommonTools.getGeomFromFeatureCollection(layerFeatureCollection);
    if (data.geometries[0].type === "Point") {
      dataSource = ['outer', 'left', 'both']
    } else if (data.geometries[0].type === "LineString") {
      dataSource = ['left', 'right', 'both']
    } else if (data.geometries[0].type === "Polygon" || "MultiPolygon") {
      dataSource = ['inner', 'outer', 'both']
    } else {
      dataSource = ['both']
    }
  }
  return dataSource;
}

function initBufferSideTypeControl(selector) {
  if (!isValidElement(selector + " .parameter-buffer-sideType .control .sideType")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let control = $(selector + " .parameter-buffer-sideType .control .sideType").kendoDropDownList({
      dataSource: bufferSideTypeDataSource(selector),
      value: bufferSideTypeDataSource(selector)[0]
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " bufferSideType", control);
  }
}

function initOperatorTypeControl(selector) {
  if (!isValidElement(selector + " .parameter-operator-type .control")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let dataSource = ['intersect', 'equals', 'disjoint', 'touches', 'crosses', 'within', 'contains', 'overlaps'];

    let control = $(selector + " .parameter-operator-type .control").kendoDropDownList({
      dataSource: dataSource,
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " operatorType", control);
  }
}

function initOperatorCheckGeoControl(selector) {
  if (!isValidElement(selector + " .parameter-operator-checkGeo .control")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();
    let dataSource = ['true', 'false'];

    let control = $(selector + " .parameter-operator-checkGeo .control").kendoDropDownList({
      dataSource: dataSource,
    }).data('kendoDropDownList');

    buildProject.analysis_controls[selector].set(selector + " operatorCheckGeo", control);
  }
}

function initCheckParamsPointLimitControl(selector) {
  if (!isValidElement(selector + " .parameter-geometry-check-params-pointLimit .control .pointLimit")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();

    let AreaLimitcontrol = $(selector + " .parameter-geometry-check-params-pointLimit .control .pointLimit").kendoNumericTextBox({
      value: 0
    }).data('kendoNumericTextBox');

    buildProject.analysis_controls[selector].set(selector + " pointLimit", AreaLimitcontrol);
  }
}

function initCheckParamsAreaLimitControl(selector) {
  if (!isValidElement(selector + " .parameter-geometry-check-params-areaLimit .control .areaLimit")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();

    let AreaLimitcontrol = $(selector + " .parameter-geometry-check-params-areaLimit .control .areaLimit").kendoNumericTextBox({
      value: 0
    }).data('kendoNumericTextBox');

    buildProject.analysis_controls[selector].set(selector + " areaLimit", AreaLimitcontrol);
  }
}

function initBufferRadiusControl(selector) {
  if (!isValidElement(selector + " .parameter-buffer-radius .control .radius")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();

    let control = $(selector + " .parameter-buffer-radius .control .radius").kendoNumericTextBox({
      value: 1
    }).data('kendoNumericTextBox');

    buildProject.analysis_controls[selector].set(selector + " bufferRadius", control);
  }
}

function initResultControl(selector) {
  if (!isValidElement(selector + " .parameter-result .k-textbox")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();

    let resultControl = $(selector + " .parameter-result .k-textbox");
    let copyControl = $(selector + " .parameter-result .copy");

    buildProject.analysis_controls[selector].set(selector + " result", resultControl);
    buildProject.analysis_controls[selector].set(selector + " copy", copyControl);
  }
}

function initHandleResultControl(selector) {
  if (!isValidElement(selector + " .parameter-handle-result .control")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();

    let inputControl = $(selector + " .parameter-handle-result .control .k-input.k-textbox");
    let saveLayerControl = $(selector + " .parameter-handle-result .control .save-layer").kendoButton({
      enable: false
    }).data('kendoButton');

    let cancelControl = $(selector + " .parameter-handle-result .control .cancel").kendoButton({
      enable: false
    }).data('kendoButton');

    buildProject.analysis_controls[selector].set(selector + " resultLayerName", inputControl);
    buildProject.analysis_controls[selector].set(selector + " saveLayer", saveLayerControl);
    buildProject.analysis_controls[selector].set(selector + " cancel", cancelControl);
  }
}

async function saveLayer(fileName, geoJSON) {
  // 第一步 上传JSON数据到服务器
  let o = {
    contentJson: geoJSON.toGeoJSON(),
    fileName: fileName,
    fileType: "geojson",
  };

  let res = await KQ.Common.NetworkTools.uploadJsonToFileServer(o);

  if (res.result == "error") {
    KQ.Control.Notification.getInstance().showError("保存图层失败！");
    return;
  }

  // 组织图层信息
  let dataSourceInfo = {
    type: "STATIC_DATA",
    url: res.downloadPath,
    name: fileName,
  };

  // 加载图层
  let layer = await KQ.Builder.BuilderCommon.addNewLayer(dataSourceInfo);
  let render = layer.getRender();

  // 组织options
  let options = L.extend(render.options, {
    fillColor: "red",
    fillOpacity: 0.2,
    lineColor: "red",
    lineWidth: 3,
  });

  // 删除原图层、渲染新图层
  geoJSON.remove();
  render.setOptions(options);

  KQ.Builder.BuilderProject.getInstance().siderbar.open("layers");
  KQ.Data.DataManager.getInstance().addWebFileDataSourceInfo(dataSourceInfo);
}

function refreshButtonState(selector, buttonState) {
  let controlsMap = KQ.Builder.BuilderProject.getInstance().analysis_controls[selector];

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
}

function initReturnFieldsAreaControl(selector) {
  if (!isValidElement(selector + " .parameter-return-fields-area .control .k-input.k-textbox")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();

    let control = $(selector + " .parameter-return-fields-area .control .k-input.k-textbox");

    buildProject.analysis_controls[selector].set(selector + " returnFieldsArea", control);
  }
}

function initReturnFieldsLengthControl(selector) {
  if (!isValidElement(selector + " .parameter-return-fields-length .control .k-input.k-textbox")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();

    let control = $(selector + " .parameter-return-fields-length .control .k-input.k-textbox");

    buildProject.analysis_controls[selector].set(selector + " returnFieldsLength", control);
  }
}

function initToleranceControl(selector) {
  if (!isValidElement(selector + " .parameter-tolerance .control .tolerance")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();

    let control = $(selector + " .parameter-tolerance .control .tolerance").kendoNumericTextBox({
      value: 0,
      // decimals: 8,
      // format: '{0:n8}',
    }).data('kendoNumericTextBox');

    buildProject.analysis_controls[selector].set(selector + " tolerance", control);
  }
}

function returnFields(selector, data, fields) {
  let buildProject = KQ.Builder.BuilderProject.getInstance();
  let controlsMap =  buildProject.analysis_controls[selector];

  if (fields === 'area') {
    // 得到输出图形的面积
    let returnFieldsAreaControl = controlsMap.get(selector + " returnFieldsArea");
    if (data.type === 'GeometryCollection') {
      let area = 0;
      for (let i = 0; i < data.geometries.length; i++) {
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
    let returnFieldsLengthControl = controlsMap.get(selector + " returnFieldsLength");
    if (data.type === 'GeometryCollection') {
      let length = 0;
      for (let i = 0; i < data.geometries.length; i++) {
        if (data.geometries[i].Length == null) {
          data.geometries[i].Length = 0;
        }
        length += data.geometries[i].Length;
      }
      returnFieldsLengthControl.val(length.toFixed(4));
    } else {
      returnFieldsLengthControl.val(data.Length.toFixed(4));
    }
  }
}

function copyResult(selector) {
  let buildProject = KQ.Builder.BuilderProject.getInstance();
  let controlsMap =  buildProject.analysis_controls[selector];
  let copyControl = controlsMap.get(selector + " copy");
  let resultControl = $(selector + " .parameter-result .control-text-area");
  let resultText = controlsMap.get(selector + " result");

  resultControl.mouseenter(function () {
    copyControl.css('display', 'block');
  });

  resultControl.mouseleave(function () {
    copyControl.css('display', 'none')
  });

  copyControl.click(function () {
    resultText.select();
    document.execCommand('copy');

    let result = resultText.val();
    if (result !== '') {
      copyControl.html('复制成功');
      setTimeout(function () {
        copyControl.html('复制');
      }, 1000);
    }
    // if (result === '') {
    //   KQ.Control.Notification.getInstance().showError('结果复制失败！', 0);
    // } else {
    //   KQ.Control.Notification.getInstance().showSuccess('结果复制成功！', 0);
    // }
  })
}

function initReturnResultButtonControl(selector) {
  if (!isValidElement(selector + " .parameter-return-result-button .control .return-result")) {
    return;
  } else {
    let buildProject = KQ.Builder.BuilderProject.getInstance();

    let returnResultButtonControl = $(selector + " .parameter-return-result-button .control .return-result").kendoButton({
      enable: false
    }).data('kendoButton');

    buildProject.analysis_controls[selector].set(selector + " returnResultButton", returnResultButtonControl);
  }
}

function returnResultTableDataSource(data, dataSource, attributeNames) {
  if (attributeNames === 'area') {
    for (let i = 0; i < data.length; i++) {
      dataSource.push(data[i]);
    }
  } else if (attributeNames === 'length') {
    for (let i = 0; i < data.length; i++) {
      dataSource.push(data[i]);
    }
  } else if (attributeNames === 'center') {
    for (let i = 0; i < data.length; i++) {
      dataSource.push({
        id: data[i].id,
        center: data[i].center.toString()
      });
    }
  } else if (attributeNames === 'bound') {
    for (let i = 0; i < data.length; i++) {
      dataSource.push({
        id: data[i].id,
        bound: data[i].bound.toString()
      });
    }
  }
}
