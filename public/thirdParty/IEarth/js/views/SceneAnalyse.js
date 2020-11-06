define(["text!views/html/SceneAnalyse.html","libs/common/common","libs/common/defined","libs/common/defaultValue","libs/common/defineProperties","jquery","Cesium","Vue","views/Container","views/Lamplight","views/Camera","views/BaseSettings"],function(e,t,i,n,a,s,o,l,r,h,c,m){"use strict";var w=t.newGuid(),g={title:"场景",basicSettings:"基础设置",lamplight:"灯光",camera:"相机",otherSettings:"其他设置"};for(var _ in g)g[_]=window.platformLanguage[_]?window.platformLanguage[_]:g[_];var d=[{title:g.basicSettings||"基础设置",name:g.basicSettings||"基础设置",liClassName:"active",id:"basicSettings_"+w,type:"basicSettings"},{title:g.lamplight||"相机",name:g.lamplight||"灯光",liClassName:"",id:"lamplight_"+w,type:"lamplight"},{title:g.camera||"相机",name:g.camera||"相机",liClassName:"",id:"camera_"+w,type:"camera"},{title:g.otherSettings||"其他设置",name:g.otherSettings||"其他设置",liClassName:"",id:"otherSettings_"+w,type:"otherSettings"}];function u(t){t=n(t,{}),this._viewer=n(t.viewer,null),this._parentContainer=n(t.parentContainer,"cesiumContainer"),this._title=n(t.title,"场景"),this._content=n(e,""),this._shown=n(t.shown,!0),this._showHeader=n(t.showHeader,!0),this._showTitle=n(t.showTitle,!0),this._showCloseBtn=n(t.showCloseBtn,!0),this._style=n(t.style,{position:"absolute",top:"140",right:"65",margin:"0",width:"370"}),this._style.zIndex=999,this._bodyStyle=n(t.bodyStyle,{padding:"5px",margin:0}),this._draggable=n(t.draggable,!0),this._container=null,this._vm=null,this._id=w,this.initialize(t)}return u.prototype.initialize=function(e){var t=this,i=n(e.parentContainer,"cesiumContainer");t._parentContainer=n(i,""),t._viewer=n(e.viewer,null);var a={parentContainer:t._parentContainer,title:t._title,content:t._content,shown:t._shown,showHeader:t._showHeader,showTitle:t._showTitle,showCloseBtn:t._showCloseBtn,style:t._style,bodyStyle:t._bodyStyle,draggable:t._draggable};t._container=new r(a),t._vm=new l({el:".module-scene-analysist-content",data:{guid:t._id,titles:g,sceneAnalyseText:d},methods:{},mounted:function(){d.forEach(function(e,i){var n={viewer:t._viewer,parentContainer:e.id};switch(e.type){case"basicSettings":new m(n);break;case"lamplight":new h(n);break;case"camera":new c(n)}})}})},a(u.prototype,{container:{get:function(){return this._container}},vm:{get:function(){return this._vm}},shown:{get:function(){return this._container.shown},set:function(e){this._container.shown=e}}}),u});