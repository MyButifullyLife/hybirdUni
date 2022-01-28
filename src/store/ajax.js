import axios from 'axios';
import { storage } from "@/utils/common"
import qs from 'qs';
import router from '../router'
import store from './index.js'
var instance = axios.create({
    baseURL: $conf.baseUrl + '/execute', //test
    timeout: 60000,
});



// 请求拦截器
instance.interceptors.request.use(function (config) {
	config.headers['accessToken'] = localStorage.getItem('accessToken') || '';

    config.data = qs.stringify(config.data)
    return config;
}, function (error) {
    return Promise.reject(error);
});

/* 返回拦截器
axios的拦截器有个奇怪的设定：如果没有reject则认为成功，即使是在失败回调函数里面也这样。
但有些错误处理（比如登出和断网）希望在拦截器里面处理后不再往外抛，这时需要中断promise，
虽然axios官方不建议这么做，但有个取巧的方案是返回一个空的promise：return new Promise(() => {})
*/
instance.interceptors.response.use(function (response) {
    if (response.data.statusCode === '000000' || response.data.statusCode === '200') {
        if(response.data.extraData){
            response.data.data.extraData = response.data.extraData
        }
        return response.data.data
    } else {

        // store.commit('common/LOADING_SHOW', false);
        // store.commit('common/ALERT_SHOW', {alertStatus:true, alertText: response.data.statusMsg})
        return Promise.reject(response);

    }

}, function (error) {
    if (error.response) {
    // 请求已发送，服务器回复状态码在2xx之外

        return Promise.reject(error.response);
    } else if (error.request) {
    // 请求已发送，但没有收到回应
        return Promise.reject(error.request);
    } else {
    // 请求尚未发送就失败了，可以认为是某些设置引发的问题（代码问题、跨域、断网）
    // 建议错误在这里拦截处理，中断promise
    // return new Promise(() => {})
        return Promise.reject(error);
    }
    // return Promise.reject(error)
});

export default instance;
