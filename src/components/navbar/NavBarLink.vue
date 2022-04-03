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
.navbar-dark .navbar-nav .nav-link {
  font-size: 90% !important;
  color: #487ef6;
  padding-left: 20%;
  padding-right: 120%;
}
.navbar .nav-item:hover .nav-link {
  color: #52e2aa;
}
.navbar-dark .navbar-nav .show > .nav-link,
.navbar-dark .navbar-nav .nav-link.active {
  color: #19e6b9;
}
/* .navbar-nav > li > a {
  border-radius: 20px;
  background-color: #dde1eb !important;
} */
@import "bootstrap";
</style>
