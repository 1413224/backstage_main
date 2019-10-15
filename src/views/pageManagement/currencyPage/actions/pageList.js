export default {
  changeSel(value){
    this.getPageCates(value)
  },
  GetRoleType(){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.common.GetRoleType,{
        role_type:_this.url.role_type,
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret==200){
          // console.log(res.data.data)
          let data = res.data.data
          let arr = []
          _this.options = data.map((item)=>{
            return {
              label:item.name,
              value:Number(item.role_type)
            }
          })
          
          _this.roleTypeList = data.map((item)=>{
            return {
              label:item.name,
              value:Number(item.role_type)
            }
          })

          _this.pageRoleTypeOptions = data.map((item)=>{
            return {
              label:item.name,
              value:Number(item.role_type)
            }
          })
         _this.options.unshift({label:'全部适用',value:-1})
         _this.pageRoleTypeOptions.unshift({label:'全部',value:-1})
         _this.options.unshift({label:'选择适用场景',value:-2})
          resolve()
        }
      })
    })
  },
  getPageCates(roleType){
    return new Promise((resolve,reject)=>{
      let _this = this 
      if(roleType==-2){
        _this.pageTypeOptions = []
        return false
      }
      _this.$http.post(_this.baseUrl + _this.url.Common.GetAllValidCateList,{
        token:_this.$utils.getToken(),
        role_type:roleType || roleType == 0 ? roleType : -1
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.pageOptions = data.list.map((item,index)=>{
            return {
              label:item.name,
              value:Number(item.id)
            }
          })
          _this.pageTypeOptions = data.list.map((item,index)=>{
            return {
              label:item.name,
              value:Number(item.id)
            }
          })
          resolve(_this.pageOptions)
        }
      })
    })
  },
  addPage(){
    this.$router.push({
      path:'/pageManagement/currencyPage/addPageList'
    })
  },
  getList(){

  },
  delPage(){

  },
  selectionChange(selection){
    this.selection = selection
  },
}