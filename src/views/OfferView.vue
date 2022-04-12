<template>
  <h1>Titular principal 1A</h1>
  <h2>Titular de apoyo 1B</h2>
  <div class="container">
    <div class="row justify-content-center">
      <p class="col-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam vitae
        quas et dolores, amet repellat animi incidunt sed, illum omnis aliquid
        dolore? Architecto ab, quibusdam quia repudiandae tenetur voluptatem
        aspernatur!
      </p>
    </div>
    <div class="row justify-content-center">
      <p class="col-8">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam vitae
        quas et dolores, amet repellat animi incidunt sed, illum omnis aliquid
        dolore? Architecto ab, quibusdam quia repudiandae tenetur voluptatem
        aspernatur!
      </p>
    </div>
  </div>

  <h2>Título de refuerzo 1C</h2>
  <div class="container">
    <div class="row" :class="{ 'row-cols-2': !isMobile }">
      <div v-for="department in departments" :key="department" class="col">
        <Department
          :imgSrc="department.imgSrc"
          :name="department.name"
          :description="department.description"
        ></Department>
      </div>
    </div>
  </div>
  <h2>Título de cierre 1D</h2>
  <hr />
  <div class="container">
    <div class="row row-cols-3">
      <div v-for="tfg in tfgs" class="col" :key="tfg">
        <TFG :imgSrc="tfg.imgSrc" :name="tfg.name" :title="tfg.title"></TFG>
      </div>
    </div>
  </div>
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
@media only screen and (max-width: 626px) {
  [class*="col"] {
    width: 100%;
  }
  [class*="offset-"] {
    width: 100%;
  }
}
</style>
