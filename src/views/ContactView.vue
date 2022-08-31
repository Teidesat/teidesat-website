<template>
  <div class="container">
    <div class="row">
      <div class="col-8 offset-1">
        <div class="headSection my-5">
          <h1 class="mainTitle">Nos encantaría compartir la misión contigo</h1>
          <p class="paragraph my-5">
            En Teidesat ponemos a tu servicio las herramientas que necesitas
            para iniciar tu carrera en el mundo aeroespacial, contando a tu lado
            con un equipo multidisciplinar cuyas áreas van más allá de las
            ingenierías. Puedes comenzar pasándote por nuestro correo para
            dejarnos un saludo.
            <br />
            Estaremos encantados de conocerte. <br /><br />No dudes en
            escribirnos a <a style="color: #656ee4">teidesat.contact@ull.es</a>
          </p>
          <h2 class="subtitle">¡Sigue la odisea espacial!</h2>
          <div class="social">
            <div class="container px-0">
              <div class="row fa-3x">
                <div class="col">
                  <SocialIcon
                    v-for="social in social_icons"
                    :key="social"
                    :fa="social.fa"
                    :href="social.href"
                  ></SocialIcon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="questions my-5">
    <h1 class="mainTitle">Las estrellas preguntan, Teidesat responde</h1>
    <FreqAsked
      :question="freq_questions[0].question"
      :answer="freq_questions[0].answer"
      :imgPosition="freq_questions[0].imgPosition"
      :imgSrc="freq_questions[0].imgSrc"
    ></FreqAsked>
    <div class="container">
      <div class="row">
        <div class="col">
          <img
            class="resourceImg1"
            src="@/assets/images/landpage/Recurso1.png"
          />
        </div>
        <div class="col">
          <img
            class="resourceImg2"
            src="@/assets/images/landpage/Elementos_1.png"
          />
        </div>
      </div>
    </div>
    <FreqAsked
      :question="freq_questions[1].question"
      :answer="freq_questions[1].answer"
      :imgPosition="freq_questions[1].imgPosition"
      :imgSrc="freq_questions[1].imgSrc"
    ></FreqAsked>

    <router-link to="/" class="button">
      <span style="color: #424369" class="fw-bold">Me interesa </span>
      <i style="color: #9696f8" class="fa-solid fa-arrow-down"></i>
    </router-link>
  </div>

  <!-- <h2>Titular secundario 1B</h2>
  <div class="container">
    <div class="row fa-3x">
      <SocialIcon
        v-for="social in social_icons"
        :key="social"
        :fa="social.fa"
        :href="social.href"
      ></SocialIcon>
    </div>
  </div>
  <h2 class="my-4">Preguntas frecuentes</h2>
  <div class="container">
    <div class="row">
      <FreqAsked
        :class="{ 'my-3': isMobile }"
        v-for="question in freq_questions"
        :key="question"
        :question="question.question"
        :answer="question.answer"
        :imgPosition="!isMobile ? question.imgPosition : 'left'"
        :imgSrc="question.imgSrc"
      ></FreqAsked>
    </div>
  </div> -->
</template>

<script>
import SocialIcon from "@/components/contactpage/SocialIcon.vue";
import FreqAsked from "@/components/contactpage/FreqAsked.vue";
import { freq_questions, social_icons } from "@/data/data.json";
import { isMobile } from "@/data/isMobile.js";
export default {
  name: "ContactView",
  components: { SocialIcon, FreqAsked },
  computed: {
    isMobile: isMobile,
  },
  data() {
    return {
      social_icons: social_icons,
      freq_questions: freq_questions,
    };
  },
};
</script>

<style>
.headSection {
  text-align: left;
}
.headSection .mainTitle {
  font-family: PPEikoHeavy;
  color: #6965f8;
}
.headSection .paragraph {
  color: #737373;
  font-size: 120%;
}
.headSection .subtitle {
  color: #93a51c;
  font-family: PPEikoMedium;
}
.questions {
  text-align: center;
}
.questions .mainTitle {
  font-family: PPEikoHeavy;
  color: #9694fd;
  font-size: 350%;
  margin-left: 20vw;
  margin-right: 20vw;
}
.resourceImg1 {
  height: 400px;
  margin-bottom: -300px;
}
.resourceImg2 {
  height: 100px;
  margin-top: -200px;
}

.button {
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
.button:hover {
  transition: 0.2s ease;
  background-color: rgba(179, 179, 186, 0.5);
}
.button:active {
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
