import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Debug
 */
// const gui = new dat.GUI()

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, .01)
scene.add(ambientLight)

// gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001).name('ambientIntensity')

// PointLight1
const pointLight1 = new THREE.PointLight(0xff0000, 2)
pointLight1.position.set(0.25, -1.85, -0.55)
pointLight1.intensity = 0.7
scene.add(pointLight1)

// //HELPER
// const pointLightHelper = new THREE.PointLightHelper(pointLight1, 1)
// scene.add(pointLightHelper)

// const light1 = gui.addFolder('pointLight1')

// light1.add(pointLight1.position, 'x').min(-6).max(6).step(0.01)
// light1.add(pointLight1.position, 'y').min(-3).max(3).step(0.01)
// light1.add(pointLight1.position, 'z').min(-3).max(3).step(0.01)
// light1.add(pointLight1, 'intensity').min(0).max(10).step(0.01)

// PointLight2
const pointLight2 = new THREE.PointLight(0xffffff, 2)
pointLight2.position.set(0.8, -6, 0.5)
pointLight2.intensity = 1
scene.add(pointLight2)

//HELPER2
// const pointLightHelper2 = new THREE.PointLightHelper(pointLight2, .5)
// scene.add(pointLightHelper2)

// const light2 = gui.addFolder('pointLight2')

// light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.02)
// light2.add(pointLight2.position, 'y').min(-8).max(-3).step(0.02)
// light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.02)
// light2.add(pointLight2, 'intensity').min(0).max(20).step(0.02)

// PointLightFlash
const flash = new THREE.PointLight(0x062d89, 30, 500, 1.7)
flash.position.set(0, 0, 0);
flash.intensity = 30
scene.add(flash)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const roofTexture = textureLoader.load('/textures/concrete.jpg')
const wallTexture = textureLoader.load('/textures/wood.jpg')
const cloudTexture = textureLoader.load('/textures/smoke_05.png')
const rockTexture = textureLoader.load('/textures/rock.jpg')

/**
 * Objects 
 */
// Cloud Material
const cloudMaterial = new THREE.MeshLambertMaterial({
    map: cloudTexture,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending
})

// Cloud Object
const cloudGeometry = new THREE.PlaneGeometry(5, 5)
const cloudParticles = []
let cloud = null
for (let p = 0; p < 25; p++) {
    cloud = new THREE.Mesh(cloudGeometry, cloudMaterial)
    cloud.position.set(
        Math.random() * 5 - 0,
        0,
        Math.random() * 5 - 0
    )
    cloud.rotation.z = Math.random() * 360
    cloud.material.opacity = .6
    cloudParticles.push(cloud)
    scene.add(cloud)
}

// RAIN PARTICLES
const rainBuffer = new THREE.BufferGeometry()
const rainCount = 5000;

const posRain = new Float32Array(rainCount * 3)
for (let i = 0; i < (rainCount * 3); i++) {
    posRain[i] = Math.random() * 400 - 200,
        posRain[i + 1] = Math.random() * 100 - 75,
        posRain[i + 2] = -100 * 300 - 150
}

rainBuffer.setAttribute('position', new THREE.BufferAttribute(posRain, 3))

const rainMaterial = new THREE.PointsMaterial()
rainMaterial.size = 0.2
rainMaterial.transparent = true

// Points
const rain = new THREE.Points(rainBuffer, rainMaterial)
scene.add(rain)

// Objects Distance 
const objectsDistance = 4

// Sphere Geometery 
const geometry = new THREE.SphereGeometry(.6, 64, 64)
const material = new THREE.MeshStandardMaterial()
material.map = rockTexture
// material.metalness = 0.7
material.roughness = 1
// material.normalMap = normalTexture
// material.color = new THREE.Color(0x63462D)
// material.wireframe = true

const sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

sphere.position.x = 1.5
sphere.position.y = - objectsDistance * 0
sphere.position.z = - 1

/**
 * Project 
 */
// Video 
const video = document.getElementById('video')
const projectTexture = new THREE.VideoTexture(video)

const gymboisGeo = new THREE.PlaneGeometry(2, 0.9)
const gymboisMat = new THREE.MeshBasicMaterial({
    map: projectTexture,
    transparent: true,
    // depthWrite: false,
    // blending: THREE.AdditiveBlending
})
const project = new THREE.Mesh(gymboisGeo, gymboisMat)

scene.add(project)

// const gymbois = gui.addFolder('gymbois')

