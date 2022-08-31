// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="my-5">
    <div
      class="row justify-content-center align-items-center"
      v-if="isImgRight"
    >
      <div class="col-sm-4">
        <h2 class="question">{{ question }}</h2>
        <p class="answer">
          {{ answer }}
        </p>
      </div>
      <div class="col-sm-4">
        <img
          class="image"
          :src="require(`@/assets/images/freqasked/${imgSrc}`)"
          :style="imgSize"
        />
      </div>
    </div>
    <div
      class="row justify-content-center align-items-center"
      v-if="!isImgRight"
    >
      <div class="col-sm-4">
        <img
          class="image"
          :src="require(`@/assets/images/freqasked/${imgSrc}`)"
          :style="imgSize"
        />
      </div>
      <div class="col-sm-4">
        <h2 class="question">{{ question }}</h2>
        <p class="answer">
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
      imgSize: " height: 300px; border-radius: 20px;",
    };
  },
};
</script>

<style>
.question {
  font-family: PPEikoMedium;
  color: #9694fd;
  font-size: 250%;
  margin-bottom: 15px;
  text-align: left;
}
.answer {
  text-align: left;
  color: #737373;
  font-size: 120%;
}
</style>
