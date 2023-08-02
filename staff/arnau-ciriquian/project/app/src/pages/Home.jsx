import { View, Image, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { getLoggedUser } from '../logic/getLoggedUser.js'

const Home = () => {
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            getLoggedUser()
                .then(setUser)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleUser = () => {
        console.log(user.name)
    }

    return (
        <View className="flex justify-center items-center h-screen w-screen">
            <Image source={require('../../assets/home/main-bg.jpg')} className="absolute scale-125 bottom-0" ></Image>
            <View>
                <TouchableOpacity onPress={handleUser}>
                    <Text>
                        Get user {user?.name}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Home