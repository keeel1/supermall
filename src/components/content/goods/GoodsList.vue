<template>
  <div class="goods">
    <GoodsListItem v-for="item,id in goods" :goods-item="item" :key="id">
      {{item}}
    </GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem"

  export default {
  name:"Goodslist",
  props:{
    goods: {
      type:Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  padding: 2px;
}
</style>