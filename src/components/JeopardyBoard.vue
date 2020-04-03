<template>
  <b-container class="jeopardy-board-container" fluid>
    <b-row class="row">
      <b-col
        class="category-box box"
        v-for="category in categories"
        :key="category"
      >
        {{ category }}
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
        <span class="box-text">{{ question.value }}</span>
      </b-col>
    </b-row>

    <b-modal
      class="question-modal-container"
      v-model="showQuestionModal"
      centered
    >
      <b-form @submit.prevent="submitAnswer">
        <p>{{ questionModalData.question }}</p>
        <p>
          <input placeholder="Answer:" v-model="answer" />
          <b-button @click="submitAnswer" variant="primary">Submit</b-button>
        </p>
        Debug Answer: <span class="question-answer">{{ questionModalData.answer }}</span>
      </b-form>
    </b-modal>
  </b-container>
</template>

<script>
// import QuestionCard from "./QuestionCard";
import { mapActions } from "vuex";

export default {
  // components: { QuestionCard },
  data() {
    return {
      showQuestionModal: false,
      questionModalData: {},
      answer: ""
    };
  },
  methods: {
    ...mapActions(["correctAnswer", "wrongAnswer"]),
    submitAnswer() {
      if (this.answer == this.questionModalData.answer) {
        this.correctAnswer(this.questionModalData);
        this.answer = "";
        this.showQuestionModal = false;
      } else {
        this.wrongAnswer(this.questionModalData);
        this.answer = "";
        this.showQuestionModal = false;
      }
    },
    toggleQuestionModal(question) {
      if (question.isAnswered == false) {
        this.showQuestionModal = !this.showQuestionModal;
        if (this.showQuestionModal == true) {
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
.jeopardy-board-container {
  width: 60%;
  height: 60%;

  .box-container {
    margin: 25px;
  }

  .box {
    border: 1px white solid;
    margin: 2px;
    background-color: blue;
    color: orange;

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
    background-color: gray;

    &:hover {
      cursor: default;
      background-color: gray;
    }
  }

  .row {
    height: calc((100% - 50px - (5 * 4px) - 20px) / 6);
  }

  .row:first-child {
    margin-bottom: 25px;
  }
}
.question-answer {
  background-color: #212529;

  &:hover {
    background-color: white;
  }
}
</style>
