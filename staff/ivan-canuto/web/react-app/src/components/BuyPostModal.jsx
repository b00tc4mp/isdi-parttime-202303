import { findPostById } from "../data"
import { context } from "../ui"
import buyPost from "../logic/buyPost"
import { useEffect, useState } from "react"


export default function BuyPost({ onBuyPost, onCancel }) {

  const [post, setPost] = useState()

  useEffect(() => {

    findPostById(context.postId, (post) => {
      setPost(post)
    })
  }, [])

  const handleBuyPost = (event) => {
    event.preventDefault()

    try {
      buyPost(post, (error) => {
        if (error) {
          alert(error.message)
          console.log(error.stack)
          return
        }
  
        onBuyPost()
      })
      
    } catch (error) {
      alert(error.message)
      console.log(error.stack)
    }
  }

  console.log('Buy post modal -> render');

  return <div className="buy-post container">
    <form className="buy-post-form" onSubmit={handleBuyPost}>
    {post && <>
        <h2>{`Do you want to buy this post for ${post.onSale}€?`}</h2>
        <div className="buy-post-form_buttons">
          <button className="buy-post-button">Buy</button>
          <button type="button" className="cancel-buy-post-button" onClick={onCancel}>Cancel</button>
        </div>
      </>
    }
    </form>
  </div>
}