// eslint-disable-next-line vue/multi-word-component-names
<template>
  <img :src="require(`@/assets/images/${imgSrc}`)" :style="imgSize" />
  <h3>{{ name }}</h3>
  <h5>{{ title }}</h5>
</template>

<script>
export default {
  props: {
    name: String,
    title: String,
    imgSrc: String,
  },
  data() {
    return {
      imgSize: "width: 300px;",
    };
  },
};
</script>

<style></style>
