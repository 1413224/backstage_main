<template>
  <div class="wrapper">
    <div class="tab">
      <el-tabs v-model="activeName">
        <el-tab-pane label="个人信息" name="first">
          <div class="not-edit-all">
            <div class="avatar-type">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <template v-else>
                  <el-avatar :size="80" src="">
                    <img src="../../assets/user_header.png" class="avatar-img"/>
                  </el-avatar>
                  <div class="tip">修改</div>
                </template>
              </el-upload>
            </div>
            <el-row class="item">
              <el-col :span="5" class="lab">昵称</el-col>
              <el-col :span="19">
                <el-input v-model="nickName" placeholder="请填写您的昵称"></el-input>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5" class="lab">QQ号</el-col>
              <el-col :span="19">
                <el-input v-model="qqNumber" placeholder="请填写您的QQ号"></el-input>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5" class="lab">微信号</el-col>
              <el-col :span="19">
                <el-input v-model="wxNumber" placeholder="请填写您的微信号"></el-input>
              </el-col>
            </el-row>
            <el-row class="item">
              <el-col :span="5" class="lab">邮箱</el-col>
              <el-col :span="19">
                <el-input v-model="email" placeholder="请填写您的邮箱"></el-input>
              </el-col>
            </el-row>
            <el-button type="primary" class="submit">保存</el-button>
          </div>
        </el-tab-pane>


        <el-tab-pane label="账号管理" name="second">
          <div class="not-edit-all not-edit-all2" v-show="!showChangePhone">
            <p class="msg-title">微盟账号</p>
            <el-row class="item">
              <el-col :span="5" class="lab">手机号码</el-col>
              <el-col :span="11">
                <el-input v-model="phone" readonly=""></el-input>
              </el-col>
              <el-col :span="8" class="lab-right"><span @click="goChangePhone">修改手机号</span></el-col>
            </el-row>
            <p class="msg-title">修改密码</p>
            <el-form :model="accountForm" :rules="rules" ref="accountForm" label-width="82px">
              <el-row class="item">
                <el-col :span="17">
                  <el-form-item label="短信验证码" prop="yzm">
                    <el-input v-model="accountForm.yzm" autocomplete="off" placeholder="请填写短信验证码"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="7" class="lab-right">获取验证码</el-col>
              </el-row>
              <el-row class="item">
                <el-col>
                  <el-form-item label="设置密码" prop="password">
                    <el-input v-model="accountForm.password" type="password" autocomplete="off" placeholder="8-16位，必须包含数字和字母"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-button type="primary" class="submit">确认修改</el-button>            
            </el-form>
          </div>


          <!-- 修改手机号 -->
          <div class="change-phone" v-show="showChangePhone">
            <p class="tit"><span @click="showChangePhone = false">账号管理</span> - 修改手机号</p>
            <div class="not-edit-all">
              <el-row class="item">
                <el-col :span="5" class="lab">旧手机号</el-col>
                <el-col :span="19">
                  <el-input v-model="oldPhoneNum" readonly=""></el-input>
                </el-col>
              </el-row>
              <el-form :model="changePhoneForm" :rules="changePhoneRules" ref="changePhoneForm" label-width="82px">
                <el-row class="item">
                  <el-col>
                    <el-form-item label="旧密码" prop="oldPassword">
                      <el-input v-model="changePhoneForm.oldPassword" type="password" autocomplete="off" placeholder="请填写旧密码"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="item">
                  <el-col>
                    <el-form-item label="新手机号" prop="newPhone">
                      <el-input v-model="changePhoneForm.newPhone" autocomplete="off" placeholder="请填写更改后的手机号"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="item">
                  <el-col :span="17">
                    <el-form-item label="短信验证码" prop="changePhoneYzm">
                      <el-input v-model="changePhoneForm.changePhoneYzm" autocomplete="off" placeholder="请填写短信验证码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7" class="lab-right">
                    <span v-if="showChangePhoneTime" @click="getYzmChangePhone">获取验证码</span>
                    <span class="yzm" v-if="!showChangePhoneTime">{{timesChangePhone}}</span>
                  </el-col>
                </el-row>
                <el-row class="item">
                  <el-col>
                    <el-form-item label="设置密码" prop="changePhonePassword">
                      <el-input v-model="changePhoneForm.changePhonePassword" type="password" autocomplete="off" placeholder="8-16位，必须包含数字和字母"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-button type="primary" class="submit" @click="changePhoneSubmit('changePhoneForm')">确认修改</el-button>            
              </el-form>
            </div>
          </div>
          <!-- 修改手机号end -->
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import actions from './actions/useredit'
export default {
  data() {
    let validateYzm = (rule,value,callback) =>{
      if(value == ""){
        callback(new Error('请输入验证码'))
      }else{
        callback()
      }
    }
    let validatorPass = (rule,value,callback) => {
      if(value == ""){
        callback(new Error('请输入密码'))
      }else{
        callback()
      }
      if(this.$utils.testPassword(value)){
        callback(new Error('请输入8-16位，必须包含数字和字母'))
      }else{
        callback()
      }
    }
    let validatorOldPass = (rule,value,callback) => {
      if(value == ""){
        callback(new Error('请输入旧密码'))
      }else{
        callback()
      }
    }
    let validatorNewPhone = (rule,value,callback) => {
      if(value == ""){
        callback(new Error('请输入手机号'))
      }else{
        callback()
      }
      if(this.$utils.testPhone(value)){
        callback(new Error('手机号格式不正确'))
      }else{
        callback()
      }
    }
    return {
      showChangePhone:false,
      showChangePhoneTime:true,
      timesChangePhone:'',
      activeName:'second',
      imageUrl:'',
      nickName:'',
      qqNumber:'',
      wxNumber:'',
      email:'',
      accountForm:{
        yzm:'',
        password:''
      },
      rules:{
        yzm:[
          {validator:validateYzm}
        ],
        password:[
          {validator:validatorPass}
        ]
      },
      phone:'15219150150',
      oldPhoneNum:'',
      changePhoneForm:{
        oldPassword:'',
        newPhone:'',
        changePhoneYzm:'',
        changePhonePassword:''
      },
      changePhoneRules:{
        oldPassword:[{validator:validatorOldPass}],
        newPhone:[{validator:validatorNewPhone}],
        changePhoneYzm:[{validator:validateYzm}],
        changePhonePassword:[{validator:validatorPass}],
      }
    }
  },
  created(){

  },
  methods:{
    ...actions
  }
}
</script>
<style lang="less" scoped>
@import url('./style/useredit.less');
</style>
<style lang="less">
.not-edit-all{
  .item{
    .el-input__inner{
      border: none;
    }
    .el-input{
      top: -2px;
    }
  }
  .el-form-item__label{
    color: #9797a1;
    text-align: left;
  }
}
</style>


