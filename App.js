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
        this.textureLoader = new THREE.TextureLoader();
        this.arbreTexture = this.textureLoader.load(arbre);
        this.pierreTexture = this.textureLoader.load(pierre);
        this.plumeTexture = this.textureLoader.load(plume);

        this.canvas = document.querySelector('.webgl');
        this.sizes = { 
            width: window.innerWidth,
            height: window.innerHeight
        }
        this.resizeScene();

        //Object
        this.geometry = new THREE.PlaneGeometry(1, 1, 62, 62);

        //MeshBasicMaterial
        this.material = new THREE.RawShaderMaterial({
            vertexShader: vertex,
            fragmentShader: fragment,
            side: THREE.DoubleSide,
            uniforms: {
                uFrequency: {value: new THREE.Vector2(20, 5)},
                uTime: {value: 0},
                uColor: {value: new THREE.Color('orange')},
                uTexture: {value: this.plumeTexture}
            }
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.mesh.scale.y = 2/3;

        /* this.objectPos(); */

        //Count number of vertices
        this.count = this.geometry.attributes.position.count;

        //Camera
        this.camera = new THREE.PerspectiveCamera(55, this.sizes.width / this.sizes.height, 0.1, 1000);
        this.aspectRatio = this.sizes.width / this.sizes.height;
        this.cameraPos();

        //Controls
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.enableDampingControl();

        //Time
        this.clock = new THREE.Clock();

        //Scene
        this.scene = new THREE.Scene();
        this.scene.add(this.mesh, this.camera);

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
        this.mesh.position.x = 1;
        this.mesh.position.y = 1;
    }

    getRandomValue() {
        this.randoms = new Float32Array(this.count);
        for(let i = 0; i < this.count; i++) {
            this.randoms[i] = Math.random();
        }
        return this.randoms;
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
        this.camera.lookAt(this.mesh.position);

        this.material.uniforms.uTime.value = this.elapsedTime;

        /* this.mesh.rotation.x = this.elapsedTime * Math.PI * 0.1;
        this.mesh.rotation.y = this.elapsedTime * Math.PI * 0.1; */

        this.controls.update();

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            this.animateObject();
        });
    }
}

new App();