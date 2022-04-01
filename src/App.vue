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

<style></style>
