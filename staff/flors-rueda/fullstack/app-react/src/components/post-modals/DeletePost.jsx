import { context } from '../../ui';
import './PostModals.css';
import deletePost from '../../logic/delete-post';
import inLogger from '../../inLogger';
import { useContext } from 'react';
import Context from '../../Context';

//Check why everytime i send a form gives Objects are not valid as a React child (found: [object Error]). If you meant to render a collection of children, use an array instead.
const DeletePostModal = ({ onCancel, postId, onDelete }) => {
    const { alert } = useContext(Context);

    const handleCancel = (event) => {
        event.preventDefault();
        onCancel();
    };

    const handleDeletePost = (event) => {
        event.preventDefault();

        try {
            deletePost(context.userAuth, postId, error => {

                if (error) {
                    alert(`delete post error: ${error.message}`, 'danger');
                    return;
                }
                onDelete();
            });
        } catch (error) {
            alert(`delete post error: ${error.message}`, 'danger');
        }
    };

    return <section className="post-delete-modal">
        <div className="post-delete-modal__content">
            <div className="post-delete-modal__header">
                <h2 className="post-delete-modal__title">Wait!</h2>
            </div>
            <div className="post-delete-modal__body">
                <p>Are you sure you want to delete this post? Once is done, it's done. There's no going back!</p>
                <form className="post-delete-modal__form">
                    <button type="button" onClick={handleDeletePost} className="post-delete-modal__delete">YES, delete it</button>
                    <button type="button" onClick={handleCancel} className="post-delete-modal__cancel">NO, keep it posted</button>
                </form>
            </div>
        </div>
    </section>

}

export default inLogger(DeletePostModal)