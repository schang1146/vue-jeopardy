<template>
  <div class="game-view-container">
    <h2>Jeopardy!</h2>
    <JeopardyBoard
      v-if="questions != [] && categories != []"
      :categories="categories"
      :questions="questions"
    />
    <ScoreBoard />
  </div>
</template>

<script>
// import ChannelDetails from "@/components/ChannelDetails";
import JeopardyBoard from "@/components/JeopardyBoard";
import ScoreBoard from "@/components/ScoreBoard";

import { mapState, mapActions } from "vuex";

export default {
  components: {
    // ChannelDetails,
    JeopardyBoard,
    ScoreBoard
  },
  computed: {
    ...mapState(["categories", "questions"])
  },
  data() {
    return {
      // holds current presence-id
      presenceid: null,
      // holds url of game
      url: null
    };
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
@font-face {
  font-family: "gyparody";
  src: url(../assets/fonts/gyparody/gyparody_rg-webfont.woff);
}

h2 {
  font-size: 75px;
  font-family: "gyparody";
  font-weight: normal;
  font-style: normal;
}

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
