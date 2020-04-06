<template>
  <div class="settings-view-container">
    <h2>Settings</h2>
    <div>
      <h3>Players</h3>
      <input type="text" placeholder="Enter your name:" />
      <input
        type="text"
        @click="copyLink"
        value="<link-to-invite-friends>"
        readonly
      />
    </div>
    <div>
      <h3>Difficulty of Questions</h3>
      <!-- TODO: onclick to show pressed and change data -->
      <b-button squared variant="success">Easy</b-button>
      <b-button squared variant="warning">Medium</b-button>
      <b-button squared variant="danger">Hard</b-button>
    </div>
    <div>
      <router-link to="/game">
        <b-button squared variant="success">Start Game!</b-button>
      </router-link>
      <router-link to="/">
        <b-button squared variant="danger">Back</b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    copyLink() {}
  }
};
</script>

<style scoped>
.settings-view-container {
  height: 100vh;
  background-color: #272643;
}
</style>
