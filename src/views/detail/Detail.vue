<template>
	<div id="detail">
		<!--导航-->
		<detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
		<scroll class="detail-scroll" ref="scroll" @scroll="detailScroll" :probe-type="3">
			<!--轮播图-->
			<detail-swiper :topImages="topImages"></detail-swiper>
			<!--商品信息-->
			<detail-base-info :Goods="Goods"></detail-base-info>
			<!--店铺信息-->
			<detail-shop-info :shop="shop"></detail-shop-info>
			<!--商品图片展示-->
			<detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
			<!--商品参数信息-->
			<detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
			<!--用户评论-->
			<detail-common-info :commonInfo="commonInfo" ref="common"></detail-common-info>
			<!--推荐信息-->
			<goods-list :goods="recommend" ref="recommend"></goods-list>
		</scroll>
		<detail-bottom-bar @addCart="addCart"></detail-bottom-bar>
		<back-top v-show="showback" @click.native="backClick"></back-top>
		<toast :show="show" :message="message"></toast>
	</div>
</template>

<script>
	import DetailNavBar from './childComps/DetailNavBar.vue'
	import DetailSwiper from './childComps/DetailSwiper.vue'
	import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
	import DetailShopInfo from './childComps/DetailShopInfo.vue'
	import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
	import DetailParamInfo from './childComps/DetailParamInfo.vue'
	import DetailCommonInfo from './childComps/DetailCommentInfo.vue'
	import DetailBottomBar from './childComps/DetailBottomBar.vue'
	import GoodsList from 'components/content/goods/GoodsList.vue'
	
	import {debounce} from 'common/util.js'
	import {itemListenerMixin,backTopMixin} from 'common/mixin.js'
	import Scroll from 'components/common/scroll/Scroll.vue'
	import Toast from 'components/common/toast/Toast.vue'
	
	import {getDetail,getRecommend,Goods,Shop,ParamInfo} from 'network/detail/detail.js'
	export default {
		name: "Detail",
		methods: {
			//监听图片加载
			imageLoad(){
				this.$refs.scroll.refresh()
				
				this.themeTopYs.push(0)
				this.themeTopYs.push(this.$refs.params.$el.offsetTop)
				this.themeTopYs.push(this.$refs.common.$el.offsetTop)
				this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
				this.themeTopYs.push(Number.MAX_VALUE)
				//console.log(this.themeTopYs);
			},
			//监听导航点击
			titleClick(index){
				this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
			},
			//监听滚动
			detailScroll(position){
				for(let i = 0; i < this.themeTopYs.length - 1; i++){
					if(this.countIndex !== i && (-position.y >= this.themeTopYs[i] && -position.y < this.themeTopYs[i+1])){
						//console.log(i);
						this.countIndex = i
						this.$refs.nav.coutentIndex = this.countIndex
					}
				}
				//当y值大于1000 显示回到顶部按钮
				this.showback = (-position.y) > 1000
		  },
			//加入购物车事件点击事件
			addCart(){
				//先获取购物车要展示的数据
				const product = {}
				product.image = this.topImages[0]
				product.title = this.Goods.title
				product.desc = this.Goods.desc
				product.price = this.Goods.realPrice
				product.iid = this.iid
				//把商品添加到购物车 (先保存到vuex)
				this.$store.dispatch('addToCart', product).then(res => {
					//console.log(res);
					this.$toast.show(res, 1500)
				})
			}
		},
		components: {
			DetailNavBar,
			DetailSwiper,
			DetailBaseInfo,
			DetailShopInfo,
			DetailGoodsInfo,
			DetailParamInfo,
			DetailCommonInfo,
			DetailBottomBar,
			GoodsList,
			Scroll,
			Toast
		},
		data(){
			return {
				iid: null,
				topImages: [],
				Goods: {},
				shop: {},
				detailInfo: {},
				paramInfo: {},
				commonInfo: {},
				recommend: [],
				themeTopYs: [],
				countIndex: 0,
				message: '',
				show: false
			}
		},
		mixins: [itemListenerMixin,backTopMixin],
		created() {
			//获取iid
			this.iid = this.$route.params.iid
			//根据iid获取相应得数据
			getDetail(this.iid).then(res => {
				console.log(res);
				const data = res.result
				//轮播图数据
				this.topImages = data.itemInfo.topImages
				//商品数据(价格等等)
				this.Goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
				//店铺数据
				this.shop = new Shop(data.shopInfo)
				//商品图片数据
				this.detailInfo = data.detailInfo
				//商品参数数据
				this.paramInfo = new ParamInfo(data.itemParams.info, data.itemParams.rule)
				//用户评价数据
				if(data.rate.cRate !== 0){
					this.commonInfo = data.rate.list[0]
				}
			})
			getRecommend().then(res => {
				console.log(res);
				this.recommend = res.data.list
			})
		},
		mounted() {
		},
		//离开此组件时取消事件总线的监听
		destroyed() {
			this.$bus.$off('imageLoad', this.itemImgListener)
		}
	}
</script>

<style scoped>
	#detail {
		position: relative;
		z-index: 9;
		background-color: #fff;
		height: 100vh;
	}
	.detail-scroll {
		height: calc(100% - 44px - 49px);
	}
	.detail-nav {
		position: relative;
		z-index: 9;
		background-color: #fff;
	}
</style>
