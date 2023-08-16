import { useEffect, useState } from "react"
import { retrieveOwnSuggestions } from "../../logic"

export default function SuggestionsPage() {
    const [suggestions, setSuggestions] = useState()

    useEffect(() => {
        const _suggestions = retrieveOwnSuggestions()

        setSuggestions(_suggestions)
    }, [])

    return <section>
        {suggestions.map(suggestion => {
            return <div className="">

            </div>
        })}
    </section>
}