import { useEffect, useRef } from "react";
import { Box } from "@mui/material";
import * as THREE from "three";
import { getModelConfigForActivity } from "../../registry/modelRegistry";

export default function ARSceneCanvas({
  activity,
  isWireframe = false,
  manualRotation = 0,
  scaleFactor = 1,
  lightingPreset = "studio",
  cameraView = "isometric",
  isAnimPaused = false,
  animSpeed = 1.0,
  isExploded = false,
  showDimensions = false,
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Model Registry Configuration
    const config = getModelConfigForActivity(activity?.id);

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);

    // Set Initial Camera Snap Position
    if (cameraView === "top") {
      camera.position.set(0, 6, 0.001);
    } else if (cameraView === "front") {
      camera.position.set(0, 0, 6);
    } else {
      camera.position.set(3, 3, 5); // Isometric default
    }
    camera.lookAt(0, 0, 0);

    // 3. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // 4. Lighting Studio Presets
    let ambientLight, dirLight, pointLight;

    if (lightingPreset === "contrast") {
      ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
      dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
      dirLight.position.set(10, 15, 10);
      pointLight = new THREE.PointLight(0x38bdf8, 2.0, 12);
      pointLight.position.set(-8, -5, -4);
    } else if (lightingPreset === "sunlight") {
      ambientLight = new THREE.AmbientLight(0xfff7ed, 0.9);
      dirLight = new THREE.DirectionalLight(0xfacc15, 2.0);
      dirLight.position.set(8, 12, 5);
      pointLight = new THREE.PointLight(0xf97316, 1.5, 10);
      pointLight.position.set(-5, -5, 2);
    } else if (lightingPreset === "cyber") {
      ambientLight = new THREE.AmbientLight(0x0f172a, 0.5);
      dirLight = new THREE.DirectionalLight(0xa855f7, 2.2);
      dirLight.position.set(-5, 10, 5);
      pointLight = new THREE.PointLight(0x38bdf8, 2.5, 10);
      pointLight.position.set(5, -5, 5);
    } else {
      // Studio Default
      ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
      dirLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
      dirLight.position.set(5, 10, 7);
      pointLight = new THREE.PointLight(config.primaryColor, 1.2, 10);
      pointLight.position.set(-5, -5, -2);
    }

    scene.add(ambientLight);
    scene.add(dirLight);
    scene.add(pointLight);

    // 5. Create Dynamic 3D Mesh & Sub-components
    const group = new THREE.Group();
    scene.add(group);

    let mainMesh;
    let extraObjects = [];
    let subParts = []; // Sub-components for exploded deconstruction
    let pulseMesh = null; // For heartbeat animation

    const geomType = config.geometryType;

    if (geomType === "pythagoras") {
      // 3D Pythagoras Triangle Base + 3 Volume Squares (a², b², c²)
      const triShape = new THREE.Shape();
      triShape.moveTo(0, 0);
      triShape.lineTo(1.6, 0);
      triShape.lineTo(0, 1.2);
      triShape.closePath();

      const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05 };
      const triGeo = new THREE.ExtrudeGeometry(triShape, extrudeSettings);
      const triMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, wireframe: isWireframe });
      mainMesh = new THREE.Mesh(triGeo, triMat);
      mainMesh.position.set(-0.8, -0.6, 0);
      group.add(mainMesh);

      // Block A² (Base)
      const blockAGeo = new THREE.BoxGeometry(1.6, 1.6, 0.4);
      const blockAMat = new THREE.MeshStandardMaterial({ color: 0x10b981, wireframe: isWireframe });
      const blockA = new THREE.Mesh(blockAGeo, blockAMat);
      blockA.position.set(0, -1.4, 0);
      group.add(blockA);
      subParts.push({ mesh: blockA, basePos: [0, -1.4, 0], dir: [0, -1, 0] });

      // Block B² (Vertical)
      const blockBGeo = new THREE.BoxGeometry(1.2, 1.2, 0.4);
      const blockBMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, wireframe: isWireframe });
      const blockB = new THREE.Mesh(blockBGeo, blockBMat);
      blockB.position.set(-1.4, 0, 0);
      group.add(blockB);
      subParts.push({ mesh: blockB, basePos: [-1.4, 0, 0], dir: [-1, 0, 0] });

      // Block C² (Hypotenuse)
      const blockCGeo = new THREE.BoxGeometry(2.0, 2.0, 0.4);
      const blockCMat = new THREE.MeshStandardMaterial({ color: 0x6366f1, wireframe: isWireframe });
      const blockC = new THREE.Mesh(blockCGeo, blockCMat);
      blockC.position.set(0.6, 0.8, 0);
      blockC.rotation.z = -Math.atan(1.2 / 1.6);
      group.add(blockC);
      subParts.push({ mesh: blockC, basePos: [0.6, 0.8, 0], dir: [0.8, 0.8, 0] });

    } else if (geomType === "prism-refraction") {
      // 3D Glass Prism Refraction + Dispersion Spectrum Rays
      const prismGeo = new THREE.CylinderGeometry(1.2, 1.2, 2.0, 3);
      const prismMat = new THREE.MeshPhysicalMaterial({
        color: 0x93c5fd,
        transmission: 0.9,
        opacity: 1,
        transparent: true,
        roughness: 0.1,
        ior: 1.5,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(prismGeo, prismMat);
      group.add(mainMesh);

      // Incident White Beam
      const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.5);
      const beamMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.rotation.z = Math.PI / 3;
      beam.position.set(-1.4, 0, 0);
      group.add(beam);

      // Spectrum Rainbow Rays
      const colors = [0xef4444, 0xf97316, 0xeab308, 0x10b981, 0x06b6d4, 0x3b82f6, 0x8b5cf6];
      colors.forEach((col, idx) => {
        const rayGeo = new THREE.CylinderGeometry(0.02, 0.02, 2.2);
        const rayMat = new THREE.MeshBasicMaterial({ color: col });
        const ray = new THREE.Mesh(rayGeo, rayMat);
        ray.rotation.z = -Math.PI / 3.5 - idx * 0.04;
        ray.position.set(1.4, -0.2 + idx * 0.08, 0);
        group.add(ray);
        subParts.push({ mesh: ray, basePos: [1.4, -0.2 + idx * 0.08, 0], dir: [1, idx * 0.2, 0] });
      });

    } else if (geomType === "plant-cell") {
      // 3D Plant Cell Wall + Nucleus + Chloroplasts + Vacuole
      const cellWallGeo = new THREE.CylinderGeometry(1.4, 1.4, 1.8, 6);
      const cellWallMat = new THREE.MeshStandardMaterial({
        color: 0x15803d,
        wireframe: isWireframe,
        transparent: true,
        opacity: 0.7,
      });
      mainMesh = new THREE.Mesh(cellWallGeo, cellWallMat);
      group.add(mainMesh);

      // Central Nucleus
      const nucGeo = new THREE.SphereGeometry(0.45, 32, 32);
      const nucMat = new THREE.MeshStandardMaterial({ color: 0x9333ea, wireframe: isWireframe });
      const nucMesh = new THREE.Mesh(nucGeo, nucMat);
      nucMesh.position.set(-0.4, 0, 0);
      group.add(nucMesh);

      // Vacuole Liquid
      const vacGeo = new THREE.BoxGeometry(0.8, 1.0, 0.8);
      const vacMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.6, wireframe: isWireframe });
      const vacMesh = new THREE.Mesh(vacGeo, vacMat);
      vacMesh.position.set(0.4, 0, 0);
      group.add(vacMesh);

      // Chloroplast Discs
      for (let i = 0; i < 4; i++) {
        const cpGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16);
        const cpMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, wireframe: isWireframe });
        const cpMesh = new THREE.Mesh(cpGeo, cpMat);
        const angle = (Math.PI / 2) * i;
        cpMesh.position.set(Math.cos(angle) * 0.9, 0.4 * (i % 2 ? 1 : -1), Math.sin(angle) * 0.9);
        group.add(cpMesh);
        subParts.push({ mesh: cpMesh, basePos: [Math.cos(angle) * 0.9, 0.4 * (i % 2 ? 1 : -1), Math.sin(angle) * 0.9], dir: [Math.cos(angle), 0, Math.sin(angle)] });
      }

    } else if (geomType === "heart-circulation") {
      // 3D Pulsating Human Heart Mesh + Aorta Tubes
      const heartGeo = new THREE.DodecahedronGeometry(1.2, 2);
      const heartMat = new THREE.MeshStandardMaterial({
        color: 0xd97706,
        roughness: 0.3,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(heartGeo, heartMat);
      pulseMesh = mainMesh;
      group.add(mainMesh);

      // Aorta Tube Top
      const aortaGeo = new THREE.TorusGeometry(0.6, 0.15, 16, 32, Math.PI);
      const aortaMat = new THREE.MeshStandardMaterial({ color: 0xef4444, wireframe: isWireframe });
      const aorta = new THREE.Mesh(aortaGeo, aortaMat);
      aorta.position.set(0, 1.1, 0);
      group.add(aorta);

      // Moving Blood Particles
      for (let i = 0; i < 6; i++) {
        const pGeo = new THREE.SphereGeometry(0.08, 16, 16);
        const pMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const pMesh = new THREE.Mesh(pGeo, pMat);
        group.add(pMesh);
        extraObjects.push({ mesh: pMesh, radius: 0.8, speed: 2.0 + i * 0.3 });
      }

    } else if (geomType === "solenoid-magnetic") {
      // 3D Solenoid Helical Coil + Magnetic Field Lines
      const helixGeo = new THREE.TorusGeometry(0.8, 0.08, 16, 100);
      const helixMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.8, roughness: 0.2, wireframe: isWireframe });

      for (let i = 0; i < 5; i++) {
        const ring = new THREE.Mesh(helixGeo, helixMat);
        ring.position.set(0, (i - 2) * 0.35, 0);
        group.add(ring);
      }

      // Magnetic Field Torus Loops
      for (let i = 0; i < 3; i++) {
        const fieldGeo = new THREE.TorusGeometry(1.4 + i * 0.4, 0.02, 16, 100);
        const fieldMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: isWireframe });
        const fieldLine = new THREE.Mesh(fieldGeo, fieldMat);
        fieldLine.rotation.x = Math.PI / 2;
        group.add(fieldLine);
        subParts.push({ mesh: fieldLine, basePos: [0, 0, 0], dir: [0.5 * (i + 1), 0, 0] });
      }

    } else if (geomType === "hydrocarbon") {
      // 3D Tetrahedral Hydrocarbon Bond (CH₄)
      const carbonGeo = new THREE.SphereGeometry(0.65, 32, 32);
      const carbonMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.2, wireframe: isWireframe });
      mainMesh = new THREE.Mesh(carbonGeo, carbonMat);
      group.add(mainMesh);

      // 4 Tetrahedral Bond Arms + Hydrogens
      const hPositions = [
        [1.1, 1.1, 1.1],
        [-1.1, -1.1, 1.1],
        [-1.1, 1.1, -1.1],
        [1.1, -1.1, -1.1],
      ];

      hPositions.forEach((pos) => {
        const bondGeo = new THREE.CylinderGeometry(0.06, 0.06, 1.5);
        const bondMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
        const bond = new THREE.Mesh(bondGeo, bondMat);
        bond.position.set(pos[0] / 2, pos[1] / 2, pos[2] / 2);
        bond.lookAt(pos[0], pos[1], pos[2]);
        bond.rotation.x += Math.PI / 2;
        group.add(bond);

        const hGeo = new THREE.SphereGeometry(0.3, 16, 16);
        const hMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, wireframe: isWireframe });
        const hMesh = new THREE.Mesh(hGeo, hMat);
        hMesh.position.set(...pos);
        group.add(hMesh);
        subParts.push({ mesh: hMesh, basePos: pos, dir: [pos[0] * 0.8, pos[1] * 0.8, pos[2] * 0.8] });
      });

    } else if (geomType === "conic-sections") {
      // 3D Double-Cone Geometry + Translucent Cutting Plane
      const cone1Geo = new THREE.ConeGeometry(1.2, 1.5, 32);
      const coneMat = new THREE.MeshStandardMaterial({ color: 0x0369a1, wireframe: isWireframe, transparent: true, opacity: 0.7 });
      const cone1 = new THREE.Mesh(cone1Geo, coneMat);
      cone1.position.set(0, 0.75, 0);
      group.add(cone1);

      const cone2 = new THREE.Mesh(cone1Geo, coneMat);
      cone2.rotation.z = Math.PI;
      cone2.position.set(0, -0.75, 0);
      group.add(cone2);

      // Translucent Slicing Sheet
      const planeGeo = new THREE.PlaneGeometry(2.5, 2.5);
      const planeMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, side: THREE.DoubleSide, transparent: true, opacity: 0.75 });
      const plane = new THREE.Mesh(planeGeo, planeMat);
      plane.rotation.x = Math.PI / 4;
      group.add(plane);
      subParts.push({ mesh: plane, basePos: [0, 0, 0], dir: [0, 0.8, 0.8] });

    } else if (geomType === "balance-scale") {
      // 3D Equal-Arm Pan Balance Scale
      const standGeo = new THREE.CylinderGeometry(0.1, 0.15, 2.2, 16);
      const standMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8 });
      const stand = new THREE.Mesh(standGeo, standMat);
      stand.position.set(0, -0.4, 0);
      group.add(stand);

      const armGeo = new THREE.BoxGeometry(2.8, 0.1, 0.1);
      const armMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b });
      const arm = new THREE.Mesh(armGeo, armMat);
      arm.position.set(0, 0.7, 0);
      group.add(arm);

      // Left Pan
      const panGeo = new THREE.CylinderGeometry(0.6, 0.05, 0.3, 16);
      const panMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8 });
      const leftPan = new THREE.Mesh(panGeo, panMat);
      leftPan.position.set(-1.3, 0.1, 0);
      group.add(leftPan);
      subParts.push({ mesh: leftPan, basePos: [-1.3, 0.1, 0], dir: [-0.6, -0.4, 0] });

      // Right Pan
      const rightPan = new THREE.Mesh(panGeo, panMat);
      rightPan.position.set(1.3, 0.1, 0);
      group.add(rightPan);
      subParts.push({ mesh: rightPan, basePos: [1.3, 0.1, 0], dir: [0.6, -0.4, 0] });

    } else if (geomType === "box" || geomType === "cylinder" || geomType === "octahedron") {
      let geometry;
      if (geomType === "box") geometry = new THREE.BoxGeometry(1.6, 1.6, 1.6);
      else if (geomType === "cylinder") geometry = new THREE.CylinderGeometry(0.9, 0.9, 1.8, 32);
      else geometry = new THREE.OctahedronGeometry(1.4);

      const material = new THREE.MeshStandardMaterial({
        color: config.primaryColor,
        roughness: 0.3,
        metalness: 0.2,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(geometry, material);
      group.add(mainMesh);

      // Outer Wireframe Frame
      const wireGeo = new THREE.WireframeGeometry(geometry);
      const wireMat = new THREE.LineBasicMaterial({ color: config.secondaryColor, linewidth: 2 });
      const wireframeLines = new THREE.LineSegments(wireGeo, wireMat);
      wireframeLines.scale.set(1.04, 1.04, 1.04);
      group.add(wireframeLines);

    } else if (geomType === "solar-system") {
      const planetGeo = new THREE.SphereGeometry(1.2, 32, 32);
      const planetMat = new THREE.MeshStandardMaterial({
        color: config.primaryColor,
        roughness: 0.4,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(planetGeo, planetMat);
      group.add(mainMesh);

      const ringGeo = new THREE.RingGeometry(1.5, 2.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: config.secondaryColor,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7,
        wireframe: isWireframe,
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.5;
      group.add(ringMesh);
      subParts.push({ mesh: ringMesh, basePos: [0, 0, 0], dir: [0, 0.8, 0.5] });

      const moonGeo = new THREE.SphereGeometry(0.3, 16, 16);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, wireframe: isWireframe });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.set(2.2, 0, 0);
      group.add(moonMesh);
      extraObjects.push({ mesh: moonMesh, radius: 2.2, speed: 1.2 });
      subParts.push({ mesh: moonMesh, basePos: [2.2, 0, 0], dir: [1, 0.5, 0] });

    } else if (geomType === "atomic") {
      const nucleusGeo = new THREE.SphereGeometry(0.7, 32, 32);
      const nucleusMat = new THREE.MeshStandardMaterial({
        color: config.primaryColor,
        roughness: 0.2,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(nucleusGeo, nucleusMat);
      group.add(mainMesh);

      for (let i = 0; i < 3; i++) {
        const ringGeo = new THREE.TorusGeometry(1.6 + i * 0.4, 0.02, 16, 100);
        const ringMat = new THREE.MeshBasicMaterial({ color: config.secondaryColor, wireframe: isWireframe });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.rotation.x = (Math.PI / 3) * i;
        ringMesh.rotation.y = (Math.PI / 4) * i;
        group.add(ringMesh);
        subParts.push({ mesh: ringMesh, basePos: [0, 0, 0], dir: [0, 0.5 * (i + 1), 0.5 * (i + 1)] });

        const electronGeo = new THREE.SphereGeometry(0.12, 16, 16);
        const electronMat = new THREE.MeshBasicMaterial({ color: config.wireframeColor, wireframe: isWireframe });
        const electronMesh = new THREE.Mesh(electronGeo, electronMat);
        electronMesh.position.set(1.6 + i * 0.4, 0, 0);
        group.add(electronMesh);
        extraObjects.push({ mesh: electronMesh, radius: 1.6 + i * 0.4, speed: 1.5 + i * 0.5 });
      }
    } else {
      const geometry = new THREE.IcosahedronGeometry(1.3, 1);
      const material = new THREE.MeshStandardMaterial({
        color: config.primaryColor,
        roughness: 0.3,
        wireframe: isWireframe,
      });
      mainMesh = new THREE.Mesh(geometry, material);
      group.add(mainMesh);
    }

    // 6. 3D Bounding Box Dimension Rulers
    let boxHelper = null;
    if (showDimensions && mainMesh) {
      boxHelper = new THREE.BoxHelper(mainMesh, 0x10b981);
      scene.add(boxHelper);
    }

    // 7. Interactive Pointer Drag & Orbit State
    let isDragging = false;
    let prevPointer = { x: 0, y: 0 };
    let gestureRotation = { x: 0, y: 0 };

    const handlePointerDown = (e) => {
      isDragging = true;
      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevPointer.x;
      const deltaY = e.clientY - prevPointer.y;

      gestureRotation.y += deltaX * 0.008;
      gestureRotation.x += deltaY * 0.008;

      prevPointer = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.style.pointerEvents = "auto";
    domElement.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    // 8. Animation Frame Loop
    let animationFrameId;
    let clock = new THREE.Clock();
    let accumulatedTime = 0;
    let explodeProgress = 0;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (!isAnimPaused) {
        accumulatedTime += delta * animSpeed;
      }

      // Smooth Heartbeat Pulsing animation if active
      if (pulseMesh && !isAnimPaused) {
        const pulseScale = 1 + Math.sin(accumulatedTime * 5) * 0.08;
        pulseMesh.scale.set(pulseScale, pulseScale, pulseScale);
      }

      // Smooth Explode / Unfold Transition
      const targetExplode = isExploded ? 1 : 0;
      explodeProgress += (targetExplode - explodeProgress) * 0.08;

      subParts.forEach((part) => {
        const offset = 0.8 * explodeProgress;
        part.mesh.position.x = part.basePos[0] + part.dir[0] * offset;
        part.mesh.position.y = part.basePos[1] + part.dir[1] * offset;
        part.mesh.position.z = part.basePos[2] + part.dir[2] * offset;
      });

      // Combine Auto-Rotation + Manual Rotation + Direct Pointer Gesture
      group.rotation.y = accumulatedTime * config.autoRotateSpeed + (manualRotation * Math.PI) / 180 + gestureRotation.y;
      group.rotation.x = Math.sin(accumulatedTime * 0.3) * 0.2 + gestureRotation.x;

      const combinedScale = config.initialScale * scaleFactor;
      group.scale.set(combinedScale, combinedScale, combinedScale);

      extraObjects.forEach((obj) => {
        if (obj.radius) {
          const angle = accumulatedTime * obj.speed;
          obj.mesh.position.x = Math.cos(angle) * obj.radius;
          obj.mesh.position.z = Math.sin(angle) * obj.radius;
        }
      });

      if (boxHelper) {
        boxHelper.update();
      }

      renderer.render(scene, camera);
    }

    animate();

    // 9. Resize Handler
    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [
    activity,
    isWireframe,
    manualRotation,
    scaleFactor,
    lightingPreset,
    cameraView,
    isAnimPaused,
    animSpeed,
    isExploded,
    showDimensions,
  ]);

  return (
    <Box
      ref={mountRef}
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1,
        pointerEvents: "auto",
      }}
    />
  );
}
