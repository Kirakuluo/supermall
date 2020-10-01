<template>
	<div class="bottom-bar">
		<div class="check-content">
			<check-button class="check-button" :ischeck="isSelectAll" @click.native="checkClick"></check-button>
			<span>全选</span>
		</div>
		<div class="price">
			合计: {{price}}
		</div>
		<div class="calculate" @click="calculateClick">
			去计算({{cartLength}})
		</div>
	</div>
</template>

<script>
	import CheckButton from 'components/content/checkbutton/CheckButton.vue'
	export default {
		name: "CartBottomBar",
		components: {
			CheckButton
		},
		computed: {
			price(){
				return "￥" + this.$store.state.cartList.filter((item) => {
					return item.checked
				}).reduce((prevalue, item) => {
					return prevalue + (item.price * item.count)
				},0).toFixed(2)
			},
			cartLength(){
				return this.$store.state.cartList.filter(item => item.checked).length
			},
			isSelectAll(){
				//当购物车为空 全选按钮false  当有一个商品没选中 全选按钮false
				if(this.$store.state.cartList.length == 0) return false
				return !this.$store.state.cartList.find(item => !item.checked)
			}
		},
		methods: {
			checkClick(){
				if(this.isSelectAll){  //当全选按钮为true 再次点击后 所有商品不选中
					this.$store.state.cartList.forEach(item => item.checked = false)
				}else {  //当全选按钮为false 再次点击后 所有商品选中
					this.$store.state.cartList.forEach(item => item.checked = true)
				}
			},
			calculateClick(){
				if(this.$store.getters.cartLength == 0){
					this.$toast.show('请选择购买的商品',1500)
				}
			}
		}
	}
</script>

<style scoped>
	.bottom-bar {
		background-color: #eee;
		height: 40px;
		display: flex;
		align-items: center;
	}
	.check-content {
		display: flex;
		align-items: center;
		margin-left: 10px;
		width: 60px;
	}
	.check-button {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}
	.price {
		margin-left: 20px;
		flex: 1;
	}
	.calculate {
		width: 90px;
		height: 40px;
		line-height: 40px;
		background-color: red;
		text-align: center;
		color: #fff;
	}
</style>