// gymbois.add(project.position, 'x')
//     .min(- 1)
//     .max(1)
//     .step(0.0001)
//     .name('positionX')

// gymbois.add(project.position, 'y')
//     .min(- 3)
//     .max(0)
//     .step(0.0001)
//     .name('positionY')

// gymbois.add(project.position, 'z')
//     .min(-0.3)
//     .max(0.6)
//     .step(0.0001)
//     .name('positionZ')

project.position.x = -0.05
project.position.z = 0.23
project.position.y = - objectsDistance * 0.752


// Roof Object
const roofGeo = new THREE.PlaneGeometry(4.2, 1.8)
const roofMat = new THREE.MeshBasicMaterial({
    map: roofTexture,
    color: 0x5A5A5A,
    transparent: true,
    depthWrite: false,
})
const roof = new THREE.Mesh(roofGeo, roofMat)
scene.add(roof)

// const roofObject = gui.addFolder('roof')

// roofObject.add(roof.position, 'x')
//     .min(- 1)
//     .max(1)
//     .step(0.0001)
//     .name('positionX')

// roofObject.add(roof.position, 'y')
//     .min(- 6)
//     .max(- 5)
//     .step(0.0001)
//     .name('positionY')

// roofObject.add(roof.position, 'z')
//     .min(-5)
//     .max(1)
//     .step(0.0001)
//     .name('positionZ')

// roofObject.add(roof.rotation, 'x')
//     .min(- 2)
//     .max(2)
//     .step(0.0001)
//     .name('rotationX')

// roofObject.add(roof.rotation, 'y')
//     .min(- 10)
//     .max(- 5)
//     .step(0.0001)
//     .name('rotationY')

// roofObject.add(roof.rotation, 'z')
//     .min(0)
//     .max(10)
//     .step(0.0001)
//     .name('rotationZ')

roof.rotation.x = -1.5
roof.rotation.y = -6.2906

roof.position.y = - 5.63
roof.position.z = - 0.144
roof.position.x = - 0.057

// Wall Object 
const wallGeo = new THREE.PlaneGeometry(1, 1)
const wallMat = new THREE.MeshBasicMaterial({
    map: wallTexture,
    transparent: true,
    // depthWrite: false,
    // blending: THREE.AdditiveBlending
})
const wall = new THREE.Mesh(wallGeo, wallMat)
scene.add(wall)

// const wallObject = gui.addFolder('wall')

// wallObject.add(wall.position, 'x')
//     .min(1)
//     .max(2)
//     .step(0.0001)
//     .name('positionX')

// wallObject.add(wall.position, 'y')
//     .min(- 10)
//     .max(- 5)
//     .step(0.0001)
//     .name('positionY')

// wallObject.add(wall.position, 'z')
//     .min(-5)
//     .max(1)
//     .step(0.0001)
//     .name('positionZ')

wall.position.x = 1.5
wall.position.y = -7
wall.position.z = -1.2

// Filler Object 
const fillerGeo = new THREE.PlaneGeometry(6, 0.335)
const fillerMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    // depthWrite: false,
    // blending: THREE.AdditiveBlending
})
const filler = new THREE.Mesh(fillerGeo, fillerMat)
scene.add(filler)

// const fillerObject = gui.addFolder('filler')

// fillerObject.add(filler.position, 'x')
//     .min(1)
//     .max(2)
//     .step(0.0001)
//     .name('positionX')

// fillerObject.add(filler.position, 'y')
//     .min(-9)
//     .max(-8)
//     .step(0.0001)
//     .name('positionY')

// fillerObject.add(filler.position, 'z')
//     .min(0)
//     .max(2)
//     .step(0.0001)
//     .name('positionZ')

filler.position.y = -8.2
filler.position.z = 0.7

/**
 * Models
 */
const billboard = new GLTFLoader()
billboard.load(
    './models/billboard/scene.gltf',
    (gltf) => {
        gltf.scene.scale.set(0.255, 0.255, 0.255)
        gltf.scene.position.set(-0.057, -6.3, -0.5)

        scene.add(gltf.scene)

        // const billboard = gui.addFolder('billboard')

        // billboard.add(gltf.scene.rotation, 'y')
        //     .min(- Math.PI)
        //     .max(Math.PI)
        //     .step(0.001)
        //     .name('rotationY')

        // billboard.add(gltf.scene.position, 'x')
        //     .min(-1)
        //     .max(1)
        //     .step(0.0001)
        //     .name('positionX')

        // billboard.add(gltf.scene.position, 'y')
        //     .min(-10)
        //     .max(0)
        //     .step(0.0001)
        //     .name('positionY')

        // billboard.add(gltf.scene.position, 'z')
        //     .min(-5)
        //     .max(-1)
        //     .step(0.0001)
        //     .name('positionZ')

    }
)

