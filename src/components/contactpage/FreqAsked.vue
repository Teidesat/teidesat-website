// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div>
    <div
      class="row justify-content-center align-items-center"
      v-if="isImgRight"
    >
      <div class="col-sm-3">
        <h2>{{ question }}</h2>
        <p>
          {{ answer }}
        </p>
      </div>
      <div class="col-sm-3">
        <img :src="require(`@/assets/images/${imgSrc}`)" :style="imgSize" />
      </div>
    </div>
    <div
      class="row justify-content-center align-items-center"
      v-if="!isImgRight"
    >
      <div class="col-sm-3">
        <img :src="require(`@/assets/images/${imgSrc}`)" :style="imgSize" />
      </div>
      <div class="col-sm-3">
        <h2>{{ question }}</h2>
        <p>
          {{ answer }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    question: String,
    answer: String,
    imgPosition: String,
    imgSrc: String,
  },
  computed: {
    isImgRight() {
      return this.imgPosition === "right";
    },
  },
  data() {
    return {
      textLeft: "text-align: left;",
      imgSize: "width: 200px; height: 300px; border-radius: 20px;",
    };
  },
};
</script>

<style></style>
