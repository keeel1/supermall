<template>
  <div class="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
export default {
  // props: {
  //   message: {
  //     type: String,
  //     default: "",
  //   },
  //   show: {
  //     type: Boolean,
  //     default: false,
  //   },
  // },
  data() {
    return {
      name:'Toast',
      message:'',
      isShow:false
    }
  },
  methods: {
    show(message = '默认文字',duration = 2000) {
      this.isShow = true
      this.message = message

// 每次清理定时器？
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;

  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);

  z-index: 999;
}
</style>