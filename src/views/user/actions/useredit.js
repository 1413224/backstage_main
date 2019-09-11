export default {
  handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
  },
  beforeAvatarUpload(file) {
    
  },
  getInfo(){
    let _this = this
    _this.$http.get(_this.baseUrl + _this.url.user.GetInfo,{
      params:{
        token:_this.$utils.getToken(),
        role_type: _this.url.role_type
      }
    }).then((res)=>{
      if(res.data.ret==200){
        // console.log(res.data.data)
        let data = res.data.data
        _this.oldPhoneNum = data.mobile
        _this.phone = data.mobile
        //个人信息
        _this.nickName = data.nickname
        _this.qqNumber = data.qq
        _this.wxNumber = data.wechat
        _this.email = data.email
        _this.alipay = data.alipay
        _this.gender = Number(data.gender)
        _this.emergencyStatus = data.emergency_status
        if(data.emergency_info.emergency_type!=0){
          _this.emergencyType = Number(data.emergency_info.emergency_type)
        }
        _this.emergency = data.emergency_info.emergency
        _this.egmobile = data.emergency_info.egmobile
        _this.remark = data.remark
      }
    })
  },
  changeInfo(){
    let _this = this
    let params = {
      role_type: _this.url.role_type,
      token:_this.$utils.getToken(),
      nickname:_this.nickName,
      thumb:'',
      gender:_this.gender,
      email:_this.email,
      qq:_this.qqNumber,
      wechat:_this.wxNumber,
      alipay:_this.alipay,
      remark:_this.remark,
      emergency_status:_this.emergencyStatus

    }
    if(_this.emergencyStatus==1){
      params.emergency_type = _this.emergencyType
      params.emergency = _this.emergency
      params.egmobile = _this.egmobile
    }
    _this.$http.get(_this.baseUrl + _this.url.user.ChangeInfo,{
      params
    }).then((res)=>{
      if(res.data.ret==200){
        _this.$message({
          type: 'success',
          message:res.data.data.title
        })
      }
    })
  },
  resetInfo(){

  },
  goChangePhone(){
    this.showChangePhone = true  
    this.activeName = 'third'
  },
  getYzmChangePhone(){
    let _this = this 
    _this.$http.get(_this.baseUrl + _this.url.user.GetLoginCode,{
      params:{
        role_type:_this.url.role_type,
        token:_this.$utils.getToken(),
        mobile:_this.changePhoneForm.newPhone,
        type:3
      }
    }).then((res)=>{
      if(res.data.ret==200){
        _this.changePhoneCountDown()
      }
    })
  },
  getYzmByChangePass(){
    let _this = this
    _this.$http.get(_this.baseUrl + _this.url.user.GetLoginCode,{
      params:{
        role_type:_this.url.role_type,
        token:_this.$utils.getToken(),
        type:1
      }
    }).then((res)=>{
      if(res.data.ret==200){
        _this.changePassCountDown()
      }
    })
  },
  changePhoneSubmit(formName){
    let _this = this
    _this.$refs[formName].validate((valid) => {
      if(!valid){
        return false
      }
      _this.$http.get(_this.baseUrl + _this.url.user.ChangeMobile,{
        params:{
          role_type:_this.url.role_type,
          token:_this.$utils.getToken(),
          password:_this.MD5(_this.changePhoneForm.changePhonePassword),
          new_mobile:_this.changePhoneForm.newPhone,
          verification_code:_this.changePhoneForm.changePhoneYzm
        }
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message(res.data.data.title)
          _this.$refs[formName].resetFields()
          _this.getInfo()
          _this.showChangePhoneTime = true
        }
      })

    })
  },
  ChangePasswordByCode(formName){
    let _this = this
    _this.$refs[formName].validate((valid) => {
      if(!valid){
        return false
      }
      let url
      let params={
        role_type:_this.url.role_type,
        token:_this.$utils.getToken(),
        new_password:_this.MD5(_this.accountForm.password)
      }
      if(_this.chanPasswordStatus==0){//根据旧密码修改
        params.old_password = _this.MD5(_this.accountForm.oldPassword)
        url = _this.baseUrl + _this.url.user.ChangePasswordByOld
      }
      if(_this.chanPasswordStatus==1){//根据验证码修改密码
        params.verification_code = _this.accountForm.yzm
        url = _this.baseUrl + _this.url.user.ChangePasswordByCode
      }

      _this.$http.get(url,{
        params
      }).then((res)=>{
        if(res.data.ret==200){
          localStorage.removeItem('info')
          _this.$message({
            type:'success',
            message:res.data.data.title
          })
          _this.$refs[formName].resetFields()
          _this.$router.replace({
            path:'/login'
          })
        }
      })
    })
  },
  changePhoneCountDown(){
    let _this = this,
        time = 60;
    let timer = setInterval(()=>{
      _this.showChangePhoneTime = false
      time--;
      _this.timesChangePhone = time + 's'
      if(time == 0){
        clearInterval(timer)
        _this.showChangePhoneTime = true
      }
    },1000)
  },
  changePassCountDown(){
    let _this = this,
        time = 60;
    let timer = setInterval(()=>{
      _this.showChangePassByYzm = false
      time--;
      _this.timesChangePass = time + 's'
      if(time == 0){
        clearInterval(timer)
        _this.showChangePassByYzm = true
      }
    },1000)
  },
  changePassWordStatus(formName){
    let _this = this
    // _this.accountForm.oldPassword = ''
    // _this.accountForm.yzm = ''
    _this.$refs[formName].resetFields()
  },
  changePassStatus(num){
    if(num=='1'){
      this.showYZM = false
    }else{
      this.showYZM = true
    }
    this.$refs['accountForm'].resetFields()
  }

}