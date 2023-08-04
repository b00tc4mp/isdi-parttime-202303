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

            messagesToAsk.pop()
            
            const newConversations = await retrieveConversations()
            
            setConversations(newConversations)
            
            const response = await askForResponse(context.conversationId, messagesToAsk)

            handleRecievedResponse(response)
        })
    }

    const handleRecievedResponse = response => {
        const modifiedMessages = [...currentMessages]

        modifiedMessages.pop()

        modifiedMessages.push(response)
        
        console.log(response, ' - 105')
        renderTypeWriterText(response)
        setMessages(modifiedMessages)
    }

    const renderTypeWriterText = (response) => {
        console.log('renderTypeWriterText')
        const text = response.content
        console.log(text, ' - 113')
        const conversationContainer = document.querySelector('.conversation-container')

        const speechBubbles = document.querySelectorAll('.speechBubble')
        const lastSpeechBubbleContainer = speechBubbles[speechBubbles.length - 1]
        const lastSpeechBubble = lastSpeechBubbleContainer.firstElementChild
        lastSpeechBubble.classList.add('blinking-cursor')

        // conversationContainer.appendChild(newSpeechBubble)

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

    const handleShowOldConversation = async conversationId => {
        const conversation = await retrieveConversation(conversationId)

        setMessages([...messages, ...conversation.conversationInputs])
    }

    const handleGenerateSummary = () => {
        
    }

    return <Container className="conversation-container absolute top-0 left-0 bg-[url(src/images/chatbot-3.1.jpg)] bg-fixed bg-center bg-cover">
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