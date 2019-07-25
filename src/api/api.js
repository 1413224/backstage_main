
let url = {
  role_type:0,
  user:{
    Login:'common/role/Account/Login',
    Logout:'common/role/Account/Logout',
    ForgetPassword:'common/role/Account/ForgetPassword',
    GetPublicCode:'common/role/verificationCode/GetPublicCode',//账户未登录时发送验证码接口
    GetLoginCode:'common/role/verificationCode/GetLoginCode',//账户登录后发送验证码接口
    GetInfo:'common/role/Account/GetInfo',//后台端获取账户信息接口
    ChangeInfo:'common/role/Account/ChangeInfo',//后台端修改账户信息接口
    ChangeMobile:'common/role/Account/ChangeMobile',//后台端修改手机号接口
    ChangePasswordByCode:'common/role/Account/ChangePasswordByCode',//后台端根据验证码修改密码接口
    GetValidList:'common/Area/GetValidList',//获取地址列表信息接口
  }
}

export default url