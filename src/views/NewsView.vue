<template>
  <div class="mainTitle">
    <h1>Titular principal 1A</h1>
  </div>
  <p class="descriptiveText">
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque omnis magnam
    saepe amet natus minima rerum unde, necessitatibus laboriosam impedit id
    nihil sit ratione ducimus hic, voluptatem iusto quidem aliquid?
  </p>
  <div class="container">
    <div class="row row-cols-3">
      <div v-for="new_ in news" :key="new_">
        <News :imgSrc="new_.imgSrc" :description="description"></News>
      </div>
    </div>
  </div>
</template>

<script>
import News from "@/components/newspage/News.vue";
export default {
  name: "NewsView",
  components: {
    News,
  },
  data() {
    return {
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat reprehenderit enim, similique maxime in ea magni aut itaque nemo perferendis nihil dolor minima voluptate nobis voluptatum nostrum ab modi. Aut!",
      news: [
        { imgSrc: "ejemplo_testimonio.jpg" },
        { imgSrc: "ejemplo_testimonio.jpg" },
        { imgSrc: "ejemplo_testimonio.jpg" },
        { imgSrc: "ejemplo_testimonio.jpg" },
        { imgSrc: "ejemplo_testimonio.jpg" },
        { imgSrc: "ejemplo_testimonio.jpg" },
        { imgSrc: "ejemplo_testimonio.jpg" },
        { imgSrc: "ejemplo_testimonio.jpg" },
        { imgSrc: "ejemplo_testimonio.jpg" },
      ],
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
