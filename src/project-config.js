'use strict';
var exports = {
	// 设置当前设备适配方案
	get currentDeviceREM() {
		let mobile = 'mobile';
		let pad = 'pad';
		let bigScreen = 'bigScreen';
		return mobile;
	},
	get baseUrl() {
		let test = '',
			prod = '';
		// 配置全局变量url,线上打包后生效,修改地址路径: public/configUrl
		if (CONFIG_GLOBAL_URL) return CONFIG_GLOBAL_URL;
		return this.isTest ? test : prod;
	},
	// 测试环境
	get isTest () {
		let env = process.env.NODE_ENV ;
		let diy_env = process.env.VUE_APP_ENV;
		return env === 'development' || env === 'test' || diy_env === 'test';
	},
	// 开发环境
	get isPcTest() {
		return process.env.NODE_ENV === 'development';
	},
};

module.exports = exports;
