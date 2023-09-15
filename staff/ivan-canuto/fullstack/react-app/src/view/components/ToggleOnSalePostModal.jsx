import { useEffect, useState } from "react"
import setPostPrice from "../../logic/setPostPrice"
import unsetPostPrice from "../../logic/unsetPostPrice"
import ModalContainer from "../library/ModalContainer"
import ModalWindow from "../library/ModalWindow"
import retrievePost from "../../logic/retrievePost"
import Form from "../library/Form";
import Input from "../library/Input";
import Button from "../library/Button";
import { useAppContext } from "../hooks"
import { context } from "../../ui"

export default function ToggleOnSalePost({ onToggledOnSalePost, onCancel }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [onSale, setOnSale] = useState()

  useEffect(() => {
    try {
      freeze()

      retrievePost(context.postId)
        .then(post => {
          unfreeze()
          setOnSale(post.onSale)
        })
        .catch(error => {
          unfreeze()
          alert(error.message, 'error')
          console.debug(error.stack)
        })

    } catch (error) {
      unfreeze()
      alert(error.message, 'error')
      console.debug(error.stack)
    }
    
  }, [])

  const handleSetPostPrice = (event) => {
    event.preventDefault()

    const pricePost = event.target.pricePost.value

    try {
      setPostPrice(context.postId, pricePost)
        .then(() => onToggledOnSalePost())
        .catch(error => {
          alert(error.message, 'error')
          console.log(error.stack)
        })

    } catch (error) {
      alert(error.message, 'error')
      console.log(error.stack)
    }
  }

  const handleUnsetPostPrice = () => {
    try {
      unsetPostPrice(context.postId)
        .then(() => onToggledOnSalePost())
        .catch(error => {
          alert(error.message, 'error')
          console.log(error.stack)
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
          <h2 className="text-2xl text-center text-black">
            Do you want to sell this post?
            Please, set a sell price.
          </h2>
          <Form className="w-72 h-40 py-3 px-12 border-2 border-gray-300" onSubmit={handleSetPostPrice}>
            <Input type="number" name="pricePost" min={1} max={10000} defaultValue={1}/>
            <div className="flex gap-4">
              <Button>Set price</Button>
              <Button type="button" onClick={onCancel}>Cancel</Button>
            </div>
          </Form>
        </ModalWindow>
      }
      {(onSale && onSale !== 'Sold') && 
        <ModalWindow>
          <h2 className="text-black text-2xl text-center">Do you want to remove this item from the sale?</h2>
          <div className="flex gap-8">
            <Button className="px-4" onClick={handleUnsetPostPrice}>Yes</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </div>
        </ModalWindow>
      }
    </ModalContainer>
  </>
}