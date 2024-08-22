// EXAMPLE - Basic text model usage

// NOTE: add your own NanoGPT APIkey before running the code
const YOUR_NANO_GPT_API_KEY = '00000000-0000-0000-0000-000000000000' // your API key from nano-gpt.com

const nanogptjs = require('nanogptjs')

;(async function () {

  const nanogpt = nanogptjs({
    apiKey: YOUR_NANO_GPT_API_KEY,
    defaultModel: 'gpt-3.5-turbo' // default model to use for all further calls
  })

  let { reply } = await nanogpt.chat('Tell me something about Nano digital currency')  

  console.log('Reply:', reply)
})()