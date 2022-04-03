<template>
  <div class="land">
    <div class="heroShoot">
      <h1 class="mainTitle">Teidesat</h1>
      <h2 class="secondTitle">Shedding a light into infinite outter space</h2>
    </div>
  </div>
  <div class="ksp">
    <div class="objectives">
  </div>
</template>

<script>
// import LandPage from "@/components/LandPage.vue";

export default {
  name: "LandView",
  // components: {
  //   LandPage,
  // },
};
</script>
<style scoped>
.land {
  height: 100%;
}
.heroShoot {
  margin: 0;

  min-height: 100%;
  position: relative;
  /* opacity: 0.65; */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(../assets/images/Fondo-Teidesat.png);
  font-family: "Nunito", sans-serif;
}
.mainTitle {
  position: absolute;
  /* left: 0; */
  top: 45%;
  width: 100%;
  text-align: center;
  color: #032e43;
  font-size: 64px;
}
.secondTitle {
  color: #12638b;
  position: absolute;
  /* left: 0; */
  top: 60%;
  width: 100%;
  text-align: center;
}
</style>
