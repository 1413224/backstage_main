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
        {
          path:'/test1',
          component: () => import('@/views/test1'),
          meta:{
            parentsLabel:'店铺'
          }
        },
        {
          path:'/test2',
          component: () => import('@/views/test2'),
          meta:{
            parentsLabel:'店铺'
          }
        },
        {
          path:'/test3',
          component: () => import('@/views/test3'),
          meta:{
            parentsLabel:'店铺'
          }
        },
        {
          path:'/useredit',
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
        {
          path:'/factory',
          component:() => import('@/views/factory')
        },
        {
          path:'/commonlist',
          component:() => import('@/views/commonlist/commonlist'),
          // beforeEnter:(to, from, next)=>{
          //   console.log(777)
          //   next()
          // }
        }
      ]
    },
    
  ]
})
