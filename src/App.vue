<template>
  <div>
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>

    <MainTabBar v-if=$route.meta.footShow> </MainTabBar>
  </div>
</template>

<script>
import MainTabBar from "@/components/content/mainTabBar/MainTabBar";

export default {
  name: "App",
  components: {
    MainTabBar
  }
};
</script>

<style>
@import url("assets/css/base.css");

</style>
