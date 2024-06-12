import { Component } from "react";
import ProfileInformation from "../components/profile/ProfileInformation";
import ProfileNavTab from "../components/profile/ProfileNavTab";
import ProfilePosts from "../components/profile/ProfilePosts";
import ProfileSavedPosts from "../components/profile/ProfileSavedPosts";


export default class Profile extends Component{
    constructor(props){
        super(props)

        this.state = { view: 'profilePosts' }
    }
    
    handleShowProfilePosts = () => {
        this.setState({ view: 'profilePosts' })
    }

    handleShowProfileSaved = () => {
        this.setState({ view: 'profileSaved' })
    }

    render(){
    return <div className="profile">
        <div className="header">
            <p className="heading-M-bold">Profile</p>
        </div>
        {<ProfileInformation />}
        {<ProfileNavTab state={this.state.view} onPostsTabClick={this.handleShowProfilePosts} onSavedTabClick={this.handleShowProfileSaved}/>}
        {this.state.view === 'profilePosts' && <ProfilePosts />}
        {this.state.view === 'profileSaved' && <ProfileSavedPosts />}

    </div>
    }
}