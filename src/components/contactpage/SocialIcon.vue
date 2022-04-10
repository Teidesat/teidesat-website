<template>
  <a class="col" :href="href">
    <i :class="fa"></i>
  </a>
</template>

<script>
export default {
  props: {
    fa: String,
    href: String,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
a {
  pointer-events: none;
}
a svg {
  pointer-events: auto;
}
svg:hover {
  color: rgb(96, 244, 210);
}
a:visited {
  color: #e2b1a1;
}
</style>
