var globalViewer=null,ContainerCollection={},cesiumContainerVue=void 0,lang="zh-CN";function onLoadSuccess(e,n){var i="undefined"!=typeof window?window:"undefined"!=typeof self?self:{};i.Cesium=e,i.$=n;var a=null,t=new e.SingleTileImageryProvider({url:"./images/baseImage.png",credit:"Global Basic Image"});e.FeatureDetection.isPCBrowser()?((a=new e.Viewer("cesiumContainer",{imageryProvider:t,animation:!0,timeline:!0,baseLayerPicker:!1,geocoder:!1,shadows:!0,homeButton:!1,sceneModePicker:!0,navigationHelpButton:!1,fullscreenButton:!0,vrButton:!1,shouldAnimate:!0,languageStyle:lang,sceneModePicker:!1,fullscreenButton:!1})).animation.container.style.visibility="hidden",a.timeline.container.style.visibility="hidden",a.scene.globe.enableLighting=!1,a.statusBar.readyPromise.then(function(){a.statusBar.hideCopyright()})):((a=new e.Viewer("cesiumContainer",{imageryProvider:t,geocoder:!1,baseLayerPicker:!1,homeButton:!1,sceneModePicker:!1,navigationHelpButton:!1,fullscreenButton:!0,vrButton:!1,shouldAnimate:!0,languageStyle:lang,sceneModePicker:!1,fullscreenButton:!1})).animation.container.style.visibility="hidden",a.timeline.container.style.visibility="hidden",a.scene.globe.enableLighting=!1,a.statusBar.readyPromise.then(function(){a.statusBar.hideCopyright()})),a.scene.globe.depthTestAgainstTerrain=!0,globalViewer=a,require(["views/Enum","views/ToolBar","views/ObjectManager","views/AddData","views/Markers","Cesium","NavagationBar"],function(e,n,i,a,t,o,r){globalViewer.objectManager=new i(globalViewer);var l={viewer:globalViewer,parentContainer:"cesiumContainer"},s=new n(l),u=new a(l);u.shown=!1,s._containerCollection.AddData=u,o.viewerCesiumNavigationMixin(globalViewer,{})}),require(["views/VrViewerButton","views/FullScreenButton","views/HomeButton","views/TerrainExaggerationButton","views/ShareButton","views/StreentViewContainerButton"],function(e,n,i,a,t,o){var r={viewer:globalViewer,parentContainer:"cesiumContainer"};new e(r),new n(r),new i(r),new a(r),new t(r),new o(r)})}window.onload=function(){require(["libs/common/common","Vue"],function(e,n){var i=new n({el:"#cesiumLoadingOverlay",data:{loading:!0}});cesiumContainerVue=new n({el:"#cesiumContainer",data:{tilesData:[{id:0,name:"NULL"}],curBoxClip:null,curBoxClipPrimitiveId:0},mounted:function(){lang=e.getLocationRequestParam("lang")||"zh-CN",require(["Cesium","jquery","languages/languages"],function(e,n,a){window.platformLanguage={},new a(lang).then(function(a){window.platformLanguage=a,onLoadSuccess(e,n),i.loading=!1},function(){window.platformLanguage={},onLoadSuccess(e,n),i.loading=!1})})}})})};