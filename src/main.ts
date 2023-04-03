import './style.css';
import WebGL from 'three/examples/jsm/capabilities/WebGL.js';
import { animate, initialise, scene } from './scene';
import { startLoad } from './loader';
import { initialisePane } from './pane';
import { lightManager } from './lights';

if (WebGL.isWebGLAvailable()) {
    initialise();
    initialisePane(lightManager);
    startLoad(scene);
    animate();
} else {
    const warning = WebGL.getWebGLErrorMessage();
    document.getElementById('app')?.appendChild(warning);
}
