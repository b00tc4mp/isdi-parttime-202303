import { process } from '/env'
import { Configuration, OpenAIApi } from 'openai'

const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

document.getElementById("send-btn").addEventListener("click", () => {
  const setupTextarea = document.getElementById('setup-textarea')
  if (setupTextarea.value) {
    const userInput = setupTextarea.value
    
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
    
    fetchBotReply(userInput)
    fetchSynopsis(userInput)

  }
})

async function fetchTitle(synopsis) {
  const movieTitle = document.getElementById('output-title')
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Create a gripping and alluring title idea based on this synopsis: ${synopsis}, no longer than 5 words.`,
    max_tokens: 25,
    temperature: 0.7
  })
  const title = response.data.choices[0].text.trim()
  movieTitle.innerText = title
  fetchImagePrompt(title, synopsis)
  console.log(response)
}

async function fetchStars(synopsis) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Extract the names in brackets from the synopsis, and put them in one sentence separated with commas.
    ###
    synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
    names: Tom Cruise, Val Kilmer, Kelly McGillis
    ###
    synopsis: ${synopsis}
    names:
    `,
    max_tokens: 30
  })
  const movieStars = document.getElementById('output-stars')
  movieStars.innerText = response.data.choices[0].text.trim()
}

async function fetchBotReply(outline) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
    ###
    otlineInput: Two dogs fall in love and move to Hawaii to learn to surf.
    outlineResult: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
    ###
    otlineInput: A plane crashes in the jungle and the passengers have to walk 1000km to safety.
    outlineResult: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
    ###
    otlineInput: A group of corrupt lawyers try to send an innocent woman to jail.
    outlineResult: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
    ###
    otlineInput: ${outline}
    outlineResult: 
    `,
    max_tokens: 60
  })
  movieBossText.innerText = response.data.choices[0].text.trim()
  console.log(response)
}

async function fetchSynopsis(outline) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Generate a, engaging, professional and marketable movie synopsis based on an outline. The synopsis should include actors names in brackets after each character name. Choose actors that would be ideal for this role.
    ###
    synopsisIdea: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly mission.
    generatedSynopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
    ###
    synopsisIdea: ${outline}
    generatedSynopsis:
    `,
    max_tokens: 700,
  })
  console.log(response)
  const synopsis = response.data.choices[0].text.trim()
  document.getElementById('output-text').innerText = synopsis
  fetchTitle(synopsis)
  fetchStars(synopsis)
}

async function getCopySuggestions(productName, productDescription, productTarget) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Make a copy of an advertising product using the product name, the product description an the product target.
    ###
    product name: SolarSwim
    product description: Swimming costumes for all genders with solar cells to charge your devices while you sunbathe.
    product target: Aimed at young adults
    advertising copy: Don't miss a beat while you're having fun in the sun! SolarSwim is the perfect choice for the tech-savvy, on-the-go millennial. Our innovative swimming costumes come with integrated solar cells that allow you to charge and access your devices while you're at the beach or pool. Enjoy your summer break with SolarSwim!
    ###
    product name: ${productName}
    product description: ${productDescription}
    product target: ${productTarget}
    advertising copy:
    `
  })
}

async function generateImage(prompt) {
  const response = await openai.createImage({
    prompt: prompt,
    n: 1,
    size: '256x256',
    response_format: 'b64_json'
  })
  console.log(response)
  const imageContainer = document.getElementById('output-img-container')
  imageContainer.innerHTML = `<img src="data:image/png;base64,${response.data.data[0].b64_json}"></img>`
  // imageContainer.innerHTML = '<img src="response.data.data[0].url"></img>'
  // Si recibo la iamgen en b64_json tengo que poner delante; data:image/png;base64, para que el navegador sepa que le viene ina imagen en formato b64_json, y poner una ',' al final para separar esto del chorro de texto de la imagen real.
}

async function fetchImagePrompt(title, synopsis) {
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Give a short description of an image which could be used to advertise a movie based on a title and synopsis. The description should be rich in visual detail but contain no names.
    ###
    title: Love's Time Warp
    synopsis: When scientist and time traveller Wendy (Emma Watson) is sent back to the 1920s to assassinate a future dictator, she never expected to fall in love with them. As Wendy infiltrates the dictator's inner circle, she soon finds herself torn between her mission and her growing feelings for the leader (Brie Larson). With the help of a mysterious stranger from the future (Josh Brolin), Wendy must decide whether to carry out her mission or follow her heart. But the choices she makes in the 1920s will have far-reaching consequences that reverberate through the ages.
    image description: A silhouetted figure stands in the shadows of a 1920s speakeasy, her face turned away from the camera. In the background, two people are dancing in the dim light, one wearing a flapper-style dress and the other wearing a dapper suit. A semi-transparent image of war is super-imposed over the scene.
    ###
    title: zero Earth
    synopsis: When bodyguard Kob (Daniel Radcliffe) is recruited by the United Nations to save planet Earth from the sinister Simm (John Malkovich), an alien lord with a plan to take over the world, he reluctantly accepts the challenge. With the help of his loyal sidekick, a brave and resourceful hamster named Gizmo (Gaten Matarazzo), Kob embarks on a perilous mission to destroy Simm. Along the way, he discovers a newfound courage and strength as he battles Simm's merciless forces. With the fate of the world in his hands, Kob must find a way to defeat the alien lord and save the planet.
    image description: A tired and bloodied bodyguard and hamster standing atop a tall skyscraper, looking out over a vibrant cityscape, with a rainbow in the sky above them.
    ###
    title: ${title}
    synopsis: ${synopsis}
    image description:`,
    temperature: 0.8,
    max_tokens: 100
  })
  fetchImageUrl(response.data.choices[0].text.trim())
}

async function fetchImageUrl(imagePrompt) {
  const response = await openai.createImage({
    prompt: `${imagePrompt} There should be no text in this image.`,
    n: 1,
    size: '256x256',
    response_format: 'url'
  })
  console.log(response)
  const url = response.data.data[0].url
  document.getElementById('output-img-container').innerHTML = `<img src="${url}"/>`
  setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`
  document.getElementById('view-pitch-btn').addEventListener('click', () => {
    document.getElementById('setup-container').style.display = 'none'
    document.getElementById('output-container').style.display = 'flex'
    movieBossText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`
  })
}