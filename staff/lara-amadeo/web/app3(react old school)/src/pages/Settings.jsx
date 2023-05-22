import { Component } from "react/index.js"
import SettingsMenu from "../components/settings/settingsMenu.jsx"
import UpdateEmail from "../components/settings/UpdateEmail.jsx"
import UpdatePassword from "../components/settings/UpdatePassword.jsx"
import UpdateAvatar from "../components/settings/UpdateAvatar.jsx"

export default class Settings extends Component{
    constructor(props){
        super(props)
    
        this.state = { view: 'menu' }
    }

    handleGoToUpdateEmail = () => {
        this.setState({ view: 'email' })
    }

    handleGoToUpdatePassword = () => {
        this.setState({ view: 'password' })
    }

    handleGoToUpdateAvatar = () => {
        this.setState({ view: 'avatar' })
    }

    returnToSettingsMenu = () => {
        this.setState({ view: 'menu' })

        this.props.onSidebarUpdates()
    }

    render(){
    return <div className="settings">
    <div className="header">
        <p className="heading-M-bold">Settings</p>
    </div>
    <div className="centered-content-container">
        {this.state.view === 'menu' && <SettingsMenu onEmailRowClick={this.handleGoToUpdateEmail} onPasswordRowClick={this.handleGoToUpdatePassword} onAvatarRowClick={this.handleGoToUpdateAvatar} />}
        {this.state.view === 'email' && <UpdateEmail onSaveUpdateEmailClick={this.returnToSettingsMenu} onCancelUpdateEmailClick={this.returnToSettingsMenu}/>} 
        {this.state.view === 'password' && <UpdatePassword onSaveUpdatePasswordClick={this.returnToSettingsMenu} onCancelUpdatePasswordClick={this.returnToSettingsMenu}/>}
        {this.state.view === 'avatar' && <UpdateAvatar onSaveUpdateAvatarClick={this.returnToSettingsMenu} onCancelUpdateAvatarClick={this.returnToSettingsMenu} />}
    </div>
    </div>
    }
}
