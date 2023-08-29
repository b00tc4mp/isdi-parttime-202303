import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { Container, Form, Input, Button, TextArea, Label } from '../library'
import { formatCategory, formatOtherFeatures, formatDistrict, formatWifi, formatPlugs, formatNoise } from './helpers/dataFormatters'
import { useAppContext, useHandleErrors } from '../hooks'
import deleteWorkspot from "../../logic/deleteWorkspot"
import toggleLikeWorkspot from "../../logic/toggleLikeWorkspot"
import toggleFavWorkspot from "../../logic/toggleFavWorkspot"
import getUserId from '../../logic/getUserId'
import isCurrentUser from '../../logic/isCurrentUser'



const API_KEY = 'AIzaSyAHtNeBELo0YBI0lmCVbd0lQ9BGTVd_fhQ'

export default function Workspot({ workspot : {
    id, image, name, location, description, category, features, likes, reviews, author, fav }, onEditWorkspot, onWorkspotDeleted, onToggledLikeWorkspot, onToggledSavedWorkspot, onAddReview }){
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: API_KEY,
    });

    const center = useMemo(() => ({
        lat: location.mapLocation.coordinates[0],
        lng: location.mapLocation.coordinates[1]
    }), []);

    const handleErrors = useHandleErrors()


    const handleEditWorkspot = () => onEditWorkspot(id)

    const handleAddReview = () => onAddReview(id)

    const handleDeleteWorkspot = () => {
        try{
            handleErrors(async () => {
                await deleteWorkspot(id)
                onWorkspotDeleted()
            })
        }catch(error){
            alert(error.message)
        }
    }

    const handleToggleLikeWorkspot = () => {
        try{
            handleErrors(async() => {
                await toggleLikeWorkspot(id)
                onToggledLikeWorkspot()
            })
        }catch(error){
            alert(error.message)
        }
        
    }

    const handleToggleSaveWorkspot = () => {
        try{
            handleErrors(async () => {
                await toggleFavWorkspot(id)
                onToggledSavedWorkspot()
            })
        }catch(error){
            alert(error.message)
        }
    }


    const isCurrentUserPost = isCurrentUser(author.id)

    return (
        <div className = "bg-white shadow-lg w-1/2 p-10 rounded-lg" >
            <article className="grid gap-2 grid-cols-1">
                <img src={image} alt={name} className=" w-full rounded-lg" />
            <div className="flex items-center mb-4">
                <img className="w-8 h-8 mr-2 rounded-full" src={author.avatar} alt={`${author.name}'s Avatar`} />
                <h1 className="text-sm font-bold">{author.name}</h1>
            </div>
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p>{description}</p>
            <p>Location: {location.street}, {location.city}, {location.country}</p>
            <p>
                District:
                {Object.keys(location.districts).map(district => 
                   location.districts[district] && formatDistrict(district))}
            </p>
            <p>
                Category:
                    {Object.keys(category).map(categoryOption => 
                        category[categoryOption] && formatCategory(categoryOption))}
            </p>
            
            <p className="font-semibold">Features:</p>
                <ul className="list-disc ml-6 ">
                    <li>Wifi:
                        {Object.keys(features.wifi).map(wifiOption =>
                            features.wifi[wifiOption] && formatWifi(wifiOption))}
                    </li>

                    <li>Plugs:
                        {Object.keys(features.plugs).map(plugOption =>
                            features.plugs[plugOption] && formatPlugs(plugOption))}
                    </li>

                    <li>Noise:
                        {Object.keys(features.noise).map(noiseOption =>
                            features.noise[noiseOption] && formatNoise(noiseOption))}
                    </li>

                    <li >Other Features:
                        {Object.keys(features.otherFeatures).map(OtherFeaturesOption =>
                            features.otherFeatures[OtherFeaturesOption] && (
                                <li className="ml-6" 
                                    key={OtherFeaturesOption}>
                                    {formatOtherFeatures(OtherFeaturesOption)}
                                </li>
                            )
                        )}
                    </li>
                </ul>

                {reviews && <div>
                    <p>Reviews:</p>
                    <div>
                        {reviews.map(review => (
                            <div key={review.id}>
                                <p>Author: {review.author.name}           
                                <img className="w-8 h-8 mr-2 rounded-full" src={review.author.avatar} alt={`${author.name}'s Avatar`} /> </p>
                                <p>Text: {review.text}</p>
                                <p>Date: {review.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
                }

            <div className="w-full h-96 rounded-lg">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap zoom={15} center={center} mapContainerStyle={{ width: "100%", height: "100%" }}>

                <Marker position={{ lat: center.lat, lng: center.lng }} />
                </GoogleMap>
                )}
            </div>
            
            {isCurrentUser && <Button onClick={handleEditWorkspot}>📝</Button>}
            {isCurrentUser && <Button onClick={handleDeleteWorkspot}>🗑</Button>}
            <Button onClick={handleAddReview}>Add review </Button>
            <button  onClick={handleToggleLikeWorkspot}>{likes.includes(getUserId()) ? '❤️' : '🤍'} ({likes ? likes.length : 0})</button>
            <button onClick={handleToggleSaveWorkspot}>{fav ? '⭐️' : '✩'}</button>



        </article>
        </div>

    );
}
