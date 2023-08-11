import { useEffect, useState } from 'react';
import retrieveArtistDetails from '../../logic/retrieveArtistDetails';
import retrieveArtistDetailsFromDiscogs from '../../logic/retrieveArtistDetailsFromDiscogs';
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'

const SearchArtist = () => {
    const [artistName, setArtistName] = useState('');
    const [SearchArtist, setSearchArtist] = useState(null);
    const [error, setError] = useState(null); // Add state for error

    const handleInputChange = (event) => {
        setArtistName(event.target.value);
    };

    // const handleRetrieveDetails = async () => {
    //     try {
    //         const details = await retrieveArtistDetails(artistName);
    //         setSearchArtist(details);
    //     } catch (error) {
    //         console.error('Error:', error);
    //         setSearchArtist(null);
    //     }
    // };

    const handleRetrieveDetails = async () => {
        try {
            const details = await retrieveArtistDetailsFromDiscogs(artistName);
            setSearchArtist(details);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setSearchArtist(null);
            setError(`Artist "${artistName}" was not found`);
        }
    };

    return (
        <div className='m-2'>
            <div className="flex flex-row w-full">
                <div className='relative w-full'>
                    <input type="text" value={artistName} onChange={handleInputChange} placeholder="Enter artist name" className='pl-8' />
                    <span className='absolute top-5 left-1 h-6 w-6  rounded-full'>
                        <MagnifyingGlassIcon className='text-gray-500 ' />
                    </span>
                </div>
                <button onClick={handleRetrieveDetails}>Retrieve Details</button>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {SearchArtist && !error && (
                <div>
                    {SearchArtist.image && (
                        <div className=''>
                            <img className='w-full object-cover aspect-square grayscale rounded-lg' src={SearchArtist.image} alt={SearchArtist.name} />
                        </div>
                    )}
                    <h2 className=' font-light text-5xl '>{SearchArtist.name}</h2>
                    {/* <h3>From: {SearchArtist.from}</h3> */}

                    {SearchArtist.bio && (
                        <div>
                            <h2>Artist Bio </h2>

                            <p dangerouslySetInnerHTML={{ __html: SearchArtist.bio }} />
                        </div>
                    )}
                    <div className="flex gap-6">
                        <div>
                            <h2>Albums</h2>
                            <ul>
                                {SearchArtist.albums.slice(0, 5).map((album, index) => (
                                    <li key={index}> {album}</li>
                                ))}
                                {SearchArtist.albums.length > 5 && <li><a href={SearchArtist.discogsUrl} target="_blank">more ...</a></li>}
                            </ul>
                        </div>

                        {SearchArtist.urls && (
                            <div>
                                <h3>Links</h3>
                                <ul>
                                    {SearchArtist.urls.map((url, index) => {
                                        const urlObject = new URL(url)
                                        const siteName = urlObject.hostname.replace('www.', '')
                                        return (
                                            <li key={index}>
                                                <a href={url} target="_blank">{siteName}</a>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className='pt-4 pr-2 flex justify-end' >
                        <a className='' href={SearchArtist.discogsUrl} target="_blank">Find more {SearchArtist.name}'s Info at Discogs.com</a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchArtist;
