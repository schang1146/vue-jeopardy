<template>
  <div class="settings-view-container">
    <h2>Settings</h2>
    <div>
      <h3>Players</h3>
      <div class="players">
        <div class="player" v-for="player in players" :key="player.id">
          <li>{{ player }} <span v-if="myId === player.id">(You)</span></li>
        </div>
      </div>
      <input @click="copyLink" type="text" v-model="url" readonly />
    </div>
    <div>
      <h3>Difficulty of Questions</h3>
      <!-- TODO: onclick to show pressed and change data -->
      <b-button squared variant="success">Easy</b-button>
      <b-button squared variant="warning">Medium</b-button>
      <b-button squared variant="danger">Hard</b-button>
    </div>
    <div>
      <b-button squared variant="success" @click="startGame">Start Game!</b-button>
      <router-link to="/">
        <b-button squared variant="danger">Back</b-button>
      </router-link>
    </div>
  </div>
</template>

<script>
import ChannelDetails from "@/components/ChannelDetails";

import { mapActions, mapState } from "vuex";
// import { mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["categories", "players", "questions"])
  },
  created() {
    this.fetchData();
  },
  data() {
    return {
      url: null,
      myId: null,
      presenceid: null,
    }
  },
  methods: {
    ...mapActions([
      "deletePlayer",
      "getCategories",
      "getQuestions",
      "postCategories",
      "postId",
      "postPlayer",
      "postQuestions"
    ]),
    checkPresenceId() {
      let getQueryString = (field, url) => {
        let href = url ? url : window.location.href;
        let reg = new RegExp("[?&]" + field + "=([^&#]*)", "i");
        let string = reg.exec(href);
        return string ? string[1] : null;
      };
      let id = getQueryString("id");
      return id;
    },
    copyLink() {},
    fetchData() {
      // sets data instance of presenceid var to result of getUniqueId function
      this.presenceid = this.getUniqueId();

      // check if presenceid is in the url via checkPresenceId function; if not, appends it to url
      if (!this.checkPresenceId()) {
        var separator = window.location.href.indexOf("?") === -1 ? "?" : "&";
        window.location.href =
          window.location.href + separator + this.presenceid;
      }

      // set the data instance url to the curent url
      this.url = window.location.href;

      // channel variable set to subscribeToPusher func in ChannelDetails
      let channel = ChannelDetails.subscribeToPusher();

      // pusher:subscription_succeeded event is triggered when a subscription has been made to presence channel
      channel.bind("pusher:subscription_succeeded", members => {
        // TODO: handle when member is added
        console.log(members)
        this.myId = members.myID;
        this.postId(members.myID);
        let playerNumber = 1;
        for (let key in members.members) {
          this.postPlayer({
            id: key,
            name: `Player ${playerNumber}`,
            role: playerNumber === 1 ? "host" : "guest",
            score: 0
          })
          playerNumber += 1
        }
        console.log("sub succeeded", members.members);
      });

      // pusher:member_added event is triggered when a user joins a channel
      // increase number of players by 1 and handle state
      channel.bind("pusher:member_added", member => {
        this.postPlayer({
            id: member.id,
            name: `Player ${this.players.length + 1}`,
            role: "guest",
            score: 0
          });
        console.log("member added", member);
      });

      // pusher:member_removed event is triggered when a user leaves a channel
      // decrease number of players by 1 and handle state
      channel.bind("pusher:member_removed", member => {
        this.deletePlayer(member.id);
        console.log("member removed", member);
      });

      // client-start-game event triggered when host clicks 'Start Game'
      channel.bind("client-start-game", data => {
        this.postCategories(data.categories)
        this.postQuestions(data.questions)
        this.$router.push("/game")
      });

      // client-update-scores triggered when player answers question
      channel.bind("client-log-test", () => {
        console.log("client-log-test");
      })
    },
    getUniqueId() {
      // eslint-disable-next-line
      return "id=" + Math.random().toString(36).substr(2, 8)
    },
    getPresenceId() {
      // appends "presence" to the result
      let id = this.getQueryString("id");
      id = "presence-" + id;
      return id;
    },
    async startGame() {
      await this.getCategories();
      await this.getQuestions();
      let channel = ChannelDetails.subscribeToPusher();
      this.$router.push("/game")
      console.log(this.questions)
      channel.trigger("client-start-game", {
        categories: this.categories,
        questions: this.questions
      });
    }
  }
};
</script>

<style scoped>
.settings-view-container {
  height: 100vh;
  background-color: #272643;
}
</style>
