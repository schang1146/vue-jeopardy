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
import ChannelDetails from "@/components/ChannelDetails";
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
  created() {
    this.fetchData();
  },
  data() {
    return {
      // holds current presence-id
      presenceid: null,
      // holds url of game
      url: null,
      // holds number of players
      n_players: 1
    };
  },
  methods: {
    ...mapActions(["deletePlayer", "getCategories", "getQuestions", "postPlayer"]),
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

      // pusher:member_added event is triggered when a user joins a channel
      // increase number of players by 1 and handle state
      channel.bind("pusher:member_added", member => {
        this.n_players += 1;
        this.postPlayer(member.id);
        console.log("member added", member);
      });

      // pusher:subscription_succeeded event is triggered when a subscription has been made to presence channel
      channel.bind("pusher:subscription_succeeded", members => {
        // TODO: handle when member is added
        console.log("sub succeeded", members);
      });

      // pusher:member_removed event is triggered when a user leaves a channel
      // decrease number of players by 1 and handle state
      channel.bind("pusher:member_removed", member => {
        this.n_players -= 1;
        this.deletePlayer(member.id);
        console.log("member removed", member);
      });

      // client-send event is triggered when receiving new data from Pusher and should update scores for everyone
      channel.bind("client-send", data => {
        console.log("client send", data);
      });
    },
    getUniqueId() {
      // eslint-disable-next-line
      return "id=" + Math.random().toString(36).substr(2, 8)
    },
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
    getPresenceId() {
      // appends "presence" to the result
      let id = this.getQueryString("id");
      id = "presence-" + id;
      return id;
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
