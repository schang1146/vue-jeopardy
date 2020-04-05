<template>
  <div class="home-view-container">
    <b-row class="content-container" align-v="center">
      <b-col>
        <img alt="Vue logo" src="../assets/logo.png" />
        <h1><b>Jeopardy</b></h1>
        <div>
          <router-link to="/settings">
            <b-button squared variant="primary">
              Play!
            </b-button>
          </router-link>
          <router-link to="/rules">
            <b-button squared variant="success">
              Rules
            </b-button>
          </router-link>
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
