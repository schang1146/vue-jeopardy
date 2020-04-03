<template>
  <div>
    <h4>Scoreboard</h4>
    <p>Your Score: {{ score }}</p>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["score"])
  }
};
</script>
