<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid mx-5">
      <!-- Icono de NAVBAR -->
      <nav class="navbar navbar-dark py-0">
        <div class="container-fluid">
          <router-link class="navbar-brand" :to="'/'">
            <img
              src="../../assets/images/logo_teidesat_blanco.png"
              alt=""
              width="30"
            />
            <!-- TODO poner teidesat al lado del icono -->
            <!-- <img src="../../assets/images/landpage/teidesat-logo.png" /> -->
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
          <li class="nav-item mx-4" v-for="link in links" :key="link.path">
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
  components: { NavBarLink },
};
</script>

<style>
/* IF YOU WANT TO HAVE A FIXED NAVBAR ALWAYS AT THE TOP OF THE SCREEN */
/* .fixed-nav {
  position: fixed;
  z-index: 6;
  width: 100%;
} */
/*TODO quitar navbar colapsado por defecto*/
@media (max-width: 768px) {
  .navbar-collapse {
    width: 100%;
  }
}
.bg-dark {
  background-color: #6965f8 !important;
}
/* @import "bootstrap"; */
</style>
