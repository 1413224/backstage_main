

const permission = {
  state:{
    configData:[]
  },
  mutations:{
    setConfig(state,configData){
      state.configData = configData
    }
  },
  actions:{
    getConfig({ commit }){
      return new Promise((resolve,reject)=>{
      })
    }
  }
}

export default permission