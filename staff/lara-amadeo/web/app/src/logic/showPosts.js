import { posts } from "../data.js"
import { homePage } from "../pages/home-page.js"
import { findUserbyId } from "./helpers/data-managers.js"
import { formatPostDate } from "./formatPostDate.js"
import { context, show } from "../ui.js"
import { editPostModal } from "../components/edit-post-panel.js"

import likeAndUnlikePost from "./likeAndUnlikePost.js"


export function showPosts(){
       
        homePage.querySelector('.posts').innerHTML = ''
        const user = findUserbyId(context.userId)
        const _posts = posts()

        if(_posts.length >= 1) {

            const descendantPosts = _posts.toReversed()
            descendantPosts.forEach(_post =>{
                const userOfPost = findUserbyId(_post.author)
                const formatedDate = formatPostDate(_post.date)

                const publication = document.createElement('div')
                publication.classList.add('post')

                const postUserData = document.createElement('div')
                postUserData.classList.add('post-user-data')

                const postUserAvatar = document.createElement('img')
                postUserAvatar.classList.add('post-avatar')
                postUserAvatar.src = userOfPost.avatar

                const postUserDataInfo = document.createElement('div')
                postUserDataInfo.classList.add('post-user-data-info')
                
                const postUsername = document.createElement('p')
                postUsername.classList.add('post-user-data-info-username')
                postUsername.classList.add('small-text-bold')
                postUsername.textContent = userOfPost.username
                
                const postDate = document.createElement('p')
                postDate.classList.add('post-user-data-info-time')
                postDate.classList.add('tiny-text')
                postDate.textContent = formatedDate

                const headerPost = document.createElement('div')
                headerPost.classList.add('header-post')

                const postImage = document.createElement('div')
                postImage.classList.add('post-image')
                
                const userPostImage = document.createElement('img')
                userPostImage.classList.add('user-post-image')
                userPostImage.src = _post.image

                const postCaption = document.createElement('div')
                postCaption.classList.add('post-caption')

                const postCaptionText = document.createElement('p')
                postCaptionText.textContent = _post.text
                postCaptionText.classList.add('post-caption-text')
                postCaptionText.classList.add('small-text')

                const postLikeIconDiv = document.createElement('div')
                postLikeIconDiv.classList.add('icon-s-container')

                const likeIcon = document.createElement('span')
                likeIcon.innerHTML = 'favorite'
                likeIcon.classList.add('material-symbols-rounded')
                likeIcon.classList.add('icon-s')
                likeIcon.classList.add('pointer')
                
                const postAlreadyLikedByUser = user.likedPosts.includes(_post.id)

                if(postAlreadyLikedByUser){
                    likeIcon.classList.add('like-icon-filled')

                    likeIcon.onclick = () => {
                        likeIcon.classList.remove('like-icon-filled')
                        likeAndUnlikePost(_post, user.id)
                        showPosts()
                    }
                } else {
                    likeIcon.onclick = () => {
                        likeIcon.classList.add('like-icon-filled')
                        likeAndUnlikePost(_post, user.id)
                        showPosts()
                        }
                }
                
                const postsDiv = document.querySelector('.posts')
                postUserDataInfo.append(postUsername, postDate)

                if(_post.author === user.id){
                    const editPostButton = document.createElement('button')
                    editPostButton.innerText = 'Edit post'
                    editPostButton.classList.add('button-XS')
                    editPostButton.classList.add('secondary-button')

                    editPostButton.onclick = () => {
                        editPostModal.querySelector('input[type=hidden]').value = _post.id 
                        editPostModal.querySelector('.edit-post-image-preview').src = _post.image
                        editPostModal.querySelector('.text-area').value = _post.text

                        show(editPostModal)
                    }
                    postUserData.append(postUserAvatar, postUserDataInfo)
                    headerPost.append(postUserData,editPostButton)
                } else {
                postUserData.append(postUserAvatar, postUserDataInfo)
                headerPost.append(postUserData)
                }

                postImage.appendChild(userPostImage)
                
                postLikeIconDiv.appendChild(likeIcon)
                postCaption.append(postCaptionText, postLikeIconDiv)

                publication.appendChild(headerPost)
                publication.appendChild(postImage)
                publication.appendChild(postCaption)
                
                postsDiv.appendChild(publication)

            })
        }
    }


