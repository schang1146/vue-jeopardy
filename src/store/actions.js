import axios from "axios";

export default {
  deletePlayer: ({ state, commit }, payload) => {
    const players = state.players.filter(player => player.id != payload)
    commit("setPlayers", players);
  },
  getCategories: async ({ commit }) => {
    // initialize categories
    const categories = [];

    // keep track of id's to ensure no duplicates
    const id = [];

    // GET all trivia categories
    const all_categories = await axios
      .get("https://opentdb.com/api_category.php")
      .then(res => {
        return res.data.trivia_categories;
      })
      .catch(err => {
        return err.message;
      });

    // pick 6 random categories
    while (categories.length < 6) {
      let random_idx = Math.floor(
        Math.random() * Math.floor(all_categories.length)
      );
      if (!(id.includes(random_idx))) {
        id.push(random_idx)
        categories.push(all_categories[random_idx]);
      }
    }

    commit("setCategories", categories);
  },
  getQuestions: async ({ commit, state }) => {
    // initialize questions
    const questions = [[], [], [], [], [], []];

    // loop through categories
    for (let i = 0; i < state.categories.length; i++) {
      // GET 5 questions for category id
      const category_questions = await axios
        .get(
          `https://opentdb.com/api.php?amount=5&category=${state.categories[i].id}&type=multiple`
        )
        .then(res => {
          return res.data.results;
        })
        .catch(err => {
          return err.message;
        });

      // put category_questions into questions array with a value
      for (let n = 0; n < 5; n++) {
        const question_object = category_questions[n];
        question_object.value = (n + 1) * 200;
        question_object.isAnswered = false;
        questions[n].push(question_object);
      }
    };

    commit("setQuestions", questions);
  },
  postAnswer: ({ commit, state }, { question, guess, answer, value }) => {
    if (guess === answer) {
      commit("setScore", state.score + value);
    }
    for (let i = 0; i < 6; i++) {
      if (state.questions[value / 200 - 1][i].question === question) {
        commit("setQuestionAnswered", [value / 200 - 1, i]);
      }
    }
  },
  postPlayer: ({ commit, state }, payload) => {
    const lastId = Number(state.players[state.players.length - 1].name[state.players[state.players.length - 1].name.length - 1]);
    const newPlayer = {
      id: payload,
      name: `Player ${lastId + 1}`,
      score: 0
    };
    const players = state.players;
    players.push(newPlayer);
    commit("setPlayers", players);
  }
};
