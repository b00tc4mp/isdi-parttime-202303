import Post from './Post';
import { retrievePosts } from '../../logic/retrieve-posts';
import { context } from '../../context';
import { useState, useEffect } from 'react';
import { retrieveFavoritePosts } from '../../logic/retrieve-favorite-posts';
import './Posts.css';
import { retrieveUserPosts } from '../../logic/retrieve-user-posts';

export default function Posts({ onAuthorProfile, onEditPost, type }) {
  const [posts, setPosts] = useState([]);

  const handleRefreshPosts = () => {
    try {
      let updatedPosts;
      if (type === 'favs') {
        updatedPosts = retrieveFavoritePosts(context.userAuth);
      } else if (type === 'home') {
        updatedPosts = retrievePosts(context.userAuth);
      } else {
        updatedPosts = retrieveUserPosts(type.userId)
      }
      setPosts(updatedPosts);
    } catch (error) {
      console.log(`posts error: ${error.message}`);
    }
  };

  useEffect(() => {
    handleRefreshPosts();
  }, []);

  return (
    <main>
      <h1 className="home-page__main--title">{type === 'favs' ? 'Your favorites' : type === 'home' ? 'Home' : ''}</h1>
      <p className="home-page__main--welcome"></p>
      <div className="home-page__main--posts-list">
        {posts.map((post) => (
          <Post postId={post.id} authorId={post.author} key={post.id} onEditPost={onEditPost} onToggledLike={handleRefreshPosts} onAuthorProfile={onAuthorProfile} onToggledFav={handleRefreshPosts} isProfileView={type === 'favs' || type === 'home' ? false : true}/>
        ))}
      </div>
    </main>
  );
}
