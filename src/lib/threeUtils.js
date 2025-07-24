import * as THREE from 'three';

export const initLogo3D = (container) => {
  const width = container.clientWidth;
  const height = container.clientHeight;

  // Cena, câmera e renderizador
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  // Geometria do logo (tesoura estilizada)
  const scissorGroup = new THREE.Group();

  // Criar as lâminas da tesoura
  const bladeGeometry = new THREE.BoxGeometry(0.8, 0.1, 0.1);
  const bladeMaterial = new THREE.MeshStandardMaterial({ color: 0xc8a97e, metalness: 0.7, roughness: 0.3 });

  const blade1 = new THREE.Mesh(bladeGeometry, bladeMaterial);
  blade1.position.set(0, 0.2, 0);
  blade1.rotation.z = Math.PI / 8;

  const blade2 = new THREE.Mesh(bladeGeometry, bladeMaterial);
  blade2.position.set(0, -0.2, 0);
  blade2.rotation.z = -Math.PI / 8;

  // Criar os cabos da tesoura
  const handleGeometry = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 16);
  const handleMaterial = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, metalness: 0.5, roughness: 0.5 });

  const handle1 = new THREE.Mesh(handleGeometry, handleMaterial);
  handle1.position.set(0.5, 0.3, 0);
  handle1.rotation.z = Math.PI / 2;

  const handle2 = new THREE.Mesh(handleGeometry, handleMaterial);
  handle2.position.set(0.5, -0.3, 0);
  handle2.rotation.z = Math.PI / 2;

  // Adicionar à cena
  scissorGroup.add(blade1, blade2, handle1, handle2);
  scene.add(scissorGroup);

  // Iluminação
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(1, 1, 1);
  scene.add(directionalLight);

  // Posicionar câmera
  camera.position.z = 2;

  // Animação
  function animate() {
    requestAnimationFrame(animate);

    scissorGroup.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();

  // Responsividade
  window.addEventListener('resize', () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;

    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(newWidth, newHeight);
  });
};