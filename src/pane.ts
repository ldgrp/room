import * as THREE from 'three'
import { HexColorString } from "three"
import { ListApi, Pane } from "tweakpane"
import { ILightManager, Lights, SunType } from "./lights"

const DEBUG = import.meta.env.DEV

const ENV_PARAMS = {
    day: 0.0,  // 0.0 - 1.0
}

function addLight(pane: Pane, lightManager: ILightManager, lightItem: keyof Lights, name: string) {
    const folder = pane.addFolder({
        title: name,
        expanded: false,
    })

    const light = lightManager.lights[lightItem]

    const params = {
        color: '#' + light.color.getHexString(),
        intensity: light.intensity,
        distance: light instanceof THREE.PointLight ? light.distance : undefined!,
        angle: light instanceof THREE.SpotLight ? light.angle : undefined!,
        penumbra: light instanceof THREE.SpotLight ? light.penumbra : undefined!,
        width: light instanceof THREE.RectAreaLight ? light.width : undefined!,
        height: light instanceof THREE.RectAreaLight ? light.height : undefined!,
        position: light.position,
        lookAt: { x: 0, y: 0, z: 0 },
    }

    folder.addInput(params, 'intensity', { min: 0, max: 10 })
        .on('change', (ev) => {
            lightManager.lights[lightItem].intensity = ev.value
        })

    folder.addInput(params, 'color')
        .on('change', (ev) => {
            lightManager.lights[lightItem].color.set(ev.value as HexColorString)
        })

    if (light instanceof THREE.PointLight) {
        folder.addInput(params, 'distance', { min: 0, max: 10 })
            .on('change', (ev) => {
                light.distance = ev.value
            })
    }

    if (light instanceof THREE.SpotLight && DEBUG) {
        folder.addInput(params, 'angle', { min: 0, max: Math.PI / 2 })
            .on('change', (ev) => {
                light.angle = ev.value
            })

        folder.addInput(params, 'penumbra', { min: 0, max: 1 })
            .on('change', (ev) => {
                light.penumbra = ev.value
            })
    }

    if (light instanceof THREE.RectAreaLight && DEBUG) {
        folder.addInput(params, 'width', { min: 0, max: 10 })
            .on('change', (ev) => {
                light.width = ev.value
            })
        
        folder.addInput(params, 'height', { min: 0, max: 10 })
            .on('change', (ev) => {
                light.height = ev.value
            })
    }

    if (DEBUG) {
        folder.addInput(params.position, 'x', { min: -20, max: 20 })
            .on('change', (ev) => {
                light.position.x = ev.value
            })
        
        folder.addInput(params.position, 'y', { min: -20, max: 20 })
            .on('change', (ev) => {
                light.position.y = ev.value
            })

        folder.addInput(params.position, 'z', { min: -20, max: 20 })
            .on('change', (ev) => {
                light.position.z = ev.value
            })

        folder.addInput(params.lookAt, 'x', { min: -20, max: 20 })
            .on('change', (ev) => {
                light.lookAt(ev.value, params.lookAt.y, params.lookAt.z)
            })

        folder.addInput(params.lookAt, 'y', { min: -20, max: 20 })
            .on('change', (ev) => {
                light.lookAt(params.lookAt.x, ev.value, params.lookAt.z)
            })

        folder.addInput(params.lookAt, 'z', { min: -20, max: 20 })
            .on('change', (ev) => {
                light.lookAt(params.lookAt.x, params.lookAt.y, ev.value)
            })
    }


    return folder;
}

export function initialisePane(lightManager: ILightManager) {
    const pane = new Pane({ title: 'Parameters' });
    pane.addInput(ENV_PARAMS, 'day', { min: 0, max: 1 })
        .on('change', (ev) => {
            const {sun, skyLight} = lightManager.lights;
            const x = 6 * Math.cos(ev.value * Math.PI)
            const y = 10 * Math.cos(ev.value*1.25 * Math.PI/2)
            sun.position.set(x, y, -3)
            skyLight.position.set(x*0.8, y, -2)
            skyLight.lookAt(2.5, 0, -1.5)
        })

    const sunFolder = addLight(pane, lightManager, 'sun', 'Sun')
    const list = sunFolder.addBlade({
        view: 'list',
        label: 'Type',
        options: [
            { text: 'Directional', value: 'directional' },
            { text: 'Point', value: 'point' },
        ],
        value: 'directional',
    }) as ListApi<SunType>;

    list.on('change', (ev) => {
        lightManager.sunType = ev.value
    })

    addLight(pane, lightManager, 'skyLight', 'Skylight')
    addLight(pane, lightManager, 'lampTop', 'Lamp Top')
    addLight(pane, lightManager, 'lampMiddle', 'Lamp Middle')
    addLight(pane, lightManager, 'lampBottom', 'Lamp Bottom')
    addLight(pane, lightManager, 'shelfLamp', 'Shelf Lamp')
}