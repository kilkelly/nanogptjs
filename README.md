# NanoGPTJS

Node.js library to Interact with [NanoGPT](https://nano-gpt.com/)'s API. The NanoGPT service enables pay-per-prompt interaction with chat and image generation models. You will need a prefilled NanoGPT wallet and [API key](https://nano-gpt.com/settings) to use this library effectively.

## Installation
```sh
npm install --save nanogptjs
```

## Sample Usage

```js
const nanogptjs = require('nanogptjs')
const { YOUR_NANO_GPT_API_KEY } = require('./secrets.js')

;(async function () {

   const nanogpt = nanogptjs({
    apiKey: YOUR_NANO_GPT_API_KEY,
    defaultModel: 'chatgpt-4o-latest'
  })

  let { reply } = await nanogpt.chat('Tell me something about Nano digital currency?')  

  console.log(reply) // Nano is a feeless and instant cryptocurrency.
})()

```

## Setup

Importing `nanogptjs`
```js
const nanogptjs = require('nanogptjs')
```

Create a `nanogptjs` instance with your NanoGPT API key (required)
```js
const nanogpt = nanogptjs({
  apiKey: YOUR_NANO_GPT_API_KEY
})
```

Alternatively supply a `defaultModel` to be used in further function calls
```js
const nanogpt = nanogptjs({
  apiKey: YOUR_NANO_GPT_API_KEY,
  defaultModel: 'chatgpt-4o-latest'
})
```

## API

### chat(String prompt)

Sends a chat prompt. Requires `defaultModel` field be set when creating your `nanogptjs` instance.

```js
let reply = await nanogpt.chat('Tell me something about Nano digital currency?')
```

#### Arguments

- **prompt** (String, required) - This is the prompt that will be sent to the text model.

Returns a Promise that resolves to an Object with the following format:
```js
{
  reply: "Nano is a feeless and instant cryptocurrency.", // the reply to your chat prompt
  metadata: {
    cost: 0.001089, // cost of this interaction
    paymentSource: 'XNO', // currency used for payment
    inputTokens: 24, // number of tokens your input created
    outputTokens: 21 // number of tokens your output created
  }
}
```

### chat(Object config)

Sends a chat prompt. Gives you more control by allowing you to specify model and chat context (i.e. history).

```js
let reply = await nanogpt.chat({
  prompt: 'What is my favorite color?', // chat prompt
  model: 'chatgpt-4o-latest', // model to use
  context: [
    nanogpt.contextUser('Blue is my favorite color'),
    nanogpt.contextAI('Very interesting! I will remember that.'),
  ] // context for your chat prompt
})
```

#### Arguments

- **config** (Object, required)) - This is a configuration Object containing the following fields: 
  - **prompt** (String, required) - This is the prompt that will be sent to the text model.
  - **model** (String, optional) - The text model to use. This field is optional if the `defaultModel` field is set when creating your `nanogptjs` instance.
  - **context** (Array, optional) - Provide context (chat history) to your chat prompt. Send context in an alternating user-to-AI sequence. Use the utility functions `contextUser` and `contextAI` to specify who is speaking.

Returns a Promise that resolves to an Object with the following format:
```js
{
  reply: "Based on prior informations, I think blue is your favorite color!", // the reply to your chat prompt
  metadata: {
    cost: 0.001089, // cost of this interaction
    paymentSource: 'XNO', // currency used for payment
    inputTokens: 24, // number of tokens your input created
    outputTokens: 21 // number of tokens your output created
  }
}
```

### image(Object config)

Generates a single image.

```js
let image = await nanogpt.image({
  prompt: 'a beautiful landscape, bright sunshine, green fields',
  model: 'dreamshaper_8_93211.safetensors',
  width: 1024,
  height: 1024
})
```

#### Arguments

- **config** (Object, required) - This is a configuration Object containing the following fields: 
  - **prompt** (String, required) - This is the prompt for what you want to see in your generated image.
  - **width** (Integer, optional) - The width of the image you want to generate.
  - **height** (Integer, optional) - The height of the image you want to generate.
  - **negativePrompt** (String, optional) - This is the prompt for what you **don't** want to see in your generated image.
  - **steps** (Integer, optional) - Number of generation steps. Higher is better but more expensive. Aim for 25-30.
  - **sampler** (String, optional) - Sampler that will be used to denoise your image during generation. For advanced users.
  - **scale** (Number, optional) - Determines how much the image generation process follows the text prompt. For advanced users.

Returns a Promise that resolves to an Object with the following format:
```js
{
  base64: " /9j/4AAQSkZJRgABAQAAAQABAAD...", // base64 encoded version of your generated image
  metadata: {
    created: 1723814389930, // timestamp of this image generation
    cost: 0.0021, // cost of this interaction
    paymentSource: 'XNO' // currency used for payment
  }
}
```

### imageBatch(Object config)

