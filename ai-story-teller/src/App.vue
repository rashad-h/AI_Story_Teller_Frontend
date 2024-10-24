<template>
  <div class="app-container">
    <ProfileComponent />
    <TitleComponent />
    <StartButtonComponent v-if="!isStarted ||  !animationComplete"
    :isMorphing="isStarted"
    @click="handleStart"
    :buttonWidth="buttonWidth"/>
    <NameInputComponent v-if="isStarted && animationComplete" 
    @updateName="updateUserName"/>
  </div>
</template>

<script>

import TitleComponent from './components/TitleComponent.vue';
import StartButtonComponent from './components/StartButtonComponent.vue';
import ProfileComponent from './components/ProfileComponent.vue'
import NameInputComponent from './components/NameInputComponent.vue'


export default {
  name: 'App',
  components: {
    TitleComponent,
    StartButtonComponent,
    ProfileComponent,
    NameInputComponent,
  },

  data() {
    return {
      isStarted: false, // State to track if the button is clicked
      userName: '', // Store the user's name
      animationComplete: false,
      buttonWidth: 'auto',
    };
  },

  methods: {
    handleStart() {
      this.isStarted = true; // Set the state to true when the button is clicked
      this.buttonWidth = '300px';
      setTimeout(() => {
          this.animationComplete = true; // Allow time for the animation to complete
      }, 1400); // Match this duration to the animation time
    },
    updateUserName(name) {
      this.userName = name; // Update the user's name when emitted from NameInputComponent
      console.log('User name:', this.userName); // For demonstration, you can use this data later
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
}


</style>
