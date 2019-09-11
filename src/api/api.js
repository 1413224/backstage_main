
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
    GetMultilevelList:'common/Area/GetMultilevelList',//根据当前的area_ids获取多级地址列表信息接口，仅显示有效的
  },
  manageFactory:{
    GetList:'manageFactory/navbar/Manage/GetList',//获取侧边栏列表信息接口
    AddManage:'manageFactory/navbar/Manage/Add',//新增侧边栏组
    ChangeManageStatusById:'manageFactory/navbar/Manage/ChangeStatusById',//批量修改栏目组可用状态接口
    GetManageInfoById:'manageFactory/navbar/Manage/GetInfoById',//获取侧边栏详情信息接口
    EditManageById:'manageFactory/navbar/Manage/EditById',//修改侧边栏组信息接口
    DelManageById:'manageFactory/navbar/Manage/DelById',//删除栏目组接口
  },
  Menu:{
    AddMenu:'manageFactory/navbar/Menu/Add',//新增栏目，页面
    GetMenuList:'manageFactory/navbar/Menu/GetList',//
    DelMenuByIds:'manageFactory/navbar/Menu/DelByIds',//批量删除栏目信息接口
    GetInfoById:'manageFactory/navbar/Menu/GetInfoById',//获取侧边栏栏目的详情信息接口
    EditById:'manageFactory/navbar/Menu/EditById',//修改侧边栏组信息接口
    ChangeStatusByIds:'manageFactory/navbar/Menu/ChangeStatusByIds',//批量修改栏目可用状态接口
    GetAllList:'manageFactory/navbar/Menu/GetAllList',//一次性获取侧边栏组所有的栏目列表信息接口
    UpdateMenuDisplayOrder:'manageFactory/navbar/Menu/UpdateMenuDisplayOrder',//更新栏目排序信息接口
  },
  System:{
    AddCate:'manageFactory/page/System/AddCate',//新增系统页面分类信息接口
    GetCateList:'manageFactory/page/System/GetCateList',//获取系统页面分类列表信息接口
    ChangeCateStatusByIds:'manageFactory/page/System/ChangeCateStatusByIds',//批量修改系统页面分类可用状态接口
    GetCateInfoById:'manageFactory/page/System/GetCateInfoById',//获取系统页面分类详情
    DelCateByIds:'manageFactory/page/System/DelCateByIds',//批量删除系统页面分类信息接口
    EditCateById:'manageFactory/page/System/EditCateById',//修改系统页面分类信息接口
    GetAllValidCateList:'manageFactory/page/System/GetAllValidCateList',//获取指定场景下所有可用系统页面分类列表信息接口
    Add:'manageFactory/page/System/Add',//新增系统页面信息接口
    GetList:'manageFactory/page/System/GetList',//获取系统页面列表信息接口
    ChangeStatusByIds:'manageFactory/page/System/ChangeStatusByIds',//批量修改系统页面可用状态接口
    EditById:'manageFactory/page/System/EditById',//修改系统页面信息接口
    DelByIds:'manageFactory/page/System/DelByIds',//批量删除系统页面信息接口

  },
  common:{
    GetRoleType:'cloud/common/Code/GetRoleType',//获取角色类型码接口
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
    UpdateCommonCategoryDisplayOrderByIds:'control/setting/CommonCategory/UpdateDisplayOrderByIds',//总平台管理端统一修改所有通用分类排序接口
    

  }
}

export default url