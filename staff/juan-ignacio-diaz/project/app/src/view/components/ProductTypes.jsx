import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { reviewProductTypes } from '../../logic'

export default function ProductTypes({ defaultValue }) {
    console.log('ProductTypes -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [productTypes, setProductTypes] = useState()
  
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
        <select defaultValue={defaultValue} name="type" id="type">
            {productTypes && productTypes.map(productType => 
                <option key={productType} value={productType} name={productType}>{productType}</option>
            ) }
        </select>
    </>
}