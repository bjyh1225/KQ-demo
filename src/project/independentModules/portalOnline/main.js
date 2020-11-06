import "@babel/polyfill";
import Vue from 'vue'
import App from './IndependentApp.vue'
import router from './router'
import store from './store'
import Api from 'common/config/allProjectConfig/allProjectApi.js'
import VueI18n from 'vue-i18n'
// import Api from './api/apiConfig.js'
import 'normalize.css/normalize.css'
// import * as filters from '@/assets/js/filters.js'
import element from 'common/config/elementUI/elementUI.js'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/icon/iconfont.css'

import animated from 'animate.css'
// import zhLocale from './lang/zh'
// import enLocale from './lang/en'
import allProjectLang from 'common/config/allProjectConfig/allProjectLang.js'
//路由配置
import allConfigMenu from './router/menuRouterConf/menuRouterConfigOnline.js'
window.allConfigMenu=allConfigMenu;

Vue.config.productionTip = false;
//使用elementui
Vue.use(element);
//使用animated动画
Vue.use(animated);
//使用filter
// Object.keys(filters).forEach(key => {
//   Vue.filter(key, filters[key]);
// })
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
//弹出框可拖拽
// import '@/utils/dialogDrag.js';
//表单效验
import ValidateRule from 'common/rules/ValidateRule'
Vue.prototype.formRules = {
  baseValidateRule: ValidateRule
}
import '@/utils/tipsTool.js';
// import '@/utils/buttonPermission.js';
window.vm = new Vue({
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app')