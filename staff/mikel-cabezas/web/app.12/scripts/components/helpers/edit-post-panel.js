import { toggleOffClassInSection } from "../../ui.js"
import { posts, savePosts } from "../../data.js"

export function showEditPost(articleId, homePage) {
    const _posts = posts()
    
    const postId = articleId.split(' ').pop()
    toggleOffClassInSection(homePage.querySelector('.overlay.edit-post'))
    const file = document.querySelector('.section.home').querySelector('form.edit-post input[name="file"]')
    const postImage = document.querySelector('.section.home').querySelector('form.edit-post .post-image')
    
    const currentPost = postId.slice(5) - 1
    const currentImage = _posts[currentPost].image
    postImage.src = currentImage

    const postIdInput = document.querySelector(`form.edit-post input[type="hidden"]`)
    postIdInput.classList.add(`${postId}`)

    const postTitle = document.querySelector('.section.home').querySelector('form.edit-post .title')
    const postText = document.querySelector('.section.home').querySelector('form.edit-post textarea')

    // imageToBase64(file, postImage.src)
    
    const printImage = file.onchange = function (event) {
        const file = event.target.files[0]
        const image = new FileReader()
        image.onload = () => {
            const base64 = image.result
            postImage.src = base64
        }
        image.readAsDataURL(file)
    }
    postImage.src = _posts[currentPost].image
    postTitle.value = _posts[currentPost].title
    postText.value = _posts[currentPost].text
}