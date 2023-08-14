import { View, Image, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { getLoggedUser } from '../logic/getLoggedUser.js'
import Missions from '../components/Missions.jsx'
import PlayMissionModal from '../components/PlayMissionModal.jsx'
import UserMenu from '../components/UserMenu.jsx'

const Home = ({ onContinueToNewCharacter, onLogoutSession }) => {
    const [user, setUser] = useState()
    //const [main, setMain] = useState(true)
    const [modal, setModal] = useState(null)
    const [missionId, setMissionId] = useState(null)

    useEffect(() => {
        try {
            getLoggedUser()
                .then(setUser)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const handleGoToCreator = () => {
        console.log('lets create a new character')
        onContinueToNewCharacter()
    }

    const handleGoToMissionInfo = missionId => {
        setModal('mission')
        setMissionId(missionId)
    }

    const handleCloseMissionInfo = () => {
        setModal(null)
    }

    const handleStartMission = () => {
    }

    const handleUserMenu = () => {
        modal ? setModal(null) : setModal('userMenu')    }

    const handleLogoutSession = () => {
        onLogoutSession()
    }

    return (
        <View className="flex justify-center items-center h-screen w-screen _pt-20">
            <Image source={require('../../assets/home/main-bg.jpg')} className="absolute scale-125 bottom-0" ></Image>
            {!modal && !user?.character && <View className="w-80 h-4/5 m-5 justify-around items-center">
                <View className="bg-neutral-500 rounded-3xl opacity-70 w-full h-full absolute shadow-md shadow-black"></View>
                <Text className="text-xl font-semibold text-center text-white m-2 mt-4">
                    Hello {user?.name}! Infected Reality plunges you into an augmented reality world teeming with zombies, where survival is the only objective. Scavenge for supplies, complete missions, and face off against the relentless undead. Use your phone's camera to see the zombies right in your environment, blurring the lines between fiction and reality. Gather your courage, sharpen your wits, and prepare to navigate through the post-apocalyptic streets while fending off the augmented undead. Remember, your choices will determine your fate. Step into Infected Reality and become the ultimate survivor!
                </Text>
                <TouchableOpacity className="border-2 border-red-400 bg-orange-400 opacity-80 rounded-xl w-1/3 items-center shadow-md shadow-black" onPress={handleGoToCreator}>
                    <Text className="opacity-100 text-xl">
                        Continue!
                    </Text>
                </TouchableOpacity>
            </View>}
            {modal !== "mission" && user?.character && <View className="flex justify-center items-center h-screen w-screen p-2">
                <View className="h-20 mr-4 flex-row items-center">
                    <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                    <View className="h-16 w-16 m-2">
                        <Image source={require('../../assets/home/survivor.jpg')} className="bg-slate-200 h-16 w-16 rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg"></Image>
                    </View>
                    <View className="w-2/4 h-20 justify-center items-center">
                        <View className="justify-center items-center h-10 w-2/4">
                            <Text className=" text-2xl font-semibold">Ellie{/*character.name*/}</Text>
                        </View>
                        <View className="justify-center items-center h-10 w-2/4">
                            <Text className=" text-lg font-semibold">Level 1{/*character.name*/}</Text>
                        </View>
                    </View>
                    <View className="justify-center items-center h-16 w-16 m-2">
                        <TouchableOpacity onPress={handleUserMenu}>
                            <Image source={require('../../assets/generic/menu.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="h-3/4 w-full pl-2 pr-2 m-5">
                    {!modal && <Missions onMissionClicked={handleGoToMissionInfo} />}
                    {modal === "userMenu" && <UserMenu onUserLogout={handleLogoutSession} />}
                </View>
            </View>}
            {modal === "mission" && <PlayMissionModal
                missionId={missionId}
                onCancel={handleCloseMissionInfo}
                onPlay={handleStartMission}
            />}
        </View>
    )
}

export default Home