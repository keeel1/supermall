<template>
  <swiper>
    <!-- <swiper-item v-for='item in banners'> -->
    <swiper-item v-for="item in banners" :key="item.image">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imageLoad" />
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";
export default {
  components: {
    Swiper,
    SwiperItem,
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad:false
    }
  },
  methods: {
    imageLoad() {
      // 节流
     if(!this.isLoad) {
      this.$emit("swiperImageLoad")
      this.isLoad = true
     }
    },
  },
};
</script>

<style>
</style>