import { useEffect, useState, useContext } from "react"
import retrievePlaygrounds from "../../logic/playgrounds/retrievePlaygrounds"
import NearbyPlayground from "./NearbyPlayground"
import { View, ScrollView } from "react-native"
import retrieveUser from "../../logic/retrieveUser"

export default function NearbyPlaygrounds({ onMarkerPressedHandler }) {
    const userId = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDk0ODAwM2JmMTJmMTNmNmIxY2I4NTIiLCJpYXQiOjE2OTA5MjcxMjAsImV4cCI6MTc3NzI0MDcyMH0._fnTXb6GDqSip-kJiF_cao2b4WwVqraR_cpqsrco76k"
    const [playgrounds, setPlaygrounds] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        console.log('Refresh Posts -> render in useEffect')
        try {
            console.log('   Show all Posts -> render in useEffect onLoad compo')
            retrievePlaygrounds(userId)
                .then(playgrounds => {
                    setPlaygrounds(playgrounds)
                })
                .catch(error => {
                    alert(error.message)
                })
            retrieveUser(userId)
                .then(user => setUser(user))
                .catch(error => {
                    alert(error.message)
                })
        } catch (error) {
            alert(error.message)
        }
    }, [])




    return <>
        {/* <View
            className="playgrounds" key={false}
        > */}
        <View
            className=" flex-row relative"
        >
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pr-5">
                {playgrounds && playgrounds.map(playground => {
                    return <View className="w-[28vw] mr-3 last:mr-12" ><NearbyPlayground
                        key={playground._id}
                        playground={playground}
                        user={user}
                        onMarkerPressedHandler={onMarkerPressedHandler}
                    />
                    </View>
                })}
            </ScrollView>

        </View>

        {/* </View> */}
    </>

}