import { View, Image, Text, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
import CharacterCreator from './CharacterCreator'
import TutorialInfo from './TutorialInfo'
import Game from '../pages/Game'

export default function NewCharacter({ user, onStartTutorialMission }) {
    const [modal, setModal] = useState(null)

    useEffect(() => {
        setModal('intro')
    }, [])

    const handleGoToCreateNewCharacter = () => {
        setModal('characterCreator')
    }

    const handleGoToTutorialInfo = () => {
        setModal('tutorialInfo')
    }

    const handleGoToFirstMission = () => {
        onStartTutorialMission()
    }

    return (<>
        {(modal !== 'game') && <View className="flex justify-center items-center h-screen w-screen _pt-20">
            {modal === 'intro' && <View className="w-80 h-4/5 m-5 justify-around items-center">
                <View className="bg-neutral-500 rounded-3xl opacity-70 w-full h-full absolute shadow-md shadow-black"></View>
                <Text className="text-xl font-semibold text-center text-white m-2 mt-4">
                    Hello {user?.name}! Infected Reality plunges you into an augmented reality world teeming with zombies, where survival is the only objective. Scavenge for supplies, complete missions, and face off against the relentless undead. Use your phone's camera to see the zombies right in your environment, blurring the lines between fiction and reality. Gather your courage, sharpen your wits, and prepare to navigate through the post-apocalyptic streets while fending off the augmented undead. Remember, your choices will determine your fate. Step into Infected Reality and become the ultimate survivor!
                </Text>
                <TouchableOpacity className="border-2 border-red-400 bg-orange-400 opacity-80 rounded-xl w-1/3 items-center shadow-md shadow-black" onPress={handleGoToCreateNewCharacter}>
                    <Text className="opacity-100 text-xl">
                        Continue!
                    </Text>
                </TouchableOpacity>
            </View>}
            {modal === 'characterCreator' && <CharacterCreator
                user={user}
                onCharacterCreated={handleGoToTutorialInfo}
            />}
            {modal === 'tutorialInfo' && <TutorialInfo
                onStartMission={handleGoToFirstMission}
            />}
            {modal === 'lostGameInfo' && <View className="w-80 h-4/5 m-5 justify-around items-center">
                <View className="bg-neutral-500 rounded-3xl opacity-70 w-full h-full absolute shadow-md shadow-black"></View>
                <Text className="text-xl font-semibold text-center text-white m-2 mt-4">
                    Damn it! Remember we need you to stay focus and exterminate all Z's ASAP! We need you on your A game survivor! Let's try it again!
                </Text>
                <TouchableOpacity className="border-2 border-red-400 bg-orange-400 opacity-80 rounded-xl w-1/3 items-center shadow-md shadow-black" onPress={handleGoToFirstMission}>
                    <Text className="opacity-100 text-xl">
                        Retry!
                    </Text>
                </TouchableOpacity>
            </View>}
            
        </View>}
    </>)
}
