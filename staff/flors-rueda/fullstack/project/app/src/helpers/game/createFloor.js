import * as THREE from 'three';
import { ballGeometry, setBallMaterial, cubeGeometry, wallMaterial, dirtMaterial } from './materials';

/**
 * Creates a 3D representation of the game floor based on a given floor configuration.
 *
 * This function takes a floor configuration and creates a 3D representation of the game floor using Three.js objects.
 * It constructs cube objects for walls and dirt, adds ball, bomb, life, stonks, and hole objects to the scene.
 *
 * @param {[[string]]} floor The floor configuration specifying the cells.
 * @param {Scene} scene The Three.js scene to add objects to.
 * @param {number} cellSize The size of each cell in the game.
 * @param {string} avatar The avatar selected for the ball.
 * @returns {object} An object containing cubeObjects, bombObjects, lifeObjects, ball, hole, and stonks objects.
 */
export const createFloor = (floor, scene, cellSize, avatar) => {
    const gridSize = floor.length;

    const cubeObjects = [];
    const bombObjects = [];
    const lifeObjects = [];
    const wallObjects = [];

    let ball, hole, stonks;

    const textureLoader = new THREE.TextureLoader();

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const value = floor[row][col];

            const xPos = (col - (gridSize - 1) / 2) * cellSize;
            const yPos = ((gridSize - 1) / 2 - row) * cellSize;

            if (value === 'wall') {
                let cube = new THREE.Mesh(cubeGeometry, wallMaterial);
                cube.position.set(xPos, yPos, 0);
                scene.add(cube);
                wallObjects.push(cube);
            } else if (value === 'dirt') {
                let cube = new THREE.Mesh(cubeGeometry, dirtMaterial);
                cube.position.set(xPos, yPos, 0);
                scene.add(cube);
                cubeObjects.push(cube);
            } else if (value === 'start') {
                ball = new THREE.Mesh(ballGeometry, setBallMaterial(avatar));
                ball.position.set(xPos, yPos, 0);
                scene.add(ball);
            } else if (value === 'bomb' || value === 'life' || value === 'stonks' || value === 'hole') {
                const planeGeometry = new THREE.PlaneGeometry(cellSize / 1.75, cellSize / 1.75);
                const planeMaterial = new THREE.MeshBasicMaterial({
                    map: textureLoader.load(`/game/${value}.png`),
                    transparent: true,
                });
                const plane = new THREE.Mesh(planeGeometry, planeMaterial);
                plane.position.set(xPos, yPos, 0);
                scene.add(plane);
                if (value === 'bomb') bombObjects.push(plane);
                if (value === 'life') lifeObjects.push(plane);
                if (value === 'stonks') stonks = plane;
                if (value === 'hole') hole = plane;
            }
        }
    }
    return { wallObjects, cubeObjects, bombObjects, lifeObjects, ball, hole, stonks }
}