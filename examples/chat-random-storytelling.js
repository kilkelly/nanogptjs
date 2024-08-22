// EXAMPLE - Random Storytelling
// Create a short story by combining the output from multiple random text models

// NOTE: add your own NanoGPT APIkey before running the code
const YOUR_NANO_GPT_API_KEY = '00000000-0000-0000-0000-000000000000' // your API key from nano-gpt.com

const nanogptjs = require('nanogptjs')

;(async function () {

  // Make the story as long as you want. Doesn't include opening and closing paragraphs
  const numberOfStoryParagraphs = 2

  const nanogpt = nanogptjs({ apiKey: YOUR_NANO_GPT_API_KEY })

  const { models: { text:textModels } } = await nanogpt.models()
  const cheapTextModels = Object.keys(textModels).filter(textModel => { return textModels[textModel].costEstimate < 0.01 })

  let fullStory = ''
  let previousParagraph

  // ---------------------------------------------------
  // start the story
  previousParagraph = (await nanogpt.chat({
    prompt: 'Start an interesting story with a short paragraph',
    model: pickRandomTextModel(cheapTextModels)
  })).reply  

  // ---------------------------------------------------
  // construct the middle of the story

  for (let i = 0; i < numberOfStoryParagraphs; i++) {
    previousParagraph = (await nanogpt.chat({
      prompt: 'Continue the story with a short paragraph',
      model: pickRandomTextModel(cheapTextModels),
      context: [
        nanogpt.contextAI(previousParagraph) // provide the previous paragraph to maintain story context
      ]
    })).reply  

    fullStory = fullStory + ' ' + previousParagraph
  }

  // ---------------------------------------------------
  // conclude the story

  previousParagraph = (await nanogpt.chat({
    prompt: 'Conclude the story with a short paragraph',
    model: pickRandomTextModel(cheapTextModels),
    context: [
      nanogpt.contextAI(previousParagraph) // provide the previous paragraph to maintain story context
    ]
  })).reply  

  // ---------------------------------------------------
  // output the final result
  console.log(fullStory)
})()

function pickRandomTextModel (textModels) {
  return textModels[Math.floor(Math.random() * (textModels.length))]
}