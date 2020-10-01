<template>
	<div class="check-button" :class="{check:ischeck}">
		<img src="~assets/img/cart/tick.svg"/>
	</div>
</template>

<script>
	export default {
		name: 'CheckButton',
		props: {
			ischeck: {
				type: Boolean,
				default: false
			}
		}
	}
</script>

<style scoped>
	/*默认状态不选中*/
	.check-button {
		border-radius: 50%;
		border: 2px solid #aaa;
		width: 17px;
		height: 17px;
	}
	.check {
		border-color: red;
	  background-color: red;
	}
</style>
