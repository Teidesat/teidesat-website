// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="wrapper" :style="[isLightTheme ? light : dark, heightWrapper]">
    <div class="image" :style="imgStyle">
      <img
        :src="require(`@/assets/images/landpage/${img.src}`)"
        :style="imgResize"
      />
    </div>
    <div class="text text-start" :style="textStyle">
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
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    text: String,
    theme: String,
    img: Object,
    height: Number,
    // imgSrc: String,
    // positionImg: Object,
    positionText: Object,
    customMargin: Object,
    buttonLabel: String,
    buttonLink: String,
  },
  computed: {
    isLightTheme() {
      return this.theme === "light";
    },
    imgResize() {
      return "height: " + this.img.height + "vw;";
    },
    imgStyle() {
      return (
        "top: " +
        this.img.positionImg.y +
        "vw; left : " +
        this.img.positionImg.x +
        "vw;"
      );
    },
    textStyle() {
      return (
        "top: " +
        this.positionText.y +
        "vw; left : " +
        this.positionText.x +
        "vw;"
      );
    },
  },
  data() {
    return {
      textLeft: "text-align: left;",
      textCenter: "text-align: center;",
      heightWrapper: "height: " + this.height + "vw",

      dark: {
        backgroundImage:
          "url(https://raw.githubusercontent.com/Teidesat/teidesat-website/master/src/assets/images/landpage/Objetivo1_1.png)",
        backgroundSize: "cover",
        color: "#ebebeb",
      },
      light: "background-color: #ebebeb; color: #676bf0;",
    };
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
}
.image {
  position: absolute;
}
.text {
  position: absolute;
  width: 650px;
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
</style>
