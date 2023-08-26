import { validators, errors } from "com";
const { validateId, validateText } = validators
import context from "./context";

export default function storeInputInDB(conversationId, userInput) {
    validateId(conversationId, 'conversation id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/users/conversations/${conversationId}/userInput`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.token}`
          },
          body: JSON.stringify(userInput)
        })
    
        if(res.status === 200)
          return
        
        const { type, message } = await res.json()
    
        const clazz = errors[type]
    
        if(clazz) throw new clazz(message)
        else throw new type(message)
      })()
}