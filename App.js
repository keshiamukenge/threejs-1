import * as THREE from 'three';
import GSAP from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'lil-gui';

import img from './src/assets/medias/img.jpeg'

export default class App {
    constructor() {
        //Control pannel
        this.gui = new GUI({ closed: true });
        this.options = {
            color: 0xff0000
        }

        //Texture
        this.loadingManager = new THREE.LoadingManager();
        this.controlLoadingManager();
        this.textureLoader = new THREE.TextureLoader();
        this.texture = this.textureLoader.load(
           img,
           () => {
               console.log('loaded');
           },
           () => {
               console.log('progress');
           },
           () => {
               console.error('error');
           }
        )
        this.texture.generateMidmaps = false;
        this.texture.magFilter = THREE.NearestFilter;

        this.canvas = document.querySelector('.webgl');
        this.sizes = { 
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.resizeScene();

        //Object
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({
            map: this.texture,
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
        /* this.controls = new OrbitControls(this.camera, this.canvas);
        this.enableDampingControl(); */

        //Time
        this.clock = new THREE.Clock();

        //Control pannel property
        this.addControlProperty();

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

    addControlProperty() {
        this.gui.add(this.cube.position, 'x')
            .min(-3)
            .max(3)
            .step(0.01)
            .name('cube x')
        this.gui.add(this.cube.position, 'y')
            .min(-3)
            .max(5)
            .step(0.01)
            .name('cube y')
        this.gui.add(this.cube.position, 'z')
            .min(-10)
            .max(3)
            .step(0.01)
            .name('cube z')
        this.gui.add(this.cube, 'visible')
            .name('visible')
        this.gui.add(this.material, 'wireframe')
            .name('wireframe')
        this.gui.addColor(this.options, 'color')
            .name('color')
            .onChange(() => {
                this.material.color.set(this.options.color);
            })
    }

    controlLoadingManager() {
        this.loadingManager.onStart = () => { console.log('start')};
        this.loadingManager.onProgress = () => { console.log('in progress')};
        this.loadingManager.onError = () => { console.log('error')};
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

        this.cube.rotation.x = this.elapsedTime * Math.PI * 0.3;
        this.cube.rotation.y = this.elapsedTime * Math.PI * 0.3;
        /* this.controls.update(); */

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            this.animateCube();
        });
    }
}

new App();