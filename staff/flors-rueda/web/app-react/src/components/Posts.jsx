import Post from './Post';
import { retrievePosts } from '../logic/retrieve-posts';
import { context } from '../context';
import { useState, useEffect } from 'react';


export default function Posts({ onEditPost }) {
  const [posts, setPosts] = useState([]);

  const handleRefreshPosts = () => {
    try {
      const updatedPosts = retrievePosts(context.userAuth);
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
      <h1 className="home-page__main--title">Home</h1>
      <p className="home-page__main--welcome"></p>
      <div className="home-page__main--posts-list">
        {posts.map((post) => (
          <Post postId={post.id} authorId={post.author} key={post.id} onEditPost={onEditPost} onToggledLikePost={handleRefreshPosts}/>
        ))}
      </div>
    </main>
  );
}
