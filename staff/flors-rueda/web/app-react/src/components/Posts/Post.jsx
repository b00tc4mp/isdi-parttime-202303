import { svg } from '../../../assets/svg-paths';
import { context } from '../../context';
import { retrievePost } from '../../logic/retrieve-post';
import { retrieveUser } from '../../logic/retrieve-user';
import { toggleFav } from '../../logic/toggle-fav';
import { toggleLike } from '../../logic/toggle-like';
import { colors } from '../../../assets/avatar';
import Avatar from 'boring-avatars';
import './Posts.css';

export default function Post({ post, author, onEditPost, onToggledLike, onToggledFav, isProfileView, onAuthorProfile, userId }) {
    const handleEditPost = () => onEditPost(post.id);
    const handleToAuthorProfile = () => onAuthorProfile(author.id);
    const handleToggleLikePost = () => {
        try {
            toggleLike(post.id, context.userAuth, error => {
                if(error){
                    console.log(`post fav error: ${error.message}`);
                    return;
                }
                onToggledLike();
            });
            
        } catch (error) {
            console.log(`post like error: ${error.message}`);
        }
    }

    const handleToggleFavPost = () => {
        try {
            toggleFav(post.id, context.userAuth, error => {
                if(error){
                    console.log(`post fav error: ${error.message}`);
                    return;
                }
                onToggledFav();
            });
        } catch (error) {
            console.log(`post fav error: ${error.message}`);
        }
    }

    let timeDifference = new Date() - post.date;
    const hours = Math.floor(timeDifference / 3600000);
    let time;

    if (hours <= 24) {
        const minutes = Math.floor(timeDifference / 60000);
        if (hours > 0) time = <time className="post__footer--date">{hours} hours ago</time>
        if (hours === 0 && minutes > 0) time = <time className="post__footer--date">{minutes} minutes ago</time>
        if (minutes === 0) time = <time className="post__footer--date">just now</time>
    } else {
        time = <time className="post__footer--date">{post.date.toLocaleDateString("en-GB")}</time>
    }

    console.log(`Post ${post.id} -> render`)
    return <article className={isProfileView ? "post-card__profile" : "post-card"}>
        <div className="post-card__header">
            {!isProfileView && (
                <div className="post-card__header--author-data" onClick={handleToAuthorProfile}>
                    {author.avatar.random ?
                        <div className="post-card__header--author-avatar">
                            <Avatar size={36}
                                variant="beam"
                                colors={colors}
                                name={author.avatar.src} 
                            />
                        </div>
                        : <img className="post-card__header--author-avatar" src={author.avatar.src} />
                    }
                    <p className="post-card__header--author-name">{author.name}</p>
                    <p className="post-card__header--author-username">{author.username}</p>
                </div>
            )}
            {post.author === context.userAuth && (<svg className="post-card__header--to-edit-post" onClick={handleEditPost} xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.edit} /></svg>)}</div>
        <div className="post-card__body--image-container">
            <img className="post-card__body--image-container--image" src={post.image} />
        </div>
        <div className="post-card__body--text">{post.text}</div>
        <div className="post-card__body--like">
            <svg className="post-card__body--like-button" onClick={handleToggleLikePost}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
                <path d={(post.likes).includes(context.userAuth) ? svg.heartFill : svg.heartEmpty} /></svg>
            <b>{post.likes.length}</b></div>
        <div className="post__footer">
            <div className="post__footer--favorite">
                <svg className="post__footer--favorite-button" onClick={handleToggleFavPost} xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={post.isFav ? svg.fillStar : svg.emptyStar} /></svg>
            </div>
            {time}
        </div>
    </article>
}