
import React, { useEffect, useState } from 'react';
import retrievePlacesList from '../../src/logic/retrievePlacesList';

const searchPlace = () => {
    const [placeName, setPlaceName] = useState('');
    const [placeDetails, setPlaceDetails] = useState(null);

    const handleInputChange = (event) => {
        setPlaceName(event.target.value);
    };

    const handleRetrieveDetails = async () => {
        try {
            const details = await retrievePlacesList(placeName);
            setPlaceDetails(details);
        } catch (error) {
            console.error('Error:', error);
            setPlaceDetails(null);
        }
    };

    return (
        <div>
            <h1>add a place</h1>
            <input
                type="text"
                value={placeName}
                onChange={handleInputChange}
                placeholder="Enter place name"
            />
            <button onClick={handleRetrieveDetails}>Search for a place</button>

            {placeDetails && (
                <div>
                    <ul>Result:</ul>

                    <table>
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>city</th>
                                <th>web</th>
                                <th>action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {placeDetails.slice(0, 5).map((item) => (
                                <React.Fragment key={item.placeId}>
                                    <tr >
                                        <td>{item.name}</td>
                                        <td>{item.city}</td>
                                        <td>{item.homePage}</td>
                                        <td>
                                            <button>select</button>
                                        </td>
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </div >
            )}
        </div >
    );

};

export default searchPlace;
