import Vue from 'vue'
let _this = Vue.prototype
const diymenu = {
  state:{
    menuList:[],
    setting:{}
  },
  mutations:{
    setMenuList(state,data){
      state.menuList = data
    },
    setSetting(state,data){
      state.setting = data
    }
  },
  actions:{
    getMenuList({ commit }){
      return new Promise((resolve,reject)=>{
        _this.$http.get(_this.url.control.GetDiyPageMenu,{
          params:{
            token:_this.$utils.getToken()
          }
        }).then((res)=>{
          if(res.data.ret==200){
            // console.log(res.data.data.menu)
            commit('setMenuList',res.data.data.menu)
            commit('setSetting',res.data.data.setting)
            resolve(res.data.data)
          }
        })
      })
    }
  }
}

export default diymenu