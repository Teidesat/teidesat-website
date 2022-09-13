<template>
  <nav class="navbar navbar-expand-lg bg-blue px-5">
    <div class="container-fluid">
      <router-link class="navbar-brand" :to="'/'">
        <img
          src="../../assets/images/logo_teidesat_blanco.png"
          alt=""
          width="30"
        />
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="fa-solid fa-bars" style="color: white"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="link in links" :key="link.path">
            <NavBarLink :path="link.path" :name="link.name"></NavBarLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid mx-5">
      <nav class="navbar navbar-dark py-0">
        <div class="container-fluid">
          <router-link class="navbar-brand" :to="'/'">
            <img
              src="../../assets/images/logo_teidesat_blanco.png"
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
          <li class="nav-item mx-4" v-for="link in links" :key="link.path">
            <NavBarLink :path="link.path" :name="link.name"></NavBarLink>
          </li>
        </ul>
      </div>
    </div>
  </nav> -->
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
/* @media (max-width: 768px) {
  .navbar-collapse {
    width: 100%;
  }
} */
.bg-blue {
  background-color: #6965f8 !important;
}
.nav-link {
  font-family: MaisonNeueLight;
  color: white;
}
@font-face {
  font-family: MaisonNeueLight;
  src: url("@/assets/fonts/Maison Neue/Maison Neue Light.otf");
}
@font-face {
  font-family: PPEikoBlackItalic;
  src: url("@/assets/fonts/PPEiko/PPEiko-BlackItalic.otf");
}
@font-face {
  font-family: PPEikoHeavy;
  src: url("@/assets/fonts/PPEiko/PPEiko-Heavy.otf");
}
@font-face {
  font-family: PPEikoLightItalic;
  src: url("@/assets/fonts/PPEiko/PPEiko-LightItalic.otf");
}
@font-face {
  font-family: PPEikoMedium;
  src: url("@/assets/fonts/PPEiko/PPEiko-Medium.otf");
}
@font-face {
  font-family: PPEikoThin;
  src: url("@/assets/fonts/PPEiko/PPEiko-Thin.otf");
}
/* @import "bootstrap"; */
</style>
