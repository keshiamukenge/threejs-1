varying float vNoise;
varying vec2 vUv;
uniform sampler2D imgTexture;

void main() {
    vec3 color1 = vec3(1.,0.,0.);
    vec3 color2 = vec3(1.,1.,1.);
    vec3 finalColor = mix(color1,color2,0.5*(vNoise + 1.));

    vec2 newUV = vUv;

    vec4 imgView = texture2D(imgTexture,vUv);

    gl_FragColor = vec4(finalColor,1.);
    gl_FragColor = vec4(vUv,0.,1.);
    /* gl_FragColor = imgView; */
}