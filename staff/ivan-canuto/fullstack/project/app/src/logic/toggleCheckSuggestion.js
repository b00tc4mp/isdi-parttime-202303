import { validators, errors } from "com";
const { validateId } = validators
import context from "./context";

export default function storeInputInDB(suggestionId) {
    validateId(suggestionId, 'suggestion id')

    return (async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/suggestions/${suggestionId}/check`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${context.token}`
          }
        })
    
        if(res.status === 200)
          return
        
        const { type, message } = await res.json()
    
        const clazz = errors[type]
    
        if(clazz) throw new clazz(message)
        else throw new type(message)
      })()
}