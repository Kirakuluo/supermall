<template>
	<div class="nav-bar">
		<div class="left"><slot name="left"></slot></div>
		<div class="center"><slot name="center"></slot></div>
		<div class="rigth"><slot name="rigth"></slot></div>
	</div>
</template>

<script>
	export default {
		name: 'NavBar'
	}
</script>

<style scoped>
	.nav-bar {
		display: flex;
		text-align: center;
		height: 44px;
		line-height: 44px;
		box-shadow: 0px 1px 1px rgba(100,100,100,.1);
	}
	.left, .rigth {
		width: 60px;
	}
	.center {
		flex: 1;
	}
</style>
