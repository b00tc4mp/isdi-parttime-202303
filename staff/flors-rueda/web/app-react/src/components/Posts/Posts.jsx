import Post from './Post';
import { retrievePosts } from '../../logic/retrieve-posts';
import { context } from '../../context';
import { useState, useEffect } from 'react';
import { retrieveFavoritePosts } from '../../logic/retrieve-favorite-posts';
import './Posts.css';

export default function Posts({ onEditPost, type }) {
  const [posts, setPosts] = useState([]);

  const handleRefreshPosts = () => {
    try {
      let updatedPosts;
      if(type === 'favs') {
        updatedPosts = retrieveFavoritePosts(context.userAuth)
      } else {
        updatedPosts = retrievePosts(context.userAuth);
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
          <Post postId={post.id} authorId={post.author} key={post.id} onEditPost={onEditPost} onToggledLike={handleRefreshPosts} onToggledFav={handleRefreshPosts}/>
        ))}
      </div>
    </main>
  );
}
