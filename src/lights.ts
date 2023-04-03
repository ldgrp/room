import * as THREE from 'three'
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'

RectAreaLightUniformsLib.init()

function createSun() {
    const sun = new THREE.DirectionalLight('#ffffff', 1)
    sun.castShadow = true
    sun.shadow.camera.far = 30
    sun.shadow.mapSize.set(1024, 1024)
    sun.position.set(6, 10, -3)
    sun.target.position.set(2.5, 0, -1.3)
    return sun
}

function createPointSun() {
    const sun = new THREE.PointLight('#ffffff', 20)
    sun.castShadow = true
    sun.shadow.camera.far = 20
    sun.shadow.mapSize.set(1024, 1024)
    sun.position.set(-3, 3, -1.5)
    return sun
}

function createLampTop() {
    const lamp = new THREE.PointLight('#ff4960', 2)
    lamp.castShadow = true
    lamp.shadow.mapSize.set(512, 512)
    lamp.position.set(2.1, 1.9, -0.2)
    return lamp
}

function createLampMiddle() {
    const lampMiddle = new THREE.PointLight('#ffba81', 1, 2)
    lampMiddle.position.set(1.94, 1.48, -0.195);
    return lampMiddle
}

function createLampBottom() {
    const lampBottom = new THREE.PointLight('#a3deff', 0.5, 1)
    lampBottom.position.set(2.27, 1.09, -0.24);
    return lampBottom
}

function createShelfLamp() {
    const shelfLamp = new THREE.PointLight("#5555ff", 1, 5)
    shelfLamp.castShadow = true
    shelfLamp.shadow.mapSize.set(1024, 1024)
    shelfLamp.position.set(4.114, 1.25, -2.7874)
    return shelfLamp
}

function createSkylight() {
    const skylight = new THREE.RectAreaLight('#ffffff', .2, 10, 10) 
    skylight.position.set(5*.8, 10, -1.5)
    skylight.lookAt(2.5, 0, -1.5)
    return skylight
}

export type Lights = {
    sun: THREE.Light,
    lampTop: THREE.Light,
    lampMiddle: THREE.Light,
    lampBottom: THREE.Light,
    shelfLamp: THREE.Light,
    skyLight: THREE.Light,
    [key: string]: THREE.Light
}

export interface ILightManager {
    lights: Lights
    sunType: SunType
    initialise(scene: THREE.Scene): void
}

export type SunType = 'directional' | 'point'

class LightManager implements ILightManager {
    private _lights: Lights
    private scene!: THREE.Scene
    private isInitialised = false

    constructor() {
        this._lights = {
            sun: createSun(),
            lampTop: createLampTop(),
            lampMiddle: createLampMiddle(),
            lampBottom: createLampBottom(),
            shelfLamp: createShelfLamp(),
            skyLight: createSkylight(),
        }
    }

    initialise(scene: THREE.Scene) {
        this.scene = scene
        for (const key in this._lights) {
            scene.add(this._lights[key])
        }
        this.isInitialised = true
    }

    get lights() {
        if (!this.isInitialised)
            console.error('Lights have not been initialised yet. Call initialise() first.');
        return this._lights;
    }

    set sunType(type: SunType) {
        if (type === 'directional' && this._lights.sun instanceof THREE.PointLight) {
            this.scene.remove(this._lights.sun)
            this._lights.sun = createSun()
            this.scene.add(this._lights.sun)
        }

        if (type === 'point' && this._lights.sun instanceof THREE.DirectionalLight) {
            this.scene.remove(this._lights.sun)
            this._lights.sun = createPointSun()
            this.scene.add(this._lights.sun)
        }
    }
}

export const lightManager = new LightManager()