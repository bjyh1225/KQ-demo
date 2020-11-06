define(["libs/common/common","config","jquery","Vue","Bootstrap","views/Container","Cesium"],function(e,t,o,n,i,a,r){"use strict";var u={};for(var s in u)u[s]=window.platformLanguage[s]?window.platformLanguage[s]:u[s];var c=[];function l(t){t=r.defaultValue(t,{}),this._viewer=r.defaultValue(t.viewer,null),this._id=e.newGuid()}return l.prototype.loadCzmlMarkers=function(){var e=this,n=[];o.ajax({url:t.paths.moving,type:"GET",dataType:"json",success:function(t){n=t,e._viewer.dataSources.add(r.CzmlDataSource.load(n,{name:"hotSpot"})).then(function(t){t.show=!1,t.entities.values.forEach(function(e){e.orientation=new r.VelocityOrientationProperty(e.position)}),e.updateMovings(t.entities,e._viewer)})},error:function(e){console.log(e)}}),o.ajax({url:t.paths.moving2,type:"GET",dataType:"json",success:function(t){n=t,e._viewer.dataSources.add(r.CzmlDataSource.load(n,{name:"hotSpot"})).then(function(e){e.show=!1,e.entities.values.forEach(function(e){e.orientation=new r.VelocityOrientationProperty(e.position)})})},error:function(e){console.log(e)}}),o.ajax({url:t.paths.markers,type:"GET",dataType:"json",success:function(t){n=t;var o=void 0;e._viewer.dataSources.add(r.CzmlDataSource.load(n,{name:"hotSpot"})).then(function(t){t.show=!1,t.show&&e.updateMarkers(t.entities),o=t,Object.defineProperty(t,"show",{get:function(){return this._entityCollection.show},set:function(o){this._entityCollection.show=o,o?e.updateMarkers(t.entities):c.forEach(function(e){clearTimeout(e)})}})}),e._viewer.dataSources.dataSourceRemoved.addEventListener(function(e,t){o==t&&c.forEach(function(e){clearTimeout(e)})},{})},error:function(e){console.log(e)}})},l.prototype.updateMarkers=function(e){e.values.forEach(function(e,t){!function e(t,o,n){void 0===n&&(n=500);if(!t.label)return;t.label.text=t.label.text.getValue().split("--")[0]+"--"+parseInt(10*Math.random())+parseInt(10*Math.random()),t.time=r.defined(t.time)?t.time+n:n,t.time%(12*n)&&(t.label.backgroundColor=r.Color.fromRandom({alpha:185}),t.time=0);c[o]=setTimeout(function(){e(t,o,n)},n)}(e,t,500)})},l.prototype.updateMovings=function(e,t){e.values.forEach(function(e){!function(e,o){void 0===o&&(o=500);e.label&&t.timeline._clock.onTick.addEventListener(function(o){var n=e.position.getValueInReferenceFrame(o.currentTime,r.ReferenceFrame.FIXED),i=new r.Cartographic;r.Cartographic.fromCartesian(n,t.scene.globe.ellipsoid,i);var a=r.Math.toDegrees(i.longitude).toFixed(5),u=r.Math.toDegrees(i.latitude).toFixed(5),s=i.height.toFixed(5);e.label.text="X: "+a+"\nY: "+u+"\nZ: "+s})}(e,200)})},r.defineProperties(l.prototype,{}),l});