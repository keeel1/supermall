import Vue from 'vue';
import Router from 'vue-router'

// 懒加载
const Home = () => import('@/views/home/Home')
const Cart = () => import('@/views/cart/Cart')
const Category = () => import('@/views/category/Category')
const Profile = () => import('@/views/profile/Profile')
const Detail = () => import('@/views/detail/Detail')

// 1.注册组件
Vue.use(Router)



// 2.定义路由
const routes = [
  {
    path: '',
    redirect: '/home',
    meta:{footShow:true}
  },
  {
    path:'/home',
    component: Home,
    meta:{footShow:true}
  },
  {
    path:'/category',
    component: Category,
    meta:{footShow:true}
  },
  {
    path:'/cart',
    component: Cart,
    meta:{footShow:true}
  },
  {
    path:'/profile',
    component: Profile,
    meta:{footShow:true}
  },
  {
    path:'/detail/:iid',
    component: Detail
  }
]

// 3.创建router实例
const router = new Router({
  routes,
  mode:'history'
})

// 4.导出router实例
export default router