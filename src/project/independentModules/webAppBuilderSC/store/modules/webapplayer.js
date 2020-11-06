const state={
  layerNode:null,
  dragState:null,
}

const mutations={
  layerNode: (state, layerNode) => {
    state.layerNode = layerNode
  },
  dragState:(state, dragState) => {
    state.dragState = dragState
  }
}
const actions={
  setLayerNode({commit},layerNode){
    commit('layerNode',layerNode);
  },
  setDragState({commit},dragState){
    commit('dragState',dragState);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

