export default {
  setCategories: (state, payload) => {
    state.categories = payload;
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
    state.score = payload;
  }
};
