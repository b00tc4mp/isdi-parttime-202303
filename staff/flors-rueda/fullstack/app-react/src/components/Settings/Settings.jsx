import { useState, useContext } from 'react';
import AvatarForm from '../forms/AvatarForm';
import MailForm from '../forms/MailForm';
import NameForm from '../Forms/NameForm';
import PasswordForm from '../forms/PasswordForm';
import DeleteForm from '../forms/DeleteForm';
import './Settings.css';
import { svg } from '../../../public/svg-paths';
import inLogger from '../../inLogger';
import Loader from '../loader/Loader';
import Context from '../../Context';

const Settings = ({ onAvatarChange, onDeleteAccount, user }) => {
    const { alert } = useContext(Context);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleOptionSelect = (option) => {
        setIsLoading(true)
        try {
            setSelectedOption(selectedOption === option ? null : option);
            setIsLoading(false)
        } catch (error) {
            alert(`settings error ${error.message}`)
            setIsLoading(false)
        }
    };

    const handleOnSaveClick = (option) => {
        setIsLoading(true)
        try {
            setSelectedOption(selectedOption === option ? null : option);
            setIsLoading(false)
        } catch (error) {
            alert(`settings error ${error.message}`)
            setIsLoading(false)
        }

    }

    const handleAvatarChange = (selectedAvatar) => {
        setSelectedAvatar(selectedAvatar);
        onAvatarChange(selectedAvatar);
    };

    const handleOnDeleteClick = () => {
        onDeleteAccount();
    }

    const renderSettingsContent = () => {
        switch (selectedOption) {
            case 'name':
                return <NameForm onSaveClick={handleOnSaveClick} user={user} />; //TODO update on profile card too
            case 'avatar':
                return <AvatarForm onAvatarChange={handleAvatarChange} onSaveClick={handleOnSaveClick} user={user} />;
            case 'mail':
                return <MailForm onSaveClick={handleOnSaveClick} user={user} />
            case 'password':
                return <PasswordForm onSaveClick={handleOnSaveClick} />
            case 'delete':
                return <DeleteForm onDeleteClick={handleOnDeleteClick} />
            default:
                return null

        }
    };

    if (isLoading) {
        return <Loader />
    }

    return <section className="profile-settings">
        <h1 className="profile-settings__title">What do you want to change?</h1>
        <div className="profile-settings__menu">
            <button className="profile-settings__selection" onClick={() => handleOptionSelect('avatar')}>
                Avatar
                <svg className="profile-settings__selection--icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d={selectedOption === 'avatar' ? svg.expandLess : svg.expandMore} /></svg>
            </button>
            {selectedOption === 'avatar' && renderSettingsContent()}
            <div className="profile-settings__separetor" />
            <button className="profile-settings__selection" onClick={() => handleOptionSelect('name')}>
                Name
                <svg className="profile-settings__selection--icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d={selectedOption === 'name' ? svg.expandLess : svg.expandMore} /></svg>
            </button>
            {selectedOption === 'name' && renderSettingsContent()}
            <div className="profile-settings__separetor" />
            <button className="profile-settings__selection" onClick={() => handleOptionSelect('mail')}>
                Mail
                <svg className="profile-settings__selection--icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d={selectedOption === 'mail' ? svg.expandLess : svg.expandMore} /></svg>
            </button>
            {selectedOption === 'mail' && renderSettingsContent()}
            <div className="profile-settings__separetor" />
            <button className="profile-settings__selection" onClick={() => handleOptionSelect('password')}>
                Password
                <svg className="profile-settings__selection--icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d={selectedOption === 'password' ? svg.expandLess : svg.expandMore} /></svg>
            </button>
            {selectedOption === 'password' && renderSettingsContent()}
            <div className="profile-settings__separetor" />
            <button className="profile-settings__selection" onClick={() => handleOptionSelect('delete')}>
                Delete my account
                <svg className="profile-settings__selection--icon" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path d={selectedOption === 'delete' ? svg.expandLess : svg.expandMore} /></svg>
            </button>
            {selectedOption === 'delete' && renderSettingsContent()}
            <div className="profile-settings__separetor" />
        </div>
    </section>
}

export default inLogger(Settings)
