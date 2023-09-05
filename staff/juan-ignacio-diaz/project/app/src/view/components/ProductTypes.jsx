import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Select } from '../library'

import { reviewProductTypes } from '../../logic'

export default function ProductTypes({ state, multiple }) {
    console.log('ProductTypes -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [productTypes, setProductTypes] = useState()
  
    const handleRefreshProductTypes = async ()  => {
        try {
            freeze()
            const tmpProductTypes = (await reviewProductTypes()).map(productType => ({id: productType, name: productType}))
            unfreeze()

            setProductTypes(tmpProductTypes)
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    useEffect(() => { handleRefreshProductTypes() }, [])

    return <Select name="type" options ={productTypes} state={state} multiple={multiple} />

}