// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="objective py-5" :style="isLightTheme ? light : dark">
    <div
      class="row justify-content-center align-items-start mx-5"
      v-if="isImgRight"
    >
      <div class="col-sm-5" style="text-align: left">
        <h2 class="title">{{ title }}</h2>
        <p class="description">
          {{ text }}
        </p>
        <router-link
          :to="buttonLink"
          :class="isLightTheme ? 'buttonLight' : 'buttonDark'"
        >
          <span class="fw-bold">{{ buttonLabel }} </span>
          <i class="fa-solid fa-arrow-right"></i>
        </router-link>
      </div>
      <div class="col-sm-7" :style="customMarginCalc">
        <!-- style="margin-top: -400px" -->
        <img
          :src="require(`@/assets/images/landpage/${imgSrc}`)"
          :style="imgResize"
          style="margin-left: -100px"
        />
      </div>
    </div>
    <div
      class="row justify-content-center align-items-start mx-5"
      v-if="!isImgRight"
    >
      <div class="col-sm-6" :style="customMarginCalc">
        <img
          :src="require(`@/assets/images/landpage/${imgSrc}`)"
          :style="imgResize"
        />
      </div>
      <div class="col-sm-6" style="text-align: left">
        <h2 class="title">{{ title }}</h2>
        <p class="description">
          {{ text }}
        </p>
        <router-link
          :to="buttonLink"
          :class="isLightTheme ? 'buttonLight' : 'buttonDark'"
        >
          <span class="fw-bold">{{ buttonLabel }} </span>
          <i class="fa-solid fa-arrow-right"></i>
        </router-link>
      </div>
      <!-- <div class="col-sm-3"></div> -->
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
    customMargin: String,
    buttonLabel: String,
    buttonLink: String,
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
    customMarginCalc() {
      return "margin-top: " + this.customMargin + "px";
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
      dark: {
        backgroundImage:
          "url(https://raw.githubusercontent.com/Teidesat/teidesat-website/master/src/assets/images/landpage/Objetivo1_1.png)",
        backgroundSize: "cover",
        color: "#ebebeb",
      },
      light: "background-color: #ebebeb; color: #676bf0;",
      // buttonLight: {
      //   backgroundColor: "transparent",
      //   borderRadius: "25px",
      //   border: "2px solid #9696f8",
      //   display: "inline-block",
      //   cursor: "pointer",
      //   color: "#424369",
      //   fontFamily: "Arial",
      //   fontSize: "17px",
      //   fontWeight: "bold",
      //   padding: "8px 17px",
      //   textDecoration: "none",
      // },
    };
  },
};
</script>

<style scoped>
@font-face {
  font-family: MaisonNeueMedium;
  src: url("@/assets/fonts/Maison Neue/Maison Neue Medium.otf");
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
  font-family: "PPEikoMedium";
  font-size: 300%;
}
.description {
  font-family: "MaisonNeueMedium";
  font-size: 110%;
}

.buttonLight {
  background-color: transparent;
  border-radius: 25px;
  border: 2px solid #9696f8;
  display: inline-block;
  cursor: pointer;
  color: #424369;
  font-family: Arial;
  font-size: 17px;
  font-weight: bold;
  padding: 8px 17px;
  text-decoration: none;
}
.buttonLight:hover {
  transition: 0.3s ease;
  background-color: rgba(162, 162, 249, 0.5);
}
.buttonLight:active {
  position: relative;
  top: 1px;
}
.buttonDark {
  background-color: transparent;
  border-radius: 25px;
  border: 2px solid #ffffff;
  display: inline-block;
  cursor: pointer;
  color: #ffffff;
  font-family: Arial;
  font-size: 17px;
  font-weight: bold;
  padding: 8px 17px;
  text-decoration: none;
}
.buttonDark:hover {
  transition: 0.3s ease;
  background-color: rgb(230, 230, 247, 0.5);
}
.buttonDark:active {
  position: relative;
  top: 1px;
}
</style>
