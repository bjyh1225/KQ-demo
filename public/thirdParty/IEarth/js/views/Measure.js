define(["text!views/html/Measure.html","libs/common/common","libs/common/defined","libs/common/defaultValue","libs/common/defineProperties","jquery","Vue","Bootstrap","views/Container","views/Enum","Cesium"],function(e,t,n,s,a,i,r,u,o,l,m){"use strict";var h={measureCoordination:"坐标测量",measureHorizontalDistance:"水平距离",measureTerrainDistance:"地表距离",measureVerticalDistance:"垂直距离",measureSpaceDistance:"空间距离",measureComplexDistance:"复杂距离",measureArea:"投影面积",measureTerrainArea:"地表面积",measureAzimuth:"方位角",measureStop:"结束测量",measureClear:"清除测量结果",longitude:"经度",latitude:"纬度",altitude:"海拔/高程",length:"长度",heading:"朝向",height:"高度",hDistance:"水平距离",vDistance:"垂直距离",sDistance:"空间距离",circumference:"周长",area:"面积",azimuth:"方位角",mUnit:"米",kmUnit:"公里",sqkmUnit:"平方公里",sqmUnit:"平方米",measureModalTitle:"提示",measureModalContent:""};for(var c in h)h[c]=window.platformLanguage[c]?window.platformLanguage[c]:h[c];function d(a){var i;a=s(a,{}),this._viewer=s(a.viewer,null),this._parentContainer=s(a.parentContainer,"cesiumContainer"),this._title=s(window.platformLanguage.measure,"量测"),this._content=s(e,""),this._shown=s(a.shown,!0),this._showHeader=s(a.showHeader,!1),this._showTitle=s(a.showTitle,!0),this._showCloseBtn=s(a.showCloseBtn,!0),this._style=s(a.style,{position:"absolute",top:"0",left:"0",margin:"0",width:"auto"}),this._bodyStyle=s(a.bodyStyle,{margin:0,padding:0}),this._container=null,this._vm=null,this.initialize(a),this._measureHandler=new m.MeasureHandler(this._viewer),(i=this)._measureHandler.measureEvent.addEventListener(function(e){switch(i._measureHandler.mode){case m.MeasureMode.Coordinate:i._vm.results.longitude=t.degree2DuFenMiao(e.coordinate.longitude).text,i._vm.results.latitude=t.degree2DuFenMiao(e.coordinate.latitude).text;var s=_(e.coordinate.height,3);i._vm.results.altitude=s.length,i._vm.units.lengthUnit="m"==s.unit?h.mUnit:h.kmUnit;break;case m.MeasureMode.Distance:case m.MeasureMode.HorizontalDistance:case m.MeasureMode.TerrainDistance:s=_(e.distance,3),i._vm.results.length=s.length,i._vm.units.lengthUnit="m"==s.unit?h.mUnit:h.kmUnit;break;case m.MeasureMode.VerticalDistance:s=_(e.distance,3),i._vm.results.height=s.length,i._vm.units.lengthUnit="m"==s.unit?h.mUnit:h.kmUnit;break;case m.MeasureMode.ComplexDistance:s=_(e.hDistance,3),i._vm.results.length=s.length,i._vm.units.lengthUnit="m"==s.unit?h.mUnit:h.kmUnit,s=_(e.vDistance,3),i._vm.results.height=s.length,i._vm.units.lengthUnit="m"==s.unit?h.mUnit:h.kmUnit,s=_(e.distance,3),i._vm.results.distance=s.length,i._vm.units.lengthUnit="m"==s.unit?h.mUnit:h.kmUnit;break;case m.MeasureMode.Area:case m.MeasureMode.HorizontalArea:case m.MeasureMode.EllipesoidArea:var a=(r=e.area,o="sqrm",r>1e6&&(r/=1e6,o="sqrkm"),{unit:o,area:n(u=3)?r.toFixed(u):r});i._vm.results.area=a.area,i._vm.units.areaUnit="sqrm"==a.unit?h.sqmUnit:h.sqkmUnit,s=_(e.perimeter,3),i._vm.results.circumference=s.length,i._vm.units.lengthUnit="m"==s.unit?h.mUnit:h.kmUnit;break;case m.MeasureMode.Azimuth:i._vm.results.azimuth=t.degree2DuFenMiao(e.azimuth).text}var r,u,o})}function M(e){for(var t in e)e[t]=0}function _(e,t){var s="m";return e>5e3&&(e/=1e3,s="km"),{unit:s,length:n(t)?e.toFixed(t):e}}return d.prototype.initialize=function(e){var t=this,n={parentContainer:this._parentContainer,title:this._title,content:this._content,shown:this._shown,showHeader:this._showHeader,showTitle:this._showTitle,showCloseBtn:this._showCloseBtn,style:this._style,bodyStyle:this._bodyStyle,draggable:!0};this._container=new o(n),this._container.onClose=function(){t._measureHandler&&t._measureHandler.stopMeasure()};var s={lengthUnit:h.mUnit,areaUnit:h.sqmUnit},a=l.eMeasureType;this._vm=new r({el:".module-measure-content",data:{titles:h,results:{longitude:"0",latitude:"0",altitude:0,length:0,heading:0,height:0,distance:0,circumference:0,area:0,azimuth:0},units:s,measureType:a.Coordination,measureTypeEnum:a,message:"Hello Vue!"},methods:{onMeasureCoordinationBtnClk:function(e){M(this.results),this.measureType=a.Coordination,t._measureHandler.startMeasure(m.MeasureMode.Coordinate)},onMeasureHorizontalDistanceBtnClk:function(e){M(this.results),this.measureType=a.HorizontalDistance,t._measureHandler.startMeasure(m.MeasureMode.HorizontalDistance)},onMeasureTerrainDistanceBtnClk:function(e){M(this.results),this.measureType=a.TerrainDistance,t._measureHandler.startMeasure(m.MeasureMode.TerrainDistance)},onMeasureVerticalDistanceBtnClk:function(e){M(this.results),this.measureType=a.VerticalDistance,t._measureHandler.startMeasure(m.MeasureMode.VerticalDistance)},onMeasureSpaceDistanceBtnClk:function(e){M(this.results),this.measureType=a.SpaceDistance,t._measureHandler.startMeasure(m.MeasureMode.Distance)},onMeasureComplexDistanceBtnClk:function(e){M(this.results),this.measureType=a.ComplexDistance,t._measureHandler.startMeasure(m.MeasureMode.ComplexDistance)},onMeasureAreaBtnClk:function(e){M(this.results),this.measureType=a.HorizontalArea,t._measureHandler.startMeasure(m.MeasureMode.HorizontalArea)},onMeasureTerrainAreaBtnClk:function(e){M(this.results),this.measureType=a.TerrainArea,i("#measureModalContent").html(this.titles.measureTerrainArea)},onMeasureAzimuthBtnClk:function(e){M(this.results),this.measureType=a.Azimuth,t._measureHandler.startMeasure(m.MeasureMode.Azimuth)},onMeasureStopBtnClk:function(e){t._measureHandler.stopMeasure()},onMeasureClearBtnClk:function(e){t._measureHandler.clear(),M(this.results)}}})},a(d.prototype,{container:{get:function(){return this._container}},vm:{get:function(){return this._vm}},shown:{get:function(){return this._container.shown},set:function(e){this._container.shown=e}}}),d});