<template>
	<div class="wrapper" ref="wrapper">
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: 'Scroll',
		props: {
			probeType: Number,
			default: 0,
			pullUpLoad: Boolean,
			default: false
		},
		data(){
			return {
				scroll: null
			}
		},
		mounted() {
			this.scroll = new BScroll(this.$refs.wrapper, {
				click: true,
				probeType: this.probeType,
				pullUpLoad: this.pullUpLoad
			})
			this.scroll.on('scroll', (position) => {
				//console.log(position);
				this.$emit('scroll', position)
			})
			this.scroll.on('pullingUp', () => {
				//console.log('***');
				this.$emit('pullingUp')
			})
		},
		methods: {
			scrollTo(x, y, time){
				this.scroll.scrollTo(x, y, time)
			},
			refresh(){
				this.scroll.refresh()
			},
			getScrollY(){
				return this.scroll ? this.scroll.y : 0
			}
		}
	}
</script>

<style scoped>
</style>
