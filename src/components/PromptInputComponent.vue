<!-- src/components/PromptInputComponent.vue -->
<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-11 col-md-10 col-lg-10 text-center"> <!-- Added text-center -->
                <textarea
                    class="large-text-field w-100"
                    placeholder="Type your prompt here...
eg: 'A brave adventure in the jungle'"
                    v-model="prompt"
                    rows="3"
                    @input="handleInput"
                    @keydown="handleKeydown"
                ></textarea>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: 'PromptInputComponent',
  emits: ['updateStory', 'submit'],
  data() {
    return {
      prompt: '', // State to store the story text
    };
  },
  methods: {
    handleInput() {
      this.$emit('updateStory', this.prompt); // Emit the input event to parent
    },
    handleKeydown(event) {
      if (event.key === 'Enter' && this.prompt.trim() !== '') {
        event.preventDefault(); // Prevent default newline behavior
        this.$emit('submit'); // Emit submit event
        this.prompt = ''; // Clear the input field after submission
      }
    },
  },
};
</script>

<style scoped>
.large-text-field {
  font-size: 1.4em;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #b463ffd3; /* Background color */
  color: #f1eaff; /* Text color */
  width: 500px;
  max-width: 500px; /* Set a max width */
  margin-top: 10px; /* Space between input and textarea */
  resize: none; /* Disable resizing */
  text-align: center;
  animation: fadeIn 0.4s;
}

.large-text-field::placeholder {
  color: #f1eaffb2;
}
@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

</style>
