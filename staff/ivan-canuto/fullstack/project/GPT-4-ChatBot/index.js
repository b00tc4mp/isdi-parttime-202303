import { Configuration, OpenAIApi } from 'openai'
import { process } from './env'

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

const chatbotConversation = document.getElementById('chatbot-conversation')
 
const conversationArr = [
    {
        role: 'system',
        content: 'You are a highly knowledgeable assistant that is always happy to help.'
    }
] 
 
document.addEventListener('submit', (e) => {
    e.preventDefault()
    const userInput = document.getElementById('user-input') 
    conversationArr.push({
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

async function fetchReply() {
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: conversationArr,
        presence_penalty: 0,
        frequency_penalty: 2
    })
    const message = response.data.choices[0].message
    conversationArr.push(message)
    // renderTypewriterText(message.content)
    console.log(message.content)
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

// With frequency_penalty: 0

// 1. Unfortunately, your budget doesn't allow for that purchase.
// 2. It seems that your financial situation won't permit you to buy it at the moment.
// 3. Due to limited funds, buying that isn't currently feasible for you.
// 4. Your financial means don't align with purchasing this item right now.
// 5. Regrettably, your current economic circumstances prohibit this expenditure.
// 6. Considering your financial constraints, acquiring it is not an option at present.
// 7. It's not financially viable for you to make such a purchase right now.
// 8. Based on your current monetary situation, buying that isn't possible.

// 9.Your wallet might appreciate holding off on buying this due to insufficient funds,
// 10.The state of being broke means refraining from splurging on such purchases,
// 11.In light of tight finances , perhaps refrain from extending beyond necessary spending,
// 12.Being frugal would suggest finding cheaper alternatives rather than making unaffordable purchases ,
// 13.Without enough money in hand purchasing becomes illogical or impossible .
// 14.Given the status of having no disposable income one should consider saving instead,

// 15.Unfortunately,you are experiencing a temporary lackof liquidity preventing said acquisition
// 16.Due toy our bank account balances,it appears unlikelyforyou to be ableto affordthatitem 
// 17.Regretfully,itseems as thoughyourfinancial shortfalls precludepurchasingthis item
// 18.Considering there arenearlydepleted bankaccounts,thispurchaseisnotadvisable
// 19.Advicesuchas,don’tbuynowasyoucanbarelycovercurren texpenses seem apt inthiscase

// 20.Refrainingfromspendingmoneyonitcouldhelpmaintainastabl efinancialsituation


// With frequency_penalty: 0

// 1. I'm afraid your financial situation doesn't allow for that purchase right now.
// 2. It looks like you'll have to pass on buying that due to limited funds.
// 3. Unfortunately, your empty wallet means you can't buy that at the moment.
// 4. Sorry, but being broke means this purchase is off-limits for now.
// 5. Your lack of funds puts a hold on acquiring this item.

// 6.Unfortunately, your current financial state prevents you from making such a purchase.

// 7.I regret to inform you that due to monetary constraints, buying this is not feasible.

// 8.Sadly, it's not in the cards for you to buy anything until your finances improve.

// 9.It seems as though purchasing anything would exceed what your bank account currently allows.

// 10.Without adequate funds available, purchasing simply isn't an option right now.


// 11.I'm sorry but when it comes down 