<template>
  <!-- <nav><router-link to="/"></router-link></nav> -->
  <NavBar></NavBar>
  <router-view />
  <footer class="pt-5 text-white bg-primary" role="contentinfo">
    <div class="footerText mx-5">
      <h1>Unimos fuerzas</h1>
      <p class="h5" style="font-family: MaisonNeueLight">
        Desde los últimos años, cada vez son más los colaboradores y
        patrocinadores que deciden unirse a la iniciativa de poner en órbita el
        TEIDESAT-01. Las propuestas que nos llegan para propulsar el proyecto lo
        hacen en todo tipo de formatos. Si eres una empresa o asociación de
        cualquier clase, y quieres aportar tu granito de arena, no dudes en
        participar en la familia TEIDESAT. Estamos deseando escuchar lo que
        tienes que decir.
      </p>
    </div>
    <div class="container">
      <div class="row">
        <img class="img-fluid" src="./assets/images/PATROCINADORES_2_1.png" />
      </div>
      <div class="row" :style="creditStyle">
        Page made by Fabio Bianchini and Eduardo Puyol
      </div>
    </div>
    <a class="btn btn-sm fade-half back-to-top inner-link" href="#top">
      <i class="fa fa-angle-up"></i>
    </a>
  </footer>
</template>

<script>
import NavBar from "./components/navbar/NavBar.vue";
import { isMobile } from "./data/isMobile.js";

export default {
  components: { NavBar },
  data() {
    return {
      creditStyle: {
        fontSize: "90%",
        marginLeft: "8vw",
        paddingBottom: "20px",
      },
    };
  },
  computed: {
    isMobile: isMobile,
  },
};
</script>

<style>
body,
html,
#app {
  font-family: "MaisonNeueLight", Helvetica, Arial, sans-serif;
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
  background-color: #ebebeb;
  /* overflow-x: hidden; */
}

/* div.fixed {
  position: fixed;
  width: 50%;
  bottom: 10px;
  border: 3px solid #8ac007;
} */

.back-to-top {
  /* user-select: none; */
  position: fixed;
  right: 0;
  bottom: 10px;
  transform: translateX(-50%);
  -webkit-transform: translateX(-50%);
  height: 36px;
  width: 36px;
  padding: 5px 11px;
}
/* .back-to-top:hover {
  background-color: #aceddf;
} */
.bg-primary {
  background-color: #6569ee !important;
}

.footerText {
  text-align: left;
  font-family: PPEikoMedium;
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
</style>
