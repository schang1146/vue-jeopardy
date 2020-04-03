<template>
  <div class="home-view-container">
    <b-row class="content-container" align-v="center">
      <b-col>
        <img alt="Vue logo" src="../assets/logo.png" />
        <h1><b>Jeopardy</b></h1>
        <h3>Built with Vue</h3>
        <div>
          <router-link to="/game">
            <b-button variant="primary">
              Start Game
            </b-button>
          </router-link>
          <!-- TODO: Make a `Rules` view
          <b-button variant="outline-success">
            Rules
          </b-button> -->
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style lang="scss">
.home-view-container {
  height: 100vh;
  background-color: #272643;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 80px;
    color: #e3f6f5;
  }

  h3 {
    font-size: 30px;
    color: #bae8e8;
  }
}

.btn {
  margin: 0 5px;
}
</style>
