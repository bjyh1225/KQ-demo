import Vue from 'vue'
import App from './IndependentApp.vue'
import router from './router'
import Api from './api/apiConfig.js';
new Vue({
  render: h => h(App),
  router
}).$mount('#app')