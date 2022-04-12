<template>
  <h1>Titular principal 1A</h1>
  <p class="col-8 offset-2">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam alias eos
    tempore voluptates excepturi repellendus sapiente laboriosam iure unde ea,
    culpa possimus voluptas blanditiis neque aliquid deleniti impedit facilis
    error?
  </p>
  <p class="col-8 offset-2">
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque minima,
    quidem aspernatur et repudiandae sit consequuntur! Dolores atque dolore
    vitae quibusdam dolorum, animi, facilis dolorem vero enim autem accusantium
    voluptatibus!
  </p>
  <h2>Titular secundario 1B</h2>
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
  </div>
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

<style></style>
