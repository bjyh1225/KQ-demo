import "@babel/polyfill";
import Vue from 'vue'
import App from './IndependentApp.vue'
import router from './router'
import store from './store'
import Api from 'common/config/allProjectConfig/allProjectApi.js'
import VueI18n from 'vue-i18n'
import 'normalize.css/normalize.css'
import element from 'common/config/elementUI/elementUI.js'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import '../../../public/thirdParty/kqwebmap/fonts/iconfont.css'
import '@/assets/icon/iconfont.css'

import animated from 'animate.css'
import allProjectLang from 'common/config/allProjectConfig/allProjectLang.js'

//视频播放器
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'

Vue.use(VideoPlayer)

//绑定baseURL
if(process.env.VUE_APP_PACKAGE){
  Vue.prototype.currentBaseUrl=process.env.VUE_APP_PACKAGE;
  window.currentBaseUrl=process.env.VUE_APP_PACKAGE;
}
else{
  Vue.prototype.currentBaseUrl="/";
  window.currentBaseUrl="/";
}
//响应式方案
if(process.env.VUE_APP_REACTIVE=="true"){
  import('common/plugin/flexible.js');
}
Vue.config.productionTip = false;
//使用elementui
Vue.use(element);
//使用animated动画
Vue.use(animated);
//API
Vue.prototype.$api = Api;
//国际化
Vue.use(VueI18n);
const i18n = new VueI18n({
  locale: 'chinese',//this.$i18n.locale切换
  messages: {
    'chinese': allProjectLang.zhLocale,   // 中文语言包
    'english': allProjectLang.enLocale   // 英文语言包
  }
})
//elementui国际化
locale.i18n((key, value) => i18n.t(key, value));
//配置浏览器语言
let lang = navigator.language || navigator.userLanguage;
if (lang.toLocaleLowerCase() == 'zh-cn') {
  i18n.locale = 'chinese';
}
else if (lang.toLocaleLowerCase() == 'zh') {
  i18n.locale = 'chinese';
}
else {
  i18n.locale = 'english';
}
//拖拽
import draggable from "vuedraggable";
Vue.component('draggable', draggable);
//base64
import { Base64 } from 'js-base64';
Vue.prototype.Base64 = Base64;
//echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts;
// VueCropper
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
// plupload
import plupload from 'plupload'
Vue.use(plupload)
// vueAwesomeSwiper
import vueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(vueAwesomeSwiper)
//表单效验
import ValidateRule from 'common/rules/ValidateRule'
Vue.prototype.formRules = {
  baseValidateRule: ValidateRule
}
import '@/utils/tipsTool.js';
//全局方法
import utils from '@/utils/index.js';
Vue.prototype.globalMethods=utils;
window.vm = new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')