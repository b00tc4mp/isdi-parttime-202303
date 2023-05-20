import { loadUsers } from "../data"
import { context } from "../ui"
import toggleLikePost from "../logic/toggleLikePost"
import "./Post.css"

export default function Post({ post: {image, text, date, likes, author, id}, onLikePostClick, onEditClick }) {
    

        const handleLikePostClick = event => {
            event.preventDefault()
            
            try {
                toggleLikePost(context.userId, id, error => {
                    if (error) {
                        alert(error.message)

                        return
                    }
                    onLikePostClick()
                })
            }catch (error) {
                alert(error.message)
            }
        }

        const handleOpenEditModal = () => onEditClick(id)

        console.log('Post -> Render')

        return <article className="inputs__box--feed">
            <div className="post__info--user">
                <img className="post__avatar" />
                <p className="text"></p>
                <time className="text">{date}</time>
            </div>
            <img className="home__post--image" src={image} />
            <p className="text">{text}</p>
            <div className="home__post--info">
                <div className="post__like">
                <img className="like-button" src={likes && likes.includes(context.userId) ? './images/heart-filled.png' : './images/heart-empty.png'} onClick={handleLikePostClick}/>
                <p>{likes ? likes.length : 0}</p>
                </div>
                <div className="post__edit">
                    {author === context.userId && <img className="edit--icon" src="../../images/edit.png" onClick={handleOpenEditModal}/>}
                </div>
                <img className="edit--icon" src="../../images/delete.png"/>
            </div>
        </article>
    }

// export default function Post({ post: {image, text, date, likes, author, id}, onLikePostClick, onEditClick }) {
//     loadUsers(users => {
//         let avatar
//         let name
//         for (const user of users) {
//             if (author === user.id) {
//                 avatar = user.avatar
//                 name = user.name
//             }
//         }

//         const handleLikePostClick = event => {
//             event.preventDefault()
            
//             try {
//                 toggleLikePost(context.userId, id, error => {
//                     if (error) {
//                         alert(error.message)

//                         return
//                     }
//                     onLikePostClick()
//                 })
//             }catch (error) {
//                 alert(error.message)
//             }
//         }

//         const handleOpenEditModal = () => onEditClick(id)

//         console.log('Post -> Render')

//         return <article className="inputs__box--feed">
//             <div className="post__info--user">
//                 <img className="post__avatar" src={avatar} />
//                 <p className="text">{name}</p>
//                 <time className="text">{date}</time>
//             </div>
//             <img className="home__post--image" src={image} />
//             <p className="text">{text}</p>
//             <div className="home__post--info">
//                 <div className="post__like">
//                 <img className="like-button" src={likes && likes.includes(context.userId) ? './images/heart-filled.png' : './images/heart-empty.png'} onClick={handleLikePostClick}/>
//                 <p>{likes ? likes.length : 0}</p>
//                 </div>
//                 <div className="post__edit">
//                     {author === context.userId && <img className="edit--icon" src="../../images/edit.png" onClick={handleOpenEditModal}/>}
//                 </div>
//                 <img className="edit--icon" src="../../images/delete.png"/>
//             </div>
//         </article>
//     })
// }