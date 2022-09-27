<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :isChecked="isSelectALL"
        @click.native="checkClick"
      ></check-button>
      <span>全选</span>
      <div class="total-price">合计:{{ totalPrice }}</div>
      <div class="cacultae" @click="calcClick">去计算({{ checkLength }})</div>
    </div>
  </div>
</template>

<script>
import checkButton from "@/components/content/checkButton/CheckButton.vue";

export default {
  components: {
    checkButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return item.price * item.count + preValue;
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return this.$store.state.cartList.filter((item) => item.checked).length;
    },
    isSelectALL() {
      // return !(this.$store.state.cartList.filter(item => !item.checked).length)
      if (this.checkLength === 0) return false;
      return !this.$store.state.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectALL) {
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }

      // this.$store.state.cartList.forEach((item) => (item.checked = !this.isSelectALL));
    },
    calcClick() {
      if(this.checkLength == 0){
        this.$toast.show('请选择商品',1500)
      }
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;
  background-color: #eee;
  position: relative;
  bottom: 49px;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
  margin-right: 5px;
}
.total-price {
  padding-left: 10px;
}
.cacultae {
  position: absolute;
  right: 0;
  background-color: red;
  color: #fff;
  height: 40px;
  width: 100px;
  text-align: center;
  line-height: 40px;
}
</style>