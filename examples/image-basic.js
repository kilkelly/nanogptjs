// EXAMPLE - Basic image generation

// NOTE: add your own NanoGPT APIkey before running the code
const YOUR_NANO_GPT_API_KEY = '00000000-0000-0000-0000-000000000000' // your API key from nano-gpt.com

const nanogptjs = require('nanogptjs')

;(async function () {

  const nanogpt = nanogptjs({
    apiKey: YOUR_NANO_GPT_API_KEY,
    defaultModel: 'dall-e-3' // default model to use for all further calls
  })

  let { base64 } = await nanogpt.image({
    prompt: 'a beautiful landscape, bright sunshine, green fields'
  })

  console.log('Base64 encoding of generated image:', base64)
})()