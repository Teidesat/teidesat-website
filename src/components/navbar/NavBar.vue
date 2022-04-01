<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid mx-5">
      <!-- Icono de NAVBAR -->
      <nav class="navbar navbar-dark py-0">
        <div class="container-fluid">
          <router-link class="navbar-brand" :to="'/'">
            <img
              src="../../assets/images/logo_teidesat_negro.png"
              alt=""
              width="30"
            />
          </router-link>
        </div>
      </nav>
      <button
        class="navbar-toggler py-1"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="fa-solid fa-bars"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style="text-align: left">
          <li class="nav-item ms-3" v-for="link in links" :key="link.path">
            <NavBarLink :path="link.path" :name="link.name"></NavBarLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import NavBarLink from "./NavBarLink.vue";
import { routes } from "@/router/index.js";
export default {
  data() {
    return {
      links: routes.splice(1),
    };
  },
  computed: {},
  components: {
    NavBarLink,
  },
};
</script>

<style>
/* .navbar {
  font-family: "Nunito", sans-serif;

}
.navbar-light .bg-light {
  background-color: antiquewhite;
}
@import "bootstrap"; */
</style>
