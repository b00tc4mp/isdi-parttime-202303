import PropTypes from 'prop-types'
import { Component } from 'react'
import { retrieveUser } from '../logic/retrieveUser'
import { context } from '../ui'

export default class Profile extends Component {
    constructor(props){
        super(props)

        Profile.propTypes = {
            onCancel: PropTypes.func,
            onChangeEmail: PropTypes.func,
            onChangePassword: PropTypes.func,
            onChangeAvatar: PropTypes.func
        }

        this.state = { modal: null }
    }

    handleCancel = () => this.props.onCancel()

    handleChangeEmail = () => this.props.onChangeEmail()

    handleChangePassword = () => this.props.onChangePassword()

    handleChangeAvatar = () => this.props.onChangeAvatar()

    render() {
        const user = retrieveUser(context.userId)

        return <section className="modal-window" name="modal-profile-options">
            <div className="modal-profile-options">
                <img src={user.avatar || 'https://i.pinimg.com/originals/f1/0f/f7/f10ff70a7155e5ab666bcdd1b45b726d.jpg'} alt="" className="user-avatar-big" onClick={this.handleChangeAvatar}/>
                <ul className="profile-options">
                    <li>My profile</li>
                    <li>Settings</li>
                    <li className="change-email" onClick={this.handleChangeEmail}>Change email</li>
                    <li className="change-password" onClick={this.handleChangePassword}>Change password</li>
                </ul>
                <button className="submit-buttons close-profile-options" type="button" onClick={this.handleCancel}>Cancel</button>
            </div>
        </section>
    }

}