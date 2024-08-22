// EXAMPLE - Image batch generation

// NOTE: add your own NanoGPT APIkey before running the code
const YOUR_NANO_GPT_API_KEY = '00000000-0000-0000-0000-000000000000' // your API key from nano-gpt.com
const nanogptjs = require('nanogptjs')

;(async function () {

  const nanogpt = nanogptjs({ apiKey: YOUR_NANO_GPT_API_KEY })

  let imageBatch = await nanogpt.imageBatch({
    batchSize: 2,
    prompt: 'a beautiful landscape with a large cat',
    model: 'dreamshaper_8_93211.safetensors',
    width: 1024,
    height: 1024
  })

  imageBatch.imageBatch.forEach(function (image) {
    console.log('Batch image:', image.base64)
  })  
})()