import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
);

const controls = new OrbitControls(camera, document.getElementById('app')!);
controls.target.set(2.5, 0, -1.5);

camera.position.set(0.75, 2.3, 6)
// camera.rotation.set(-.4, -.325, -.133);

controls.update();
controls.enableDamping = true;
controls.zoomSpeed = 0.25;
controls.screenSpacePanning = true;
controls.maxAzimuthAngle = Math.PI * 1/2;
controls.minAzimuthAngle = Math.PI * -1/16;
controls.maxPolarAngle = Math.PI * 1/2;
controls.maxDistance = 15;
controls.enablePan = false;