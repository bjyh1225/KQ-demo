!function l(s,o,d){function r(n,e){if(!o[n]){if(!s[n]){var t="function"==typeof require&&require;if(!e&&t)return t(n,!0);if(c)return c(n,!0);var i=new Error("Cannot find module '"+n+"'");throw i.code="MODULE_NOT_FOUND",i}var a=o[n]={exports:{}};s[n][0].call(a.exports,function(e){return r(s[n][1][e]||e)},a,a.exports,l,s,o,d)}return o[n].exports}for(var c="function"==typeof require&&require,e=0;e<d.length;e++)r(d[e]);return r}({1:[function(e,n,t){(function(e){"use strict";function n(){$(".colors-picker-input").kendoColorPicker({button:!1,change:r}),$(".point-size-silder").kendoSlider({min:1,max:20,smallStep:1,largeStep:1,showButtons:!1,tips:!1,change:r}).data("kendoSlider"),$(".heatmap-radius-silder").kendoSlider({min:1,max:20,smallStep:1,largeStep:1,showButtons:!1,tips:!1,change:r}).data("kendoSlider"),$(".line-width-silder").kendoSlider({min:0,max:20,smallStep:1,largeStep:1,showButtons:!1,tips:!1,change:r}).data("kendoSlider"),$(".opacity-slider").kendoSlider({min:0,max:100,smallStep:5,largeStep:10,showButtons:!1,change:r}).data("kendoSlider"),$(".line-style-list").kendoDropDownList({dataTextField:"name",dataValueField:"value",template:'<span class="k-state-default" style="background-image: url(./images/line_styles/line_style#:data.name#.png)"></span>',valueTemplate:'<span class="selected-value" style="background-image: url(./images/line_styles/line_style#:data.name#.png)"></span>',height:200,change:r}),$(".point-ramp-color").kendoDropDownList({dataTextField:"value",dataValueField:"name",template:'<span class="k-state-default" style="height: 12px; background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',valueTemplate:'<span class="selected-value" style="background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',height:200,change:function(){t(),K(),r()}}),$(".heatmap-ramp-color").kendoDropDownList({dataTextField:"value",dataValueField:"name",template:'<span class="k-state-default" style="height: 12px; background-image: url(./images/heatmap_ramp/color#:data.name#.png)"></span>',valueTemplate:'<span class="selected-value" style="background-image: url(./images/heatmap_ramp/color#:data.name#.png)"></span>',height:200,change:function(){t(),K(),r()}}),$(".line-ramp-color").kendoDropDownList({dataTextField:"value",dataValueField:"name",template:'<span class="k-state-default" style="height: 12px; background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',valueTemplate:'<span class="selected-value" style="background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',height:200,change:function(){t(),K(),r()}}),$(".polygon-ramp-color").kendoDropDownList({dataTextField:"value",dataValueField:"name",template:'<span class="k-state-default" style="height: 12px; background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',valueTemplate:'<span class="selected-value" style="background-image: url(./images/color_ramp/color#:data.name#.png)"></span>',height:200,change:function(){t(),K(),r()}}),$(".special-field-list").kendoDropDownList({dataTextField:"name",dataValueField:"value",height:140,change:function(){t(),K(),r()}}),$(".sub-section-method-list").kendoDropDownList({dataTextField:"name",dataValueField:"value",height:140,change:function(){t(),K(),r()}}),$(".sub-section-count-list").kendoDropDownList({dataTextField:"name",dataValueField:"value",height:140,change:function(){t(),K(),r()}}),$(".label-direction-list").kendoDropDownList({dataTextField:"name",dataValueField:"value",height:140,change:r}),$(".label-offset-silder").kendoSlider({min:0,max:40,smallStep:1,largeStep:1,showButtons:!1,tips:!1,change:r}).data("kendoSlider"),$(".label-field-list").kendoDropDownList({dataTextField:"name",dataValueField:"value",height:140,change:r}),$(".weight-field-list").kendoDropDownList({dataTextField:"name",dataValueField:"value",height:140,change:r}),$(".label-font-list").kendoDropDownList({dataTextField:"name",dataValueField:"value",height:140,change:r});var n=$(".dv-input").kendoMaskedTextBox({change:r}).data("kendoMaskedTextBox");$("[data-role=maskedtextbox]").on("keydown",function(e){13===e.keyCode&&n.trigger("change",{data:$(this).val()})})}function r(){var e=KQ.Builder.BuilderProject.getInstance(),n=e.setting.layer,t=n.getRenderType(),i=e.getInfo("render_model"),a=i.styleOptions,l=n.render.get(t);i.pointSize?(a.vectorInfo.fillOpacity=i.pointOpacity/100,a.vectorInfo.strokeOpacity=i.lineOpacity/100,"vector"===a.pointSymbolType?a.vectorInfo.fontSize=i.pointSize+"px":a.imageInfo.radius=i.pointSize/10):(a.fillOpacity=i.fillOpacity/100,a.lineOpacity=i.lineOpacity/100),"heatmap"===a.renderType&&(a.gradient=KQ.Common.CommonValues.heatmapColorRamp[a.colorIndex]),l.setOptions(a)}function t(){var e=KQ.Builder.BuilderProject.getInstance();i(e.setting.layer,e.getInfo("render_model").styleOptions)}function i(e,n){var t=e.getRenderType(),i=e.render.get(t),a=n,l=i.options;"point"===e.options.featureType&&(a=a.vectorInfo,l=l.vectorInfo),"single"==t?(a.thematicColors=KQ.Builder.RenderShape.getThematicFieldColorsSingle(i.getGeojsonObject(),a.thematicField,a.colorIndex),l.thematicColors=a.thematicColors):"section"==t?(a.thematicColors=KQ.Builder.RenderShape.getThematicFieldColorsSection(i.getGeojsonObject(),a.thematicField,a.colorIndex,a.sectionMethod,a.sectionCount),l.thematicColors=a.thematicColors):"heatmap"==t&&(n.gradient=KQ.Common.CommonValues.heatmapColorRamp[n.colorIndex])}function a(){for(var e=document.getElementsByClassName("editor-common-uis"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n                <div class="editor-tool">\n                    <div class="text">过滤显示</div>\n                    <input class="dv-input" placeholder="featureID < 1000" data-bind="value: styleOptions.filter"/>\n                </div>\n                <div class="editor-tool lable-select">\n                    <div class="text">标签字段</div>\n                    <select class="label-field-list" data-bind="source: labelFieldDropDownList, value: styleOptions.labelField"></select>\n                </div>\n                <div class="editor-tool lable-style">\n                    <div class="text">标签颜色</div>\n                    <input class="colors-picker-input" data-role="colorpicker"\n                           data-bind="value: styleOptions.labelColor"/>\n                </div>\n                <div class="editor-tool lable-select">\n                    <div class="text">标签字体</div>\n                    <select class="label-font-list" data-bind="source: labelFontDropDownList, value: styleOptions.labelFontName"> </select>\n                </div>\n            ',e[n].appendChild(t)}}function l(){for(var e=document.getElementsByClassName("symbol-type-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n        <div class="editor-tool">\n          <div class="text">符号类型</div>\n          <ul class="point-symbol-type">\n            <li class="point-symbol point-symbol-svg">矢量</li>\n            <li class="point-symbol point-symbol-img">图片</li>\n          </ul>\n        </div>\n        ',e[n].appendChild(t);var i=$(".point-symbol-type").kendoMobileButtonGroup({index:0}).data("kendoMobileButtonGroup");KQ.Builder.BuilderProject.getInstance().symbolTypeGroupButton=i}}function s(){for(var e=document.getElementsByClassName("point-style-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n        <div class="editor-tool">\n          <div class="text">点样式</div>\n          <div class="default-point-icon">\n             <div class="iconfont" data-bind="html: styleOptions.vectorInfo.unicode"></div>\n             <div class="icon-container" style="display: none;" data-bind="style: { backgroundImage:  styleOptions.imageInfo.url }"></div>\n          </div>\n          <div class="symbols-container" style="display: none;">\n            <div class="symbols-box">\n            </div>\n          </div>\n        </div>\n        ',e[n].appendChild(t),$(e[n]).find(".default-point-icon div").eq(0).bind({icon_selected:function(e,n){KQ.Builder.BuilderProject.getInstance().getInfo("render_model").styleOptions.vectorInfo.unicode=n,$(this).html(n),$(this).css("display","block").siblings().css("display","none"),r()},symbol_type_vector:function(){$(this).css("display","block").siblings().css("display","none"),r()}}),$(e[n]).find(".default-point-icon div").eq(1).bind({icon_selected:function(e,n){var t=KQ.Builder.BuilderProject.getInstance().getInfo("render_model").styleOptions;t.imageInfo.url="url(./images/point_images/IMAGE"+n.row+"-"+n.col+".png)",$(this).css("background-image",t.imageInfo.url),$(this).css("display","block").siblings().css("display","none"),r()},symbol_type_image:function(){$(this).css("display","block").siblings().css("display","none"),r()}})}$(".default-point-icon").click(function(){$(this).next().css("display","block")}),$("body").click(function(e){$(e.target).parent().hasClass("default-point-icon")||$(".symbols-container").css("display","none")})}function o(){for(var e=document.getElementsByClassName("point-color-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">点颜色</div>\n                <input class="colors-picker-input" data-role="colorpicker" data-bind="value: styleOptions.vectorInfo.fillColor"/>\n            </div>\n            ',e[n].appendChild(t)}}function d(){for(var e=document.getElementsByClassName("point-ramp-color-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">点颜色</div>\n                <input class="point-ramp-color" data-bind="source: rampColorDropDownList, value: styleOptions.vectorInfo.colorIndex"/>\n            </div>          \n            ',e[n].appendChild(t)}}function c(){for(var e=document.getElementsByClassName("heatmap-ramp-color-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">热点颜色</div>\n                <input class="heatmap-ramp-color" data-bind="source: heatmapRampColorDropDownList, value: styleOptions.colorIndex"/>\n            </div>          \n            ',e[n].appendChild(t)}}function p(){for(var e=document.getElementsByClassName("heatmap-weight-field-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n               <div class="text">权重字段</div>\n               <select class="weight-field-list" data-bind="source: weightFieldDropDownList, value: styleOptions.weightField"></select>\n            </div>          \n            ',e[n].appendChild(t)}}function u(){for(var e=document.getElementsByClassName("heatmap-filter-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n               <div class="text">过滤显示</div>\n               <input class="dv-input" placeholder="featureID < 1000" data-bind="value: styleOptions.filter"/>\n            </div>          \n            ',e[n].appendChild(t)}}function v(){for(var e=document.getElementsByClassName("point-size-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">点大小</div>\n                <div class="value-container">\n                    <input class="point-size-silder" data-bind="value: pointSize"/>\n                    <input type="text" style="border: none;" data-bind="value: pointSize">\n                    <p stype="padding-right: 5px;">px</p>\n                </div>\n            </div>\n            ',e[n].appendChild(t)}}function m(){for(var e=document.getElementsByClassName("point-opacity-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">点不透明度</div>\n                <div class="value-container">\n                    <input class="opacity-slider" data-bind="value: pointOpacity"/>\n                    <input type="text" style="border: none;" data-bind="value: pointOpacity">\n                    <p stype="padding-right: 5px;">%</p>\n                </div>\n            </div>           \n            ',e[n].appendChild(t)}}function g(){for(var e=document.getElementsByClassName("point-line-color-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">线颜色</div>\n                <input class="colors-picker-input" data-role="colorpicker"\n                       data-bind="value: styleOptions.vectorInfo.strokeColor"/>\n            </div>\n            ',e[n].appendChild(t)}}function f(){for(var e=document.getElementsByClassName("point-line-width-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">线宽度</div>\n                <div class="value-container">\n                    <input class="line-width-silder" data-bind="value: styleOptions.vectorInfo.strokeWidth"/>\n                    <input type="text" style="border: none;" data-bind="value: styleOptions.vectorInfo.strokeWidth">\n                    <p stype="padding-right: 5px;">px</p>\n                </div>\n            </div>\n            ',e[n].appendChild(t)}}function h(){for(var e=document.getElementsByClassName("point-line-opacity-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">线不透明度</div>\n                <div class="value-container">\n                    <input class="opacity-slider" data-bind="value: lineOpacity"/>\n                    <input type="text" style="border: none;" data-bind="value: lineOpacity">\n                    <p stype="padding-right: 5px;">%</p>\n                </div>\n            </div>           \n            ',e[n].appendChild(t)}}function b(){for(var e=document.getElementsByClassName("point-special-field-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool lable-select">\n                <div class="text">专题字段</div>\n                <select class="special-field-list" data-bind="source: specialFieldDropDownList, value: styleOptions.vectorInfo.thematicField"/>\n            </div>         \n            ',e[n].appendChild(t)}}function y(){for(var e=document.getElementsByClassName("point-subsection-type-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool lable-select">\n                <div class="text">分段方法</div>\n                <select class="sub-section-method-list" data-bind="source: subsectionTypeDropDownList, value: styleOptions.vectorInfo.sectionMethod"/>\n            </div>         \n            ',e[n].appendChild(t)}}function x(){for(var e=document.getElementsByClassName("heatmap-radius-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">热点半径</div>\n                <div class="value-container">\n                    <input class="heatmap-radius-silder" data-bind="value: styleOptions.radius"/>\n                    <input type="text" style="border: none;" data-bind="value: styleOptions.radius">\n                    <p stype="padding-right: 5px;">px</p>\n                </div>\n            </div>\n            ',e[n].appendChild(t)}}function C(){for(var e=document.getElementsByClassName("point-subsection-number-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool lable-select">\n                <div class="text">分段个数</div>\n                <select class="sub-section-count-list" data-bind="source: subsectionNumberDropDownList, value: styleOptions.vectorInfo.sectionCount"/>\n            </div>        \n            ',e[n].appendChild(t)}}function k(){for(var e=document.getElementsByClassName("label-direction-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool lable-select">\n                <div class="text">标签位置</div>\n                <select class="label-direction-list" data-bind="source: labelDirectionDropDownList, value: styleOptions.labelPosition"/>\n            </div>        \n            ',e[n].appendChild(t)}}function D(){for(var e=document.getElementsByClassName("label-offset-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool lable-select">\n                <div class="text">标签偏移</div>\n                <div class="value-container">\n                    <input class="label-offset-silder" data-bind="value: styleOptions.labelMarkerPadding"/>\n                    <input type="text" style="border: none;" data-bind="value: styleOptions.labelMarkerPadding">\n                    <p stype="padding-right: 5px;">px</p>\n                </div>\n            </div>        \n            ',e[n].appendChild(t)}}function E(){for(var e=document.getElementsByClassName("line-color-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">线颜色</div>\n                <input class="colors-picker-input" data-role="colorpicker"\n                       data-bind="value: styleOptions.lineColor"/>\n            </div>\n            ',e[n].appendChild(t)}}function I(){for(var e=document.getElementsByClassName("line-style-list-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">线样式</div>\n                <input class="line-style-list" style="width: 152px; height: 28px;"\n                       data-bind="source: lineStyleDropDownList, value: styleOptions.lineStyle"/>\n            </div>\n            ',e[n].appendChild(t)}}function w(){for(var e=document.getElementsByClassName("line-width-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">线宽度</div>\n                <div class="value-container">\n                    <input class="line-width-silder" data-bind="value: styleOptions.lineWidth"/>\n                    <input type="text" style="border: none;" data-bind="value: styleOptions.lineWidth">\n                    <p stype="padding-right: 5px;">px</p>\n                </div>\n            </div>\n            ',e[n].appendChild(t)}}function L(){for(var e=document.getElementsByClassName("line-opacity-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">线不透明度</div>\n                <div class="value-container">\n                    <input class="opacity-slider" data-bind="value: lineOpacity"/>\n                    <input type="text" style="border: none;" data-bind="value: lineOpacity">\n                    <p stype="padding-right: 5px;">%</p>\n                </div>\n            </div>           \n            ',e[n].appendChild(t)}}function B(){for(var e=document.getElementsByClassName("line-ramp-color-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">线颜色</div>\n                <input class="line-ramp-color"\n                       data-bind="source: lineRampColorDropDownList, value: styleOptions.colorIndex"/>\n            </div>          \n            ',e[n].appendChild(t)}}function T(){for(var e=document.getElementsByClassName("special-field-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool lable-select">\n                <div class="text">专题字段</div>\n                <select class="special-field-list" data-bind="source: specialFieldDropDownList, value: styleOptions.thematicField"/>\n            </div>         \n            ',e[n].appendChild(t)}}function O(){for(var e=document.getElementsByClassName("subsection-type-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool lable-select">\n                <div class="text">分段方法</div>\n                <select class="sub-section-method-list" data-bind="source: subsectionTypeDropDownList, value: styleOptions.sectionMethod"/>\n            </div>         \n            ',e[n].appendChild(t)}}function N(){for(var e=document.getElementsByClassName("subsection-number-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool lable-select">\n                <div class="text">分段个数</div>\n                <select class="sub-section-count-list" data-bind="source: subsectionNumberDropDownList, value: styleOptions.sectionCount"/>\n            </div>        \n            ',e[n].appendChild(t)}}function F(){for(var e=document.getElementsByClassName("polygon-ramp-color-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">面颜色</div>\n                <input class="polygon-ramp-color" data-bind="source: rampColorDropDownList, value: styleOptions.colorIndex"/>\n            </div>          \n            ',e[n].appendChild(t)}}function M(){for(var e=document.getElementsByClassName("polygon-color-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool point-color">\n                <div class="text">面颜色</div>\n                <input class="colors-picker-input" data-role="colorpicker" data-bind="value: styleOptions.fillColor"/>\n            </div>   \n            ',e[n].appendChild(t)}}function S(){for(var e=document.getElementsByClassName("polygon-opacity-container"),n=0;n<e.length;n++){var t=document.createElement("div");t.innerHTML='\n            <div class="editor-tool">\n                <div class="text">面不透明度</div>\n                  <div class="value-container">\n                     <input class="opacity-slider" data-bind="value: fillOpacity"/>\n                     <input type="text" style="border: none;" data-bind="value: fillOpacity">\n                     <p stype="padding-right: 5px;">%</p>\n                  </div>\n            </div>           \n            ',e[n].appendChild(t)}}function _(e,n){var t=KQ.Builder.BuilderProject.getInstance().setting.layer.render;return console.log("render: ",t),"single"===n?"point"==e?t.get("single").options.vectorInfo.thematicColors:(console.log("_initDOms.js 1071, thematicColors: ",t.get("single").options.thematicColors),t.get("single").options.thematicColors):"section"===n?"point"==e?t.get("section").options.vectorInfo.thematicColors.colors:t.get("section").options.thematicColors.colors:"heatmap"===n?t.get("heatmap").options.gradient:void 0}function H(e){var n=KQ.Builder.BuilderProject.getInstance().setting.layer.render;return"point"==e?n.get("section").options.vectorInfo.thematicColors.breaksData:n.get("section").options.thematicColors.breaksData}function j(){for(var n=KQ.Builder.BuilderProject.getInstance().setting.layer.options.featureType,i=document.getElementsByClassName(n+" editor-fields-color"),a=0;a<i.length;a++){var e=!1,t=$(i[a]).find(".fields-div-switch");0==t.length||t.hasClass("state-close")||(e=!0),$(i[a]).empty();var l="",s=document.createElement("div"),o="icon-shape-"+n;if(i[a].classList.contains("single"))l+='<div class="title">\n                 <span>自定义单值</span>\n                  <div class="unique-show"><span>展开</span><i class="fa fa-plus-square-o fields-div-switch state-close"></i></div>\n                </div>\n                <div class="fields-container" style="display: none;">',_(n,"single").forEach(function(e,n){l+='<div class="fields-item">\n                <span class="icon iconfont '+o+' colors-picker" style="color: '+e+'"><div class="single-colors-picker" value='+e+'></div></span>\n                <span class="value">',l+=n+"</span></div>"}),l+="</div>",s.innerHTML=l,i[a].appendChild(s);else i[a].classList.contains("section")?function(){l+='<div class="title">\n                 <span>自定义分段</span>\n                  <div class="unique-show"><span>展开</span><i class="fa fa-plus-square-o fields-div-switch state-close"></i></div>\n                </div>\n                <div class="fields-container" style="display: none;">';var e=_(n,"section"),t=H(n);e.forEach(function(e,n){l+='<div class="fields-item" data-index='+n+' >\n                    <span class="icon iconfont '+o+' colors-picker" style="color: '+e+'"><div class="section-colors-picker" value='+e+'></div></span>\n                    <div class="range-values">\n                      <input style="width: 100px" class="value-start" value='+t[n].toFixed(3)+'>\n                      <span class="value-hr">-</span>\n                      <input style="width: 100px" class="value-end" value='+t[n+1].toFixed(3)+">\n                    </div>\n                  </div>"}),l+="</div>",s.innerHTML=l,i[a].appendChild(s),$(i[a]).find(".value-start").kendoMaskedTextBox({}),$(i[a]).find(".value-end").kendoMaskedTextBox({})}():i[a].classList.contains("heatmap")&&function(){l+='<div class="editor-fields-color" >\n            <div class="title"><span>自定义颜色</span>\n              <div class="unique-show"><span>展开</span><i class="fa fa-plus-square-o fields-div-switch state-close"></i></div>\n            </div>\n            <div class="fields-container" style="display: none;">';var t=_(n,"heatmap");Object.keys(t).sort().forEach(function(e,n){l+='<div class="editor-tool" data-key='+e+'>\n                  <div class="text">热点颜色'+(Number(n)+1)+'</div>\n                  <div class="heatmap-colors-picker" data-role="colorpicker" value="'+t[e]+'"></div>\n                 </div>'}),l+="</div>",s.innerHTML=l,i[a].appendChild(s)}();$(i[a]).find(".single-colors-picker").kendoColorPicker({button:!1,change:function(e){var n=e.value,t=$(this)[0].element.parents(".fields-item").find(".value").text(),i=$(this)[0].element.parents(".editor-fields-color")[0].classList,a=_(i[1],i[2]);$(this)[0].element.parents("span").css("color",n),a.has(t)?a.set(t,n):a.has(Number(t))&&a.set(Number(t),n),r()}}),$(i[a]).find(".section-colors-picker").kendoColorPicker({button:!1,change:function(e){var n=e.value,t=$(this)[0].element.parents(".fields-item").attr("data-index"),i=$(this)[0].element.parents(".editor-fields-color")[0].classList,a=_(i[1],i[2]);$(this)[0].element.parents("span").css("color",n),a[t]=n,r()}}),$(i[a]).find(".heatmap-colors-picker").kendoColorPicker({button:!1,change:function(e){var n=e.value,t=$(this)[0].element.parents(".editor-tool").attr("data-key"),i=KQ.Builder.BuilderProject.getInstance(),a=(i.setting.layer,i.getInfo("render_model").styleOptions);a.gradient=KQ.Common.CommonValues.heatmapColorRamp[a.colorIndex],a.gradient[t]=n,r(),K()}}),$(i[a]).find(".value-start input").change(function(e){var n=Number($(this).parents(".fields-item").attr("data-index")),t=$(this).parents(".editor-fields-color")[0].classList,i=t[1],a=(t[2],H(i)),l=Number.MIN_SAFE_INTEGER,s=Number.MAX_SAFE_INTEGER,o=Number(e.target.value),d=null;0<=n-1&&(l=a[n-1],d=$(this).parents(".fields-item").prev().find(".value-end input")),n+1<a.length&&(s=a[n+1]),l<o&&o<s?(a[n]=o,d&&d.val(o)):(KQ.Control.Notification.getInstance().showError("数值范围不正确"),e.target.value=a[n]),r()}),$(i[a]).find(".value-end input").change(function(e){var n=Number($(this).parents(".fields-item").attr("data-index"))+1,t=$(this).parents(".editor-fields-color")[0].classList,i=t[1],a=(t[2],H(i)),l=Number.MIN_SAFE_INTEGER,s=Number.MAX_SAFE_INTEGER,o=Number(e.target.value),d=null;0<=n-1&&(l=a[n-1]),n+1<a.length&&(s=a[n+1],d=$(this).parents(".fields-item").next().find(".value-start input")),l<o&&o<s?(a[n]=o,d&&d.val(o)):(KQ.Control.Notification.getInstance().showError("数值范围不正确"),e.target.value=a[n]),r()}),$(i[a]).find(".colors-picker").click(function(){$(this).find(".k-selected-color")[0].click()}),$(i[a]).find(".fields-div-switch").click(function(){var e=$(this);e.hasClass("state-close")?(e.siblings("span").value="展开",e.parents(".title").siblings(".fields-container").css("display","block"),e.removeClass("state-close"),e.removeClass("fa-plus-square-o"),e.addClass("fa-minus-square-o")):(e.siblings("span").value="收起",e.parents(".title").siblings(".fields-container").css("display","none"),e.addClass("state-close"),e.removeClass("fa-minus-square-o"),e.addClass("fa-plus-square-o"))}),e&&$(i[a]).find(".fields-div-switch").trigger("click")}}function K(){var e;e=j,setTimeout(function(){e()},0)}function Q(){for(var e=[{name:"未设置",value:""}],n=KQ.Builder.BuilderProject.getInstance().setting.layer.getRender(),t=Object.keys(n.geojsonObjectFields()),i=0;i<t.length;++i)e.push({name:t[i],value:t[i]});return e}e.builderInitDoms={},e.builderInitDoms.initAllDoms=function(){l(),s(),d(),o(),v(),m(),u(),x(),c(),p(),g(),f(),h(),b(),y(),C(),k(),D(),E(),I(),L(),w(),B(),T(),O(),N(),M(),S(),F(),a(),n()},e.builderInitDoms.initPointDoms=function(){l(),s(),d(),o(),v(),m(),u(),x(),c(),p(),g(),f(),h(),b(),y(),C(),k(),D(),a(),K(),n()},e.builderInitDoms.initLineDoms=function(){a(),E(),I(),L(),w(),B(),T(),O(),N(),M(),S(),K(),n()},e.builderInitDoms.initPolygonDoms=function(){a(),T(),O(),N(),F(),M(),S(),E(),I(),L(),w(),K(),n()},e.builderInitDoms.lineStyleDropDownList=function(){for(var e=[],n=Object.values(KQ.Common.CommonValues.lineStyle),t=0;t<n.length;++t)e.push({name:String(t),value:n[t]});return e},e.builderInitDoms.labelFieldDropDownList=function(){return Q()},e.builderInitDoms.labelFontDropDownList=function(){return[{name:"仿宋",value:KQ.Common.CommonValues.labelFontName.fangSong},{name:"宋体",value:KQ.Common.CommonValues.labelFontName.song},{name:"微软雅黑",value:KQ.Common.CommonValues.labelFontName.yaHei}]},e.builderInitDoms.specialFieldDropDownList=function(){for(var e=[],n=KQ.Builder.BuilderProject.getInstance().setting.layer.getRender(),t=Object.keys(n.geojsonObjectFields()),i=0;i<t.length;++i)e.push({name:t[i],value:t[i]});return e},e.builderInitDoms.rampColorDropDownList=function(){for(var e=[],n=0;n<30;++n)e.push({name:String(n),value:String(n)});return e},e.builderInitDoms.sectionSpecialFieldDropDownList=function(){for(var e=[],n=KQ.Builder.BuilderProject.getInstance().setting.layer.getRender(),t=Object.keys(n.geojsonObjectSectionFields()),i=0;i<t.length;++i)e.push({name:t[i],value:t[i]});return e},e.builderInitDoms.subsectionTypeDropDownList=function(){return[{name:"等距分段法",value:KQ.Common.CommonValues.classBreaksMethod.classBreaks_equidistant},{name:"等量分段法",value:KQ.Common.CommonValues.classBreaksMethod.classBreaks_quantile},{name:"对数分段法",value:KQ.Common.CommonValues.classBreaksMethod.classBreaks_logarithmic},{name:"K聚类分段法",value:KQ.Common.CommonValues.classBreaksMethod.classBreaks_k_means}]},e.builderInitDoms.subsectionNumberDropDownList=function(){for(var e=[],n=2;n<16;++n)e.push({name:String(n),value:n});return e},e.builderInitDoms.labelDirectionDropDownList=function(){return[{name:"中",value:"mid"},{name:"上",value:"up"},{name:"下",value:"down"},{name:"左",value:"left"},{name:"右",value:"right"}]},e.builderInitDoms.heatmapRampColorDropDownList=function(){for(var e=[],n=0;n<18;++n)e.push({name:String(n),value:String(n)});return e},e.builderInitDoms.weightFieldDropDownList=function(){return Q()},e.builderInitDoms.initFieldColorContainer=K,e.builderInitDoms.fillSvgSymbols=function(){$(".symbols-box").empty();for(var a=["&#xe614","&#xe6e3","&#xe6ad","&#xe629","&#xe613","&#xe66b","&#xe65a","&#xe75f","&#xe656","&#xe679","&#xe657","&#xe652","&#xe615","&#xe67e","&#xe620","&#xe7df","&#xe667","&#xe666","&#xe642","&#xe640","&#xe628","&#xe67b","&#xeac9","&#xe63f","&#xe61a","&#xe64d","&#xe626","&#xe6cb","&#xe6b5","&#xe689","&#xe6f6","&#xe71c","&#xe646","&#xe6c7","&#xe671","&#xe66f","&#xe641","&#xe63e","&#xe63a","&#xe676","&#xe739","&#xe651","&#xe663","&#xe67a","&#xe677","&#xe612","&#xe81f","&#xe65c","&#xe664","&#xe665","&#xe61f","&#xe623","&#xe624","&#xe62a","&#xe62b","&#xe611","&#xe66d","&#xe660","&#xe64c","&#xe630"],e=function(t){for(var i=$('<div class="symbol-row"></div>'),e=function(e){var n=$('<div class="iconfont"></div>');n.html(a[6*t+e]),n.click(function(){$(this).closest(".editor-tool").find(".default-point-icon div").eq(0).trigger("icon_selected",a[6*t+e])}),i.append(n)},n=0;n<6;++n)e(n);$(".symbols-box").append(i)},n=0;n<10;++n)e(n)},e.builderInitDoms.fillImageSymbols=function(){$(".symbols-box").empty();for(var e=function(i){for(var a=$('<div class="symbol-row"></div>'),e=function(e){var n="background-image: url(./images/point_images/IMAGE"+i+"-"+e+".png);",t=$('<div class="point-img" ><div style="'+n+'"></div></div>');t.click(function(){$(this).closest(".editor-tool").find(".default-point-icon div").eq(1).trigger("icon_selected",{row:i,col:e})}),a.append(t)},n=1;n<=6;++n)e(n);$(".symbols-box").append(a)},n=1;n<=10;++n)e(n)},e.builderInitDoms.render=r,e.builderInitDoms.refreshThematicColors=i}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{}],2:[function(e,n,t){"use strict";var l=null;$.fn.buildersidebar=function(e){var t=this,i=t.find("ul.buildersidebar-tabs, .buildersidebar-tabs > ul"),a=t.children(".buildersidebar-content").first();return e=$.extend({position:"left"},e||{}),t.addClass("buildersidebar-"+e.position),i.children("li").children('a[href^="#"]').on("click",function(e){if(e.preventDefault(),"home"!==this.hash.slice(1)){var n=$(this).closest("li");n.hasClass("active")?t.close():n.hasClass("disabled")||t.open(this.hash.slice(1),n)}else l&&(t.hasClass("collapsed")?t.open(l):t.close())}),t.find(".buildersidebar-close").on("click",function(){t.close()}),t.open=function(e,n){void 0===n&&(n=i.find('li > a[href="#'+e+'"]').parent()),a.children(".buildersidebar-pane.active").removeClass("active"),a.children("#"+e).addClass("active"),i.children("li.active").removeClass("active"),n.addClass("active"),t.trigger("content",{id:e}),t.hasClass("collapsed")&&(t.trigger("opening"),t.removeClass("collapsed")),t.find("#builder-title-image").show(),l=e},t.close=function(){i.children("li.active").removeClass("active"),t.find("#builder-title-image").hide(),t.hasClass("collapsed")||(t.trigger("closing"),t.addClass("collapsed"))},t}},{}],3:[function(e,n,t){"use strict";e("./builder/_initDoms"),e("./builder/libs/jquery-sidebar")},{"./builder/_initDoms":1,"./builder/libs/jquery-sidebar":2}]},{},[3]);