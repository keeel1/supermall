import { request1 } from "./request";
import { request2 } from "./request";

export function getHomeMultidata() {
  return request1({
    url: '/home/multidata'
  })
}

export function getHomeGoods(type,page) {
  return request2({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}