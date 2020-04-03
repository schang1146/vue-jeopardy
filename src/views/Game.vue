<template>
  <div class="game-view-container">
    <h2>Jeopardy!</h2>
    <JeopardyBoard
      v-if="questions != [] && categories != []"
      :categories="categories"
      :questions="questions"
    />
    <ScoreBoard />
    <div>
      <b-button @click="backToHome" variant="outline-danger">Back To HomePage</b-button>
      <b-button @click="reloadPage" variant="danger">Reset</b-button>
    </div>
  </div>
</template>

<script>
import JeopardyBoard from "@/components/JeopardyBoard";
import ScoreBoard from "@/components/ScoreBoard";

import { mapState, mapActions } from "vuex";

export default {
  components: {
    JeopardyBoard,
    ScoreBoard
  },
  computed: {
    ...mapState(["categories", "questions"])
  },
  methods: {
    ...mapActions(["getCategories", "getQuestions"]),
    backToHome() {
      this.$router.push("/");
      window.location.reload();
    },
    reloadPage() {
      window.location.reload();
    }
  },
  async mounted() {
    await this.getCategories();
    await this.getQuestions();
  }
};
</script>

<style lang="scss">
.game-view-container {
  height: 100%;
  background-color: #272643;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
</style>
