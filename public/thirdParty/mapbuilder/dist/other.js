(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
L.Control.StyleEditor = L.Control.extend({
  includes: L.Mixin.Events,

  options: {
    position: 'topleft',
    enabled: false,
    colorRamp: [ '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e', '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50', '#f1c40f', '#e67e22', '#e74c3c', '#ecf0f1', '#95a5a6', '#f39c12', '#d35400', '#c0392b', '#bdc3c7', '#7f8c8d' ],
    // markerApi: 'http://api.tiles.mapbox.com/v3/marker/',
    markerApi: '../../images/markers/',
    markers: [ 'circle-stroked', 'circle', 'square-stroked', 'square', 'triangle-stroked', 'triangle', 'star-stroked', 'star', 'cross', 'marker-stroked', 'marker', 'religious-jewish', 'religious-christian', 'religious-muslim', 'cemetery', 'rocket', 'airport', 'heliport', 'rail', 'rail-metro', 'rail-light', 'bus', 'fuel', 'parking', 'parking-garage', 'airfield', 'roadblock', 'ferry', 'harbor', 'bicycle', 'park', 'park2', 'museum', 'lodging', 'monument', 'zoo', 'garden', 'campsite', 'theatre', 'art-gallery', 'pitch', 'soccer', 'america-football', 'tennis', 'basketball', 'baseball', 'golf', 'swimming', 'cricket', 'skiing', 'school', 'college', 'library', 'post', 'fire-station', 'town-hall', 'police', 'prison', 'embassy', 'beer', 'restaurant', 'cafe', 'shop', 'fast-food', 'bar', 'bank', 'grocery', 'cinema', 'pharmacy', 'hospital', 'danger', 'industrial', 'warehouse', 'commercial', 'building', 'place-of-worship', 'alcohol-shop', 'logging', 'oil-well', 'slaughterhouse', 'dam', 'water', 'wetland', 'disability', 'telephone', 'emergency-telephone', 'toilets', 'waste-basket', 'music', 'land-use', 'city', 'town', 'village', 'farm', 'bakery', 'dog-park', 'lighthouse', 'clothing-store', 'polling-place', 'playground', 'entrance', 'heart', 'london-underground', 'minefield', 'rail-underground', 'rail-above', 'camera', 'laundry', 'car', 'suitcase', 'hairdresser', 'chemist', 'mobilephone', 'scooter' ],
    editlayers: [],
    layerGroups: [],
    openOnLeafletDraw: true,
    showTooltip: true,
    strings: {
      tooltip: 'Click on the element you want to style',
      tooltipNext: 'Choose another element you want to style'
    },
    useGrouping: true,
    styleForm: undefined,
    tooltipCallback: function (self) {
      if (!self.options.tooltipWrapper)
        self.options.tooltipWrapper = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip-wrapper', document.body);

      if (!self.options.tooltip)
        self.options.tooltip = L.DomUtil.create('div', 'leaflet-styleeditor-tooltip', self.options.tooltipWrapper);

      self.options.tooltip.innerHTML = L.styleEditorLocal.tooltip;
    },
    errorCallback: function (msg) {
      console.log('error:' + msg);
    },
    bufferCallback: function (obj) {
      console.log('buffer!');
    },
  },

  onAdd: function (map) {
    this.options.map = map;
    return this.createUi();
  },

  createUi: function () {
    var touchclass = '';
    if (L.Browser.touch) {
      touchclass = ' leaflet-touch';
    }

    var controlDiv = this.options.controlDiv = L.DomUtil.create('div', 'leaflet-control-styleeditor' + touchclass);
    var controlUI = this.options.controlUI = L.DomUtil.create('div', 'leaflet-control-styleeditor-interior' + touchclass, controlDiv);
    // controlUI.title = 'Style Editor';
    controlUI.title = L.styleEditorLocal.buttonTitle;

    var styleEditorDiv = this.options.styleEditorDiv = L.DomUtil.create('div', 'leaflet-styleeditor', this.options.map._container);
    this.options.styleEditorHeader = L.DomUtil.create('div', 'leaflet-styleeditor-header', styleEditorDiv);
    var styleEditorInterior = L.DomUtil.create('div', 'leaflet-styleeditor-interior', styleEditorDiv);

    styleEditorDiv.style.zIndex = 10000;

    var styleEditorUi = {};
    var iconDiv = styleEditorUi.iconDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    var markerColorDiv = styleEditorUi.markerColorDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    var sizeDiv = styleEditorUi.sizeDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    var colorDiv = styleEditorUi.colorDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    var opacityDiv = styleEditorUi.opacityDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    var lineStrokeDiv = styleEditorUi.lineStrokeDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    var fillColorDiv = styleEditorUi.fillColorDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    var fillOpacityDiv = styleEditorUi.fillOpacityDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);

    var pointBufferTypeDiv = styleEditorUi.pointBufferTypeDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    var lineBufferTypeDiv = styleEditorUi.lineBufferTypeDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    var fillBufferTypeDiv = styleEditorUi.fillBufferTypeDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    var bufferDiv = styleEditorUi.bufferDiv = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', styleEditorInterior);
    this.options.styleEditorUi = styleEditorUi;

    this.addDomEvents();
    this.addLeafletDrawEvents();
    this.addButtons();

    this.options.styleForm = new L.StyleForms({
      colorRamp: this.options.colorRamp,
      styleEditorUi: styleEditorUi,
      styleEditorDiv: styleEditorDiv,
      markerApi: this.options.markerApi,
      markers: this.options.markers,
      map: this.options.map,
      errorCallback: this.options.errorCallback,
      bufferCallback: this.options.bufferCallback,

      // add by liwei
      is_use_marker_icon: this.options.is_use_marker_icon,
    });

    return controlDiv;
  },

  addDomEvents: function () {
    L.DomEvent.addListener(this.options.controlDiv, 'click', function (e) {
      this.clickHandler(e);
      e.stopPropagation();
    }, this);
    L.DomEvent.addListener(this.options.controlDiv, 'dblclick', function (e) { e.stopPropagation(); }, this);
    L.DomEvent.addListener(this.options.styleEditorDiv, 'click', L.DomEvent.stopPropagation);
    L.DomEvent.addListener(this.options.styleEditorDiv, 'mouseenter', this.disableLeafletActions, this);
    L.DomEvent.addListener(this.options.styleEditorDiv, 'mouseleave', this.enableLeafletActions, this);

    // don't let double clicks and mousedown get to the map
    L.DomEvent.addListener(this.options.controlUI, 'dblclick', L.DomEvent.stop);
    L.DomEvent.addListener(this.options.controlUI, 'mousedown', L.DomEvent.stop);
  },

  addLeafletDrawEvents: function () {
    if (!this.options.openOnLeafletDraw) {
      return;
    }
    if (!L.Control.Draw) {
      return;
    }

    // 在元素被创建后自动弹出编辑器
    // this.options.map.on('draw:created', function(layer) {
    //     this.initChangeStyle({
    //         "target": layer.layer
    //     });
    // }, this);
  },

  addButtons: function () {
    var nextBtn = L.DomUtil.create('button', 'leaflet-styleeditor-button styleeditor-nextBtn', this.options.styleEditorHeader);
    nextBtn.title = L.styleEditorLocal.tooltipNext;

    L.DomEvent.addListener(nextBtn, 'click', function (e) {
      this.hideEditor();

      if (L.DomUtil.hasClass(this.options.controlUI, 'enabled'))
        this.createTooltip();

      e.stopPropagation();
    }, this);
  },

  clickHandler: function (e) {
    this.options.enabled = !this.options.enabled;

    if (this.options.enabled) {
      this.enable();
      this.fire('enabled', {});
    } else {
      L.DomUtil.removeClass(this.options.controlUI, 'enabled');
      this.disable();
    }
  },

  disableLeafletActions: function () {
    var m = this.options.map;

    m.dragging.disable();
    m.touchZoom.disable();
    m.doubleClickZoom.disable();
    m.scrollWheelZoom.disable();
    m.boxZoom.disable();
    m.keyboard.disable();
  },

  enableLeafletActions: function () {
    var m = this.options.map;

    m.dragging.enable();
    m.touchZoom.enable();
    m.doubleClickZoom.enable();
    m.scrollWheelZoom.enable();
    m.boxZoom.enable();
    m.keyboard.enable();
  },

  enable: function () {
    L.DomUtil.addClass(this.options.controlUI, "enabled");
    this.options.map.eachLayer(this.addEditClickEvents, this);
    this.createTooltip();
  },

  disable: function () {
    this.options.editlayers.forEach(this.removeEditClickEvents, this);
    this.options.editlayers = [];
    this.options.layerGroups = [];
    this.hideEditor();
    this.removeTooltip();
  },

  addEditClickEvents: function (layer) {
    if (this.options.useGrouping && layer instanceof L.LayerGroup) {
      this.options.layerGroups.push(layer);
    } else if (layer instanceof L.Marker || layer instanceof L.Path || layer instanceof L.GeoJSON) {
      var evt = layer.on('click', this.initChangeStyle, this);
      this.options.editlayers.push(evt);
    }
  },

  removeEditClickEvents: function (layer) {
    layer.off('click', this.initChangeStyle, this);
  },

  hideEditor: function () {
    L.DomUtil.removeClass(this.options.styleEditorDiv, 'editor-enabled');
  },

  showEditor: function () {
    var editorDiv = this.options.styleEditorDiv;
    if (!L.DomUtil.hasClass(editorDiv, 'editor-enabled')) {
      L.DomUtil.addClass(editorDiv, 'editor-enabled');
    }
  },

  initChangeStyle: function (e) {
    this.options.currentElement = (this.options.useGrouping) ? this.getMatchingElement(e) : e;

    this.showEditor();
    this.removeTooltip();

    var layer = e.target;
    if (layer instanceof L.Marker) {
      // marker
      this.showMarkerForm();
    } else {
      // layer with of type L.GeoJSON or L.Path (polyline, polygon, ...)
      this.showGeometryForm();
    }
  },

  showGeometryForm: function () {
    this.options.styleForm.showGeometryForm(
      this.options.currentElement
    );
  },

  showMarkerForm: function () {
    this.options.styleForm.showMarkerForm(
      this.options.currentElement
    );
  },

  createTooltip: function () {
    if (!this.options.showTooltip) {
      return;
    }

    this.options.tooltipCallback(this);
  },

  getMatchingElement: function (e) {
    var group = null,
      layer = e.target;

    for (i = 0; i < this.options.layerGroups.length; ++i) {
      group = this.options.layerGroups[ i ];
      if (group && layer != group && group.hasLayer(layer)) {
        // we use the opacity style to check for correct object
        if (!group.options || !group.options.opacity) {
          group.options = layer.options;

          // special handling for layers... we pass the setIcon function
          if (layer.setIcon) {
            group.setIcon = function (icon) {
              group.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                  layer.setIcon(icon);
                }
              });
            };
          }
        }

        return this.getMatchingElement({
          target: group
        });
      }
    }

    return e;
  },

  removeTooltip: function () {
    if (this.options.tooltip && this.options.tooltip.parentNode) {
      this.options.tooltip.remove();
      this.options.tooltip = undefined;
    }
  },

  isEnabled: function () {
    return this.options.enabled;
  },
});

