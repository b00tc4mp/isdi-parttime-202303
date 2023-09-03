import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { reviewStores } from '../../logic'

export default function Stores({ state, multiple }) {
    console.log('Stores -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [stores, setStores] = useState()
    const [states, setStates] = useState(state)
  
    const handleRefreshStores = async ()  => {
        try {
            freeze()
            const stores = await reviewStores()

            const df = stores.map(store => store.id)
            unfreeze()
            
            setStores(stores)
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    useEffect(() => { handleRefreshStores() }, [])

    return <>
        <select 
            name="stores" 
            multiple={multiple} 
            value={states}
            onChange={e => {
                const options = [...e.target.selectedOptions]
                const values = options.map(option => option.value)
                setStates(values)}}
            >
            {stores && stores.map(store => 
                <option key={store.id} value={store.id} label={store.name}/>
            ) }
        </select>

    </>
}