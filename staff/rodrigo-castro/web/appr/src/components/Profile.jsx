import PropTypes from 'prop-types'
import { Component } from 'react'

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
        return <section className="modal-window" name="modal-profile-options">
            <div className="modal-profile-options">
                
                <ul className="profile-options">
                    <li>My profile</li>
                    <li>Settings</li>
                    <li className="change-email" onClick={this.handleChangeEmail}>Change email</li>
                    <li className="change-password" onClick={this.handleChangePassword}>Change password</li>
                    <li className="change-avatar" onClick={this.handleChangeAvatar}>Change avatar</li>
                </ul>
                <button className="submit-buttons close-profile-options" type="button" onClick={this.handleCancel}>Cancel</button>
            </div>
        </section>
    }

}