<template>
  <a class="mx-2" :href="href">
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
  color: #c5da30;
}
svg:hover {
  transition: 0.15s ease;
  color: #78851c;
}
a:visited {
  color: #c5da30;
}
/* .cell {
  background-color: #c5da30;
  width: 65px;
  height: 70px;
  border-radius: 20px;
}
.cell:hover {
  transition: 0.15s ease;
  color: #78851c;
} */
</style>
