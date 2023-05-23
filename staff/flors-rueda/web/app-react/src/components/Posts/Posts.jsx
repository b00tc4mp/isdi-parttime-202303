import Post from './Post';
import { retrievePosts } from '../../logic/retrieve-posts';
import { context } from '../../context';
import { useState, useEffect } from 'react';
import { retrieveFavoritePosts } from '../../logic/retrieve-favorite-posts';
import './Posts.css';
import { retrieveUserPosts } from '../../logic/retrieve-user-posts';
import inLogger from '../../logger';

const Posts = ({ onAuthorProfile, onEditPost, type, userId }) => {
  const [posts, setPosts] = useState([]);

  const handleRefreshPosts = () => {
    try {
      if (type === 'favs') {
        retrieveFavoritePosts(context.userAuth, (error, posts) => {
          if (error) {
            console.log(`posts error: ${error.message}`);
            return;
          }
          setPosts(posts);
        });
      } else if (type === 'home') {
        retrievePosts(context.userAuth, (error, posts) => {
          if (error) {
            console.log(`posts error: ${error.message}`); //TODO figure out why doesn't show the edit button
            return;
          }
          setPosts(posts);
        });
      } else {
        retrieveUserPosts(type, context.userAuth, (error, posts) => {
          if (error) {
            console.log(`posts error: ${error.message}`);
            return;
          }
          setPosts(posts);
        });
      }
    } catch (error) {
      console.log(`posts error: ${error.message}`);
    }
  };

  const handleOnEditPost = (postId) => {
    onEditPost(postId);
    handleRefreshPosts();
  }

  useEffect(() => {
    handleRefreshPosts();
  }, []);

  return (
    <main>
      <h1 className="home-page__main--title">{type === 'favs' ? 'Your favorites' : type === 'home' ? 'Home' : ''}</h1>
      <p className="home-page__main--welcome"></p>
      <div className="home-page__main--posts-list">
        {posts.length > 0 ? posts.map((post) => (
          <Post
            post={post}
            author={post.author}
            key={post.id}
            onEditPost={handleOnEditPost}
            onToggledLike={handleRefreshPosts}
            onAuthorProfile={onAuthorProfile}
            onToggledFav={handleRefreshPosts}
            onToggledPublicStat={handleRefreshPosts}
            isProfileView={type === 'favs' || type === 'home' ? false : true}
            userId={userId}
          />
        )) : <div className="home-page__main--no-posts-message">{
        type === 'favs' ? `You don't have any favorite post yet.` : 
        type === 'home' ? `Wow, no public posts available right now. Go ahead and publish one!` : 
        type === context.userAuth ? `You have not posted anything yet!` : 
        `This user doesn't have any public post.`}</div>}
      </div>
    </main>
  );
};

export default inLogger(Posts);
