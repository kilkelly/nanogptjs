// EXAMPLE - Advanced image generation

// NOTE: add your own NanoGPT APIkey before running the code
const YOUR_NANO_GPT_API_KEY = '00000000-0000-0000-0000-000000000000' // your API key from nano-gpt.com

const nanogptjs = require('nanogptjs')

;(async function () {

  const nanogpt = nanogptjs({ apiKey: YOUR_NANO_GPT_API_KEY })

  let { base64 } = await nanogpt.image({
    prompt: 'a beautiful landscape, bright sunshine, green fields', // image generation prompt
    model: 'dreamshaper_8_93211.safetensors', // model to use
    width: 512, // width of the generated image
    height: 512, // height of the generated image
    negativePrompt: 'mountains, trees', // prompt for what you don't want to see in your generated image
    steps: 40, // number of generation steps
    scale: 6.5
  })

  console.log('Base64 encoding of generated image:', base64)
})()