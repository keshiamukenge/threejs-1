import * as THREE from 'three';
import { ShaderMaterial } from 'three';
/* import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; */

export default class Sketch {
    constructor(options) {
        this.time = 0;
        this.container = options.dom;
        this.scene = new THREE.Scene();

        
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;

        this.camera = new THREE.PerspectiveCamera(70, this.width / this.height, 0.01, 10);
        this.camera.position.z = 0.5; 

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        
        this.container.appendChild(this.renderer.domElement);

        /* this.controls = new OrbitControls( this.camera, this.renderer.domElement ); */

        this.resize();
        this.setupResize();
        this.addObjects();
        this.render();
    }

    setupResize() {
        window.addEventListener('resize', this.resize.bind(this)); 
    }
 
    resize() {
        this.width = this.container.offsetWidth;
        this.height = this.container.offsetHeight;
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width/this.height;
        this.camera.updateProjectionMatrix();
    }

    addObjects() {
        this.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
        this.material = new THREE.MeshNormalMaterial();

        this.material = new ShaderMaterial({
            fragmentShader: `
                void main() {
                    gl_FragColor = vec4(1.0,0.0,1.0,1.0);
                }
            `,
            vertexShader: `
                void main() {
                    gl_Position = projectionMatrix * modelViewMatrix * vec4 ( position, 1.0 );
                }
            `
        });

        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);
    }

    render() {
        this.time += 0.05;
        this.mesh.rotation.x = this.time / 2000;
        this.mesh.rotation.y = this.time / 1000;

        this.renderer.render(this.scene, this.camera);
        window.requestAnimationFrame(this.render.bind(this));
    }
}

new Sketch({
    dom: document.getElementById('main-container')
});