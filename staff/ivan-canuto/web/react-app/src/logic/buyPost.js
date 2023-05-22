import { savePost } from "../data"


export default function buyPost(post, callBack) {

  post.onSale = 'Sold'

  savePost(post, () => callBack(null))
}