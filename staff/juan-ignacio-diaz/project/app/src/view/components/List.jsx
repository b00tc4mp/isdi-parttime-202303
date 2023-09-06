import { useState, useEffect } from 'react'

import { useAppContext } from '../../hooks'

import { Product, Message } from '.'
import { Container, Button, Label, Form, Input } from '../library'

import { retrieveFilteredProducts, retrieveMessages, addMessage} from '../../logic'

export default ({ onAddedProduct, onEditedDeletedProduct, onFilteredProducts, onBuyedProduct, filterList, lastUpdate }) => {
    console.log('Lists -> render')

    const { alert, freeze, unfreeze } = useAppContext()
    const [products, setProducts] = useState()
    const [messages, setMessages] = useState()
   
    const handleRefreshList = async ()  => {
        try{
            freeze()
            const [products, messages] = await Promise.all([retrieveFilteredProducts(filterList, ''), retrieveMessages()]) 
            setProducts(products)
            setMessages(messages)
            unfreeze()
        }
        catch (error) {
            unfreeze()
            alert(error.message)
        }   
    }

    const handleNewFilter = () => onFilteredProducts()

    const handleAddProduct = () => onAddedProduct()
    
    const handleAddMessage = async (event) => {
        const message = event.target.message.value

        try {
            freeze()
            await addMessage(message) 
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

    useEffect(() => {      
        handleRefreshList()
    }, [filterList])

    return <>
        <Container>
            <Container type="row">
                <Label className="text-[var(--primary)]">Products:</Label>
                <Button onClick={handleAddProduct}>+</Button>
                <Button onClick={handleNewFilter}>Filter</Button>
            </Container>
            <Container tag="section">
                {products && products.map(product => <Product
                        key={product.id} 
                        product={product} 
                        onEditDeleteProduct={onEditedDeletedProduct}
                        onBuyProduct={onBuyedProduct}
                        onModifyProduct={handleRefreshList}
                    />)
                }
            </Container>
            <Container type="row" className="content-center">
                <Label className="text-[var(--primary)]">Messages:</Label>
                <Form className = "flex-row content-center" onSubmit={handleAddMessage}>
                        <textarea type="text" name="message" className= "rounded-lg bg-green-50"></textarea>
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