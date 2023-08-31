import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";
import { Container, Form, Input, Button, TextArea, Label } from '../library'
import { formatCategory, formatOtherFeatures, formatDistrict, formatWifi, formatPlugs, formatNoise } from './helpers/dataFormatters'
import { getWifiDescriptions, getPlugDescriptions, getNoiseDescriptions } from './helpers/dataDescriptions'
import { useAppContext, useHandleErrors } from '../hooks'
import deleteWorkspot from "../../logic/deleteWorkspot"
import toggleLikeWorkspot from "../../logic/toggleLikeWorkspot"
import toggleFavWorkspot from "../../logic/toggleFavWorkspot"
import getUserId from '../../logic/getUserId'
import isCurrentUser from '../../logic/isCurrentUser'
import { WheelchairIcon, PetFriendlyIcon, KitchenIcon, RestaurantIcon, MeetingRoomsIcon, ParkingIcon, BikeRackIcon, StorageIcon, PrintIcon, ProjectorIcon, WindowViewIcon, WifiIcon, PlugIcon, NoiseIcon, LocationIcon, HeartIcon, RedHeartIcon, FavSolidIcon, FavRegularIcon, EditIcon, DeleteIcon } from "../library/Icons";
import { dateFormater } from "./helpers/dateFormatter";

const API_KEY = 'AIzaSyAHtNeBELo0YBI0lmCVbd0lQ9BGTVd_fhQ'

