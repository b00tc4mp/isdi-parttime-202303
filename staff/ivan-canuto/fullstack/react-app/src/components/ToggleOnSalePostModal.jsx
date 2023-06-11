import { useEffect, useState } from "react"
import { context } from "../ui"
import './components-styles/ToggleOnSalePostModal.css'
import setPostPrice from "../logic/setPostPrice"
import unsetPostPrice from "../logic/unsetPostPrice"
import ModalContainer from "../library/ModalContainer"
import ModalWindow from "../library/ModalWindow"
import retrievePost from "../logic/retrievePost"
import Form from "../library/Form";
import Input from "../library/Input";
import Button from "../library/Button";
import { useAppContext } from "../hooks"

export default function ToggleOnSalePost({ onToggledOnSalePost, onCancel }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [onSale, setOnSale] = useState()

  useEffect(() => {
    freeze()

    retrievePost(context.userId, context.postId, (error, post) => {
      unfreeze()
      
      if(error) {
        alert(error.message, 'error')
        console.debug(error.stack)
      }

      setOnSale(post.onSale)
    })
  }, [])

  const handleSetPostPrice = (event) => {
    event.preventDefault()

    const pricePost = event.target.pricePost.value

    try {
      freeze()
      
      setPostPrice(context.postId, pricePost, error => {
        unfreeze()
        
        if(error) {
          alert(error.message, 'error')
          console.log(error.stack)
          
          return
        }
        
        onToggledOnSalePost()
      })
    } catch (error) {
      alert(error.message, 'error')
      console.log(error.stack);
    }
  }

  const handleUnsetPostPrice = () => {
    try {
      freeze()
      
      unsetPostPrice(context.postId, error => {
        unfreeze()
        
        if(error) {
          alert(error.message, 'error')
          console.log(error.stack)
          
          return
        }
        console.log('hola');
        onToggledOnSalePost()
      })
    } catch (error) {
      alert(error.message, 'error')
      console.log(error.stack)
    }
  }

  return <>
    <ModalContainer onClick={(event) => {
      if(event.target === document.querySelector('.ModalContainer'))
        onCancel()
    }}>
      {!onSale &&
        <ModalWindow>
          <h2 className="text-2xl text-center">
            Do you want to sell this post?
            Please, set a sell price.
          </h2>
          <Form className="w-72 h-40 py-3 px-12 border-2 border-gray-300" onSubmit={handleSetPostPrice}>
            <Input type="number" name="pricePost" min={1} max={10000} defaultValue={1}/>
            <div className="set-post-price_buttons">
              <Button>Set price</Button>
              <Button type="button" onClick={onCancel}>Cancel</Button>
            </div>
          </Form>
        </ModalWindow>
      }
      {(onSale && onSale !== 'Sold') && 
        <ModalWindow>
          <h2>Do you want to remove this item from the sale?</h2>
          <div className="unset-post-price_buttons">
            <Button onClick={handleUnsetPostPrice}>Yes</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </ModalWindow>
      }
    </ModalContainer>
  </>
}