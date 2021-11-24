import * as THREE from 'three';
import GSAP from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class App {
    constructor() {
        //Cursor
        /* this.cursor = {
            x: 0,
            y: 0
        }
        this.calcCursorPos(); */

        this.canvas = document.querySelector('.webgl');
        this.sizes = { width: 800, height: 600 }

        //Object
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 'red' });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        /* this.cubePos(); */

        //Camera
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 1, 1000);
        this.aspectRatio = this.sizes.width / this.sizes.height;
        /* this.camera = new THREE.OrthographicCamera(-1 * this.aspectRatio, 1 * this.aspectRatio, 1, -1, 0.1, 1000); */
        this.cameraPos();

        //Controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.enableDampingControl();

        //Time
        this.clock = new THREE.Clock();

        //GSAP
        /* GSAP.to(this.cube.rotation,{
            duration: 1,
            delay: 1,
            repeat: 105,
            x: 2,
            y: 2
        }); */

        /* GSAP.to(this.cube.rotation, {
            duration: 1,
            delay: 2,
            x: 0
        }); */

        //Scene
        this.scene = new THREE.Scene();
        this.scene.add(this.cube, this.camera);

        //Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        this.rendererSize();
        
        //Animate cube
        this.animateCube();
    }

    calcCursorPos() {
        window.addEventListener('mousemove', (e) => {
            this.cursor.x = e.clientX / this.sizes.width - 0.5;
            this.cursor.y = - (e.clientY / this.sizes.height - 0.5);
        });
    }

    cubePos() {
        this.cube.position.set(1, 1, 1);
    }

    enableDampingControl() {
        this.controls.enableDamping = true;
    }

    cameraPos() {
        /* this.camera.rotation.reorder('XYZ'); */
        this.camera.position.set(2, 2, 2);
    }

    rendererSize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height,);
    }

    animateCube() {
        this.elapsedTime = this.clock.getElapsedTime();

        /* this.cube.rotation.x = this.elapsedTime * Math.PI * 0.2;
        this.cube.rotation.y = this.elapsedTime * Math.PI * 0.2; */

        /* this.camera.position.x = Math.sin(this.cursor.x * Math.PI * 2) * 3;
        this.camera.position.Z = Math.cos(this.cursor.x * Math.PI * 2) * 3; */
        this.camera.lookAt(this.cube.position);

        this.controls.update();

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            this.animateCube();
        });
    }
}

new App();