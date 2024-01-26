import * as THREE from 'three';

const ballRadius = 0.25;
const cubeSize = 1.5;

const textureLoader = new THREE.TextureLoader();

const bgTexture = textureLoader.load('assets/demo6/floor.png');

const textureBall = textureLoader.load('assets/demo6/ball.png');
const textureWall = textureLoader.load('assets/demo6/wall.png');
const textureDirt = textureLoader.load('assets/demo6/dirt.png');

const ballGeometry = new THREE.SphereGeometry(ballRadius, 8, 8);
const ballMaterial = new THREE.MeshBasicMaterial({ map: textureBall });

const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
const wallMaterial = new THREE.MeshBasicMaterial({ map: textureWall });
const dirtMaterial = new THREE.MeshBasicMaterial({ map: textureDirt });

export { bgTexture, ballGeometry, ballMaterial, cubeGeometry, wallMaterial, dirtMaterial };