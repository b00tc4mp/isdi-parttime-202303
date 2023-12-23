import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Container, Form, Input, Button, Label, Select } from '../library'

import { retrieveProduct, markProductAsPurchased } from '../../logic'

export default ({ productId, onCancel, onBuyedProduct }) => {
    const { alert, freeze, unfreeze } = useAppContext()

    const [product, setProduct] = useState()

    const handleRefresProduct = async () => {
        try{     
            freeze()     
            const tmpProduct = await retrieveProduct(productId)
            unfreeze()

            setProduct(tmpProduct)
        } 
        catch (error) {
            unfreeze()
            alert(error.message)
        }
    }

    const handleBuy = async (event) => {
        event.preventDefault()

        const price = event.target.price.valueAsNumber
        const stores = [event.target.stores.value]

        try {
            freeze()
            await markProductAsPurchased(productId, price, stores)
            unfreeze()

            onBuyedProduct()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    function handleCancel(event) {  
        event.preventDefault()

        onCancel()
    }

    useEffect(() => {      
        handleRefresProduct()
    }, [])

    return <>
        <Container>
            <Container tag="section">
                {product && <>
                    <Container tag="article" type="row">
                        <Label htmlFor="authorr">Author:</Label>   
                        <img className="home-header-avatar" src={product.author.avatar? product.author.avatar : DEFAULT_AVATAR_URL} alt=""/>
                        <h1 className="name">{product.author.name}</h1>
                    </Container>

                    <Form onSubmit={handleBuy}>    
                        <Label htmlFor="nameRegister">Name:</Label>                
                        <Input readOnly type="text" name="name" placeholder="name" defaultValue={product.name}></Input>                  
                        <Label htmlFor="howMany">How many:</Label>
                        <Input readOnly type="number" name="howMany" defaultValue={product.howMany}></Input>                   
                        <Label htmlFor="stores">Stores:</Label>
                        <Select name="stores" options={product.stores} state={[]} multiple={true} />
                 
                        <Label htmlFor="type">Type:</Label>
                        <Select name="type" options={[{ id: product.type, name: product.type}]} state={product.type} multiple={false} />

                        <Label htmlFor="price">Price Paid:</Label>
                        <Input type="number" name="price" defaultValue="0"></Input>                              
                        <Button type="submit">Update</Button> 
                    </Form>
                    <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>
                </>
                || <>
                    <Form onSubmit={handleBuy}>
                        <Label htmlFor="nameRegister">Name:</Label>
                        <Input type="text" name="name" placeholder="name" />                    
                        <Label htmlFor="howMany">How many:</Label>
                        <Input type="number" name="howMany" defaultValue="1"/>        
                        <Label htmlFor="stores">Stores:</Label>
                        <Label htmlFor="type">Type:</Label>
                    </Form>
                    <Button className="cancel" type="button" onClick={handleCancel}>Cancel</Button>                   
                </>}
            </Container>
        </Container>
    </>
}