<template>
  <div>
    <router-view></router-view>
    <mainTabBar> </mainTabBar>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar,
  }
};
</script>

<style>
@import url("assets/css/base.css");
</style>
