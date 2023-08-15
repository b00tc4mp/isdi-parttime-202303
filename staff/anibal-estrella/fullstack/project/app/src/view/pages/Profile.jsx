import { useEffect, useState } from 'react';
import registerUser from '../../logic/users/registerUser';
import retrieveArtistDetailsFromDiscogs from '../../logic/retrieveArtistDetailsFromDiscogs';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const Profile = () => {
    const [Profile, setProfile] = useState(null);
    const [error, setError] = useState(null); // Add state for error

    return (
        <div>

            {error && <p className="text-red-500">{error}</p>}

            {Profile && !error && (
                <h1>Profile user</h1>

            )}
        </div>
    );
};

export default Profile;
