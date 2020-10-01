export default {
	addToCart(context, payload){
		return new Promise((resolve, reject) => {
			//payload是新添加进来的商品
			//oldProduct是找到的已经存在的旧商品
			
			//查找cartList数组中是否有该商品
			let oldProduct = context.state.cartList.find(item => {
				return item.iid == payload.iid
			})
			if(oldProduct){
				context.commit('addCount', oldProduct)
				resolve('加入购物车成功')
			} else {
				payload.count = 1
				context.commit('addCart', payload)
				resolve('加入购物车成功')
			}
		})
	}
}