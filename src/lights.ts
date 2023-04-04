import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib';

RectAreaLightUniformsLib.init();

function createSun() {
    const sun = new THREE.DirectionalLight('#ffffff', 1);
    sun.castShadow = true;
    // sun.shadow.camera.far = 30;
    sun.shadow.mapSize.set(1024, 1024);
    sun.position.set(6, 10, -3);
    sun.target.position.set(2.5, 0, -1.3);
    return sun;
}

function createPointSun() {
    const sun = new THREE.PointLight('#ffffff', 20);
    sun.castShadow = true;
    sun.shadow.camera.far = 20;
    sun.shadow.mapSize.set(1024, 1024);
    sun.position.set(-3, 3, -1.5);
    return sun;
}

function createLampTop() {
    const color = new THREE.Color('#f85de1').convertSRGBToLinear();
    const lamp = new THREE.PointLight(color, 6.63, 10);
    lamp.castShadow = true;
    lamp.shadow.mapSize.set(512, 512);
    lamp.position.set(2.1, 1.9, -0.2);
    return lamp;
}

function createLampMiddle() {
    const color = new THREE.Color('#feddbc').convertSRGBToLinear();
    const lampMiddle = new THREE.PointLight(color, 6.96, 2);
    lampMiddle.position.set(1.94, 1.48, -0.195);
    return lampMiddle;
}

function createLampBottom() {
    const color = new THREE.Color('#53bbef').convertSRGBToLinear();
    const lampBottom = new THREE.PointLight(color, 1.52, 2.4);
    lampBottom.position.set(2.27, 1.09, -0.24);
    return lampBottom;
}

function createShelfLamp() {
    const color = new THREE.Color('#7aa0e8').convertSRGBToLinear();
    const shelfLamp = new THREE.PointLight(color, 3, 5);
    shelfLamp.castShadow = true;
    shelfLamp.shadow.mapSize.set(1024, 1024);
    shelfLamp.position.set(4.114, 1.25, -2.7874);
    return shelfLamp;
}

function createSkylight() {
    const color = new THREE.Color('#ffd7b2').convertSRGBToLinear();
    const skylight = new THREE.RectAreaLight(color, 0.2, 10, 10);
    skylight.position.set(5 * 0.8, 10, -1.5);
    skylight.lookAt(2.5, 0, -1.5);
    return skylight;
}

function createDeskLight() {
    const color = new THREE.Color('#ff9d3c').convertSRGBToLinear();
    const light = new THREE.SpotLight(color, 4.24, 10, Math.PI / 3, 0.2);
    light.position.set(5.15, 1.5, -0.7);
    return light;
}

function createBedLight() {
    const color = new THREE.Color('#fed7b2').convertSRGBToLinear();
    const light = new THREE.PointLight(color, 1.2, 5);
    light.position.set(0.43, 1, -0.45);
    return light;
}

export type Lights = {
    sun: THREE.Light;
    lampTop: THREE.Light;
    lampMiddle: THREE.Light;
    lampBottom: THREE.Light;
    shelfLamp: THREE.Light;
    skyLight: THREE.Light;
    deskLight: THREE.Light;
    bedLight: THREE.Light;
    [key: string]: THREE.Light;
};

export interface ILightManager {
    lights: Lights;
    sunType: SunType;
    initialise(scene: THREE.Scene): void;
}

export type SunType = 'directional' | 'point';

class LightManager implements ILightManager {
    private _lights: Lights;
    private scene!: THREE.Scene;
    private isInitialised = false;

    constructor() {
        this._lights = {
            sun: createSun(),
            lampTop: createLampTop(),
            lampMiddle: createLampMiddle(),
            lampBottom: createLampBottom(),
            shelfLamp: createShelfLamp(),
            skyLight: createSkylight(),
            deskLight: createDeskLight(),
            bedLight: createBedLight(),
        };
    }

    initialise(scene: THREE.Scene) {
        this.scene = scene;
        for (const key in this._lights) {
            scene.add(this._lights[key]);
        }
        this.isInitialised = true;
    }

    get lights() {
        if (!this.isInitialised)
            console.error(
                'Lights have not been initialised yet. Call initialise() first.'
            );
        return this._lights;
    }

    set sunType(type: SunType) {
        if (
            type === 'directional' &&
            this._lights.sun instanceof THREE.PointLight
        ) {
            this.scene.remove(this._lights.sun);
            this._lights.sun = createSun();
            this.scene.add(this._lights.sun);
        }

        if (
            type === 'point' &&
            this._lights.sun instanceof THREE.DirectionalLight
        ) {
            this.scene.remove(this._lights.sun);
            this._lights.sun = createPointSun();
            this.scene.add(this._lights.sun);
        }
    }
}

export const lightManager = new LightManager();
