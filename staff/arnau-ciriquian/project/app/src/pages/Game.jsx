import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect, Suspense } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useAnimatedSensor, SensorType } from 'react-native-reanimated'
import { Canvas } from '@react-three/fiber'
import Zombie from '../components/zombie';
import createZombiesArray from '../logic/createZombiesArray';

export default function Game({onFinishGame}) {
  const zombies = createZombiesArray(3)

  // pre finish game test

  let deadZombies = 0

  const handleDeadZombies = () => {
    deadZombies += 1

    if (deadZombies === 3) {
      console.log('zombies killed')
      onFinishGame()
    }
  }

  //

  // player life test

  let playerHealth = 50

  const handlePlayersHealth = () => {
    playerHealth -= 5

    if (playerHealth <= 0) {
      console.log('player killed')
      onFinishGame()
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

  return (
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
  );
}

// onClick={(event) => removeZombie(zombies, zombie.id)}

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
    zIndex: 6, // Set a higher zIndex to position the 3D scene above other components
  },
  canvas: {
    flex: 1,
  }
});