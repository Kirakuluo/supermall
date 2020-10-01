<template>
	<div class="control">
		<div v-for="(item, index) in titles" class="control-item" :class="{active: currentIndex == index}" @click="itemclick(index)">
			<span>{{item}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'TabControl',
		props: {
			titles: {
				type: Array,
				default(){
					return []
				}
			}
		},
		data(){
			return {
				currentIndex: 0
			}
		},
		methods: {
			itemclick(index){
				this.currentIndex = index
				this.$emit('tabclick', index) //自定义事件 给父组件发送
			}
		}
	}
</script>

<style scoped>
	.control {
		display: flex;
		text-align: center;
		height: 44px;
		line-height: 44px;
		font-size: 15px;
		background-color: #fff;
	}
	.control-item {
		flex: 1;
	}
	.active {
		color: var(--color-high-text);
	}
	.active span {
		border-bottom: 3px solid var(--color-tint);
		padding: 5px;
	}
</style>
