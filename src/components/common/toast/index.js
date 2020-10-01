import Toast from './Toast.vue'
const obj = {}

obj.install = Vue => {
	//创建组件构造器
	const toastContrustor = Vue.extend(Toast)
	//用过new的方式  用组件构造器new出一个组件对象
	const toast = new toastContrustor()
	//手动把组件对象挂载到元素上
	toast.$mount(document.createElement('div'))
	//toast.$el对应div
	document.body.appendChild(toast.$el)
	
	//把toast组件对象挂载到vue中
	Vue.prototype.$toast = toast
}

export default obj