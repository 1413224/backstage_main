import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
// import { resolve } from 'dns';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ss',
      name: 'HelloWorld',
      component: HelloWorld
    },
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
              { name:'侧边栏管理',path:'/menupage' },
              { name:'栏目详情' }
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
            title:'系统页面分类',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'系统页面分类'},
            ]
          }
        },
        {
          path:"/pageManagement/systemPage",
          component:() => import('@/views/pageManagement/systemPage'),
          meta:{
            title:'系统页面',
            parentsLabel:'页面管理',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'系统页面'},
            ]
          }
        },
        {
          path:"/pageManagement/specPage",
          component:() => import('@/views/pageManagement/specPage'),
          meta:{
            title:'所属分类页面列表',
            parentsLabel:'页面管理',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'系统页面分类',path:'/pageManagement/paegClassify' },
              { name:'页面列表'},
            ]
          }
        },
        {
          path:"/settings/attachmentConfig",
          component:() => import('@/views/settings/attachmentConfig'),
          meta:{
            title:'远程附件',
            parentsLabel:'设置',
            breadList:[
              { name:'首页',path:'/home' },
              { name:'远程附件'}
            ]
          }
        }
      ]
    },

  ]
})
