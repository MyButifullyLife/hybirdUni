import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const files = require.context('.', true, /\.js$/);
let configRouters = [];
files.keys().forEach(key => {
	if (key === './index.js'|| key === './keepAlive.js') return;
	configRouters = configRouters.concat(files(key).default);
});
// 为了能够正确执行转场动画，跳转页面的方法需要做一层包装
VueRouter.prototype.$go = function (noAnimate) {
	this.noAnimate = noAnimate || false;
	this.goTo = false;
	this.go(-1);
};
VueRouter.prototype.$push = function (location, noAnimate, onComplete, onAbort) {
	this.noAnimate = noAnimate || false;
	this.goTo = true;
	this.push(location, onComplete, onAbort);
};
VueRouter.prototype.$replace = function (location, noAnimate, onComplete, onAbort) {
	this.noAnimate = noAnimate || false;
	this.goTo = true;
	this.replace(location, onComplete, onAbort);
};
let router = new VueRouter({
	routes: configRouters
});
router.beforeEach((to, from, next) => {
	next();
});
export default router;
