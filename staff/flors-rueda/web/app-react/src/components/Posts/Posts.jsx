import Post from './Post';
import { retrievePosts } from '../../logic/retrieve-posts';
import { context } from '../../context';
import { useState, useEffect } from 'react';
import { retrieveFavoritePosts } from '../../logic/retrieve-favorite-posts';
import './Posts.css';
import { retrieveUserPosts } from '../../logic/retrieve-user-posts';

export default function Posts({ onAuthorProfile, onEditPost, type, userId }) {
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
        retrieveUserPosts(type, (error, posts) => {
          if (error) {
            console.log(`posts error: ${error.message}`);
            return;
          }
          setPosts(posts);
        });;
      }
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
          <Post
            post={post}
            author={post.author}
            key={post.id}
            onEditPost={onEditPost}
            onToggledLike={handleRefreshPosts}
            onAuthorProfile={onAuthorProfile}
            onToggledFav={handleRefreshPosts}
            isProfileView={type === 'favs' || type === 'home' ? false : true}
            userId={userId}
          />
        ))}
      </div>
    </main>
  );
}
