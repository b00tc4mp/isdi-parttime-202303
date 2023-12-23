 import { useAppContext } from '../../hooks'

import { Container, Button, Label } from '../library'

import { isIncludesCurrentUser, toggleLikeProduct, toggleProductToCart } from '../../logic'

export default ({ product: { id, name, howMany, untried, likes, comment, state, buyer, price}, onEditDeleteProduct, onBuyProduct, onModifyProduct }) => {
    console.log('Product -> render')

    const { alert, freeze, unfreeze } = useAppContext()

    const handleEditDeleteProduct = () => onEditDeleteProduct(id)

    const handleBuyProduct = () => onBuyProduct(id)

    const handleLikeProduct = async () => {
        try {
            freeze()
            await toggleLikeProduct(id)
            unfreeze()

            onModifyProduct()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }

    const handleToCart = async () => {
        try {
            freeze()
            await toggleProductToCart(id)
            unfreeze()

            onModifyProduct()
        }
        catch(error){
            unfreeze()
            alert(error.message)
        }
    }


    return <>
        <Container tag="article">
            <Container type="row">
                <h1>{untried?'❗':''}</h1>
                <p>{name +' ('+howMany+')'}</p>
                {state==='bought' && <>
                    <Label htmlFor="nameRegister">💲 {price}€</Label>
                </>
                || <>
                    {state==='' && <> 
                        <Button className = "button-likes" onClick={handleLikeProduct}>{isIncludesCurrentUser(likes.map((like) => like.id)) ? '❤️' : '🤍'} ({likes? likes.length : 0})</Button>
                        <Button onClick={handleEditDeleteProduct}>🖍</Button>
                        <Button onClick={handleToCart}>🛒✔</Button> 
                    </>||<>
                        {state==='selected' && buyer && <> 
                            <Button onClick={handleToCart}>🛒❌</Button> 
                            <Button onClick={handleBuyProduct}>💲</Button>
                        </>||<>
                            <Label htmlFor="nameRegister">🛒</Label>
                        </>}                    
                    
                    </>}

                </>}
            </Container>
            {state==='' && <> 
                <p>{comment}</p>
            </>
            ||<></>}
        </Container>
    </>
}