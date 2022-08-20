<template>
  <router-view />
</template>

<script>
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: "App",
};
</script>

<style lang="scss">
// 平板
@media screen and (min-width: 480px) {
  html,
  body {
    font-size: 20px;
  }
}
// PC
@media screen and (min-width: 960px) {
  html,
  body {
    font-size: 18px;
  }
}
</style>
