import * as THREE from 'three'
import { HexColorString } from "three"
import { ListApi, Pane } from "tweakpane"
import { ILightManager, Lights, SunType } from "./lights"

const ENV_PARAMS = {
    day: 0.5,  // 0.0 - 1.0
}

type AdddLightOverrides = {
    maxIntensity?: number
}

function addLightFolder(pane: Pane, lightManager: ILightManager, lightItem: keyof Lights, name: string, override?: AdddLightOverrides) {
    const folder = pane.addFolder({
        title: name,
    })

    const light = lightManager.lights[lightItem]

    const params = {
        color: '#' + light.color.getHexString(),
        intensity: light.intensity,
        distance: light instanceof THREE.PointLight ? light.distance : undefined!,
    }

    folder.addInput(params, 'intensity', { min: 0, max: override?.maxIntensity ?? 10 })
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
                if ('distance' in light)
                    light.distance = ev.value
            })
    }

    return folder;
}

export function initialisePane(lightManager: ILightManager) {
    const pane = new Pane();
    pane.addInput(ENV_PARAMS, 'day', { min: 0, max: 1 })
        .on('change', (ev) => {
            const x = 6 * Math.cos(ev.value * Math.PI)
            const y = 10 * Math.cos(ev.value*1.25 * Math.PI/2)
            lightManager.lights.sun.position.set(x, y, -1.5)
        })

    const sunFolder = addLightFolder(pane, lightManager, 'sun', 'Sun')
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

    addLightFolder(pane, lightManager, 'lampTop', 'Lamp Top')
    addLightFolder(pane, lightManager, 'lampMiddle', 'Lamp Middle')
    addLightFolder(pane, lightManager, 'lampBottom', 'Lamp Bottom')
    addLightFolder(pane, lightManager, 'shelfLamp', 'Shelf Lamp')
}