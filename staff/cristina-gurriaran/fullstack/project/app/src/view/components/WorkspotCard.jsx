import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useState } from 'react'
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
import WorkspotCardDetailed from "./WorkspotCardDetailed";
import AddReviewModal from './AddReviewModal'
import EditWorkspotModal from "./EditWorkspotModal";


export default function WorkspotCard({ workspot: {
    id, image, name, location, description, category, features, likes, reviews, author, fav }, onWorkspotEdited, onReviewAdded, onWorkspotDeleted, onToggledLikeWorkspot, onToggledSavedWorkspot }) {

    const handleErrors = useHandleErrors()

    const [view, setView] = useState('cards')
    const [modal, setModal] = useState(null)
    const [workspotId, setworkspotId] = useState(id)
    const [lastWorkspotsUpdate, setLastWorkspotsUpdate] = useState(null)

    const handleWorkspotUpdated = () => {
        setModal(null)
        setLastWorkspotsUpdate(Date.now())
        onReviewAdded()
    }


    const handleOpenEditWorkspotModal = (workspotId) => {
        setModal('edit-workspot')
        setworkspotId(workspotId)
        onWorkspotEdited()
    }

    const handleAddReviewModal = (workspotId) => {
        setModal('add-review')
        setworkspotId(workspotId)
    }

    const handleCloseModal = () => setModal(null)

    const workspot = { id, image, name, location, description, category, features, likes, reviews, author, fav }


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

    const handleOpenDetailedCard = event => {
        event.preventDefault()
        setView('WorkspotDetails')
    }

    const handleCloseDetailedCard = () =>setView('cards')

    const isCurrentUserPost = isCurrentUser(author.id)
    return (
        <>
            {view === "cards" && (
                <div>
                    <div className="max-w-2xl overflow-hidden bg-white rounded-lg shadow-md pb-4" onClick={handleOpenDetailedCard}>
                        <article>
                            <div className="relative">
                                <div className="absolute right-0 p-4 flex flex-row gap-4">
                                    <button onClick={handleToggleLikeWorkspot}>{likes.includes(getUserId()) ? <RedHeartIcon /> : <HeartIcon />}</button>
                                    <button onClick={handleToggleSaveWorkspot}>{fav ? <FavSolidIcon /> : <FavRegularIcon />}</button>
                                </div>

                                <img
                                    className="object-cover w-full h-64"
                                    src={image}
                                    alt={name}
                                />
                            </div>

                            <div className="pt-6 px-6">
                                <div>
                                    <button className="text-xl font-bold mb-2">{name}</button>
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

                                <div className="flex flex-col px-4 pt-4 pb-2">
                                    <span className="flex flex-row gap-2">
                                        <WifiIcon />
                                        <h2 className="text-gray-dark font-bold">
                                            {Object.keys(features.wifi).map(wifiOption => features.wifi[wifiOption] && formatWifi(wifiOption))}
                                        </h2>
                                    </span>
                                    <p className="ml-8 text-gray">
                                        {Object.keys(features.wifi).map(wifiOption => features.wifi[wifiOption])}
                                    </p>
                                </div>

                                <div className="flex flex-col px-4 pt-4 pb-2">
                                    <span className="flex flex-row gap-2">
                                        <PlugIcon />
                                        <h2 className="text-gray-dark font-bold">
                                            {Object.keys(features.plugs).map(plugOption => features.plugs[plugOption] && formatPlugs(plugOption))}
                                        </h2>
                                    </span>
                                    <p className="ml-8 text-gray">
                                        {Object.keys(features.plugs).map(plugOption => features.plugs[plugOption])}
                                    </p>
                                </div>

                                <div className="flex flex-col px-4 pt-4 pb-2">
                                    <span className="flex flex-row gap-2">
                                        <NoiseIcon />
                                        <h2 className="text-gray-dark font-bold">
                                            {Object.keys(features.noise).map(noiseOption => features.noise[noiseOption] && formatNoise(noiseOption))}
                                        </h2>
                                    </span>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            )}

            {view === 'WorkspotDetails' && (
                <WorkspotCardDetailed
                    workspot={workspot}
                    onEditWorkspot={handleOpenEditWorkspotModal}
                    onAddReview={handleAddReviewModal} 
                    onToggledLikeWorkspot={onToggledLikeWorkspot}
                    onToggledSavedWorkspot={onToggledSavedWorkspot}
                    onWorkspotDeleted={onWorkspotDeleted}
                    onCancel={handleCloseDetailedCard}

                />
            )}

            {modal === 'edit-workspot' &&
                <EditWorkspotModal
                    onCancel={handleCloseModal}
                    onWorkspotEdited={handleWorkspotUpdated}
                    workspotId={workspotId}
                />}

            {modal === 'add-review' &&
                <AddReviewModal
                    onCancel={handleCloseModal}
                    onReviewAdded={handleWorkspotUpdated}
                    workspotId={workspotId}
                />} 


        </>
    );
}