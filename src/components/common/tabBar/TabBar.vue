<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#tab-bar {
  background-color: #f6f6f6;
  display: flex;
  z-index: 10;

  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;

  box-shadow: 0px -3px 1px rgba(100, 100, 100, 0.2);
}
</style>