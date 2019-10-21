import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import { resolve } from 'dns';

Vue.use(Router)

export default new Router({
  routes: [
    
    {
      path:'/login',
      name:'login',
      component:() => import('@/views/user/login')
    },
    {
      path:'/forgetPass',
      name:'forget',
      component:() => import('@/views/user/forgetPass'),
      meta:{
        title:'忘记密码'
      }
    },
    {
      path:'/',
      name:'layout',
      component: () => import('@/layout'),
      children:[
        // {
        //   path:'/account/list',
        //   component: () => import('@/views/commonlist/commonlist'),
        //   meta:{
        //     parentsLabel:'账户管理'
        //   }
        // },
        // {
        //   path:'/account/positionList',
        //   component: () => import('@/views/test2'),
        //   meta:{
        //     parentsLabel:'店铺'
        //   }
        // },
        // {
        //   path:'/project',
        //   component: () => import('@/views/test3'),
        //   meta:{
        //     parentsLabel:'店铺'
        //   }
        // },
        {
          path: '/index',
          name: 'index',
          component: () => import('@/views/index'),
          meta:{
            title:'首页'
          }
        },
        {
          path:'/issue',
          component: () => import('@/views/user/useredit'),
          meta:{
            title:'账户信息'
          }
        },
        {
          path:'/addressLibrary',
          component: () => import('@/views/addressLibrary/index'),
          meta:{
            title:'全球地址库'
          }
        },
        {
          path:'/setUp/shortMessage/setInterface',
          component: () => import('@/views/setUp/shortMessage/setInterface'),
          meta:{
            title:'短信接口设置',
            parentsLabel:'设置'
          }
        },
        {
          path:'/setUp/classification/index',
          component: () => import('@/views/setUp/classification/index'),
          meta:{
            parentsLabel:'设置',
            title:'通用分类'
          }
        },
        // {
        //   path:'/factory',
        //   component:() => import('@/views/factory')
        // },
        // {
        //   path:'/commonlist',
        //   component:() => import('@/views/commonlist/commonlist'),
        // },
        // {
        //   path:'/account/Add',
        //   component:() => import('@/views/commonEdit/commonEdit')
        // },
        {
          path:'/menupage',
          component:() => import('@/views/menuPage/index'),
          meta:{
            title:'侧边栏管理',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'侧边栏管理' }
            ]
          }
        },
        {
          path:"/menupage/addMenuPage",
          component:() => import('@/views/menuPage/addMenuPage'),
          meta:{
            title:'新增侧边栏',
            parentsLabel:'导航',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'侧边栏管理',path:'/menupage' },
              { name:'新增侧边栏' }
            ]
          }
        },
        {
          path:"/menupage/menuDetail",
          component:() => import('@/views/menuPage/menuDetail'),
          meta:{
            title:'栏目详情',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'导航管理',path:'/menupage' },
              { name:'栏目' }
            ]
          }
        },
        {
          path:"/pageManagement",
          component:() => import('@/views/pageManagement/pageManagement'),
          meta:{
            title:'页面管理',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'页面管理'},
            ]
          }
        },
        {
          path:"/pageManagement/paegClassify",
          component:() => import('@/views/pageManagement/paegClassify'),
          meta:{
            title:'页面分类',
            parentsLabel:'页面',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'页面分类'},
            ]
          }
        },
        {
          path:"/pageManagement/systemPage",
          component:() => import('@/views/pageManagement/systemPage'),
          meta:{
            title:'页面列表',
            parentsLabel:'页面',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'页面列表'},
            ]
          }
        },
        {
          path:"/pageManagement/specPage",
          component:() => import('@/views/pageManagement/specPage'),
          meta:{
            title:'所属分类页面列表',
            parentsLabel:'页面',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'系统页面分类',path:'/pageManagement/paegClassify' },
              { name:'页面列表'},
            ]
          }
        },
        {
          path:"/pageManagement/currencyPage/pageList",
          component:() => import('@/views/pageManagement/currencyPage/pageList'),
          meta:{
            title:'通用页面列表',
            parentsLabel:'页面',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'页面列表'},
            ]
          }
        },
        {
          path:"/pageManagement/currencyPage/addPageList",
          component:() => import('@/views/pageManagement/currencyPage/addPageList'),
          meta:{
            title:'新增通用页面列表',
            parentsLabel:'页面',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'页面列表',path:'/pageManagement/currencyPage/pageList'},
              { name:'新增页面' }
            ]
          }
        },
        {
          path:"/pageManagement/currencyPage/paegClassify",
          component:() => import('@/views/pageManagement/currencyPage/paegClassify'),
          meta:{
            title:'通用页面页面分类',
            parentsLabel:'页面',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'页面分类'},
            ]
          }
        },
        {
          path:"/pageManagement/currencyPage/addSpecPage",
          component:() => import('@/views/pageManagement/currencyPage/addSpecPage'),
          meta:{
            title:'新增/编辑通用页面分类新增分类页面',
            parentsLabel:'页面',
            breadList:[
              { name:'通用页面',path:'/pageManagement/currencyPage/pageList' },
              { name:'页面分类',path:'/pageManagement/currencyPage/paegClassify'},
              { name:'新增页面' }
            ]
          }
        },
        {
          path:'/pageManagement/currencyPage/addSpecPageList',
          component:() => import('@/views/pageManagement/currencyPage/addSpecPageList'),
          meta:{
            title:'通用页面分类新增分类页面列表',
            parentsLabel:'页面',
            breadList:[
              { name:'通用页面',path:'/pageManagement/currencyPage/pageList' },
              { name:'页面分类',path:'/pageManagement/currencyPage/paegClassify'},
              { name:'页面列表' }
            ]
          }
        },
        {
          path:'/pageManagement/currencyPage/customPage',
          component:() => import('@/views/pageManagement/currencyPage/customPage'),
          meta:{
            title:'自定义后台页面',
            parentsLabel:'页面',
            breadList:[
              { name:'通用页面',path:'/pageManagement/currencyPage/pageList' },
              { name:'页面列表',path:'/pageManagement/currencyPage/addSpecPageList'},
              { name:'新增页面' }
            ]
          }
        },
        {
          path:'/settings/attachmentConfig',
          component:() => import('@/views/settings/attachmentConfig'),
          meta:{
            title:'远程附件',
            parentsLabel:'设置',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'远程附件'}
            ]
          }
        },
        {
          path:'/settings/roleConfig/roleList',
          component:() => import('@/views/settings/roleConfig/roleList'),
          meta:{
            title:'角色列表',
            parentsLabel:'设置',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'角色管理'}
            ]
          }
        },
        {
          path:'/settings/roleConfig/addRole',
          component:() => import('@/views/settings/roleConfig/addRole'),
          meta:{
            title:'新增角色',
            parentsLabel:'设置',
            breadList:[
              { name:'角色管理',path:'/settings/roleConfig/roleList' },
              { name:'新增角色'}
            ]
          }
        },
        {
          path:'/settings/roleConfig/roleDetail',
          component:() => import('@/views/settings/roleConfig/roleDetail'),
          meta:{
            title:'角色详情',
            parentsLabel:'设置',
            breadList:[
              { name:'角色管理',path:'/settings/roleConfig/roleList' },
              { name:'角色详情'}
            ]
          }
        }
      ]
    },

  ],
  scrollBehavior(to, from, savedPosition){
    return {x:0,y:0}
  }
})
