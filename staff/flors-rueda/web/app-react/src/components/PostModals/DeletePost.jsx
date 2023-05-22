import { svg } from '../../../assets/svg-paths';
import { context } from '../../context';
import { useState, useEffect } from 'react';
import { retrievePost } from '../../logic/retrieve-post';
import { updatePost } from '../../logic/update-post';
import './PostModals.css';
import { deletePost } from '../../logic/deletePost';

export default function DeletePostModal({ onCancel, postId, onDelete}) {


    const handleCancel = (event) => {
        event.preventDefault();
        onCancel();
    };

    const handleDeletePost = (event) => {
        event.preventDefault();

        try {
            deletePost(context.userAuth, postId, error => {
            
              if(error) {
                console.log(`delete post submit error: ${error.message}`);
                return;
              }
              onDelete();
            });
        } catch (error) {
            console.log(`delete post submit error: ${error.message}`);
        }
    };

    console.log('DeletePostModal -> render', postId);

    return   <section className="post-delete-modal">
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