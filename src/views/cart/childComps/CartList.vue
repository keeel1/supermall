<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
      <cart-list-item
        v-for="(item, index) in cartList"
        :key="index"
        :product="item"
      >
      </cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "@/components/common/scroll/Scroll.vue";
import CartListItem from "./CartListItem.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    Scroll,
    CartListItem,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  activated() {
    // keep-alive 缓存需要refresh一下
    this.$refs.scroll.scroll.refresh();
  },
};
</script>

<style scoped>
.cart-list {
  height: calc(100vh - 44px - 40px);
}
.content {
  height: calc(100% - 49px);
  overflow: hidden;
}
</style>