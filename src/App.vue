<template>
  <div class="app-container">
    <ProfileComponent />
    <transition name="fade">
      <TitleComponent v-if="!isStarted && !submitted" />
    </transition>
    <StartButtonComponent v-if="!isStarted && !submitted"
    @click="handleStart"
    :buttonWidth="buttonWidth"/>
    <NameInputComponent v-if="isStarted && !submitted" 
    ref="nameInput"
    @updateName="updateUserName"
    @submitData="handleSubmitData"/>
    <ResultDisplayComponent v-if="submitted"
      :name="submittedName"
      :prompt="submittedPrompt"
    />
  </div>
</template>

<script>

import TitleComponent from './components/TitleComponent.vue';
import StartButtonComponent from './components/StartButtonComponent.vue';
import ProfileComponent from './components/ProfileComponent.vue'
import NameInputComponent from './components/NameInputComponent.vue'
import ResultDisplayComponent from './components/ResultDisplayComponent.vue';



export default {
  name: 'App',
  components: {
    TitleComponent,
    StartButtonComponent,
    ProfileComponent,
    NameInputComponent,
    ResultDisplayComponent,
  },

  data() {
    return {
      isStarted: false, // State to track if the button is clicked
      userName: '', // Store the user's name
      animationComplete: false,
      buttonWidth: 'auto',
      submitted: false,
      submittedName: '',
      submittedPrompt: '',
    };
  },

  methods: {
    handleStart() {
        this.buttonWidth = '300px';
        this.isStarted = true; // Set the state to true when the button is clicked
        setTimeout(() => {
            //   this.animationComplete = true; 
            this.$refs.nameInput.startMoving();
            
            // Allow time for the animation to complete
        }, 400); // Match this duration to the animation time
    },
    updateUserName(name) {
      this.userName = name; // Update the user's name when emitted from NameInputComponent
    },
    handleSubmitData({ name, prompt }) {
      this.submitted = true;
      this.submittedName = name;
      this.submittedPrompt = prompt;
    },
  },

};
</script>

<style scoped>


.app-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #240e5fe7; /* Faded dark background, Monokai Pro Octagon base */
  color: #f8f8f2; /* Light text color */
  position: relative;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0; /* Start or end with opacity 0 */
}

</style>
