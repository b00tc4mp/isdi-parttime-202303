import { Component } from 'react';
import Navbar from '../components/Navbar';
import { context } from '../ui/general-tools';
import Posts from '../components/Posts';
import { toggleLike } from '../logic/toggle-like';
import Profile from '../components/Profile';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { view: 'posts' };
    }

    handleGoToProfile = (event) => {
        event.preventDefault();
        this.setState({ view: 'profile' });
      }



    handleGoToPosts = () => this.setState({ view: 'posts' });

    handleLike = (postData) => {
        try {
            const result = toggleLike(postData, context.userAuth)
            return result
        } catch (error) {
            alert(error.message)
        }   
    }

    render() {
        return <div className="home">
            <Navbar onLogoutClick={this.props.onLogout} onProfileClick={this.handleGoToProfile} onHomeClick={this.handleGoToPosts} />
            <section className="home-page__main">
                {this.state.view === 'posts' && <Posts handleLike={this.handleLike} />}
                {this.state.view === 'profile' && <Profile />}
            </section>
        </div>
    }
}

