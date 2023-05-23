import Posts from '../components/posts/Posts';
import { useState, useEffect } from 'react';
import NewPost from '../components/post-modals/NewPost';
import EditPost from '../components/post-modals/EditPost';
import DeletePost from '../components/post-modals/DeletePost';
import { context }from '../ui';
import { svg } from '../../assets/svg-paths';
import Navbar from '../components/navbar/Navbar';
import './Home.css';
import Profile from '../components/Profile/Profile';
import inLogger from '../logger';

const Home = ({ onLoggedOut }) => {
    const [view, setView] = useState('posts');
    const [modal, setModal] = useState(null);
    const [postId, setPostId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [key, setKey] = useState(null);
  
    const handleOpenNewPostModal = () => setModal('new-post');

    const handleOpenEditPostModal = (postId) => {
      setPostId(postId);
      setModal('edit-post');
    };

    const handleOpenDeletePostModal = (postId) => {
      setPostId(postId);
      setModal('delete-post');
    };

    const handleCloseModal = () => setModal(null);
    //TODO add delete post modal and feature
  
    const handleGoToPosts = () => {
      setView('posts');
      setKey(Date.now()); // Generate a unique key for the Posts component
    };
  
    const handleGoToProfile = (userId) => {
      userId ? setUserId(userId) : setUserId(context.userAuth);
      setView('profile');
    };
  
    const handleGoToFavs = () => setView('favs');
  
    const handleLogout = () => {
      delete context.userAuth;
      onLoggedOut();
    };
  
    const handleSubmitPost = () => {
      //TODO don't close modal until post is submited
      handleCloseModal();
      handleGoToPosts();
    };
  
    return (
      <div className="home">
        <Navbar onLogoutClick={handleLogout} onProfileClick={handleGoToProfile} onFavsClick={handleGoToFavs} onHomeClick={handleGoToPosts} />
        <main className="home-page__main">
          {view === 'posts' && (<Posts key={key} type={'home'} onEditPost={handleOpenEditPostModal} onAuthorProfile={handleGoToProfile}/>)}
          {view === 'profile' && <Profile userId={userId} onEditPost={handleOpenEditPostModal} onDeleteAccount={handleLogout} />}
          {view === 'favs' && (<Posts type={'favs'} onEditPost={handleOpenEditPostModal} onAuthorProfile={handleGoToProfile}/>)}
          {modal === 'new-post' && <NewPost onCancel={handleCloseModal} onPostCreated={handleSubmitPost} />}
          {modal === 'edit-post' && <EditPost onCancel={handleCloseModal} postId={postId} onPostUpdated={handleSubmitPost} onDeleteModal={handleOpenDeletePostModal} />}
          {modal === 'delete-post' && <DeletePost onCancel={handleCloseModal} postId={postId} onDelete={handleSubmitPost}/>}
        </main>
        <div className="home-page__new-post">
          <button className="home-page__new-post--button">
            <svg className="home-page__new-post--svg" onClick={handleOpenNewPostModal} xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
              <path d={svg.plus} />
            </svg>
          </button>
        </div>
      </div>
    );
  }
  
export default inLogger(Home);

