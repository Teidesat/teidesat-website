// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="objective py-5" :style="isLightTheme ? light : dark">
    <div class="row justify-content-center align-items-start" v-if="isImgRight">
      <div class="col-sm-3" style="text-align: left">
        <h2 class="title">{{ title }}</h2>
        <p class="description">
          {{ text }}
        </p>
      </div>
      <div class="col-sm-6">
        <img
          :src="require(`@/assets/images/landpage/${imgSrc}`)"
          :style="imgResize"
        />
      </div>
    </div>
    <div
      class="row justify-content-center align-items-start"
      v-if="!isImgRight"
      :style="backgroundObjective"
    >
      <div class="col-sm-6">
        <img
          :src="require(`@/assets/images/landpage/${imgSrc}`)"
          :style="imgResize"
        />
      </div>
      <div style="text-align: left" class="col-sm-3">
        <h2 class="title">{{ title }}</h2>
        <p class="description">
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
    theme: String,
    src: String,
    height: Number,
  },
  computed: {
    isMobile: isMobile,
    isImgRight() {
      return this.imgPosition === "right";
    },
    isLightTheme() {
      return this.theme === "light";
    },
    imgResize() {
      return "height: " + this.height + "px";
    },
  },
  data() {
    return {
      textLeft: "text-align: left;",
      textCenter: "text-align: center;",
      // imgDesktop: "col-sm-6",
      // imgMobile: "col-sm",
      // textDesktopMobile: "col-sm-4",
      // imgResize: "max-width: 100%; height: auto",
      // backgroundObjective: "`@/assets/images/landpage/Objetivo1_1.png`",
      backgroundObjective: {
        backgroundImage: "url('../../assets/images/landpage/Objetivo1_1.png')",
      },
      dark: "color: #ebebeb;",
      light: "background-color: #ebebeb; color: #676bf0;",
    };
  },
};
</script>

<style scoped>
/* .objective {
} */
/* .row {
  color: white;
} */
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
