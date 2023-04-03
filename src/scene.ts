import * as THREE from 'three'
import { camera } from './camera'
import { createCeiling } from './ceiling'
import { lightManager } from './lights'
import Stats from 'stats.js'

THREE.ColorManagement.enabled = true;

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

export const scene = new THREE.Scene()

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.useLegacyLights = false;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
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
    stats.update();
}

function onWindowResize(camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer) {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(devicePixelRatio);
}

window.addEventListener('resize', () => onWindowResize(camera, renderer))