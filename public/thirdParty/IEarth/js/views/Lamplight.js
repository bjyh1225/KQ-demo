define(["text!views/html/Lamplight.html","libs/common/common","libs/common/defined","libs/common/defaultValue","libs/common/defineProperties","jquery","jqueryShare","Cesium","Vue"],function(t,e,o,i,r,n,a,c,l){var g={lightIntensity:"强度",color:"颜色",cutoffDistance:"扩散距离",decayFactor:"衰减因子",transparency:"透明度",fillSize:"符号",pointLight:"点光源",carLight:"平行光",angle:"角度",add:"添加",clear:"清除"};for(var h in g)g[h]=window.platformLanguage[h]?window.platformLanguage[h]:g[h];var s={viewer:void 0,isPointLight:!1,isCarLight:!1,showPoint:!1,lightEnabled:!1,point_color:"#ffffff",cutoffDistance:7,pointPosition:c.Cartesian3.fromDegrees(116.3917,39.907,4),decay:.03,lightIntensity:3,pointSize:10},d={lightEnabled:!1,enabled:!1,angle:100.17,cutoffDistance:19,decay:.011,lightIntensity:7.86,colorFont:"#ffffff",color:c.Color.fromCssColorString("#ffffff")},p=[{icon:"iconfont icon-guanglight56",font:"点光源",mode:"pointLight"},{icon:"iconfont icon-dengguang",font:"聚光灯",mode:"projectorLight"}];function f(e){e=i(e,{}),this._viewer=i(e.viewer,null),this._parentContainer=i(e.parentContainer,"cesiumContainer"),"string"==typeof this._parentContainer&&(this._parentContainer=n("#"+this._parentContainer)),this._parentContainer.append(t),this._vm=null,this.elevationType=void 0,this._id=c.createGuid(),s.viewer=this._viewer,d.viewer=this._viewer,this.initialize()}return f.prototype.initialize=function(){var t=this;t._viewer.scene.globe.depthTestAgainstTerrain=!0,t._vm=new l({el:".lamplight_module",data:{guid:t._id,titles:g,viewModel_point:s,viewModel_projector:d,lamplist:p,onProjectorLight:!1,onPointLight:!0,onParallelLight:!1,pointLight:void 0,projectorLight:void 0,position:void 0,handler:void 0,target:void 0},methods:{changeLightStrength:function(){t.pointLight&&(t.pointLight.lightIntensity=Number(this.viewModel_point.lightIntensity))},changeLightDiffusionDiatance:function(){t.pointLight&&(t.pointLight.cutoffDistance=Number(this.viewModel_point.cutoffDistance))},changeLightDecayFactor:function(){t.pointLight&&(t.pointLight.decay=Number(this.viewModel_point.decay))},changeProjectorStrength:function(){t.projectorLight&&(t.projectorLight.lightIntensity=Number(this.viewModel_projector.lightIntensity))},changeProjectornDiatance:function(){t.projectorLight&&(t.projectorLight.cutoffDistance=Number(this.viewModel_projector.cutoffDistance))},changeProjectornAngle:function(){t.projectorLight&&(t.projectorLight.angle=Number(this.viewModel_projector.angle))},changeProjectorDeacy:function(){t.projectorLight&&(t.projectorLight.decay=Number(this.viewModel_projector.decay))},onPointAnlayse:function(){var e=t._viewer;t.handler&&t.handler.setInputAction(function(o){var i=t.getPickPosition(o.position,e.scene);if(i&&t.pointLight&&t.onPointLight){t.pointLight.lightEnabled=!0,t.pointLight.pointPosition=i;var r=c.Cartesian3.clone(i);r.y=r.y+8,r.x=r.x-1,r.z=r.z+7,t.point?t.point.position.setValue(r):t.point=e.entities.add({position:r,ellipsoid:{radii:new c.Cartesian3(1,1,1),fill:!0,material:c.Color.White}})}if(i&&t.onProjectorLight)if(t.projectorLight){t.projectorLight.lightEnabled=!0,t.projectorLight.enabled=!0;var n=45,a=c.Cartesian3.clone(i),l=c.HeadingPitchRoll.fromDegrees(-209+n,90,0),g=c.Transforms.headingPitchRollToFixedFrame(a,l),h=c.Matrix4.clone(g);t.projectorLight.lights.forEach(t=>{c.Matrix4.clone(h,t.modelMatrix)}),t.projectorLamp.modelMatrix=h}else{var s=[{name:"1号点",coords:[0,0],heading:0}],p=(n=45,new c.Cartesian3(-1,.4,0)),f=new c.Cartesian3(9.45,1.307,-.039);s.forEach(t=>{var e=i,o=c.HeadingPitchRoll.fromDegrees(-209+t.heading,90,0),r=c.Transforms.headingPitchRollToFixedFrame(e,o);t.offset=f,t.direction=p,t.modelMatrix=r}),s.forEach(o=>{t.projectorLamp=e.scene.primitives.add(c.Model.fromGltf({url:"./resources/models/gltf/ludeng2/P0XP053.gltf",modelMatrix:o.modelMatrix})),e.scene.primitives.add(new c.DebugModelMatrixPrimitive({modelMatrix:o,length:3,width:1}))});a=c.Cartesian3.clone(i),l=c.HeadingPitchRoll.fromDegrees(-209+n,90,0),g=c.Transforms.headingPitchRollToFixedFrame(a,l),h=c.Matrix4.clone(g);s.forEach(t=>{c.Matrix4.clone(h,t.modelMatrix)}),t.projectorLamp.modelMatrix=h,d.lights=s,d.lightEnabled=!0,d.enabled=!0,t.projectorLight=new c.Kq3dSpotLight(d),e.effects.add(t.projectorLight)}},c.ScreenSpaceEventType.LEFT_CLICK)},onClear:function(){if(t.pointLight){var e=t._viewer;t.pointLight.lightEnabled=!1,t.pointLight.showPoint=!1,t.projectorLight&&e.effects.remove(t.projectorLight),t.point&&e.entities.remove(t.point),t.projectorLamp&&e.scene.primitives.remove(t.projectorLamp),t.point=void 0,t.projectorLight=void 0,t.projectorLamp=void 0}},selectSymble:function(e,o){var i=e;if(this.target!=i){if(i){var r=i.parentNode.parentNode,a=n(r)[0].children[0].children[0];if(n(a).css("color","#ffffff  !important"),this.target){var c=this.target.parentNode.parentNode,l=n(c)[0].children[0].children[0];n(l).css("color","rgb(169, 151, 151) !important")}"pointLight"==o&&(this.onPointLight=!0,this.onProjectorLight=!1,this.onParallelLight=!1,t.onPointLight=!0,t.onProjectorLight=!1,t.onParallelLight=!1),"projectorLight"==o&&(this.onPointLight=!1,this.onProjectorLight=!0,this.onParallelLight=!1,t.onPointLight=!1,t.onProjectorLight=!0,t.onParallelLight=!1),"parallelLight"==o&&(t.onPointLight=!1,t.onProjectorLight=!1,t.onParallelLight=!0)}this.target=i}}},mounted:function(){var e=t._viewer,o=void 0,i=[{name:"1号点",coords:[0,0],heading:0}],r=new c.Cartesian3(-1,.4,0),n=new c.Cartesian3(9.45,1.307,-.039);i.forEach(t=>{var e=c.Cartesian3.fromDegrees(t.coords[0],t.coords[1]),o=c.HeadingPitchRoll.fromDegrees(-209+t.heading,90,0),i=c.Transforms.headingPitchRollToFixedFrame(e,o);t.offset=n,t.direction=r,t.modelMatrix=i}),i.forEach(t=>{o=e.scene.primitives.add(c.Model.fromGltf({url:"./resources/models/gltf/ludeng2/P0XP053.gltf",modelMatrix:t.modelMatrix})),e.scene.primitives.add(new c.DebugModelMatrixPrimitive({modelMatrix:t,length:3,width:1}))});var a=new c.Kq3dPointLight(s);d.lights=i;var l=new c.Kq3dSpotLight(d);e.effects.add(l),t.renderPlugins(),t.pointLight=a,t.projectorLight=l,t.projectorLamp=o;var g=new c.ScreenSpaceEventHandler(e.scene.canvas);t.handler=g}}),t.updateColorValueWithColorChange()},f.prototype.updateColorValueWithColorChange=function(){var t=this;n("#pointlight_color_"+t._vm.guid).bind("change",function(e){t.pointLight&&(t._vm.viewModel_point.point_color=e.target.value,t.pointLight.color=c.Color.fromCssColorString(e.target.value))}),n("#Projector_color_"+t._vm.guid).bind("change",function(e){t.projectorLight&&(t._vm.viewModel_projector.colorFont=e.target.value,d.color=c.Color.fromCssColorString(e.target.value),t.projectorLight.color=c.Color.fromCssColorString(e.target.value))})},f.prototype.getPickPosition=function(t,e){return cartesian=e.pickPosition(t),c.defined(cartesian)||(cartesian=e.camera.pickEllipsoid(t,e.globe.ellipsoid)),cartesian},f.prototype.renderPlugins=function(){n(".color-selector").each(function(){var t=this;n(t).ColorPicker({color:"#0000ff",onShow:function(t){return n(t).fadeIn(500),!1},onHide:function(t){return n(t).fadeOut(500),!1},onChange:function(e,o,i){n(t).css("backgroundColor","#"+o),t.value="#"+o,n(t).change();var r=255-i.r,a=255-i.g,c=255-i.b;n(t).css("color","rgba("+r+","+a+","+c+")"),n(t).parent().find(".caret").eq(0).css("border-top-color","rgba("+r+","+a+","+c+")");var l="rgba("+i.r+","+i.g+","+i.b+",0)",g="rgb("+i.r+", "+i.g+", "+i.b+")";n(t).parent().parent().parent().find("input[type=range]").eq(0).css("background","linear-gradient(to right, "+l+", "+g+")").css("background","-moz-linear-gradient(left, "+l+", "+g+")")}})})},r(f.prototype,{vm:{get:function(){return this._vm}}}),f});