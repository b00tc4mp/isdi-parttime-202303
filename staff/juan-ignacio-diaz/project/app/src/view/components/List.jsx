import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Product, Message } from '.'
import { Container, Button, Label, Form, Input } from '../library'

import { retrieveFilteredProducts, retrieveMessages, addMessage} from '../../logic'

export default ({ lastUpdate, onModifiedList, onAddedProduct, onEditedDeletedProduct, onFilteredProducts }) => {
    console.log('Lists -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [filter, setFilter] = useState({})
    const [products, setProducts] = useState()
    const [messages, setMessages] = useState()
   
    const handleRefreshList = async ()  => {
        try{
            freeze()
            const [products, messages] = await Promise.all([retrieveFilteredProducts(filter, ''), retrieveMessages()]) 
            setProducts(products)
            setMessages(messages)
            unfreeze()
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    useEffect(() => {      
        handleRefreshList()
    }, [])

    const handleNewFilter = () => onFilteredProducts()

    const handleAddProduct = () => onAddedProduct()
    
    const handleAddMessage = async (event) => {
        const message = event.target.message.value

        try {
            freeze()
            await addMessage(message) 
            unfreeze()

            //handleRefreshList()
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }
    return <>
        <Container>
            <Container type="row">
                <Label >Products:</Label>
                <Button onClick={handleAddProduct}>+</Button>
                <Button onClick={handleNewFilter}>Filter</Button>
            </Container>
            <Container tag="section">
                {products && products.map(product => <Product
                        key={product.id} 
                        product={product} 
                        onEditDeleteProduct={onEditedDeletedProduct}
                        onModifyProduct={handleRefreshList}
                    />)
                }
            </Container>
            <Container type="row">
                <Label >Messages:</Label>
                <Form className = "flex-row" onSubmit={handleAddMessage}>
                        <textarea type="text" name="message"></textarea>
                        <Button type="submit">+</Button>
                </Form>
            </Container>
            <Container tag="section">
                {messages && messages.map(message => <Message 
                        key={message.id} 
                        message={message} 
                    />)
                }

            </Container>
        </Container>

    </>
}