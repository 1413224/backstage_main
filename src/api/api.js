
let url = {
  role_type:0,
  user:{
    Login:'common/role/Account/Login',
    Logout:'common/role/Account/Logout',
    ForgetPassword:'common/role/Account/ForgetPassword',
    GetPublicCode:'common/role/verificationCode/GetPublicCode',//账户未登录时发送验证码接口
    GetLoginCode:'common/role/verificationCode/GetLoginCode',//账户登录后发送验证码接口
    ChangePasswordByOld:'common/role/Account/ChangePasswordByOld',//后台端根据旧密码修改密码接口
    GetInfo:'common/role/Account/GetInfo',//后台端获取账户信息接口
    ChangeInfo:'common/role/Account/ChangeInfo',//后台端修改账户信息接口
    ChangeMobile:'common/role/Account/ChangeMobile',//后台端修改手机号接口
    ChangePasswordByCode:'common/role/Account/ChangePasswordByCode',//后台端根据验证码修改密码接口
    GetValidList:'common/Area/GetValidList',//获取地址列表信息接口
  },
  control:{
    AddAres:'control/setting/Area/Add',//总平台管理端新增地址信息接口
    ChangeStatusByIds:'control/setting/Area/ChangeStatusByIds',//总平台管理端批量修改地址可用状态接口
    DelAreaByIds:'control/setting/Area/DelByIds',//总平台管理端批量删除地址接口
    EditAreaById:'control/setting/Area/EditById',//总平台管理端修改地址信息接口
    GetAreaInfoById:'control/setting/Area/GetInfoById',//总平台管理端获取地址详情信息接口
    GetAreaList:'control/setting/Area/GetList',//总平台管理端获取地址列表信息接口[非总后台请勿调用该接口]
    UpdateAreaData:'control/setting/Area/UpdateAreaData',//总平台管理端更新区域数据
    UpdateDisplayOrderById:'control/setting/Area/UpdateDisplayOrderById',//总平台管理端修改地址排序接口
    SmsGetConfig:'control/setting/Sms/GetConfig',//总平台管理端获取短信接口设置信息接口
    SmsSaveConfig:'control/setting/Sms/SaveConfig',//总平台管理端修改短信接口设置信息接口
    GetCommonCategoryList:'control/setting/CommonCategory/GetList',//总平台管理端获取通用分类列表信息接口[非总后台请勿调用该接口]
    DelCommonCategoryByIds:'control/setting/CommonCategory/DelByIds',//总平台管理端批量删除通用分类接口
    AddCommonCategory:'control/setting/CommonCategory/Add',//总平台管理端新增通用分类信息接口
    EditCommonCategoryById:'control/setting/CommonCategory/EditById',//总平台管理端修改通用分类信息接口
    ChangeCommonCategoryStatusByIds:'control/setting/CommonCategory/ChangeStatusByIds',//总平台管理端批量修改通用分类可用状态接口
  }
}

export default url