// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry( .7, .2, 16, 100 );
//const geometry = new THREE.TorusKnotGeometry( 10, 3, 100, 16);
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 3000;
const posArray = new Float32Array(particlesCount * 3);

for (let i=0; i<particlesCount; i++){
    posArray[i] = (Math.random() - 0.5) * (Math.random()*5);
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))
//particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

// Materials

const material = new THREE.PointsMaterial({
size: 0.015,
color: 'green'
})

const materialParticles = new THREE.PointsMaterial({
    size: 0.015,
    color: 'gray'
    })


// Mesh
const sphere = new THREE.Points(geometry,material)
const particleMesh = new THREE.Points(particlesGeometry, materialParticles);
scene.add(sphere, particleMesh);

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

/**
* Sizes
*/
const sizes = {
width: window.innerWidth,
height: window.innerHeight
}

window.addEventListener('resize', () =>
{
// Update sizes
sizes.width = window.innerWidth
sizes.height = window.innerHeight

// Update camera
camera.aspect = sizes.width / sizes.height
camera.updateProjectionMatrix()

// Update renderer
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
* Camera
*/
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new THREE.OrbitControls(camera, canvas)
controls.enableDamping = true

/**
* Renderer
*/
const renderer = new THREE.WebGLRenderer({
canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


//mouse
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', animateParticles);

function animateParticles(event) {
    mouseX = event.clientX
    mouseY = event.clientY
}


/**
* Animate
*/

const clock = new THREE.Clock()

const loop = () =>
{

const elapsedTime = clock.getElapsedTime()

// Update objects
sphere.rotation.y = 1.1 * elapsedTime



particleMesh.rotation.y = mouseX * (0.001 * elapsedTime); 
// particleMesh.rotation.x = mouseY * 0.001; 
// Update Orbital Controls
controls.update()

// Render
renderer.render(scene, camera)

// Call tick again on the next frame
window.requestAnimationFrame(loop)
}

loop()