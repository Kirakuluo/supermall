import {debounce} from 'common/util.js'
import BackTop from 'components/content/backtop/BackTop.vue'
export const itemListenerMixin = {
	data(){
		return {
			itemImgListener: null
		}
	},
	mounted(){
		const refresh = debounce(this.$refs.scroll.refresh, 50)
		
		this.itemImgListener = () => {
			refresh()
		}
		this.$bus.$on('imageLoad', this.itemImgListener)
		//console.log('混入内容');
	}
}
//回到顶部功能
export const backTopMixin = {
	components: {
		BackTop
	},
	data(){
		return {
			showback: false,
		}
	},
	methods: {
		backClick(){
			this.$refs.scroll.scrollTo(0,0,500)
		}
	}
}
