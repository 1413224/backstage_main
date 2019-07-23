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
      component:() => import('@/views/user/forgetPass')
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
        }
      ]
    },
    
  ]
})
