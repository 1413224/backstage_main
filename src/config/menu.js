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
          menuId:'pageGroup',
          menuType:'menuLabel',
          name:'页面组',
          children:[
            {
              menuId:'pageGroupList',
              menuType:"menuPage",
              name:"页面组",
              path:'/pageManagement/pageGroup'
            }
          ]
        },
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
            {
              menuId:7,
              menuType:"menuPage",
              name:"页面分类",
              path:'/pageManagement/currencyPage/paegClassify'
            }
          ]
        },
        {
          menuId:'drafts',
          menuType:'menuPage',
          name:'草稿箱',
          path:'/pageManagement/currencyPage/drafts'
        }
        
      ]
    },
    {
      icon: "icon-detail",
      isBlank: false,
      menuId: 'diction',
      menuType: "menu",
      name: "字典",
      path: "/diction",
      children:[
        {
          menuId:'dictionGl',
          menuType:'menuLabel',
          name:'字典管理',
          children:[
            {
              menuId:'logType',
              menuType:"menuPage",
              name:"日志类型",
              path:'/'
            },
            {
              menuId:'permGroup',
              menuType:"menuPage",
              name:"权限组",
              path:'/perm'
            }
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
        // {
        //   menuId:12,
        //   menuType:"menuPage",
        //   name:"远程附件",
        //   path:'/settings/attachmentConfig'
        // },
        {
          menuId:'account',
          menuType:'menuLabel',
          name:'账号信息',
          children:[
            {
              menuId:'userInfo',
              menuType:'menuPage',
              name:'个人信息',
              path:'/settings/attachmentConfig'
            }
          ]
        },
        {
          menuId:'system',
          menuType:'menuLabel',
          name:'系统设置',
          children:[
            {
              menuId:'roleManage',
              menuType:'menuPage',
              name:'角色管理',
              path:'/settings/roleConfig/roleList'
            },
            {
              menuId:'operator',
              menuType:'menuPage',
              name:'操作员管理',
              path:'/settings/operator/operatorList'
            },
            {
              menuId:'addressLibrary',
              menuType:'menuPage',
              name:'地址库',
              path:'/settings/addressLibrary/addressList'
            },
            {
              menuId:'journal',
              menuType:'menuPage',
              name:'操作日志',
              path:'/settings/journal/journalList'
            }
          ]
        },
        
      ]
    }
  ]
}