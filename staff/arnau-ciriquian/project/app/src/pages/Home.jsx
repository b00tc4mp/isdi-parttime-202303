import { View, Image, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { getLoggedUser } from '../logic/getLoggedUser.js'
import { getUserCharacter } from '../logic/getUserCharacter.js'
import Missions from '../components/Missions.jsx'
import PlayMissionModal from '../components/PlayMissionModal.jsx'
import UserMenu from '../components/UserMenu.jsx'
import UpdateUsername from '../components/UpdateUsername.jsx'
import UpdateEmail from '../components/UpdateEmail.jsx'
import UpdatePassword from '../components/UpdatePassword.jsx'
import UpdateCharacter from '../components/UpdateCharacter.jsx'
import NewCharacter from '../components/NewCharacter.jsx'

const Home = ({ onLogoutSession, onStartGame }) => {
    const [user, setUser] = useState()
    const [character, setCharacter] = useState()
    const [modal, setModal] = useState(null)
    const [missionId, setMissionId] = useState(null)

    useEffect(() => {
        try {
            getLoggedUser()
                .then(setUser)
                .catch(error => alert(error.message))
            getUserCharacter()
                .then(setCharacter)
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    useEffect(() => {
        if (user) { }
    }, [user])

    /*const handleGoToCreator = () => {
        console.log('lets create a new character')
        onContinueToNewCharacter()
    }*/

    const handleGoToMissionInfo = missionId => {
        setModal('mission')
        setMissionId(missionId)
    }

    const handleCloseMissionInfo = () => {
        setModal(null)
    }

    const handleUserMenu = () => {
        (modal && modal === 'userMenu') ? setModal(null) : setModal('userMenu')
    }

    const handleLogoutSession = () => {
        onLogoutSession()
    }

    const handleGoToUpdateModal = modal => {
        setModal(modal)
    }

    const handleStartNewGame = () => {
        setModal(null)
        onStartGame()
    }

    return (
        <View className="flex justify-center items-center h-screen w-screen _pt-20">
            <Image source={require('../../assets/home/main-bg.jpg')} className="absolute scale-125 bottom-0" ></Image>
            {modal !== "mission" && user?.character && <View className="flex justify-center items-center h-screen w-screen p-2">
                <View className="h-20 mr-4 flex-row items-center">
                    <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                    <View className="h-16 w-16 m-2">
                        <Image source={character?.avatar && character.avatar} className="bg-slate-200 h-16 w-16 rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg"></Image>
                    </View>
                    <View className="w-2/4 h-20 justify-center items-center">
                        <View className="justify-center items-center h-10 w-2/4">
                            <Text className=" text-2xl font-semibold">{character?.characterName && character.characterName}</Text>
                        </View>
                        <View className="justify-center items-center h-10 w-2/4">
                            <Text className=" text-lg font-semibold">Level {character?.level && character.level}</Text>
                        </View>
                    </View>
                    <View className="justify-center items-center h-16 w-16 m-2">
                        <TouchableOpacity onPress={handleUserMenu}>
                            <Image source={require('../../assets/generic/menu.png')}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View className="h-3/4 w-full pl-2 pr-2 m-5">
                    {!modal && <Missions
                        onMissionClicked={handleGoToMissionInfo}
                        character={character}
                    />}
                    {modal === "userMenu" && <UserMenu
                        onUserLogout={handleLogoutSession}
                        onUpdateModalClick={handleGoToUpdateModal}
                        onDeleteUserAccount={handleLogoutSession}
                        user={user}
                    />}
                    {modal === "updateUsername" && <UpdateUsername closeUsernameModal={handleUserMenu} />}
                    {modal === "updateEmail" && <UpdateEmail closeEmailModal={handleUserMenu} />}
                    {modal === "updatePassword" && <UpdatePassword closePasswordModal={handleUserMenu} />}
                    {modal === "updateCharacter" && <UpdateCharacter />}
                </View>
            </View>}
            {modal === "mission" && <PlayMissionModal
                missionId={missionId}
                onCancel={handleCloseMissionInfo}
                onPlay={handleStartNewGame}
            />}
            {(user && !user?.character) && <NewCharacter
                user={user}
            />}
        </View>
    )
}

export default Home