export default function Workspot({ workspot: {
    id, image, name, location, description, category, features, likes, reviews, author, fav }, onEditWorkspot, onWorkspotDeleted, onToggledLikeWorkspot, onToggledSavedWorkspot, onAddReview }) {

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
        try {
            handleErrors(async () => {
                await deleteWorkspot(id)
                onWorkspotDeleted()
            })
        } catch (error) {
            alert(error.message)
        }
    }

    const handleToggleLikeWorkspot = () => {
        try {
            handleErrors(async () => {
                await toggleLikeWorkspot(id)
                onToggledLikeWorkspot()
            })
        } catch (error) {
            alert(error.message)
        }

    }

    const handleToggleSaveWorkspot = () => {
        try {
            handleErrors(async () => {
                await toggleFavWorkspot(id)
                onToggledSavedWorkspot()
            })
        } catch (error) {
            alert(error.message)
        }
    }


    const isCurrentUserPost = isCurrentUser(author.id)

    return (
        <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md" >
            <article>
                <div className="relative">
                    <div className="absolute right-0 p-4 flex flex-row gap-4">
                        <button onClick={handleToggleLikeWorkspot}>{likes.includes(getUserId()) ? <RedHeartIcon /> : <HeartIcon />}</button>
                        <button onClick={handleToggleSaveWorkspot}>{fav ? <FavSolidIcon /> : <FavRegularIcon />}</button>
                    </div>

                    <img
                        className="object-cover w-full h-84"
                        src={image}
                        alt={name}
                    />
                </div>


                <div className="relative pt-6 px-6">
                    <div className="absolute right-0 mr-8">
                        <div className="flex items-center mb-4">
                            <img className="w-8 h-8 mr-2 rounded-full" src={author.avatar} alt={`${author.name}'s Avatar`} />
                            <h1 className="text-sm text-gray-dark">{author.name}</h1>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-xl font-bold mb-2">{name}</h1>
                        <h2 className="text-lg text-gray-dark">
                            {Object.keys(category).map(categoryOption =>
                                category[categoryOption] && formatCategory(categoryOption))}
                        </h2>
                        <span className="mt-2 text-sm text-gray-dark">
                            {Object.keys(location.districts).map(district =>
                                location.districts[district] && formatDistrict(district))}, {location.city}
                        </span>
                    </div>
                </div>

                <div className="pt-6 px-6">
                    <div className="mb-5 border-t-2 border-gray-light"></div>
                    <p className="text-sm text-gray-dark">{description}</p>
                </div>

                <div className="pt-6 px-6">
                    <div className="mb-5 border-t-2 border-gray-light"></div>
                    <h1 className="text-xl font-bold">Workspace Essentials</h1>

                    <div className="flex flex-col px-4 pt-4 pb-2">
                        <span className="flex flex-row gap-2">
                            <WifiIcon />
                            <h2 className="text-gray-dark font-bold">
                                Wifi : {Object.keys(features.wifi).map(wifiOption => features.wifi[wifiOption] && formatWifi(wifiOption))}
                            </h2>
                        </span>
                        <p className="ml-8 text-gray">
                            {Object.keys(features.wifi).map(wifiOption => features.wifi[wifiOption] && getWifiDescriptions(wifiOption))}
                        </p>
                    </div>

                    <div className="flex flex-col px-4 pt-4 pb-2">
                        <span className="flex flex-row gap-2">
                            <PlugIcon />
                            <h2 className="text-gray-dark font-bold">
                                Plugs : {Object.keys(features.plugs).map(plugOption => features.plugs[plugOption] && formatPlugs(plugOption))}
                            </h2>
                        </span>
                        <p className="ml-8 text-gray">
                            {Object.keys(features.plugs).map(plugOption => features.plugs[plugOption] && getPlugDescriptions(plugOption))}
                        </p>
                    </div>

                    <div className="flex flex-col px-4 pt-4 pb-2">
                        <span className="flex flex-row gap-2">
                            <NoiseIcon />
                            <h2 className="text-gray-dark font-bold">
                                Noise : {Object.keys(features.noise).map(noiseOption => features.noise[noiseOption] && formatNoise(noiseOption))}
                            </h2>
                        </span>
                        <p className="ml-8 text-gray">
                            {Object.keys(features.noise).map(noiseOption => features.noise[noiseOption] && getNoiseDescriptions(noiseOption))}
                        </p>
                    </div>
                </div>

                <div className="pt-6 px-6">
                    <div className="mb-5 border-t-2 border-gray-light"></div>
                    <h1 className="text-xl font-bold">Other features</h1>
                    <ul className="text-gray-dark flex flex-col gap-4 px-4 pt-4 pb-2">
                        {Object.keys(features.otherFeatures).map(OtherFeaturesOption =>
                            features.otherFeatures[OtherFeaturesOption] && (
                                <li className="flex flex-row gap-2"
                                    key={OtherFeaturesOption}>
                                    {OtherFeaturesOption === 'accessibility' && <WheelchairIcon />}
                                    {OtherFeaturesOption === 'petFriendly' && <PetFriendlyIcon />}
                                    {OtherFeaturesOption === 'ensuiteKitchen' && <KitchenIcon />}
                                    {OtherFeaturesOption === 'onSiteRestaurant' && <RestaurantIcon />}
                                    {OtherFeaturesOption === 'meetingRooms' && <MeetingRoomsIcon />}
                                    {OtherFeaturesOption === 'parking' && <ParkingIcon />}
                                    {OtherFeaturesOption === 'bikeRack' && <BikeRackIcon />}
                                    {OtherFeaturesOption === 'storage' && <StorageIcon />}
                                    {OtherFeaturesOption === 'printScanCopy' && <PrintIcon />}
                                    {OtherFeaturesOption === 'projector' && <ProjectorIcon />}
                                    {OtherFeaturesOption === 'windowView' && <WindowViewIcon />}
                                    {formatOtherFeatures(OtherFeaturesOption)}
                                </li>
                            ))}
                    </ul>
                </div>

                <div className="py-6 px-6">
                    <div className="mb-5 border-t-2 border-gray-light"></div>

                    <h1 className="text-xl font-bold">Location</h1>

                    <span className="flex flex-row gap-2 px-4 pt-4 pb-4">
                        <LocationIcon />
                        <p>{location.street}, {location.city}, {location.country}</p>
                    </span>

                    <div className="w-full h-96 rounded-lg">
                        {!isLoaded ? (
                            <h1>Loading...</h1>
                        ) : (
                            <GoogleMap zoom={15} center={center} mapContainerStyle={{ width: "100%", height: "100%" }}>

                                <Marker position={{ lat: center.lat, lng: center.lng }} />
                            </GoogleMap>
                        )}
                    </div>
                </div>

          
                {reviews ? (
                    <div className="py-6 px-6">
                        <div className="mb-5 border-t-2 border-gray-light"></div>
                        <div className="flex flex-row justify-between mb-8">
                            <h1 className="text-xl font-bold">Reviews</h1>
                            <Button className="w-max" onClick={handleAddReview}>Add review </Button>
                        </div>

                        <div className="h-80 overflow-auto">
                            <div className="flex flex-col gap-4">

                            {reviews.map(review => (
                                <div
                                    key={review.id}
                                    className="p-8 bg-white rounded-md border-2 border-gray-light"
                                >
                                    <p className="leading-loose text-gray-dark">{review.text}</p>

                                    <div className="flex items-center mt-6">
                                        <img className="object-cover rounded-full w-14 h-14" src={review.author.avatar} alt={`${author.name}'s Avatar`} />

                                        <div className="mx-2">
                                            <h1 className="font-semibold text-gray-dark">{review.author.name}</h1>
                                            <p className="text-sm text-gray">{dateFormater(review.date)}</p>

                                        </div>
                                    </div>
                                </div>
                            ))}
                            </div>
                        </div>
                    </div>) : (

                        <div className="py-6 px-6">
                            <div className="mb-5 border-t-2 border-gray-light"></div>
                            <div className="flex flex-col justify-between">
                                <h1 className="text-xl font-bold">No reviews</h1>
                                <div className="flex flex-row justify-between items-center">
                                    <h2 className="text-md text-gray">Lead the way and help fellow workers by sharing your thoughts!</h2>
                                    <Button className="w-max" onClick={handleAddReview}>Add review </Button>
                                </div>

                            </div>
                        </div>
                    )
                }

                {isCurrentUser ? (
                    <div className="py-6 px-6 flex flex-row gap-4">
                        <div className="mb-5 border-t-2 border-gray-light"></div>

                        <Button
                            className="w-1/2 flex items-center justify-center gap-4"
                            onClick={handleEditWorkspot}>
                            <EditIcon />Edit Workspot
                        </Button>

                        <Button
                            className="w-1/2 flex items-center justify-center gap-4"
                            onClick={handleDeleteWorkspot}>
                            <DeleteIcon />Delete Workspot
                        </Button>
                    </div>
                ) : ( null ) }

            </article>
        </div>

    )
}
