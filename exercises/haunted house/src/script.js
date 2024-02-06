import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

/**
 * Base
 */
// Debug
// const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// fog
const fog = new THREE.Fog("#262837", 1, 12);
scene.fog = fog;

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

// door textures
const doorColorTexture = textureLoader.load("/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const doorAmbientOcclusion = textureLoader.load(
  "/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("/textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const doorNormalTexture = textureLoader.load("/textures/door/normal.jpg");
const doorRoughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

// brick textures
const brickColor = textureLoader.load("/textures/bricks/color.jpg");
const brickAmbientOcclusion = textureLoader.load(
  "/textures/bricks/ambientOcclusion.jpg"
);
const brickNormal = textureLoader.load("/textures/bricks/normal.jpg");
const brickRoughness = textureLoader.load("/textures/bricks/roughness.jpg");

// grass textures
const grassColor = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusion = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormal = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughness = textureLoader.load("/textures/grass/roughness.jpg");

/**
 * House
 */

const house = new THREE.Group();
scene.add(house);

// 1 unit = 1 meter
//walls
const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: brickColor,
    aoMap: brickAmbientOcclusion,
    normalMap: brickNormal,
    roughnessMap: brickRoughness,
  })
);
walls.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
);

walls.position.y = walls.geometry.parameters.height / 2;
house.add(walls);

// roof
const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1, 4),
  new THREE.MeshStandardMaterial({ color: "#b35f45" })
);
roof.rotation.y = Math.PI * 0.25;
roof.position.y =
  walls.geometry.parameters.height + roof.geometry.parameters.height / 2;
house.add(roof);

// door
const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
  new THREE.MeshStandardMaterial()
);
door.material.map = doorColorTexture;
door.material.alphaMap = doorAlphaTexture;
door.material.transparent = true;
door.material.aoMap = doorAmbientOcclusion;
door.material.displacementMap = doorHeightTexture;
door.material.displacementScale = 0.1;
door.material.normalMap = doorNormalTexture;
door.material.metalnessMap = doorMetalnessTexture;
door.material.roughnessMap = doorRoughnessTexture;
door.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
);

door.position.y = door.geometry.parameters.height / 2;
door.position.z = walls.geometry.parameters.depth / 2 + 0.001;
house.add(door);

// bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial({ color: "#89c854" });

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);
house.add(bush1, bush2, bush3, bush4);

// graves
const graves = new THREE.Group();
scene.add(graves);

const gravesGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const gravesMaterial = new THREE.MeshStandardMaterial({ color: "#b2b6b1" });

for (let i = 0; i < 50; i++) {
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 6;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;

  const grave = new THREE.Mesh(gravesGeometry, gravesMaterial);
  console.log();
  grave.position.set(x, grave.geometry.parameters.height / 2 - 0.1, z);
  grave.rotation.y = (Math.random() - 0.5) * 0.5;
  grave.rotation.z = (Math.random() - 0.5) * 0.5;
  graves.add(grave);
}

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColor,
    aoMap: grassAmbientOcclusion,
    normalMap: grassNormal,
    roughnessMap: grassRoughness,
  })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#b9d5ff", 0.12);
// gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#b9d5ff", 0.12);
moonLight.position.set(4, 5, -2);
// gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
// gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
// gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
// gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

// door light
const doorLight = new THREE.PointLight("#ff7d46", 1, 7);
doorLight.position.set(0, 2.2, 2.7);
house.add(doorLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);

camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor("#262837");

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
