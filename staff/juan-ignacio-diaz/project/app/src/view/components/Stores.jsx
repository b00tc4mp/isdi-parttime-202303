import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Select } from '../library'

import { reviewStores } from '../../logic'

export default function Stores({ state, multiple }) {
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

    return <Select name="stores" options={stores} state={state} multiple={multiple} />
}