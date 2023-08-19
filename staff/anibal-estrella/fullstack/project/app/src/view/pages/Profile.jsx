import { useEffect, useState } from 'react';
import registerUser from '../../logic/users/registerUser';
import retrieveArtistDetailsFromDiscogs from '../../logic/retrieveArtistDetailsFromDiscogs';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Profile = () => {
    const [Profile, setProfile] = useState(null);
    const [error, setError] = useState(null); // Add state for error

    return (
        <div>

            {error && <p className=" bg-lime-200">{error}</p>}

            <h1>Name Profile</h1>


        </div>
    );
};

export default Profile;
