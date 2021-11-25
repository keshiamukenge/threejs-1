export default function scroll(cameraY) {
    window.addEventListener('wheel', (e) => {
        cameraY = e.deltaY * Math.PI * 2;
    });
}

scroll();