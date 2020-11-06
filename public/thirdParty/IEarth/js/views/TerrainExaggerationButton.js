define(["libs/common/common","libs/common/defined","libs/common/defaultValue","libs/common/defineProperties","jquery","Cesium","Vue","views/TerrainExaggeration"],function(t,i,o,n,e,r,s,a){var p={terrainExaggeration:"地形夸张"};for(var h in p)p[h]=window.platformLanguage[h]?window.platformLanguage[h]:p[h];var g=['<div class="tools-terrainExaggeration-button-content" :style="position" v-cloak >','<a :title="titles.terrainExaggeration" class="cesium-button" @click="onTerrainExaggerationButtonClk"','style="width:32px;height:32px;border-radius:32px;padding:3px 7px;margin:0;background:rgba(38,38,38,0.75)">','<span class="iconfont icon-cube" style="display:inline-block;"></span>',"</a>","</div>"].join("");function l(n){n=o(n,{}),this._viewer=o(n.viewer,null),this._parentContainer=o(n.parentContainer,"cesiumContainer"),"string"==typeof this._parentContainer&&(this._parentContainer=e("#"+this._parentContainer));var r=o(n.position,{bottom:250,right:20});this._position={},i(r.top)?this._position.top=r.top+"px":i(r.bottom)?this._position.bottom=r.bottom+"px":this._position.top="140px",i(r.left)?this._position.left=r.left+"px":i(r.right)?this._position.right=r.right+"px":this._position.right="10px",this._position.position="absolute",this._duration=o(n.duration,void 0),this._vm=void 0,this._id=t.newGuid(),this._terrainExaggeration=void 0,this.initialize()}return l.prototype.initialize=function(){var t=this;this._parentContainer.append(g),this._vm=new s({el:".tools-terrainExaggeration-button-content",data:{guid:t._id,titles:p,position:t._position},watch:{},methods:{onTerrainExaggerationButtonClk:function(i){t.terrainExaggerationButtonClk(i)}}})},l.prototype.terrainExaggerationButtonClk=function(i){var o=t.getElementAbsolutePosition(i.currentTarget),n=o.top+"px",r=(o.left,this._parentContainer.width()-o.left+10+"px");if(!this._terrainExaggeration){var s={viewer:this._viewer,parentContainer:this._parentContainer,shown:!1,style:{position:"absolute",top:n,right:r}};this._terrainExaggeration=new a(s)}if(!this._terrainExaggeration.shown){var p=this._terrainExaggeration.container,h=p.vm.$el;p.vm.style.right=r,p.vm.style.top=n,e(h).css("right",r).css("top",n),this._terrainExaggeration.update()}this._terrainExaggeration.shown=!this._terrainExaggeration.shown},l.prototype.setPosition=function(t){t=o(options.position,{top:140,right:10});this._position={},i(t.top)?this._position.top=t.top+"px":i(t.bottom)?this._position.bottom=t.bottom+"px":this._position.top="140px",i(t.left)?this._position.left=t.left+"px":i(t.right)?this._position.right=t.right+"px":this._position.right="10px",this._position.position="absolute",this._vm.position=this._position},n(l.prototype,{vm:{get:function(){return this._vm}}}),l});