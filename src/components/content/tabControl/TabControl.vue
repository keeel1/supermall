<template>
  <div class="tab-control">
    <div v-for="item,index in titles" 
         class="tab-control-item"
         :class="{active: index === currentIndex}"
         @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      // 让currentindex=index的那个item亮
      currentIndex:0
    }
  },
  methods:{
    tabClick(index){
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
};
</script>

<style>
.tab-control{
  display:flex;
  font-size:15px;
  text-align: center;
  height: 40px;
  line-height: 40px;
}

.tab-control-item{
  flex: 1;
}
.tab-control-item span{
  padding: 5px;
}


.active {
  color: var(--color-high-text);

}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>