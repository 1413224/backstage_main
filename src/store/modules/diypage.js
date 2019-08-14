import Vue from 'vue'
import { resolve, reject } from 'q';
let _this = Vue.prototype
const diypage = {
  state:{
    pageData:{},
    headerData:{},
    mainData:{},
  },

  mutations:{
    setConfigs(state,configData){
      state.pageData = configData.page
      state.headerData = configData.header
      state.mainData = configData.main
    }
  },
  actions:{
    getConfigs({ commit }){
      return new Promise((resolve,reject)=>{
        _this.$http.get(_this.url.control.GetDiyListPage,{
          params:{
            token:_this.$utils.getToken(),
            num:1
          }
        }).then((res)=>{
          if(res.data.ret==200){
            commit('setConfigs',res.data.data)
            resolve(res.data.data)
          }else{
            reject(error)
          }
        })
      })
    }
  }
}

export default diypage