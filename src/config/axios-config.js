import Vue from 'vue'
import store from '@/store/index'
import axios from 'axios'


axios.defaults.retry = 4 //请求次数
axios.defaults.retryDelay = 1000 //请求间隙

axios.interceptors.request.use(config => {


    config.headers = {

    }

    return config
},error => {
    return Promise.reject(error)
})



axios.interceptors.response.use(res => {

    return res
},error => {

    return Promise.reject(error)
})

export default axios