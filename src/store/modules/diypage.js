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
    listNum:0,//判断是否需要重新请求加载列表数据
    ids:'',//table列表的ids，其他按钮操作后必须重置
    // tableList:1,//当数据为0时，修改table组件显示状态
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
    // setTableList(state,data){
    //   state.tableList = data
    // }
  },
  actions:{
    getConfigs({ commit }){
      return new Promise((resolve,reject)=>{
        _this.$http.get(_this.url.control.GetDiyListPage,{
          params:{
            token:_this.$utils.getToken(),
            path:'/account/list'
            // path:1
          }
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