export default {
  "menu":[
    {
      icon: "icon-home",
      isBlank: false,
      menuId: 1,
      menuType: "menuPage",
      name: "首页",
      path: "/index"
    },
    {
      icon: "icon-detail",
      isBlank: false,
      menuId: 2,
      menuType: "menupage",
      name: "导航",
      path: "/menupage"
    },
    {
      icon:"icon-book",
      isBlank:false,
      menuId:3,
      menuType:"menu",
      name:'页面',
      children:[
        {
          menuId:'system',
          menuType:'menuLabel',
          name:'系统页面',
          children:[
            {
              menuId:6,
              menuType:"menuPage",
              name:"页面列表",
              path:'/pageManagement/systemPage'
            },
            {
              menuId:5,
              menuType:"menuPage",
              name:"页面分类",
              path:'/pageManagement/paegClassify'
            },
            
          ]
        },
        {
          menuId:'currency',
          menuType:'menuLabel',
          name:'通用页面',
          children:[
            {
              menuId:4,
              menuType:"menuPage",
              name:"页面列表",
              path:'/pageManagement/currencyPage/pageList'
            },
          ]
        }
        
      ]
    },
    {
      icon: "icon-team",
      isBlank: false,
      menuId: 10,
      menuType: "menuPage",
      name: "账户",
      path: "/issue"
    },
    {
      icon: "icon-setting",
      isBlank: false,
      menuId: 11,
      menuType: "menuPage",
      name: "设置",
      children:[
        {
          menuId:12,
          menuType:"menuPage",
          name:"远程附件",
          path:'/settings/attachmentConfig'
        },
      ]
    }
  ]
}