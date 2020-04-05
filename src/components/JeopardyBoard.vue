<template>
  <b-container class="jeopardy-board-container" fluid>
    <b-row class="row">
      <b-col
        class="category-box box"
        v-for="category in categories"
        :key="category.id"
      >
        {{ category.name }}
      </b-col>
    </b-row>
    <b-row
      class="row"
      v-for="questionArray in questions"
      :key="questions.indexOf(questionArray)"
    >
      <b-col
        id="toggle-question-modal"
        class="question-box box"
        v-bind:class="{ answered: question.isAnswered }"
        v-for="question in questionArray"
        :key="question.id"
        @click="toggleQuestionModal(question)"
      >
        <span class="box-text">${{ question.value }}</span>
      </b-col>
    </b-row>

    <b-modal
      class="question-modal-container"
      v-model="showQuestionModal"
      centered
      hide-footer
      hide-header
    >
      <b-form
        @submit.prevent="submitAnswer"
        v-if="!questionModalData.isAnswered"
      >
        <!-- Use v-html because API returns questions written with special html characters -->
        <p><span v-html="questionModalData.question" /></p>
        <p>
          <input placeholder="Answer:" v-model="answer" />
          <!-- <b-button @click="submitAnswer" variant="primary">Submit</b-button> -->
        </p>
      </b-form>
      <div v-else>
        <span v-html="result" />
      </div>
    </b-modal>
  </b-container>
</template>

<script>
// import QuestionCard from "./QuestionCard";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      showQuestionModal: false,
      questionModalData: {},
      answer: "",
      result: ""
    };
  },
  methods: {
    ...mapActions(["postAnswer"]),
    submitAnswer() {
      this.postAnswer({
        question: this.questionModalData.question,
        guess: this.answer,
        answer: this.questionModalData.correct_answer,
        value: this.questionModalData.value
      });
      if (this.answer === this.questionModalData.correct_answer) {
        this.result = "Correct!";
      } else {
        this.result = `Wrong!<br /><br />Correct Answer: ${this.questionModalData.correct_answer}`;
      }
      this.answer = "";
    },
    toggleQuestionModal(question) {
      if (question.isAnswered === false) {
        this.showQuestionModal = !this.showQuestionModal;
        if (this.showQuestionModal === true) {
          this.questionModalData = question;
        } else {
          this.questionModelData = {};
        }
      }
    }
  },
  props: {
    categories: Array,
    questions: Array
  }
};
</script>

<style lang="scss">
@font-face {
  font-family: "itc_korinnaregular";
  src: url(../assets/fonts/korinna-regular/korinna-regular-webfont.woff);
}

.jeopardy-board-container {
  width: 70%;
  height: 70%;

  font-family: "itc_korinnaregular";
  font-weight: normal;
  font-style: normal;

  .box-container {
    margin: 25px;
  }

  .box {
    border: 1px white solid;
    margin: 2px;
    background-color: #3f48cc;
    color: #ffc90e;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    overflow-y: auto;
  }

  .question-box:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 255, 0.5);
  }

  .answered {
    color: #3f48cc;

    &:hover {
      cursor: default;
      background-color: #3f48cc;
    }
  }

  .row {
    height: calc((100% - 50px - (5 * 4px) - 20px) / 6);
  }

  .row:first-child {
    margin-bottom: 25px;
  }
}

.modal-content {
  border-radius: 0px;
  border: 1px white solid;
  background-color: #3f48cc;
  color: #ffc90e;

  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;

  font-family: "itc_korinnaregular";
  font-weight: normal;
  font-style: normal;
}

.question-answer {
  background-color: #212529;

  &:hover {
    background-color: white;
  }
}
</style>
