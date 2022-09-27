<template>
  <div id="detail">
    <!-- <div>{{$store.state.cartList}}</div> -->
    <detail-bar @titleClick="titleClick" ref="nav"></detail-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll">
      <detail-swiper :images="images" id="shop" ref="shop"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        id="parameter"
        ref="parameter"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        id="comment"
        ref="comment"
      ></detail-comment-info>
      <goods-list
        :goods="recommendList"
        id="recommend"
        ref="recommend"
      ></goods-list>
    </scroll>

    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTOP"></back-top>
  </div>
</template>

<script>
import DetailBar from "./childComps/DetailBar.vue";
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo.vue";
import DetailParamInfo from "./childComps/DetailParamInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import Scroll from "@/components/common/scroll/Scroll.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import BackTop from "@/components/content/backTop/BackTop.vue";
// import Toast from "@/components/common/toast/Toast.vue";

import { mapActions } from "vuex";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "@/network/detail";

export default {
  name: "Detail",
  components: {
    DetailBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    BackTop,
    // Toast,
  },
  data() {
    return {
      iid: null,
      images: [],
      goods: {},
      shop: {},
      GoodsParam: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      element: ["#shop", "#parameter", "#comment", "#recommend"],
      refElement: ["shop", "parameter", "comment", "recommend"],
      contentHight: [],
      currentIndex: 0,
      isShowBackTOP: false,
    };
  },
  created() {
    // 1.获取传入的iid
    this.iid = this.$route.params.iid;

    // 2.请求iid的数据
    getDetail(this.iid).then((res) => {
      // 2.1.获取结果
      const data = res.result;
      // console.log(data);
      // 2.2.获取顶部信息
      this.images = data.itemInfo.topImages;

      // 2.3.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 2.4.获取店铺信息
      this.shop = new Shop(data.shopInfo);

      // 2.5.获取商品信息
      this.detailInfo = data.detailInfo;

      // 2.6.保存参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 2.7.保存评论信息
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then((res) => {
      this.recommendList = res.data.list;
    });
  },
  methods: {
    ...mapActions(["addCart"]),
    contentScroll(position) {
      // 1.判断tabcontrol 滚动切换显示
      const positionY = -position.y;
      let length = this.contentHight.length;
      for (let i = 0; i < length; i++) {
        if (
          this.currentIndex !== i &&
          ((i < length - 1 &&
            positionY >= this.contentHight[i] &&
            positionY < this.contentHight[i + 1]) ||
            (i === length - 1 && positionY >= this.contentHight[i]))
        ) {
          this.currentIndex = i;
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }

      // 2.判断BackTop是否显示
      if (position.y < -1000) {
        this.isShowBackTOP = true;
      } else {
        this.isShowBackTOP = false;
      }
    },
    titleClick(index) {
      this.$refs.scroll.scrollToElement(this.element[index]);
    },
    backClick() {
      // 参数1：x轴距离 头部为0
      // 参数2：y轴距离 头部为0
      // 参数3：上拉时间 毫秒
      this.$refs.scroll.scrollTo();
    },
    addToCart() {
      // 1.获取信息
      const product = {};
      product.image = this.images[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里(1.Promise 2.mapAcitons)
      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })

      // 映射actions
      this.addCart(product).then((res) => {
        // this.show = true
        // this.message = res
        // setTimeout(() => {
        //   this.show = false
        //   this.message = ''
        // }, 1500);

        this.$toast.show(res)

      });
    },
  },
  mounted() {
    setTimeout(() => {
      for (let i = 0; i < this.refElement.length; i++) {
        let e = this.refElement[i];
        this.contentHight.push(this.$refs[e].$el.offsetTop);
      }
    }, 1000);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  height: 100vh;
}
.content {
  height: calc(100% - 44px);
  overflow: hidden;
}
</style>