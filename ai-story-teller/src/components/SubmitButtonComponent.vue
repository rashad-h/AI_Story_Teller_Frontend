<!-- src/components/SubmitButtonComponent.vue -->
<template>
    <button class="submit-button" @click="handleClick">
      Submit
    </button>
  </template>
  
  <script>
  export default {
    name: 'SubmitButtonComponent',
    emits: ['submit'],
    methods: {
      handleClick() {
        this.$emit('submit'); // Emit the submit event to parent
      },
    },
  };
  </script>
  
  <style scoped>
  .submit-button {
    margin-top: 10px; /* Space between textarea and button */
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #1d01bb; /* Green background */
    color: white; /* White text */
    font-size: 1em;
    cursor: pointer;
    transition: background-color 0.3s ease;
    animation: fadeIn 0.6s;
  }
  
  .submit-button:hover {
    background-color: #1100ff; /* Darker green on hover */
  }

  @keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}


  </style>
  