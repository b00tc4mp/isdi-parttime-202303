import { useState } from 'react';
import AvatarForm from './Forms/AvatarForm';
import MailForm from './Forms/MailForm';
import NameForm from './Forms/NameForm';
import PasswordForm from './Forms/PasswordForm';
import DeleteForm from './Forms/DeleteForm';
import './Settings.css'
import { svg } from '../../../../assets/svg-paths';


export default function Settings({onAvatarChange}) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
  
    const handleOptionSelect = (option) => {
      setSelectedOption(selectedOption === option ? null : option);
    };

    const handleOnSaveClick = () => {
        setSelectedOption(null);
    }
  
    const handleAvatarChange = (selectedAvatar) => {
        setSelectedAvatar(selectedAvatar);
        onAvatarChange(selectedAvatar);
      };
  
    const renderSettingsContent = () => {
      switch (selectedOption) {
        case 'name':
          return <NameForm onSaveClick={handleOnSaveClick} />; //TODO update on profile card too
        case 'avatar':
          return <AvatarForm onAvatarChange={handleAvatarChange} onSaveClick={handleOnSaveClick}/>;
    case 'mail':
        return <MailForm />
    case 'password':
        return <PasswordForm />
    case 'delete':
        return <DeleteForm />
    default:
        return null
            
        }
    };

    return (
        <section className="profile-settings">
            <h1 className="profile-settings__title">What do you want to change?</h1>
            <div className="profile-settings__menu">
                <button className="profile-settings__selection" onClick={() => handleOptionSelect('name')}>
                    Name
                    <svg className="profile-settings__selection--icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d={selectedOption === 'name' ? svg.expandLess : svg.expandMore}/></svg>
                </button>
                {selectedOption === 'name' && renderSettingsContent()}
                <button className="profile-settings__selection" onClick={() => handleOptionSelect('avatar')}>
                    Avatar
                    <svg className="profile-settings__selection--icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d={selectedOption === 'avatar' ? svg.expandLess : svg.expandMore}/></svg>
                </button>
                {selectedOption === 'avatar' && renderSettingsContent()}
                <button className="profile-settings__selection" onClick={() => handleOptionSelect('mail')}>
                    Mail
                    <svg className="profile-settings__selection--icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d={selectedOption === 'mail' ? svg.expandLess : svg.expandMore}/></svg>
                </button>
                {selectedOption === 'mail' && renderSettingsContent()}
                <button className="profile-settings__selection" onClick={() => handleOptionSelect('password')}>
                    Password
                    <svg className="profile-settings__selection--icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d={selectedOption === 'password' ? svg.expandLess : svg.expandMore}/></svg>
                </button>
                {selectedOption === 'password' && renderSettingsContent()}
                <button className="profile-settings__selection" onClick={() => handleOptionSelect('delete')}>
                    Delete my account
                    <svg className="profile-settings__selection--icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d={selectedOption === 'delete' ? svg.expandLess : svg.expandMore}/></svg>
                </button>
                {selectedOption === 'delete' && renderSettingsContent()}  
            </div>
        </section>
    );
}
