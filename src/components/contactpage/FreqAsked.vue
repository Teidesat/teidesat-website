// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="row align-items-center">
    <div class="col-sm-3 offset-3" v-if="isImgRight">
      <h2>{{ question }}</h2>
      <p>
        {{ answer }}
      </p>
    </div>
    <div class="col-sm-3" v-if="isImgRight">
      <img :src="require(`@/assets/images/${imgSrc}`)" :style="imgSize" />
    </div>
    <div class="col-sm-3 offset-3" v-if="!isImgRight">
      <img :src="require(`@/assets/images/${imgSrc}`)" :style="imgSize" />
    </div>
    <div class="col-sm-3" v-if="!isImgRight">
      <h2>{{ question }}</h2>
      <p>
        {{ answer }}
      </p>
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
