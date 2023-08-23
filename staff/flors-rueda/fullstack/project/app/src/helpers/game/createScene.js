import * as THREE from 'three';
import { bgTexture } from './materials';

/**
 * Creates and configures a Three.js scene for rendering.
 *
 * @returns {Scene} A configured Three.js scene.
 */
export const createScene = () => {
    const scene = new THREE.Scene();
    bgTexture.repeat.set(0.5, 0.5);
    bgTexture.offset.set(0.25, 0.25);

    scene.background = bgTexture;

    const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
    scene.add(ambient);

    return scene;
}