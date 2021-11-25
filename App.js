import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import vertex from './src/assets/js/shaders/vertex.glsl';
import fragment from './src/assets/js/shaders/fragment.glsl';
import img from './src/assets/medias/img.jpeg';
import arbre from './src/assets/medias/arbre.jpeg';
import pierre from './src/assets/medias/pierre.jpeg';
import plume from './src/assets/medias/plume.jpeg';

export default class App {
    constructor() {
        //Texture
        this.textureLoader = new THREE.TextureLoader()
        this.arbreTexture = this.textureLoader.load(arbre)
        this.pierreTexture = this.textureLoader.load(pierre)
        this.plumeTexture = this.textureLoader.load(plume)

        this.canvas = document.querySelector('.webgl');
        this.sizes = { 
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.resizeScene();

        //MeshBasicMaterial
        this.material = new THREE.RawShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment
        });

        //Object
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1, 60, 60),
            this.material
        );

        this.objectPos();

        //Camera
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 1000);
        this.aspectRatio = this.sizes.width / this.sizes.height;
        this.cameraPos();

        //Controls
        /* this.controls = new OrbitControls(this.camera, this.canvas);
        this.enableDampingControl(); */

        //Time
        this.clock = new THREE.Clock();

        //Scene
        this.scene = new THREE.Scene();
        this.scene.add(this.plane, this.camera);

        //Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        
        //Animate object
        this.animateObject();
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

    objectPos() {
        this.plane.position.x = 2;
        this.plane.position.y = 2;
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

    animateObject() {
        this.elapsedTime = this.clock.getElapsedTime();
        this.camera.lookAt(this.plane.position);

        /* this.plane.rotation.x = this.elapsedTime * Math.PI * 0.1;
        this.plane.rotation.y = this.elapsedTime * Math.PI * 0.1; */

        /* this.controls.update(); */

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            this.animateObject();
        });
    }
}

new App();