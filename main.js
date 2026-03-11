const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 20);

const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas'), antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// Lumière optimisée
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(20, 50, 20);
light.castShadow = true;
scene.add(light);

// Génération d'un monde infini simple
const chunkSize = 16;
const chunks = new Map();

function createChunk(xOffset, zOffset){
    const geometry = new THREE.BoxGeometry(1,1,1);
    const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    
    const mesh = new THREE.InstancedMesh(geometry, material, chunkSize*chunkSize);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    let id = 0;
    for(let x=0; x<chunkSize; x++){
        for(let z=0; z<chunkSize; z++){
            const matrix = new THREE.Matrix4();
            matrix.setPosition(x + xOffset, 0, z + zOffset);
            mesh.setMatrixAt(id, matrix);
            id++;
        }
    }
    scene.add(mesh);
    chunks.set(`${xOffset}_${zOffset}`, mesh);
}

// Créer les chunks autour du joueur
for(let x=-1; x<=1; x++){
    for(let z=-1; z<=1; z++){
        createChunk(x*chunkSize, z*chunkSize);
    }
}

// Animation
function animate(){
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Déplacement simple caméra
window.addEventListener('keydown', e => {
    const speed = 1;
    if(e.key === 'w') camera.position.z -= speed;
    if(e.key === 's') camera.position.z += speed;
    if(e.key === 'a') camera.position.x -= speed;
    if(e.key === 'd') camera.position.x += speed;
});
