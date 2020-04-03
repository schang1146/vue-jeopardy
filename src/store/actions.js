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
  getCategories: async ({ commit }) => {
    // initialize categories
    const categories = [];

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
      categories.push(all_categories[Math.floor(Math.random() * Math.floor(all_categories.length))])
    }

    commit("setCategories", categories);
  },
  getQuestions: async ({ commit, state }) => {
    // initialize questions
    const questions = [[], [], [], [], [], []]

    // loop through categories
    state.categories.forEach(async ({ id }) => {
      // GET 5 questions for category id
      const category_questions = await axios
        .get(`https://opentdb.com/api.php?amount=5&category=${id}&type=multiple`)
        .then(res => {
          return res.data.results
        })
        .catch( err => {
          return err.message;
        });

      // put category_questions into questions array with a value
      for (let n = 0; n < 5; n++) {
        const question_object = category_questions[n]
        question_object.value = (n + 1) * 200;
        questions[n].push(question_object);
      }
    })
    
    commit("setQuestions", questions)
  },
  postAnswer: () => {}
};
