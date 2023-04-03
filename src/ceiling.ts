import * as THREE from 'three';

export function createCeiling() {
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Ceiling Part 1
    const geometry = new THREE.BoxGeometry(6, 0.1, 1);
    const cube1 = new THREE.Mesh(geometry, material);
    cube1.position.set(3, 2.35, -0.5);
    cube1.castShadow = true;
    const cube2 = new THREE.Mesh(geometry, material);
    cube2.position.set(3, 2.35, -2.5);
    cube2.castShadow = true;

    // Ceiling Part 2
    const geometry2 = new THREE.BoxGeometry(3.0, 0.1, 1);
    const cube3 = new THREE.Mesh(geometry2, material);
    cube3.position.set(1.5, 2.35, -1.5);
    cube3.castShadow = true;
    const cube4 = new THREE.Mesh(geometry2, material);
    cube4.position.set(5.5, 2.35, -1.5);
    cube4.castShadow = true;

    // Short Wall
    const geometry3 = new THREE.BoxGeometry(0.1, 4, 4);
    const cube5 = new THREE.Mesh(geometry3, material);
    cube5.position.set(5.1, 1.5, -1.5);
    cube5.castShadow = true;

    // Long Wall
    const geometry4 = new THREE.BoxGeometry(6, 3, 0.1);
    const cube6 = new THREE.Mesh(geometry4, material);
    cube6.position.set(2, 1.5, 0);
    cube6.castShadow = true;

    material.colorWrite = false;
    material.depthWrite = false;

    return [cube1, cube2, cube3, cube4, cube5, cube6];
}
