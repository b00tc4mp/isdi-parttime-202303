import { svg } from '../../../assets/svg-paths';
import { context } from '../../context';
import { retrievePost } from '../../logic/retrieve-post';
import { updatePost } from '../../logic/update-post';
import './PostModals.css';

export default function EditPostModal({ onCancel, onPostUpdated, postId }) {
    console.log('EditPostModal -> render');

    const handleCancel = (event) => {
        event.preventDefault();
        onCancel();
    }

    const handleupdatePost = (event) => {
        event.preventDefault();
        const image = event.target.image.value;
        const text = event.target.text.value;

        try {
            updatePost(text, image, postId, context.userAuth);
            onPostUpdated();
        } catch (error) {
            console.log(`edit post submit error: ${error.message}`);
        }
    }

    try {
        const post = retrievePost(context.userAuth, postId)

        return <section className="post-modal">
        <div className="post-modal__content">
            <div className="post-modal__header">
                <button className="post-modal__cancel" onClick={handleCancel} >X</button>
                <h2 className="post-modal__title">Edit Post</h2>
            </div>
            <div className="post-modal__body">
                <img className="post-modal__selected-image"
                    src="https://us.123rf.com/450wm/mathier/mathier1905/mathier190500002/134557216-no-thumbnail-image-placeholder-for-forums-blogs-and-websites.jpg" />
                <form className="post-modal__form" onSubmit={handleupdatePost}>
                    <div className="input__file" tabindex="0">
                        <button className="input__file-delete off">x</button>
                        <svg className="post-modal__set-img" xmlns="http://www.w3.org/2000/svg" height="2rem"
                            viewBox="0 96 960 960" width="2rem" fill="var(--color-primary-100)">
                            <path d={svg.newImage} />
                        </svg>
                        <input className="post-modal__form-input--file" type="file" name="image"
                            accept=".jpg, .jpeg, .png, .webp" defaultValue={post.image} />
                    </div>
                    <textarea className="post-modal__form-input--textarea" name="text" type="text" maxlength="180" defaultValue={post.text}></textarea>
                    <button type="submit" className="post-modal__form--submit">send</button>
                    {/*<button type="button" className="post-modal__form--delete off">delete</button>*/}
                </form>
            </div>
        </div>
    </section>
    } catch (error) {
        console.log(`edit post error: ${error.message}`);
        return null
    }
}