export default {
  handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
  },
  beforeAvatarUpload(file) {
    
  },
  getInfo(){
    let _this = this
    _this.$http.get(_this.url.user.GetInfo,{
      params:{
        token:_this.$utils.getToken()
      }
    }).then((res)=>{
      if(res.data.ret==200){
        // console.log(res.data.data)
        let data = res.data.data
        _this.oldPhoneNum = data.mobile
        _this.phone = data.mobile
      }
    })
  },
  goChangePhone(){
    this.showChangePhone = true    
  },
  getYzmChangePhone(){
    let _this = this 
    _this.$http.get(_this.url.user.GetLoginCode,{
      params:{
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
    _this.$http.get(_this.url.user.GetLoginCode,{
      params:{
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
      _this.$http.get(_this.url.user.ChangeMobile,{
        params:{
          token:_this.$utils.getToken(),
          password:_this.MD5(_this.changePhoneForm.changePhonePassword),
          new_mobile:_this.changePhoneForm.newPhone,
          verification_code:_this.changePhoneForm.changePhoneYzm
        }
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message(res.data.data.title)
          _this.$refs[formName].resetFields()
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
      _this.$http.get(_this.url.user.ChangePasswordByCode,{
        params:{
          token:_this.$utils.getToken(),
          verification_code:_this.accountForm.yzm,
          new_password:_this.MD5(_this.accountForm.password)
        }
      }).then((res)=>{
        if(res.data.ret==200){
          _this.$message(res.data.data.title)
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
  }
}