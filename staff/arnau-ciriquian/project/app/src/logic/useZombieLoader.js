import { useMemo } from 'react';
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { TextureLoader } from 'expo-three'

export default function useZombieLoader() {
  const [base] = useLoader(TextureLoader, [
    require('../../assets/zombie/texture/zombieDiff.jpg')
  ])

  const material = useLoader(MTLLoader, require('../../assets/zombie/zombie-attack.mtl'))

  const obj = useLoader(
    OBJLoader,
    require('../../assets/zombie/zombie-attack.obj'),
    (loader) => {
      material.preload()
      loader.setMaterials(material)
    }
  )

  return useMemo(() => {
    obj.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.map = base
      }
    })
    return obj;
  }, [obj, base]);
}