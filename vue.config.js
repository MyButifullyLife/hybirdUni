const webpack = require('webpack');
const path = require('path');
const Timestamp = new Date().getTime();
const FileManagerPlugin = require('filemanager-webpack-plugin');

const config = {
	// 本地打包配置
	development: {
		lintOnSave: false,
		chainWebpack: config => {
			//移除prefetch插件
			config.plugins.delete('prefetch');
			config.plugin('provide').use(webpack.ProvidePlugin, [{
				'$conf': path.resolve(__dirname, './src/project-config.js')
			}]);
		},
		configureWebpack: config => {
		},
	},
	// 测试打包配置
	test: {
		publicPath: './',
		assetsDir: 'static',
		productionSourceMap: false,
		lintOnSave: false,
		chainWebpack: config => {
			//移除prefetch插件
			config.plugins.delete('prefetch');
			config.plugin('provide').use(webpack.ProvidePlugin, [{
				'$conf': path.resolve(__dirname, './src/project-config.js')
			}]);
			config
				.output
				.filename(`static/js/[name].[contenthash:8].${Timestamp}.js`) // 输出文件名字及位置
				.chunkFilename(`static/js/[name].[contenthash:8].${Timestamp}.js`);
		},
		configureWebpack: {
			plugins: [
				new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
					onEnd: {
						delete: [   //首先需要删除项目根目录下的dist.zip
							'./dist.zip',
						],
						archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
							{source: './dist', destination: './dist.zip'},
						]
					}
				})
			]
		},
	},
	// 生产打包配置
	production: {
		publicPath: './',
		assetsDir: 'static',
		productionSourceMap: false,
		lintOnSave: false,
		chainWebpack: config => {
			//移除prefetch插件
			config.plugins.delete('prefetch');
			config.plugin('provide').use(webpack.ProvidePlugin, [{
				'$conf': path.resolve(__dirname, './src/project-config.js')
			}]);
			config
				.output
				.filename(`static/js/[name].[contenthash:8].${Timestamp}.js`) // 输出文件名字及位置
				.chunkFilename(`static/js/[name].[contenthash:8].${Timestamp}.js`);
		},
		configureWebpack: {
			plugins: [
				new FileManagerPlugin({  //初始化 filemanager-webpack-plugin 插件实例
					onEnd: {
						delete: [   //首先需要删除项目根目录下的dist.zip
							'./dist.zip',
						],
						archive: [ //然后我们选择dist文件夹将之打包成dist.zip并放在根目录
							{source: './dist', destination: './dist.zip'},
						]
					}
				})
			]
		},
	},
};
module.exports = config[process.env.NODE_ENV];
