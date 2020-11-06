define(["libs/common/common","libs/common/defined","libs/common/defaultValue","libs/common/defineProperties","jquery","Cesium","Vue","Bootstrap","views/Container"],function(e,o,t,r,i,a,n,s,d){"use strict";function c(e){e=t(e,{}),this._viewer=t(e.viewer,void 0),this._name=e.name}return c.prototype.addWeiboDotmap=function(e){var o=this;o._viewer.scene.mode=a.SceneMode.SCENE2D,this._dataSource&&this._viewer.dataSources.contains(this._dataSource)&&(this._viewer.dataSources.remove(this._dataSource),this._dataSource=void 0),this._dataSource=new a.GeoJsonDataSource(e),a.loadJson("./resources/json/weibo.json").then(function(e){for(var t={start:0,end:10},r=6,i=t.end-t.start,n=function(e){if(!a.defined(e))throw new a.DeveloperError("time is required.");var o=a.JulianDate.toDate(e).getTime()/r%i+t.start,n=n||10;return!!(o&&this.nameID>o-n&&this.nameID<o)},s=new a.Color(200/255,200/255,0,.8),d=0;d<e[0].length;d+=2)o._dataSource.entities.add({position:a.Cartesian3.fromDegrees(e[0][d].geoCoord[0],e[0][d].geoCoord[1],0),point:{show:!0,color:s,pixelSize:.7}});var c=new a.Color(1,250/255,0,.8),u=new a.Color(1,250/255,0,.9);for(d=0;d<e[1].length;d+=1){o._dataSource.entities.add({position:a.Cartesian3.fromDegrees(e[1][d].geoCoord[0],e[1][d].geoCoord[1],0),point:{show:!0,color:c,pixelSize:.7}}),o._dataSource.entities.add({position:a.Cartesian3.fromDegrees(e[1][d].geoCoord[0],e[1][d].geoCoord[1],1),nameID:10*Math.random(),point:{show:!0,color:u,pixelSize:1.618}}).isAvailable=n}new a.Color(1,250/255,250/255,.6);o._viewer.zoomTo(o._dataSource.entities),o._viewer.dataSources.add(o._dataSource)}).otherwise(function(e){})},c.prototype.removeWeiboDotmap=function(){this._dataSource&&this._viewer.dataSources.contains(this._dataSource)&&(this._viewer.dataSources.remove(this._dataSource),this._dataSource=void 0)},c.prototype.addGPSDotmap=function(){var e=this;this._dataSource&&this._viewer.dataSources.contains(this._dataSource)&&(this._viewer.dataSources.remove(this._dataSource),this._dataSource=void 0);var o=1;!function t(r){if(!(r>=o)){var i="resources/gps/gps_"+r+".bin";a.loadArrayBuffer(i).then(function(o){for(var i=new Int32Array(o),n=new Float32Array(i.length),s=(i.length,new a.Color(200/255,200/255,2/255,.6)),d=0;d<i.length;d+=2)n[d]=i[d+1]/1e7,n[d+1]=i[d]/1e7,e._dataSource.entities.add({position:a.Cartesian3.fromDegrees(n[d],n[d+1],0),point:{show:!0,color:s,pixelSize:.7}});t(r+1)},function(e){})}}(0),e._viewer.dataSources.add(e._dataSource)},r(c.prototype,{viewer:{get:function(){return this._viewer},set:function(e){this._viewer=e}}}),c});