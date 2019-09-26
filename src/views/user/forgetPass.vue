<template>
  <div class="page-login">
    <div class="page-lr register">
      <div class="sign-up-box clearfix">
        <div class="sign-up-bg fl">
          <div class="sign-up-content">
            <div class="sign-up-logo">Logo</div>
            <div class="login-btn" @click="toLoginPage">登录</div>
          </div>
        </div>
        <div class="sign-up-formbox fl">
          <div class="form-title">找回密码</div>
          <div class="form-body">
            <el-row>
              <el-col class="input-item">
                <el-input v-model="phone" placeholder="手机号码"></el-input>
              </el-col>
              <el-col class="input-item">
                <el-input v-model="yzm" placeholder="验证码"></el-input>
                <div class="btn-yam">
                  <el-button @click="senYzm" :disabled="yzmDisable">{{yzmText}}</el-button>
                </div>
                <div class="btn-time">60s</div>
              </el-col>
              <el-col class="input-item">
                <el-input v-model="password" placeholder="设置密码" type="password"></el-input>
              </el-col>
            </el-row>
            <div class="login-up" @click="changePassword">确认修改</div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  data(){
    return {
      phone:'',
      password:'',
      yzm:'',
      rememberUserName:true,
      yzmDisable:false,
      agree:false,
      yzmText:'获取验证码'
    }
  },
  created(){

  },
  methods:{
    senYzm(){
      let _this = this
      _this.$http.post(_this.baseUrl + _this.url.user.GetPublicCode,{
        role_type:0,
        mobile:_this.phone,
        type:2
      }).then((res)=>{
        if(res.data.ret==200){
          this.countDown()
        }
      })
    },
    countDown(){
      let _this = this,
          time = 60;
      let timer = setInterval(()=>{
        _this.yzmDisable = true
        time--;
        _this.yzmText = time + 's'
        if(time == 0){
          clearInterval(timer)
          _this.yzmDisable = false
          _this.yzmText = '获取验证码'
        }
      },1000)
    },
    toLoginPage(){
      this.$router.push({
        path:'/login'
      })
    },
    changePassword(){
      let _this = this
      if(_this.phone==''){
        this.$message('请输入手机号码')
        return 
      }
      if(_this.yzm==''){
        this.$message('请输入验证码')
        return 
      }
      if(_this.password==''){
        this.$message('请输入密码')
        return 
      }
      if(_this.$utils.testPhone(_this.phone)){
        this.$message('请输入正确的手机号码')
        return
      }
      _this.$http.post(_this.baseUrl + _this.url.user.ForgetPassword,{
        role_type:_this.url.role_type,
        account:_this.phone,
        verification_code:_this.yzm,
        new_password:_this.MD5(_this.password)
      }).then((res)=>{
        if(res.data.ret==200){
          this.$message(res.data.data.title)
          _this.$router.push({
            path:'/login'
          })
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import url('./style/login.less');
</style>
<style lang="less">
 input::-webkit-input-placeholder{ 
      color:#666 !important;
  }
  input::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #666 !important;
  }
  input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #666 !important;
  }
  input:-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #666 !important;
  }
.input-item{
  .el-input{
    .el-input__inner{
      border: none;
      border-bottom: 1px solid #DCDFE6;
    }
  }
  .el-checkbox__input.is-focus{
    display: unset !important;
  }
  .el-button.is-disabled{
    color: #444;
    border: 1px solid #DCDFE6;
  }
}
.remember{
  .el-button{
    padding: 0;
  }
  .el-checkbox{
    margin-right: 5px;
  }
}
</style>

