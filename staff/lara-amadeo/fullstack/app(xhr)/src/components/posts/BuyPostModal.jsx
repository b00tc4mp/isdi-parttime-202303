import './BuyPostModal.css'
import { useEffect, useState, useContext } from 'react'
import { context } from '../../ui'
import retrievePost from '../../logic/retrievePost'
import formatPostDate from '../../logic/formatPostDate'
import Context from '../../Context'
export default function BuyPostModal({ postId, onCancelBuyPost }) {

    const [post, setPost] = useState()
    const { generateToast } = useContext(Context)

    useEffect(() => {
        try {
            retrievePost(context.token, postId, (error, post) => {
                if (error) {
                    generateToast(error.message, 'error')
                    console.log(error.stack)
                    return
                }
                setPost(post)
            })
        } catch (error) {
            generateToast(error.message, 'error')
            console.log(error.stack)
        }
    }, [])

    const onCancel = () => {
        onCancelBuyPost()
    }
    return <div className="modal-overlay">
        <div className="centered-containers">
            <form className="centered-form" onSubmit={null}>

                <p className="title">Buy post</p>

                {post && <>

                    <div className='buy-post-data-n-image'>
                        <div className="w-[80px] h-[80px] relative flex">
                            <img className="image-preview" name="image" src={post.image} />
                        </div>

                        <div className='buy-post-information'>
                            <div className='data-item-container'>
                                <p className='small-text-bold'>Author:</p>
                                <p className='small-text'>{post.author}</p>
                            </div>

                            <div className='data-item-container'>
                                <p className='small-text-bold'>Date:</p>
                                <p className='small-text'>{formatPostDate(post.date)}</p>
                            </div>

                            <div className='data-item-container'>
                                <p className='small-text-bold'>Likes:</p>
                                <p className='small-text'>{post.likes}</p>
                            </div>

                            <div className='data-item-container'>
                                <p className='small-text-bold'>Price:</p>
                                <p className='small-text'>{post.price}€</p>
                            </div>
                        </div>
                    </div>
                </>}

                <div className="button-bar">
                    <button className="button-S secondary-button" id="cancel-edit-post" type="button" onClick={onCancel}>Cancel</button>
                    <button className="button-S primary-button" id="save-edit-post" type="submit">Buy</button>
                </div>
            </form>
        </div>
    </div>
}