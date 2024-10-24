<!-- src/components/NameInputComponent.vue -->
<template>
  <input
    type="text"
    class="text-field"
    placeholder="Name your Character"
    v-model="name"
    @input="handleInput"
  />
</template>

<script>
export default {
  name: 'NameInputComponent',
  emits: ['updateName'],
  data() {
    return {
      name: '', // State to store the user's name
    };
  },
  methods: {
    handleInput() {
      this.$emit('updateName', this.name); // Emit the input event to parent
    },
  },
};
</script>

<style scoped>
.text-field {
  font-size: 1.2em;
  padding: 10px;
  border-radius: 10px;
  background-color: #b463ffd3; /* Dark background */
  color: #f1eaff; /* Light text */
  width: 100%;
  max-width: 200px;
  text-align: center;

}

.text-field::placeholder {
  color: #f1eaffb2;
}
</style>
