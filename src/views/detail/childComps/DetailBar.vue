<template>
  <div id="detail-bar" >
    <nav-bar>
      <div slot="left" class="back" @click="backClick">
        <img src="@/assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="titles">
        <div v-for="item,index in titles" 
        class="titles-item"
        :class="{active: index === currentIndex}"
        @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar.vue';
export default {
 components:{
  NavBar
 },
 data() {
  return {
    titles: ['商品','参数','评论','推荐'],
    currentIndex:0
  }
 },
 methods: {
  itemClick(index) {
    this.currentIndex = index
    this.$emit('titleClick',index)
  },
  backClick() {
    this.$router.back()
  }
 }
}
</script>

<style>
.titles {
  display: flex;
}

.titles-item{
  flex: 1;
}

.active {
  color: var(--color-high-text);
}

.back{
  margin-top: 6px;
}
</style>