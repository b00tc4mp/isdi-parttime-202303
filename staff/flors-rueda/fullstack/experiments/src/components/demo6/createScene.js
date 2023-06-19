import * as THREE from 'three';
import { bgTexture } from './materials';

export const createScene = () => {
    const scene = new THREE.Scene();
    scene.background = bgTexture;

    const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
    scene.add(ambient);

    return scene
}