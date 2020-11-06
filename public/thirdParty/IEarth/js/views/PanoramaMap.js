define(["jquery","jqueryResize","Vue","Bootstrap","views/Container","views/ObjectManager","Cesium"],function(e,o,i,t,n,r,a){"use strict";var s={panorama:"全景图"};for(var l in s)s[l]=window.platformLanguage[l]?window.platformLanguage[l]:s[l];function p(o){o=a.defaultValue(o,{}),this._viewer=a.defaultValue(o.viewer,void 0),this._viewer&&!a.defined(this._viewer.objectManager)&&(this._viewer.objectManager=new r(this._viewer)),this._parentContainer=a.defaultValue(o.parentContainer,"cesiumContainer"),"string"==typeof this._parentContainer&&(this._parentContainer=e("#"+this._parentContainer)),this._parentContainer instanceof HTMLElement&&(this._parentContainer=e(this._parentContainer)),this._viewerContianer=new n({parentContainer:this._parentContainer,shown:!1,title:s.panorama,style:{position:"absolute",top:0,left:0,margin:0,zIndex:9999,width:"680px",height:"550px"},bodyStyle:{position:"absolute",top:"34px",left:"1px",right:"1px",bottom:"1px",padding:0},draggable:!0,resizable:!0}),this._photoSphrereViewer=void 0;var i=this;this._viewerContianer.readyPromise.then(function(){i._photoSphrereViewer=new a.PhotoSphereViewer({container:i._viewerContianer.body.get(0),navbar:!0,time_anim:!1})}),this.addPanoramaPoints("config/panoramas.json"),this._viewerContianer.body.resize(function(){i._photoSphrereViewer&&i._photoSphrereViewer._canvas&&i._photoSphrereViewer.resize(i._viewerContianer.body.width(),i._viewerContianer.body.height())})}return p.prototype.addPanoramaPoints=function(e){var o=this;function i(e){e.forEach(function(e,i){t(e),t(e.label),e.nodeType="pano";var n,r,l,p=o._viewer.objectManager.addBillboard(e);e.panorama&&(n="pop-up-panorama-map",r=p.object,l=function(){o._photoSphrereViewer.load(e.panorama),o._viewerContianer.title=e.name||s.panorama},r[n]=function(e){o._viewerContianer.shown=!0,function(e){a.defined(e)||(e={x:100,y:200});var i=e.x+40,t=e.y-40,n=o._parentContainer.height(),r=o._parentContainer.width(),s=o._viewerContianer.panel.width(),l=o._viewerContianer.panel.height();t>l?(o._viewerContianer.setPositionTop("auto"),o._viewerContianer.setPositionBottom(n-t)):(o._viewerContianer.setPositionTop(t+80),o._viewerContianer.setPositionBottom("auto")),r-i>s?(o._viewerContianer.setPositionLeft(i),o._viewerContianer.setPositionRight("auto")):(o._viewerContianer.setPositionLeft("auto"),o._viewerContianer.setPositionRight(r+i+80)),o._viewerContianer.unifyPositionOrigin()}(e),"function"==typeof l&&l()})})}function t(e){var i;(e=a.defaultValue(e,0)).color&&e.color.rgba?(i=l(i=e.color.rgba)).length===a.Color.packedLength?e.color=new a.Color(a.Color.byteToFloat(i[0]),a.Color.byteToFloat(i[1]),a.Color.byteToFloat(i[2]),a.Color.byteToFloat(i[3])):e.color=a.Color.WHITE:e.color=a.Color.WHITE;e.fillColor&&e.fillColor.rgba?(i=l(i=e.fillColor.rgba)).length===a.Color.packedLength?e.fillColor=new a.Color(a.Color.byteToFloat(i[0]),a.Color.byteToFloat(i[1]),a.Color.byteToFloat(i[2]),a.Color.byteToFloat(i[3])):e.fillColor=void 0:e.fillColor=void 0;e.backgroundColor&&e.backgroundColor.rgba?(i=l(i=e.backgroundColor.rgba)).length===a.Color.packedLength?e.backgroundColor=new a.Color(a.Color.byteToFloat(i[0]),a.Color.byteToFloat(i[1]),a.Color.byteToFloat(i[2]),a.Color.byteToFloat(i[3])):e.backgroundColor=void 0:e.backgroundColor=void 0;if(e.horizontalOrigin&&(e.horizontalOrigin=a.HorizontalOrigin[item.horizontalOrigin]),e.verticalOrigin&&(e.verticalOrigin=a.VerticalOrigin[item.verticalOrigin]),e.pixelOffset&&e.pixelOffset.cartesian2){var t=e.pixelOffset.cartesian2;t=l(t),e.pixelOffset=new a.Cartesian2(t[0]||0,t[0]||0)}if(e.position){var n=e.position;if(n.cartesian)n.cartesian=l(n.cartesian),e.position=new a.Cartesian3(n.cartesian[0],n.cartesian[1],n.cartesian[2]||0);else if(n.cartographicDegrees){var r=n.cartographicDegrees;n.cartographicDegrees=l(n.cartographicDegrees),e.position=new a.Cartesian3,e.position=a.Cartesian3.fromDegrees(r[0],r[1],r[2]||0,o._viewer.scene.globe.ellipsoid,e.position)}}if(e.style&&(e.style=a.LabelStyle[e.style]),e.distanceDisplayCondition&&e.distanceDisplayCondition.distanceDisplayCondition){var s=e.distanceDisplayCondition.distanceDisplayCondition;s=l(s),e.distanceDisplayCondition=new a.DistanceDisplayCondition(s[0]||0,s[1]||Number.MAX_VALUE)}function l(e){return e instanceof Array?e:new Array}e.disableDepthTestDistance=Number.MAX_VALUE}"string"==typeof e?a.loadJson(e).then(function(e){i(e)},function(e){console.log(e.message)}):"object"==typeof e&&(e instanceof Array||(e=[e]),i(e)),new a.ScreenSpaceEventHandler(this._viewer.scene.canvas).setInputAction(function(e){var i=e.position,t=o.viewer.scene.pick(i);t&&t.primitive&&t.primitive["pop-up-panorama-map"]&&t.primitive["pop-up-panorama-map"](i)},a.ScreenSpaceEventType.LEFT_CLICK)},a.defineProperties(p.prototype,{viewer:{get:function(){return this._viewer}},container:{get:function(){return this._container}},vm:{get:function(){return this._vm}}}),p});