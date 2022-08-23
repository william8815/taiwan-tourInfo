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
// reset
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  width: 100%;
  height: 100%;
  font-family: "Roboto", sans-serif;
  font-size: 16px;
  scroll-behavior: smooth;
}
ul,
li {
  list-style: none;
}

a {
  text-decoration: none;
  color: #000 !important;
}
// title
h1 {
  font-weight: bold;
  font-size: 2.25rem;
}
// title2
h2 {
  font-weight: bold;
  font-size: 1.5rem;
}
// subtitle
h3 {
  font-weight: bold;
  font-size: 1.25rem;
}
// paragraph
h4 {
  font-weight: 400;
  font-size: 1rem;
}
// 平板
@media screen and (min-width: 480px) {
  html,
  body {
    font-size: 18px;
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
