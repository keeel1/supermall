import axios from 'axios'

export function request1(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 2.axios的拦截器
  //  2.1请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    // 1.如果config中的一些信息不符合服务器的要求

    // 2.如果每次发送网络请求时，都希望在界面中显示请求的图标(show)

    // 3.某些网络请求(比如登录(token))，必须携带一些特殊的信息
    return config
  }, err => {
    console.log(err);
  })
  // 2.2响应拦截的作用
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })


  // 3.发送真正的网络请求
  // 返回值本身就是一个promise
  return instance(config)

}

export function request2(config) {
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  })
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })
  return instance(config)

}