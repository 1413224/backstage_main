import Vue from 'vue'
import { resolve, reject } from 'q';
let _this = Vue.prototype
const diypage = {
  state:{
    pageData:{},
    headerData:{},
    mainData:[],
    ruleForm:{},//搜索，参数
    lineConfig:[],//tablelineConfigs
    tableConfig:{},
    listNum:0,
    ids:'',
  },

  mutations:{
    setConfigs(state,configData){
      state.pageData = configData.page
      state.headerData = configData.header
      state.mainData = configData.main

      configData.main.map((item,index)=>{
        if(item.type=="diyTable"){
          state.lineConfig = item.line
          state.tableConfig = item
        }
      })
    },
    setRuleForm(state,data){
      state.ruleForm = data
    },
    changeList(state,data){
      state.listNum += data
    },
    setIds(state,data){
      state.ids = data
    },
  },
  actions:{
    getConfigs({ commit }){
      return new Promise((resolve,reject)=>{
        _this.$http.post(_this.baseUrl + _this.url.control.GetDiyListPage,{
          token:_this.$utils.getToken(),
          path:'/account/list'
          // path:1
        }).then((res)=>{
          if(res.data.ret==200){
            commit('setConfigs',res.data.data)
            resolve(res.data.data)
          }
        })
      })
    }
  }
}

export default diypage