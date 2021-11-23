import * as THREE from 'three';
import GSAP from 'gsap';

export default class App {
    constructor() {
        this.canvas = document.querySelector('.webgl');
        this.sizes = { width: 800, height: 600 }

        //Object
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 'red' });
        this.cube = new THREE.Mesh(this.geometry, this.material);
        /* this.cubePos(); */

        //Camera
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height);
        this.cameraPos();

        //Time
        this.clock = new THREE.Clock();

        //GSAP
        GSAP.to(this.cube.position, {
            duration: 1,
            delay: 1,
            x: 2
        });

        GSAP.to(this.cube.position, {
            duration: 1,
            delay: 2,
            x: 0
        });

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

    cubePos() {
        this.cube.position.set(1, 1, 1);
    }

    cameraPos() {
        this.camera.position.z = 5;
    }

    rendererSize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
    }

    animateCube() {
        /* this.elapsedTime = this.clock.getElapsedTime(); */

        /* this.camera.position.x = Math.sin(this.elapsedTime);
        this.camera.position.y = Math.cos(this.elapsedTime);
        this.camera.lookAt(this.cube.position); */
        this.renderer.render(this.scene, this.camera)

        window.requestAnimationFrame(() => {
            this.animateCube();
        });
    }
}

new App();