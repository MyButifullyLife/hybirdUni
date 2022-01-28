import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './utils/rem.js';
import VConsole from 'vconsole';
import UNI_TOOLS from './utils/uniTools'
// if (process.env.NODE_ENV !== 'development' && process.env.NODE_ENV !== 'production') {
if (process.env.VUE_APP_ENV === 'test') {
	let vConsole = new VConsole();
}
let vConsole = new VConsole();
Vue.config.productionTip = false;
Vue.prototype.UNI_TOOLS = UNI_TOOLS;
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')

