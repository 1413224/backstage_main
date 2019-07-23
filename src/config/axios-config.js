import Vue from 'vue'
import store from '@/store/index'
import axios from 'axios'
import { Message } from 'element-ui';


axios.defaults.retry = 4 //请求次数
axios.defaults.retryDelay = 1000 //请求间隙
axios.defaults.baseURL = '//api.9yetech.com/apigw/' // 演示环境

axios.interceptors.request.use(config => {


    config.headers = {

    }

    return config
},error => {
    return Promise.reject(error)
})



axios.interceptors.response.use(res => {
    if(res.data.ret!==200){
        Message(res.data.msg)
    }
    return res
},error => {
    console.log(999999)
    return Promise.reject(error)
})

export default axios