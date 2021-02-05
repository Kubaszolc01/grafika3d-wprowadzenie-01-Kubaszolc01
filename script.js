// console.log(THREE);

const renderer = new THREE.WebGLRenderer();
const scene = new THREE.Scene();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set( 0, 0, 100);
camera.lookAt( 0, 0, 0 );

const LineMaterial = new THREE.LineBasicMaterial({color: 0x00fffff});
const points = [];
points.push(new THREE.Vector3(-10, 0, 0 ));
points.push(new THREE.Vector3(0, 10, 0 ));
points.push(new THREE.Vector3(10, 0, 0 ));

for(let i=0; i<5; i++){
    points.push(new THREE.Vector3(5*i, i*i, 0 ));
}

const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(lineGeometry, LineMaterial);
scene.add(line);
renderer.render(scene, camera);

const light = new THREE.PointLight({color: 0x0fff00 });
scene.add(light);
light.position.x = -10;
light.position.y = 0;
light.position.z = 50;

// const light2 = new THREE.PointLight({color: 0xfff00});
// scene.add(light2);
// light.position.set(0,50,20);

const colorwWhite = new THREE.Color('hsl(100, 100%, 100%)');

const width = 20;
const height = 20;
const depth = 20;
const cubeGeometry = new THREE.BoxGeometry(width, height, depth);
const cubeMaterial = new THREE.MeshPhongMaterial({
    color: colorwWhite,
    shiness: 80
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

cube.rotation.z = 10;
cube.rotation.x = 200;
renderer.render(scene,camera);

const animate = () => {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
    renderer.render(scene, camera);
}

animate();