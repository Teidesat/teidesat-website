<template>
  <div class="container">
    <div class="row">
      <div class="col-8 offset-2">
        <h1 class="mainTitle my-5">
          Un mensaje para quienes tienen la mirada en las estrellas...
        </h1>
        <p class="paragraph">
          Construir un satélite es un reto ambicioso por ello nuestro equipo
          busca la forma de compatibilizar el proyecto con la vida académica de
          sus miembros. Así se ha creado una oferta educativa en la que sus
          miembros y aquellos que estén interesados en el diseño de una misión
          espacial puedan beneficiarse mientras participan en un proyecto real.
          <br /><br />
          No dudes en escribirnos a
          <a style="color: #656ee4">teidesat.contact@ull.es</a>
        </p>
        <h1 class="secondTitle my-5">¿Sientes que tu futuro está aquí?</h1>
        <router-link to="/contacto" class="button mb-5">
          <span style="color: #424369" class="fw-bold">Descúbrelo </span>
          <i style="color: #9696f8" class="fa-solid fa-arrow-right"></i>
        </router-link>
      </div>
    </div>
  </div>
  <div class="proyectos">
    <div class="container">
      <div class="row">
        <div class="col-6 offset-3">
          <h1 class="mainTitle my-5">Un mapa estelar de proyectos</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-8 offset-2">
          <p class="paragraph mb-5">
            Siéntete libre de consultar algunos de los trabajos de fin de
            titulación desarrollados por integrantes de Teidesat para la misión.
            Sacamos nuevos proyectos cada año con estudiantes o profesionales de
            diferentes universidades dentro y fuera de España.
          </p>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row row-cols-3 justify-content-center align-content-center">
        <div v-for="tfg in tfgs" class="col" :key="tfg">
          <TFG
            :imgSrc="tfg.imgSrc"
            :title="tfg.title"
            :place="tfg.place"
            :year="tfg.year"
            :name="tfg.name"
            :subject="tfg.subject"
            :section="tfg.section"
          ></TFG>
        </div>
      </div>
    </div>
  </div>

  <div class="finalSection">
    <div class="container">
      <div class="row">
        <div class="col-10 offset-1">
          <h1 class="mainTitle my-5">Siempre hay propuestas</h1>
          <p class="paragraph my-5">
            Si todavía no tienes claro cuál será el enfoque de tu proyecto de
            fin de grado o máster y necesitas asegurarte de contar con la
            tutorización adecuada para llevarlo a cabo, en Teidesat tenemos una
            amplia lista de trabajos de fin de titulación aptos para su
            implementación en la misión del TEIDESAT-01. <br /><br />
            No dudes en contactarnos directamente para recibir más información.
          </p>
        </div>
      </div>
    </div>
  </div>

  <!--  -->
  <!--  -->
  <!--  -->
  <Department></Department>
  <!-- <div class="container">
    <div class="row" :class="{ 'row-cols-2': !isMobile }">
      <div v-for="department in departments" :key="department" class="col">
        <Department
          :imgSrc="department.imgSrc"
          :name="department.name"
          :description="department.description"
        ></Department>
      </div>
    </div>
  </div>-->
</template>

<script>
import Department from "@/components/offerpage/Department.vue";
import TFG from "@/components/offerpage/TFG.vue";
import { departments, tfgs } from "@/data/data.json";
import { isMobile } from "@/data/isMobile.js";

export default {
  name: "OfferView",
  components: { Department, TFG },
  computed: {
    isMobile: isMobile,
  },
  data() {
    return {
      departments: departments,
      tfgs: tfgs,
    };
  },
};
</script>

<style scoped>
.mainTitle {
  color: #6965f8;
  font-family: PPEikoHeavy;
  /* font-size: 400%; */
}
.paragraph {
  color: #737373;
  font-size: 120%;
}
.secondTitle {
  color: #93a51c;
  font-family: PPEikoMedium;
}
.button {
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
.button:hover {
  transition: 0.3s ease;
  background-color: rgb(230, 230, 247, 0.5);
}
.button:active {
  position: relative;
  top: 1px;
}
.proyectos {
  width: 100%;
  background-color: #cbdf28;
}
.proyectos .mainTitle {
  color: #ffffff;
  font-size: 400%;
  font-family: PPEikoHeavy;
}
.finalSection .mainTitle {
  color: #9694fd;
  font-size: 400%;
  font-family: PPEikoHeavy;
}
.finalSection .paragraph {
  color: #737373;
  font-size: 120%;
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
@media only screen and (max-width: 626px) {
  [class*="col"] {
    width: 100%;
  }
  [class*="offset-"] {
    width: 100%;
  }
}
</style>
