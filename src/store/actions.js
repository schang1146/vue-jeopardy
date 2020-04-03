import axios from "axios";

export default {
  correctAnswer: ({ commit }, question) => {
    commit("updateScore", question.value);
    commit("updateAnsweredQuestion", {
      id: question.id,
      value: question.value
    });
  },
  wrongAnswer: ({ commit }, question) => {
    commit("updateAnsweredQuestion", {
      id: question.id,
      value: question.value
    });
  },
  getCategoryQuestion: (_, { id }) => {
    return axios
      .get(`http://jservice.io/api/category/`, {
        params: {
          id
        }
      })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err.message;
      });
  },
  getRandomQuestion: () => {
    return axios
      .get("http://jservice.io/api/random")
      .then(res => {
        return res.data;
      })
      .catch(err => {
        return err.message;
      });
  },
  getQuestionSet: async ({ commit, dispatch }) => {
    let categoryId = [];
    let categorySet = [];
    let questionSet = [[], [], [], [], []];
    for (let i = 0; i < 6; i++) {
      let res = await dispatch("getRandomQuestion");
      categoryId.push(res[0].category_id);
    }
    for (let i = 0; i < 6; i++) {
      let res = await dispatch("getCategoryQuestion", {
        id: categoryId[i]
      });
      categorySet.push(res.title);
      for (let j = 0; j < 5; j++) {
        res.clues[j].value = 200 + 200 * j;
        res.clues[j].isAnswered = false;
        questionSet[j].push(res.clues[j]);
      }
    }
    commit("updateQuestions", { categorySet, questionSet });
  }
};
