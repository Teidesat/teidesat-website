// eslint-disable-next-line vue/multi-word-component-names
<template>
  <img :src="require(`@/assets/images/${imgSrc}`)" :style="imgSize" />
  <h3>{{ name }}</h3>
  <p>
    Descripción del departamento: <br />
    {{ description }}
  </p>
</template>

<script>
export default {
  props: {
    name: String,
    description: String,
    imgSrc: String,
  },
  data() {
    return {
      imgSize: "width: 300px; height: 200px;",
    };
  },
};
</script>

<style></style>