const pub = new GLTFLoader()
pub.load(
    './models/japanese_pub/scene.gltf',
    (gltf) => {
        gltf.scene.scale.set(0.08, 0.08, 0.08)
        gltf.scene.position.set(-0.25, -8.15, 0.5)
        scene.add(gltf.scene)

        // const pub = gui.addFolder('pub')

        // pub.add(gltf.scene.rotation, 'y')
        //     .min(- Math.PI)
        //     .max(Math.PI)
        //     .step(0.001)
        //     .name('rotationY')

        // pub.add(gltf.scene.position, 'x')
        //     .min(- 1)
        //     .max(1)
        //     .step(0.0001)
        //     .name('positionX')

        // pub.add(gltf.scene.position, 'y')
        //     .min(- 10)
        //     .max(0)
        //     .step(0.0001)
        //     .name('positionY')

        // pub.add(gltf.scene.position, 'z')
        //     .min(-1)
        //     .max(1)
        //     .step(0.0001)
        //     .name('positionZ')

    }
)

let mixer = null

const chef = new GLTFLoader()
chef.load(
    './models/chef_chad/scene.gltf',
    (gltf) => {
        gltf.scene.scale.set(0.005, 0.005, 0.005)
        gltf.scene.position.set(1.6, -7.69, -1)
        gltf.scene.rotation.set(0, -0.334, 0)
        scene.add(gltf.scene)

        mixer = new THREE.AnimationMixer(gltf.scene)
        const action = mixer.clipAction(gltf.animations[0])
        action.play()

        // const chef = gui.addFolder('chef')

        // chef.add(gltf.scene.rotation, 'y')
        //     .min(- Math.PI)
        //     .max(Math.PI)
        //     .step(0.001)
        //     .name('rotationY')

        // chef.add(gltf.scene.position, 'x')
        //     .min(0)
        //     .max(2)
        //     .step(0.0001)
        //     .name('positionX')

        // chef.add(gltf.scene.position, 'y')
        //     .min(- 8)
        //     .max(- 6)
        //     .step(0.0001)
        //     .name('positionY')

        // chef.add(gltf.scene.position, 'z')
        //     .min(-1.5)
        //     .max(-1)
        //     .step(0.0001)
        //     .name('positionZ')
    }
)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
scene.add(camera)

// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 */
let scrollY = window.scrollY

window.addEventListener('scroll', () => {
    scrollY = window.scrollY
})

/**
 * Animate
 */
// Animate Models
const clock = new THREE.Clock()
let previousTime = 0

// Animate Sphere
document.addEventListener('mousemove', onDocumentMouseMove)

let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2
const windowY = window.innerHeight / 2

function onDocumentMouseMove(event) {
    mouseX = (event.clientX - windowX)
    mouseY = (event.clientY - windowY)
}

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}

window.addEventListener('scroll', updateSphere);

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Animate Models
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Sphere Animation 
    targetX = mouseX * 0.001
    targetY = mouseY * 0.001

    sphere.rotation.y = .5 * elapsedTime

    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.position.z += .5 * (targetY - sphere.rotation.x)

    // Update Mixers
    if (mixer) {
        mixer.update(deltaTime)
    }

    // Cloud Rotation
    cloudParticles.forEach(p => {
        p.rotation.z -= 0.002
    })

    // Update rain particles
    const positions = rain.geometry.attributes.position.array;
    for (let i = 0; i < (rainCount * 3); i += 3) {
        positions[i + 1] -= 2.0 + Math.random() * 0.1;
        if (positions[i + 1] < (-300 * Math.random())) {
            positions[i + 1] = 100
        }
        rain.geometry.attributes.position.needsUpdate = true
    }

    // Animate camera
    camera.position.y = - scrollY / sizes.height * objectsDistance

    // Flash 
    if (Math.random() > 0.93 || flash.power > 100) {
        if (flash.power < 100) flash.power
        flash.position.set(
            Math.random() * 400,
            300 + Math.random() * 200,
            100
        )
        flash.power = 50 + Math.random() * 500
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
