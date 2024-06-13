import { View, Image, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import { getLoggedUser } from '../logic/getLoggedUser.js'
import getUserCharacter from '../logic/getUserCharacter.js'
import Missions from '../components/Missions.jsx'
import PlayMissionModal from '../components/PlayMissionModal.jsx'
import UserMenu from '../components/UserMenu.jsx'
import UpdateUsername from '../components/UpdateUsername.jsx'
import UpdateEmail from '../components/UpdateEmail.jsx'
import UpdatePassword from '../components/UpdatePassword.jsx'
import UpdateCharacter from '../components/UpdateCharacter.jsx'
import NewCharacter from '../components/NewCharacter.jsx'
import Game from './Game.jsx'
import TutorialEndScreen from '../components/TutorialEndScreen.jsx'
import GameEndScreen from '../components/GameEndScreen.jsx'

const Home = ({ onLogoutSession }) => {
    const [user, setUser] = useState()
    const [character, setCharacter] = useState()
    const [characterAvatar, setCharacterAvatar] = useState()
    const [modal, setModal] = useState(null)
    const [missionId, setMissionId] = useState(null)
    const [game, setGame] = useState(false)
    const [main, setMain] = useState(true)

    useEffect(() => {
        retrieveUser()
    }, [])

    useEffect(() => {
        if (user) {
            if (!user?.character) {
                setModal('newCharacter')
            }
        }
    }, [user])

    useEffect(() => {
        if (character) {
            setCharacterAvatar(Number(character.avatar))
        }
    }, [character])

    const retrieveUser = () => {
        try {
            return getLoggedUser()
                .then(user => {
                    setUser(user)
                    if (user?.character) {
                        return getUserCharacter()
                            .then(character => {
                                setCharacter(character)
                            })
                    }
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    const handleGoToMissionInfo = missionId => {
        setModal('mission')
        setMissionId(missionId)
    }

    const handleCloseMissionInfo = () => {
        setModal(null)
    }

    const handleUserMenu = async () => {
        if (modal && modal === 'userMenu') {
            setModal(null)
        } else {
            await retrieveUser()
            setModal('userMenu')
        }
    };

    const handleLogoutSession = () => {
        onLogoutSession()
    }

    const handleGoToUpdateModal = modal => {
        setModal(modal)
    }

    const handleStartNewGame = () => {
        setModal('gameMission')
        setMain(false)
        setGame(true)
    }

    const handleStartTutorialGame = () => {
        getUserCharacter()
            .then(character => {
                setCharacter(character)
                setModal('tutorialMission')
                setMain(false)
                setGame(true)
            })
    }

    const handleWinGame = () => {
        setGame(false)
        setMain(true)
        setModal('missionAcomplished')
    }

    const handleLoseGame = () => {
        setGame(false)
        setMain(true)
        setModal('missionFailed')
    }

    const handleWinTutorialGame = () => {
        retrieveUser()
            .then(() => {
                setGame(false)
                setMain(true)
                setModal('endTutorialInfo')
            })
    }

    const handleRepeatTutorial = () => {
        retrieveUser()
            .then(() => {
                setGame(false)
                setMain(true)
                setModal('repeatTutorialInfo')
            })
    }

    return (<>
        {main && <View className="flex justify-center items-center h-screen w-screen _pt-20">
            <Image source={require('../../assets/home/main-bg.jpg')} className="absolute scale-125 bottom-0" ></Image>
            {modal !== "mission" && modal !== 'endTutorialInfo' && modal !== 'repeatTutorialInfo' && modal !== 'missionAcomplished' && modal !== 'missionFailed' && user?.character && <View className="flex justify-center items-center h-screen w-screen p-2">
                <View className="h-20 mr-4 flex-row items-center">
                    <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
                    <View className="h-16 w-16 m-2">
                        {character && <Image source={characterAvatar} className="bg-slate-200 h-16 w-16 rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg"></Image>}
                    </View>
                    <View className="w-2/4 h-20 justify-center items-center">
                        <View className="justify-center items-center h-10 w-full">
                            <Text className=" text-2xl font-semibold">{character?.characterName}</Text>
                        </View>
                        <View className="justify-center items-center h-10 w-2/4">
                            <Text className=" text-lg font-semibold">Level {character?.level}</Text>
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
                    {modal === "updateCharacter" && <UpdateCharacter closeCharacterModal={handleUserMenu} />}
                </View>
            </View>}
            {modal === "mission" && <PlayMissionModal
                missionId={missionId}
                onCancel={handleCloseMissionInfo}
                onPlay={handleStartNewGame}
            />}
            {modal === 'newCharacter' && <NewCharacter
                user={user}
                onStartTutorialMission={handleStartTutorialGame}
                onTutorialCompleted={handleCloseMissionInfo}
            />}
            {modal === 'endTutorialInfo' && <TutorialEndScreen result={'win'} onCloseTutorial={handleCloseMissionInfo} />}
            {modal === 'repeatTutorialInfo' && <TutorialEndScreen result={'lose'} onRepeatTutorial={handleStartTutorialGame} />}
            {modal === 'missionAcomplished' && <GameEndScreen result={'win'} onCloseModal={handleCloseMissionInfo} missionId={missionId} />}
            {modal === 'missionFailed' && <GameEndScreen result={'lose'} onCloseModal={handleCloseMissionInfo} />}
        </View>}
        {game && modal === 'tutorialMission' && <Game
            character={character}
            onWinGame={handleWinTutorialGame}
            onLoseGame={handleRepeatTutorial}
            zombiesToKill={1}
        />}
        {game && modal === 'gameMission' && <Game
            character={character}
            onWinGame={handleWinGame}
            onLoseGame={handleLoseGame}
            zombiesToKill={1}
        />}
    </>
    )
}

export default Home