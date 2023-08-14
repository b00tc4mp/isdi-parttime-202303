import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useMemo } from "react";

const API_KEY = 'AIzaSyAHtNeBELo0YBI0lmCVbd0lQ9BGTVd_fhQ'

export default function Workspot({ workspot : {
    image, name, location, description, type, features, reviews, likes, author}}){
    
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: API_KEY,
    });

    const center = useMemo(() => ({
        lat: location.mapLocation.coordinates[0],
        lng: location.mapLocation.coordinates[1]
    }), []);

    return (
        <div className="flex justify-center items-center h-full">
            <article className="flex-col bg-white shadow-lg w-1/2 p-10 rounded-lg">
            <img src={image} alt={name} className="w-full mb-4 rounded-lg" />
            <div className="flex items-center mb-4">
                <img className="w-8 h-8 mr-2 rounded-full" src={author.avatar} alt={`${author.name}'s Avatar`} />
                <h1 className="text-sm font-bold">{author.name}</h1>
            </div>
            <h2 className="text-xl font-bold mb-2">{name}</h2>
            <p className="mb-4">{description}</p>
            <p className="mb-2">Location: {location.street}, {location.city}, {location.country}</p>
            <p className="mb-2">
                District:
                {location.districts.ciutatVella && "Ciutat Vella"}
                {location.districts.gracia && "Gràcia"}
                {location.districts.horta && "Horta"}
                {location.districts.lEixample && "L'Eixample"}
                {location.districts.lesCorts && "Les Corts"}
                {location.districts.nouBarris && "Nou Barris"}
                {location.districts.santAndreu && "Sant Andreu"}
                {location.districts.santMarti && "Sant Marti"}
                {location.districts.santsMontjuic && "Sants-Montjuïc"}
                {location.districts.sarriaSantGervasi && "Sarrià-Sant Gervasi"}
            </p>
            
            <p className="mb-2">Type: {Object.keys(type).filter(key => type[key])}</p>
            <p className="mb-2 font-semibold">Features:</p>
            <ul className="list-disc pl-6 mb-4">
                {features.wifi.unlimitedFree && <li>Wifi: Unlimited free</li>}
                {features.wifi.timeLimited && <li>Wifi: Time limited</li>}
                {features.wifi.timeLimitedWithPurchase && <li>Wifi: Time limited with purchase</li>}
                {features.wifi.paidOptions && <li>Wifi: Paid options</li>}
                {features.wifi.unavailable && <li>Wifi: Unavailable</li>}
                {features.plugs.none && <li>Plugs: None</li>}
                {features.plugs.few && <li>Plugs: Few</li>}
                {features.plugs.plenty && <li>Plugs: Plenty</li>}
                {features.noise.quiet && <li>Noise: Quiet</li>}
                {features.noise.moderate && <li>Noise: Moderate</li>}
                {features.noise.loud && <li>Noise: Loud</li>}
                {features.accessibility && <li>Accessibility: Accessible</li>}
                {features.petFriendly && <li>Pet Friendly</li>}
                {features.ensuiteKitchen && <li>Ensuite kitchen</li>}
                {features.onSiteRestaurant && <li>On site restaurant</li>}
                {features.meetingRooms && <li>Meeting rooms</li>}
                {features.parking && <li>Parking</li>}
                {features.bikeRack && <li>Bike rack</li>}
                {features.storage && <li>Storage</li>}
                {features.printScanCopy && <li>Print/Scan/Copy</li>}
                {features.projector && <li>Projector</li>}
            </ul>
            <p className="mb-2 font-semibold">Reviews:</p>
            <ul className="list-disc pl-6 mb-10">
                {reviews.map((review, index) => (
                    <li key={index}>{review}</li>
                ))}
            </ul>
            <div className="w-full h-96 rounded-lg">
            {!isLoaded ? (
                <h1>Loading...</h1>
            ) : (
                <GoogleMap zoom={15} center={center} mapContainerStyle={{ width: "100%", height: "100%" }}>

                <Marker position={{ lat: center.lat, lng: center.lng }} />

                </GoogleMap>
                )}
            </div>
        </article>
        </div>

    );
}
