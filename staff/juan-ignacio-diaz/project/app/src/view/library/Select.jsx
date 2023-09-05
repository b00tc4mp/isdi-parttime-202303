import { useState } from 'react'

export default function Select({ name, options, state, multiple}) {
    const [states, setStates] = useState(state)

    return <select 
        name={name}
        className="py-2 px-2 rounded-lg"
        multiple={multiple} 
        value={states}
        onChange={e => {
            const options = [...e.target.selectedOptions]
            const values = options.map(option => option.value)
            setStates(values)}}
        >
        {options && options.map(option => 
            <option key={option.id} value={option.id} label={option.name}/>
        )}
    </select>
}