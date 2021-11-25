import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
        this.material = new THREE.MeshBasicMaterial();
        this.material.map = this.arbreTexture;
        /* this.material.color = new THREE.Color('red'); */
        /* this.material.transparent = true;
        this.material.opacity = 0.8; */
        this.material.alphaMap = this.arbreTexture;
        this.material.side = THREE.DoubleSide;
        this.material.wireframe = false;

        //MeshNormalMaterial
        /* this.material = new THREE.MeshNormalMaterial();
        this.material.map = this.arbreTexture;
        this.material.side = THREE.DoubleSide;
        this.material.wireframe = true;
        this.material.flatShading = true; */

        //MeshMatcapMaterial
        /* this.material = new THREE.MeshMatcapMaterial();
        this.material.matcap = this.arbreTexture;
        this.material.side = THREE.DoubleSide; */

        //MeshStandardMaterial
        /* this.material = new THREE.MeshStandardMaterial(); */
       /*  this.material.map = this.arbreTexture; */
        /* this.material.side = THREE.DoubleSide;
        this.material.metalness = 0.45;
        this.material.roughness = 0.65; */

        //Object
        this.sphere = new THREE.Mesh(
            new THREE.SphereBufferGeometry(0.5, 16, 16),
            this.material
        );

        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(1, 1, 12, 12, 13, 13),
            this.material
        );

        this.torus = new THREE.Mesh(
            new THREE.TorusBufferGeometry(0.3, 0.2, 16, 32),
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
        this.scene.add(this.sphere, this.plane, this.torus, this.camera);

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
        this.sphere.position.x = - 1.5;
        this.torus.position.x = 1.5;
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

        this.sphere.rotation.x = this.elapsedTime * Math.PI * 0.1;
        this.sphere.rotation.y = this.elapsedTime * Math.PI * 0.1;
        this.plane.rotation.x = this.elapsedTime * Math.PI * 0.1;
        this.plane.rotation.y = this.elapsedTime * Math.PI * 0.1;
        this.torus.rotation.x = this.elapsedTime * Math.PI * 0.1;
        this.torus.rotation.y = this.elapsedTime * Math.PI * 0.1;

        /* this.controls.update(); */

        this.renderer.render(this.scene, this.camera);

        window.requestAnimationFrame(() => {
            this.animateObject();
        });
    }
}

new App();