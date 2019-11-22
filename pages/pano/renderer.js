import * as THREE from './three/three.min'
console.log('THREE', THREE);
let renderer = THREE.WebGLRenderer({ alpha: true, antialias: false })
export default renderer