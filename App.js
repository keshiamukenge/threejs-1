import * as THREE from 'three';

export default class App {
    constructor() {
        this.canvas = document.querySelector('.webgl');
        this.sizes = { width: 800, height: 600 }

        this.createObject();
        this.createCamera();
        this.createScene();
        this.createRenderer();
    }

    createObject() {
        this.geometry = new THREE.BoxGeometry(1, 1, 1);
        this.material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        this.mesh = new THREE.Mesh(this.geometry, this.material);
    }

    createCamera() {
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height);
        this.camera.position.z = 3;
    }

    createScene() {
        this.scene = new THREE.Scene();
        this.scene.add(this.mesh, this.camera);
    }

    createRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera);
    }
}

new App();