<template>
  <div class="detail-swiper">
    <swiper class="detail">
      <swiper-item v-for="item in images" :key="item">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "@/components/common/swiper";


export default {
  name:'DetailSwiper',
  components: {
    Swiper,
    SwiperItem

  },
  props: {
    images: {
      type: Array,
      default() {
        return []
      }
    }
  }
};
</script>

<style scoped>
.detail {
  height: 300px;
  overflow: hidden;
}
</style>