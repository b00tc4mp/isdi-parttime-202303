import * as THREE from 'three';

const ballRadius = 0.25;
const cubeSize = 1.5;

const textureLoader = new THREE.TextureLoader();

const bgTexture = textureLoader.load('game/floor.png');

const textureBall = textureLoader.load('game/ball.png');
const textureWall = textureLoader.load('game/wall.png');
const textureDirt = textureLoader.load('game/dirt.png');

const ballGeometry = new THREE.SphereGeometry(ballRadius, 8, 8);
const ballMaterial = new THREE.MeshBasicMaterial({ map: textureBall });

const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const wallMaterial = new THREE.MeshBasicMaterial({ map: textureWall });
const dirtMaterial = new THREE.MeshBasicMaterial({ map: textureDirt });

export { bgTexture, ballGeometry, ballMaterial, cubeGeometry, wallMaterial, dirtMaterial };