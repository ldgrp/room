import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import 'three/examples/jsm/libs/draco/draco_wasm_wrapper.js';
import * as THREE from 'three';

const ROOM = '/models/room.glb';

// Instantiate a loader
const loader = new GLTFLoader();
// Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/draco/');
loader.setDRACOLoader(dracoLoader);

export function startLoad(scene: THREE.Scene) {
    loader.load(
        ROOM,
        (gltf) => {
            gltf.scene.traverse((child) => {
                child.castShadow = true;
                child.receiveShadow = true;
            });
            scene.add(gltf.scene);
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
            console.error(error);
        }
    );
}
