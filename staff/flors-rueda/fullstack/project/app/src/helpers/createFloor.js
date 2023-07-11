import * as THREE from 'three';
import { ballGeometry, ballMaterial, cubeGeometry, wallMaterial, dirtMaterial } from './materials';

export const createFloor = (floor, scene, cellSize) => {
    const gridSize = floor.length;

    const cubeObjects = [];
    const bombObjects = [];
    const lifeObjects = [];

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
                cubeObjects.push(cube);
            } else if (value === 'dirt') {
                let cube = new THREE.Mesh(cubeGeometry, dirtMaterial);
                cube.position.set(xPos, yPos, 0);
                scene.add(cube);
                cubeObjects.push(cube);
            } else if (value === 'start') {
                ball = new THREE.Mesh(ballGeometry, ballMaterial);
                ball.position.set(xPos, yPos, 0);
                scene.add(ball);
            } else if (value === 'bomb' || value === 'life' || value === 'stonks' || value === 'hole') {
                const planeGeometry = new THREE.PlaneGeometry(cellSize / 1.75, cellSize / 1.75);
                const planeMaterial = new THREE.MeshBasicMaterial({
                    map: textureLoader.load(`game/${value}.png`),
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
    return { cubeObjects, bombObjects, lifeObjects, ball, hole, stonks }
}

