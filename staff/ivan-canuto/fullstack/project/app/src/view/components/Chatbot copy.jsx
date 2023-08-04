import { useEffect, useState } from "react"
import { Container, Button, SpeechBubble, Loader } from "../library"
import { useHandleErrors } from "../hooks"
import { askForResponse, retrieveConversation, retrieveConversations, storeInputInDB, generateConversation } from "../../logic"
import { context } from "../../ui"
import { useNavigate } from "react-router-dom"

export default function Chatbot() {
    const handleErrors = useHandleErrors()
    const navigate = useNavigate()

    const [modal, setModal] = useState(null)
    const [menu, setMenu] = useState(false)
    const [openedMenu, setOpenedMenu] = useState(false)
    const [conversations, setConversations] = useState(null)
    const [firstInput, setFirstInput] = useState(true)
    const [oldConversation, setOldConversation] = useState(null)
    const [messages, setMessages] = useState([])
    const [typeWriterContent, setTypeWriterContent] = useState(null)

    // console.log('logeo para ver cuantas veces se renderiza el compo')

    if(!firstInput) {
        (async () => {
            const newConversations = await retrieveConversations()
                        
            setConversations(newConversations)
        })()
    }
    

    useEffect(() => {
        const fetchData = async () => {
            const conversations = await retrieveConversations()

            setConversations(conversations)
        }

        fetchData()
    }, [])

    const handleOpenProfile = () => {
        document.body.classList.add("fixed-scroll")
        setModal("profile")
    }

    const handleReturnToHome = () => {
        document.body.classList.remove('fixed-scroll')
        navigate('/')
    }

    const handleToggleMenu = () => {
        if (!menu) {
            setMenu(!menu)
            setOpenedMenu(!openedMenu)
        } else {
            setTimeout(() => {
                setMenu(!menu)
            }, 400);
            setOpenedMenu(!openedMenu)
        }
    }

    const currentMessages = [...messages]

    const handleUserInput = async event => {
        event.preventDefault()

        handleErrors(async () => {
            const userInput = event.target.userInput.value

            if (!userInput) return

            if (firstInput) {
                context.conversationId = await generateConversation(userInput)

                setFirstInput(false)
            }

            const newUserInput = {
                role: 'user',
                content: userInput
            }

            const loaderInput = {
                role: 'assistant',
                content: <Loader/>
            }

            await storeInputInDB(context.conversationId, newUserInput)

            currentMessages.push(newUserInput, loaderInput)

            setMessages(currentMessages)

            const messagesToAsk = [...currentMessages]

            console.log(messagesToAsk, ' - 96')
            messagesToAsk.pop()
            const response = await askForResponse(context.conversationId, messagesToAsk)

            setTypeWriterContent(response)
        })
    }

    const handleRecievedResponse = response => {
        console.log('handleRecievedResponse - 105')
        console.log(currentMessages, ' - 106')
        currentMessages.pop()

        const modifiedMessages = [...currentMessages]

        modifiedMessages.push(response)
        
        renderTypeWriterText(response)
        setMessages(modifiedMessages)
        console.log(currentMessages, ' - 115')
    }

    const renderTypeWriterText = async response => {
        console.log(currentMessages, ' - 119')
        console.log('renderTypeWriterText - 117')
        const text = response.content
        const conversationContainer = document.querySelector('.conversation-container')

        const speechBubbles = document.querySelectorAll('.speechBubble')
        const lastSpeechBubbleContainer = speechBubbles[speechBubbles.length - 1]
        const lastSpeechBubble = lastSpeechBubbleContainer.firstElementChild
        lastSpeechBubble.classList.add('blinking-cursor')

        // await new Promise(resolve => setTimeout(resolve, 4000)) Código que usaba para retrasar el comienza del setInterval

        let i = 0

        const interval = setInterval(() => {
            lastSpeechBubble.textContent += text.slice(i - 1, i)

            if (text.length === i) {
                clearInterval(interval)

                lastSpeechBubble.classList.remove('blinking-cursor')
            }

            i++
            conversationContainer.scrollTop = conversationContainer.scrollHeight
        }, 20)
    }
    
    if(typeWriterContent) {
        handleRecievedResponse(typeWriterContent)
        
        // setTypeWriterContent(null)
    }

    const handleShowOldConversation = async conversationId => {
        const conversation = await retrieveConversation(conversationId)

        setMessages([...messages, ...conversation.conversationInputs])
    }

    const handleGenerateSummary = () => {
        
    }

    return <Container className="absolute top-0 left-0 bg-[url(src/images/chatbot-3.1.jpg)] bg-fixed bg-center bg-cover">
        {console.log('logeo 2')}
        <Button className='absolute top-24 right-4 z-10 w-24 my-2 border-gray-600 border-2 leading-tight' onClick={handleGenerateSummary}>Generate summary</Button>
        <section className="conversation-container absolute top-24 w-full bottom-32 overflow-y-scroll">
            <SpeechBubble
                role={'assistant'}
                content={'Hello! How can I help you?'}
            />
            {messages && messages.map((message, index) => 
                // {console.log(messages)}
                <SpeechBubble
                    key={index}
                    role={message.role}
                    content={message.content}
                />
            )}
        </section>

        <form className="border-black border-2 flex flex-row p-2 fixed bottom-4 gap-2 " onSubmit={handleUserInput}>
            <textarea className="w-72 p-4 focus:outline-none" name='userInput' placeholder='Send a message' autoFocus />
            <Button><span className="material-symbols-outlined">send</span></Button>
        </form>

    </Container>
}