<template>
	<div class="home-recommend">
		<div v-for="item in recommends">
			<a :href="item.ling">
				<img :src="item.image"/>
				<div>{{item.title}}</div>
			</a>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HomeRecommend',
		props: {
			recommends: {
				type: Array,
				default(){
					return []
				}
			}
		}
	}
</script>

<style scoped>
	.home-recommend {
		display: flex;
		width: 100%;
		text-align: center;
		padding: 10px 0 20px;
		border-bottom: 10px solid #eee;
	}
	.home-recommend img {
		width: 80%;
		margin-bottom: 10px;
	}
</style>
