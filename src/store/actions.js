import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutations-types'


export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      // 1.查看是否添加过
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

      // 2.+1或者新添加
      if (oldProduct) { 
        // oldProduct.count += 1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品的数量+1')
      } else {
        payload.count = 1
        // state.cartList.push(payload)
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })
  }
}