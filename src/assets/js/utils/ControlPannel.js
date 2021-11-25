import { GUI } from 'lil-gui';

export default class ControlsPannel {
    constructor() {
        this.gui = new GUI({ closed: true });
        this.options = {
            color: 0xff0000
        }
    }

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