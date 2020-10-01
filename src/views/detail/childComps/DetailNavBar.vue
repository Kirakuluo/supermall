<template>
  <div class="detail">
    <nav-bar>
			<div slot="left" class="back" @click="backClick">
				<img src="~assets/img/common/back.svg"/>
			</div>
			<div class="titles" slot="center">
				<div class="titles-item" v-for="(item, index) in titles" :class="{active: coutentIndex == index}" @click="itemClick(index)">{{item}}</div>
			</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data(){
      return {
        titles: ['商品','参数','评论','推荐'],
				coutentIndex: 0
      }
    },
		methods: {
			itemClick(index){
				this.coutentIndex = index
				this.$emit('titleClick', index)
			},
			backClick(){
				this.$router.back()
			}
		}
  }
</script>

<style scoped>
	.back img {
		margin-top: 11px;
	}
  .titles {
		display: flex;
	}
	.titles-item {
		flex: 1;
	}
	.active {
		color: var(--color-high-text);
	}
</style>
