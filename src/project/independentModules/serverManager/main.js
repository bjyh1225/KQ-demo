import "@babel/polyfill";
import Vue from 'vue'
import App from './IndependentApp.vue'
import router from './router'
import store from './store'
import Api from './api/serverManagerApiConfig.js'
import VueI18n from 'vue-i18n'
import 'normalize.css/normalize.css'
import element from 'common/config/elementUI/elementUI.js'
import locale from 'element-ui/lib/locale'
import 'element-ui/lib/theme-chalk/index.css'
import './icon/iconfont.css'

import animated from 'animate.css'
//国际化
import zh from './lang/independentZh.js'
import en from './lang/independentEn.js'
//路由配置
import allConfigMenu from './router/menuRouterConf/serverManagerMenuRouterConfig.js'
window.allConfigMenu=allConfigMenu;

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
    'chinese': zh,   // 中文语言包
    'english': en   // 英文语言包
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