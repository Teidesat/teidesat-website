// eslint-disable-next-line vue/multi-word-component-names
<template>
  <img :src="require(`@/assets/images/${imgSrc}`)" :style="imgSize" />
  <p>{{ description }}</p>
</template>

<script>
export default {
  props: {
    imgSrc: String,
    description: String,
  },
  data() {
    return {
      imgSize: "width: 200px; height: 300px; border-radius: 20px;",
    };
  },
};
</script>

<style></style>
