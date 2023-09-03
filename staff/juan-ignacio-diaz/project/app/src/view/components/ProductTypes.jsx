import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { reviewProductTypes } from '../../logic'

export default function ProductTypes({ state, multiple }) {
    console.log('ProductTypes -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [productTypes, setProductTypes] = useState()
    const [states, setStates] = useState(state)
  
    const handleRefreshProductTypes = async ()  => {
        try {
            freeze()
            const productTypes = await reviewProductTypes()
            unfreeze()
            
            setProductTypes(productTypes)
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    useEffect(() => { handleRefreshProductTypes() }, [])

    return <>
        <select 
            name="type" 
            multiple={multiple} 
            value={states}
            onChange={e => {
                const options = [...e.target.selectedOptions]
                const values = options.map(option => option.value)
                setStates(values)}}
            >
            {productTypes && productTypes.map(productType => 
                <option key={productType} value={productType} label={productType} />
            )}
        </select>
    </>
}