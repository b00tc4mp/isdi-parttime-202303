import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { reviewStores } from '../../logic'

export default function Stores({ defaultValue }) {
    console.log('Stores -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [stores, setStores] = useState()
  
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
        <select defaultValue={defaultValue} name="stores" id="stores" multiple>
            {stores && stores.map(store => 
                <option key={store.id} value={store.id} name={store.id} >{store.name}</option>
            ) }
        </select>
    </>
}