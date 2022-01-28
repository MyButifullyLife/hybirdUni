import axios from 'axios'
import qs from 'qs'
import ProjectConfig from '../project-config';
const instance = axios.create({
	baseURL: ProjectConfig.baseUrl,
	timeout: 15000,
	responseType: 'json',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
	}
});

const CancelToken = axios.CancelToken;
window.CancelToken = CancelToken;
window.source = CancelToken.source();
// 请求拦截器
instance.interceptors.request.use(
	config => {
		config.data = (!Object.prototype.toString.call((config.data)) === '[object FormData]') ? qs.stringify(config.data) : config.data
		return config
	},
	error=> {
		// Message.error('请求出错')
		return Promise.reject(error)
	});

// 响应拦截器
instance.interceptors.response.use(
	response=> {
		if (response.status === 200) {
			// Message({message: '请求成功！', type: 'success'})
			return response.data
		} else {
			// Message.error(response.statusText || '系统错误')
			return Promise.reject(response)
		}
	}, error=> {
		// Message.error(error.message || '请求失败')
		return Promise.reject(error)
	});


export const get = function (params, opts) {

	let _opts = opts || {};
	//params.data.ssoTokenName = params.ssoToken || '';
	return instance({
		url: params.url,
		method: 'get',
		// baseURL: _opts.baseUrl || ProjectConfig.baseUrl,
		headers: {
			'Content-Type': _opts.contentType || 'application/json',
			// 'accessToken': localStorage.getItem('accessToken') || ''
		},
		cancelToken: window.source.token,
		params: params.data
	});
};

/**
 * @param {url, token, ssoToken, data} params
 * @param {contentType} opts
 */
export const post = function (params, opts) {
	let formdata = new FormData();
	if (typeof params.data === 'object') {
		for (let attr in params.data) {
			formdata.append(attr, params.data[attr]);
		}
	}
	let _opts = opts || {},
		option = {
			url: params.url,
			method: 'post',
			// baseURL: _opts.baseUrl || ProjectConfig.baseUrl,
			headers: {
				'Content-Type': _opts.contentType || 'application/json',
				// 'accessToken': localStorage.getItem('accessToken') || ''
			},
			cancelToken: window.source.token,
			data: formdata
		};

	return instance(option);
};

/**
 * @param {url, token, ssoToken, data} params
 * @param {contentType} opts
 */
export const formDataPost = function (params, opts) {
	// delete params.data.sysAppName
	let formdata = new FormData();
	if (typeof params.data === 'object') {
		for (let attr in params.data) {
			formdata.append(attr, params.data[attr]);
		}
	}
	let _opts = opts || {},
		option = {
			url: params.url,
			method: 'post',
			// baseURL: _opts.baseUrl || ProjectConfig.baseUrl,
			headers: {
				'Content-Type': _opts.contentType || 'application/json',
				// 'accessToken': localStorage.getItem('accessToken') || ''
			},
			cancelToken: window.source.token,
			data: formdata
		};
	// 微信登录接口去掉
	// if (params.data.delToken) {
	// 	delete option.headers.accessToken;
	// }
	return instance(option);
};


/**
 * @param {url, token, ssoToken, data} params
 * @param {contentType} opts
 */
export const jsonPost = function (params, opts) {

	let _opts = opts || {},
		option = {
			url: params.url,
			method: 'post',
			// baseURL: _opts.baseUrl || ProjectConfig.baseUrl,
			headers: {
				'Content-Type': _opts.contentType || 'application/json',
				// 'accessToken': localStorage.getItem('accessToken') || ''
			},
			cancelToken: window.source.token,
			data: params.data
		};

	return instance(option);
};
