import Vue from 'vue'
import store from '@/store/index'
import axios from 'axios'
import { Message, Loading } from 'element-ui';
import router from '../router';


axios.defaults.retry = 4 //请求次数
axios.defaults.retryDelay = 1000 //请求间隙
// axios.defaults.baseURL = '//dev.9yetech.com/apigw/' // 演示环境

axios.interceptors.request.use(config => {
	if(config.params){
		if(!config.params.isNoLoading){
			// Loading.service({text:'加载中'})
		}
	}

	let _token = Vue.prototype.$utils.getToken(),
			type = 'application/json;charset=utf-8';
			// type = 'Content-Type: multipart/form-data'


	config.headers = {
		'Content-Type': type,
		// 'token': _token
	}

	return config
},error => {
    return Promise.reject(error)
})



axios.interceptors.response.use(res => {
	// Loading.service().close()
	if(res.data.ret!==200){
		Message(res.data.msg)
		// console.log(router)
		if(
				res.data.ret == 10000	//登陆信息已失效
				|| res.data.ret == 400	//缺少必要参数token
			){
			router.push({
				path:`/login?redirect=${router.history.current.fullPath}`
			})
		}
	}
	return res
},error => {
    // Loading.service().close()

    return Promise.reject(error)
})

export default axios