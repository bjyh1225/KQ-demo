define(["text!views/html/BoxClip.html","libs/common/common","libs/common/defined","libs/common/defaultValue","libs/common/defineProperties","jquery","jqueryShare","Cesium","Vue"],function(i,e,o,n,r,t,l,a,u){var c={selectTilesData:"选择数据",clipLength:"裁剪长度",clipWidth:"裁剪宽度",clipHeight:"裁剪高度",clipRotation:"裁剪旋转角",clipPattern:"裁剪方式",insideClip:"内部裁剪",outsideClip:"外部裁剪",clipEdgeWidth:"边框宽度",clipEdgeColor:"边框颜色",start:"开始",reset:"重置",clear:"清除"};for(var C in c)c[C]=window.platformLanguage[C]?window.platformLanguage[C]:c[C];var s={clipType:1,axisX:10,axisY:10,axisZ:10,angle:90,unionClippingRegions:!1,clipEdgeColor:"#b6c208",clipEdgeWidth:4,boxEnable:!0,enable:!0,paddingFill:!0,paddingFillColor:a.Color.fromCssColorString("#1c6920"),paddingFillColorLabel:a.Color.fromCssColorString("#1c6920"),paddingFillColorAlpha:.7,paddingStroke:!0,paddingStrokeColor:a.Color.fromCssColorString("#dd2bff"),paddingStrokeColorLabel:a.Color.fromCssColorString("#dd2bff"),paddingStrokeColorAlpha:1,paddingStrokeSize:7,paddingStrokeSoftSize:2,paddingStrokeDirection:30,paddingStrokeSpace:7,tilesData:cesiumContainerVue.tilesData,curTilesData:"0"};function p(e){e=n(e,{}),this._viewer=n(e.viewer,null),this._parentContainer=n(e.parentContainer,"cesiumContainer"),"string"==typeof this._parentContainer&&(this._parentContainer=t("#"+this._parentContainer)),this._parentContainer.append(i),s.viewer=this._viewer,this._vm=null,this.initialize()}return p.prototype.initialize=function(){var i=this;i._vm=new u({el:".boxClip_module",data:{guid:i._id,titles:c,boxClip:s},methods:{changeClipLength:function(){cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.axisX=Number(this.boxClip.axisX))},changeClipWidth:function(){cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.axisY=Number(this.boxClip.axisY))},changeClipHeight:function(){cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.axisZ=Number(this.boxClip.axisZ))},changeClipRotation:function(i){cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.angle=Number(this.boxClip.angle))},changeClipEdgeWidth:function(i){cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.clipEdgeWidth=Number(this.boxClip.clipEdgeWidth))},changeClipPattern:function(i){"0"==i.target.value?(this.boxClip.unionClippingRegions=!1,cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.unionClippingRegions=!1)):(this.boxClip.unionClippingRegions=!0,cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.unionClippingRegions=!0))},start:function(){if(1==this.boxClip.tilesData.length)alert("请添加Cesium3DTileset数据！");else{var e=this.boxClip.curTilesData;if("0"===e)alert("请选择Cesium3DTileset数据！");else{var o=i._viewer.scene.primitives.getPrimitiveByGuid(e);if(!o)return void alert("请选择Cesium3DTileset数据！");cesiumContainerVue.curBoxClip?(cesiumContainerVue.curBoxClip.tileset=o,cesiumContainerVue.curBoxClip.reset()):(this.boxClip.tileset=o,cesiumContainerVue.curBoxClip=new a.Kq3dBoxClip(this.boxClip),cesiumContainerVue.curBoxClip.clipEdgeColor=a.Color.fromCssColorString(this.boxClip.clipEdgeColor)),i._viewer.flyTo(o),cesiumContainerVue.curBoxClipPrimitiveId=e}}},reset:function(){i.resetBoxClipData()},clear:function(){cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.enable=!1)}},mounted:function(){i.renderPlugins()}}),i.updateColorValueWithColorChange(),new a.ScreenSpaceEventHandler(i._viewer.scene.canvas).setInputAction(function(e){var o=i._viewer.scene.pickPosition(e.position);o&&cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.position=o)},a.ScreenSpaceEventType.LEFT_CLICK)},p.prototype.resetBoxClipData=function(){this._vm.boxClip.axisX=17,this._vm.boxClip.axisY=3,this._vm.boxClip.axisZ=3,this._vm.boxClip.angle=90,this._vm.boxClip.clipEdgeWidth=4,this._vm.boxClip.clipEdgeColor="#b6c208",t("#clipPattern").get(0).selectedIndex=0,cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.axisX=17,cesiumContainerVue.curBoxClip.axisY=3,cesiumContainerVue.curBoxClip.axisZ=3,cesiumContainerVue.curBoxClip.angle=90,cesiumContainerVue.curBoxClip.clipEdgeWidth=4,cesiumContainerVue.curBoxClip.clipEdgeColor=a.Color.fromCssColorString("#b6c208"),cesiumContainerVue.curBoxClip.unionClippingRegions=!1)},p.prototype.updateColorValueWithColorChange=function(){var i=this;t("#clipEdge_color_"+i._vm.guid).bind("change",function(e){i._vm.boxClip.clipEdgeColor=e.target.value,cesiumContainerVue.curBoxClip&&(cesiumContainerVue.curBoxClip.clipEdgeColor=a.Color.fromCssColorString(e.target.value))})},p.prototype.renderPlugins=function(){t(".color-selector").each(function(){var i=this;t(i).ColorPicker({color:"#0000ff",onShow:function(i){return t(i).fadeIn(500),!1},onHide:function(i){return t(i).fadeOut(500),!1},onChange:function(e,o,n){t(i).css("backgroundColor","#"+o),i.value="#"+o,t(i).change();var r=255-n.r,l=255-n.g,a=255-n.b;t(i).css("color","rgba("+r+","+l+","+a+")"),t(i).parent().find(".caret").eq(0).css("border-top-color","rgba("+r+","+l+","+a+")");var u="rgba("+n.r+","+n.g+","+n.b+",0)",c="rgb("+n.r+", "+n.g+", "+n.b+")";t(i).parent().parent().parent().find("input[type=range]").eq(0).css("background","linear-gradient(to right, "+u+", "+c+")").css("background","-moz-linear-gradient(left, "+u+", "+c+")")}})})},r(p.prototype,{vm:{get:function(){return this._vm}}}),p});