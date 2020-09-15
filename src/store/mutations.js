export default {
  setCategories: (state, payload) => {
    state.categories = payload;
  },
  setId: (state, payload) => {
    state.myid = payload;
  },
  setPlayers: (state, payload) => {
    state.players = payload;
  },
  setQuestions: (state, payload) => {
    state.questions = payload;
  },
  setQuestionAnswered: (state, payload) => {
    state.questions[payload[0]][payload[1]].isAnswered = true;
  },
  setScore: (state, payload) => {
    for (let i = 0; i < state.players.length; i++) {
      if (state.players[i].id === payload.playerid) {
        state.players[i].score = payload.score
      }
    }
  }
};
