// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import axios from './config/axios-config'
import store from './store/index'//引入store
import url from './api/api'
import MD5 from 'js-md5'
import utils from './utils/index'
import './utils/fillter'

import './style/reset.css'
import './style/global.less'
import 'element-ui/lib/theme-chalk/index.css';
import './icons/index'

Vue.config.productionTip = false
Vue.prototype.url = url
Vue.prototype.$http = axios
Vue.prototype.MD5 = MD5
Vue.prototype.$utils = utils

Vue.use(Vuex)
Vue.use(ElementUI)



router.beforeEach(async(to, from, next)=>{
  // next(`/login?redirect=${to.path}`)
  //请求权限路由

  next({

  })
})

router.afterEach(()=>{
  // next()
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
