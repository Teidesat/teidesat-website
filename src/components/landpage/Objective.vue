// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="row my-5 align-items-center">
    <div class="col-sm-4 offset-2" v-if="isImgRight">
      <h2>{{ title }}</h2>
      <p :style="textLeft">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed libero a
        quam voluptatem exercitationem minus esse. Corrupti sint non iusto
        aliquam fugiat exercitationem eligendi maxime nemo repellendus. Harum,
        amet ad.
      </p>
    </div>
    <div class="col-sm-4" v-if="isImgRight">
      <img :src="require(`@/assets/images/${imgSrc}`)" />
    </div>
    <div class="col-sm-4 offset-2" v-if="!isImgRight">
      <img :src="require(`@/assets/images/${imgSrc}`)" />
    </div>
    <div class="col-sm-4" v-if="!isImgRight">
      <h2>{{ title }}</h2>
      <p :style="textLeft">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed libero a
        quam voluptatem exercitationem minus esse. Corrupti sint non iusto
        aliquam fugiat exercitationem eligendi maxime nemo repellendus. Harum,
        amet ad.
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    imgPosition: {
      String,
      default: "left",
    },
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
    };
  },
};
</script>

<style></style>
