<template>
		<swiper>
			<swiper-item v-for='item in banners'>
				<a :href="item.link">
					<img :src="item.image" @load="imageLoad"/>
				</a>
			</swiper-item>
		</swiper>
</template>

<script>
	import {Swiper, SwiperItem} from '../../../components/common/swiper'
	export default {
		name: 'HomeSwiper',
		data(){
			return {
				count: false
			}
		},
		methods: {
			imageLoad(){
				if(!this.count){
					this.$emit('ImageLoad')
					this.count = true
				}
			}
		},
		props: {
			banners: {
				type: Array,
				default(){
					return[]
				}
			}
		},
		components: {
			Swiper,
			SwiperItem
		}
	}
</script>

<style scoped>
</style>
