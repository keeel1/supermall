<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import Pullup from "@better-scroll/pull-up";
import MouseWheel from "@better-scroll/mouse-wheel";
import ObserveImage from "@better-scroll/observe-image";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    BScroll.use(ObserveDOM);
    BScroll.use(Pullup);
    BScroll.use(MouseWheel);
    BScroll.use(ObserveImage);

    // 1.创建对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      observeDOM: true,
      observeImage: true,
      mouseWheel: true,
      click: true,

      disableMouse: false,
      disableTouch: false,
    });

    // 2.监听滚动位置
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    // 3.监听上拉
    this.scroll.on("pullingUp", () => {
      this.$emit("pull");
    });

    // 首次打开页面 无法拖动鼠标
    // 因为数据渲染没有完成，scroll已经初始化完了
    // 用定时器 refresh
    setTimeout(() => {
      this.scroll.refresh();
    }, 1000);
  },
  methods: {
    scrollTo(x = 0, y = 0, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    // getScrollY() {
    //   return this.scroll ? this.scroll.y:0
    // }
    scrollToElement(el, time = 300, offsetX, offsetY) {
      this.scroll.scrollToElement(el, time, offsetX, offsetY);
    },
  },
};
</script>

<style>
</style>