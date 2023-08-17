import inLogger from '../inLogger';
import ColorForm from '../components/forms/ColorForm';
import AvatarForm from '../components/forms/AvatarForm';

const Customize = ({ setUpdateUserInfo }) => {

    return (
        <section>
            <div className="flex flex-col items-center justify-center px-4 pt-24 pb-16" >
                <h1 className="text-3xl font-bold text-center pt-5 text-secondary300">Customize your profile</h1>
                <ColorForm setUpdateUserInfo={setUpdateUserInfo} />
                <h1 className="text-2xl font-bold text-center pt-10 text-secondary300">Chose your maze rider</h1>
                <AvatarForm setUpdateUserInfo={setUpdateUserInfo} />
            </div>
        </section>
    );
}

export default inLogger(Customize);
