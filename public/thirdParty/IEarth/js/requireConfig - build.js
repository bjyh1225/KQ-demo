require({waitSeconds:0,paths:{Cesium:"../Build/Cesium/Cesium",Bootstrap:"libs/bootstrap/js/bootstrap.min",BootstrapSelect:"libs/bootstrap/bootstrap-select/js/bootstrap-select.min",BootstrapSlider:"libs/bootstrap/bootstrap-slider/js/bootstrap-slider.min",BootstrapTree:"libs/bootstrap/bootstrap-treeview/js/bootstrap-treeview.min",ColorPicker:"libs/colorpicker/js/colorpicker",jquery:"libs/jquery/jquery.min",jqueryUI:"libs/jquery/jquery-ui.min",jqueryShare:"libs/jquery/jquery-share/jsmodern-1.1.1.min",jqueryResize:"libs/jquery/jquery.resize.min",Vue:"libs/vue/vue",VueLazyLoad:"libs/vue/vue-lazyload",VueResource:"libs/vue/vue-resource",VueRouter:"libs/vue/vue-router",zTree:"libs/tree/js/jquery.ztree.core-3.5.min",zTreeCheck:"libs/tree/js/jquery.ztree.excheck-3.5.min",zTreeEdit:"libs/tree/js/jquery.ztree.exedit-3.5.min",tencentApi:"https://map.qq.com/api/js?v=2.exp&key=QKOBZFJLL3FIX33YKQFHZSG35APBCI"},map:{"*":{css:"libs/requirejs/css.min",text:"libs/requirejs/text.min"}},shim:{Cesium:{exports:"Cesium"},jqueryUI:{deps:["jquery","css!libs/jquery/jquery-ui.min.css"]},jqueryShare:{deps:["jquery","css!libs/jquery/jquery-share/jsmodern-1.1.1.min.css"]},jqueryResize:{deps:["jquery"]},zTree:{deps:["jquery","css!libs/tree/css/bootstrapStyle/bootstrapStyle.css"]},zTreeCheck:{deps:["jquery","zTree","css!libs/tree/css/bootstrapStyle/bootstrapStyle.css"]},zTreeEdit:{deps:["jquery","zTree","css!libs/tree/css/bootstrapStyle/bootstrapStyle.css"]},Bootstrap:{deps:["jquery","css!libs/bootstrap/css/animate.css"]},BootstrapSelect:{deps:["Bootstrap","css!libs/bootstrap/bootstrap-select/css/bootstrap-select.min.css"]},BootstrapSlider:{deps:["Bootstrap","css!libs/bootstrap/bootstrap-slider/css/bootstrap-slider.css"]},BootstrapTree:{exports:"BootstrapTree",deps:["Bootstrap","css!libs/bootstrap/bootstrap-treeview/css/bootstrap-treeview.css"]},ColorPicker:{deps:["jquery","css!libs/colorpicker/css/colorpicker.css"]},Vue:{deps:["css!libs/vue/animate.css"]}}});