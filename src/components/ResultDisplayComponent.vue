<template>
  <div class="result-container col-7">
    <div v-for="(story, index) in stories" :key="index" class="story-container">
      <!-- Main story text container -->
      <div class="story-text-container p-3 mb-3">
        <h2>Stage {{ story.stageNumber }}</h2>
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
          @click="handleChoiceClick(choice, story)">
            {{ choice }}
          </div>
        </div>
      </div>

      <!-- Scene description container -->
      <div class="description-container">
        <em>{{ story.sceneDescription }}</em>
      </div>
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
      possibleAnswers: []
    };
  },
  methods: {
    async fetchStory(messages=null, name=null, prompt=null) {
      console.log("SENDING REQUEST")
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
      };
      this.stories.push(parsedData); // Add the parsed data to the stories array
      const text = this.createStoryMessage(data, "assistant");
      this.addStoryMessage(text)
    },
    handleChoiceClick(choice, story) {
      if (story.selectedChoice === null) {
        story.selectedChoice = choice
        console.log(choice)
        this.parseStory(this.possibleAnswers[choice])
        this.fetchPossibleAnswers(this.possibleAnswers[choice].choices)
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
      console.log("Fetching answers")
      const possibleAnswers = {};

      for (const choice of choices) {
        const messages = [...this.storyMessageSoFar]; // Current messages
        // Create the message for choices
        const choicesMessage = this.createStoryMessage({ choice }, "user");
        console.log(choicesMessage)
        
        // Add the choices message to the messages array
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
          possibleAnswers[choice] = data; // Assuming the response is the answer related to the choice
        } catch (error) {
          console.error(`Error fetching possible answer for choice "${choice}":`, error);
          possibleAnswers[choice] = 'An error occurred.'; // Handle the error for this choice
        }
      }
      this.possibleAnswers = possibleAnswers; // Store the results
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
.result-container {
  margin-top: 20px;
  padding: 20px;
  background-color: #2c2c54;
  color: #ffffff;
  border-radius: 8px;
  font-size: 1.2em;
  text-align: center;
}

</style>
