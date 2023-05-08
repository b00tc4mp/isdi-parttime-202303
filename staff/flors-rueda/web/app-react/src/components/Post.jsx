import { context } from '../ui/general-tools.js'
import { svg } from '../../assets/svg-paths.js'

export default function Post({ post: { postData, authorData }, handleLike }) {
    console.log(`Post ${postData.id} -> render`)
  
    let timeDifference = new Date() - postData.date;
    const hours = Math.floor(timeDifference / 3600000);
    let time;
  
    const handleLikeClick = () => {
      postData = handleLike(postData);
    }

    if (hours <= 24) {
        const minutes = Math.floor(timeDifference / 60000);
        if (hours > 0) time = <time className="post__footer--date">{hours} hours ago</time>
        if (hours === 0 && minutes > 0) time = <time className="post__footer--date">{minutes} minutes ago</time>
        if (minutes === 0) time = <time className="post__footer--date">just now</time>
    } else {
        time = <time className="post__footer--date">{postData.date.toLocaleDateString("en-GB")}</time>
    }
    return <article className="post-card">
        <div className="post-card__header">
                    <div className="post-card__header--author-data">
                    <img className="post-card__header--author-avatar" src={authorData.avatar}/>
                    <p className="post-card__header--author-name">{authorData.name}</p>
                    <p className="post-card__header--author-username">{authorData.username}</p></div>
     {postData.author === context.userAuth ? <svg className="post-card__header--to-edit-post" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={svg.edit}/></svg> : ''}
      </div>
      <div className="post-card__body--image-container">
      <img className="post-card__body--image-container--image" src={postData.image} />
      </div>
      <div className="post-card__body--text">{postData.text}</div>
      <div className="post-card__body--like">
      <svg className="post-card__body--like-button" onClick={handleLikeClick}
      xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={postData.isLiked ? svg.heartFill : svg.heartEmpty}/></svg><b>{postData.likes.length}</b></div>
      <div className="post__footer">
      <div className="post__footer--favorite">
      <svg className="post__footer--favorite-button" xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960"><path d={postData.isFav ? svg.fillStar : svg.emptyStar}/></svg></div>
      {time}
      </div>
    </article>
}