import CONFIG from '@/project-config';
// 设置rem函数,可在对应设备端函数修改适配方案
let REMFn = {
	mobile() {
		// 375 默认大小16px; 375px = 23.4375rem ;每个元素px基础上/16
		let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
		//得到html的Dom元素
		let htmlDom = document.getElementsByTagName('html')[0];
		//设置根元素字体大小
		htmlDom.style.fontSize = htmlWidth/23.4375 + 'px';
	},
	pad() {
		// 本架构以M5平板尺寸作为基础  1004 * 627.5
		let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
		//得到html的Dom元素
		let htmlDom = document.getElementsByTagName('html')[0];
		//设置根元素字体大小
		htmlDom.style.fontSize = htmlWidth/100.4 + 'px';
	},
	bigScreen() {
		let baseSize = 14;
		// 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
		let scale = document.documentElement.clientWidth / 1920;
		// 设置页面根节点字体大小
		document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
	}
};
REMFn[CONFIG.currentDeviceREM]();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
	REMFn[CONFIG.currentDeviceREM]();
};
