import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CanvasContainer = () => {
  const canvasContainerRef = useRef(null);

  useEffect(() => {
    let isDragging = false;
    const defaultRotationSpeed = 0.01;
    const draggingRotationSpeed = 0.03;
    let rotationSpeed = defaultRotationSpeed;

    let lastMouseX = 0;
    let lastMouseY = 0;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    scene.background = new THREE.Color(0xaaaaaa);

    const ambient = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 0.3);
    scene.add(ambient);


    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasContainerRef.current.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();
    const textureBall = textureLoader.load('assets/demo6/ball.png');
    const textureWall = textureLoader.load('assets/demo6/wall.png');

    const ballRadius = 0.5;
    const ballGeometry = new THREE.SphereGeometry(ballRadius, 16, 16);

    const ballMaterial = new THREE.MeshBasicMaterial({ map: textureBall });
    const ball = new THREE.Mesh(ballGeometry, ballMaterial);
    scene.add(ball);

    const cubeSize = 2;
    const cubeGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
    const cubeMaterial = new THREE.MeshBasicMaterial({ map: textureWall });
    const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube1.position.set(-2, 0, 0);
    scene.add(cube1);

    const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube2.position.set(2, 0, 0);
    scene.add(cube2);

    const onMouseDown = (event) => {
      isDragging = true;
      rotationSpeed = draggingRotationSpeed;
    }

    const onMouseUp = (event) => {
      isDragging = false;
      rotationSpeed = defaultRotationSpeed;
    }

    const onMouseMove = (event) => {
      if (isDragging) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;

        const mouseDeltaX = mouseX - lastMouseX;
        const mouseDeltaY = mouseY - lastMouseY;

        const vector = new THREE.Vector3(
          (mouseX / window.innerWidth) * 2 - 1,
          -(mouseY / window.innerHeight) * 2 + 1,
          0.5
        );
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        const ballPosition = camera.position.clone().add(dir.multiplyScalar(distance));

        if (!checkCollision(ballPosition, cube1) && !checkCollision(ballPosition, cube2)) {
          ball.position.copy(ballPosition);
        }

        ball.rotation.x += rotationSpeed * mouseDeltaY;
        ball.rotation.y += rotationSpeed * mouseDeltaX;

        lastMouseX = mouseX;
        lastMouseY = mouseY;
      }
    }

    const checkCollision = (ballPosition, cube) => {
      const ballRadius = ball.geometry.parameters.radius;
      const cubeSize = cube.geometry.parameters.width;
      const cubePosition = cube.position;

      const distance = ballPosition.distanceTo(cubePosition);

      return distance <= ballRadius + cubeSize / 2;
    }

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
      renderer.dispose();
    };
  }, []);

  return <div id="canvas-container" ref={canvasContainerRef} />;
};

export default CanvasContainer;