L.control.styleEditor = function (options) {
  return new L.Control.StyleEditor(options);
};

},{}],2:[function(require,module,exports){
/*
Style options based on:
- path: http://leafletjs.com/reference.html#path-options
- icon: http://leafletjs.com/reference.html#icon

Markers from:
- Maki Markers from mapbox: https://www.mapbox.com/maki/
*/

L.StyleForms = L.Class.extend({
  options: {
    currentMarkerStyle: {
      size: 'm',
      color: '3498db'
    },
  },

  initialize: function (options) {
    L.setOptions(this, options);
    this.createIconUrl();
    this.createMarkerColor();
    this.createMarkerSize();
    this.createColor();
    this.createOpacity();
    this.createStroke();
    this.createFillColor();
    this.createFillOpacity();

    this.createPointBufferType();
    this.createLineBufferType();
    this.createFillBufferType();
    this.createBuffer();

    this.addDOMEvents();
  },

  addDOMEvents: function () {
    L.DomEvent.addListener(this.options.map, 'click', this.hideSelectInput, this);
    L.DomEvent.addListener(this.options.styleEditorDiv, 'click', this.hideSelectInput, this);
  },

  clearForm: function () {
    var styleEditorUi = this.options.styleEditorUi;
    this.hideSelectInput();

    Object.keys(styleEditorUi).forEach(function (key) {
      var element = styleEditorUi[ key ];
      if (element.innerHTML) {
        this.hideElement(element);
      }
    }, this);
  },

  showGeometryForm: function (currentElement) {
    this.clearForm();

    this.options.currentElement = currentElement;

    var styleEditorUi = this.options.styleEditorUi;
    var geometryOptions = currentElement.target.options;
    if (geometryOptions.opacity)
      styleEditorUi.opacityInput.value = geometryOptions.opacity;
    else
      styleEditorUi.opacityInput.value = 1;

    if (geometryOptions.fillOpacity)
      styleEditorUi.fillOpacityInput.value = geometryOptions.fillOpacity;
    else
      styleEditorUi.fillOpacityInput.value = 0.2;

    this.showElement(styleEditorUi.colorDiv);
    this.showElement(styleEditorUi.opacityDiv);
    this.showElement(styleEditorUi.lineStrokeDiv);

    var t = currentElement.target;
    var isPlot = t.options.isPlot ? true : false;
    if (t instanceof L.Polygon || t instanceof L.LayerGroup ||
      (t instanceof L.Circle) || (t instanceof L.CircleMarker)) {
      // (t instanceof L.Circle && ! (t instanceof L.CircleMarker))) {
      this.showElement(styleEditorUi.fillColorDiv);
      this.showElement(styleEditorUi.fillOpacityDiv);

      if (t instanceof L.Polygon || t instanceof L.LayerGroup || (t instanceof L.Circle && !(t instanceof L.Marker))) {
        if (!isPlot)
          this.showElement(styleEditorUi.fillBufferTypeDiv);
      }
      else {
        if (!isPlot)
          this.showElement(styleEditorUi.pointBufferTypeDiv);
      }
    }
    else if (t instanceof L.Polyline) {
      if (!isPlot)
        this.showElement(styleEditorUi.lineBufferTypeDiv);
    }

    if (!isPlot)
      this.showElement(styleEditorUi.bufferDiv);
  },

  showMarkerForm: function (currentElement) {
    this.clearForm();

    this.options.currentElement = currentElement;

    var iconOptions = currentElement.target.options.icon.options;
    var markerStyle = this.options.currentMarkerStyle;
    if (iconOptions.iconColor)
      markerStyle.color = iconOptions.iconColor;
    if (iconOptions.icon)
      markerStyle.icon = iconOptions.icon;
    if (iconOptions.iconSizeChar)
      markerStyle.size = iconOptions.iconSizeChar;

    var styleEditorUi = this.options.styleEditorUi;
    // this.showElement(styleEditorUi.iconDiv);
    // this.showElement(styleEditorUi.markerColorDiv);
    // this.showElement(styleEditorUi.sizeDiv);
    // this.styleSelectInput();

    // add by liwei
    if (this.options.is_use_marker_icon) {
      this.showElement(styleEditorUi.iconDiv);
      this.showElement(styleEditorUi.markerColorDiv);
      this.showElement(styleEditorUi.sizeDiv);
      this.styleSelectInput();
    }

    this.showElement(styleEditorUi.pointBufferTypeDiv);
    this.showElement(styleEditorUi.bufferDiv);
  },

  setNewMarker: function () {
    var markerStyle = this.options.currentMarkerStyle;

    if (markerStyle.size && markerStyle.icon && markerStyle.color) {
      var iconSize;
      switch (markerStyle.size) {
        case 's':
          iconSize = [ 20, 50 ];
          break;
        case 'm':
          iconSize = [ 30, 70 ];
          break;
        case 'l':
          iconSize = [ 35, 90 ];
          break;
      }

      var newIcon = new L.Icon({
        iconUrl: this.getIconSrc(),
        iconSize: iconSize,
        iconSizeChar: markerStyle.size,
        iconColor: markerStyle.color,
        icon: markerStyle.icon,
        iconAnchor: [ iconSize[ 0 ] / 2, iconSize[ 1 ] / 2 ],
        popupAnchor: [ 0, -iconSize[ 1 ] / 2 ]
      });
      var currentElement = this.options.currentElement.target;
      currentElement.setIcon(newIcon);
      this.fireChangeEvent(currentElement);
    }
    this.hideSelectInput();
    this.styleSelectInput();
  },

  showElement: function (element) {
    if (element)
      L.DomUtil.removeClass(element, 'leaflet-styleeditor-hidden');
  },

  hideElement: function (element) {
    if (element)
      L.DomUtil.addClass(element, 'leaflet-styleeditor-hidden');
  },

  createIconUrl: function () {
    var iconDiv = this.options.styleEditorUi.iconDiv;

    var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', iconDiv);
    label.innerHTML = L.styleEditorLocal.icon;

    this.createSelectInput(iconDiv, function (e) {
      var value = e.target.getAttribute('value');

      this.options.selectBoxImage.setAttribute('value', value);
      this.options.currentMarkerStyle.icon = value;

      this.setNewMarker();
    }.bind(this), this.options.markers);
  },

  createMarkerColor: function () {
    var markerColorDiv = this.options.styleEditorUi.markerColorDiv;

    var colorUi = this.options.colorUi = L.DomUtil.create('div', 'leaflet-styleeditor-ui-element', markerColorDiv);

    var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', colorUi);
    label.innerHTML = L.styleEditorLocal.color;

    this.createColorPicker(markerColorDiv, function (e) {
      var color = this.rgbToHex(e.target.style.backgroundColor);
      this.options.currentMarkerStyle.color = color.replace("#", "");
      this.setNewMarker();
    }.bind(this));
  },

  createMarkerSize: function () {
    var sizeDiv = this.options.styleEditorUi.sizeDiv;

    var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', sizeDiv);
    label.innerHTML = L.styleEditorLocal.size;

    var s = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-small', this.options.styleEditorUi.sizeDiv);
    var m = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-medium', this.options.styleEditorUi.sizeDiv);
    var l = L.DomUtil.create('div', 'leaflet-styleeditor-sizeicon sizeicon-large', this.options.styleEditorUi.sizeDiv);

    L.DomEvent.addListener(s, 'click', function () {
      this.options.currentMarkerStyle.size = 's';
      this.setNewMarker();
    }, this);

    L.DomEvent.addListener(m, 'click', function () {
      this.options.currentMarkerStyle.size = 'm';
      this.setNewMarker();
    }, this);

    L.DomEvent.addListener(l, 'click', function () {
      this.options.currentMarkerStyle.size = 'l';
      this.setNewMarker();
    }, this);
  },

  createColor: function () {
    var colorDiv = this.options.styleEditorUi.colorDiv;

    var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', colorDiv);
    label.innerHTML = L.styleEditorLocal.color;

    this.createColorPicker(colorDiv, function (e) {
      var color = this.rgbToHex(e.target.style.backgroundColor);
      this.setStyle('color', color);
    }.bind(this));
  },

  createStroke: function () {
    var lineStrokeDiv = this.options.styleEditorUi.lineStrokeDiv;

    var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', lineStrokeDiv);
    label.innerHTML = L.styleEditorLocal.lineStroke;

    var stroke1 = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', lineStrokeDiv);
    stroke1.style.backgroundPosition = "0px -75px";

    var stroke2 = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', lineStrokeDiv);
    stroke2.style.backgroundPosition = "0px -95px";

    var stroke3 = L.DomUtil.create('div', 'leaflet-styleeditor-stroke', lineStrokeDiv);
    stroke3.style.backgroundPosition = "0px -115px";

    // L.DomUtil.create('br', 'bla', lineStrokeDiv);

    L.DomEvent.addListener(stroke1, 'click', function (e) {
      this.setStyle('dashArray', '1');
    }, this);
    L.DomEvent.addListener(stroke2, 'click', function (e) {
      this.setStyle('dashArray', '10,10');
    }, this);
    L.DomEvent.addListener(stroke3, 'click', function (e) {
      this.setStyle('dashArray', '15, 10, 1, 10');
    }, this);
  },

  createOpacity: function () {
    var opacityDiv = this.options.styleEditorUi.opacityDiv;

    var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', opacityDiv);
    label.innerHTML = L.styleEditorLocal.opacity;

    this.options.styleEditorUi.opacityInput = this.createNumberInput(opacityDiv, function (e) {
      var value = e.target.value;
      this.setStyle('opacity', value);
    }.bind(this), 0.7, 0, 1, 0.1);
  },

  createFillColor: function () {
    var fillColorDiv = this.options.styleEditorUi.fillColorDiv;

    var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', fillColorDiv);
    label.innerHTML = L.styleEditorLocal.fillColor;

    this.createColorPicker(fillColorDiv, function (e) {
      var color = this.rgbToHex(e.target.style.backgroundColor);
      this.setStyle('fillColor', color);
    }.bind(this));
  },

  createFillOpacity: function () {
    var fillOpacityDiv = this.options.styleEditorUi.fillOpacityDiv;

    var label = L.DomUtil.create('label', 'leaflet-styleeditor-label', fillOpacityDiv);
    label.innerHTML = L.styleEditorLocal.fillOpacity;

    this.options.styleEditorUi.fillOpacityInput = this.createNumberInput(fillOpacityDiv, function (e) {
      var value = e.target.value;
      this.setStyle('fillOpacity', value);
    }.bind(this), 0.4, 0, 1, 0.1);
  },

  createColorPicker: function (parentDiv, callback) {
    var colorPickerDiv = L.DomUtil.create('div', 'leaflet-styleeditor-colorpicker', parentDiv);

    this.options.colorRamp.forEach(function (color) {
      var elem = L.DomUtil.create('div', 'leaflet-styleeditor-color', colorPickerDiv);
      elem.style.backgroundColor = color;

      L.DomEvent.addListener(elem, 'click', function (e) {
        e.stopPropagation();
        callback(e);
      });
    }, this);

    // L.DomUtil.create('br', '', parentDiv);
    // L.DomUtil.create('br', '', parentDiv);

    return colorPickerDiv;
  },

  createNumberInput: function (parentDiv, callback, value, min, max, step) {
    var numberInput = L.DomUtil.create('input', 'leaflet-styleeditor-input', parentDiv);
    numberInput.setAttribute('type', 'number');
    numberInput.setAttribute('value', value);
    numberInput.setAttribute('min', min);
    numberInput.setAttribute('max', max);
    numberInput.setAttribute('step', step);

    L.DomEvent.addListener(numberInput, 'change', function (e) {
      e.stopPropagation();
      callback(e);
    });
    L.DomEvent.addListener(numberInput, 'keyup', function (e) {
      e.stopPropagation();
      callback(e);
    });

    // L.DomUtil.create('br', '', parentDiv);
    // L.DomUtil.create('br', '', parentDiv);

    return numberInput;
  },

  createSelectInput: function (parentDiv, callback, options) {
    var selectBox = L.DomUtil.create('button', 'leaflet-styleeditor-select leaflet-styleeditor-select-marker', parentDiv);
    var selectBoxImage = this.options.selectBoxImage = L.DomUtil.create('img', 'leaflet-styleeditor-select-image', selectBox);

    var selectOptionWrapper = this.options.selectOptionWrapper =
      L.DomUtil.create('ul', 'leaflet-styleeditor-select-option-wrapper leaflet-styleeditor-hidden', parentDiv);
    selectOptionWrapper.id = 'leaflet-styleeditor-select-option-wrapper';

    L.DomEvent.addListener(selectBox, 'click', this.toggleSelectInput, this);
    L.DomEvent.addListener(selectBoxImage, 'click', this.toggleSelectInput, this);

    this.options.selectImages = [];

    options.forEach(function (option) {
      var selectOption = L.DomUtil.create('li', 'leaflet-styleeditor-select-option', selectOptionWrapper);
      var selectImage = L.DomUtil.create('img', 'leaflet-styleeditor-select-option-image', selectOption);
      selectImage.setAttribute('value', option);
      this.options.selectImages.push(selectImage);
    }, this);

    L.DomEvent.addListener(selectOptionWrapper, 'click', function (e) {
      e.stopPropagation();
      if (e.target.nodeName === 'UL')
        return;

      var target = e.target;
      if (e.target.nodeName === 'LI')
        target = e.target.childNodes[ 0 ];

      callback({
        'target': target
      });
    }, this);

    return selectBox;
  },

  styleSelectInput: function () {
    var selectBoxImage = this.options.selectBoxImage;
    if (this.options.currentElement) {
      var selectBoxImageValue = this.options.currentElement.target.options.icon.options.icon;
      if (selectBoxImageValue) {
        selectBoxImage.src = this.getIconSrc('s', selectBoxImageValue);
        this.showElement(selectBoxImage);
      } else
        this.hideElement(selectBoxImage);
    } else {
      this.hideElement(selectBoxImage);
    }

    var selectImages = this.options.selectImages;
    selectImages.forEach(function (selectImage) {
      selectImage.src = this.getIconSrc('s', selectImage.getAttribute('value'));
    }, this);

    this.hideSelectInput();
  },

  toggleSelectInput: function (e) {
    L.DomEvent.stopPropagation(e);

    var selectOptionWrapper = this.options.selectOptionWrapper;

    if (L.DomUtil.hasClass(selectOptionWrapper, 'leaflet-styleeditor-hidden'))
      this.showElement(selectOptionWrapper);
    else
      this.hideElement(selectOptionWrapper);
  },

  hideSelectInput: function (e) {
    if (e && e.target && e.target.tagName && L.DomUtil.hasClass(e.target, 'leaflet-styleeditor-select'))
      return;

    var selectOptionWrapper = this.options.selectOptionWrapper;
    if (!selectOptionWrapper)
      selectOptionWrapper = L.DomUtil.get('leaflet-styleeditor-select-option-wrapper');
    this.hideElement(selectOptionWrapper);
  },

  getIconSrc: function (size, icon) {
    var markerStyle = this.options.currentMarkerStyle;
    if (!icon)
      icon = markerStyle.icon;
    if (!size)
      size = markerStyle.size;
    // return this.options.markerApi + 'pin-' + size + '-' + icon+ '+' + markerStyle.color + '@2x.png'
    return this.options.markerApi + size + '/pin-' + size + '-' + icon + '+' + markerStyle.color + '@2x.png'
  },

  setStyle: function (option, value) {
    var newStyle = {};
    newStyle[ option ] = value;
    var currentElement = this.options.currentElement.target;
    currentElement.setStyle(newStyle);
    this.fireChangeEvent(currentElement);

    // add by liwei
    if (currentElement.getLayers) {
      var layers = currentElement.getLayers();
      if (layers.length > 0) {
        currentElement.options = JSON.parse(JSON.stringify(layers[ 0 ].options));
        delete currentElement.options;
      }
    }
  },

  fireChangeEvent: function (element) {
    this.options.map.fireEvent('styleeditor:changed', element);
  },

  componentToHex: function (c) {
    var hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  },

  rgbToHex: function (rgb) {
    rgb = rgb.substring(4).replace(")", "").split(",");
    return "#" + this.componentToHex(parseInt(rgb[ 0 ], 10)) + this.componentToHex(parseInt(rgb[ 1 ], 10)) + this.componentToHex(parseInt(rgb[ 2 ], 10));
  },

  createPointBufferType: function () {
    var pointBufferTypeDiv = this.options.styleEditorUi.pointBufferTypeDiv;

    // 缓冲类型
    var label_type_container = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', pointBufferTypeDiv);
    L.DomUtil.create('br', '', label_type_container);
    var label_type = L.DomUtil.create('label', 'leaflet-styleeditor-label', label_type_container);
    label_type.innerHTML = L.styleEditorLocal.buffer.type;

    var select_type = L.DomUtil.create('select', 'leaflet-styleeditor-select', label_type_container);
    var select_type_option0 = L.DomUtil.create('option', null, select_type);
    select_type_option0.text = L.styleEditorLocal.buffer.outer;

    select_type.add(select_type_option0, null);

    // 0:outer
    this.point_buffer_type = KQ.Common.CommonValues.bufferTypes.outer;
  },

  createLineBufferType: function () {
    var lineBufferTypeDiv = this.options.styleEditorUi.lineBufferTypeDiv;

    // 缓冲类型
    var label_type_container = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', lineBufferTypeDiv);
    L.DomUtil.create('br', '', label_type_container);
    var label_type = L.DomUtil.create('label', 'leaflet-styleeditor-label', label_type_container);
    label_type.innerHTML = L.styleEditorLocal.buffer.type;

    var select_type = L.DomUtil.create('select', 'leaflet-styleeditor-select', label_type_container);
    // var select_type_option0 = L.DomUtil.create('option', null, select_type);
    // select_type_option0.text = L.styleEditorLocal.buffer.left;
    // var select_type_option1 = L.DomUtil.create('option', null, select_type);
    // select_type_option1.text = L.styleEditorLocal.buffer.right;
    var select_type_option2 = L.DomUtil.create('option', null, select_type);
    select_type_option2.text = L.styleEditorLocal.buffer.both;

    // select_type.add(select_type_option0, null);
    // select_type.add(select_type_option1, null);
    select_type.add(select_type_option2, null);

    // 0:left 1:right 2:both
    this.line_buffer_type = 2;

    function select_type_callback (e) {
      e.stopPropagation();
      if (e.target.selectedIndex === 0) {
        this.line_buffer_type = KQ.Common.CommonValues.bufferTypes.left;
      }
      else if (e.target.selectedIndex === 1) {
        this.line_buffer_type = KQ.Common.CommonValues.bufferTypes.right;
      }
      else {
        this.line_buffer_type = KQ.Common.CommonValues.bufferTypes.both;
      }

      console.log('select_type_callback:' + this.line_buffer_type);
    }

    L.DomEvent.addListener(select_type, 'change', select_type_callback.bind(this));
  },

  createFillBufferType: function () {
    var fillBufferTypeDiv = this.options.styleEditorUi.fillBufferTypeDiv;

    // 缓冲类型
    var label_type_container = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', fillBufferTypeDiv);
    L.DomUtil.create('br', '', label_type_container);
    var label_type = L.DomUtil.create('label', 'leaflet-styleeditor-label', label_type_container);
    label_type.innerHTML = L.styleEditorLocal.buffer.type;

    var select_type = L.DomUtil.create('select', 'leaflet-styleeditor-select', label_type_container);
    var select_type_option0 = L.DomUtil.create('option', null, select_type);
    select_type_option0.text = L.styleEditorLocal.buffer.outer;
    var select_type_option1 = L.DomUtil.create('option', null, select_type);
    select_type_option1.text = L.styleEditorLocal.buffer.inner;
    var select_type_option2 = L.DomUtil.create('option', null, select_type);
    select_type_option2.text = L.styleEditorLocal.buffer.both;

    select_type.add(select_type_option0, null);
    select_type.add(select_type_option1, null);
    select_type.add(select_type_option2, null);

    // 0:outside 1:inside 2:both
    this.fill_buffer_type = KQ.Common.CommonValues.bufferTypes.outer;

    function select_type_callback (e) {
      e.stopPropagation();
      if (e.target.selectedIndex === 0) {
        this.fill_buffer_type = KQ.Common.CommonValues.bufferTypes.outer;
      }
      else if (e.target.selectedIndex === 1) {
        this.fill_buffer_type = KQ.Common.CommonValues.bufferTypes.inner;
      }
      else {
        this.fill_buffer_type = KQ.Common.CommonValues.bufferTypes.both;
      }

      console.log('select_type_callback:' + this.fill_buffer_type);
    }

    L.DomEvent.addListener(select_type, 'change', select_type_callback.bind(this));
  },

  createBuffer: function () {
    var max_buffer_length = 1000000;

    var bufferDiv = this.options.styleEditorUi.bufferDiv;

    // 缓冲距离
    var label_length_container = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', bufferDiv);
    var label_length = L.DomUtil.create('label', 'leaflet-styleeditor-label', label_length_container);
    label_length.innerHTML = L.styleEditorLocal.buffer.length;

    this.buffer_length = 1000;

    var input_length = L.DomUtil.create('input', 'leaflet-styleeditor-input', label_length_container);
    input_length.setAttribute('type', 'number');
    input_length.setAttribute('value', this.buffer_length);
    input_length.setAttribute('min', 0);
    input_length.setAttribute('max', max_buffer_length);
    input_length.setAttribute('step', 1);

    function input_length_callback (e) {
      e.stopPropagation();
      this.buffer_length = e.target.value;

      console.log('input_length_callback:' + this.buffer_length);
    }

    L.DomEvent.addListener(input_length, 'change', input_length_callback.bind(this));
    L.DomEvent.addListener(input_length, 'keyup', input_length_callback.bind(this));

    // 缓冲单位
    var label_unit_container = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', bufferDiv);
    var label_unit = L.DomUtil.create('label', 'leaflet-styleeditor-label', label_unit_container);
    label_unit.innerHTML = L.styleEditorLocal.buffer.unit;

    var select_unit = L.DomUtil.create('select', 'leaflet-styleeditor-select', label_unit_container);
    var select_unit_option0 = L.DomUtil.create('option', null, select_unit);
    select_unit_option0.text = 'm';
    var select_unit_option1 = L.DomUtil.create('option', null, select_unit);
    select_unit_option1.text = 'km';

    select_unit.add(select_unit_option0, null);
    select_unit.add(select_unit_option1, null);

    // 0:m 1:km
    this.buffer_unit = 0;

    function select_unit_callback (e) {
      e.stopPropagation();
      this.buffer_unit = e.target.selectedIndex;

      console.log('select_unit_callback:' + this.buffer_unit);
    }

    L.DomEvent.addListener(select_unit, 'change', select_unit_callback.bind(this));

    // 是否保留原图形
    var self = this;
    var reserved_graphics_container = L.DomUtil.create('div', 'leaflet-styleeditor-interior-element', bufferDiv);
    $(reserved_graphics_container).append("<input id='reserve_graphics' class='leaflet-styleeditor-input-checkbox' type='checkbox'><label class='leaflet-styleeditor-input-checkbox-label'>" + KQ.Local.Control.styleEditor.reservedGraphics() +  "</label>");
    $("#reserve_graphics").click(function () {
      self.is_reserve_graphics = $("#reserve_graphics").prop("checked");
    })

    // 确认按钮
    var button = L.DomUtil.create('button', 'k-primary buffer-button', bufferDiv);
    button.innerHTML = L.styleEditorLocal.buffer.buffer;

    function button_callback (e) {
      e.stopPropagation();

      // console.log('button_callback!');
      // console.log('buffer_type:' + buffer_type);
      // console.log('buffer_length:' + buffer_length);
      // console.log('buffer_unit:' + buffer_unit);

      var _length = this.buffer_length;
      if (this.buffer_unit === KQ.Common.CommonValues.bufferUnit.km) {
        _length = _length * 1000;
      }

      if (_length > max_buffer_length) {
        this.options.errorCallback(L.styleEditorLocal.buffer.msgLengthTooLong + ' ' + max_buffer_length + 'm');
      }

      this.buffer_shape_type = KQ.Common.CommonValues.shapeTypes.point;
      var t = this.options.currentElement.target;
      if (t instanceof L.Polygon || t instanceof L.LayerGroup || (t instanceof L.Circle)) {
        this.buffer_shape_type = KQ.Common.CommonValues.shapeTypes.fill;
      }
      else if (t instanceof L.Polyline) {
        this.buffer_shape_type = KQ.Common.CommonValues.shapeTypes.line;
      }

      this.options.bufferCallback(this);
    }

    $(".buffer-button").kendoButton({
      type: 'submit',
    });

    L.DomEvent.addListener(button, 'click', button_callback.bind(this));
  },
});

},{}],3:[function(require,module,exports){
//(c)2017, MIT Style License <browser-update.org/LICENSE.txt>
//it is recommended to directly link to this file because we update the detection code

function $bu_getBrowser(ua_str) {
    var n,t,ua=ua_str||navigator.userAgent,donotnotify=false;
    var names={i:'Internet Explorer',e:"Edge",f:'Firefox',o:'Opera',s:'Safari',n:'Netscape',c:"Chrome",a:"Android Browser", y:"Yandex Browser",v:"Vivaldi",uc:"UC Browser",x:"Other"};
    function ignore(reason,pattern){if (RegExp(pattern,"i").test(ua)) return reason;}
    var ig=ignore("bot","bot|spider|archiver|transcoder|crawl|checker|monitoring|screenshot|python-|php|uptime|validator|fetcher|facebook|slurp|google|yahoo|microsoft|node|mail.ru|github|cloudflare|addthis|thumb|proxy|feed|fetch|favicon|link|http|scrape|seo|page|search console|AOLBuild|Teoma|Gecko Expeditor")||
        ignore("discontinued browser","camino|flot|k-meleon|fennec|galeon|chromeframe|coolnovo") ||
        ignore("complicated device browser","SMART-TV|SmartTV") ||
        ignore("niche browser","Dorado|Whale|SamsungBrowser|MIDP|wii|Chromium|Puffin|Opera Mini|maxthon|maxton|dolfin|dolphin|seamonkey|opera mini|netfront|moblin|maemo|arora|kazehakase|epiphany|konqueror|rekonq|symbian|webos|PaleMoon|QupZilla|Otter|Midori|qutebrowser") ||
        ignore("mobile without upgrade path or landing page","kindle|silk|blackberry|bb10|RIM|PlayBook|meego|nokia|ucweb|ZuneWP7|537.85.10") ||
        ignore("android(chrome) web view","; wv");
    var mobile=(/iphone|ipod|ipad|android|mobile|phone|ios|iemobile/i.test(ua));
    if (ig) 
        return {n:"x",v:0,t:"other browser",donotnotify:ig};    

    var pats=[
        ["CriOS.VV","c"],
        ["FxiOS.VV","f"],
        ["Trident.*rv:VV","i"],
        ["Trident.VV","io"],
        ["UCBrowser.VV","uc"],
        ["MSIE.VV","i"],
        ["Edge.VV","e"],
        ["Vivaldi.VV","v"],
        ["OPR.VV","o"],
        ["YaBrowser.VV","y"],
        ["Chrome.VV","c"],
        ["Firefox.VV","f"],
        ["Version.VV.*Safari","s"],
        ["Safari.VV","so"],
        ["Opera.*Version.VV","o"],
        ["Opera.VV","o"],
        ["Netscape.VV","n"]
    ];
    for (var i=0; i < pats.length; i++) {
        if (ua.match(new RegExp(pats[i][0].replace("VV","(\\d+\\.?\\d+)"),"i"))) {
            n=pats[i][1];
            break;
        }        
    }
    var semver=n==="v"||n==="y"||n==="uc";
    if (semver) {//zero pad semver for easy comparing
        var parts = (RegExp.$1).split('.');
        var v=(parts[0] + "." + ("00".substring(0, 2 - parts[1].length) + parts[1]));
    }
    else {
        var v=Math.round(parseFloat(RegExp.$1)*10)/10;
    }
    
    if (!n)
        return {n:"x",v:0,t:names[n],mobile:mobile};
    
    //do not notify old systems since there is no up-to-date browser available
    if (/windows.nt.5.0|windows.nt.4.0|windows.95|windows.98|os x 10.2|os x 10.3|os x 10.4|os x 10.5|os x 10.6|os x 10.7/i.test(ua)) 
        donotnotify="oldOS";
    
    //iOS
    if (/iphone|ipod|ipad|ios/i.test(ua)) {
        ua.replace("_",".").match(new RegExp("OS.(\\d+\\.?\\d?)","i"));//
        n="iOS";
        v=parseFloat(RegExp.$1); 
        var h = Math.max(window.screen.height, window.screen.width);
        if (h<=480 || window.devicePixelRatio<2) //iphone <5 and old iPads  // (h>568 -->iphone 6+)
              return {n:"s",v:v,t:"iOS "+v,donotnotify:"iOS without upgrade path",mobile:mobile};
        return {n:"s",v:v,t:"iOS "+v,donotnotify:false,mobile:mobile};//identify as safari
    }
    //check for android stock browser
    if (ua.indexOf('Android')>-1 && n==="s") {
        var ver=parseInt((/WebKit\/([0-9]+)/i.exec(ua) || 0)[1],10) || 2000;
        if (ver <= 534)
            return {n:"a",v:ver,t:names["a"],mob:true,donotnotify:donotnotify,mobile:mobile};
        //else
        //    return {n:n,v:v,t:names[n]+" "+v,donotnotify:"mobile on android",mobile:mobile};
    }

    //do not notify firefox ESR
    if (n=="f" && (Math.round(v)==45 || Math.round(v)==52))
        donotnotify="ESR";

    if (n=="so") {
        v=4.0;
        n="s";
    }
    if (n=="i" && v==7 && window.XDomainRequest) {
        v=8;
    }
    if (n=="io") {
        n="i";
        if (v>6) v=11;
        else if (v>5) v=10;
        else if (v>4) v=9;
        else if (v>3.1) v=8;
        else if (v>3) v=7;
        else v=9;
    }
    if (n=="e") {
        return {n:"i",v:v,t:names[n]+" "+v,donotnotify:donotnotify,mobile:mobile};
    }
    return {n:n,v:v,t:names[n]+" "+v,donotnotify:donotnotify,mobile:mobile};
}

var $buo = function(op,test) {
var jsv=24;
var n = window.navigator,b,vsmin;
var op = window._buorgres=op||{};
var ll = op.l||(n.languages ? n.languages[0] : null) || n.language || n.browserLanguage || n.userLanguage||document.documentElement.getAttribute("lang")||"en";
op.ll=ll=ll.replace("_","-").toLowerCase().substr(0,2);
op.apiver=op.api||op.c||-1;
var vsakt = {i:12,f:53,o:44,s:10.1,n:20,c:58,y:17.04,v:1.10,uc:11.3};
var vsdefault = {i:-2,f:-4,o:-4,s:-1.7,n:12,c:-4,a:534,y:-0.02,v:-0.02,uc:-0.03};
if (op.apiver<4)
    vsmin={i:9,f:10,o:20,s:7};
else
    vsmin={i:8,f:5,o:12.5,s:6.2};
var myvs=op.vs||{};
var vs =op.vs||vsdefault;
for (b in vsdefault) {
    if (!vs[b])
        vs[b]=vsdefault[b];    
    if (vsakt[b] && vs[b]>=vsakt[b])
        vs[b]=vsakt[b]-0.2;
    if (vsakt[b] && vs[b]<0)
        vs[b]=vsakt[b]+vs[b];
    if (vsmin[b] && vs[b]<vsmin[b])
        vs[b]=vsmin[b];    
}
op.vsf=vs;
if (op.reminder<0.1 || op.reminder===0)
    op.reminder=0;
else
    op.reminder=op.reminder||24;
op.reminderClosed=op.reminderClosed||(24*7);
op.onshow = op.onshow||function(o){};
op.onclick = op.onclick||function(o){};
op.onclose = op.onclose||function(o){};
op.pageurl = op.pageurl || location.hostname || "x";
op.newwindow=(op.newwindow!==false);

op.test=test||op.test||(location.hash==="#test-bu")||(location.hash==="#test-bu-beta")||false;

var bb=$bu_getBrowser();
if (!op.test) {
    if (!bb || !bb.n || bb.n==="x" || bb.donotnotify!==false || (document.cookie.indexOf("browserupdateorg=pause")>-1 && op.reminder>0))
        return;
    if (bb.v>vs[bb.n] || (bb.mobile&&op.mobile===false) )    
        return;
}

op.setCookie=function(hours) {
    document.cookie = 'browserupdateorg=pause; expires='+(new Date(new Date().getTime()+3600000*hours)).toGMTString()+'; path=/';
};
if (op.reminder>0)
    op.setCookie(op.reminder);

if (op.nomessage) {
    op.onshow(op);
    return;
}

$buo_show();
};

module.exports = $buo;

var $buo_show = function() {
var op=window._buorgres;    
var jsv=24;
var tv=jsv;//"base";
var ll=op.ll;
var bb=$bu_getBrowser();
var burl=op.burl || "http://browser-update.org/";
if (!op.url) {
    if (op.l)
        op.url= burl+ll+"/update-browser.html#"+tv+":"+op.pageurl;
    else
        op.url= burl+"update-browser.html#"+tv+":"+op.pageurl;
}
var frac=1000;
if (Math.random()*frac<1 && !op.test && !op.betatest) {
    var i = new Image();
    var txt=op["text_"+ll]||op.text||"";
    var extra=encodeURIComponent("frac="+frac+"&txt="+txt+"&apiver="+op.apiver);
    i.src=burl+"count.php?what=noti&from="+bb.n+"&fromv="+bb.v + "&ref="+ escape(op.pageurl) + "&jsv="+jsv+"&tv="+tv+"&extra="+extra;
}

function busprintf() {
    var args=arguments;
    var data = args[ 0 ];
    for( var k=1; k<args.length; ++k ) {
        data = data.replace( /%s/, args[ k ] );
    }
    return data;
}


var t={};
t.en='<b>Your web browser ({brow_name}) is out of date.</b> Update your browser for more security, speed and the best experience on this site. <a{up_but}>Update browser</a> <a{ignore_but}>Ignore</a>';


//t.af='';
t.ar='<b> متصفح الويب ({brow_name}) الخاص بك قديم.</b> قُم بتحديث متصفحك للحصول على مزيدٍ من الحماية والراحة وتجربة أفضل على هذا الموقع. <a{up_but}> تحديث المتصفح</a> <a{ignore_but}> تجاهل</a>';
t.bg='<b>Вашият браузър ({brow_name}) не е актуализиран.</b> Актуализирайте го за повече сигурност, удобство и най-добро изживяване на сайта. <a{up_but}>Актуализирайте браузъра</a> <a{ignore_but}>Игнорирайте</a>';
t.ca='El teu navegador (%s) està <b>desactualitzat.</b> Té <b>vulnerabilitats</b> conegudes i pot <b>no mostrar totes les característiques</b> d\'aquest i altres llocs web. <a%s>Aprèn a actualitzar el navegador</a>';
t.cs='<b>Váš webový prohlížeč ({brow_name}) je zastaralý .</b> Pro větší bezpečnost, pohodlí a optimální zobrazení této stránky si prosím svůj prohlížeč aktualizujte. <a{up_but}>Aktualizovat prohlížeč</a> <a{ignore_but}>Ignorovat</a>';
t.da='<b>Din netbrowser ({brow_name}) er forældet.</b> Opdater din browser for mere sikkerhed, komfort og den bedste oplevelse på denne side. <a{up_but}>Opdater browser</a> <a{ignore_but}>Ignorer</a>';
t.de='<b>Ihr Browser ({brow_name}) ist veraltet.</b> <span>Aktualisieren Sie Ihren Browser für mehr Sicherheit, Komfort und die einwandfreie Nutzung dieser Webseite.</span> <a{up_but}>Browser aktualisieren</a> <a{ignore_but}>Ignorieren</a>';
t.el='<b>Η έκδοση του προγράμματος περιήγησής σας ({brow_name}) είναι παλιά.</b> Ενημερώστε τον περιηγητή σας για περισσότερη ασφάλεια, άνεση και την βέλτιστη εμπειρία σε αυτή την ιστοσελίδα. <a{up_but}>Αναβάθμιση περιηγητή</a> <a{ignore_but}>Παράβλεψη</a>';
t.es='<b>Tu navegador web ({brow_name}) no está actualizado.</b> Actualiza tu navegador para tener más seguridad y comodidad y tener la mejor experiencia en este sitio. <a{up_but}>Actualizar navegador</a> <a{ignore_but}>Ignorar</a>';
//t.et='';
t.fa = 'مرورگر شما (%s) <b>از رده خارج شده</b> می باشد. این مرورگر دارای <b>مشکلات امنیتی شناخته شده</b> می باشد و <b>نمی تواند تمامی ویژگی های این</b> وب سایت و دیگر وب سایت ها را به خوبی نمایش دهد. <a%s>در خصوص گرفتن راهنمایی درخصوص نحوه ی به روز رسانی مرورگر خود اینجا کلیک کنید.</a>';
t.fi='<b>Selaimesi ({brow_name}) on vanhentunut.</b> Päivitä selaimesi parantaaksesi turvallisuutta, mukavuutta ja käyttökokemusta tällä sivustolla. <a{up_but}>Päivitä selain</a> <a{ignore_but}>Ohita</a>';
t.fr='<b>Votre navigateur web ({brow_name}) n\'est pas à jour.</b> Mettez votre navigateur à jour pour plus de sécurité, de confort et une expérience optimale sur ce site. <a{up_but}>Mettre le navigateur à jour</a> <a{ignore_but}>Ignorer</a>';
t.ga='Tá an líonléitheoir agat (%s) <b>as dáta.</b> Tá <b>laigeachtaí slándála</b> a bhfuil ar eolas ann agus b\'fhéidir <b>nach taispeánfaidh sé gach gné</b> den suíomh gréasáin seo ná cinn eile. <a%s>Foghlaim conas do líonléitheoir a nuashonrú</a>';
t.gl = 'O seu navegador (%s) está <b>desactualizado.</b> Ten coñecidos <b>fallos de seguranza</b> e podería <b>non mostrar tódalas características</b> deste e outros sitios web. <a%s>Aprenda como pode actualizar o seu navegador</a>';
t.he = 'הדפדפן שלך (%s) <b>אינו מעודכן.</b> יש לו <b>בעיות אבטחה ידועות</b> ועשוי <b>לא להציג את כל התכונות</b> של אתר זה ואתרים אחרים. <a%s>למד כיצד לעדכן את הדפדפן שלך</a>';
t.hi='यह वेबसाइट आपको याद दिलाना चाहती हैं: आपका ब्राउज़र (%s) <b> आउट ऑफ़ डेट </ b> हैं। <a%s> और अधिक सुरक्षा, आराम और इस साइट पर सबसे अच्छा अनुभव करने लिए आपके ब्राउज़र को अपडेट करें</a>।';
//t.hr='';
t.hu='<b>Az ön ({brow_name}) böngészője elavult.</b> Frissítse a böngészőjét több biztonság, kényelem és a legjobb felhasználói élmény érdekében ezen az oldalon. <a{up_but}>Böngésző frissítése</a> <a{ignore_but}>Mellőzés</a>';
t.id='<b>Peramban web Anda ({brow_name}) sudah lawas.</b> Perbarui peramban Anda untuk pengalaman terbaik yang lebih aman dan nyaman di situs ini. <a{up_but}>Perbarui peramban</a> <a{ignore_but}>Abaikan</a>';
t.it='<b>Il suo browser web ({brow_name}) non è aggiornato.</b> Aggiorni il suo browser per ottenere maggiore sicurezza, comfort, e la migliore esperienza possibile su questo sito. <a{up_but}>Aggiorna il browser</a> <a{ignore_but}>Ignora</a>';
t.ja='<b>お使いのウェブブラウザ ({brow_name}) は古すぎます。</b>安全性と快適さを向上させ、このサイトで最高の体験が出来るよう、お使いのブラウザをアップデートしましょう。<a{up_but}>ブラウザをアップデートする</a> <a{ignore_but}>無視する</a>';
t.ko='<b>현재 귀하의 웹브라우저 ({brow_name})은(는) 구버전입니다.</b> 본 사이트의 향상된 보안 및 최고 품질의 편안한 서비스를 사용하기 위해서 브라우저를 업데이트해 주십시오. <a{up_but}>브라우저 업데이트</a> <a{ignore_but}>무시하기</a>';
//t.lt='';
t.lv='Jūsu pārlūkprogramma (%s) ir <b>novecojusi.</b>  Tai ir zināmas <b>drošības problēmas</b>, un tā var attēlot šo un citas  tīmekļa lapas <b>nekorekti.</b> <a%s>Uzzini, kā atjaunot savu pārlūkprogrammu</a>';
t.ms='<b>Pelayar web ({brow_name}) anda sudah usang.</b> Kemas kini pelayar anda untuk memperoleh lebih keselamatan, keselesaan dan pengalaman terbaik di tapak ini. <a{up_but}>Kemas kini pelayar</a> <a{ignore_but}>Abaikan</a>';
t.nl='<b>Uw webbrowser ({brow_name}) is verouderd.</b> Update uw browser voor meer veiligheid, comfort en de beste ervaring op deze site. <a{up_but}>Update browser</a> <a{ignore_but}>Negeer</a>';
t.no='<b>Nettleseren din,({brow_name}), er utdatert.</b> Oppdater nettleseren din for mer sikkerhet, komfort og den beste opplevelsen på denne siden. <a{up_but}>Oppdater nettleser</a> <a{ignore_but}>Ignorer</a>';
t.pl='<b>Państwa przeglądarka ({brow_name}) jest nieaktualna.</b> Aby zapewnić większe bezpieczeństwo, wygodę i komfort użytkowania w tej witrynie, proszę zaktualizować swoją przeglądarkę. <a{up_but}>Zaktualizuj przeglądarkę</a> <a{ignore_but}>Zignoruj</a>';
t.pt='<b>Seu navegador de internet ({brow_name}) está desatualizado.</b> Atualize seu navegador para obter mais segurança, conforto e a melhor experiência neste site. <a{up_but}>Atualizar navegador</a> <a{ignore_but}>Ignorar</a>';
t.ro='<b>Browserul dumneavoastră ({brow_name}) nu este actualizat.</b> Actualizați-vă browserul pentru securitate sporită, confort și cea mai bună experiență pe site. <a{up_but}>Actualizează browser</a><a{ignore_but}>Ignoră</a>';
t.ru='<b>Ваш веб-браузер ({brow_name}) устарел.</b> Обновите свой браузер, чтобы сделать пребывание на этом сайте более безопасным, комфортным и продуктивным. <a{up_but}>Обновить браузер</a> <a{ignore_but}>Игнорировать</a>';
t.sk='<b> Váš internetový prehliadač ({brow_name}) je zastaraný.</b> Aktualizujte váš prehliadač pre vyššiu bezpečnosť, komfort a najlepší zážitok na tejto stránke. <a{up_but}>Aktualizovať prehliadač</a><a{ignore_but}>Ignorovať</a>';
t.sl = 'Vaš brskalnik (%s) je <b>zastarel.</b> Ima več <b>varnostnih pomankljivosti</b> in morda <b>ne bo pravilno prikazal</b> te ali drugih strani. <a%s>Poglejte kako lahko posodobite svoj brskalnik</a>';
t.sq = 'Shfletuesi juaj (%s) është <b>ca i vjetër.</b> Ai ka <b>të meta sigurie</b> të njohura dhe mundet të <b>mos i shfaqë të gjitha karakteristikat</b> e kësaj dhe shumë faqeve web të tjera. <a%s>Mësoni se si të përditësoni shfletuesin tuaj</a>';
t.sr='Vaš pretraživač (%s) je <b>zastareo.</b> Ima poznate <b>sigurnosne probleme</b> i najverovatnije <b>neće prikazati sve funkcionalnisti</b> ovog i drugih sajtova. <a%s>Nauči više o nadogradnji svog pretraživača</a>';
t.sv='<b>Din webbläsare ({brow_name}) är föråldrad.</b> Uppdatera din webbläsare för bättre säkerhet, bekvämlighet och den bästa upplevelsen på den här sidan. <a{up_but}>Uppdatera webbläsare</a> <a{ignore_but}>Avstå</a>';
t.th='เว็บไซต์นี้อยากจะเตือนคุณ: เบราว์เซอร์ (%s) ของคุณนั้น <b>ล้าสมัยแล้ว</b> <a%s>ปรับปรุงเบราว์เซอร์ของคุณ</a> เพื่อเพิ่ม ความปลอดภัย ความสะดวกสบายและประสบการณ์ที่ดีที่สุดในเว็บไซต์นี้';
t.tr='<b>({brow_name}) internet tarayıcınız güncel değil.</b> Bu sitede daha fazla güvenlik, konfor ve en iyi deneyim için tarayıcınızı güncelleyin. <a{up_but}>Tarayıcıyı güncelle</a> <a{ignore_but}>Yoksay</a>';
t.uk='<b>Ваш браузер ({brow_name}) є застарілим.</b> Оновіть його заради безпечнішого, зручнішого та приємнішого перегляду цього та інших сайтів. <a{up_but}>Оновити</a> <a{ignore_but}>Скасувати</a>';
t.vi='<b>Trình duyệt web của bạn ({brow_name}) đã cũ.</b> Hãy nâng cấp trình duyệt của bạn để được an toàn và thuận lợi hơn đồng thời có được trải nghiệm tốt nhất với trang này. <a{up_but}>Nâng cấp trình duyệt</a> <a{ignore_but}>Bỏ qua</a>';
t.zh='<b>您的网页浏览器 ({brow_name}) 已过期。</b>更新您的浏览器，以提高安全性和舒适性，并获得访问本网站的最佳体验。<a{up_but}>更新浏览器</a> <a{ignore_but}>忽略</a>';
t["zh-tw"]='<b>您的網頁瀏覽器  ({brow_name}) 已經過時。</b> 請更新您的瀏覽器，以在此網站取得更安全、舒適的最佳瀏覽體驗。<a{up_but}>更新瀏覽器</a><a{ignore_but}>忽略</a>';


t=op["text_"+ll]||op.text||t[ll]||t.en;

var tar="";
if (op.newwindow)
    tar=' target="_blank" rel="noopener"';

var div = op.div = document.createElement("div");
div.id="buorg";
div.className="buorg";

var style='<style>.buorg {background: #FDF2AB no-repeat 14px center url('+burl+'img/small/'+bb.n+'.png);}</style>';
var style2='<style>.buorg {background-position: 8px 17px; position:absolute;position:fixed;z-index:111111; width:100%; top:0px; left:0px; border-bottom:1px solid #A29330; text-align:left; cursor:pointer;        background-color: #fff8ea;    font: 17px Calibri,Helvetica,Arial,sans-serif;    box-shadow: 0 0 5px rgba(0,0,0,0.2);}\
    .buorg div { padding: 11px 12px 11px 30px;  line-height: 1.7em; }\
    .buorg div a,.buorg div a:visited{ text-indent: 0; color: #fff; text-decoration: none; box-shadow: 0 0 2px rgba(0,0,0,0.4); padding: 1px 10px; border-radius: 4px; font-weight: normal; background: #5ab400;    white-space: nowrap;    margin: 0 2px; display: inline-block;}\
    #buorgig{ background-color: #edbc68;}\
    @media only screen and (max-width: 700px){.buorg div { padding:5px 12px 5px 9px; text-indent: 22px;line-height: 1.3em;}.buorg {background-position: 9px 8px;}}\
    @keyframes buorgfly {from {opacity:0;transform:translateY(-50px)} to {opacity:1;transform:translateY(0px)}} \
    .buorg { animation-name: buorgfly; animation-duration: 1s; animation-timing-function: ease-out;}</style>';

if (t.indexOf("{brow_name}")===-1) {//legacy style
    t=busprintf(t,bb.t,' id="buorgul" href="'+op.url+'"'+tar);

    style += "<style>.buorg {position:absolute;position:fixed;z-index:111111; width:100%; top:0px; left:0px; border-bottom:1px solid #A29330; text-align:left; cursor:pointer; font: 13px Arial,sans-serif;color:#000;}\
    .buorg div { padding:5px 36px 5px 40px; }\
    .buorg>div>a,.buorg>div>a:visited{color:#E25600; text-decoration: underline;}\
    #buorgclose{position:absolute;right:6px;top:0px;height:20px;width:12px;font:18px bold;padding:0;}\
    #buorga{display:block;}\
    @media only screen and (max-width: 700px){.buorg div { padding:5px 15px 5px 9px; }}</style>";
    div.innerHTML= '<div>'+t+'<div id="buorgclose"><a id="buorga">&times;</a></div></div>'+style;
    op.addmargin=true;
}
else {
    if (op.position === "bottom") {
        style2 += "<style>.buorg {bottom:0; top:auto; border-top:1px solid #A29330; } @keyframes buorgfly {from {opacity:0;transform:translateY(50px)} to {opacity:1;transform:translateY(0px)}} \</style>";
    }
    else if (op.position === "corner") {
        style2 += "<style>.buorg { width:300px; top:50px; right:50px; left:auto; border:1px solid #A29330; } .buorg div b {display:block;} .buorg div span { display: block; } .buorg div a {margin: 4px 2px;}\
        </style>";
    }
    else {
        op.addmargin = true;
    }
    t = t.replace("{brow_name}", bb.t).replace("{up_but}", ' id="buorgul" href="' + op.url + '"' + tar).replace("{ignore_but}", ' id="buorgig" href=""');
    div.innerHTML = '<div>' + t + '</div>' + style+style2;
}

op.text=t;
if (op.container) {
    op.container.appendChild(div);
    op.addmargin=false;
}
else
    document.body.insertBefore(div,document.body.firstChild);

div.onclick=function(){
    if (op.newwindow)
        window.open(op.url,"_blank");
    else
        window.location.href=op.url;
    op.setCookie(op.reminderClosed);
    op.onclick(op);
    return false;
};
try {
document.getElementById("buorgul").onclick = function(e) {
    e = e || window.event;
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
    op.div.style.display = "none";
    hm.style.marginTop = op.bodymt;    
    op.onclick(op);    
    return true;
};
}
catch(e) {}

if (op.addmargin) {
    var hm=document.getElementsByTagName("html")[0]||document.body;
    op.bodymt = hm.style.marginTop;
    hm.style.marginTop = (div.clientHeight)+"px";
}
(document.getElementById("buorga")||document.getElementById("buorgig")).onclick = function(e) {
    e = e || window.event;
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
    op.div.style.display = "none";
    if (op.addmargin)
        hm.style.marginTop = op.bodymt;
    op.onclose(op);
    op.setCookie(op.reminderClosed);
    return false;
}

if (op.noclose) {
    var el=(document.getElementById("buorga")||document.getElementById("buorgig"));
    el.parentNode.removeChild(el);
}
op.onshow(op);

};



},{}],4:[function(require,module,exports){
/**
 * Created by liwei on 2017/3/8.
 */
'use strict';

// 这两个库不能直接用broserify的babel进行转换，必须关闭babel处理再进行合并，否则会导致draw控件出问题
require('../libs/controls/styleeditor/Leaflet.StyleEditor');
require('../libs/controls/styleeditor/Leaflet.StyleForms');

// 提示浏览器的版本
var browserUpdate = require('../libs/other/update.npm.full');
var $buoop = {vs:{i:12,f:-4,o:-4,s:8,c:-4},api:4};
browserUpdate($buoop);

// require('../libs/plot/goog');
// require('../libs/plot/ol');
// require('../libs/plot/plot.debug');

},{"../libs/controls/styleeditor/Leaflet.StyleEditor":1,"../libs/controls/styleeditor/Leaflet.StyleForms":2,"../libs/other/update.npm.full":3}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWJzL2NvbnRyb2xzL3N0eWxlZWRpdG9yL0xlYWZsZXQuU3R5bGVFZGl0b3IuanMiLCJsaWJzL2NvbnRyb2xzL3N0eWxlZWRpdG9yL0xlYWZsZXQuU3R5bGVGb3Jtcy5qcyIsImxpYnMvb3RoZXIvdXBkYXRlLm5wbS5mdWxsLmpzIiwic3JjL290aGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcnFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1VkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiTC5Db250cm9sLlN0eWxlRWRpdG9yID0gTC5Db250cm9sLmV4dGVuZCh7XHJcbiAgaW5jbHVkZXM6IEwuTWl4aW4uRXZlbnRzLFxyXG5cclxuICBvcHRpb25zOiB7XHJcbiAgICBwb3NpdGlvbjogJ3RvcGxlZnQnLFxyXG4gICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICBjb2xvclJhbXA6IFsgJyMxYWJjOWMnLCAnIzJlY2M3MScsICcjMzQ5OGRiJywgJyM5YjU5YjYnLCAnIzM0NDk1ZScsICcjMTZhMDg1JywgJyMyN2FlNjAnLCAnIzI5ODBiOScsICcjOGU0NGFkJywgJyMyYzNlNTAnLCAnI2YxYzQwZicsICcjZTY3ZTIyJywgJyNlNzRjM2MnLCAnI2VjZjBmMScsICcjOTVhNWE2JywgJyNmMzljMTInLCAnI2QzNTQwMCcsICcjYzAzOTJiJywgJyNiZGMzYzcnLCAnIzdmOGM4ZCcgXSxcclxuICAgIC8vIG1hcmtlckFwaTogJ2h0dHA6Ly9hcGkudGlsZXMubWFwYm94LmNvbS92My9tYXJrZXIvJyxcclxuICAgIG1hcmtlckFwaTogJy4uLy4uL2ltYWdlcy9tYXJrZXJzLycsXHJcbiAgICBtYXJrZXJzOiBbICdjaXJjbGUtc3Ryb2tlZCcsICdjaXJjbGUnLCAnc3F1YXJlLXN0cm9rZWQnLCAnc3F1YXJlJywgJ3RyaWFuZ2xlLXN0cm9rZWQnLCAndHJpYW5nbGUnLCAnc3Rhci1zdHJva2VkJywgJ3N0YXInLCAnY3Jvc3MnLCAnbWFya2VyLXN0cm9rZWQnLCAnbWFya2VyJywgJ3JlbGlnaW91cy1qZXdpc2gnLCAncmVsaWdpb3VzLWNocmlzdGlhbicsICdyZWxpZ2lvdXMtbXVzbGltJywgJ2NlbWV0ZXJ5JywgJ3JvY2tldCcsICdhaXJwb3J0JywgJ2hlbGlwb3J0JywgJ3JhaWwnLCAncmFpbC1tZXRybycsICdyYWlsLWxpZ2h0JywgJ2J1cycsICdmdWVsJywgJ3BhcmtpbmcnLCAncGFya2luZy1nYXJhZ2UnLCAnYWlyZmllbGQnLCAncm9hZGJsb2NrJywgJ2ZlcnJ5JywgJ2hhcmJvcicsICdiaWN5Y2xlJywgJ3BhcmsnLCAncGFyazInLCAnbXVzZXVtJywgJ2xvZGdpbmcnLCAnbW9udW1lbnQnLCAnem9vJywgJ2dhcmRlbicsICdjYW1wc2l0ZScsICd0aGVhdHJlJywgJ2FydC1nYWxsZXJ5JywgJ3BpdGNoJywgJ3NvY2NlcicsICdhbWVyaWNhLWZvb3RiYWxsJywgJ3Rlbm5pcycsICdiYXNrZXRiYWxsJywgJ2Jhc2ViYWxsJywgJ2dvbGYnLCAnc3dpbW1pbmcnLCAnY3JpY2tldCcsICdza2lpbmcnLCAnc2Nob29sJywgJ2NvbGxlZ2UnLCAnbGlicmFyeScsICdwb3N0JywgJ2ZpcmUtc3RhdGlvbicsICd0b3duLWhhbGwnLCAncG9saWNlJywgJ3ByaXNvbicsICdlbWJhc3N5JywgJ2JlZXInLCAncmVzdGF1cmFudCcsICdjYWZlJywgJ3Nob3AnLCAnZmFzdC1mb29kJywgJ2JhcicsICdiYW5rJywgJ2dyb2NlcnknLCAnY2luZW1hJywgJ3BoYXJtYWN5JywgJ2hvc3BpdGFsJywgJ2RhbmdlcicsICdpbmR1c3RyaWFsJywgJ3dhcmVob3VzZScsICdjb21tZXJjaWFsJywgJ2J1aWxkaW5nJywgJ3BsYWNlLW9mLXdvcnNoaXAnLCAnYWxjb2hvbC1zaG9wJywgJ2xvZ2dpbmcnLCAnb2lsLXdlbGwnLCAnc2xhdWdodGVyaG91c2UnLCAnZGFtJywgJ3dhdGVyJywgJ3dldGxhbmQnLCAnZGlzYWJpbGl0eScsICd0ZWxlcGhvbmUnLCAnZW1lcmdlbmN5LXRlbGVwaG9uZScsICd0b2lsZXRzJywgJ3dhc3RlLWJhc2tldCcsICdtdXNpYycsICdsYW5kLXVzZScsICdjaXR5JywgJ3Rvd24nLCAndmlsbGFnZScsICdmYXJtJywgJ2Jha2VyeScsICdkb2ctcGFyaycsICdsaWdodGhvdXNlJywgJ2Nsb3RoaW5nLXN0b3JlJywgJ3BvbGxpbmctcGxhY2UnLCAncGxheWdyb3VuZCcsICdlbnRyYW5jZScsICdoZWFydCcsICdsb25kb24tdW5kZXJncm91bmQnLCAnbWluZWZpZWxkJywgJ3JhaWwtdW5kZXJncm91bmQnLCAncmFpbC1hYm92ZScsICdjYW1lcmEnLCAnbGF1bmRyeScsICdjYXInLCAnc3VpdGNhc2UnLCAnaGFpcmRyZXNzZXInLCAnY2hlbWlzdCcsICdtb2JpbGVwaG9uZScsICdzY29vdGVyJyBdLFxyXG4gICAgZWRpdGxheWVyczogW10sXHJcbiAgICBsYXllckdyb3VwczogW10sXHJcbiAgICBvcGVuT25MZWFmbGV0RHJhdzogdHJ1ZSxcclxuICAgIHNob3dUb29sdGlwOiB0cnVlLFxyXG4gICAgc3RyaW5nczoge1xyXG4gICAgICB0b29sdGlwOiAnQ2xpY2sgb24gdGhlIGVsZW1lbnQgeW91IHdhbnQgdG8gc3R5bGUnLFxyXG4gICAgICB0b29sdGlwTmV4dDogJ0Nob29zZSBhbm90aGVyIGVsZW1lbnQgeW91IHdhbnQgdG8gc3R5bGUnXHJcbiAgICB9LFxyXG4gICAgdXNlR3JvdXBpbmc6IHRydWUsXHJcbiAgICBzdHlsZUZvcm06IHVuZGVmaW5lZCxcclxuICAgIHRvb2x0aXBDYWxsYmFjazogZnVuY3Rpb24gKHNlbGYpIHtcclxuICAgICAgaWYgKCFzZWxmLm9wdGlvbnMudG9vbHRpcFdyYXBwZXIpXHJcbiAgICAgICAgc2VsZi5vcHRpb25zLnRvb2x0aXBXcmFwcGVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItdG9vbHRpcC13cmFwcGVyJywgZG9jdW1lbnQuYm9keSk7XHJcblxyXG4gICAgICBpZiAoIXNlbGYub3B0aW9ucy50b29sdGlwKVxyXG4gICAgICAgIHNlbGYub3B0aW9ucy50b29sdGlwID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItdG9vbHRpcCcsIHNlbGYub3B0aW9ucy50b29sdGlwV3JhcHBlcik7XHJcblxyXG4gICAgICBzZWxmLm9wdGlvbnMudG9vbHRpcC5pbm5lckhUTUwgPSBMLnN0eWxlRWRpdG9yTG9jYWwudG9vbHRpcDtcclxuICAgIH0sXHJcbiAgICBlcnJvckNhbGxiYWNrOiBmdW5jdGlvbiAobXNnKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdlcnJvcjonICsgbXNnKTtcclxuICAgIH0sXHJcbiAgICBidWZmZXJDYWxsYmFjazogZnVuY3Rpb24gKG9iaikge1xyXG4gICAgICBjb25zb2xlLmxvZygnYnVmZmVyIScpO1xyXG4gICAgfSxcclxuICB9LFxyXG5cclxuICBvbkFkZDogZnVuY3Rpb24gKG1hcCkge1xyXG4gICAgdGhpcy5vcHRpb25zLm1hcCA9IG1hcDtcclxuICAgIHJldHVybiB0aGlzLmNyZWF0ZVVpKCk7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlVWk6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciB0b3VjaGNsYXNzID0gJyc7XHJcbiAgICBpZiAoTC5Ccm93c2VyLnRvdWNoKSB7XHJcbiAgICAgIHRvdWNoY2xhc3MgPSAnIGxlYWZsZXQtdG91Y2gnO1xyXG4gICAgfVxyXG5cclxuICAgIHZhciBjb250cm9sRGl2ID0gdGhpcy5vcHRpb25zLmNvbnRyb2xEaXYgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1jb250cm9sLXN0eWxlZWRpdG9yJyArIHRvdWNoY2xhc3MpO1xyXG4gICAgdmFyIGNvbnRyb2xVSSA9IHRoaXMub3B0aW9ucy5jb250cm9sVUkgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1jb250cm9sLXN0eWxlZWRpdG9yLWludGVyaW9yJyArIHRvdWNoY2xhc3MsIGNvbnRyb2xEaXYpO1xyXG4gICAgLy8gY29udHJvbFVJLnRpdGxlID0gJ1N0eWxlIEVkaXRvcic7XHJcbiAgICBjb250cm9sVUkudGl0bGUgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnV0dG9uVGl0bGU7XHJcblxyXG4gICAgdmFyIHN0eWxlRWRpdG9yRGl2ID0gdGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yRGl2ID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3InLCB0aGlzLm9wdGlvbnMubWFwLl9jb250YWluZXIpO1xyXG4gICAgdGhpcy5vcHRpb25zLnN0eWxlRWRpdG9ySGVhZGVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItaGVhZGVyJywgc3R5bGVFZGl0b3JEaXYpO1xyXG4gICAgdmFyIHN0eWxlRWRpdG9ySW50ZXJpb3IgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1pbnRlcmlvcicsIHN0eWxlRWRpdG9yRGl2KTtcclxuXHJcbiAgICBzdHlsZUVkaXRvckRpdi5zdHlsZS56SW5kZXggPSAxMDAwMDtcclxuXHJcbiAgICB2YXIgc3R5bGVFZGl0b3JVaSA9IHt9O1xyXG4gICAgdmFyIGljb25EaXYgPSBzdHlsZUVkaXRvclVpLmljb25EaXYgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1pbnRlcmlvci1lbGVtZW50Jywgc3R5bGVFZGl0b3JJbnRlcmlvcik7XHJcbiAgICB2YXIgbWFya2VyQ29sb3JEaXYgPSBzdHlsZUVkaXRvclVpLm1hcmtlckNvbG9yRGl2ID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItaW50ZXJpb3ItZWxlbWVudCcsIHN0eWxlRWRpdG9ySW50ZXJpb3IpO1xyXG4gICAgdmFyIHNpemVEaXYgPSBzdHlsZUVkaXRvclVpLnNpemVEaXYgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1pbnRlcmlvci1lbGVtZW50Jywgc3R5bGVFZGl0b3JJbnRlcmlvcik7XHJcbiAgICB2YXIgY29sb3JEaXYgPSBzdHlsZUVkaXRvclVpLmNvbG9yRGl2ID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItaW50ZXJpb3ItZWxlbWVudCcsIHN0eWxlRWRpdG9ySW50ZXJpb3IpO1xyXG4gICAgdmFyIG9wYWNpdHlEaXYgPSBzdHlsZUVkaXRvclVpLm9wYWNpdHlEaXYgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1pbnRlcmlvci1lbGVtZW50Jywgc3R5bGVFZGl0b3JJbnRlcmlvcik7XHJcbiAgICB2YXIgbGluZVN0cm9rZURpdiA9IHN0eWxlRWRpdG9yVWkubGluZVN0cm9rZURpdiA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWludGVyaW9yLWVsZW1lbnQnLCBzdHlsZUVkaXRvckludGVyaW9yKTtcclxuICAgIHZhciBmaWxsQ29sb3JEaXYgPSBzdHlsZUVkaXRvclVpLmZpbGxDb2xvckRpdiA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWludGVyaW9yLWVsZW1lbnQnLCBzdHlsZUVkaXRvckludGVyaW9yKTtcclxuICAgIHZhciBmaWxsT3BhY2l0eURpdiA9IHN0eWxlRWRpdG9yVWkuZmlsbE9wYWNpdHlEaXYgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1pbnRlcmlvci1lbGVtZW50Jywgc3R5bGVFZGl0b3JJbnRlcmlvcik7XHJcblxyXG4gICAgdmFyIHBvaW50QnVmZmVyVHlwZURpdiA9IHN0eWxlRWRpdG9yVWkucG9pbnRCdWZmZXJUeXBlRGl2ID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItaW50ZXJpb3ItZWxlbWVudCcsIHN0eWxlRWRpdG9ySW50ZXJpb3IpO1xyXG4gICAgdmFyIGxpbmVCdWZmZXJUeXBlRGl2ID0gc3R5bGVFZGl0b3JVaS5saW5lQnVmZmVyVHlwZURpdiA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWludGVyaW9yLWVsZW1lbnQnLCBzdHlsZUVkaXRvckludGVyaW9yKTtcclxuICAgIHZhciBmaWxsQnVmZmVyVHlwZURpdiA9IHN0eWxlRWRpdG9yVWkuZmlsbEJ1ZmZlclR5cGVEaXYgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1pbnRlcmlvci1lbGVtZW50Jywgc3R5bGVFZGl0b3JJbnRlcmlvcik7XHJcbiAgICB2YXIgYnVmZmVyRGl2ID0gc3R5bGVFZGl0b3JVaS5idWZmZXJEaXYgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1pbnRlcmlvci1lbGVtZW50Jywgc3R5bGVFZGl0b3JJbnRlcmlvcik7XHJcbiAgICB0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JVaSA9IHN0eWxlRWRpdG9yVWk7XHJcblxyXG4gICAgdGhpcy5hZGREb21FdmVudHMoKTtcclxuICAgIHRoaXMuYWRkTGVhZmxldERyYXdFdmVudHMoKTtcclxuICAgIHRoaXMuYWRkQnV0dG9ucygpO1xyXG5cclxuICAgIHRoaXMub3B0aW9ucy5zdHlsZUZvcm0gPSBuZXcgTC5TdHlsZUZvcm1zKHtcclxuICAgICAgY29sb3JSYW1wOiB0aGlzLm9wdGlvbnMuY29sb3JSYW1wLFxyXG4gICAgICBzdHlsZUVkaXRvclVpOiBzdHlsZUVkaXRvclVpLFxyXG4gICAgICBzdHlsZUVkaXRvckRpdjogc3R5bGVFZGl0b3JEaXYsXHJcbiAgICAgIG1hcmtlckFwaTogdGhpcy5vcHRpb25zLm1hcmtlckFwaSxcclxuICAgICAgbWFya2VyczogdGhpcy5vcHRpb25zLm1hcmtlcnMsXHJcbiAgICAgIG1hcDogdGhpcy5vcHRpb25zLm1hcCxcclxuICAgICAgZXJyb3JDYWxsYmFjazogdGhpcy5vcHRpb25zLmVycm9yQ2FsbGJhY2ssXHJcbiAgICAgIGJ1ZmZlckNhbGxiYWNrOiB0aGlzLm9wdGlvbnMuYnVmZmVyQ2FsbGJhY2ssXHJcblxyXG4gICAgICAvLyBhZGQgYnkgbGl3ZWlcclxuICAgICAgaXNfdXNlX21hcmtlcl9pY29uOiB0aGlzLm9wdGlvbnMuaXNfdXNlX21hcmtlcl9pY29uLFxyXG4gICAgfSk7XHJcblxyXG4gICAgcmV0dXJuIGNvbnRyb2xEaXY7XHJcbiAgfSxcclxuXHJcbiAgYWRkRG9tRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMub3B0aW9ucy5jb250cm9sRGl2LCAnY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICB0aGlzLmNsaWNrSGFuZGxlcihlKTtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0sIHRoaXMpO1xyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLm9wdGlvbnMuY29udHJvbERpdiwgJ2RibGNsaWNrJywgZnVuY3Rpb24gKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfSwgdGhpcyk7XHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMub3B0aW9ucy5zdHlsZUVkaXRvckRpdiwgJ2NsaWNrJywgTC5Eb21FdmVudC5zdG9wUHJvcGFnYXRpb24pO1xyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JEaXYsICdtb3VzZWVudGVyJywgdGhpcy5kaXNhYmxlTGVhZmxldEFjdGlvbnMsIHRoaXMpO1xyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JEaXYsICdtb3VzZWxlYXZlJywgdGhpcy5lbmFibGVMZWFmbGV0QWN0aW9ucywgdGhpcyk7XHJcblxyXG4gICAgLy8gZG9uJ3QgbGV0IGRvdWJsZSBjbGlja3MgYW5kIG1vdXNlZG93biBnZXQgdG8gdGhlIG1hcFxyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLm9wdGlvbnMuY29udHJvbFVJLCAnZGJsY2xpY2snLCBMLkRvbUV2ZW50LnN0b3ApO1xyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcih0aGlzLm9wdGlvbnMuY29udHJvbFVJLCAnbW91c2Vkb3duJywgTC5Eb21FdmVudC5zdG9wKTtcclxuICB9LFxyXG5cclxuICBhZGRMZWFmbGV0RHJhd0V2ZW50czogZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKCF0aGlzLm9wdGlvbnMub3Blbk9uTGVhZmxldERyYXcpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKCFMLkNvbnRyb2wuRHJhdykge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5Zyo5YWD57Sg6KKr5Yib5bu65ZCO6Ieq5Yqo5by55Ye657yW6L6R5ZmoXHJcbiAgICAvLyB0aGlzLm9wdGlvbnMubWFwLm9uKCdkcmF3OmNyZWF0ZWQnLCBmdW5jdGlvbihsYXllcikge1xyXG4gICAgLy8gICAgIHRoaXMuaW5pdENoYW5nZVN0eWxlKHtcclxuICAgIC8vICAgICAgICAgXCJ0YXJnZXRcIjogbGF5ZXIubGF5ZXJcclxuICAgIC8vICAgICB9KTtcclxuICAgIC8vIH0sIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIGFkZEJ1dHRvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBuZXh0QnRuID0gTC5Eb21VdGlsLmNyZWF0ZSgnYnV0dG9uJywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItYnV0dG9uIHN0eWxlZWRpdG9yLW5leHRCdG4nLCB0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JIZWFkZXIpO1xyXG4gICAgbmV4dEJ0bi50aXRsZSA9IEwuc3R5bGVFZGl0b3JMb2NhbC50b29sdGlwTmV4dDtcclxuXHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKG5leHRCdG4sICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHRoaXMuaGlkZUVkaXRvcigpO1xyXG5cclxuICAgICAgaWYgKEwuRG9tVXRpbC5oYXNDbGFzcyh0aGlzLm9wdGlvbnMuY29udHJvbFVJLCAnZW5hYmxlZCcpKVxyXG4gICAgICAgIHRoaXMuY3JlYXRlVG9vbHRpcCgpO1xyXG5cclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIH0sIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIGNsaWNrSGFuZGxlcjogZnVuY3Rpb24gKGUpIHtcclxuICAgIHRoaXMub3B0aW9ucy5lbmFibGVkID0gIXRoaXMub3B0aW9ucy5lbmFibGVkO1xyXG5cclxuICAgIGlmICh0aGlzLm9wdGlvbnMuZW5hYmxlZCkge1xyXG4gICAgICB0aGlzLmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpcmUoJ2VuYWJsZWQnLCB7fSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLmNvbnRyb2xVSSwgJ2VuYWJsZWQnKTtcclxuICAgICAgdGhpcy5kaXNhYmxlKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZGlzYWJsZUxlYWZsZXRBY3Rpb25zOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbSA9IHRoaXMub3B0aW9ucy5tYXA7XHJcblxyXG4gICAgbS5kcmFnZ2luZy5kaXNhYmxlKCk7XHJcbiAgICBtLnRvdWNoWm9vbS5kaXNhYmxlKCk7XHJcbiAgICBtLmRvdWJsZUNsaWNrWm9vbS5kaXNhYmxlKCk7XHJcbiAgICBtLnNjcm9sbFdoZWVsWm9vbS5kaXNhYmxlKCk7XHJcbiAgICBtLmJveFpvb20uZGlzYWJsZSgpO1xyXG4gICAgbS5rZXlib2FyZC5kaXNhYmxlKCk7XHJcbiAgfSxcclxuXHJcbiAgZW5hYmxlTGVhZmxldEFjdGlvbnM6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBtID0gdGhpcy5vcHRpb25zLm1hcDtcclxuXHJcbiAgICBtLmRyYWdnaW5nLmVuYWJsZSgpO1xyXG4gICAgbS50b3VjaFpvb20uZW5hYmxlKCk7XHJcbiAgICBtLmRvdWJsZUNsaWNrWm9vbS5lbmFibGUoKTtcclxuICAgIG0uc2Nyb2xsV2hlZWxab29tLmVuYWJsZSgpO1xyXG4gICAgbS5ib3hab29tLmVuYWJsZSgpO1xyXG4gICAgbS5rZXlib2FyZC5lbmFibGUoKTtcclxuICB9LFxyXG5cclxuICBlbmFibGU6IGZ1bmN0aW9uICgpIHtcclxuICAgIEwuRG9tVXRpbC5hZGRDbGFzcyh0aGlzLm9wdGlvbnMuY29udHJvbFVJLCBcImVuYWJsZWRcIik7XHJcbiAgICB0aGlzLm9wdGlvbnMubWFwLmVhY2hMYXllcih0aGlzLmFkZEVkaXRDbGlja0V2ZW50cywgdGhpcyk7XHJcbiAgICB0aGlzLmNyZWF0ZVRvb2x0aXAoKTtcclxuICB9LFxyXG5cclxuICBkaXNhYmxlOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuZWRpdGxheWVycy5mb3JFYWNoKHRoaXMucmVtb3ZlRWRpdENsaWNrRXZlbnRzLCB0aGlzKTtcclxuICAgIHRoaXMub3B0aW9ucy5lZGl0bGF5ZXJzID0gW107XHJcbiAgICB0aGlzLm9wdGlvbnMubGF5ZXJHcm91cHMgPSBbXTtcclxuICAgIHRoaXMuaGlkZUVkaXRvcigpO1xyXG4gICAgdGhpcy5yZW1vdmVUb29sdGlwKCk7XHJcbiAgfSxcclxuXHJcbiAgYWRkRWRpdENsaWNrRXZlbnRzOiBmdW5jdGlvbiAobGF5ZXIpIHtcclxuICAgIGlmICh0aGlzLm9wdGlvbnMudXNlR3JvdXBpbmcgJiYgbGF5ZXIgaW5zdGFuY2VvZiBMLkxheWVyR3JvdXApIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmxheWVyR3JvdXBzLnB1c2gobGF5ZXIpO1xyXG4gICAgfSBlbHNlIGlmIChsYXllciBpbnN0YW5jZW9mIEwuTWFya2VyIHx8IGxheWVyIGluc3RhbmNlb2YgTC5QYXRoIHx8IGxheWVyIGluc3RhbmNlb2YgTC5HZW9KU09OKSB7XHJcbiAgICAgIHZhciBldnQgPSBsYXllci5vbignY2xpY2snLCB0aGlzLmluaXRDaGFuZ2VTdHlsZSwgdGhpcyk7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5lZGl0bGF5ZXJzLnB1c2goZXZ0KTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICByZW1vdmVFZGl0Q2xpY2tFdmVudHM6IGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgbGF5ZXIub2ZmKCdjbGljaycsIHRoaXMuaW5pdENoYW5nZVN0eWxlLCB0aGlzKTtcclxuICB9LFxyXG5cclxuICBoaWRlRWRpdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBMLkRvbVV0aWwucmVtb3ZlQ2xhc3ModGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yRGl2LCAnZWRpdG9yLWVuYWJsZWQnKTtcclxuICB9LFxyXG5cclxuICBzaG93RWRpdG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZWRpdG9yRGl2ID0gdGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yRGl2O1xyXG4gICAgaWYgKCFMLkRvbVV0aWwuaGFzQ2xhc3MoZWRpdG9yRGl2LCAnZWRpdG9yLWVuYWJsZWQnKSkge1xyXG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3MoZWRpdG9yRGl2LCAnZWRpdG9yLWVuYWJsZWQnKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBpbml0Q2hhbmdlU3R5bGU6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuY3VycmVudEVsZW1lbnQgPSAodGhpcy5vcHRpb25zLnVzZUdyb3VwaW5nKSA/IHRoaXMuZ2V0TWF0Y2hpbmdFbGVtZW50KGUpIDogZTtcclxuXHJcbiAgICB0aGlzLnNob3dFZGl0b3IoKTtcclxuICAgIHRoaXMucmVtb3ZlVG9vbHRpcCgpO1xyXG5cclxuICAgIHZhciBsYXllciA9IGUudGFyZ2V0O1xyXG4gICAgaWYgKGxheWVyIGluc3RhbmNlb2YgTC5NYXJrZXIpIHtcclxuICAgICAgLy8gbWFya2VyXHJcbiAgICAgIHRoaXMuc2hvd01hcmtlckZvcm0oKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIC8vIGxheWVyIHdpdGggb2YgdHlwZSBMLkdlb0pTT04gb3IgTC5QYXRoIChwb2x5bGluZSwgcG9seWdvbiwgLi4uKVxyXG4gICAgICB0aGlzLnNob3dHZW9tZXRyeUZvcm0oKTtcclxuICAgIH1cclxuICB9LFxyXG5cclxuICBzaG93R2VvbWV0cnlGb3JtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuc3R5bGVGb3JtLnNob3dHZW9tZXRyeUZvcm0oXHJcbiAgICAgIHRoaXMub3B0aW9ucy5jdXJyZW50RWxlbWVudFxyXG4gICAgKTtcclxuICB9LFxyXG5cclxuICBzaG93TWFya2VyRm9ybTogZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5vcHRpb25zLnN0eWxlRm9ybS5zaG93TWFya2VyRm9ybShcclxuICAgICAgdGhpcy5vcHRpb25zLmN1cnJlbnRFbGVtZW50XHJcbiAgICApO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZVRvb2x0aXA6IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICghdGhpcy5vcHRpb25zLnNob3dUb29sdGlwKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9wdGlvbnMudG9vbHRpcENhbGxiYWNrKHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIGdldE1hdGNoaW5nRWxlbWVudDogZnVuY3Rpb24gKGUpIHtcclxuICAgIHZhciBncm91cCA9IG51bGwsXHJcbiAgICAgIGxheWVyID0gZS50YXJnZXQ7XHJcblxyXG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMub3B0aW9ucy5sYXllckdyb3Vwcy5sZW5ndGg7ICsraSkge1xyXG4gICAgICBncm91cCA9IHRoaXMub3B0aW9ucy5sYXllckdyb3Vwc1sgaSBdO1xyXG4gICAgICBpZiAoZ3JvdXAgJiYgbGF5ZXIgIT0gZ3JvdXAgJiYgZ3JvdXAuaGFzTGF5ZXIobGF5ZXIpKSB7XHJcbiAgICAgICAgLy8gd2UgdXNlIHRoZSBvcGFjaXR5IHN0eWxlIHRvIGNoZWNrIGZvciBjb3JyZWN0IG9iamVjdFxyXG4gICAgICAgIGlmICghZ3JvdXAub3B0aW9ucyB8fCAhZ3JvdXAub3B0aW9ucy5vcGFjaXR5KSB7XHJcbiAgICAgICAgICBncm91cC5vcHRpb25zID0gbGF5ZXIub3B0aW9ucztcclxuXHJcbiAgICAgICAgICAvLyBzcGVjaWFsIGhhbmRsaW5nIGZvciBsYXllcnMuLi4gd2UgcGFzcyB0aGUgc2V0SWNvbiBmdW5jdGlvblxyXG4gICAgICAgICAgaWYgKGxheWVyLnNldEljb24pIHtcclxuICAgICAgICAgICAgZ3JvdXAuc2V0SWNvbiA9IGZ1bmN0aW9uIChpY29uKSB7XHJcbiAgICAgICAgICAgICAgZ3JvdXAuZWFjaExheWVyKGZ1bmN0aW9uIChsYXllcikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGxheWVyIGluc3RhbmNlb2YgTC5NYXJrZXIpIHtcclxuICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0SWNvbihpY29uKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzLmdldE1hdGNoaW5nRWxlbWVudCh7XHJcbiAgICAgICAgICB0YXJnZXQ6IGdyb3VwXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gZTtcclxuICB9LFxyXG5cclxuICByZW1vdmVUb29sdGlwOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5vcHRpb25zLnRvb2x0aXAgJiYgdGhpcy5vcHRpb25zLnRvb2x0aXAucGFyZW50Tm9kZSkge1xyXG4gICAgICB0aGlzLm9wdGlvbnMudG9vbHRpcC5yZW1vdmUoKTtcclxuICAgICAgdGhpcy5vcHRpb25zLnRvb2x0aXAgPSB1bmRlZmluZWQ7XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgaXNFbmFibGVkOiBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLmVuYWJsZWQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG5MLmNvbnRyb2wuc3R5bGVFZGl0b3IgPSBmdW5jdGlvbiAob3B0aW9ucykge1xyXG4gIHJldHVybiBuZXcgTC5Db250cm9sLlN0eWxlRWRpdG9yKG9wdGlvbnMpO1xyXG59O1xyXG4iLCIvKlxyXG5TdHlsZSBvcHRpb25zIGJhc2VkIG9uOlxyXG4tIHBhdGg6IGh0dHA6Ly9sZWFmbGV0anMuY29tL3JlZmVyZW5jZS5odG1sI3BhdGgtb3B0aW9uc1xyXG4tIGljb246IGh0dHA6Ly9sZWFmbGV0anMuY29tL3JlZmVyZW5jZS5odG1sI2ljb25cclxuXHJcbk1hcmtlcnMgZnJvbTpcclxuLSBNYWtpIE1hcmtlcnMgZnJvbSBtYXBib3g6IGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFraS9cclxuKi9cclxuXHJcbkwuU3R5bGVGb3JtcyA9IEwuQ2xhc3MuZXh0ZW5kKHtcclxuICBvcHRpb25zOiB7XHJcbiAgICBjdXJyZW50TWFya2VyU3R5bGU6IHtcclxuICAgICAgc2l6ZTogJ20nLFxyXG4gICAgICBjb2xvcjogJzM0OThkYidcclxuICAgIH0sXHJcbiAgfSxcclxuXHJcbiAgaW5pdGlhbGl6ZTogZnVuY3Rpb24gKG9wdGlvbnMpIHtcclxuICAgIEwuc2V0T3B0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuICAgIHRoaXMuY3JlYXRlSWNvblVybCgpO1xyXG4gICAgdGhpcy5jcmVhdGVNYXJrZXJDb2xvcigpO1xyXG4gICAgdGhpcy5jcmVhdGVNYXJrZXJTaXplKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUNvbG9yKCk7XHJcbiAgICB0aGlzLmNyZWF0ZU9wYWNpdHkoKTtcclxuICAgIHRoaXMuY3JlYXRlU3Ryb2tlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUZpbGxDb2xvcigpO1xyXG4gICAgdGhpcy5jcmVhdGVGaWxsT3BhY2l0eSgpO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlUG9pbnRCdWZmZXJUeXBlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUxpbmVCdWZmZXJUeXBlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUZpbGxCdWZmZXJUeXBlKCk7XHJcbiAgICB0aGlzLmNyZWF0ZUJ1ZmZlcigpO1xyXG5cclxuICAgIHRoaXMuYWRkRE9NRXZlbnRzKCk7XHJcbiAgfSxcclxuXHJcbiAgYWRkRE9NRXZlbnRzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHRoaXMub3B0aW9ucy5tYXAsICdjbGljaycsIHRoaXMuaGlkZVNlbGVjdElucHV0LCB0aGlzKTtcclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIodGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yRGl2LCAnY2xpY2snLCB0aGlzLmhpZGVTZWxlY3RJbnB1dCwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgY2xlYXJGb3JtOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3R5bGVFZGl0b3JVaSA9IHRoaXMub3B0aW9ucy5zdHlsZUVkaXRvclVpO1xyXG4gICAgdGhpcy5oaWRlU2VsZWN0SW5wdXQoKTtcclxuXHJcbiAgICBPYmplY3Qua2V5cyhzdHlsZUVkaXRvclVpKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcclxuICAgICAgdmFyIGVsZW1lbnQgPSBzdHlsZUVkaXRvclVpWyBrZXkgXTtcclxuICAgICAgaWYgKGVsZW1lbnQuaW5uZXJIVE1MKSB7XHJcbiAgICAgICAgdGhpcy5oaWRlRWxlbWVudChlbGVtZW50KTtcclxuICAgICAgfVxyXG4gICAgfSwgdGhpcyk7XHJcbiAgfSxcclxuXHJcbiAgc2hvd0dlb21ldHJ5Rm9ybTogZnVuY3Rpb24gKGN1cnJlbnRFbGVtZW50KSB7XHJcbiAgICB0aGlzLmNsZWFyRm9ybSgpO1xyXG5cclxuICAgIHRoaXMub3B0aW9ucy5jdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xyXG5cclxuICAgIHZhciBzdHlsZUVkaXRvclVpID0gdGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yVWk7XHJcbiAgICB2YXIgZ2VvbWV0cnlPcHRpb25zID0gY3VycmVudEVsZW1lbnQudGFyZ2V0Lm9wdGlvbnM7XHJcbiAgICBpZiAoZ2VvbWV0cnlPcHRpb25zLm9wYWNpdHkpXHJcbiAgICAgIHN0eWxlRWRpdG9yVWkub3BhY2l0eUlucHV0LnZhbHVlID0gZ2VvbWV0cnlPcHRpb25zLm9wYWNpdHk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHN0eWxlRWRpdG9yVWkub3BhY2l0eUlucHV0LnZhbHVlID0gMTtcclxuXHJcbiAgICBpZiAoZ2VvbWV0cnlPcHRpb25zLmZpbGxPcGFjaXR5KVxyXG4gICAgICBzdHlsZUVkaXRvclVpLmZpbGxPcGFjaXR5SW5wdXQudmFsdWUgPSBnZW9tZXRyeU9wdGlvbnMuZmlsbE9wYWNpdHk7XHJcbiAgICBlbHNlXHJcbiAgICAgIHN0eWxlRWRpdG9yVWkuZmlsbE9wYWNpdHlJbnB1dC52YWx1ZSA9IDAuMjtcclxuXHJcbiAgICB0aGlzLnNob3dFbGVtZW50KHN0eWxlRWRpdG9yVWkuY29sb3JEaXYpO1xyXG4gICAgdGhpcy5zaG93RWxlbWVudChzdHlsZUVkaXRvclVpLm9wYWNpdHlEaXYpO1xyXG4gICAgdGhpcy5zaG93RWxlbWVudChzdHlsZUVkaXRvclVpLmxpbmVTdHJva2VEaXYpO1xyXG5cclxuICAgIHZhciB0ID0gY3VycmVudEVsZW1lbnQudGFyZ2V0O1xyXG4gICAgdmFyIGlzUGxvdCA9IHQub3B0aW9ucy5pc1Bsb3QgPyB0cnVlIDogZmFsc2U7XHJcbiAgICBpZiAodCBpbnN0YW5jZW9mIEwuUG9seWdvbiB8fCB0IGluc3RhbmNlb2YgTC5MYXllckdyb3VwIHx8XHJcbiAgICAgICh0IGluc3RhbmNlb2YgTC5DaXJjbGUpIHx8ICh0IGluc3RhbmNlb2YgTC5DaXJjbGVNYXJrZXIpKSB7XHJcbiAgICAgIC8vICh0IGluc3RhbmNlb2YgTC5DaXJjbGUgJiYgISAodCBpbnN0YW5jZW9mIEwuQ2lyY2xlTWFya2VyKSkpIHtcclxuICAgICAgdGhpcy5zaG93RWxlbWVudChzdHlsZUVkaXRvclVpLmZpbGxDb2xvckRpdik7XHJcbiAgICAgIHRoaXMuc2hvd0VsZW1lbnQoc3R5bGVFZGl0b3JVaS5maWxsT3BhY2l0eURpdik7XHJcblxyXG4gICAgICBpZiAodCBpbnN0YW5jZW9mIEwuUG9seWdvbiB8fCB0IGluc3RhbmNlb2YgTC5MYXllckdyb3VwIHx8ICh0IGluc3RhbmNlb2YgTC5DaXJjbGUgJiYgISh0IGluc3RhbmNlb2YgTC5NYXJrZXIpKSkge1xyXG4gICAgICAgIGlmICghaXNQbG90KVxyXG4gICAgICAgICAgdGhpcy5zaG93RWxlbWVudChzdHlsZUVkaXRvclVpLmZpbGxCdWZmZXJUeXBlRGl2KTtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIHtcclxuICAgICAgICBpZiAoIWlzUGxvdClcclxuICAgICAgICAgIHRoaXMuc2hvd0VsZW1lbnQoc3R5bGVFZGl0b3JVaS5wb2ludEJ1ZmZlclR5cGVEaXYpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBlbHNlIGlmICh0IGluc3RhbmNlb2YgTC5Qb2x5bGluZSkge1xyXG4gICAgICBpZiAoIWlzUGxvdClcclxuICAgICAgICB0aGlzLnNob3dFbGVtZW50KHN0eWxlRWRpdG9yVWkubGluZUJ1ZmZlclR5cGVEaXYpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghaXNQbG90KVxyXG4gICAgICB0aGlzLnNob3dFbGVtZW50KHN0eWxlRWRpdG9yVWkuYnVmZmVyRGl2KTtcclxuICB9LFxyXG5cclxuICBzaG93TWFya2VyRm9ybTogZnVuY3Rpb24gKGN1cnJlbnRFbGVtZW50KSB7XHJcbiAgICB0aGlzLmNsZWFyRm9ybSgpO1xyXG5cclxuICAgIHRoaXMub3B0aW9ucy5jdXJyZW50RWxlbWVudCA9IGN1cnJlbnRFbGVtZW50O1xyXG5cclxuICAgIHZhciBpY29uT3B0aW9ucyA9IGN1cnJlbnRFbGVtZW50LnRhcmdldC5vcHRpb25zLmljb24ub3B0aW9ucztcclxuICAgIHZhciBtYXJrZXJTdHlsZSA9IHRoaXMub3B0aW9ucy5jdXJyZW50TWFya2VyU3R5bGU7XHJcbiAgICBpZiAoaWNvbk9wdGlvbnMuaWNvbkNvbG9yKVxyXG4gICAgICBtYXJrZXJTdHlsZS5jb2xvciA9IGljb25PcHRpb25zLmljb25Db2xvcjtcclxuICAgIGlmIChpY29uT3B0aW9ucy5pY29uKVxyXG4gICAgICBtYXJrZXJTdHlsZS5pY29uID0gaWNvbk9wdGlvbnMuaWNvbjtcclxuICAgIGlmIChpY29uT3B0aW9ucy5pY29uU2l6ZUNoYXIpXHJcbiAgICAgIG1hcmtlclN0eWxlLnNpemUgPSBpY29uT3B0aW9ucy5pY29uU2l6ZUNoYXI7XHJcblxyXG4gICAgdmFyIHN0eWxlRWRpdG9yVWkgPSB0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JVaTtcclxuICAgIC8vIHRoaXMuc2hvd0VsZW1lbnQoc3R5bGVFZGl0b3JVaS5pY29uRGl2KTtcclxuICAgIC8vIHRoaXMuc2hvd0VsZW1lbnQoc3R5bGVFZGl0b3JVaS5tYXJrZXJDb2xvckRpdik7XHJcbiAgICAvLyB0aGlzLnNob3dFbGVtZW50KHN0eWxlRWRpdG9yVWkuc2l6ZURpdik7XHJcbiAgICAvLyB0aGlzLnN0eWxlU2VsZWN0SW5wdXQoKTtcclxuXHJcbiAgICAvLyBhZGQgYnkgbGl3ZWlcclxuICAgIGlmICh0aGlzLm9wdGlvbnMuaXNfdXNlX21hcmtlcl9pY29uKSB7XHJcbiAgICAgIHRoaXMuc2hvd0VsZW1lbnQoc3R5bGVFZGl0b3JVaS5pY29uRGl2KTtcclxuICAgICAgdGhpcy5zaG93RWxlbWVudChzdHlsZUVkaXRvclVpLm1hcmtlckNvbG9yRGl2KTtcclxuICAgICAgdGhpcy5zaG93RWxlbWVudChzdHlsZUVkaXRvclVpLnNpemVEaXYpO1xyXG4gICAgICB0aGlzLnN0eWxlU2VsZWN0SW5wdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnNob3dFbGVtZW50KHN0eWxlRWRpdG9yVWkucG9pbnRCdWZmZXJUeXBlRGl2KTtcclxuICAgIHRoaXMuc2hvd0VsZW1lbnQoc3R5bGVFZGl0b3JVaS5idWZmZXJEaXYpO1xyXG4gIH0sXHJcblxyXG4gIHNldE5ld01hcmtlcjogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIG1hcmtlclN0eWxlID0gdGhpcy5vcHRpb25zLmN1cnJlbnRNYXJrZXJTdHlsZTtcclxuXHJcbiAgICBpZiAobWFya2VyU3R5bGUuc2l6ZSAmJiBtYXJrZXJTdHlsZS5pY29uICYmIG1hcmtlclN0eWxlLmNvbG9yKSB7XHJcbiAgICAgIHZhciBpY29uU2l6ZTtcclxuICAgICAgc3dpdGNoIChtYXJrZXJTdHlsZS5zaXplKSB7XHJcbiAgICAgICAgY2FzZSAncyc6XHJcbiAgICAgICAgICBpY29uU2l6ZSA9IFsgMjAsIDUwIF07XHJcbiAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlICdtJzpcclxuICAgICAgICAgIGljb25TaXplID0gWyAzMCwgNzAgXTtcclxuICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgJ2wnOlxyXG4gICAgICAgICAgaWNvblNpemUgPSBbIDM1LCA5MCBdO1xyXG4gICAgICAgICAgYnJlYWs7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHZhciBuZXdJY29uID0gbmV3IEwuSWNvbih7XHJcbiAgICAgICAgaWNvblVybDogdGhpcy5nZXRJY29uU3JjKCksXHJcbiAgICAgICAgaWNvblNpemU6IGljb25TaXplLFxyXG4gICAgICAgIGljb25TaXplQ2hhcjogbWFya2VyU3R5bGUuc2l6ZSxcclxuICAgICAgICBpY29uQ29sb3I6IG1hcmtlclN0eWxlLmNvbG9yLFxyXG4gICAgICAgIGljb246IG1hcmtlclN0eWxlLmljb24sXHJcbiAgICAgICAgaWNvbkFuY2hvcjogWyBpY29uU2l6ZVsgMCBdIC8gMiwgaWNvblNpemVbIDEgXSAvIDIgXSxcclxuICAgICAgICBwb3B1cEFuY2hvcjogWyAwLCAtaWNvblNpemVbIDEgXSAvIDIgXVxyXG4gICAgICB9KTtcclxuICAgICAgdmFyIGN1cnJlbnRFbGVtZW50ID0gdGhpcy5vcHRpb25zLmN1cnJlbnRFbGVtZW50LnRhcmdldDtcclxuICAgICAgY3VycmVudEVsZW1lbnQuc2V0SWNvbihuZXdJY29uKTtcclxuICAgICAgdGhpcy5maXJlQ2hhbmdlRXZlbnQoY3VycmVudEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5oaWRlU2VsZWN0SW5wdXQoKTtcclxuICAgIHRoaXMuc3R5bGVTZWxlY3RJbnB1dCgpO1xyXG4gIH0sXHJcblxyXG4gIHNob3dFbGVtZW50OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgaWYgKGVsZW1lbnQpXHJcbiAgICAgIEwuRG9tVXRpbC5yZW1vdmVDbGFzcyhlbGVtZW50LCAnbGVhZmxldC1zdHlsZWVkaXRvci1oaWRkZW4nKTtcclxuICB9LFxyXG5cclxuICBoaWRlRWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQpIHtcclxuICAgIGlmIChlbGVtZW50KVxyXG4gICAgICBMLkRvbVV0aWwuYWRkQ2xhc3MoZWxlbWVudCwgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItaGlkZGVuJyk7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlSWNvblVybDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGljb25EaXYgPSB0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JVaS5pY29uRGl2O1xyXG5cclxuICAgIHZhciBsYWJlbCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2xhYmVsJywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItbGFiZWwnLCBpY29uRGl2KTtcclxuICAgIGxhYmVsLmlubmVySFRNTCA9IEwuc3R5bGVFZGl0b3JMb2NhbC5pY29uO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlU2VsZWN0SW5wdXQoaWNvbkRpdiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdmFyIHZhbHVlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCd2YWx1ZScpO1xyXG5cclxuICAgICAgdGhpcy5vcHRpb25zLnNlbGVjdEJveEltYWdlLnNldEF0dHJpYnV0ZSgndmFsdWUnLCB2YWx1ZSk7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5jdXJyZW50TWFya2VyU3R5bGUuaWNvbiA9IHZhbHVlO1xyXG5cclxuICAgICAgdGhpcy5zZXROZXdNYXJrZXIoKTtcclxuICAgIH0uYmluZCh0aGlzKSwgdGhpcy5vcHRpb25zLm1hcmtlcnMpO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZU1hcmtlckNvbG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgbWFya2VyQ29sb3JEaXYgPSB0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JVaS5tYXJrZXJDb2xvckRpdjtcclxuXHJcbiAgICB2YXIgY29sb3JVaSA9IHRoaXMub3B0aW9ucy5jb2xvclVpID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItdWktZWxlbWVudCcsIG1hcmtlckNvbG9yRGl2KTtcclxuXHJcbiAgICB2YXIgbGFiZWwgPSBMLkRvbVV0aWwuY3JlYXRlKCdsYWJlbCcsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWxhYmVsJywgY29sb3JVaSk7XHJcbiAgICBsYWJlbC5pbm5lckhUTUwgPSBMLnN0eWxlRWRpdG9yTG9jYWwuY29sb3I7XHJcblxyXG4gICAgdGhpcy5jcmVhdGVDb2xvclBpY2tlcihtYXJrZXJDb2xvckRpdiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdmFyIGNvbG9yID0gdGhpcy5yZ2JUb0hleChlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgICB0aGlzLm9wdGlvbnMuY3VycmVudE1hcmtlclN0eWxlLmNvbG9yID0gY29sb3IucmVwbGFjZShcIiNcIiwgXCJcIik7XHJcbiAgICAgIHRoaXMuc2V0TmV3TWFya2VyKCk7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZU1hcmtlclNpemU6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzaXplRGl2ID0gdGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yVWkuc2l6ZURpdjtcclxuXHJcbiAgICB2YXIgbGFiZWwgPSBMLkRvbVV0aWwuY3JlYXRlKCdsYWJlbCcsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWxhYmVsJywgc2l6ZURpdik7XHJcbiAgICBsYWJlbC5pbm5lckhUTUwgPSBMLnN0eWxlRWRpdG9yTG9jYWwuc2l6ZTtcclxuXHJcbiAgICB2YXIgcyA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXN0eWxlZWRpdG9yLXNpemVpY29uIHNpemVpY29uLXNtYWxsJywgdGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yVWkuc2l6ZURpdik7XHJcbiAgICB2YXIgbSA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXN0eWxlZWRpdG9yLXNpemVpY29uIHNpemVpY29uLW1lZGl1bScsIHRoaXMub3B0aW9ucy5zdHlsZUVkaXRvclVpLnNpemVEaXYpO1xyXG4gICAgdmFyIGwgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1zaXplaWNvbiBzaXplaWNvbi1sYXJnZScsIHRoaXMub3B0aW9ucy5zdHlsZUVkaXRvclVpLnNpemVEaXYpO1xyXG5cclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIocywgJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICB0aGlzLm9wdGlvbnMuY3VycmVudE1hcmtlclN0eWxlLnNpemUgPSAncyc7XHJcbiAgICAgIHRoaXMuc2V0TmV3TWFya2VyKCk7XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKG0sICdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgdGhpcy5vcHRpb25zLmN1cnJlbnRNYXJrZXJTdHlsZS5zaXplID0gJ20nO1xyXG4gICAgICB0aGlzLnNldE5ld01hcmtlcigpO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihsLCAnY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5jdXJyZW50TWFya2VyU3R5bGUuc2l6ZSA9ICdsJztcclxuICAgICAgdGhpcy5zZXROZXdNYXJrZXIoKTtcclxuICAgIH0sIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUNvbG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgY29sb3JEaXYgPSB0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JVaS5jb2xvckRpdjtcclxuXHJcbiAgICB2YXIgbGFiZWwgPSBMLkRvbVV0aWwuY3JlYXRlKCdsYWJlbCcsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWxhYmVsJywgY29sb3JEaXYpO1xyXG4gICAgbGFiZWwuaW5uZXJIVE1MID0gTC5zdHlsZUVkaXRvckxvY2FsLmNvbG9yO1xyXG5cclxuICAgIHRoaXMuY3JlYXRlQ29sb3JQaWNrZXIoY29sb3JEaXYsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHZhciBjb2xvciA9IHRoaXMucmdiVG9IZXgoZS50YXJnZXQuc3R5bGUuYmFja2dyb3VuZENvbG9yKTtcclxuICAgICAgdGhpcy5zZXRTdHlsZSgnY29sb3InLCBjb2xvcik7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZVN0cm9rZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGxpbmVTdHJva2VEaXYgPSB0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JVaS5saW5lU3Ryb2tlRGl2O1xyXG5cclxuICAgIHZhciBsYWJlbCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2xhYmVsJywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItbGFiZWwnLCBsaW5lU3Ryb2tlRGl2KTtcclxuICAgIGxhYmVsLmlubmVySFRNTCA9IEwuc3R5bGVFZGl0b3JMb2NhbC5saW5lU3Ryb2tlO1xyXG5cclxuICAgIHZhciBzdHJva2UxID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3Itc3Ryb2tlJywgbGluZVN0cm9rZURpdik7XHJcbiAgICBzdHJva2UxLnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IFwiMHB4IC03NXB4XCI7XHJcblxyXG4gICAgdmFyIHN0cm9rZTIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1zdHJva2UnLCBsaW5lU3Ryb2tlRGl2KTtcclxuICAgIHN0cm9rZTIuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gXCIwcHggLTk1cHhcIjtcclxuXHJcbiAgICB2YXIgc3Ryb2tlMyA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXN0eWxlZWRpdG9yLXN0cm9rZScsIGxpbmVTdHJva2VEaXYpO1xyXG4gICAgc3Ryb2tlMy5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBcIjBweCAtMTE1cHhcIjtcclxuXHJcbiAgICAvLyBMLkRvbVV0aWwuY3JlYXRlKCdicicsICdibGEnLCBsaW5lU3Ryb2tlRGl2KTtcclxuXHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHN0cm9rZTEsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHRoaXMuc2V0U3R5bGUoJ2Rhc2hBcnJheScsICcxJyk7XHJcbiAgICB9LCB0aGlzKTtcclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIoc3Ryb2tlMiwgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdGhpcy5zZXRTdHlsZSgnZGFzaEFycmF5JywgJzEwLDEwJyk7XHJcbiAgICB9LCB0aGlzKTtcclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIoc3Ryb2tlMywgJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdGhpcy5zZXRTdHlsZSgnZGFzaEFycmF5JywgJzE1LCAxMCwgMSwgMTAnKTtcclxuICAgIH0sIHRoaXMpO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZU9wYWNpdHk6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBvcGFjaXR5RGl2ID0gdGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yVWkub3BhY2l0eURpdjtcclxuXHJcbiAgICB2YXIgbGFiZWwgPSBMLkRvbVV0aWwuY3JlYXRlKCdsYWJlbCcsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWxhYmVsJywgb3BhY2l0eURpdik7XHJcbiAgICBsYWJlbC5pbm5lckhUTUwgPSBMLnN0eWxlRWRpdG9yTG9jYWwub3BhY2l0eTtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JVaS5vcGFjaXR5SW5wdXQgPSB0aGlzLmNyZWF0ZU51bWJlcklucHV0KG9wYWNpdHlEaXYsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIHZhciB2YWx1ZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICB0aGlzLnNldFN0eWxlKCdvcGFjaXR5JywgdmFsdWUpO1xyXG4gICAgfS5iaW5kKHRoaXMpLCAwLjcsIDAsIDEsIDAuMSk7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlRmlsbENvbG9yOiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZmlsbENvbG9yRGl2ID0gdGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yVWkuZmlsbENvbG9yRGl2O1xyXG5cclxuICAgIHZhciBsYWJlbCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2xhYmVsJywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItbGFiZWwnLCBmaWxsQ29sb3JEaXYpO1xyXG4gICAgbGFiZWwuaW5uZXJIVE1MID0gTC5zdHlsZUVkaXRvckxvY2FsLmZpbGxDb2xvcjtcclxuXHJcbiAgICB0aGlzLmNyZWF0ZUNvbG9yUGlja2VyKGZpbGxDb2xvckRpdiwgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgdmFyIGNvbG9yID0gdGhpcy5yZ2JUb0hleChlLnRhcmdldC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IpO1xyXG4gICAgICB0aGlzLnNldFN0eWxlKCdmaWxsQ29sb3InLCBjb2xvcik7XHJcbiAgICB9LmJpbmQodGhpcykpO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZUZpbGxPcGFjaXR5OiBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgZmlsbE9wYWNpdHlEaXYgPSB0aGlzLm9wdGlvbnMuc3R5bGVFZGl0b3JVaS5maWxsT3BhY2l0eURpdjtcclxuXHJcbiAgICB2YXIgbGFiZWwgPSBMLkRvbVV0aWwuY3JlYXRlKCdsYWJlbCcsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWxhYmVsJywgZmlsbE9wYWNpdHlEaXYpO1xyXG4gICAgbGFiZWwuaW5uZXJIVE1MID0gTC5zdHlsZUVkaXRvckxvY2FsLmZpbGxPcGFjaXR5O1xyXG5cclxuICAgIHRoaXMub3B0aW9ucy5zdHlsZUVkaXRvclVpLmZpbGxPcGFjaXR5SW5wdXQgPSB0aGlzLmNyZWF0ZU51bWJlcklucHV0KGZpbGxPcGFjaXR5RGl2LCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICB2YXIgdmFsdWUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgdGhpcy5zZXRTdHlsZSgnZmlsbE9wYWNpdHknLCB2YWx1ZSk7XHJcbiAgICB9LmJpbmQodGhpcyksIDAuNCwgMCwgMSwgMC4xKTtcclxuICB9LFxyXG5cclxuICBjcmVhdGVDb2xvclBpY2tlcjogZnVuY3Rpb24gKHBhcmVudERpdiwgY2FsbGJhY2spIHtcclxuICAgIHZhciBjb2xvclBpY2tlckRpdiA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWNvbG9ycGlja2VyJywgcGFyZW50RGl2KTtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMuY29sb3JSYW1wLmZvckVhY2goZnVuY3Rpb24gKGNvbG9yKSB7XHJcbiAgICAgIHZhciBlbGVtID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItY29sb3InLCBjb2xvclBpY2tlckRpdik7XHJcbiAgICAgIGVsZW0uc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XHJcblxyXG4gICAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKGVsZW0sICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICBjYWxsYmFjayhlKTtcclxuICAgICAgfSk7XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICAvLyBMLkRvbVV0aWwuY3JlYXRlKCdicicsICcnLCBwYXJlbnREaXYpO1xyXG4gICAgLy8gTC5Eb21VdGlsLmNyZWF0ZSgnYnInLCAnJywgcGFyZW50RGl2KTtcclxuXHJcbiAgICByZXR1cm4gY29sb3JQaWNrZXJEaXY7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlTnVtYmVySW5wdXQ6IGZ1bmN0aW9uIChwYXJlbnREaXYsIGNhbGxiYWNrLCB2YWx1ZSwgbWluLCBtYXgsIHN0ZXApIHtcclxuICAgIHZhciBudW1iZXJJbnB1dCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2lucHV0JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItaW5wdXQnLCBwYXJlbnREaXYpO1xyXG4gICAgbnVtYmVySW5wdXQuc2V0QXR0cmlidXRlKCd0eXBlJywgJ251bWJlcicpO1xyXG4gICAgbnVtYmVySW5wdXQuc2V0QXR0cmlidXRlKCd2YWx1ZScsIHZhbHVlKTtcclxuICAgIG51bWJlcklucHV0LnNldEF0dHJpYnV0ZSgnbWluJywgbWluKTtcclxuICAgIG51bWJlcklucHV0LnNldEF0dHJpYnV0ZSgnbWF4JywgbWF4KTtcclxuICAgIG51bWJlcklucHV0LnNldEF0dHJpYnV0ZSgnc3RlcCcsIHN0ZXApO1xyXG5cclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIobnVtYmVySW5wdXQsICdjaGFuZ2UnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICBjYWxsYmFjayhlKTtcclxuICAgIH0pO1xyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihudW1iZXJJbnB1dCwgJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgY2FsbGJhY2soZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBMLkRvbVV0aWwuY3JlYXRlKCdicicsICcnLCBwYXJlbnREaXYpO1xyXG4gICAgLy8gTC5Eb21VdGlsLmNyZWF0ZSgnYnInLCAnJywgcGFyZW50RGl2KTtcclxuXHJcbiAgICByZXR1cm4gbnVtYmVySW5wdXQ7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlU2VsZWN0SW5wdXQ6IGZ1bmN0aW9uIChwYXJlbnREaXYsIGNhbGxiYWNrLCBvcHRpb25zKSB7XHJcbiAgICB2YXIgc2VsZWN0Qm94ID0gTC5Eb21VdGlsLmNyZWF0ZSgnYnV0dG9uJywgJ2xlYWZsZXQtc3R5bGVlZGl0b3Itc2VsZWN0IGxlYWZsZXQtc3R5bGVlZGl0b3Itc2VsZWN0LW1hcmtlcicsIHBhcmVudERpdik7XHJcbiAgICB2YXIgc2VsZWN0Qm94SW1hZ2UgPSB0aGlzLm9wdGlvbnMuc2VsZWN0Qm94SW1hZ2UgPSBMLkRvbVV0aWwuY3JlYXRlKCdpbWcnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1zZWxlY3QtaW1hZ2UnLCBzZWxlY3RCb3gpO1xyXG5cclxuICAgIHZhciBzZWxlY3RPcHRpb25XcmFwcGVyID0gdGhpcy5vcHRpb25zLnNlbGVjdE9wdGlvbldyYXBwZXIgPVxyXG4gICAgICBMLkRvbVV0aWwuY3JlYXRlKCd1bCcsICdsZWFmbGV0LXN0eWxlZWRpdG9yLXNlbGVjdC1vcHRpb24td3JhcHBlciBsZWFmbGV0LXN0eWxlZWRpdG9yLWhpZGRlbicsIHBhcmVudERpdik7XHJcbiAgICBzZWxlY3RPcHRpb25XcmFwcGVyLmlkID0gJ2xlYWZsZXQtc3R5bGVlZGl0b3Itc2VsZWN0LW9wdGlvbi13cmFwcGVyJztcclxuXHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHNlbGVjdEJveCwgJ2NsaWNrJywgdGhpcy50b2dnbGVTZWxlY3RJbnB1dCwgdGhpcyk7XHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHNlbGVjdEJveEltYWdlLCAnY2xpY2snLCB0aGlzLnRvZ2dsZVNlbGVjdElucHV0LCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLm9wdGlvbnMuc2VsZWN0SW1hZ2VzID0gW107XHJcblxyXG4gICAgb3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChvcHRpb24pIHtcclxuICAgICAgdmFyIHNlbGVjdE9wdGlvbiA9IEwuRG9tVXRpbC5jcmVhdGUoJ2xpJywgJ2xlYWZsZXQtc3R5bGVlZGl0b3Itc2VsZWN0LW9wdGlvbicsIHNlbGVjdE9wdGlvbldyYXBwZXIpO1xyXG4gICAgICB2YXIgc2VsZWN0SW1hZ2UgPSBMLkRvbVV0aWwuY3JlYXRlKCdpbWcnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1zZWxlY3Qtb3B0aW9uLWltYWdlJywgc2VsZWN0T3B0aW9uKTtcclxuICAgICAgc2VsZWN0SW1hZ2Uuc2V0QXR0cmlidXRlKCd2YWx1ZScsIG9wdGlvbik7XHJcbiAgICAgIHRoaXMub3B0aW9ucy5zZWxlY3RJbWFnZXMucHVzaChzZWxlY3RJbWFnZSk7XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICBMLkRvbUV2ZW50LmFkZExpc3RlbmVyKHNlbGVjdE9wdGlvbldyYXBwZXIsICdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGlmIChlLnRhcmdldC5ub2RlTmFtZSA9PT0gJ1VMJylcclxuICAgICAgICByZXR1cm47XHJcblxyXG4gICAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQ7XHJcbiAgICAgIGlmIChlLnRhcmdldC5ub2RlTmFtZSA9PT0gJ0xJJylcclxuICAgICAgICB0YXJnZXQgPSBlLnRhcmdldC5jaGlsZE5vZGVzWyAwIF07XHJcblxyXG4gICAgICBjYWxsYmFjayh7XHJcbiAgICAgICAgJ3RhcmdldCc6IHRhcmdldFxyXG4gICAgICB9KTtcclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHJldHVybiBzZWxlY3RCb3g7XHJcbiAgfSxcclxuXHJcbiAgc3R5bGVTZWxlY3RJbnB1dDogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHNlbGVjdEJveEltYWdlID0gdGhpcy5vcHRpb25zLnNlbGVjdEJveEltYWdlO1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5jdXJyZW50RWxlbWVudCkge1xyXG4gICAgICB2YXIgc2VsZWN0Qm94SW1hZ2VWYWx1ZSA9IHRoaXMub3B0aW9ucy5jdXJyZW50RWxlbWVudC50YXJnZXQub3B0aW9ucy5pY29uLm9wdGlvbnMuaWNvbjtcclxuICAgICAgaWYgKHNlbGVjdEJveEltYWdlVmFsdWUpIHtcclxuICAgICAgICBzZWxlY3RCb3hJbWFnZS5zcmMgPSB0aGlzLmdldEljb25TcmMoJ3MnLCBzZWxlY3RCb3hJbWFnZVZhbHVlKTtcclxuICAgICAgICB0aGlzLnNob3dFbGVtZW50KHNlbGVjdEJveEltYWdlKTtcclxuICAgICAgfSBlbHNlXHJcbiAgICAgICAgdGhpcy5oaWRlRWxlbWVudChzZWxlY3RCb3hJbWFnZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmhpZGVFbGVtZW50KHNlbGVjdEJveEltYWdlKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgc2VsZWN0SW1hZ2VzID0gdGhpcy5vcHRpb25zLnNlbGVjdEltYWdlcztcclxuICAgIHNlbGVjdEltYWdlcy5mb3JFYWNoKGZ1bmN0aW9uIChzZWxlY3RJbWFnZSkge1xyXG4gICAgICBzZWxlY3RJbWFnZS5zcmMgPSB0aGlzLmdldEljb25TcmMoJ3MnLCBzZWxlY3RJbWFnZS5nZXRBdHRyaWJ1dGUoJ3ZhbHVlJykpO1xyXG4gICAgfSwgdGhpcyk7XHJcblxyXG4gICAgdGhpcy5oaWRlU2VsZWN0SW5wdXQoKTtcclxuICB9LFxyXG5cclxuICB0b2dnbGVTZWxlY3RJbnB1dDogZnVuY3Rpb24gKGUpIHtcclxuICAgIEwuRG9tRXZlbnQuc3RvcFByb3BhZ2F0aW9uKGUpO1xyXG5cclxuICAgIHZhciBzZWxlY3RPcHRpb25XcmFwcGVyID0gdGhpcy5vcHRpb25zLnNlbGVjdE9wdGlvbldyYXBwZXI7XHJcblxyXG4gICAgaWYgKEwuRG9tVXRpbC5oYXNDbGFzcyhzZWxlY3RPcHRpb25XcmFwcGVyLCAnbGVhZmxldC1zdHlsZWVkaXRvci1oaWRkZW4nKSlcclxuICAgICAgdGhpcy5zaG93RWxlbWVudChzZWxlY3RPcHRpb25XcmFwcGVyKTtcclxuICAgIGVsc2VcclxuICAgICAgdGhpcy5oaWRlRWxlbWVudChzZWxlY3RPcHRpb25XcmFwcGVyKTtcclxuICB9LFxyXG5cclxuICBoaWRlU2VsZWN0SW5wdXQ6IGZ1bmN0aW9uIChlKSB7XHJcbiAgICBpZiAoZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC50YWdOYW1lICYmIEwuRG9tVXRpbC5oYXNDbGFzcyhlLnRhcmdldCwgJ2xlYWZsZXQtc3R5bGVlZGl0b3Itc2VsZWN0JykpXHJcbiAgICAgIHJldHVybjtcclxuXHJcbiAgICB2YXIgc2VsZWN0T3B0aW9uV3JhcHBlciA9IHRoaXMub3B0aW9ucy5zZWxlY3RPcHRpb25XcmFwcGVyO1xyXG4gICAgaWYgKCFzZWxlY3RPcHRpb25XcmFwcGVyKVxyXG4gICAgICBzZWxlY3RPcHRpb25XcmFwcGVyID0gTC5Eb21VdGlsLmdldCgnbGVhZmxldC1zdHlsZWVkaXRvci1zZWxlY3Qtb3B0aW9uLXdyYXBwZXInKTtcclxuICAgIHRoaXMuaGlkZUVsZW1lbnQoc2VsZWN0T3B0aW9uV3JhcHBlcik7XHJcbiAgfSxcclxuXHJcbiAgZ2V0SWNvblNyYzogZnVuY3Rpb24gKHNpemUsIGljb24pIHtcclxuICAgIHZhciBtYXJrZXJTdHlsZSA9IHRoaXMub3B0aW9ucy5jdXJyZW50TWFya2VyU3R5bGU7XHJcbiAgICBpZiAoIWljb24pXHJcbiAgICAgIGljb24gPSBtYXJrZXJTdHlsZS5pY29uO1xyXG4gICAgaWYgKCFzaXplKVxyXG4gICAgICBzaXplID0gbWFya2VyU3R5bGUuc2l6ZTtcclxuICAgIC8vIHJldHVybiB0aGlzLm9wdGlvbnMubWFya2VyQXBpICsgJ3Bpbi0nICsgc2l6ZSArICctJyArIGljb24rICcrJyArIG1hcmtlclN0eWxlLmNvbG9yICsgJ0AyeC5wbmcnXHJcbiAgICByZXR1cm4gdGhpcy5vcHRpb25zLm1hcmtlckFwaSArIHNpemUgKyAnL3Bpbi0nICsgc2l6ZSArICctJyArIGljb24gKyAnKycgKyBtYXJrZXJTdHlsZS5jb2xvciArICdAMngucG5nJ1xyXG4gIH0sXHJcblxyXG4gIHNldFN0eWxlOiBmdW5jdGlvbiAob3B0aW9uLCB2YWx1ZSkge1xyXG4gICAgdmFyIG5ld1N0eWxlID0ge307XHJcbiAgICBuZXdTdHlsZVsgb3B0aW9uIF0gPSB2YWx1ZTtcclxuICAgIHZhciBjdXJyZW50RWxlbWVudCA9IHRoaXMub3B0aW9ucy5jdXJyZW50RWxlbWVudC50YXJnZXQ7XHJcbiAgICBjdXJyZW50RWxlbWVudC5zZXRTdHlsZShuZXdTdHlsZSk7XHJcbiAgICB0aGlzLmZpcmVDaGFuZ2VFdmVudChjdXJyZW50RWxlbWVudCk7XHJcblxyXG4gICAgLy8gYWRkIGJ5IGxpd2VpXHJcbiAgICBpZiAoY3VycmVudEVsZW1lbnQuZ2V0TGF5ZXJzKSB7XHJcbiAgICAgIHZhciBsYXllcnMgPSBjdXJyZW50RWxlbWVudC5nZXRMYXllcnMoKTtcclxuICAgICAgaWYgKGxheWVycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgY3VycmVudEVsZW1lbnQub3B0aW9ucyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobGF5ZXJzWyAwIF0ub3B0aW9ucykpO1xyXG4gICAgICAgIGRlbGV0ZSBjdXJyZW50RWxlbWVudC5vcHRpb25zO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuXHJcbiAgZmlyZUNoYW5nZUV2ZW50OiBmdW5jdGlvbiAoZWxlbWVudCkge1xyXG4gICAgdGhpcy5vcHRpb25zLm1hcC5maXJlRXZlbnQoJ3N0eWxlZWRpdG9yOmNoYW5nZWQnLCBlbGVtZW50KTtcclxuICB9LFxyXG5cclxuICBjb21wb25lbnRUb0hleDogZnVuY3Rpb24gKGMpIHtcclxuICAgIHZhciBoZXggPSBjLnRvU3RyaW5nKDE2KTtcclxuICAgIHJldHVybiBoZXgubGVuZ3RoID09PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XHJcbiAgfSxcclxuXHJcbiAgcmdiVG9IZXg6IGZ1bmN0aW9uIChyZ2IpIHtcclxuICAgIHJnYiA9IHJnYi5zdWJzdHJpbmcoNCkucmVwbGFjZShcIilcIiwgXCJcIikuc3BsaXQoXCIsXCIpO1xyXG4gICAgcmV0dXJuIFwiI1wiICsgdGhpcy5jb21wb25lbnRUb0hleChwYXJzZUludChyZ2JbIDAgXSwgMTApKSArIHRoaXMuY29tcG9uZW50VG9IZXgocGFyc2VJbnQocmdiWyAxIF0sIDEwKSkgKyB0aGlzLmNvbXBvbmVudFRvSGV4KHBhcnNlSW50KHJnYlsgMiBdLCAxMCkpO1xyXG4gIH0sXHJcblxyXG4gIGNyZWF0ZVBvaW50QnVmZmVyVHlwZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHBvaW50QnVmZmVyVHlwZURpdiA9IHRoaXMub3B0aW9ucy5zdHlsZUVkaXRvclVpLnBvaW50QnVmZmVyVHlwZURpdjtcclxuXHJcbiAgICAvLyDnvJPlhrLnsbvlnotcclxuICAgIHZhciBsYWJlbF90eXBlX2NvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWludGVyaW9yLWVsZW1lbnQnLCBwb2ludEJ1ZmZlclR5cGVEaXYpO1xyXG4gICAgTC5Eb21VdGlsLmNyZWF0ZSgnYnInLCAnJywgbGFiZWxfdHlwZV9jb250YWluZXIpO1xyXG4gICAgdmFyIGxhYmVsX3R5cGUgPSBMLkRvbVV0aWwuY3JlYXRlKCdsYWJlbCcsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWxhYmVsJywgbGFiZWxfdHlwZV9jb250YWluZXIpO1xyXG4gICAgbGFiZWxfdHlwZS5pbm5lckhUTUwgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLnR5cGU7XHJcblxyXG4gICAgdmFyIHNlbGVjdF90eXBlID0gTC5Eb21VdGlsLmNyZWF0ZSgnc2VsZWN0JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3Itc2VsZWN0JywgbGFiZWxfdHlwZV9jb250YWluZXIpO1xyXG4gICAgdmFyIHNlbGVjdF90eXBlX29wdGlvbjAgPSBMLkRvbVV0aWwuY3JlYXRlKCdvcHRpb24nLCBudWxsLCBzZWxlY3RfdHlwZSk7XHJcbiAgICBzZWxlY3RfdHlwZV9vcHRpb24wLnRleHQgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLm91dGVyO1xyXG5cclxuICAgIHNlbGVjdF90eXBlLmFkZChzZWxlY3RfdHlwZV9vcHRpb24wLCBudWxsKTtcclxuXHJcbiAgICAvLyAwOm91dGVyXHJcbiAgICB0aGlzLnBvaW50X2J1ZmZlcl90eXBlID0gS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5idWZmZXJUeXBlcy5vdXRlcjtcclxuICB9LFxyXG5cclxuICBjcmVhdGVMaW5lQnVmZmVyVHlwZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGxpbmVCdWZmZXJUeXBlRGl2ID0gdGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yVWkubGluZUJ1ZmZlclR5cGVEaXY7XHJcblxyXG4gICAgLy8g57yT5Yay57G75Z6LXHJcbiAgICB2YXIgbGFiZWxfdHlwZV9jb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1pbnRlcmlvci1lbGVtZW50JywgbGluZUJ1ZmZlclR5cGVEaXYpO1xyXG4gICAgTC5Eb21VdGlsLmNyZWF0ZSgnYnInLCAnJywgbGFiZWxfdHlwZV9jb250YWluZXIpO1xyXG4gICAgdmFyIGxhYmVsX3R5cGUgPSBMLkRvbVV0aWwuY3JlYXRlKCdsYWJlbCcsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWxhYmVsJywgbGFiZWxfdHlwZV9jb250YWluZXIpO1xyXG4gICAgbGFiZWxfdHlwZS5pbm5lckhUTUwgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLnR5cGU7XHJcblxyXG4gICAgdmFyIHNlbGVjdF90eXBlID0gTC5Eb21VdGlsLmNyZWF0ZSgnc2VsZWN0JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3Itc2VsZWN0JywgbGFiZWxfdHlwZV9jb250YWluZXIpO1xyXG4gICAgLy8gdmFyIHNlbGVjdF90eXBlX29wdGlvbjAgPSBMLkRvbVV0aWwuY3JlYXRlKCdvcHRpb24nLCBudWxsLCBzZWxlY3RfdHlwZSk7XHJcbiAgICAvLyBzZWxlY3RfdHlwZV9vcHRpb24wLnRleHQgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLmxlZnQ7XHJcbiAgICAvLyB2YXIgc2VsZWN0X3R5cGVfb3B0aW9uMSA9IEwuRG9tVXRpbC5jcmVhdGUoJ29wdGlvbicsIG51bGwsIHNlbGVjdF90eXBlKTtcclxuICAgIC8vIHNlbGVjdF90eXBlX29wdGlvbjEudGV4dCA9IEwuc3R5bGVFZGl0b3JMb2NhbC5idWZmZXIucmlnaHQ7XHJcbiAgICB2YXIgc2VsZWN0X3R5cGVfb3B0aW9uMiA9IEwuRG9tVXRpbC5jcmVhdGUoJ29wdGlvbicsIG51bGwsIHNlbGVjdF90eXBlKTtcclxuICAgIHNlbGVjdF90eXBlX29wdGlvbjIudGV4dCA9IEwuc3R5bGVFZGl0b3JMb2NhbC5idWZmZXIuYm90aDtcclxuXHJcbiAgICAvLyBzZWxlY3RfdHlwZS5hZGQoc2VsZWN0X3R5cGVfb3B0aW9uMCwgbnVsbCk7XHJcbiAgICAvLyBzZWxlY3RfdHlwZS5hZGQoc2VsZWN0X3R5cGVfb3B0aW9uMSwgbnVsbCk7XHJcbiAgICBzZWxlY3RfdHlwZS5hZGQoc2VsZWN0X3R5cGVfb3B0aW9uMiwgbnVsbCk7XHJcblxyXG4gICAgLy8gMDpsZWZ0IDE6cmlnaHQgMjpib3RoXHJcbiAgICB0aGlzLmxpbmVfYnVmZmVyX3R5cGUgPSAyO1xyXG5cclxuICAgIGZ1bmN0aW9uIHNlbGVjdF90eXBlX2NhbGxiYWNrIChlKSB7XHJcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgIGlmIChlLnRhcmdldC5zZWxlY3RlZEluZGV4ID09PSAwKSB7XHJcbiAgICAgICAgdGhpcy5saW5lX2J1ZmZlcl90eXBlID0gS1EuQ29tbW9uLkNvbW1vblZhbHVlcy5idWZmZXJUeXBlcy5sZWZ0O1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGUudGFyZ2V0LnNlbGVjdGVkSW5kZXggPT09IDEpIHtcclxuICAgICAgICB0aGlzLmxpbmVfYnVmZmVyX3R5cGUgPSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmJ1ZmZlclR5cGVzLnJpZ2h0O1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMubGluZV9idWZmZXJfdHlwZSA9IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMuYnVmZmVyVHlwZXMuYm90aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coJ3NlbGVjdF90eXBlX2NhbGxiYWNrOicgKyB0aGlzLmxpbmVfYnVmZmVyX3R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIoc2VsZWN0X3R5cGUsICdjaGFuZ2UnLCBzZWxlY3RfdHlwZV9jYWxsYmFjay5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG5cclxuICBjcmVhdGVGaWxsQnVmZmVyVHlwZTogZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGZpbGxCdWZmZXJUeXBlRGl2ID0gdGhpcy5vcHRpb25zLnN0eWxlRWRpdG9yVWkuZmlsbEJ1ZmZlclR5cGVEaXY7XHJcblxyXG4gICAgLy8g57yT5Yay57G75Z6LXHJcbiAgICB2YXIgbGFiZWxfdHlwZV9jb250YWluZXIgPSBMLkRvbVV0aWwuY3JlYXRlKCdkaXYnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1pbnRlcmlvci1lbGVtZW50JywgZmlsbEJ1ZmZlclR5cGVEaXYpO1xyXG4gICAgTC5Eb21VdGlsLmNyZWF0ZSgnYnInLCAnJywgbGFiZWxfdHlwZV9jb250YWluZXIpO1xyXG4gICAgdmFyIGxhYmVsX3R5cGUgPSBMLkRvbVV0aWwuY3JlYXRlKCdsYWJlbCcsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWxhYmVsJywgbGFiZWxfdHlwZV9jb250YWluZXIpO1xyXG4gICAgbGFiZWxfdHlwZS5pbm5lckhUTUwgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLnR5cGU7XHJcblxyXG4gICAgdmFyIHNlbGVjdF90eXBlID0gTC5Eb21VdGlsLmNyZWF0ZSgnc2VsZWN0JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3Itc2VsZWN0JywgbGFiZWxfdHlwZV9jb250YWluZXIpO1xyXG4gICAgdmFyIHNlbGVjdF90eXBlX29wdGlvbjAgPSBMLkRvbVV0aWwuY3JlYXRlKCdvcHRpb24nLCBudWxsLCBzZWxlY3RfdHlwZSk7XHJcbiAgICBzZWxlY3RfdHlwZV9vcHRpb24wLnRleHQgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLm91dGVyO1xyXG4gICAgdmFyIHNlbGVjdF90eXBlX29wdGlvbjEgPSBMLkRvbVV0aWwuY3JlYXRlKCdvcHRpb24nLCBudWxsLCBzZWxlY3RfdHlwZSk7XHJcbiAgICBzZWxlY3RfdHlwZV9vcHRpb24xLnRleHQgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLmlubmVyO1xyXG4gICAgdmFyIHNlbGVjdF90eXBlX29wdGlvbjIgPSBMLkRvbVV0aWwuY3JlYXRlKCdvcHRpb24nLCBudWxsLCBzZWxlY3RfdHlwZSk7XHJcbiAgICBzZWxlY3RfdHlwZV9vcHRpb24yLnRleHQgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLmJvdGg7XHJcblxyXG4gICAgc2VsZWN0X3R5cGUuYWRkKHNlbGVjdF90eXBlX29wdGlvbjAsIG51bGwpO1xyXG4gICAgc2VsZWN0X3R5cGUuYWRkKHNlbGVjdF90eXBlX29wdGlvbjEsIG51bGwpO1xyXG4gICAgc2VsZWN0X3R5cGUuYWRkKHNlbGVjdF90eXBlX29wdGlvbjIsIG51bGwpO1xyXG5cclxuICAgIC8vIDA6b3V0c2lkZSAxOmluc2lkZSAyOmJvdGhcclxuICAgIHRoaXMuZmlsbF9idWZmZXJfdHlwZSA9IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMuYnVmZmVyVHlwZXMub3V0ZXI7XHJcblxyXG4gICAgZnVuY3Rpb24gc2VsZWN0X3R5cGVfY2FsbGJhY2sgKGUpIHtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgaWYgKGUudGFyZ2V0LnNlbGVjdGVkSW5kZXggPT09IDApIHtcclxuICAgICAgICB0aGlzLmZpbGxfYnVmZmVyX3R5cGUgPSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmJ1ZmZlclR5cGVzLm91dGVyO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGUudGFyZ2V0LnNlbGVjdGVkSW5kZXggPT09IDEpIHtcclxuICAgICAgICB0aGlzLmZpbGxfYnVmZmVyX3R5cGUgPSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmJ1ZmZlclR5cGVzLmlubmVyO1xyXG4gICAgICB9XHJcbiAgICAgIGVsc2Uge1xyXG4gICAgICAgIHRoaXMuZmlsbF9idWZmZXJfdHlwZSA9IEtRLkNvbW1vbi5Db21tb25WYWx1ZXMuYnVmZmVyVHlwZXMuYm90aDtcclxuICAgICAgfVxyXG5cclxuICAgICAgY29uc29sZS5sb2coJ3NlbGVjdF90eXBlX2NhbGxiYWNrOicgKyB0aGlzLmZpbGxfYnVmZmVyX3R5cGUpO1xyXG4gICAgfVxyXG5cclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIoc2VsZWN0X3R5cGUsICdjaGFuZ2UnLCBzZWxlY3RfdHlwZV9jYWxsYmFjay5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG5cclxuICBjcmVhdGVCdWZmZXI6IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBtYXhfYnVmZmVyX2xlbmd0aCA9IDEwMDAwMDA7XHJcblxyXG4gICAgdmFyIGJ1ZmZlckRpdiA9IHRoaXMub3B0aW9ucy5zdHlsZUVkaXRvclVpLmJ1ZmZlckRpdjtcclxuXHJcbiAgICAvLyDnvJPlhrLot53nprtcclxuICAgIHZhciBsYWJlbF9sZW5ndGhfY29udGFpbmVyID0gTC5Eb21VdGlsLmNyZWF0ZSgnZGl2JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItaW50ZXJpb3ItZWxlbWVudCcsIGJ1ZmZlckRpdik7XHJcbiAgICB2YXIgbGFiZWxfbGVuZ3RoID0gTC5Eb21VdGlsLmNyZWF0ZSgnbGFiZWwnLCAnbGVhZmxldC1zdHlsZWVkaXRvci1sYWJlbCcsIGxhYmVsX2xlbmd0aF9jb250YWluZXIpO1xyXG4gICAgbGFiZWxfbGVuZ3RoLmlubmVySFRNTCA9IEwuc3R5bGVFZGl0b3JMb2NhbC5idWZmZXIubGVuZ3RoO1xyXG5cclxuICAgIHRoaXMuYnVmZmVyX2xlbmd0aCA9IDEwMDA7XHJcblxyXG4gICAgdmFyIGlucHV0X2xlbmd0aCA9IEwuRG9tVXRpbC5jcmVhdGUoJ2lucHV0JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3ItaW5wdXQnLCBsYWJlbF9sZW5ndGhfY29udGFpbmVyKTtcclxuICAgIGlucHV0X2xlbmd0aC5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnbnVtYmVyJyk7XHJcbiAgICBpbnB1dF9sZW5ndGguc2V0QXR0cmlidXRlKCd2YWx1ZScsIHRoaXMuYnVmZmVyX2xlbmd0aCk7XHJcbiAgICBpbnB1dF9sZW5ndGguc2V0QXR0cmlidXRlKCdtaW4nLCAwKTtcclxuICAgIGlucHV0X2xlbmd0aC5zZXRBdHRyaWJ1dGUoJ21heCcsIG1heF9idWZmZXJfbGVuZ3RoKTtcclxuICAgIGlucHV0X2xlbmd0aC5zZXRBdHRyaWJ1dGUoJ3N0ZXAnLCAxKTtcclxuXHJcbiAgICBmdW5jdGlvbiBpbnB1dF9sZW5ndGhfY2FsbGJhY2sgKGUpIHtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgdGhpcy5idWZmZXJfbGVuZ3RoID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG4gICAgICBjb25zb2xlLmxvZygnaW5wdXRfbGVuZ3RoX2NhbGxiYWNrOicgKyB0aGlzLmJ1ZmZlcl9sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIEwuRG9tRXZlbnQuYWRkTGlzdGVuZXIoaW5wdXRfbGVuZ3RoLCAnY2hhbmdlJywgaW5wdXRfbGVuZ3RoX2NhbGxiYWNrLmJpbmQodGhpcykpO1xyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihpbnB1dF9sZW5ndGgsICdrZXl1cCcsIGlucHV0X2xlbmd0aF9jYWxsYmFjay5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAvLyDnvJPlhrLljZXkvY1cclxuICAgIHZhciBsYWJlbF91bml0X2NvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWludGVyaW9yLWVsZW1lbnQnLCBidWZmZXJEaXYpO1xyXG4gICAgdmFyIGxhYmVsX3VuaXQgPSBMLkRvbVV0aWwuY3JlYXRlKCdsYWJlbCcsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWxhYmVsJywgbGFiZWxfdW5pdF9jb250YWluZXIpO1xyXG4gICAgbGFiZWxfdW5pdC5pbm5lckhUTUwgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLnVuaXQ7XHJcblxyXG4gICAgdmFyIHNlbGVjdF91bml0ID0gTC5Eb21VdGlsLmNyZWF0ZSgnc2VsZWN0JywgJ2xlYWZsZXQtc3R5bGVlZGl0b3Itc2VsZWN0JywgbGFiZWxfdW5pdF9jb250YWluZXIpO1xyXG4gICAgdmFyIHNlbGVjdF91bml0X29wdGlvbjAgPSBMLkRvbVV0aWwuY3JlYXRlKCdvcHRpb24nLCBudWxsLCBzZWxlY3RfdW5pdCk7XHJcbiAgICBzZWxlY3RfdW5pdF9vcHRpb24wLnRleHQgPSAnbSc7XHJcbiAgICB2YXIgc2VsZWN0X3VuaXRfb3B0aW9uMSA9IEwuRG9tVXRpbC5jcmVhdGUoJ29wdGlvbicsIG51bGwsIHNlbGVjdF91bml0KTtcclxuICAgIHNlbGVjdF91bml0X29wdGlvbjEudGV4dCA9ICdrbSc7XHJcblxyXG4gICAgc2VsZWN0X3VuaXQuYWRkKHNlbGVjdF91bml0X29wdGlvbjAsIG51bGwpO1xyXG4gICAgc2VsZWN0X3VuaXQuYWRkKHNlbGVjdF91bml0X29wdGlvbjEsIG51bGwpO1xyXG5cclxuICAgIC8vIDA6bSAxOmttXHJcbiAgICB0aGlzLmJ1ZmZlcl91bml0ID0gMDtcclxuXHJcbiAgICBmdW5jdGlvbiBzZWxlY3RfdW5pdF9jYWxsYmFjayAoZSkge1xyXG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICB0aGlzLmJ1ZmZlcl91bml0ID0gZS50YXJnZXQuc2VsZWN0ZWRJbmRleDtcclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKCdzZWxlY3RfdW5pdF9jYWxsYmFjazonICsgdGhpcy5idWZmZXJfdW5pdCk7XHJcbiAgICB9XHJcblxyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihzZWxlY3RfdW5pdCwgJ2NoYW5nZScsIHNlbGVjdF91bml0X2NhbGxiYWNrLmJpbmQodGhpcykpO1xyXG5cclxuICAgIC8vIOaYr+WQpuS/neeVmeWOn+WbvuW9olxyXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgdmFyIHJlc2VydmVkX2dyYXBoaWNzX2NvbnRhaW5lciA9IEwuRG9tVXRpbC5jcmVhdGUoJ2RpdicsICdsZWFmbGV0LXN0eWxlZWRpdG9yLWludGVyaW9yLWVsZW1lbnQnLCBidWZmZXJEaXYpO1xyXG4gICAgJChyZXNlcnZlZF9ncmFwaGljc19jb250YWluZXIpLmFwcGVuZChcIjxpbnB1dCBpZD0ncmVzZXJ2ZV9ncmFwaGljcycgY2xhc3M9J2xlYWZsZXQtc3R5bGVlZGl0b3ItaW5wdXQtY2hlY2tib3gnIHR5cGU9J2NoZWNrYm94Jz48bGFiZWwgY2xhc3M9J2xlYWZsZXQtc3R5bGVlZGl0b3ItaW5wdXQtY2hlY2tib3gtbGFiZWwnPlwiICsgS1EuTG9jYWwuQ29udHJvbC5zdHlsZUVkaXRvci5yZXNlcnZlZEdyYXBoaWNzKCkgKyAgXCI8L2xhYmVsPlwiKTtcclxuICAgICQoXCIjcmVzZXJ2ZV9ncmFwaGljc1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHNlbGYuaXNfcmVzZXJ2ZV9ncmFwaGljcyA9ICQoXCIjcmVzZXJ2ZV9ncmFwaGljc1wiKS5wcm9wKFwiY2hlY2tlZFwiKTtcclxuICAgIH0pXHJcblxyXG4gICAgLy8g56Gu6K6k5oyJ6ZKuXHJcbiAgICB2YXIgYnV0dG9uID0gTC5Eb21VdGlsLmNyZWF0ZSgnYnV0dG9uJywgJ2stcHJpbWFyeSBidWZmZXItYnV0dG9uJywgYnVmZmVyRGl2KTtcclxuICAgIGJ1dHRvbi5pbm5lckhUTUwgPSBMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLmJ1ZmZlcjtcclxuXHJcbiAgICBmdW5jdGlvbiBidXR0b25fY2FsbGJhY2sgKGUpIHtcclxuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuXHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdidXR0b25fY2FsbGJhY2shJyk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdidWZmZXJfdHlwZTonICsgYnVmZmVyX3R5cGUpO1xyXG4gICAgICAvLyBjb25zb2xlLmxvZygnYnVmZmVyX2xlbmd0aDonICsgYnVmZmVyX2xlbmd0aCk7XHJcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdidWZmZXJfdW5pdDonICsgYnVmZmVyX3VuaXQpO1xyXG5cclxuICAgICAgdmFyIF9sZW5ndGggPSB0aGlzLmJ1ZmZlcl9sZW5ndGg7XHJcbiAgICAgIGlmICh0aGlzLmJ1ZmZlcl91bml0ID09PSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLmJ1ZmZlclVuaXQua20pIHtcclxuICAgICAgICBfbGVuZ3RoID0gX2xlbmd0aCAqIDEwMDA7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmIChfbGVuZ3RoID4gbWF4X2J1ZmZlcl9sZW5ndGgpIHtcclxuICAgICAgICB0aGlzLm9wdGlvbnMuZXJyb3JDYWxsYmFjayhMLnN0eWxlRWRpdG9yTG9jYWwuYnVmZmVyLm1zZ0xlbmd0aFRvb0xvbmcgKyAnICcgKyBtYXhfYnVmZmVyX2xlbmd0aCArICdtJyk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuYnVmZmVyX3NoYXBlX3R5cGUgPSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLnNoYXBlVHlwZXMucG9pbnQ7XHJcbiAgICAgIHZhciB0ID0gdGhpcy5vcHRpb25zLmN1cnJlbnRFbGVtZW50LnRhcmdldDtcclxuICAgICAgaWYgKHQgaW5zdGFuY2VvZiBMLlBvbHlnb24gfHwgdCBpbnN0YW5jZW9mIEwuTGF5ZXJHcm91cCB8fCAodCBpbnN0YW5jZW9mIEwuQ2lyY2xlKSkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyX3NoYXBlX3R5cGUgPSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLnNoYXBlVHlwZXMuZmlsbDtcclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmICh0IGluc3RhbmNlb2YgTC5Qb2x5bGluZSkge1xyXG4gICAgICAgIHRoaXMuYnVmZmVyX3NoYXBlX3R5cGUgPSBLUS5Db21tb24uQ29tbW9uVmFsdWVzLnNoYXBlVHlwZXMubGluZTtcclxuICAgICAgfVxyXG5cclxuICAgICAgdGhpcy5vcHRpb25zLmJ1ZmZlckNhbGxiYWNrKHRoaXMpO1xyXG4gICAgfVxyXG5cclxuICAgICQoXCIuYnVmZmVyLWJ1dHRvblwiKS5rZW5kb0J1dHRvbih7XHJcbiAgICAgIHR5cGU6ICdzdWJtaXQnLFxyXG4gICAgfSk7XHJcblxyXG4gICAgTC5Eb21FdmVudC5hZGRMaXN0ZW5lcihidXR0b24sICdjbGljaycsIGJ1dHRvbl9jYWxsYmFjay5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG59KTtcclxuIiwiLy8oYykyMDE3LCBNSVQgU3R5bGUgTGljZW5zZSA8YnJvd3Nlci11cGRhdGUub3JnL0xJQ0VOU0UudHh0PlxyXG4vL2l0IGlzIHJlY29tbWVuZGVkIHRvIGRpcmVjdGx5IGxpbmsgdG8gdGhpcyBmaWxlIGJlY2F1c2Ugd2UgdXBkYXRlIHRoZSBkZXRlY3Rpb24gY29kZVxyXG5cclxuZnVuY3Rpb24gJGJ1X2dldEJyb3dzZXIodWFfc3RyKSB7XHJcbiAgICB2YXIgbix0LHVhPXVhX3N0cnx8bmF2aWdhdG9yLnVzZXJBZ2VudCxkb25vdG5vdGlmeT1mYWxzZTtcclxuICAgIHZhciBuYW1lcz17aTonSW50ZXJuZXQgRXhwbG9yZXInLGU6XCJFZGdlXCIsZjonRmlyZWZveCcsbzonT3BlcmEnLHM6J1NhZmFyaScsbjonTmV0c2NhcGUnLGM6XCJDaHJvbWVcIixhOlwiQW5kcm9pZCBCcm93c2VyXCIsIHk6XCJZYW5kZXggQnJvd3NlclwiLHY6XCJWaXZhbGRpXCIsdWM6XCJVQyBCcm93c2VyXCIseDpcIk90aGVyXCJ9O1xyXG4gICAgZnVuY3Rpb24gaWdub3JlKHJlYXNvbixwYXR0ZXJuKXtpZiAoUmVnRXhwKHBhdHRlcm4sXCJpXCIpLnRlc3QodWEpKSByZXR1cm4gcmVhc29uO31cclxuICAgIHZhciBpZz1pZ25vcmUoXCJib3RcIixcImJvdHxzcGlkZXJ8YXJjaGl2ZXJ8dHJhbnNjb2RlcnxjcmF3bHxjaGVja2VyfG1vbml0b3Jpbmd8c2NyZWVuc2hvdHxweXRob24tfHBocHx1cHRpbWV8dmFsaWRhdG9yfGZldGNoZXJ8ZmFjZWJvb2t8c2x1cnB8Z29vZ2xlfHlhaG9vfG1pY3Jvc29mdHxub2RlfG1haWwucnV8Z2l0aHVifGNsb3VkZmxhcmV8YWRkdGhpc3x0aHVtYnxwcm94eXxmZWVkfGZldGNofGZhdmljb258bGlua3xodHRwfHNjcmFwZXxzZW98cGFnZXxzZWFyY2ggY29uc29sZXxBT0xCdWlsZHxUZW9tYXxHZWNrbyBFeHBlZGl0b3JcIil8fFxyXG4gICAgICAgIGlnbm9yZShcImRpc2NvbnRpbnVlZCBicm93c2VyXCIsXCJjYW1pbm98ZmxvdHxrLW1lbGVvbnxmZW5uZWN8Z2FsZW9ufGNocm9tZWZyYW1lfGNvb2xub3ZvXCIpIHx8XHJcbiAgICAgICAgaWdub3JlKFwiY29tcGxpY2F0ZWQgZGV2aWNlIGJyb3dzZXJcIixcIlNNQVJULVRWfFNtYXJ0VFZcIikgfHxcclxuICAgICAgICBpZ25vcmUoXCJuaWNoZSBicm93c2VyXCIsXCJEb3JhZG98V2hhbGV8U2Ftc3VuZ0Jyb3dzZXJ8TUlEUHx3aWl8Q2hyb21pdW18UHVmZmlufE9wZXJhIE1pbml8bWF4dGhvbnxtYXh0b258ZG9sZmlufGRvbHBoaW58c2VhbW9ua2V5fG9wZXJhIG1pbml8bmV0ZnJvbnR8bW9ibGlufG1hZW1vfGFyb3JhfGthemVoYWthc2V8ZXBpcGhhbnl8a29ucXVlcm9yfHJla29ucXxzeW1iaWFufHdlYm9zfFBhbGVNb29ufFF1cFppbGxhfE90dGVyfE1pZG9yaXxxdXRlYnJvd3NlclwiKSB8fFxyXG4gICAgICAgIGlnbm9yZShcIm1vYmlsZSB3aXRob3V0IHVwZ3JhZGUgcGF0aCBvciBsYW5kaW5nIHBhZ2VcIixcImtpbmRsZXxzaWxrfGJsYWNrYmVycnl8YmIxMHxSSU18UGxheUJvb2t8bWVlZ298bm9raWF8dWN3ZWJ8WnVuZVdQN3w1MzcuODUuMTBcIikgfHxcclxuICAgICAgICBpZ25vcmUoXCJhbmRyb2lkKGNocm9tZSkgd2ViIHZpZXdcIixcIjsgd3ZcIik7XHJcbiAgICB2YXIgbW9iaWxlPSgvaXBob25lfGlwb2R8aXBhZHxhbmRyb2lkfG1vYmlsZXxwaG9uZXxpb3N8aWVtb2JpbGUvaS50ZXN0KHVhKSk7XHJcbiAgICBpZiAoaWcpIFxyXG4gICAgICAgIHJldHVybiB7bjpcInhcIix2OjAsdDpcIm90aGVyIGJyb3dzZXJcIixkb25vdG5vdGlmeTppZ307ICAgIFxyXG5cclxuICAgIHZhciBwYXRzPVtcclxuICAgICAgICBbXCJDcmlPUy5WVlwiLFwiY1wiXSxcclxuICAgICAgICBbXCJGeGlPUy5WVlwiLFwiZlwiXSxcclxuICAgICAgICBbXCJUcmlkZW50LipydjpWVlwiLFwiaVwiXSxcclxuICAgICAgICBbXCJUcmlkZW50LlZWXCIsXCJpb1wiXSxcclxuICAgICAgICBbXCJVQ0Jyb3dzZXIuVlZcIixcInVjXCJdLFxyXG4gICAgICAgIFtcIk1TSUUuVlZcIixcImlcIl0sXHJcbiAgICAgICAgW1wiRWRnZS5WVlwiLFwiZVwiXSxcclxuICAgICAgICBbXCJWaXZhbGRpLlZWXCIsXCJ2XCJdLFxyXG4gICAgICAgIFtcIk9QUi5WVlwiLFwib1wiXSxcclxuICAgICAgICBbXCJZYUJyb3dzZXIuVlZcIixcInlcIl0sXHJcbiAgICAgICAgW1wiQ2hyb21lLlZWXCIsXCJjXCJdLFxyXG4gICAgICAgIFtcIkZpcmVmb3guVlZcIixcImZcIl0sXHJcbiAgICAgICAgW1wiVmVyc2lvbi5WVi4qU2FmYXJpXCIsXCJzXCJdLFxyXG4gICAgICAgIFtcIlNhZmFyaS5WVlwiLFwic29cIl0sXHJcbiAgICAgICAgW1wiT3BlcmEuKlZlcnNpb24uVlZcIixcIm9cIl0sXHJcbiAgICAgICAgW1wiT3BlcmEuVlZcIixcIm9cIl0sXHJcbiAgICAgICAgW1wiTmV0c2NhcGUuVlZcIixcIm5cIl1cclxuICAgIF07XHJcbiAgICBmb3IgKHZhciBpPTA7IGkgPCBwYXRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgaWYgKHVhLm1hdGNoKG5ldyBSZWdFeHAocGF0c1tpXVswXS5yZXBsYWNlKFwiVlZcIixcIihcXFxcZCtcXFxcLj9cXFxcZCspXCIpLFwiaVwiKSkpIHtcclxuICAgICAgICAgICAgbj1wYXRzW2ldWzFdO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9ICAgICAgICBcclxuICAgIH1cclxuICAgIHZhciBzZW12ZXI9bj09PVwidlwifHxuPT09XCJ5XCJ8fG49PT1cInVjXCI7XHJcbiAgICBpZiAoc2VtdmVyKSB7Ly96ZXJvIHBhZCBzZW12ZXIgZm9yIGVhc3kgY29tcGFyaW5nXHJcbiAgICAgICAgdmFyIHBhcnRzID0gKFJlZ0V4cC4kMSkuc3BsaXQoJy4nKTtcclxuICAgICAgICB2YXIgdj0ocGFydHNbMF0gKyBcIi5cIiArIChcIjAwXCIuc3Vic3RyaW5nKDAsIDIgLSBwYXJ0c1sxXS5sZW5ndGgpICsgcGFydHNbMV0pKTtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIHZhciB2PU1hdGgucm91bmQocGFyc2VGbG9hdChSZWdFeHAuJDEpKjEwKS8xMDtcclxuICAgIH1cclxuICAgIFxyXG4gICAgaWYgKCFuKVxyXG4gICAgICAgIHJldHVybiB7bjpcInhcIix2OjAsdDpuYW1lc1tuXSxtb2JpbGU6bW9iaWxlfTtcclxuICAgIFxyXG4gICAgLy9kbyBub3Qgbm90aWZ5IG9sZCBzeXN0ZW1zIHNpbmNlIHRoZXJlIGlzIG5vIHVwLXRvLWRhdGUgYnJvd3NlciBhdmFpbGFibGVcclxuICAgIGlmICgvd2luZG93cy5udC41LjB8d2luZG93cy5udC40LjB8d2luZG93cy45NXx3aW5kb3dzLjk4fG9zIHggMTAuMnxvcyB4IDEwLjN8b3MgeCAxMC40fG9zIHggMTAuNXxvcyB4IDEwLjZ8b3MgeCAxMC43L2kudGVzdCh1YSkpIFxyXG4gICAgICAgIGRvbm90bm90aWZ5PVwib2xkT1NcIjtcclxuICAgIFxyXG4gICAgLy9pT1NcclxuICAgIGlmICgvaXBob25lfGlwb2R8aXBhZHxpb3MvaS50ZXN0KHVhKSkge1xyXG4gICAgICAgIHVhLnJlcGxhY2UoXCJfXCIsXCIuXCIpLm1hdGNoKG5ldyBSZWdFeHAoXCJPUy4oXFxcXGQrXFxcXC4/XFxcXGQ/KVwiLFwiaVwiKSk7Ly9cclxuICAgICAgICBuPVwiaU9TXCI7XHJcbiAgICAgICAgdj1wYXJzZUZsb2F0KFJlZ0V4cC4kMSk7IFxyXG4gICAgICAgIHZhciBoID0gTWF0aC5tYXgod2luZG93LnNjcmVlbi5oZWlnaHQsIHdpbmRvdy5zY3JlZW4ud2lkdGgpO1xyXG4gICAgICAgIGlmIChoPD00ODAgfHwgd2luZG93LmRldmljZVBpeGVsUmF0aW88MikgLy9pcGhvbmUgPDUgYW5kIG9sZCBpUGFkcyAgLy8gKGg+NTY4IC0tPmlwaG9uZSA2KylcclxuICAgICAgICAgICAgICByZXR1cm4ge246XCJzXCIsdjp2LHQ6XCJpT1MgXCIrdixkb25vdG5vdGlmeTpcImlPUyB3aXRob3V0IHVwZ3JhZGUgcGF0aFwiLG1vYmlsZTptb2JpbGV9O1xyXG4gICAgICAgIHJldHVybiB7bjpcInNcIix2OnYsdDpcImlPUyBcIit2LGRvbm90bm90aWZ5OmZhbHNlLG1vYmlsZTptb2JpbGV9Oy8vaWRlbnRpZnkgYXMgc2FmYXJpXHJcbiAgICB9XHJcbiAgICAvL2NoZWNrIGZvciBhbmRyb2lkIHN0b2NrIGJyb3dzZXJcclxuICAgIGlmICh1YS5pbmRleE9mKCdBbmRyb2lkJyk+LTEgJiYgbj09PVwic1wiKSB7XHJcbiAgICAgICAgdmFyIHZlcj1wYXJzZUludCgoL1dlYktpdFxcLyhbMC05XSspL2kuZXhlYyh1YSkgfHwgMClbMV0sMTApIHx8IDIwMDA7XHJcbiAgICAgICAgaWYgKHZlciA8PSA1MzQpXHJcbiAgICAgICAgICAgIHJldHVybiB7bjpcImFcIix2OnZlcix0Om5hbWVzW1wiYVwiXSxtb2I6dHJ1ZSxkb25vdG5vdGlmeTpkb25vdG5vdGlmeSxtb2JpbGU6bW9iaWxlfTtcclxuICAgICAgICAvL2Vsc2VcclxuICAgICAgICAvLyAgICByZXR1cm4ge246bix2OnYsdDpuYW1lc1tuXStcIiBcIit2LGRvbm90bm90aWZ5OlwibW9iaWxlIG9uIGFuZHJvaWRcIixtb2JpbGU6bW9iaWxlfTtcclxuICAgIH1cclxuXHJcbiAgICAvL2RvIG5vdCBub3RpZnkgZmlyZWZveCBFU1JcclxuICAgIGlmIChuPT1cImZcIiAmJiAoTWF0aC5yb3VuZCh2KT09NDUgfHwgTWF0aC5yb3VuZCh2KT09NTIpKVxyXG4gICAgICAgIGRvbm90bm90aWZ5PVwiRVNSXCI7XHJcblxyXG4gICAgaWYgKG49PVwic29cIikge1xyXG4gICAgICAgIHY9NC4wO1xyXG4gICAgICAgIG49XCJzXCI7XHJcbiAgICB9XHJcbiAgICBpZiAobj09XCJpXCIgJiYgdj09NyAmJiB3aW5kb3cuWERvbWFpblJlcXVlc3QpIHtcclxuICAgICAgICB2PTg7XHJcbiAgICB9XHJcbiAgICBpZiAobj09XCJpb1wiKSB7XHJcbiAgICAgICAgbj1cImlcIjtcclxuICAgICAgICBpZiAodj42KSB2PTExO1xyXG4gICAgICAgIGVsc2UgaWYgKHY+NSkgdj0xMDtcclxuICAgICAgICBlbHNlIGlmICh2PjQpIHY9OTtcclxuICAgICAgICBlbHNlIGlmICh2PjMuMSkgdj04O1xyXG4gICAgICAgIGVsc2UgaWYgKHY+Mykgdj03O1xyXG4gICAgICAgIGVsc2Ugdj05O1xyXG4gICAgfVxyXG4gICAgaWYgKG49PVwiZVwiKSB7XHJcbiAgICAgICAgcmV0dXJuIHtuOlwiaVwiLHY6dix0Om5hbWVzW25dK1wiIFwiK3YsZG9ub3Rub3RpZnk6ZG9ub3Rub3RpZnksbW9iaWxlOm1vYmlsZX07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge246bix2OnYsdDpuYW1lc1tuXStcIiBcIit2LGRvbm90bm90aWZ5OmRvbm90bm90aWZ5LG1vYmlsZTptb2JpbGV9O1xyXG59XHJcblxyXG52YXIgJGJ1byA9IGZ1bmN0aW9uKG9wLHRlc3QpIHtcclxudmFyIGpzdj0yNDtcclxudmFyIG4gPSB3aW5kb3cubmF2aWdhdG9yLGIsdnNtaW47XHJcbnZhciBvcCA9IHdpbmRvdy5fYnVvcmdyZXM9b3B8fHt9O1xyXG52YXIgbGwgPSBvcC5sfHwobi5sYW5ndWFnZXMgPyBuLmxhbmd1YWdlc1swXSA6IG51bGwpIHx8IG4ubGFuZ3VhZ2UgfHwgbi5icm93c2VyTGFuZ3VhZ2UgfHwgbi51c2VyTGFuZ3VhZ2V8fGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJsYW5nXCIpfHxcImVuXCI7XHJcbm9wLmxsPWxsPWxsLnJlcGxhY2UoXCJfXCIsXCItXCIpLnRvTG93ZXJDYXNlKCkuc3Vic3RyKDAsMik7XHJcbm9wLmFwaXZlcj1vcC5hcGl8fG9wLmN8fC0xO1xyXG52YXIgdnNha3QgPSB7aToxMixmOjUzLG86NDQsczoxMC4xLG46MjAsYzo1OCx5OjE3LjA0LHY6MS4xMCx1YzoxMS4zfTtcclxudmFyIHZzZGVmYXVsdCA9IHtpOi0yLGY6LTQsbzotNCxzOi0xLjcsbjoxMixjOi00LGE6NTM0LHk6LTAuMDIsdjotMC4wMix1YzotMC4wM307XHJcbmlmIChvcC5hcGl2ZXI8NClcclxuICAgIHZzbWluPXtpOjksZjoxMCxvOjIwLHM6N307XHJcbmVsc2VcclxuICAgIHZzbWluPXtpOjgsZjo1LG86MTIuNSxzOjYuMn07XHJcbnZhciBteXZzPW9wLnZzfHx7fTtcclxudmFyIHZzID1vcC52c3x8dnNkZWZhdWx0O1xyXG5mb3IgKGIgaW4gdnNkZWZhdWx0KSB7XHJcbiAgICBpZiAoIXZzW2JdKVxyXG4gICAgICAgIHZzW2JdPXZzZGVmYXVsdFtiXTsgICAgXHJcbiAgICBpZiAodnNha3RbYl0gJiYgdnNbYl0+PXZzYWt0W2JdKVxyXG4gICAgICAgIHZzW2JdPXZzYWt0W2JdLTAuMjtcclxuICAgIGlmICh2c2FrdFtiXSAmJiB2c1tiXTwwKVxyXG4gICAgICAgIHZzW2JdPXZzYWt0W2JdK3ZzW2JdO1xyXG4gICAgaWYgKHZzbWluW2JdICYmIHZzW2JdPHZzbWluW2JdKVxyXG4gICAgICAgIHZzW2JdPXZzbWluW2JdOyAgICBcclxufVxyXG5vcC52c2Y9dnM7XHJcbmlmIChvcC5yZW1pbmRlcjwwLjEgfHwgb3AucmVtaW5kZXI9PT0wKVxyXG4gICAgb3AucmVtaW5kZXI9MDtcclxuZWxzZVxyXG4gICAgb3AucmVtaW5kZXI9b3AucmVtaW5kZXJ8fDI0O1xyXG5vcC5yZW1pbmRlckNsb3NlZD1vcC5yZW1pbmRlckNsb3NlZHx8KDI0KjcpO1xyXG5vcC5vbnNob3cgPSBvcC5vbnNob3d8fGZ1bmN0aW9uKG8pe307XHJcbm9wLm9uY2xpY2sgPSBvcC5vbmNsaWNrfHxmdW5jdGlvbihvKXt9O1xyXG5vcC5vbmNsb3NlID0gb3Aub25jbG9zZXx8ZnVuY3Rpb24obyl7fTtcclxub3AucGFnZXVybCA9IG9wLnBhZ2V1cmwgfHwgbG9jYXRpb24uaG9zdG5hbWUgfHwgXCJ4XCI7XHJcbm9wLm5ld3dpbmRvdz0ob3AubmV3d2luZG93IT09ZmFsc2UpO1xyXG5cclxub3AudGVzdD10ZXN0fHxvcC50ZXN0fHwobG9jYXRpb24uaGFzaD09PVwiI3Rlc3QtYnVcIil8fChsb2NhdGlvbi5oYXNoPT09XCIjdGVzdC1idS1iZXRhXCIpfHxmYWxzZTtcclxuXHJcbnZhciBiYj0kYnVfZ2V0QnJvd3NlcigpO1xyXG5pZiAoIW9wLnRlc3QpIHtcclxuICAgIGlmICghYmIgfHwgIWJiLm4gfHwgYmIubj09PVwieFwiIHx8IGJiLmRvbm90bm90aWZ5IT09ZmFsc2UgfHwgKGRvY3VtZW50LmNvb2tpZS5pbmRleE9mKFwiYnJvd3NlcnVwZGF0ZW9yZz1wYXVzZVwiKT4tMSAmJiBvcC5yZW1pbmRlcj4wKSlcclxuICAgICAgICByZXR1cm47XHJcbiAgICBpZiAoYmIudj52c1tiYi5uXSB8fCAoYmIubW9iaWxlJiZvcC5tb2JpbGU9PT1mYWxzZSkgKSAgICBcclxuICAgICAgICByZXR1cm47XHJcbn1cclxuXHJcbm9wLnNldENvb2tpZT1mdW5jdGlvbihob3Vycykge1xyXG4gICAgZG9jdW1lbnQuY29va2llID0gJ2Jyb3dzZXJ1cGRhdGVvcmc9cGF1c2U7IGV4cGlyZXM9JysobmV3IERhdGUobmV3IERhdGUoKS5nZXRUaW1lKCkrMzYwMDAwMCpob3VycykpLnRvR01UU3RyaW5nKCkrJzsgcGF0aD0vJztcclxufTtcclxuaWYgKG9wLnJlbWluZGVyPjApXHJcbiAgICBvcC5zZXRDb29raWUob3AucmVtaW5kZXIpO1xyXG5cclxuaWYgKG9wLm5vbWVzc2FnZSkge1xyXG4gICAgb3Aub25zaG93KG9wKTtcclxuICAgIHJldHVybjtcclxufVxyXG5cclxuJGJ1b19zaG93KCk7XHJcbn07XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9ICRidW87XHJcblxyXG52YXIgJGJ1b19zaG93ID0gZnVuY3Rpb24oKSB7XHJcbnZhciBvcD13aW5kb3cuX2J1b3JncmVzOyAgICBcclxudmFyIGpzdj0yNDtcclxudmFyIHR2PWpzdjsvL1wiYmFzZVwiO1xyXG52YXIgbGw9b3AubGw7XHJcbnZhciBiYj0kYnVfZ2V0QnJvd3NlcigpO1xyXG52YXIgYnVybD1vcC5idXJsIHx8IFwiaHR0cDovL2Jyb3dzZXItdXBkYXRlLm9yZy9cIjtcclxuaWYgKCFvcC51cmwpIHtcclxuICAgIGlmIChvcC5sKVxyXG4gICAgICAgIG9wLnVybD0gYnVybCtsbCtcIi91cGRhdGUtYnJvd3Nlci5odG1sI1wiK3R2K1wiOlwiK29wLnBhZ2V1cmw7XHJcbiAgICBlbHNlXHJcbiAgICAgICAgb3AudXJsPSBidXJsK1widXBkYXRlLWJyb3dzZXIuaHRtbCNcIit0ditcIjpcIitvcC5wYWdldXJsO1xyXG59XHJcbnZhciBmcmFjPTEwMDA7XHJcbmlmIChNYXRoLnJhbmRvbSgpKmZyYWM8MSAmJiAhb3AudGVzdCAmJiAhb3AuYmV0YXRlc3QpIHtcclxuICAgIHZhciBpID0gbmV3IEltYWdlKCk7XHJcbiAgICB2YXIgdHh0PW9wW1widGV4dF9cIitsbF18fG9wLnRleHR8fFwiXCI7XHJcbiAgICB2YXIgZXh0cmE9ZW5jb2RlVVJJQ29tcG9uZW50KFwiZnJhYz1cIitmcmFjK1wiJnR4dD1cIit0eHQrXCImYXBpdmVyPVwiK29wLmFwaXZlcik7XHJcbiAgICBpLnNyYz1idXJsK1wiY291bnQucGhwP3doYXQ9bm90aSZmcm9tPVwiK2JiLm4rXCImZnJvbXY9XCIrYmIudiArIFwiJnJlZj1cIisgZXNjYXBlKG9wLnBhZ2V1cmwpICsgXCImanN2PVwiK2pzditcIiZ0dj1cIit0ditcIiZleHRyYT1cIitleHRyYTtcclxufVxyXG5cclxuZnVuY3Rpb24gYnVzcHJpbnRmKCkge1xyXG4gICAgdmFyIGFyZ3M9YXJndW1lbnRzO1xyXG4gICAgdmFyIGRhdGEgPSBhcmdzWyAwIF07XHJcbiAgICBmb3IoIHZhciBrPTE7IGs8YXJncy5sZW5ndGg7ICsrayApIHtcclxuICAgICAgICBkYXRhID0gZGF0YS5yZXBsYWNlKCAvJXMvLCBhcmdzWyBrIF0gKTtcclxuICAgIH1cclxuICAgIHJldHVybiBkYXRhO1xyXG59XHJcblxyXG5cclxudmFyIHQ9e307XHJcbnQuZW49JzxiPllvdXIgd2ViIGJyb3dzZXIgKHticm93X25hbWV9KSBpcyBvdXQgb2YgZGF0ZS48L2I+IFVwZGF0ZSB5b3VyIGJyb3dzZXIgZm9yIG1vcmUgc2VjdXJpdHksIHNwZWVkIGFuZCB0aGUgYmVzdCBleHBlcmllbmNlIG9uIHRoaXMgc2l0ZS4gPGF7dXBfYnV0fT5VcGRhdGUgYnJvd3NlcjwvYT4gPGF7aWdub3JlX2J1dH0+SWdub3JlPC9hPic7XHJcblxyXG5cclxuLy90LmFmPScnO1xyXG50LmFyPSc8Yj4g2YXYqti12YHYrSDYp9mE2YjZitioICh7YnJvd19uYW1lfSkg2KfZhNiu2KfYtSDYqNmDINmC2K/ZitmFLjwvYj4g2YLZj9mFINio2KrYrdiv2YrYqyDZhdiq2LXZgdit2YMg2YTZhNit2LXZiNmEINi52YTZiSDZhdiy2YrYr9mNINmF2YYg2KfZhNit2YXYp9mK2Kkg2YjYp9mE2LHYp9it2Kkg2YjYqtis2LHYqNipINij2YHYttmEINi52YTZiSDZh9iw2Kcg2KfZhNmF2YjZgti5LiA8YXt1cF9idXR9PiDYqtit2K/ZitirINin2YTZhdiq2LXZgditPC9hPiA8YXtpZ25vcmVfYnV0fT4g2KrYrNin2YfZhDwvYT4nO1xyXG50LmJnPSc8Yj7QktCw0YjQuNGP0YIg0LHRgNCw0YPQt9GK0YAgKHticm93X25hbWV9KSDQvdC1INC1INCw0LrRgtGD0LDQu9C40LfQuNGA0LDQvS48L2I+INCQ0LrRgtGD0LDQu9C40LfQuNGA0LDQudGC0LUg0LPQviDQt9CwINC/0L7QstC10YfQtSDRgdC40LPRg9GA0L3QvtGB0YIsINGD0LTQvtCx0YHRgtCy0L4g0Lgg0L3QsNC5LdC00L7QsdGA0L4g0LjQt9C20LjQstGP0LLQsNC90LUg0L3QsCDRgdCw0LnRgtCwLiA8YXt1cF9idXR9PtCQ0LrRgtGD0LDQu9C40LfQuNGA0LDQudGC0LUg0LHRgNCw0YPQt9GK0YDQsDwvYT4gPGF7aWdub3JlX2J1dH0+0JjQs9C90L7RgNC40YDQsNC50YLQtTwvYT4nO1xyXG50LmNhPSdFbCB0ZXUgbmF2ZWdhZG9yICglcykgZXN0w6AgPGI+ZGVzYWN0dWFsaXR6YXQuPC9iPiBUw6kgPGI+dnVsbmVyYWJpbGl0YXRzPC9iPiBjb25lZ3VkZXMgaSBwb3QgPGI+bm8gbW9zdHJhciB0b3RlcyBsZXMgY2FyYWN0ZXLDrXN0aXF1ZXM8L2I+IGRcXCdhcXVlc3QgaSBhbHRyZXMgbGxvY3Mgd2ViLiA8YSVzPkFwcsOobiBhIGFjdHVhbGl0emFyIGVsIG5hdmVnYWRvcjwvYT4nO1xyXG50LmNzPSc8Yj5Ww6HFoSB3ZWJvdsO9IHByb2hsw63FvmXEjSAoe2Jyb3dfbmFtZX0pIGplIHphc3RhcmFsw70gLjwvYj4gUHJvIHbEm3TFocOtIGJlenBlxI1ub3N0LCBwb2hvZGzDrSBhIG9wdGltw6FsbsOtIHpvYnJhemVuw60gdMOpdG8gc3Ryw6Fua3kgc2kgcHJvc8OtbSBzdsWvaiBwcm9obMOtxb5lxI0gYWt0dWFsaXp1anRlLiA8YXt1cF9idXR9PkFrdHVhbGl6b3ZhdCBwcm9obMOtxb5lxI08L2E+IDxhe2lnbm9yZV9idXR9Pklnbm9yb3ZhdDwvYT4nO1xyXG50LmRhPSc8Yj5EaW4gbmV0YnJvd3NlciAoe2Jyb3dfbmFtZX0pIGVyIGZvcsOmbGRldC48L2I+IE9wZGF0ZXIgZGluIGJyb3dzZXIgZm9yIG1lcmUgc2lra2VyaGVkLCBrb21mb3J0IG9nIGRlbiBiZWRzdGUgb3BsZXZlbHNlIHDDpSBkZW5uZSBzaWRlLiA8YXt1cF9idXR9Pk9wZGF0ZXIgYnJvd3NlcjwvYT4gPGF7aWdub3JlX2J1dH0+SWdub3JlcjwvYT4nO1xyXG50LmRlPSc8Yj5JaHIgQnJvd3NlciAoe2Jyb3dfbmFtZX0pIGlzdCB2ZXJhbHRldC48L2I+IDxzcGFuPkFrdHVhbGlzaWVyZW4gU2llIElocmVuIEJyb3dzZXIgZsO8ciBtZWhyIFNpY2hlcmhlaXQsIEtvbWZvcnQgdW5kIGRpZSBlaW53YW5kZnJlaWUgTnV0enVuZyBkaWVzZXIgV2Vic2VpdGUuPC9zcGFuPiA8YXt1cF9idXR9PkJyb3dzZXIgYWt0dWFsaXNpZXJlbjwvYT4gPGF7aWdub3JlX2J1dH0+SWdub3JpZXJlbjwvYT4nO1xyXG50LmVsPSc8Yj7OlyDOrc66zrTOv8+Dzrcgz4TOv8+FIM+Az4HOv86zz4HOrM68zrzOsc+Ezr/PgiDPgM61z4HOuc6uzrPOt8+Dzq7PgiDPg86xz4IgKHticm93X25hbWV9KSDOtc6vzr3Osc65IM+AzrHOu865zqwuPC9iPiDOlc69zrfOvM61z4HPjs+Dz4TOtSDPhM6/zr0gz4DOtc+BzrnOt86zzrfPhM6uIM+DzrHPgiDOs865zrEgz4DOtc+BzrnPg8+Dz4zPhM61z4HOtyDOsc+Dz4bOrM67zrXOuc6xLCDOrM69zrXPg863IM66zrHOuSDPhM63zr0gzrLOrc67z4TOuc+Dz4TOtyDOtc68z4DOtc65z4HOr86xIM+DzrUgzrHPhc+Ezq4gz4TOt869IM65z4PPhM6/z4POtc67zq/OtM6xLiA8YXt1cF9idXR9Ps6Rzr3Osc6yzqzOuM68zrnPg863IM+AzrXPgc65zrfOs863z4TOrjwvYT4gPGF7aWdub3JlX2J1dH0+zqDOsc+BzqzOss67zrXPiM63PC9hPic7XHJcbnQuZXM9JzxiPlR1IG5hdmVnYWRvciB3ZWIgKHticm93X25hbWV9KSBubyBlc3TDoSBhY3R1YWxpemFkby48L2I+IEFjdHVhbGl6YSB0dSBuYXZlZ2Fkb3IgcGFyYSB0ZW5lciBtw6FzIHNlZ3VyaWRhZCB5IGNvbW9kaWRhZCB5IHRlbmVyIGxhIG1lam9yIGV4cGVyaWVuY2lhIGVuIGVzdGUgc2l0aW8uIDxhe3VwX2J1dH0+QWN0dWFsaXphciBuYXZlZ2Fkb3I8L2E+IDxhe2lnbm9yZV9idXR9Pklnbm9yYXI8L2E+JztcclxuLy90LmV0PScnO1xyXG50LmZhID0gJ9mF2LHZiNix2q/YsSDYtNmF2KcgKCVzKSA8Yj7Yp9iyINix2K/ZhyDYrtin2LHYrCDYtNiv2Yc8L2I+INmF24wg2KjYp9i02K8uINin24zZhiDZhdix2YjYsdqv2LEg2K/Yp9ix2KfbjCA8Yj7Zhdi02qnZhNin2Kog2KfZhdmG24zYqtuMINi02YbYp9iu2KrZhyDYtNiv2Yc8L2I+INmF24wg2KjYp9i02K8g2YggPGI+2YbZhduMINiq2YjYp9mG2K8g2KrZhdin2YXbjCDZiNuM2pjar9uMINmH2KfbjCDYp9uM2YY8L2I+INmI2Kgg2LPYp9uM2Kog2Ygg2K/bjNqv2LEg2YjYqCDYs9in24zYqiDZh9inINix2Kcg2KjZhyDYrtmI2KjbjCDZhtmF2KfbjNi0INiv2YfYry4gPGElcz7Yr9ixINiu2LXZiNi1INqv2LHZgdiq2YYg2LHYp9mH2YbZhdin24zbjCDYr9ix2K7YtdmI2LUg2YbYrdmI2Ycg24wg2KjZhyDYsdmI2LIg2LHYs9in2YbbjCDZhdix2YjYsdqv2LEg2K7ZiNivINin24zZhtis2Kcg2qnZhNuM2qkg2qnZhtuM2K8uPC9hPic7XHJcbnQuZmk9JzxiPlNlbGFpbWVzaSAoe2Jyb3dfbmFtZX0pIG9uIHZhbmhlbnR1bnV0LjwvYj4gUMOkaXZpdMOkIHNlbGFpbWVzaSBwYXJhbnRhYWtzZXNpIHR1cnZhbGxpc3V1dHRhLCBtdWthdnV1dHRhIGphIGvDpHl0dMO2a29rZW11c3RhIHTDpGxsw6Qgc2l2dXN0b2xsYS4gPGF7dXBfYnV0fT5Qw6Rpdml0w6Qgc2VsYWluPC9hPiA8YXtpZ25vcmVfYnV0fT5PaGl0YTwvYT4nO1xyXG50LmZyPSc8Yj5Wb3RyZSBuYXZpZ2F0ZXVyIHdlYiAoe2Jyb3dfbmFtZX0pIG5cXCdlc3QgcGFzIMOgIGpvdXIuPC9iPiBNZXR0ZXogdm90cmUgbmF2aWdhdGV1ciDDoCBqb3VyIHBvdXIgcGx1cyBkZSBzw6ljdXJpdMOpLCBkZSBjb25mb3J0IGV0IHVuZSBleHDDqXJpZW5jZSBvcHRpbWFsZSBzdXIgY2Ugc2l0ZS4gPGF7dXBfYnV0fT5NZXR0cmUgbGUgbmF2aWdhdGV1ciDDoCBqb3VyPC9hPiA8YXtpZ25vcmVfYnV0fT5JZ25vcmVyPC9hPic7XHJcbnQuZ2E9J1TDoSBhbiBsw61vbmzDqWl0aGVvaXIgYWdhdCAoJXMpIDxiPmFzIGTDoXRhLjwvYj4gVMOhIDxiPmxhaWdlYWNodGHDrSBzbMOhbmTDoWxhPC9iPiBhIGJoZnVpbCBhciBlb2xhcyBhbm4gYWd1cyBiXFwnZmjDqWlkaXIgPGI+bmFjaCB0YWlzcGXDoW5mYWlkaCBzw6kgZ2FjaCBnbsOpPC9iPiBkZW4gc3XDrW9taCBncsOpYXPDoWluIHNlbyBuw6EgY2lubiBlaWxlLiA8YSVzPkZvZ2hsYWltIGNvbmFzIGRvIGzDrW9ubMOpaXRoZW9pciBhIG51YXNob25yw7o8L2E+JztcclxudC5nbCA9ICdPIHNldSBuYXZlZ2Fkb3IgKCVzKSBlc3TDoSA8Yj5kZXNhY3R1YWxpemFkby48L2I+IFRlbiBjb8OxZWNpZG9zIDxiPmZhbGxvcyBkZSBzZWd1cmFuemE8L2I+IGUgcG9kZXLDrWEgPGI+bm9uIG1vc3RyYXIgdMOzZGFsYXMgY2FyYWN0ZXLDrXN0aWNhczwvYj4gZGVzdGUgZSBvdXRyb3Mgc2l0aW9zIHdlYi4gPGElcz5BcHJlbmRhIGNvbW8gcG9kZSBhY3R1YWxpemFyIG8gc2V1IG5hdmVnYWRvcjwvYT4nO1xyXG50LmhlID0gJ9eU15PXpNeT16TXnyDXqdec15ogKCVzKSA8Yj7XkNeZ16DXlSDXntei15XXk9eb158uPC9iPiDXmdepINec15UgPGI+15HXoteZ15XXqiDXkNeR15jXl9eUINeZ15PXldei15XXqjwvYj4g15XXotep15XXmSA8Yj7XnNeQINec15TXpteZ15Ig15DXqiDXm9ecINeU16rXm9eV16DXldeqPC9iPiDXqdecINeQ16rXqCDXlteUINeV15DXqteo15nXnSDXkNeX16jXmdedLiA8YSVzPtec157XkyDXm9eZ16bXkyDXnNei15PXm9efINeQ16og15TXk9ek15PXpNefINep15zXmjwvYT4nO1xyXG50LmhpPSfgpK/gpLkg4KS14KWH4KSs4KS44KS+4KSH4KSfIOCkhuCkquCkleCliyDgpK/gpL7gpKYg4KSm4KS/4KSy4KS+4KSo4KS+IOCkmuCkvuCkueCkpOClgCDgpLngpYjgpII6IOCkhuCkquCkleCkviDgpKzgpY3gpLDgpL7gpIngpJzgpLzgpLAgKCVzKSA8Yj4g4KSG4KSJ4KSfIOCkkeClniDgpKHgpYfgpJ8gPC8gYj4g4KS54KWI4KSC4KWkIDxhJXM+IOCklOCksCDgpIXgpKfgpL/gpJUg4KS44KWB4KSw4KSV4KWN4KS34KS+LCDgpIbgpLDgpL7gpK4g4KSU4KSwIOCkh+CkuCDgpLjgpL7gpIfgpJ8g4KSq4KSwIOCkuOCkrOCkuOClhyDgpIXgpJrgpY3gpJvgpL4g4KSF4KSo4KWB4KSt4KS1IOCkleCksOCkqOClhyDgpLLgpL/gpI8g4KSG4KSq4KSV4KWHIOCkrOCljeCksOCkvuCkieCknOCkvOCksCDgpJXgpYsg4KSF4KSq4KSh4KWH4KSfIOCkleCksOClh+CkgjwvYT7gpaQnO1xyXG4vL3QuaHI9Jyc7XHJcbnQuaHU9JzxiPkF6IMO2biAoe2Jyb3dfbmFtZX0pIGLDtm5nw6lzesWRamUgZWxhdnVsdC48L2I+IEZyaXNzw610c2UgYSBiw7ZuZ8Opc3rFkWrDqXQgdMO2YmIgYml6dG9uc8OhZywga8OpbnllbGVtIMOpcyBhIGxlZ2pvYmIgZmVsaGFzem7DoWzDs2kgw6lsbcOpbnkgw6lyZGVrw6liZW4gZXplbiBheiBvbGRhbG9uLiA8YXt1cF9idXR9PkLDtm5nw6lzesWRIGZyaXNzw610w6lzZTwvYT4gPGF7aWdub3JlX2J1dH0+TWVsbMWResOpczwvYT4nO1xyXG50LmlkPSc8Yj5QZXJhbWJhbiB3ZWIgQW5kYSAoe2Jyb3dfbmFtZX0pIHN1ZGFoIGxhd2FzLjwvYj4gUGVyYmFydWkgcGVyYW1iYW4gQW5kYSB1bnR1ayBwZW5nYWxhbWFuIHRlcmJhaWsgeWFuZyBsZWJpaCBhbWFuIGRhbiBueWFtYW4gZGkgc2l0dXMgaW5pLiA8YXt1cF9idXR9PlBlcmJhcnVpIHBlcmFtYmFuPC9hPiA8YXtpZ25vcmVfYnV0fT5BYmFpa2FuPC9hPic7XHJcbnQuaXQ9JzxiPklsIHN1byBicm93c2VyIHdlYiAoe2Jyb3dfbmFtZX0pIG5vbiDDqCBhZ2dpb3JuYXRvLjwvYj4gQWdnaW9ybmkgaWwgc3VvIGJyb3dzZXIgcGVyIG90dGVuZXJlIG1hZ2dpb3JlIHNpY3VyZXp6YSwgY29tZm9ydCwgZSBsYSBtaWdsaW9yZSBlc3BlcmllbnphIHBvc3NpYmlsZSBzdSBxdWVzdG8gc2l0by4gPGF7dXBfYnV0fT5BZ2dpb3JuYSBpbCBicm93c2VyPC9hPiA8YXtpZ25vcmVfYnV0fT5JZ25vcmE8L2E+JztcclxudC5qYT0nPGI+44GK5L2/44GE44Gu44Km44Kn44OW44OW44Op44Km44K2ICh7YnJvd19uYW1lfSkg44Gv5Y+k44GZ44GO44G+44GZ44CCPC9iPuWuieWFqOaAp+OBqOW/q+mBqeOBleOCkuWQkeS4iuOBleOBm+OAgeOBk+OBruOCteOCpOODiOOBp+acgOmrmOOBruS9k+mok+OBjOWHuuadpeOCi+OCiOOBhuOAgeOBiuS9v+OBhOOBruODluODqeOCpuOCtuOCkuOCouODg+ODl+ODh+ODvOODiOOBl+OBvuOBl+OCh+OBhuOAgjxhe3VwX2J1dH0+44OW44Op44Km44K244KS44Ki44OD44OX44OH44O844OI44GZ44KLPC9hPiA8YXtpZ25vcmVfYnV0fT7nhKHoppbjgZnjgos8L2E+JztcclxudC5rbz0nPGI+7ZiE7J6sIOq3gO2VmOydmCDsm7nruIzrnbzsmrDsoIAgKHticm93X25hbWV9KeydgCjripQpIOq1rOuyhOyghOyeheuLiOuLpC48L2I+IOuzuCDsgqzsnbTtirjsnZgg7Zal7IOB65CcIOuztOyViCDrsI8g7LWc6rOgIO2SiOyniOydmCDtjrjslYjtlZwg7ISc67mE7Iqk66W8IOyCrOyaqe2VmOq4sCDsnITtlbTshJwg67iM65287Jqw7KCA66W8IOyXheuNsOydtO2KuO2VtCDso7zsi63si5zsmKQuIDxhe3VwX2J1dH0+67iM65287Jqw7KCAIOyXheuNsOydtO2KuDwvYT4gPGF7aWdub3JlX2J1dH0+66y07Iuc7ZWY6riwPC9hPic7XHJcbi8vdC5sdD0nJztcclxudC5sdj0nSsWrc3UgcMSBcmzFq2twcm9ncmFtbWEgKCVzKSBpciA8Yj5ub3ZlY29qdXNpLjwvYj4gIFRhaSBpciB6aW7EgW1hcyA8Yj5kcm/FocSrYmFzIHByb2JsxJNtYXM8L2I+LCB1biB0xIEgdmFyIGF0dMSTbG90IMWhbyB1biBjaXRhcyAgdMSrbWVrxLxhIGxhcGFzIDxiPm5la29yZWt0aS48L2I+IDxhJXM+VXp6aW5pLCBrxIEgYXRqYXVub3Qgc2F2dSBwxIFybMWra3Byb2dyYW1tdTwvYT4nO1xyXG50Lm1zPSc8Yj5QZWxheWFyIHdlYiAoe2Jyb3dfbmFtZX0pIGFuZGEgc3VkYWggdXNhbmcuPC9iPiBLZW1hcyBraW5pIHBlbGF5YXIgYW5kYSB1bnR1ayBtZW1wZXJvbGVoIGxlYmloIGtlc2VsYW1hdGFuLCBrZXNlbGVzYWFuIGRhbiBwZW5nYWxhbWFuIHRlcmJhaWsgZGkgdGFwYWsgaW5pLiA8YXt1cF9idXR9PktlbWFzIGtpbmkgcGVsYXlhcjwvYT4gPGF7aWdub3JlX2J1dH0+QWJhaWthbjwvYT4nO1xyXG50Lm5sPSc8Yj5VdyB3ZWJicm93c2VyICh7YnJvd19uYW1lfSkgaXMgdmVyb3VkZXJkLjwvYj4gVXBkYXRlIHV3IGJyb3dzZXIgdm9vciBtZWVyIHZlaWxpZ2hlaWQsIGNvbWZvcnQgZW4gZGUgYmVzdGUgZXJ2YXJpbmcgb3AgZGV6ZSBzaXRlLiA8YXt1cF9idXR9PlVwZGF0ZSBicm93c2VyPC9hPiA8YXtpZ25vcmVfYnV0fT5OZWdlZXI8L2E+JztcclxudC5ubz0nPGI+TmV0dGxlc2VyZW4gZGluLCh7YnJvd19uYW1lfSksIGVyIHV0ZGF0ZXJ0LjwvYj4gT3BwZGF0ZXIgbmV0dGxlc2VyZW4gZGluIGZvciBtZXIgc2lra2VyaGV0LCBrb21mb3J0IG9nIGRlbiBiZXN0ZSBvcHBsZXZlbHNlbiBww6UgZGVubmUgc2lkZW4uIDxhe3VwX2J1dH0+T3BwZGF0ZXIgbmV0dGxlc2VyPC9hPiA8YXtpZ25vcmVfYnV0fT5JZ25vcmVyPC9hPic7XHJcbnQucGw9JzxiPlBhxYRzdHdhIHByemVnbMSFZGFya2EgKHticm93X25hbWV9KSBqZXN0IG5pZWFrdHVhbG5hLjwvYj4gQWJ5IHphcGV3bmnEhyB3acSZa3N6ZSBiZXpwaWVjemXFhHN0d28sIHd5Z29kxJkgaSBrb21mb3J0IHXFvHl0a293YW5pYSB3IHRlaiB3aXRyeW5pZSwgcHJvc3rEmSB6YWt0dWFsaXpvd2HEhyBzd29qxIUgcHJ6ZWdsxIVkYXJrxJkuIDxhe3VwX2J1dH0+WmFrdHVhbGl6dWogcHJ6ZWdsxIVkYXJrxJk8L2E+IDxhe2lnbm9yZV9idXR9PlppZ25vcnVqPC9hPic7XHJcbnQucHQ9JzxiPlNldSBuYXZlZ2Fkb3IgZGUgaW50ZXJuZXQgKHticm93X25hbWV9KSBlc3TDoSBkZXNhdHVhbGl6YWRvLjwvYj4gQXR1YWxpemUgc2V1IG5hdmVnYWRvciBwYXJhIG9idGVyIG1haXMgc2VndXJhbsOnYSwgY29uZm9ydG8gZSBhIG1lbGhvciBleHBlcmnDqm5jaWEgbmVzdGUgc2l0ZS4gPGF7dXBfYnV0fT5BdHVhbGl6YXIgbmF2ZWdhZG9yPC9hPiA8YXtpZ25vcmVfYnV0fT5JZ25vcmFyPC9hPic7XHJcbnQucm89JzxiPkJyb3dzZXJ1bCBkdW1uZWF2b2FzdHLEgyAoe2Jyb3dfbmFtZX0pIG51IGVzdGUgYWN0dWFsaXphdC48L2I+IEFjdHVhbGl6YcibaS12xIMgYnJvd3NlcnVsIHBlbnRydSBzZWN1cml0YXRlIHNwb3JpdMSDLCBjb25mb3J0IMiZaSBjZWEgbWFpIGJ1bsSDIGV4cGVyaWVuyJvEgyBwZSBzaXRlLiA8YXt1cF9idXR9PkFjdHVhbGl6ZWF6xIMgYnJvd3NlcjwvYT48YXtpZ25vcmVfYnV0fT5JZ25vcsSDPC9hPic7XHJcbnQucnU9JzxiPtCS0LDRiCDQstC10LEt0LHRgNCw0YPQt9C10YAgKHticm93X25hbWV9KSDRg9GB0YLQsNGA0LXQuy48L2I+INCe0LHQvdC+0LLQuNGC0LUg0YHQstC+0Lkg0LHRgNCw0YPQt9C10YAsINGH0YLQvtCx0Ysg0YHQtNC10LvQsNGC0Ywg0L/RgNC10LHRi9Cy0LDQvdC40LUg0L3QsCDRjdGC0L7QvCDRgdCw0LnRgtC1INCx0L7Qu9C10LUg0LHQtdC30L7Qv9Cw0YHQvdGL0LwsINC60L7QvNGE0L7RgNGC0L3Ri9C8INC4INC/0YDQvtC00YPQutGC0LjQstC90YvQvC4gPGF7dXBfYnV0fT7QntCx0L3QvtCy0LjRgtGMINCx0YDQsNGD0LfQtdGAPC9hPiA8YXtpZ25vcmVfYnV0fT7QmNCz0L3QvtGA0LjRgNC+0LLQsNGC0Yw8L2E+JztcclxudC5zaz0nPGI+IFbDocWhIGludGVybmV0b3bDvSBwcmVobGlhZGHEjSAoe2Jyb3dfbmFtZX0pIGplIHphc3RhcmFuw70uPC9iPiBBa3R1YWxpenVqdGUgdsOhxaEgcHJlaGxpYWRhxI0gcHJlIHZ5xaHFoWl1IGJlenBlxI1ub3PFpSwga29tZm9ydCBhIG5hamxlcMWhw60gesOhxb5pdG9rIG5hIHRlanRvIHN0csOhbmtlLiA8YXt1cF9idXR9PkFrdHVhbGl6b3ZhxaUgcHJlaGxpYWRhxI08L2E+PGF7aWdub3JlX2J1dH0+SWdub3JvdmHFpTwvYT4nO1xyXG50LnNsID0gJ1ZhxaEgYnJza2FsbmlrICglcykgamUgPGI+emFzdGFyZWwuPC9iPiBJbWEgdmXEjSA8Yj52YXJub3N0bmloIHBvbWFua2xqaXZvc3RpPC9iPiBpbiBtb3JkYSA8Yj5uZSBibyBwcmF2aWxubyBwcmlrYXphbDwvYj4gdGUgYWxpIGRydWdpaCBzdHJhbmkuIDxhJXM+UG9nbGVqdGUga2FrbyBsYWhrbyBwb3NvZG9iaXRlIHN2b2ogYnJza2FsbmlrPC9hPic7XHJcbnQuc3EgPSAnU2hmbGV0dWVzaSBqdWFqICglcykgw6tzaHTDqyA8Yj5jYSBpIHZqZXTDq3IuPC9iPiBBaSBrYSA8Yj50w6sgbWV0YSBzaWd1cmllPC9iPiB0w6sgbmpvaHVyYSBkaGUgbXVuZGV0IHTDqyA8Yj5tb3MgaSBzaGZhccOrIHTDqyBnaml0aGEga2FyYWt0ZXJpc3Rpa2F0PC9iPiBlIGvDq3NhaiBkaGUgc2h1bcOrIGZhcWV2ZSB3ZWIgdMOrIHRqZXJhLiA8YSVzPk3Dq3Nvbmkgc2Ugc2kgdMOrIHDDq3JkaXTDq3Nvbmkgc2hmbGV0dWVzaW4gdHVhajwvYT4nO1xyXG50LnNyPSdWYcWhIHByZXRyYcW+aXZhxI0gKCVzKSBqZSA8Yj56YXN0YXJlby48L2I+IEltYSBwb3puYXRlIDxiPnNpZ3Vybm9zbmUgcHJvYmxlbWU8L2I+IGkgbmFqdmVyb3ZhdG5pamUgPGI+bmXEh2UgcHJpa2F6YXRpIHN2ZSBmdW5rY2lvbmFsbmlzdGk8L2I+IG92b2cgaSBkcnVnaWggc2FqdG92YS4gPGElcz5OYXXEjWkgdmnFoWUgbyBuYWRvZ3JhZG5qaSBzdm9nIHByZXRyYcW+aXZhxI1hPC9hPic7XHJcbnQuc3Y9JzxiPkRpbiB3ZWJibMOkc2FyZSAoe2Jyb3dfbmFtZX0pIMOkciBmw7Zyw6VsZHJhZC48L2I+IFVwcGRhdGVyYSBkaW4gd2ViYmzDpHNhcmUgZsO2ciBiw6R0dHJlIHPDpGtlcmhldCwgYmVrdsOkbWxpZ2hldCBvY2ggZGVuIGLDpHN0YSB1cHBsZXZlbHNlbiBww6UgZGVuIGjDpHIgc2lkYW4uIDxhe3VwX2J1dH0+VXBwZGF0ZXJhIHdlYmJsw6RzYXJlPC9hPiA8YXtpZ25vcmVfYnV0fT5BdnN0w6U8L2E+JztcclxudC50aD0n4LmA4Lin4LmH4Lia4LmE4LiL4LiV4LmM4LiZ4Li14LmJ4Lit4Lii4Liy4LiB4LiI4Liw4LmA4LiV4Li34Lit4LiZ4LiE4Li44LiTOiDguYDguJrguKPguLLguKfguYzguYDguIvguK3guKPguYwgKCVzKSDguILguK3guIfguITguLjguJPguJnguLHguYnguJkgPGI+4Lil4LmJ4Liy4Liq4Lih4Lix4Lii4LmB4Lil4LmJ4LinPC9iPiA8YSVzPuC4m+C4o+C4seC4muC4m+C4o+C4uOC4h+C5gOC4muC4o+C4suC4p+C5jOC5gOC4i+C4reC4o+C5jOC4guC4reC4h+C4hOC4uOC4kzwvYT4g4LmA4Lie4Li34LmI4Lit4LmA4Lie4Li04LmI4LihIOC4hOC4p+C4suC4oeC4m+C4peC4reC4lOC4oOC4seC4oiDguITguKfguLLguKHguKrguLDguJTguKfguIHguKrguJrguLLguKLguYHguKXguLDguJvguKPguLDguKrguJrguIHguLLguKPguJPguYzguJfguLXguYjguJTguLXguJfguLXguYjguKrguLjguJTguYPguJnguYDguKfguYfguJrguYTguIvguJXguYzguJnguLXguYknO1xyXG50LnRyPSc8Yj4oe2Jyb3dfbmFtZX0pIGludGVybmV0IHRhcmF5xLFjxLFuxLF6IGfDvG5jZWwgZGXEn2lsLjwvYj4gQnUgc2l0ZWRlIGRhaGEgZmF6bGEgZ8O8dmVubGlrLCBrb25mb3IgdmUgZW4gaXlpIGRlbmV5aW0gacOnaW4gdGFyYXnEsWPEsW7EsXrEsSBnw7xuY2VsbGV5aW4uIDxhe3VwX2J1dH0+VGFyYXnEsWPEsXnEsSBnw7xuY2VsbGU8L2E+IDxhe2lnbm9yZV9idXR9Pllva3NheTwvYT4nO1xyXG50LnVrPSc8Yj7QktCw0Ygg0LHRgNCw0YPQt9C10YAgKHticm93X25hbWV9KSDRlCDQt9Cw0YHRgtCw0YDRltC70LjQvC48L2I+INCe0L3QvtCy0ZbRgtGMINC50L7Qs9C+INC30LDRgNCw0LTQuCDQsdC10LfQv9C10YfQvdGW0YjQvtCz0L4sINC30YDRg9GH0L3RltGI0L7Qs9C+INGC0LAg0L/RgNC40ZTQvNC90ZbRiNC+0LPQviDQv9C10YDQtdCz0LvRj9C00YMg0YbRjNC+0LPQviDRgtCwINGW0L3RiNC40YUg0YHQsNC50YLRltCyLiA8YXt1cF9idXR9PtCe0L3QvtCy0LjRgtC4PC9hPiA8YXtpZ25vcmVfYnV0fT7QodC60LDRgdGD0LLQsNGC0Lg8L2E+JztcclxudC52aT0nPGI+VHLDrG5oIGR1eeG7h3Qgd2ViIGPhu6dhIGLhuqFuICh7YnJvd19uYW1lfSkgxJHDoyBjxakuPC9iPiBIw6N5IG7Dom5nIGPhuqVwIHRyw6xuaCBkdXnhu4d0IGPhu6dhIGLhuqFuIMSR4buDIMSRxrDhu6NjIGFuIHRvw6BuIHbDoCB0aHXhuq1uIGzhu6NpIGjGoW4gxJHhu5NuZyB0aOG7nWkgY8OzIMSRxrDhu6NjIHRy4bqjaSBuZ2hp4buHbSB04buRdCBuaOG6pXQgduG7m2kgdHJhbmcgbsOgeS4gPGF7dXBfYnV0fT5Ow6JuZyBj4bqlcCB0csOsbmggZHV54buHdDwvYT4gPGF7aWdub3JlX2J1dH0+QuG7jyBxdWE8L2E+JztcclxudC56aD0nPGI+5oKo55qE572R6aG15rWP6KeI5ZmoICh7YnJvd19uYW1lfSkg5bey6L+H5pyf44CCPC9iPuabtOaWsOaCqOeahOa1j+iniOWZqO+8jOS7peaPkOmrmOWuieWFqOaAp+WSjOiIkumAguaAp++8jOW5tuiOt+W+l+iuv+mXruacrOe9keermeeahOacgOS9s+S9k+mqjOOAgjxhe3VwX2J1dH0+5pu05paw5rWP6KeI5ZmoPC9hPiA8YXtpZ25vcmVfYnV0fT7lv73nlaU8L2E+JztcclxudFtcInpoLXR3XCJdPSc8Yj7mgqjnmoTntrLpoIHngI/opr3lmaggICh7YnJvd19uYW1lfSkg5bey57aT6YGO5pmC44CCPC9iPiDoq4vmm7TmlrDmgqjnmoTngI/opr3lmajvvIzku6XlnKjmraTntrLnq5nlj5blvpfmm7TlronlhajjgIHoiJLpgannmoTmnIDkvbPngI/opr3pq5TpqZfjgII8YXt1cF9idXR9PuabtOaWsOeAj+imveWZqDwvYT48YXtpZ25vcmVfYnV0fT7lv73nlaU8L2E+JztcclxuXHJcblxyXG50PW9wW1widGV4dF9cIitsbF18fG9wLnRleHR8fHRbbGxdfHx0LmVuO1xyXG5cclxudmFyIHRhcj1cIlwiO1xyXG5pZiAob3AubmV3d2luZG93KVxyXG4gICAgdGFyPScgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIic7XHJcblxyXG52YXIgZGl2ID0gb3AuZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuZGl2LmlkPVwiYnVvcmdcIjtcclxuZGl2LmNsYXNzTmFtZT1cImJ1b3JnXCI7XHJcblxyXG52YXIgc3R5bGU9JzxzdHlsZT4uYnVvcmcge2JhY2tncm91bmQ6ICNGREYyQUIgbm8tcmVwZWF0IDE0cHggY2VudGVyIHVybCgnK2J1cmwrJ2ltZy9zbWFsbC8nK2JiLm4rJy5wbmcpO308L3N0eWxlPic7XHJcbnZhciBzdHlsZTI9JzxzdHlsZT4uYnVvcmcge2JhY2tncm91bmQtcG9zaXRpb246IDhweCAxN3B4OyBwb3NpdGlvbjphYnNvbHV0ZTtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjExMTExMTsgd2lkdGg6MTAwJTsgdG9wOjBweDsgbGVmdDowcHg7IGJvcmRlci1ib3R0b206MXB4IHNvbGlkICNBMjkzMzA7IHRleHQtYWxpZ246bGVmdDsgY3Vyc29yOnBvaW50ZXI7ICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmOGVhOyAgICBmb250OiAxN3B4IENhbGlicmksSGVsdmV0aWNhLEFyaWFsLHNhbnMtc2VyaWY7ICAgIGJveC1zaGFkb3c6IDAgMCA1cHggcmdiYSgwLDAsMCwwLjIpO31cXFxyXG4gICAgLmJ1b3JnIGRpdiB7IHBhZGRpbmc6IDExcHggMTJweCAxMXB4IDMwcHg7ICBsaW5lLWhlaWdodDogMS43ZW07IH1cXFxyXG4gICAgLmJ1b3JnIGRpdiBhLC5idW9yZyBkaXYgYTp2aXNpdGVkeyB0ZXh0LWluZGVudDogMDsgY29sb3I6ICNmZmY7IHRleHQtZGVjb3JhdGlvbjogbm9uZTsgYm94LXNoYWRvdzogMCAwIDJweCByZ2JhKDAsMCwwLDAuNCk7IHBhZGRpbmc6IDFweCAxMHB4OyBib3JkZXItcmFkaXVzOiA0cHg7IGZvbnQtd2VpZ2h0OiBub3JtYWw7IGJhY2tncm91bmQ6ICM1YWI0MDA7ICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7ICAgIG1hcmdpbjogMCAycHg7IGRpc3BsYXk6IGlubGluZS1ibG9jazt9XFxcclxuICAgICNidW9yZ2lneyBiYWNrZ3JvdW5kLWNvbG9yOiAjZWRiYzY4O31cXFxyXG4gICAgQG1lZGlhIG9ubHkgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiA3MDBweCl7LmJ1b3JnIGRpdiB7IHBhZGRpbmc6NXB4IDEycHggNXB4IDlweDsgdGV4dC1pbmRlbnQ6IDIycHg7bGluZS1oZWlnaHQ6IDEuM2VtO30uYnVvcmcge2JhY2tncm91bmQtcG9zaXRpb246IDlweCA4cHg7fX1cXFxyXG4gICAgQGtleWZyYW1lcyBidW9yZ2ZseSB7ZnJvbSB7b3BhY2l0eTowO3RyYW5zZm9ybTp0cmFuc2xhdGVZKC01MHB4KX0gdG8ge29wYWNpdHk6MTt0cmFuc2Zvcm06dHJhbnNsYXRlWSgwcHgpfX0gXFxcclxuICAgIC5idW9yZyB7IGFuaW1hdGlvbi1uYW1lOiBidW9yZ2ZseTsgYW5pbWF0aW9uLWR1cmF0aW9uOiAxczsgYW5pbWF0aW9uLXRpbWluZy1mdW5jdGlvbjogZWFzZS1vdXQ7fTwvc3R5bGU+JztcclxuXHJcbmlmICh0LmluZGV4T2YoXCJ7YnJvd19uYW1lfVwiKT09PS0xKSB7Ly9sZWdhY3kgc3R5bGVcclxuICAgIHQ9YnVzcHJpbnRmKHQsYmIudCwnIGlkPVwiYnVvcmd1bFwiIGhyZWY9XCInK29wLnVybCsnXCInK3Rhcik7XHJcblxyXG4gICAgc3R5bGUgKz0gXCI8c3R5bGU+LmJ1b3JnIHtwb3NpdGlvbjphYnNvbHV0ZTtwb3NpdGlvbjpmaXhlZDt6LWluZGV4OjExMTExMTsgd2lkdGg6MTAwJTsgdG9wOjBweDsgbGVmdDowcHg7IGJvcmRlci1ib3R0b206MXB4IHNvbGlkICNBMjkzMzA7IHRleHQtYWxpZ246bGVmdDsgY3Vyc29yOnBvaW50ZXI7IGZvbnQ6IDEzcHggQXJpYWwsc2Fucy1zZXJpZjtjb2xvcjojMDAwO31cXFxyXG4gICAgLmJ1b3JnIGRpdiB7IHBhZGRpbmc6NXB4IDM2cHggNXB4IDQwcHg7IH1cXFxyXG4gICAgLmJ1b3JnPmRpdj5hLC5idW9yZz5kaXY+YTp2aXNpdGVke2NvbG9yOiNFMjU2MDA7IHRleHQtZGVjb3JhdGlvbjogdW5kZXJsaW5lO31cXFxyXG4gICAgI2J1b3JnY2xvc2V7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6NnB4O3RvcDowcHg7aGVpZ2h0OjIwcHg7d2lkdGg6MTJweDtmb250OjE4cHggYm9sZDtwYWRkaW5nOjA7fVxcXHJcbiAgICAjYnVvcmdhe2Rpc3BsYXk6YmxvY2s7fVxcXHJcbiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDcwMHB4KXsuYnVvcmcgZGl2IHsgcGFkZGluZzo1cHggMTVweCA1cHggOXB4OyB9fTwvc3R5bGU+XCI7XHJcbiAgICBkaXYuaW5uZXJIVE1MPSAnPGRpdj4nK3QrJzxkaXYgaWQ9XCJidW9yZ2Nsb3NlXCI+PGEgaWQ9XCJidW9yZ2FcIj4mdGltZXM7PC9hPjwvZGl2PjwvZGl2Picrc3R5bGU7XHJcbiAgICBvcC5hZGRtYXJnaW49dHJ1ZTtcclxufVxyXG5lbHNlIHtcclxuICAgIGlmIChvcC5wb3NpdGlvbiA9PT0gXCJib3R0b21cIikge1xyXG4gICAgICAgIHN0eWxlMiArPSBcIjxzdHlsZT4uYnVvcmcge2JvdHRvbTowOyB0b3A6YXV0bzsgYm9yZGVyLXRvcDoxcHggc29saWQgI0EyOTMzMDsgfSBAa2V5ZnJhbWVzIGJ1b3JnZmx5IHtmcm9tIHtvcGFjaXR5OjA7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoNTBweCl9IHRvIHtvcGFjaXR5OjE7dHJhbnNmb3JtOnRyYW5zbGF0ZVkoMHB4KX19IFxcPC9zdHlsZT5cIjtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKG9wLnBvc2l0aW9uID09PSBcImNvcm5lclwiKSB7XHJcbiAgICAgICAgc3R5bGUyICs9IFwiPHN0eWxlPi5idW9yZyB7IHdpZHRoOjMwMHB4OyB0b3A6NTBweDsgcmlnaHQ6NTBweDsgbGVmdDphdXRvOyBib3JkZXI6MXB4IHNvbGlkICNBMjkzMzA7IH0gLmJ1b3JnIGRpdiBiIHtkaXNwbGF5OmJsb2NrO30gLmJ1b3JnIGRpdiBzcGFuIHsgZGlzcGxheTogYmxvY2s7IH0gLmJ1b3JnIGRpdiBhIHttYXJnaW46IDRweCAycHg7fVxcXHJcbiAgICAgICAgPC9zdHlsZT5cIjtcclxuICAgIH1cclxuICAgIGVsc2Uge1xyXG4gICAgICAgIG9wLmFkZG1hcmdpbiA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0ID0gdC5yZXBsYWNlKFwie2Jyb3dfbmFtZX1cIiwgYmIudCkucmVwbGFjZShcInt1cF9idXR9XCIsICcgaWQ9XCJidW9yZ3VsXCIgaHJlZj1cIicgKyBvcC51cmwgKyAnXCInICsgdGFyKS5yZXBsYWNlKFwie2lnbm9yZV9idXR9XCIsICcgaWQ9XCJidW9yZ2lnXCIgaHJlZj1cIlwiJyk7XHJcbiAgICBkaXYuaW5uZXJIVE1MID0gJzxkaXY+JyArIHQgKyAnPC9kaXY+JyArIHN0eWxlK3N0eWxlMjtcclxufVxyXG5cclxub3AudGV4dD10O1xyXG5pZiAob3AuY29udGFpbmVyKSB7XHJcbiAgICBvcC5jb250YWluZXIuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgIG9wLmFkZG1hcmdpbj1mYWxzZTtcclxufVxyXG5lbHNlXHJcbiAgICBkb2N1bWVudC5ib2R5Lmluc2VydEJlZm9yZShkaXYsZG9jdW1lbnQuYm9keS5maXJzdENoaWxkKTtcclxuXHJcbmRpdi5vbmNsaWNrPWZ1bmN0aW9uKCl7XHJcbiAgICBpZiAob3AubmV3d2luZG93KVxyXG4gICAgICAgIHdpbmRvdy5vcGVuKG9wLnVybCxcIl9ibGFua1wiKTtcclxuICAgIGVsc2VcclxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZj1vcC51cmw7XHJcbiAgICBvcC5zZXRDb29raWUob3AucmVtaW5kZXJDbG9zZWQpO1xyXG4gICAgb3Aub25jbGljayhvcCk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn07XHJcbnRyeSB7XHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnVvcmd1bFwiKS5vbmNsaWNrID0gZnVuY3Rpb24oZSkge1xyXG4gICAgZSA9IGUgfHwgd2luZG93LmV2ZW50O1xyXG4gICAgaWYgKGUuc3RvcFByb3BhZ2F0aW9uKSBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgZWxzZSBlLmNhbmNlbEJ1YmJsZSA9IHRydWU7XHJcbiAgICBvcC5kaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xyXG4gICAgaG0uc3R5bGUubWFyZ2luVG9wID0gb3AuYm9keW10OyAgICBcclxuICAgIG9wLm9uY2xpY2sob3ApOyAgICBcclxuICAgIHJldHVybiB0cnVlO1xyXG59O1xyXG59XHJcbmNhdGNoKGUpIHt9XHJcblxyXG5pZiAob3AuYWRkbWFyZ2luKSB7XHJcbiAgICB2YXIgaG09ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJodG1sXCIpWzBdfHxkb2N1bWVudC5ib2R5O1xyXG4gICAgb3AuYm9keW10ID0gaG0uc3R5bGUubWFyZ2luVG9wO1xyXG4gICAgaG0uc3R5bGUubWFyZ2luVG9wID0gKGRpdi5jbGllbnRIZWlnaHQpK1wicHhcIjtcclxufVxyXG4oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidW9yZ2FcIil8fGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnVvcmdpZ1wiKSkub25jbGljayA9IGZ1bmN0aW9uKGUpIHtcclxuICAgIGUgPSBlIHx8IHdpbmRvdy5ldmVudDtcclxuICAgIGlmIChlLnN0b3BQcm9wYWdhdGlvbikgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgIGVsc2UgZS5jYW5jZWxCdWJibGUgPSB0cnVlO1xyXG4gICAgb3AuZGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcclxuICAgIGlmIChvcC5hZGRtYXJnaW4pXHJcbiAgICAgICAgaG0uc3R5bGUubWFyZ2luVG9wID0gb3AuYm9keW10O1xyXG4gICAgb3Aub25jbG9zZShvcCk7XHJcbiAgICBvcC5zZXRDb29raWUob3AucmVtaW5kZXJDbG9zZWQpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59XHJcblxyXG5pZiAob3Aubm9jbG9zZSkge1xyXG4gICAgdmFyIGVsPShkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1b3JnYVwiKXx8ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidW9yZ2lnXCIpKTtcclxuICAgIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xyXG59XHJcbm9wLm9uc2hvdyhvcCk7XHJcblxyXG59O1xyXG5cclxuXHJcbiIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxpd2VpIG9uIDIwMTcvMy84LlxyXG4gKi9cclxuJ3VzZSBzdHJpY3QnO1xyXG5cclxuLy8g6L+Z5Lik5Liq5bqT5LiN6IO955u05o6l55SoYnJvc2VyaWZ555qEYmFiZWzov5vooYzovazmjaLvvIzlv4XpobvlhbPpl61iYWJlbOWkhOeQhuWGjei/m+ihjOWQiOW5tu+8jOWQpuWImeS8muWvvOiHtGRyYXfmjqfku7blh7rpl67pophcclxucmVxdWlyZSgnLi4vbGlicy9jb250cm9scy9zdHlsZWVkaXRvci9MZWFmbGV0LlN0eWxlRWRpdG9yJyk7XHJcbnJlcXVpcmUoJy4uL2xpYnMvY29udHJvbHMvc3R5bGVlZGl0b3IvTGVhZmxldC5TdHlsZUZvcm1zJyk7XHJcblxyXG4vLyDmj5DnpLrmtY/op4jlmajnmoTniYjmnKxcclxudmFyIGJyb3dzZXJVcGRhdGUgPSByZXF1aXJlKCcuLi9saWJzL290aGVyL3VwZGF0ZS5ucG0uZnVsbCcpO1xyXG52YXIgJGJ1b29wID0ge3ZzOntpOjEyLGY6LTQsbzotNCxzOjgsYzotNH0sYXBpOjR9O1xyXG5icm93c2VyVXBkYXRlKCRidW9vcCk7XHJcblxyXG4vLyByZXF1aXJlKCcuLi9saWJzL3Bsb3QvZ29vZycpO1xyXG4vLyByZXF1aXJlKCcuLi9saWJzL3Bsb3Qvb2wnKTtcclxuLy8gcmVxdWlyZSgnLi4vbGlicy9wbG90L3Bsb3QuZGVidWcnKTtcclxuIl19
