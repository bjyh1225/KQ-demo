const state={
  routers:[],
  menus:{},
  activeMenuStatus:false,
  functionAuthority:{},
  tabPagesConfig:{}
}

const mutations={
  routers: (state, routers) => {
    state.routers = routers
  },
  menus:(state, menus) => {
    state.menus = menus
  },
  activeMenuStatus:(state, activeMenuStatus) => {
    state.activeMenuStatus = activeMenuStatus
  },
  functionAuthority:(state, functionAuthority) => {
    state.functionAuthority = functionAuthority
  },
  tabPagesConfig:(state, tabPagesConfig) => {
    state.tabPagesConfig = tabPagesConfig
  }
}
const actions={
  setRouters({commit},routers){
    commit('routers',routers);
  },
  setMenus({commit},menus){
    commit('menus',menus);
  },
  setActiveMenuStatus({commit},activeMenuStatus){
    commit('activeMenuStatus',activeMenuStatus);
  },
  setFunctionAuthority({commit},functionAuthority){
    commit('functionAuthority',functionAuthority);
  },
  setTabPagesConfig({commit},tabPagesConfig){
    commit('tabPagesConfig',tabPagesConfig);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

