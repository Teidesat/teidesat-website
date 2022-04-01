<template>
  <router-link :to="path" class="nav-link" :class="{ active: isActive }">
    {{ name.toUpperCase() }}
  </router-link>
</template>

<script>
import { useRoute } from "vue-router";
export default {
  props: {
    name: String,
    path: String,
  },
  computed: {
    isActive() {
      return useRoute().path === this.path;
    },
  },
};
</script>

<style scoped>
/*
.navbar-light .navbar-nav .nav-link {
  font-size: 80% !important;
  color: #487ef6;
}
.navbar .nav-item:hover .nav-link {
  color: #52e2aa;
}
.navbar-light .navbar-nav .show > .nav-link,
.navbar-light .navbar-nav .nav-link.active {
  color: #19e6b9;
}
@import "bootstrap"; */
</style>
