const state={
  commonTimeStamp:"",//时间戳
  commonEventType:"",//事件类型
  commonSource:"",//事件源
  commonParams:{},//参数
  commonEventObject:{}//事件对象
}

const mutations={
  commonTimeStamp: (state, commonTimeStamp) => {
    state.commonTimeStamp = commonTimeStamp
  },
  commonEventType: (state, commonEventType) => {
    state.commonEventType = commonEventType
  },
  commonSource: (state, commonSource) => {
    state.commonSource = commonSource
  },
  commonEventObject: (state, commonEventObject) => {
    state.commonEventObject = commonEventObject
  },
  commonParams: (state, commonParams) => {
    state.commonParams = commonParams
  }
}
const actions={
  setEventInfo({commit},data){
    commit('commonTimeStamp',data.commonTimeStamp);
    commit('commonEventType',data.commonEventType);
    commit('commonSource',data.commonSource);
    commit('commonParams',data.commonParams);
    commit('commonEventObject',data.commonEventObject);
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