Generates a specific number of  images.

```js
let imageBatch = await nanogpt.imageBatch({
  batchSize: 2,
  prompt: 'a beautiful landscape with a large cat',
  model: 'dreamshaper_8_93211.safetensors',
  width: 1024,
  height: 1024
})
```

#### Arguments

- **config** (Object, required) - This is a configuration Object containing the following fields: 
  - **batchSize** (Number, required) - Specify how many images to generate. The more images, the higher the Nano cost.
  - **prompt** (String, required) - This is the prompt for what you want to see in your generated image.
  - **width** (Integer, optional) - The width of the image you want to generate.
  - **height** (Integer, optional) - The height of the image you want to generate.
  - **negativePrompt** (String, optional) - This is the prompt for what you **don't** want to see in your generated image.
  - **steps** (Integer, optional) - Number of generation steps. Higher is better but more expensive. Aim for 25-30.
  - **sampler** (String, optional) - Sampler that will be used to denoise your image during generation. For advanced users.
  - **scale** (Number, optional) - Determines how much the image generation process follows the text prompt. For advanced users

#### Returns

Returns a Promise that resolves to an Object with the following format:
```js
{
  imageBatch: [ // array of generated images
    base64: " /9j/4AAQSkZJRgABAQAAAQAQAQA...", // base64 encoded version of your generated image
    base64: " /9j/4AAQSkZJRgABAQAAAQAABAB...", // base64 encoded version of your generated image  
  ]
  metadata: {
    created: 1723815073228, // timestamp of this image generation
    cost: 0.00501, // cost of this interaction
    paymentSource: 'XNO' // currency used for payment
  }
}
```

### account()

Retrieves information about your NanoGPT account.

```js
let account = await nanogpt.account()
```

Returns a Promise that resolves to an Object with the following format:
```js
{
  nanoDepositAddress: 'nano_3d46mow3fim7bfd15xckfgao9ehabmp56y7gkn9q3nky1i3buehtroxi8q67',
  nanoReturnAddress: 'nano_15qzsidyztg1i7at4zdeapzzh5hfgy1rip8e5uz1an3tujuunujgesgzf187',
  balance: 3.098908,
  receivable: 0,
  earned: '0.000000'
}
```

### balance()

Retrieves your current NanoGPT account balance.

```js
let balance = await nanogpt.balance()
```

Returns a Number
```js
4.0678
```

### models()

Retrieves information about the models available on NanoGPT.

```js
let models = await nanogpt.models()
```

Returns a Promise that resolves to an Object with the following format:
```js
{
  "models": {
    "text": {
      "gpt-4o": {
        "name": "GPT 4o",
        "model": "gpt-4o",
        "description": "OpenAI's most advanced model. It matches GPT-4 Turbo performance on text in English and code, with significant improvement on text in non-English languages, while also being much faster and 50% cheaper.",
        "cost": "Average cost: 0.025 Nano",
        "costEstimate": 0.025,
        "labelVariant": "outline",
        "label": "Recommended",
        "visible": false
      },
      // ...more text models
    },
    "image": {
      "dall-e-3": {
        "name": "DALL-E-3",
        "model": "dall-e-3",
        "engine": "dalle",
        "description": "The current golden standard in image generation.",
        "cost": {
          "1024x1024": 0.04,
          "1024x1792": 0.08,
          "1792x1024": 0.08
        },
        "label": "Default",
        "maxImages": 1,
        "resolutions": [
          {
            "value": "1024x1024"
          },
          {
            "value": "1024x1792",
            "comment": "2x the price"
          },
          {
            "value": "1792x1024",
            "comment": "2x the price"
          }
        ]
      },
      // ...more image models
    }
  }
}
```

### contextUser(String content)

Utility function to aid with creation of the Object field `context` in the `chat` function.

```js
nanogpt.contextUser('Blue is my favorite color')
```

#### Arguments

- **content** (String, required) - Content that the user previously supplied via chat prompt.

Returns an Object with the following format:
```js
{
  role: 'user',
  content: 'Blue is my favorite color'
}
```

### contextAI(String content)

Utility function to aid with creation of the Object field `context` in the `chat` function. 

```js
nanogpt.contextAI('Very interesting! I will remember that.')
```

#### Arguments

- **content** (String, required) - Content that the AI previously replied with.

Returns an Object with the following format:
```js
{
  role: 'assistant',
  content: 'Very interesting! I will remember that.'
}
```

## Examples

You can find multiple NanoGPTJS usage examples in the [examples](https://github.com/kilkelly/nanogptjs/tree/main/examples) folder.

## Feedback

Pull requests and opened issues are welcome!

## Disclaimer

As always when working with real world value, in this case Nano, be careful when using this library. The authors and contributors shall not be held liable for any use of this library's functionality, intentional or unintentional, that leads to an undesired lose of funds.

## License

MIT
