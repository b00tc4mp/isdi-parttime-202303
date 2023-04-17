import { posts } from "../data.js"
import { homePage } from "../pages/home-page.js"
import { retrieveUser } from "./helpers/data-managers.js"
import { formatPostDate } from "./formatPostDate.js"
import { context, show } from "../ui.js"
import { editPostModal } from "../pages/home-page.js"


export function showPosts(){
       
        homePage.querySelector('.posts').innerHTML = ''

        if(posts.length > 1) {

            const descendantPosts = posts.toReversed()
            descendantPosts.forEach(post =>{
                const userId ='user-' + Number((post.author).slice(5))
                const user = retrieveUser(userId)
                const formatedDate = formatPostDate(post.date)

                const publication = document.createElement('div')
                publication.classList.add('post')

                const postUserData = document.createElement('div')
                postUserData.classList.add('post-user-data')

                const postUserAvatar = document.createElement('img')
                postUserAvatar.classList.add('post-avatar')
                postUserAvatar.src = user.avatar

                const postUserDataInfo = document.createElement('div')
                postUserDataInfo.classList.add('post-user-data-info')
                
                const postUsername = document.createElement('p')
                postUsername.classList.add('post-user-data-info-username')
                postUsername.classList.add('small-text-bold')
                postUsername.textContent = user.username
                
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
                userPostImage.src = post.image

                const postCaption = document.createElement('div')
                postCaption.classList.add('post-caption')

                const postCaptionText = document.createElement('p')
                postCaptionText.textContent = post.text
                postCaptionText.classList.add('post-caption-text')
                postCaptionText.classList.add('small-text')

                const postLikeIconDiv = document.createElement('div')
                postLikeIconDiv.classList.add('icon-s')

                const likeIcon = document.createElement('i')
                likeIcon.classList.add('uil')
                likeIcon.classList.add('uil-heart')
                
                const postsDiv = document.querySelector('.posts')
                postUserDataInfo.append(postUsername, postDate)

                if(post.author === context.userId){
                    const editPostButton = document.createElement('button')
                    editPostButton.innerText = 'Edit post'
                    editPostButton.classList.add('button-XS')
                    editPostButton.classList.add('secondary-button')

                    editPostButton.onclick = () => {
                        editPostModal.querySelector('input[type=hidden]').value = post.id 
                        editPostModal.querySelector('.edit-post-image-preview').src = post.image
                        editPostModal.querySelector('.text-area').value = post.text

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


