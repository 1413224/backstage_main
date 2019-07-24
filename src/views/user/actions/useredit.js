export default {
  handleAvatarSuccess(res, file) {
    this.imageUrl = URL.createObjectURL(file.raw);
  },
  beforeAvatarUpload(file) {
    
  },
  goChangePhone(){
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
        this.showChangePhone = true
      }
    })
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
          alert("成功")
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
}