<template>
  <div class="land">
    <div class="heroShoot">
      <h1 class="mainTitle">Teidesat 1A</h1>
      <h2 class="secondTitle">
        Shedding a light into infinite outter space 2B
      </h2>
    </div>
  </div>
  <div class="ksp my-5">
    <h2>Titular de apoyo previo 3B</h2>

    <!-- OBJETIVOS -->
    <div class="objectives">
      <div class="container">
        <div v-for="objective in objectives" :key="objective.index">
          <Objective
            :title="objective.title"
            :imgPosition="!isMobile ? objective.imgPosition : 'left'"
            :imgSrc="objective.imgSrc"
          ></Objective>
        </div>
      </div>
    </div>
    <h2>Texto de refuerzo general 1C</h2>

    <!-- TESTIMONIOS -->
    <div class="testimonies">
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
    </div>
  </div>
  <h2>Cierre de argumento 1D</h2>
  <div>
    <router-link to="/contacto" class="btn btn-primary px-4 py-3 bold">
      Contacto
    </router-link>
  </div>
</template>

<script>
// import LandPage from "@/components/LandPage.vue";
import Objective from "@/components/landpage/Objective.vue";
import Testimony from "@/components/landpage/Testimony.vue";
import { objectives, testimonies } from "@/data/data.json";
import { isMobile } from "@/data/isMobile.js";

export default {
  name: "LandView",
  components: { Objective, Testimony },
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
}

.mainTitle {
  position: absolute;
  /* left: 0; */
  top: 45%;
  width: 100%;
  text-align: center;
  color: #032e43;
  font-size: 64px;
}
.secondTitle {
  color: #12638b;
  position: absolute;
  /* left: 0; */
  top: 60%;
  width: 100%;
  text-align: center;
}

.heroShoot {
  margin: 0;

  min-height: 100%;
  position: relative;
  /* opacity: 0.65; */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(../assets/images/Fondo-Teidesat.png);
  font-family: "Nunito", sans-serif;
}
</style>
