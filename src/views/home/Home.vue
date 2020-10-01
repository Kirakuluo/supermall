<template>
	<div class="home">
		<nav-bar class="nav-bar">
			<div slot='center'>购物街</div>
		</nav-bar>
		<tab-control :titles="['流行','新款','精选']" @tabclick="indextabclick" ref="control1" class="control" v-show="isControl"></tab-control>
		<scroll class="content" ref="scroll" :probe-type="3" @scroll="showScroll" :pull-up-load="true" @pullingUp="MoreLoad">
			<!--轮播图-->
			<home-swiper :banners="banners" @ImageLoad="ImageLoad"></home-swiper>
			<!--推荐圆图-->
			<home-recommend :recommends="recommends"></home-recommend>
			<!--本周流行-->
			<home-feature></home-feature>
			<!--流行等等的导航-->
			<tab-control :titles="['流行','新款','精选']" @tabclick="indextabclick" ref="control2"></tab-control>
			<!--推荐-->
			<goods-list :goods="showGoods"></goods-list>
		</scroll>
		<back-top @click.native="backClick" v-show="showback"></back-top>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import TabControl from 'components/content/tabcontrol/TabControl.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	import BackTop from 'components/content/backtop/BackTop.vue'
	
	import HomeSwiper from './childComps/HomeSwiper.vue'
	import HomeRecommend from './childComps/HomeRecommend.vue'
	import HomeFeature from './childComps/HomeFeature.vue'
	
	import {debounce} from 'common/util.js'
	import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
	import {getHomedata, getHomeGoods} from 'network/home/Home.js'
	
	export default {
		name: 'Home',
		components: {
			NavBar,
			TabControl,
			GoodsList,
			Scroll,
			
			
			HomeSwiper,
			HomeRecommend,
			HomeFeature
		},
		data(){
			return {
				banners: [],
				recommends: [],
				goods: {
					'pop': {page: 0, list:[]},
					'new': {page: 0, list:[]},
					'sell': {page: 0,list:[]}
				},
				currentType: 'pop' ,//定义一个变量 默认type是pop类型
				
				controlOffsetTop: 0,
				isControl: false,
				saveY: 0,
			}
		},
		mixins: [itemListenerMixin,backTopMixin],
		created() {
			this.getHomedata()
			this.getHomeGoods('pop')
			this.getHomeGoods('new')
			this.getHomeGoods('sell')
		},
		computed: {
			showGoods(){
				return this.goods[this.currentType].list
			}
		},
		methods: {
			ImageLoad(){
				//console.log(this.$refs.control2.$el.offsetTop);
				this.controlOffsetTop = this.$refs.control2.$el.offsetTop
			},
			MoreLoad(){
				this.getHomeGoods(this.currentType)
			},
			showScroll(position){
				this.showback = (-position.y) > 1000
				this.isControl = (-position.y) > this.controlOffsetTop
			},
			indextabclick(index){
				switch(index){
					case 0:
					  this.currentType = 'pop'
						break
				  case 1:
					  this.currentType = 'new'
						break
					case 2:
					  this.currentType = 'sell'
						break
				}
				this.$refs.control1.currentIndex = index
				this.$refs.control2.currentIndex = index
			},
			getHomedata(){
				getHomedata().then(res => {
					//console.log(res);
					this.banners = res.data.banner.list
					this.recommends = res.data.recommend.list
				})
			},
			getHomeGoods(type){
				const page = this.goods[type].page + 1
				getHomeGoods(type, page).then(res => {
					this.goods[type].list.push(...res.data.list)
					this.goods[type].page += 1
					this.$refs.scroll.scroll.finishPullUp()
				})
			}
		},
		mounted() {
			// const refresh = debounce(this.$refs.scroll.refresh, 50)
			
			// this.itemImgListener = () => {  
			// 	//this.$refs.scroll.refresh()
			// 	refresh()  //箭头函数 作用refresh刷新
			// }
			// this.$bus.$on('imageLoad', this.itemImgListener)
		},
		activated() {
			this.$refs.scroll.scrollTo(0,this.saveY,0)
			this.$refs.scroll.refresh()
		},
		deactivated() {
			//保存离开此组件时的y值
			this.saveY = this.$refs.scroll.getScrollY()
			//离开此组件时取消事件总线的监听
			this.$bus.$off('imageLoad', this.itemImgListener)
		}
	}
</script>

<style scoped>
	.home {
		/**padding-top: 44px;*/
		height: 100vh;
		position: relative;
	}
	.nav-bar {
		background-color: var(--color-tint);
		color: #eee;
		/*position: fixed;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;*/
	}
	.content {
		overflow: hidden;
		position: absolute;
		top: 44px;
		bottom: 49px;
	}
	.control {
		position: relative;
		z-index: 9;
	}
</style>
