<template>
  <h1>Titular principal 1A</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam alias eos
    tempore voluptates excepturi repellendus sapiente laboriosam iure unde ea,
    culpa possimus voluptas blanditiis neque aliquid deleniti impedit facilis
    error?
  </p>
  <p>
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
        v-for="question in freq_questions"
        :key="question"
        :question="question.question"
        :answer="question.answer"
        :imgPosition="question.imgPosition"
        :imgSrc="question.imgSrc"
      ></FreqAsked>
    </div>
  </div>
</template>

<script>
import SocialIcon from "@/components/contactpage/SocialIcon.vue";
import FreqAsked from "@/components/contactpage/FreqAsked.vue";
import data from "@/data/data.json";
export default {
  name: "ContactView",
  components: { SocialIcon, FreqAsked },
  data() {
    return {
      social_icons: [
        {
          fa: "fa-brands fa-youtube",
          href: "https://www.youtube.com/channel/UCOD8MkTEBZJFkXkhQG4wOYw",
        },
        {
          fa: "fa-brands fa-github",
          href: "https://github.com/Teidesat",
        },
        {
          fa: "fa-brands fa-facebook",
          href: "https://es-es.facebook.com/pages/biz/TeideSat-1579970005429636/",
        },
        {
          fa: "fa-brands fa-twitter",
          href: "https://twitter.com/teidesat",
        },
        {
          fa: "fa fa-rss",
          href: "https://hyperspacegroup.com/feed/",
        },
        {
          fa: "fa fa-envelope",
          href: "/subscribe/",
        },
      ],
      freq_questions: data.freq_questions,
    };
  },
};
</script>

<style></style>
