import { hide, context } from "../ui";
import updatePost from "../logic/update-post";




export default function initEditPostPanel (postsListPanel, renderPosts) {

     //*VARIABLES PARA EDITAR POST

    const editPostModal = document.querySelector(".home-edit-post-modal");
    const editPostModalCancelButton = document.querySelector(".home-edit-form-post-cancel-button");
    const editPostModalForm = document.querySelector(".home-edit-post-form"); 

    
    //!PARTE DE EDITAR POST MODAL
    editPostModalForm.onsubmit = (event) => {
        event.preventDefault();

        const image = event.target.url.value;
        const text = event.target.text.value;
        const postId = event.target.postId.value;
        try{
            updatePost(context.userId, postId, image, text);
            hide(editPostModal);
            postsListPanel.classList.remove("fade");
            postsListPanel.innerHTML ="";
            renderPosts();

        } catch(error){
            alert(error.message)
            failPostMessage.textContent = error.message;
        }
    } 
    editPostModalCancelButton.onclick = (event) => {
        event.preventDefault();
        hide(editPostModal);
        postsListPanel.classList.remove("fade");
    }

    return {editPostModal, editPostModalForm }
}

//hola
//hola