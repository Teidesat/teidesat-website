<template>
  <div class="land">
    <div class="heroShoot">
      <img class="mainTitle" src="@/assets/images/landpage/teidesat-logo.png" />
      <!-- 
        <h1 class="mainTitle">Teidesat 1A</h1>
      <h2 class="secondTitle">
        Shedding a light into infinite outter space 2B
      </h2>
       -->
    </div>
  </div>
  <div class="ksp py-5">
    <!-- OBJETIVOS -->
    <div class="objectives">
      <div class="container-fluid">
        <div v-for="(objective, index) in objectives" :key="objective">
          <Objective
            :title="objective.title"
            :imgSrc="'Objetivo_' + (index + 1) + '.png'"
            :imgPosition="!(index % 2) ? 'left' : 'right'"
            :text="objective.text"
          ></Objective>
        </div>
      </div>
    </div>
    <div>
      <router-link
        to="/contacto"
        class="boton_contacto btn btn-primary px-4 py-3 bold"
      >
        Contacto
      </router-link>
    </div>
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
}

.mainTitle {
  position: absolute;
  --logo-width: 40%;
  left: calc(var(--logo-width) / 2);
  width: calc(100% - var(--logo-width));
  top: 30%;
  text-align: left;
  color: #000000;
  font-size: 24px;
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
  background-image: url(../assets/images/landpage/HeroShoot.png);
  font-family: "Nunito", sans-serif;
}

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
</style>
