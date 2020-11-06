define(["text!views/html/FloodModelAnalyse.html","libs/common/common","libs/common/defined","libs/common/defaultValue","libs/common/defineProperties","jquery","jqueryShare","Cesium","Vue"],function(e,o,l,i,t,a,n,d,r){var s={selectTilesData:"选择数据",floodSpeed:"淹没速度(m/s)",floodMinHeight:"最小高度(m)",floodMaxHeight:"最大高度(m)",floodAlpha:"透明度",floodMoveMode:"淹没形式",floodMoveMode0:"单向淹没",floodMoveMode1:"双向淹没",floodColorImage:"淹没颜色",start:"开始",clear:"清除"};for(var f in s)s[f]=window.platformLanguage[f]?window.platformLanguage[f]:s[f];var m={speed:1,minHeight:1,maxHeight:26,alpha:.45,moveMode:0,colorImage:"images/colorTable/colpick_slider.png",tilesData:cesiumContainerVue.tilesData,curTilesData:"0"};function c(o){o=i(o,{}),this._viewer=i(o.viewer,null),this._parentContainer=i(o.parentContainer,"cesiumContainer"),"string"==typeof this._parentContainer&&(this._parentContainer=a("#"+this._parentContainer)),this._parentContainer.append(e),m.viewer=o.viewer,m.parentContainer=o.parentContainer,this._vm=null,this.initialize()}return c.prototype.initialize=function(){var e=this;e._vm=new r({el:".flood_model_analysise_module",data:{guid:e._id,titles:s,floodModelAnalyse:m},methods:{changeFloodSpeed:function(){e.floodModel&&(e.floodModel.speed=Number(this.floodModelAnalyse.speed))},changeFlooddMinHeight:function(){e.floodModel&&(e.floodModel.minHeight=Number(this.floodModelAnalyse.minHeight))},changeFloodMaxHeight:function(){e.floodModel&&(e.floodModel.maxHeight=Number(this.floodModelAnalyse.maxHeight))},changeFloodAlpha:function(){e.floodModel&&(e.floodModel.alpha=Number(this.floodModelAnalyse.alpha))},changeMoveMode:function(o){this.floodModelAnalyse.moveMode=o.target.value,e.floodModel&&(e.floodModel.moveMode=Number(o.target.value))},changeFloodColorImage:function(o){var l="";switch(o.target.value){case"0":l="images/colorTable/colpick_slider.png";break;case"1":l="images/colorTable/colors1.png";break;case"2":l="images/colorTable/green-blue.png"}this.floodModelAnalyse.colorImage=l,e.floodModel&&(e.floodModel.colorImage=l)},startAnalysis:function(){if(1==this.floodModelAnalyse.tilesData.length)alert("请添加Cesium3DTileset数据！");else{var o=this.floodModelAnalyse.curTilesData;if("0"===o)alert("请选择Cesium3DTileset数据！");else{var l=e._viewer.scene.primitives.getPrimitiveByGuid(o);if(!l)return void alert("请选择Cesium3DTileset数据！");e.floodModel?(e.floodModel.center=l.boundingSphere.center,e.floodModel.start()):(this.floodModelAnalyse.center=l.boundingSphere.center,e.floodModel=new d.Kq3dFloodModelAnalysis(this.floodModelAnalyse),e.floodModel.start()),e._viewer.flyTo(l)}}},clearAnalysis:function(){e.floodModel&&e.floodModel.reset()}}})},t(c.prototype,{vm:{get:function(){return this._vm}}}),c});