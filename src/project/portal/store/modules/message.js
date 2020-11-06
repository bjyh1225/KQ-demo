const state={
  messageNum:"0",
  messageAction:{}
}

const mutations={
  messageNum: (state, messageNum) => {
    state.messageNum = messageNum
  },
  messageAction:(state, messageAction) => {
    state.messageAction = messageAction
  }
}
const actions={
  setMessageNum({commit},messageNum){
    commit('messageNum',messageNum);
  },
  setMessageAction({commit},messageAction){
    commit('messageAction',messageAction);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

