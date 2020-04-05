<template>
  <div class="scoreboard-container">
    <h4>Scoreboard:</h4>
    <p>${{ score }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["players"])
  }
};
</script>

<style scoped>
@font-face {
  font-family: "gyparody";
  src: url(../assets/fonts/gyparody/gyparody_rg-webfont.woff);
}

.scoreboard-container {
  font-family: "gyparody";
  font-weight: normal;
  font-style: normal;
}
</style>
