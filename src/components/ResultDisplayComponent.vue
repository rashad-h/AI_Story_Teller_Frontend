<template>
  <div v-if="isLoading" class="loading-spinner">
      <!-- Your spinner here (you can use a CSS spinner or an image) -->
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  <div class="result-container col-sm-11 col-md-11 col-lg-7"
  v-if="stories.length">
    <div v-for="(story, index) in stories" :key="index" :id="story.id" class="story-container">
      <br>
      <!-- Main story text container -->
      <div class="story-text-container p-3 mb-3">
        <h2>-- {{ story.stageNumber }} --</h2>
        <p>{{ story.storyText }}</p>
      </div>

      <!-- Choices container -->
      <div class="choices-container row d-flex flex-wrap justify-content-center ">
        <div v-for="(choice, i) in story.choices" :key="i" class="col-8 col-md-4 col-lg-4 d-flex align-items-center justify-content-center d-flex align-items-stretch">
          <div class="choice-box"
          :class="{
            'disabled': story.selectedChoice !== null && story.selectedChoice !== choice,
            'selected': story.selectedChoice === choice,
          }"
          :style="{ animationDelay: '1s'}"
          @click="handleChoiceClick(choice, story)">
            {{ choice }}
          </div>
        </div>
      </div>

      <!-- Scene description container -->
      <div class="description-container"
      :style="{ animationDelay: '1s'}">
        <em>{{ story.sceneDescription }}</em>
      </div>
      <br>
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
      storyMessageSoFar: [],
      possibleAnswers: [],
      isLoading: false // Loading state
    };
  },
  methods: {
    async fetchStory(messages=null, name=null, prompt=null) {
      console.log("SENDING REQUEST")
      this.isLoading = true; // Start loading
      if (this.name && this.prompt) {
        try {
          const response = await fetch('/story/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...(messages && messages.length > 0 ? { messages: messages } : null),
             name: name, prompt: prompt }),
          });
          const data = await response.json();
          console.log(JSON.stringify(data))
          this.parseStory(data);
          this.fetchPossibleAnswers(data.choices)
        } catch (error) {
          console.error('Error fetching story:', error);
          this.result = 'An error occurred while fetching the story.';
        } finally {
          this.isLoading = false; // End loading
        }
      }
    },
    parseStory(data) {
      // Extracting relevant fields and pushing to the stories array
      const parsedData = {
        selectedChoice: null,
        stageNumber: data.stage_number,
        storyText: data.story_text,
        choices: data.choices,
        sceneDescription: data.scene_description,
        id: `story-${data.stage_number}`
      };
      this.stories.push(parsedData); // Add the parsed data to the stories array
      const text = this.createStoryMessage(data, "assistant");
      this.addStoryMessage(text)
      this.$nextTick(() => {
        const storyElement = document.getElementById(parsedData.id);
        if (storyElement) {
          storyElement.scrollIntoView({ behavior: 'smooth' }); // Scroll to the new story element
        }
      });
    },
    async handleChoiceClick(choice, story) {
      // Only proceed if no choice has been selected for this story
      if (story.selectedChoice === null) {
        story.selectedChoice = choice;

        // Wait until the specific choice is available in possibleAnswers
        await this.waitForPossibleAnswer(choice);

        // Now that possibleAnswers is available for this choice, proceed
        const selectedData = this.possibleAnswers[choice];
        if (selectedData) {
          this.parseStory(selectedData);
          this.fetchPossibleAnswers(selectedData.choices);
        } else {
          console.error(`No answer found for choice "${choice}"`);
        }
      }
    }, 
    async waitForPossibleAnswer(choice) {
      while (!this.possibleAnswers[choice]) {
        // Polling delay
        await new Promise(resolve => setTimeout(resolve, 100)); // Wait 100ms before checking again
      }
    },
    createStoryMessage(data, role) {
      return {
        role: role,
        content: [
          {
            text: JSON.stringify(data), // Stringify the entire assistant data object
            type: "text"
          }
        ]
      }
    }, 
    addStoryMessage(text) {
      this.storyMessageSoFar.push(text);
    }, 
    // function to fetch possible answers
    async fetchPossibleAnswers(choices) {
      console.log("Fetching answers in parallel");
      const possibleAnswers = {};

      // Create an array of promises for each choice
      const fetchPromises = choices.map(async (choice) => {
        const messages = [...this.storyMessageSoFar]; // Current messages
        const choicesMessage = this.createStoryMessage({ choice }, "user");
        
        messages.push(choicesMessage);

        try {
          const response = await fetch('/story/generate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ messages: messages, name: this.name, prompt: this.prompt }),
          });
          const data = await response.json();
          possibleAnswers[choice] = data; // Store the answer for this choice
        } catch (error) {
          console.error(`Error fetching possible answer for choice "${choice}":`, error);
          possibleAnswers[choice] = 'An error occurred.'; // Handle error for this choice
        }
      });

      // Wait for all promises to resolve
      await Promise.all(fetchPromises);

      // Update the component's data with the fetched answers
      this.possibleAnswers = possibleAnswers;
      console.log("Possible Answers:", this.possibleAnswers); // Log the possible answers
    }
  },
  mounted() {
    // Call fetchStory when the component is first mounted
    this.fetchStory(null, this.name, this.prompt);
  },
};
</script>

<style scoped>


</style>
