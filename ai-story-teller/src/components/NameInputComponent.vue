<!-- src/components/NameInputComponent.vue -->
<template>
  <div class="input-container" :class="{ 'move-to-top': isMoving }">
    <input
      type="text"
      class="text-field"
      
      placeholder="Name your Character"
      v-model="name"
      @input="handleInput"
    />
    <PromptInputComponent v-show="name.length > 0" @updateStory="updateStory"/>
    <SubmitButtonComponent 
    v-show="prompt.length > 0" 
    @submit="submitPrompt" 
    />

  </div>
</template>

<script>
import PromptInputComponent from './PromptInputComponent.vue';
import SubmitButtonComponent from './SubmitButtonComponent.vue'; // Import the new button component



export default {
  name: 'NameInputComponent',
  components: {
    PromptInputComponent,
    SubmitButtonComponent,
  },
  emits: ['updateName'],
  data() {
    return {
      name: '', // State to store the user's name
      prompt: '',
      isMoving: false,
    };
  },
  methods: {
    handleInput() {
      this.$emit('updateName', this.name); // Emit the input event to parent
    },
    startMoving() {
      this.isMoving = true; // Trigger the movement animation
    },
    updateStory(prompt) {
     this.prompt = prompt
    },
    
  },
};
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column; /* Stack the input and textarea vertically */
  align-items: center;
}

.text-field {
  font-size: 1.2em;
  padding: 10px;
  border-radius: 10px;
  background-color: #b463ffd3; /* Dark background */
  color: #f1eaff; /* Light text */
  width: 300%;
  max-width: 300px;
  text-align: center;
  opacity: 0; /* Start with 0 opacity */
  transition: opacity 0.4s ease-in-out, all 0.4s ease-in-out; 
}

.move-to-top {
  position: absolute;
  top: 10%;
  opacity: 1;
}

.text-field::placeholder {
  color: #f1eaffb2;
}

.input-container.move-to-top .text-field {
  opacity: 1; /* Ensure opacity is 1 when the move class is applied */
}
</style>
