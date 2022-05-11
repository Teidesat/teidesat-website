// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="objective my-5">
    <div
      class="row justify-content-center align-items-center"
      v-if="isImgRight"
    >
      <div style="text-align: left" :class="textDesktopMobile">
        <h2 class="title">{{ title }}</h2>
        <p class="description" :style="!isMobile ? textLeft : textCenter">
          {{ text }}
        </p>
      </div>
      <div :class="imgDesktop">
        <img
          :src="require(`@/assets/images/landpage/${imgSrc}`)"
          :style="imgResize"
        />
      </div>
    </div>
    <div
      class="row justify-content-center align-items-center"
      v-if="!isImgRight"
    >
      <div :class="isMobile ? imgMobile : imgDesktop">
        <img
          :src="require(`@/assets/images/landpage/${imgSrc}`)"
          :style="imgResize"
        />
      </div>
      <div style="text-align: left" :class="textDesktopMobile">
        <h2 class="title">{{ title }}</h2>
        <p class="description" :style="!isMobile ? textLeft : textCenter">
          {{ text }}
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
    imgPosition: String,
    imgSrc: String,
    text: String,
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
      imgDesktop: "col-sm-6",
      imgMobile: "col-sm",
      textDesktopMobile: "col-sm-4",
      imgResize: "max-width: 100%; height: auto",
    };
  },
};
</script>

<style scoped>
/* .objective {
} */
.row {
  color: white;
}
@font-face {
  font-family: PPEikoBlackItalic;
  src: url("@/assets/fonts/PPEiko/PPEiko-BlackItalic.otf");
}
@font-face {
  font-family: PPEikoHeavy;
  src: url("@/assets/fonts/PPEiko/PPEiko-Heavy.otf");
}
@font-face {
  font-family: PPEikoLightItalic;
  src: url("@/assets/fonts/PPEiko/PPEiko-LightItalic.otf");
}
@font-face {
  font-family: PPEikoMedium;
  src: url("@/assets/fonts/PPEiko/PPEiko-Medium.otf");
}
@font-face {
  font-family: PPEikoThin;
  src: url("@/assets/fonts/PPEiko/PPEiko-Thin.otf");
}
.title {
  font-family: "PPEikoLightItalic";
}
.description {
  font-family: "PPEikoThin";
  font-size: 110%;
}
</style>
