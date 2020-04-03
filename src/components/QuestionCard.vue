<template>
  <div>
    <b-modal title="BootstrapVue" v-model="showQuestionModal" centered>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    showQuestionModal: Boolean
  }
}
</script>