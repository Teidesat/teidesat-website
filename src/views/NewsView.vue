<template>
  <div class="mainTitle">
    <h1>Titular principal 1A</h1>
  </div>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-10">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque omnis
          magnam saepe amet natus minima rerum unde, necessitatibus laboriosam
          impedit id nihil sit ratione ducimus hic, voluptatem iusto quidem
          aliquid?
        </p>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row" :class="{ 'row-cols-3': !isMobile }">
      <div :class="{ 'my-3': isMobile }" v-for="new_ in news" :key="new_">
        <hr v-if="isMobile" />
        <News :imgSrc="new_.imgSrc" :description="new_.description"></News>
      </div>
    </div>
  </div>
</template>

<script>
import News from "@/components/newspage/News.vue";
import { news_data } from "@/data/data.json";
import { isMobile } from "@/data/isMobile.js";
export default {
  name: "NewsView",
  components: { News },
  computed: {
    isMobile: isMobile,
  },
  data() {
    return {
      news: news_data,
    };
  },
};
</script>

<style>
.mainTitle {
  width: 100%;
  height: 50%;
}

.mainTitle h1 {
  position: relative;
  top: 45%;
  text-align: center;
  color: #032e43;
  font-size: 64px;
}

.descriptiveText {
  width: 50vw;
  margin-left: auto;
  margin-right: auto;
}
</style>
