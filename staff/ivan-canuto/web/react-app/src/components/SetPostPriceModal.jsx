import setPostPrice from "../logic/setPostPrice"
import { context } from "../ui"


export default function SetPostPrice({onSettedPostPrice, onCancel}) {

  const handleSetPostPrice = (event) => {
    event.preventDefault()

    const postPrice = event.target.pricePost.value

    if(postPrice > 10000 || isNaN(postPrice)) {
      alert('The value entered is not a number or bigger than 10000.')
      return
    }

    try {
      setPostPrice(context.postId, postPrice, (error) => {
        if(error) {
          alert(error.message)
          console.log(error.stack)
          return
        }
  
        onSettedPostPrice()
      })
      
    } catch (error) {
      alert(error.message)
      console.log(error.stack);
    }
  }

  return <div className="set-postprice container">
    <form className="set-postprice-form" onSubmit={handleSetPostPrice}>
      <input className="post-price" type="number" name="pricePost" min={1} max={10000} defaultValue={1}/>
      <button>Set price</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  </div>
}