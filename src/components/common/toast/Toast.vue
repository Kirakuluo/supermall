<template>
	<div class="toast" v-show="isshow">
		<div>{{message}}</div>
	</div>
</template>

<script>
	export default {
		name: "Toast",
		data(){
			return {
				message: '',
				isshow: false
			}
		},
		methods: {
			show(message, duration){
				this.message = message
				this.isshow = true
				setTimeout(() => {
					this.message = ''
					this.isshow = false
				},duration)
			}
		}
	}
</script>

<style>
	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		padding: 8px 10px;
		border-radius: 10%;
		
		z-index: 999;
		
		background-color: rgba(0,0,0,.75);
		color: #fff;
	}
</style>
