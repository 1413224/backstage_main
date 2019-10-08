export default {
  "menu":[
    {
      icon: "icon-shangpinguanli",
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
      name: "侧边栏管理",
      path: "/menupage"
    },
    {
      icon:"icon-book",
      isBlank:false,
      menuId:3,
      menuType:"menu",
      name:'页面管理',
      children:[
        {
          menuId:4,
          menuType:"menuPage",
          name:"页面管理",
          path:'/pageManagement'
        },
        {
          menuId:5,
          menuType:"menuPage",
          name:"系统页面分类",
          path:'/pageManagement/paegClassify'
        },
        {
          menuId:6,
          menuType:"menuPage",
          name:"系统页面",
          path:'/pageManagement/systemPage'
        }
      ]
    },
    {
      icon: "icon-team",
      isBlank: false,
      menuId: 10,
      menuType: "menuPage",
      name: "账户管理",
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