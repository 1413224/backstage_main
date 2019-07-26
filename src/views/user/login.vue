<template>
  <div class="page-login">
    <!-- 登录 -->
    <div class="page-lr login" v-if="loginPage">
      <div class="sign-up-box clearfix">
        <div class="sign-up-bg fl">
          <div class="sign-up-content">
            <div class="sign-up-logo">Logo</div>
            <div class="login-btn" @click="loginPage=false">注册</div>
          </div>
        </div>
        <div class="sign-up-formbox fl">
          <div class="form-title">登录</div>
          <div class="form-body">
            <el-row>
              <el-col class="input-item">
                <el-input v-model="phone" placeholder="手机号码"></el-input>
              </el-col>
              <el-col class="input-item">
                <el-input v-model="password" placeholder="登录密码" type="password"></el-input>
              </el-col>
            </el-row>
            <div class="remember clearfix">
              <div class="fl">
                <el-checkbox v-model="rememberUserName">记住用户名</el-checkbox>
              </div>
              <el-button class="fr" type="text" @click="toForgetPage">忘记密码？</el-button>
            </div>
            <div class="login-up" @click="login">登录</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录end -->
    <!-- 注册 -->
    <div class="page-lr register" v-else>
      <div class="sign-up-box clearfix">
        <div class="sign-up-bg fl">
          <div class="sign-up-content">
            <div class="sign-up-logo">Logo</div>
            <div class="login-btn" @click="loginPage=true">登录</div>
          </div>
        </div>
        <div class="sign-up-formbox fl">
          <div class="form-title">注册</div>
          <div class="form-body">
            <el-row>
              <el-col class="input-item">
                <el-input v-model="regPhone" placeholder="手机号码"></el-input>
              </el-col>
              <el-col class="input-item">
                <el-input v-model="regYzm" placeholder="验证码"></el-input>
                <div class="btn-yam">
                  <el-button @click="senYzm" :disabled="yzmDisable">{{yzmText}}</el-button>
                </div>
                <div class="btn-time">60s</div>
              </el-col>
              <el-col class="input-item">
                <el-input v-model="regPassword" placeholder="设置密码" type="password"></el-input>
              </el-col>
            </el-row>
            <div class="remember clearfix">
              <div class="fl">
                <el-checkbox v-model="agree">我同意</el-checkbox>
                <el-button type="text">服务协议</el-button>
              </div>
            </div>
            <div class="login-up">下一步</div>
            <div class="hasuser">
              已有账号？ <el-button type="text" @click="loginPage = true">立即登录</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 注册end -->
  </div>
</template>
<script>
export default {
  data(){
    return {
      loginPage:true,
      phone:'',
      password:'',
      yzm:'',
      rememberUserName:true,
      yzmDisable:false,
      agree:false,
      yzmText:'获取验证码',
      regPhone:'',
      regYzm:'',
      regPassword:''
    }
  },
  created(){
    var _this = this
    document.onkeydown = function(e){
      let key = window.event.keyCode
      if(key==13){
        _this.login()
      }
    }
  },
  methods:{
    senYzm(){
      this.countDown()
    },
    countDown(){
      let _this = this,
          time = 5;
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
    toForgetPage(){
      this.$router.push({
        path:'/forgetPass'
      })
    },
    login(){
      let _this = this
      if(_this.phone==''){
        this.$message('请输入手机号码')
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
      _this.$http.get(_this.url.user.Login,{
        params:{
          account:_this.phone,
          password:_this.MD5(_this.password),
          role_type:_this.url.role_type
        }
      }).then((res)=>{
        if(res.data.ret==200){
          localStorage.setItem("info",JSON.stringify(res.data.data))
          if(_this.$route.query.redirect){
            _this.$router.replace({
              path:_this.$route.query.redirect
            })
          }else{
            _this.$router.replace({
              path:'/test1'
            })
          }
          
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

