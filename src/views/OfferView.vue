<template>
  <h1>Titular principal 1A</h1>
  <h2>Titular de apoyo 1B</h2>
  <div class="container">
    <div class="row">
      <p class="col-8 offset-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam vitae
        quas et dolores, amet repellat animi incidunt sed, illum omnis aliquid
        dolore? Architecto ab, quibusdam quia repudiandae tenetur voluptatem
        aspernatur!
      </p>
    </div>
    <div class="row">
      <p class="col-8 offset-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam vitae
        quas et dolores, amet repellat animi incidunt sed, illum omnis aliquid
        dolore? Architecto ab, quibusdam quia repudiandae tenetur voluptatem
        aspernatur!
      </p>
    </div>
  </div>

  <h2>Título de refuerzo 1C</h2>

  <div class="container">
    <div class="row row-cols-2">
      <div v-for="i in departments.length" :key="i" class="col">
        <Department
          :imgSrc="departments[i - 1].imgSrc"
          :name="departments[i - 1].name"
          :description="departments[i - 1].description"
        ></Department>
      </div>
    </div>
  </div>
  <h2>Título de cierre 1D</h2>
  <hr />
  <div class="container">
    <div v-for="i in Math.ceil(tfgs.length / 3)" :key="i" class="row">
      <div
        v-for="(dep, index2) in tfgs.slice((i - 1) * 3, i * 3)"
        :key="index2"
        class="col-sm my-3"
      >
        <TFG
          :imgSrc="tfgs[getBy2Index(i, index2, 3)].imgSrc"
          :name="tfgs[getBy2Index(i, index2, 3)].name"
          :title="tfgs[getBy2Index(i, index2, 3)].title"
        ></TFG>
      </div>
    </div>
  </div>
</template>

<script>
import Department from "@/components/offerpage/Department.vue";
import TFG from "@/components/offerpage/TFG.vue";

export default {
  name: "OfferView",
  components: {
    Department,
    TFG,
  },
  methods: {
    getBy2Index(i, j, ncols) {
      return (i - 1) * ncols + j;
    },
  },
  data() {
    return {
      departments: [
        {
          name: "Mecánica",
          description:
            "Departamento de mecánica\nLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam odio nesciunt itaque neque sunt ab, aliquam atque totam? Nemo, voluptatibus voluptate! Saepe reprehenderit hic placeat accusantium illo pariatur doloremque alias.",
          imgSrc: "mecanica.jpg",
        },
        {
          name: "Electrónica",
          description:
            "Departamento de electrónica\nLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam odio nesciunt itaque neque sunt ab, aliquam atque totam? Nemo, voluptatibus voluptate! Saepe reprehenderit hic placeat accusantium illo pariatur doloremque alias.",
          imgSrc: "electronica.jpg",
        },
        {
          name: "Física",
          description:
            "Departamento de física\nLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam odio nesciunt itaque neque sunt ab, aliquam atque totam? Nemo, voluptatibus voluptate! Saepe reprehenderit hic placeat accusantium illo pariatur doloremque alias.",
          imgSrc: "fisica.jpg",
        },
        {
          name: "Informática",
          description:
            "Departamento de informática\nLorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam odio nesciunt itaque neque sunt ab, aliquam atque totam? Nemo, voluptatibus voluptate! Saepe reprehenderit hic placeat accusantium illo pariatur doloremque alias.",
          imgSrc: "informatica.png",
        },
      ],
      tfgs: [
        {
          imgSrc: "ejemplo_testimonio.jpg",
          name: "Fabio Bianchini",
          title:
            "Desarrollo de Lenguaje de Dominio Específico para Generación Procedural.",
        },
        {
          imgSrc: "ejemplo_testimonio.jpg",
          name: "Daniel Del Castillo",
          title:
            "Desarrollo de Lenguaje de Dominio Específico para Generación Procedural.",
        },
        {
          imgSrc: "ejemplo_testimonio.jpg",
          name: "Eduardo Gil",
          title:
            "Desarrollo de Lenguaje de Dominio Específico para Generación Procedural.",
        },
        {
          imgSrc: "ejemplo_testimonio.jpg",
          name: "Pablo Torres",
          title:
            "Desarrollo de Lenguaje de Dominio Específico para Generación Procedural.",
        },
        {
          imgSrc: "ejemplo_testimonio.jpg",
          name: "Alberto Fuentes",
          title:
            "Desarrollo de Lenguaje de Dominio Específico para Generación Procedural.",
        },
        {
          imgSrc: "ejemplo_testimonio.jpg",
          name: "Luis David Romero",
          title:
            "Desarrollo de Lenguaje de Dominio Específico para Generación Procedural.",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
