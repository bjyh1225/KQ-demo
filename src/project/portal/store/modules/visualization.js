const state={
  visualizationComponents:[],
  visualizationHeadInfo:{}
}

const mutations={
  visualizationComponents: (state, visualizationComponents) => {
    state.visualizationComponents = visualizationComponents
  },
  visualizationHeadInfo: (state, visualizationHeadInfo) => {
    state.visualizationHeadInfo = visualizationHeadInfo
  }
}

const actions={
  setVisualizationComponents({commit},visualizationComponents){
    commit('visualizationComponents',visualizationComponents);
  },
  setVisualizationHeadInfo({commit},visualizationHeadInfo){
    commit('visualizationHeadInfo',visualizationHeadInfo);
  }
}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}

