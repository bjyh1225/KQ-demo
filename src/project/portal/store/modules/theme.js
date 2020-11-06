const state={
  themeCode:''
}

const mutations={
  themeCode: (state, themeCode) => {
    state.themeCode = themeCode
  }
}
const actions={
  setTheme({commit},themeCode){
    commit('themeCode',themeCode);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

