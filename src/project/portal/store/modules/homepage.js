const state={
  homePageHeaderHeight:"91"//首页头部导航高度
}

const mutations={
  homePageHeaderHeight: (state, homePageHeaderHeight) => {
    state.homePageHeaderHeight = homePageHeaderHeight;
  }
}
const actions={
  setHomePageHeaderHeight({commit},homePageHeaderHeight){
    commit('homePageHeaderHeight',homePageHeaderHeight);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

