import * as THREE from 'three';

export default class App {
    constructor() {
        this.canvas = document.querySelector('.webgl');
        this.sizes = { width: 800, height: 600 }

        //Object
        this.cube1 = new THREE.Mesh(
            this.createGeometry(1, 1, 1),
            this.createMaterial(0xff0000)
        );

        this.cube2 = new THREE.Mesh(
            this.createGeometry(1, 1, 1),
            this.createMaterial(0x00ff00)
        );

        this.cube3 = new THREE.Mesh(
            this.createGeometry(1, 1, 1),
            this.createMaterial(0x0000ff)
        );
        /* this.mesh = new THREE.Mesh(this.geometry, this.material); */
        /* this.cubePos(); */
        this.cube1.position.x = 1;
        this.cube2.position.x = -1.5;
        this.cube3.position.y = 1;

        //Group
        this.group = new THREE.Group();
        console.log(this.cube1);
        this.group.add(this.cube1, this.cube2, this.cube3);
        this.group.scale.y = 2;

        //Camera
        this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height);
        this.cameraPos();

        //Help tools
        this.axesHelper = new THREE.AxesHelper(5);

        //Scene
        this.scene = new THREE.Scene();
        this.scene.add(this.cube1, this.camera, this.axesHelper, this.group);

        //Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas
        });
        this.rendererSize();
        this.renderer.render(this.scene, this.camera);
    }

    createGeometry(x, y, z) {
        return this.geometry = new THREE.BoxGeometry(x, y, z); 
    }

    createMaterial(color) {
        return this.material = new THREE.MeshBasicMaterial({ color: color });
    }

    /* cubePos() {
        this.group.position.set(1, 1, 1);
        this.cube1.scale.set(1, 1, 1);
        this.cube1.rotation.reorder('XYZ');
        this.cube1.rotation.set(Math.PI / 0.5, 1, Math.PI / 0.5);
    } */

    cameraPos() {
        this.camera.position.set(1, 1, 3);
        this.camera.lookAt(this.cube1.position);
    }

    rendererSize() {
        this.renderer.setSize(this.sizes.width, this.sizes.height);
    }
}

new App();