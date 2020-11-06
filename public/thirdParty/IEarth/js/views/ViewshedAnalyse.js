define(["text!views/html/ViewshedAnalyse.html","libs/common/common","libs/common/defined","libs/common/defaultValue","libs/common/defineProperties","jquery","jqueryShare","Cesium","Vue"],function(e,i,o,n,s,r,t,a,d){var h={FovH:"水平张角",FovV:"垂直张角",offsetHeight:"视点高",visibleColor:"可见颜色",invisibleColor:"不可见颜色",showGridLine:"显示网格线",start:"开始",clear:"清除"};for(var l in h)h[l]=window.platformLanguage[l]?window.platformLanguage[l]:h[l];var v={fovH:120,fovV:60,offsetHeight:1.8,visibleColor:"#00ff00",invisibleColor:"#ff0000",showGridLine:!0};function c(i){i=n(i,{}),this._viewer=n(i.viewer,null),this._parentContainer=n(i.parentContainer,"cesiumContainer"),"string"==typeof this._parentContainer&&(this._parentContainer=r("#"+this._parentContainer)),this._parentContainer.append(e),this._vm=null,a.Kq3dViewshedMixin(this._viewer.scene),this._viewer.scene.kq3dViewshed.fovH=a.Math.toRadians(v.fovH),this._viewer.scene.kq3dViewshed.fovV=a.Math.toRadians(v.fovV),this._viewer.scene.kq3dViewshed.offsetHeight=v.offsetHeight,this._viewer.scene.kq3dViewshed.visibleColor=a.Color.fromCssColorString(v.visibleColor),this._viewer.scene.kq3dViewshed.invisibleColor=a.Color.fromCssColorString(v.invisibleColor),this._viewer.scene.kq3dViewshed.showGridLine=v.showGridLine,this.initialize()}return c.prototype.initialize=function(){var e=this;e._vm=new d({el:".viewshed_analysise_module",data:{guid:e._id,titles:h,viewshedAnalyse:v},methods:{changeFovH:function(){e._viewer.scene.kq3dViewshed.fovH=a.Math.toRadians(Number(this.viewshedAnalyse.fovH))},changeFovV:function(){e._viewer.scene.kq3dViewshed.fovV=a.Math.toRadians(Number(this.viewshedAnalyse.fovV))},changeOffsetHeight:function(){e._viewer.scene.kq3dViewshed.offsetHeight=Number(this.viewshedAnalyse.offsetHeight)},showGridLine:function(i){e._viewer.scene.kq3dViewshed.showGridLine=i.target.checked},startAnalysis:function(){r("#showGridLine").get(0).checked=!0,a.defined(e._viewer.scene.kq3dViewshed)&&(e._viewer.scene.kq3dViewshed=void 0),a.Kq3dViewshedMixin(e._viewer.scene),e._viewer.scene.kq3dViewshed.fovH=a.Math.toRadians(this.viewshedAnalyse.fovH),e._viewer.scene.kq3dViewshed.fovV=a.Math.toRadians(this.viewshedAnalyse.fovV),e._viewer.scene.kq3dViewshed.offsetHeight=this.viewshedAnalyse.offsetHeight,e._viewer.scene.kq3dViewshed.visibleColor=a.Color.fromCssColorString(this.viewshedAnalyse.visibleColor),e._viewer.scene.kq3dViewshed.invisibleColor=a.Color.fromCssColorString(this.viewshedAnalyse.invisibleColor),e._viewer.scene.kq3dViewshed.showGridLine=this.viewshedAnalyse.showGridLine,e._viewer.scene.kq3dViewshedCreatingAction.start()},stopAnalysis:function(){e._viewer.scene.kq3dViewshedCreatingAction.cancel()}},mounted:function(){e.renderPlugins()}}),e.updateColorValueWithColorChange()},c.prototype.updateColorValueWithColorChange=function(){var e=this;r("#visible_color_"+e._vm.guid).bind("change",function(i){e._vm.viewshedAnalyse.visibleColor=i.target.value,e._viewer.scene.kq3dViewshed.visibleColor=a.Color.fromCssColorString(i.target.value)}),r("#invisible_color_"+e._vm.guid).bind("change",function(i){e._vm.viewshedAnalyse.invisibleColor=i.target.value,e._viewer.scene.kq3dViewshed.invisibleColor=a.Color.fromCssColorString(i.target.value)})},c.prototype.renderPlugins=function(){r(".color-selector").each(function(){var e=this;r(e).ColorPicker({color:"#0000ff",onShow:function(e){return r(e).fadeIn(500),!1},onHide:function(e){return r(e).fadeOut(500),!1},onChange:function(i,o,n){r(e).css("backgroundColor","#"+o),e.value="#"+o,r(e).change();var s=255-n.r,t=255-n.g,a=255-n.b;r(e).css("color","rgba("+s+","+t+","+a+")"),r(e).parent().find(".caret").eq(0).css("border-top-color","rgba("+s+","+t+","+a+")");var d="rgba("+n.r+","+n.g+","+n.b+",0)",h="rgb("+n.r+", "+n.g+", "+n.b+")";r(e).parent().parent().parent().find("input[type=range]").eq(0).css("background","linear-gradient(to right, "+d+", "+h+")").css("background","-moz-linear-gradient(left, "+d+", "+h+")")}})})},s(c.prototype,{vm:{get:function(){return this._vm}}}),c});