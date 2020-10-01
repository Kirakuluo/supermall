<template>
	<div class="cart">
		<nav-bar class="nav-bar">
			<div slot="center">购物车({{cartLength}})</div>
		</nav-bar>
		<scroll class="coutent" ref="scroll">
			<cart-list></cart-list>
		</scroll>
		<cart-bottom-bar></cart-bottom-bar>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar.vue'
	import Scroll from 'components/common/scroll/Scroll.vue'
	
	import CartList from './childComps/CartList.vue'
	import CartBottomBar from './childComps/CartBottomBar.vue'
	import {mapGetters} from 'vuex'
	export default {
		name: 'Cart',
		components: {
			NavBar,
			Scroll,
			CartList,
			CartBottomBar
		},
		computed: {
			...mapGetters(['cartLength'])
		},
		activated() {
			this.$refs.scroll.refresh()
		}
	}
</script>

<style scoped>
	.nav-bar {
		background-color: var(--color-tint);
		color: #fff;
	}
	.cart {
		height: 100vh;
	}
	.coutent {
		overflow: hidden;
		height: calc(100% - 44px - 49px - 40px);
	}
</style>
