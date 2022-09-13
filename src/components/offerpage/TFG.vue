// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div class="tfg">
    <p class="title">{{ title }}</p>
    <p class="placeyear">
      {{ place }} <br />
      {{ year }}
    </p>
    <div class="container">
      <div class="row">
        <div class="col" align="center">
          <img
            class="imgfluid"
            style="width: 150px; left: 50%"
            src="../../assets/images/landpage/Elementos_1.png"
          />
        </div>
      </div>
    </div>

    <router-link to="/contacto" class="buttonTFG mb-5">
      <span style="color: #ffffff" class="fw-bold">Descubrir </span>
      <i style="color: #ffffff" class="fa-solid fa-arrow-down"></i>
    </router-link>
  </div>
  <div class="info">
    <div><strong>Autor:</strong> {{ name }}</div>
    <div><strong>Ámbito:</strong> {{ subject }}</div>
    <div><strong>Sección:</strong> {{ section }}</div>
  </div>

  <!-- <img :src="require(`@/assets/images/${imgSrc}`)" :style="imgSize" />
  <h3>{{ name }}</h3>
  <h5>{{ title }}</h5> -->
</template>

<script>
export default {
  props: {
    imgSrc: String,
    title: String,
    name: String,
    place: String,
    year: Number,
    subject: String,
    section: String,
  },
  data() {
    return {
      imgSize: "width: 300px;",
    };
  },
};
</script>

<style>
.tfg {
  background-color: #ebebeb;
  border-radius: 25px;
  width: 270px;
  height: 340px;
  margin: auto;
  padding: 20px;
  text-align: left;
}
.tfg .title {
  color: #695fd2;
  font-family: MaisonNeueBold;
  font-size: 120%;
  margin: 0;
}
.tfg .placeyear {
  font-family: MaisonNeueBook;
  color: #959595;
}
.info {
  margin-top: 10px;
  margin-left: 20%;

  margin-bottom: 10%;
  text-align: left;
}
.tfg .buttonTFG {
  background-color: #c8e11f;
  border-radius: 25px;
  /* border: 2px solid #9696f8; */
  display: inline-block;
  cursor: pointer;
  font-family: Arial;
  font-size: 17px;
  font-weight: bold;
  padding: 10px 20px;
  margin-top: 10px;
  text-decoration: none;
}
.tfg .buttonTFG:hover {
  transition: 0.2s ease;
  background-color: #9baf19;
}
.tfg .buttonTFG:active {
  position: relative;
  top: 1px;
}

@font-face {
  font-family: MaisonNeueBold;
  src: url("@/assets/fonts/Maison Neue/Maison Neue Bold.otf");
}
@font-face {
  font-family: MaisonNeueBook;
  src: url("@/assets/fonts/Maison Neue/Maison Neue Book.otf");
}
</style>
