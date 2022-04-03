<template>
  <!-- <nav><router-link to="/"></router-link></nav> -->
  <NavBar></NavBar>
  <router-view />
</template>

<script>
import NavBar from "./components/navbar/NavBar.vue";

export default {
  components: { NavBar },
};
</script>

<style>
body,
html,
#app {
  font-family: "Raleway", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  height: 100%;
  margin: 0;
  padding: 0;
  /* position: absolute; */
  font-size: 16px;
  line-height: 1.42857143;
  color: #333;
  /* overflow-x: hidden; */
}
</style>
