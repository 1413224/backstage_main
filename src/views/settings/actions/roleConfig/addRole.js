export default {
  GetRoleType(){
    return new Promise((resolve,reject)=>{
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.common.GetRoleType,{
        role_type:_this.url.role_type,
        token:_this.$utils.getToken()
      }).then((res)=>{
        if(res.data.ret==200){
          let data = res.data.data
          _this.options = data.map((item)=>{
            return {
              label:item.name,
              value:Number(item.role_type)
            }
          })
        }
      })
    })
  },
}