import { initializeApp } from "firebase/app"
import { getDatabase, ref, push, get, remove } from "firebase/database"
import { Configuration, OpenAIApi } from 'openai'
import { process } from './env'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const appSettings = {
    databaseURL: 'https://knowitall-openai-48867-default-rtdb.europe-west1.firebasedatabase.app'
}

const app = initializeApp(appSettings)

const database = getDatabase(app)

const conversationInDB = ref(database)

const chatbotConversation = document.getElementById('chatbot-conversation')
 
const instructionObj = {
        role: 'system',
        content: 'You are a highly knowledgeable assistant that is always happy to help.'
    }
 
document.addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input') 
    push(conversationInDB, {
            role: 'user',
            content: userInput.value
        })
    fetchReply()
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-human')
    chatbotConversation.appendChild(newSpeechBubble)
    newSpeechBubble.textContent = userInput.value
    userInput.value = ''
    chatbotConversation.scrollTop = chatbotConversation.scrollHeight
})

function fetchReply() {
    get(conversationInDB).then(async snapshot => {
        if(snapshot.exists()) {
            const conversationArr = Object.values(snapshot.val())
            conversationArr.unshift(instructionObj)
            const response = await openai.createChatCompletion({
                    model: 'gpt-3.5-turbo',
                messages: conversationArr,
                presence_penalty: 0,
                frequency_penalty: 0.3
            })
            const message = response.data.choices[0].message
            push(conversationInDB, message)
            renderTypewriterText(message.content)
        }
        else {
            console.log('No data available')
        }
    })
}

function renderTypewriterText(text) {
    const newSpeechBubble = document.createElement('div')
    newSpeechBubble.classList.add('speech', 'speech-ai', 'blinking-cursor')
    chatbotConversation.appendChild(newSpeechBubble)
    let i = 0
    const interval = setInterval(() => {
        newSpeechBubble.textContent += text.slice(i-1, i)
        if (text.length === i) {
            clearInterval(interval)
            newSpeechBubble.classList.remove('blinking-cursor')
        }
        i++
        chatbotConversation.scrollTop = chatbotConversation.scrollHeight
    }, 50)
}

function renderConversationFromDB() {
    get(conversationInDB).then(async snapshot => {
        if(snapshot.exists()) {
            const conversationArr = Object.values(snapshot.val())
            conversationArr.forEach(dbObj => {
                const newSpeechBubble = document.createElement('div')
                newSpeechBubble.classList.add('speech', `speech-${dbObj.role === 'assistant' ? 'ai' : 'human'}`)
                newSpeechBubble.textContent = dbObj.content
                chatbotConversation.appendChild(newSpeechBubble)
            })
            chatbotConversation.scrollTop = chatbotConversation.scrollHeight
        }
        else {
            console.log('No data available')
        }
    })
}

// document.addEventListener('DOMContentLoaded', () => renderConversationFromDB())
renderConversationFromDB()

document.getElementById('clear-btn').addEventListener('click', () => {
    remove(conversationInDB)
    chatbotConversation.innerHTML = '<div class="speech speech-ai">How can I help you?</div>'
})