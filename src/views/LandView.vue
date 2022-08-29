<template>
  <!-- <div class="land"> -->
  <div class="heroShoot">
    <!-- <img class="mainTitle" src="@/assets/images/landpage/teidesat-logo.png" /> -->
    <div class="container">
      <div class="row">
        <div class="col-sm-6 offset-sm-3 mainTitle">
          <p class="title">Arrojamos nuestra luz en el cielo infinito</p>
          <p class="subtitle">
            Una asociación aeroespacial accesible para los ingenieros del mañana
          </p>
          <router-link to="/contacto" class="botonHeroShoot">
            <span style="color: #424369" class="fw-bold">Contáctanos </span>
            <i style="color: #9696f8" class="fa-solid fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </div>
  </div>

  <div class="ksp">
    <!-- OBJETIVOS -->
    <div class="objectives">
      <div class="container-fluid px-0">
        <div v-for="(objective, index) in objectives" :key="objective">
          <Objective
            :title="objective.title"
            :imgSrc="objective.src"
            :imgPosition="!(index % 2) ? 'left' : 'right'"
            :text="objective.text"
            :theme="objective.theme"
            :height="objective.height"
            :customMargin="objective.customMargin"
            :buttonLabel="objective.buttonLabel"
            :buttonLink="objective.buttonLink"
          ></Objective>
        </div>
      </div>
    </div>
    <!-- </div> -->

    <!-- TESTIMONIOS -->
    <!-- <div class="testimonies">
      <div class="container">
        <div class="row my-5">
          <div
            class="col-sm"
            v-for="testimony in testimonies"
            :key="testimony.index"
          >
            <Testimony
              :name="testimony.name"
              :imgSrc="testimony.imgSrc"
            ></Testimony>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
// import LandPage from "@/components/LandPage.vue";
import Objective from "@/components/landpage/Objective.vue";
// import Testimony from "@/components/landpage/Testimony.vue";
import { objectives, testimonies } from "@/data/data.json";
import { isMobile } from "@/data/isMobile.js";

export default {
  name: "LandView",
  components: {
    Objective,
    // Testimony,
  },
  data() {
    return {
      objectives: objectives,
      testimonies: testimonies,
    };
  },
  computed: {
    isMobile: isMobile,
  },
};
</script>
<style scoped>
.land {
  height: 100%;
  overflow-x: auto;
}

.heroShoot {
  /* margin-top: 15%; */
  /* min-height: 100%; */
  /* opacity: 0.65; */
  background-position-x: center;
  /* background-position-y: bottom; */
  background-size: contain;
  background-repeat: no-repeat;
  width: 100%;
  height: 0;
  padding-top: 56.25%;
  background-color: #ebebeb;
  background-image: url(../assets/images/landpage/Landing\ 1.png);
}

.mainTitle {
  /* position: relative; */
  /* --logo-width: 65%;
  left: calc(var(--logo-width) / 2);
  width: calc(100% - var(--logo-width)); */
  margin-top: -60%;
  text-align: center;
  color: #9696f8;
  z-index: 6;
}

.title {
  font-size: 48px;
  font-family: PPEikoHeavy;
}
.subtitle {
  font-size: 26px;
  color: #ababab;
}

.botonHeroShoot {
  background-color: transparent;
  border-radius: 25px;
  border: 2px solid #9696f8;
  display: inline-block;
  cursor: pointer;
  color: #424369;
  font-family: Arial;
  font-size: 17px;
  font-weight: bold;
  padding: 8px 17px;
  text-decoration: none;
}
.botonHeroShoot:hover {
  transition: 0.3s ease;
  background-color: rgb(230, 230, 247, 0.5);
}
.botonHeroShoot:active {
  position: relative;
  top: 1px;
}

/* .heroShoot {
  min-height: 100%;
  position: relative;
  background-attachment: fixed;
  background-position-x: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url(../assets/images/landpage/Landing\ 1.png);
} */

.ksp {
  background-color: #656ee4;
}

.boton_contacto {
  /* color: black; */
  background-color: #d3db71;
  transition: 0.4s ease;
}
.boton_contacto:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

@font-face {
  font-family: MaisonNeueMedium;
  src: url("@/assets/fonts/Maison Neue/Maison Neue Medium.otf");
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
