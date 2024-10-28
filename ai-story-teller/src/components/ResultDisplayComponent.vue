<template>
  <div class="result-container">
    <div v-for="(story, index) in stories" :key="index" class="story-container">
      <h2>Stage {{ story.stageNumber }}</h2>
      <p>{{ story.storyText }}</p>
      <p><strong>Choices:</strong> {{ story.choices.join(' ') }}</p>
      <p><em>{{ story.sceneDescription }}</em></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultDisplayComponent',
  props: ['name', 'prompt'],
  data() {
    return {
      result: null, // Store API response
      stories: [],
    };
  },
  methods: {
    async fetchStory() {
      console.log("SENDING REQUEST")
      if (this.name && this.prompt) {
        try {
          const response = await fetch('/story/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: this.name, prompt: this.prompt }),
          });
          const data = await response.json();
          this.parseStory(data);
        } catch (error) {
          console.error('Error fetching story:', error);
          this.result = 'An error occurred while fetching the story.';
        }
      }
    },
    parseStory(data) {
      // Extracting relevant fields and pushing to the stories array
      const parsedData = {
        stageNumber: data.stage_number,
        storyText: data.story_text,
        choices: data.choices,
        sceneDescription: data.scene_description,
      };
      this.stories.push(parsedData); // Add the parsed data to the stories array
    },
  },
  mounted() {
    // Call fetchStory when the component is first mounted
    this.fetchStory();
  },
};
</script>

<style scoped>
.result-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #2c2c54; /* Slightly lighter dark background */
  color: #ffffff; /* Light text */
  border-radius: 8px;
  font-size: 1.2em;
  max-width: 600px;
  text-align: center;
}
</style>
