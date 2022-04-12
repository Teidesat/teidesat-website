<template>
  <div class="mainTitle"><h1>Titular 1A</h1></div>
  <div class="missionShoot"></div>
  <div class="ksp container">
    <div v-for="i in 3" :key="i" class="row">
      <DescriptiveText></DescriptiveText>
    </div>
    <div class="row my-5">
      <h2>Cierre de argumento 1D</h2>
      <div>
        <router-link to="/contacto" class="btn btn-primary px-4 py-3 bold">
          Contacto
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import DescriptiveText from "@/components/missionpage/DescriptiveText.vue";

export default {
  name: "MissionView",
  components: { DescriptiveText },
};
</script>

<style scoped>
.missionShoot {
  margin: 0;
  height: 100%;
  position: relative;
  /* opacity: 0.65; */
  /* background-attachment: fixed; */
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(../assets/images/iss_view.jpg);
  font-family: "Nunito", sans-serif;
}

.mainTitle {
  /* left: 0; */
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
@media only screen and (max-width: 626px) {
  [class*="col"] {
    width: 100%;
  }
  [class*="offset-"] {
    width: 100%;
  }
}
</style>
