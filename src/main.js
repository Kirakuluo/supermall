import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import toast from 'components/common/toast/index.js' //导入obj  名字自己起成toast
import VueLazyLoad from 'vue-lazyload'


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

//安装toast插件 执行里面的install方法
Vue.use(toast)

Vue.use(VueLazyLoad)

new Vue({
  render: h => h(App),
	router,
	store
}).$mount('#app')
