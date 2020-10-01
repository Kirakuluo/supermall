export default {
		//已经存在的商品count+1
		addCount(state, payload){
			payload.count++
		},
		//添加新商品
		addCart(state, payload){
			payload.checked = true
			state.cartList.push(payload)
		}
	}