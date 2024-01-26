import * as THREE from 'three';

const ballRadius = 0.25;
const cubeSize = 1.5;

const textureLoader = new THREE.TextureLoader();

const bgTexture = textureLoader.load('/game/floor.png');


const textureWall = textureLoader.load('/game/wall.png');
const textureDirt = textureLoader.load('/game/dirt.png');

const ballGeometry = new THREE.SphereGeometry(ballRadius, 8, 8);

/**
 * Creates a material for the ball mesh based on the provided avatar.
 *
 * @param {string} [avatar='beach'] The name of the avatar. Defaults to 'beach' if not provided.
 * @returns {MeshBasicMaterial} A material for the ball mesh.
 */
const setBallMaterial = (avatar) => {
    const textureBall = textureLoader.load(`/game/ball/${avatar ? avatar : 'beach'}.png`);
    const ballMaterial = new THREE.MeshBasicMaterial({ map: textureBall });
    return ballMaterial
}

const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const wallMaterial = new THREE.MeshBasicMaterial({ map: textureWall });
const dirtMaterial = new THREE.MeshBasicMaterial({ map: textureDirt });

export { bgTexture, ballGeometry, setBallMaterial, cubeGeometry, wallMaterial, dirtMaterial };