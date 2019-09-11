export default {
  changeAliyun(value){
    let _this = this
    if(value==false){
      _this.interfaceForm.aliyunAccessKeyID = ''
      _this.interfaceForm.aliyunAccessKeySecret = ''
    }
  },
  changeJuhe(value){
    let _this = this
    if(value==false){
      _this.interfaceForm.juhekey = ''
    }
  },
  changeHuyi(value){
    let _this = this
    if(value==false){
      _this.interfaceForm.huyiAppkey = ''
      _this.interfaceForm.huyiAppID = ''
    }
  },
  changeYuntongxun(value){
    let _this = this
    if(value==false){
      _this.interfaceForm.yuntongxunAppID = ''
      _this.interfaceForm.yuntongxunAccountSID = ''
      _this.interfaceForm.yuntongxunAccountToken = ''
    }
  },
  saveConfig(formName){
    let _this = this
    _this.$refs[formName].validate((valid)=>{
      if(!valid){
        return false
      }
      if(
        _this.interfaceForm.aliyunNew==false &&
        _this.interfaceForm.juhe==false &&
        _this.interfaceForm.huyi==false &&
        _this.interfaceForm.yuntongxun==false
      ){
        _this.$message('请选择需要配置的服务')
      }
      let params = {
        token : _this.$utils.getToken(),
        juhe : _this.interfaceForm.juhe == true ? 1 : 0,
        juhe_key : _this.interfaceForm.juhekey,
        aliyun_new : _this.interfaceForm.aliyunNew == true ? 1 : 0,
        aliyun_new_access_key_id : _this.interfaceForm.aliyunAccessKeyID,
        aliyun_new_access_key_secret : _this.interfaceForm.aliyunAccessKeySecret,
        huyi : _this.interfaceForm.huyi == true ? 1 : 0,
        huyi_api_id : _this.interfaceForm.huyiAppID,
        huyi_api_key : _this.interfaceForm.huyiAppkey,
        yuntongxun : _this.interfaceForm.yuntongxun == true ? 1 : 0,
        yuntongxun_app_id : _this.interfaceForm.yuntongxunAppID,
        yuntongxun_account_sid : _this.interfaceForm.yuntongxunAccountSID,
        yuntongxun_account_token : _this.interfaceForm.yuntongxunAccountToken
      }
      _this.$http.get(_this.baseUrl + _this.url.control.SmsSaveConfig,{
        params
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message({
            type:'success',
            message:'保存成功'
          })
        }
      })
    })
  },
  getConfig(){
    let _this = this
    _this.$http.get(_this.baseUrl + _this.url.control.SmsGetConfig,{
      params:{
        token:_this.$utils.getToken()
      }
    }).then((res)=>{
      if(res.data.ret==200){
        // console.log(res)
        let data = res.data.data
        _this.interfaceForm.aliyunNew = data.aliyun_new == 1 ? true : false
        _this.interfaceForm.aliyunAccessKeyID = data.aliyun_new_access_key_id
        _this.interfaceForm.aliyunAccessKeySecret = data.aliyun_new_access_key_secret
        _this.interfaceForm.juhe = data.juhe == 1 ? true : false
        _this.interfaceForm.juhekey = data.juhe_key
        _this.interfaceForm.huyi = data.huyi == 1 ? true : false
        _this.interfaceForm.huyiAppkey = data.huyi_api_key
        _this.interfaceForm.huyiAppID = data.huyi_api_id
        _this.interfaceForm.yuntongxun = data.yuntongxun == 1 ? true :false
        _this.interfaceForm.yuntongxunAppID = data.yuntongxun_app_id
        _this.interfaceForm.yuntongxunAccountSID = data.yuntongxun_account_sid
        _this.interfaceForm.yuntongxunAccountToken = data.yuntongxun_account_token
      }
    })
  }
}