import * as THREE from 'three'
import { camera } from './camera';
import { createCeiling } from './ceiling';
import { lightManager } from './lights';

export const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer();
renderer.useLegacyLights = false;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('app')?.appendChild(renderer.domElement);

export function initialise() {
    lightManager.initialise(scene);
    createCeiling().forEach(c => scene.add(c))
}

export function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}