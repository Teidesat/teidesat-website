<template>
  <!-- <nav><router-link to="/"></router-link></nav> -->
  <NavBar></NavBar>
  <router-view />
  <footer class="my-5 text-white bg-primary" role="contentinfo">
    <div class="container">
      <div class="row">
        <img class="img-fluid" src="./assets/images/PATROCINADORES_2_1.png" />
      </div>
      <div class="row" :style="creditStyle">
        Page made by Fabio Bianchini and Eduardo {Apellido}
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
  font-family: "Nunito", Helvetica, Arial, sans-serif;
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
</style>
