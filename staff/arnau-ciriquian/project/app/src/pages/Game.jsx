import { Camera, CameraType } from 'expo-camera'
import { useState, useEffect, Suspense } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { useAnimatedSensor, SensorType } from 'react-native-reanimated'
import { Canvas } from '@react-three/fiber'
import Zombie from '../components/Zombie'
import createZombiesArray from '../logic/createZombiesArray'
import HealthBar from '../components/HealthBar'

export default function Game({ character, onWinGame, onLoseGame, zombiesToKill }) {
  //const zombies = createZombiesArray(zombiesToKill)
  const [zombies] = useState(createZombiesArray(zombiesToKill))
  const [playerHealth, setPlayerHealth] = useState(50)
  const [deadZombies, setDeadZombies] = useState(0)

  // pre finish game test
  const handleDeadZombies = () => {
    setDeadZombies(deadZombies + 1)

    console.log(zombiesToKill, (deadZombies + 1))

    if ((deadZombies + 1) === zombiesToKill) {
      console.log('zombies killed')
      onWinGame()
    }
  }

  //

  // player life test

  //let playerHealth = 50

  const handlePlayersHealth = () => {
    if (playerHealth <= 0) {
      console.log('player killed');
      onLoseGame();
    } else {
      setPlayerHealth(playerHealth - 5)
    }
  }

  //

  const animatedSensor = useAnimatedSensor(SensorType.GYROSCOPE, { interval: 'auto' });
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }

  if (!hasPermission) {
    return <View style={styles.container}><Text>Camera permission not granted</Text></View>;
  }

  return (<>
    <View className="absolute z-10 w-full p-2 h-1/6">
      <View className="h-20 top-10 w-full flex-row items-center ">
        <View className="absolute bg-white h-full w-full rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg shadow-md shadow-black opacity-50"></View>
        <View className="h-16 w-16 m-2">
          {character && <Image source={character.avatar} className="bg-slate-200 h-16 w-16 rounded-tl-lg rounded-tr-3xl rounded-bl-3xl rounded-br-lg"></Image>}
        </View>
        <View className="w-2/4 h-20 justify-center items-center">
          <View className="justify-center items-center h-10 w-full">
            <Text className=" text-2xl font-semibold">{character?.characterName}</Text>
          </View>
          <View className="justify-center items-center h-10 w-full">
            <HealthBar health={playerHealth} />
          </View>
        </View>
        <View className="justify-center items-center h-16 w-16 m-2">
          <TouchableOpacity /* onPress={handleUserMenu} */>
            <Image source={require('../../assets/generic/menu.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
      </Camera>
      <View style={styles.canvasContainer}>
        <Canvas style={styles.canvas}>
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Suspense fallback={null}>
            {zombies && zombies.map(zombie => <Zombie
              onDeadZombie={handleDeadZombies}
              onDamagePlayer={handlePlayersHealth}
              key={zombie.id}
              zombieId={zombie.id}
              animatedSensor={animatedSensor}
              position={zombie.position}
              visible={zombie.visible}
              time={zombie.time} />)}
          </Suspense>
        </Canvas>
      </View>
    </View>
  </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
  buttonContainer: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
  },
  canvasContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 6
  },
  canvas: {
    flex: 1,
  }
});