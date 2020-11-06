const state={
  username:'',
  userInfo:{},
  isLogin:false,
  headImg:""
}

const mutations={
  username: (state, username) => {
    state.username = username
  },
  userInfo: (state, userInfo) => {
    state.userInfo = userInfo
  },
  isLogin:(state, isLogin) => {
    state.isLogin = isLogin
  },
  headImg:(state, headImg) => {
    state.headImg = headImg
  }
}
const actions={
  login({commit},userInfo){
    commit('username', userInfo.username);
    commit('headImg', userInfo.headImg);
    commit('userInfo', userInfo);
    var isLogin=userInfo.username?true:false;
    commit('isLogin',isLogin);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

