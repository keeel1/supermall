<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
      ref="tabControl"
      v-show="isTabShow"
    >
    </tab-control>
    <backtop @click.native="backClick" v-show="isShowBackTOP"></backtop>

    <Scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pull="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="imageLoad"
      ></home-swiper>
      <recommed-view :recommends="recommends"></recommed-view>
      <FeatureView></FeatureView>
      <tab-control
        :titles="['流行', '新款', '精选']"
        class="tab-control"
        @tabClick="tabClick"
        ref="tabControl"
        v-show="!isTabShow"
      >
      </tab-control>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
  </div>
</template>

<script>
import HomeSwiper from "./ChildCopmps/HomeSwiper";
import RecommedView from "./ChildCopmps/RecommedView";
import FeatureView from "./ChildCopmps/FeatureView";

import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import Backtop from "@/components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "../../network/home";

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommedView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    Backtop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTOP: false,
      taboffsetTop: 0,
      isTabShow: false,
      saveY:0
    };
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata();
    // 2.请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /*
      网络请求相关方法
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.scroll.finishPullUp();
      });
    },

    /*
      事件监听相关方法
    */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
    },
    backClick() {
      // 参数1：x轴距离 头部为0
      // 参数2：y轴距离 头部为0
      // 参数3：上拉时间 毫秒
      this.$refs.scroll.scrollTo();
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      if (position.y < -1000) {
        this.isShowBackTOP = true;
      } else {
        this.isShowBackTOP = false;
      }

      // 2.决定tabControl是否吸顶(position: fixed)
      // this.taboffsetTop - 40  40为tabcontrol高度
      console.log();
      if (-position.y > this.taboffsetTop - 40) {
        this.isTabShow = true;
      } else {
        this.isTabShow = false;
      }
    },
    loadMore() {
      console.log("加载中");
      this.getHomeGoods(this.currentType);

      this.$refs.scroll.scroll.refresh();
    },
    imageLoad() {
        // 所有组件都有一个属性$el: 用于获取组件中的元素
        
        this.taboffsetTop = this.$refs.tabControl.$el.offsetTop;
        setTimeout(() => {
          this.taboffsetTop = this.$refs.tabControl.$el.offsetTop;
        }, 5000);
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // destroyed() {
  //   console.log("home");
  // },

  activated() {
    // console.log(this.saveY);
    this.$refs.scroll.scroll.refresh()
    this.$refs.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
  }
}
</script>

<style scoped>
#home {
  padding-top: 44px;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: aliceblue;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

/* .isTabFixed {
  position: fixed;
} */

.content {
  height: calc(100vh - 92px);
  overflow: hidden;
}
</style>