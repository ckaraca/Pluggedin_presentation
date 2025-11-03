import * as THREE from "three";

export function setup3DEnvironment(
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  root: THREE.Scene
) {
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  // Create starfield
  const starsGeometry = new THREE.BufferGeometry();
  const starCount = 5000;
  const positions = new Float32Array(starCount * 3);
  const colors = new Float32Array(starCount * 3);
  const sizes = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    const i3 = i * 3;

    // Random position in a sphere
    positions[i3] = (Math.random() - 0.5) * 20000;
    positions[i3 + 1] = (Math.random() - 0.5) * 20000;
    positions[i3 + 2] = (Math.random() - 0.5) * 20000;

    // Star colors (white, cyan, slight blue variations)
    const colorChoice = Math.random();
    if (colorChoice < 0.7) {
      // White stars
      colors[i3] = 1;
      colors[i3 + 1] = 1;
      colors[i3 + 2] = 1;
    } else {
      // Cyan/blue stars
      colors[i3] = 0.5 + Math.random() * 0.5;
      colors[i3 + 1] = 0.8 + Math.random() * 0.2;
      colors[i3 + 2] = 1;
    }

    // Random sizes
    sizes[i] = Math.random() * 3 + 1;
  }

  starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  starsGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const starsMaterial = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending
  });

  const stars = new THREE.Points(starsGeometry, starsMaterial);
  root.add(stars);

  // Create nebula fog effect
  root.fog = new THREE.FogExp2(0x0a0a0f, 0.00005);

  // Add subtle ambient light
  const ambientLight = new THREE.AmbientLight(0x1a1a2e, 0.3);
  root.add(ambientLight);

  // Add a distant cyan glow light
  const glowLight = new THREE.PointLight(0x78dce8, 0.5, 10000);
  glowLight.position.set(0, 2000, 0);
  root.add(glowLight);

  // Create animated nebula particles
  const nebulaGeometry = new THREE.BufferGeometry();
  const nebulaCount = 500;
  const nebulaPositions = new Float32Array(nebulaCount * 3);
  const nebulaColors = new Float32Array(nebulaCount * 3);
  const nebulaSizes = new Float32Array(nebulaCount);

  for (let i = 0; i < nebulaCount; i++) {
    const i3 = i * 3;

    nebulaPositions[i3] = (Math.random() - 0.5) * 15000;
    nebulaPositions[i3 + 1] = (Math.random() - 0.5) * 5000;
    nebulaPositions[i3 + 2] = (Math.random() - 0.5) * 15000;

    // Purple and cyan nebula colors
    const isPurple = Math.random() > 0.5;
    if (isPurple) {
      nebulaColors[i3] = 0.6 + Math.random() * 0.2;      // R
      nebulaColors[i3 + 1] = 0.2 + Math.random() * 0.2;  // G
      nebulaColors[i3 + 2] = 0.8 + Math.random() * 0.2;  // B
    } else {
      nebulaColors[i3] = 0.3 + Math.random() * 0.2;      // R
      nebulaColors[i3 + 1] = 0.8 + Math.random() * 0.2;  // G
      nebulaColors[i3 + 2] = 0.9 + Math.random() * 0.1;  // B
    }

    nebulaSizes[i] = Math.random() * 100 + 50;
  }

  nebulaGeometry.setAttribute('position', new THREE.BufferAttribute(nebulaPositions, 3));
  nebulaGeometry.setAttribute('color', new THREE.BufferAttribute(nebulaColors, 3));
  nebulaGeometry.setAttribute('size', new THREE.BufferAttribute(nebulaSizes, 1));

  const nebulaMaterial = new THREE.PointsMaterial({
    size: 80,
    vertexColors: true,
    transparent: true,
    opacity: 0.15,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending
  });

  const nebula = new THREE.Points(nebulaGeometry, nebulaMaterial);
  root.add(nebula);

  // Return objects for animation
  return {
    water: stars, // Keep same interface but return stars for animation
    stars,
    nebula
  };
}
