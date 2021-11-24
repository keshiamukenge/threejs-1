import * as THREE from 'three';
import GSAP from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export default class App {
    constructor() {
        this.canvas = document.querySelector('.webgl');
        this.sizes = { 
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.resizeScene();

        //Object
        this.posArray = new Float32Array([
            0, 0, 0,
            0, 1, 0,
            1, 0, 0,
        ]);
        this.verticesPos = new THREE.BufferAttribute(this.posArray, 3);
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', this.verticesPos);
        this.material = new THREE.MeshBasicMaterial({
            color: 'red',
            wireframe: false
        });
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

        //Double click
        this.onDoubleClick();

        //Time
        this.clock = new THREE.Clock();

        //Scene
        this.scene = new THREE.Scene();
        this.scene.add(this.cube, this.camera);

        //Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        
        //Animate cube
        this.animateCube();
    }

    resizeScene() {
        window.addEventListener('resize', () => {
            this.sizes.width = window.innerWidth;
            this.sizes.height = window.innerHeight;

            this.camera.aspect = this.sizes.width / this.sizes.height;
            this.camera.updateProjectionMatrix();

            this.rendererSize();
        });
    }

    onDoubleClick() {
        window.addEventListener('dblclick', () => {
            if(!document.fullscreenElement) {
                this.canvas.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        });
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
        this.camera.position.set(2, 2, 2);
    }

    rendererSize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    animateCube() {
        this.elapsedTime = this.clock.getElapsedTime();
        this.camera.lookAt(this.cube.position);

        this.controls.update();

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            this.animateCube();
        });
    }
}

new App();