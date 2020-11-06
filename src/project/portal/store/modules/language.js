const state={
  language:""
}

const mutations={
  language: (state, language) => {
    state.language = language
  }
}
const actions={
  setLanguage({commit},language){
    commit('language',language);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

