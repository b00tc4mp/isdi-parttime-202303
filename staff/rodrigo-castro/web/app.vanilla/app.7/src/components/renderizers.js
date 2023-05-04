

export function renderUsers() {
    try{
        const user = retrieveUser(context.userId)
        
        // homePage.querySelector('span[name=authenticated-user-name]').textContent =`${user.name}`
        
        if(user.avatar)
        avatarImg.src = user.avatar
        
        return true
    } catch(error){
        alert(error.message)
        
        console.log(error)
        
        return false
    }
}

export function renderPosts() {
    try {
        const posts = retrievePosts(context.userId)
        
        postListPanel.innerHTML = ''

        posts.forEach(post => {
            const postItem = document.createElement('article')
            postItem.classList.add('post-container')

            const postImg = document.createElement('img')
            postImg.src = post.image

            const postCaptionAndLike = document.createElement('div')

            const postCaption = document.createElement('p')
            postCaption.innerText = post.text

            const likesContainer = document.createElement('div')

            const likesCounter = document.createElement('p')
            
            if((post.likedBy).length > 1) {
                likesCounter.innerText = `${(post.likedBy).length} likes`
            } else if((post.likedBy).length > 0){
                likesCounter.innerText = `${(post.likedBy).length} like`
            }

            const likeButton = document.createElement('button')
            likeButton.classList.add('like-button')

            const likeHeart = document.createElement('i')
            likeHeart.classList.add('uil')
            likeHeart.classList.add('uil-heart-sign')
            if(post.likedBy.includes(context.userId))
                likeHeart.classList.add('liked')

            likeButton.append(likeHeart)

            likesContainer.append(likesCounter, likeButton)

            postCaptionAndLike.append(postCaption, likesContainer)

            const postFooter = document.createElement('div')

            const postFooterLeft = document.createElement('div')

            const postFooterLeftTime = document.createElement('time')
            
            const postDate = post.date

            const day = postDate.getDate().toString().padStart(2, '0')
            const month = (postDate.getMonth() + 1).toString().padStart(2, '0')
            const year = postDate.getFullYear()

            postFooterLeftTime.innerText = `${day}/${month}/${year}-`

            if(post.author === context.userId) {
                const postEditButton = document.createElement('button')
                postEditButton.classList.add('edit-button')
    
                const postEditButtonIcon = document.createElement('i')
                postEditButtonIcon.classList.add('uil')
                postEditButtonIcon.classList.add('uil-edit')
    
                postEditButton.append(postEditButtonIcon)

                const user = findUserById(post.author)
    
                postFooterLeft.append(postFooterLeftTime, ` by ${user.name}`)
    
                postFooter.append(postFooterLeft, postEditButton)
    
                postItem.append(postImg, postCaptionAndLike, postFooter)
    
                postListPanel.appendChild(postItem)

                postEditButton.onclick = () => {
                    showElement(editPostModal)
                    
                    editPostModal.querySelector('input[name=hidden]').value = post.id
                    editPostModal.querySelector('input[name=url]').value = post.image
                    editPostModal.querySelector('textarea[name=text]').value = post.text
                }
            } else {
                const user = findUserById(post.author)
    
                postFooterLeft.append(postFooterLeftTime, ` by ${user.name}`)
    
                postFooter.append(postFooterLeft)
    
                postItem.append(postImg, postCaptionAndLike, postFooter)
    
                postListPanel.appendChild(postItem)
            }

            const foundUser = findUserById(context.userId)
            const foundPost = findPostById(post.id)

            likeButton.onclick = () => {
                likeHeart.classList.toggle('liked')

                if(!foundPost.likedBy.includes(foundUser.id)){
                    foundPost.likedBy.push(foundUser.id)
                    savePosts()
                    renderPosts()
                } else {
                    const index = foundPost.likedBy.indexOf(foundUser.id)
                    foundPost.likedBy.splice(index, 1)
                    savePosts()
                    renderPosts()
                }
            }

        })

        return true
    } catch(error){
        alert(error.message)
        console.log(error)
        
        return false
    }
}