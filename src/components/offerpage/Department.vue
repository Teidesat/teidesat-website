// eslint-disable-next-line vue/multi-word-component-names
<template>
  <img
    :class="{ 'mt-4 mb-3': isMobile }"
    :src="require(`@/assets/images/${imgSrc}`)"
    :style="imgSize"
  />
  <h3>{{ name }}</h3>
  <p>
    Descripción del departamento: <br />
    {{ description }}
  </p>
</template>

<script>
import { isMobile } from "@/data/isMobile.js";

export default {
  props: {
    name: String,
    description: String,
    imgSrc: String,
  },
  computed: {
    isMobile: isMobile,
  },
  data() {
    return {
      imgSize: "width: 300px; height: 200px;",
    };
  },
};
</script>

<style></style>
