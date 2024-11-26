import { context, hide } from "../ui";
import createPost from "../logic/create-post";


export default function initAddPostPanel (renderPosts, postsListPanel) {
    const postModal = document.querySelector(".home-add-post-modal");
    const failPostMessage = document.querySelector(".home-add-post-modal form .fail-warning");
    const postModalCancelButton = document.querySelector(".form-post-cancel-button");
    const postModalForm =  postModal.querySelector(".form");


    //! PARTE DEL FORM DEL MODAL
    postModalForm.onsubmit = (event) => {
        event.preventDefault();

        const image = event.target.url.value;
        const text = event.target.text.value;

        try{
            createPost(context.userId, image, text);
            hide(postModal);
            event.target.url.value = "";
            event.target.text.value = "";
            failPostMessage.textContent = "";
            postsListPanel.classList.remove("fade");
            postsListPanel.innerHTML ="";
            renderPosts();

        } catch(error){
            failPostMessage.textContent = error.message;
        }
    }

    postModalCancelButton.onclick = (event) => {
        event.preventDefault();
        hide(postModal);
        postsListPanel.classList.remove("fade");
    }
    return  postModal 
}  