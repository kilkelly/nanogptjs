
const nanogptjs = require('nanogptjs')
const YOUR_NANO_GPT_API_KEY = '00000000-0000-0000-0000-000000000000' // your API key from nano-gpt.com

;(async function () {

  const nanogpt = nanogptjs({ apiKey: YOUR_NANO_GPT_API_KEY })

  let { reply } = await nanogpt.chat({
    prompt: 'What is my favorite color?', // chat prompt
    model: 'gpt-3.5-turbo', // model to use
    context: [
      nanogpt.contextUser('Blue is my favorite color'),
      nanogpt.contextAI('Very interesting! I will remember that.'),
    ] // context for your chat prompt
  })  

  console.log('Reply:', reply)
})()