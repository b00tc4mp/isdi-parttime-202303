import { findPostById } from "../data"
import { context } from "../ui"
import buyPost from "../logic/buyPost"
import { useEffect, useState } from "react"
import './components-styles/BuyPostModal.css'
import ModalContainer from "../library/ModalContainer"
import ModalWindow from "../library/ModalWindow"
import Button from "../library/Button";
import { useAppContext } from "../hooks"

export default function BuyPost({ onBoughtPost, onCancel }) {
  const { alert, freeze, unfreeze } = useAppContext()

  const [post, setPost] = useState()

  useEffect(() => {
    freeze()

    findPostById(context.postId, (post) => {
      unfreeze()
      
      setPost(post)
    })
  }, [])

  const handleBuyPost = (event) => {
    event.preventDefault()

    try {
      freeze()

      buyPost(post.id, (error) => {
        unfreeze()

        if (error) {
          alert(error.message, 'error')
          console.debug(error.stack)
          return
        }
  
        onBoughtPost()
      })
      
    } catch (error) {
      alert(error.message, 'error')
      console.debug(error.stack)
    }
  }

  console.debug('Buy post modal -> render');

  return <>
    <ModalContainer onClick={(event) => {
      if (event.target === document.querySelector('.ModalContainer'))
        onCancel()
    }}>
      <ModalWindow tag="form" onSubmit={handleBuyPost}>
      {post && <>
          <h2 className="text-2xl text-center">{`Do you want to buy this post for ${post.onSale}€?`}</h2>
          <div className="w-full flex justify-evenly">
            <Button className='px-5' onClick={handleBuyPost}>Buy</Button>
            <Button className='px-5' type="button" onClick={onCancel}>Cancel</Button>
          </div>
        </>
      }
      </ModalWindow>
    </ModalContainer>
    </>
}