import { Configuration, OpenAIApi } from 'openai'

export default function fetchReply(currentConversation) {
  console.log(currentConversation, 'current conversation in fetch reply')
    return (async () => {
        const configuration = new Configuration({
            apiKey: import.meta.env.VITE_OPENAI_API_KEY
        })

        const openai = new OpenAIApi(configuration)

        const newConversation = [...currentConversation] 
        const instruction = {
          role: 'system',
          content: import.meta.env.VITE_INSTRUCTION
        }

        newConversation.unshift(instruction)

        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: newConversation,
            presence_penalty: 0,
            frequency_penalty: 0.3
        })
        console.log(response)
        const message = response.data.choices[0].message
        
        return message
      })()
}