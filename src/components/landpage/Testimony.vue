// eslint-disable-next-line vue/multi-word-component-names
<template>
  <!-- <div class="col-sm"> -->
  <h4>{{ name }}</h4>
  <img :src="require(`@/assets/images/${imgSrc}`)" :style="imgSize" />
  <!-- </div> -->
</template>

<script>
export default {
  props: {
    name: String,
    imgSrc: String,
  },
  data() {
    return {
      imgSize: "width: 100%;",
    };
  },
};
</script>

<style></style>
