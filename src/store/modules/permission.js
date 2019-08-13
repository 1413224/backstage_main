

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
        //请求config配置文件
        //commit()
      })
    },
    aa(){
      console.log(888)
    }
  }
}

export default permission