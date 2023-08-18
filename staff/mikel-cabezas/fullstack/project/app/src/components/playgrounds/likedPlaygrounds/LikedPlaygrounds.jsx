import { useEffect, useState, useContext } from "react"
import retrieveLikedPlaygrounds from "../../../logic/playgrounds/retrieveLikedPlaygrounds"
import LikedPlayground from "./LikedPlayground"
import { View, ScrollView } from "react-native"
import retrieveUser from "../../../logic/users/retrieveUser"

export default function LikedPlaygrounds({ onMarkerPressedHandler }) {
    const userId = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NDk0ODAwM2JmMTJmMTNmNmIxY2I4NTIiLCJpYXQiOjE2OTA5MjcxMjAsImV4cCI6MTc3NzI0MDcyMH0._fnTXb6GDqSip-kJiF_cao2b4WwVqraR_cpqsrco76k"
    const [playgrounds, setPlaygrounds] = useState()
    const [user, setUser] = useState()

    useEffect(() => {
        console.log('Refresh Posts -> render in useEffect')
        try {
            console.log('   Show all Posts -> render in useEffect onLoad compo')
            retrieveLikedPlaygrounds(userId)
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
        <View className=" flex-row relative" >
            <ScrollView className="pr-5">
                {playgrounds && playgrounds.map(playground => {
                    return <View className="relative mb-3" ><LikedPlayground
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