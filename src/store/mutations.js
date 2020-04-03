export default {
  updateAnsweredQuestion: (state, payload) => {
    for (let i = 0; i < 6; i++) {
      if (state.questions[payload.value / 200 - 1][i].id == payload.id) {
        state.questions[payload.value / 200 - 1][i].isAnswered = true;
      }
    }
  },
  updateQuestions: (state, payload) => {
    state.categories = payload.categorySet;
    state.questions = payload.questionSet;
  },
  updateScore: (state, payload) => {
    console.log(payload);
    state.score += payload;
  },
  setCategories: (state, payload) => {
    state.categories = payload;
  },
  setQuestions: (state, payload) => {
    state.questions = payload;
  },
  setScore: (state, payload) => {
    state.score = payload;
  }
};
