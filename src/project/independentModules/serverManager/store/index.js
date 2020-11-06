import Vue from 'vue'
import Vuex from 'vuex'
// import getters from './getters'
// import modules from './storeConfig.js'
import storeConfig from 'common/config/allProjectConfig/allProjectStore.js'
Vue.use(Vuex);
export default new Vuex.Store({
  ...storeConfig
})