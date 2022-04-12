// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="my-5 align-items-center">
    <div class="row justify-content-center" v-if="isImgRight">
      <div :class="isMobile ? imgMobile : imgDesktop">
        <h2>{{ title }}</h2>
        <p :style="!isMobile ? textLeft : textCenter">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed libero a
          quam voluptatem exercitationem minus esse. Corrupti sint non iusto
          aliquam fugiat exercitationem eligendi maxime nemo repellendus. Harum,
          amet ad.
        </p>
      </div>
      <div class="col-sm-4">
        <img :src="require(`@/assets/images/${imgSrc}`)" />
      </div>
    </div>
    <div class="row justify-content-center" v-if="!isImgRight">
      <div :class="isMobile ? imgMobile : imgDesktop">
        <img :src="require(`@/assets/images/${imgSrc}`)" />
      </div>
      <div class="col-sm-4">
        <h2>{{ title }}</h2>
        <p :style="!isMobile ? textLeft : textCenter">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed libero a
          quam voluptatem exercitationem minus esse. Corrupti sint non iusto
          aliquam fugiat exercitationem eligendi maxime nemo repellendus. Harum,
          amet ad.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { isMobile } from "@/data/isMobile.js";

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
    isMobile: isMobile,
    isImgRight() {
      return this.imgPosition === "right";
    },
  },
  data() {
    return {
      textLeft: "text-align: left;",
      textCenter: "text-align: center;",
      imgDesktop: "col-sm-4",
      imgMobile: "col-sm",
    };
  },
};
</script>

<style></style>
